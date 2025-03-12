import { useStatusStore } from "../status.store.ts";
import { useEnvStore } from "../../common/store/env.store.ts";
import axios from "axios";
import { useParams } from "react-router-dom";
import { Status } from "../status.type.ts";

export default function useCreateStatus() {
  const { statusState, resetStatusState, statusListState, setStatusListState } =
    useStatusStore();
  const { envState } = useEnvStore();
  const { id } = useParams();
  const createStatus = async () => {
    const statusUrl = envState.statusUrl;
    const response = await axios.post(`${statusUrl}/${id}`, {
      title: statusState.title,
      color: statusState.color,
      group: statusState.group,
    });

    const newStatusList: Status[] = [...statusListState, response.data.status];
    setStatusListState(newStatusList);
    resetStatusState();
  };

  return { createStatus };
}
