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
            setTimeout(() => {
                let botResponse = "";

                if (step === 0) {
                    equipamentoUsuario = messageText; // Salva o nome do equipamento (ex: notebook)
                    botResponse = "Certo. Agora me explique com o máximo de detalhes: o que está acontecendo com este aparelho? (Ex: não liga, tela preta, muito lento, internet cai...)";
                    step++;
                } 
                else if (step === 1) {
                    // O CÉREBRO DA IA: Procurando palavras-chave
                    let diagnostico = "";

                    if (messageText.includes("tela") || messageText.includes("quebrad") || messageText.includes("caiu")) {
                        diagnostico = "Possível dano físico no display ou cabo flat desconectado.";
                    } else if (messageText.includes("lento") || messageText.includes("trava") || messageText.includes("vírus")) {
                        diagnostico = "Alta probabilidade de infecção por malware ou sistema operacional sobrecarregado/corrompido.";
                    } else if (messageText.includes("liga") || messageText.includes("bateria") || messageText.includes("energia")) {
                        diagnostico = "Falha no sistema de alimentação. Pode ser a fonte, bateria viciada ou curto na placa-mãe.";
                    } else if (messageText.includes("internet") || messageText.includes("wifi") || messageText.includes("rede")) {
                        diagnostico = "Problema de conectividade. Pode ser falha no adaptador de rede ou configurações de DNS.";
                    } else {
                        diagnostico = "Falha genérica identificada. Necessária análise física para determinar a causa exata.";
                    }

                    // Monta o Laudo Final com o Botão de Copiar
                    botResponse = `Analisando os sintomas... ⏳<br><br>
                    <strong>📋 LAUDO TÉCNICO PRELIMINAR:</strong><br>
                    <div id="textoLaudo" class="p-3 my-2 bg-white border rounded shadow-sm text-dark">
                        <strong>Aparelho:</strong> ${equipamentoUsuario.toUpperCase()}<br>
                        <strong>Sintoma relatado:</strong> ${messageText}<br>
                        <strong>Análise da IA:</strong> ${diagnostico}
                    </div>
                    <button class="btn btn-sm btn-success mb-3" onclick="copiarLaudo()">📋 Copiar Laudo</button><br>
                    Prontinho! Agora é só clicar no botão acima para copiar e colar lá no nosso formulário de <strong>Abrir Chamado</strong>.`;
                    
                    step++; //finaliza o fluxo
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
        