//эта функция генерирует поле для пользователя
const generatePlayerBoard = (numberOfRows, numberOfColumns) => {
    const board = [];           
    for (let i = 0; i < numberOfRows; i++) {
        const row = [];        
        for (let j = 0; j < numberOfColumns; j++) {
            row.push(' ');                                 
        }        
        board.push(row);
    }
    return board;
};

//эта функция генерирует поле бомб
const generateBombBoard = (numberOfRows, numberOfColumns, numberOfBombs) => {
    const board = [];           
    for (let i = 0; i < numberOfRows; i++) {
        const row = [];
        for (let j = 0; j < numberOfColumns; j++) {
            row.push(null);                                 
        }        
        board.push(row);
    }

    let numberOfBombsPlaced = 0;
    while (numberOfBombsPlaced < numberOfBombs) {
        const randomRowIndex = Math.floor(Math.random()*numberOfRows);
        const randomColumnIndex = Math.floor(Math.random()*numberOfColumns);
        if (board[randomRowIndex][randomColumnIndex] !== 'B') {
            board[randomRowIndex][randomColumnIndex] = 'B';
            numberOfBombsPlaced++; 
        }       
    }
    return board;
};

//получается количество бомб перевернутой плитки
const getNumberOfNeighborBombs = (bombBoard, rowIndex, columnIndex) => {
    const neighborOffsets = [
        [-1, -1], 
        [-1, 0],
        [-1, 1],
        [0, -1], 
        [0, 1], 
        [1, -1], 
        [1, 0], 
        [1, 1], 
    ];

    const numberOfRows = bombBoard.length;
    let numberOfBombs = 0;

    neighborOffsets.forEach(offset => {
        const neighborRowIndex = rowIndex + offset[0];
        const neighborColumnIndex = columnIndex + offset[1];
        if (neighborRowIndex >= 0 && neighborRowIndex < numberOfRows && neighborColumnIndex >= 0 && neighborColumnIndex < bombBoard[0].length()) {
            if (bombBoard[neighborRowIndex][neighborColumnIndex] === 'B') {
                numberOfBombs++;
            };
        };
        return numberOfBombs;        
    });

};

//переворачивает плитку
const flipTile = (playerBoard, bombBoard, rowIndex, columnIndex) => {
    if (playerBoard[rowIndex][columnIndex] !== ' ') {
        console.log('This tile has already been flipped!');
        return;
    };

    if (bombBoard[rowIndex][columnIndex] === 'B') {
        playerBoard[rowIndex][columnIndex] = 'B';       
    } else {
        playerBoard[rowIndex][columnIndex] = getNumberOfNeighborBombs(bombBoard,rowIndex,columnIndex);
    };
};

//эта функция печатает заданное поле
const printBoard = board => {
    console.log(board.map(row => row.join(' | ')).join('\n')); 
};

//генерация поля игрока и поля бомб
let playerBoard = generatePlayerBoard(3, 3);
let bombBoard = generateBombBoard(3, 3, 3);

//вывод результатов в консоль
console.log('Player Board:');
printBoard(playerBoard);
console.log('Bomb Board:');
printBoard(bombBoard);

flipTile(playerBoard, bombBoard, 0, 0);
console.log('Updated Player Board:');
printBoard(playerBoard);






