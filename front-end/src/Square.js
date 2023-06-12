import {useState, useEffect, useContext} from "react";
import GameContext from "./GameContext";

const Square = ({x, y, squareValue, clicked, handleClick}) => {

  const [gameStatus] = useContext(GameContext);
  let {gameOver, playerAlive, numMines} = gameStatus;
  const [flag, setFlag] = useState(false)

  useEffect(() => {
    if (!gameOver) {
      setFlag(false);
    } 
  }, [gameOver, numMines])

  return (
    <div className={clicked ? `square-clicked ${squareValue==='X'? "mine-square": "num-square"}` : "square"} 
      onClick={() => {if (!flag) {handleClick(x, y)}}} 
      onContextMenu={(e) => {e.preventDefault(); if(!clicked) {setFlag(!flag)}}}
      >
      {clicked 
      ? 
      (squareValue === 'X' ? '💣' : squareValue)
      : 
        (flag 
        ?
        "🚩"
        :
        ""
        )
      }
    </div>
  )
}

export default Square;