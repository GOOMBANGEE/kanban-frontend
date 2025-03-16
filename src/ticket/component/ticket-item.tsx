import { Ticket } from "../ticket.type.ts";
import SettingTicketModal from "./setting-ticket-modal.tsx";
import { useTicketStore } from "../ticket.store.ts";
import SettingTicketButton from "./setting-ticket-button.tsx";
import * as React from "react";
import useUpdateTicket from "../api/update-ticket.api.ts";

type Props = Ticket & {
  prev: number | undefined;
  next: number | undefined;
};

export default function TicketItem(props: Readonly<Props>) {
  const { updateTicket } = useUpdateTicket();
  const { ticketState, setTicketState } = useTicketStore();

  // drag event
  const handleDragStart = (e: React.MouseEvent) => {
    e.stopPropagation();
    setTicketState({
      ...props,
      statusId: props.statusId,
      focusId: props.id,
      drag: true,
    });
  };
  const handleDragEnter = (e: React.DragEvent) => {
    e.stopPropagation();

    if (ticketState.focusId === props.id) return;
    if (ticketState.statusId === props.statusId) {
      if (
        ticketState.displayOrder &&
        props.displayOrder &&
        ticketState.displayOrder > props.displayOrder
      ) {
        setTicketState({
          id: props.id,
          prev: props.prev,
          next: props.displayOrder,
        });
        return;
      }
      setTicketState({
        id: props.id,
        prev: props.displayOrder,
        next: props.next,
      });
      return;
    }

    if (ticketState.displayOrder && props.displayOrder) {
      setTicketState({
        prev: props.prev,
        next: props.displayOrder,
        newStatusId: props.statusId,
      });
    }
  };

  const handleDragEnd = (e: React.DragEvent) => {
    e.stopPropagation();

    if (ticketState.focusId === ticketState.id && !ticketState.newStatusId)
      return;

    let displayOrder;
    if (ticketState.next) {
      displayOrder = ((ticketState.prev ?? 0) + ticketState.next) / 2;
    } else if (ticketState.prev && !ticketState.next) {
      displayOrder = ticketState.prev * 2;
    }

    updateTicket({
      displayOrder,
      statusId: ticketState.newStatusId ?? ticketState.statusId,
    });
    setTicketState({
      drag: false,
      prev: undefined,
      next: undefined,
      newStatusId: undefined,
    });
  };

  const handleMouseEnter = (e: React.MouseEvent) => {
    e.stopPropagation();
    setTicketState({ id: props.id, hover: true });
  };

  const handleMouseLeave = () => {
    setTicketState({ hover: false });
  };

  const handleClick = () => {
    setTicketState({
      ...props,
      focusId: props.id,
      detail: true,
      updateTitle: true,
    });
  };

  return (
    <div
      draggable={true}
      onDragStart={handleDragStart}
      onDragEnter={handleDragEnter}
      onDragEnd={handleDragEnd}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onClick={handleClick}
      className={`relative flex h-8 w-full items-center rounded-md px-2 py-1 text-sm ${props.id === ticketState.focusId && ticketState.setting ? "bg-customBlue" : "bg-customBlack-400 hover:bg-customBlack-600"}`}
    >
      <div className={"flex w-full items-center gap-x-2"}>
        {props.content ? (
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
                d="M9 17H15M9 13H15M9 9H10M13 3H8.2C7.0799 3 6.51984 3 6.09202 3.21799C5.71569 3.40973 5.40973 3.71569 5.21799 4.09202C5 4.51984 5 5.0799 5 6.2V17.8C5 18.9201 5 19.4802 5.21799 19.908C5.40973 20.2843 5.71569 20.5903 6.09202 20.782C6.51984 21 7.0799 21 8.2 21H15.8C16.9201 21 17.4802 21 17.908 20.782C18.2843 20.5903 18.5903 20.2843 18.782 19.908C19 19.4802 19 18.9201 19 17.8V9M13 3L19 9M13 3V7.4C13 7.96005 13 8.24008 13.109 8.45399C13.2049 8.64215 13.3578 8.79513 13.546 8.89101C13.7599 9 14.0399 9 14.6 9H19"
                stroke="#ffffff"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              ></path>
            </g>
          </svg>
        ) : (
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
        )}
        <div>{props.title}</div>
      </div>
      {props.id === ticketState.id &&
      ticketState.hover &&
      !ticketState.detail ? (
        <SettingTicketButton {...props} />
      ) : null}
      {props.id === ticketState.focusId && ticketState.setting ? (
        <SettingTicketModal />
      ) : null}
    </div>
  );
}
