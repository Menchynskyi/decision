export type User = {
  token: string;
  username: string;
};

export type SignUpPayload = {
  email: string;
  username: string;
  password: string;
};

export type SignInPayload = {
  email?: string;
  username?: string;
  password: string;
};
