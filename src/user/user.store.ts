import { create } from "zustand";
import { UserState } from "./user.type.ts";

type UserStore = {
  userState: UserState;
  setUserState: (state: Partial<UserState>) => void;
  resetUserState: () => void;
};

const initialUserState = {
  id: undefined,
  username: undefined,
  password: undefined,

  // register
  registerModal: false,
  confirmPassword: undefined,
  usernameErrorMessage: undefined,
  passwordErrorMessage: undefined,

  // login
  loginModal: false,
  loginErrorMessage: undefined,

  // user setting
  userSettingModal: false,
  newUsername: undefined,
  prevPassword: undefined,
  newPassword: undefined,
  newConfirmPassword: undefined,
  userDeleteModal: false,

  codeError: undefined,
  loginError: undefined,
};

export const useUserStore = create<UserStore>((set) => ({
  userState: initialUserState,
  setUserState: (state) =>
    set((prev) => ({ userState: { ...prev.userState, ...state } })),
  resetUserState: () => set({ userState: initialUserState }),
}));
