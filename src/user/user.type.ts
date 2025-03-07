export const UserStateKey = {
  username: "username",
  password: "password",
  usernameErrorMessage: "usernameErrorMessage",
  passwordErrorMessage: "passwordErrorMessage",

  confirmPassword: "confirmPassword",

  newUsername: "newUsername",
  prevPassword: "prevPassword",
  newPassword: "newPassword",
  newConfirmPassword: "newConfirmPassword",
} as const;

export type UserState = {
  id: string | undefined;
  username: string | undefined;
  password: string | undefined;

  // register
  registerModal: boolean;
  confirmPassword: string | undefined;
  usernameErrorMessage: string | undefined;
  passwordErrorMessage: string | undefined;

  // login
  loginModal: boolean;
  loginErrorMessage: string | undefined;

  //user setting
  userSettingModal: boolean;
  newUsername: string | undefined;
  prevPassword: string | undefined;
  newPassword: string | undefined;
  newConfirmPassword: string | undefined;
  userDeleteModal: boolean;

  codeError: string | undefined;
  loginError: string | undefined;
};
