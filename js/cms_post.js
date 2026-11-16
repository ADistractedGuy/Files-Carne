
/* =========================================
   FILES&CARNE - INTEGRAÇÃO COM PAGES CMS
========================================= */

const CMS_CONFIG = {
    api: "https://api.github.com/repos/ADistractedGuy/Files-Carne/contents/content/posts?ref=main",

    siteBase: "/Files-Carne/",

    articlePage: "pages/article.html"
};


/* Converte os caminhos das imagens em URLs */
function getImageUrl(path) {
    if (!path) return "";

    if (path.startsWith("http")) {
        return path;
    }

    return CMS_CONFIG.siteBase + path.replace(/^\/+/, "");
}


/* Evita inserir texto HTML diretamente */
function escapeHTML(value = "") {
    return String(value).replace(/[&<>"']/g, char => ({
        "&": "&amp;",
        "<": "&lt;",
        ">": "&gt;",
        '"': "&quot;",
        "'": "&#039;"
    })[char]);
}


/* Lê os campos do arquivo Markdown */
function parsePost(content, filename) {
    const match = content.match(
        /^---\s*([\s\S]*?)\s*---\s*([\s\S]*)$/
    );

    if (!match) return null;

    const frontmatter = match[1];
    const body = match[2];

    function getField(name) {
        const regex = new RegExp(
            "^" + name + ":\\s*(.*)$",
            "m"
        );

        const result = frontmatter.match(regex);

        return result
            ? result[1].trim().replace(/^['"]|['"]$/g, "")
            : "";
    }

    return {
        slug: filename.replace(/\.md$/i, ""),
        title: getField("title"),
        description: getField("description"),
        date: getField("date"),
        image: getField("image"),
        body
    };
}


/* Busca as publicações no GitHub */
async function getPosts() {
    const response = await fetch(CMS_CONFIG.api);

    if (!response.ok) {
        throw new Error("Não foi possível acessar as publicações.");
    }

    const files = await response.json();

    const markdownFiles = files.filter(file =>
        file.type === "file" &&
        file.name.endsWith(".md")
    );

    const posts = await Promise.all(
        markdownFiles.map(async file => {
            const response = await fetch(file.download_url);

            if (!response.ok) return null;

            const content = await response.text();

            return parsePost(content, file.name);
        })
    );

    return posts
        .filter(post =>
            post &&
            post.title &&
            post.description &&
            post.image
        )
        .sort((a, b) =>
            new Date(b.date) - new Date(a.date)
        );
}


/* Cria um card de publicação */
function createPostCard(post) {
    const articleUrl =
        CMS_CONFIG.siteBase +
        CMS_CONFIG.articlePage +
        "?slug=" +
        encodeURIComponent(post.slug);

    return `
        <article class="post">

            <a href="${articleUrl}">

                <img
                    class="img_post"
                    src="${escapeHTML(getImageUrl(post.image))}"
                    alt="${escapeHTML(post.title)}"
                    loading="lazy"
                >

                <h2 class="pixelify-sans-400">
                    ${escapeHTML(post.title)}
                </h2>

                <p>
                    ${escapeHTML(post.description)}
                </p>

            </a>

        </article>
    `;
}


/* Preenche os cards da página inicial */
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
            container.innerHTML = "<p>Nenhuma publicação disponível.</p>";
        }

    } catch (error) {
        console.error("Erro ao carregar posts:", error);

        container.innerHTML =
            "<p>Não foi possível carregar as publicações.</p>";
    }
}


/* Preenche o arquivo completo de publicações */
async function loadAllPosts() {
    const container = document.getElementById("posts-list");

    if (!container) return;

    try {
        const posts = await getPosts();

        container.innerHTML = posts
            .map(createPostCard)
            .join("");

        if (posts.length === 0) {
            container.innerHTML = "<p>Nenhuma publicação encontrada.</p>";
        }

    } catch (error) {
        console.error("Erro ao carregar publicações:", error);

        container.innerHTML =
            "<p>Não foi possível carregar as publicações.</p>";
    }
}


/* Abre uma publicação individual */
async function loadSinglePost() {
    const container = document.getElementById("article-content");

    if (!container) return;

    const slug = new URLSearchParams(
        window.location.search
    ).get("slug");

    if (!slug) {
        container.innerHTML = "<p>Publicação não encontrada.</p>";
        return;
    }

    try {
        const posts = await getPosts();

        const post = posts.find(item => item.slug === slug);

        if (!post) {
            container.innerHTML =
                "<p>Esta publicação não foi encontrada.</p>";
            return;
        }

        document.title = post.title + " | Files&Carne";

        const safeBody = DOMPurify.sanitize(
            marked.parse(post.body)
        );

        container.innerHTML = `
            <article class="cms-article">

                <img
                    class="cms-cover"
                    src="${escapeHTML(getImageUrl(post.image))}"
                    alt="${escapeHTML(post.title)}"
                >

                <h1>${escapeHTML(post.title)}</h1>

                <p class="cms-description">
                    ${escapeHTML(post.description)}
                </p>

                <p class="cms-date">
                    Publicado em ${escapeHTML(post.date)}
                </p>

                <div class="cms-body">
                    ${safeBody}
                </div>

            </article>
        `;

    } catch (error) {
        console.error("Erro ao abrir artigo:", error);

        container.innerHTML =
            "<p>Não foi possível carregar este artigo.</p>";
    }
}


/* Inicialização */
document.addEventListener("DOMContentLoaded", () => {
    loadRecentPosts();
    loadAllPosts();
    loadSinglePost();
});
