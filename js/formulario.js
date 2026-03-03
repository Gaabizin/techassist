type="module"
        // 1. Importar as ferramentas do Firebase (Direto dos servidores do Google)
        import { initializeApp } from "https://www.gstatic.com/firebasejs/10.8.1/firebase-app.js";
        import { getFirestore, collection, addDoc } from "https://www.gstatic.com/firebasejs/10.8.1/firebase-firestore.js";

        const firebaseConfig = {
            apiKey: "AIzaSyD1M0lzF2IgXYZttiyzJib9wTZgyw3Mzv4",
            authDomain: "techassist-4ea7f.firebaseapp.com",
            projectId: "techassist-4ea7f",
            storageBucket: "techassist-4ea7f.firebasestorage.app",
            messagingSenderId: "612558349071",
            appId: "1:612558349071:web:f645ae8537162cf51d547a"
        };

        // 3. Ligar o motor do banco de dados
        const app = initializeApp(firebaseConfig);
        const db = getFirestore(app);

        // 4. Lógica para capturar o clique no botão "Enviar"
        document.getElementById("formChamado").addEventListener("submit", async function(event) {
            event.preventDefault(); // Impede o ecrã de piscar e recarregar a página

            const btn = document.getElementById("btnEnviar");
            btn.innerHTML = "A enviar os dados de forma segura... ⏳";
            btn.disabled = true;

            try {
                // Vai buscar o que o cliente escreveu nas caixas de texto
                const nome = document.getElementById("nome").value;
                const email = document.getElementById("email").value;
                const equipamento = document.getElementById("equipamento").value;
                const problema = document.getElementById("problema").value;

                // Envia as informações para uma "gaveta" chamada "chamados" no Firebase
                const docRef = await addDoc(collection(db, "chamados"), {
                    nome: nome,
                    email: email,
                    equipamento: equipamento,
                    problema: problema,
                    data_envio: new Date().toLocaleString("pt-PT"),
                    status: "Pendente"
                });

                alert("✅ Sucesso! O seu chamado foi registado. Número do bilhete: " + docRef.id);
                document.getElementById("formChamado").reset(); // Limpa o formulário

            } catch (erro) {
                console.error("Erro ao gravar:", erro);
                alert("❌ Não foi possível abrir o chamado. Tente novamente.");
            } finally {
                btn.innerHTML = "Abrir Chamado na Nuvem ☁️";
                btn.disabled = false;
            }
        });
