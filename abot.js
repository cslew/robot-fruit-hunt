//declare new variables
var NORTH_WEST = 111;
var NORTH_EAST = 222;
var SOUTH_WEST = 333;
var SOUTH_EAST = 444;

//check if grid is beyond boundaries of the board
function is_at_edge(pos) {
  var board = get_board();

  if (pos.x > (board.length-1) || pos.x < 0 ||
    pos.y > (board[0].length-1) || pos.y < 0) {
    return true;
  }
  return false;
};

//return the fruit type has the highest number
function count_of_each_type() {
  var no_of_types = get_number_of_item_types();
  var fruit_type_with_max_count = -1;
  var curr_type_max_count = -1;

  for(var i=1; i<=no_of_types; i++) {
    var type_count = get_total_item_count(i);

    if (type_count > curr_type_max_count) {
      fruit_type_with_max_count = i;
      curr_type_max_count = type_count;
    }
  }

  return fruit_type_to_collect;
};

//return grids by radius
function get_grids_by_radius(x, y, rad) {
  var top_left = {x: x-rad, y: y-rad}; //top left
  var sq_len = 3 + (2*(rad-1));
  var grids = [];

  //top
  for (var i=1; i<=sq_len; i++) {
    grids.push({x: (x-rad)+(i-1), y: y-rad});
  }

  //bottom
  for (var i=1; i<=sq_len; i++) {
    grids.push({x: (x-rad)+(i-1), y: y+1});
  }

  //left
  for (var i=2; i<=sq_len-1; i++) {
    grids.push({x: x-rad, y: y-rad+(i-1)});
  }

  //right
  for (var i=2; i<=sq_len-1; i++) {
    grids.push({x: x+rad, y: y-rad+(i-1)});
  }

  return grids;
};

function direction_to_target(x, y, target_x, target_y) {
  if (target_x == x && target_y > y) {
    return SOUTH;
  } else if (target_x == x && target_y < y) {
    return NORTH;
  } else if (target_x > x && target_y == y) {
    return EAST;
  } else if (target_x < x && target_y == y) {
    return WEST;
  } else if (target_x < x && target_y > y) {
    if (get_random_boolean()) { return SOUTH } else { return WEST };
  } else if (target_x > x && target_y > y) {
    if (get_random_boolean()) { return SOUTH } else { return EAST };
  } else if (target_x > x && target_y < y) {
    if (get_random_boolean()) { return NORTH } else { return EAST };
  } else if (target_x < x && target_y < y) {
    if (get_random_boolean()) { return NORTH } else { return WEST };
  }
  
  return EAST; //default
}

function get_random_boolean() {
  var r = Math.floor((Math.random()*2)+1);
  if (r == 1) {
    return false;
  }
  return true;
}

function new_game() {
}

function make_move() {
  var board = get_board();

  // we found an item! take it!
  if (board[get_my_x()][get_my_y()] > 0) {
    return TAKE;
  }

  var direction_to_move = PASS; //by default

  //search the radius(es)
  for (var rad=1; rad<=20; rad++) {
    var has_found_fruit = false;
    grids = get_grids_by_radius(get_my_x(), get_my_y(), rad);

    for (var j=0; j<grids.length; j++) {
      var g = grids[j];

      if (!is_at_edge(g) && has_item(get_board()[g.x][g.y])) {
        direction_to_move = direction_to_target(get_my_x(), get_my_y(), g.x, g.y);
        has_found_fruit = true;
        break;
      }
    }

    if (has_found_fruit) {
      break;
    }
  }

  trace("direction_to_move: " + direction_to_move);

  return direction_to_move;
}