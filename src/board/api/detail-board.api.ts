import { useBoardStore } from "../board.store.ts";
import { useEnvStore } from "../../common/store/env.store.ts";
import { useParams } from "react-router-dom";
import axios from "axios";
import { useStatusStore } from "../../status/status.store.ts";

export default function useDetailBoard() {
  const { setBoardState } = useBoardStore();
  const { setStatusListState } = useStatusStore();
  const { envState } = useEnvStore();
  const { boardId } = useParams();

  const detailBoard = async () => {
    const boardUrl = envState.boardUrl;
    const response = await axios.get(`${boardUrl}/${boardId}`);

    setStatusListState(response.data.statusList);
    setBoardState(response.data.board);
  };

  return { detailBoard };
}
