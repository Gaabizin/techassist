// --- MOTOR DE INTELIGÊNCIA ARTIFICIAL (DEEPSEEK) ---
const DEEPSEEK_API_KEY = "sk-51740ce8f16e43bab838f0a283f54487"; 

async function perguntarAoDeepSeek(equipamento, problemaRelatado) {
    const url = "https://api.deepseek.com/chat/completions";
    const instrucoesSistema = `Você é o T.A.R.S., um assistente técnico de TI sênior. O usuário vai te falar um equipamento e um sintoma. Sua missão é dar um diagnóstico curto, direto e profissional do que pode estar quebrado, em no máximo 3 frases.`;

    try {
        const resposta = await fetch(url, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${DEEPSEEK_API_KEY}`
            },
            body: JSON.stringify({
                model: "deepseek-chat",
                messages: [
                    { role: "system", content: instrucoesSistema },
                    { role: "user", content: `Equipamento: ${equipamento}. Problema: ${problemaRelatado}` }
                ],
                temperature: 0.7
            })
        });
        const dados = await resposta.json();
        return dados.choices[0].message.content;
    } catch (erro) {
        console.error(erro);
        return "Falha de conexão com os servidores centrais. Possível falha grave de hardware ou corrupção de sistema operacional.";
    }
}
// ---------------------------------------------------
let step = 0;
        let equipamentoUsuario = "";

        function sendMessage() {
            const inputField = document.getElementById("userInput");
            const messageText = inputField.value.trim().toLowerCase(); // Transforma tudo em minúscula para facilitar a busca
            const chatBox = document.getElementById("chatBox");

            if (messageText === "") return;

            // Mostra a mensagem do usuário
            chatBox.innerHTML += `<div class="message message-user">${inputField.value}</div>`;
            inputField.value = "";
            chatBox.scrollTop = chatBox.scrollHeight;

            // Simula o tempo de digitação do robô
            setTimeout(async () => {
                let botResponse = "";

                if (step === 0) {
                    equipamentoUsuario = messageText; // Salva o nome do equipamento (ex: notebook)
                    botResponse = "Certo. Agora me explique com o máximo de detalhes: o que está acontecendo com este aparelho? (Ex: não liga, tela preta, muito lento, internet cai...)";
                    step++;
                } 
                else if (step === 1) {
                    // 1. Coloca uma mensagem na tela para o cliente saber que a IA está pensando
                    chatBox.innerHTML += `<div class="message message-bot" id="msgCarregando">Analisando os sintomas nas nuvens do DeepSeek... ⏳</div>`;
                    chatBox.scrollTop = chatBox.scrollHeight;

                    // 2. O CÉREBRO DA IA: Chama o DeepSeek de verdade (pode demorar uns 2 segundos)
                    let diagnostico = await perguntarAoDeepSeek(equipamentoUsuario, messageText);

                    // 3. Apaga a mensagem de "carregando"
                    const loading = document.getElementById("msgCarregando");
                if(loading) loading.remove();

                    // 4. Monta o Laudo Final (Mantendo o seu design intacto!)
                    botResponse = `<strong>📋 LAUDO TÉCNICO PRELIMINAR (Gerado por IA):</strong><br>
                    <div id="textoLaudo" class="p-3 my-2 bg-white border rounded shadow-sm text-dark">
                    <strong>Aparelho:</strong> ${equipamentoUsuario.toUpperCase()}<br>
                    <strong>Sintoma relatado:</strong> ${messageText}<br>
                    <strong>Análise da IA:</strong> ${diagnostico}
                    </div>
                    <div class="d-flex gap-2 mb-3 mt-2">
                    <button class="btn btn-sm btn-success" onclick="copiarLaudo()">📋 1. Copiar Laudo</button>
                    <a href="formulario.html" class="btn btn-sm btn-primary">🚀 2. Ir para o Formulário</a>
                    </div>
                    Prontinho! Copie o laudo e clique no botão azul para ir direto para o <strong>Formulário de Chamado</strong>.`;

                    step++; // finaliza o fluxo
                }
                else {
                    botResponse = "Meu diagnóstico preliminar já foi concluído. Por favor, acesse a aba 'Home' e abra um chamado com os nossos especialistas!";
                }

                // Imprime a resposta da IA
                chatBox.innerHTML += `<div class="message message-bot">${botResponse}</div>`;
                chatBox.scrollTop = chatBox.scrollHeight;

            }, 1200); // 1.2 segundos de "pensamento"
        }

        function handleKeyPress(event) {
            if (event.key === "Enter") {
                sendMessage();
            }
        }

        // Função para copiar o laudo para a área de transferência
        function copiarLaudo() {
            // Pega o texto que está dentro da caixinha do laudo
            const textoParaCopiar = document.getElementById("textoLaudo").innerText;
            
            // Usa a API do navegador para copiar
            navigator.clipboard.writeText(textoParaCopiar).then(() => {
                alert("✅ Laudo copiado com sucesso! Vá até a página de Abrir Chamado e cole na descrição do problema.");
            }).catch(err => {
                alert("Erro ao copiar o laudo. Por favor, selecione o texto e copie manualmente.");
            });
        }
        
        