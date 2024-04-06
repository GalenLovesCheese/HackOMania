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

// TODO
function output(input) {
    let response;

    response = "Balls"

    addChat(input, response);
}

function addChat(input, response) {
    const messagesContainer = document.getElementById("messages");

    let userDiv = document.createElement("div");
    userDiv.id = "user";
    userDiv.innerHTML = `
    <article class="message m-2">
        <div class="message-body" style="display: flex; align-items: center;">
            <img src="https://cdn-icons-png.freepik.com/512/64/64572.png?ga=GA1.1.334113719.1712415648&" class="avatar" alt="User's profile picture" style="width: 25px; height: 25px; margin-right: 10px;">
            <span style="flex: 1;">${input}</span>
        </div>
    </article>`;

    messagesContainer.appendChild(userDiv);

    messagesContainer.scrollTop = messagesContainer.scrollHeight - messagesContainer.clientHeight;
}