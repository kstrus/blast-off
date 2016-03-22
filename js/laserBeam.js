var LaserBeam = (function() {
	var beamColor = "#ffff00",
      beamWidth = 3,
      beamSpeed = 2;

	function shoot(ctx) {
		var startFrames = Math.floor(LaserGun.offset / beamSpeed), ///nb of frames for the first section - from laser gun to board edge
        halfTileFrames = Math.floor((MirrorSprite.height / 2) / beamSpeed), //nb of frames for half of the tile
        tileType = 0,
        enter = "left",
        exit,
        row = LaserGun.position,
        column = 0,
        frames = 0,
        distance = 0,
        counter = 0,
        x, x1, x2, y, y1, y2, timeout;

		x1 = Board.left - LaserGun.offset;
		x2 = x1 + LaserGun.offset;
		y = Board.top + (MirrorSprite.height + Board.space) * row + Math.floor(MirrorSprite.height / 2);
		drawHorizontalLine(ctx, x1, x2, y, beamColor, beamWidth, startFrames);

		do {
			tileType = Board.tiles[row][column];
			exit = findExit(tileType, enter);

			if (exit === -1) {
				frames = startFrames;
				distance = MirrorSprite.offset;
			}
			else {
				frames = halfTileFrames;
				if (enter === "left" || enter === "right") {
          distance = Math.floor(MirrorSprite.width / 2);
        }
				else if (enter === "top" || enter === "bottom") {
          distance = Math.floor(MirrorSprite.height / 2);
        }
			}

      timeout = startFrames + 2 * halfTileFrames * counter;

      if (enter === "left") {
				x1 = Board.left + column * (MirrorSprite.width + Board.space);
				x2 = x1 + distance;
				y = Board.top + row * (MirrorSprite.height + Board.space) + Math.floor(MirrorSprite.height / 2);
				setTimeout(drawHorizontalLine, timeout, ctx, x1, x2, y, beamColor, beamWidth, frames);
			}
			else if (enter === "top") {
				x = Board.left + column * (MirrorSprite.width + Board.space) + Math.floor(MirrorSprite.width / 2);
				y1 = Board.top + row * (MirrorSprite.height + Board.space);
				y2 = y1 + distance;
				setTimeout(drawVerticalLine, timeout, ctx, x, y1, y2, beamColor, beamWidth, frames);
			}
			else if (enter === "right") {
				x1 = Board.left + column * (MirrorSprite.width + Board.space) + MirrorSprite.width;
				x2 = x1 - distance;
				y = Board.top + row * (MirrorSprite.height + Board.space) + Math.floor(MirrorSprite.height / 2);
				setTimeout(drawHorizontalLine, timeout, ctx, x1, x2, y, beamColor, beamWidth, frames);
			}
			else if (enter === "bottom") {
				x = Board.left + column * (MirrorSprite.width + Board.space) + Math.floor(MirrorSprite.width / 2);
				y1 = Board.top + row * (MirrorSprite.height + Board.space) + MirrorSprite.height;
				y2 = y1 - distance;
				setTimeout(drawVerticalLine, timeout, ctx, x, y1, y2, beamColor, beamWidth, frames);
			}

			if (exit === "left" || exit === "right") {
        distance = Math.floor(MirrorSprite.width / 2);
      }
			else if (exit === "top" || exit === "bottom") {
        distance = Math.floor(MirrorSprite.height / 2);
      }
			distance += Board.space;

			frames = halfTileFrames;
      timeout = startFrames + 2 * frames * counter + frames;

			if (exit === "left") {
				x1 = Board.left + column * (MirrorSprite.width + Board.space) + Math.floor(MirrorSprite.width / 2);
				x2 = x1 - distance;
				y = Board.top + row * (MirrorSprite.height + Board.space) + Math.floor(MirrorSprite.height / 2);
				setTimeout(drawHorizontalLine, timeout, ctx, x1, x2, y, beamColor, beamWidth, frames);
			}
			else if (exit === "top") {
				x = Board.left + column * (MirrorSprite.width + Board.space) + Math.floor(MirrorSprite.width / 2);
				y1 = Board.top + row * (MirrorSprite.height + Board.space) + Math.floor(MirrorSprite.height / 2);
				y2 = y1 - distance;
				setTimeout(drawVerticalLine, timeout, ctx, x, y1, y2, beamColor, beamWidth, frames);
			}
			else if (exit === "right") {
				x1 = Board.left + column * (MirrorSprite.width + Board.space) + Math.floor(MirrorSprite.width / 2);
				x2 = x1 + distance;
				y = Board.top + row * (MirrorSprite.height + Board.space) + Math.floor(MirrorSprite.height / 2);
				setTimeout(drawHorizontalLine, timeout, ctx, x1, x2, y, beamColor, beamWidth, frames);
			}
			else if (exit === "bottom") {
				x = Board.left + column * (MirrorSprite.width + Board.space) + Math.floor(MirrorSprite.width / 2);
				y1 = Board.top + row * (MirrorSprite.height + Board.space) + Math.floor(MirrorSprite.height / 2);
				y2 = y1 + distance;
				setTimeout(drawVerticalLine, timeout, ctx, x, y1, y2, beamColor, beamWidth, frames);
			}

			if (exit === "left") {
				column--;
			}
			else if (exit === "top") {
				row--;
			}
			else if (exit === "right") {
				column++;
			}
			else if (exit === "bottom") {
				row++;
			}
			enter = getEnter(exit);

			if (column === -1 || column >= Board.xSize || row === -1 || row >= Board.ySize) {
				return 0;
			}

			counter++;
		}
		while (exit != -1);

		return 0;
	}

	return {
		shoot: shoot
	}
})();
