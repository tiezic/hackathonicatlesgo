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

//upgrade variables
let canBuyTime = true;
let hasRicochet = false;
let healthUpgradeLevel = 0;
let damageUpgradeLevel = 0;
let timeBought = 0; // Keep track of added time
let pierceUpgrade = false;

 // New Dash Variables
 let canDash = false; //buyable
 let hasDashSlash = false; //buyable
 let isDashing = false;
 let dashSpeed = 10;
 let dashDuration = 10; // Frames
 let dashCooldownDuration = 30; // Frames
 let dashTimer = 0;
 let dashCooldownTimer = 0;
 let dashDirection = {x: 0, y: 0};
 let dashDamage = 10; //damage of the dash

 //shop variables
 let shopOpen = false;
 let gamePaused = false;
 let upgradeNotificationVisible = false;
 let upgradeNotificationTimer = 0;
 const upgradeNotificationDuration = 120; // Frames
 let shopClickableArea; //define globally
 let shopElement; // p5.Element for the shop button
 let shopIsToggled = false;

 //upgrade costs
 let timeUpgradeCost = 5;
 const ricochetCost = 10;
 const healthUpgradeCosts = [8, 15, 25]; // Costs for each level
 const damageUpgradeCosts = [12, 20, 30]; // Costs for each level
 const pierceUpgradeCost = 15;
 const dashCost = 20;
 const dashSlashCost = 30;
 const baseTimeIncrease = 15 * 1000; // 15 seconds per purchase

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
let transitionImage1;

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
  soundFormats("mp3");
  mainBackgroundMusic = loadSound("glitchtrodeLostFragments.mp3")
  dirtImg = loadImage("dirt.png");
  grassImg = loadImage("grass.png");
  daFont = loadFont("BlackCasper.ttf");
  daFont2 = loadFont("AlmendraDisplay-Regular.ttf");
  transitionImage1 = loadImage("timetravel.png");

  monsterHitSound = loadSound("monsterHitSound.mp3");
  personHitSound = loadSound("personHitSound.mp3");
  projectileSound = loadSound("projectileSound.mp3");
  transition1Sound = loadSound("TeleporterSound.mp3")
  
}

//setup///////////////////////////////////////////

let tilesArray = [];

function loadAllRooms(mapDataTL, mapDataTR, mapDataBL, mapDataBR) {
  let tileW = 50;
  let tileH = 50;
  let offsetX = tileW / 2;
  let offsetY = tileH / 2;
  let cols = mapDataTL[0].length;
  let rows = mapDataTL.length;

  // top-left
  let tilesTL = new Tiles(mapDataTL, 0 + offsetX, 0 + offsetY, tileW, tileH, walls);
  tilesArray.push(tilesTL);

  // top-right
  let tilesTR = new Tiles(mapDataTR, cols * tileW + offsetX, 0 + offsetY, tileW, tileH, walls);
  tilesArray.push(tilesTR);

  // bottom-left
  let tilesBL = new Tiles(mapDataBL, 0 + offsetX, rows * tileH + offsetY, tileW, tileH, walls);
  tilesArray.push(tilesBL);

  // bottom-right
  let tilesBR = new Tiles(mapDataBR, cols * tileW + offsetX, rows * tileH + offsetY, tileW, tileH, walls);
  tilesArray.push(tilesBR);

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

   // Shop clickable area (initially defined, will be updated on resize if needed)
   shopClickableArea = {
       x1: width - 160,
       y1: 10,
       x2: width - 10,
       y2: 40
   };

   // Add a mousePressed listener to close shop on click outside shop.
   //canvas.mousePressed(handleMousePress);

}

function actualShopButton() {
     // Create the shop button as a p5.Element
     shopElement = createDiv("Shop");
     shopElement.style("position", "absolute");
     shopElement.position(windowWidth - 120, windowHeight - 60);
     shopElement.style("background", "#fff");
     shopElement.style("padding", "10px");
     shopElement.style('border-radius', '5px');
     shopElement.style('cursor', 'pointer');
     shopElement.mousePressed(toggleShop);
}

