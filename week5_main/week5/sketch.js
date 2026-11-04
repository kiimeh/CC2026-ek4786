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
  createCanvas(400, 400);

  noStroke();
  rectMode(CENTER);

  let currentH = hour();
  layerCount = currentH;

  // Initialize data for existing layers at startup
  for (let i = 1; i <= currentH; i++) {
    shapeX[i] = width / 2 + random(-150, 150);
    shapeY[i] = height / 2 + random(-100, 100);
    shapeTargetW[i] = random(200, 350);
    shapeTargetH[i] = random(120, 250);
    
    // Start with already full size for past hours
    shapeCurrentW[i] = shapeTargetW[i];
    shapeCurrentH[i] = shapeTargetH[i];
  }
}

function draw() {
  let h = hour();
  let m = minute();
  let s = second(); 

  // 1. Time-based background color transitions
  let bgMorning = color(240, 244, 248);   // Morning: Pastel blue-white (6 AM - 12 PM)
  let bgAfternoon = color(245, 241, 232); // Afternoon: Warm cream sand (12pm - 6 PM)
  let bgNight = color(20, 25, 38);        // Night: Deep blue charcoal (6pm after)

  let currentBg;
  if (h < 12) {
    currentBg = bgMorning;
  } else if (h < 18) {
    let amt = map(h, 12, 17, 0, 1);
    currentBg = lerpColor(bgMorning, bgAfternoon, amt);
  } else {
    currentBg = bgNight;
  }
  background(currentBg);

  // Add a new layer on the hour
  if (h !== lastHour && lastHour !== -1) {
    if (h === 0) {
      layerCount = 0; 
    } else {
      layerCount = layerCount + 1;
      
      // Store random positions and target sizes directly in arrays
      shapeX[layerCount] = width / 2 + random(-150, 150);
      shapeY[layerCount] = height / 2 + random(-100, 100);
      shapeTargetW[layerCount] = random(200, 350);
      shapeTargetH[layerCount] = random(120, 250);
      
      // Growth animation starts from size 0
      shapeCurrentW[layerCount] = 0;
      shapeCurrentH[layerCount] = 0;
    }
  }
  lastHour = h;

  // 2. Render Hanji paper layers
  for (let i = 1; i <= layerCount; i++) {
    // Smooth growth animation using lerp()
    shapeCurrentW[i] = lerp(shapeCurrentW[i], shapeTargetW[i], 0.05);
    shapeCurrentH[i] = lerp(shapeCurrentH[i], shapeTargetH[i], 0.05);

    // Color palettes by time of day
    let cBlue = color(165, 205, 225);     
    let cYellow = color(225, 225, 175);   
    let cAfternoon = color(235, 175, 130); 
    let cEvening = color(150, 110, 150);   
    let cNight = color(45, 60, 95);        

    let baseColor;
    if (i <= 11) {
      let amt = map(i, 1, 11, 0, 1);
      baseColor = lerpColor(cBlue, cYellow, amt);
    } else if (i <= 17) {
      let amt = map(i, 12, 17, 0, 1);
      baseColor = lerpColor(cAfternoon, cEvening, amt);
    } else {
      let amt = map(i, 18, 23, 0, 1);
      baseColor = lerpColor(cEvening, cNight, amt);
    }

    // Floating motion using sin()
    let waveY = sin(frameCount * 0.02 + i) * 5; 

    let alphaVal = 75;
    if (h >= 18) {
      alphaVal = 45;
    }

    fill(red(baseColor), green(baseColor), blue(baseColor), alphaVal); 
    rect(shapeX[i], shapeY[i] + waveY, shapeCurrentW[i], shapeCurrentH[i], 2); 
  }

  // 3. 1-second interval sparkling light particle
  if (s !== lastSecond) {
    sparkleX = width / 2 + random(-180, 180);
    sparkleY = height / 2 + random(-130, 130);
    sparkleAlpha = 220; 
    lastSecond = s;
  }

  if (sparkleAlpha > 0) {
    fill(255, 240, 190, sparkleAlpha);
    rect(sparkleX, sparkleY, 12, 12, 2);
    sparkleAlpha = sparkleAlpha - 5; 
  }

  // 4. Clock display at bottom right
  if (h >= 18 || h < 6) {
    fill(210, 180);
  } else {
    fill(100, 180);
  }

  textSize(14);
  textAlign(RIGHT, BOTTOM);

  let displayM = m;
  if (m < 10) {
    displayM = "0" + m;
  }

  text(h + ":" + displayM, width - 30, height - 30);
}