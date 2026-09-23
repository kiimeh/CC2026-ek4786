//My First Drawing!

function setup() {
  createCanvas(windowWidth, windowHeight);
    background("red");
}

function draw() {

  //Sizes of shapes
  let s1= 200; //yellow circle
  let s2= 200;  //white circle
  //Below is an array (list of values)
  let s3 = [300,100];
  console.log(s3);

  //Yellow circle
  fill(255,255,100);
  ellipse(200, 150, s1);

  //White circle
  fill(255,255,255);
  ellipse(350,350, s2);

  //Green rectangle
  rectMode(CENTER);
  fill(0,255,0);
  rect(250, 100, s3[0], s3[1]);

  //Adding Text 
  textSize(80);
  fill(0,0,255);
  textAlign(CENTER);
  //using system variables width and height
  //position of text is relative to canvas size (adaptable)
  let greeting = "Hello World";
  text(greeting, width/2, height/2);
}
