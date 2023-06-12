import Square from "./Square";
import {useReducer, useState} from 'react';
import HelperFunctions from "./helperfunctions";

const GameBoard = ({boardMatrix, boardDimensions}) => {

  const [gameOver, setGameOver] = useState(false)

  
  
  const clickSpace = (state, action) => {
    let newState = structuredClone(state);
    let x = action.x;
    let y = action.y;
    newState[y][x] = 1;
    return newState;
  }
  const [clickedBoard, clickedBoardDispatch] = useReducer(clickSpace, boardDimensions, HelperFunctions.generateBlank);


  const handleClick = (x, y, clickedSquares) => {
    if (!gameOver) {
      clickedBoardDispatch({type: 'click', x, y})
      if (boardMatrix[y][x] === 'X') {
        setGameOver(true);
      } else {
        let minesAround = boardMatrix[y][x];
        if (minesAround === 0) {
          debugger;
          const coordsAround = HelperFunctions.getCoordinatesAround(x, y, boardMatrix);
          
          let unclickedCoordsAround = coordsAround.filter((coordinate) => !(clickedSquares.find((clickedCoord) => JSON.stringify(clickedCoord) === JSON.stringify(coordinate))));
          unclickedCoordsAround.forEach((coordinate) => handleClick(coordinate[0], coordinate[1], [...clickedSquares, [x, y]]));
        }
      }
    }
  }
  
  return ( 
  <div className="game-board">
    {boardMatrix.length > 0 && boardMatrix.map((row, y) => 
      <div className="row" key={y}>{
        row.map((squareState, x) => 
          <Square 
            key={x} 
            x={x} 
            y={y} 
            squareValue={squareState}
            clicked={clickedBoard[y][x]}
            handleClick={handleClick}/>)
      }</div>
    )}
  </div> 
  );
}
 
export default GameBoard;



