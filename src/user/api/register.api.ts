import { useUserStore } from "../user.store.ts";
import { useEnvStore } from "../../common/store/env.store.ts";
import axios from "axios";

export default function useRegister() {
  const { userState } = useUserStore();
  const { envState } = useEnvStore();

  const register = async () => {
    const authUrl = envState.authUrl;

    try {
      await axios.post(
        `${authUrl}/register`,
        {
          username: userState.username,
          password: userState.password,
          confirmPassword: userState.confirmPassword,
        },
        { withCredentials: true },
      );

      return true;
    } catch (error) {
      console.error(error);
    }
  };

  return { register };
}
