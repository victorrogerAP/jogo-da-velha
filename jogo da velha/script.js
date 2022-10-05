const cellElements = document.querySelectorAll("[data-cell]");
const board = document.querySelector("[data-board]");
const winningMessageTextElement = document.querySelector("[data-winning-message-text]")
const winningMessage = document.querySelector("[data-winning-message]")
const restatButton = document.querySelector("[date-restat-button]")

let isCircleTurn; 

const winningCombinations = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
];

const startGame = () =>{
    isCircleTurn = false;

    for (const cell of cellElements) {
        cell.classList.remove("circle");
        cell.classList.remove("x");
        cell.removeEventListener("click", handleClick)
        cell.addEventListener("click", handleClick, { once: true});
    }

    steBoardHoverClass();
    winningMessage.classList.remove("show-winning-message");
};

const endGame = (isDraw) => {
    if (isDraw) {
        winningMessageTextElement.innerText = 'Empate!'
    } else{
        winningMessageTextElement.innerText = isCircleTurn 
        ? "Cículo Venceu!" 
        : "X Venceu!";

    }

    winningMessage.classList.add("show-winning-message");

};

const checkforwin = (currentPlayer) => {
    return winningCombinations.some(combination => {
        return combination.every((index) => {
            return cellElements[index].classList.contains(currentPlayer);
        });
    });

};

const checkforDraw = () => {
    return [...cellElements].every(cell => {
        return cell.classList.contains("x") || cell.classList.contains("circle");
    });
};

const placeMark = (cell, ClasstoAdd) => {
    cell.classList.add(ClasstoAdd);
};
const steBoardHoverClass = () => {
    
    board.classList.remove('circle')
    board.classList.remove('x')

    if (isCircleTurn) {
        board.classList.add("circle");
    } else{
        board.classList.add("x");
    }
}

const swapTurns = () => {
    isCircleTurn = !isCircleTurn;

    steBoardHoverClass();
}

const handleClick = (e) => {
    //Colocar a marca (x ou circulo)

    const cell = e.target;
    const ClasstoAdd = isCircleTurn ? 'circle' : 'x';

    placeMark(cell, ClasstoAdd);

    // Verificar vitoria
    const isWin = checkforwin(ClasstoAdd);
    //Verificar por empate
    const isDraw = checkforDraw();
    if (isWin) {
        endGame(false);
    } else if (isDraw){
        endGame(true)
    }else {
        //Mudar simbolo
        swapTurns();
    }

};

startGame();
restatButton.addEventListener("click", startGame);