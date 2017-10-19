/*           _
   ___  ___ | |_   _____ _ __ ___
  / __|/ _ \| \ \ / / _ \ '__/ __|
  \__ \ (_) | |\ V /  __/ |  \__ \
  |___/\___/|_| \_/ \___|_|  |___/

*/

// hint: you'll need to do a full-search of all possible arrangements of pieces!
// (There are also optimizations that will allow you to skip a lot of the dead search space)
// take a look at solversSpec.js to see what the tests are expecting


// return a matrix (an array of arrays) representing a single nxn chessboard, with n rooks placed such that none of them can attack each other



window.findNRooksSolution = function(n) {
  if (n === 1) {
    return [[1]];
  }
  if (n === 2) {
    
  }
  
  var solution;
  var helper = function(board, numQueens) {
    if (numQueens === n) {
      solution = board.rows();
      return;
    }
    for (var r = 0; r < n; r++) {
      for (var c = 0; c < n; c++) {
        if (board.get(r)[c] !== 1) {
          board.togglePiece(r, c);
          if (!board.hasAnyRooksConflicts()) {
            helper(board, numQueens + 1);
            if (solution !== undefined) {
              return solution;
            }
          }
          board.togglePiece(r, c);
        }
      }
    }
  };
  return helper(new Board({n: n}), 0);
};

//get a board, and returns a list of all the next Valid states
//valid as in no row conflict and no column conflict
// window.getValidMoves = function(board) {
//   var result = [];
//   var size = board.get('n');
//   var originalBoard = board.rows();
//   var newBoard = createCopy(board);
  
//   for (var r = 0; r < size; r++) {
//     for (var c = 0; c < size; c++) {
//       if (newBoard[r][c] === 0) {
//         //toggle this spot
//         newBoard.togglePiece(r, c);
//       }
//       result.push(copyBoard);
//       copyBoard = originalBoard;
//     }
//   }
  

  // for (var r = 0; r < size; r++) {
  //   for (var c = 0; c < size; c++) {
  //     if () {
  //       var notToToggle = board.togglePiece(r,c);
  //     }
  //   }
  // }

  

  // if place piece then havePlacedAPiece = true;
  //go through each box in the board
  // for () {
  //   //if not 1 or not null {
  //   //check for conflicts
  //   //}

  // }
//   return result;
  
// }

// window.copyBoard = function(board) {
//   var currentBoardPlaying = [];
//   for (var i = 0; i < size; i++) {
//      currentBoardPlaying[i] = originalBoard[i].slice(); 
//   }
// }

// var addNextPiece = function(board = new Board({n: n})) {
//     var originalBoard = [...board];
//     var temp = [];
//     for (var i = 0; i < n; i ++) {
//       for (var j = 0; j < n; j++) {
//         if (!board.hasRowConflictAt(i) && !board.hasAnyColConflicts(j) && board[i][j] !== 1) {
//           board[i][j] = 1;
//           temp.push(board);
//           board = originalBoard;
//         }
//       }
//     }
//     partialAnswers.push(temp);
//   };



  //create answer array;
  //create function that takes an array and outputs an array of the next possible steps
    //take the board input and find the next possible step and place that can be used to place a rook
        //when found, place the rook
      //check if all possible squares have been checked
        //if yes, all have been checked, then the we know there are no more places to try to place a rook & check if rooks = n
          //if rooks = n this is a solution
            //push it to the answer array
          //if not this can be dismissed
        //if some squares remain to be checked, output this board to a place so we can recursively put this back in
    //start the funciton again but do not reuse this location
    //return your array of answers.length;





  
  //var finalBoard = new Board({n:n});
  // helper(board) {
      //
      //getAvaliblesMoves();
      //for each of the available moves, we create a newState board
        //helper(newState)
  //}
  //helper(finalBoard);
  




//   console.log('Single solution for ' + n + ' rooks:', JSON.stringify(solution));
//   //var solution = undefined; //fixme
//   return solution;
// };

// return the number of nxn chessboards that exist, with n rooks placed such that none of them can attack each other
window.countNRooksSolutions = function(n) {
  var solutionCount = undefined; //fixme

  console.log('Number of solutions for ' + n + ' rooks:', solutionCount);
  return solutionCount;
};

// return a matrix (an array of arrays) representing a single nxn chessboard, with n queens placed such that none of them can attack each other
window.findNQueensSolution = function(n) {
  var solution = undefined; //fixme

  console.log('Single solution for ' + n + ' queens:', JSON.stringify(solution));
  return solution;
};

// return the number of nxn chessboards that exist, with n queens placed such that none of them can attack each other
window.countNQueensSolutions = function(n) {
  var solutionCount = undefined; //fixme

  console.log('Number of solutions for ' + n + ' queens:', solutionCount);
  return solutionCount;
};
