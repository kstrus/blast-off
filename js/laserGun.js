var LaserGun = (function() {
  var fileName = "gun.png",
      position = 2,
      offset = 10;  //distance between gun and board edge

  function draw(ctx) {
    var image = new Image();
    image.onload = function () {
      ctx.drawImage(this, Math.floor(Board.left / 2) - Math.floor(this.width / 2), position * (MirrorSprite.height + Board.space) + Math.floor(MirrorSprite.height / 2) + Board.top - Math.floor(this.height / 2));
    };
    image.src = "img/" + fileName;
  }

  return {
    position: position,
    offset: offset,
    draw: draw
  }
})();
