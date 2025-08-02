import React, { useState } from 'react';
import { useExpenses } from '../context/ExpenseContext';
import { Plus, Target, Calendar, DollarSign, TrendingUp } from 'lucide-react';
import { format, differenceInDays } from 'date-fns';

const Goals: React.FC = () => {
  const { goals, addGoal, updateGoal } = useExpenses();
  const [showAddForm, setShowAddForm] = useState(false);
  const [newGoal, setNewGoal] = useState({
    name: '',
    targetAmount: '',
    currentAmount: '',
    deadline: '',
    category: ''
  });

  const categories = [
    'Savings', 'Travel', 'Technology', 'Education', 'Health', 
    'Home', 'Car', 'Investment', 'Emergency', 'Other'
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newGoal.name || !newGoal.targetAmount || !newGoal.deadline || !newGoal.category) return;

    addGoal({
      name: newGoal.name,
      targetAmount: parseFloat(newGoal.targetAmount),
      currentAmount: parseFloat(newGoal.currentAmount) || 0,
      deadline: newGoal.deadline,
      category: newGoal.category
    });

    setNewGoal({ name: '', targetAmount: '', currentAmount: '', deadline: '', category: '' });
    setShowAddForm(false);
  };

  const handleContribute = (goalId: string, amount: number) => {
    const goal = goals.find(g => g.id === goalId);
    if (goal) {
      updateGoal(goalId, {
        currentAmount: Math.min(goal.currentAmount + amount, goal.targetAmount)
      });
    }
  };

  const getGoalProgress = (current: number, target: number) => {
    return Math.min((current / target) * 100, 100);
  };

  const getDaysRemaining = (deadline: string) => {
    return differenceInDays(new Date(deadline), new Date());
  };

  const getCategoryColor = (category: string) => {
    const colors: { [key: string]: string } = {
      Savings: 'bg-green-500',
      Travel: 'bg-blue-500',
      Technology: 'bg-purple-500',
      Education: 'bg-orange-500',
      Health: 'bg-teal-500',
      Home: 'bg-indigo-500',
      Car: 'bg-red-500',
      Investment: 'bg-yellow-500',
      Emergency: 'bg-pink-500',
      Other: 'bg-gray-500'
    };
    return colors[category] || 'bg-gray-500';
  };

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
            Savings Goals
          </h1>
          <p className="text-gray-600 dark:text-gray-400 mt-1">
            Set and track your financial goals
          </p>
        </div>
        <button
          onClick={() => setShowAddForm(true)}
          className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-4 py-2 rounded-lg font-medium flex items-center space-x-2 hover:shadow-lg transition-all duration-200"
        >
          <Plus className="h-4 w-4" />
          <span>Add Goal</span>
        </button>
      </div>

      {/* Goals Overview */}
      {goals.length > 0 && (
        <div className="glass-card rounded-2xl p-6">
          <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
            Goals Overview
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="text-center">
              <div className="text-2xl font-bold text-blue-600 dark:text-blue-400">
                {goals.length}
              </div>
              <div className="text-sm text-gray-600 dark:text-gray-400">Active Goals</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-green-600 dark:text-green-400">
                ${goals.reduce((sum, goal) => sum + goal.currentAmount, 0).toLocaleString()}
              </div>
              <div className="text-sm text-gray-600 dark:text-gray-400">Total Saved</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-purple-600 dark:text-purple-400">
                ${goals.reduce((sum, goal) => sum + goal.targetAmount, 0).toLocaleString()}
              </div>
              <div className="text-sm text-gray-600 dark:text-gray-400">Total Target</div>
            </div>
          </div>
        </div>
      )}

      {/* Goals Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {goals.map((goal) => {
          const progress = getGoalProgress(goal.currentAmount, goal.targetAmount);
          const daysRemaining = getDaysRemaining(goal.deadline);
          const isOverdue = daysRemaining < 0;
          const isCompleted = progress >= 100;

          return (
            <div key={goal.id} className="glass-card rounded-2xl p-6 hover-lift">
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center space-x-3">
                  <div className={`${getCategoryColor(goal.category)} p-3 rounded-xl`}>
                    <Target className="h-6 w-6 text-white" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900 dark:text-white">
                      {goal.name}
                    </h3>
                    <p className="text-sm text-gray-500 dark:text-gray-400">
                      {goal.category}
                    </p>
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-sm text-gray-500 dark:text-gray-400">
                    {isCompleted ? '🎉 Completed!' : 
                     isOverdue ? '⚠️ Overdue' : 
                     `${daysRemaining} days left`}
                  </div>
                </div>
              </div>

              <div className="mb-4">
                <div className="flex justify-between text-sm text-gray-600 dark:text-gray-400 mb-2">
                  <span>Progress: ${goal.currentAmount.toLocaleString()}</span>
                  <span>Target: ${goal.targetAmount.toLocaleString()}</span>
                </div>
                <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-3">
                  <div
                    className={`h-3 rounded-full transition-all duration-500 ${
                      isCompleted ? 'bg-green-500' : 
                      isOverdue ? 'bg-red-500' : 'bg-blue-500'
                    }`}
                    style={{ width: `${progress}%` }}
                  />
                </div>
                <div className="flex justify-between text-xs text-gray-500 dark:text-gray-400 mt-1">
                  <span>{progress.toFixed(1)}% complete</span>
                  <span>Due: {format(new Date(goal.deadline), 'MMM dd, yyyy')}</span>
                </div>
              </div>

              {!isCompleted && (
                <div className="flex space-x-2">
                  <button
                    onClick={() => handleContribute(goal.id, 50)}
                    className="flex-1 px-3 py-2 bg-blue-100 dark:bg-blue-900 text-blue-700 dark:text-blue-300 rounded-lg text-sm hover:bg-blue-200 dark:hover:bg-blue-800 transition-colors"
                  >
                    +$50
                  </button>
                  <button
                    onClick={() => handleContribute(goal.id, 100)}
                    className="flex-1 px-3 py-2 bg-green-100 dark:bg-green-900 text-green-700 dark:text-green-300 rounded-lg text-sm hover:bg-green-200 dark:hover:bg-green-800 transition-colors"
                  >
                    +$100
                  </button>
                  <button
                    onClick={() => handleContribute(goal.id, 250)}
                    className="flex-1 px-3 py-2 bg-purple-100 dark:bg-purple-900 text-purple-700 dark:text-purple-300 rounded-lg text-sm hover:bg-purple-200 dark:hover:bg-purple-800 transition-colors"
                  >
                    +$250
                  </button>
                </div>
              )}

              {isCompleted && (
                <div className="text-center py-2">
                  <span className="text-green-600 dark:text-green-400 font-medium">
                    🎉 Goal achieved! Congratulations!
                  </span>
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* Add Goal Form */}
      {showAddForm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="glass-card rounded-2xl w-full max-w-md p-6 animate-slide-up">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-bold text-gray-900 dark:text-white">
                Create New Goal
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
                  Goal Name
                </label>
                <input
                  type="text"
                  value={newGoal.name}
                  onChange={(e) => setNewGoal(prev => ({ ...prev, name: e.target.value }))}
                  required
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-700 dark:text-white"
                  placeholder="e.g., Emergency Fund"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Category
                </label>
                <select
                  value={newGoal.category}
                  onChange={(e) => setNewGoal(prev => ({ ...prev, category: e.target.value }))}
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
                  Target Amount
                </label>
                <input
                  type="number"
                  step="0.01"
                  min="0"
                  value={newGoal.targetAmount}
                  onChange={(e) => setNewGoal(prev => ({ ...prev, targetAmount: e.target.value }))}
                  required
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-700 dark:text-white"
                  placeholder="0.00"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Current Amount (Optional)
                </label>
                <input
                  type="number"
                  step="0.01"
                  min="0"
                  value={newGoal.currentAmount}
                  onChange={(e) => setNewGoal(prev => ({ ...prev, currentAmount: e.target.value }))}
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-700 dark:text-white"
                  placeholder="0.00"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Target Date
                </label>
                <input
                  type="date"
                  value={newGoal.deadline}
                  onChange={(e) => setNewGoal(prev => ({ ...prev, deadline: e.target.value }))}
                  required
                  min={format(new Date(), 'yyyy-MM-dd')}
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-700 dark:text-white"
                />
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
                  Create Goal
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {goals.length === 0 && !showAddForm && (
        <div className="glass-card rounded-2xl p-12 text-center">
          <Target className="h-16 w-16 text-gray-400 mx-auto mb-4" />
          <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
            No goals set
          </h3>
          <p className="text-gray-600 dark:text-gray-400 mb-6">
            Create your first savings goal to start building your financial future
          </p>
          <button
            onClick={() => setShowAddForm(true)}
            className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-6 py-3 rounded-lg font-medium hover:shadow-lg transition-all duration-200"
          >
            Create Goal
          </button>
        </div>
      )}
    </div>
  );
};

export default Goals;