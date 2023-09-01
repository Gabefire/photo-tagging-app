import "./instructions.css";
import fry from "../assets/fry.png";
import waldo from "../assets/waldo.png";
import sonic from "../assets/sonic.png";

export default function Instructions({ startTimer }: any) {
  return (
    <div id="instructions" className="pop-up">
      <div className="title-instructions">
        Find the Characters as fast as you can
      </div>
      <div className="title-instructions">
        Once you click start, the timer will start
      </div>

      <div className="image-containers">
        <div className="image-container" id="fry-conatiner">
          <img src={fry} alt="fry" />
          <div>Fry</div>
        </div>
        <div className="image-container" id="sonic-conatiner">
          <img src={sonic} alt="sonic" />
          <div>Sonic</div>
        </div>
        <div className="image-container" id="wald-conatiner">
          <img src={waldo} alt="waldo" id="waldo-image" />
          <div>Waldo</div>
        </div>
      </div>
      <button id="start-btn" onClick={startTimer}>
        Start
      </button>
    </div>
  );
}
