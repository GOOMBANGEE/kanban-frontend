import useUsernameRegex from "../util/username-regex.util.ts";
import usePasswordRegex from "../util/password-regex.util.ts";
import useLogin from "../api/login.api.ts";
import userRefreshAccessToken from "../../common/api/refresh-access-token.api.ts";
import { useUserStore } from "../user.store.ts";
import { ChangeEvent, FormEvent, useRef } from "react";
import ErrorMessage from "../../common/component/error-message.tsx";
import { useClickOutside } from "../../common/util/click-outside.ts";
import { UserState, UserStateKey } from "../user.type.ts";

export default function Login() {
  const { usernameRegex } = useUsernameRegex();
  const { passwordRegex } = usePasswordRegex();
  const { login } = useLogin();
  const { refreshAccessToken } = userRefreshAccessToken();
  const { userState, setUserState, resetUserState } = useUserStore();

  const modalRef = useRef<HTMLDivElement>(null);
  useClickOutside({
    ref: modalRef,
    onClose: () => resetUserState(),
    enabled: userState.loginModal,
  });

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    // 유효성검사
    if (!usernameRegex()) return;
    if (!passwordRegex({ password: userState.password ?? "" })) return;

    if (await login()) {
      refreshAccessToken();
      setUserState({ loginModal: false });
      return;
    }

    setUserState({
      loginErrorMessage: "유효하지 않은 유저명 또는 비밀번호입니다",
    });
  };

  const handleChangeInput =
    (field: keyof UserState, errorField: keyof UserState) =>
    (e: ChangeEvent<HTMLInputElement>) => {
      setUserState({
        [field]: e.target.value,
        [errorField]: undefined,
        loginErrorMessage: undefined,
      });
    };

  const handleClickRegister = () => {
    setUserState({ loginModal: false, registerModal: true });
  };

  return (
    <>
      {userState.loginModal ? (
        <div
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
            className={"bg-customBlack-700 z-10 rounded px-6 py-4"}
          >
            <form onSubmit={handleSubmit}>
              <ul>
                {/* username */}
                <li className={"mb-2 flex"}>
                  <input
                    placeholder={"username"}
                    value={userState.username ?? ""}
                    onChange={handleChangeInput(
                      UserStateKey.username,
                      UserStateKey.usernameErrorMessage,
                    )}
                    className={
                      "bg-customBlack-400 text-customText rounded-sm px-2 py-1"
                    }
                  />
                </li>

                {/* password */}
                <li className={"mb-2"}>
                  <input
                    type={"password"}
                    placeholder={"password"}
                    value={userState.password ?? ""}
                    onChange={handleChangeInput(
                      UserStateKey.password,
                      UserStateKey.passwordErrorMessage,
                    )}
                    className={
                      "bg-customBlack-400 text-customText rounded-sm px-2 py-1"
                    }
                  />
                </li>

                {/* login button */}
                <li className={"text-sm"}>
                  <button type={"submit"} className={"rounded-sm"}>
                    Login
                  </button>
                </li>
              </ul>
            </form>

            {/* error message */}
            <ErrorMessage message={userState.usernameErrorMessage} />
            <ErrorMessage message={userState.passwordErrorMessage} />
            <ErrorMessage message={userState.loginErrorMessage} />

            {/* register modal button */}
            <div className={"text-sm"}>
              <button onClick={handleClickRegister} className={"rounded-sm"}>
                Register
              </button>
            </div>
          </div>
        </div>
      ) : null}
    </>
  );
}
