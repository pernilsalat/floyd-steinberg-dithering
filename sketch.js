let img, factor, prevFactor;

function setup() {
  const canvas = createCanvas(710, 400);
  canvas.drop(gotFile);
  background(100);
  createP('set the factor');
  factor = createSlider(1, 5, 1);
  prevFactor = factor.value();
}

function draw() {
  if (!img) {
    fill(255);
    noStroke();
    textSize(24);
    textAlign(CENTER);
    text('Drag an image file onto the canvas.', width / 2, height / 2);
    text('press "s" to save', width / 2, height * 2 / 3);
    noLoop();
  } else if (factor.value() !== prevFactor) {
    prevFactor = factor.value();
    startProcessingImage(img);
  }
}

function keyPressed() {
  switch (key) {
    case 's':
      saveCanvas();
      break;
    default:
      break;
  }
}
