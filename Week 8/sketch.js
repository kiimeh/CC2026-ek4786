// Array for storing our objects (Bonus goal: multiple instances managed in an array)
let shapes = [];

function setup() {
  createCanvas(600, 500);
}

function draw() {
  background(62, 180, 137);

  // Render and update our drawing using the method and a for loop (using shapes.length)
  for (let i = 0; i < shapes.length; i++) {
    shapes[i].display();
    shapes[i].update();
  }

  // Remove shapes when they go beyond the canvas (using splice)
  for (let i = shapes.length - 1; i >= 0; i--) {
    if (shapes[i].y > height + shapes[i].s) {
      shapes.splice(i, 1); // Array method: splice()
    }
  }

  // UI Instructions
  fill(50);
  noStroke();
  textSize(14);
  text("Mouse Click: Add shape (push)", 20, 30);
  text("Press Key: Remove first shape (splice)", 20, 55);
  text("Current Shape Count: " + shapes.length, 20, 80);
}

// 1. Mouse Interaction: Add new instance to the array using push()
function mousePressed() {
  let newCircle = new Circle(mouseX, mouseY, random(30, 70));
  shapes.push(newCircle);
}

// 2. Keyboard Interaction: Remove an item using splice() 
function keyPressed() {
  if (shapes.length > 0) {
    shapes.splice(0, 1); 
  }
}

// Custom Class (Template for objects) with constructor and methods
class Circle {
  constructor(x, y, s) {
    this.x = x;
    this.y = y;
    this.s = s; // size
    this.speed = random(1, 3); // random speed for falling
    this.col = color(random(50, 255), random(50, 255), random(50, 255), 200);
  }

  // Method 1: Display the shape
  display() {
    fill(this.col);
    stroke(50);
    ellipse(this.x, this.y, this.s);
  }

  // Method 2: Update position (falling animation)
  update() {
    this.y += this.speed;
  }
}