import Login from "../user/component/login.tsx";
import Register from "../user/component/register.tsx";
import Header from "../common/component/header.tsx";
import { useTokenStore } from "../common/store/token.store.ts";
import { useNavigate } from "react-router-dom";
import { useUserStore } from "../user/user.store.ts";

export default function Home() {
  const { userState } = useUserStore();
  const { tokenState } = useTokenStore();
  const navigate = useNavigate();
  if (tokenState) {
    navigate("/board");
  }
  return (
    <>
      <Header />

      {userState.loginModal ? <Login /> : null}
      {userState.registerModal ? <Register /> : null}
    </>
  );
}
