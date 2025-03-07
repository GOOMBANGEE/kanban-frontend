import { useUserStore } from "../user.store.ts";
import { useTokenStore } from "../../common/store/token.store.ts";
import { useEnvStore } from "../../common/store/env.store.ts";
import axios from "axios";

export default function useLogin() {
  const { userState, setUserState } = useUserStore();
  const { setHeaderAccessToken } = useTokenStore();
  const { envState } = useEnvStore();

  const login = async () => {
    try {
      const authUrl = envState.authUrl;
      const response = await axios.post(
        `${authUrl}/login`,
        {
          username: userState.username,
          password: userState.password,
        },
        {
          withCredentials: true,
        },
      );

      // accessToken 헤더에 담아서 이후 요청보낼때는 Authorization 추가
      const accessToken = response.data.accessToken;
      setUserState({ username: response.data.username });
      setHeaderAccessToken(accessToken);
      if (accessToken) {
        return true;
      }
    } catch (error) {
      console.log(error);
    }
  };

  return { login };
}
