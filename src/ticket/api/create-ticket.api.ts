import { useTicketStore } from "../ticket.store.ts";
import { useEnvStore } from "../../common/store/env.store.ts";
import { useParams } from "react-router-dom";
import axios from "axios";
import { useStatusStore } from "../../status/status.store.ts";
import { Status } from "../../status/status.type.ts";

export default function useCreateTicket() {
  const { statusListState, setStatusListState } = useStatusStore();
  const { ticketState, setTicketState } = useTicketStore();
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
    const newStatusList = statusListState.map((status: Status) => {
      if (status.id === ticketState.statusId) {
        return {
          ...status,
          Ticket: [...status.Ticket, response.data.ticket],
        };
      }
      return status;
    });
    setStatusListState(newStatusList);
  };

  return { createTicket };
}
