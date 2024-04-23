let currentPlayer = 'X';
let board = ['', '', '', '', '', '', '', '', ''];
let scoreX = 0;
let scoreO = 0;

function cellClicked(index) {
  if (board[index] === '') {
    document.getElementById(index).innerText = currentPlayer;
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
      alert(`${board[a]} wins!`);
      updateScore(board[a]);
      resetBoard();
      return;
    }
  }

  if (!board.includes('')) {
    alert("It's a tie!");
    resetBoard();
  }
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
