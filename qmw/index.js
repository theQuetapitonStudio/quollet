let conta = JSON.parse(localStorage.getItem("qct_conta")) || null;
let senha = localStorage.getItem("pwrd");

const SEAPI =
    "https://cjccmeaosxnauhzeleuj.supabase.co/functions/v1/set-cenyk";

if (conta === null) {

    alert("Você precisa criar uma conta em quollet.vercel.app");

} else {

    let cobtn = document.getElementById("cobtn");

    cobtn.addEventListener("click", async () => {

        let einp = document.getElementById("EINP");

        if (!einp.value.trim() || !document.getElementById("SINP").value.trim()) {

            alert("Preencha o email para avisos importantes");
            return;

        }

        const resposta = await fetch(
            `${SEAPI}?discord_id=${encodeURIComponent(conta.discord_id)}` +
            `&senha=${encodeURIComponent(document.getElementById("SINP").value)}` +
            `&email=${encodeURIComponent(einp.value.trim())}`
        );

        const dados = await resposta.json();

        console.log(dados);
    });
}