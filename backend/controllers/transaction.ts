import mongoose from "mongoose";
import { Request, Response } from "express";

import Transaction from "../models/transaction";
import Category from "../models/category";
import { ITransaction, IGetTransaction } from "../types/Transaction";

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
    if (!type || !name || !category || !date || !amount)
      return res.status(400).send("Bad Request, missing fields");
    if (description.length > 100)
      return res
        .status(400)
        .send("Description cannot be more than 100 characters");
    if (name.length > 50)
      return res.status(400).send("Name cannot be more than 50 characters");
    const existingCategory = await Category.findOne({ name: category, user });
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
    res.status(500).send(error);
  }
};

export const deleteTransaction = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    if (!id) return res.status(400).send("Invalid transaction id");
    if (!mongoose.Types.ObjectId.isValid(id))
      return res.status(400).send("Invalid ID");
    await Transaction.deleteOne({ _id: id });
    res.status(200).send("Transaction deleted");
  } catch (error) {
    res.status(500).send(error);
  }
};

export const updateTransaction = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    if (!mongoose.Types.ObjectId.isValid(id))
      return res.status(400).send("Invalid ID");
    const transaction = await Transaction.findByIdAndUpdate(
      id,
      { ...req.body },
      { new: true }
    );
    res.status(200).send(transaction);
  } catch (error) {
    res.status(500).send(error);
  }
};

export const getTransactions = async (req: Request, res: Response) => {
  try {
    const { user }: IGetTransaction = req.body;
    const transactions = await Transaction.find({ user });
    res.status(200).send(transactions);
  } catch (error) {
    res.status(500).send(error);
  }
};

export const getTransactionsOfType = async (req: Request, res: Response) => {
  try {
    const { type } = req.params;
    const { user }: IGetTransaction = req.body;
    if (!type) return res.status(400).send("Type missing");
    const transactions = await Transaction.find({ user, type });
    res.status(200).send(transactions);
  } catch (error) {
    res.status(500).send(error);
  }
};

export const getTransactionsOfCategory = async (
  req: Request,
  res: Response
) => {
  try {
    const { category } = req.params;
    const { user }: IGetTransaction = req.body;
    if (!category) return res.status(400).send("Category missing");
    const transactions = await Transaction.find({ user, category });
    res.status(200).send(transactions);
  } catch (error) {
    res.status(500).send(error);
  }
};
