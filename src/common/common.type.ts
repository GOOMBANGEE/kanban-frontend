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
