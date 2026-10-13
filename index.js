const API =
    "https://cjccmeaosxnauhzeleuj.supabase.co/functions/v1"
// =========================
// SAVED ACCOUNT
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
// BUTTONS
// =========================

const signupbtn =
    document.getElementById("signupbtn")

const loginbtn =
    document.getElementById("loginbtn")


// =========================
// UPDATE SCREEN
// =========================

if (conta) {
	mesc.style.display = "block"
} else {
	mesc.style.display = "none"
}
function atualizarTela() {

    if (conta) {

        // Has account:
        // hide login/signup
        // show msc

        LS.root.style.display = "none"
        SUP.root.style.display = "none"

        if (mesc) {
            mesc.style.display = "block"
        }

    } else {

        // No account:
        // show login
        // hide signup and msc

        LS.root.style.display = "block"
        SUP.root.style.display = "none"

        if (mesc) {
            mesc.style.display = "none"
        }

    }

}


// =========================
// GO TO SIGNUP
// =========================

signupbtn.addEventListener("click", () => {

    LS.root.style.display = "none"
    SUP.root.style.display = "block"

})


// =========================
// GO BACK TO LOGIN
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
            alert("Please fill in all fields.")
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
                "ERROR: " +
                (data.error || "Unknown error")
            )

            return
        }


        conta = data.usuario


        localStorage.setItem(
            "qct_conta",
            JSON.stringify(conta)
        )


        alert("Wallet created!")


        atualizarTela()
        atualizarSaldo()


    } catch (erro) {

        console.error(erro)

        alert(
            "Error connecting to the server."
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
            alert("Please fill in all fields.")
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
                "ERROR: " +
                (data.error || "Invalid login")
            )

            return
        }


        conta = data.usuario


        localStorage.setItem(
            "qct_conta",
            JSON.stringify(conta)
        )
		localStorage.setItem("pwrd", password)


        alert(
            "Logged in as " +
            conta.username
        )


        // Show account area
        atualizarTela()

        atualizarSaldo()


    } catch (erro) {

        console.error(erro)

        alert(
            "Error connecting to the server."
        )

    }

})

// =========================
// FETCH INFORMATION
// =========================

async function pegarSaldo(discord_id) {

    const resposta = await fetch(
        `${API}/getInfo?discord_id=${encodeURIComponent(discord_id)}`
    )

    return await resposta.json()

}


// =========================
// UPDATE BALANCE
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
                `Your balance: ${conta.saldo} QNK-BASE<br>${conta.saldo_unayky} QNK-UNAYKY<br>${conta.saldo_bowk} QNK-BOWK`

        }

        if (welcometxt) {
            welcometxt.innerHTML = `
            Hello <span style="color: red">${conta.username}</span>! Welcome to your Quollet Wallet`
        }

    } catch (erro) {

        console.error(
            "Error updating balance:",
            erro
        )

    }

}


// =========================
// UPDATE EVERY 5 SECONDS
// =========================

setInterval(
    atualizarSaldo,
    5000
)


// =========================
// INITIALIZE
// =========================

atualizarTela()

if (conta) {
    atualizarSaldo()
}
