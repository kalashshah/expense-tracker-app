import { ICategory } from "./Category";

export interface ITransaction {
  _id: string;
  type: string;
  name: string;
  category: ICategory;
  date: string;
  amount: number;
  description: string;
  user: string;
}

export interface IEditTransaction {
  name: string;
  date?: Date;
  amount: number;
  description: string;
  check?: string;
}
