//My First Drawing!

let thecircleSize = 20; //Global variable for circle size

function setup() {
  createCanvas(windowWidth, windowHeight); // Create a canvas that fills the window
}

function draw(){
  background (255, 200, 100); // Set background color to a light orange

  fill(30,200,150); // Set fill color to a bright green
  //Stroke(1.5); // Set stroke weight to 1.5

  //Add a circle that follows the mouse position
  circle(mouseX, mouseY, thecircleSize); // Draw a circle at the mouse position with the specified size

  //Increase the size of the circle over time
  thecircleSize = thecircleSize + 2; // Increase the circle size by 2 pixels each frame
  
  //Interaction: Reset the circle size when the mouse is pressed
  function mousePressed(){
    thecircleSize = 20; 
  }
}