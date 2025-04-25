//global variables///////////////////////////////

//👹

//main sprites + attributes
let player, playerHealth = 100; //"playerHealth -= dmgAmount;" to damage the player
let playerDmgedDelay = 180, playerDmgedCooldown = 180;
let playerDmg = 5;
let playerCreated = false;
let playerCurrency = 0;
let soulCounter = 0;
let soulsNeededStage1 = 18;
let soulsNeededStage2 = 25;

//maps & walls
let walls;
let maps = {};
let mapLoaded = false;
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

let map2DataBL = [
  '++++++..++++++',
  '+............+',
  '+.........++++',
  '+...+........+',
  '+++++++......+',
  '+.....+....+..',
  '+..+..+....+++',
  '+..+.......+..',
  '+..+++++++++..',
  '+..+....+....+',
  '+..+.+..+....+',
  '+....+....+..+',
  '+....+....+..+',
  '++++++++++++++',
];

let map2DataBR = [
  '++++++++++++++',
  '+............+',
  '+...^....^...+',
  '+............+',
  '+...^....^...+',
  '.............+',
  '.............+',
  '.............+',
  '.............+',
  '+...^....^...+',
  '+............+',
  '+...^....^...+',
  '+............+',
  '++++++++++++++',
];

let map2DataTR = [
  '##############',
  '#............#',
  '#............#',
  '#............#',
  '#............#',
  '#............#',
  '.............#',
  '.............#',
  '#............#',
  '#............#',
  '#............#',
  '#............#',
  '#............#',
  '##############',
];

let map2DataTL = [
  '+++++++++++++#',
  '+...........+#',
  '+...........+#',
  '+...........+#',
  '+...........+#',
  '+...........+#',
  '+.............',
  '+.............',
  '+...........+#',
  '+...........+#',
  '+...........+#',
  '+...........+#',
  '+...........+#',
  '++++++..+++++#',
];

//monster stuff
let monsters;
let monsterDmg;
let monsterStage1HP = 20;
let monsterStage2HP = 30;
let monsterSpeed = 1;
let souls;
let stage1TLMonstersSpawned = false;
let stage1TRMonstersSpawned = false;
let stage1BRMonstersSpawned = false;
let stage1BLMonstersSpawned = false;
let stage2TLMonstersSpawned = false;
let stage2TRMonstersSpawned = false;
let stage2BRMonstersSpawned = false;
let stage2BLMonstersSpawned = false;

//bullet stuff
let bullet, bullets;
let bulletCooldown = 0, bulletDelay = 20; //could be changeable through an upgrade

//images & music
let dirtImg;
let grassImg;
let musicPlaying = false;

//timer
let totalTime = 1.5 * 60 * 1000; //1:30
let endTime;
let timerStarted = false;
let remainingTime = 0;

//gamestates
let gameState = "level2";

//upgrades
let pierceUpgrade = true;

//////////////////////////////////////////////////

function preload() {
  //preload images & fonts
  soundFormats("mp3");
  mainBackgroundMusic = loadSound("glitchtrodeLostFragments.mp3")
  dirtImg = loadImage("dirt.png");
  grassImg = loadImage("grass.png");
  daFont = loadFont("BlackCasper.ttf");
  daFont2 = loadFont("AlmendraDisplay-Regular.ttf");
  
}

//setup///////////////////////////////////////////

function loadAllRooms(mapDataTL, mapDataTR, mapDataBL, mapDataBR) {
  let tileW = 50;
  let tileH = 50;
  let offsetX = tileW / 2;
  let offsetY = tileH / 2;
  let cols = mapDataTL[0].length;
  let rows = mapDataTL.length;

  // top-left
  new Tiles(mapDataTL, 0 + offsetX, 0 + offsetY, tileW, tileH, walls);

  // top-right
  new Tiles(mapDataTR, cols * tileW + offsetX, 0 + offsetY, tileW, tileH, walls);

  // bottom-left
  new Tiles(mapDataBL, 0 + offsetX, rows * tileH + offsetY, tileW, tileH, walls);

  // bottom-right
  new Tiles(mapDataBR, cols * tileW + offsetX, rows * tileH + offsetY, tileW, tileH, walls);

}

function createPlayer(x, y) {
    //player attributes
    player = new Sprite(x, y, 40, 'dynamic');
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

  let brickWalls = new Group();
  brickWalls.w = 50;
  brickWalls.h = 50;
  brickWalls.image = '🧱';
  brickWalls.tile = '#';
  brickWalls.collider = 'static';

  let treeWalls = new Group();
  treeWalls.w = 50;
  treeWalls.h = 50;
  treeWalls.image = '🌳';
  treeWalls.tile = '+';
  treeWalls.collider = 'static';

  let houseWalls = new Group();
  houseWalls.w = 50;
  houseWalls.h = 50;
  houseWalls.image = '🏚️';
  houseWalls.tile = '^';
  houseWalls.collider = 'static';

  bullets = new Group();
  monsters = new Group();
  souls = new Group();

  //disable auto stuff
  allSprites.autoDraw = false;
  allSprites.autoUpdate = false;
  world.autoStep = false;

}

