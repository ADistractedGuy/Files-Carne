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

    const progressBar = document.querySelector(".progress-bar");

    if (!progressBar) {
        return;
    }

    const totalQuestions = questions.length;

    const progress = ((currentQuestion + 1) / totalQuestions) * 100;

    progressBar.style.width = progress + "%";

}