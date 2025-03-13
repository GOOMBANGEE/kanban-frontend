import { Route, Routes } from "react-router-dom";
import Home from "./page/home.tsx";
import { useEffect } from "react";
import useRefreshAccessToken from "./common/api/refresh-access-token.api.ts";
import Board from "./page/board.tsx";
import BoardDetail from "./page/board-detail.tsx";

export default function App() {
  const { refreshAccessToken } = useRefreshAccessToken();

  useEffect(() => {
    refreshAccessToken();
  }, []);

  return (
    <div className={"text-customText custom-scrollbar h-full overflow-y-auto"}>
      <Routes>
        <Route index element={<Home />} />
        <Route path="board" element={<Board />} />
        <Route path="board/:boardId" element={<BoardDetail />} />
      </Routes>
    </div>
  );
}
