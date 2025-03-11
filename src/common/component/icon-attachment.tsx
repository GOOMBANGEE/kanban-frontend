import { ChangeEvent, useRef } from "react";
import { useBoardStore } from "../../board/board.store.ts";
import { useEnvStore } from "../store/env.store.ts";

export default function IconAttachment() {
  const { boardState, setBoardState } = useBoardStore();
  const { envState } = useEnvStore();
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleClickIconRemove = () => {
    if (boardState.icon) {
      setBoardState({ icon: undefined });
      return;
    }
    setBoardState({ uploadIcon: undefined });
  };

  // 버튼클릭시 input 클릭하는 효과
  const handleClickFileInputButton = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };
  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];

    if (file?.type.startsWith("image")) {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onloadend = () => {
        const image = new Image();
        image.src = reader.result as string;
        image.onload = () => {
          setBoardState({ uploadIcon: image.src });
        };
      };
      if (fileInputRef.current) fileInputRef.current.value = "";
    }
  };

  return (
    <>
      {boardState.icon || boardState.uploadIcon ? (
        <div
          className={
            "border-customGray-100 bg-customBlack-600 rounded border-b-2 px-4 py-4"
          }
        >
          <div
            className={
              "bg-customBlack-400 relative flex h-24 w-24 flex-col items-center justify-center rounded px-3"
            }
          >
            <div className={"bg-customGray-100 w-full rounded-full"}>
              <img
                className={"h-20 w-20 rounded-full object-contain"}
                src={
                  boardState.icon
                    ? `${envState.baseUrl}/${boardState.icon}`
                    : boardState.uploadIcon
                }
                alt={"upload icon"}
              />
            </div>
            <button onClick={handleClickIconRemove}>
              <div
                style={{ right: -10, top: -5 }}
                className={"bg-customBlack-100 absolute rounded p-0.5"}
              >
                <svg
                  width="24px"
                  height="24px"
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
                      className={"stroke-red-500"}
                      d="M18 6L17.1991 18.0129C17.129 19.065 17.0939 19.5911 16.8667 19.99C16.6666 20.3412 16.3648 20.6235 16.0011 20.7998C15.588 21 15.0607 21 14.0062 21H9.99377C8.93927 21 8.41202 21 7.99889 20.7998C7.63517 20.6235 7.33339 20.3412 7.13332 19.99C6.90607 19.5911 6.871 19.065 6.80086 18.0129L6 6M4 6H20M16 6L15.7294 5.18807C15.4671 4.40125 15.3359 4.00784 15.0927 3.71698C14.8779 3.46013 14.6021 3.26132 14.2905 3.13878C13.9376 3 13.523 3 12.6936 3H11.3064C10.477 3 10.0624 3 9.70951 3.13878C9.39792 3.26132 9.12208 3.46013 8.90729 3.71698C8.66405 4.00784 8.53292 4.40125 8.27064 5.18807L8 6M14 10V17M10 10V17"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    ></path>
                  </g>
                </svg>
              </div>
            </button>
          </div>
        </div>
      ) : (
        <button
          type={"button"}
          onClick={handleClickFileInputButton}
          className={"flex h-24 w-24 items-center justify-center"}
        >
          <input
            type="file"
            accept="image/*"
            ref={fileInputRef}
            onChange={handleFileChange}
            className={"hidden"}
          />
          <div>
            <svg
              width="24px"
              height="24px"
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
                  className={"stroke-customGray-500"}
                  d="M8 12H16M12 8V16M21 12C21 16.9706 16.9706 21 12 21C7.02944 21 3 16.9706 3 12C3 7.02944 7.02944 3 12 3C16.9706 3 21 7.02944 21 12Z"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                ></path>
              </g>
            </svg>
          </div>
        </button>
      )}
    </>
  );
}
