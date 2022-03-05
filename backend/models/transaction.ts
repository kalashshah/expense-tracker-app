import { Schema, model } from "mongoose";
import { ITransaction } from "../types/Transaction";

const Transaction = new Schema(
  {
    type: { type: Boolean, required: true },
    name: { type: String, required: true },
    category: {
      type: Schema.Types.ObjectId,
      ref: "Category",
      index: true,
      required: true,
    },
    date: { type: Date, default: Date.now(), required: true },
    amount: { type: Number, required: true },
    description: { type: String },
    user: {
      type: Schema.Types.ObjectId,
      ref: "User",
      index: true,
      required: true,
    },
  },
  { timestamps: true, versionKey: false }
);

export default model<ITransaction>("Transaction", Transaction);
