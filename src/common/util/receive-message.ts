import useCreateTicket from "../../ticket/api/create-ticket.api.ts";
import { useSocketStore } from "../store/socket.store.ts";
import { useUserStore } from "../../user/user.store.ts";
import useUpdateTicket from "../../ticket/api/update-ticket.api.ts";
import useDeleteTicket from "../../ticket/api/delete-ticket.api.ts";
import useUpdateBoard from "../../board/api/update-board.api.ts";
import { useNavigate } from "react-router-dom";
import useCreateStatus from "../../status/api/create-status.api.ts";
import useUpdateStatus from "../../status/api/update-status.api.ts";
import useDeleteStatus from "../../status/api/delete-status.api.ts";

export const useReceiveMessageHandler = () => {
  const { updateBoard } = useUpdateBoard();

  const { createStatus } = useCreateStatus();
  const { updateStatus } = useUpdateStatus();
  const { deleteStatus } = useDeleteStatus();

  const { createTicket } = useCreateTicket();
  const { updateTicket } = useUpdateTicket();
  const { deleteTicket } = useDeleteTicket();

  const { userState } = useUserStore();
  const { receiveMessage, resetReceiveMessage } = useSocketStore();
  const navigate = useNavigate();

  const receiveMessageHandler = async () => {
    if (!receiveMessage) return;
    if (receiveMessage.message.userId === userState.id) return;

    const controller = receiveMessage.sourceMethod.split(".")[0];
    const method = receiveMessage.sourceMethod.split(".")[1];

    if (controller === "BoardController") {
      if (method === "update") updateBoard(receiveMessage.message.board);
      if (method === "remove") navigate("/");
    }

    if (controller === "StatusController") {
      if (method === "create") createStatus(receiveMessage.message.status);
      if (method === "update")
        updateStatus(undefined, receiveMessage.message.status);
      if (method === "remove") deleteStatus(receiveMessage.message.status);
    }

    if (controller === "TicketController") {
      if (method === "create") createTicket(receiveMessage.message.ticket);
      if (method === "update")
        updateTicket(undefined, receiveMessage.message.ticket);
      if (method === "remove") deleteTicket(receiveMessage.message.ticket);
    }
    resetReceiveMessage();
  };

  return { receiveMessageHandler };
};
