import { ChangeEvent, useEffect, useRef } from "react";
import { useClickOutside } from "../../common/util/click-outside.ts";
import { useTicketStore } from "../ticket.store.ts";
import useUpdateTicket from "../api/update-ticket.api.ts";

export default function ContentTicket() {
  const { updateTicket } = useUpdateTicket();
  const { ticketState, setTicketState } = useTicketStore();
  const ref = useRef<HTMLInputElement>(null);
  const stateRef = useRef<string | undefined>(undefined);

  const onClose = () => {
    if (ticketState.newContent !== stateRef.current) {
      updateTicket({ content: ticketState.newContent });
      setTicketState({ updateContent: false });
    }
  };
  useClickOutside({ ref, onClose, enabled: ticketState.updateContent });

  const handleClickContent = () => {
    setTicketState({ updateContent: true });
  };
  const handleChangeContent = (e: ChangeEvent<HTMLInputElement>) => {
    setTicketState({ newContent: e.target.value });
  };
  useEffect(() => {
    if (ticketState.newContent !== stateRef.current) {
      updateTicket({ content: ticketState.newContent });
      stateRef.current = ticketState.newContent;
    }
  }, [ticketState.newContent]);

  useEffect(() => {
    if (ticketState.updateContent) {
      ref.current?.focus();
      stateRef.current = ticketState.content;
    }
  }, [ticketState.updateContent]);

  return (
    <button
      onClick={handleClickContent}
      className={"flex h-full items-start text-start text-sm"}
    >
      <input
        ref={ref}
        value={ticketState.newContent ?? ticketState.content ?? ""}
        onChange={handleChangeContent}
        className={"flex items-start justify-start text-start outline-hidden"}
      />

      {ticketState.content || ticketState.newContent ? null : (
        <div className={"text-customGray-300 absolute"}>Content</div>
      )}
    </button>
  );
}
