import mongoose from "mongoose";
import { Request, Response } from "express";

import Transaction from "../models/transaction";
import Category from "../models/category";
import { PAGINATION_LIMIT } from "../util/constants";
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
    const { user, type, page } = req.body;
    if (!type || !page)
      return res.status(400).send("Bad Request, missing fields");
    const transactions = await Transaction.find({ user, type })
      .sort({ date: -1 })
      .skip(page * PAGINATION_LIMIT)
      .limit(PAGINATION_LIMIT);
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
    const { user }: IGetTransaction = req.body;
    const { category, page, type } = req.params;
    if (!category || !page)
      return res.status(400).send("Bad Request, missing fields");
    const transactions = await Transaction.find({ user, type, category })
      .sort({ date: -1 })
      .skip(parseInt(page) * PAGINATION_LIMIT)
      .limit(PAGINATION_LIMIT);
    res.status(200).send(transactions);
  } catch (error) {
    res.status(500).send(error);
  }
};

export const getTransactionSumOfType = async (req: Request, res: Response) => {
  try {
    const { type } = req.params;
    const { user }: IGetTransaction = req.body;
    if (!type) return res.status(400).send("Type missing");
    const transactions = await Transaction.aggregate([
      { $match: { user, type } },
      { $group: { _id: null, total: { $sum: "$amount" } } },
    ]);
    res.status(200).send(transactions[0].total);
  } catch (error) {
    res.status(500).send(error);
  }
};

export const getTransactionsSumOfCategory = async (
  req: Request,
  res: Response
) => {
  try {
    const { type, category } = req.params;
    const { user }: IGetTransaction = req.body;
    if (!category) return res.status(400).send("Category missing");
    if (!type) return res.status(400).send("Type missing");
    const transactions = await Transaction.aggregate([
      { $match: { user, type, category } },
      { $group: { _id: null, total: { $sum: "$amount" } } },
    ]);
    return res.status(200).send(transactions[0].total);
  } catch (error) {
    res.status(500).send(error);
  }
};

export const getTotalOfEachCategory = async (req: Request, res: Response) => {
  try {
    const { user }: IGetTransaction = req.body;
    const transactions = await Transaction.aggregate([
      { $match: { user } },
      {
        $group: {
          _id: "$category",
          total: { $sum: "$amount" },
        },
      },
    ]);
    res.status(200).send(transactions);
  } catch (error) {
    res.status(500).send(error);
  }
};

export const getMonthTransactions = async (req: Request, res: Response) => {
  try {
    const { user }: IGetTransaction = req.body;
    const month = parseInt(req.params.month);
    const year = parseInt(req.params.year);
    if (!month || !year)
      return res.status(400).send("Bad Request, missing fields");
    const transactions = await Transaction.find({
      user,
      date: {
        $gte: new Date(year, month - 1, 1),
        $lte: new Date(year, month, 0),
      },
    });
    res.status(200).send(transactions);
  } catch (error) {
    res.status(500).send(error);
  }
};

export const getTransactionsPagination = async (
  req: Request,
  res: Response
) => {
  try {
    const { user }: IGetTransaction = req.body;
    const { page } = req.query;
    const transactions = await Transaction.find({ user })
      .skip(parseInt(page as string) * PAGINATION_LIMIT)
      .limit(PAGINATION_LIMIT);
    res.status(200).send(transactions);
  } catch (error) {
    res.status(500).send(error);
  }
};
