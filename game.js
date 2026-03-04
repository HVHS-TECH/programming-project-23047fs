/*******************************************************/
// P5.play: Project Game
/// Written by Finley
/*******************************************************/
	
/*******************************************************/
// setup()
/*******************************************************/

//Constants

//Variables
    //Screen phase: 0 = Start screen, 1 = game screen, 2 = lose screen, 3 = win screen
    let screenPhase = 0;
    let screenPhaseSetup = false;
    let numberOfEnemiesLeft = 10;
    let numberOfScoreBallsLeft = 2;
    let scoreBallsCollected = 0;
    let playerScore = 0;
    let secondTimer = 0;
    let timerSurvived = 0;

//Arrays
    //Enemy sprites
    let enemySpriteArray = [];
    //Score balls
    let scoreBallSpriteArray = [];

//Timers
    //Second timer
    let intervalID = setInterval(() => {
        secondTimer = secondTimer + 1;
    }, 1000); //1000 ms timer 


function preload() {


}

function setup() {
	//Setup
	console.log("Project Game");
	cnv = new Canvas(500, 500);
    //Center of canvas is 250, 250
    world.gravity.y = 20;

    //Groups
    //Group that has 'k' physics but doesn't allow the player to jump on. Eg walls
    floorGroup = new Group();
    //Group that has 'k' physics and allows the player to jump on. Eg the floor
    hitBoxGroup = new Group();
    //Group for enemy sprite
    enemyGroup = new Group();
    scoreBallGroup = new Group();


    //Functions
    setupPhases();

}

//Set up / sprite creation for screen phases
function setupPhases() {
    if (screenPhase == 0) {
        //Start screen
        startButtonSprite();
        console.log("Start Screen")

    } else if (screenPhase == 1) {
        //Delete previous sprites
        deleteStartButtonSprite();

        //Game screen
        playerSprite();
        wallSprite();
        enemySprite();
        scoreBallSprite();
        console.log("Game Screen")

        //Game timers
        secondTimer = 0;

    } else if (screenPhase == 2) {
        //Delete previous sprites
        deletePlayerSprite();
        deleteWallSprite();
        deleteEnemySprite();
        deleteScoreBallSprite();

        //Set final score
        timerSurvived = secondTimer;
        playerScore = + scoreBallsCollected * secondTimer;

        //Lose screen
        console.log("Lose Screen")
        
    } else if (screenPhase == 3) {
        //Delete previous sprites
        deletePlayerSprite();
        deleteWallSprite();
        deleteEnemySprite();
        deleteScoreBallSprite();
        
        //Set final score and time
        timerSurvived = secondTimer;
        playerScore = + scoreBallsCollected * secondTimer;

        //Win screen
        console.log("Win Screen")

    };

}

function startButtonSprite() {
    //Start Button
    startButton = new Sprite(250, 250, 80, 30, 'n');
	startButton.color = '#3ceb07';
}

function deleteStartButtonSprite() {
    startButton.remove();
}

function playerSprite() {
    //Player
	player = new Sprite(250, 250, 25, 25, 'd');
	player.color = '#d31010';

}

function deletePlayerSprite() {
    player.remove();
}

function wallSprite() {
    //Walls
	topWall = new Sprite(250, 0, 500, 10, 'k');
	topWall.color = '#a7f9ff';
    topWall.strokeWeight = 0;
    hitBoxGroup.add(topWall);

    bottomWall = new Sprite(250, 500, 500, 10, 'k');
	bottomWall.color = '#a7f9ff';
    bottomWall.strokeWeight = 0;
    hitBoxGroup.add(bottomWall);

    leftWall = new Sprite(0, 250, 500, 10, 'k');
    leftWall.rotation = 90;
	leftWall.color = '#a7f9ff';
    leftWall.strokeWeight = 0;
    hitBoxGroup.add(leftWall);

    rightWall = new Sprite(500, 250, 500, 10, 'k');
    rightWall.rotation = 90;
	rightWall.color = '#a7f9ff';
    rightWall.strokeWeight = 0;
    hitBoxGroup.add(rightWall);
}

function deleteWallSprite() {
    hitBoxGroup.remove();
    floorGroup.remove();
}

function enemySprite() {
    //Enemies
    for (i = 0; i < numberOfEnemiesLeft; i++) {
        enemyLeft = new Sprite(0, random(25, 475), 10, 'k');
        enemyLeft.color = '#d908ec';
        enemyLeft.strokeWeight = 0;
        enemyLeft.vel.x = random(2, 6);
        enemySpriteArray.push(enemyLeft);
        enemyGroup.add(enemyLeft);
    };
}

function deleteEnemySprite() {
    enemyGroup.remove();
}

function scoreBallSprite() {
    //Score balls
    for (i = 0; i < numberOfScoreBallsLeft; i++) {
        scoreBall = new Sprite(random(50, 450), random(50, 450), 10, 'k');
        scoreBall.color = '#d7ff26';
        scoreBall.strokeWeight = 0;
        scoreBallSpriteArray.push(scoreBall);
        scoreBallGroup.add(scoreBall);
    }
};

