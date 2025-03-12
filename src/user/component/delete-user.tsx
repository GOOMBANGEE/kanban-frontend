import useDeleteUser from "../api/delete-user.api.ts";
import { useUserStore } from "../user.store.ts";
import ModalBackground from "../../common/component/modal-background.tsx";
import { useRef } from "react";

export default function DeleteUser() {
  const { deleteUser } = useDeleteUser();
  const { userState, setUserState } = useUserStore();
  const ref = useRef<HTMLDivElement | null>(null);

  const handleClickDelete = async () => {
    if (await deleteUser()) {
      window.location.reload();
    }
  };

  const handleClickCancel = () => {
    setUserState({ deleteUser: false });
  };

  return (
    <>
      {userState.deleteUser ? (
        <ModalBackground
          ref={ref}
          onClose={() => setUserState({ deleteUser: false })}
          enabled={userState.deleteUser}
        >
          <div ref={ref} className={"bg-customBlack-700 rounded-sm px-6 py-4"}>
            <div>Are you sure you want to delete your account?</div>
            <button onClick={handleClickDelete}>Delete</button>
            <button onClick={handleClickCancel}>Cancel</button>
          </div>
        </ModalBackground>
      ) : null}
    </>
  );
}
