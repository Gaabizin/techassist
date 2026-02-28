 function toggleChatbot() {
            const chatWindow = document.getElementById("chatbotWindow");
            if (chatWindow.style.display === "none" || chatWindow.style.display === "") {
                chatWindow.style.display = "block";
            } else {
                chatWindow.style.display = "none";
            }
        }