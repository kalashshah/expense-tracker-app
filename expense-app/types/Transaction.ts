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

export interface IAddTransaction {
  type?: string;
  name: string;
  date?: Date;
  amount: number;
  description: string;
  category: string;
  check?: string;
}
