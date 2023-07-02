import React, { useEffect, useState } from "react";
import Main from "./components/main";
import Target from "./components/target";
import TargetFound from "./components/target-found";
import Login from "./components/login";
import { initializeApp } from "firebase/app";
import { getFirestore, collection, getDocs } from "firebase/firestore";

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
  const [targetX, setTargetX] = useState(0 as number);
  const [targetY, setTargetY] = useState(0 as number);
  const [tagArray, setTagArray] = useState([] as tagObjectsType[]);
  const [foundArray, setFoundArray] = useState([] as tagObjectsType[]);
  const [time, setTime] = useState(0 as number);
  const [running, setRunning] = useState(false as boolean);

  const firebaseConfig = {
    apiKey: "AIzaSyDCgjZhT4Wxgxkx3_wgIdPC9n8_1aphnC0",
    authDomain: "photo-tagging-app-66f90.firebaseapp.com",
    projectId: "photo-tagging-app-66f90",
    storageBucket: "photo-tagging-app-66f90.appspot.com",
    messagingSenderId: "484565065601",
    appId: "1:484565065601:web:570ef818abfadb866bd280",
    measurementId: "G-HNJFLJK92K",
  };
  const app = initializeApp(firebaseConfig);

  useEffect(() => {
    const db = getFirestore(app);

    const getTargetPositions = async () => {
      const tagObjects: tagObjectsType[] = [];
      try {
        const queryPositions = await getDocs(collection(db, "tags"));
        queryPositions.forEach((doc: any) => {
          tagObjects.push(doc.data());
        });
        setTagArray(tagObjects);
      } catch (e) {
        console.log(e);
      }
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

  const makeTarget = (e: React.PointerEvent<HTMLElement>) => {
    e.preventDefault();
    setShowTarget(true);
    const mouseX: number = e.pageX;
    const mouseY: number = e.pageY;
    const myImg = document.querySelector("img") as HTMLImageElement;
    console.log(
      `mouseX: ${(mouseX / myImg.clientWidth) * 1000} mouseY: ${
        (mouseY / myImg.clientHeight) * 1000
      }`
    );
    setTargetX(mouseX);
    setTargetY(mouseY);
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
        console.log(`${tagObject.name} found`);
        targetName = tagObject.name;
        tempTagArray = tempTagArray.filter(
          (object) => object.name !== targetName
        );
        if (tempTagArray.length === 0) {
          console.log("you win");
          setFoundArray([...foundArray, tagObject]);
          setShowTarget(false);
          setRunning(false);
        } else {
          setTagArray(tempTagArray);
          setFoundArray([...foundArray, tagObject]);
        }
      } else {
        console.log(`This is not ${tagObject.name}`);
      }
    }
  };

  return (
    <div className="App">
      {showLogin ? (
        <Login app={app} start={startApp as () => void} />
      ) : (
        <Main makeTarget={makeTarget} time={time} />
      )}
      {showTarget ? (
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
