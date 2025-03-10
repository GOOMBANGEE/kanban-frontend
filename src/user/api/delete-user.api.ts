import { useEnvStore } from "../../common/store/env.store.ts";
import axios from "axios";

export default function useDeleteUser() {
  const { envState } = useEnvStore();

  const deleteUser = async () => {
    const userUrl = envState.userUrl;
    try {
      await axios.delete(`${userUrl}`, { withCredentials: true });
      return true;
    } catch (err) {
      console.error(err);
    }
  };

  return { deleteUser };
}
