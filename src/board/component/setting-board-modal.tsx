import { useBoardStore } from "../board.store.ts";
import ModalBackground from "../../common/component/modal-background.tsx";
import IconAttachment from "../../common/component/icon-attachment.tsx";
import { BoardState, BoardStateKey } from "../board.type.ts";
import { ChangeEvent, FormEvent, useRef } from "react";
import useTitleRegexBoard from "../util/title-regex-board.util.ts";
import useUpdateBoard from "../api/update-board.api.ts";
import InviteBoard from "./invite-board.tsx";

export default function SettingBoardModal() {
  const { boardState, setBoardState, resetBoardState } = useBoardStore();
  const { titleRegex } = useTitleRegexBoard();
  const { updateBoard } = useUpdateBoard();
  const ref = useRef<HTMLDivElement>(null);

  const handleClickDelete = () => {
    setBoardState({ deleteModal: true });
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    if (!titleRegex()) return;
    updateBoard();
  };

  const handleChangeInput =
    (field: keyof BoardState) => (e: ChangeEvent<HTMLInputElement>) => {
      setBoardState({ [field]: e.target.value });
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
          delete
        </button>
        <form onSubmit={handleSubmit} className={"flex flex-col gap-y-4"}>
          <div className={"flex items-center gap-x-2"}>
            {/* icon */}
            <IconAttachment />

            <div className={"flex w-80 flex-col"}>
              {/* title */}
              Title
              <input
                type={"text"}
                placeholder={"title"}
                value={boardState.title ?? ""}
                onChange={handleChangeInput(BoardStateKey.title)}
                className={
                  "bg-customBlack-400 text-customText rounded-md px-2 py-1 text-sm"
                }
              />
              <InviteBoard />
            </div>
          </div>
          <div className={"flex gap-x-4 px-4"}>
            <button type={"submit"}>update</button>
            <button type={"reset"} onClick={resetBoardState}>
              cancel
            </button>
          </div>
        </form>
      </div>
    </ModalBackground>
  );
}
