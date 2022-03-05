import express from "express";
import { addCategory } from "../controllers/category";

const router = express.Router();

router.post("/add", addCategory);

export default router;
