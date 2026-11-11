// Hanji Clock + microphone (amplitude only)
// Click the canvas once to turn on the microphone.

// Hanji layers
let layerCount = 0; // how many paper layers exist right now
let lastHour = -1;  // remembers the previous hour, so we can tell when the hour changes

// Each paper layer has its own position and size.
let shapeX = [];
let shapeY = [];
let shapeTargetW = [];   // the final width of the paper
let shapeTargetH = [];   // the final height of the paper
let shapeCurrentW = [];  // the width right now (grows slowly toward the target)
let shapeCurrentH = [];

// 1-second light particle (appears once every second, even without sound)
let sparkleX = 0;
let sparkleY = 0;
let sparkleAlpha = 0;
let lastSecond = -1;

// Extra sparkles that appear when the sound is loud.
// We make their positions once in setup() and keep them in arrays.
let extraX = [];
let extraY = [];

// Audio
let mic;           
let analyze;        
let amplitude = 0;  
let loud = 0;       // the cleaned-up loudness, from 0 (silent) to 1 (very loud)
let micOn = false;  // true after the user clicks

// Time value used for the floating motion.
// We add to it every frame. If we add more when it is loud, the paper moves faster.
let floatTime = 0;

// ---------------------------------------------------------
// SETUP 
function setup() {
  createCanvas(400, 400);

  noStroke();
  rectMode(CENTER); // rect(x, y, w, h) now draws from the center of the rectangle

  // Audio setup:
  // 1) make a microphone, 2) make an amplitude analyzer,
  // 3) connect the microphone to the analyzer so it can measure the sound
  mic = new p5.AudioIn();
  analyze = new p5.Amplitude();
  mic.connect(analyze);

  // Make 30 random positions for the extra sparkles
  for (let i = 0; i < 30; i++) {
    extraX[i] = width / 2 + random(-180, 180);
    extraY[i] = height / 2 + random(-130, 130);
  }

  // If the sketch starts at 3 PM, we need 15 layers already.
  let currentH = hour();
  layerCount = currentH;

  // Give every existing layer a random position and size
  for (let i = 1; i <= currentH; i++) {
    shapeX[i] = width / 2 + random(-150, 150);
    shapeY[i] = height / 2 + random(-100, 100);
    shapeTargetW[i] = random(200, 350);
    shapeTargetH[i] = random(120, 250);

    // Past hours start at full size (no growing animation)
    shapeCurrentW[i] = shapeTargetW[i];
    shapeCurrentH[i] = shapeTargetH[i];
  }
}

// ---------------------------------------------------------
// MOUSE CLICK so it doesn't automatically initiate the microphone. 
function mousePressed() {
  userStartAudio(); // allows the browser to use audio
  mic.start();      // starts listening to the microphone
  micOn = true;
}

