document.addEventListener('DOMContentLoaded', () => {
    const btn = document.getElementById('B-cat');

    if (!btn) {
        console.error("Button #B-cat not found");
        return;
    }

<<<<<<< HEAD
    btn.addEventListener('click', () => {
        const passcode = prompt("Enter the passcode to access the secret content:");
        if (passcode === "B") {
            alert("Access granted! Welcome to the secret content.");
        } else {
            alert("Access denied! Incorrect passcode.");
        }
=======

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
>>>>>>> 32e236b6d561cee350491a1e741e72bb50845c94
    });
});