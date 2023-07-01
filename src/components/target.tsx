import { ReactElement } from "react";
import { tagObjectsType } from "../App";
import * as React from "react";

export default function Target(props: {
  targetX: number;
  targetY: number;
  tagArray: tagObjectsType[];
  foundArray: tagObjectsType[];
  selectTarget: any;
}) {
  const addTargetFoundMarker = () => {
    console.log(props.foundArray);
    return props.foundArray.map((obj) => {
      return (
        <div
          className="found-marker"
          style={{
            left: `${Math.trunc((obj.minX + obj.maxX) / 2) - 20}px`,
            top: `${Math.trunc((obj.minY + obj.maxY) / 2) - 45}px`,
          }}
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
