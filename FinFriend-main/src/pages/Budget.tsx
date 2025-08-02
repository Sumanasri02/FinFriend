import React, { useState } from 'react';
import { useExpenses } from '../context/ExpenseContext';
import { Plus, Target, AlertTriangle, CheckCircle, TrendingUp } from 'lucide-react';

const Budget: React.FC = () => {
  const { budgets, addBudget, updateBudget } = useExpenses();
  const [showAddForm, setShowAddForm] = useState(false);
  const [newBudget, setNewBudget] = useState({
    category: '',
    amount: '',
    period: 'monthly' as 'monthly' | 'weekly'
  });

  const categories = [
    'Food', 'Transport', 'Entertainment', 'Shopping', 'Health', 
    'Utilities', 'Education', 'Travel', 'Other'
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newBudget.category || !newBudget.amount) return;

    addBudget({
      category: newBudget.category,
      amount: parseFloat(newBudget.amount),
      period: newBudget.period
    });

    setNewBudget({ category: '', amount: '', period: 'monthly' });
    setShowAddForm(false);
  };

  const getBudgetStatus = (spent: number, budget: number) => {
    const percentage = (spent / budget) * 100;
    if (percentage >= 90) return { status: 'danger', color: 'red', icon: AlertTriangle, message: 'Over budget!' };
    if (percentage >= 70) return { status: 'warning', color: 'orange', icon: Target, message: 'Approaching limit' };
    return { status: 'good', color: 'green', icon: CheckCircle, message: 'On track' };
  };

  const totalBudget = budgets.reduce((sum, budget) => sum + budget.amount, 0);
  const totalSpent = budgets.reduce((sum, budget) => sum + budget.spent, 0);
  const overallPercentage = totalBudget > 0 ? (totalSpent / totalBudget) * 100 : 0;

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
            Budget Management
          </h1>
          <p className="text-gray-600 dark:text-gray-400 mt-1">
            Set and track your spending limits
          </p>
        </div>
        <button
          onClick={() => setShowAddForm(true)}
          className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-4 py-2 rounded-lg font-medium flex items-center space-x-2 hover:shadow-lg transition-all duration-200"
        >
          <Plus className="h-4 w-4" />
          <span>Add Budget</span>
        </button>
      </div>

      {/* Overall Budget Summary */}
      <div className="glass-card rounded-2xl p-6">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-semibold text-gray-900 dark:text-white">
            Overall Budget
          </h2>
          <div className="flex items-center space-x-2">
            <TrendingUp className="h-5 w-5 text-blue-600 dark:text-blue-400" />
            <span className="text-sm text-gray-600 dark:text-gray-400">
              {overallPercentage.toFixed(1)}% used
            </span>
          </div>
        </div>
        
        <div className="mb-4">
          <div className="flex justify-between text-sm text-gray-600 dark:text-gray-400 mb-2">
            <span>Total Spent: ${totalSpent.toLocaleString()}</span>
            <span>Total Budget: ${totalBudget.toLocaleString()}</span>
          </div>
          <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-3">
            <div
              className={`h-3 rounded-full transition-all duration-300 ${
                overallPercentage >= 90 ? 'bg-red-500' : 
                overallPercentage >= 70 ? 'bg-orange-500' : 'bg-green-500'
              }`}
              style={{ width: `${Math.min(overallPercentage, 100)}%` }}
            />
          </div>
        </div>

        <div className="text-center">
          <span className={`text-2xl font-bold ${
            overallPercentage >= 90 ? 'text-red-600 dark:text-red-400' : 
            overallPercentage >= 70 ? 'text-orange-600 dark:text-orange-400' : 
            'text-green-600 dark:text-green-400'
          }`}>
            ${(totalBudget - totalSpent).toLocaleString()}
          </span>
          <p className="text-sm text-gray-600 dark:text-gray-400">remaining this month</p>
        </div>
      </div>

      {/* Budget Categories */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {budgets.map((budget) => {
          const status = getBudgetStatus(budget.spent, budget.amount);
          const Icon = status.icon;
          const percentage = (budget.spent / budget.amount) * 100;
          const remaining = budget.amount - budget.spent;

          return (
            <div key={budget.id} className="glass-card rounded-2xl p-6 hover-lift">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center space-x-3">
                  <div className={`p-2 rounded-lg bg-${status.color}-100 dark:bg-${status.color}-900`}>
                    <Icon className={`h-5 w-5 text-${status.color}-600 dark:text-${status.color}-400`} />
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900 dark:text-white">
                      {budget.category}
                    </h3>
                    <p className="text-sm text-gray-500 dark:text-gray-400">
                      {budget.period}
                    </p>
                  </div>
                </div>
                <span className={`text-sm font-medium px-2 py-1 rounded-full bg-${status.color}-100 text-${status.color}-700 dark:bg-${status.color}-900 dark:text-${status.color}-300`}>
                  {status.message}
                </span>
              </div>

              <div className="mb-4">
                <div className="flex justify-between text-sm text-gray-600 dark:text-gray-400 mb-2">
                  <span>Spent: ${budget.spent.toLocaleString()}</span>
                  <span>Budget: ${budget.amount.toLocaleString()}</span>
                </div>
                <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                  <div
                    className={`h-2 rounded-full bg-${status.color}-500 transition-all duration-300`}
                    style={{ width: `${Math.min(percentage, 100)}%` }}
                  />
                </div>
              </div>

              <div className="flex justify-between items-center">
                <div>
                  <span className={`text-lg font-bold ${remaining >= 0 ? 'text-green-600 dark:text-green-400' : 'text-red-600 dark:text-red-400'}`}>
                    ${Math.abs(remaining).toLocaleString()}
                  </span>
                  <p className="text-xs text-gray-500 dark:text-gray-400">
                    {remaining >= 0 ? 'remaining' : 'over budget'}
                  </p>
                </div>
                <div className="text-right">
                  <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                    {percentage.toFixed(1)}%
                  </span>
                  <p className="text-xs text-gray-500 dark:text-gray-400">used</p>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Add Budget Form */}
      {showAddForm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="glass-card rounded-2xl w-full max-w-md p-6 animate-slide-up">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-bold text-gray-900 dark:text-white">
                Add New Budget
              </h2>
              <button
                onClick={() => setShowAddForm(false)}
                className="p-2 text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
              >
                ×
              </button>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Category
                </label>
                <select
                  value={newBudget.category}
                  onChange={(e) => setNewBudget(prev => ({ ...prev, category: e.target.value }))}
                  required
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-700 dark:text-white"
                >
                  <option value="">Select category</option>
                  {categories.map(category => (
                    <option key={category} value={category}>
                      {category}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Budget Amount
                </label>
                <input
                  type="number"
                  step="0.01"
                  min="0"
                  value={newBudget.amount}
                  onChange={(e) => setNewBudget(prev => ({ ...prev, amount: e.target.value }))}
                  required
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-700 dark:text-white"
                  placeholder="0.00"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Period
                </label>
                <select
                  value={newBudget.period}
                  onChange={(e) => setNewBudget(prev => ({ ...prev, period: e.target.value as 'monthly' | 'weekly' }))}
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-700 dark:text-white"
                >
                  <option value="monthly">Monthly</option>
                  <option value="weekly">Weekly</option>
                </select>
              </div>

              <div className="flex space-x-3 pt-4">
                <button
                  type="button"
                  onClick={() => setShowAddForm(false)}
                  className="flex-1 px-4 py-2 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="flex-1 px-4 py-2 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-lg hover:shadow-lg transition-all duration-200"
                >
                  Add Budget
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {budgets.length === 0 && !showAddForm && (
        <div className="glass-card rounded-2xl p-12 text-center">
          <Target className="h-16 w-16 text-gray-400 mx-auto mb-4" />
          <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
            No budgets set
          </h3>
          <p className="text-gray-600 dark:text-gray-400 mb-6">
            Create your first budget to start tracking your spending limits
          </p>
          <button
            onClick={() => setShowAddForm(true)}
            className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-6 py-3 rounded-lg font-medium hover:shadow-lg transition-all duration-200"
          >
            Create Budget
          </button>
        </div>
      )}
    </div>
  );
};

export default Budget;