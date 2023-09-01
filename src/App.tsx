import React, { useEffect, useState } from "react";
import Main from "./components/main";
import Target from "./components/target";
import TargetFound from "./components/target-found";
import Login from "./components/login";

export interface tagObjectsType {
  name: string;
  maxX: number;
  maxY: number;
  minX: number;
  minY: number;
}

function App() {
  const [showTarget, setShowTarget] = useState(false);
  const [showLogin, setShowLogin] = useState(true);
  const [gameOver, setGameOver] = useState(false);
  const [targetX, setTargetX] = useState(0 as number);
  const [targetY, setTargetY] = useState(0 as number);
  const [tagArray, setTagArray] = useState([] as tagObjectsType[]);
  const [foundArray, setFoundArray] = useState([] as tagObjectsType[]);
  const [time, setTime] = useState(0 as number);
  const [running, setRunning] = useState(false as boolean);
  const [status, setStatus] = useState("" as string);

  useEffect(() => {
    // makes tag array
    const getTargetPositions = async () => {
      return;
    };
    getTargetPositions();
    // eslint-disable-next-line
  }, []);

  useEffect(() => {
    let interval: any;
    if (running) {
      interval = setInterval(() => {
        setTime((prevTime) => prevTime + 10);
      }, 10);
    } else if (!running) {
      clearInterval(interval);
    }
    return () => clearInterval(interval);
  }, [running]);

  const startApp = () => {
    setShowLogin(!showLogin);
  };

  const startTimer = () => {
    setRunning(!running);
  };

  const makeTarget = (e: React.PointerEvent<HTMLElement>) => {
    e.preventDefault();
    setShowTarget(true);
    const mouseX: number = e.pageX;
    const mouseY: number = e.pageY;
    const myImg = document.querySelector("img") as HTMLImageElement;
    setTargetX(mouseX);
    setTargetY(mouseY);
  };

  const clearStatus = () => {
    setStatus("");
  };

  const selectTarget = (e: React.PointerEvent<HTMLElement>) => {
    let targetName: string;
    let tagObject: tagObjectsType | undefined;
    let tempTagArray = Array.from(tagArray);
    if (e.target instanceof Element) {
      targetName = e.target.id.split("-")[0];
      tagObject = tempTagArray.find((object) => object.name === targetName);
    }
    // added 30 for selection to accommodate for padding
    const myImg = document.querySelector("img") as HTMLImageElement;
    if (tagObject !== undefined) {
      if (
        tagObject.minX <= ((targetX + 30) / myImg.clientWidth) * 1000 &&
        tagObject.maxX >= ((targetX - 30) / myImg.clientWidth) * 1000 &&
        tagObject.minY <= ((targetY + 30) / myImg.clientHeight) * 1000 &&
        tagObject.maxY >= ((targetY - 30) / myImg.clientHeight) * 1000
      ) {
        setStatus(`${tagObject.name} found`);
        setTimeout(clearStatus, 10000);
        targetName = tagObject.name;
        tempTagArray = tempTagArray.filter(
          (object) => object.name !== targetName
        );
        if (tempTagArray.length === 0) {
          setStatus("You win!");
          setFoundArray([...foundArray, tagObject]);
          setShowTarget(false);
          setRunning(false);
          setGameOver(true);
        } else {
          setTagArray(tempTagArray);
          setFoundArray([...foundArray, tagObject]);
        }
      } else {
        setStatus(`This is not ${tagObject.name}`);
        setTimeout(clearStatus, 10000);
      }
    }
  };

  return (
    <div className="App">
      {showLogin ? (
        <Login start={startApp as () => void} />
      ) : (
        <Main
          makeTarget={makeTarget}
          time={time}
          startTimer={startTimer}
          gameOver={gameOver}
          status={status}
        />
      )}
      {showTarget && running ? (
        <Target
          targetX={targetX}
          targetY={targetY}
          tagArray={tagArray}
          selectTarget={selectTarget}
        />
      ) : null}
      {foundArray.length > 0 ? <TargetFound foundArray={foundArray} /> : null}
    </div>
  );
}

export default App;
