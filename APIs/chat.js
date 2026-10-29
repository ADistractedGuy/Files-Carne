// api/chat.js
import { GoogleGenAI } from "@google/genai";

export default async function handler(req, res) {
  // 1. Configura as permissões para o seu site do GitHub acessar este backend
  res.setHeader('Access-Control-Allow-Origin', 'https://github.io');
  res.setHeader('Access-Control-Allow-Methods', 'POST');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') return res.status(200).end();
  if (req.method !== 'POST') return res.status(405).json({ error: 'Método não permitido' });

  try {
    const { mensagemUsuario } = req.body;

    // 2. Inicializa o Gemini usando a chave salva com segurança nas variáveis de ambiente da Vercel
    const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });
    
    // 3. Faz a chamada ao modelo definindo o System Instruction para focar apenas em Gastronomia
    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: mensagemUsuario,
      config: {
        systemInstruction: "Você é um assistente estritamente gastronômico. Recuse educadamente qualquer outro tema.",
      }
    });

    return res.status(200).json({ resposta: response.text });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
}