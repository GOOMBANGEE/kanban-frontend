import { useBoardStore } from "../board.store.ts";
import ModalBackground from "../../common/component/modal-background.tsx";
import useDeleteBoard from "../api/delete-board.api.ts";

export default function DeleteBoardModal() {
  const { deleteBoard } = useDeleteBoard();
  const { boardState, resetBoardState } = useBoardStore();

  const handleClickDelete = async () => {
    if (await deleteBoard()) {
      window.location.reload();
    }
  };

  const handleClickCancel = () => {
    resetBoardState();
  };

  return (
    <>
      {boardState.deleteModal ? (
        <ModalBackground
          onClose={handleClickCancel}
          enabled={boardState.deleteModal}
        >
          <div className={"bg-customBlack-700 rounded-sm px-6 py-4"}>
            <div>Are you sure you want to delete the board?</div>
            <button onClick={handleClickDelete}>Delete</button>
            <button onClick={handleClickCancel}>Cancel</button>
          </div>
        </ModalBackground>
      ) : null}
    </>
  );
}
