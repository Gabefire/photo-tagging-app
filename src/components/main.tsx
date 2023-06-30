import "./main.css";

const background = require("../assets/photo-tag.jpg");

export default function Main() {
  const makeTarget = (e: React.MouseEvent<HTMLElement>): void => {
    e.preventDefault();
    console.log(e);
    let targetDiv: HTMLElement | null = document.getElementById("target");
    if (targetDiv !== null) {
      targetDiv.remove();
    }
    const mouseX: number = e.pageX;
    const mouseY: number = e.pageY;
    targetDiv = document.createElement("div");
    targetDiv.id = "target";
    targetDiv.style.left = `${mouseX - 30}px`;
    targetDiv.style.top = `${mouseY - 30}px`;
    const body = document.querySelector("body") as HTMLElement;
    body.appendChild(targetDiv);
  };

  return (
    <>
      <img src={background} alt="Video Game Characters" onClick={makeTarget} />
    </>
  );
}
