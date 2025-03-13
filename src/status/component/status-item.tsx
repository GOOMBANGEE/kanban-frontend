import { Status, statusColor } from "../status.type.ts";
import { useStatusStore } from "../status.store.ts";
import SettingStatusButton from "./setting-status-button.tsx";

export default function StatusItem(props: Readonly<Status>) {
  const { setStatusState } = useStatusStore();

  const backgroundColor = Object.entries(statusColor).find(
    ([color]) => color === props.color,
  )?.[1];

  const handleMouseEnter = () => {
    setStatusState({ id: props.id, hover: true });
  };
  const handleMouseLeave = () => {
    setStatusState({ hover: false });
  };

  return (
    <div
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      className={"mb-4 w-56 shrink-0"}
    >
      <div className={"flex w-full items-center"}>
        <div
          className={`${backgroundColor} mb-2 w-fit rounded-sm px-1 text-xs`}
        >
          {props.title}
        </div>

        <SettingStatusButton {...props} />
      </div>
      {/*<div>ticket list</div>*/}
      {/*ticket create*/}
    </div>
  );
}
