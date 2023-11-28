import "./_toast.scss";

function clearToasts() {
    const alertMessages = document.getElementById("app");
    if (!alertMessages) return;
    const alert = alertMessages.querySelector(".alert");
    if (!alert) return;
    alert.classList.add("close");
    setTimeout(() => {
        alert.remove();
    }, 1000);
}

const toast = {
    success: (text: string) => {
        const alertMessages = document.getElementById("app");
        if (!alertMessages) return;
        alertMessages.innerHTML += `<div class="alert alert-success"><button></button> <h1>${text}</h1></div>`;
        const alert = alertMessages.querySelector(".alert");
        if (!alert) return;
        alert.querySelector("button")?.addEventListener("click", clearToasts);
        setTimeout(clearToasts, 3000);
    },
    error: (text: string) => {
        const alertMessages = document.getElementById("app");
        if (!alertMessages) return;
        alertMessages.innerHTML += `<div class="alert alert-error"><button></button> <h1>${text}</h1></div>`;
        const alert = alertMessages.querySelector(".alert");
        if (!alert) return;
        alert.querySelector("button")?.addEventListener("click", clearToasts);
        setTimeout(clearToasts, 3000);
    },
    draw: (text: string) => {
        const alertMessages = document.getElementById("app");
        if (!alertMessages) return;
        alertMessages.innerHTML += `<div class="alert alert-draw"><button></button> <h1>${text}</h1></div>`;
        const alert = alertMessages.querySelector(".alert");
        if (!alert) return;
        alert.querySelector("button")?.addEventListener("click", clearToasts);
        setTimeout(clearToasts, 3000);
    },
};

export { toast, clearToasts };
