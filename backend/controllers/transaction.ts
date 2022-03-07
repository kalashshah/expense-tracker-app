import mongoose from "mongoose";
import { Request, Response } from "express";

import Transaction from "../models/transaction";
import Category from "../models/category";
import { PAGINATION_LIMIT } from "../util/constants";
import { ITransaction, IGetTransaction } from "../types/Transaction";

const ObjectId = mongoose.Types.ObjectId;

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
    const page = parseInt(req.params.page);
    const { user }: IGetTransaction = req.body;
    if (!page) return res.status(400).send("Bad Request, missing fields");
    const transactions = await Transaction.find({ user })
      .sort({ date: -1 })
      .skip((page - 1) * PAGINATION_LIMIT)
      .limit(PAGINATION_LIMIT);
    res.status(200).send(transactions);
  } catch (error) {
    res.status(500).send(error);
  }
};

export const getTransactionsOfType = async (req: Request, res: Response) => {
  try {
    const { type } = req.params;
    const page = parseInt(req.params.page);
    const { user }: IGetTransaction = req.body;
    if (!type || !page)
      return res.status(400).send("Bad Request, missing fields");
    const transactions = await Transaction.find({ user, type })
      .sort({ date: -1 })
      .skip((page - 1) * PAGINATION_LIMIT)
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
    const { category, type } = req.params;
    const page = parseInt(req.params.page);
    const { user }: IGetTransaction = req.body;
    if (!category || !page)
      return res.status(400).send("Bad Request, missing fields");
    const transactions = await Transaction.find({ user, type, category })
      .sort({ date: -1 })
      .skip((page - 1) * PAGINATION_LIMIT)
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
      { $match: { user: new ObjectId(user), type } },
      { $group: { _id: null, total: { $sum: "$amount" } } },
    ]);
    res.status(200).send(transactions[0]);
  } catch (error) {
    res.status(500).send(error);
  }
};

export const getTotal = async (req: Request, res: Response) => {
  try {
    const { user }: IGetTransaction = req.body;
    const { type } = req.params;
    if (!type) return res.status(400).send("Type missing");
    const category = req.query.category;
    if (category) {
      const categoryId = await Category.findOne({
        name: category,
        user,
      });
      if (!categoryId) return res.status(400).send("Category not found");
      const transactions = await Transaction.aggregate([
        {
          $match: {
            user: new ObjectId(user),
            type,
            category: new ObjectId(categoryId._id),
          },
        },
        { $group: { _id: null, total: { $sum: "$amount" } } },
      ]);
      console.log(category);
      return res.status(200).send(transactions);
    } else {
      const transactions = await Transaction.aggregate([
        { $match: { user: new ObjectId(user), type } },
        { $group: { _id: "$category", total: { $sum: "$amount" } } },
        { $sort: { total: -1 } },
      ]);
      return res.status(200).send(transactions);
    }
  } catch (error) {
    res.status(500).send(error);
  }
};

export const getYearTransactions = async (req: Request, res: Response) => {
  try {
    const year = parseInt(req.params.year);
    const page = parseInt(req.params.page);
    const { type } = req.params;
    const { user }: IGetTransaction = req.body;
    if (!year || !page || !type)
      return res.status(400).send("Bad Request, missing fields");
    const transactions = await Transaction.aggregate([
      {
        $match: {
          user: new ObjectId(user),
          type,
          date: { $gte: new Date(year, 0, 1), $lte: new Date(year, 11, 31) },
        },
      },
      { $sort: { date: -1 } },
      { $skip: (page - 1) * PAGINATION_LIMIT },
      { $limit: PAGINATION_LIMIT },
    ]);
    res.status(200).send(transactions);
  } catch (error) {
    res.status(500).send(error);
  }
};

export const getMonthTransactions = async (req: Request, res: Response) => {
  try {
    const month = parseInt(req.params.month);
    const year = parseInt(req.params.year);
    const page = parseInt(req.params.page);
    const { type } = req.params;
    const { user }: IGetTransaction = req.body;
    if (!month || !year || !page)
      return res.status(400).send("Bad Request, missing fields");
    const transactions = await Transaction.aggregate([
      {
        $match: {
          user: new ObjectId(user),
          type,
          date: {
            $gte: new Date(year, month - 1, 1),
            $lte: new Date(year, month, 1),
          },
        },
      },
      { $sort: { date: -1 } },
      { $skip: (page - 1) * PAGINATION_LIMIT },
      { $limit: PAGINATION_LIMIT },
    ]);
    res.status(200).send(transactions);
  } catch (error) {
    res.status(500).send(error);
  }
};

export const getWeekTransactions = async (req: Request, res: Response) => {
  try {
    const week = parseInt(req.params.week);
    const month = parseInt(req.params.month);
    const year = parseInt(req.params.year);
    const page = parseInt(req.params.page);
    const { type } = req.params;
    const { user }: IGetTransaction = req.body;
    if (!week || !year || !page)
      return res.status(400).send("Bad Request, missing fields");
    const transactions = await Transaction.aggregate([
      {
        $match: {
          user: new ObjectId(user),
          type,
          date: {
            $gte: new Date(year, month - 1, week * 7 - 6),
            $lte: new Date(year, month - 1, week * 7),
          },
        },
      },
      { $sort: { date: -1 } },
      { $skip: (page - 1) * PAGINATION_LIMIT },
      { $limit: PAGINATION_LIMIT },
    ]);
    res.status(200).send(transactions);
  } catch (error) {
    res.status(500).send(error);
  }
};

export const getDayTransactions = async (req: Request, res: Response) => {
  try {
    const day = parseInt(req.params.day);
    const month = parseInt(req.params.month);
    const year = parseInt(req.params.year);
    const page = parseInt(req.params.page);
    const { type } = req.params;
    const { user }: IGetTransaction = req.body;
    if (!day || !month || !year || !page)
      return res.status(400).send("Bad Request, missing fields");
    const transactions = await Transaction.aggregate([
      {
        $match: {
          user: new ObjectId(user),
          type,
          date: {
            $gte: new Date(year, month - 1, day),
            $lte: new Date(year, month - 1, day + 1),
          },
        },
      },
      { $sort: { date: -1 } },
      { $skip: (page - 1) * PAGINATION_LIMIT },
      { $limit: PAGINATION_LIMIT },
    ]);
    res.status(200).send(transactions);
  } catch (error) {
    res.status(500).send(error);
  }
};
