// Review and Extend 
// Intro to iterating

function setup() {
  createCanvas(500, 500);
}

function draw() {
  background(255,0,0);

  //drawing01();
  //drawing02();
  //drawing03();
  //drawing04();
  drawing05(); 

  noLoop();

}


//My first for loop
function drawing01(){

  // draw a row of circles 
  // ellipse(100, height/2, 50); 
  // ellipse(150, height/2, 50);
  // ellipse(200, height/2, 50);
  // ellipse(250, height/2, 50);
  // ellipse(300, height/2, 50);

  //for loop - a piece of code that repeats until a condition is met. 

  // for( i = 0; i < 5; i++){
  //   console.log(i);
  //   ellipse(100 + (i*50), height/2, 100);
  // }

  // for (i=0; i<=5; i+=2){
  //   console.log(i);
  // }

  // for (i=10; i>0; i--){
  //   console.log(i); 
  // }

  const startingX = 100; 
  const s = 50; // size and space
  const space = 80; // space in between shapes

  for (i=0; i<5; i++){
    ellipse(startingX + (i*space), height/2, s);
  }
}

//My first nested for loop
function drawing02(){

  const startingX = 100; 
  const startingY = 100;
  const s = 50; // size
  const space = 80; // space in between shapes

  for (i=0; i<5; i++){
    for (j=0; j<5; j++){
      ellipse(startingX + (i*space), startingY + (j*space), s);
    }
  }

}

//Using conditionals to change color
function drawing03(){

  const startingX = 100; 
  const startingY = 100;
  const s = 50; // size
  const space = 80; // space in between shapes

  for (i=0; i<5; i++){
    for (j=0; j<5; j++){
      if (i<3 || j < 3){
        fill(255,255,0); //yellow
      } else{
        fill(255,255,255); //white
      }
      ellipse(startingX + (i * space), startingY + (j * space), s);
    }
  }

}


//% modulo (comparison operator)
// modulo outputs the difference between two numbers 

function drawing04(){

  const startingX = 100; 
  const startingY = 100;
  const s = 50; // size
  const space = 80; // space in between shapes

  for (i=0; i<5; i++){
    for (j=0; j<5; j++){
      if(
        i*2 == 0 || j%2 == 0) {
        fill(255,255,0); //yellow

      }else{
        fill(255);//yellow
      }
      ellipse(startingX + (i * space), startingY + (j * space), s);
    }
  }

}

//Starting to iterate
function drawing05(){

  noFill();
  //stroke(255); //white
  strokeWeight(5);

  const startingX = 100; 
  const startingY = 100;
  const s = 50; // size
  const space = 80; // space in between shapes

  for (i=0; i<5; i++){
    for (j=0; j<5; j++){
      stroke(255,(j+1)*80,255,(i+1)*80);
      //ellipse(startingX + (i*space), startingY + (j*space), s / (i+1));

      //try experimenting with transformations for more changes
      push();
      scale(j/4);
      ellipse(startingX + (i*space), startingY + (j*space), s);
      pop();
    }
  }

}