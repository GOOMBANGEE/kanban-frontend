import { useTicketStore } from "../ticket.store.ts";
import { ChangeEvent, useEffect, useRef } from "react";
import { useClickOutside } from "../../common/util/click-outside.ts";
import useCreateTicket from "../api/create-ticket.api.ts";

export default function CreateTicket() {
  const { createTicket } = useCreateTicket();
  const { ticketState, setTicketState, resetTicketState } = useTicketStore();
  const ref = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setTicketState({ title: e.target.value });
  };

  const onClose = async () => {
    if (ticketState.title && !ticketState.createProcessing) {
      setTicketState({ createProcessing: true });
      await createTicket();
      resetTicketState();
      return;
    }
    resetTicketState();
  };

  useClickOutside({ ref, onClose, enabled: ticketState.create });

  useEffect(() => {
    if (ticketState.create) inputRef.current?.focus();
  }, [ticketState.create]);

  return (
    <div
      ref={ref}
      className={
        "bg-customBlack-400 flex h-8 w-full items-center gap-x-2 rounded-md px-2 py-1 text-sm"
      }
    >
      <svg
        width="16px"
        height="16px"
        viewBox="0 0 24 24"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className={"stroke-customGray-200"}
      >
        <g id="SVGRepo_bgCarrier" strokeWidth="0"></g>
        <g
          id="SVGRepo_tracerCarrier"
          strokeLinecap="round"
          strokeLinejoin="round"
        ></g>
        <g id="SVGRepo_iconCarrier">
          <path
            d="M19 9V17.8C19 18.9201 19 19.4802 18.782 19.908C18.5903 20.2843 18.2843 20.5903 17.908 20.782C17.4802 21 16.9201 21 15.8 21H8.2C7.07989 21 6.51984 21 6.09202 20.782C5.71569 20.5903 5.40973 20.2843 5.21799 19.908C5 19.4802 5 18.9201 5 17.8V6.2C5 5.07989 5 4.51984 5.21799 4.09202C5.40973 3.71569 5.71569 3.40973 6.09202 3.21799C6.51984 3 7.0799 3 8.2 3H13M19 9L13 3M19 9H14C13.4477 9 13 8.55228 13 8V3"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          ></path>
        </g>
      </svg>

      <input
        ref={inputRef}
        onChange={handleChange}
        className={"outline-hidden"}
      />
    </div>
  );
}
