let handPose;
let video;
let hands = [];
let fog; // fog upfront layer

async function setup() {
  createCanvas(640, 480);

  // Load the handPose model asynchronously
  handPose = await ml5.handPose({ maxHands: 1, flipped: false });

  // Create the webcam video and hide it
  video = createCapture(VIDEO);
  video.size(640, 480);
  video.hide();

  // start detecting hands from the webcam video
  handPose.detectStart(video, gotHands);

  // 김 레이어 만들기 (뿌연 하늘색으로 가득 채우기)
  fog = createGraphics(640, 480);
  fog.noStroke();
  fog.fill(220, 230, 240, 235);
  fog.rect(0, 0, width, height);
}

function draw() {
  // move origin
  translate(width, 0);
  // then scale by -1 on the x-axis to flip everything horizontally
  scale(-1, 1);

  // draw the webcam video to canvas
  image(video, 0, 0, width, height);

  for (let i = 0; i < hands.length; i++) {
    let hand = hands[i];

    if (hand.confidence > 0.97) {
      let x = hand.index_finger_tip.x;
      let y = hand.index_finger_tip.y;

      // 김 레이어에서 검지 위치를 동그랗게 지우기
      fog.erase();
      fog.ellipse(x, y, 60);
      fog.noErase();
    }
  }

  // fog layer on top of the video
  image(fog, 0, 0);
}

// Callback function for when handPose outputs data
function gotHands(results) {
  // save the output to the hands variable
  hands = results;
}