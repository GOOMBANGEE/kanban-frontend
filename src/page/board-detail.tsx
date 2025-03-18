import Header from "../common/component/header.tsx";
import { useEffect, useRef } from "react";
import useDetailBoard from "../board/api/detail-board.api.ts";
import { useTokenStore } from "../common/store/token.store.ts";
import { useStatusStore } from "../status/status.store.ts";
import CreateStatusButton from "../status/component/create-status-button.tsx";
import CreateStatusModal from "../status/component/create-status-modal.tsx";
import StatusItem from "../status/component/status-item.tsx";
import SettingStatusModal from "../status/component/setting-status-modal.tsx";
import DeleteStatusModal from "../status/component/delete-status-modal.tsx";
import { useTicketStore } from "../ticket/ticket.store.ts";
import DetailTicket from "../ticket/component/detail-ticket.tsx";
import { useBoardStore } from "../board/board.store.ts";
import { useSocketStore } from "../common/store/socket.store.ts";

export default function BoardDetail() {
  const { detailBoard } = useDetailBoard();
  const { boardState } = useBoardStore();
  const { statusState, statusListState } = useStatusStore();
  const { ticketState } = useTicketStore();
  const { socket, joinBoard, leaveBoard } = useSocketStore();
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

  useEffect(() => {
    if (boardState.id && socket && tokenState.accessToken) {
      joinBoard(boardState.id);
    }
    return () => {
      if (boardState.id && socket && tokenState.accessToken) {
        leaveBoard(boardState.id);
      }
    };
  }, [boardState.id, socket, tokenState.accessToken]);

  return (
    <div className={"custom-scrollbar h-full overflow-y-hidden"}>
      <Header />

      <div
        style={{ maxHeight: `calc(100vh - 80px` }}
        className={"custom-scrollbar mt-20 flex h-full overflow-x-auto"}
      >
        <div
          ref={statusListRef}
          style={{ maxHeight: `calc(100vh - 80px` }}
          className={`custom-scrollbar flex h-full gap-x-4 overflow-y-auto px-12 pb-20 transition-all duration-300 ${ticketState.detail ? "w-1/2" : "w-full"} transition delay-150 duration-300`}
        >
          {sortedList?.map((status, index) => {
            const prev =
              index > 0 ? sortedList[index - 1].displayOrder : undefined;
            const next =
              index < sortedList.length - 1
                ? sortedList[index + 1].displayOrder
                : undefined;
            return (
              <StatusItem key={status.id} {...status} prev={prev} next={next} />
            );
          })}
          {statusState.setting ? <SettingStatusModal /> : null}
          {statusState.delete ? <DeleteStatusModal /> : null}
          {!statusState.create ? <CreateStatusButton /> : null}{" "}
          {statusState.create ? <CreateStatusModal /> : null}
        </div>
        {ticketState.detail ? <DetailTicket /> : null}
      </div>
    </div>
  );
}
