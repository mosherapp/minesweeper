
// Function to generate a board that will be used to store
// the players guesses
const generatePlayerBoard = (numberOfRows, numberOfColumns) => {
  const board = [];

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
  const board = [];

  for( let rowIndex = 0; rowIndex < numberOfRows; rowIndex += 1) {
    const row = [];
    for( let colIndex = 0; colIndex < numberOfColumns; colIndex += 1) {
      row.push(null);
    }
    board.push(row);
  }

  let numberOfBombsPlaced = 0;
  while (numberOfBombsPlaced < numberOfBombs) {
    const randomRowIndex = Math.floor(Math.random() * numberOfRows);
    const randomColumnIndex = Math.floor(Math.random() * numberOfColumns);

    board[randomRowIndex][randomColumnIndex] = 'B';

    numberOfBombsPlaced += 1;
    // An important note: The code in your while loop has the
    // potential to place bombs on top of already existing bombs.
    // This will be fixed when you learn about control flow.
  }

  return board;
};

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
