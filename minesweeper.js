$(document).ready(function(){

//      *** GLOBAL VARIABLES ***      //
var gameBoard = [];

//      *** ON CELL CLICK ***      //
$( ".cover" ).hover(
  function() {
    $( this ).addClass( "hover" );
  }, function() {
    $( this ).removeClass( "hover" );
  });

$(".board").on("click", ".cell",function(){
  console.log(this);
  //$(this).removeClass("cover");
  search($(this).attr('id').split("_"), gameBoard);
});

$(".board").on("click", ".bomb",function(){
  console.log(this);
  $(this).removeClass("cover");
  alert("Sorry, you lose!");
});

//      *** ON START CLICK ***      //
$("#start").on("click",function(){
  $(".board").empty();
  var ROW_SIZE = Number($('#rowval').val()) + 1;
  var COL_SIZE = Number($('#colval').val());
  var NUM_BOMBS = Number($('#bombval').val());
  var data = initializeArray(ROW_SIZE,COL_SIZE);
  if (ROW_SIZE < 0 || COL_SIZE < 0 || NUM_BOMBS < 0)
    alert("Please enter a valid input");
  var bombCollection = bombPositions(NUM_BOMBS, (ROW_SIZE - 1)*COL_SIZE)
  console.log(bombCollection);
  createBoard(ROW_SIZE, COL_SIZE, bombCollection, data);
  data = data.slice(1);
  gameBoard = data;
  updateAdjacentBombs(data, ROW_SIZE, COL_SIZE);
  updateGameBoard(ROW_SIZE, COL_SIZE);
});


//      *** GAME FUNCTIONS ***      //
function updateGameBoard(numRow, numCol){
  for (var i = 0; i < numRow - 1; i ++){
    for (var j = 0; j < numCol; j ++){
      if (gameBoard[i][j] === 'B')
        continue;
      gameBoard[i][j] = countGameBoard(gameBoard, i, j);
    }
  }
}

function countGameBoard(data, r, c){
  var bombCount = 0;
  if (data[r-1] && data[r-1][c] == 'B')
    bombCount++;
  if (data[r+1] && data[r+1][c] == 'B')
    bombCount++;
  if (data[r] && data[r][c+1] == 'B')
    bombCount++;
  if (data[r] && data[r][c-1] == 'B')
    bombCount++;
  if (data[r-1] && data[r -1][c+1] == 'B')
    bombCount++;
  if (data[r-1] && data[r -1][c-1] == 'B')
    bombCount++;
  if (data[r+1] && data[r +1][c+1] == 'B')
    bombCount++;
  if (data[r+1] && data[r +1][c-1] == 'B')
    bombCount++;
  return bombCount;

}

function createBoard(numRows, numCols, bombCollection, data){
  var count = 0;
  for (var i = 0 ; i < numRows; i++){
    $(".board").append('<div class = "row">');
      for (var j = 0; j < numCols; j++, count ++){
        if( bombCollection.includes(count) ) {
          $(".board .row:nth-child(" + i + ") ").append(`<div id = "${i - 1}_${j}"class = "bomb">B</div>`);
          data[i][j] = 'B';
        }
        else {
          $(".board .row:nth-child(" + i + ") ").append(`<div id = "${i - 1}_${j}"class = "cell">?</div>`);
          data[i][j] = '#';
        }
        $(`#${i - 1}_${j}`).addClass("cover");
    }
    $(".board").append('</div>');
  }
}

function bombPositions(numBombs, total){
  var collection = [];
  while( collection.length < numBombs){
    var x = Math.floor(( Math.random()* total ))
    if (collection.indexOf(x) === -1)
      collection.push(x);
  }
  return collection;
}

function initializeArray(rows, cols){
  arr = [];
  for (var i = 0; i < rows; i++)
  {
    arr.push([]);
    for (var j = 0; j < cols; j++)
    {
      arr[i].push("");
    }
  }
return arr;
}

function updateAdjacentBombs(data, numRow, numCol){
  for (var i = 0; i < numRow; i ++){
    for (var j = 0; j < numCol; j ++){
      if ($(`#${i}_${j}`).text() === 'B')
        continue;
      $(`#${i}_${j}`).text(countAdjacentBombs(`${i}_${j}`.split("_"),data));
    }
  }
}

function countAdjacentBombs(coord, data){
  //data is [row, col]
  var bombCount = 0;
  var r = Number(coord[0]);
  var c = Number(coord[1]);
  // debugger;
  if (data[r-1] && data[r-1][c] == 'B')
    bombCount++;
  if (data[r+1] && data[r+1][c] == 'B')
    bombCount++;
  if (data[r] && data[r][c+1] == 'B')
    bombCount++;
  if (data[r] && data[r][c-1] == 'B')
    bombCount++;
  if (data[r-1] && data[r -1][c+1] == 'B')
    bombCount++;
  if (data[r-1] && data[r -1][c-1] == 'B')
    bombCount++;
  if (data[r+1] && data[r +1][c+1] == 'B')
    bombCount++;
  if (data[r+1] && data[r +1][c-1] == 'B')
    bombCount++;
  return bombCount;
}

function search(coords, data){
  var row = coords[0];
  var col = coords[1];
  var queue = [];
  queue.push([row,col]);
  $(`#${row}_${col}`).removeClass("cover");

  while (queue.length !== 0){
    var vertex = queue.shift();
    var r = Number(vertex[0]);
    var c = Number(vertex[1]);
    //for all neighbors of vertex
    debugger;
    if (data[r][c] !== 0)
      continue;

    if (data[r-1] && data[r-1][c] == 0)
      {if ($(`#${r-1}_${c}`).hasClass("cover")){
          $(`#${r-1}_${c}`).removeClass("cover")
          queue.push([r-1, c]);}
        }
      else{
        if (data[r-1] && data[r-1][c] !== 'B')
          $(`#${r-1}_${c}`).removeClass("cover")
      }
//    **********************************    //
    if (data[r+1] && data[r+1][c] == 0)
    {if ($(`#${r+1}_${c}`).hasClass("cover")){
        $(`#${r+1}_${c}`).removeClass("cover")
        queue.push([r+1, c]);}
      }
      else{
          if (data[r+1] && data[r+1][c] !== 'B')
              $(`#${r+1}_${c}`).removeClass("cover");
      }
//    **********************************    //
    if (data[r] && data[r][c+1] == 0)
    {if ($(`#${r}_${c+1}`).hasClass("cover")){
        $(`#${r}_${c+1}`).removeClass("cover")
        queue.push([r, c+1]);}
      }
      else{
        if (data[r] && data[r][c+1] !== 'B')
            $(`#${r}_${c+1}`).removeClass("cover");
      }
//    **********************************    //
    if (data[r] && data[r][c-1] == 0)
    {if ($(`#${r}_${c-1}`).hasClass("cover")){
        $(`#${r}_${c-1}`).removeClass("cover")
        queue.push([r, c-1]);}
      }
      else{
        if (data[r] && data[r][c-1] !== 'B')
            $(`#${r}_${c-1}`).removeClass("cover");
      }
//    **********************************    //
    if (data[r-1] && data[r -1][c+1] == 0)
    {if ($(`#${r-1}_${c+1}`).hasClass("cover")){
        $(`#${r-1}_${c+1}`).removeClass("cover")
        queue.push([r-1, c+1]);}
      }
      else{
          if (data[r-1] && data[r -1][c+1] !== 'B')
            $(`#${r-1}_${c+1}`).removeClass("cover");
      }
//    **********************************    //
    if (data[r-1] && data[r -1][c-1] == 0)
    {if ($(`#${r-1}_${c-1}`).hasClass("cover")){
        $(`#${r-1}_${c-1}`).removeClass("cover")
        queue.push([r-1, c-1]);}
      }
      else{
          if (data[r-1] && data[r -1][c-1] !== 'B')
              $(`#${r-1}_${c-1}`).removeClass("cover");
      }
//    **********************************    //
    if (data[r+1] && data[r +1][c+1] == 0)
    {if ($(`#${r+1}_${c+1}`).hasClass("cover")){
        $(`#${r+1}_${c+1}`).removeClass("cover")
        queue.push([r+1, c+1]);}
      }
      else{
          if (data[r+1] && data[r +1][c+1] !== 'B')
              $(`#${r+1}_${c+1}`).removeClass("cover");
      }
//    **********************************    //
    if (data[r+1] && data[r +1][c-1] == 0)
    {if ($(`#${r+1}_${c-1}`).hasClass("cover")){
        $(`#${r+1}_${c-1}`).removeClass("cover")
        queue.push([r+1, c-1]);}
      }
      else{
          if (data[r+1] && data[r +1][c-1] !== 'B')
            $(`#${r+1}_${c-1}`).removeClass("cover");
      }

  }
}
});
