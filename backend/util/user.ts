import jwt from "jsonwebtoken";

import { SECRET_KEY } from "./secret";

interface IToken {
  id: string;
  email: string;
}

export const getUser = (token: string) => {
  const decoded = jwt.verify(token, SECRET_KEY) as IToken;
  return decoded.id;
};
