// p5.plotSvg + p5.Polar Template

p5.disableFriendlyErrors = true; 
let bDoExportSvg = false; 
// if using randomness, experiment w/ myRandomSeed to see different versions (or iterations) of your sketch
let myRandomSeed = 12345; 
let regenerateButton, exportSvgButton; 

// canvas size
const DPI = 70; // dots per inch
const PAGE_W = 8.5*DPI; 
const PAGE_H = 11*DPI;

//------------------------------------------------------------
function setup() {
  createCanvas(PAGE_W, PAGE_H);
  UI();
  noFill();
  // Set the SVG group by stroke color to `true`, so that strokes 
  // of the same color are grouped together in the SVG file. 
  setSvgGroupByStrokeColor(true); 
}

function draw(){
  clear();
  randomSeed(myRandomSeed); 
  background(255); 
  
  if (bDoExportSvg == true){
    beginRecordSvg(this, "myOutput_" + month() + day() + year() + "_" + myRandomSeed + ".svg");
  }

  // define your drawing below
  myDrawing(); 

  if (bDoExportSvg){
    endRecordSvg(); 
    bDoExportSvg = false;
  }
}

function myDrawing() {
  push();

  // 1.make it center-polar library
  setCenter(width/2, height/2);

  // 2. button clicks random
  let numEllipses = random(8, 12);       
  let distanceOffset = random(12, 20); 

  // 3. mouse movement
  let alphaValue = map(mouseX, 0, width, 100, 255);
  let circleSizeBase = map(mouseY, 0, height, 20, 45);

  for (let j = 0; j < 8; j++) {
    strokeWeight(j + 1);

    // black to yellow
    let r = map(j, 0, 7, 0, 240);
    let g = map(j, 0, 7, 0, 180);
    let b = map(j, 0, 7, 0, 20);

    stroke(r, g, b, alphaValue);

    // if j is greater than 6 (outer circle), then fill with yellow 
    if (j >= 6) {
      fill(253, 200, 14, 40); 
    } else {
      noFill();
    }

    // size in general
    let size = circleSizeBase + (j * 6);

    // make the width smaller (size * 0.5), height tall (size * 1.4) to look something like a flower
    polarEllipses(numEllipses, size * 1, size * 2, j * distanceOffset);
  }

  pop();
}
// Tip: When plotting, strokeWeight() doesn't affect your drawing. 
// To change the thickness of your drawing, change your pen/marker/etc
// - or experiment with code (use a for loop to create an 'outline')

//-----------------------------------------------------------------------------------------------------------------------
//-----------------------------------------------------------------------------------------------------------------------

// Make a new random seed when the "Regenerate" button is pressed
function regenerate(){
  myRandomSeed = round(millis()); 
}

// Set the SVG to be exported when the "Export SVG" button is pressed
function initiateSvgExport(){
  bDoExportSvg = true; 
}

function UI() {
  regenerateButton = createButton('Regenerate');
  regenerateButton.position(0, height);
  regenerateButton.mousePressed(regenerate);

  exportSvgButton = createButton('Export SVG');
  exportSvgButton.position(120, height);
  exportSvgButton.mousePressed(initiateSvgExport); // 원래대로 mousePressed로 원복
}

function keyPressed() {
  // 's' 키나 'S' 키를 누르면 SVG 내보내기 실행
  if (key === 's' || key === 'S') {
    initiateSvgExport();
  }
}

/*
This template uses the following sketch as a starting point: 
https://editor.p5js.org/golan/sketches/LRTXmDg2q

Additional references/info:
https://github.com/golanlevin/p5.plotSvg
https://github.com/liz-peng/p5.Polar
https://github.com/golanlevin/p5.plotSvg/blob/main/documentation.md#beginrecordsvg
https://github.com/golanlevin/p5.plotSvg/blob/main/documentation.md#endrecordsvg

*/