function prepareStage() {
	Board.init();
	Board.draw();

	laserCanvas.addEventListener("click", function (e) {
		LaserBeam.clear();
		Board.clicked(e);
	});

	document.getElementById("js-fire-btn").addEventListener("click", function () {
		LaserBeam.clear();
		LaserBeam.shoot();
	});

	document.getElementById("js-clear-btn").addEventListener("click", function () {
		Board.removeMirrors();
		Board.clear();
		LaserBeam.clear();
		Board.draw();
	});
}


function findExit(tile, enter) {
    if (tile === 0) {
        if (enter === "left") return "right";
        if (enter === "right") return "left";
        if (enter === "top") return "bottom";
        if (enter === "bottom") return "top";
    }
    if (tile === 1) {
        if (enter === "top") return "right";
        if (enter === "right") return "top";
    }
    if (tile === 2) {
        if (enter === "bottom") return "right";
        if (enter === "right") return "bottom";
    }
    if (tile === 3) {
        if (enter === "bottom") return "left";
        if (enter === "left") return "bottom";
    }
    if (tile === 4) {
        if (enter === "top") return "left";
        if (enter === "left") return "top";
    }
    return -1;
}

function getEnter(exit) {
    if (exit === "top") return "bottom";
    if (exit === "bottom") return "top";
    if (exit === "left") return "right";
    if (exit === "right") return "left";
}

function drawLine(startX, startY, finishX, finishY, color, width) {
	laserCtx.strokeStyle = color;
	laserCtx.lineWidth = width;	
	laserCtx.beginPath();
	laserCtx.moveTo(startX, startY);
	laserCtx.lineTo(finishX, finishY);
	laserCtx.stroke();
	laserCtx.closePath();
}

function drawHorizontalLine (startX, finishX, y, color, width, frames) {
    var distance = finishX - startX;
    var oneFrameDistance = Math.floor(distance / frames);
    var position = startX;
    var stepNb = 0;

    while (position != finishX && stepNb<10000) {
        if (distance > 0 && position + oneFrameDistance > finishX)
            oneFrameDistance = finishX - position;
        else if (distance < 0 && position + oneFrameDistance < finishX)
            oneFrameDistance = finishX - position;
        setTimeout(drawLine, stepNb, position, y, position + oneFrameDistance, y, color, width);
        position += oneFrameDistance;
        stepNb++;
    }
}

function drawVerticalLine(x, startY, finishY, color, width, frames) {
    var distance = finishY - startY;
    var oneFrameDistance = Math.floor(distance / frames);
    var position = startY;
    var stepNb = 0;

    while (position != finishY && stepNb < 10000) {
        if (distance > 0 && position + oneFrameDistance > finishY)
            oneFrameDistance = finishY - position;
        else if (distance < 0 && position + oneFrameDistance < finishY)
            oneFrameDistance = finishY - position;
        setTimeout(drawLine, stepNb, x, position, x, position + oneFrameDistance, color, width);
        position += oneFrameDistance;
        stepNb++;
    }
}