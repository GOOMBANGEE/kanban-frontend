import ModalBackground from "../../common/component/modal-background.tsx";
import { useBoardStore } from "../board.store.ts";
import { ChangeEvent, FormEvent, useRef } from "react";
import { BoardState, BoardStateKey } from "../board.type.ts";
import IconAttachment from "../../common/component/icon-attachment.tsx";
import useTitleRegexBoard from "../util/title-regex-board.util.ts";
import useCreateBoard from "../api/create-board.api.ts";
import { useNavigate } from "react-router-dom";

export default function CreateBoardModal() {
  const { createBoard } = useCreateBoard();
  const { titleRegex } = useTitleRegexBoard();
  const { boardState, setBoardState, resetBoardState } = useBoardStore();
  const navigate = useNavigate();
  const ref = useRef<HTMLDivElement>(null);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    if (!titleRegex()) return;
    const boardId = await createBoard();
    resetBoardState();
    navigate(`/board/${boardId}`);
  };

  const handleChangeInput =
    (field: keyof BoardState) => (e: ChangeEvent<HTMLInputElement>) => {
      setBoardState({ [field]: e.target.value });
    };

  return (
    <ModalBackground
      ref={ref}
      onClose={() => setBoardState({ createModal: false })}
      enabled={boardState.createModal}
    >
      <div ref={ref} className={"bg-customBlack-700 h-52 rounded-sm px-6 py-4"}>
        <form onSubmit={handleSubmit} className={"flex flex-col gap-y-4"}>
          <div className={"flex items-center gap-x-2"}>
            {/* icon */}
            <IconAttachment />
            {/* title */}
            <input
              type={"text"}
              placeholder={"title"}
              value={boardState.title ?? ""}
              onChange={handleChangeInput(BoardStateKey.title)}
              className={"bg-customBlack-400 text-customText px-2"}
            />
          </div>
          <div className={"flex gap-x-4 px-4"}>
            <button type={"submit"}>create</button>
            <button
              type={"reset"}
              onClick={() => setBoardState({ createModal: false })}
            >
              cancel
            </button>
          </div>
        </form>
      </div>
    </ModalBackground>
  );
}
