const PastGames = ({pastGames}) => {
  
  
  return (
    <div className="past-games-list">
      <h3>Past Games:</h3>
      {pastGames.map((game, index) => 
        <div key={index}>{`Difficulty: ${game.difficulty}, Time: ${game.time}`}</div>
      )}
    </div>
    );
}
 
export default PastGames;