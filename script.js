class Game {
    constructor() {
        this.currentPlayer = 'X';
        this.board = new Board(this.handleCellClick.bind(this));
        this.statusElement = document.getElementById('status');
        this.board.showBoard();
        this.updateStatus();
        this.restartButton = document.getElementById('restartBtn');
        this.restartButton.addEventListener('click', () => this.restart());
        this.gameOver = false;
    }

    handleCellClick(index) {
        if (this.gameOver) {
            return;
          }

        console.log(`Cell ${index} clicked`); //just for checking if cells clicks work 

        if (this.board.cells[index]) {
            return;
        }

        this.board.cells[index] = this.currentPlayer; //update state

        const cellElement = this.board.boardElement.querySelector(`[data-index="${index}"]`);
        cellElement.textContent = this.currentPlayer; //update UI
        cellElement.classList.add('taken');

        const winner = this.checkWinner();
        if (winner) {
            this.statusElement.textContent = `Player ${winner} wins!`;
            this.gameOver = true;
            return;
        }

        if (!this.board.cells.includes(null)) {
            this.statusElement.textContent = `It's a draw!`;
            this.gameOver = true;
            return;
        }

        this.currentPlayer = this.currentPlayer === 'X' ? 'O' : 'X';
        this.updateStatus();
    }

    updateStatus() {
        this.statusElement.textContent = `Player ${this.currentPlayer}'s Turn`;
    }

    checkWinner() {
        const winCombos = [
            [0, 1, 2], [3, 4, 5], [6, 7, 8], //rows
            [0, 3, 6], [1, 4, 7], [2, 5, 8], //columns
            [0, 4, 8], [2, 4, 6] //diagonals
        ]

        for (let combo of winCombos) {
            const [a, b, c] = combo;
            const cellA = this.board.cells[a];
            const cellB = this.board.cells[b];
            const cellC = this.board.cells[c];

            if (cellA && cellA === cellB && cellB === cellC) {
                return cellA;
            }
        }

        return null;
    }

    restart() {
        this.board.cells = Array(9).fill(null); //reset logic
        this.board.showBoard(); //reload UI
        this.currentPlayer = 'X'; //reset player back to player X
        this.updateStatus(); //reset message
        this.gameOver = false;
    }
}

class Board {
    constructor(onCellClick) {
        this.boardElement = document.getElementById('board');
        this.cells = Array(9).fill(null);
        this.onCellClick = onCellClick;
    }

    showBoard() {
        this.boardElement.innerHTML = '';

        this.cells.forEach((_, index) => {
            const cell = document.createElement('div');
            cell.classList.add('cell');
            cell.dataset.index = index;
            this.boardElement.appendChild(cell);
            cell.addEventListener('click', () => {
                if (this.onCellClick) {
                    this.onCellClick(index);
                }
            });
        });
    }
}

const game = new Game();