import express from "express";
import { addTransaction } from "../controllers/transaction";
import { verify } from "../middleware/verify";

const router = express.Router();

router.post("/add", verify, addTransaction);

export default router;
