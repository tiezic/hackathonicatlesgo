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
  '=.=..........=',
  '=..=.........=',
  '====.........=',
  '...........===',
  '....===......=',
  '...=.==..=====',
  '.===..=..=...=',
  '==....=......=',
  '=...=........=',
  '=............=',
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

//images & music
let dirtImg;
let musicPlaying = false;

//timer
let totalTime = 1 * 60 * 1000;
let endTime;
let timerStarted = false;

//gamestates
let gameState = "titleScreen";

//upgrades
let pierceUpgrade = false;

//////////////////////////////////////////////////

function preload() {
  //preload images & fonts
  soundFormats("mp3");
  mainBackgroundMusic = loadSound("glitchtrodeLostFragments.mp3")
  dirtImg = loadImage("dirt.png");
  daFont = loadFont("BlackCasper.ttf");
  daFont2 = loadFont("AlmendraDisplay-Regular.ttf");
  
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
  endTime = millis() + totalTime;

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

  if (playerDmgedCooldown <= 0) {
    player.visible = true;
  }

}

function drawCountdownTimer() {
  let timeLeft = max(0, endTime - millis());
  let secondsLeft = int(timeLeft / 1000);

  let minutes = floor(secondsLeft / 60);
  let seconds = nf(secondsLeft % 60, 2); 

  let timerText = "Time Left: " + minutes + ":" + seconds;

  camera.off();
  push();
  textSize(20);
  textAlign(LEFT, TOP);
  textFont("monospace");

  let padding = 8;
  let w = textWidth(timerText) + padding * 2;
  let h = 25;

  fill(0, 150); 
  noStroke();
  rect(5, 5, w, h, 6); 
  fill(255);
  text(timerText, 5 + padding, 8);
  pop()
  camera.on();

  if (timeLeft === 0) {
    gameState = "gameOver";
  }
}

//mechanics///////////////////////////////////////

function playerMovement() {

  //player movement
  let moving = false;
  let playerForce = 35;
  player.vel.x *= .9;
  player.vel.y *= .9;


  if (kb.pressing('left')) {
    player.applyForce(-playerForce, 0);
    moving = true;
    player.image = '🚶';
  };

  if (kb.pressing('right')) {
    player.applyForce(playerForce, 0);
    moving = true;
    player.image = '🚶‍➡️';
  };

  if (kb.pressing('up')) { 
    player.applyForce(0, -playerForce);
    moving = true;
    player.image = '🚶‍➡️';
  };

  if (kb.pressing('down')) {
    player.applyForce(0, playerForce);
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
    bullet.overlaps(player, () => {});

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
  stroke(0);
  rect(barX, barY, barWidth, barHeight);
  noStroke();
}

function cameraMapMovement() {
  //camera movement
  camera.on(); 
  let cameraSpeed = 0.1;

  if (player.x < canvas.w && player.y < canvas.h) { //TL
    camera.x = lerp(camera.x, 350, cameraSpeed);
    camera.y = lerp(camera.y, 350, cameraSpeed);
  } else if (player.x > canvas.w && player.y < canvas.h) { //TR
    camera.x = lerp(camera.x, 1050, cameraSpeed);
    camera.y = lerp(camera.y, 350, cameraSpeed);
  } else if (player.x < canvas.w && player.y > canvas.h) { //BL
    camera.x = lerp(camera.x, 350, cameraSpeed);
    camera.y = lerp(camera.y, 1050, cameraSpeed);
  } else if (player.x > canvas.w && player.y > canvas.h) { //BR
    camera.x = lerp(camera.x, 1050, cameraSpeed);
    camera.y = lerp(camera.y, 1050, cameraSpeed);
  }
}

//gamestates manager//////////////////////////////

function draw() {

  background(0);

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
  push();
  background('black');
  noStroke();

  fill('white');
  textAlign(CENTER);
  textSize(72);
  textFont(daFont);
  text("TimeBound", width/2, height/2-100);

  fill('gray');
  textSize(30);
  textFont(daFont2);
  text("click left mouse button to start", (width/2), (height/2) + 20);
  text("WASD to move, LMB to shoot", (width/2), (height/2) + 50);
  pop();

  if (mouse.presses()) {
    gameState = "runGame";
  }
}

function runGame() {
  //background
  image(dirtImg, 0, 0, canvas.w, canvas.h);

  if (!timerStarted) {
    endTime = millis() + totalTime;
    timerStarted = true;
  }

  if(!musicPlaying) {
    mainBackgroundMusic.play();
    mainBackgroundMusic.setVolume(0.4);
    musicPlaying = true;
  }

  if (!playerCreated) {
    createPlayer();
  }

  cameraMapMovement();
  playerMovement();
  bulletMechanics();
  monsterMechanics();

  //spawn monsters//////////////////////////////

  monsterDmg = 5;

  if (!stage1MonstersSpawned) { //createMonster(100, 100, hp#);
    createMonster(100, 100, monsterStage1HP);
    createMonster(300, 150, monsterStage1HP);
    createMonster(500, 250, monsterStage1HP);
  
    stage1MonstersSpawned = true; 
  }

  ///////////////////////////////////////////

  world.step();        // updates physics
  allSprites.update(); // updates sprite logic
  allSprites.draw();   // renders all sprites

  ///////////////////////////////////////////
  
  drawCountdownTimer();
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

  mainBackgroundMusic.stop();

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
* [*] music
* [] sounds
* [*] monsters that track & deal certain # dmg
* [*] bullets do dmg
* [*] monsters have health
* [*] ui for health bar
* [*] working rooms w/ camera
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
*
* "David Bouchard p5play" on yt is goated, watch him for tutorials
*
****************/

//have to beat rooms in a certain amount of time