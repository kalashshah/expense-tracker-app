import express from "express";
import {
  addTransaction,
  deleteTransaction,
  getTotal,
  getTransactions,
  getTransactionSumOfType,
  updateTransaction,
} from "../controllers/transaction";
import { verify } from "../middleware/verify";

const router = express.Router();

router.post("/add", verify, addTransaction);

router.get("/:type", verify, getTransactions);

router.get("/sum/:type", verify, getTransactionSumOfType);
router.get("/sum/:type/category", verify, getTotal);

router.put("/:id", verify, updateTransaction);
router.delete("/:id", verify, deleteTransaction);

export default router;
