import express from "express";
import { getDashboard } from "../controllers/dashboard";
import { verify } from "../middleware/verify";

const router = express.Router();

router.get("/", verify, getDashboard);

export default router;
