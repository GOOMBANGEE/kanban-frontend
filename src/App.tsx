import { Route, Routes } from "react-router-dom";
import Home from "./home/home.tsx";
import { useEffect } from "react";
import useRefreshAccessToken from "./common/api/refresh-access-token.api.ts";
import Board from "./board/board.tsx";

export default function App() {
  const { refreshAccessToken } = useRefreshAccessToken();

  useEffect(() => {
    refreshAccessToken();
  }, []);

  return (
    <div className={"text-customText"}>
      <Routes>
        <Route index element={<Home />} />
        <Route path="board" element={<Board />} />
      </Routes>
    </div>
  );
}
