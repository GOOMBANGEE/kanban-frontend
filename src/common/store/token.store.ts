import { create } from "zustand";
import axios from "axios";
import { TokenState } from "../common.type.ts";

type TokenStore = {
  tokenState: TokenState;
  setTokenState: (state: Partial<TokenState>) => void;
  setHeaderAccessToken: (accessToken: string) => void;
};

const initialTokenState: TokenState = {
  accessToken: undefined,
};

export const useTokenStore = create<TokenStore>((set) => ({
  tokenState: initialTokenState,
  setTokenState: (state) =>
    set((prev) => ({ tokenState: { ...prev.tokenState, ...state } })),
  // 서버에서 받은 accessToken을 헤더에 저장하고 이후 요청시마다 Authorization에 accessToken 첨부
  setHeaderAccessToken: (accessToken) => {
    set((prev) => ({
      tokenState: { ...prev.tokenState, accessToken: accessToken },
    }));
    axios.defaults.headers.common["Authorization"] = `Bearer ${accessToken}`;
  },
}));
