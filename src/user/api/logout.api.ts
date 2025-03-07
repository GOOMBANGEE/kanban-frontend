import axios from "axios";
import { useEnvStore } from "../../common/store/env.store.ts";

export default function useLogout() {
  const { envState } = useEnvStore();

  const logout = async () => {
    try {
      const authUrl = envState.authUrl;
      const response = await axios.get(`${authUrl}/logout`, {
        withCredentials: true,
      });
      if (response.status === 200) {
        return true;
      }
    } catch (err) {
      console.log(err);
    }
  };

  return { logout };
}
