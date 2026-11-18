let score = 0;

let currentQuestion = 0;


// Adiciona ponto
function addScore() {

    score++;

}


// Retorna a pontuação
function getScore() {

    return score;

}


// Reseta a pontuação
function resetScore() {

    score = 0;

}


// Atualiza a barra de progresso
function updateProgress() {

    const progressBar =
        document.querySelector(".progress-bar");

    const progressContainer =
        document.querySelector(".progress-container");

    if (!progressBar) return;

    const totalQuestions = shuffledQuestions.length;

    const progress =
        (currentQuestion / totalQuestions) * 100;

    progressBar.style.width = progress + "%";

    if (progressContainer) {
        progressContainer.setAttribute(
            "aria-valuenow",
            String(Math.round(progress))
        );
    }
}


