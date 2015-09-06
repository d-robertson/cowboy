function vectorDistance(v1, v2) {
  return Math.sqrt(Math.pow(v1.x - v2.x, 2) + Math.pow(v1.y - v2.y, 2));
}

function vectorLength(vector) {
  var length = vectorDistance(vector, {x: 0, y: 0});
  return length;

}

function capVector(vector, length) {
  if (vectorLength(vector) > length) {
    var unit = unitVectorFromVector(vector);
    var capped = scaleVector(unit, length);
    return capped;
  }
  return vector;
}

function randomUnitVector() {
  var vector = {
    x: Math.random() - .5,
    y: Math.random() - .5,
  }

  vector = unitVectorFromVector(vector);
  return vector;
}

function distance(x1, y1, x2, y2) {
  return Math.sqrt(Math.pow(x1 - x2, 2) + Math.pow(y1 - y2, 2));
}

function actor_distance(a1, a2) {
  return distance(a1.x, a1.y, a2.x, a2.y);
}

function angleToDirection(angle) {
  var direction;

  if (-Math.PI / 4 < angle && angle < Math.PI / 4) {
    direction = 1;
  } else if (Math.PI / 4 < angle && angle < 3 * Math.PI / 4) {
    direction = 2;
  } else if (3 * Math.PI / 4 < angle) {
    direction = 3;
  } else if (angle < - 3 * Math.PI / 4) {
    direction = 3;
  } else {
    direction = 0;
  }

  return direction;
}

function unitVectorFromVector(vector) {
  return unitVector(vector.x, vector.y);
}

function unitVector(x, y) {
  var angle = angleFromOrigin(x, y);

  var vx = Math.cos(angle);
  var vy = Math.sin(angle);

  var vector = {
    x: vx,
    y: vy
  }

  return vector;
}

function scaleVector(vector, scale) {
  var result = {
    x: vector.x * scale,
    y: vector.y * scale,
  };
  return result;
}

function vectorAdd(v1, v2) {
  var result = {
    x: v1.x + v2.x,
    y: v1.y + v2.y,
  }
  return result;
}

function angleFromOrigin(x, y) {
  return angle(0, 0, x, y);
}

function angle(x0, y0, x1, y1) {
  var angle = Math.atan2(y1 - y0, x1 - x0);
  if (angle < 0) {
    angle = 2 * Math.PI + angle;
  }
  return angle;
}

function gameXToScreenX(x) {
  x = x + TRANSLATE_X;
  return x;
}

function gameYToScreenY(y) {
  y = y + TRANSLATE_Y;
  return y;
}

function screenXToGameX(x) {
  x = x - TRANSLATE_X;
  x = x / SCALE;
  return x;
}

function screenYToGameY(y) {
  y = y - TRANSLATE_Y;
  y = y / SCALE;
  return y;
}

function absScale(n) {
  return SCALE * n;
}

function randomNegPos(weight) {
  weight = weight || 1;
  // positive or negative?
  var result;
  if (Math.random() < .5) {
    result = Math.random();
  } else {
    result = -Math.random();
  }

  return weight * result;
}
