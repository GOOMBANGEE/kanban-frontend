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

  const updateStatus = async (props?: Readonly<Props>, status?: Status) => {
    if (props) {
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
      status = response.data as Status;
    }

    const newStatusList: Status[] = statusListState.map((item: Status) => {
      if (Array.isArray(status)) {
        const updateStatus = status.find((s: Status) => s.id === item.id);
        return updateStatus ? { ...item, ...updateStatus } : item;
      }
      if (status && item.id === status.id) {
        return { ...item, ...status };
      }
      return item;
    });
    setStatusListState(newStatusList);
  };

  return { updateStatus };
}
