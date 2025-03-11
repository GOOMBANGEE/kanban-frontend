import { useEnvStore } from "../../common/store/env.store.ts";
import { useBoardStore } from "../board.store.ts";
import axios from "axios";

export default function useCreateBoard() {
  const { boardState } = useBoardStore();
  const { envState } = useEnvStore();

  const createBoard = async () => {
    const boardUrl = envState.boardUrl;
    const response = await axios.post(boardUrl, {
      title: boardState.title,
      icon: boardState.uploadIcon,
    });
    return response.data;
  };

  return { createBoard };
}
