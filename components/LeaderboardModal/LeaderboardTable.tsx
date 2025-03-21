import { useGame } from '@/context/GameContext';

export default function LeaderboardTable() {
  const { leaderboardData, isLoading } = useGame();

  return (
    <div className="leaderboard-table-container">
      <table className="leaderboard-table">
        <thead>
          <tr>
            <th className="rank-column">Rank</th>
            <th className="name-column">Player</th>
            <th className="score-column">Score</th>
          </tr>
        </thead>
        <tbody>
          {isLoading ? (
            <tr>
              <td colSpan={3} className="loading-data">
                <div className="loading-spinner"></div>
                <p>Loading leaderboard data...</p>
              </td>
            </tr>
          ) : (
            <>
              {leaderboardData.map((entry, index) => (
                <tr key={`${entry.name}-${index}`} className={index % 2 === 0 ? 'row-even' : 'row-odd'}>
                  <td className="rank-column">{index + 1}</td>
                  <td className="name-column">{entry.name}</td>
                  <td className="score-column">{entry.score.toLocaleString()}</td>
                </tr>
              ))}
              {leaderboardData.length === 0 && (
                <tr>
                  <td colSpan={3} className="no-data">No leaderboard entries yet</td>
                </tr>
              )}
            </>
          )}
        </tbody>
      </table>
    </div>
  );
}
