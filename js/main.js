var boardCanvas = document.getElementById("js-board-canvas"),
    boardCtx = boardCanvas.getContext("2d"),
    laserCanvas = document.getElementById("js-laser-canvas"),
    laserCtx = laserCanvas.getContext("2d");

window.onload = function () {
  MirrorSprite.loadGfx();
  MirrorSprite.waitGfxReady(function() {
    Board.init();
    Board.draw(boardCtx);    
  });

  laserCanvas.addEventListener("click", function (e) {
    if (Board.clicked(e)) {
      clearCanvas(laserCanvas);
      Board.draw(boardCtx);
    }
  });

  document.getElementById("js-info-ok-btn").addEventListener("click", function () {
    this.parentNode.style.display = "none";
  });

  document.getElementById("js-fire-btn").addEventListener("click", function () {
    clearCanvas(laserCanvas);
    LaserBeam.shoot(laserCtx);
  });

  document.getElementById("js-clear-btn").addEventListener("click", function () {
    clearCanvas(boardCanvas);
    clearCanvas(laserCanvas);
    Board.removeMirrors();
    Board.draw(boardCtx);
  });
};