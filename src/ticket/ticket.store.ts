import { Ticket, TicketState } from "./ticket.type.ts";
import { create } from "zustand";

type TicketStore = {
  ticketState: TicketState;
  setTicketState: (state: Partial<TicketState>) => void;
  resetTicketState: () => void;

  ticketListState: Ticket[];
  setTicketListState: (state: Ticket[]) => void;
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

  statusId: undefined,

  // create
  create: false,
  createProcessing: false,

  // detail
  detail: false,

  // update
  hover: false,
  focusId: undefined,
  setting: false,

  updateTitle: false,
  newTitle: undefined,
  updateContent: false,
  newContent: undefined,
  newStartDate: undefined,
  newEndDate: undefined,
  newStatusId: undefined,

  // update display order
  drag: false,
  prev: undefined,
  next: undefined,
};

export const useTicketStore = create<TicketStore>((set) => ({
  ticketState: initialTicketState,
  setTicketState: (state) =>
    set((prev) => ({ ticketState: { ...prev.ticketState, ...state } })),
  resetTicketState: () => set({ ticketState: initialTicketState }),

  ticketListState: [],
  setTicketListState: (state) => set({ ticketListState: state }),
}));
