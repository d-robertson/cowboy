var COWS = [];
var COW_CENTER_X = -400;
var COW_CENTER_Y = 100;
var COW_RADIUS = 180;

function birth_cows(ctx, a) {
  var total = 23;

  var x = -3;
  var y = 20 + 50;
  var cow = birth_cow(ctx, a, x, y);
  COWS.push(cow);

  for (var i = 0; i < total; i++) {
    var x = COW_CENTER_X + Math.random() * COW_RADIUS;
    var y = COW_CENTER_Y + Math.random() * COW_RADIUS;
    cow = birth_cow(ctx, a, x, y);
    COWS.push(cow);
  }
}

function place_fence() {
  var leftmost = COW_CENTER_X - 75 + 10;
  var topmost = COW_CENTER_Y - 50;
  // top line
  for (var i = 0; i < 20; i++) {
    DRAWABLES.push({
      image: function () {
        return IMAGES["fence_north"];
      },
      x: leftmost + 24 * i,
      y: topmost,
      isStatic: true,
      label: function() { return "fence"; },
      draw: function (ctx) {
        ctx.drawImage(this.image(), this.x, this.y);
      }
    });
  }

  // west side
  for (var i = 0; i < 13; i++) {
    DRAWABLES.push({
      image: function () {
        return IMAGES["fence_west"];
      },
      x: leftmost - 8,
      y: 6 + topmost + 24 * i,
      isStatic: true,
      label: function() { return "fence"; },
      draw: function (ctx) {
        ctx.drawImage(this.image(), this.x, this.y);
      }
    });
  }

  // west side
  for (var i = 0; i < 13; i++) {
    DRAWABLES.push({
      image: function () {
        return IMAGES["fence_east"];
      },
      x: leftmost + 480,
      y: 6 + topmost + 24 * i,
      isStatic: true,
      label: function() { return "fence"; },
      draw: function (ctx) {
        ctx.drawImage(this.image(), this.x, this.y);
      }
    });
  }

  // bottom line
  for (var i = 0; i < 20; i++) {
    DRAWABLES.push({
      image: function () {
        return IMAGES["fence_south"];
      },
      x: leftmost + 24 * i,
      y: topmost + 312,
      isStatic: true,
      label: function() { return "fence"; },
      draw: function (ctx) {
        ctx.drawImage(this.image(), this.x, this.y);
      }
    });
  }

}

function birth_cow(ctx, a, x, y) {
  var cow;
  cow = {
    image: function () {
      if (this.alive) {
        return IMAGES[["cow_north", "cow_east", "cow_south", "cow_west_branded"][this.direction]];
      } else {
        return IMAGES["dead_cow"];
      }
    },
    x: x,
    y: y,
    way_x: undefined,
    way_y: undefined,
    actions: [],
    label: function() { return "cow"; },
    step: function() {
      var step = .6;
      return step;
    },
    stop: function () {
      if (cow.actions) {
        clear_intervals(cow.actions);
      }
      cow.actions = [];
      cow.way_x = undefined;
      cow.way_y = undefined;

      if (!cow.alive) {
        return;
      }

      var delay = Math.random() * 10;
      var move = Math.random() * 10;
      if (move < 6) {
        // don't always pick a destination
        setTimeout(cow.stop, delay * 1000);
      } else {
        var x, y;
        if (Math.random() > .5) {
          x = cow.x + Math.random() * 100;
        } else {
          x = cow.x - Math.random() * 100;
        }

        if (Math.random() > .5) {
          y = cow.y + Math.random() * 100;
        } else {
          y = cow.y - Math.random() * 100;
        }

        set_waypoint(cow, x, y);
      }
    },
    draw: function (ctx) {
      if (!this.alive) {
        ctx.drawImage(this.image(),
            this.frame_width * this.frame, 0, this.frame_width, this.frame_height,
            this.x - Math.floor(this.frame_width / 2),
            this.y - Math.floor(this.frame_height / 2),
            this.frame_width, this.frame_height);
      } else {
        draw_actor(ctx, this);
      }
    },
    alive: true,
    direction: EAST,
    // death animation
    frame_width: 17,
    frame_height: 12,
    frames: 7,
    frame: 0,
    delay: 2000,
    kill: function() {
      if (this.alive) {
        this.alive = false;
        this.decay(this);
      }
    },
    decay: function (actor) {
      actor.frame++;
      if (actor.frame < actor.frames) {
        setTimeout(function() {
          actor.decay(actor);
        }, actor.delay);
      }
    }
  }
  cow.stop();
  a.push(cow);

  return cow;
}

