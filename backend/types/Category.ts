import { Document } from "mongoose";

export interface ICategory extends Document {
  _id: string;
  type: string;
  name: string;
  icon: string;
  user: string;
}

export interface IAddCategory {
  type: string;
  name: string;
  icon: string;
  user: string;
}

export interface IUpdateCategory {
  type?: string;
  name?: string;
  icon?: string;
  user: string;
}

export interface IDeleteCategory {
  user: string;
}

export interface IGetCategory {
  user: string;
}
