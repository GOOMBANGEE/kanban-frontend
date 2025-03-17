import { useBoardStore } from "../board.store.ts";

export default function NewBoardButton() {
  const { setBoardState } = useBoardStore();

  const handleClickButton = () => {
    setBoardState({ newModal: true });
  };

  return (
    <button
      onClick={handleClickButton}
      className={
        "bg-customBlack-700 flex items-center rounded-2xl px-2 py-1 text-sm font-semibold"
      }
    >
      <svg
        width="24px"
        height="24px"
        viewBox="0 0 24 24"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        stroke="#ffffff"
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
            stroke="#ffffff"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          ></path>
        </g>
      </svg>
      New Board
    </button>
  );
}
