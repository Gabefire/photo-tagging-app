import { ReactElement } from "react";
import { tagObjectsType } from "../App";

export default function Target(props: {
  targetX: number;
  targetY: number;
  tagArray: tagObjectsType[];
  foundArray: tagObjectsType[];
  selectTarget: any;
}) {
  const addTargetFoundMarker = () => {
    const myImg = document.querySelector("img") as HTMLImageElement;
    return props.foundArray.map((obj) => {
      return (
        <div
          className="found-marker"
          style={{
            left: `${
              Math.trunc(
                ((obj.minX * myImg.clientWidth) / 1000 +
                  (obj.maxX * myImg.clientWidth) / 1000) /
                  2
              ) - 20
            }px`,
            top: `${
              Math.trunc(
                ((obj.minY * myImg.clientHeight) / 1000 +
                  (obj.maxY * myImg.clientHeight) / 1000) /
                  2
              ) - 45
            }px`,
          }}
          key={`${obj.name}-marker`}
        >
          X
        </div>
      );
    });
  };
  return (
    <>
      <div
        id="target"
        style={{
          left: `${props.targetX - 30}px`,
          top: `${props.targetY - 30}px`,
        }}
      />
      <ul
        id="target-list"
        style={{
          left: `${+props.targetX + 40}px`,
          top: `${+props.targetY - 45}px`,
        }}
        onClick={props.selectTarget}
      >
        {props.tagArray.map((obj) => {
          return (
            <li id={`${obj.name}-li`} key={`${obj.name}-key`}>
              {obj.name}
            </li>
          );
        })}
      </ul>
      {props.foundArray.length > 0 ? addTargetFoundMarker() : null}
    </>
  );
}
