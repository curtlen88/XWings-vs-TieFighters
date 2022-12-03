// DOM Selectors 
const startButton = document.querySelector('#startButton')
const restartButton = document.querySelector('#restartButton')
const pauseButton = document.querySelector('#pauseButton')
const statusMessage = document.querySelector('#statusMessage')
const timer = document.querySelector('#timer')
const WIN_TIME = 12
const XWING_SPEED = 15
const ENEMY_SPEED = 10
const xWingImage = new Image()
    xWingImage.src = "../img/xwing.png"
    xWingImage.width = 150
    xWing
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
    xWing.x = 450
    xWing.y = 785
    tieFighter.x = 1000
    tieFighter.y = 450
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
// // image object class
// class imageObject {
//     constructor(image,x,y,width,height) {
//         this.image = image
//         this.x = x
//         this.y = y
//         this.width = width
//         this.height = height

//         this.alive = true
//     }

//     render () {
//         ctx.fillImg(this.image, this.x, this.y, this.width, this.height)
//     }
// }
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
        ctx.drawImage(this.image, this.x, this.y)
    }
}
// game variables 
// const screenRight = parseFloat(getComputedStyle(canvas).height,10)
// const screenBottom = parseFloat(getComputedStyle(canvas).width,10)
let gameLoopInterval = {}
const xWing = new gameObject(xWingImage, 450, 785, 100, 100)
const tieFighter = new gameObject(xWingImage, 1000, 450, 75, 75)
const pressedKeys = {}
// const randomHeight = 100 + Math.floor(math.random() * 200)

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
function enemyMovement(speed) {
    // logic for moving the AI across the screen
    if (tieFighter.x >= 0 - tieFighter.width) {
        // console.log(pressedKeys)
        tieFighter.x -= speed
        // tieFighter.y += speed
    } else {
        ctx.clearRect(0, 0, canvas.width, canvas.height)
    }
}

// set variable to count seconds 
let secondsPassed = 0
// adds to the seconds
function runSecondsPassed() {
    secondsPassed++
    console.log(secondsPassed)
}

// Define the game loop -> what happens when the game is running
function gameLoop(){
    // console.log(gameLoopInterval)
    // clear canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height)
    timer.innerText = `Timer: ${secondsPassed} Seconds`
    //if the xwing hits an object end the game 
    if(detectCollision(xWing, tieFighter)) {
        // console.log('object hit')
        xWing.alive = false
        // display you died message 
        statusMessage.innerText = ('You Died')
        restartButton.style.display = 'flex'
        clearInterval(gameLoopInterval)
        clearInterval(secondsInterval)
    } else if(secondsPassed > WIN_TIME) {
        statusMessage.innerText = 'You Won'
    }
    // pass the handle movement function and give speed setting
    xWingMovement(XWING_SPEED)
    enemyMovement(ENEMY_SPEED)
    // render X-wing and game objects
    xWing.render()
    tieFighter.render()
}

//from canvas crawler (link)
function detectCollision (objectOne, objectTwo) {
        // check for overlaps, side by side
        const left = objectOne.x + objectOne.width >= objectTwo.x
        const right = objectOne.x <= objectTwo.x + objectTwo.width
        const top = objectOne.y + objectOne.height >= objectTwo.y
        const bottom = objectOne.y <= objectTwo.y + objectTwo.height
        // console.log(left, right, top, bottom)
        return left && right && top && bottom
}