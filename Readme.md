# Display base do site

Com header, seção de posts recentes, seção de categorias e rodapé. O design é inspirado em um tema de jogos retrô, utilizando cores escuras e fontes pixeladas para criar uma atmosfera nostálgica. O layout é responsivo, adaptando-se a diferentes tamanhos de tela para garantir uma boa experiência em dispositivos móveis. A seção de posts recentes apresenta uma grade de artigos com imagens e títulos, enquanto a seção de categorias organiza o conteúdo por temas específicos. O rodapé inclui informações de copyright.
___

# HTML
```
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Document</title>
    
    <!--Referencia ao Arquivo CSS para design e cores-->
    <link rel="stylesheet" href="style.css">

    <!--Referencia a fonte do google fonts para o estilo de letra-->
    <link href="https://fonts.googleapis.com/css2?family=Press+Start+2P&display=swap" rel="stylesheet">

    <link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Jersey+10&display=swap" rel="stylesheet">
</head>
<body>
<header class="">
    <div class="logo">
        <div class="logo-area">
            <img src="imgs/new-logo-removebg(1).png" alt="LOGO" width="250px" height="150px"> 
        </div>
    </div>

    <div class="container">
        <a href="#" class="btt">Item 1</a>
        <a href="#" class="btt">Item 2</a>
        <a href="#" class="btt">Item 3</a>
        <a href="#" class="btt">Item 4</a>
        <a href="#" class="btt">Item 5</a>
        <a href="#" class="btt">Item 6</a>
    </div>
</header>

<section class="hero">

<div class="title">
    <h1>Most Recent Posts</h1>
</div>
<div class="hero-content">

    <a class="post" href="">
        <img src="imgs/new-logo-removebg(1).png" alt="">
        <h1>
            Lorem Ipsum
        </h1>
        <p>Lorem ipsum dolor sit amet consectetur adipisicing elit.</p>        
    </a>

    <a class="post" href="">
        <img src="imgs/new-logo-removebg(1).png" alt="Logo">
        <h1> Lorem Ipsum
        </h1>
        <p>Lorem Ipsum dolor sit amet consectetur adipsscing elit</p>
    </a>

    <a class="post" href="">
        <img src="imgs/new-logo-removebg(1).png" alt="Logo">
        <h1>Lorem Ipsum
        </h1>
        <p>Lorem Ipsum dolor sit amet consectetur adipsscing elit</p>
    </a>

    <a class="post" href="">
        <img src="imgs/new-logo-removebg(1).png" alt="Logo">
        <h1> Lorem Ipsum
        </h1>
        <p>Lorem Ipsum dolor sit amet consectetur adipsscing elit</p>
    </a>

    <a class="post" href="">
        <img src="imgs/new-logo-removebg(1).png" alt="Logo">
        <h1>Lorem Ipsum
        </h1>
        <p>Lorem Ipsum dolor sit amet consectetur adipsscing elit</p>
    </a>

    <a class="post" href="">
        <img src="imgs/new-logo-removebg(1).png" alt="Logo">
        <h1>Lorem Ipsum
        </h1>
        <p>Lorem Ipsum dolor sit amet consectetur adipsscing elit</p>
    </a>
</div>
</section>
<div class="space"></div>

<section class="category">
    <div>
        <h3>Section 1</h3>
        <p>This is the first section of the website.</p>
    </div>
</section>

<footer>
    <p class="foot">&copy; 2024 My Website. All rights reserved.</p>
</footer>

</body>
</html>
```


