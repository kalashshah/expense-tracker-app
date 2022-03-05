import { Request, Response } from "express";

import Category from "../models/category";
import { getUser } from "../util/user";

export const addCategory = async (req: Request, res: Response) => {
  try {
    const { type, name, icon } = req.body;
    const token = req.headers.authorization?.split(" ")[1];
    if (!token) throw new Error("Unauthorized");
    const id = getUser(token);

    const category = new Category({
      type,
      name,
      icon,
      user: id,
    });
    const existingCategory = await Category.findOne({ name });
    if (existingCategory) throw new Error("Category already exists");
    await category.save();
    res.status(201).send(category);
  } catch (error) {
    res.status(500).send(error);
  }
};
