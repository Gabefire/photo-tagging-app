import { tagObjectsType } from "../App";

export default function TargetFound(props: { foundArray: tagObjectsType[] }) {
  const myImg = document.querySelector("img") as HTMLImageElement;
  return (
    <>
      {props.foundArray.map((obj) => {
        return (
          <div
            className="found-marker"
            style={{
              left: `${
                Math.trunc(
                  ((obj.minX * myImg.clientWidth) / 1000 +
                    (obj.maxX * myImg.clientWidth) / 1000) /
                    2
                ) - 30
              }px`,
              top: `${
                Math.trunc(
                  ((obj.minY * myImg.clientHeight) / 1000 +
                    (obj.maxY * myImg.clientHeight) / 1000) /
                    2
                ) - 30
              }px`,
            }}
            key={`${obj.name}-marker`}
          >
            X
          </div>
        );
      })}
    </>
  );
}
