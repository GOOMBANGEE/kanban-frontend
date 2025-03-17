import { useTicketStore } from "../ticket.store.ts";
import { useEnvStore } from "../../common/store/env.store.ts";
import axios from "axios";
import { useParams } from "react-router-dom";
import { Ticket } from "../ticket.type.ts";

export default function useDeleteTicket() {
  const { ticketState, ticketListState, setTicketListState } = useTicketStore();
  const { envState } = useEnvStore();
  const { boardId } = useParams();

  const deleteTicket = async () => {
    const ticketUrl = envState.ticketUrl;

    await axios.delete(
      `${ticketUrl}/${boardId}/${ticketState.statusId}/${ticketState.id}`,
    );

    const newTicketList: Ticket[] = ticketListState.filter(
      (ticket: Ticket) => ticket.id !== ticketState.id,
    );
    setTicketListState(newTicketList);
  };

  return { deleteTicket };
}
