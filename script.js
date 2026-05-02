document.addEventListener('DOMContentLoaded', () => {
    const btn = document.getElementById('B-cat');

    if (!btn) {
        console.error("Button #B-cat not found");
        return;
    }

    btn.addEventListener('click', () => {
        const passcode = prompt("Enter the passcode to access the secret content:");
        if (passcode === "B") {
            alert("Access granted! Welcome to the secret content.");
        } else {
            alert("Access denied! Incorrect passcode.");
        }
    });
});