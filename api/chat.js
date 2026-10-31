
import { GoogleGenAI } from "@google/genai";

// Endereço autorizado do site Files&Carne
const ORIGEM_PERMITIDA = "https://adistractedguy.github.io";

export default async function handler(req, res) {
    // 1. Configuração do CORS
    const origem = req.headers.origin;

    res.setHeader("Vary", "Origin");
    res.setHeader("Access-Control-Allow-Methods", "POST, OPTIONS");
    res.setHeader("Access-Control-Allow-Headers", "Content-Type");

    // Aceita somente requisições originadas do site
    if (origem !== ORIGEM_PERMITIDA) {
        return res.status(403).json({
            error: "Origem não autorizada."
        });
    }

    res.setHeader("Access-Control-Allow-Origin", ORIGEM_PERMITIDA);

    // 2. Responde à verificação inicial do navegador
    if (req.method === "OPTIONS") {
        return res.status(204).end();
    }

    // 3. Aceita somente POST
    if (req.method !== "POST") {
        return res.status(405).json({
            error: "Método não permitido."
        });
    }

    try {
        // 4. Verifica se a chave da API foi configurada
        if (!process.env.GEMINI_API_KEY) {
            console.error("GEMINI_API_KEY não configurada.");

            return res.status(500).json({
                error: "Serviço temporariamente indisponível."
            });
        }

        // 5. Recebe e valida a mensagem
        const { mensagemUsuario } = req.body || {};

        if (
            typeof mensagemUsuario !== "string" ||
            mensagemUsuario.trim().length === 0
        ) {
            return res.status(400).json({
                error: "Envie uma mensagem válida."
            });
        }

        if (mensagemUsuario.length > 2000) {
            return res.status(400).json({
                error: "A mensagem ultrapassou o limite permitido."
            });
        }

        // 6. Inicializa o Gemini
        const ai = new GoogleGenAI({
            apiKey: process.env.GEMINI_API_KEY
        });
 // 7. Envia a mensagem ao Gemini com pesquisa externa habilitada
        const response = await ai.models.generateContent({
            model: "gemini-2.5-flash",
            contents: mensagemUsuario,

            config: {
                // Permite que o Gemini pesquise na internet quando necessário
                tools: [
                    {
                        googleSearch: {}
                    }
                ],

                // Define o comportamento e as fontes prioritárias do ButcherBot
                systemInstruction: `
                    Você é o ButcherBot, assistente virtual do Files&Carne.

                    Seu objetivo é ajudar os visitantes com assuntos relacionados
                    a carnes, cortes, preparo, conservação, qualidade e segurança alimentar.

                    FONTES DE CONHECIMENTO:

                    1. Utilize o conteúdo do Files&Carne quando ele for relevante.
                    2. Quando precisar complementar informações, utilize a pesquisa Google.
                    3. Dê prioridade a fontes confiáveis, especialmente:
                       - MAPA e ANVISA;
                       - Embrapa;
                       - Universidades e instituições de pesquisa;
                       - Publicações e estudos científicos;
                       - USDA e outros órgãos internacionais reconhecidos.

                    4. Avalie a credibilidade e a atualidade das fontes encontradas.
                    5. Não trate qualquer resultado de pesquisa como informação
                       automaticamente confiável.
                    6. Não invente informações, estudos, dados ou referências.

                    SOBRE AS RESPOSTAS:

                    - Responda em português brasileiro.
                    - Explique os assuntos de maneira clara e didática.
                    - Diferencie informações culinárias de orientações de
                      segurança alimentar.
                    - Quando não encontrar evidências confiáveis, informe isso.
                    - Quando utilizar informações externas, indique suas fontes.
                    - Não afirme que uma informação veio do Files&Carne se
                      ela foi obtida externamente.

                    LIMITES:

                    Responda somente sobre assuntos relacionados ao universo
                    das carnes e da alimentação.

                    Recuse educadamente perguntas que não tenham relação
                    com esse objetivo.
                `
            }
        });

        // 8. Recupera as fontes utilizadas na pesquisa
        const groundingChunks =
            response.candidates?.[0]?.groundingMetadata?.groundingChunks || [];

        const fontes = groundingChunks
            .filter(chunk => chunk.web?.uri)
            .map(chunk => ({
                titulo: chunk.web.title,
                url: chunk.web.uri
            }));

        // 9. Retorna a resposta e suas fontes ao site
        return res.status(200).json({
            resposta: response.text,
            fontes: fontes
        });
        
    } catch (error) {
        // Registra detalhes apenas nos logs do servidor
        console.error("Erro no ButcherBot:", error);

        return res.status(500).json({
            error: "Não foi possível gerar uma resposta. Tente novamente."
        });
    }
}
