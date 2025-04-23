let player, playerHealth;
let walls, monster;

let bullet, bullets;
let bulletCooldown = 0;
let bulletDelay = 20; //could be changeable through an upgrade

let dirtImg;

let gameState = "titleScreen";

let pierceUpgrade = true;

/////////////////////////

function preload() {
  dirtImg = loadImage("dirt.png")
}


function setup() {
	new createCanvas('1:1');

  world.gravity.y = 0;

  //player attributes
  player = new Sprite(100, 350, 30, 60);
  player.image = '🧍';
  player.d = 40;
  player.rotationLock = true;
  player.friction = 0.01;
  player.drag = 1;
  player.collider = 'dynamic';
  player.textSize = 30;

  //floor & stage attributes
  walls = new Group();
  walls.w = 50;
  walls.h = 50;
  walls.image = '🪨';
  walls.tile = '=';
  walls.collider = 'static';

  //tiled map
  let worldMap1 = new Tiles(
    [
      '==============',
      '=.........=..=',
      '=.=.....=....=',
      '=....=.......=',
      '=..=....=....=',
      '=..........=..',
      '=.....=.......',
      '=.............',
      '=..=..........',
      '=.......=....=',
      '=...=......=.=',
      '=.......=....=',
      '=..=.........=',
      '==============',
    ],
    20, 20,
    walls.w, walls.h
  );

  //monster attributes
  monster = new Group();
  //let monster1 = new Sprite(100, 100, 30, 30);
  //monster1.image = '😈';
  //monster.add(monster1);

  bullets = new Group();

  //disable auto stuff
  allSprites.autoDraw = false;
  allSprites.autoUpdate = false;
  world.autoStep = false;

}

///////////////

function draw() {
  if (gameState === "titleScreen") { 
    titleScreen();
  }
  if (gameState === "runGame") {
    runGame();
  }
  /*
    if (gameState === "stage 1") {
    gameOver();
  }
    */
  /*
    if (gameState === "stage 2") {
    gameOver();
  }
    */
  /*
    if (gameState === "stage 3") {
    gameOver();
  }
    */
  if (gameState === "gameOver") {
    gameOver();
  }
}

///////////////

function titleScreen() {
  background('black');
  noStroke();

  fill('blue');
  textAlign(CENTER);
  textSize(62);
  textFont("arial");
  text("untitled time game", width/2, height/2-100);

  fill('white');
  textSize(24);
  textFont("Arial");
  text("click LMB to start", width/2, height/2);

  if (mouse.presses()) {
    gameState = "runGame";
  }
}

function runGame() {
  //background color
  background('blue');
  image(dirtImg, 0, 0, 700, 700);

  ///////////////////////////////////////////

  //player movement
  let moving = false;
  player.vel.x *= .9;
  player.vel.y *= .9;

  if (kb.pressing('left')) {
    player.applyForce(-30, 0);
    moving = true;
    player.image = '🚶';
  };

  if (kb.pressing('right')) {
    player.applyForce(30, 0);
    moving = true;
    player.image = '🚶‍➡️';
  };

  if (kb.pressing('up')) { 
    player.applyForce(0, -30);
    moving = true;
    player.image = '🚶‍➡️';
  };

  if (kb.pressing('down')) {
    player.applyForce(0, 30);
    moving = true; 
    player.image = '🚶';
  };

  if (!moving) {
    player.image = '🧍';
  };

  ///////////////////////////////////////////

  //bullet stuff
  if (bulletCooldown > 0) {
    bulletCooldown--;
  }
  
  //when mouse is pressed, bullet
  if (mouse.presses() && bulletCooldown === 0) {
    bullet = new Sprite(player.x, player.y, 10, 'dynamic');
    bullet.color = 'black';
    bullet.move(mouse.x, mouse.y, 2);

    // Calculate direction from player to mouse
    let angle = atan2(mouse.y - player.y, mouse.x - player.x);
    // Set bullet velocity
    let speed = 5;
    bullet.vel.x = cos(angle) * speed;
    bullet.vel.y = sin(angle) * speed;

    bullet.life = 60; // bullet disappears after ~100 frames
    bullet.overlaps(player);

    bullets.add(bullet);

    for(let b of bullets) {
      b.overlaps(monster, (bullet, m) => {
        if (!pierceUpgrade) {
          bullet.remove();
        }
      });
      b.overlaps(walls, (bullet, w) => {
        bullet.remove();
      });
    }

    bulletCooldown = bulletDelay;

  };

  ///////////////////////////////////////////

  //end game if player dies
  if (playerHealth === 0) {
    gameState = "gameOver";
  }

  world.step();        // updates physics
  allSprites.update(); // updates sprite logic
  allSprites.draw();   // renders all sprites
}

function gameOver() {

}

function update() {
	clear();
}


/***************
* checklist:
*
* (bare minimum)
* [] music & sounds
* [] monsters that track & deal certain # dmg
* [] bullets do dmg
* [] monsters have health
* [] ui for health bar
* [] working rooms w/ camera
* [] currency system
* [] shop
* [] bosses
* (extras)
* [] animations/cutscenes
* [] different classes
*
* ------------------------------------------------------------
*
* notes:
* isaac was working on figuring out how multi-room maps work
*   on 4/22, 8:22 PM
*
* line 22 might need to be changed to work with cameras, not sure
*   how they work together yet though
*
* "David Bouchard" on yt is goated, watch him for tutorials
*
* chatgpt lwk sucks for figuring out p5, but it helps sometimes so
*   if you can, use https://p5play.org/learn/index.html first
*
****************/
