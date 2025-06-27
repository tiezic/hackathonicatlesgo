//global variables///////////////////////////////

//👹

//main sprites + attributes
let player, playerHealth = 100; //"playerHealth -= dmgAmount;" to damage the player
let playerDmgedDelay = 180, playerDmgedCooldown = 180;
let playerDmg = 5;
let playerCreated = false;
let playerEXP = 10;
let soulCounter = 0;
let soulsNeededStage1 = 18;
let soulsNeededStage2 = 25;

//upgrade variables
let canBuyTime = true;
let hasRicochet = false;
let healthUpgradeLevel = 0;
let damageUpgradeLevel = 0;
let timeBought = 0; // Keep track of added time
let pierceUpgrade = false;

// maps & walls
let caveWall1;
let caveWall2;
let grassTile1;
let brickWalls;
let treeWalls;
let houseWalls;

let maps = {};
let mapLoaded = false;
let currentRoom = 'room1';

// tiled maps
// f,g,h = grasses
// w = cavewall, j = cavewallconnector, a = cavefloor
// map 1
let map1DataBL = [
  'wwjjjjjjjjjjjjww',
  'ffwwwjjjjjwwwwff',
  'fffffwwwwwffffff',
  'ffffffffffffffff',
  'ffffffffffffffff',
  'ffffffffffffffff',
  'ffffffffffffffff',
  'ffffffffffffffff',
  'ffffffffffffffff',
  'ffffffffffffffff',
  'ffffffffffffffff',
  'ffffffffffffffff',
  'ffffffffffffffff',
  'ffffffffffffffff',
  '~~~fffffffffffff',
  '~~~~~~~~~~~~~~~~'
];

let map1DataBR = [
  'wwwjjjwwaaaawwww',
  'fhfwwwffffffffff',
  'fffhfffffffgffff',
  'fffffffffffffhff',
  'ffgfffffffffffff',
  'ffffffffffhfffff',
  'ffffffffffffffff',
  'ffffffffffffffff',
  'fffffgfffffffffh',
  'ffffffffffffffff',
  'ffhfffffffffffff',
  'fffffffhffffgfff',
  'fffffffffffff~~~',
  'ffffgffffff~~~~~',
  'fffffff~~~~~~~~~',
  '~~~~~~~~~~~~~~~~'
];

let map1DataTR = [
  'bbbbbbbbbbbbbbbb',
  'bbbbbbbbbbbbbbbb',
  'bbbbbjwwwwjbbbbb',
  'bbbjwwaaaawwjbbb',
  'bjwwaaaaaaaawjbb',
  'wwaaaaaaaaaaawjb',
  'aaaaaaaaaaaaaajb',
  'aaaaaaaaaaaaaajb',
  'aaaaaaaaaaaaaajb',
  'aaajwwwwjaaaaajb',
  'wwwwbbbbwjaaaajb',
  'bbbbbbbbbjaaaajb',
  'bbbbbbbbjwaaajwb',
  'bbbbbbbjwaaaajbb',
  'bbbbbbbjaaaajwbb',
  'bbbbbbbjaaaajbbb'
];

let map1DataTL = [
  'bbbbbbbbbbbbbbbb',
  'bbbbbbbbbbbbbbbb',
  'bbbbbbbbbbbbbbbb',
  'bbbbbjwwwjbbbbbb',
  'bbbjwwaaawwwwjbb',
  'bbjwaaaaaaaaawww',
  'bbjaaaaaaaaaaaaa',
  'bbjaaaaaaaaaaaaa',
  'bbjaaaaaaaaaaaaa',
  'bbjaaaaaaaaaaaaa',
  'bbwwjaaaaaaaaajw',
  'bbbbwwwwjaaajwwb',
  'bbbbbbbbwwwwwbbb',
  'bbbbbbbbbbbbbbbb',
  'bbbbbbbbbbbbbbbb',
  'bbbbbbbbbbbbbbbb'
];

let map1OverlayBL = [
  '                ',
  '                ',
  '                ',
  '                ',
  '                ',
  '                ',
  '                ',
  '                ',
  '                ',
  '                ',
  '                ',
  '                ',
  '                ',
  '                ',
  '                ',
  '                ',
];

