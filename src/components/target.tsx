export default function Target(props: { targetX: string; targetY: string }) {
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
        <li>Waldo</li>
        <li>Sonic</li>
        <li>Fry</li>
      </ul>
    </>
  );
}
