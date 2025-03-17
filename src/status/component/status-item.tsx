import { Status, statusColor } from "../status.type.ts";
import { useStatusStore } from "../status.store.ts";
import SettingStatusButton from "./setting-status-button.tsx";
import CreateTicketButton from "../../ticket/component/create-ticket-button.tsx";
import CreateTicket from "../../ticket/component/create-ticket.tsx";
import TicketItem from "../../ticket/component/ticket-item.tsx";
import { useTicketStore } from "../../ticket/ticket.store.ts";
import * as React from "react";
import useUpdateStatus from "../api/update-status.api.ts";

type Props = Status & {
  prev: number | undefined;
  next: number | undefined;
};

export default function StatusItem(props: Readonly<Props>) {
  const { updateStatus } = useUpdateStatus();
  const { statusState, setStatusState } = useStatusStore();
  const { ticketState, setTicketState, ticketListState } = useTicketStore();

  const backgroundColor = Object.entries(statusColor).find(
    ([color]) => color === props.color,
  )?.[1];

  const handleMouseEnter = () => {
    if (ticketState.focusId === props.id) return;
    setStatusState({ id: props.id, hover: true });
  };
  const handleMouseLeave = () => {
    setStatusState({ hover: false });
  };

  // drag event
  const handleDragStart = (e: React.MouseEvent) => {
    e.stopPropagation();
    setStatusState({ ...props, focusId: props.id, drag: true });
  };
  const handleDragEnter = (e: React.DragEvent) => {
    e.stopPropagation();

    // status move
    if (statusState.drag) {
      if (statusState.focusId === props.id) return;
      if (
        statusState.displayOrder &&
        props.displayOrder &&
        statusState.displayOrder > props.displayOrder
      ) {
        setStatusState({
          id: props.id,
          prev: props.prev,
          next: props.displayOrder,
        });
        return;
      }
      setStatusState({
        id: props.id,
        prev: props.displayOrder,
        next: props.next,
      });
    }

    // ticket move
    if (ticketState.drag) {
      setTicketState({ newStatusId: props.id });
    }
  };

  const handleDragEnd = () => {
    if (statusState.focusId === statusState.id) return;
    let displayOrder;
    if (statusState.next) {
      displayOrder = ((statusState.prev ?? 0) + statusState.next) / 2;
    } else if (statusState.prev && !statusState.next) {
      displayOrder = statusState.prev * 2;
    }
    updateStatus({ displayOrder });
    setStatusState({ drag: false, prev: undefined, next: undefined });
  };

  const sortedList = ticketListState
    .filter((ticket) => ticket.statusId === props.id)
    .toSorted((a, b) => {
      const orderA = a.displayOrder ?? Number.MAX_SAFE_INTEGER;
      const orderB = b.displayOrder ?? Number.MAX_SAFE_INTEGER;
      return orderA - orderB;
    });

  return (
    <div
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onDragStart={handleDragStart}
      onDragEnter={handleDragEnter}
      onDragEnd={handleDragEnd}
      className={"w-56 shrink-0"}
    >
      <div draggable={true} className={"flex w-full items-center"}>
        <div
          className={`${backgroundColor} mb-2 w-fit rounded-sm px-1 text-xs`}
        >
          {props.title}
        </div>

        {props.id === statusState.id && statusState.hover ? (
          <SettingStatusButton {...props} />
        ) : null}
      </div>

      <div className={"mb-1 flex flex-col gap-y-1"}>
        {sortedList?.map((ticket, index) => {
          const prev =
            index > 0 ? sortedList[index - 1].displayOrder : undefined;
          const next =
            index < sortedList.length - 1
              ? sortedList[index + 1].displayOrder
              : undefined;

          return (
            <TicketItem key={ticket.id} {...ticket} prev={prev} next={next} />
          );
        })}
      </div>

      {props.id === ticketState.statusId && ticketState.create ? null : (
        <CreateTicketButton statusId={props.id} />
      )}
      {props.id === ticketState.statusId && ticketState.create ? (
        <CreateTicket />
      ) : null}

      <div className="block h-8" />
    </div>
  );
}
