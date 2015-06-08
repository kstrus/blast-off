var laser = {
	color: "#ffff00",
	rayWidth: 3,
	offset: 10, //distance from gun to board edge
	row: 2,
	speed: 2
}

laser.clear = function () {
	laserCtx.clearRect(0, 0, laserCanvas.width, laserCanvas.height);
}

laser.shoot = function () {
	var offsetFrames = this.speed;
	var startFrames = Math.floor(this.offset / offsetFrames); ///nb of frames for the first section - from laser to board edge
	var halfTileFrames = Math.floor((mirrorSprite.height / 2) / offsetFrames); //nb of frames for half of the tile

	var tileType = 0;
	var enter = 0;
	var exit = 0;
	var r = this.row;
	var c = 0;
	var frames = 0;
	var x = 0;
	var y = 0;
	var distance = 0;
	var counter = 0;

	x = board.x - this.offset;
	y = board.y + (mirrorSprite.height + board.space) * this.row + Math.floor(mirrorSprite.height / 2);
	drawHorizontalLine(x, x + this.offset, y, this.color, this.rayWidth, startFrames);

	do {
		tileType = board.tiles[r][c];
		exit = findExit(tileType, enter);

		if (exit == -1) {
			frames = offsetFrames;
			distance = mirrorSprite.offset;
		}
		else {
			frames = halfTileFrames;
			if (enter == 0 || enter == 2)
				distance = Math.floor(mirrorSprite.width / 2);
			if (enter == 1 || enter == 3)
				distance = Math.floor(mirrorSprite.height / 2);
		}

		if (enter == 0) {
			x1 = board.x + c * (mirrorSprite.width + board.space);
			x2 = x1 + distance;
			y = board.y + r * (mirrorSprite.height + board.space) + Math.floor(mirrorSprite.height / 2);
			setTimeout(drawHorizontalLine, startFrames + 2 * halfTileFrames * counter, x1, x2, y, this.color, this.rayWidth, frames);
		}
		else if (enter == 1) {
			x = board.x + c * (mirrorSprite.width + board.space) + Math.floor(mirrorSprite.width / 2);
			y1 = board.y + r * (mirrorSprite.height + board.space);
			y2 = y1 + distance;
			setTimeout(drawVerticalLine, startFrames + 2 * halfTileFrames * counter, x, y1, y2, this.color, this.rayWidth, frames);
		}
		else if (enter == 2) {
			x1 = board.x + c * (mirrorSprite.width + board.space) + mirrorSprite.width;
			x2 = x1 - distance;
			y = board.y + r * (mirrorSprite.height + board.space) + Math.floor(mirrorSprite.height / 2);
			setTimeout(drawHorizontalLine, startFrames + 2 * halfTileFrames * counter, x1, x2, y, this.color, this.rayWidth, frames);
		}
		else if (enter == 3) {
			x = board.x + c * (mirrorSprite.width + board.space) + Math.floor(mirrorSprite.width / 2);
			y1 = board.y + r * (mirrorSprite.height + board.space) + mirrorSprite.height;
			y2 = y1 - distance;
			setTimeout(drawVerticalLine, startFrames + 2 * halfTileFrames * counter, x, y1, y2, this.color, this.rayWidth, frames);
		}

		if (exit == 0 || exit == 2)
			distance = Math.floor(mirrorSprite.width / 2);
		if (exit == 1 || exit == 3)
			distance = Math.floor(mirrorSprite.height / 2);
		distance += board.space;

		frames = halfTileFrames;

		if (exit == 0) {
			x1 = board.x + c * (mirrorSprite.width + board.space) + Math.floor(mirrorSprite.width / 2);
			x2 = x1 - distance;
			y = board.y + r * (mirrorSprite.height + board.space) + Math.floor(mirrorSprite.height / 2);
			setTimeout(drawHorizontalLine, startFrames + 2 * frames * counter + frames, x1, x2, y, this.color, this.rayWidth, frames);
		}
		else if (exit == 1) {
			x = board.x + c * (mirrorSprite.width + board.space) + Math.floor(mirrorSprite.width / 2);
			y1 = board.y + r * (mirrorSprite.height + board.space) + Math.floor(mirrorSprite.height / 2);
			y2 = y1 - distance;
			setTimeout(drawVerticalLine, startFrames + 2 * frames * counter + frames, x, y1, y2, this.color, this.rayWidth, frames);
		}
		else if (exit == 2) {
			x1 = board.x + c * (mirrorSprite.width + board.space) + Math.floor(mirrorSprite.width / 2);
			x2 = x1 + distance;
			y = board.y + r * (mirrorSprite.height + board.space) + Math.floor(mirrorSprite.height / 2);
			setTimeout(drawHorizontalLine, startFrames + 2 * frames * counter + frames, x1, x2, y, this.color, this.rayWidth, frames);
		}
		else if (exit == 3) {
			x = board.x + c * (mirrorSprite.width + board.space) + Math.floor(mirrorSprite.width / 2);
			y1 = board.y + r * (mirrorSprite.height + board.space) + Math.floor(mirrorSprite.height / 2);
			y2 = y1 + distance;
			setTimeout(drawVerticalLine, startFrames + 2 * frames * counter + frames, x, y1, y2, this.color, this.rayWidth, frames);
		}

		if (exit == 0) c--;
		if (exit == 1) r--;
		if (exit == 2) c++;
		if (exit == 3) r++;
		enter = getEnter(exit);

		if (c == -1 || c >= board.xSize || r == -1 || r >= board.ySize) {
			return 0;
		}

		counter++;
	}
	while (exit != -1);

	return 0;
}