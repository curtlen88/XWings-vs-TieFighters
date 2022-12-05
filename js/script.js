// DOM Selectors 
const startButton = document.querySelector('#startButton')
const restartButton = document.querySelector('#restartButton')
const pauseButton = document.querySelector('#pauseButton')
const statusMessage = document.querySelector('#statusMessage')
const timer = document.querySelector('#timer')

// Global variables for speed 
const WIN_TIME = 12
const XWING_SPEED = 15
const randomSpeed = Math.floor(Math.random() * 4)+1
const tieFighterSpeed = 2
const ASTEROID_SPEED = 10
const COMET_METEOR_SPEED = 20

// variables to select images
const xWingImage = new Image()
    xWingImage.src = "../img/chickenXwing.png"
const tieFighterImage = new Image()
    tieFighterImage.src = "../img/bowtiefighter.png"
const asteroid1Image = new Image()
    asteroid1Image.src = "../img/asteroid1.png"
const asteroid2Image = new Image()
    asteroid2Image.src = "../img/asteroid2.png"
const cometImage = new Image()
    cometImage.src = "../img/comet.png"
const meteorImage = new Image()
    meteorImage.src = "../img/meteor.png"

//reset canvas pixels window size
canvas.setAttribute('height', getComputedStyle(canvas)['height'])
canvas.setAttribute('width', getComputedStyle(canvas)['width'])

// get rendering context from the canvas
const ctx = canvas.getContext('2d')

// Event Listeners
startButton.addEventListener('click', startGame)
pauseButton.addEventListener('click', pauseGame)
restartButton.addEventListener('click', restartGame)

// sets an open variable in the global scope
let secondsInterval

// Functions for buttons
function startGame(){
    gameLoopInterval = setInterval(gameLoop, 60)
    secondsPassed = 0
    // interval for the runSeconds Function
    secondsInterval = setInterval(runSecondsPassed,1000)
    restartButton.style.display = 'none'
}

function restartGame (){
    clearInterval(gameLoopInterval)
    ctx.clearRect(0, 0, canvas.width, canvas.height)
    xWing.alive === true
    xWing.x = 425
    xWing.y = 750
    tieFighter1.x = 1000
    tieFighter1.y = 650
    tieFighter2.x = 0
    tieFighter2.y = 490
    tieFighter3.x = 1000
    tieFighter3.y = 330
    tieFighter4.x = 0
    tieFighter4.y = 170
    tieFighter5.x = 1000
    tieFighter5.y = 10
    restartButton.style.display = 'none'
    secondsPassed = 0
    clearInterval(secondsInterval)
    statusMessage.innerText = 'How long can you survive'
    gameLoopInterval = setInterval(gameLoop, 60)
    // // interval for the runSeconds Function
    secondsInterval = setInterval(runSecondsPassed,1000)
}

function pauseGame (){
    clearInterval(gameLoopInterval)
}

// Classes for on screen objects
class gameObject {
    constructor(image, x, y, width, height, id) {
        this.image = image
        this.x = x
        this.y = y
        this.width = width
        this.height = height        
        this.id = id

        this.alive = true
    }
    render () {
        ctx.drawImage(this.image, this.x, this.y, this.width, this.height)
    }
}
// game variables 
// const screenRight = parseFloat(getComputedStyle(canvas).height,10)
// const screenBottom = parseFloat(getComputedStyle(canvas).width,10)
let gameLoopInterval = {}
// new game objects
const xWing = new gameObject(xWingImage, 425, 750, 200, 150)
const tieFighter1 = new gameObject(tieFighterImage, 1000, 650, 150, 100, 0)
const tieFighter2 = new gameObject(tieFighterImage, 0, 490, 150, 100, 1)
const tieFighter3 = new gameObject(tieFighterImage, 1000, 330, 150, 100, 2)
const tieFighter4 = new gameObject(tieFighterImage, 0, 170, 150, 100, 3)
const tieFighter5 = new gameObject(tieFighterImage, 1000, 10, 150, 100, 4)
const asteroid1 = new gameObject(asteroid1Image, 1000, 250, 100, 100, 0)
const asteroid2 = new gameObject(asteroid2Image, 1000, 450, 100, 100, 1)
const comet = new gameObject(cometImage, 1000, 50, 75, 250)
const meteor = new gameObject(meteorImage, 1000, 5, 100, 225)
// array of enemy objects
const tieArray = [tieFighter1, tieFighter2, tieFighter3, tieFighter4, tieFighter5]

