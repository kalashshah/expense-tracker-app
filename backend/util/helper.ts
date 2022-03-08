import Category from "../models/category";

export const createDefaultCategories = async (userId: string) => {
  try {
    const categories = [
      {
        type: "income",
        name: "Salary",
        icon: "fas fa-money-bill-wave",
        color: "#00b894",
        user: userId,
      },
      {
        type: "expense",
        name: "Expense",
        icon: "fas fa-money-bill-wave",
        color: "#e84393",
        user: userId,
      },
      {
        type: "expense",
        name: "Groceries",
        icon: "fas fa-utensils",
        color: "#e84393",
        user: userId,
      },
    ];
    await Category.insertMany(categories);
  } catch (err) {}
};
