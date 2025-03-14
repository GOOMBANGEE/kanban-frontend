import { useStatusStore } from "../status.store.ts";
import { useEnvStore } from "../../common/store/env.store.ts";
import axios from "axios";
import { useParams } from "react-router-dom";
import { Status } from "../status.type.ts";

export default function useCreateStatus() {
  const { statusState, resetStatusState, statusListState, setStatusListState } =
    useStatusStore();
  const { envState } = useEnvStore();
  const { boardId } = useParams();

  const createStatus = async () => {
    const statusUrl = envState.statusUrl;

    const response = await axios.post(`${statusUrl}/${boardId}`, {
      title: statusState.title,
      color: statusState.color,
      group: statusState.group,
    });

    const status: Status = {
      ...response.data.status,
      Ticket: [],
    };

    const newStatusList: Status[] = [...statusListState, status];
    setStatusListState(newStatusList);
    resetStatusState();
  };

  return { createStatus };
}
