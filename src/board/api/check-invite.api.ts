import { useBoardStore } from "../board.store.ts";
import { useEnvStore } from "../../common/store/env.store.ts";
import axios from "axios";

export default function useCheckInvite() {
  const { boardState, setBoardState } = useBoardStore();
  const { envState } = useEnvStore();
  const checkInvite = async () => {
    const boardUrl = envState.boardUrl;

    const response = await axios.get(
      `${boardUrl}/invite/${boardState.inviteCode}`,
    );

    setBoardState({
      id: response.data.id,
      title: response.data.title,
      check: true,
    });
  };

  return { checkInvite };
}
