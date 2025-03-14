import { useStatusStore } from "../status.store.ts";
import { useEnvStore } from "../../common/store/env.store.ts";
import { useParams } from "react-router-dom";
import axios from "axios";
import { Status } from "../status.type.ts";

export default function useUpdateStatus() {
  const { statusState, statusListState, setStatusListState } = useStatusStore();
  const { envState } = useEnvStore();
  const { boardId } = useParams();

  const updateStatus = async () => {
    const statusUrl = envState.statusUrl;
    const response = await axios.patch(
      `${statusUrl}/${boardId}/${statusState.focusId}`,
      {
        title: statusState.title,
        color: statusState.color,
        group: statusState.group,
      },
    );

    const newStatusList: Status[] = statusListState.map((status) => {
      if (status.id === statusState.focusId) {
        return { ...status, ...response.data.result };
      }
      return status;
    });
    setStatusListState(newStatusList);
  };

  return { updateStatus };
}
