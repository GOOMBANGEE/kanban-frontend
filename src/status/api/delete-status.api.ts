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

  const deleteStatus = async (status?: Status) => {
    if (!status) {
      const statusUrl = envState.statusUrl;

      const response = await axios.delete(
        `${statusUrl}/${boardId}/${statusState.id}`,
      );

      status = response.data;
    }

    const newStatusList: Status[] = statusListState.filter(
      (item) => item.id !== status?.id,
    );

    resetStatusState();
    setStatusListState(newStatusList);
  };

  return { deleteStatus };
}
