//global variables///////////////////////////////

//main sprites + attributes
let player, playerHealth = 100; //"playerHealth -= dmgAmount;" to damage the player
let playerDmgedDelay = 60, playerDmgedCooldown = 0;
let walls;

//monster stuff
let monsters;
let monsterStage1HP = 20;
let monsterSpeed = 1;
let stage1MonstersSpawned = false;

//bullet stuff
let bullet, bullets;
let bulletCooldown = 0, bulletDelay = 20; //could be changeable through an upgrade

//images
let dirtImg;

//gamestates
let gameState = "titleScreen";

//upgrades
let pierceUpgrade = false;

//////////////////////////////////////////////////

function preload() {
  //preload any animations and images
  dirtImg = loadImage("dirt.png");
}

//////////////////////////////////////////////////

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

  bullets = new Group();
  monsters = new Group();

  //disable auto stuff
  allSprites.autoDraw = false;
  allSprites.autoUpdate = false;
  world.autoStep = false;

}

function createMonster(x, y, health = 20) {
    //monster attributes
    let monster = new Sprite(x, y, 30, 30);
    monster.image = '😈';
    monster.health = health;
    monster.maxHealth = 20;
    monsters.add(monster);
}

//mechanics///////////////////////////////////////

function playerMovement() {

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

}

function bulletMechanics() {
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
      b.overlaps(monsters, (bullet, m) => {
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
}

//gamestates manager//////////////////////////////

function draw() {

  //end game if player dies
  if (playerHealth < 1) {
    gameState = "gameOver";
  }

  //main gamestates
  if (gameState === "titleScreen") { 
    titleScreen();
  }
  if (gameState === "runGame") {
    runGame();
  }
  /*
    if (gameState === "stage 1") {
    stage1();
  }
    */
  /*
    if (gameState === "stage 2") {
    stage2();
  }
    */
  /*
    if (gameState === "stage 3") {
    stage1();
  }
    */
  if (gameState === "gameOver") {
    gameOver();
  }
}

//gamestates//////////////////////////////////////

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

function drawHealthBar(sprite, currentHealth, maxHealth, options = {}) {
  let barWidth = options.barWidth || 40;
  let barHeight = options.barHeight || 6;
  let offsetY = options.offsetY || -sprite.h / 2 - 10;
  let barColor = options.color || 'limegreen';
  let barBackground = options.background || 'red';

  let barX = sprite.x - barWidth / 2;
  let barY = sprite.y + offsetY;

  // Background
  fill(barBackground);
  noStroke();
  rect(barX, barY, barWidth, barHeight);

  // Health fill
  fill(barColor);
  let healthWidth = (currentHealth / maxHealth) * barWidth;
  rect(barX, barY, healthWidth, barHeight);

  // Border
  noFill();
  stroke(255);
  rect(barX, barY, barWidth, barHeight);
  noStroke();
}

function runGame() {
  //background color
  background('blue');
  image(dirtImg, 0, 0, 700, 700);

  playerMovement();
  bulletMechanics();

  // Health bar that follows the player
  drawHealthBar(player, playerHealth, 100);
  //Health bar that follows monster
  for (let m of monsters) {
    drawHealthBar(m, m.health, m.maxHealth, {
      barWidth: 20, barHeight: 3, color: "red", background: 'black'
    });
  }

  ///////////////////////////////////////////

  if (!stage1MonstersSpawned) {
    createMonster(100, 100);
    createMonster(300, 150);
    createMonster(500, 250);
  
    stage1MonstersSpawned = true; 
  }

  for (let monster of monsters) {
    monster.moveTo(player, monsterSpeed);

    if (playerDmgedCooldown > 0) {
      playerDmgedCooldown--;
    }

    if (monster.overlapping(player) && playerDmgedCooldown === 0) {
      playerHealth -= 1; // Deal damage
      playerDmgedCooldown = playerDmgedDelay;
    }
  }

  ///////////////////////////////////////////

  world.step();        // updates physics
  allSprites.update(); // updates sprite logic
  allSprites.draw();   // renders all sprites
}

function gameOver() {
  background('black');
  noStroke();

  fill('white');
  textAlign(CENTER);
  textSize(62);
  textFont("arial");
  text("gameover!", width/2, height/2);
}

//update///////////////////////////////////////////

function update() {
	clear();
}


/***************
* checklist:
*
* (bare minimum)
* [] music & sounds
* [*] monsters that track & deal certain # dmg
* [] bullets do dmg
* [] monsters have health
* [] ui for health bar
* [] working rooms w/ camera
* [] currency system
* [] shop
* [] bosses
* [] stage 1 done
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
* cameras need to be used to make health ui's
*
****************/