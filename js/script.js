// Selectors 
const startButton = document.querySelector('#startButton')
const restartButton = document.querySelector('#restartButton')
const pauseButton = document.querySelector('#pauseButton')
const statusMessage = document.querySelector('#statusMessage')
const timer = document.querySelector('#timer')

// Global variables for speed 
const WIN_TIME = 10
const XWING_SPEED = 20
const INTERVAL_SPEED = 60

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

// random number function
function random(min, max) {
    return Math.floor(Math.random() * (max-min)) + min
}

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
    xWing.x = canvas.width * .45
    xWing.y = canvas.height *.89
    
    // for lop to to iterate through these
    tieFighter1.x = canvas.width 
    tieFighter1.y = canvas.height * .9
    tieFighter2.x = 0
    tieFighter2.y = canvas.height * .75
    tieFighter3.x = canvas.width
    tieFighter3.y = canvas.height * .6
    tieFighter4.x = 0
    tieFighter4.y = canvas.height * .45
    tieFighter5.x = canvas.width
    tieFighter5.y = canvas.height * .3
    tieFighter6.x = 0
    tieFighter6.y = canvas.height * .15
    asteroid1.x = canvas.width * .9
    asteroid1.y = 0
    asteroid2.x = canvas.width * .7
    asteroid2.y = 0
    asteroid3.x = canvas.width * .4
    asteroid3.y = 0
    asteroid4.x = canvas.width *.1
    asteroid4.y = 0
    comet.x = canvas.width * .75,
    comet.y = -250
    meteor.x = canvas.width * .25
    meteor.y = -225
    restartButton.style.display = 'none'
    secondsPassed = 0
    clearInterval(secondsInterval)
    statusMessage.innerText = 'How long can you survive'
    gameLoopInterval = setInterval(gameLoop, INTERVAL_SPEED)
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
        
        this.speed = random(6, 15)
        this.negativeSpeed = random(-4, 4)
        this.fastSpeed = random(15, 35)
        this.xPosition = random(50, 900)
        this.yPosition = random(50, 950)
        this.alive = true
    }
    render () {
        ctx.drawImage(this.image, this.x, this.y, this.width, this.height)
    }
}
// game variables 
let gameLoopInterval = {}
// new game objects
    const xWing = new gameObject(xWingImage, canvas.width * .45, canvas.height * .89, 100, 75)
    const tieFighter1 = new gameObject(tieFighterImage, canvas.width, canvas.height * .9, 100, 75, 0)
    const tieFighter2 = new gameObject(tieFighterImage, 0, canvas.height * .75, 100, 75, 1)
    const tieFighter3 = new gameObject(tieFighterImage, canvas.width, canvas.height * .6, 100, 75, 2)
    const tieFighter4 = new gameObject(tieFighterImage, 0, canvas.height * .45, 100, 75, 3)
    const tieFighter5 = new gameObject(tieFighterImage, canvas.width, canvas.height * .3, 100, 75, 4)
    const tieFighter6 = new gameObject(tieFighterImage, 0, canvas.height * .15, 100, 75, 5)
    const asteroid1 = new gameObject(asteroid1Image, canvas.width * .9, 0, 100, 100, 0)
    const asteroid2 = new gameObject(asteroid2Image, canvas.width * .7, 0, 100, 100, 1)
    const asteroid3 = new gameObject(asteroid1Image, canvas.width * .4, 0, 100, 100, 2)
    const asteroid4 = new gameObject(asteroid2Image, canvas.width *.1, 0, 100, 100, 3)
    const comet = new gameObject(cometImage, canvas.width * .75, -250, 75, 250, 0)
    const meteor = new gameObject(meteorImage, canvas.width * .25, -225, 100, 225, 0)
// arrays of objects
    const tieArray = [tieFighter1, tieFighter2, tieFighter3, tieFighter4, tieFighter5, tieFighter6]
    const asteroidArray = [asteroid1, asteroid2, asteroid3, asteroid4]
    const enemiesArray = [...tieArray, ...asteroidArray, comet, meteor]

// open variable for what key is pressed
const pressedKeys = {}

