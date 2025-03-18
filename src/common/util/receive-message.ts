import useCreateTicket from "../../ticket/api/create-ticket.api.ts";
import { useSocketStore } from "../store/socket.store.ts";
import { useUserStore } from "../../user/user.store.ts";
import useUpdateTicket from "../../ticket/api/update-ticket.api.ts";
import useDeleteTicket from "../../ticket/api/delete-ticket.api.ts";

export const useReceiveMessageHandler = () => {
  const { createTicket } = useCreateTicket();
  const { updateTicket } = useUpdateTicket();
  const { deleteTicket } = useDeleteTicket();

  const { userState } = useUserStore();
  const { receiveMessage, resetReceiveMessage } = useSocketStore();

  const receiveMessageHandler = async () => {
    if (!receiveMessage) return;
    if (receiveMessage.message.userId === userState.id) return;

    const controller = receiveMessage.sourceMethod.split(".")[0];
    const method = receiveMessage.sourceMethod.split(".")[1];

    if (controller === "TicketController") {
      console.log(receiveMessage.message.ticket);
      console.log(method);

      if (method === "create") createTicket(receiveMessage.message.ticket);
      if (method === "update")
        updateTicket(undefined, receiveMessage.message.ticket);
      if (method === "remove") deleteTicket(receiveMessage.message.ticket);
    }
    resetReceiveMessage();
  };

  return { receiveMessageHandler };
};
