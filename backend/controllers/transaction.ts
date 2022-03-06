import { Request, Response } from "express";

import Transaction from "../models/transaction";
import Category from "../models/category";
import { ITransaction } from "../types/Transaction";

export const addTransaction = async (req: Request, res: Response) => {
  try {
    const {
      type,
      name,
      category,
      date,
      amount,
      description,
      user,
    }: ITransaction = req.body;
    const token = req.headers.authorization?.split(" ")[1];
    if (!token) return res.status(401).send("Unauthorized");
    if (!type || !name || !category || !date || !amount)
      return res.status(400).send("Bad Request, missing fields");
    if (description.length > 100)
      return res
        .status(400)
        .send("Description cannot be more than 100 characters");
    if (name.length > 50)
      return res.status(400).send("Name cannot be more than 50 characters");
    const existingCategory = await Category.findOne({ name: category });
    console.log(existingCategory);
    if (!existingCategory) return res.status(404).send("Category not found");
    if (existingCategory.type !== type)
      return res.status(400).send("Category type does not match");
    const transaction = new Transaction({
      type,
      name,
      category: existingCategory._id,
      date,
      amount,
      description,
      user,
    });
    await transaction.save();
    return res.status(201).send(transaction);
  } catch (error) {
    res.status(400).send(error);
  }
};
