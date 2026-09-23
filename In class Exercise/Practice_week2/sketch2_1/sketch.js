//Intro to Interactivity
//Incorporating transformations (scale...rotate...translate...etc.)
//Incorporate randomness

//When I press my mouse, something will happen

//First: let's generate a random number everytime I press my mouse

let r; // for storing my random number 
let r2; // for random rotation

function setup() {
  createCanvas(400, 400);
  r= random(100, 255);
  r2= random(360);
  console.log(r);

}

function draw() {
  background(r, 100,0);

  //combine rotate() with translate() and push() and pop()
  //push() and pop() isolates our transformations (rotate...translate...)
  push();
  translate(width/2, height/2); // shifts our origin (where things are drawn))
  rectMode(CENTER);
  rotate(r2); //0-360
  rect(0,0,r);
  pop();

  ellipse(100,200,150); 
}

function mousePressed(){
    r= random(100, 255);
    r2= random(360);
    fill(100,200,r);
}