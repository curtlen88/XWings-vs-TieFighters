# X-Wing-vs-TieFighters

A long time ago in a galaxy inside your browser....

With the Galxay in a state of chaos you must survive the Empires fleet of tie fighter in order to aid the rebellion in there next attemt to thwart the Emperors evil plans. 

Use the force... of your fingers and your best pilot skills to navigate through the dreaded Tie Fighter Army!

# Play the Game Here

https://curtlen88.github.io/XWings-vs-TieFighters/

# About the Game

X-Wing vs Tie Fighters will be a 2D collision avoidance game. The game will start with a start button clicked. The X-Wing will avoid a field of passing by Tie Fighters. If the X-Wing hits a Tie the game will be over. A message will be displayed telling the user they have "You fell to the evil hands of the Empire" and a resart button will allow them to restart. The player will start from the begining everytime they die. If the X-Wing successfully navigates the Tie Fighters for long enough they win, but will have the option to continue to see how long they can survive. 

# Tech Used
* HTML
* Canvas
* CSS
* Javascript

# Wireframe
![Untitled](https://user-images.githubusercontent.com/116519447/204971379-3ef50bfd-4337-4374-a654-3c67788dfa36.png)




# How to Play

Move your Tie Fighter using the arrow keys to avoid the incoming Tie Fighters 

Survive long enough and you win!

# MVP 

* render and X-Wing and Tie Fighter shape to game screen.
* Start button to begin the game
* Ability to move the X-Wing
* Have Tie Fighter Cross screen entering from right and exiting to the left 
* Collision Detection stopping game play, prompting a "you died" message, and a restart button 
* Timer showing how long the player has survived
* Message displaying the player survived the Tie fighters long enough and has won with the option to contiue playing at current position

# Strech Goals

* Make the Tie Fighters Move enter left of screen exit right of screen, and enter top of screen exit bottom of screen
* Add a background to simulate motion
* Add meteors that travel faster than the Tie Fighters
* Add and option for a parody mode where the sprites for X-Wing are chicken legs in the shape of an X, and a Tie Fighter sprite that are bow ties in the shape of a Tie Fighter

# Super-Strech Goals

* Give the X-Wing the ability to shoot and destroy Tie Fighters and asteroids in its path
* Make the X-wing bullets chicken nuggets 

# Roadblocks

* Having the Tie fighters move across the screen
* Tracking the time played 
* Allowing the player to continue from current position once the winning time limit has been reached 

# Approach

I approached this project as many small steps. I started out pseudo coding to get a basic understanding of how the game needed to operate. 

After pseudo coding, I started getting the basic HTML elements and applying some very basic CSS coding to help me visually see what I was making before writing my JavaScript. With the basic HTML and CSS in place I added two objects to the canvas by making a class utilizing the constructor. Once I had the objects created, I applied movement to both objects. I then worked to get the collision logic created and tested via console logs. 

After the collision logic, I created a start button to begin a Game Loop to test for collisions and stop game play when a collision was detected and display the "You died message." I then needed a way to determine the winning conditions so I created a timer that started when the start button was clicked. I then used an if statement to determine if a set amount of time had elapsed and if that time had been reached display "You won" but do not stop the game so the player could continue playing for as long as they could. 

With most of my MVP done at this point, I created a reset button which cleared the interval. This dawned on me that just clearing the interval is a pause button rather than a reset so I added a pause button. I then focused on the reset button which would need to move the object back to its original starting position as well as use the same logic as the start button to restart the game.

With MVP now complete I started to add images to the objects as well as create new objects and object types for better payability. With the new objects created I worked to make the objects enter the screen from left to right as well as top to bottom. Now needing a new way to apply my movement based on the position of an object, I made arrays so I could loop through the different objects and apply the modulo to alternate movement on the even and odd array position objects.

With multiple new objects with different speeds and directions of movement I needed to update my collision logic to account for all of the new objects so i created an array of all the objects to loop inside the game loop as see if any collided. Once all object collisions worked I tried to apply random values to increment the x and y values of an object to create random movement.

With the game now complete I went back and updated my CSS and applied the DRY principle to reduce repetitive code. 

# Post-Project Reflection

I am proud of this game and what I was able to accomplish in the week given. 

I found it very useful to start small or with and easy to solve problem and continue to work on small project to small project eventually reaching my goal. I was surprised what I was able to do by simply looking back at the things we have done in class and applying them to this game.

I feel I grew in my knowledge and understanding of all the concepts we previously covered while writing this game. Using the modulus and intervals were two areas I was struggling with prior to coding this games that I now feel I have a good understanding on how and when to use them. 

When going back to DRY out my code I found some ways to improve my code but found this part particularly useful in understanding what and how I was accomplishing things as it forced me to understand what was done and how I was doing it before I could refactor. 

I have a few unresolved problems with my code. Currently the CSS dimensions are hard coded and does not support smaller screens. I would like to go back and update this for various screen sizes one day. When refactoring my math.random use into a function I created a problem where the speed and position of the object only randomizes once creating the same speed and position each time the object left the screen and was returned to the random position. I also want my X-Wing image to populate the screen when the page loads but when I rendered it to the screen it is not working for some reason.

Overall this was an awesome learning experience and Im feeling confident I my knowledge of what we have covered in class to this point. 

# Sources
Canvas crawler - https://github.com/WDI-SEA/canvas-crawler/tree/1114-codealong
