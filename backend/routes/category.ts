import express from "express";
import {
  addCategory,
  deleteCategory,
  getCategories,
  getCategoryOfType,
  updateCategory,
} from "../controllers/category";
import { verify } from "../middleware/verify";

const router = express.Router();

router.post("/add", verify, addCategory);
router.get("/", verify, getCategories);
router.get("/:type", verify, getCategoryOfType);
router.put("/:id", verify, updateCategory);
router.delete("/:id", verify, deleteCategory);

export default router;
