import Login from "../user/component/login.tsx";
import Register from "../user/component/register.tsx";
import Header from "../common/component/header.tsx";
import { useUserStore } from "../user/user.store.ts";
import { useTokenStore } from "../common/store/token.store.ts";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";

export default function Home() {
  const { userState } = useUserStore();
  const { tokenState } = useTokenStore();
  const navigate = useNavigate();

  useEffect(() => {
    if (tokenState.accessToken) {
      navigate("/board");
    }
  }, [tokenState.accessToken]);

  return (
    <>
      <Header />

      {userState.loginModal ? <Login /> : null}
      {userState.registerModal ? <Register /> : null}
    </>
  );
}
