const cells = document.querySelectorAll('.cell');
const statusText = document.getElementById('status');
const resetBtn = document.getElementById('resetBtn');

let currentPlayer = "X"; // Start with X
let gameState = ["", "", "", "", "", "", "", "", ""];
let gameActive = true;

const winningConditions = [
    [0, 1, 2], [3, 4, 5], [6, 7, 8], // Rows
    [0, 3, 6], [1, 4, 7], [2, 5, 8], // Columns
    [0, 4, 8], [2, 4, 6]             // Diagonals
];

function handleCellClick(e) {
    const clickedCell = e.target;
    const cellIndex = parseInt(clickedCell.getAttribute('data-index'));

    // Check if cell is already filled or game is over
    if (gameState[cellIndex] !== "" || !gameActive) return;

    // Update board and UI
    gameState[cellIndex] = currentPlayer;
    clickedCell.innerText = currentPlayer;
    
    // Add colors for flair
    clickedCell.style.color = currentPlayer === "X" ? "#ff6b6b" : "#1dd1a1";

    checkResult();
}

function checkResult() {
    let roundWon = false;

    for (let condition of winningConditions) {
        let a = gameState[condition[0]];
        let b = gameState[condition[1]];
        let c = gameState[condition[2]];

        if (a === "" || b === "" || c === "") continue;
        if (a === b && b === c) {
            roundWon = true;
            break;
        }
    }

    if (roundWon) {
        statusText.innerText = `Player ${currentPlayer} Wins! 🎉`;
        gameActive = false;
        return;
    }

    // Check for a Draw
    if (!gameState.includes("")) {
        statusText.innerText = "It's a Draw! 🤝";
        gameActive = false;
        return;
    }

    // Switch players: if current is X, change to O, else X
    currentPlayer = currentPlayer === "X" ? "O" : "X";
    statusText.innerText = `Player ${currentPlayer}'s Turn`;
}

function restartGame() {
    currentPlayer = "X";
    gameState = ["", "", "", "", "", "", "", "", ""];
    gameActive = true;
    statusText.innerText = "Player X's Turn";
    cells.forEach(cell => {
        cell.innerText = "";
        cell.style.color = "white";
    });
}

// Event Listeners
cells.forEach(cell => cell.addEventListener('click', handleCellClick));
resetBtn.addEventListener('click', restartGame);
