import { useTicketStore } from "../ticket.store.ts";
import { useEnvStore } from "../../common/store/env.store.ts";
import axios from "axios";
import { useParams } from "react-router-dom";

type Props = {
  title?: string;
  content?: string;
  displayOrder?: number;
  startDate?: string;
  endDate?: string;
  statusId?: string;
};

export default function useUpdateTicket() {
  const { ticketState } = useTicketStore();
  const { envState } = useEnvStore();
  const { boardId } = useParams();
  const { ticketListState, setTicketListState } = useTicketStore();

  const updateTicket = async (props: Readonly<Props>) => {
    const ticketUrl = envState.ticketUrl;
    const updateData = {
      title: props.title,
      content: props.content,
      displayOrder: props.displayOrder,
      startDate: props.startDate,
      endDate: props.endDate,
      statusId: Number(props.statusId),
    };

    await axios.patch(
      `${ticketUrl}/${boardId}/${ticketState.statusId}/${ticketState.focusId}`,
      updateData,
    );

    const updateField = Object.fromEntries(
      Object.entries(updateData).filter(([, v]) => v !== undefined),
    );

    // props.statusId = newStatusId
    // ticketState.statusId = 기존 status
    const newTicketList = ticketListState.map((ticket) => {
      if (ticket.id === ticketState.focusId) {
        return {
          ...ticket,
          ...updateField,
          statusId: props.statusId ?? ticketState.statusId,
        };
      }
      return ticket;
    });
    setTicketListState(newTicketList);

    return true;
  };

  return { updateTicket };
}
