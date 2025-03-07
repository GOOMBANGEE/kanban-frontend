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

export type ClickOutside = {
  ref: React.RefObject<HTMLDivElement | null>;
  onClose: () => void;
  enabled: boolean;
};

export type PasswordRegex = {
  password: string;
};

export type ErrorMessageProps = {
  message: string | undefined;
};
