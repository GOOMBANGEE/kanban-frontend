import { create } from "zustand";
import { EnvState } from "../common.type.ts";

const BASE_URL_AUTH = import.meta.env.VITE_BASE_URL_AUTH;
const BASE_URL_USER = import.meta.env.VITE_BASE_URL_USER;
const BASE_URL_BOARD = import.meta.env.VITE_BASE_URL_BOARD;
const BASE_URL_STATUS = import.meta.env.VITE_BASE_URL_STATUS;
const BASE_URL_TICKET = import.meta.env.VITE_BASE_URL_TICKET;
const BASE_URL_WEBSOCKET = import.meta.env.VITE_BASE_URL_WEBSOCKET;
const TIME_LOCALE = import.meta.env.VITE_TIME_LOCALE;
const TIME_ZONE = import.meta.env.VITE_TIME_ZONE;

type EnvStore = {
  envState: EnvState;
  setEnvState: (state: Partial<EnvState>) => void;
};

const initialEnvState: EnvState = {
  authUrl: BASE_URL_AUTH,
  userUrl: BASE_URL_USER,
  boardUrl: BASE_URL_BOARD,
  statusUrl: BASE_URL_STATUS,
  ticketUrl: BASE_URL_TICKET,
  websocketUrl: BASE_URL_WEBSOCKET,
  timeLocale: TIME_LOCALE,
  timeZone: TIME_ZONE,
};

export const useEnvStore = create<EnvStore>((set) => ({
  envState: initialEnvState,
  setEnvState: (state) =>
    set((prev) => ({ envState: { ...prev.envState, ...state } })),
}));
