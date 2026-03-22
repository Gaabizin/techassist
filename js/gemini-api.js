// Usando a biblioteca oficial via CDN para funcionar direto no seu ia.html
import { GoogleGenerativeAI } from "https://esm.run/@google/generative-ai";

const API_KEY = "AIzaSyAuYTNqHwAe-5mCYMDkLbYygVpxg-grlmM"; // Coloque sua chave do AI Studio aqui
const genAI = new GoogleGenerativeAI(API_KEY);

export async function gerarDiagnostico(problema) {
    try {
        const model = genAI.getGenerativeModel({ model: "gemini-2.5-flash" });
        
        const prompt = `Você é o assistente virtual da TechAssist. 
        Um cliente relatou o seguinte problema técnico: "${problema}".
        Dê uma resposta curta, profissional e sugira um primeiro passo técnico.`;

        const result = await model.generateContent(prompt);
        const response = await result.response;
        return response.text();
    } catch (error) {
        console.error("Erro na IA:", error);
        return "Desculpe, estou com dificuldades técnica agora. Tente novamente em breve.";
    }
}