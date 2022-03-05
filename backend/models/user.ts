import { Schema, model } from "mongoose";
import { IUser } from "../types/User";

const User = new Schema({
  name: { type: String, required: true },
  email: { type: String, required: true },
  password: { type: String, required: true },
  id: { type: String },
});

export default model<IUser>("User", User);
