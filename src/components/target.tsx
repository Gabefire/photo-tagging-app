import { tagObjectsType } from "../App";

export default function Target(props: {
  targetX: string;
  targetY: string;
  tagArray: tagObjectsType[];
}) {
  return (
    <>
      <div
        id="target"
        style={{ left: `${props.targetX}px`, top: `${props.targetY}px` }}
      />
      <ul
        id="target-list"
        style={{
          left: `${+props.targetX + 70}px`,
          top: `${+props.targetY - 15}px`,
        }}
      >
        {props.tagArray.map((obj) => {
          return (
            <li id={`${obj.name}-li`} key={`${obj.name}-key`}>
              {obj.name.charAt(0).toUpperCase() + obj.name.slice(1)}
            </li>
          );
        })}
      </ul>
    </>
  );
}
