// === DOM Elements ===
const board = document.getElementById('board');          // Game board container
const statusText = document.getElementById('status');    // Status message display
const resetBtn = document.getElementById('resetBtn');    // Reset button

// === Game State Variables ===
let currentPlayer = 'X';                                 // Tracks current player
let gameActive = true;                                   // Game state control flag
let gameState = ["", "", "", "", "", "", "", "", ""];    // Stores the current board state

// === Winning Combinations (index-based) ===
const winningConditions = [
  [0,1,2], [3,4,5], [6,7,8], // Rows
  [0,3,6], [1,4,7], [2,5,8], // Columns
  [0,4,8], [2,4,6]           // Diagonals
];

// === Handles a Player Clicking a Cell ===
function handleCellClick(e) {
  const cell = e.target;
  const index = parseInt(cell.getAttribute('data-index'));

  // Ignore if already clicked or game is over
  if (gameState[index] !== "" || !gameActive) return;

  // Update the board state and UI
  gameState[index] = currentPlayer;
  cell.textContent = currentPlayer;

  // Check if current player has won
  if (checkWinner()) {
    statusText.textContent = `Player ${currentPlayer} Wins!`;
    gameActive = false;
  }
  // Check if the board is full (tie)
  else if (!gameState.includes("")) {
    statusText.textContent = "It's a Tie!";
    gameActive = false;
  }
  // Otherwise, switch players
  else {
    currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
    statusText.textContent = `Player ${currentPlayer}'s Turn`;
  }
}

// === Check for a Win ===
function checkWinner() {
  return winningConditions.some(combination => {
    const [a, b, c] = combination;
    return (
      gameState[a] !== "" &&
      gameState[a] === gameState[b] &&
      gameState[a] === gameState[c]
    );
  });
}

// === Reset the Game ===
function resetGame() {
  gameState = ["", "", "", "", "", "", "", "", ""];   // Clear board
  currentPlayer = 'X';                                // Reset to X
  gameActive = true;                                  // Allow gameplay
  statusText.textContent = `Player X's Turn`;         // Update status
  document.querySelectorAll('.cell').forEach(cell => cell.textContent = ""); // Clear UI
}

// === Attach Click Events to All Cells and Reset Button ===
document.querySelectorAll('.cell').forEach(cell => cell.addEventListener('click', handleCellClick));
resetBtn.addEventListener('click', resetGame);
