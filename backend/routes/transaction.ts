import express from "express";
import {
  addTransaction,
  deleteTransaction,
  getDayTransactions,
  getMonthTransactions,
  getTotal,
  getTransactions,
  getTransactionsOfCategory,
  getTransactionsOfType,
  getTransactionSumOfType,
  getWeekTransactions,
  getYearTransactions,
  updateTransaction,
} from "../controllers/transaction";
import { verify } from "../middleware/verify";

const router = express.Router();

router.post("/add", verify, addTransaction);

router.get("/all/:page", verify, getTransactions);
router.get("/all/:type/:page", verify, getTransactionsOfType);
router.get("/all/:type/:category/:page", verify, getTransactionsOfCategory);

router.get("/sum/:type", verify, getTransactionSumOfType);
router.get("/sum/:type/category", verify, getTotal);

router.get("/date/:type/:year/:page", verify, getYearTransactions);
router.get("/date/:type/:year/:month/:page", verify, getMonthTransactions);
router.get("/date/:type/:year/:month/weekly/:week/:page", verify, getWeekTransactions);
router.get("/date/:type/:year/:month/daily/:day/:page", verify, getDayTransactions);

router.put("/:id", verify, updateTransaction);
router.delete("/:id", verify, deleteTransaction);

export default router;
