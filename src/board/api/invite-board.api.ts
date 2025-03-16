import { useBoardStore } from "../board.store.ts";
import { useEnvStore } from "../../common/store/env.store.ts";
import axios from "axios";

export default function useInviteBoard() {
  const { boardState, setBoardState } = useBoardStore();
  const { envState } = useEnvStore();

  const inviteBoard = async () => {
    const boardUrl = envState.boardUrl;

    const response = await axios.get(`${boardUrl}/${boardState.id}/invite`);

    setBoardState({ inviteCode: response.data });
  };

  return { inviteBoard };
}
