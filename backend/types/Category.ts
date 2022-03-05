import { Document } from "mongoose";

export interface ICategory extends Document {
  _id: string;
  type: string;
  name: string;
  icon: string;
  user: string;
}
