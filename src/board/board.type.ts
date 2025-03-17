export const BoardStateKey = {
  title: "title",
  icon: "icon",
} as const;

export type Board = {
  id: string | undefined;
  title: string | undefined;
  inviteCode: string | undefined;
  icon: string | undefined;
  userId: string | undefined;
};

export type BoardState = Board & {
  // new board modal
  newModal: boolean;
  joinModal: boolean;
  check: boolean;

  // create
  createModal: boolean;
  uploadIcon: string | undefined;
  titleErrorMessage: string | undefined;

  // update, delete
  hover: boolean;
  settingModal: boolean;
  deleteModal: boolean;

  // invite
  inviteCopy: boolean;
};

export type BoardListState = {
  boardList: Board[];
  total: number;
  page: number;
  totalPage: number;
};
