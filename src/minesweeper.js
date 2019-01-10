
// Function to generate a board that will be used to store
// the players guesses
const generatePlayerBoard = (numberOfRows, numberOfColumns) => {
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
};

// Function to generate a board that will store where the
// bombs are. We can check player guesses against this board
const generateBombBoard = (numberOfRows, numberOfColumns, numberOfBombs) => {
  const board = generatePlayerBoard(numberOfRows, numberOfColumns);

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
};

// Function to find number of adjacent bombs
const getNumberOfNeighborBombs = (bombBoard, rowIndex, columnIndex) => {
  const neighborOffsets = [[-1,-1],[-1,0],[-1,1],[0,-1],[0,1],[1,-1],[1,0],[1,1]];
  const numberOfRows = bombBoard.length;
  const numberOfColumns = bombBoard[0].length;
  let numberOfBombs = 0;

  neighborOffsets.forEach((offset) => {
    // Get row and column index of the current offset
    const neighborRowIndex = rowIndex + offset[0];
    const neighborColumnIndex = columnIndex + offset[1];

    if ( // Check that current offset exists
      neighborRowIndex >= 0 && neighborRowIndex < numberOfRows &&
      neighborColumnIndex >= 0 && neighborColumnIndex < numberOfColumns
    ) {
      if (bombBoard[neighborRowIndex][neighborColumnIndex] === 'B')
        numberOfBombs += 1;
    }
  }); // End neighborOffsets.forEach
  return numberOfBombs;
}

// Function to flip a tile
const flipTile = (playerBoard, bombBoard, rowIndex, columnIndex) => {
  // Check has not been flipped already
  if (playerBoard[rowIndex][columnIndex] !== ' ') {
    console.log('This tile has already been flipped!');
    return;
    // Check doesn't contain a bomb
  } else if (bombBoard[rowIndex][columnIndex] === 'B') {
    playerBoard[rowIndex][columnIndex] = 'B';
  } else {
    playerBoard[rowIndex][columnIndex] = getNumberOfNeighborBombs(bombBoard, rowIndex, columnIndex);
  }
  return;
}

// Function to log a board to the console
const printBoard = board => {
  console.log(board.map(row => row.join(' | ')).join('\n'));
};

let playerBoard = generatePlayerBoard(3, 3);
let bombBoard = generateBombBoard(3, 3, 3);
console.log('Player Board:');
printBoard(playerBoard);
console.log('Bomb Board:');
// bombBoard will sometimes have less bombs than specified due to the previously-mentioned missing code.
// Additionally, printing bombBoard will not look clean due to use of null instead of ' ' - this should just be for debugging, not presentation.
printBoard(bombBoard);
flipTile(playerBoard, bombBoard, 0, 0);
console.log('Updated Player Board:')
printBoard(playerBoard);
