import { Status } from "../status.type.ts";
import { useStatusStore } from "../status.store.ts";
import { useRef } from "react";

export default function SettingStatusButton(props: Readonly<Status>) {
  const { statusState, setStatusState } = useStatusStore();
  const ref = useRef<HTMLButtonElement>(null);

  const handleClick = () => {
    setStatusState({
      ...props,
      focusId: props.id,
      setting: true,
      settingX: ref.current?.getBoundingClientRect().left,
      settingY: ref.current?.getBoundingClientRect().top,
    });
  };

  return (
    <>
      {props.id === statusState.id && statusState.hover ? (
        <button ref={ref} onClick={handleClick} className={"ml-auto"}>
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
                d="M18 12H18.01M12 12H12.01M6 12H6.01M13 12C13 12.5523 12.5523 13 12 13C11.4477 13 11 12.5523 11 12C11 11.4477 11.4477 11 12 11C12.5523 11 13 11.4477 13 12ZM19 12C19 12.5523 18.5523 13 18 13C17.4477 13 17 12.5523 17 12C17 11.4477 17.4477 11 18 11C18.5523 11 19 11.4477 19 12ZM7 12C7 12.5523 6.55228 13 6 13C5.44772 13 5 12.5523 5 12C5 11.4477 5.44772 11 6 11C6.55228 11 7 11.4477 7 12Z"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              ></path>
            </g>
          </svg>
        </button>
      ) : null}
    </>
  );
}
