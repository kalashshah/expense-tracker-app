import { Document } from "mongoose";

export interface ICategory extends Document {
  _id: string;
  type: boolean;
  name: string;
  icon: string;
}
