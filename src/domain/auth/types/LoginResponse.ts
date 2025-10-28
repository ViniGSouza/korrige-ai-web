import type { User } from "./User";

export interface LoginResponse {
  user: User;
  token: string;
}

export interface CognitoLoginResponse {
  accessToken: string;
  idToken: string;
  refreshToken: string;
  expiresIn: number;
}
