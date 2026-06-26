

// Quiz.js - Arquivo de Script do Quiz

//variaveis de controle do quiz
let progress = 0;

//Bara de Progesso - Define o quanto falta para o quiz acabar, e o quanto falta para o usuario passar de nivel - (O Nivel é apenas uma possiblidade).
function increaseProgress() {

    if (progress < 100) {

        progress += 10;

        document.getElementById("progressBar").style.width =
        progress + "%";
        
        document.getElementById("progressText").textContent =
            progress + "%";
    } 
    
}
function decreaseProgress(){
    if (progress <= 100  & progress >= 1){
        
        progress -= 10;

        document.getElementById("progressBar").style.width = 
        progress + "%";
        
        document.getElementById("progressText").textContent =
        progress + "%";
    }
    
    
}

//Função para verificar se a resposta está correta e atualizar a barra de progresso
function checkAnswer(isCorrect) {
    if (isCorrect) {
        increaseProgress();
    } else {
        decreaseProgress();
    }
}


// Adiciona o evento de clique a cada botão de resposta
answerButtons = document.querySelectorAll(".answer-button");
answerButtons.forEach(button => {
    button.addEventListener("click", () => {
        const isCorrect = button.dataset.correct === "true";
        checkAnswer(isCorrect);
    });
});