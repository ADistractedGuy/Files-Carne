// Quiz.js - Arquivo de Script do Quiz

//Seção para salvar comandos utilizados com frequenci~

//
//você está dizendo:
//Pegue a variável ez_questions.
//Pegue o objeto na posição 0.
//Pegue a propriedade question desse objeto
//
// console.log(ez_questions[0].question);


//variaveis de controle do quiz
// var - barra_progresso
let progress = 0;


//sistema simples para funcionamento geral do quiz



//Constantes controle do quiz
// Nível 1 - Fácil
const ez_questions = [

    {
        question: "Qual destes é um corte bovino?",
    
        wrong_answers: [
        "Tilápia",
        "Frango",
        "Bacon"
        ],
    
        correct_answers: [
        "Picanha"
        ]
    },
    
    {
        question: "Qual carne vem do porco?",
    
        wrong_answers: [
            "Maminha",
            "Peito de Frango",
            "Salmão"
        ],
    
        correct_answers: [
        "Costela Suína"
        ]
    },
    
    {
        question: "Qual carne é considerada branca?",
    
        wrong_answers: [
        "Picanha",
        "Contra-filé",
        "Costela"
        ],
    
        correct_answers: [
        "Frango"
        ]
    }
    
    ];
    
// =======================
// Nível 2
const medium_questions = [
    
    {
        question: "Qual destes cortes é retirado da parte traseira do boi?",
    
        wrong_answers: [
            "Asa",
            "Lombo suíno",
            "Filé de tilápia"
        ],
    
        correct_answers: [
            "Maminha"
        ]
    },
    
    {
        question: "Qual destes é um corte suíno?",
    
        wrong_answers: [
            "Acém",
            "Cupim",
            "Peito de frango"
        ],
    
        correct_answers: [
            "Lombo"
        ]
    },
    
    {
        question: "Qual destas carnes costuma ser utilizada no churrasco brasileiro?",
    
        wrong_answers: [
            "Sardinha",
            "Peito de frango",
            "Bacalhau"
        ],
    
        correct_answers: [
            "Picanha"
        ]

    }
    
];
    
    // =======================
    
    // Nível 3
    const hard_questions = [
    
    {
        question: "Qual corte bovino possui formato triangular e uma espessa capa de gordura?",
    
        wrong_answers: [
            "Patinho",
            "Acém",
            "Lagarto"
        ],
    
        correct_answers: [
            "Picanha"
        ]
    },
    
    {
        question: "Qual corte é tradicionalmente utilizado para preparar Ossobuco?",
    
        wrong_answers: [
            "Picanha",
            "Fraldinha",
            "Filé mignon"
        ],
    
        correct_answers: [
            "Músculo"
        ]
    },
    
    {
        question: "Qual destes cortes bovinos é conhecido pelo elevado marmoreio?",
    
        wrong_answers: [
            "Coxão duro",
            "Lagarto",
            "Patinho"
        ],
    
        correct_answers: [
            "Ancho"
        ]
    }
    
    ];










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