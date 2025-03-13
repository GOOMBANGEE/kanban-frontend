import { useUserStore } from "../user.store.ts";
import useUpdateUser from "../api/update-user.api.ts";
import useLogout from "../api/logout.api.ts";
import { ChangeEvent, FormEvent, useRef } from "react";
import usePasswordRegex from "../util/password-regex.util.ts";
import ErrorMessage from "../../common/component/error-message.tsx";
import { UserState, UserStateKey } from "../user.type.ts";
import useUsernameRegex from "../util/username-regex.util.ts";
import ModalBackground from "../../common/component/modal-background.tsx";

export default function SettingUser() {
  const { usernameRegex } = useUsernameRegex();
  const { passwordRegex } = usePasswordRegex();
  const { logout } = useLogout();
  const { updateUser } = useUpdateUser();
  const { userState, setUserState } = useUserStore();
  const ref = useRef<HTMLDivElement>(null);

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
      updateUser();
      return;
    }

    // 유효성검사
    if (!passwordRegex({ password: userState.prevPassword ?? "" })) return;
    if (!passwordRegex({ password: userState.newPassword ?? "" })) return;
    if (userState.newPassword !== userState.newConfirmPassword) {
      setUserState({ passwordErrorMessage: "비밀번호가 일치하지 않습니다" });
      return;
    }
    updateUser();
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
      deleteUser: true,
      settingUser: false,
      passwordErrorMessage: undefined,
    });
  };

  return (
    <ModalBackground
      ref={ref}
      onClose={() =>
        setUserState({
          settingUser: false,
          passwordErrorMessage: undefined,
        })
      }
      enabled={userState.settingUser}
    >
      <div ref={ref} className={"bg-customBlack-700 rounded px-6 py-4"}>
        {/* update user */}
        <form onSubmit={handleSubmit}>
          <ul className={"flex flex-col gap-y-2"}>
            {/* username */}
            <li className={"flex"}>
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
            </li>

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
    </ModalBackground>
  );
}
