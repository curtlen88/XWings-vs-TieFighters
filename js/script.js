// DOM Selectors 
const startButton = document.querySelector('#startButton')
const restartButton = document.querySelector('#restartButton')
console.log(startButton, restartButton)

// Event Liserners
startButton.addEventListener('click',(startGame))
restartButton.addEventListener('click', restartGame)

// Functions
function startGame (){
    console.log(`start clicked`)
}
function restartGame (){
    console.log(`restart clicked`)
}