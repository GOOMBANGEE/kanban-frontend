import { useUserStore } from "../user.store.ts";
import { useEnvStore } from "../../common/store/env.store.ts";
import axios from "axios";

export default function useUserUpdate() {
  const { userState, setUserState } = useUserStore();
  const { envState } = useEnvStore();

  const userUpdate = async () => {
    const userUrl = envState.userUrl;
    try {
      await axios.patch(
        userUrl,
        {
          newUsername: userState.newUsername,
          prevPassword: userState.prevPassword,
          newPassword: userState.newPassword,
          newConfirmPassword: userState.newConfirmPassword,
        },
        { withCredentials: true },
      );

      setUserState({ newPassword: undefined, newConfirmPassword: undefined });
    } catch (err) {
      console.log(err);
    }
  };

  return { userUpdate };
}
