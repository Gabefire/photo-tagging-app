import React, { useState } from "react";
import Instructions from "./instructions";
import HighScores from "./high-scores";
import "./main.css";

const background = require("../assets/photo-tag.jpg");

export default function Main(props: {
  makeTarget: any;
  time: number;
  startTimer: any;
  gameOver: boolean;
  app: any;
  status: string;
}) {
  const [showInstructions, setShowInstructions] = useState(true);

  const startGame = (e: React.PointerEvent<HTMLElement>) => {
    e.preventDefault();
    setShowInstructions(!showInstructions);
    props.startTimer();
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
          <span>
            {("0" + Math.floor((props.time / 60000) % 60)).slice(-2)}:
          </span>
          {/* seconds */}
          <span>{("0" + Math.floor((props.time / 1000) % 60)).slice(-2)}:</span>
          {/* milliseconds */}
          <span>{("0" + ((props.time / 10) % 100)).slice(-2)}</span>
        </div>
      </div>
      <div className={`status ${statusStyle(props.status)}`}>
        {props.status}
      </div>
      <img
        src={background}
        alt="Video Game Characters"
        onClick={props.makeTarget}
        id="background-image"
      />
      {showInstructions ? <Instructions startTimer={startGame} /> : null}
      {!props.gameOver ? null : (
        <HighScores time={props.time} app={props.app} />
      )}
    </>
  );
}
