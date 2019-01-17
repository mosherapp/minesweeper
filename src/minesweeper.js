'use strict';

class Board {
  constructor(numberOfRows, numberOfColumns, numberOfBombs) {
    this._numberOfBombs = numberOfBombs;
    this._numberOfTiles = (numberOfRows * numberOfColumns);
    this._playerBoard = Board.generatePlayerBoard(numberOfRows, numberOfColumns);
    this._bombBoard = Board.generateBombBoard(numberOfRows, numberOfColumns, numberOfBombs);
  }
  get playerBoard() { return this._playerBoard; }

  // Function to flip a tile
  flipTile(rowIndex, columnIndex) {
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
  getNumberOfNeighborBombs(rowIndex, columnIndex) {
    const neighborOffsets = [[-1,-1],[-1,0],[-1,1],[0,-1],[0,1],[1,-1],[1,0],[1,1]];
    const numberOfRows = this._bombBoard.length;
    const numberOfColumns = this._bombBoard[0].length;
    let numberOfBombs = 0;
  
    neighborOffsets.forEach((offset) => {
      // Get row and column index of the current offset
      const neighborRowIndex = rowIndex + offset[0];
      const neighborColumnIndex = columnIndex + offset[1];
  
      if ( // Check that current offset exists
        neighborRowIndex >= 0 && neighborRowIndex < numberOfRows &&
        neighborColumnIndex >= 0 && neighborColumnIndex < numberOfColumns
      ) {
        if (this._bombBoard[neighborRowIndex][neighborColumnIndex] === 'B')
          numberOfBombs += 1;
      }
    }); // End neighborOffsets.forEach
    return numberOfBombs;
  }
  hasSafeTiles() {
    return (this._numberOfTiles !== this._numberOfBombs);
  }
  // Function to log a board to the console
  print() {
    console.log(this._playerBoard.map(row => row.join(' | ')).join('\n'));
  }
  static generatePlayerBoard(numberOfRows, numberOfColumns) {
    const board = [];
    // Nested loop to create 2D array
    for( let rowIndex = 0; rowIndex < numberOfRows; rowIndex += 1) {
      const row = [];
      for( let colIndex = 0; colIndex < numberOfColumns; colIndex += 1) {
        row.push(' ');
      }
      board.push(row);
    }
    return board;
  }
  static generateBombBoard(numberOfRows, numberOfColumns, numberOfBombs) {
    const board = this.generatePlayerBoard(numberOfRows, numberOfColumns);
  
    let numberOfBombsPlaced = 0;
    while (
      numberOfBombsPlaced < numberOfBombs &&
      numberOfBombsPlaced <= numberOfRows * numberOfColumns
    ) {
      const randomRowIndex = Math.floor(Math.random() * numberOfRows);
      const randomColumnIndex = Math.floor(Math.random() * numberOfColumns);
  
      if( board[randomRowIndex][randomColumnIndex] !== 'B' ) {
            board[randomRowIndex][randomColumnIndex] = 'B';
            numberOfBombsPlaced += 1;
      }
    }
    return board;
  }
}

class Game {
  constructor(numberOfRows, numberOfColumns, numberOfBombs) {
    this._board = new Board(numberOfRows, numberOfColumns, numberOfBombs);
    
  }
  playMove(rowIndex, columnIndex) {
    this._board.flipTile(rowIndex, columnIndex);

    if(this._board.playerBoard[rowIndex][columnIndex] === 'B') {
      console.log('Game Over! You hit a bomb!');
      this._board.print();
    } else if(!this._board.hasSafeTiles()) {
      console.log('You Win!');
    } else {
      console.log('Current Board:\n');
      this._board.print();
    }
  }
}

const g = new Game(3,3,3);
g.playMove(0,0);