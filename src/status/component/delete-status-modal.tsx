import { useRef } from "react";
import ModalBackground from "../../common/component/modal-background.tsx";
import useDeleteStatus from "../api/delete-status.api.ts";
import { useStatusStore } from "../status.store.ts";

export default function DeleteStatusModal() {
  const { deleteStatus } = useDeleteStatus();
  const { statusState, setStatusState } = useStatusStore();

  const ref = useRef<HTMLDivElement | null>(null);

  const handleClickDelete = async () => {
    deleteStatus();
  };

  const handleClickCancel = () => {
    setStatusState({ delete: false });
  };

  return (
    <ModalBackground
      ref={ref}
      onClose={() => setStatusState({ delete: false })}
      enabled={statusState.delete}
    >
      <div ref={ref} className={"bg-customBlack-700 rounded-sm px-6 py-4"}>
        <div>Are you sure you want to delete status?</div>
        <button onClick={handleClickDelete}>Delete</button>
        <button onClick={handleClickCancel}>Cancel</button>
      </div>
    </ModalBackground>
  );
}
