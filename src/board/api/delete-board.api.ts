import { useBoardStore } from "../board.store.ts";
import { useEnvStore } from "../../common/store/env.store.ts";
import axios from "axios";

export default function useDeleteBoard() {
  const { boardState } = useBoardStore();
  const { envState } = useEnvStore();

  const deleteBoard = async () => {
    const boardUrl = envState.boardUrl;

    const response = await axios.delete(`${boardUrl}/${boardState.id}`);
    if (response) return true;
  };

  return { deleteBoard };
}