// Render gameObjects
xWing.render()

console.log(canvas)
//  Handling Movement
function xWingMovement(speed) {
    // logic for moving the player around
    // arrow up pressed and xWing y axis if greater than 0
    if (pressedKeys.ArrowUp && xWing.y > 0) {
        xWing.y -= speed
    // arrow down pressed and xWing y ||| greater than canvas height minus xWing height
    }
    if (pressedKeys.ArrowDown && xWing.y < canvas.height - xWing.height) {
        xWing.y += speed
    }
    // arrow right and xwing x --- less than canvas width minus xWing height
    if (pressedKeys.ArrowRight && xWing.x < canvas.width - xWing.width) {
        xWing.x += speed
    }
    // arrow left and xWing x greater than 5 
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
    tieArray.forEach(tie => {
        // if even array position
        if (tie.id % 2 === 0) {
            tie.x -= tie.speed
            tie.y -= tie.negativeSpeed
        // if odd array position    
        } else if(tie.id % 2 !== 0) {
            tie.x += tie.speed
            tie.y -= tie.negativeSpeed
        }
        // checks if image has left the screen x axis
        if (tie.x < 0 - tie.width && tie.id % 2 === 0){
            tie.x = canvas.width + tie.width
            tie.y = tie.yPosition
            
        } else if (tie.x > canvas.width + tie.width && tie.id % 2 !== 0) {
            tie.x = 0 - tie.width
            tie.y = tie.yPosition
        }
    })
}

function asteroidMovement() {
    // logic for moving the AI across the screen
    asteroidArray.forEach(asteroid => {
        // odd array object movement
        if (asteroid.id % 2 === 0) {
            asteroid.y += asteroid.speed
            asteroid.x -= asteroid.negativeSpeed
            console.log(asteroid.negativeSpeed)
        // even array object movement 
        } else if(asteroid.id % 2 !== 0) {
            asteroid.y += asteroid.speed
            asteroid.x += asteroid.negativeSpeed
            console.log(asteroid.negativeSpeed)
        } 
        // if off the canvas move back to original position
        if(asteroid.y >= canvas.height || asteroid.x >= canvas.width && asteroid.id % 2 === 0) {
            asteroid.x = asteroid.xPosition
            asteroid.y = 0 - asteroid.height
        }else if (asteroid.y >= canvas.height | asteroid.x >= canvas.width && asteroid.id % 2 !== 0) {
            asteroid.x = asteroid.xPosition
            asteroid.y = 0 - asteroid.height
        }
    })
}

function cometMovement() {
    // if comet is on the canvas add to y position
    if (comet.y <= canvas.height) {
        comet.y += comet.fastSpeed
    // if comet is off screen reset to top of the screen 
    } else {
        comet.y = 0 - comet.height
        comet.x = comet.xPosition
    }
}

function meteorMovement() {
    // if meteor is on the canvas do this 
    if (meteor.y <= canvas.height) {
        meteor.y += meteor.fastSpeed
    // if meteor is off screen reset to top of screen
    } else {
        meteor.y = 0 - meteor.height
        meteor.x = meteor.xPosition
    }
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
    let hit = false
    // for of loop through the enemiesArray to detect a collision on each object 
    for (const enemy of enemiesArray) {
        if(detectCollision(enemy)) {
            hit = true
        }        
    }
    //if the xWing hits an object end the game 
        if(hit) {
            // display you died message 
            statusMessage.innerText = ('You Died')
            restartButton.style.display = 'flex'
            clearInterval(gameLoopInterval)
        clearInterval(secondsInterval)
    }else if(secondsPassed > WIN_TIME) {
            statusMessage.innerText = 'You Won'
    }
    enemyMovement()
    asteroidMovement()
    cometMovement()
    meteorMovement()
    // pass the handle movement function and give speed setting
    xWingMovement(XWING_SPEED)
    // render X-wing
    xWing.render()
    //loops the enemies array to render all enemy objects 
    enemiesArray.forEach(enemy => {
        enemy.render()
    })
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
// math.random function with min max parameter ->https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Math/random