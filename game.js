/*******************************************************/
// P5.play: Project Game
/// Written by Finley
/*******************************************************/
	
/*******************************************************/
// setup()
/*******************************************************/
function preload() {


}

function setup() {
	//Setup
	console.log("Project Game");
	cnv = new Canvas(500, 500);
    //Center of canvas is 250, 250
    world.gravity.y = 20;

    //Constants


    //Variables
    //Screen phase: 0 = Start screen, 1 = game screen, 2 = lose screen, 3 = win screen
    screenPhase = 0;
    screenPhaseSetup = false;
    numberOfEnemiesLeft = 10;
    playerScore = 0;

    //Groups
    //Group that has 'k' physics but doesn't allow the player to jump on. Eg walls
	floorGroup = new Group();
    //Group that has 'k' physics and allows the player to jump on. Eg the floor
	hitBoxGroup = new Group();
    //Group for enemy sprite
    enemyGroup = new Group();

    //Arrays

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
        console.log("Game Screen")

    } else if (screenPhase == 2) {
        //Delete previous sprites
        deletePlayerSprite();
        deleteWallSprite();
        deleteEnemySprite();

        //Lose screen
        console.log("Lose Screen")
        
    } else if (screenPhase == 3) {
        //Delete previous sprites
        deletePlayerSprite();
        deleteWallSprite();
        deleteEnemySprite();

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
        enemyLeft = new Sprite(0, random(50, 450), 10, 'k');
        enemyLeft.color = '#d908ec';
        enemyLeft.strokeWeight = 0;
        enemyLeft.vel.x = random(2, 6);
        enemyGroup.add(enemyLeft);
        numberOfEnemiesLeft = numberOfEnemiesLeft - 1
    };
}

function deleteEnemySprite() {
    enemyGroup.remove();
}
	
/*******************************************************/
// draw()
/*******************************************************/
function draw() {
	background('#b8b8b8'); 

    //Visual Variables
	text("Mouse X " + round(mouse.x), 20, 20);
	text("Mouse Y " + round(mouse.y), 20, 40);

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
        text("E " + round(enemyLeft.x), 20, 60);
        keyboardMovement();
        enemyFunction();

    } else if (screenPhase == 2) {
        if (screenPhaseSetup == true) {
            //Setup
            setupPhases();
            screenPhaseSetup = false;
        }

        //Lose screen
        text("You have lost the game", 210, 200);
        text("You have scored: " , 210, 220);
        
    } else if (screenPhase == 3) {
        if (screenPhaseSetup == true) {
            //Setup
            setupPhases();
            screenPhaseSetup = false;
        }

        //Win screen
        text("Wow you have won the game", 210, 200);
        text("You have scored: " , 210, 220);
    };
}

//Switching screens and screen phases
function startButtonFunction() {
    //Start button
    if (mouseX>width/2-startButton.w/2 && mouseX<width/2+startButton.w/2 && mouseY>height/2-startButton.h/2 && mouseY<height/2+startButton.h/2 && mouseIsPressed) {
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

    //If the enemy goes off screen it respawns
    if (enemyLeft.x >= 499) {
    enemyLeft.x = enemyLeft.x - 400;
    console.log("Enemy startover");
    }

}

/*******************************************************/
//  END OF APP
/*******************************************************/