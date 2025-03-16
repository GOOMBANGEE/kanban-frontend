import { useBoardStore } from "../board.store.ts";
import { useEnvStore } from "../../common/store/env.store.ts";
import axios from "axios";
import { Board } from "../board.type.ts";

export default function useDeleteInviteBoard() {
  const { boardState, setBoardState, boardListState, setBoardListState } =
    useBoardStore();
  const { envState } = useEnvStore();

  const deleteInviteBoard = async () => {
    const boardUrl = envState.boardUrl;

    await axios.delete(`${boardUrl}/${boardState.id}/invite`);

    setBoardState({ inviteCode: undefined });
    const newBoardList: Board[] = boardListState.boardList.map((board) =>
      board.id === boardState.id
        ? {
            ...board,
            inviteCode: undefined,
          }
        : board,
    );
    setBoardListState({ ...boardListState, boardList: newBoardList });
  };

  return { deleteInviteBoard };
}
