import { useBoardStore } from "../board.store.ts";
import { useEnvStore } from "../../common/store/env.store.ts";
import axios from "axios";
import { Board } from "../board.type.ts";

export default function useUpdateBoard() {
  const { boardState, resetBoardState, boardListState, setBoardListState } =
    useBoardStore();
  const { envState } = useEnvStore();

  const updateBoard = async () => {
    const boardUrl = envState.boardUrl;
    const icon = boardState.uploadIcon ?? boardState.icon ?? undefined;

    const response = await axios.patch(`${boardUrl}/${boardState.id}`, {
      title: boardState.title,
      icon: icon,
    });

    // response.data.board.id 에 해당하는 값을 찾아서 setBoardListState 실행
    const newBoardList: Board[] = boardListState.boardList.map((board) => {
      if (board.id === response.data.board.id) {
        return {
          ...board,
          title: boardState.title,
          icon: response.data.board.icon,
        };
      }
      return board;
    });
    setBoardListState({ ...boardListState, boardList: newBoardList });
    resetBoardState();
  };

  return { updateBoard };
}
