import { useTicketStore } from "../ticket.store.ts";
import { useEnvStore } from "../../common/store/env.store.ts";
import { useParams } from "react-router-dom";
import axios from "axios";
import { Ticket } from "../ticket.type.ts";

export default function useCreateTicket() {
  const { ticketState, setTicketState, ticketListState, setTicketListState } =
    useTicketStore();
  const { envState } = useEnvStore();
  const { boardId } = useParams();

  const createTicket = async (ticket?: Ticket) => {
    if (!ticket) {
      if (ticketState.createProcessing) return;
      const ticketUrl = envState.ticketUrl;

      const response = await axios.post(
        `${ticketUrl}/${boardId}/${ticketState.statusId}`,
        { title: ticketState.title },
      );
      ticket = response.data;
    }

    if (ticket) {
      setTicketState({ createProcessing: false });
      setTicketListState([...ticketListState, ticket]);
    }
  };

  return { createTicket };
}