const asteroidArray = [asteroid1, asteroid2]

const pressedKeys = {}
// Render gameObjects
xWing.render()
 

console.log(canvas)
//  Handling Movement
function xWingMovement(speed) {
    // logic for moving the player around
    if (pressedKeys.ArrowUp && xWing.y > 0) {
        xWing.y -= speed
    }
    if (pressedKeys.ArrowDown && xWing.y < canvas.height - xWing.height) {
        xWing.y += speed
    }
    if (pressedKeys.ArrowRight && xWing.x < canvas.width - xWing.width) {
        xWing.x += speed
    }
    if (pressedKeys.ArrowLeft && xWing.x > 5) {
        xWing.x -= speed
    }
}

//Event Listeners for keydown event
document.addEventListener('keydown', e => pressedKeys[e.key] = true)
document.addEventListener('keyup', e => pressedKeys[e.key] = false)

// controls tieFighter movement even object move right to left and odd objects move left to right 
function enemyMovement(speed) {
        // logic for moving the AI across the screen
    tieArray.forEach(tieFighter => {
        if (tieFighter.x >= 0 - tieFighter.width && tieFighter.id % 2 === 0) {
            tieFighter.x -= Math.floor(Math.random() * 4)+1
        } else if(tieFighter.x >= 0 - tieFighter.width && tieFighter.id % 2 === 1) {
            tieFighter.x += Math.floor(Math.random() * 4)+1
        } else {
            ctx.clearRect(0, 0, canvas.width, canvas.height)
        }
    })
}

function objectMovement(speed) {
    asteroidArray.forEach
}

// set variable to count seconds 
let secondsPassed = 0
// adds to the seconds
function runSecondsPassed() {
    secondsPassed++
}

// Define the game loop -> what happens when the game is running
function gameLoop(){
    // clear canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height)
    timer.innerText = `Timer: ${secondsPassed} Seconds`
    //if the xwing hits an object end the game 
    tieArray.forEach(tieFighter => {
        if(detectCollision(xWing,tieFighter)) {
        xWing.alive = false
        // display you died message 
        statusMessage.innerText = ('You Died')
        restartButton.style.display = 'flex'
        clearInterval(gameLoopInterval)
        clearInterval(secondsInterval)
        }else if(secondsPassed > WIN_TIME) {
            statusMessage.innerText = 'You Won'
        }
        // tieFighterMovement(tieFighterSpeed)
        enemyMovement(tieFighterSpeed, tieFighter)
    })
    // pass the handle movement function and give speed setting
    xWingMovement(XWING_SPEED)
    // render X-wing and game objects
    xWing.render()
    tieFighter1.render()
    tieFighter2.render()
    tieFighter3.render()
    tieFighter4.render()
    tieFighter5.render()
    asteroid1.render()
    asteroid2.render()
    comet.render()
    meteor.render()
}

//from canvas crawler (link)
function detectCollision (xWing, enemy) {
        // check for overlaps, side by side
        const left = xWing.x + xWing.width >= enemy.x 
        const right = xWing.x <= enemy.x + enemy.width
        const top = xWing.y + xWing.height >= enemy.y
        const bottom = xWing.y <= enemy.y + enemy.height
        return left && right && top && bottom
}


// source for adding the images to game -> https://developer.mozilla.org/en-US/docs/Web/API/Canvas_API/Tutorial/Using_images
// Tyler helped me with the 
// Jay helped with the forEach loop to detect collision on each object 
// Devin helped with the reset button and understanding the MDN for adding images

