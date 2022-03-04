import { IUser } from "./User";

export interface IAuthContext {
  isLoggedIn: boolean;
  user: IUser | null;
  token: string | null;
  login: (token: string, user: IUser) => Promise<void>;
  logout: () => Promise<void>;
}