function windowResized() {
  resizeCanvas(700, 700); // Or your desired dimensions
  // Update shop button position on resize
  if (shopElement) {
    shopElement.position(windowWidth - 120, windowHeight - 60);

    //shopElement.style('left', `${width}px`);
  }
  // Update shop clickable area if needed
  /*
  shopClickableArea = {
      x1: width - 160,
      y1: 10,
      x2: width - 10,
      y2: 40
  };
  */
}

function toggleShop() {
  shopOpen = !shopOpen;
  gamePaused = shopOpen;
  console.log("Shop toggled via button");
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
      if (personHitSound && personHitSound.isLoaded()) {
        personHitSound.play(0, 1, 1, 0.25);
      }
    }
    if (isDashing && hasDashSlash && monster.overlapping(player)) {
      monster.health -= dashDamage;
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
  //also has soul counter and gold counter
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

  camera.off();
  fill(255, 215, 0); // gold color
   textSize(20);
   textAlign(RIGHT);
   text("Coins: " + playerCurrency, width - 20, 40);
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

  if (!isDashing) { // Only move normally if not dashing
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

      if (canDash && kb.presses('shift') && dashCooldownTimer === 0) {
          isDashing = true;
          dashTimer = dashDuration;
          dashCooldownTimer = dashCooldownDuration;
          moving = true;

          // Determine dash direction
          if (kb.pressing('left')) {
              dashDirection.x = -1;
          } else if (kb.pressing('right')) {
              dashDirection.x = 1;
          } else {
              dashDirection.x = 0;
          }
          if (kb.pressing('up')) {
              dashDirection.y = -1;
          } else if (kb.pressing('down')) {
              dashDirection.y = 1;
          } else {
              dashDirection.y = 0;
          }

          // Normalize the direction vector
          if (dashDirection.x !== 0 && dashDirection.y !== 0) {
              dashDirection.x *= 0.707; //  1 / Math.sqrt(2)
              dashDirection.y *= 0.707;
          }
      }

      if (!moving) {
          player.image = '🧍';
      };
  }

  if (isDashing) {
      player.vel.x = dashDirection.x * dashSpeed;
      player.vel.y = dashDirection.y * dashSpeed;
      dashTimer--;
      if (dashTimer <= 0) {
          isDashing = false;
          player.vel.x = 0;
          player.vel.y = 0;
      }
  }

  if (dashCooldownTimer > 0) {
      dashCooldownTimer--;
  }
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

    if (projectileSound && projectileSound.isLoaded()) {
      projectileSound.play();
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
        if (monsterHitSound && monsterHitSound.isLoaded()) {
          monsterHitSound.play(0, 1, 1, 0.15);
        }
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
      if (hasRicochet) {
        b.onWall = function () {
            this.vel.reflect(this.overlap(walls).normal);
        }
      }
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
  if (gameState === "transition1") {
    transition1();
  }
  if (gameState === "transition2") {
    transition2();
  }
  if (gameState === "transition1ImageShow") {
    image(transitionImage1, 0, 0, width+100, height);
    tempTimer += 1;
    if (tempTimer >= 90) {
      fadeAlpha += 10;
      fill(255, fadeAlpha);
      rect(0, 0, width, height);
      if (fadeAlpha >= 255) {
        fadeAlpha = 0;
        gameState = "runGame";
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
  if (gameState === "runGame") {
    runGame();
    if (shopOpen) {
      drawShop(); //draw shop on top
      handleShopInput(); // Handle shop input when open
    }
    if (upgradeNotificationVisible) {
      drawUpgradeNotification();
      upgradeNotificationTimer--;
      if (upgradeNotificationTimer <= 0) {
          upgradeNotificationVisible = false;
      }
    }
    // Only draw the crosshair when the shop is closed and the game is running
    if (!shopOpen) {
      drawCrosshair(mouse.x, mouse.y);
  }
  }
    if (gameState === "level2") {
    level2();
  }
  if (gameState === "gameOver") {
    gameOver();
  }

  drawCrosshair(mouse.x, mouse.y); ///////////////bcuysegcshbcesjydsbh

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
  text("WASD to move, LMB to shoot, shift to dash", (width/2), (height/2) + 50);
  pop();

  if (mouse.presses()) {
    gameState = "transition1";
  }
}

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
    gameState = "transition1ImageShow";
    transition1SoundPlayed = false;
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


function runGame() {
  //background
  image(dirtImg, 0, 0, canvas.w, canvas.h);
  fill(0, 0, 0, 90);  
  noStroke();
  rect(0, 0, canvas.w, canvas.h);
  if (!shopIsToggled) {
    actualShopButton();
    shopIsToggled = true;
  }

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
      playerCurrency += 1;
  
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

  //end stage
  if (soulCounter === soulsNeededStage1) {
    remainingTime = max(0, endTime - millis());
    timerStarted = false;
    soulCounter = 0;
    mapLoaded = false;
    walls = [];

    allSprites.autoDraw = false;
    allSprites.autoUpdate = false;
    world.autoStep = false;
    playerCreated = false;

    gameState = "transition2";

  }

}

function drawShop() {
  camera.off(); // Turn off camera movement for UI

  // Semi-transparent background panel
  fill(0, 180);
  rect(width / 2 - 200, height / 2 - 150, 400, 450, 20); //increased height of shop

  push(); // Isolate text styles
  textFont("serif");
  textAlign(CENTER, CENTER);
  fill(255);
  textSize(28);
  text("🛒 Upgrades", width / 2, height / 2 - 110); // More evocative title

  // Upgrade options data
  let upgradesData = [
      {name: "⏳ Add Time", cost: timeUpgradeCost, key: "1", description: "+10 seconds to your run."},
      {name: "❤️ Health Upgrade", cost: healthUpgradeCosts[healthUpgradeLevel] || "MAX", key: "2",
       description: "+20 Max Health."},
      {name: "💥 Damage Upgrade", cost: damageUpgradeCosts[damageUpgradeLevel] || "MAX", key: "3",
       description: "+1 Projectile Damage."},
      {name: "⚽ Ricochet Bullets", cost: hasRicochet ? "BOUGHT" : ricochetCost, key: "4",
       description: "Bullets bounce off walls."},
      {name: "🔁 Pierce Bullets", cost: pierceUpgrade ? "BOUGHT" : pierceUpgradeCost, key: "5",
       description: "Bullets pass through enemies."},
      {name: "⚡ Dash", cost: canDash? "BOUGHT": dashCost, key: "6", description: "Allows you to dash."}, //added dash
      {name: "⚔️ Dash n' Slash", cost: hasDashSlash? "BOUGHT": dashSlashCost, key: "7", description: "Damages enemies when dashing."}, // added dash n slash
  ];

  textSize(18);
  for (let i = 0; i < upgradesData.length; i++) {
      let y = height / 2 - 70 + i * 50; // Increased spacing for better readability
      let item = upgradesData[i];

      // Key indicator button
      fill(100);
      rect(width / 2 - 190, y - 15, 30, 30, 5);
      fill(255);
      textSize(16);
      text(item.key, width / 2 - 175, y);

      // Item name and description
      textAlign(LEFT, CENTER);
      textSize(18);
      fill(255);
      text(item.name, width / 2 - 150, y - 8);
      textSize(14);
      fill(200);
      text(item.description, width / 2 - 150, y + 12);

      // Cost display
      textAlign(RIGHT, CENTER);
      textSize(18);
      fill(255);
      text(`💰 ${item.cost}`, width / 2 + 180, y);
  }

  // Purchase instructions and currency display
  textAlign(CENTER, CENTER);
  textSize(16);
  fill(220);
  text("Press the corresponding number key to purchase.", width / 2, height / 2 + 270); //adjusted position
  textSize(18);
  fill(255, 255, 0); // Highlight currency

  pop(); // Restore previous text styles
  camera.on(); // Turn camera movement back on
}

function handleShopInput() {
  if (shopOpen) {
      if (kb.presses("1")) {
          attemptPurchase("⏳ Add Time", timeUpgradeCost, () => {
              endTime += baseTimeIncrease;
              timeBought++;
              canBuyTime = false;
              showUpgradeNotification("Time Added!");
          }, () => timeUpgradeCost += 5); // Example of a callback for upgrade effect and cost increase
      } else if (kb.presses("2")) {
          attemptPurchase("❤️ Health Upgrade", healthUpgradeCosts[healthUpgradeLevel], () => {
              playerHealth = 100 + (healthUpgradeLevel + 1) * 20;
              healthUpgradeLevel++;
              showUpgradeNotification("Health Increased!");
          });
      } else if (kb.presses("3")) {
          attemptPurchase("💥 Damage Upgrade", damageUpgradeCosts[damageUpgradeLevel], () => {
              playerDmg += 3;
              damageUpgradeLevel++;
              showUpgradeNotification("Damage Increased!");
          });
      } else if (kb.presses("4") && !hasRicochet) {
          attemptPurchase("⚽ Ricochet Bullets", ricochetCost, () => {
              hasRicochet = true;
              showUpgradeNotification("Ricochet Acquired!");
          });
      } else if (kb.presses("5") && !pierceUpgrade) {
          attemptPurchase("🔁 Pierce Bullets", pierceUpgradeCost, () => {
              pierceUpgrade = true;
              showUpgradeNotification("Piercing Shots!");
          });
      } else if (kb.presses("6") && !canDash) { //buy dash
          attemptPurchase("⚡ Dash", dashCost, () => {
              canDash = true;
              showUpgradeNotification("Dash Acquired");
          });
      } else if (kb.presses("7") && !hasDashSlash && canDash) { //buy dash n slash
          attemptPurchase("⚔️ Dash n\' Slash", dashSlashCost, () => {
              hasDashSlash = true;
              showUpgradeNotification("Dash n' Slash Acquired!");
          });
      }
  }
}

function attemptPurchase(itemName, cost, onSuccess, onAfford = () => {
}) {
  if (typeof cost === 'number' && playerCurrency >= cost) {
      playerCurrency -= cost;
      onSuccess();
      onAfford(); // Optional: function to execute after a successful purchase (e.g., increase cost)
      console.log(`Purchased: ${itemName}`);
  } else if (typeof cost === 'string' && cost === "MAX") {
      console.log(`${itemName} is already at maximum level.`);
  } else if (typeof cost === 'string' && cost === "BOUGHT") {
      console.log(`You have already purchased ${itemName}.`);
  } else {
      console.log(`Not enough Souls to purchase ${itemName}.`);
  }
}

function drawUpgradeNotification(message) {
  push();
  camera.off();
  fill(0, 200);
  rect(width / 2 - 100, height - 80, 200, 40, 8);
  fill(255);
  textAlign(CENTER, CENTER);
  textSize(18);
  text("Upgrade Purchased!", width / 2, height - 60);
  camera.on();
  pop();
}

function showUpgradeNotification(message) {
  upgradeNotificationVisible = true;
  upgradeNotificationTimer = upgradeNotificationDuration;
  upgradeNotificationMessage = message;
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
  shopElement.hide();

  fill('white');
  textAlign(CENTER);
  textSize(62);
  textFont("arial");
  text("gameover!", width/2, height/2);

  mainBackgroundMusic.stop();

}

function handleMousePress() {
  if (shopOpen &&
      !(mouse.x > width / 2 - 200 &&
        mouse.x < width / 2 + 200 &&
        mouse.y > height / 2 - 150 &&
        mouse.y < height / 2 + 200)) { //check if click is outside the shop rect
    shopOpen = false;
    gamePaused = false;
    console.log("Shop closed by clicking outside.");
  }
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
* [*] currency system
* [*] shop
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