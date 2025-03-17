import { useBoardStore } from "../board.store.ts";
import ModalBackground from "../../common/component/modal-background.tsx";
import useDeleteBoard from "../api/delete-board.api.ts";
import { useRef } from "react";
import { useUserStore } from "../../user/user.store.ts";
import useLeaveBoard from "../api/leave-board.api.ts";

export default function DeleteBoardModal() {
  const { deleteBoard } = useDeleteBoard();
  const { leaveBoard } = useLeaveBoard();
  const { boardState, resetBoardState } = useBoardStore();
  const { userState } = useUserStore();

  const ref = useRef<HTMLDivElement>(null);

  const handleClickDelete = async () => {
    if (await deleteBoard()) {
      window.location.reload();
    }
  };

  const handleClickLeave = async () => {
    if (await leaveBoard()) {
      window.location.reload();
    }
  };

  const handleClickCancel = () => {
    resetBoardState();
  };

  return (
    <ModalBackground
      ref={ref}
      onClose={handleClickCancel}
      enabled={boardState.deleteModal}
    >
      <div ref={ref} className={"bg-customBlack-700 z-20 rounded-sm px-6 py-4"}>
        <div>
          Are you sure you want to{" "}
          {boardState.userId === userState.id ? "Delete" : "Leave"} the board?
        </div>
        <button
          onClick={() =>
            boardState.userId === userState.id
              ? handleClickDelete()
              : handleClickLeave()
          }
        >
          {boardState.userId === userState.id ? "Delete" : "Leave"}
        </button>

        <button onClick={handleClickCancel}>Cancel</button>
      </div>
    </ModalBackground>
  );
}
