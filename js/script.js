// DOM Selectors 
const startButton = document.querySelector('#startButton')
const restartButton = document.querySelector('#restartButton')
const pauseButton = document.querySelector('#pauseButton')
const statusMessage = document.querySelector('#statusMessage')
const timer = document.querySelector('#timer')

// Global variables for speed 
const WIN_TIME = 12
const XWING_SPEED = 15
const INTERVAL_SPEED = 60
const randomSpeed = 1 
// Math.floor(Math.random() * 2)+1



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
    gameLoopInterval = setInterval(gameLoop, INTERVAL_SPEED)
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
    tieFighter1.x = canvas.width
    tieFighter1.y = 650
    tieFighter2.x = 0
    tieFighter2.y = 490
    tieFighter3.x = canvas.width
    tieFighter3.y = 330
    tieFighter4.x = 0
    tieFighter4.y = 170
    tieFighter5.x = canvas.width
    tieFighter5.y = 10
    restartButton.style.display = 'none'
    secondsPassed = 0
    clearInterval(secondsInterval)
    statusMessage.innerText = 'How long can you survive'
    gameLoopInterval = setInterval(gameLoop, INTERVAL_SPEED)
    // // interval for the runSeconds Function
    secondsInterval = setInterval(runSecondsPassed,1000)
}

// const xWing = new gameObject(xWingImage, canvas.width *.45, 750, 100, 75)
// const tieFighter1 = new gameObject(tieFighterImage, canvas.width, canvas.height * .8, 100, 75, 0)
// const tieFighter2 = new gameObject(tieFighterImage, 0, canvas.height * .6, 100, 75, 1)
// const tieFighter3 = new gameObject(tieFighterImage, canvas.width, canvas.height * .4, 100, 75, 2)
// const tieFighter4 = new gameObject(tieFighterImage, 0, canvas.height * .3, 100, 75, 3)
// const tieFighter5 = new gameObject(tieFighterImage, canvas.width, canvas.height * .1, 100, 75, 4)
// const asteroid1 = new gameObject(asteroid1Image, canvas.width * .9, 0, 100, 100, 0)
// const asteroid2 = new gameObject(asteroid2Image, canvas.width * .7, 0, 100, 100, 1)
// const asteroid3 = new gameObject(asteroid1Image, canvas.width * .4, 0, 100, 100, 2)
// const asteroid4 = new gameObject(asteroid2Image, canvas.width *.1, 0, 100, 100, 3)
// const comet = new gameObject(cometImage, canvas.width * .75, canvas.height, 75, 250)
// const meteor = new gameObject(meteorImage, canvas.width * .25, canvas.height, 100, 225)

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

        this.speed = Math.floor(Math.random() * 4)+1
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
const xWing = new gameObject(xWingImage, canvas.width * .45, canvas.height * .9, 100, 75)
const tieFighter1 = new gameObject(tieFighterImage, canvas.width, canvas.height * .8, 100, 75, 0)
const tieFighter2 = new gameObject(tieFighterImage, 0, canvas.height * .6, 100, 75, 1)
const tieFighter3 = new gameObject(tieFighterImage, canvas.width, canvas.height * .4, 100, 75, 2)
const tieFighter4 = new gameObject(tieFighterImage, 0, canvas.height * .3, 100, 75, 3)
const tieFighter5 = new gameObject(tieFighterImage, canvas.width, canvas.height * .1, 100, 75, 4)
const asteroid1 = new gameObject(asteroid1Image, canvas.width * .9, 0, 100, 100, 0)
const asteroid2 = new gameObject(asteroid2Image, canvas.width * .7, 0, 100, 100, 1)
const asteroid3 = new gameObject(asteroid1Image, canvas.width * .4, 0, 100, 100, 2)
const asteroid4 = new gameObject(asteroid2Image, canvas.width *.1, 0, 100, 100, 3)
const comet = new gameObject(cometImage, canvas.width * .75, 0, 75, 250, 0)
const meteor = new gameObject(meteorImage, canvas.width * .25, 0, 100, 225, 0)
// array of enemy objects
const tieArray = [tieFighter1, tieFighter2, tieFighter3, tieFighter4, tieFighter5]
const asteroidArray = [asteroid1, asteroid2, asteroid3, asteroid4]
const enemiesArray = [...tieArray, ...asteroidArray, comet, meteor]

const pressedKeys = {}

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

//the logic for xwing movement need to be reversed to see if an object is off of the screen !!!!!!!!!!!!!!!

//Event Listeners for keydown event
document.addEventListener('keydown', e => pressedKeys[e.key] = true)
document.addEventListener('keyup', e => pressedKeys[e.key] = false)

// controls tieFighter movement even object move right to left and odd objects move left to right 
function enemyMovement() {
    // logic for moving the AI across the screen
    tieArray.forEach(tieFighter => {
        // if even
        if (tieFighter.x >= 0 - tieFighter.width && tieFighter.id % 2 === 0) {
            tieFighter.x -= tieFighter.speed
            tieFighter.y -= tieFighter.speed
        // if odd    
        } else if(tieFighter.x >= 0 - tieFighter.width && tieFighter.id % 2 !== 0) {
            tieFighter.x += tieFighter.speed
            tieFighter.y -= tieFighter.speed
        } else { 
            tieFighter.x = canvas.width
            tieFighter.y = canvas.height * .8
        }
    })
}

function asteroidMovement() {
    // logic for moving the AI across the screen
    asteroidArray.forEach(asteroid => {
        if (asteroid.x >= 0 - asteroid.width && asteroid.id % 2 === 0) {
            // asteroid.x -= Math.floor(Math.random() * 4)+1
            asteroid.y += asteroid.speed
            asteroid.x -= asteroid.speed
            
        } else if(asteroid.id % 2 !== 0) {
            // asteroid.x += Math.floor(Math.random() * 4)+1
            asteroid.y += asteroid.speed
            asteroid.x += asteroid.speed
        } else {
            
        }
    })
}

function cometMovement() {
    if (comet.y <= canvas.height) {
        comet.y += 10
    } else {
        // comet.x = canvas.width * .75
        comet.y = 0 - comet.height
        comet.x = randomSpeed
    }
}

function meteorMovement() {
    meteor.y += 10
}


// set variable to count seconds 
let secondsPassed = 0
// adds to the seconds
function runSecondsPassed() {
    secondsPassed++
}

// Render gameObjects
xWing.render()

// Define the game loop -> what happens when the game is running
function gameLoop(){
    // clear canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height)
    timer.innerText = `Timer: ${secondsPassed} Seconds`
    let hit = false

    for (const enemy of enemiesArray) {
        if(detectCollision(enemy)) {
            hit = true
            console.log('hit something')
        }        
    }
    //if the xwing hits an object end the game 
    if(hit) {
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
    enemyMovement()
    asteroidMovement()
    cometMovement()
    meteorMovement()

    // pass the handle movement function and give speed setting
    xWingMovement(XWING_SPEED)
    // render X-wing and game objects
    xWing.render()
    // do a foreach loop on the enemies array 
    tieFighter1.render()
    tieFighter2.render()
    tieFighter3.render()
    tieFighter4.render()
    tieFighter5.render()
    asteroid1.render()
    asteroid2.render()
    asteroid3.render()
    asteroid4.render()
    comet.render()
    meteor.render()
}

//from canvas crawler (link)
function detectCollision (enemy) {
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

