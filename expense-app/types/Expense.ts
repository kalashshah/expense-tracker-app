export interface Expense {
  _id: string;
  description: string;
  amount: number;
  date: Date;
  category: string;
  user: string;
  __v: number;
}

export interface Earning {
  _id: string;
  description: string;
  amount: number;
  date: Date;
  category: string;
  user: string;
  __v: number;
}

export interface Salary {
  _id: string;
  amount: number;
  due: number;
  user: string;
  __v: number;
}
