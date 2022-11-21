const X_CLASS = 'x'
const CIRCLE_CLASS = 'circle'
const WINNING_COMBINATIONS = [
                                [0, 1, 2],
                                [3, 4, 5],
                                [6, 7, 8],
                                [0, 3 ,6],
                                [1, 4, 7],
                                [2, 5, 8],
                                [0, 4, 8],
                                [2, 4, 6]
                            ];
const cells = document.getElementsByClassName('cell')
const board = document.getElementById('board')
const message = document.getElementById('message')
/*using querySelector*/
const winningMessageText = document.querySelector('[winning_message]')
const replay = document.getElementById('replay')
const restart = document.getElementById('restart')
let circleTurn = false

document.addEventListener("DOMContentLoaded", load);

function load() {
    startGame()
    restart.addEventListener('click', startGame)
    replay.addEventListener('click', startGame)
}

function startGame() {
    // adds an one time click event to each cell
    for(const cell of cells)
    {
        cell.classList.remove(X_CLASS)
        cell.classList.remove(CIRCLE_CLASS)
        cell.removeEventListener('click', handleClick)
        cell.addEventListener('click', handleClick, { once: true } )
    }
    circleTurn = false;
    setBoardHoverClass();
    message.style.display = 'none'
}

function handleClick(e) {
    const cell = e.target;
    const currentClass = circleTurn ? CIRCLE_CLASS : X_CLASS;
    // place mark
    cell.classList.add(currentClass)

    if (checkWin(currentClass)) {
        endGame(false)
    }
    else if (isDraw()){
        endGame(true)
    }
    else {
        // swap turn
        circleTurn = !circleTurn
        setBoardHoverClass()
    }
}

function endGame(draw) {
    if (draw) {
        winningMessageText.innerHTML = `Draw!`
        message.style.display = 'flex'
    }
    else {
        winningMessageText.innerHTML = `${circleTurn ? "O " : "X "} wins!`
        message.style.display = 'flex'
    }
}

/* destructuring cells */
function isDraw() {
    return [...cells].every(cell => {
        return cell.classList.contains(X_CLASS) || cell.classList.contains(CIRCLE_CLASS)
    })
}

function setBoardHoverClass() {
    if (circleTurn) {         
        board.classList.remove(X_CLASS)
        board.classList.add(CIRCLE_CLASS)     
    }
    else{  
        board.classList.remove(CIRCLE_CLASS)
        board.classList.add(X_CLASS)
    }
}

function checkWin(currentClass) {
   return WINNING_COMBINATIONS.some(combination => {
    return combination.every(index => {
        return cells[index].classList.contains(currentClass)
    })
   })
}
