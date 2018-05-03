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
        //проверка на наличие бомбы в этой клетке
        board[randomRowIndex][randomColumnIndex] = 'B';
        numberOfBombsPlaced++;        
    }
    return board;
};

//эта функция печатает заданное поле
const printBoard = board => {
    console.log(board.map(row => row.join(' | ')).join('\n')); 
};

//генерация поля игрока и поля бомб
let playerBoard = generatePlayerBoard(5, 5);
let bombBoard = generateBombBoard(5, 5, 10);

//вывод результатов в консоль
console.log('Player Board:');
printBoard(playerBoard);
console.log('Bomb Board:');
printBoard(bombBoard);






