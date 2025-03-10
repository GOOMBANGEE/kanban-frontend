export type EnvState = {
  authUrl: string;
  userUrl: string;
  boardUrl: string;
  statusUrl: string;
  ticketUrl: string;
  websocketUrl: string;
  timeLocale: string;
  timeZone: string;
};

export type TokenState = {
  accessToken: string | undefined;
};
