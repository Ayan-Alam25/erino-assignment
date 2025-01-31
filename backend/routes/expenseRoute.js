import express from "express";
import {
  addExpense,
  deleteExpense,
  getAllExpenses,
  updateExpense,
} from "../controllers/expenseController.js";

import { userAuth } from "../middlewares/authMiddleware.js";

const router = express.Router();

router.post("/", userAuth, addExpense);
router.get("/", userAuth, getAllExpenses);
router.put("/:expenseId", updateExpense);
router.delete("/:expenseId", deleteExpense);

export default router;
