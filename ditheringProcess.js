function closest(value) {
  return round(factor.value() * value / 255) * floor((255 / factor.value()));
}

function startProcessingImage(img) {
  const newImg = img.get();
  for (let y = 0; y < height; y++) {
    for (let x = 0; x < width; x++) {
      let [oldR, oldG, oldB] = newImg.get(x, y);
      const newR = closest(oldR);
      const newG = closest(oldG);
      const newB = closest(oldB);
      newImg.set(x, y, color(newR, newG, newB));

      const errorR = oldR - newR;
      const errorG = oldG - newG;
      const errorB = oldB - newB;
      distributeError(newImg, x, y, errorR, errorG, errorB);
    }
  }
  newImg.updatePixels();
  background(0);
  image(newImg, 0, 0);
}

function distributeError(newImg, x, y, errorR, errorG, errorB) {
  addError(newImg, 7 / 16, x + 1, y, errorR, errorG, errorB);
  addError(newImg, 3 / 16, x - 1, y + 1, errorR, errorG, errorB);
  addError(newImg, 5 / 16, x, y + 1, errorR, errorG, errorB);
  addError(newImg, 1 / 16, x + 1, y + 1, errorR, errorG, errorB);
}

function addError(newImg, constant, x, y, errorR, errorG, errorB) {
  if (x < 0 || x >= newImg.width || y < 0 || y >= newImg.height) return;

  const [r, g, b, a] = newImg.get(x, y);
  const col = color(0, 0, 0, a);
  col.setRed(round(r + errorR * constant));
  col.setGreen(round(g + errorG * constant));
  col.setBlue(round(b + errorB * constant));

  newImg.set(x, y, col);
}
