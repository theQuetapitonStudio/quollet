const API =
    "https://cjccmeaosxnauhzeleuj.supabase.co/functions/v1/buy-item";

const modal = document.getElementById("modal");
const modalTitle = document.getElementById("modalTitle");

const discordInput = document.getElementById("discordId");
const passwordInput = document.getElementById("password");

const confirmBtn = document.getElementById("confirmBtn");
const cancelBtn = document.getElementById("cancelBtn");

const result = document.getElementById("result");

let productId = null;


// Abrir compra
document.querySelectorAll(".buy-btn").forEach(button => {

    button.addEventListener("click", () => {

        productId = button.getAttribute("data-product-id");

        modalTitle.textContent =
            `Comprar ${button.getAttribute("data-product-name")}`;

        discordInput.value = "";
        passwordInput.value = "";
        result.textContent = "";

        modal.style.display = "flex";
    });

});


// Cancelar
cancelBtn.addEventListener("click", () => {
    modal.style.display = "none";
});


// Comprar
confirmBtn.addEventListener("click", async () => {

    const discord_id = discordInput.value.trim();
    const password = passwordInput.value;

    if (productId === null || productId === "") {
        result.textContent = "Produto inválido.";
        return;
    }

    if (discord_id === "") {
        result.textContent = "Digite seu Discord ID.";
        return;
    }

    if (password === "") {
        result.textContent = "Digite sua senha.";
        return;
    }

    const dados = {
        product_id: productId,
        password: password,
        discord_id: discord_id
    };

    console.log("ENVIANDO:", JSON.stringify(dados));

    confirmBtn.disabled = true;
    confirmBtn.textContent = "Comprando...";

    try {

        const response = await fetch(API, {
            method: "POST",

            headers: {
                "Content-Type": "application/json"
            },

            body: JSON.stringify(dados)
        });

        const texto = await response.text();

        console.log("STATUS:", response.status);
        console.log("RESPOSTA:", texto);

        result.textContent = texto;

    } catch (error) {

        console.error(error);

        result.textContent =
            "Erro de conexão com o Shop.";

    } finally {

        confirmBtn.disabled = false;
        confirmBtn.textContent = "Confirmar compra";
    }
});