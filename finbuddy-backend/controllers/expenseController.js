const Expense = require('../models/Expense');

// @desc Get expenses by user ID
exports.getExpenses = async (req, res) => {
  try {
    const expenses = await Expense.find({ userId: req.params.userId });
    res.json(expenses);
  } catch (err) {
    res.status(500).json({ error: 'Server error' });
  }
};

// @desc Add new expense
exports.addExpense = async (req, res) => {
  const { title, amount, category, date, userId } = req.body;
  if (!title || !amount || !category || !date || !userId) {
    return res.status(400).json({ error: 'Missing required fields' });
  }

  try {
    const newExpense = new Expense({ title, amount, category, date, userId });
    await newExpense.save();
    res.status(201).json(newExpense);
  } catch (err) {
    res.status(400).json({ error: 'Invalid data' });
  }
};

// @desc Delete expense
exports.deleteExpense = async (req, res) => {
  try {
    await Expense.findByIdAndDelete(req.params.id);
    res.json({ message: 'Expense deleted' });
  } catch (err) {
    res.status(500).json({ error: 'Failed to delete expense' });
  }
};
