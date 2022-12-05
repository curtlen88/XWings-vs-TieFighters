// DOM Selectors 
const startButton = document.querySelector('#startButton')
const restartButton = document.querySelector('#restartButton')
const pauseButton = document.querySelector('#pauseButton')
const statusMessage = document.querySelector('#statusMessage')
const timer = document.querySelector('#timer')
const WIN_TIME = 12
const XWING_SPEED = 15
const randomSpeed = Math.floor(Math.random() * 20)+1

const ENEMY_SPEED = randomSpeed
const xWingImage = new Image()
    xWingImage.src = "../img/chickenXwing.png"
const tieFighterImage = new Image()
    tieFighterImage.src = "../img/bowtiefighter.png"
// console.log(startButton, pauseButton)

//reset canvas pixels window size
canvas.setAttribute('height', getComputedStyle(canvas)['height'])
canvas.setAttribute('width', getComputedStyle(canvas)['width'])

// get rendering context from the canvas
const ctx = canvas.getContext('2d')
// console.log(ctx)

// Event Listeners
startButton.addEventListener('click', startGame)
pauseButton.addEventListener('click', pauseGame)
restartButton.addEventListener('click', restartGame)

// sets an open variable in the global scope
let secondsInterval

// Functions
function startGame (){
    // console.log(`start clicked`)
    gameLoopInterval = setInterval(gameLoop, 60)
    secondsPassed = 0
    // interval for the runSeconds Function
    secondsInterval = setInterval(runSecondsPassed,1000)
    restartButton.style.display = 'none'
}

function restartGame (){
    clearInterval(gameLoopInterval)
    ctx.clearRect(0, 0, canvas.width, canvas.height)
    // console.log(`restart clicked`)
    xWing.alive === true
    xWing.x = 425
    xWing.y = 750
    tieFighter1.x = 1000
    tieFighter1.y = 450
    tieFighter2.x = 1000
    tieFighter3.y = 350
    tieFighter3.x = 1000
    tieFighter3.y = 250
    restartButton.style.display = 'none'
    secondsPassed = 0
    clearInterval(secondsInterval)
    statusMessage.innerText = 'How long can you survive'
    gameLoopInterval = setInterval(gameLoop, 60)
    // // interval for the runSeconds Function
    secondsInterval = setInterval(runSecondsPassed,1000)
    
}

function pauseGame (){
    // console.log(`pause clicked`)
    clearInterval(gameLoopInterval)
    // startButton.innerText = 'Resume'
}

// Classes for on screen objects
class gameObject {
    constructor(image, x, y, width, height) {
        this.image = image
        this.x = x
        this.y = y
        this.width = width
        this.height = height

        this.alive = true
    }

    render () {
        // ctx.fillStyle = this.color
        // ctx.fillRect(this.x ,this.y, this.width, this.height)
        ctx.drawImage(this.image, this.x, this.y, this.width, this.height)
    }
}
// game variables 
// const screenRight = parseFloat(getComputedStyle(canvas).height,10)
// const screenBottom = parseFloat(getComputedStyle(canvas).width,10)
let gameLoopInterval = {}
const xWing = new gameObject(xWingImage, 425, 750, 150, 150)
const tieFighter1 = new gameObject(tieFighterImage, 1000, 450, 150, 150)
const tieFighter2 = new gameObject(tieFighterImage, 1000, 350, 150, 150)
const tieFighter3 = new gameObject(tieFighterImage, 1000, 250, 150, 150)
const tieFighter4 = new gameObject(tieFighterImage, 1000, 150, 150, 150)
const tieFighter5 = new gameObject(tieFighterImage, 1000, 100, 150, 150)
const tieFighter6 = new gameObject(tieFighterImage, 1000, 75, 150, 150)
const tieFighter7 = new gameObject(tieFighterImage, 1000, 25, 150, 150)
const tieFighter8 = new gameObject(tieFighterImage, 1000, 15, 150, 150)
const tieFighter9 = new gameObject(tieFighterImage, 1000, 5, 150, 150)
const tieFighterArray = [tieFighter1, tieFighter2, tieFighter3, tieFighter4, tieFighter5, tieFighter6, tieFighter7, tieFighter8, tieFighter9]

const pressedKeys = {}
// Render gameObjects
xWing.render()
 
//  Handling Movement
function xWingMovement(speed) {
    // logic for moving the player around
    if (pressedKeys.ArrowUp && xWing.y > 0) {
        // console.log(pressedKeys)
        xWing.y -= speed
    }
    if (pressedKeys.ArrowDown && xWing.y < 900 - xWing.height) {
        // console.log(pressedKeys)
        xWing.y += speed
    }
    if (pressedKeys.ArrowRight && xWing.x < 1000 - xWing.width) {
        // console.log(pressedKeys)
        xWing.x += speed
    }
    if (pressedKeys.ArrowLeft && xWing.x > 0) {
        // console.log(pressedKeys)
        xWing.x -= speed
    }
}

//Event Listeners for keydown event
// document.addEventListener('keydown', xWingMovement)
document.addEventListener('keydown', e => pressedKeys[e.key] = true)
document.addEventListener('keyup', e => pressedKeys[e.key] = false)

// handling AI movement
function enemyMovement(speed, tieFighter) {
    // logic for moving the AI across the screen
    if (tieFighter.x >= 0 - tieFighter.width) {
        tieFighter.x -= speed
        // tieFighter.y += speed
    }
}

// set variable to count seconds 
let secondsPassed = 0
// adds to the seconds
function runSecondsPassed() {
    secondsPassed++
    // console.log(secondsPassed)
}

// Define the game loop -> what happens when the game is running
function gameLoop(){
    // console.log(gameLoopInterval)
    // clear canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height)
    timer.innerText = `Timer: ${secondsPassed} Seconds`
    //if the xwing hits an object end the game 
    tieFighterArray.forEach(tieFighter => {
        if(detectCollision(xWing,tieFighter)) {
                    // console.log('object hit')
        xWing.alive = false
        // display you died message 
        statusMessage.innerText = ('You Died')
        restartButton.style.display = 'flex'
        clearInterval(gameLoopInterval)
        clearInterval(secondsInterval)
        }else if(secondsPassed > WIN_TIME) {
            statusMessage.innerText = 'You Won'
        }
        // enemyMovement(ENEMY_SPEED)
        enemyMovement(ENEMY_SPEED, tieFighter)
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
    tieFighter6.render()
    tieFighter7.render()
    tieFighter8.render()
    tieFighter9.render()
}

//from canvas crawler (link)
function detectCollision (xWing, enemy) {
        // check for overlaps, side by side
        const left = xWing.x + xWing.width >= enemy.x 
        const right = xWing.x <= enemy.x + enemy.width
        const top = xWing.y + xWing.height >= enemy.y
        const bottom = xWing.y <= enemy.y + enemy.height
        // console.log(left, right, top, bottom)
        return left && right && top && bottom
}


// source for adding the images to game -> https://developer.mozilla.org/en-US/docs/Web/API/Canvas_API/Tutorial/Using_images

