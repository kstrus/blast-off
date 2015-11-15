var board = {
	xSize: 5,
	ySize: 5,
	x: 82,
	y: 52,
	space: 4, //distance between tiles
	tiles: [],
	bcgFileName: "background.png",
	laserGunFileName: "gun.png"
}

board.init = function() {
	for (var i=0;i<this.ySize;i++) {
		this.tiles[i] = [];
		for (var j=0;j<this.xSize;j++) {
			this.tiles[i][j] = 0;
		}
	}
}

board.show = function () {
	var imgBackground = new Image();
	imgBackground.src = "img/" + this.bcgFileName;
	imgBackground.ctx = this;
	
	imgBackground.onload = function () {
		//paint background
		ctx.drawImage(this, 0, 0);

		var imgLaser = new Image();
		imgLaser.src = "img/" + this.ctx.laserGunFileName;
		imgLaser.ctx = this.ctx;
		imgLaser.onload = function () {
			//paint laser gun
			ctx.drawImage(this, Math.floor(this.ctx.x / 2) - Math.floor(this.width / 2), laser.row * (mirrorSprite.height + this.ctx.space) + Math.floor(mirrorSprite.height / 2) + this.ctx.y - Math.floor(this.height / 2));
		}
		
		for (var i = 0; i < this.ctx.ySize; i++) {
			for (var j = 0; j < this.ctx.xSize; j++) {
				mirrorSprite.paint(this.ctx.tiles[i][j], this.ctx.x + j * (mirrorSprite.width + this.ctx.space), this.ctx.y + i * (mirrorSprite.height + this.ctx.space));
			}
		}
	}
}

board.clear=function () {
	ctx.clearRect(0, 0, canvas.width, canvas.height);
}

board.removeMirrors = function () {
	for (var i = 0; i < this.ySize; i++)
		for (var j = 0; j < this.xSize; j++) {
			this.tiles[i][j] = 0;
		}
}

board.clicked = function (e) {
	var top = (document.documentElement && document.documentElement.scrollTop) || document.body.scrollTop;
	var left = (document.documentElement && document.documentElement.scrollLeft) || document.body.scrollLeft;

	var x = e.clientX + left - document.getElementById("js-canvas-container").offsetLeft - this.x;
	var y = e.clientY + top - 40 - this.y;
	var row = -1;
	var column = -1;

	for (var i = 0; i < this.xSize; i++) {
		if (x >= i * (mirrorSprite.width + this.space) && x <= (i + 1) * (mirrorSprite.width + this.space)) {
			column = i;
			break;
		}
	}

	for (var i = 0; i < this.ySize; i++) {
		if (y >= i * (mirrorSprite.height + this.space) && y <= (i + 1) * (mirrorSprite.height + this.space)) {
			row = i;
			break;
		}
	}

	if (row > -1 && column > -1) {
		if (this.tiles[row][column] < mirrorSprite.nbOfFrames - 1) {
			this.tiles[row][column]++;
		}
		else {
			this.tiles[row][column] = 0;
		}
		this.show();
	}
}