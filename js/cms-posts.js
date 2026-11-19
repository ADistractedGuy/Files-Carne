
/* =========================================
   FILES&CARNE - INTEGRAÇÃO COM PAGES CMS
   ========================================= */

/*
   CONFIGURAÇÕES GERAIS

   api: endereço da API do GitHub que lista os artigos.
   raw: endereço-base dos arquivos Markdown.
   base: identifica se o site está sendo executado
   localmente ou pelo GitHub Pages.
*/

const CMS_CONFIG = {
    api: "https://api.github.com/repos/ADistractedGuy/Files-Carne/contents/content/posts?ref=main",

    raw: "https://raw.githubusercontent.com/ADistractedGuy/Files-Carne/main/content/posts/",

    base:
        location.hostname === "localhost" ||
        location.hostname === "127.0.0.1"
            ? "/"
            : "/Files-Carne/"
};


/* =========================================
   CONVERSÃO DE CAMINHOS DE IMAGENS
   ========================================= */

function getImageUrl(path) {
    if (!path) return "";

    path = String(path).trim().replace(/^['"]|['"]$/g, "");

    // Se já for uma URL completa, não precisa modificar.
    if (/^https?:\/\//i.test(path)) {
        return path;
    }

    // Remove barras iniciais.
    path = path.replace(/^\/+/, "");

    // Evita repetir Files-Carne no endereço.
    if (path.startsWith("Files-Carne/")) {
        path = path.substring("Files-Carne/".length);
    }

    return CMS_CONFIG.base + encodeURI(path);
}


/* =========================================
   PROTEÇÃO DE TEXTO HTML
   ========================================= */

/*
   Escapa caracteres especiais para impedir que
   textos comuns sejam interpretados como HTML.
*/

function escapeHTML(value = "") {
    return String(value).replace(/[&<>"']/g, char => ({
        "&": "&amp;",
        "<": "&lt;",
        ">": "&gt;",
        '"': "&quot;",
        "'": "&#039;"
    })[char]);
}


/* =========================================
   LEITURA DO FRONTMATTER MARKDOWN
   ========================================= */

/*
   O Pages CMS salva informações como título,
   descrição, data, imagem e FAQ no YAML
   localizado no início do arquivo Markdown.

   A biblioteca js-yaml interpreta esses dados,
   inclusive listas e objetos como o FAQ.
*/

function parsePost(content, filename) {

    // Identifica o início e o fim do YAML.
    const match = content.match(
        /^---\s*\r?\n([\s\S]*?)\r?\n---\s*(?:\r?\n|$)([\s\S]*)$/
    );

    if (!match) return null;

    const frontmatter = match[1];
    const body = match[2];

    // Converte o YAML em um objeto JavaScript.
    const data = jsyaml.load(frontmatter) || {};

    return {
        slug: filename.replace(/\.md$/i, ""),
        title: data.title || "",
        description: data.description || "",
        date: data.date || "",
        image: data.image || "",
        faq: Array.isArray(data.faq) ? data.faq : [],
        sources: Array.isArray(data.sources) ? data.sources : [],
        body: body
    };
}



/* =========================================
   BUSCA AS PUBLICAÇÕES NO GITHUB
========================================= */

async function getPosts() {

    // Consulta a pasta content/posts no repositório.
    const response = await fetch(CMS_CONFIG.api, {
        headers: {
            "Accept": "application/vnd.github+json"
        },
        cache: "no-store"
    });

    // Verifica se a API respondeu corretamente.
    if (!response.ok) {

        let detalhe = "";

        try {
            const erro = await response.json();
            detalhe = erro.message || "";
        } catch (e) {
            detalhe = "Resposta inválida do GitHub.";
        }

        throw new Error(
            `GitHub API (${response.status}): ${detalhe}`
        );
    }

    // Converte a resposta para JSON.
    const files = await response.json();

    // Confirma que recebemos uma lista de arquivos.
    if (!Array.isArray(files)) {
        throw new Error(
            "A API não retornou uma lista de arquivos."
        );
    }

    // Seleciona somente arquivos Markdown.
    const markdownFiles = files.filter(file =>
        file.type === "file" &&
        file.name.toLowerCase().endsWith(".md")
    );

    // Impede que uma falha isolada interrompa todas as publicações.
    const results = await Promise.allSettled(

        markdownFiles.map(async file => {

            const fileResponse = await fetch(file.download_url, {
                cache: "no-store"
            });

            if (!fileResponse.ok) {
                throw new Error(
                    `Falha ao buscar ${file.name}: ${fileResponse.status}`
                );
            }

            const content = await fileResponse.text();

            const post = parsePost(content, file.name);

            if (!post) {
                throw new Error(
                    `Não foi possível interpretar ${file.name}`
                );
            }

            return post;
        })
    );

    // Separa publicações carregadas e falhas individuais.
    const posts = [];

    results.forEach((result, index) => {

        if (result.status === "fulfilled") {

            posts.push(result.value);

        } else {

            console.error(
                "Erro ao carregar:",
                markdownFiles[index].name,
                result.reason
            );

        }
    });

    // Mantém somente publicações com os campos essenciais.
    return posts
        .filter(post =>
            post &&
            post.title &&
            post.description
        )
        .sort((a, b) =>
            new Date(b.date) - new Date(a.date)
        );
    }



/* =========================================
   CRIAÇÃO DOS CARDS DE PUBLICAÇÃO
   ========================================= */

function createPostCard(post) {

    const articleUrl =
        CMS_CONFIG.base +
        "pages/article.html?slug=" +
        encodeURIComponent(post.slug);

    // Só cria a imagem quando houver uma cadastrada.
    const imageHTML = post.image
        ? `
            <img
                class="img_post"
                src="${escapeHTML(getImageUrl(post.image))}"
                alt="${escapeHTML(post.title)}"
                loading="lazy"
            >
        `
        : "";

    return `
        <article class="post">

            <a href="${articleUrl}">

                ${imageHTML}

                <h2 class="pixelify-sans-400">
                    ${escapeHTML(post.title)}
                </h2>

                <p>
                    ${escapeHTML(post.description)}
                </p>

                <span class="read-more">
                    Ler artigo →
                </span>

            </a>

        </article>
    `;
}


/* =========================================
   PUBLICAÇÕES RECENTES - PÁGINA INICIAL
   ========================================= */

async function loadRecentPosts() {

    const container = document.getElementById("recent-posts");

    if (!container) return;

    try {

        const posts = await getPosts();

        container.innerHTML = posts
            .slice(0, 4)
            .map(createPostCard)
            .join("");

        if (posts.length === 0) {
            container.innerHTML =
                "<p>Nenhuma publicação disponível.</p>";
        }

    } catch (error) {

        console.error("Erro ao carregar posts:", error);

        container.innerHTML =
            "<p>Não foi possível carregar as publicações.</p>";
    }
}


/* =========================================
   ARQUIVO COMPLETO DE PUBLICAÇÕES
   ========================================= */

async function loadAllPosts() {

    const container = document.getElementById("posts-list");

    if (!container) return;

    try {

        const posts = await getPosts();

        container.innerHTML = posts
            .map(createPostCard)
            .join("");

        if (posts.length === 0) {
            container.innerHTML =
                "<p>Nenhuma publicação encontrada.</p>";
        }

    } catch (error) {

        console.error("Erro ao carregar publicações:", error);

        container.innerHTML =
            "<p>Não foi possível carregar as publicações.</p>";
    }
}


/* =========================================
   CRIAÇÃO DO FAQ
   ========================================= */

/*
   Recebe a lista de perguntas cadastradas no CMS
   e transforma cada uma em um elemento expansível.

   Cada pergunta utiliza <details> e <summary>,
   permitindo abrir e fechar a resposta.
*/

function createFAQ(faqItems) {

    // Não cria a seção se não houver perguntas.
    if (!Array.isArray(faqItems) || faqItems.length === 0) {
        return "";
    }

    // Prepara cada pergunta e resposta.
    const questions = faqItems
        .filter(item =>
            item &&
            item.question &&
            item.answer
        )
        .map(item => {

            // Protege o texto da pergunta.
            const question = escapeHTML(item.question);

            /*
               Converte a resposta Markdown em HTML.
               DOMPurify remove conteúdos HTML perigosos.
            */
            const answerHTML = DOMPurify.sanitize(
                marked.parse(String(item.answer))
            );

            return `
                <details class="details">

                    <summary>
                        ${question}
                    </summary>

                    <div class="faq">
                        ${answerHTML}
                    </div>

                </details>
            `;
        })
        .join("");

    // Se todas as perguntas forem inválidas, não exibe o FAQ.
    if (!questions) return "";

    return `
        <!-- SEÇÃO DE PERGUNTAS FREQUENTES -->
        <section
            class="details-section"
            aria-labelledby="faq-title"
        >

            <h2 id="faq-title">
                Perguntas frequentes
            </h2>

            ${questions}

        </section>
    `;
}

/* =========================================
   CRIAÇÃO DA SEÇÃO DE FONTES E REFERÊNCIAS
   ========================================= */

   function createSources(sources) {

    // Não exibe a seção se não houver fontes.
    if (!Array.isArray(sources) || sources.length === 0) {
        return "";
    }

    const references = sources
        .filter(source =>
            source &&
            source.title &&
            source.url
        )
        .map(source => {

            const title = escapeHTML(source.title);
            const institution = escapeHTML(source.institution || "");

            // Valida o endereço para aceitar somente links HTTP/HTTPS.
            let safeURL = "";

            try {
                const parsedURL = new URL(source.url);

                if (
                    parsedURL.protocol === "https:" ||
                    parsedURL.protocol === "http:"
                ) {
                    safeURL = escapeHTML(parsedURL.href);
                }
            } catch (error) {
                console.warn("Link de referência inválido:", source.url);
            }

            // Não cria um link clicável se o endereço for inválido.
            const sourceLink = safeURL
                ? `<a href="${safeURL}" target="_blank"
                     rel="noopener noreferrer">Acessar fonte</a>`
                : "";

            return `
                <li class="source-item">

                    <strong>${title}</strong>

                    ${institution
                        ? `<span class="source-institution">${institution}</span>`
                        : ""
                    }

                    ${sourceLink}

                </li>
            `;
        })
        .join("");

    // Não exibe uma seção vazia caso todas as referências sejam inválidas.
    if (!references) return "";

    return `
        <section class="sources-section"
                 aria-labelledby="sources-title">

            <h2 id="sources-title">
                Fontes e referências
            </h2>

            <ol class="sources-list">
                ${references}
            </ol>

        </section>
    `;
}


/* =========================================
   ABERTURA DE UMA PUBLICAÇÃO INDIVIDUAL
   ========================================= */

async function loadSinglePost() {

    const container = document.getElementById("article-content");

    if (!container) return;

    // Recupera o slug presente na URL.
    const slug = new URLSearchParams(
        window.location.search
    ).get("slug");

    if (!slug) {

        container.innerHTML =
            "<p>Publicação não encontrada.</p>";

        return;
    }

    try {

        const posts = await getPosts();

        // Localiza o artigo solicitado.
        const post = posts.find(item =>
            item.slug === slug
        );

        if (!post) {

            container.innerHTML =
                "<p>Esta publicação não foi encontrada.</p>";

            return;
        }

        // Atualiza o título da aba do navegador.
        document.title = post.title + " | Files&Carne";

        // Converte o corpo Markdown em HTML seguro.
        const safeBody = DOMPurify.sanitize(
            marked.parse(post.body || "")
        );

        // Gera o FAQ com as perguntas do CMS.
        const faqHTML = createFAQ(post.faq);
        const sourcesHTML = createSources(post.sources);

        /*
           Monta o artigo completo.

           A seção do FAQ fica depois do corpo principal,
           seguindo a organização do post-teste.
        */

        container.innerHTML = `

            <article class="cms-article">

                <!-- CABEÇALHO DO ARTIGO -->
                <header class="cms-article-header">

                    <h1>
                        ${escapeHTML(post.title)}
                    </h1>

                    <p class="cms-description">
                        ${escapeHTML(post.description)}
                    </p>

                    <p class="cms-date">
                        Publicado em ${escapeHTML(post.date)}
                    </p>

                </header>


                <!-- IMAGEM DE CAPA -->
                <img
                    class="cms-cover"
                    src="${escapeHTML(getImageUrl(post.image))}"
                    alt="${escapeHTML(post.title)}"
                >


                <!-- CONTEÚDO PRINCIPAL -->
                <div class="cms-body">
                    ${safeBody}
                </div>


                <!-- PERGUNTAS FREQUENTES -->
                ${faqHTML}

                <!-- FONTES E REFERÊNCIAS -->
                ${sourcesHTML}

            </article>

        `;

    } catch (error) {

        console.error("Erro ao abrir artigo:", error);

        container.innerHTML =
            "<p>Não foi possível carregar este artigo.</p>";
    }
}


/* =========================================
   INICIALIZAÇÃO DO SISTEMA
   ========================================= */

/*
   Executa as funções depois que o HTML estiver
   carregado, verificando automaticamente quais
   elementos existem em cada página.
*/

document.addEventListener("DOMContentLoaded", () => {

    loadRecentPosts();

    loadAllPosts();

    loadSinglePost();

});
