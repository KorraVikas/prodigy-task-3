document.addEventListener('DOMContentLoaded', () => {
    const board = document.getElementById('board');
    const cells = []; 
    let currentPlayer = 'X';
    let gameStatus = 'active';

    for (let i = 0; i < 9; i++) {
        const cell = document.createElement('div');
        cell.classList.add('cell');
        cell.id = i;
        cell.addEventListener('click', () => handleMove(cell));
        board.appendChild(cell);
        cells.push(cell);
    }

    const restartButton = document.getElementById('restart-btn');
    restartButton.addEventListener('click', resetGame);

    function handleMove(cell) {
        if (cell.innerText || gameStatus !== 'active') return; 
        cell.innerText = currentPlayer;
        cell.classList.add(currentPlayer); 
        if (checkWin()) {
            gameStatus = 'inactive';
            setTimeout(() => {
                alert(`${currentPlayer} wins!`);
                resetGame();
            }, 100);
        } else if (checkDraw()) {
            gameStatus = 'inactive';
            setTimeout(() => {
                alert("It's a draw!");
                resetGame();
            }, 100);
        } else {
            currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
        }
    }

    function checkWin() {
        for (let i = 0; i < 3; i++) {
            if (cells[i * 3].innerText !== '' &&
                cells[i * 3].innerText === cells[i * 3 + 1].innerText &&
                cells[i * 3].innerText === cells[i * 3 + 2].innerText) {
                return true;
            }
        }
        for (let i = 0; i < 3; i++) {
            if (cells[i].innerText !== '' &&
                cells[i].innerText === cells[i + 3].innerText &&
                cells[i].innerText === cells[i + 6].innerText) {
                return true;
            }
        }
        if (cells[0].innerText !== '' &&
            cells[0].innerText === cells[4].innerText &&
            cells[0].innerText === cells[8].innerText) {
            return true;
        }
        if (cells[2].innerText !== '' &&
            cells[2].innerText === cells[4].innerText &&
            cells[2].innerText === cells[6].innerText) {
            return true;
        }
        return false;
    }

    function checkDraw() {
        for (let cell of cells) {
            if (cell.innerText === '') {
                return false;
            }
        }
        return true;
    }

    function resetGame() {
        cells.forEach(cell => {
            cell.innerText = '';
            cell.classList.remove('X', 'O');
        });
        currentPlayer = 'X';
        gameStatus = 'active';
    }
});
