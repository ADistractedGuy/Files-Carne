let progress = 0;

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