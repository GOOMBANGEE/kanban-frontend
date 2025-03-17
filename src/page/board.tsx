import Header from "../common/component/header.tsx";
import useFetchBoardList from "../board/api/fetch-board-list.api.ts";
import { useTokenStore } from "../common/store/token.store.ts";
import { useBoardStore } from "../board/board.store.ts";
import { useGlobalStore } from "../common/store/global.store.ts";
import BoardItem from "../board/component/board-item.tsx";
import NewBoardButton from "../board/component/new-board-button.tsx";
import CreateBoardModal from "../board/component/create-board-modal.tsx";
import SettingBoardModal from "../board/component/setting-board-modal.tsx";
import DeleteBoardModal from "../board/component/delete-board-modal.tsx";
import { useEffect } from "react";
import NewBoardModal from "../board/component/new-board-modal.tsx";
import JoinBoardModal from "../board/component/join-board.modal.tsx";

export default function Board() {
  const { fetchBoardList } = useFetchBoardList();
  const { boardState, boardListState } = useBoardStore();
  const { tokenState } = useTokenStore();
  const { setGlobalState } = useGlobalStore();

  // fetch board list
  useEffect(() => {
    if (tokenState.accessToken && boardListState.boardList.length === 0) {
      setGlobalState({ loading: true });
      fetchBoardList({ page: 1 });
    }
  }, [tokenState.accessToken]);

  return (
    <>
      <Header />

      <div className={"mt-20 px-4"}>
        <NewBoardButton />
        {boardState.newModal ? <NewBoardModal /> : null}
        {boardState.createModal ? <CreateBoardModal /> : null}
        {boardState.joinModal ? <JoinBoardModal /> : null}

        {boardState.settingModal ? <SettingBoardModal /> : null}
        {boardState.deleteModal ? <DeleteBoardModal /> : null}

        <div className={"grid grid-cols-3 gap-x-2 gap-y-2 py-4"}>
          {boardListState.boardList.map((board) => (
            <BoardItem key={board.id} {...board} />
          ))}
        </div>
      </div>
    </>
  );
}
