import { useTicketStore } from "../ticket.store.ts";
import ReactDatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import useUpdateTicket from "../api/update-ticket.api.ts";

export default function DateTicket() {
  const { updateTicket } = useUpdateTicket();
  const { ticketState, setTicketState } = useTicketStore();

  const startDate = ticketState.startDate
    ? new Date(ticketState.startDate)
    : undefined;
  const endDate = ticketState.endDate
    ? new Date(ticketState.endDate)
    : undefined;

  const onChange = async (date: Date, type: string) => {
    setTicketState({
      [type === "start" ? "newStartDate" : "newEndDate"]: date.toISOString(),
    });
    if (
      await updateTicket({
        [type === "start" ? "startDate" : "endDate"]: date.toISOString(),
      })
    )
      setTicketState({
        [type === "start" ? "startDate" : "endDate"]: date.toISOString(),
        [type === "start" ? "newStartDate" : "newEndDate"]: undefined,
      });
  };

  return (
    <div className={"text-customGray-300 flex items-center gap-x-2 text-sm"}>
      <svg
        width="16px"
        height="16px"
        viewBox="0 0 24 24"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className={"stroke-customGray-200 shrink-0"}
      >
        <g id="SVGRepo_bgCarrier" strokeWidth="0"></g>
        <g
          id="SVGRepo_tracerCarrier"
          strokeLinecap="round"
          strokeLinejoin="round"
        ></g>
        <g id="SVGRepo_iconCarrier">
          <path
            d="M3 9H21M7 3V5M17 3V5M6 13H8M6 17H8M11 13H13M11 17H13M16 13H18M16 17H18M6.2 21H17.8C18.9201 21 19.4802 21 19.908 20.782C20.2843 20.5903 20.5903 20.2843 20.782 19.908C21 19.4802 21 18.9201 21 17.8V8.2C21 7.07989 21 6.51984 20.782 6.09202C20.5903 5.71569 20.2843 5.40973 19.908 5.21799C19.4802 5 18.9201 5 17.8 5H6.2C5.0799 5 4.51984 5 4.09202 5.21799C3.71569 5.40973 3.40973 5.71569 3.21799 6.09202C3 6.51984 3 7.07989 3 8.2V17.8C3 18.9201 3 19.4802 3.21799 19.908C3.40973 20.2843 3.71569 20.5903 4.09202 20.782C4.51984 21 5.07989 21 6.2 21Z"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          ></path>
        </g>
      </svg>
      Date
      {/* startDate */}
      <ReactDatePicker
        className={"react-datepicker w-36"}
        selected={startDate}
        onChange={(date: Date | null) =>
          date ? onChange(date, "start") : undefined
        }
        selectsStart
        startDate={startDate}
        endDate={endDate}
        placeholderText={"Empty"}
        dateFormat={"MMMM d, yyyy"}
      />
      {ticketState.endDate ? (
        <svg
          width="16px"
          height="16px"
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className={"stroke-customGray-200 shrink-0"}
        >
          <g id="SVGRepo_bgCarrier" strokeWidth="0"></g>
          <g
            id="SVGRepo_tracerCarrier"
            strokeLinecap="round"
            strokeLinejoin="round"
          ></g>
          <g id="SVGRepo_iconCarrier">
            <path
              d="M5 12H19M19 12L13 6M19 12L13 18"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            ></path>
          </g>
        </svg>
      ) : null}
      {/* endDate */}
      <ReactDatePicker
        className={"react-datepicker w-36"}
        selected={endDate}
        onChange={(date: Date | null) =>
          date ? onChange(date, "end") : undefined
        }
        selectsEnd
        startDate={startDate}
        endDate={endDate}
        minDate={startDate} // 시작 날짜 이후로만 선택 가능
        popperPlacement={"bottom-end"}
        dateFormat={"MMMM d, yyyy"}
      />
    </div>
  );
}
