const fry = require("../assets/fry.png");
const sonic = require("../assets/sonic.png");
const waldo = require("../assets/waldo.png");

export default function Instructions({ startTimer }: any) {
  return (
    <div id="instructions">
      <div>Find the Characters as fast as you can</div>
      <div>Once you click start, the timer will start</div>
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
          <img src={waldo} alt="waldo" />
          <div>Waldo</div>
        </div>
      </div>
    </div>
  );
}
