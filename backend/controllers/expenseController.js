import { Expense } from "../models/expenseModel.js";

export const addExpense = async (req, res) => {
  try {
    const { description, paymentType, category, amount, date, location } =
      req.body;

    const expense = new Expense({
      user: req.user.user._id,
      description,
      paymentType,
      category,
      amount,
      date,
      location,
    });

    await expense.save();

    return res.status(201).json({
      success: true,
      message: "Expense created successfully",
      data: expense,
    });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};

export const getAllExpenses = async (req, res) => {
  try {
    const expenses = await Expense.find({ user: req.user.user._id }).sort({
      date: -1,
    });

    return res.status(200).json({ success: true, expenses });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};

export const updateExpense = async (req, res) => {
  try {
    const { description, paymentType, category, amount, date, location } =
      req.body;

    const expenseId = req.params.expenseId;

    const expense = await Expense.findById({ _id: expenseId });

    if (!expense) {
      return res
        .status(400)
        .json({ success: false, message: "Expense not found" });
    }

    expense.description = description || expense.description;
    expense.paymentType = paymentType || expense.paymentType;
    expense.category = category || expense.category;
    expense.amount = amount || expense.amount;
    expense.date = date || expense.date;
    expense.location = location || expense.location;

    await expense.save();

    return res.status(200).json({
      success: true,
      message: "Expense updated successfully",
      expense,
    });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};

export const deleteExpense = async (req, res) => {
  try {
    const expenseID = req.params.expenseId;
    const expense = await Expense.findByIdAndDelete({ _id: expenseID });

    if (!expense) {
      return res
        .status(404)
        .json({ success: false, message: "Expense not found" });
    }

    return res
      .status(200)
      .json({ success: true, message: "Expense deleted successfully" });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};
