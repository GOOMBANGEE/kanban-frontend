import usePasswordRegex from "../util/password-regex.util.ts";
import usernameRegexUtil from "../util/username-regex.util.ts";
import userRegisterApi from "../api/register.api.ts";
import userRefreshAccessToken from "../../common/api/refresh-access-token.api.ts";
import { useUserStore } from "../user.store.ts";
import { ChangeEvent, FormEvent } from "react";
import ErrorMessage from "../../common/component/error-message.tsx";
import { UserState, UserStateKey } from "../user.type.ts";
import ModalBackground from "../../common/component/modal-background.tsx";

export default function Register() {
  const { usernameRegex } = usernameRegexUtil();
  const { passwordRegex } = usePasswordRegex();
  const { register } = userRegisterApi();
  const { refreshAccessToken } = userRefreshAccessToken();
  const { userState, setUserState, resetUserState } = useUserStore();

  const handleClickLogin = () => {
    setUserState({ loginModal: true, registerModal: false });
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    // 유효성검사
    if (!usernameRegex()) return;
    if (!passwordRegex({ password: userState.password ?? "" })) return;
    if (userState.password !== userState.confirmPassword) {
      setUserState({ passwordErrorMessage: "비밀번호가 일치하지 않습니다" });
      return;
    }

    if (await register()) {
      refreshAccessToken();
      setUserState({ registerModal: false });
    }
  };

  const handleChangeInput =
    (field: keyof UserState, errorField: keyof UserState) =>
    (e: ChangeEvent<HTMLInputElement>) => {
      setUserState({
        [field]: e.target.value,
        [errorField]: undefined,
      });
    };

  return (
    <>
      {userState.registerModal ? (
        <ModalBackground
          onClose={() => resetUserState()}
          enabled={userState.registerModal}
        >
          <div className={"bg-customBlack-700 rounded px-6 py-4"}>
            <form onSubmit={handleSubmit}>
              <ul className={"flex w-full flex-col gap-y-2"}>
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

                {/* password confirm */}
                <li className={"mb-2"}>
                  <input
                    type={"password"}
                    placeholder={"confirm password"}
                    value={userState.confirmPassword ?? ""}
                    onChange={handleChangeInput(
                      UserStateKey.confirmPassword,
                      UserStateKey.passwordErrorMessage,
                    )}
                    className={
                      "bg-customBlack-400 text-customText rounded-sm px-2 py-1"
                    }
                  />
                </li>

                {/* register button */}
                <li className={"text-sm"}>
                  <button type={"submit"} className={"rounded-sm"}>
                    Register
                  </button>
                </li>
              </ul>
            </form>

            {/* error message */}
            <ErrorMessage message={userState.usernameErrorMessage} />
            <ErrorMessage message={userState.passwordErrorMessage} />

            {/* login modal button */}
            <div className={"text-sm"}>
              <button onClick={handleClickLogin} className={"rounded-sm"}>
                Login
              </button>
            </div>
          </div>
        </ModalBackground>
      ) : null}
    </>
  );
}
