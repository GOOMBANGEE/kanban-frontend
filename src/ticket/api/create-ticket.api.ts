import { useTicketStore } from "../ticket.store.ts";
import { useEnvStore } from "../../common/store/env.store.ts";
import { useParams } from "react-router-dom";
import axios from "axios";

export default function useCreateTicket() {
  const { ticketState, setTicketState, ticketListState, setTicketListState } =
    useTicketStore();
  const { envState } = useEnvStore();
  const { boardId } = useParams();

  const createTicket = async () => {
    const ticketUrl = envState.ticketUrl;
    if (ticketState.createProcessing) return;

    const response = await axios.post(
      `${ticketUrl}/${boardId}/${ticketState.statusId}`,
      { title: ticketState.title },
    );

    if (response) setTicketState({ createProcessing: false });
    setTicketListState([...ticketListState, response.data.ticket]);
  };

  return { createTicket };
}
