import { useBoardStore } from "../board.store.ts";
import { useEnvStore } from "../../common/store/env.store.ts";
import axios from "axios";
import { Board } from "../board.type.ts";

export default function useUpdateBoard() {
  const { boardState, setBoardState, boardListState, setBoardListState } =
    useBoardStore();
  const { envState } = useEnvStore();

  const updateBoard = async (board?: Board) => {
    if (!board) {
      const boardUrl = envState.boardUrl;
      const icon = boardState.uploadIcon ?? boardState.icon ?? undefined;

      const response = await axios.patch(`${boardUrl}/${boardState.id}`, {
        title: boardState.newTitle,
        icon: icon,
      });
      board = response.data;
    }

    const newBoardList: Board[] = boardListState.boardList.map(
      (item: Board) => {
        if (board && item.id === board.id) {
          return {
            ...item,
            title: board.title,
            icon: board.icon,
          };
        }
        return item;
      },
    );
    setBoardListState({ ...boardListState, boardList: newBoardList });
    setBoardState({ ...board, newTitle: undefined });
  };

  return { updateBoard };
}
