import { Board } from "../board.type.ts";
import { useEnvStore } from "../../common/store/env.store.ts";
import boardSVG from "../../../public/board.svg";
import { useBoardStore } from "../board.store.ts";

export default function BoardItem(props: Readonly<Board>) {
  const { boardState, setBoardState } = useBoardStore();
  const { envState } = useEnvStore();

  const handleClickBoard = () => {
    console.log("handleClick board");
  };

  const handleMouseEnter = () => {
    setBoardState({ id: props.id, hover: true });
  };
  const handleMouseLeave = () => {
    setBoardState({ hover: false });
  };

  const handleClickBoardSetting = () => {
    setBoardState({
      id: props.id,
      title: props.title,
      icon: props.icon,
      settingModal: true,
    });
  };

  return (
    <div
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      className={"mt-2 mb-2 flex items-center gap-x-2"}
    >
      <button
        onClick={handleClickBoard}
        className={"flex w-full items-center gap-x-2"}
      >
        <div className={"bg-customBlack-700 h-14 w-14 rounded-2xl"}>
          <img
            src={props.icon ? `${envState.baseUrl}/${props.icon}` : boardSVG}
            alt={"board icon"}
            loading={"lazy"}
            className={"h-14 w-14 rounded-full p-1"}
            onError={(e) => {
              e.currentTarget.src = boardSVG;
            }}
          />
        </div>

        <div className={"text-lg font-semibold"}>{props.title}</div>
      </button>
      {props.id === boardState.id && boardState.hover ? (
        <button onClick={handleClickBoardSetting}>
          <svg
            width="32px"
            height="32px"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <g id="SVGRepo_bgCarrier" strokeWidth="0"></g>
            <g
              id="SVGRepo_tracerCarrier"
              strokeLinecap="round"
              strokeLinejoin="round"
            ></g>
            <g id="SVGRepo_iconCarrier">
              <path
                d="M18 12H18.01M12 12H12.01M6 12H6.01M13 12C13 12.5523 12.5523 13 12 13C11.4477 13 11 12.5523 11 12C11 11.4477 11.4477 11 12 11C12.5523 11 13 11.4477 13 12ZM19 12C19 12.5523 18.5523 13 18 13C17.4477 13 17 12.5523 17 12C17 11.4477 17.4477 11 18 11C18.5523 11 19 11.4477 19 12ZM7 12C7 12.5523 6.55228 13 6 13C5.44772 13 5 12.5523 5 12C5 11.4477 5.44772 11 6 11C6.55228 11 7 11.4477 7 12Z"
                stroke="#ffffff"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              ></path>
            </g>
          </svg>
        </button>
      ) : null}
    </div>
  );
}
