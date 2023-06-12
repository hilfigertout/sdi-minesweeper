import './App.css';
import GameBoard from './GameBoard';
import Header from './Header';
import HelperFunctions from './helperfunctions'
import GameContext from './GameContext';
import { useState, useEffect } from 'react';
import useLocalStorageState from './useLocalStorageState';
import PastGames from './PastGames';

function App() {

  const [gameStatus, setGameStatus] = useState({gameOver: false, playerAlive: true, numMines: 10, boardDimensions: [10, 10]});
  const [boardMatrix, setBoardMatrix] = useState(HelperFunctions.generateBoard(gameStatus.boardDimensions, gameStatus.numMines));
  const [pastGames, setPastGames] = useLocalStorageState([], "pastGames");

  useEffect(() => {
    setBoardMatrix(HelperFunctions.generateBoard(gameStatus.boardDimensions, gameStatus.numMines))
  }, [gameStatus.boardDimensions, gameStatus.numMines])

  return (
    <div className="App">
      <GameContext.Provider value={[gameStatus, setGameStatus]} >
        <Header pastGames = {pastGames} setPastGames={setPastGames}/>
        <GameBoard boardMatrix={boardMatrix} />
        <PastGames pastGames={pastGames}/>
      </GameContext.Provider>
    </div>
  );
}





export default App;
