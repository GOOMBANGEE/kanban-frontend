import Header from "../common/component/header.tsx";
import { useEffect, useRef } from "react";
import useDetailBoard from "../board/api/detail-board.api.ts";
import { useTokenStore } from "../common/store/token.store.ts";
import { useStatusStore } from "../status/status.store.ts";
import { useBoardStore } from "../board/board.store.ts";
import CreateStatusButton from "../status/component/create-status-button.tsx";
import CreateStatusModal from "../status/component/create-status-modal.tsx";
import StatusItem from "../status/component/status-item.tsx";
import SettingStatusModal from "../status/component/setting-status-modal.tsx";
import DeleteStatusModal from "../status/component/delete-status-modal.tsx";

export default function BoardDetail() {
  const { detailBoard } = useDetailBoard();
  const { boardState } = useBoardStore();
  const { statusState, statusListState } = useStatusStore();
  const { tokenState } = useTokenStore();

  const sortedList = statusListState.toSorted((a, b) => {
    const orderA = a.displayOrder ?? Number.MAX_SAFE_INTEGER;
    const orderB = b.displayOrder ?? Number.MAX_SAFE_INTEGER;
    return orderA - orderB;
  });
  useEffect(() => {
    if (tokenState.accessToken) detailBoard();
  }, [tokenState.accessToken]);

  const statusListRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    if (statusState.create) {
      const scrollPosition = statusListRef.current?.scrollWidth;
      if (statusListRef.current)
        statusListRef.current.scrollTo({
          left: scrollPosition,
          behavior: "smooth",
        });
    }
  }, [statusState.create]);

  return (
    <>
      <Header />
      <div className={"mt-6 mb-4 px-12"}>{boardState.title}</div>

      <div
        ref={statusListRef}
        className={"custom-scrollbar flex gap-x-4 overflow-x-auto px-12"}
      >
        {sortedList?.map((status) => (
          <StatusItem key={status.id} {...status} />
        ))}

        <SettingStatusModal />
        <DeleteStatusModal />

        <CreateStatusButton />
        <CreateStatusModal />
      </div>
    </>
  );
}
