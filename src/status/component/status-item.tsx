import { Status, statusColor } from "../status.type.ts";
import { useStatusStore } from "../status.store.ts";
import SettingStatusButton from "./setting-status-button.tsx";
import CreateTicketButton from "../../ticket/component/create-ticket-button.tsx";
import CreateTicket from "../../ticket/component/create-ticket.tsx";
import TicketItem from "../../ticket/component/ticket-item.tsx";
import { useTicketStore } from "../../ticket/ticket.store.ts";

export default function StatusItem(props: Readonly<Status>) {
  const { statusState, setStatusState } = useStatusStore();
  const { ticketState } = useTicketStore();

  const backgroundColor = Object.entries(statusColor).find(
    ([color]) => color === props.color,
  )?.[1];

  const handleMouseEnter = () => {
    setStatusState({ id: props.id, hover: true });
  };
  const handleMouseLeave = () => {
    setStatusState({ hover: false });
  };

  const sortedList = props.Ticket.filter(
    (ticket) => ticket.statusId === props.id,
  ).toSorted((a, b) => {
    const orderA = a.displayOrder ?? Number.MAX_SAFE_INTEGER;
    const orderB = b.displayOrder ?? Number.MAX_SAFE_INTEGER;
    return orderA - orderB;
  });

  return (
    <div
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      className={"mb-4 w-56 shrink-0"}
    >
      <div className={"flex w-full items-center"}>
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
        {sortedList?.map((ticket) => (
          <TicketItem key={ticket.id} {...ticket} />
        ))}
      </div>

      {props.id === ticketState.statusId && ticketState.create ? null : (
        <CreateTicketButton statusId={props.id} />
      )}
      {props.id === ticketState.statusId && ticketState.create ? (
        <CreateTicket />
      ) : null}
    </div>
  );
}