let map1OverlayBR = [
  '                ',
  '                ',
  '                ',
  '                ',
  '                ',
  '                ',
  '                ',
  '      +{}       ',
  '                ',
  '                ',
  '                ',
  '                ',
  '                ',
  '                ',
  '                ',
  '                ',
];

let map1OverlayTR = [
  '                ',
  '                ',
  '                ',
  '                ',
  '                ',
  '                ',
  '                ',
  '                ',
  '                ',
  '                ',
  '                ',
  '                ',
  '                ',
  '                ',
  '                ',
  '                ',
];

let map1OverlayTL = [
  '                ',
  '                ',
  '                ',
  '                ',
  '                ',
  '                ',
  '                ',
  '                ',
  '                ',
  '                ',
  '                ',
  '                ',
  '                ',
  '                ',
  '                ',
  '                ',
];

// map 2

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
let grassImg;
let mainBackgroundMusic;
let musicPlaying = false;
let transitionImage1;
let transition1Sound;

//timer
let totalTime = 1.5 * 60 * 1000; //1:30
let endTime;
let timerStarted = false;
let remainingTime = 0;

//gamestates
let gameState = "titleScreen";
let fadeAlpha = 0;
let transition1SoundPlayed = false;
let tempTimer = 0;

//////////////////////////////////////////////////


function preload() {
  //preload images & fonts
  //soundFormats("mp3");
  mainBackgroundMusic = loadSound("sounds/glitchtrodeLostFragments.mp3")
  backgroundImg = loadImage("textures/mainbackground.png");
  grassImg = loadImage("textures/grass.png");
  daFont = loadFont("fonts/BlackCasper.ttf");
  daFont2 = loadFont("fonts/AlmendraDisplay-Regular.ttf");
  transitionImage1 = loadImage("textures/timetravelpic.png");

  mainTiles = loadImage("textures/tiles.png");
  waterTiles = loadImage("textures/animated-tiles.png");

  hitmarker = loadSound("sounds/hitmarker.mp3")
  personHitSound = loadSound("sounds/personHitSound.mp3");
  projectileSound = loadSound("sounds/projectileSound.mp3");
  transition1Sound = loadSound("sounds/TeleporterSound.mp3");
  
}

//setup///////////////////////////////////////////

