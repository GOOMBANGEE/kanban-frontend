import { useRef } from "react";
import { useTicketStore } from "../ticket.store.ts";
import { useClickOutside } from "../../common/util/click-outside.ts";
import TitleTicket from "./title-ticket.tsx";
import ContentTicket from "./content-ticket.tsx";
import useUpdateTicket from "../api/update-ticket.api.ts";

export default function DetailTicket() {
  const { updateTicket } = useUpdateTicket();
  const { ticketState, setTicketState } = useTicketStore();

  const ref = useRef<HTMLDivElement>(null);
  const onClose = () => {
    updateTicket({
      title: ticketState.newTitle,
      content: ticketState.newContent,
    });

    setTicketState({ detail: false, updateTitle: false, updateContent: false });
  };
  useClickOutside({ ref, onClose, enabled: ticketState.detail });

  return (
    <div
      ref={ref}
      className={
        "bg-customBlack-300 absolute top-0 right-0 flex h-full w-1/2 flex-col gap-y-4 px-12 pt-16 transition-all duration-300 ease-in-out"
      }
    >
      <TitleTicket />

      <div className={"border-customBlack-500 border"} />
      <ContentTicket />
    </div>
  );
}
