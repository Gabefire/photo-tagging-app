import React, { useState } from "react";
import Instructions from "./instructions";
import HighScores from "./high-scores";
import "./main.css";

const background = require("../assets/photo-tag.jpg");

interface mainType {
  makeTarget: any;
  time: number;
  startTimer: any;
  gameOver: boolean;
  status: string;
}

export default function Main({
  makeTarget,
  time,
  startTimer,
  gameOver,
  status,
}: mainType) {
  const [showInstructions, setShowInstructions] = useState(true);

  const startGame = (e: React.PointerEvent<HTMLElement>) => {
    e.preventDefault();
    setShowInstructions(!showInstructions);
    startTimer();
  };

  const statusStyle = (status: string): string => {
    if (/^This is not [a-zA-Z]+/.test(status)) {
      return "red";
    } else if (/^[a-zA-Z]+ found/.test(status) || status === "You win!") {
      return "green";
    } else {
      return "";
    }
  };

  return (
    <>
      <div className="header">
        <h1 className="title">Where's Waldo</h1>
        <div id="timer">
          {"Timer: "}
          {/* mins */}
          <span>{("0" + Math.floor((time / 60000) % 60)).slice(-2)}:</span>
          {/* seconds */}
          <span>{("0" + Math.floor((time / 1000) % 60)).slice(-2)}:</span>
          {/* milliseconds */}
          <span>{("0" + ((time / 10) % 100)).slice(-2)}</span>
        </div>
      </div>
      <div className={`status ${statusStyle(status)}`}>{status}</div>
      <img
        src={background}
        alt="Video Game Characters"
        onClick={makeTarget}
        id="background-image"
      />
      {showInstructions ? <Instructions startTimer={startGame} /> : null}
      {!gameOver ? null : <HighScores time={time} />}
    </>
  );
}
