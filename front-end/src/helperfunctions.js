class HelperFunctions {
  
  //Generates a blank minesweeper board with dimensions boardDimensions and numMines mines. 
  //Mines are represented as an 'X'. All other spaces contain the number of mines adjacent to them.
  static generateBoard(boardDimensions, numMines) {
    const mineLocations = [];
    while (mineLocations.length < numMines) {
      let position = Math.floor(Math.random() * (boardDimensions[0]*boardDimensions[1])) + 1;
      if (mineLocations.indexOf(position) === -1) {
        mineLocations.push(position);
      }
    }
    //Place mines
    const boardMatrix = [];
    for (let i = 0; i < boardDimensions[0]; i++) {
      boardMatrix.push([]);
      for (let j = 0; j < boardDimensions[1]; j++) {
        if (mineLocations.includes(boardDimensions[0] * i + j)) {
          boardMatrix[i].push('X');
        } else {
          boardMatrix[i].push(0)
        }
      }
    }
    //Compute numbers of mines adjacent to each square
    for (let i = 0; i < boardDimensions[0]; i++) {
      for (let j = 0; j < boardDimensions[1]; j++) {
        if (boardMatrix[i][j] !== 'X') {
          let coordsAround = this.getCoordinatesAround(j, i, boardMatrix);
          let numMinesAround = coordsAround.reduce((sumMines, coordinate) => {
            let cX = coordinate[0];
            let cY = coordinate[1];
            return (boardMatrix[cY][cX] === 'X' ? sumMines + 1 : sumMines); 
          }, 0)
          boardMatrix[i][j] = numMinesAround;
        }
      }
    }

    return boardMatrix;
  }

//Generate blank board
  static generateBlank(boardDimensions) {
  const blankMatrix = [];
  for (let i = 0; i < boardDimensions[0]; i++) {
    blankMatrix.push([]);
    for (let j = 0; j < boardDimensions[1]; j++) {
        blankMatrix[i].push(0)
      }
    }
    return blankMatrix;
}

//Returns an array of all coordinates in the 8 squares around [x, y]. Accounts for corners and edges.
//It's not elegant, but it'll work.
  static getCoordinatesAround(x, y, boardMatrix) {
  const coords = []
  if (y === 0) {
    if (x === 0) {
      coords.push([x + 1, y], [x, y + 1], [x + 1, y + 1]);
    } else if (x === boardMatrix[y].length - 1) {
      coords.push([x - 1, y], [x, y + 1], [x - 1, y + 1]);
    } else {
      coords.push([x - 1, y], [x + 1, y], [x - 1, y + 1], [x, y + 1], [x + 1, y + 1]);
    }
  } else if (y === boardMatrix.length - 1) {
    if (x === 0) {
      coords.push([x + 1, y], [x, y - 1], [x + 1, y - 1]);
    } else if (x === boardMatrix[y].length - 1) {
      coords.push([x - 1, y], [x, y - 1], [x - 1, y - 1]);
    } else {
      coords.push([x - 1, y], [x + 1, y], [x - 1, y - 1], [x, y - 1], [x + 1, y - 1]);
    }
  } else {
    if (x === 0) {
      coords.push([x, y - 1], [x, y + 1], [x + 1, y - 1], [x + 1, y], [x + 1, y + 1]);
    } else if (x === boardMatrix[y].length - 1) {
      coords.push([x, y - 1], [x, y + 1], [x - 1, y - 1], [x - 1, y], [x - 1, y + 1]);
    } else {
      coords.push([x - 1, y - 1], [x, y - 1], [x + 1, y - 1], [x - 1, y], [x + 1, y], [x - 1, y + 1], [x, y + 1], [x + 1 , y + 1]);
    }
  }
  return coords;

}

}


export default HelperFunctions;