let shuffledQuestions = [];


// Elementos da página
const questionElement = document.querySelector(".pergunta");
const answerButtons = document.querySelectorAll(".btt-quiz");

const questionNumberElement =
    document.querySelector("#question-number");

const totalQuestionsElement =
    document.querySelector("#total-questions");


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

    // Atualiza o contador de questões
    questionNumberElement.textContent =
        currentQuestion + 1;

    totalQuestionsElement.textContent =
        shuffledQuestions.length;


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


    // --------------------------------
    // RESPOSTA CORRETA
    // --------------------------------

    if (correctAnswer) {

        button.classList.add("correct");

        addScore();


        // Avança após 1 segundo
        setTimeout(() => {

            nextQuestion();

        }, 1000);

    }


    // --------------------------------
    // RESPOSTA ERRADA
    // --------------------------------

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


        // Cria a área da explicação
        const explanation = document.createElement("div");

        explanation.classList.add("answer-explanation");

        explanation.innerHTML = `
            <h3>Resposta incorreta!</h3>

            <p>
                ${question.explanation}
            </p>

            <strong>
                Resposta correta: ${question.correct_answers.join(", ")}
            </strong>
        `;


        // Adiciona a explicação ao Quiz
        const quizSection =
            document.querySelector(".Quiz-section");

        quizSection.appendChild(explanation);


        // Aguarda 3 segundos para o usuário ler
        setTimeout(() => {

            explanation.remove();

            nextQuestion();

        }, 10000);

    }

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


    const totalQuestions = questions.length;

    const percentage =
        Math.round((score / totalQuestions) * 100);


    let message;


    if (percentage === 100) {

        message = " Perfeito! Você acertou todas as questões!";

    }

    else if (percentage >= 70) {

        message = " Parabéns! Você teve um ótimo desempenho!";

    }

    else if (percentage >= 50) {

        message = " Muito bem! Você está no caminho certo!";

    }

    else {

        message = " Continue estudando! Você pode melhorar ainda mais!";

    }


    quizSection.innerHTML = `

        <div class="quiz-result">

            <h2>Quiz finalizado!</h2>

            <p class="result-message">
                ${message}
            </p>

            <div class="score-status">

                <span class="score-number">
                    ${score}
                </span>

                <span class="score-separator">
                    /
                </span>

                <span class="score-total">
                    ${totalQuestions}
                </span>

            </div>

            <p class="score-text">
                Você acertou <strong>${score}</strong>
                de <strong>${totalQuestions}</strong> questões.
            </p>

            <p class="percentage">
                Aproveitamento: <strong>${percentage}%</strong>
            </p>

            <button
                class="btt-quiz"
                onclick="restartQuiz()"
            >
                Jogar novamente
            </button>

        </div>

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