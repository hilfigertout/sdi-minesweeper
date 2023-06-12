import './App.css';
import GameBoard from './GameBoard';
import Header from './Header';
import HelperFunctions from './helperfunctions'

function App() {

  const boardDimensions = [10, 10];
  const numMines = 10;

  const boardMatrix = HelperFunctions.generateBoard(boardDimensions, numMines);


  return (
    <div className="App">
      <Header />

      <GameBoard boardMatrix={boardMatrix} boardDimensions={boardDimensions} />
    </div>
  );
}





export default App;
