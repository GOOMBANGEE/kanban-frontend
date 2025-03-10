import { useUserStore } from "../../user/user.store.ts";

type PasswordRegex = {
  password: string;
};

export default function usePasswordRegex() {
  const { setUserState } = useUserStore();

  const passwordRegex = (props: Readonly<PasswordRegex>) => {
    const regex = /^(?=.*[a-zA-Z0-9]).{4,10}$/.test(
      props.password ? props.password : "",
    );
    if (regex) {
      return true;
    } else {
      setUserState({
        passwordErrorMessage: "비밀번호는 4~20자로 설정해주세요",
      });
      return false;
    }
  };

  return { passwordRegex };
}
