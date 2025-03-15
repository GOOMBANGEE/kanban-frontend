import { useTicketStore } from "../ticket.store.ts";
import { useEnvStore } from "../../common/store/env.store.ts";
import axios from "axios";
import { useParams } from "react-router-dom";
import { useStatusStore } from "../../status/status.store.ts";
import { Status } from "../../status/status.type.ts";
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
  const { statusListState, setStatusListState } = useStatusStore();
  const { ticketState } = useTicketStore();
  const { envState } = useEnvStore();
  const { boardId } = useParams();

  const updateTicket = async (props: Readonly<Props>) => {
    const ticketUrl = envState.ticketUrl;
    const updateData = {
      title: props.title,
      content: props.content,
      displayOrder: props.displayOrder,
      startDate: props.startDate,
      endDate: props.endDate,
      statusId: props.statusId,
    };

    await axios.patch(
      `${ticketUrl}/${boardId}/${ticketState.statusId}/${ticketState.focusId}`,
      updateData,
    );

    const updateField = Object.fromEntries(
      Object.entries(updateData).filter(([, v]) => v !== undefined),
    );

    const newStatusList: Status[] = statusListState.map((status: Status) => ({
      ...status,
      Ticket: status.Ticket.map((ticket: Ticket) =>
        ticket.id === ticketState.focusId
          ? { ...ticket, ...updateField }
          : ticket,
      ),
    }));
    setStatusListState(newStatusList);
    return true;
  };

  return { updateTicket };
}
