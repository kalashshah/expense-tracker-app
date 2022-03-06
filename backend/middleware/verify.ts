import jwt from "jsonwebtoken";
import { Request, Response, NextFunction } from "express";

import { SECRET_KEY } from "../util/secret";

interface IToken {
  id: string;
  email: string;
}

export const verify = (req: Request, res: Response, next: NextFunction) => {
  try {
    const token = req.headers.authorization?.split(" ")[1];
    if (!token) return res.status(401).send("Unauthorized");
    const decoded = jwt.verify(token, SECRET_KEY) as IToken;
    req.body.user = decoded.id;
  } catch {
    return res.status(401).send("Invalid token");
  }
  next();
};
