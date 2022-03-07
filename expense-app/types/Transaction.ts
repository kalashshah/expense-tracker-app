export interface ITransaction {
  _id: string;
  type: string;
  name: string;
  category: string;
  date: Date;
  amount: number;
  description: string;
  user: string;
}
