import { useBoardStore } from "../board.store.ts";
import { useEnvStore } from "../../common/store/env.store.ts";
import { useParams } from "react-router-dom";
import axios from "axios";
import { useStatusStore } from "../../status/status.store.ts";
import { useTicketStore } from "../../ticket/ticket.store.ts";
import { Status } from "../../status/status.type.ts";

export default function useDetailBoard() {
  const { setBoardState } = useBoardStore();
  const { setStatusListState } = useStatusStore();
  const { setTicketListState } = useTicketStore();
  const { envState } = useEnvStore();
  const { boardId } = useParams();

  const detailBoard = async () => {
    const boardUrl = envState.boardUrl;
    const response = await axios.get(`${boardUrl}/${boardId}`);

    setBoardState(response.data.board);
    setStatusListState(response.data.statusList);
    setTicketListState(
      response.data.statusList.flatMap((status: Status) => status.Ticket),
    );
  };

  return { detailBoard };
}
