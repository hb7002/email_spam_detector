const predictBtn = document.getElementById("predictBtn");

const messageInput = document.getElementById("message");

const result = document.getElementById("result");

const prediction = document.getElementById("prediction");

const spamPercentage = document.getElementById("spamPercentage");

const notSpamPercentage = document.getElementById("notSpamPercentage");

const spamBar = document.getElementById("spamBar");

const notSpamBar = document.getElementById("notSpamBar");


predictBtn.addEventListener("click", async () => {

    const message = messageInput.value.trim();

    if (!message) {
        alert("Please enter an email or message.");
        return;
    }

    predictBtn.disabled = true;
    predictBtn.textContent = "Analyzing...";

    try {

        const response = await fetch("/predict", {

            method: "POST",

            headers: {
                "Content-Type": "application/json"
            },

            body: JSON.stringify({
                message: message
            })
        });

        const data = await response.json();

        if (!response.ok) {
            throw new Error(data.error);
        }

        // Display percentages
        spamPercentage.textContent =
            `${data.spam.toFixed(2)}%`;

        notSpamPercentage.textContent =
            `${data.not_spam.toFixed(2)}%`;


        // Set progress bars
        spamBar.style.width =
            `${data.spam}%`;

        notSpamBar.style.width =
            `${data.not_spam}%`;


        // Prediction
        prediction.textContent =
            data.prediction;


        result.style.display = "block";


    } catch (error) {

        alert(error.message);

    } finally {

        predictBtn.disabled = false;

        predictBtn.textContent = "Check Message";

    }

});