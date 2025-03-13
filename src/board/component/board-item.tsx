import { Board } from "../board.type.ts";
import { useEnvStore } from "../../common/store/env.store.ts";
import boardSVG from "../../../public/board.svg";
import { useBoardStore } from "../board.store.ts";
import { useNavigate } from "react-router-dom";
import SettingBoardButton from "./setting-board-button.tsx";

export default function BoardItem(props: Readonly<Board>) {
  const { setBoardState, resetBoardState } = useBoardStore();
  const { envState } = useEnvStore();
  const navigate = useNavigate();

  const handleClickBoard = () => {
    navigate(`/board/${props.id}`);
    resetBoardState();
  };

  const handleMouseEnter = () => {
    setBoardState({ id: props.id, hover: true });
  };
  const handleMouseLeave = () => {
    setBoardState({ hover: false });
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

      <SettingBoardButton {...props} />
    </div>
  );
}
