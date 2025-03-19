import { useTicketStore } from "../ticket.store.ts";
import { useEnvStore } from "../../common/store/env.store.ts";
import axios from "axios";
import { useParams } from "react-router-dom";
import { Ticket } from "../ticket.type.ts";

type Props = {
  title?: string;
  content?: string;
  displayOrder?: number;
  startDate?: string;
  endDate?: string;
  statusId?: string;
};

export default function useUpdateTicket() {
  const { ticketState, setTicketState } = useTicketStore();
  const { envState } = useEnvStore();
  const { boardId } = useParams();
  const { ticketListState, setTicketListState } = useTicketStore();

  const updateTicket = async (
    props?: Readonly<Props>,
    ticket?: Ticket | Partial<Ticket>[],
  ) => {
    if (props) {
      const ticketUrl = envState.ticketUrl;
      const updateData = {
        title: props.title,
        content: props.content,
        displayOrder: props.displayOrder,
        startDate: props.startDate,
        endDate: props.endDate,
        statusId: Number(props.statusId),
      };

      const response = await axios.patch(
        `${ticketUrl}/${boardId}/${ticketState.statusId}/${ticketState.focusId}`,
        updateData,
      );
      ticket = response.data;
    }

    const newTicketList: Ticket[] = ticketListState.map((item: Ticket) => {
      if (Array.isArray(ticket)) {
        const updateItem = ticket.find((t) => t.id === item.id);
        return updateItem ? { ...item, ...updateItem } : item;
      }
      if (ticket && !Array.isArray(ticket)) {
        if (ticket.id === item.id && ticket.id === ticketState.focusId) {
          setTicketState({ ...ticket, newContent: undefined });
        }
        return item.id === ticket.id ? { ...item, ...ticket } : item;
      }
      return item;
    });

    setTicketListState(newTicketList);
    return true;
  };

  return { updateTicket };
}
