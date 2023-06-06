const cellsStatus = ['', '', '', '', '', '', '', '', '']
const cells = document.querySelectorAll('.rowboard div');
let count;
let cellX;
let cellO;
const comWin = [
    [0,1,2],
    [3,4,5],
    [6,7,8],
    [0,3,6],
    [1,4,7],
    [2,5,8],
    [0,4,8],
    [2,4,6]
]

function checkWin(player) {
    return comWin.some(combination => {
        return combination.every(index => cellsStatus[index] === player);
    });
}

function playerHasWon(player) {
    if (checkWin(player)) {
        alert(player + ' has won!');
        resetGame();
    } else if (cellsStatus.every(cell => cell !== '')) {
        alert('The game is a draw!');
        resetGame();
    }
}

function resetGame() {
    cellsStatus.fill('');
    cells.forEach(cell => {
        cell.innerText = '';
    });
}

cells.forEach(cell => {
    cell.addEventListener('click', function() {
        if(cell.innerText === '') {
            const luot = document.getElementById('luot')
            let luotChoi = luot.innerText
            const idCell = cell.id;
            console.log(idCell)
            if(luotChoi === 'X' ) {
                luot.innerText = 'O'
            }
            else {
                luot.innerText = 'X'
            }
            cell.innerText = luotChoi
            cellsStatus[idCell] = luotChoi
            playerHasWon(luotChoi);
            console.log(cellsStatus);
            
        }
    })
})