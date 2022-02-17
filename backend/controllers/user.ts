import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import User from "../models/user";
import { NextFunction, Request, Response } from "express";
import { ISignupData, ISigninData } from "../interfaces/User";

const SECRET_KEY = (process.env.SECRET_KEY as string) || "dev-test-key";

const signin = async (req: Request, res: Response) => {
  const { email, password }: ISigninData = req.body;
  try {
    const user = await User.findOne({ email });
    if (!user)
      return res
        .status(404)
        .json({ message: "User with given email does not exist" });
    const isCorrect = await bcrypt.compare(password, user.password);
    if (!isCorrect)
      return res.status(400).json({ message: "Username or password invalid" });
    const token = jwt.sign({ email, id: user._id }, SECRET_KEY, {
      expiresIn: "1h",
    });
    res.status(200).json({ result: user, token });
  } catch (error) {
    res.status(500).json({ message: "Signin failed" });
  }
};

const signup = async (req: Request, res: Response) => {
  const { name, email, password }: ISignupData = req.body;
  try {
    const existingUser = await User.findOne({ email });
    if (existingUser) res.status(400).json({ message: "User already exists" });
    const encryptedPassword = await bcrypt.hash(password, 12);
    const user = await User.create({
      name,
      email,
      password: encryptedPassword,
    });
    const token = jwt.sign({ email, id: user._id }, SECRET_KEY, {
      expiresIn: "1h",
    });
    res.status(200).json({ result: user, token });
  } catch (error) {
    res.status(500).json({ message: "Signup failed" });
  }
};

export { signin, signup };
