class Board {
    constructor (numberOfRows, numberOfColumns, numberOfBombs) {
        this._numberOfBombs = numberOfBombs;
        this._numberOfTiles = numberOfRows*numberOfColumns;
        this._playerBoard = generatePlayerBoard(numberOfRows, numberOfColumns);
        this._bombBoard = generateBombBoard(numberOfRows, numberOfColumns, numberOfBombs);
    }

    get playerBoard() {
        return this._playerBoard;
    }

    //переворачивает плитку и считает сколько бомб рядом по периметру
    flipTile(rowIndex, columnIndex) {
        if (this._playerBoard[rowIndex][columnIndex] !== ' ') {
          console.log('Already flipped that tile!');
          return;
        } else if (this._bombBoard[rowIndex][columnIndex] === 'B') {
            this._playerBoard[rowIndex][columnIndex] = 'B';
        } else {
            this._playerBoard[rowIndex][columnIndex] = this.getNumberOfNeighborBombs(this._bombBoard, rowIndex, columnIndex);
        }
        this._numberOfTiles--;
    }

    //получает количество бомб на соседних клетках
    getNumberOfNeighborBombs(rowIndex, columnIndex) {
        const neighborOffsets = [
          [-1, -1],
          [-1, 0],
          [-1, 1],
          [0, -1],
          [0, 1],
          [1, -1],
          [1, 0],
          [1, 1]
        ];
        const numberOfRows = this._bombBoard.length;
        const numberOfColumns = this._bombBoard[0].length;
      
        let numberOfBombs = 0;
      
        neighborOffsets.forEach(offset => {
          const neighborRowIndex = rowIndex + offset[0];
          const neighborColumnIndex = columnIndex + offset[1];
          if (neighborRowIndex >= 0 && neighborRowIndex < numberOfRows &&
              neighborColumnIndex >= 0 && neighborColumnIndex < numberOfColumns) {
            if (bombBoard[neighborRowIndex][neighborColumnIndex] === 'B') {
              numberOfBombs++;
            }
          }
        });
        return numberOfBombs;
    }

    //проверяет если количество ост. плиток равно количеству бомб - то игрок выиграл
    hasSafeTiles() {
        return this._numberOfTiles !== this._numberOfBombs; 

    }

    //печатает два поля: поле игрока и поле бомб
    print()  {
        console.log(this._playerBoard.map(row => row.join(' | ')).join('\n'));
        console.log(this._bombBoard.map(row => row.join(' | ')).join('\n'));
    }

    //генерирует поле игрока
    static generatePlayerBoard (numberOfRows, numberOfColumns) {
        const board = [];
        for (let i = 0; i < numberOfRows; i++) {
            const row = [];
            for (let j = 0; j < numberOfColumns; j++) {
                row.push(' ');
            }
            board.push(row);
        }
        return board;
    }

    //генерирует поле с бомбами
    static generateBombBoard(numberOfRows, numberOfColumns, numberOfBombs) {
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
    }

    
};




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

//генерация поля игрока и поля бомб
//let playerBoard = generatePlayerBoard(3, 3);
//et bombBoard = generateBombBoard(3, 3, 3);

//вывод результатов в консоль
//console.log('Player Board:');
//printBoard(playerBoard);
//console.log('Bomb Board:');
//printBoard(bombBoard);

//flipTile(playerBoard, bombBoard, 0, 0);
//console.log('Updated Player Board:');
//printBoard(playerBoard);
