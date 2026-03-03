type="module"
        import { initializeApp } from "https://www.gstatic.com/firebasejs/10.8.1/firebase-app.js";
        import { getAuth, createUserWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/10.8.1/firebase-auth.js";

        // --- COLE A SUA CONFIGURAÇÃO AQUI ---
        const firebaseConfig = {
            apiKey: "AIzaSyD1M0lzF2IgXYZttiyzJib9wTZgyw3Mzv4",
            authDomain: "techassist-4ea7f.firebaseapp.com",
            projectId: "techassist-4ea7f",
            storageBucket: "techassist-4ea7f.firebasestorage.app",
            messagingSenderId: "612558349071",
            appId: "1:612558349071:web:f645ae8537162cf51d547a"
        };
        // ------------------------------------

        const app = initializeApp(firebaseConfig);
        const auth = getAuth(app);

        const btnCadastrar = document.getElementById("btnCadastrar");

        btnCadastrar.addEventListener("click", async () => {
            const email = document.getElementById("emailCadastro").value;
            const senha = document.getElementById("senhaCadastro").value;

            if(!email || senha.length < 6) {
                alert("Preencha o e-mail e use uma senha de pelo menos 6 caracteres.");
                return;
            }

            try {
                btnCadastrar.innerText = "Criando conta... ⏳";
                await createUserWithEmailAndPassword(auth, email, senha);
                
                alert("✅ Conta criada com sucesso! Redirecionando para o Login...");
                
                // Mágica: Após criar a conta, joga o cliente automaticamente para a tela de login!
                window.location.href = "login.html"; 
                
            } catch (erro) {
                console.error(erro);
                alert("❌ Erro ao criar conta. Esse e-mail já pode estar em uso ou é inválido.");
                btnCadastrar.innerText = "Cadastrar";
            }
        });
