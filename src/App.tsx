import React, { useEffect, useState } from "react";
import Main from "./components/main";
import Target from "./components/target";
import { initializeApp } from "firebase/app";
import { getFirestore, collection, getDocs } from "firebase/firestore";

function App() {
  const [showTarget, setShowTarget] = useState(false);
  const [targetX, setTargetX] = useState<string>("0");
  const [targetY, setTargetY] = useState<string>("0");

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
    console.log("test");

    const getTargetPositions = async () => {
      try {
        const queryPositions = await getDocs(collection(db, "tags"));
        queryPositions.forEach((doc: any) => {
          console.log(doc.id);
        });
      } catch (e) {
        console.log(e);
      }
    };
    getTargetPositions();
  }, []);

  const makeTarget = (e: React.MouseEvent<HTMLElement>) => {
    e.preventDefault();
    setShowTarget(true);
    const mouseX: number = e.pageX;
    const mouseY: number = e.pageY;
    console.log(`MouseX: ${mouseX} MouseY: ${mouseY}`);
    setTargetX(`${mouseX - 30}`);
    setTargetY(`${mouseY - 30}`);
  };

  return (
    <div className="App">
      <Main makeTarget={makeTarget} />
      {showTarget ? <Target targetX={targetX} targetY={targetY} /> : null}
    </div>
  );
}

export default App;
