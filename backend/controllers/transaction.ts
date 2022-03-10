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

export const getTransactions = async (req: Request, res: Response) => {
  try {
    const { type } = req.params;
    const { user }: IGetTransaction = req.body;
    let { search, date, page } = req.query;

    if (!date) date = "all";
    const pageNo = page ? parseInt(page.toString(), 10) : 1;
    const { $gte, $lte } = getDate(date.toString());

    if (search) {
      const transactions = await Transaction.aggregate([
        {
          $match: {
            user: new ObjectId(user),
            type,
            date: { $gte, $lte },
            $or: [
              { name: { $regex: search, $options: "i" } },
              { description: { $regex: search, $options: "i" } },
              { category: { $regex: search, $options: "i" } },
            ],
          },
        },
        { $sort: { date: -1 } },
        { $skip: (pageNo - 1) * PAGINATION_LIMIT },
        { $limit: PAGINATION_LIMIT },
      ]);
      return res.status(200).send(transactions);
    }

    const transactions = await Transaction.aggregate([
      {
        $match: {
          user: new ObjectId(user),
          type,
          date: { $gte, $lte },
        },
      },
      { $sort: { date: -1 } },
      { $skip: (pageNo - 1) * PAGINATION_LIMIT },
      { $limit: PAGINATION_LIMIT },
    ]);
    res.status(200).send(transactions);
  } catch (error) {
    return res.status(500).send(error);
  }
};

const getDate = (query: string) => {
  const date = new Date();
  const year = date.getFullYear();
  const month = date.getMonth();
  const day = date.getDate();

  switch (query) {
    case "year":
      return {
        $gte: new Date(year, 0, 1),
        $lte: new Date(year, 11, 31),
      };
    case "half":
      return {
        $gte: new Date(year, month - 6, 1),
        $lte: new Date(year, month, day),
      };
    case "month":
      return {
        $gte: new Date(year, month, 1),
        $lte: new Date(year, month, 31),
      };
    case "week":
      return {
        $gte: new Date(year, month, day - 6),
        $lte: new Date(year, month, day),
      };
    case "yesterday":
      return {
        $gte: new Date(year, month, day - 1),
        $lte: new Date(year, month, day),
      };
    case "today":
      return {
        $gte: new Date(year, month, day),
        $lte: new Date(year, month, day + 1),
      };
    default:
      return {
        $gte: new Date(0, 0, 0),
        $lte: new Date(year + 1, 0, 0),
      };
  }
};
