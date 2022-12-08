// selecting buttons
const startButton = document.querySelector('#startButton')
const restartButton = document.querySelector('#restartButton')
const pauseButton = document.querySelector('#pauseButton')
const statusMessage = document.querySelector('#statusMessage')
const timer = document.querySelector('#timer')

// global variables for speed 
const WIN_TIME = 10
const XWING_SPEED = 20
const INTERVAL_SPEED = 60

// variables to select images
const xWingImage = new Image()
xWingImage.src = "./img/chickenXwing.png"
const tieFighterImage = new Image()
tieFighterImage.src = "./img/bowtiefighter.png"
const asteroid1Image = new Image()
asteroid1Image.src = "./img/asteroid1.png"
const asteroid2Image = new Image()
asteroid2Image.src = "./img/asteroid2.png"
const cometImage = new Image()
cometImage.src = "./img/comet.png"
const meteorImage = new Image()
meteorImage.src = "./img/meteor.png"

//reset canvas pixels window size
canvas.setAttribute('height', getComputedStyle(canvas)['height'])
canvas.setAttribute('width', getComputedStyle(canvas)['width'])

// get rendering context from the canvas
const ctx = canvas.getContext('2d')

// event Listeners
startButton.addEventListener('click', startGame)
pauseButton.addEventListener('click', pauseGame)
restartButton.addEventListener('click', restartGame)

// sets an open secondsInterval and gameLoopInterval in the global scope
let secondsInterval
let gameLoopInterval

// random number function
function random(min, max) {
    return Math.floor(Math.random() * (max-min)) + min
}

// function for start button
function startGame(){
    // set the game loop interval
    gameLoopInterval = setInterval(gameLoop, INTERVAL_SPEED)
    // set seconds passed to 0 
    secondsPassed = 0
    // set the seconds interval to 1 sec
    secondsInterval = setInterval(runSecondsPassed,1000)
    // update reset button css display to none
    restartButton.style.display = 'none'
}

function restartGame (){
    // clear the game loop interval
    clearInterval(gameLoopInterval)
    // clear the canvas images
    ctx.clearRect(0, 0, canvas.width, canvas.height)
    // resets the xwing position
    xWing.x = canvas.width * .45
    xWing.y = canvas.height *.89
    // for lop to apply random off screen position to tie fighters
    tieArray.forEach(tie => {
        if (tie.id % 2 === 0) {
            tie.x = canvas.width + tie.width
            tie.y = canvas.height * Math.random()
            console.log(tieFighter1)
        }else if(tie.id % 2 !== 0)
            tie.x = 0
            tie.y = canvas.height * Math.random()        
    })
    // for loop to apply random off screen position to asteroids
    asteroidArray.forEach(asteroid => {
        asteroid.x = canvas.width * Math.random()
        asteroid.y = 0 - asteroid.height
    })
    //resets comet and meteors to random off screen position
    comet.x = canvas.width * Math.random()
    comet.y = 0 - comet.height
    meteor.x = canvas.width * Math.random()
    meteor.y = 0 - meteor.height
    // removes restart button 
    restartButton.style.display = 'none'
    // sets seconds passed to 0
    secondsPassed = 0
    // make the status message go back to original statement
    statusMessage.innerText = 'How long can you survive?'
    //applies the game loop and seconds interval
    gameLoopInterval = setInterval(gameLoop, INTERVAL_SPEED)
    secondsInterval = setInterval(runSecondsPassed,1000)
}

// pauses the game by clearing the gameLoopInterval
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
        
        this.xSpeed = random(5, 15)
        this.ySpeed = random(15, 25)
        this.negativeSpeed = random(-4, 4)
    }
    render () {
        ctx.drawImage(this.image, this.x, this.y, this.width, this.height)
    }
}


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

