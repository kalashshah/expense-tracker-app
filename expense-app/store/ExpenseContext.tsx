import React, { useState, createContext } from "react";
import { Expense } from "../types/Expense";

interface ExpenseContextType {
  expenses: Expense[];
  addExpense: (expense: Expense) => void;
  addExpenses: (expenses: Expense[]) => void;
  deleteExpense: (expense: Expense) => void;
}

export const ExpenseContext = createContext<ExpenseContextType>({
  expenses: [],
  addExpense: () => {},
  addExpenses: () => {},
  deleteExpense: () => {},
});

interface Props {
  children: JSX.Element;
}

const ExpenseContextProvider = ({ children }: Props) => {
  const [expenses, setExpenses] = useState<Expense[]>([]);

  const addExpense = (expense: Expense) => {
    setExpenses((exps) => [...exps, expense]);
  };

  const addExpenses = (expenses: Expense[]) => {
    setExpenses((exps) => [...exps, ...expenses]);
  };

  const deleteExpense = (expense: Expense) => {
    setExpenses((exps) => exps.filter((e) => e._id !== expense._id));
  };

  const value = {
    expenses,
    addExpense,
    addExpenses,
    deleteExpense,
  };

  return (
    <ExpenseContext.Provider value={value}>{children}</ExpenseContext.Provider>
  );
};

export default ExpenseContextProvider;
