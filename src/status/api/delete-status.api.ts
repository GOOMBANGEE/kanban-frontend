import { useEnvStore } from "../../common/store/env.store.ts";
import { useStatusStore } from "../status.store.ts";
import { useParams } from "react-router-dom";
import axios from "axios";
import { Status } from "../status.type.ts";

export default function useDeleteStatus() {
  const { statusState, resetStatusState, statusListState, setStatusListState } =
    useStatusStore();
  const { envState } = useEnvStore();
  const { boardId } = useParams();

  const deleteStatus = async () => {
    const statusUrl = envState.statusUrl;

    const response = await axios.delete(
      `${statusUrl}/${boardId}/${statusState.id}`,
    );

    if (response) {
      const newStatusList: Status[] = statusListState.filter(
        (status) => status.id !== statusState.id,
      );
      resetStatusState();
      setStatusListState(newStatusList);
    }
  };

  return { deleteStatus };
}
