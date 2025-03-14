import { ChangeEvent, useEffect, useRef } from "react";
import { useTicketStore } from "../ticket.store.ts";
import useUpdateTicket from "../api/update-ticket.api.ts";
import { useClickOutside } from "../../common/util/click-outside.ts";

export default function TitleTicket() {
  const { updateTicket } = useUpdateTicket();
  const { ticketState, setTicketState } = useTicketStore();
  const ref = useRef<HTMLInputElement>(null);
  const stateRef = useRef<string | undefined>(undefined);

  const onClose = () => {
    if (ticketState.newTitle !== stateRef.current) {
      updateTicket({ title: ticketState.newTitle });
      setTicketState({ updateTitle: false });
    }
  };
  useClickOutside({ ref, onClose, enabled: ticketState.updateTitle });

  const handleChangeTitle = (e: ChangeEvent<HTMLInputElement>) => {
    setTicketState({ newTitle: e.target.value });
  };
  useEffect(() => {
    if (ticketState.newTitle !== stateRef.current) {
      updateTicket({ title: ticketState.newTitle });
      stateRef.current = ticketState.newTitle;
    }
  }, [ticketState.newTitle]);

  useEffect(() => {
    if (ticketState.detail) {
      ref.current?.focus();
      stateRef.current = ticketState.title;
    }
  }, [ticketState.detail]);

  return (
    <input
      ref={ref}
      value={ticketState.newTitle ?? ticketState.title ?? ""}
      placeholder={"Title"}
      onChange={handleChangeTitle}
      className={"text-4xl font-semibold outline-hidden"}
    />
  );
}
