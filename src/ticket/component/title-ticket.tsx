import { ChangeEvent, useEffect, useRef } from "react";
import { useTicketStore } from "../ticket.store.ts";
import useUpdateTicket from "../api/update-ticket.api.ts";
import DOMPurify from "dompurify";

export default function TitleTicket() {
  const { updateTicket } = useUpdateTicket();
  const { ticketState, setTicketState } = useTicketStore();
  const ref = useRef<HTMLInputElement>(null);
  const stateRef = useRef<string | undefined>(undefined);

  // input
  const handleBlur = () => {
    setTicketState({ updateTitle: false });
  };
  const handleChangeTitle = (e: ChangeEvent<HTMLInputElement>) => {
    setTicketState({ newTitle: e.target.value });
  };
  useEffect(() => {
    if (ticketState.newTitle && ticketState.newTitle !== stateRef.current) {
      updateTicket({ title: ticketState.newTitle });
      stateRef.current = ticketState.newTitle;
      setTicketState({ newTitle: undefined });
    }
  }, [ticketState.newTitle]);

  // div
  const handleClick = () => {
    setTicketState({ updateTitle: true });
  };

  useEffect(() => {
    if (ticketState.updateTitle) {
      ref.current?.focus();
      stateRef.current = ticketState.title;
    }
  }, [ticketState.updateTitle]);

  return (
    <>
      {ticketState.updateTitle ? (
        <>
          <input
            ref={ref}
            defaultValue={ticketState.title}
            onBlur={handleBlur}
            onChange={handleChangeTitle}
            className={"text-4xl font-semibold outline-hidden"}
          />
        </>
      ) : (
        <div
          onClick={handleClick}
          className={"text-4xl font-semibold"}
          dangerouslySetInnerHTML={{
            __html: DOMPurify.sanitize(ticketState.title ?? ""),
          }}
        ></div>
      )}
    </>
  );
}
