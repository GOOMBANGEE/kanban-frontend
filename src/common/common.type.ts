import { Ticket } from "../ticket/ticket.type.ts";
import { Board } from "../board/board.type.ts";
import { Status } from "../status/status.type.ts";

export type EnvState = {
  baseUrl: string;
  authUrl: string;
  userUrl: string;
  boardUrl: string;
  statusUrl: string;
  ticketUrl: string;
  websocketUrl: string;
  timeLocale: string;
  timeZone: string;
};

export type GlobalState = {
  loading: boolean;
};

export type TokenState = {
  accessToken: string | undefined;
};

export type ReceiveMessage = {
  message: Message;
  sourceMethod: string;
};

export type Message = {
  boardId: string;
  userId: string;
  board?: Board;
  status?: Status;
  ticket?: Ticket;
};
