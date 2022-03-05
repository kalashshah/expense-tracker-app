export interface IUser {
  _id: string;
  name: string;
  email: string;
  password: string;
}

export interface ISigninData {
  email: string;
  password: string;
}

export interface ISignupData {
  name: string;
  email: string;
  password: string;
}
