import { useUserStore } from "../user.store.ts";

export default function useUsernameRegex() {
  const { userState, setUserState } = useUserStore();

  const usernameRegex = () => {
    const regex = /^(?=.*[a-zA-Z0-9]).{2,10}$/.test(
      userState.username ? userState.username : "",
    );
    if (regex) {
      return true;
    } else {
      setUserState({
        usernameErrorMessage: "유저명은 2~10자로 설정해주세요",
      });
      return false;
    }
  };

  return { usernameRegex };
}
