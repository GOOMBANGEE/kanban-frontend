import { useBoardStore } from "../board.store.ts";
import ModalBackground from "../../common/component/modal-background.tsx";
import IconAttachment from "../../common/component/icon-attachment.tsx";
import { ChangeEvent, FormEvent, useRef } from "react";
import useTitleRegexBoard from "../util/title-regex-board.util.ts";
import useUpdateBoard from "../api/update-board.api.ts";
import InviteBoard from "./invite-board.tsx";
import { useUserStore } from "../../user/user.store.ts";

export default function SettingBoardModal() {
  const { updateBoard } = useUpdateBoard();
  const { titleRegex } = useTitleRegexBoard();
  const { boardState, setBoardState, resetBoardState } = useBoardStore();
  const { userState } = useUserStore();

  const ref = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const handleClickDelete = () => {
    setBoardState({ settingModal: false, deleteModal: true });
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    if (!titleRegex()) return;
    updateBoard();
  };

  const handleChangeInput = (e: ChangeEvent<HTMLInputElement>) => {
    setBoardState({ newTitle: e.target.value });
  };

  return (
    <ModalBackground
      ref={ref}
      onClose={() => resetBoardState()}
      enabled={boardState.settingModal}
    >
      <div
        ref={ref}
        className={
          "bg-customBlack-700 flex h-56 flex-col items-center rounded-md px-6 py-4"
        }
      >
        <button onClick={handleClickDelete} className={"w-full text-end"}>
          {boardState.userId === userState.id ? "Delete" : "Leave"}
        </button>

        <form onSubmit={handleSubmit} className={"flex flex-col gap-y-4"}>
          <div className={"flex items-center gap-x-2"}>
            {/* icon */}
            <IconAttachment />

            <div className={"flex w-80 flex-col"}>
              {/* title */}
              Title
              <input
                ref={inputRef}
                type={"text"}
                placeholder={"title"}
                defaultValue={boardState.title ?? ""}
                onChange={handleChangeInput}
                className={
                  "bg-customBlack-400 text-customText rounded-md px-2 py-1 text-sm"
                }
              />
              {boardState.userId === userState.id ? <InviteBoard /> : null}
            </div>
          </div>
          {boardState.userId === userState.id ? (
            <div className={"flex gap-x-4 px-4"}>
              <button type={"submit"}>update</button>
              <button type={"reset"} onClick={resetBoardState}>
                cancel
              </button>
            </div>
          ) : null}
        </form>
      </div>
    </ModalBackground>
  );
}
