import { useTicketStore } from "../ticket.store.ts";
import { useEnvStore } from "../../common/store/env.store.ts";
import { useStatusStore } from "../../status/status.store.ts";
import axios from "axios";
import { useParams } from "react-router-dom";
import { Status } from "../../status/status.type.ts";
import { Ticket } from "../ticket.type.ts";

export default function useDeleteTicket() {
  const { statusListState, setStatusListState } = useStatusStore();
  const { ticketState } = useTicketStore();
  const { envState } = useEnvStore();
  const { boardId } = useParams();

  const deleteTicket = async () => {
    const ticketUrl = envState.ticketUrl;

    await axios.delete(
      `${ticketUrl}/${boardId}/${ticketState.statusId}/${ticketState.id}`,
    );

    const newStatusList: Status[] = statusListState.map((status: Status) => ({
      ...status,
      Ticket: status.Ticket.filter(
        (ticket: Ticket) => ticket.id !== ticketState.id,
      ),
    }));
    setStatusListState(newStatusList);
  };

  return { deleteTicket };
}
