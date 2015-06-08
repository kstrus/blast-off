function prepareStage() {
	board.init();
	board.show();

	laserCanvas.addEventListener("click", function (e) {
		laser.clear();
		board.clicked(e);
	});

	document.getElementById("fire-btn").addEventListener("click", function () {
		laser.clear();
		laser.shoot();
	});

	document.getElementById("clear-btn").addEventListener("click", function () {
		board.removeMirrors();
		board.clear();
		laser.clear();
		board.show();
	});
}


function findExit(tile, enter) {
    if (tile == 0) {
        if (enter == 0) return 2;
        if (enter == 1) return 3;
        if (enter == 2) return 0;
        if (enter == 3) return 1;
    }
    if (tile == 1) {
        if (enter == 1) return 2;
        if (enter == 2) return 1;
    }
    if (tile == 2) {
        if (enter == 2) return 3;
        if (enter == 3) return 2;
    }
    if (tile == 3) {
        if (enter == 0) return 3;
        if (enter == 3) return 0;
    }
    if (tile == 4) {
        if (enter == 0) return 1;
        if (enter == 1) return 0;
    }
    return -1;
}

function getEnter(exit) {
    if (exit == 0) return 2;
    if (exit == 1) return 3;
    if (exit == 2) return 0;
    if (exit == 3) return 1;
}

function drawLine(x1, y1, x2, y2, color, width) {
	laserCtx.strokeStyle = color;
	laserCtx.lineWidth = width;	
	laserCtx.beginPath();
	laserCtx.moveTo(x1, y1);
	laserCtx.lineTo(x2, y2);
	laserCtx.stroke();
	laserCtx.closePath();
}

function drawHorizontalLine (x1, x2, y, color, width, frames) {
    var distance = x2 - x1;
    var oneFrameDistance = Math.floor(distance / frames);
    var position = x1;
    var stepNb = 0;

    while (position != x2 && stepNb<10000) {
        if (distance > 0 && position + oneFrameDistance > x2)
            oneFrameDistance = x2 - position;
        else if (distance < 0 && position + oneFrameDistance < x2)
            oneFrameDistance = x2 - position;
        setTimeout(drawLine, stepNb, position, y, position + oneFrameDistance, y, color, width);
        position += oneFrameDistance;
        stepNb++;
    }
}

function drawVerticalLine(x, y1, y2, color, width, frames) {
    var distance = y2 - y1;
    var oneFrameDistance = Math.floor(distance / frames);
    var position = y1;
    var stepNb = 0;

    while (position != y2 && stepNb < 10000) {
        if (distance > 0 && position + oneFrameDistance > y2)
            oneFrameDistance = y2 - position;
        else if (distance < 0 && position + oneFrameDistance < y2)
            oneFrameDistance = y2 - position;
        setTimeout(drawLine, stepNb, x, position, x, position + oneFrameDistance, color, width);
        position += oneFrameDistance;
        stepNb++;
    }
}