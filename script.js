let currentPlayer = 'X';
let board = ['', '', '', '', '', '', '', '', ''];
let scoreX = 0;
let scoreO = 0;

function cellClicked(index) {
  const cell = document.getElementById(index);
  if (board[index] === '') {
    cell.innerText = currentPlayer;
    cell.classList.add('cell-clicked'); // Add animation class
    setTimeout(() => cell.classList.remove('cell-clicked'), 300); // Remove animation class after 0.3s
    board[index] = currentPlayer;
    checkWinner();
    currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
    updatePlayerTurn();
  }
}

function checkWinner() {
  const winConditions = [
    [0, 1, 2], [3, 4, 5], [6, 7, 8], // Rows
    [0, 3, 6], [1, 4, 7], [2, 5, 8], // Columns
    [0, 4, 8], [2, 4, 6]             // Diagonals
  ];

  for (let condition of winConditions) {
    const [a, b, c] = condition;
    if (board[a] !== '' && board[a] === board[b] && board[a] === board[c]) {
      showResultMessage(`${board[a]} wins!`); // Show result message
      updateScore(board[a]);
      resetBoard();
      return;
    }
  }

  if (!board.includes('')) {
    showResultMessage("It's a tie!"); // Show result message for tie
    resetBoard();
  }
}

function showResultMessage(message) {
  const resultMessageElement = document.getElementById('result-message');
  resultMessageElement.innerText = message;
  resultMessageElement.classList.add('show');
  setTimeout(() => {
    resultMessageElement.classList.remove('show');
  }, 2000); // Hide the message after 2 seconds
}

function updateScore(winner) {
  if (winner === 'X') {
    scoreX++;
    document.getElementById('score-x').innerText = scoreX;
  } else if (winner === 'O') {
    scoreO++;
    document.getElementById('score-o').innerText = scoreO;
  }
}

function updatePlayerTurn() {
  const playerTurnElement = document.getElementById('player-turn');
  playerTurnElement.innerText = `Player ${currentPlayer}'s Turn`;
  playerTurnElement.classList.remove('player-x', 'player-o');
  playerTurnElement.classList.add(`player-${currentPlayer.toLowerCase()}`);
}

function resetBoard() {
  for (let i = 0; i < 9; i++) {
    document.getElementById(i).innerText = '';
  }
  board = ['', '', '', '', '', '', '', '', ''];
  currentPlayer = 'X'; // Reset the current player to 'X'
  updatePlayerTurn(); // Update the player turn display
}
