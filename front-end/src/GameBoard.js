import Square from "./Square";
import {useState, useEffect, useContext} from 'react';
import HelperFunctions from "./helperfunctions";
import GameContext from "./GameContext";

const GameBoard = ({boardMatrix}) => {

  const [gameStatus, setGameStatus] = useContext(GameContext);

  let {gameOver, playerAlive, numMines, boardDimensions} = gameStatus;
  const [clickedBoard, setClickedBoard] = useState(HelperFunctions.generateBlank(boardDimensions));

  useEffect(() => {
    setClickedBoard(HelperFunctions.generateBlank(boardDimensions))
  }, [boardDimensions])

  const handleClick = (x, y) => {
    if (!gameOver) {
      let newBoard = structuredClone(clickedBoard);
      newBoard[y][x] = 1;
      setClickedBoard(newBoard)
      if (boardMatrix[y][x] === 'X') {
        setGameStatus({...gameStatus, gameOver: true, playerAlive: false})
      } else {
        let minesAround = boardMatrix[y][x];
        if (minesAround === 0) {
          newBoard = HelperFunctions.revealZeros(x,y, newBoard, boardMatrix);
        }
      }
      let numSpacesLeft = newBoard.reduce((sum, row) => {
        return sum + row.reduce((rowSum, clicked) => {
          return clicked === 0 ? rowSum + 1: rowSum;
        }, 0)
      }, 0)
      if (numSpacesLeft === numMines) {
        setGameStatus({...gameStatus, gameOver: true, playerAlive: (boardMatrix[y][x] !== 'X')})
      }
      setClickedBoard(newBoard);
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



