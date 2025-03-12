import Login from "../user/component/login.tsx";
import Register from "../user/component/register.tsx";
import Header from "../common/component/header.tsx";
import { useTokenStore } from "../common/store/token.store.ts";
import { useNavigate } from "react-router-dom";

export default function Home() {
  const { tokenState } = useTokenStore();
  const navigate = useNavigate();
  if (tokenState) {
    navigate("/board");
  }
  return (
    <>
      <Header />

      <Login />
      <Register />
    </>
  );
}
