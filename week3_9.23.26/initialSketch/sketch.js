// p5Polar Template
// https://github.com/liz-peng/p5.Polar
// https://liz-peng.github.io/p5.Polar/
// Review the index.html for the <script></script> 

function setup() {
  createCanvas(500, 500);
  ellipseMode(CORNER);
}

function draw() {
  background(253, 174, 14);
  
  for (let i=0; i<11; i++){
    for (let j=0; j<11; j++){

      strokeWeight(j+1); //stroke weight

      let quickG = j * j; // gradiation from blank to fill at the bottom
      let alpha = map(quickG, 0, 100, 0, 255);
      fill (0, alpha);
      //let gradiation = map(quickG, 0, 100, 255, 0); //do i want the filled color? 
      //fill(gradiation);

      let goBig = 15 + (j*5); //want the bottom circles to get larger
      let size = 15; // size of shape
      let space = size * 3; 
      let startingX = 5; 
      let startingY= 5; 

      ellipse(startingX+(i*space), startingY+(j * space), goBig);
    }
  }
}