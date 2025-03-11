import { create } from "zustand";
import { GlobalState } from "../common.type.ts";

type GlobalStore = {
  globalState: GlobalState;
  setGlobalState: (state: Partial<GlobalState>) => void;
  resetGlobalState: () => void;
};

const initialGlobalState: GlobalState = {
  loading: true,
};
export const useGlobalStore = create<GlobalStore>((set) => ({
  globalState: initialGlobalState,
  setGlobalState: (state) => {
    set((prev) => ({ globalState: { ...prev.globalState, ...state } }));
  },
  resetGlobalState: () => set({ globalState: initialGlobalState }),
}));
