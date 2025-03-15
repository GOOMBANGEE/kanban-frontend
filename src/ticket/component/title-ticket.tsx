import { ChangeEvent, useEffect, useRef } from "react";
import { useTicketStore } from "../ticket.store.ts";
import useUpdateTicket from "../api/update-ticket.api.ts";

export default function TitleTicket() {
  const { updateTicket } = useUpdateTicket();
  const { ticketState, setTicketState } = useTicketStore();
  const ref = useRef<HTMLInputElement>(null);
  const stateRef = useRef<string | undefined>(undefined);

  const handleChangeTitle = (e: ChangeEvent<HTMLInputElement>) => {
    setTicketState({ newTitle: e.target.value });
  };
  useEffect(() => {
    if (ticketState.newTitle !== stateRef.current) {
      updateTicket({ title: ticketState.newTitle });
      stateRef.current = ticketState.newTitle;
      setTicketState({ newTitle: undefined });
    }
  }, [ticketState.newTitle]);

  useEffect(() => {
    if (ticketState.updateTitle) {
      ref.current?.focus();
      stateRef.current = ticketState.title;
    }
  }, [ticketState.updateTitle]);

  return (
    <>
      {ticketState.updateTitle ? (
        <input
          ref={ref}
          defaultValue={ticketState.title}
          onChange={handleChangeTitle}
          className={"text-4xl font-semibold outline-hidden"}
        />
      ) : (
        <div className={"text-4xl font-semibold"}>{ticketState.title}</div>
      )}
    </>
  );
}
