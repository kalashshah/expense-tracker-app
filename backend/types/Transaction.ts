import { Document } from "mongoose";

export interface ITransaction extends Document {
  _id: string;
  name: string;
  category: string;
  date: Date;
  amount: number;
  description: string;
  user: string;
}