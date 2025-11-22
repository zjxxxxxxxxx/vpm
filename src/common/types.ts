export type UserProxyRule = {
  id: string;
  name: string;
  host: string;
  server: string;
  enabled: boolean;
};

export type SystemProxy = {
  target: string;
  enabled: boolean;
};
