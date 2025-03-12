import { Status, statusColor } from "../status.type.ts";

export default function StatusItem(props: Readonly<Status>) {
  const backgroundColor = Object.entries(statusColor).find(
    ([color]) => color === props.color,
  )?.[1];

  return (
    <div className={"w-56 shrink-0"}>
      <div className={`${backgroundColor} mb-2 w-fit rounded-sm px-1 text-xs`}>
        {props.title}
      </div>
      {/*<div>ticket list</div>*/}
      {/*ticket create*/}
    </div>
  );
}
