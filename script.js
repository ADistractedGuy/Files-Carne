document.addEventListener('DOMContentLoaded', () => {
    const btn = document.getElementById('B-cat');

    if (!btn) {
        console.error("Button #B-cat not found");
        return;
    }
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