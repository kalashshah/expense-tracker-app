export interface Total {
  income: number;
  expense: number;
}

export interface Pie {
  name: string;
  amount: number;
  color: string;
}

export interface Data {
  total: Total;
  monthlyExpTotal: number[];
  monthlyIncTotal: number[];
  expenseCategories: Pie[];
  incomeCategories: Pie[];
}