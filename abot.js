//declare new variables
var NORTH_WEST = 111;
var NORTH_EAST = 222;
var SOUTH_WEST = 333;
var SOUTH_EAST = 444;

//check if grid is beyond boundaries of the board
function is_at_edge(pos) {
  var board = get_board();

  if (pos.x > (board.length-1) || pos.x < 1 ||
    pos.y > (board[0].length-1) || pos.y < 1) {
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
  var top_left = {x: -(rad), y: rad}; //top left
  var sq_len = 3 + (2*(rad-1));

  //top
  for (var i=1; i<=sq_len; i++) {
    grids.push({x: x-(rad)+(i-1), y: y+rad});
  }

  //bottom
  for (var i=1; i<=sq_len; i++) {
    grids.push({x: x-(rad)+(i-1), y: y-(rad)});
  }

  //left
  for (var i=2; i<=sq_len-1; i++) {
    grids.push({x: x-(rad), y: y+rad-(i-1)});
  }

  //right
  for (var i=2; i<=sq_len-1; i++) {
    grids.push({x: x+rad, y: y+rad-(i-1)});
  }

  return grids;
};


function new_game() {
}

function make_move() {
  var board = get_board();

  // we found an item! take it!
  if (board[get_my_x()][get_my_y()] > 0) {
    return TAKE;
  }

  //check NSEW grids relative to current position
  var surround_grids = [];
  surround_grids.push({ x: get_my_x(), y: get_my_y()+1, direction: NORTH });
  surround_grids.push({ x: get_my_x(), y: get_my_y()-1, direction: SOUTH });
  surround_grids.push({ x: get_my_x()+1, y: get_my_y(), direction: EAST });
  surround_grids.push({ x: get_my_x()-1, y: get_my_y(), direction: WEST });
  surround_grids.push({ x: get_my_x()-1, y: get_my_y(), direction: WEST });
  surround_grids.push({ x: get_my_x()-1, y: get_my_y()+1, direction: NORTH }); //NORTH_WEST
  surround_grids.push({ x: get_my_x()+1, y: get_my_y()+1, direction: NORTH }); //NORTH_EAST
  surround_grids.push({ x: get_my_x()-1, y: get_my_y()-1, direction: SOUTH }); //SOUTH_WEST
  surround_grids.push({ x: get_my_x()+1, y: get_my_y()-1, direction: SOUTH }); //SOUTH_EAST

  //check if surround grids has any fruits
  for (var i=0; i<surround_grids.length; i++) {
    var curr_grid = surround_grids[i];

    //if this particular grid a fruit, go to it
    if (!is_at_edge(curr_grid) && has_item(board[curr_grid.x][curr_grid.y])) {
        return curr_grid.direction;
    }
  }

 for (var i=1; i<=10; i++) {
   var has_found_fruit = false;


 }

  //when none of NSEW grids has fruits. HAHA!
  var rand = Math.random() * 4;
  if (rand < 1) return NORTH;
  if (rand < 2) return SOUTH;
  if (rand < 3) return EAST;
  if (rand < 4) return WEST;

  return PASS;
}


//loops through entire board
//for(var x=0; x<board.length; x++) {
//  var curr_col = board[i];
//
//  for(var y=0; y<curr_col.length; y++) {
//    //board[i][y]
//  }
//}
//look for specific type of fruit
