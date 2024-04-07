URL = "http://127.0.0.1:5000"

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
    onLoad()
    const inputField = document.getElementById("messageInput");
    inputField.addEventListener("keydown", (e) => {
        if (e.code === "Enter" && inputField.value) {
            let input = inputField.value;
            inputField.value = "";
            output(input);
        }
    });
});

// TODO: Add response logic
async function output(input) {
    const decoder = new TextDecoder();
    const response = fetch(URL + "/api/generate?query=" + input + "&target=embeddings.ovtech-gobusiness-main");

    addChat(input, decoder, response);
}

chatLog = [];

function onLoad() {
    addChat("Hello!", null, "Welcome to WTS\' chatbot! How can I help you?");
}

async function addChat(input, decoder, response) {
    const messagesContainer = document.getElementById("messages");

    let userDiv = document.createElement("div");
    userDiv.id = "user";
    userDiv.innerHTML = `
    <article class="message m-5 is-primary" style="animation: fadeIn 2s;" >
        <div class="message-body" style="display: flex; align-items: center; background-color: lightgray">
            <img src="https://cdn-icons-png.freepik.com/512/64/64572.png?ga=GA1.1.334113719.1712415648&" class="avatar" alt="User's profile picture" style="width: 30px; height: 30px; margin-right: 10px;">
            <span class="subtitle is-6" style="flex: 1;"><strong>You</strong><br>${input}</span>
        </div>
    </article>
`;

    messagesContainer.appendChild(userDiv);
    let botDiv = document.createElement("div");
    botDiv.id = "bot";

    if (!decoder) {
        botDiv.innerHTML = `
        <article class="message m-5  is-link"  style="animation: fadeIn 2s;">
            <div class="message-body" style="display: flex; align-items: center; background-color: lightgray">
                <img src="../static/assets/chatbot.png" class="avatar" alt="Bot's profile picture" style="width: 30px; height: 30px; margin-right: 10px; border-radius: 50%">
                <span class="subtitle is-6" style="flex: 1;"><strong>Thomas</strong><br>${response}</span>
            </div>
        </article>
    `;
        messagesContainer.appendChild(botDiv);
    } else {
        botDiv.innerHTML = `
        <article class="message m-5  is-link"  style="animation: fadeIn 2s;">
            <div class="message-body" style="display: flex; align-items: center; background-color: lightgray">
                <img src="../static/assets/chatbot.png" class="avatar" alt="Bot's profile picture" style="width: 30px; height: 30px; margin-right: 10px; border-radius: 50%">
                <span class="subtitle is-6" style="flex: 1;" id="bot-output"><strong>Thomas</strong><br>Thinking...</span>
            </div>
        </article>
    `;
        messagesContainer.appendChild(botDiv);

        response = await response;

        let bot_output = document.getElementById("bot-output");
        let result = "";

        for await (const chunk of response.body) {
            result += decoder.decode(chunk, { stream: true });
            bot_output.innerText = result;
        }
    }

    chatLog.push({ user: input, bot: response });
    console.log(chatLog)

    messagesContainer.scrollTop = messagesContainer.scrollHeight - messagesContainer.clientHeight;
}

