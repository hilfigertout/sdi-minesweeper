import GameContext from "./GameContext";
import { useState, useEffect, useContext } from "react";


const Timer = ({startTime, gameOver}) => {
  const [seconds, setSeconds] = useState(0);
  const [minutes, setMintues] = useState(0);

  useEffect(() => {
    setSeconds(Math.floor((Date.now() - startTime)/1000 % 60));
    setMintues(Math.floor((Date.now() - startTime)/1000/60))
    const interval = setInterval(() => {
      if (!gameOver) {
        setSeconds(Math.floor((Date.now() - startTime)/1000 % 60));
        setMintues(Math.floor((Date.now() - startTime)/1000/60))
      }
    }, 100);

    return () => clearInterval(interval);
  }, [startTime, gameOver])


  return (<div className="timer">Time: {`${minutes} : ${seconds}`}</div>)

}

const Header = () => {
  const [gameStatus, setGameStatus] = useContext(GameContext);
  const [startTime, setStartTime] = useState(Date.now());



  useEffect(() => {
    setStartTime(Date.now())
  }, [gameStatus.numMines, gameStatus.boardDimensions])


  let win = gameStatus.gameOver && gameStatus.playerAlive;
  let lose = gameStatus.gameOver && !gameStatus.playerAlive;

  return (
    <div className={`header ${win ? "header-win": ""} ${lose ? "header-lose" : ""}`}>
      <div className="new-game">
        <h3>Start a New Game</h3>
        <button onClick={() => setGameStatus({gameOver: false, playerAlive: true, numMines: 10, boardDimensions: [10, 10]})}>Easy</button>
        <button onClick={() => setGameStatus({gameOver: false, playerAlive: true, numMines: 20, boardDimensions: [12, 12]})}>Medium</button>
        <button onClick={() => setGameStatus({gameOver: false, playerAlive: true, numMines: 40, boardDimensions: [15, 15]})}>Hard</button>
      </div>
      <div className="header-content">
        <h1>Minesweeper</h1>
        <h2 style={{visibility: (win || lose) ? "visible" : "hidden"}}> {win ? 'Congratulations! You won!' : 'Game Over' }</h2>
        <Timer startTime={startTime} gameOver={gameStatus.gameOver} />
      </div>
      <div className="explanations">
        <p>Easy: 10x10, 10 mines</p>
        <p>Medium: 12x12, 20 mines</p>
        <p>Hard: 15x15, 40 mines</p>
      </div>
    </div>
    );
}
 
export default Header;