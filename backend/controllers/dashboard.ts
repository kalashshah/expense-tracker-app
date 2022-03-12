import { resolveSrv } from "dns/promises";
import { Request, Response } from "express";
import mongoose from "mongoose";
import Transaction from "../models/transaction";

const ObjectId = mongoose.Types.ObjectId;

export const getDashboard = async (req: Request, res: Response) => {
  try {
    const { user } = req.body;
    const year = new Date().getFullYear();

    const monthly = await Transaction.aggregate([
      {
        $match: {
          user: new ObjectId(user),
          date: {
            $gte: new Date(`${year}-01-01`),
            $lte: new Date(`${year}-12-31`),
          },
        },
      },
      {
        $group: {
          _id: { $month: "$date" },
          income: {
            $sum: {
              $cond: [{ $eq: ["$type", "income"] }, "$amount", 0],
            },
          },
          expense: {
            $sum: {
              $cond: [{ $eq: ["$type", "expense"] }, "$amount", 0],
            },
          },
        },
      },
      {
        $project: {
          _id: 0,
          month: "$_id",
          income: 1,
          expense: 1,
        },
      },
      {
        $sort: {
          _id: 1,
        },
      },
    ]);

    const total = await Transaction.aggregate([
      {
        $match: {
          user: new ObjectId(user),
          date: {
            $gte: new Date(`${year}-01-01`),
            $lte: new Date(`${year}-12-31`),
          },
        },
      },
      {
        $group: {
          _id: null,
          income: {
            $sum: {
              $cond: [{ $eq: ["$type", "income"] }, "$amount", 0],
            },
          },
          expense: {
            $sum: {
              $cond: [{ $eq: ["$type", "expense"] }, "$amount", 0],
            },
          },
        },
      },
      {
        $project: {
          _id: 0,
          income: 1,
          expense: 1,
        },
      },
    ]);

    const categoriesOfType = async (type: string) => {
      return await Transaction.aggregate([
        {
          $match: {
            user: new ObjectId(user),
            type,
            date: {
              $gte: new Date(`${year}-01-01`),
              $lte: new Date(`${year}-12-31`),
            },
          },
        },
        {
          $group: {
            _id: "$category",
            total: {
              $sum: "$amount",
            },
          },
        },
        {
          $lookup: {
            from: "categories",
            localField: "_id",
            foreignField: "_id",
            as: "category",
          },
        },
        {
          $unwind: "$category",
        },
        {
          $project: {
            _id: 0,
            category: 1,
            total: 1,
          },
        },
        {
          $sort: {
            total: -1,
          },
        },
      ]);
    };

    const expenseCategories = await categoriesOfType("expense");
    const incomeCategories = await categoriesOfType("income");

    return res
      .status(200)
      .send({ monthly, total: total[0], expenseCategories, incomeCategories });
  } catch (err) {
    console.log(err);
    res.status(500).send(err);
  }
};
