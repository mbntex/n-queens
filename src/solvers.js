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
  
  var solution;
  var helper = function(board, numRooks) {
    if (numRooks === n) {
      solution = board.rows();
      return;
    }

    //trying to find an available spot
    for (var r = 0; r < n; r++) {
      for (var c = 0; c < n; c++) {

        if (board.get(r)[c] !== 1) {
          board.togglePiece(r, c);
          //hasAnyRooksConflicts checks every single row and column
          //instead, we can check 
          // if (board.hasRowConflictAt(r) && (r !== n - 1)) { 
          //   board.togglePiece(r, c);
          //   r = r + 1; 
          // }
          
          if (!board.hasAnyRooksConflicts()) {

            //made the new Move
            helper(board, numRooks + 1);
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


// window.countNRooksSolutions = function(n) {
//   //var solution = [];
//   var solution = new Set();
//   if (n === 1) {
//     return 1;
//   }

//   var helper = function(board, numQueens) {
//     if (numQueens === n) { 
//       var copy = JSON.stringify(board.rows());
//       solution.add(copy);
//       copy = '';
//       return;
//     }
//     for (var r = 0; r < n; r++) {
//       for (var c = 0; c < n; c++) {
//         if (board.get(r)[c] !== 1) {
//           board.togglePiece(r, c);
//           if (!board.hasAnyRooksConflicts()) {
//             helper(board, numQueens + 1);
//             // if (solution !== undefined) {
//             //   return solution;
//             // }
//           }
//           board.togglePiece(r, c);
//         }
//       }
//     }
//   };
//   helper(new Board({n: n}), 0);
//   return solution.size;
// };


window.countNRooksSolutions = function(n) {
  //var solution = [];
  var solution = new Set();
  if (n === 1) {
    return 1;
  }

  var helper = function(board, numRooks) {
    if (numRooks === n) { 
      var copy = JSON.stringify(board.rows());
      solution.add(copy);
      copy = '';
      return;
    }
    for (var r = 0; r < n; r++) {
      for (var c = 0; c < n; c++) {
        if (board.get(r)[c] !== 1) {
          board.togglePiece(r, c);
          if (!board.hasAnyRooksConflicts()) {
            helper(board, numRooks + 1);
            // if (solution !== undefined) {
            //   return solution;
            // }
          }
          board.togglePiece(r, c);
        }
      }
    }
  };
  helper(new Board({n: n}), 0);
  return solution.size;
};


window.getRidOfDuplicates = function(array) {
  var hash = {};
  var output = [];
  array.forEach(function (solution) {
    if (hash[solution] === undefined) {
      hash[solution] = 1;
      output.push(solution);
    }
  });
  return output;
};

// return a matrix (an array of arrays) representing a single nxn chessboard, with n queens placed such that none of them can attack each other
window.findNQueensSolution = function(n) {
  if (n === 0) {
    return [];
  }
  
  if (n === 1) {
    return [[1]];
  }
  
  if (n === 2) {
    return [[], []];
  }
  if (n === 3) {
    return [[], [], []];
  }
  
  var solution;
  var helper = function(board, numQueens) {
    if (numQueens === n) {
      solution = board.rows();
      return;
    }

    //trying to find an available spot
    for (var r = 0; r < n; r++) {
      for (var c = 0; c < n; c++) {

        if (board.get(r)[c] !== 1) {
          board.togglePiece(r, c);
          //hasAnyQueensConflicts checks every single row and column
          //instead, we can check 
          // if (board.hasRowConflictAt(r) && (r !== n - 1)) { 
          //   board.togglePiece(r, c);
          //   r = r + 1; 
          // }
          
          if (!board.hasAnyQueensConflicts()) {

            //made the new Move
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
  //console.log('Single solution for ' + n + ' queens:', JSON.stringify(solution));
  
  return helper(new Board({n: n}), 0);
};

// return the number of nxn chessboards that exist, with n queens placed such that none of them can attack each other
window.countNQueensSolutions = function(n) {
  var solutionCount = undefined; //fixme

  console.log('Number of solutions for ' + n + ' queens:', solutionCount);
  return solutionCount;
};
