export type Ticket = {
  id: string | undefined;
  title: string | undefined;
  content: string | undefined;
  displayOrder: number | undefined;
  startDate: string | undefined;
  endDate: string | undefined;
  creationTime: string | undefined;
  updateTime: string | undefined;

  statusId: string | undefined;
};

export type TicketState = Ticket & {
  // create
  create: boolean;
  createProcessing: boolean;

  // detail
  detail: boolean;

  // update
  hover: boolean;
  focusId: string | undefined;
  setting: boolean;

  updateTitle: boolean;
  newTitle: string | undefined;
  updateContent: boolean;
  newContent: string | undefined;
  newDisplayOrder: number | undefined;
  newStartDate: string | undefined;
  newEndDate: string | undefined;
  newStatusId: string | undefined;
};
