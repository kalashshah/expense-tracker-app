import express from "express";
import { addCategory } from "../controllers/category";
import { verify } from "../middleware/verify";

const router = express.Router();

router.post("/add", verify, addCategory);

export default router;
