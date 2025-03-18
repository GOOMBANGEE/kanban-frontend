import { Route, Routes } from "react-router-dom";
import Home from "./page/home.tsx";
import { useEffect } from "react";
import useRefreshAccessToken from "./common/api/refresh-access-token.api.ts";
import Board from "./page/board.tsx";
import BoardDetail from "./page/board-detail.tsx";
import { useSocketStore } from "./common/store/socket.store.ts";
import { useTokenStore } from "./common/store/token.store.ts";

export default function App() {
  const { refreshAccessToken } = useRefreshAccessToken();
  const { initializeSocket } = useSocketStore();
  const { tokenState } = useTokenStore();

  useEffect(() => {
    refreshAccessToken();
  }, []);

  useEffect(() => {
    if (tokenState.accessToken) {
      initializeSocket();
    }
  }, [tokenState.accessToken]);

  return (
    <div className={"text-customText h-full overflow-y-hidden"}>
      <Routes>
        <Route index element={<Home />} />
        <Route path="board" element={<Board />} />
        <Route path="board/:boardId" element={<BoardDetail />} />
      </Routes>
    </div>
  );
}
