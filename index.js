import { comprar } from "./compras/produtos.js"

const API =
    "https://cjccmeaosxnauhzeleuj.supabase.co/functions/v1"

// =========================
// CONTA SALVA
// =========================

let conta = JSON.parse(
    localStorage.getItem("qct_conta")
) || null


const mesc = document.getElementById("msc")


// =========================
// LOGIN
// =========================

const LS = {
    root: document.getElementById("login"),
    idi: document.getElementById("idE"),
    sei: document.getElementById("senhE"),
    cbtn: document.getElementById("cbtn1")
}


// =========================
// SIGNUP
// =========================

const SUP = {
    root: document.getElementById("signup"),
    idi: document.getElementById("idE2"),
    sei: document.getElementById("senhE2"),
    cbtn: document.getElementById("cbtn2")
}


// =========================
// BOTÕES
// =========================

const signupbtn =
    document.getElementById("signupbtn")

const loginbtn =
    document.getElementById("loginbtn")


// =========================
// ATUALIZAR TELA
// =========================

function atualizarTela() {

    if (conta) {

        // Tem conta:
        // esconde login/signup
        // mostra msc

        LS.root.style.display = "none"
        SUP.root.style.display = "none"

        if (mesc) {
            mesc.style.display = "block"
        }

    } else {

        // Não tem conta:
        // mostra login
        // esconde signup e msc

        LS.root.style.display = "block"
        SUP.root.style.display = "none"

        if (mesc) {
            mesc.style.display = "none"
        }

    }

}


// =========================
// IR PARA SIGNUP
// =========================

signupbtn.addEventListener("click", () => {

    LS.root.style.display = "none"
    SUP.root.style.display = "block"

})


// =========================
// VOLTAR PARA LOGIN
// =========================

loginbtn.addEventListener("click", () => {

    SUP.root.style.display = "none"
    LS.root.style.display = "block"

})


// =========================
// SIGNUP
// =========================

SUP.cbtn.addEventListener("click", async () => {

    try {

        const discord_id =
            SUP.idi.value.trim()

        const password =
            SUP.sei.value


        if (!discord_id || !password) {
            alert("Preencha tudo.")
            return
        }


        const resposta = await fetch(
            `${API}/logup`,
            {
                method: "POST",

                headers: {
                    "Content-Type": "application/json"
                },

                body: JSON.stringify({
                    action: "signup",
                    discord_id,
                    password
                })
            }
        )


        const data =
            await resposta.json()


        if (!data.success) {

            alert(
                "ERRO: " +
                (data.error || "Erro desconhecido")
            )

            return
        }


        conta = data.usuario


        localStorage.setItem(
            "qct_conta",
            JSON.stringify(conta)
        )


        alert("Wallet criada!")


        atualizarTela()
        atualizarSaldo()


    } catch (erro) {

        console.error(erro)

        alert(
            "Erro ao conectar com o servidor."
        )

    }

})


// =========================
// LOGIN
// =========================

LS.cbtn.addEventListener("click", async () => {

    try {

        const discord_id =
            LS.idi.value.trim()

        const password =
            LS.sei.value


        if (!discord_id || !password) {
            alert("Preencha tudo.")
            return
        }


        const resposta = await fetch(
            `${API}/logup`,
            {
                method: "POST",

                headers: {
                    "Content-Type": "application/json"
                },

                body: JSON.stringify({
                    action: "login",
                    discord_id,
                    password
                })
            }
        )


        const data =
            await resposta.json()


        if (!data.success) {

            alert(
                "ERRO: " +
                (data.error || "Login inválido")
            )

            return
        }


        conta = data.usuario


        localStorage.setItem(
            "qct_conta",
            JSON.stringify(conta)
        )


        alert(
            "Login realizado como " +
            conta.username
        )


        // Mostra a área da conta
        atualizarTela()

        atualizarSaldo()


    } catch (erro) {

        console.error(erro)

        alert(
            "Erro ao conectar com o servidor."
        )

    }

})

// =========================
// PEGAR INFORMAÇÕES
// =========================

async function pegarSaldo(discord_id) {

    const resposta = await fetch(
        `${API}/getInfo?discord_id=${encodeURIComponent(discord_id)}`
    )

    return await resposta.json()

}


// =========================
// ATUALIZAR SALDO
// =========================

async function atualizarSaldo() {

    if (!conta) {
        return
    }


    try {
        const welcometxt = document.getElementById("wmsg")
        const info =
            await pegarSaldo(conta.discord_id)


        if (!info.success) {

            console.error(info.error)

            return
        }


        conta = info.usuario

        localStorage.setItem(
            "qct_conta",
            JSON.stringify(conta)
        )


        const stxt =
            document.getElementById("stxt")


        if (stxt) {

            stxt.innerHTML =
                `Seu saldo: ${conta.saldo} QUENOKY-BASE<br>${conta.saldo_unayky} QUENOKY_UNAUKY`

        }

        if (welcometxt) {
            welcometxt.innerHTML = `
            Olá <span style="color: red">${conta.username}</span>! Seja bem vindo a sua Wallet <i>Quollet</i>`
        }

    } catch (erro) {

        console.error(
            "Erro ao atualizar saldo:",
            erro
        )

    }

}


// =========================
// ATUALIZA A CADA 5 SEGUNDOS
// =========================

setInterval(
    atualizarSaldo,
    5000
)


// =========================
// INICIALIZA
// =========================

atualizarTela()

if (conta) {
    atualizarSaldo()
}