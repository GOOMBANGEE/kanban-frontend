export type Ticket = {
  id: string | undefined;
  title: string | undefined;
  content: string | undefined;
  displayOrder: number | undefined;
  startDate: string | undefined;
  endDate: string | undefined;
  creationTime: string | undefined;
  updateTime: string | undefined;

  boardId: string | undefined;
  statusId: string | undefined;
};

export type TicketState = Ticket & {
  // create
  create: boolean;
  createProcessing: boolean;

  // update
  hover: boolean;
  focusId: string | undefined;
  setting: boolean;
  update: boolean;
};
