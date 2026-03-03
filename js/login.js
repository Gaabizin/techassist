        import { initializeApp } from "https://www.gstatic.com/firebasejs/10.8.1/firebase-app.js";
        // Importando as ferramentas de Senha e E-mail
        import { getAuth, signInWithEmailAndPassword, createUserWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/10.8.1/firebase-auth.js";

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

        // 👑 DEFINA AQUI O E-MAIL QUE TERÁ ACESSO AO PAINEL ADMIN
        const EMAIL_ADMIN = "gabrieldietrich98@gmail.com"; 

        const btnEntrar = document.getElementById("btnEntrar");

        // LÓGICA 2: ENTRAR E VERIFICAR QUEM É
        btnEntrar.addEventListener("click", async () => {
            const email = document.getElementById("emailLogin").value;
            const senha = document.getElementById("senhaLogin").value;

            try {
                btnEntrar.innerText = "Verificando...";
                await signInWithEmailAndPassword(auth, email, senha);
                
                // O GRANDE TRUQUE DO REDIRECIONAMENTO:
                if (email === EMAIL_ADMIN) {
                    // É o dono! Vai para o painel secreto.
                    window.location.href = "admin.html";
                } else {
                    // É um cliente normal! Volta para a Home (ou futura área do cliente).
                    alert("Bem-vindo(a)! Login de cliente efetuado.");
                    window.location.href = "index.html"; 
                }

            } catch (erro) {
                console.error(erro);
                alert("❌ Senha incorreta ou conta não existe.");
                btnEntrar.innerText = "Entrar";
            }
        });