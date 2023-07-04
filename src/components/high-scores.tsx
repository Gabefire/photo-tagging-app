import {
  getFirestore,
  addDoc,
  getDocs,
  collection,
  doc,
} from "firebase/firestore";
import { getAuth } from "firebase/auth";
import React, { useEffect, useState } from "react";
import { time } from "console";
import "./high-scores.css";

interface highScoreType {
  user: string;
  time: number;
}

export default function HighScores(props: { time: number; app: any }) {
  const [highScoreArray, setHighScoreArray] = useState([] as highScoreType[]);

  useEffect(() => {
    const auth = getAuth(props.app);
    const db = getFirestore(props.app);
    let user: string | null | undefined;
    if (
      auth.currentUser?.isAnonymous ||
      auth.currentUser?.displayName === null
    ) {
      user = "Anonymous User";
    } else if (typeof auth.currentUser?.displayName === "string") {
      user = auth.currentUser?.displayName;
    }
    const userData = { user: user, time: props.time };
    const addUserTime = async () => {
      try {
        await addDoc(collection(db, `high-scores`), userData);
      } catch (e) {
        console.log(e);
      }
    };
    addUserTime();
    const getHighScoresObjects = async () => {
      const tempHighScoreArray: highScoreType[] = [];
      try {
        const highScoresObjects = await getDocs(collection(db, "high-scores"));
        highScoresObjects.forEach((doc: any) => {
          tempHighScoreArray.push(doc.data());
        });
        tempHighScoreArray.sort((a, b) => {
          if (a.time > b.time) {
            return 1;
          } else {
            return -1;
          }
        });
        console.log(tempHighScoreArray);
        setHighScoreArray(tempHighScoreArray.slice(0, 10));
      } catch (e) {
        console.log(e);
      }
    };
    getHighScoresObjects();
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
