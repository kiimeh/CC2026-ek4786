// p5Polar Template
// https://github.com/liz-peng/p5.Polar
// https://liz-peng.github.io/p5.Polar/
// Review the index.html for the <script></script> 

function setup() {
  createCanvas(500, 500);
}

function draw() {
  background(253, 174, 14);
  
  push();
  translate(width / 2, height / 2);

  for (let j = 0; j < 8; j++) {
    strokeWeight(j + 1);
    
    let quickG = j * j;
    let alpha = map(quickG, 0, 50, 0, 255);
    fill(0, alpha);
    
    let size = 15 + (j * 4);
    
    // Using the library 
    polarEllipses(6, size, size, j * 25);
  }
  pop();
}