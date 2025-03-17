import ModalBackground from "../../common/component/modal-background.tsx";
import { useRef } from "react";
import { useBoardStore } from "../board.store.ts";

export default function NewBoardModal() {
  const { boardState, setBoardState } = useBoardStore();
  const ref = useRef<HTMLDivElement>(null);

  const handleClickCreateButton = () => {
    setBoardState({ newModal: false, createModal: true });
  };

  const handleClickJoinButton = () => {
    setBoardState({ newModal: false, joinModal: true });
  };

  return (
    <ModalBackground
      ref={ref}
      onClose={() => setBoardState({ newModal: false })}
      enabled={boardState.newModal}
    >
      <div
        ref={ref}
        className={"bg-customBlack-700 flex h-52 flex-col rounded-sm px-6 py-4"}
      >
        <button onClick={handleClickCreateButton}>create</button>
        <button onClick={handleClickJoinButton}>join</button>
      </div>
    </ModalBackground>
  );
}
