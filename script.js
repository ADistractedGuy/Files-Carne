//function to play sound when button is clicked 
//set it a coin sfx when the button is clicked

//SFX MODULE
//create a function to play sound when button is clicked
document.getElementById('btt-container').addEventListener('click', function() {
    var audio = new Audio('SFX/conin_collect_2.mp3');
    audio.play();
});


//Visual MODULE
//create a function to change the image of the button when it is clicked

console.log ("funcionando!")

//Animation MODULE
//create a function to animate the button when it is clicked
document.getElementById('btt-container').addEventListener('click', function() {
    var button = document.getElementById('btt-sound');
    button.classList.add('animate');
    setTimeout(function() {
        button.classList.remove('animate');
    }, 500);
});



const buttons = document.querySelectorAll(".btt");

buttons.forEach(function(button) {
    button.addEventListener("click", function() {
        // Handle button click event
    });
});


//remenber it to add the sound.mp3 file in the same directory as the script.js file for it to work properly.

//se modules to separe the code into different files for better organization and maintainability.

//create a new file called sound.js and move the code for playing sound into that file.

