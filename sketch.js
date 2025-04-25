//global variables///////////////////////////////

//👹

//main sprites + attributes
let player, playerHealth = 100; //"playerHealth -= dmgAmount;" to damage the player
let playerDmgedDelay = 180, playerDmgedCooldown = 180;
let playerDmg = 5;
let playerCreated = false;

//maps & walls
let walls;
let maps = {};
let currentRoom = 'room1';
//tiled map
let map1DataBL = [
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
];

let map1DataBR = [
  '=====....=====',
  '=.........=..=',
  '=.=.....=....=',
  '=....=.......=',
  '=..=....=....=',
  '...........=.=',
  '......=......=',
  '.............=',
  '...=.........=',
  '=.......=....=',
  '=...=......=.=',
  '=.......=....=',
  '=..=.........=',
  '==============',
];

let map1DataTR = [
  '==============',
  '=.........=..=',
  '=.=.....=....=',
  '=....=.......=',
  '=..=....=....=',
  '...........=.=',
  '......=......=',
  '.............=',
  '...=.........=',
  '=.......=....=',
  '=...=......=.=',
  '=.......=....=',
  '=..=.........=',
  '=====....=====',
];

let map1DataTL = [
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
];

//monster stuff
let monsters;
let monsterDmg;
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

//setup///////////////////////////////////////////

function loadAllRooms() {
  let tileW = 50;
  let tileH = 50;
  let offsetX = tileW / 2;
  let offsetY = tileH / 2;
  let cols = map1DataTL[0].length;
  let rows = map1DataTL.length;

  // top-left
  new Tiles(map1DataTL, 0 + offsetX, 0 + offsetY, tileW, tileH, walls);

  // top-right
  new Tiles(map1DataTR, cols * tileW + offsetX, 0 + offsetY, tileW, tileH, walls);

  // bottom-left
  new Tiles(map1DataBL, 0 + offsetX, rows * tileH + offsetY, tileW, tileH, walls);

  // bottom-right
  new Tiles(map1DataBR, cols * tileW + offsetX, rows * tileH + offsetY, tileW, tileH, walls);

}

function createPlayer() {
    //player attributes
    player = new Sprite(100, 350, 40, 'dynamic');
    player.image = '🧍';
    player.rotationLock = true;
    player.friction = 0.01;
    player.drag = 1;
    player.textSize = 30;
    playerCreated = true;
}

function setup() {
  new Canvas(700, 700);

  world.gravity.y = 0;

  //floor & stage attributes
  walls = new Group();
  walls.w = 50;
  walls.h = 50;
  walls.image = '🪨';
  walls.tile = '=';
  walls.collider = 'static';

  loadAllRooms();

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
    monster.maxHealth = health;
    monsters.add(monster);
}

function monsterMechanics() {
  for (let monster of monsters) {
    monster.moveTo(player, monsterSpeed);

    if (playerDmgedCooldown > 0) {
      playerDmgedCooldown--;
      if (playerDmgedCooldown > (playerDmgedDelay - 100)) {
        player.visible = frameCount % 8 < 4;
      } else {
        player.visible = true;
      }
    } else {
      player.visible = true;
    }

    // when player gets hit
    if (monster.overlapping(player) && playerDmgedCooldown === 0) {
      playerHealth -= monsterDmg; // Deal damage
      playerDmgedCooldown = playerDmgedDelay;
    }
  }
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

    bullet.life = 60; //exchangeable for variable
    bullet.overlaps(player);

    bullets.add(bullet);

    for(let b of bullets) {
      b.overlaps(monsters, (bullet, m) => {
        m.health -= playerDmg
        if (m.health <= 0) {
          m.remove();
        }
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

function drawCrosshair(x, y) {
  noCursor();
  push();
  noFill();
  stroke(255);
  strokeWeight(2);

  // horizontal line
  line(x - 10, y, x + 10, y);
  // vertical line
  line(x, y - 10, x, y + 10);

  pop();
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
  text("click left mouse button to start", width/2, height/2);

  if (mouse.presses()) {
    gameState = "runGame";
  }
}

function runGame() {
  //background
  image(dirtImg, 0, 0, 700, 700);
  camera.on();
  
  if (!playerCreated) {
    createPlayer();
  }

  playerMovement();
  bulletMechanics();

  //////////////////////////////////////////////

  monsterDmg = 5

  if (!stage1MonstersSpawned) { //createMonster(100, 100, hp#);
    createMonster(100, 100, monsterStage1HP + 40);
    createMonster(300, 150, monsterStage1HP);
    createMonster(500, 250, monsterStage1HP);
  
    stage1MonstersSpawned = true; 
  }

  monsterMechanics();

  ///////////////////////////////////////////

  if(player.x < 700) {
    camera.x = lerp(camera.x, 350, 0.1);
    camera.y = lerp(camera.y, 350, 0.1);
  } else if (player.x > 700) {
    camera.x = lerp(camera.x, 1050, 0.1);
    camera.y = lerp(camera.y, 350, 0.1);
    //camera.moveTo(1050, 350, 10);
  }

  ///////////////////////////////////////////

  world.step();        // updates physics
  allSprites.update(); // updates sprite logic
  allSprites.draw();   // renders all sprites

  ///////////////////////////////////////////

  drawCrosshair(mouse.x, mouse.y);
  drawHealthBar(player, playerHealth, 100);

  for (let m of monsters) {
    drawHealthBar(m, m.health, m.maxHealth, {
      barWidth: 20, barHeight: 3, color: "red", background: 'black'
    });
  }

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

function restartGame() {
  monsters.removeAll();
  stage1MonstersSpawned = false;
}

/***************
* checklist:
*
* (bare minimum)
* [] music & sounds
* [*] monsters that track & deal certain # dmg
* [*] bullets do dmg
* [*] monsters have health
* [*] ui for health bar
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
