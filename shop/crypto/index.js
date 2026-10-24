const FUNCTION_URL =
    "https://cjccmeaosxnauhzeleuj.supabase.co/functions/v1/qnktopepe";

let selectedCoin = null;
let qnkPerSatoshi = 5000;
let purchasing = false;


/* =========================
   HELPERS
========================= */

function $(id) {
    return document.getElementById(id);
}


function formatNumber(value) {
    return Number(value).toLocaleString(
        "en-US",
        {
            maximumFractionDigits: 8
        }
    );
}


/* =========================
   OPEN BUY
========================= */

function openBuy(
    coin,
    rate
) {
    selectedCoin =
        String(coin).toUpperCase();

    qnkPerSatoshi =
        Number(rate);

    if (
        !Number.isFinite(
            qnkPerSatoshi
        ) ||
        qnkPerSatoshi <= 0
    ) {
        console.error(
            "Invalid conversion rate:",
            rate
        );

        return;
    }

    $("selectedCoin")
        .textContent =
        selectedCoin;

    $("buyBox")
        .classList
        .add("active");

    $("qnkAmount")
        .value = "";

    $("receiveAmount")
        .textContent =
        "0 satoshis";

    $("status")
        .textContent = "";

    $("buyBox")
        .scrollIntoView({
            behavior: "smooth",
            block: "center"
        });
}


/* =========================
   PREVIEW
========================= */

function updatePreview() {

    const qnk =
        Number(
            $("qnkAmount").value
        );

    if (
        !Number.isFinite(qnk) ||
        qnk <= 0
    ) {
        $("receiveAmount")
            .textContent =
            "0 satoshis";

        return;
    }

    const satoshis =
        Math.floor(
            qnk /
            qnkPerSatoshi
        );

    const btc =
        satoshis /
        100000000;

    if (
        satoshis <= 0
    ) {
        $("receiveAmount")
            .textContent =
            "0 satoshis";

        return;
    }

    $("receiveAmount")
        .textContent =
        `${formatNumber(satoshis)} satoshis · ${btc.toFixed(8)} BTC`;
}


/* =========================
   BUY
========================= */

async function buyCrypto() {

    if (purchasing) {
        return;
    }

    const id =
        $("id")
            .value
            .trim();

    const senha =
        $("password")
            .value;

    const qnkAmount =
        Number(
            $("qnkAmount")
                .value
        );

    const faucetpayUsername =
        $("faucetpayUsername")
            .value
            .trim();

    const status =
        $("status");

    const button =
        $("confirmButton");


    /* =========================
       VALIDATION
    ========================= */

   
if (!id) {
    status.textContent =
        "Enter your Quollet ID.";

    return;
}


    if (!senha) {
        status.textContent =
            "Enter your Quollet password.";

        return;
    }


    if (
        !Number.isFinite(
            qnkAmount
        ) ||
        qnkAmount <= 0
    ) {
        status.textContent =
            "Enter a valid QNK amount.";

        return;
    }


    if (
        qnkAmount < 5000
    ) {
        status.textContent =
            "Minimum purchase is 5,000 QNK.";

        return;
    }


    if (
        !faucetpayUsername
    ) {
        status.textContent =
            "Enter your FaucetPay username.";

        return;
    }


    if (
        selectedCoin !== "BTC"
    ) {
        status.textContent =
            "This cryptocurrency is not available.";

        return;
    }


    /* =========================
       CALCULATE SATOSHIS
    ========================= */

    const satoshis =
        Math.floor(
            qnkAmount /
            qnkPerSatoshi
        );

    if (
        !Number.isSafeInteger(
            satoshis
        ) ||
        satoshis <= 0
    ) {
        status.textContent =
            "Invalid BTC amount.";

        return;
    }


    const qnkUsed =
        satoshis *
        qnkPerSatoshi;


    /* =========================
       START
    ========================= */

    purchasing = true;

    button.disabled = true;

    button.textContent =
        "Processing...";

    status.textContent =
        "Verifying account...";


    try {

        const response =
            await fetch(
                FUNCTION_URL,
                {
                    method: "POST",

                    headers: {
                        "Content-Type":
                            "application/json"
                    },

                    body: JSON.stringify({

                        /*
                            O backend usa
                            discord_id porque
                            esse é o nome antigo
                            da coluna.

                            O valor é o
                            Quollet ID.
                        */

                        discord_id:
                            id,

                        senha:
                            senha,

                        qnk_amount:
                            qnkUsed,

                        faucetpay_username:
                            faucetpayUsername
                    })
                }
            );


        let data;


        try {

            data =
                await response.json();

        } catch {

            data = {
                success: false,

                error:
                    `Server returned HTTP ${response.status}.`
            };
        }


        console.log(
            "Crypto Shop:",
            response.status,
            data
        );


        /* =========================
           ERROR
        ========================= */

        if (
            !response.ok ||
            !data.success
        ) {

            status.textContent =
                data.error ||
                "Purchase failed.";

            return;
        }


        /* =========================
           SUCCESS
        ========================= */

        const receivedSatoshis =
            Number(
                data.satoshis ??
                satoshis
            );

        const receivedBTC =
            Number(
                data.btc_received ??
                (
                    receivedSatoshis /
                    100000000
                )
            );


        status.textContent =
            `Purchase successful! ` +
            `${formatNumber(receivedSatoshis)} satoshis ` +
            `(${receivedBTC.toFixed(8)} BTC) sent.`;


        $("password")
            .value = "";

        $("qnkAmount")
            .value = "";

        $("receiveAmount")
            .textContent =
            "0 satoshis";


    } catch (error) {

        console.error(
            "Crypto Shop error:",
            error
        );

        status.textContent =
            "Could not connect to Quollet Crypto Shop.";

    } finally {

        purchasing = false;

        button.disabled = false;

        button.textContent =
            "Confirm Purchase";
    }
}