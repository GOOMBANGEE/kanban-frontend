import ModalBackground from "../../common/component/modal-background.tsx";
import { useBoardStore } from "../board.store.ts";
import { ChangeEvent, useEffect, useRef } from "react";
import useCheckInvite from "../api/check-invite.api.ts";
import useJoinBoard from "../api/join-board.api.ts";
import { useNavigate } from "react-router-dom";

export default function JoinBoardModal() {
  const { joinBoard } = useJoinBoard();
  const { checkInvite } = useCheckInvite();

  const { boardState, setBoardState } = useBoardStore();
  const ref = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const navigate = useNavigate();

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setBoardState({ inviteCode: e.target.value });
  };

  const handleClickJoin = async () => {
    if (await joinBoard()) {
      if (boardState.id) navigate(boardState.id);
    }
  };
  const handleClickCheck = () => {
    checkInvite();
  };

  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  return (
    <ModalBackground
      ref={ref}
      onClose={() => setBoardState({ joinModal: false })}
      enabled={boardState.joinModal}
    >
      {boardState.check ? (
        <div
          ref={ref}
          className={
            "bg-customBlack-700 flex h-52 flex-col rounded-sm px-6 py-4"
          }
        >
          <div className={"flex items-center gap-x-1"}>
            Title:{" "}
            <span className={"text-xl font-semibold"}>{boardState.title}</span>
          </div>

          <button onClick={handleClickJoin}>Join</button>
        </div>
      ) : (
        <div
          ref={ref}
          className={
            "bg-customBlack-700 flex h-52 flex-col rounded-sm px-6 py-4"
          }
        >
          <input
            ref={inputRef}
            onChange={handleChange}
            className={"bg-customBlack-400 text-customText px-2"}
          />
          <button onClick={handleClickCheck}>Check</button>
        </div>
      )}
    </ModalBackground>
  );
}
