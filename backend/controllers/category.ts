import { Request, Response } from "express";
import mongoose from "mongoose";

import Category from "../models/category";
import { IAddCategory, IDeleteCategory, IGetCategory } from "../types/Category";

export const addCategory = async (req: Request, res: Response) => {
  try {
    const { type, name, icon, user }: IAddCategory = req.body;
    if (!type || !name || !icon || !user)
      return res.status(400).send("Bad request, missing fields");
    const existingCategory = await Category.findOne({ name, type, user });
    if (existingCategory)
      return res.status(400).send("Category already exists");
    const category = new Category({ icon, name, type, user });
    await category.save();
    res.status(201).send(category);
  } catch (error) {
    res.status(500).send(error);
  }
};

export const updateCategory = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    if (!mongoose.Types.ObjectId.isValid(id))
      return res.status(400).send("Invalid ID");
    const category = await Category.findByIdAndUpdate(
      id,
      { ...req.body },
      { new: true }
    );
    res.status(200).send(category);
  } catch (error) {
    res.status(500).send(error);
  }
};

export const deleteCategory = async (req: Request, res: Response) => {
  try {
    const { user }: IDeleteCategory = req.body;
    const { id } = req.params;
    if (!user) return res.status(400).send("User not found");
    if (!id) return res.status(400).send("Invalid category id");
    if (!mongoose.Types.ObjectId.isValid(id))
      return res.status(400).send("Invalid ID");
    await Category.deleteOne({ _id: id });
    res.status(200).send("Category deleted");
  } catch (error) {
    res.status(500).send(error);
  }
};

export const getCategories = async (req: Request, res: Response) => {
  try {
    const { user }: IGetCategory = req.body;
    const categories = await Category.find({ user });
    res.status(200).send(categories);
  } catch (error) {
    res.status(500).send(error);
  }
};

export const getCategoryOfType = async (req: Request, res: Response) => {
  try {
    const { type } = req.params;
    const { user }: IGetCategory = req.body;
    if (!type) return res.status(400).send("Type missing");
    const categories = await Category.find({ user, type });
    res.status(200).send(categories);
  } catch (error) {
    res.status(500).send(error);
  }
};
