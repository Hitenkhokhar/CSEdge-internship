const displayBtn = document.getElementById("display-all");
var isDisplayed = false;

function displayAll() {
    console.log(isDisplayed);
    var elements = document.getElementsByClassName("block-hidden");
    for (var i = 0; i < elements.length; i++) {
        elements[i].style.display = isDisplayed ? "none" : "block";
    }
    isDisplayed = !isDisplayed;
    if(isDisplayed){
        displayBtn.innerText = "See less";
    }
    else{
        displayBtn.innerText = "See all";
    }
}

displayBtn.addEventListener("click", displayAll);