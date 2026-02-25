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
    world.gravity.y = 20;

    //Constants


    //Variables
    //Screen phase: 0 = Start screen, 1 = game screen, 2 = lose screen, 3 = win screen
    screenPhase = 0;

    //Groups
    //Group that has 'k' physics but doesn't allow the player to jump on. Eg walls
	floorGroup = new Group();
    //Group that has 'k' physics and allows the player to jump on. Eg the floor
	hitBoxGroup = new Group();
    //Group for enemy sprite
    enemyGroup = new Group();

    //Arrays


    //Start Screen


    //Game Screen
    playerSprite();
    wallSprite();
    enemySprite();

    //End Screen


}

function startButtonSprite() {
    //Start Button
    startButton = new Sprite(250, 250, 50, 25, 'n');
	startButton.color = '#09e21b';
}

function playerSprite() {
    //Player
	player = new Sprite(250, 250, 25, 25, 'd');
	player.color = '#d31010';

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

function enemySprite() {
    //Enemies
    enemy = new Sprite(100, 100, 10, 'k');
    enemy.color = '#d908ec';
    enemy.strokeWeight = 0;
    enemyGroup.add(enemy);

}
	
/*******************************************************/
// draw()
/*******************************************************/
function draw() {
	background('#b8b8b8'); 

    //Visual Variables
	text("Mouse X " + round(mouse.x), 20, 20);
	text("Mouse Y " + round(mouse.y), 20, 40);

    keyboardMovement();
    enemyFunction();
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
    }


}

/*******************************************************/
//  END OF APP
/*******************************************************/