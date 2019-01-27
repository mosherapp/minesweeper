'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Board = exports.Board = function () {
  function Board(numberOfRows, numberOfColumns, numberOfBombs) {
    _classCallCheck(this, Board);

    this._numberOfBombs = numberOfBombs;
    this._numberOfTiles = numberOfRows * numberOfColumns;
    this._playerBoard = Board.generatePlayerBoard(numberOfRows, numberOfColumns);
    this._bombBoard = Board.generateBombBoard(numberOfRows, numberOfColumns, numberOfBombs);
  }

  _createClass(Board, [{
    key: 'flipTile',


    // Function to flip a tile
    value: function flipTile(rowIndex, columnIndex) {
      // Check has not been flipped already
      if (this._playerBoard[rowIndex][columnIndex] !== ' ') {
        /* console.log('This tile has already been flipped!'); */
        return;
        // Check doesn't contain a bomb
      } else if (this._bombBoard[rowIndex][columnIndex] === 'B') {
        this._playerBoard[rowIndex][columnIndex] = 'B';
      } else {
        this._playerBoard[rowIndex][columnIndex] = this.getNumberOfNeighborBombs(rowIndex, columnIndex);
        this._numberOfTiles -= 1;
      }
      return;
    }
    // Function to find number of adjacent bombs

  }, {
    key: 'getNumberOfNeighborBombs',
    value: function getNumberOfNeighborBombs(rowIndex, columnIndex) {
      var _this = this;

      var neighborOffsets = [[-1, -1], [-1, 0], [-1, 1], [0, -1], [0, 1], [1, -1], [1, 0], [1, 1]];
      var numberOfRows = this._bombBoard.length;
      var numberOfColumns = this._bombBoard[0].length;
      var numberOfBombs = 0;

      neighborOffsets.forEach(function (offset) {
        // Get row and column index of the current offset
        var neighborRowIndex = rowIndex + offset[0];
        var neighborColumnIndex = columnIndex + offset[1];

        if ( // Check that current offset exists
        neighborRowIndex >= 0 && neighborRowIndex < numberOfRows && neighborColumnIndex >= 0 && neighborColumnIndex < numberOfColumns) {
          if (_this._bombBoard[neighborRowIndex][neighborColumnIndex] === 'B') numberOfBombs += 1;
        }
      }); // End neighborOffsets.forEach
      return numberOfBombs;
    }
  }, {
    key: 'hasSafeTiles',
    value: function hasSafeTiles() {
      return this._numberOfTiles !== this._numberOfBombs;
    }
    // Function to log a board to the console

  }, {
    key: 'print',
    value: function print() {
      console.log(this._playerBoard.map(function (row) {
        return row.join(' | ');
      }).join('\n'));
    }
  }, {
    key: 'playerBoard',
    get: function get() {
      return this._playerBoard;
    }
  }], [{
    key: 'generatePlayerBoard',
    value: function generatePlayerBoard(numberOfRows, numberOfColumns) {
      var board = [];
      // Nested loop to create 2D array
      for (var rowIndex = 0; rowIndex < numberOfRows; rowIndex += 1) {
        var row = [];
        for (var colIndex = 0; colIndex < numberOfColumns; colIndex += 1) {
          row.push(' ');
        }
        board.push(row);
      }
      return board;
    }
  }, {
    key: 'generateBombBoard',
    value: function generateBombBoard(numberOfRows, numberOfColumns, numberOfBombs) {
      var board = this.generatePlayerBoard(numberOfRows, numberOfColumns);

      var numberOfBombsPlaced = 0;
      while (numberOfBombsPlaced < numberOfBombs && numberOfBombsPlaced <= numberOfRows * numberOfColumns) {
        var randomRowIndex = Math.floor(Math.random() * numberOfRows);
        var randomColumnIndex = Math.floor(Math.random() * numberOfColumns);

        if (board[randomRowIndex][randomColumnIndex] !== 'B') {
          board[randomRowIndex][randomColumnIndex] = 'B';
          numberOfBombsPlaced += 1;
        }
      }
      return board;
    }
  }]);

  return Board;
}();