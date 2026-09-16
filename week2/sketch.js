// My Goals 
// Switch positions
// Change scale
// Change rotations 
// Change colors

let r1;

function setup() {
  createCanvas(500, 500);
  background(92,150,68);
  r1=random(50,300); //rotate
}

function draw() {

}

function mousePressed() {
  //setting up background random color
  let backgroundColor = [random(40,120), random(100,255), random(100,255)];
  background(backgroundColor); 

  //square -- random position, random rotation, random color
  push(); 
  translate(random(width), random(height));
  rectMode(CENTER);
  rotate(r1);
  fill(random(100,255), random(100,255), random(100,255));
  square(0,0,random(50,150));
  pop();

  //triangle -- keep it center, but change the rotation and color
  push();
  translate(width/2, height/2);
  rotate(random(360));
  fill(random(100,255), random(100,255), random(100,255));
  triangle(-50, 50, 0, -50, 50, 50);
  pop();

  //circle --keep the size big, but change the position and color 
  push();
  translate(random(100,400), random(50,500));
  fill(random(250,255), random(100,255), random(100,255));
  ellipse(0,0,random(200,400));
  pop();
}
