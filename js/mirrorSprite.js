var MirrorSprite = (function() {
  var numberOfFrames = 5,
    width = 76,
    height = 76,
    offset = 8, //distance between tile edge and mirror edge
    frames = [],
    fileName = "mirror",
    ready = false;

  function loadGfx() {
    for (var i = 0; i < numberOfFrames; i++) {
      var imageName = fileName + i + ".png";
      var image = new Image();
      image.number = i;
      image.onload = function () {
        frames[this.number] = this;
        if (this.number === numberOfFrames - 1) {
          ready = true;
        }
      };
      image.src = "img/" + imageName;
    }
  }

  function waitGfxReady(callback) {
    if (!ready) {
      setTimeout(waitGfxReady, 100, callback);
    }
    else {
      callback();
    }
  }

  function draw(ctx, frameNumber, x, y) {
    ctx.drawImage(frames[frameNumber], x, y);
  }

  return {
    width: width,
    height: height,
    offset: offset,
    numberOfFrames: numberOfFrames,
    loadGfx: loadGfx,
    waitGfxReady: waitGfxReady,
    draw: draw
  };
})();