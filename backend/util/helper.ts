import Category from "../models/category";

export const createDefaultCategories = async (userId: string) => {
  try {
    const categories = [
      {
        type: "expense",
        name: "Groceries",
        icon: "shopping-cart",
        color: "#FE9200",
        user: userId,
      },
      {
        type: "expense",
        name: "Electricity",
        icon: "loader",
        color: "#000000",
        user: userId,
      },
      {
        type: "expense",
        name: "Music",
        icon: "music",
        color: "#A4DD00",
        user: userId,
      },
      {
        type: "expense",
        name: "Rent",
        icon: "home",
        color: "#68CCCA",
        user: userId,
      },
      {
        type: "expense",
        name: "Mobile Bill",
        icon: "smartphone",
        color: "#0C797D",
        user: userId,
      },
      {
        type: "expense",
        name: "Transport",
        icon: "truck",
        color: "#999999",
        user: userId,
      },
      {
        type: "expense",
        name: "Gadgets",
        icon: "headphones",
        color: "#AB149E",
        user: userId,
      },
      {
        type: "income",
        name: "Salary",
        icon: "briefcase",
        color: "#AEA1FF",
        user: userId,
      },
      {
        type: "income",
        name: "Bonus",
        icon: "gift",
        color: "#16A5A5",
        user: userId,
      },
      {
        type: "income",
        name: "Interest",
        icon: "calendar",
        color: "#653294",
        user: userId,
      },
    ];
    await Category.insertMany(categories);
  } catch (err) {}
};
