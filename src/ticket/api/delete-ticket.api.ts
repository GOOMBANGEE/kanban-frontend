import { useTicketStore } from "../ticket.store.ts";
import { useEnvStore } from "../../common/store/env.store.ts";
import axios from "axios";
import { useParams } from "react-router-dom";
import { Ticket } from "../ticket.type.ts";

export default function useDeleteTicket() {
  const { ticketState, ticketListState, setTicketListState } = useTicketStore();
  const { envState } = useEnvStore();
  const { boardId } = useParams();

  const deleteTicket = async (ticket?: Ticket) => {
    if (!ticket) {
      const ticketUrl = envState.ticketUrl;

      const response = await axios.delete(
        `${ticketUrl}/${boardId}/${ticketState.statusId}/${ticketState.id}`,
      );
      ticket = response.data;
    }

    if (ticket) {
      const newTicketList: Ticket[] = ticketListState.filter(
        (item: Ticket) => item.id !== ticket.id,
      );
      setTicketListState(newTicketList);
    }
  };

  return { deleteTicket };
}
