/*******************************************************/
// P5.play: Project Game
/// Written by Finley
/*******************************************************/
	
/*******************************************************/
// setup()
/*******************************************************/

//Constants
    const canvaWidth = 500;
    const canvaHeight = 500;
    const numberOfEnemyBallsUp = 5;
    const enemyBallDiameter = 20;
    const minBallSpeed = 2;
    const maxBallSpeed = 5;
    const numberOfEnemyBeamsUp = 3;
    const numberOfEnemiesInBeamsUp = 30;
    const minBeamSpeed = 2;
    const maxBeamSpeed = 6;
    const numberOfScoreBallsLeft = 4;
    const scoreBallDiameter = 10;
    const playerJumpHeight = 9;
    const playerSpeed = 4;

//Variables
    //Screen phase: 0 = Start screen, 1 = game screen, 2 = lose screen, 3 = win screen
    let screenPhase = 0;
    let screenPhaseSetup = false;
    let scoreBallsCollected = 0;
    let playerScore = 0;
    let secondTimer = 0;
    let timerSurvived = 0;
    let enemyBeamX = 0;

//Arrays
    //Enemy ball sprites
    let enemyBallSpriteArray = [];
    //Enemy beam sprites
    let enemyBeamSpriteArray = [];
    //Score balls
    let scoreBallSpriteArray = [];

//Timers
    //Second timer
    let intervalID = setInterval(() => {
        secondTimer = secondTimer + 1;
    }, 1000); //1000 ms timer 


function preload() {
    //Loading the images for assets
    imgSnowBall = loadImage('../assets/images/Snowball.png');
    imgSnowTide = loadImage('../assets/images/SnowballTide.png');

}

function setup() {
	//Setup
	console.log("Project Game");
	cnv = new Canvas(canvaWidth, canvaHeight);
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
	topWall = new Sprite(canvaWidth/2, 0, canvaHeight, 10, 'k');
	topWall.color = '#a7f9ff';
    topWall.strokeWeight = 0;
    hitBoxGroup.add(topWall);

    bottomWall = new Sprite(canvaWidth/2, canvaHeight, canvaHeight, 10, 'k');
	bottomWall.color = '#a7f9ff';
    bottomWall.strokeWeight = 0;
    hitBoxGroup.add(bottomWall);

    leftWall = new Sprite(0, canvaHeight/2, canvaHeight, 10, 'k');
    leftWall.rotation = 90;
	leftWall.color = '#a7f9ff';
    leftWall.strokeWeight = 0;
    hitBoxGroup.add(leftWall);

    rightWall = new Sprite(canvaWidth, canvaHeight/2, canvaHeight, 10, 'k');
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
    //Enemy balls
    for (i = 0; i < numberOfEnemyBallsUp; i++) {
        enemyBallUp = new Sprite(random(25, 475), 0, enemyBallDiameter, 'k');
	    enemyBallUp.image = (imgSnowBall);
        imgSnowBall.resize(enemyBallDiameter, enemyBallDiameter);
        enemyBallUp.strokeWeight = 0;
        enemyBallUp.vel.y = random(minBallSpeed, maxBallSpeed);
        enemyBallSpriteArray.push(enemyBallUp);
        enemyGroup.add(enemyBallUp);
    };

    //Improved enemy beams
    for (i = 0; i < numberOfEnemyBeamsUp; i++) {
        enemyBeamX = random(15, 475);
        for (i = 0; i < numberOfEnemiesInBeamsUp; i++) {
            enemyBeamUp = new Sprite(enemyBeamX + random(-5, 5), 0 - (i * random(1, 5)), enemyBallDiameter, 'k');
            enemyBeamUp.image = (imgSnowBall);
            imgSnowBall.resize(enemyBallDiameter, enemyBallDiameter);
            enemyBeamUp.strokeWeight = 0;
            enemyBeamUp.vel.y = 0;
            enemyBeamSpriteArray.push(enemyBeamUp);
            enemyGroup.add(enemyBeamUp);
        };
    };

    /*
    //Enemy Beams
    for (i = 0; i < numberOfEnemyBeamsUp; i++) {
        enemyBeamUp = new Sprite(random(0, 500), -260, enemyBeamWidth, canvaHeight + random(5, 20), 'k');
        enemyBeamUp.image = (imgSnowTide);
        imgSnowTide.resize(enemyBeamWidth, canvaHeight + random(5, 20));
        enemyBeamUp.strokeWeight = 0;
        enemyBeamUp.vel.y = 0;
        enemyBeamSpriteArray.push(enemyBeamUp);
        enemyGroup.add(enemyBeamUp);
    }; */
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
    if (kb.pressing('a') || kb.pressing('arrowLeft')) {
		// Set sprite's velocity to the left
		player.vel.x = -1 * playerSpeed;
	};

	//Right
    if (kb.pressing ('d') || kb.pressing('arrowRight')) {
		// Set sprite's velocity to the right
		player.vel.x = playerSpeed;
	};

    //Jump
    if (kb.pressing('w') && hitBoxGroup.colliding(player) || kb.pressing('arrowUp') && hitBoxGroup.colliding(player)) {
        // Set sprite's velocity to the up
		player.vel.y = -1 * playerJumpHeight;
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
    for (i = 0; i < enemyBallSpriteArray.length; i++) {
        if (enemyBallSpriteArray[i].y >= 500 && secondTimer <= 11) {
            enemyBallSpriteArray[i].y = random(-10, -1);
            enemyBallSpriteArray[i].vel.y = random(minBallSpeed, maxBallSpeed);
            enemyBallSpriteArray[i].x = random(25, 475);
            console.log("Enemy ball reload");
        } else if (enemyBallSpriteArray[i].x >= 499 && secondTimer >= 11) {
            enemyBallSpriteArray[i].remove();
            console.log("Deleted enemy ball");
        }
    }

    //Stage 2
    //Enemy beams come down from above

    for (i = 0; i < enemyBeamSpriteArray.length; i++) {
        if (enemyBeamSpriteArray[i].vel.y == 0 && secondTimer >= 11 && secondTimer <= 21) {
            enemyBeamSpriteArray[i].vel.y = random(minBeamSpeed, maxBeamSpeed);
        } else if (enemyBeamSpriteArray[i].vel.y >= 1 && enemyBeamSpriteArray[i].y >= 500) {
            enemyBeamSpriteArray[i].remove();
            console.log("Deleted enemy beam");
        }
    }

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