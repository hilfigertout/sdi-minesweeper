import './App.css';
import GameBoard from './GameBoard';
import Header from './Header';
import HelperFunctions from './helperfunctions'
import GameContext from './GameContext';
import { useState, useEffect } from 'react';

function App() {

  const [gameStatus, setGameStatus] = useState({gameOver: false, playerAlive: true, numMines: 10, boardDimensions: [10, 10]});
  const [boardMatrix, setBoardMatrix] = useState(HelperFunctions.generateBoard(gameStatus.boardDimensions, gameStatus.numMines));

  useEffect(() => {
    setBoardMatrix(HelperFunctions.generateBoard(gameStatus.boardDimensions, gameStatus.numMines))
  }, [gameStatus.boardDimensions, gameStatus.numMines])

  return (
    <div className="App">
      <GameContext.Provider value={[gameStatus, setGameStatus]} >
        <Header />
        <GameBoard boardMatrix={boardMatrix} />
      </GameContext.Provider>
    </div>
  );
}





export default App;
