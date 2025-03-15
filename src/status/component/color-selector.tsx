import { useStatusStore } from "../status.store.ts";
import { statusColor } from "../status.type.ts";
import { useRef } from "react";
import useUpdateStatus from "../api/update-status.api.ts";

export default function ColorSelector() {
  const { updateStatus } = useUpdateStatus();
  const { statusState, setStatusState } = useStatusStore();
  const stateRef = useRef<string>(statusState.color);

  const handleClick = (color: keyof typeof statusColor) => {
    setStatusState({ color: color });
    if (color !== stateRef.current) {
      updateStatus({ color });
      stateRef.current = statusState.color;
    }
  };

  return (
    <ul className={"flex flex-col gap-y-1"}>
      {Object.entries(statusColor).map(([color, style]) => (
        <li
          key={color}
          className={"hover:bg-customGray-100 flex w-full rounded-sm px-2"}
        >
          <button
            onClick={() => handleClick(color as keyof typeof statusColor)}
            className={"flex w-full items-center gap-x-1"}
          >
            <div
              className={`h-4 w-4 rounded-sm border border-black ${style} `}
            />
            <div>{`${color.toUpperCase()[0]}${color.substring(1)}`}</div>
            {color === statusState.color ? (
              <div className={"ml-auto"}>
                <svg
                  width="12px"
                  height="12px"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <g id="SVGRepo_bgCarrier" strokeWidth="0"></g>
                  <g
                    id="SVGRepo_tracerCarrier"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  ></g>
                  <g id="SVGRepo_iconCarrier">
                    <path
                      d="M4 12.6111L8.92308 17.5L20 6.5"
                      stroke="#ffffff"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    ></path>
                  </g>
                </svg>
              </div>
            ) : null}
          </button>
        </li>
      ))}
    </ul>
  );
}
