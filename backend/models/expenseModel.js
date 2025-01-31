import mongoose from "mongoose";

const expenseSchema = mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  paymentType: {
    type: String,
    enum: ["Cash", "Credit Card", "Debit Card", "UPI", "other"],
    required: true,
  },
  category: {
    type: String,
    enum: ["Expense", "Saving", "Investment"],
  },
  amount: {
    type: Number,
    required: true,
  },
  date: {
    type: Date,
    required: true,
  },
  location: {
    type: String,
  },
});

export const Expense = mongoose.model("Expenses", expenseSchema);
