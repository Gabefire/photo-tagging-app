import "./main.css";

const background = require("../assets/photo-tag.jpg");

export default function Main({ makeTarget }: any) {
  return (
    <>
      <img src={background} alt="Video Game Characters" onClick={makeTarget} />
    </>
  );
}
