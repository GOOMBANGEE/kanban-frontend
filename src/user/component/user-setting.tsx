import { useUserStore } from "../user.store.ts";
import useUserUpdate from "../api/user-update.api.ts";
import useLogout from "../api/logout.api.ts";
import { ChangeEvent, FormEvent, useRef } from "react";
import usePasswordRegex from "../../common/util/password-regex.util.ts";
import ErrorMessage from "../../common/component/error-message.tsx";
import { useClickOutside } from "../../common/util/click-outside.ts";
import { UserState, UserStateKey } from "../user.type.ts";
import useUsernameRegex from "../../common/util/username-regex.util.ts";

export default function UserSetting() {
  const { usernameRegex } = useUsernameRegex();
  const { passwordRegex } = usePasswordRegex();
  const { logout } = useLogout();
  const { userUpdate } = useUserUpdate();
  const { userState, setUserState } = useUserStore();

  const modalRef = useRef<HTMLDivElement>(null);
  useClickOutside({
    ref: modalRef,
    onClose: () =>
      setUserState({
        userSettingModal: false,
        passwordErrorMessage: undefined,
      }),
    enabled: userState.userSettingModal,
  });

  // logout
  const handleClickLogout = async () => {
    if (await logout()) {
      window.location.reload();
    }
  };

  // user update
  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (userState.newUsername) {
      if (!usernameRegex()) return;
      userUpdate();
      return;
    }

    // 유효성검사
    if (!passwordRegex({ password: userState.prevPassword ?? "" })) return;
    if (!passwordRegex({ password: userState.newPassword ?? "" })) return;
    if (userState.newPassword !== userState.newConfirmPassword) {
      setUserState({ passwordErrorMessage: "비밀번호가 일치하지 않습니다" });
      return;
    }
    userUpdate();
  };

  const handleChangeInput =
    (field: keyof UserState, errorField: keyof UserState) =>
    (e: ChangeEvent<HTMLInputElement>) => {
      setUserState({
        [field]: e.target.value,
        [errorField]: undefined,
      });
    };

  // user delete
  const handleClickDelete = async () => {
    setUserState({
      userDeleteModal: true,
      userSettingModal: false,
      passwordErrorMessage: undefined,
    });
  };

  return (
    <>
      {userState.userSettingModal ? (
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
            className={"bg-customBlack-700 absolute z-20 rounded px-6 py-4"}
          >
            {/* user update */}
            <form onSubmit={handleSubmit}>
              <ul className={"flex flex-col gap-y-2"}>
                {/* username */}
                <ul className={"flex"}>
                  <input
                    type={"text"}
                    placeholder={"username"}
                    defaultValue={userState.username}
                    onChange={handleChangeInput(
                      UserStateKey.newUsername,
                      UserStateKey.usernameErrorMessage,
                    )}
                    className={"bg-customBlack-400 text-customText"}
                  />
                  {/* logout */}
                  <button onClick={handleClickLogout}>Logout</button>
                </ul>

                {/* previous password */}
                <li>
                  <input
                    type={"password"}
                    placeholder={"previous password "}
                    value={userState.prevPassword ?? ""}
                    onChange={handleChangeInput(
                      UserStateKey.prevPassword,
                      UserStateKey.passwordErrorMessage,
                    )}
                    className={"bg-customBlack-400 text-customText"}
                  />
                </li>
                {/* password */}
                <li>
                  <input
                    type={"password"}
                    placeholder={"password"}
                    value={userState.newPassword ?? ""}
                    onChange={handleChangeInput(
                      UserStateKey.newPassword,
                      UserStateKey.passwordErrorMessage,
                    )}
                    className={"bg-customBlack-400 text-customText"}
                  />
                </li>
                {/* confirm password */}
                <li>
                  <input
                    type={"password"}
                    placeholder={"confirm password"}
                    value={userState.newConfirmPassword ?? ""}
                    onChange={handleChangeInput(
                      UserStateKey.newConfirmPassword,
                      UserStateKey.passwordErrorMessage,
                    )}
                    className={"bg-customBlack-400 text-customText"}
                  />
                </li>
              </ul>
              <button type={"submit"}>apply</button>
            </form>

            {/* error message */}
            <ErrorMessage message={userState.passwordErrorMessage} />

            {/* delete */}
            <button onClick={handleClickDelete}>Delete</button>
          </div>
        </div>
      ) : null}
    </>
  );
}
