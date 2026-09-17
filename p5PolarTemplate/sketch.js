// p5Polar Template
// https://github.com/liz-peng/p5.Polar
// https://liz-peng.github.io/p5.Polar/
// Review the index.html for the <script></script> 

function setup() {
  createCanvas(500, 500);
}

function draw() {
  background(255,0,0);
  text("p5.Polar Template", 100, height/2);
  // Insert your drawing here

  setCenter(width/2, height/2);
  //polarLine (130, 90,0);
  strokeWeight(5);

  for (i=0; i<4, i++;) {
    stroke(55+(i*70));
    polarLine(130*i, 90, 0);
  }
}
