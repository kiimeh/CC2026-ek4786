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

  // 1. 중심점 설정 (p5.polar 원점 설정)
  setCenter(width / 2, height / 2);

  // 2. 난수 및 마우스 인터랙션 설정
  let numEllipses = random(8, 12);       
  let distanceOffset = random(12, 20); 

  let alphaValue = map(mouseX, 0, width, 100, 255);
  let circleSizeBase = map(mouseY, 0, height, 20, 45);

  // ----------------------------------------------------
  // [1] 외곽 방패막: 한국 전통 기하학 다각 사각형 프레임
  // ----------------------------------------------------
  push();
  // 마우스 X축 움직임에 따라 방패막의 사각형 각도/개수 반응 (6~12개)
  let shieldCount = map(mouseX, 0, width, 6, 12);
  
  // 꽃 전체 외곽 범위를 계산해 시원하게 감싸는 크기 설정
  let maxFlowerRadius = circleSizeBase * 1 + (7 * distanceOffset);

  strokeWeight(2);
  stroke(210, 130, 10, alphaValue * 0.85); // 맑은 황금빛 단청 선
  fill(253, 200, 14, 20); // 은은한 노란빛 감돌기

  // 2중 레이어로 겹겹이 감싸는 사각형 방패막 배치
  polarSquares(shieldCount, maxFlowerRadius * 1.15, 0);
  polarSquares(shieldCount, maxFlowerRadius * 1.25, 0);
  pop();

  // ----------------------------------------------------
  // [2] 안쪽 중심: 원래 타원 꽃잎 문양
  // ----------------------------------------------------
  for (let j = 0; j < 8; j++) {
    strokeWeight(j + 1);

    // 검정 -> 황금색 그라데이션
    let r = map(j, 0, 7, 0, 240);
    let g = map(j, 0, 7, 0, 180);
    let b = map(j, 0, 7, 0, 20);

    stroke(r, g, b, alphaValue);

    // 가장 바깥 원(j >= 6)에만 노란색 투명 채우기
    if (j >= 6) {
      fill(253, 200, 14, 40); 
    } else {
      noFill();
    }

    let size = circleSizeBase + (j * 6);
    
    // 타원 꽃잎 배치
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