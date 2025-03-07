import { useRef } from "react";
import useUserDelete from "../api/user-delete.api.ts";
import { useUserStore } from "../user.store.ts";
import { useClickOutside } from "../../common/util/click-outside.ts";

export default function UserDelete() {
  const { userDelete } = useUserDelete();
  const { userState, setUserState } = useUserStore();

  const modalRef = useRef<HTMLDivElement>(null);
  useClickOutside({
    ref: modalRef,
    onClose: () => setUserState({ userDeleteModal: false }),
    enabled: userState.userDeleteModal,
  });

  const handleClickDelete = async () => {
    if (await userDelete()) {
      window.location.reload();
    }
  };

  const handleClickCancel = () => {
    setUserState({ userDeleteModal: false });
  };

  return (
    <>
      {userState.userDeleteModal ? (
        <div
          style={{ zIndex: 11 }}
          className={
            "fixed inset-0 flex h-full w-full items-center justify-center"
          }
        >
          <div
            className={
              "bg-customBlack-400 fixed inset-0 h-full w-full opacity-70"
            }
          ></div>
          <div
            ref={modalRef}
            className={"bg-customBlack-700 z-10 rounded-sm px-6 py-4"}
          >
            <div>Are you sure you want to delete your account?</div>
            <button onClick={handleClickDelete}>Delete</button>
            <button onClick={handleClickCancel}>Cancel</button>
          </div>
        </div>
      ) : null}
    </>
  );
}
