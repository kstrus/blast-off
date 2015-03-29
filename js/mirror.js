var mirrorSprite = {
	nbOfFrames: 5,
	width: 76,
	height: 76,
	offset: 8, //distance between tile edge and mirror edge
	frames: [],
	ready: false,
	fileName: "mirror"
}

mirrorSprite.loadGfx = function () {
	for (var i = 0; i < this.nbOfFrames; i++) {
		var imageName = this.fileName + i + ".png";
		var img = new Image();
		img.nb = i;
		img.ctx = this;
		img.onload = function () {
			img.ctx.frames[this.nb] = this;
			if (this.nb == img.ctx.nbOfFrames - 1) {
				img.ctx.ready = true;
			}
		}
		img.src = "img/" + imageName;
	}
}

mirrorSprite.waitGfxReady = function () {
	if (this.ready == false) {
		setTimeout(this.waitGfxReady, 100);
	}
	else {
		prepareStage();
	}
}

mirrorSprite.paint = function (frame, x, y) {
	ctx.drawImage(this.frames[frame], x, y);
}