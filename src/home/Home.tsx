import Login from "../user/component/login.tsx";
import Register from "../user/component/register.tsx";
import Header from "../common/component/header.tsx";

export default function Home() {
  return (
    <>
      <Header />

      <Login />
      <Register />
    </>
  );
}
