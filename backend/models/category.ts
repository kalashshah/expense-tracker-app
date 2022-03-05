import { Schema, model } from "mongoose";
import { ICategory } from "../types/Category";

const Category = new Schema(
  {
    type: { type: String, required: true },
    name: { type: String, required: true },
    icon: { type: String, required: true, trim: true },
    user: {
      type: Schema.Types.ObjectId,
      ref: "User",
      index: true,
      required: true,
    },
  },
  { versionKey: false }
);

export default model<ICategory>("Category", Category);