function createMonster(x, y, health = 20) {
    //monster attributes
    let monster = new Sprite(x, y, 30, 30);
    monster.image = '🦇';
    monster.health = health;
    monster.maxHealth = health;
    monsters.add(monster);
}

function monsterMechanics() {
  for (let monster of monsters) {
    monster.moveTo(player, monsterSpeed);

    // when player gets hit
    if (monster.overlapping(player) && playerDmgedCooldown === 0) {
      playerHealth -= monsterDmg; // Deal damage
      playerDmgedCooldown = playerDmgedDelay;
    }
  }

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

}

function spawnSoul(x, y) {
  let soul = new Sprite(x, y, 30);
  soul.vel.y = -0.3; // floats upward
  soul.friction = 0.98;
  soul.image = '🌀';
  soul.collider = "dynamic";
  soul.collectible = true;
  souls.add(soul);
}

function drawCountdownTimer() {
  let timeLeft = max(0, endTime - millis());
  let secondsLeft = int(timeLeft / 1000);

  let minutes = floor(secondsLeft / 60);
  let seconds = nf(secondsLeft % 60, 2); 

  let timerText = "Time Left: " + minutes + ":" + seconds;
  let soulCounterText = "Souls left: " + (soulsNeededStage1 - soulCounter);

  camera.off();
  push();
  textSize(20);
  textAlign(LEFT, TOP);
  textFont("monospace");

  let padding = 8;
  let w = textWidth(timerText) + padding * 2;
  let h = 50;

  fill(0, 150); 
  noStroke();
  rect(5, 5, w, h, 6); 
  fill(255);
  text(timerText, 5 + padding, 9);
  fill(0, 100, 230);
  text(soulCounterText, 5 + padding, 32);
  pop();
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
          spawnSoul(m.x, m.y);
          m.remove();
          playerCurrency +=1;
        }
        if (!pierceUpgrade) {
          bullet.remove();
        }
      });
      b.overlaps(walls, (bullet, w) => {
        bullet.remove();
      });
      b.overlaps(souls, () => {
        //empty, if bullet interacts with soul do nothing
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

function monsterTrackingStage1() {

  if (player.x < canvas.w && player.y < canvas.h) { //TL
    if (!stage1TLMonstersSpawned) { //createMonster(100, 100, hp#);
      createMonster(100, 100, monsterStage1HP);
      createMonster(300, 150, monsterStage1HP);
      createMonster(500, 250, monsterStage1HP);
    
      stage1TLMonstersSpawned = true; 
    }  
  } else if (player.x > canvas.w && player.y < canvas.h) { //TR
    if (!stage1TRMonstersSpawned) { //createMonster(100, 100, hp#);
      createMonster(800, 100, monsterStage1HP);
      createMonster(1000, 150, monsterStage1HP);
      createMonster(1300, 250, monsterStage1HP);
      createMonster(1000, 600, monsterStage1HP);
      createMonster(1300, 550, monsterStage1HP);
    
      stage1TRMonstersSpawned = true; 
    }
  } else if (player.x < canvas.w && player.y > canvas.h) { //BL
    if (!stage1BLMonstersSpawned) { //createMonster(100, 100, hp#);
      createMonster(350, 1050, monsterStage1HP);
      createMonster(350, 1050, monsterStage1HP);
      createMonster(400, 1050, monsterStage1HP);
      createMonster(350, 1050, monsterStage1HP);
      createMonster(400, 1050, monsterStage1HP);
    
      stage1BLMonstersSpawned = true; 
    }
  } else if (player.x > canvas.w && player.y > canvas.h) { //BR
    if (!stage1BRMonstersSpawned) { //createMonster(100, 100, hp#);
      createMonster(1150, 1250, monsterStage1HP);
      createMonster(1250, 1150, monsterStage1HP);
      createMonster(850, 1050, monsterStage1HP);
      createMonster(1300, 950, monsterStage1HP);
      createMonster(900, 1250, monsterStage1HP);
    
      stage1BRMonstersSpawned = true; 
    }
  }

}

function monsterTrackingStage2() {

  if (player.x < canvas.w && player.y < canvas.h) { //TL
    if (!stage2TLMonstersSpawned) { //createMonster(100, 100, hp#);
      createMonster(100, 100, monsterStage2HP);
      createMonster(300, 150, monsterStage2HP);
      createMonster(500, 250, monsterStage2HP);
    
      stage2TLMonstersSpawned = true; 
    }  
  } else if (player.x > canvas.w && player.y < canvas.h) { //TR
    if (!stage2TRMonstersSpawned) { //createMonster(100, 100, hp#);
      createMonster(800, 100, monsterStage2HP);
      createMonster(1000, 150, monsterStage2HP);
      createMonster(1300, 250, monsterStage2HP);
      createMonster(1000, 600, monsterStage2HP);
      createMonster(1300, 550, monsterStage2HP);
    
      stage2TRMonstersSpawned = true; 
    }
  } else if (player.x < canvas.w && player.y > canvas.h) { //BL
    if (!stage2BLMonstersSpawned) { //createMonster(100, 100, hp#);
      createMonster(650, 1250, monsterStage2HP);
      createMonster(500, 1150, monsterStage2HP);
      createMonster(400, 1350, monsterStage2HP);
    
      stage2BLMonstersSpawned = true; 
    }
  } else if (player.x > canvas.w && player.y > canvas.h) { //BR
    if (!stage2BRMonstersSpawned) { //createMonster(100, 100, hp#);
      createMonster(1150, 1250, monsterStage2HP);
      createMonster(1250, 1150, monsterStage2HP);
      createMonster(850, 1050, monsterStage2HP);
      createMonster(1300, 950, monsterStage2HP);
      createMonster(900, 1250, monsterStage2HP);
    
      stage2BRMonstersSpawned = true; 
    }
  }

}

//gamestates manager//////////////////////////////

function draw() {

  background(0);
  if (mouse.presses()) {
    if(!musicPlaying) {
      mainBackgroundMusic.play();
      mainBackgroundMusic.setVolume(0.4);
      musicPlaying = true;
    }
  }

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
    if (gameState === "level2") {
    level2();
  }
  if (gameState === "gameOver") {
    gameOver();
  }

  camera.off();
  fill(255, 215, 0); // gold color
   textSize(20);
   textAlign(RIGHT);
   text("Coins: " + playerCurrency, width - 20, 40);
  camera.on();
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
  fill(0, 0, 0, 90);  
  noStroke();
  rect(0, 0, canvas.w, canvas.h);

  monsterDmg = 10;

  if (!timerStarted) {
    endTime = millis() + totalTime;
    timerStarted = true;
  }

  if (!playerCreated) {
    createPlayer(100, 350);
    playerCreated = true;
  }

  if (!mapLoaded) {
    loadAllRooms(map1DataTL, map1DataTR, map1DataBL, map1DataBR)
    mapLoaded = true;
  }

  cameraMapMovement();
  playerMovement();
  bulletMechanics();
  monsterMechanics();

  //spawn monsters//////////////////////////////

  monsterTrackingStage1();

  ///////////////////////////////////////////

  world.step();        // updates physics
  allSprites.update(); // updates sprite logic
  allSprites.draw();   // renders all sprites

  ///////////////////////////////////////////
  
  for (let soul of souls) {
    if (soul.collectible && soul.overlapping(player)) {
      soul.collectible = false;
      soul.remove(); // collect the soul
  
      soulCounter += 1;
  
      // particle effect or sound here
    }
  }

  drawHealthBar(player, playerHealth, 100);

  for (let m of monsters) {
    drawHealthBar(m, m.health, m.maxHealth, {
      barWidth: 20, barHeight: 3, color: "red", background: 'black'
    });
  }

  drawCountdownTimer();
  drawCrosshair(mouse.x, mouse.y);
  if (soulCounter === soulsNeededStage1) { //stage win condition
    remainingTime = max(0, endTime - millis());
    timerStarted = false;
    playerCreated = false;
    soulCounter = 0;
    mapLoaded = false;

    allSprites.autoDraw = false;
    allSprites.autoUpdate = false;
    world.autoStep = false;

    gameState = "level2";

  }

}

function level2() {
  image(grassImg, 0, 0, canvas.w, canvas.h);
  monsterDmg = 15;

  totalTime = remainingTime + 1.5 * 60 * 1000;
  if (!timerStarted) {
    endTime = millis() + totalTime;
    timerStarted = true;
  }

  if (!playerCreated) {
    createPlayer(100, 1050);
    playerCreated = true;
  }

  if (!mapLoaded) {
    loadAllRooms(map2DataTL, map2DataTR, map2DataBL, map2DataBR)
    mapLoaded = true;
  }

  cameraMapMovement();
  image(dirtImg, 700, 0, canvas.w, canvas.h);
  playerMovement();
  bulletMechanics();
  monsterMechanics();
  monsterTrackingStage2();

  ///////////////////////////////////////////

  world.step();        // updates physics
  allSprites.update(); // updates sprite logic
  allSprites.draw();   // renders all sprites

  for (let soul of souls) {
    if (soul.collectible && soul.overlapping(player)) {
      soul.collectible = false;
      soul.remove(); // collect the soul
  
      soulCounter += 1;
  
      // particle effect or sound here
    }
  }

  drawHealthBar(player, playerHealth, 100);

  for (let m of monsters) {
    drawHealthBar(m, m.health, m.maxHealth, {
      barWidth: 20, barHeight: 3, color: "red", background: 'black'
    });
  }

  drawCountdownTimer();
  drawCrosshair(mouse.x, mouse.y);

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
  stage1TLMonstersSpawned = false;
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
* [*] stage 1 done
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