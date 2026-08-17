// Quiz.js - Arquivo de Script do Quiz

//Seção para salvar comandos utilizados com frequenci~

//você está dizendo:
//Pegue a variável ez_questions.
//Pegue o objeto na posição 0.
//Pegue a propriedade question desse objeto
//
// console.log(ez_questions[0].question);


    const questions = [

        {
            id: 1,
        
            difficulty: "easy",
        
            question: "Qual destes é um corte bovino?",
        
            wrong_answers: [
                "Tilápia",
                "Frango",
                "Bacon"
            ],
        
            correct_answers: [
                "Picanha"
            ],
        
            explanation: "A picanha é um corte retirado da parte traseira do boi, muito apreciado em churrascos."
        },
        
        {
            id: 2,
        
            difficulty: "easy",
        
            question: "Qual carne vem do porco?",
        
            wrong_answers: [
                "Maminha",
                "Peito de Frango",
                "Salmão"
            ],
        
            correct_answers: [
                "Costela Suína"
            ],
        
            explanation: "A costela suína é um corte proveniente do porco, conhecido pelo sabor marcante e pela maciez."
        },
        
        {
            id: 3,
        
            difficulty: "easy",
        
            question: "Qual carne é considerada branca?",
        
            wrong_answers: [
                "Picanha",
                "Contra-filé",
                "Costela"
            ],
        
            correct_answers: [
                "Frango"
            ],
        
            explanation: "O frango é classificado como carne branca por possuir menor concentração de mioglobina em comparação às carnes bovinas."
        },
        
        {
            id: 4,
        
            difficulty: "medium",
        
            question: "Qual destes cortes é retirado da parte traseira do boi?",
        
            wrong_answers: [
                "Asa",
                "Lombo suíno",
                "Filé de tilápia"
            ],
        
            correct_answers: [
                "Maminha"
            ],
        
            explanation: "A maminha é um corte bovino localizado na parte traseira do animal, conhecido pela maciez."
        },
        
        {
            id: 5,
        
            difficulty: "medium",
        
            question: "Qual destes é um corte suíno?",
        
            wrong_answers: [
                "Acém",
                "Cupim",
                "Peito de Frango"
            ],
        
            correct_answers: [
                "Lombo"
            ],
        
            explanation: "O lombo é um dos principais cortes suínos e se destaca por ser uma carne magra e versátil."
        },
        
        {
            id: 6,
        
            difficulty: "medium",
        
            question: "Qual destas carnes costuma ser utilizada no churrasco brasileiro?",
        
            wrong_answers: [
                "Sardinha",
                "Peito de Frango",
                "Bacalhau"
            ],
        
            correct_answers: [
                "Picanha"
            ],
        
            explanation: "A picanha é um dos cortes mais tradicionais do churrasco brasileiro devido ao seu sabor e à capa de gordura."
        },
        
        {
            id: 7,
        
            difficulty: "hard",
        
            question: "Qual corte bovino possui formato triangular e uma espessa capa de gordura?",
        
            wrong_answers: [
                "Patinho",
                "Acém",
                "Lagarto"
            ],
        
            correct_answers: [
                "Picanha"
            ],
        
            explanation: "A picanha possui formato triangular e uma característica capa de gordura, responsável por parte de seu sabor."
        },
        
        {
            id: 8,
        
            difficulty: "hard",
        
            question: "Qual corte é tradicionalmente utilizado para preparar Ossobuco?",
        
            wrong_answers: [
                "Picanha",
                "Fraldinha",
                "Filé mignon"
            ],
        
            correct_answers: [
                "Músculo"
            ],
        
            explanation: "O ossobuco é preparado com o músculo bovino cortado em rodelas, preservando o osso com o tutano."
        },
        
        {
            id: 9,
        
            difficulty: "hard",
        
            question: "Qual destes cortes bovinos é conhecido pelo elevado marmoreio?",
        
            wrong_answers: [
                "Coxão duro",
                "Lagarto",
                "Patinho"
            ],
        
            correct_answers: [
                "Ancho"
            ],
        
            explanation: "O ancho apresenta elevado marmoreio, ou seja, gordura entremeada nas fibras, o que proporciona mais sabor e suculência."
        },

        {
            id: 10,
        
            difficulty: "hard",
        
            question: "Qual corte bovino é conhecido por possuir fibras longas e ser muito utilizado no preparo de carne desfiada?",
        
            wrong_answers: [
                "Picanha",
                "Ancho",
                "Maminha"
            ],
        
            correct_answers: [
                "Peito"
            ],
        
            explanation: "O peito bovino possui fibras longas e bastante tecido conjuntivo, tornando-se ideal para cozimentos lentos e preparos de carne desfiada."
        }
        
        ];