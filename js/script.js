// DOM Selectors 
const startButton = document.querySelector('#startButton')
const restartButton = document.querySelector('#restartButton')
console.log(startButton, restartButton)


//reset canvas resolution to window size
canvas.setAttribute('height', getComputedStyle(canvas)['height'])
canvas.setAttribute('width', getComputedStyle(canvas)['width'])


// get rendering context from the canvas
const ctx = canvas.getContext('2d')
console.log(ctx)

// testing canvas rendering 
// ctx.fillStyle ='red'
// ctx.fillRect(0,0,150,300)


// Event Liserners
startButton.addEventListener('click', startGame)
restartButton.addEventListener('click', restartGame)

// Functions
function startGame (){
    console.log(`start clicked`)
}
function restartGame (){
    console.log(`restart clicked`)
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
// const gameLoopInterval = setInterval(gameLoop, 60)
const xWing = new gameObject(5, 145, 25, 25, 'hotpink')
const tieFighter = new gameObject(50, 50, 50, 75, 'green')
// const pressedKeys = {}

// Render gameObjects
xWing.render()
tieFighter.render()