import { useBoardStore } from "../board.store.ts";
import { useEnvStore } from "../../common/store/env.store.ts";
import axios from "axios";

export default function useJoinBoard() {
  const { boardState } = useBoardStore();
  const { envState } = useEnvStore();

  const joinBoard = async () => {
    const boardUrl = envState.boardUrl;

    const response = await axios.post(
      `${boardUrl}/${boardState.id}/${boardState.inviteCode}`,
    );

    if (response) return true;
  };

  return { joinBoard };
}
