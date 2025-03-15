import { useStatusStore } from "../status.store.ts";
import { useEnvStore } from "../../common/store/env.store.ts";
import { useParams } from "react-router-dom";
import axios from "axios";
import { Status } from "../status.type.ts";

type Props = {
  title?: string;
  color?: string;
  displayOrder?: number;
  group?: string;
};

export default function useUpdateStatus() {
  const { statusState, statusListState, setStatusListState } = useStatusStore();
  const { envState } = useEnvStore();
  const { boardId } = useParams();

  const updateStatus = async (props: Readonly<Props>) => {
    const statusUrl = envState.statusUrl;
    const updateData = {
      title: props.title,
      color: props.color,
      displayOrder: props.displayOrder,
      group: props.group,
    };

    const response = await axios.patch(
      `${statusUrl}/${boardId}/${statusState.focusId}`,
      updateData,
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
