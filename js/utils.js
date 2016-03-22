function clearCanvas(canvas) {
  canvas.getContext("2d").clearRect(0, 0, canvas.width, canvas.height);
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

function drawLine(ctx, startX, startY, finishX, finishY, color, width) {
  ctx.strokeStyle = color;
  ctx.lineWidth = width;
  ctx.beginPath();
  ctx.moveTo(startX, startY);
  ctx.lineTo(finishX, finishY);
  ctx.stroke();
  ctx.closePath();
}

function drawHorizontalLine (ctx, startX, finishX, y, color, width, frames) {
  var distance = finishX - startX,
      oneFrameDistance = Math.floor(distance / frames),
      position = startX,
      stepNumber = 0;

  while (position != finishX && stepNumber < 10000) {
    if (distance > 0 && position + oneFrameDistance > finishX) {
      oneFrameDistance = finishX - position;
    }
    else if (distance < 0 && position + oneFrameDistance < finishX) {
      oneFrameDistance = finishX - position;
    }
    setTimeout(drawLine, stepNumber, ctx, position, y, position + oneFrameDistance, y, color, width);
    position += oneFrameDistance;
    stepNumber++;
  }
}

function drawVerticalLine(ctx, x, startY, finishY, color, width, frames) {
  var distance = finishY - startY;
  var oneFrameDistance = Math.floor(distance / frames);
  var position = startY;
  var stepNumber = 0;

  while (position != finishY && stepNumber < 10000) {
    if (distance > 0 && position + oneFrameDistance > finishY) {
      oneFrameDistance = finishY - position;
    }
    else if (distance < 0 && position + oneFrameDistance < finishY) {
      oneFrameDistance = finishY - position;
    }
    setTimeout(drawLine, stepNumber, ctx, x, position, x, position + oneFrameDistance, color, width);
    position += oneFrameDistance;
    stepNumber++;
  }
}