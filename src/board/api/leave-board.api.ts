import { useBoardStore } from "../board.store.ts";
import { useEnvStore } from "../../common/store/env.store.ts";
import axios from "axios";

export default function useLeaveBoard() {
  const { boardState } = useBoardStore();
  const { envState } = useEnvStore();

  const leaveBoard = async () => {
    const boardUrl = envState.boardUrl;

    const response = await axios.delete(`${boardUrl}/${boardState.id}/leave`);

    if (response) return true;
  };

  return { leaveBoard };
}
