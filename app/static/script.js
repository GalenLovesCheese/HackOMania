// Navbar burger menu toggle

document.addEventListener('DOMContentLoaded', () => {

    const $navbarBurgers = Array.prototype.slice.call(document.querySelectorAll('.navbar-burger'), 0);

    $navbarBurgers.forEach(el => {
        el.addEventListener('click', () => {

            const target = el.dataset.target;
            const $target = document.getElementById(target);

            el.classList.toggle('is-active');
            $target.classList.toggle('is-active');

        });
    });
});

// Chat

document.addEventListener("DOMContentLoaded", () => {
    const inputField = document.getElementById("messageInput");
    inputField.addEventListener("keydown", (e) => {
        if (e.code === "Enter" && inputField.value) {
            let input = inputField.value;
            inputField.value = "";
            output(input);
        }
    });
});

// TODO: Add
function output(input) {
    let response;

    response = "How can I help you?"

    addChat(input, response);
}

chatLog = [];

function addChat(input, response) {
    const messagesContainer = document.getElementById("messages");

    let userDiv = document.createElement("div");
    userDiv.id = "user";
    userDiv.innerHTML = `
    <article class="message m-5  is-primary" >
        <div class="message-body" style="display: flex; align-items: center; background-color: lightgray">
            <img src="https://cdn-icons-png.freepik.com/512/64/64572.png?ga=GA1.1.334113719.1712415648&" class="avatar" alt="User's profile picture" style="width: 30px; height: 30px; margin-right: 10px;">
            <span class="subtitle is-6" style="flex: 1;"><strong>You</strong><br>${input}</span>
        </div>
    </article>
`;

    messagesContainer.appendChild(userDiv);
    let botDiv = document.createElement("div");
    botDiv.id = "bot";

    botDiv.innerHTML = `
    <article class="message m-5  is-link" >
        <div class="message-body" style="display: flex; align-items: center; background-color: lightgray">
            <img src="../static/assets/chatbot.png" class="avatar" alt="Bot's profile picture" style="width: 30px; height: 30px; margin-right: 10px; border-radius: 50%">
            <span class="subtitle is-6" style="flex: 1;"><strong>Thomas</strong><br>${response}</span>
        </div>
    </article>
`;

    messagesContainer.appendChild(botDiv);
    chatLog.push({ user: input, bot: response });
    console.log(chatLog)

    messagesContainer.scrollTop = messagesContainer.scrollHeight - messagesContainer.clientHeight;
}