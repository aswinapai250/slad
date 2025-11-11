const gameBoard = document.querySelector('.game-board');
const rollDiceBtn = document.getElementById('roll-dice');
const diceResult = document.getElementById('dice-result');
const playerPositionDiv = document.getElementById('player-position');

const snakes = {
    16: 6,
    47: 26,
    49: 11,
    56: 53,
    62: 19,
    64: 60,
    87: 24,
    93: 73,
    95: 75,
    98: 78
};

const ladders = {
    1: 38,
    4: 14,
    9: 31,
    21: 42,
    28: 84,
    36: 44,
    51: 67,
    71: 91,
    80: 100
};

let playerPosition = 1;
let player;

function createBoard() {
    for (let i = 100; i > 0; i--) {
        const square = document.createElement('div');
        square.classList.add('square');
        square.id = `square-${i}`;
        square.textContent = i;

        if (snakes[i]) {
            square.classList.add('snake');
        } else if (ladders[i]) {
            square.classList.add('ladder');
        }

        gameBoard.appendChild(square);
    }
    createPlayer();
}

function createPlayer() {
    player = document.createElement('div');
    player.classList.add('player');
    movePlayer();
}

function movePlayer() {
    const currentSquare = document.getElementById(`square-${playerPosition}`);
    currentSquare.appendChild(player);
    playerPositionDiv.textContent = `Player is at position: ${playerPosition}`;
}

function rollDice() {
    const roll = Math.floor(Math.random() * 6) + 1;
    diceResult.textContent = `Dice rolled: ${roll}`;

    let newPosition = playerPosition + roll;

    if (newPosition > 100) {
        newPosition = playerPosition;
    }

    if (snakes[newPosition]) {
        newPosition = snakes[newPosition];
    } else if (ladders[newPosition]) {
        newPosition = ladders[newPosition];
    }

    playerPosition = newPosition;
    movePlayer();

    if (playerPosition === 100) {
        setTimeout(() => {
            alert('You won!');
            resetGame();
        }, 500);
    }
}

function resetGame() {
    playerPosition = 1;
    movePlayer();
    diceResult.textContent = '';
}

rollDiceBtn.addEventListener('click', rollDice);

createBoard();