//  handles xwing movement
function xWingMovement(speed) {
    // logic for moving the player around based on the arrow pressed, prevent further movement if at an edge of the canvas
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

// event Listeners for keydown event
document.addEventListener('keydown', e => pressedKeys[e.key] = true)
document.addEventListener('keyup', e => pressedKeys[e.key] = false)

// controls tieFighter movement even object move right to left and odd objects move left to right 
function enemyMovement() {
    // logic for moving the AI across the screen
    tieArray.forEach(tie => {
        // if even array position add speed
        if (tie.id % 2 === 0) {
            tie.x -= tie.xSpeed
            tie.y -= tie.negativeSpeed
        // if odd array position add speed
        } else if(tie.id % 2 !== 0) {
            tie.x += tie.xSpeed
            tie.y -= tie.negativeSpeed
        }

        // if even and image has left the screen and resets to random position and speed 
        if (tie.x < 0 - tie.width && tie.id % 2 === 0){
            tie.x = canvas.width + tie.width
            tie.y = canvas.height * Math.random()
            tie.xSpeed = random(5, 15)
            tie.negativeSpeed = random(-4, 4)
        // if odd and image has left the screen and resets to random position and speed 
        } else if (tie.x > canvas.width + tie.width && tie.id % 2 !== 0) {
            tie.x = 0 - tie.width
            tie.y = canvas.height * Math.random()
            tie.xSpeed = random(5, 15)
            tie.negativeSpeed = random(-4, 4)
        }
    })
}

// Asteroid movement function
function asteroidMovement() {
    // logic for moving the asteroid across the screen
    asteroidArray.forEach(asteroid => {
        // odd array object movement
        if (asteroid.id % 2 === 0) {
            asteroid.y += asteroid.ySpeed
            asteroid.x -= asteroid.negativeSpeed

        // even array object movement 
        } else if(asteroid.id % 2 !== 0) {
            asteroid.y += asteroid.ySpeed
            asteroid.x += asteroid.negativeSpeed
        } 
        // if even and off the canvas move back to random position
        if(asteroid.y >= canvas.height || asteroid.x >= canvas.width && asteroid.id % 2 === 0) {
            asteroid.x = canvas.width * Math.random()
            asteroid.y = 0 - asteroid.height
            asteroid.ySpeed = random(10, 25)
            asteroid.negativeSpeed = random(-8, 8)
        // if odd and off the canvas move back to random position
        }else if (asteroid.y >= canvas.height | asteroid.x >= canvas.width && asteroid.id % 2 !== 0) {
            asteroid.x = canvas.width * Math.random()
            asteroid.y = 0 - asteroid.height
            asteroid.ySpeed = random(10, 25)
            asteroid.negativeSpeed = random(-8, 8)
        }
    })
}

function cometMovement() {
    // if comet is on the canvas add to y position
    if (comet.y <= canvas.height) {
        comet.y += comet.ySpeed
    // if comet is off screen reset to top of the screen 
    } else {
        comet.y = 0 - comet.height
        comet.x = canvas.width * Math.random()
        comet.ySpeed = random(15, 45)
    }
}

function meteorMovement() {
    // if meteor is on the canvas do this 
    if (meteor.y <= canvas.height) {
        meteor.y += meteor.ySpeed
    // if meteor is off screen reset to top of screen
    } else {
        meteor.y = 0 - meteor.height
        meteor.x = canvas.width * Math.random()
        meteor.ySpeed = random(15, 35)
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
            statusMessage.innerText = ('You fell to the evil hands of the Empire')
            restartButton.style.display = 'flex'
            clearInterval(gameLoopInterval)
            clearInterval(secondsInterval)
        }else if(secondsPassed >= WIN_TIME) {
            statusMessage.innerText = 'You Won'
        }
    // invoke movement functions 
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

// collision logic from canvas crawler
function detectCollision (enemy) {
        // check for overlaps, side by side
        const left = xWing.x + xWing.width >= enemy.x
        const right = xWing.x <= enemy.x + enemy.width
        const top = xWing.y + xWing.height >= enemy.y
        const bottom = xWing.y <= enemy.y + enemy.height
        return left && right && top && bottom
}