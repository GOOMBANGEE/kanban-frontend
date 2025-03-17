import { useBoardStore } from "../board.store.ts";
import useInviteBoard from "../api/invite-board.api.ts";
import * as React from "react";
import useDeleteInviteBoard from "../api/delete-invite-board.api.ts";

export default function InviteBoard() {
  const { inviteBoard } = useInviteBoard();
  const { deleteInviteBoard } = useDeleteInviteBoard();
  const { boardState, setBoardState } = useBoardStore();

  const handleClickCopy = async (e: React.MouseEvent) => {
    if (!boardState.inviteCode || boardState.inviteCopy) {
      e.preventDefault();
      return;
    }
    e.preventDefault();
    await navigator.clipboard.writeText(String(boardState.inviteCode));
    setBoardState({ inviteCopy: true });

    setTimeout(() => {
      setBoardState({ inviteCopy: false });
    }, 1000);
  };
  const handleClickGenerate = (e: React.MouseEvent) => {
    e.preventDefault();
    inviteBoard();
  };
  const handleClickDelete = (e: React.MouseEvent) => {
    e.preventDefault();
    deleteInviteBoard();
  };

  return (
    <div className={"mt-2"}>
      Invite code
      <div
        className={`bg-customBlack-400 w-full truncate overflow-x-hidden rounded-md px-2 py-1 text-sm ${boardState.inviteCode ? "text-customText" : "text-customGray-300"} `}
      >
        {boardState.inviteCode ? boardState.inviteCode : "Empty"}
      </div>
      <div className={"mt-2 flex gap-x-1 text-xs"}>
        <button
          onClick={handleClickCopy}
          className={`rounded-md px-1 py-0.5 ${boardState.inviteCopy ? "bg-green-500 hover:bg-green-600" : "bg-indigo-500 hover:bg-indigo-600"}`}
        >
          {boardState.inviteCopy ? "Copied" : "Copy"}
        </button>
        <button
          onClick={handleClickGenerate}
          className={"rounded-md bg-indigo-500 px-1 py-0.5 hover:bg-indigo-600"}
        >
          Generate
        </button>
        <button
          onClick={handleClickDelete}
          className={"rounded-md bg-red-500 px-1 py-0.5 hover:bg-red-600"}
        >
          Delete
        </button>
      </div>
    </div>
  );
}
