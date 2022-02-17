import { Schema, Document, model } from "mongoose";
import { IUser } from "../interfaces/User";

const User = new Schema({
  name: { type: String, required: true },
  email: { type: String, required: true },
  password: { type: String, required: true },
  id: { type: String },
});

export default model<IUser & Document>("User", User);
