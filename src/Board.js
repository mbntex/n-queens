// This file is a Backbone Model (don't worry about what that means)
// It's part of the Board Visualizer
// The only portions you need to work on are the helper functions (below)

(function() {

  window.Board = Backbone.Model.extend({

    initialize: function (params) {
      if (_.isUndefined(params) || _.isNull(params)) {
        console.log('Good guess! But to use the Board() constructor, you must pass it an argument in one of the following formats:');
        console.log('\t1. An object. To create an empty board of size n:\n\t\t{n: %c<num>%c} - Where %c<num> %cis the dimension of the (empty) board you wish to instantiate\n\t\t%cEXAMPLE: var board = new Board({n:5})', 'color: blue;', 'color: black;', 'color: blue;', 'color: black;', 'color: grey;');
        console.log('\t2. An array of arrays (a matrix). To create a populated board of size n:\n\t\t[ [%c<val>%c,%c<val>%c,%c<val>%c...], [%c<val>%c,%c<val>%c,%c<val>%c...], [%c<val>%c,%c<val>%c,%c<val>%c...] ] - Where each %c<val>%c is whatever value you want at that location on the board\n\t\t%cEXAMPLE: var board = new Board([[1,0,0],[0,1,0],[0,0,1]])', 'color: blue;', 'color: black;', 'color: blue;', 'color: black;', 'color: blue;', 'color: black;', 'color: blue;', 'color: black;', 'color: blue;', 'color: black;', 'color: blue;', 'color: black;', 'color: blue;', 'color: black;', 'color: blue;', 'color: black;', 'color: blue;', 'color: black;', 'color: blue;', 'color: black;', 'color: grey;');
      } else if (params.hasOwnProperty('n')) {
        this.set(makeEmptyMatrix(this.get('n')));
      } else {
        this.set('n', params.length);
      }
    },

    rows: function() {
      return _(_.range(this.get('n'))).map(function(rowIndex) {
        return this.get(rowIndex);
      }, this);
    },
    
    //return an array of (rowI, colI) that already had a null there
    //which means that later, we don't want to untoggle these indecies
    togglePiece: function(rowIndex, colIndex) {
      // var size = this.get('n');
      // for (var i = 0; i < size; i++) {
      //   //the row that I want 
      //   this.get(rowIndex)[i] = null;
      //   this.get(i)[rowIndex] = null;
      // }
      
      this.get(rowIndex)[colIndex] = + !this.get(rowIndex)[colIndex];
      this.trigger('change');
    },
    
    //toggles the row, col index and toggles each back (1 ->0 and null -> 0)
    // returns an array
    unTogglePiece: function(rowIndex, colIndex, arrayOfThingsNotToToggleback) {
      var size = this.get('n');
      for (var i = 0; i < size; i++) {
        //the row that I want 
        this.get(rowIndex)[i] = null;
        this.get(i)[rowIndex] = null;
      }
      
      this.get(rowIndex)[colIndex] = + !this.get(rowIndex)[colIndex];
      this.trigger('change');
    },

    _getFirstRowColumnIndexForMajorDiagonalOn: function(rowIndex, colIndex) {
      return colIndex - rowIndex;
    },

    _getFirstRowColumnIndexForMinorDiagonalOn: function(rowIndex, colIndex) {
      return colIndex + rowIndex;
    },

    hasAnyRooksConflicts: function() {
      return this.hasAnyRowConflicts() || this.hasAnyColConflicts();
    },

    hasAnyQueenConflictsOn: function(rowIndex, colIndex) {
      return (
        this.hasRowConflictAt(rowIndex) ||
        this.hasColConflictAt(colIndex) ||
        this.hasMajorDiagonalConflictAt(this._getFirstRowColumnIndexForMajorDiagonalOn(rowIndex, colIndex)) ||
        this.hasMinorDiagonalConflictAt(this._getFirstRowColumnIndexForMinorDiagonalOn(rowIndex, colIndex))
      );
    },

    hasAnyQueensConflicts: function() {
      return this.hasAnyRooksConflicts() || this.hasAnyMajorDiagonalConflicts() || this.hasAnyMinorDiagonalConflicts();
    },

    _isInBounds: function(rowIndex, colIndex) {
      return (
        0 <= rowIndex && rowIndex < this.get('n') &&
        0 <= colIndex && colIndex < this.get('n')
      );
    },


/*
         _             _     _
     ___| |_ __ _ _ __| |_  | |__   ___ _ __ ___ _
    / __| __/ _` | '__| __| | '_ \ / _ \ '__/ _ (_)
    \__ \ || (_| | |  | |_  | | | |  __/ | |  __/_
    |___/\__\__,_|_|   \__| |_| |_|\___|_|  \___(_)

 */
    /*=========================================================================
    =                 TODO: fill in these Helper Functions                    =
    =========================================================================*/

    // ROWS - run from left to right
    // --------------------------------------------------------------
    //
    // test if a specific row on this board contains a conflict
    hasRowConflictAt: function(rowIndex) {
      var row = this.get(rowIndex);
      //console.log('ROW = ', row);
      //console.log('ATT = ', this.attributes[rowIndex]);
      var count = 0;
      var row = this.get(rowIndex);
      for (var i = 0; i < row.length; i++) {
        if (row[i] === 1) {
          count += 1;
        }
        if (count > 1) {
          return true;
        }
      } 
      return false; 
    },

    // test if any rows on this board contain conflicts
    hasAnyRowConflicts: function() {
      var board = this.rows();
      for (var i = 0; i < board.length; i++) {
        if (this.hasRowConflictAt(i)) {
          return true;
        }
      }
      return false; 
    },



    // COLUMNS - run from top to bottom
    // --------------------------------------------------------------
    //
    // test if a specific column on this board contains a conflict
    hasColConflictAt: function(colIndex) {
//var row = this.get(rowIndex);
      //set up sum counter
      var sum = 0;
      var board = this.rows();
      
      //check each row at column
      for (var i = 0; i < board.length; i++) {
        //if matches add to sum
        if (this.get(i)[colIndex] === 1) {
          sum ++;
        }
        if (sum > 1) {
          return true; 
        }
      }
      return false;
    },

    // test if any columns on this board contain conflicts
    hasAnyColConflicts: function() {
      // console.log('Function Get = ', this.get('n'));
      // console.log('Att = ', this.attributes.n);
      for (var i = 0; i < this.get('n'); i++) {
        if (this.hasColConflictAt(i)) { return true; }
      }
      return false;
    },



    // Major Diagonals - go from top-left to bottom-right
    // --------------------------------------------------------------
    //
    // test if a specific major diagonal on this board contains a conflict
    
    //takes in a column Number (0 to 3)
    hasMajorDiagonalConflictAt: function(majorDiagonalColumnIndexAtFirstRow) {
      var board = this.rows();
      var x, y;
      var size = this.get('n');
      if (majorDiagonalColumnIndexAtFirstRow < 0) {
        x = Math.abs(majorDiagonalColumnIndexAtFirstRow);
        y = 0;
      } else if (majorDiagonalColumnIndexAtFirstRow > 0) {
        x = 0;
        y = majorDiagonalColumnIndexAtFirstRow;
      } else {
        x = 0;
        y = 0;
      }

      var count = 0;
      while ((x < size) && (y < size)) {
        var currentValue = board[x][y];
        if (currentValue === 1) {
          count++;
          if (count > 1) { return true; }
        }
        x += 1;
        y += 1;
      }
      return false;
    },

    // test if any major diagonals on this board contain conflicts
    hasAnyMajorDiagonalConflicts: function() {
      var size = this.get('n');
      var negativeColumnStart = -(size - 2);
      for (var i = negativeColumnStart; i <= 0; i++) {
        if (this.hasMajorDiagonalConflictAt(i)) {
          return true;
        }
      }
      for (var j = 1; j < size - 2; j++) {
        if (this.hasMajorDiagonalConflictAt(i)) {
          return true;
        }
      }
      return false;
    },




    



    // Minor Diagonals - go from top-right to bottom-left
    // --------------------------------------------------------------
    //
    // test if a specific minor diagonal on this board contains a conflict
    hasMinorDiagonalConflictAt: function(minorDiagonalColumnIndexAtFirstRow) {
      var board = this.rows();
      var x, y;
      var size = this.get('n');

      if (minorDiagonalColumnIndexAtFirstRow >= 0 && minorDiagonalColumnIndexAtFirstRow < size ) {
        x = 0;
        y = minorDiagonalColumnIndexAtFirstRow;
      }
      if (minorDiagonalColumnIndexAtFirstRow >= size) {
        x = minorDiagonalColumnIndexAtFirstRow - (size - 1);
        y = size - 1;
      } 

      var count = 0;
      while ((x < size) && (y >= 0)) {
        var currentValue = board[x][y];
        if (currentValue === 1) {
          count++;
          if (count > 1) { return true; }
        }
        x += 1;
        y -= 1;
      }
      return false;
    },

    // test if any minor diagonals on this board contain conflicts
    hasAnyMinorDiagonalConflicts: function() {
      var size = this.get('n');
      for (var i = 1; i < size - 1; i++) {
        if (this.hasMinorDiagonalConflictAt(i)) {
          return true;
        }
      }
      for (var j = size; j <= (2 * (size - 1)); j++) {
        if (this.hasMinorDiagonalConflictAt(j)) {
          return true;
        }
      }
      return false;
    }

    /*--------------------  End of Helper Functions  ---------------------*/


  });

  var makeEmptyMatrix = function(n) {
    return _(_.range(n)).map(function() {
      return _(_.range(n)).map(function() {
        return 0;
      });
    });
  };

}());
