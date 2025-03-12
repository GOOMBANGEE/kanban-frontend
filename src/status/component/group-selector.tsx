import { useStatusStore } from "../status.store.ts";
import { useRef } from "react";
import { statusGroup } from "../status.type.ts";
import { useClickOutside } from "../../common/util/click-outside.ts";

export default function GroupSelector() {
  const { statusState, setStatusState } = useStatusStore();
  const ref = useRef<HTMLDivElement>(null);

  const handleClickGroup = () => {
    setStatusState({ groupList: true });
  };

  useClickOutside({
    ref,
    onClose: () => setStatusState({ groupList: false }),
    enabled: statusState.groupList,
  });

  const handleClick = (group: keyof typeof statusGroup) => {
    setStatusState({ group: group, groupList: false });
  };

  return (
    <div className={"relative"}>
      <button
        className={
          "hover:bg-customGray-100 flex w-full items-center gap-x-1 rounded-sm px-2 py-1"
        }
        onClick={handleClickGroup}
      >
        <svg
          width="16px"
          height="16px"
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
              d="M8 12.5L10.5 15L16 9M7.2 20H16.8C17.9201 20 18.4802 20 18.908 19.782C19.2843 19.5903 19.5903 19.2843 19.782 18.908C20 18.4802 20 17.9201 20 16.8V7.2C20 6.0799 20 5.51984 19.782 5.09202C19.5903 4.71569 19.2843 4.40973 18.908 4.21799C18.4802 4 17.9201 4 16.8 4H7.2C6.0799 4 5.51984 4 5.09202 4.21799C4.71569 4.40973 4.40973 4.71569 4.21799 5.09202C4 5.51984 4 6.07989 4 7.2V16.8C4 17.9201 4 18.4802 4.21799 18.908C4.40973 19.2843 4.71569 19.5903 5.09202 19.782C5.51984 20 6.07989 20 7.2 20Z"
              stroke="#ffffff"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            ></path>
          </g>
        </svg>
        <div>Group</div>

        {/* select group */}
        <div className={"ml-auto flex items-center"}>
          <div>{statusGroup[statusState.group]}</div>
          <svg
            width="16px"
            height="16px"
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
                d="M9 6L15 12L9 18"
                stroke="#ffffff"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              ></path>
            </g>
          </svg>
        </div>
      </button>

      {statusState.groupList ? (
        <div
          ref={ref}
          className={
            "bg-customBlack-100 border-customGray-100 absolute flex w-full flex-col gap-y-1 rounded-sm border px-2 py-2"
          }
        >
          <ul className={"flex flex-col gap-y-1"}>
            {Object.entries(statusGroup).map(([key, value]) => (
              <li
                key={key}
                className={
                  "hover:bg-customGray-100 flex w-full rounded-sm px-2"
                }
              >
                <button
                  onClick={() => handleClick(key as keyof typeof statusGroup)}
                  className={"flex w-full items-center gap-x-1"}
                >
                  <div>{value}</div>
                  {key === statusState.group ? (
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
        </div>
      ) : null}
    </div>
  );
}
