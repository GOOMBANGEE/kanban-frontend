import { create } from "zustand";
import {
  Status,
  statusColor,
  statusGroup,
  StatusState,
} from "./status.type.ts";

type StatusStore = {
  statusState: StatusState;
  setStatusState: (state: Partial<StatusState>) => void;
  resetStatusState: () => void;

  statusListState: Status[];
  setStatusListState: (state: Status[]) => void;
};

const initialStatusState: StatusState = {
  id: undefined,
  title: undefined,
  color: Object.entries(statusColor).find(
    ([, v]) => v === statusColor.black,
  )?.[0] as keyof typeof statusColor,
  displayOrder: undefined,
  group: Object.entries(statusGroup).find(
    ([, v]) => v === statusGroup.todo,
  )?.[0] as keyof typeof statusGroup,
  Ticket: [],

  // create
  create: false,
  groupList: false,

  // update
  hover: false,
  focusId: undefined,
  setting: false,
  settingX: undefined,
  settingY: undefined,
  update: false,
  delete: false,

  // update display order
  drag: false,
  prev: undefined,
  next: undefined,
};

const initialStatusListState: Status[] = [];

export const useStatusStore = create<StatusStore>((set) => ({
  statusState: initialStatusState,
  setStatusState: (state) =>
    set((prev) => ({ statusState: { ...prev.statusState, ...state } })),
  resetStatusState: () => set({ statusState: initialStatusState }),

  statusListState: initialStatusListState,
  setStatusListState: (state) => set({ statusListState: state }),
}));
