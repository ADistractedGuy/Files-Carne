
# HEADER - HTML

```
<header class="">
    <div class="logo">
        <div class="logo-area">
            <img src="new-logo-removebg(1).png" alt="LOGO" width="250px" height="150px"> 
        </div>
    </div>

    <div class="container">
        <a href="#" class="btt">Item 1</a>
        <a href="#" class="btt">Item 2</a>
        <a href="#" class="btt">Item 3</a>
        <a href="#" class="btt">Item 4</a>
        <a href="#" class="btt">Item 5</a>
    </div>
</header>
```
# HEADER - CSS

```
* {
    margin: 0;
    padding: 0;
    font-family: "Jersey 10", sans-serif;
}

html {
    font-size: 18px; /* try 18–20px for Jersey 10 */
}

body {
    font-size: 1rem;
    background-color: oklch(81.1% 0.111 293.571);
}
.jersey-10-regular {
  font-family: "Jersey 10", sans-serif;
  font-style: normal;
}  
header{
    background-color: oklch(28.3% 0.141 291.089);
    color: white;
    padding: 10px;
    border-radius: 0 0 5px 5px;
    text-size-adjust: 100%;
}
.logo{
    display: flex;
    align-items: center;
    justify-content: center;
}
.logo-area{
    gap: 10px;
    display: flex;
    align-items: center;
    transition: 0.3s;
    cursor: pointer;
}

.logo-area:hover{
    scale: 1.10;
    transition: 0.3s;
}
.container {
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    background-color: oklch(70.2% 0.183 293.541);
    border-radius: 10px;
    justify-content: space-around;
}
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
.btt:hover {
    scale: 1.10;
}

a{
    text-decoration: none;
    color: white;
}
```