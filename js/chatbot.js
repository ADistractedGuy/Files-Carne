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


// ========================================
// 2. ABRIR E FECHAR O CHATBOT
// ========================================

// Abre a janela
openChat.addEventListener("click", () => {
    chatbot.classList.remove("is-hidden");

    chatInput.focus();
});

// Fecha a janela
closeChat.addEventListener("click", () => {
    chatbot.classList.add("is-hidden");

    openChat.focus();
});

// ========================================
// 3. ADICIONAR MENSAGENS À CONVERSA
// ========================================

function adicionarMensagem(texto, tipo) {

    // Cria um novo elemento HTML
    const mensagem = document.createElement("div");

    // Define as classes da mensagem
    mensagem.classList.add("chat-message");

    mensagem.classList.add(tipo);

    // Cria o parágrafo
    const paragrafo = document.createElement("p");

    // Insere o texto com segurança
    paragrafo.textContent = texto;

    // Coloca o parágrafo dentro da mensagem
    mensagem.appendChild(paragrafo);

    // Adiciona a mensagem na conversa
    chatMessages.appendChild(mensagem);

    // Rola a conversa até a última mensagem
    chatMessages.scrollTop = chatMessages.scrollHeight;
}


// ========================================
// 4. ENVIAR PERGUNTAS PARA A API
// ========================================

chatForm.addEventListener("submit", async (evento) => {

    evento.preventDefault();

    const mensagemUsuario = chatInput.value.trim();

    // Registra a mensagem do usuário no histórico
    historicoConversa.push({
        role: "user",
        content: mensagemUsuario
    });

    if (!mensagemUsuario) {
        return;
    }

    // Exibe a pergunta do visitante
    adicionarMensagem(mensagemUsuario, "user-message");

    // Registra a resposta do ButcherBot no histórico
    historicoConversa.push({
        role: "assistant",
        content: dados.resposta
    });

    // Mantém somente as últimas 20 mensagens
    if (historicoConversa.length > 20) {
        historicoConversa = historicoConversa.slice(-20);
    }

    // Limpa o campo
    chatInput.value = "";

    // Evita vários envios simultâneos
    chatSend.disabled = true;
    chatInput.disabled = true;

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

        // Verifica se a requisição foi bem-sucedida
        if (!respostaAPI.ok) {
            throw new Error("Não foi possível consultar o ButcherBot.");
        }

        // Converte a resposta para JSON
        const dados = await respostaAPI.json();

        // Exibe a resposta do ButcherBot
        adicionarMensagem(dados.resposta, "bot-message");
        adicionarFontes(dados.fontes);

    } catch (erro) {

        console.error("Erro ao conversar com o ButcherBot:", erro);

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


// ========================================
// 5. EXIBIR FONTES DA RESPOSTA
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

    });

    chatMessages.appendChild(areaFontes);

    chatMessages.scrollTop = chatMessages.scrollHeight;
}