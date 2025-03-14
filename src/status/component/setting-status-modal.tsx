import { useStatusStore } from "../status.store.ts";
import { useClickOutside } from "../../common/util/click-outside.ts";
import { ChangeEvent, useEffect, useRef } from "react";
import ColorSelector from "./color-selector.tsx";
import GroupSelector from "./group-selector.tsx";
import useUpdateStatus from "../api/update-status.api.ts";
import { Status } from "../status.type.ts";

export default function SettingStatusModal() {
  const { updateStatus } = useUpdateStatus();
  const { statusState, setStatusState, resetStatusState } = useStatusStore();
  const ref = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const statusRef = useRef<Status>(null);

  const onClose = async () => {
    if (
      statusState.title !== statusRef.current?.title ||
      statusState.color !== statusRef.current?.color ||
      statusState.group !== statusRef.current?.group
    ) {
      await updateStatus();
      resetStatusState();
      return;
    }
    resetStatusState();
  };

  useClickOutside({
    ref,
    onClose,
    enabled: statusState.setting,
  });

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setStatusState({ title: e.target.value });
  };

  const handleClickDelete = () => {
    setStatusState({ setting: false, delete: true });
  };

  useEffect(() => {
    if (statusState.setting) {
      inputRef.current?.focus();
      statusRef.current = { ...statusState };
    }
  }, [statusState.setting]);

  useEffect(() => {
    if (
      statusState.focusId &&
      (statusState.color !== statusRef.current?.color ||
        statusState.group !== statusRef.current?.group)
    ) {
      updateStatus();
      statusRef.current = statusState;
    }
  }, [statusState.color, statusState.group]);

  return (
    <div
      ref={ref}
      style={{
        top: `${(statusState.settingY ?? 0) + 20}px`,
        left: `${(statusState.settingX ?? 0) - 170}px`,
      }}
      className={
        "bg-customBlack-600 absolute z-10 mr-2 flex flex-col gap-y-1 rounded-sm px-2 py-2 text-sm"
      }
    >
      {/* title */}
      <div className={"px-2"}>
        <input
          ref={inputRef}
          value={statusState.title ?? ""}
          placeholder={"Type a new option..."}
          onChange={handleChange}
          className={"mt-0.5 mb-2 h-fit rounded-sm py-1 focus:ring"}
        />
      </div>
      <button
        onClick={handleClickDelete}
        className={
          "hover:bg-customGray-100 flex w-full items-center gap-x-1 rounded-sm px-2 py-1"
        }
      >
        <svg
          width="16px"
          height="16px"
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className={"stroke-customGray-500"}
        >
          <g id="SVGRepo_bgCarrier" strokeWidth="0"></g>
          <g
            id="SVGRepo_tracerCarrier"
            strokeLinecap="round"
            strokeLinejoin="round"
          ></g>
          <g id="SVGRepo_iconCarrier">
            <path
              d="M18 6L17.1991 18.0129C17.129 19.065 17.0939 19.5911 16.8667 19.99C16.6666 20.3412 16.3648 20.6235 16.0011 20.7998C15.588 21 15.0607 21 14.0062 21H9.99377C8.93927 21 8.41202 21 7.99889 20.7998C7.63517 20.6235 7.33339 20.3412 7.13332 19.99C6.90607 19.5911 6.871 19.065 6.80086 18.0129L6 6M4 6H20M16 6L15.7294 5.18807C15.4671 4.40125 15.3359 4.00784 15.0927 3.71698C14.8779 3.46013 14.6021 3.26132 14.2905 3.13878C13.9376 3 13.523 3 12.6936 3H11.3064C10.477 3 10.0624 3 9.70951 3.13878C9.39792 3.26132 9.12208 3.46013 8.90729 3.71698C8.66405 4.00784 8.53292 4.40125 8.27064 5.18807L8 6M14 10V17M10 10V17"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            ></path>
          </g>
        </svg>
        Delete
      </button>

      {/* group */}
      <GroupSelector />

      {/* color */}
      <ColorSelector />
    </div>
  );
}
