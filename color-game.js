// Variables -----------------------------------------

var numberOfDots = 6
var colors = []
var pickedColor;

// Selectors

const dots = document.querySelectorAll(".dot")
const colorDisplay = document.getElementById("colorDisplay")
const message = document.querySelector("#message")
const h1 = document.querySelector("h1")
const resetButton = document.querySelector("#reset")
const easyBtn = document.getElementById("easyBtn")
const hardBtn = document.getElementById("hardBtn")
const modeButtons = document.querySelectorAll(".mode")


// Main behavior -------------------------------------

init();

function init() {
    //  Mode buttons event listeners
    setUpModeButtons()
    // Win/lose logic
    setUpWinLoseLogic()
    // Set up reset button
    resetButton.addEventListener("click", function () {
        reset()
    })
    // Reset page
    reset()
}

// Functions

function changeColors(color) {
    // loop through all dots
    for (i = 0; i < dots.length; i++)
        // change each color to match given color
        dots[i].style.backgroundColor = color;
}

function pickColor() {
    // generate random number from 0 to colors.length
    var random = Math.floor(Math.random() * colors.length);
    // returns the color from colors array at randomized index
    return colors[random]
}

function generateRandomColors(numberOfDots) {
    // make an array
    var randomColorsArray = [];
    // add 'number' of random colors to array
    for (i = 0; i < numberOfDots; i++) {
        // get random color and push into array
        randomColorsArray.push(randomColor())
    }
    // return that array
    return randomColorsArray
}

function randomColor() {
    // pick a "red" value from 0 to 255
    var r = Math.floor(Math.random() * 256)
    // pick a "green" value from 0 to 255
    var g = Math.floor(Math.random() * 256)
    // pick a "blue" value from 0 to 255
    var b = Math.floor(Math.random() * 256);
    return `rgb(${r}, ${g}, ${b})`
}

function reset() {
    // generate all new colors
    colors = generateRandomColors(numberOfDots)
    // pick a new random color from array
    pickedColor = pickColor()
    // change colorDisplay to match picked color
    colorDisplay.innerText = pickedColor
    // change colors of dots
    for (i = 0; i < dots.length; i++) {
        // for loop without curly braces executes only 1 following line v
        dots[i].style.display = "block"
        colors[i] ? dots[i].style.backgroundColor = colors[i] :
            dots[i].style.display = "none"
    }
    // change h1 background back to default
    h1.style.backgroundColor = "#333"
    resetButton.innerText = "New colors"
    message.innerText = ""
}

function setUpModeButtons(){
    for (i = 0; i < modeButtons.length; i++) {
    modeButtons[i].addEventListener('click', function () {
        modeButtons[0].classList.remove('selected')
        modeButtons[1].classList.remove('selected')
        modeButtons[2].classList.remove('selected')
        this.classList.add('selected')
        // figure out how many squares to show
        this.textContent === 'Easy' ? numberOfDots = 3 :
            this.textContent === 'Medium' ? numberOfDots = 6 :
            numberOfDots = 9
        // reset to pick colors and update page
        reset()
        for (i = 0; i < numberOfDots; i++) {
            // for loop without curly braces executes only 1 following line v
            dots[i].style.display = "block"
            colors[i] ? dots[i].style.backgroundColor = colors[i] :
                dots[i].style.display = "none"
        }
    })
}
}


function setUpWinLoseLogic() {
    for (i = 0; i < dots.length; i++) {
        // add click listeners to dots
        dots[i].addEventListener("click", function () {
            // grab color from clicked dot
            var clickedColor = this.style.backgroundColor
            // compare colot to pickedColor
            if (clickedColor === pickedColor) {
                message.innerText = "Correct!"
                changeColors(clickedColor)
                h1.style.backgroundColor = clickedColor
                resetButton.innerText = "Play again"
            } else {
                this.style.backgroundColor = "#333"
                message.innerText = "Try again"
            }
        })
    }
}

// my attempt at smth

// function checkMode() {
//     if (modeButtons.innerText === "Easy") {

//     }
// }


// Old buttons setup

// easyBtn.addEventListener("click", function(){
//     // set class to selected
//     easyBtn.classList.add("selected")
//     hardBtn.classList.remove("selected")
//     // set number of dots to show
//     numberOfDots = 3
//     // choose and display colors
//     colors = generateRandomColors(numberOfDots)
//     pickedColor = pickColor()
//     colorDisplay.innerText = pickedColor
//     for(i = 0; i < dots.length; i++) {
//         if(colors[i]) {
//             dots[i].style.backgroundColor = colors[i]
//         } else {
//             dots[i].style.display = "none"

//     }
// }
// })

// hardBtn.addEventListener("click", function(){
//     hardBtn.classList.add("selected")
//     easyBtn.classList.remove("selected")
//     numberOfDots = 6
//     colors = generateRandomColors(numberOfDots)
//     pickedColor = pickColor()
//     colorDisplay.innerText = pickedColor
//     for(i = 0; i < dots.length; i++) {
//             dots[i].style.backgroundColor = colors[i]
//             dots[i].style.display = "block"
//     }
// })