function loadAllRooms(mapDataTL, mapDataTR, mapDataBL, mapDataBR,
  mapDataOverlayTL, mapDataOverlayTR, mapDataOverlayBL, mapDataOverlayBR) {

  // maps are 32x32 pixels, 16x16 grid
  // format: new Tiles(mapArray, x, y, w, h)

  let roomXY = 16;
  let tileW = 32, tileH = 32;
  let offsetX = 512 + 16, offsetY = 512 + 16;

  // main obstacles
  new Tiles(mapDataTL, roomXY, roomXY, tileW, tileH); //TL
  new Tiles(mapDataTR, offsetX, roomXY, tileW, tileH); //TR
  new Tiles(mapDataBL, roomXY, offsetY, tileW, tileH); //BL
  new Tiles(mapDataBR, offsetX, offsetY, tileW, tileH); //BR

  // overlay
  new Tiles(mapDataOverlayTL, roomXY, roomXY, tileW, tileH); //TL
  new Tiles(mapDataOverlayTR, offsetX, roomXY, tileW, tileH); //TR
  new Tiles(mapDataOverlayBL, roomXY, offsetY, tileW, tileH); //BL
  new Tiles(mapDataOverlayBR, offsetX, offsetY, tileW, tileH); //BR
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

function createMonster(x, y, health = 20) {
    //monster attributes
    let monster = new Sprite(x, y, 30, 30);
    monster.image = '🦇';
    monster.health = health;
    monster.maxHealth = health;
    monsters.add(monster);
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
  // time and soul counter
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
let wallGroup;
function setup() {
  new Canvas(512, 512);
  noSmooth();
  console.log("setup");
  world.gravity.y = 0;

  //timer
  endTime = millis() + totalTime;

  //floor & map attributes
  let tileScale = 2;
  wallGroup = new Group();

  //background tiles //b
  mainBackgroundTile = new Group();
  mainBackgroundTile.spriteSheet = mainTiles;
  mainBackgroundTile.addAni({w:32, h:32, row:7, col:0});
  mainBackgroundTile.tile = 'b';
  mainBackgroundTile.collider = 'none';
  mainBackgroundTile.scale = tileScale;

  //grass //f, g, h
  grassTile1 = new Group();
  grassTile1.spriteSheet = mainTiles;
  grassTile1.addAni({w:32, h:32, row:6, col:0});
  grassTile1.tile = 'f';
  grassTile1.collider = 'none';
  grassTile1.scale = tileScale;

  grassTile2 = new Group();
  grassTile2.spriteSheet = mainTiles;
  grassTile2.addAni({w:32, h:32, row:7, col:1});
  grassTile2.tile = 'g';
  grassTile2.collider = 'none';
  grassTile2.scale = tileScale;

  grassTile3 = new Group();
  grassTile3.spriteSheet = mainTiles;
  grassTile3.addAni({w:32, h:32, row:7, col:2});
  grassTile3.tile = 'h';
  grassTile3.collider = 'none';
  grassTile3.scale = tileScale;

  // cave walls & floor //w, j, a
  caveWall1 = new Group();
  caveWall1.spriteSheet = mainTiles;
  caveWall1.addAni({w:32, h:32, row:3, col:1});
  caveWall1.tile = 'w';
  caveWall1.collider = 'static';
  caveWall1.scale = tileScale;
  //wallGroup.add(caveWall1);

  caveWall2 = new Group();
  caveWall2.spriteSheet = mainTiles;
  caveWall2.addAni({w:32, h:32, row:3, col:0});
  caveWall2.tile = 'j';
  caveWall2.collider = 'static';
  caveWall2.scale = tileScale;
  //wallGroup.add(caveWall2);

  caveFloor1 = new Group();
  caveFloor1.spriteSheet = mainTiles;
  caveFloor1.addAni({w:32, h:32, row:15, col:0});
  caveFloor1.tile = 'a';
  caveFloor1.collider = 'none';
  caveFloor1.scale = tileScale;

  //overlays //+, }, {
  bones1 = new Group();
  bones1.spriteSheet = mainTiles;
  bones1.addAni({w:32, h:32, row:15, col:4});
  bones1.tile = '+';
  bones1.collider = 'none';
  bones1.scale = tileScale;

  bones2 = new Group();
  bones2.spriteSheet = mainTiles;
  bones2.addAni({w:32, h:32, row:15, col:5});
  bones2.tile = '}';
  bones2.collider = 'none';
  bones2.scale = tileScale;

  bones3 = new Group();
  bones3.spriteSheet = mainTiles;
  bones3.addAni({w:32, h:32, row:15, col:6});
  bones3.tile = '{';
  bones3.collider = 'none';
  bones3.scale = tileScale;

  // water tiles //~
  waterTile1 = new Group();
  waterTile1.spriteSheet = waterTiles;
  waterTile1.addAni({w:32, h:32, row:10, col:9});
  waterTile1.tile = '~';
  waterTile1.collider = 'static';
  waterTile1.scale = tileScale;
  //wallGroup.add(waterTile1);

  // < delete these after >
  brickWalls = new Group();
  brickWalls.w = 50;
  brickWalls.h = 50;
  brickWalls.image = '🧱';
  brickWalls.tile = '=';
  brickWalls.collider = 'static';

  treeWalls = new Group();
  treeWalls.w = 50;
  treeWalls.h = 50;
  treeWalls.image = '🌳';
  treeWalls.tile = '+';
  treeWalls.collider = 'static';

  houseWalls = new Group();
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

//mechanics///////////////////////////////////////

function playerMovement() {
  //player movement
  let moving = false;
  let playerForce = 35;
  player.vel.y *= .9;
  player.vel.x *= .9;


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

    //play shoot sound
    if (projectileSound && projectileSound.isLoaded()) {
      projectileSound.play(0, 1, 0.25, 0);
    }

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
        m.health -= playerDmg;
        if (hitmarker && hitmarker.isLoaded()) {
          hitmarker.play(0, 1, 0.3, 0.7); //(#,#, vol, startDelay)
        }
        if (m.health <= 0) {
          spawnSoul(m.x, m.y);
          m.remove();
          playerEXP +=1;
        }
        if (!pierceUpgrade) {
          bullet.remove();
        }
      });

      b.collides(wallGroup, (bullet, w) => {
        bullet.remove();
      });

      b.overlaps(brickWalls, (bullet) => {
        bullet.remove();
      });
      
      b.overlaps(treeWalls, (bullet) => {
        bullet.remove();
      });
      
      b.overlaps(houseWalls, (bullet) => {
        bullet.remove();
      });

      b.overlaps(souls, () => {
        //empty, if bullet interacts with soul do nothing
      });
    }

    bulletCooldown = bulletDelay;

  };
}

