const mongoose = require('mongoose');

const ExpenseSchema = new mongoose.Schema({
  title: { type: String, required: true },
  amount: { type: Number, required: true },
  category: {
    type: String,
    required: true,
    enum: ['Food', 'Bills', 'Entertainment', 'Travel', 'Shopping', 'Other']
  },
  date: { type: Date, required: true },
  userId: { type: String, required: true }
});

module.exports = mongoose.model('Expense', ExpenseSchema);
