async function staking(discord_id) {
    const res = await fetch(
        "https://cjccmeaosxnauhzeleuj.supabase.co/functions/v1/staking",
        {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${SUPABASE_ANON_KEY}`
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

    await staking(inp.value)

    alert("Done! QUANYK 3434 collected!")
})