# CSS
```
/*----------Global Styles----------*/
/*----------Global Styles----------*/
:root {
    --bg-main: #0f0202;
    --bg-secondary: #1a0505;
    --red-main: #5a0f0f;
    --red-strong: #8b1e1e;
    --gold: #c9a14a;
    --text: #f5e6c8;
}


* {
    margin: 0;
    padding: 0;
    font-family: "Jersey 10", sans-serif;
}

/*Definir tamanho da fonte para o elemento html (global - De todo o site)*/
html {
    font-size: 20px; /* try 18–20px for Jersey 10 */
}

/*-------Responsive Design for Mobile Devices-------
Use media queries to adjust font sizes and layout for smaller screens. For example:
Não mexer ou trocar qualquer coisa deste comentário, usar de referencia para o desenvolvimento de responsividade do site, principalmente para mobile.
@media (max-width: 600px) {
    html {
        font-size: 18px;
    }

    .hero {
        padding: 20px;
    }
}
*/

/*Global background for the site*/
body {
    font-size: 1rem;
    background-color: oklch(81.1% 0.111 293.571);
}

/* Global font family for all text elements */
.jersey-10-regular {
  font-family: "Jersey 10", sans-serif;
  font-style: normal;
}  

/*-----------End Global Styles-----------*/


/*----------Header----------*/

/*Define tamanho, cor e espacaçamento ao background e aos elementos do header (Titulo)*/
header{
    background-color: oklch(28.3% 0.141 291.089);
    color: white;
    padding: 10px;
    border-radius: 0 0 5px 5px;
    text-size-adjust: 100%;
    box-shadow:oklch(28.3% 0.141 291.089) 4px 4px 10px -1px;
}

/*definir tamanho para o elemento logo
/*Defines position and size*/
.logo{
    display: flex;
    align-items: center;
    justify-content: center;
}

/*Defines spacing and layout for the logo area*/
.logo-area{
    gap: 10px;
    display: flex;
    transition: 0.3s;
    cursor: pointer;
}
/*Responsible for the hover effect (Animation)*/
.logo-area:hover{
    scale: 1.10;
    transition: 0.3s;
}

/*The all might "Container" responsible for responsive and btt layout*/
.container {
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    background-color: oklch(70.2% 0.183 293.541);
    border-radius: 10px;
    justify-content: space-around;
    margin-bottom: 4px;
}

/*btt - button of the container "item 1" "item 2" "..." "..."*/
.btt { 
    background-color: oklch(50.2% 0.183 293.541);
    display: flex;
    justify-content: center;
    align-items: center;
    width: 150px;
    height: 30px;
    margin: 10px;
    border-radius: 5px;
    cursor: pointer;
    transition: 0.3s;
    flex-grow: 2;
}

/*button animation (again)*/
.btt:hover {
    transform: scale(1.10);
}


a{
    text-decoration: none;
    color: white;
}


/*----------Header End----------*/


/*-----------Hero Section-----------*/
.hero {
    background-color: oklch(54.1% 0.281 293.009);
    border-radius: 29px;
    margin: 20px;
    box-shadow: oklch(54.1% 0.281 293.009) 4px 4px 10px -1px;
}   

.title {
    display: flex;
    justify-content: center;
    font-size: 1.5rem;
    padding: 1%;
    background-color: oklch(61.551% 0.22831 291.95);
    border-radius: 10px;
    border-radius: 29px 29px 0 0;
}

.hero h1 {
    display: flex;
    justify-content: center;
    font-size: 2rem;
    padding: 1%;
    color: rgb(255, 255, 255);
    text-shadow: black 1px 1px 2px;
}

.hero p {
    display: flex;
    justify-content: center;
    font-size: 1.2rem;
    padding: 1%;
    color: rgb(255, 255, 255);
    text-shadow: black 1px 1px 2px;
}
.hero-content {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
}


.post{
    padding: 20px 10px;
    border-radius: 10px;
    background-color: oklch(70.2% 0.183 293.541);
    margin: 20px;
}

.post img {
    width: 100%;
    height: auto;
    border-radius: 10px;
}

/* Adjust the height as needed */
/*Create a space between sections*/
.space {
    height: 1px; 
}

/*--------------Category Section--------------*/
.category {
    flex-wrap: wrap;
    flex-grow: 2;
    justify-content: space-around;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
    background-color: oklch(54.1% 0.281 293.009);
    padding: 10px 20px;
    border-radius: 29px;
    margin: 10px;
    gap: 20px;
    box-shadow: oklch(54.1% 0.281 293.009) 4px 4px 10px -1px;
}

/* Work with this later*/
/*
a:visited{

    color: green;
}
*/


/*


h1 {
    font-size: 2.5rem;
}

h2 {
    font-size: 2rem;
}

p, a {
    font-size: 1rem;
}

.btt {
    font-size: 1.1rem;
}*/
footer{
    border-radius: 50px; 
    padding: 2% ;
    margin: 10px;
    color: white;
    background-color: oklch(28.3% 0.141 291.089) ;
    box-shadow: oklch(28.3% 0.141 291.089) 4px 4px 10px -1px;
}

.foot {
    display: flex;
    align-items: center;
    justify-content: center;
}
```