import { Schema, model } from "mongoose";
import { ICategory } from "../types/Category";

const Category = new Schema(
  {
    type: { type: Boolean, required: true },
    name: { type: String, required: true },
    icon: { type: String, required: true, trim: true },
  },
  { timestamps: true, versionKey: false }
);

export default model<ICategory>("Category", Category);
