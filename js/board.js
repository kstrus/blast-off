var Board = (function() {
  var xSize = 5,
      ySize = 5,
      left = 82,
      top = 52,
      space = 4, //distance between tiles
      tiles = [],
      backgroundFileName = "background.png";

  function init() {
    for (var i = 0; i < ySize; i++) {
      tiles[i] = [];
      for (var j = 0; j < xSize; j++) {
        tiles[i][j] = 0;
      }
    }
  }

  function draw(ctx) {
    var backgroundImg = new Image();
    backgroundImg.onload = function () {
      //draw background
      ctx.drawImage(this, 0, 0);

      //draw laser gun
      LaserGun.draw(ctx);

      //draw tiles
      for (var i = 0; i < ySize; i++) {
        for (var j = 0; j < xSize; j++) {
          MirrorSprite.draw(ctx, tiles[i][j], left + j * (MirrorSprite.width + space), top + i * (MirrorSprite.height + space));
        }
      }
    };
    backgroundImg.src = "img/" + backgroundFileName;
  }

  function removeMirrors() {
    for (var i = 0; i < ySize; i++)
      for (var j = 0; j < xSize; j++) {
        tiles[i][j] = 0;
      }
  }

  function clicked(e) {
    var windowTop = (document.documentElement && document.documentElement.scrollTop) || document.body.scrollTop,
        windowLeft = (document.documentElement && document.documentElement.scrollLeft) || document.body.scrollLeft;

    var x = e.clientX + windowLeft - document.getElementById("js-canvas-container").offsetLeft - left,
        y = e.clientY + windowTop - 40 - top,
        row = -1,
        column = -1;

    for (var i = 0; i < xSize; i++) {
      if (x >= i * (MirrorSprite.width + space) && x <= (i + 1) * (MirrorSprite.width + space)) {
        column = i;
        break;
      }
    }

    for (var i = 0; i < ySize; i++) {
      if (y >= i * (MirrorSprite.height + space) && y <= (i + 1) * (MirrorSprite.height + space)) {
        row = i;
        break;
      }
    }

    if (row > -1 && column > -1) {
      tiles[row][column] = (tiles[row][column] + 1) % MirrorSprite.numberOfFrames;
      return true;
    }
    
    return false;
  }

  return {
    left: left,
    top: top,
    space: space,
    tiles: tiles,
    xSize: xSize,
    ySize: ySize,
    init: init,
    draw: draw,
    removeMirrors: removeMirrors,
    clicked: clicked
  };
})();