function monsterMechanics() {
  for (let monster of monsters) {
    monster.moveTo(player, monsterSpeed);

    // when player gets hit
    if (monster.overlapping(player) && playerDmgedCooldown === 0) {
      playerHealth -= monsterDmg; // Deal damage
      playerDmgedCooldown = playerDmgedDelay;

      if (personHitSound && personHitSound.isLoaded()) {
        personHitSound.play(0, 1, 1, 0.25);
      }
      
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

function drawMonHealthBar(sprite, currentHealth, maxHealth, options = {}) {
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
    camera.x = lerp(camera.x, 256, cameraSpeed);
    camera.y = lerp(camera.y, 256, cameraSpeed);
  } else if (player.x > canvas.w && player.y < canvas.h) { //TR
    camera.x = lerp(camera.x, 768, cameraSpeed);
    camera.y = lerp(camera.y, 256, cameraSpeed);
  } else if (player.x < canvas.w && player.y > canvas.h) { //BL
    camera.x = lerp(camera.x, 256, cameraSpeed);
    camera.y = lerp(camera.y, 768, cameraSpeed);
  } else if (player.x > canvas.w && player.y > canvas.h) { //BR
    camera.x = lerp(camera.x, 768, cameraSpeed);
    camera.y = lerp(camera.y, 768, cameraSpeed);
  }

}

function monsterSpawnsStage(stage) {

  if (stage === 1) {
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
  } else if (stage === 2) {
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

}

//gamestates manager//////////////////////////////

function draw() {
  background(0);
  if (mouse.presses()) {
    if(!musicPlaying) {
      mainBackgroundMusic.play(0, 1, 1, 5);
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
  if (gameState === "level1") {
    level1();
  }
    if (gameState === "level2") {
    level2();
  }
  if (gameState === "gameOver") {
    gameOver();
  }
  
  //transitions
  if (gameState === "transition1") {
    transition1();
  }
  if (gameState === "transition2") {
    transition2();
  }
  if (gameState === "transition1ImageShow") {
    image(transitionImage1, 0, 0, width, height);
    tempTimer += 1;
    if (tempTimer >= 90) {
      fadeAlpha += 10;
      fill(255, fadeAlpha);
      rect(0, 0, width, height);
      if (fadeAlpha >= 255) {
        fadeAlpha = 0;
        gameState = "level1";
      }
    }
  }
  if (gameState === "transition2ImageShow") {
    image(transitionImage1, 0, 0, width+100, height);
    tempTimer += 1;
    if (tempTimer >= 90) {
      fadeAlpha += 10;
      fill(255, fadeAlpha);
      rect(0, 0, width, height);
      if (fadeAlpha >= 255) {
        fadeAlpha = 0;
        gameState = "level2";
      }
    }
  }
} 

//transitions/////////////////////////////////////

function transition1() {
  fadeAlpha += 5;
  fill(255, fadeAlpha);
  rect(0, 0, width, height);

  if (!transition1SoundPlayed) {
    transition1Sound.play();
    transition1SoundPlayed = true;
  }
  if (fadeAlpha >= 255) {
    fadeAlpha = 0;
    transition1SoundPlayed = false;
    gameState = "transition1ImageShow";
  }
}

function transition2() {
  background(255, 255, 255);
  fadeAlpha += 2;
  if (!transition1SoundPlayed) {
    transition1Sound.play();
    transition1SoundPlayed = true;
  }
  if (fadeAlpha >= 255) {
    fadeAlpha = 0;
    gameState = "transition2ImageShow";
    transition1SoundPlayed = false;
  }
}

//gamestates//////////////////////////////////////

function runGame(stage, monDMG, soulsNeeded, nextGameState) {
  monsterDmg = monDMG;

  cameraMapMovement();
  playerMovement();
  bulletMechanics();
  monsterMechanics();
  monsterSpawnsStage(stage);
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

  for (let m of monsters) {
    drawMonHealthBar(m, m.health, m.maxHealth, {
      barWidth: 20, barHeight: 3, color: "red", background: 'black'
    });
  }

  drawCountdownTimer();

  //end stage, flag everything as false
  if (soulCounter === soulsNeeded) { //parameter
    remainingTime = max(0, endTime - millis()); //save previous time
    timerStarted = false;
    soulCounter = 0;
    mapLoaded = false;

    wallGroup.removeAll();
    if (typeof brickWalls !== 'undefined') brickWalls.removeAll();
    if (typeof treeWalls !== 'undefined') treeWalls.removeAll(); 
    if (typeof houseWalls !== 'undefined') houseWalls.removeAll();

    allSprites.autoDraw = false;
    allSprites.autoUpdate = false;
    world.autoStep = false;

    gameState = nextGameState; //parameter
    playerCreated = false;

  }

}

function titleScreen() {
  push();
  background('black');
  noStroke();

  fill('white');
  textAlign(CENTER);
  textSize(72);
  textFont(daFont);
  text("TimeBound", width/2, height/2-70);

  fill('gray');
  textSize(25);
  textFont(daFont2);
  text("click left mouse button to start", (width/2), (height/2) + 40);
  text("WASD to move, LMB to shoot, shift to dash", (width/2), (height/2) + 80);
  pop();

  if (mouse.presses()) {
    gameState = "transition1";
  }
}

function level1() {
  //background stuff
  background(backgroundImg);
  //variables for level1
  stage = 1;
  monDMG = 10;
  playerXPos = 200;
  playerYPos = 250;
  soulsNeeded = soulsNeededStage1;
  nextGameState = "transition2";
  mapDataTL = map1DataTL;
  mapDataTR = map1DataTR;
  mapDataBL = map1DataBL;
  mapDataBR = map1DataBR;
  mapOverlayTL = map1OverlayTL;
  mapOverlayTR = map1OverlayTR;
  mapOverlayBL = map1OverlayBL;
  mapOverlayBR = map1OverlayBR;

  //setting up checks
  if (!mapLoaded) {
    loadAllRooms(mapDataTL, mapDataTR, mapDataBL, mapDataBR,
      map1OverlayTL, map1OverlayTR, map1OverlayBL, map1OverlayBR)
    mapLoaded = true;
  }

  if (!timerStarted) {
    endTime = millis() + totalTime;
    timerStarted = true;
  }

  if (!playerCreated) {
    createPlayer(playerXPos, playerYPos);
    playerCreated = true;
  }

  runGame(stage, monDMG, soulsNeeded, nextGameState);
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
  playerMovement();
  bulletMechanics();
  monsterMechanics();
  monsterSpawnsStage2();

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

  for (let m of monsters) {
    drawMonHealthBar(m, m.health, m.maxHealth, {
      barWidth: 20, barHeight: 3, color: "red", background: 'black'
    });
  }

  drawCountdownTimer();

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
* [] EXP system
* [] shop
* [] bosses
* [] stage 1 done
* [] tilesets done
* [] spritesheets with anims done
* (extras)
* [] animations/cutscenes
* [] different classes
* [] actual random generating rooms but with same bosses at end
*
* ------------------------------------------------------------
*
* notes:
*
* "David Bouchard p5play" on yt is goated, watch him for tutorials
*
* was last figuring out bullet collisions with walls, you need to
* make the groups into individual sprites somehow then you add 
* those to wallGroup
* backdrop -> 87, 
****************/