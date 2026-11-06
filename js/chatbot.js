// Endereço da API do ButcherBot
const API_URL = "https://butcherbot.vercel.app/api/chat";

// Histórico temporário da conversa
let historicoConversa = [];

// ========================================
// 1. CAPTURA DOS ELEMENTOS HTML
// ========================================

const chatbot = document.querySelector(".chatbot");
const chatMessages = document.getElementById("chat-messages");
const chatForm = document.getElementById("chat-form");
const chatInput = document.getElementById("chat-input");
const chatSend = document.getElementById("chat-send");
const openChat = document.getElementById("open-chat");
const closeChat = document.getElementById("close-chat");

// Verifica se os elementos necessários existem
if (
    !chatbot ||
    !chatMessages ||
    !chatForm ||
    !chatInput ||
    !chatSend ||
    !openChat ||
    !closeChat
) {
    console.error("ButcherBot: não foi possível encontrar todos os elementos HTML.");
} else {

    // ========================================
    // 2. ABRIR E FECHAR O CHATBOT
    // ========================================

    // Abre o chatbot com animação
    openChat.addEventListener("click", () => {
        chatbot.classList.remove("is-hidden");

        chatInput.focus();
    });

    // Fecha o chatbot com animação
    closeChat.addEventListener("click", () => {
        chatbot.classList.add("is-hidden");

        openChat.focus();
    });

    // ========================================
    // 3. ADICIONAR MENSAGENS À CONVERSA
    // ========================================

    function adicionarMensagem(texto, tipo) {

        const mensagem = document.createElement("div");
        mensagem.classList.add("chat-message", tipo);
    
        const conteudo = document.createElement("div");
    
        if (tipo === "bot-message") {
    
            if (typeof marked !== "undefined" &&
                typeof DOMPurify !== "undefined") {
    
                const html = marked.parse(texto || "");
    
                conteudo.innerHTML = DOMPurify.sanitize(html);
    
            } else {
                console.error("Marked ou DOMPurify não foi carregado.");
                conteudo.textContent = texto;
            }
    
        } else {
            conteudo.textContent = texto;
        }
    
        mensagem.appendChild(conteudo);
        chatMessages.appendChild(mensagem);
    
        chatMessages.scrollTop = chatMessages.scrollHeight;
    }

    // ========================================
    // 4. EXIBIR FONTES DA RESPOSTA
    // ========================================

    function adicionarFontes(fontes) {

        // Verifica se existem fontes
        if (!Array.isArray(fontes) || fontes.length === 0) {
            return;
        }

        // Cria o contêiner das referências
        const areaFontes = document.createElement("div");

        areaFontes.classList.add("chat-sources");

        const titulo = document.createElement("p");

        titulo.textContent = "Fontes consultadas:";

        areaFontes.appendChild(titulo);

        // Cria um link para cada fonte
        fontes.forEach((fonte) => {

            if (!fonte.url) {
                return;
            }

            try {
                const url = new URL(fonte.url);

                // Aceita somente links HTTP e HTTPS
                if (!["https:", "http:"].includes(url.protocol)) {
                    return;
                }

                const link = document.createElement("a");

                link.href = url.href;
                link.textContent = fonte.titulo || url.hostname;
                link.target = "_blank";
                link.rel = "noopener noreferrer";

                areaFontes.appendChild(link);

            } catch (erro) {
                console.warn("ButcherBot: URL de fonte inválida.", fonte.url);
            }
        });

        // Só adiciona a área se houver links
        if (areaFontes.querySelector("a")) {
            chatMessages.appendChild(areaFontes);
            chatMessages.scrollTop = chatMessages.scrollHeight;
        }
    }

    // ========================================
    // 5. ENVIAR PERGUNTAS PARA A API
    // ========================================

    chatForm.addEventListener("submit", async (evento) => {

        evento.preventDefault();

        const mensagemUsuario = chatInput.value.trim();

        // Não envia mensagens vazias
        if (!mensagemUsuario) {
            return;
        }

        // Exibe a pergunta do visitante
        adicionarMensagem(mensagemUsuario, "user-message");

        // Registra a pergunta no histórico
        historicoConversa.push({
            role: "user",
            content: mensagemUsuario
        });

        // Mantém somente as últimas 20 mensagens
        historicoConversa = historicoConversa.slice(-20);

        // Limpa o campo
        chatInput.value = "";

        // Evita vários envios simultâneos
        chatSend.disabled = true;
        chatInput.disabled = true;

        // Indicador de carregamento
        adicionarMensagem("Pensando...", "typing-message");

        try {

            // Envia a pergunta para o backend
            const respostaAPI = await fetch(API_URL, {

                method: "POST",

                headers: {
                    "Content-Type": "application/json"
                },

                body: JSON.stringify({
                    mensagemUsuario,
                    historico: historicoConversa
                })

            });

            // Converte a resposta para JSON
            const dados = await respostaAPI.json();

            // Verifica se a requisição foi bem-sucedida
            if (!respostaAPI.ok) {
                throw new Error(
                    dados.error || "Não foi possível consultar o ButcherBot."
                );
            }

            // Verifica se o backend retornou uma resposta
            if (
                typeof dados.resposta !== "string" ||
                dados.resposta.trim() === ""
            ) {
                throw new Error("A API não retornou uma resposta válida.");
            }

            // Remove o indicador de carregamento
            const indicador = chatMessages.querySelector(".typing-message");

            if (indicador) {
                indicador.remove();
            }

            // Exibe a resposta do ButcherBot
            adicionarMensagem(dados.resposta, "bot-message");

            // Exibe as fontes utilizadas
            adicionarFontes(dados.fontes);

            // Registra a resposta no histórico
            historicoConversa.push({
                role: "assistant",
                content: dados.resposta
            });

            // Mantém somente as últimas 20 mensagens
            historicoConversa = historicoConversa.slice(-20);

        } catch (erro) {

            console.error("Erro ao conversar com o ButcherBot:", erro);

            // Remove o indicador de carregamento
            const indicador = chatMessages.querySelector(".typing-message");

            if (indicador) {
                indicador.remove();
            }

            // Exibe uma mensagem de erro
            adicionarMensagem(
                "Desculpe, não consegui responder agora. Tente novamente.",
                "bot-message"
            );

        } finally {

            // Libera o formulário novamente
            chatSend.disabled = false;
            chatInput.disabled = false;

            chatInput.focus();
        }

    });

}
