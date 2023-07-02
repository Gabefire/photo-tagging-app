import React, { useState } from "react";
import Instructions from "./instructions";
import "./main.css";

const background = require("../assets/photo-tag.jpg");

export default function Main(props: { makeTarget: any; time: number }) {
  const [showInstructions, setShowInstructions] = useState(true);

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
      <img
        src={background}
        alt="Video Game Characters"
        onClick={props.makeTarget}
        id="background-image"
      />
      {showInstructions ? <Instructions /> : null}
    </>
  );
}
