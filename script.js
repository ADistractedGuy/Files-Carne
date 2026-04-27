//function to play sound when button is clicked 
//set it a coin sfx when the button is clicked



getElementById('btt-sound').addEventListener('click', function() {
    var audio = new Audio('sound.mp3');
    audio.play();
});

//remenber it to add the sound.mp3 file in the same directory as the script.js file for it to work properly.

//se modules to separe the code into different files for better organization and maintainability.

//create a new file called sound.js and move the code for playing sound into that file.

