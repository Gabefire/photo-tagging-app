import { tagObjectsType } from "../App";

export default function Target(props: {
  targetX: number;
  targetY: number;
  tagArray: tagObjectsType[];
  selectTarget: any;
}) {
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
    </>
  );
}