function deleteScoreBallSprite() {
    scoreBallGroup.remove();
}

/*******************************************************/
// draw()
/*******************************************************/
function draw() {
	background('#b8b8b8'); 

    //Visual Variables
	text("Mouse X " + round(mouse.x), 20, 20);
	text("Mouse Y " + round(mouse.y), 20, 40);
	text("Timer " + secondTimer, 20, 60);
	text("Score " + scoreBallsCollected, 20, 80);

    //Screen Phases
    //What happens when the screen phases switch, what is deleted, what functions are drawn
    if (screenPhase == 0) {
        //Start screen
        text("Start Game", 210, 200);
        text("Controls: W,A,S,D to move, ", 210, 220);
        startButtonFunction();

    } else if (screenPhase == 1) {
        //One time setup of sprites
        if (screenPhaseSetup == true) {
            //Setup
            setupPhases();
            screenPhaseSetup = false;
        }

        //Game screen
        keyboardMovement();
        enemyFunction();
        timerFunction();
        scoreBallFunction();

    } else if (screenPhase == 2) {
        if (screenPhaseSetup == true) {
            //Setup
            setupPhases();
            screenPhaseSetup = false;
        }

        //Lose screen
        text("You have lost the game", 210, 200);
        text("You survived: " + timerSurvived + " seconds", 210, 220);
        text("You collected: " + scoreBallsCollected + " score balls", 210, 240);
        text("You have scored: " + playerScore, 210, 260);    

    } else if (screenPhase == 3) {
        if (screenPhaseSetup == true) {
            //Setup
            setupPhases();
            screenPhaseSetup = false;
        }

        //Win screen
        text("Wow you have won the game", 210, 200);
        text("You survived: " + timerSurvived + " seconds", 210, 220);
        text("You collected: " + scoreBallsCollected + " score balls", 210, 240);
        text("You have scored: " + playerScore, 210, 260);  
    };
}

//Switching screens and screen phases
function startButtonFunction() {
    //Start button
    if (mouseX > width/2 - startButton.w/2 && mouseX < width/2 + startButton.w/2 && mouseY > height/2 - startButton.h/2 && mouseY < height/2 + startButton.h/2 && mouseIsPressed) {
        screenPhase = 1
        screenPhaseSetup = true;
    };
}

//Movement and rotation with keyboard inputs
function keyboardMovement() {
    //Resistance
	player.vel.x = player.vel.x/1.04;
	player.rotationSpeed = player.rotationSpeed/1.035;

	//Left
    if (kb.pressing('a')) {
		// Set sprite's velocity to the left
		player.vel.x = -4;
	};

	//Right
    if (kb.pressing ('d')) {
		// Set sprite's velocity to the right
		player.vel.x = 4;
	};

    //Jump
    if (kb.pressing('w') && hitBoxGroup.colliding(player)) {
        // Set sprite's velocity to the up
		player.vel.y = -10;
    }
}

//Enemy actions
function enemyFunction() {
    //Enemy collides with player
    if (enemyGroup.collides(player)) {
        //Lose Game
        screenPhase = 2;
        screenPhaseSetup = true;
    }
    
    //Enemy Stages

    //Stage 1
    //Enemy balls only come from the left

    //If the enemy goes off screen it respawns
    for (i = 0; i < enemySpriteArray.length; i++) {
        if (enemySpriteArray[i].x >= 499 && secondTimer <= 11) {
            enemySpriteArray[i].x = -10;
            enemySpriteArray[i].vel.x = random(2, 6);
            enemySpriteArray[i].y = random(25, 475);
            console.log("Enemy reload");
        } else if (enemySpriteArray[i].x >= 499 && secondTimer >= 11) {
            enemySpriteArray[i].remove();
            console.log("Deleted enemy ball");
        }
    }

    //Stage 2
    //Enemy beams come down from above



}

//Timer funciton
function timerFunction() {
    //Timer runs out
    if (secondTimer == 30) {
        //Win Game
        screenPhase = 3;
        screenPhaseSetup = true;
    }
}

function scoreBallFunction() {
    //If player collects a score ball
    if (scoreBallGroup.collides(player)) {
        scoreBallsCollected = scoreBallsCollected + 1;
        //Moves scoreball
        scoreBall.x = random(50, 450);
        scoreBall.y = random(50, 450);
    }

    for (i = 0; i < scoreBallSpriteArray.length; i++) {
        if (scoreBallSpriteArray[i].collides(player)) {
            scoreBallsCollected = scoreBallsCollected + 1;
            //Moves scoreball
            scoreBallSpriteArray[i].x = random(50, 450);
            scoreBallSpriteArray[i].y = random(50, 450);
        }
    }
};

/*******************************************************/
//  END OF APP
/*******************************************************/