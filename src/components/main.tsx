import "./main.css";

const background = require("../assets/photo-tag.jpg");

export default function Main() {
  const target = (e: React.MouseEvent<HTMLElement>): void => {
    e.preventDefault();
    const mouseX: number = e.pageX;
    const mouseY: number = e.pageY;
    const targetDiv: HTMLDivElement = document.createElement("div");
    targetDiv.style.position = "relative";
    targetDiv.style.left = `${mouseX}px`;
    targetDiv.style.top = `${mouseY}px`;
    targetDiv.style.border = "2px solid red";
    targetDiv.textContent = "30px";
    const img = document.querySelector("img") as HTMLElement;
    img.appendChild(targetDiv);
  };

  return (
    <>
      <img src={background} alt="Video Game Characters" onClick={target} />
    </>
  );
}
