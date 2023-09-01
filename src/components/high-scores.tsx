import React, { useEffect, useState } from "react";
import { time } from "console";
import "./high-scores.css";

interface highScoresType {
  time: number;
}

export default function HighScores({ time }: highScoresType) {
  const [highScoreArray, setHighScoreArray] = useState(
    [] as { user: string; time: number }[]
  );

  useEffect(() => {
    // api to get highscores
  }, []);

  // todo expand upon this refresh function
  function refreshPage(e: React.MouseEvent<HTMLElement>) {
    e.preventDefault();
    window.location.reload();
  }

  return (
    <div id="game-over" className="pop-up">
      <h3 id="high-score-title">High Scores</h3>
      {highScoreArray.map((user, index) => {
        return (
          <div className="user-container" key={`${user.user}-${index}`}>
            <div>{`${index + 1}`}</div>
            <div id="user-name">{user.user}</div>
            <div>
              {/* mins */}
              <span>
                {("0" + Math.floor((user.time / 60000) % 60)).slice(-2)}:
              </span>
              {/* seconds */}
              <span>
                {("0" + Math.floor((user.time / 1000) % 60)).slice(-2)}:
              </span>
              {/* milliseconds */}
              <span>{("0" + ((user.time / 10) % 100)).slice(-2)}</span>
            </div>
          </div>
        );
      })}
      <button className="play-again" onClick={refreshPage}>
        Play Again
      </button>
    </div>
  );
}
