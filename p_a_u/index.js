let contaRaw = localStorage.getItem("qct_conta") || null

if (contaRaw === null) {
	alert("Você precisa ter uma conta em quollet.vercel.app")
} else {
	// Transforma o texto do localStorage em um objeto JavaScript utilizável
	let conta = JSON.parse(contaRaw)

	let confirmbtn = document.getElementById("confirmbtn")
	let userid = document.getElementById("userid")
	let valueinp = document.getElementById("valueinp")
	let senhainp = document.getElementById("senhainp")

	confirmbtn.addEventListener("click", async () => {
		if (userid.value === "" || valueinp.value === "" || senhainp.value === "") {
			alert("Preencha todos os campos!")
		} else {
			const discord_id = conta.discord_id
			const API = "https://cjccmeaosxnauhzeleuj.supabase.co/functions/v1/paytouser_base/"
			const senha = senhainp.value

			try {
				// Corrigido: encodeURIComponent com "e" minúsculo
				const resposta = await fetch(
					`${API}?discord_id=${encodeURIComponent(discord_id)}&senha=${encodeURIComponent(senha)}&outrouser=${encodeURIComponent(userid.value)}&valor=${valueinp.value}`
				)
				
				// Corrigido: adicionado await antes de resposta.json()
				const dados = await resposta.json()

				if (!dados.sucess) {
					alert("Erro! " + dados.error)
				} else {
					alert("Sucesso no pagamento!")
				}
			} catch (erro) {
				alert("Erro de conexão com o servidor.")
				console.error(erro)
			}
		}
	})
}