function draw() {
  let h = hour();
  let m = minute();
  let s = second();

  // ===== READ THE MICROPHONE =====
  amplitude = analyze.getLevel();

  let target = map(amplitude, 0, 0.2, 0, 1);
  target = constrain(target, 0, 1);
  loud = lerp(loud, target, 0.2);

  // ===== 1. BACKGROUND COLOR (changes with the time of day) =====
  let bgMorning = color(240, 244, 248);   // morning: pale blue-white
  let bgAfternoon = color(245, 241, 232); // afternoon: warm cream
  let bgNight = color(20, 25, 38);        // night: deep blue-charcoal

  let currentBg;
  if (h < 12) {
    currentBg = bgMorning;
  } else if (h < 18) {
    // between 12 and 17, slowly blend from the morning color to the afternoon color
    let amt = map(h, 12, 17, 0, 1);
    currentBg = lerpColor(bgMorning, bgAfternoon, amt);
  } else {
    currentBg = bgNight;
  }
  background(currentBg);

  // ===== ADD A NEW LAYER WHEN THE HOUR CHANGES =====
  // If the hour is different from the last frame, a new hour has started.
  if (h !== lastHour && lastHour !== -1) {
    if (h === 0) {
      layerCount = 0; // midnight: start over
    } else {
      layerCount = layerCount + 1;

      shapeX[layerCount] = width / 2 + random(-150, 150);
      shapeY[layerCount] = height / 2 + random(-100, 100);
      shapeTargetW[layerCount] = random(200, 350);
      shapeTargetH[layerCount] = random(120, 250);

      // the new paper starts at size 0 and grows
      shapeCurrentW[layerCount] = 0;
      shapeCurrentH[layerCount] = 0;
    }
  }
  lastHour = h;

  // ===== AUDIO RELATIONSHIP LOUDER -> FLOATS FASTER =====

  let speed = map(loud, 0, 1, 0.02, 0.15);
  floatTime = floatTime + speed;

  // ===== 2. DRAW THE HANJI PAPER LAYERS =====
  // This loop goes through every layer, from layer 1 to the latest layer.
  for (let i = 1; i <= layerCount; i++) {

    // Grow slowly toward the target size (lerp moves 5% of the way each frame)
    shapeCurrentW[i] = lerp(shapeCurrentW[i], shapeTargetW[i], 0.05);
    shapeCurrentH[i] = lerp(shapeCurrentH[i], shapeTargetH[i], 0.05);

    // Colors for different times of the day
    let cBlue = color(165, 205, 225);
    let cYellow = color(225, 225, 175);
    let cAfternoon = color(235, 175, 130);
    let cEvening = color(150, 110, 150);
    let cNight = color(45, 60, 95);

    // Layer number decides the color: early layers are blue, later layers get darker
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

    // ===== AUDIO RELATIONSHIP LOUDER -> FLOATS FARTHER =====
    // sin() makes a smooth up-and-down wave. Adding "i" makes each layer move
    let waveY = sin(floatTime + i) * map(loud, 0, 1, 5, 30);

    // The paper is see-through. At night it is a bit more see-through.
    let alphaVal = 75;
    if (h >= 18) {
      alphaVal = 45;
    }

    // ===== AUDIO RELATIONSHIP LOUDER -> BIGGER PAPER =====
    // 1 means normal size. 1.4 means 40% bigger.
    let sizeScale = map(loud, 0, 1, 1, 1.4);

    fill(red(baseColor), green(baseColor), blue(baseColor), alphaVal);
    rect(shapeX[i], shapeY[i] + waveY, shapeCurrentW[i] * sizeScale, shapeCurrentH[i] * sizeScale, 2);
  }

  // ===== THE 1-SECOND SPARKLE =====
  // When the second changes, make one new sparkle at a random place.
  if (s !== lastSecond) {
    sparkleX = width / 2 + random(-180, 180);
    sparkleY = height / 2 + random(-130, 130);
    sparkleAlpha = 220;
    lastSecond = s;
  }

  // Draw it, then make it a little more transparent each frame (fade out)
  if (sparkleAlpha > 0) {
    fill(255, 240, 190, sparkleAlpha);
    rect(sparkleX, sparkleY, 12, 12, 2);
    sparkleAlpha = sparkleAlpha - 5;
  }

  // ===== AUDIO RELATIONSHIP LOUDER -> MORE SPARKLES =====
  // Silent: 0 sparkles. Very loud: 30 sparkles.
  let sparkleCount = floor(map(loud, 0, 1, 0, 30));

  // Draw only the first "sparkleCount" sparkles from the arrays
  for (let i = 0; i < sparkleCount; i++) {
    // sin() makes the brightness go up and down, so they twinkle
    let twinkle = map(sin(frameCount * 0.1 + i), -1, 1, 80, 220);
    fill(255, 240, 190, twinkle);
    rect(extraX[i], extraY[i], 8, 8, 2);
  }

  // ===== 4. CLOCK TEXT (bottom right) =====
  if (h >= 18 || h < 6) {
    fill(210, 180);
  } else {
    fill(100, 180);
  }

  textSize(14);
  textAlign(RIGHT, BOTTOM);

  // add a 0 in front of single-digit minutes (so 9:5 becomes 9:05)
  let displayM = m;
  if (m < 10) {
    displayM = "0" + m;
  }

  text(h + ":" + displayM, width - 30, height - 30);

  // A hint before the microphone is turned on
  if (!micOn) {
    textAlign(CENTER, CENTER);
    text("click to turn on the microphone", width / 2, height - 20);
  }
}