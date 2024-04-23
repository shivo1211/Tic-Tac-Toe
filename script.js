let currentPlayer = 'X';
let board = ['', '', '', '', '', '', '', '', ''];
let scoreX = 0;
let scoreO = 0;
let ties = 0;

function cellClicked(index) {
  const cell = document.getElementById(index);
  if (board[index] === '') {
    cell.innerText = currentPlayer;
    cell.classList.add('cell-clicked'); // Add animation class
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
      if (board[a] === 'X') {
        scoreX++;
      } else {
        scoreO++;
      }
      showWinner(`${board[a]} wins!`); // Show winner message
      updateScore();
      return;
    }
  }

  if (!board.includes('')) {
    ties++;
    updateScore();
    showWinner("It's a tie!"); // Show tie message
  }
}

function updateScore() {
  document.getElementById('score-x').innerText = scoreX;
  document.getElementById('score-o').innerText = scoreO;
  document.getElementById('ties').innerText = ties;
}

function updatePlayerTurn() {
  const playerTurnElement = document.getElementById('player-turn');
  playerTurnElement.innerText = `Player ${currentPlayer}'s Turn`;
  playerTurnElement.classList.remove('player-x', 'player-o');
  playerTurnElement.classList.add(`player-${currentPlayer.toLowerCase()}`);
}

function resetBoard() {
  for (let i = 0; i < 9; i++) {
    document.getElementById(i).innerText = board[i];
  }
  board = ['', '', '', '', '', '', '', '', ''];
  currentPlayer = 'X'; // Reset the current player to 'X'
  updatePlayerTurn(); // Update the player turn display
}

function showWinner(message) {
  const resultMessageElement = document.getElementById('result-message');
  const winnerMessageElement = document.getElementById('winner-message');
  winnerMessageElement.innerText = message;
  resultMessageElement.classList.add('show');
}

function startNewRound() {
  document.getElementById('result-message').classList.remove('show');
  resetBoard();
  resetGrid();
}

function resetGrid() {
  for (let i = 0; i < 9; i++) {
    document.getElementById(i).innerText = '';
  }
}


// Initialize the game
updatePlayerTurn();
