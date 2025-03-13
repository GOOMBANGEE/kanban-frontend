import { TicketState } from "./ticket.type.ts";
import { create } from "zustand";

type TicketStore = {
  ticketState: TicketState;
  setTicketState: (state: Partial<TicketState>) => void;
  resetTicketState: () => void;
};

const initialTicketState: TicketState = {
  id: undefined,
  title: undefined,
  content: undefined,
  displayOrder: undefined,
  startDate: undefined,
  endDate: undefined,
  creationTime: undefined,
  updateTime: undefined,

  boardId: undefined,
  statusId: undefined,

  // create, update
  create: false,
  createProcessing: false,

  hover: false,
  focusId: undefined,
  setting: false,
  settingX: undefined,
  settingY: undefined,
  update: false,
  delete: false,
};

export const useTicketStore = create<TicketStore>((set) => ({
  ticketState: initialTicketState,
  setTicketState: (state) =>
    set((prev) => ({ ticketState: { ...prev.ticketState, ...state } })),
  resetTicketState: () => set({ ticketState: initialTicketState }),
}));
