import { useTicketStore } from "../ticket.store.ts";

type Props = {
  statusId: string | undefined;
};

export default function CreateTicketButton(props: Readonly<Props>) {
  const { setTicketState, resetTicketState } = useTicketStore();

  const handleClick = () => {
    resetTicketState();
    setTicketState({ create: true, statusId: props.statusId });
  };

  return (
    <button
      onClick={handleClick}
      className={
        "hover:bg-customBlack-400 border-customBlack-400 text-customGray-200 flex h-8 w-full items-center rounded-md border px-2 py-1"
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
            d="M6 12H18M12 6V18"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          ></path>
        </g>
      </svg>
      <div>New page</div>
    </button>
  );
}
