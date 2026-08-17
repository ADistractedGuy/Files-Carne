let shuffledQuestions = [];


// Elementos da página
const questionElement = document.querySelector(".pergunta");
const answerButtons = document.querySelectorAll(".btt-quiz");


// Inicia o quiz
function startQuiz() {

    // Copia as perguntas
    shuffledQuestions = [...questions];

    // Embaralha as perguntas
    shuffledQuestions.sort(() => Math.random() - 0.5);

    // Reinicia o quiz
    currentQuestion = 0;
    resetScore();

    // Mostra a primeira pergunta
    showQuestion();
}


// Mostra a pergunta atual
function showQuestion() {

    const question = shuffledQuestions[currentQuestion];

    // Mostra a pergunta
    questionElement.textContent = question.question;


    // Junta respostas erradas e corretas
    const answers = [
        ...question.wrong_answers,
        ...question.correct_answers
    ];


    // Embaralha as respostas
    answers.sort(() => Math.random() - 0.5);


    // Coloca as respostas nos botões
    answerButtons.forEach((button, index) => {

        const answer = answers[index];

        button.innerHTML = `
            <h3>
                <span>(${String.fromCharCode(65 + index)})</span>
                ${answer}
            </h3>
        `;

        // Guarda a resposta
        button.dataset.answer = answer;

        // Remove classes anteriores
        button.classList.remove("correct");
        button.classList.remove("wrong");

        // Habilita o botão
        button.disabled = false;

    });


    // Atualiza progresso
    updateProgress();
}


// Verifica a resposta
function checkAnswer(event) {

    const button = event.currentTarget;

    const selectedAnswer = button.dataset.answer;

    const question = shuffledQuestions[currentQuestion];


    // Verifica se está correta
    const correctAnswer =
        question.correct_answers.includes(selectedAnswer);


    // Desabilita todos os botões
    answerButtons.forEach(button => {
        button.disabled = true;
    });


    // Resposta correta
    if (correctAnswer) {

        button.classList.add("correct");

        addScore();

    }

    // Resposta errada
    else {

        button.classList.add("wrong");


        // Encontra e destaca a resposta correta
        answerButtons.forEach(button => {

            if (
                question.correct_answers.includes(
                    button.dataset.answer
                )
            ) {

                button.classList.add("correct");

            }

        });

    }


    // Aguarda 1 segundo
    setTimeout(() => {

        nextQuestion();

    }, 1000);

}


// Próxima pergunta
function nextQuestion() {

    currentQuestion++;


    if (currentQuestion < shuffledQuestions.length) {

        showQuestion();

    }

    else {

        showResult();

    }

}


// Mostra resultado
function showResult() {

    const quizSection =
        document.querySelector(".Quiz-section");


    quizSection.innerHTML = `

        <h2>Quiz finalizado!</h2>

        <p>
            Você acertou ${score} de ${questions.length} questões.
        </p>

        <button
            class="btt-quiz"
            onclick="restartQuiz()"
        >
            Jogar novamente
        </button>

    `;

}


// Reinicia o quiz
function restartQuiz() {

    location.reload();

}


// Eventos dos botões
answerButtons.forEach(button => {

    button.addEventListener("click", checkAnswer);

});


// Inicia o quiz
startQuiz();