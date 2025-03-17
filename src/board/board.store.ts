import { create } from "zustand";
import { BoardListState, BoardState } from "./board.type.ts";

type BoardStore = {
  boardState: BoardState;
  setBoardState: (state: Partial<BoardState>) => void;
  resetBoardState: () => void;

  boardListState: BoardListState;
  setBoardListState: (state: BoardListState) => void;
};

const initialBoardState: BoardState = {
  id: undefined,
  title: undefined,
  inviteCode: undefined,
  icon: undefined,

  // new board modal
  newModal: false,
  joinModal: false,
  check: false,

  // create
  createModal: false,
  uploadIcon: undefined,
  titleErrorMessage: undefined,

  // update, delete
  hover: false,
  settingModal: false,
  deleteModal: false,

  // invite
  inviteCopy: false,
};

const initialBoardListState: BoardListState = {
  boardList: [],
  total: 0,
  page: 0,
  totalPage: 0,
};

export const useBoardStore = create<BoardStore>((set) => ({
  boardState: initialBoardState,
  setBoardState: (state) =>
    set((prev) => ({ boardState: { ...prev.boardState, ...state } })),
  resetBoardState: () => set({ boardState: initialBoardState }),

  boardListState: initialBoardListState,
  setBoardListState: (state) =>
    set((prev) => ({ boardListState: { ...prev.boardListState, ...state } })),
}));
