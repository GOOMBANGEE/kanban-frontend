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
};

export type StatusState = Status & {
  // create, update
  create: boolean;
  groupList: boolean;

  hover: boolean;
  update: boolean;
};
