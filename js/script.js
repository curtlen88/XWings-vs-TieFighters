// DOM Selectors 
const startButton = document.querySelector('#startButton')
const restartButton = document.querySelector('#restartButton')
const pauseButton = document.querySelector('#pauseButton')

console.log(startButton, restartButton)


//reset canvas pixels window size
canvas.setAttribute('height', getComputedStyle(canvas)['height'])
canvas.setAttribute('width', getComputedStyle(canvas)['width'])


// get rendering context from the canvas
const ctx = canvas.getContext('2d')
console.log(ctx)

// testing canvas rendering 
// ctx.fillStyle ='red'
// ctx.fillRect(0,0,150,300)


// Event Listeners
startButton.addEventListener('click', startGame)
restartButton.addEventListener('click', restartGame)

// Functions
function startGame (){
    console.log(`start clicked`)
    gameLoopInterval = setInterval(gameLoop, 60)
}
function restartGame (){
    console.log(`restart clicked`)
    clearInterval(gameLoopInterval)
}
function pauseGame (){
    console.log(`restart clicked`)
    clearInterval(gameLoopInterval)
}

// Classes for on screen objects
class gameObject {
    constructor(x, y, width, height, color) {
        this.x = x
        this.y = y
        this.width = width
        this.height = height
        this.color = color

        this.alive = true
    }

    render () {
        ctx.fillStyle = this.color
        ctx.fillRect(this.x ,this.y, this.width, this.height)
    }
}
// game variables 
let gameLoopInterval = {}
const xWing = new gameObject(361, 775, 100, 100, 'blue')
const tieFighter = new gameObject(700, 450, 75, 75, 'red')
const pressedKeys = {}

// Render gameObjects
tieFighter.render()

//  Handling Movement
function createMovement(speed) {
    // console.log(event.key)
    // logic for moving the player around
    console.log(pressedKeys)
    if (pressedKeys.ArrowUp) {
        console.log(pressedKeys)
        xWing.y -= speed
    }
    if (pressedKeys.ArrowDown) {
        console.log(pressedKeys)
        xWing.y += speed
    }
    if (pressedKeys.ArrowRight) {
        console.log(pressedKeys)
        xWing.x += speed
    }
    if (pressedKeys.ArrowLeft) {
        console.log(pressedKeys)
        xWing.x -= speed
    }
    
    
    
    
}

//Event Listeners for keydown event
// document.addEventListener('keydown', createMovement)
document.addEventListener('keydown', e => pressedKeys[e.key] = true)
document.addEventListener('keyup', e => pressedKeys[e.key] = false)


// Define the game loop -> what happens when the game is running
function gameLoop(){
    // console.log(`gameLoop started`)
    // clear canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height)

    // pass the handle movement function
    createMovement(5)
    
    // render X-wing
    xWing.render()
    // check if game has been started (clicked start game)
    // render the game objects
    // check if any objects have been hit and end game

}