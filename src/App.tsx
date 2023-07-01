import React, { useState } from "react";
import Main from "./components/main";
import Target from "./components/target";

function App() {
  const [showTarget, setShowTarget] = useState(false);
  const [targetX, setTargetX] = useState<string>("0");
  const [targetY, setTargetY] = useState<string>("0");

  const makeTarget = (e: React.MouseEvent<HTMLElement>) => {
    e.preventDefault();
    setShowTarget(true);
    const mouseX: number = e.pageX;
    const mouseY: number = e.pageY;
    console.log(mouseX, mouseY);
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
