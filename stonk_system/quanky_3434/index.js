async function staking(discord_id) {
    const res = await fetch(
        "https://cjccmeaosxnauhzeleuj.supabase.co/functions/v1/staking",
        {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                discord_id
            })
        }
    )

    return await res.json()
}

const btn = document.getElementById("addbtn")
const inp = document.getElementById("DIINP")

btn.addEventListener("click", async () => {
    if (!inp.value) return

    const resultado = await staking(inp.value)

    if (resultado.sucesso) {
        alert("Done! QUANYK 3434 collected!")
    } else {
        alert(resultado.erro)
    }
})