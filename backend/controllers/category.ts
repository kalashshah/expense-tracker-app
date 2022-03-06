import { Request, Response } from "express";

import Category from "../models/category";

export const addCategory = async (req: Request, res: Response) => {
  try {
    const { type, name, icon, user } = req.body;
    const token = req.headers.authorization?.split(" ")[1];
    if (!token) throw new Error("Unauthorized");

    const category = new Category({ type, name, icon, user });
    const existingCategory = await Category.findOne({ name });
    if (existingCategory) throw new Error("Category already exists");
    await category.save();
    res.status(201).send(category);
  } catch (error) {
    res.status(500).send(error);
  }
};
