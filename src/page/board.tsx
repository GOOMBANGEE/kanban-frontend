import Header from "../common/component/header.tsx";
import useFetchBoardList from "../board/api/fetch-board-list.api.ts";
import { useTokenStore } from "../common/store/token.store.ts";
import { useBoardStore } from "../board/board.store.ts";
import { useGlobalStore } from "../common/store/global.store.ts";
import BoardItem from "../board/component/board-item.tsx";
import CreateBoardButton from "../board/component/create-board-button.tsx";
import CreateBoardModal from "../board/component/create-board-modal.tsx";
import SettingBoardModal from "../board/component/setting-board-modal.tsx";
import DeleteBoardModal from "../board/component/delete-board-modal.tsx";
import { useEffect } from "react";

export default function Board() {
  const { fetchBoardList } = useFetchBoardList();
  const { boardListState } = useBoardStore();
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

      <CreateBoardButton />
      <CreateBoardModal />

      <SettingBoardModal />
      <DeleteBoardModal />

      <div className={"grid grid-cols-3 gap-x-2 gap-y-2 px-4 py-4"}>
        {boardListState.boardList.map((board) => (
          <BoardItem key={board.id} {...board} />
        ))}
      </div>
    </>
  );
}
