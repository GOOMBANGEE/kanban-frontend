import { Ticket } from "../ticket/ticket.type.ts";

export const statusColor = {
  black: "bg-slate-700",
  gray: "bg-gray-600",
  brown: "bg-amber-800",
  orange: "bg-orange-800",
  yellow: "bg-yellow-800",
  green: "bg-green-800",
  blue: "bg-blue-800",
  purple: "bg-purple-800",
  pink: "bg-pink-800",
  red: "bg-red-800",
} as const;

export const statusGroup = {
  todo: "To-do",
  inProgress: "In progress",
  complete: "Complete",
} as const;

export type Status = {
  id: string | undefined;
  title: string | undefined;
  color: keyof typeof statusColor;
  displayOrder: number | undefined;
  group: keyof typeof statusGroup;
  Ticket: Ticket[];
};

export type StatusState = Status & {
  // create
  create: boolean;
  groupList: boolean;

  // update
  hover: boolean;
  focusId: string | undefined;
  setting: boolean;
  settingX: number | undefined;
  settingY: number | undefined;
  update: boolean;
  delete: boolean;
};
