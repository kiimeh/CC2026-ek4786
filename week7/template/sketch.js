let pMapper;
let quad0; // one

// Basic variables for Hanji layers and light particles
let layerCount = 0;
let lastHour = -1;

// Basic arrays to store coordinates, target sizes, and current sizes
let shapeX = [];
let shapeY = [];
let shapeTargetW = [];
let shapeTargetH = [];
let shapeCurrentW = [];
let shapeCurrentH = [];

// Variables for 1second light particle effect
let sparkleX = 0;
let sparkleY = 0;
let sparkleAlpha = 0;
let lastSecond = -1;

function setup() {
    createCanvas(windowWidth, windowHeight, WEBGL);

    // create mapper object
    pMapper = createProjectionMapper(this);

    quad0 = pMapper.createQuadMap(400, 400); // width height

    // loads calibration in the "maps" directory
    // pMapper.load("maps/map.json");
    evaKimSetup();
}

function draw() {
    background(0);

    quad0.displaySketch(evaKimTexture);
}

function keyPressed() {
    switch (key) {
        case "c":
            pMapper.toggleCalibration();
            break;
        case "f":
            let fs = fullscreen();
            fullscreen(!fs);
            break;
        case "l":
            pMapper.load("maps/map.json");
            break;

        case "s":
            pMapper.save("map.json");
            break;
    }
}

function windowResized() {
    resizeCanvas(windowWidth, windowHeight);
}



//////////////////////////// Setup-Eva Kim
function evaKimSetup() {
    let currentH = hour();
    layerCount = currentH;
    lastHour = currentH;

    // Initialize data for existing layers at startup
    for (let i = 1; i <= currentH; i++) {
        shapeX[i] = 200 + random(-70, 70);
        shapeY[i] = 200 + random(-50, 50);
        shapeTargetW[i] = random(120, 200);
        shapeTargetH[i] = random(80, 140);
        
        shapeCurrentW[i] = shapeTargetW[i];
        shapeCurrentH[i] = shapeTargetH[i];
    }
}

function evaKimTexture(pg) {
    pg.noStroke();
    pg.rectMode(CENTER);

    let h = hour();
    let m = minute();
    let s = second(); 

    // 1. Time-based background color transitions
    let bgMorning = pg.color(240, 244, 248);   // Morning: Pastel blue-white (6 AM - 12 PM)
    let bgAfternoon = pg.color(245, 241, 232); // Afternoon: Warm cream sand (12pm - 6 PM)
    let bgNight = pg.color(20, 25, 38);        // Night: Deep blue charcoal (6pm after)

    let currentBg;
    if (h < 12) {
      currentBg = bgMorning;
    } else if (h < 18) {
      let amt = map(h, 12, 17, 0, 1);
      currentBg = pg.lerpColor(bgMorning, bgAfternoon, amt);
    } else {
      currentBg = bgNight;
    }
    pg.background(currentBg);

    // Add a new layer on the hour
    if (h !== lastHour) {
      if (h === 0) {
        layerCount = 0; 
      } else if (h > lastHour) {
        layerCount = h;
        shapeX[layerCount] = 200 + random(-70, 70);
        shapeY[layerCount] = 200 + random(-50, 50);
        shapeTargetW[layerCount] = random(120, 200);
        shapeTargetH[layerCount] = random(80, 140);
        
        shapeCurrentW[layerCount] = 0;
        shapeCurrentH[layerCount] = 0;
      }
      lastHour = h;
    }

    // 2. Render Hanji paper layers
    for (let i = 1; i <= layerCount; i++) {
      // Smooth growth animation using lerp()
      shapeCurrentW[i] = lerp(shapeCurrentW[i], shapeTargetW[i], 0.05);
      shapeCurrentH[i] = lerp(shapeCurrentH[i], shapeTargetH[i], 0.05);

      // Color palettes by time of day
      let cBlue = pg.color(165, 205, 225);     
      let cYellow = pg.color(225, 225, 175);   
      let cAfternoon = pg.color(235, 175, 130); 
      let cEvening = pg.color(150, 110, 150);   
      let cNight = pg.color(45, 60, 95);        

      let baseColor;
      if (i <= 11) {
        let amt = map(i, 1, 11, 0, 1);
        baseColor = pg.lerpColor(cBlue, cYellow, amt);
      } else if (i <= 17) {
        let amt = map(i, 12, 17, 0, 1);
        baseColor = pg.lerpColor(cAfternoon, cEvening, amt);
      } else {
        let amt = map(i, 18, 23, 0, 1);
        baseColor = pg.lerpColor(cEvening, cNight, amt);
      }

      // Floating motion using sin()
      let waveSin = sin(frameCount * 0.02 + i) * 5; 

      let alphaVal = (h >= 18) ? 45 : 75;

      pg.fill(pg.red(baseColor), pg.green(baseColor), pg.blue(baseColor), alphaVal); 
      pg.rect(shapeX[i], shapeY[i] + waveSin, shapeCurrentW[i], shapeCurrentH[i], 2);
    }

    // 3. 1-second interval sparkling light particle
    if (s !== lastSecond) {
      sparkleX = 200 + random(-100, 100);
      sparkleY = 200 + random(-80, 80);
      sparkleAlpha = 220; 
      lastSecond = s;
    }

    if (sparkleAlpha > 0) {
      pg.fill(255, 240, 190, sparkleAlpha);
      pg.rect(sparkleX, sparkleY, 10, 10, 2);
      sparkleAlpha = sparkleAlpha - 5; 
    }

    // 4. Clock display at bottom right
    if (h >= 18 || h < 6) {
      pg.fill(210, 180);
    } else {
      pg.fill(100, 180);
    }

    pg.textSize(14);
    pg.textAlign(RIGHT, BOTTOM);

    let displayM = (m < 10) ? "0" + m : m;

    pg.text(h + ":" + displayM, pg.width - 20, pg.height - 20);
}