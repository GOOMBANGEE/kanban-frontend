import { Route, Routes } from "react-router-dom";
import Home from "./home/Home.tsx";
import { useEffect } from "react";
import useRefreshAccessToken from "./common/api/refresh-access-token.api.ts";

export default function App() {
  const { refreshAccessToken } = useRefreshAccessToken();

  useEffect(() => {
    refreshAccessToken();
  }, []);

  return (
    <div className={"text-customText"}>
      <Routes>
        <Route index element={<Home />} />
      </Routes>
    </div>
  );
}
