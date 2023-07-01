import React, { useEffect, useState } from "react";
import Main from "./components/main";
import Target from "./components/target";
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
  const [targetX, setTargetX] = useState(0 as number);
  const [targetY, setTargetY] = useState(0 as number);
  const [tagArray, setTagArray] = useState([] as tagObjectsType[]);

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
  }, []);

  const makeTarget = (e: React.PointerEvent<HTMLElement>) => {
    e.preventDefault();
    setShowTarget(true);
    const mouseX: number = e.pageX;
    const mouseY: number = e.pageY;
    // function below to show position of mouse on screen
    // console.log(`MouseX: ${mouseX} MouseY: ${mouseY}`);
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
    if (tagObject !== undefined) {
      if (
        tagObject.minX <= targetX + 30 &&
        tagObject.maxX >= targetX - 30 &&
        tagObject.minY <= targetY + 30 &&
        tagObject.maxY >= targetY - 30
      ) {
        console.log(`${tagObject.name} found`);
        targetName = tagObject.name;
        tempTagArray = tempTagArray.filter(
          (object) => object.name !== targetName
        );
        setTagArray(tempTagArray);
      } else {
        console.log(`This is not ${tagObject.name}`);
      }
    }
  };

  return (
    <div className="App">
      <Main makeTarget={makeTarget} />
      {showTarget ? (
        <Target
          targetX={targetX}
          targetY={targetY}
          tagArray={tagArray}
          selectTarget={selectTarget}
        />
      ) : null}
    </div>
  );
}

export default App;
