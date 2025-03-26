class Game {
    constructor() {
        this.currentPlayer = 'X';
        this.board = new Board(this.handleCellClick.bind(this));
        this.statusElement = document.getElementById('status');
        this.board.showBoard();
        this.updateStatus();
    }

    handleCellClick(index) {
        console.log(`Cell ${index} clicked`);

        if (this.board.cells[index]) {
            return;
        }

        this.board.cells[index] = this.currentPlayer; //update state

        const cellElement = this.board.boardElement.querySelector(`[data-index="${index}"]`); 
        cellElement.textContent = this.currentPlayer; //update UI

        this.currentPlayer = this.currentPlayer === 'X' ? 'O' : 'X';
        this.updateStatus();
    }

    updateStatus() {
        this.statusElement.textContent = `Player ${this.currentPlayer}'s Turn`;
    }
}

class Board {
    constructor(onCellClick){
        this.boardElement = document.getElementById('board');
        this.cells = Array(9).fill(null);
        this.onCellClick = onCellClick;
    }

    showBoard(){
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