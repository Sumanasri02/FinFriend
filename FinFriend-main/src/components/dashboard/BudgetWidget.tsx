import React from 'react';
import { useExpenses } from '../../context/ExpenseContext';
import { AlertTriangle, CheckCircle, Target } from 'lucide-react';

const BudgetWidget: React.FC = () => {
  const { budgets } = useExpenses();

  const getBudgetStatus = (spent: number, budget: number) => {
    const percentage = (spent / budget) * 100;
    if (percentage >= 90) return { status: 'danger', color: 'red', icon: AlertTriangle };
    if (percentage >= 70) return { status: 'warning', color: 'orange', icon: Target };
    return { status: 'good', color: 'green', icon: CheckCircle };
  };

  return (
    <div className="glass-card rounded-2xl p-6 animate-slide-up">
      <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
        Budget Overview
      </h3>
      
      <div className="space-y-4">
        {budgets.map((budget) => {
          const percentage = (budget.spent / budget.amount) * 100;
          const status = getBudgetStatus(budget.spent, budget.amount);
          const Icon = status.icon;
          const remaining = budget.amount - budget.spent;
          
          return (
            <div key={budget.id} className="space-y-2">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <Icon className={`h-4 w-4 text-${status.color}-500`} />
                  <span className="font-medium text-gray-900 dark:text-white">
                    {budget.category}
                  </span>
                </div>
                <span className="text-sm text-gray-500 dark:text-gray-400">
                  ${budget.spent.toLocaleString()} / ${budget.amount.toLocaleString()}
                </span>
              </div>
              
              <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                <div
                  className={`h-2 rounded-full bg-${status.color}-500 transition-all duration-300`}
                  style={{ width: `${Math.min(percentage, 100)}%` }}
                />
              </div>
              
              <div className="flex justify-between text-xs text-gray-500 dark:text-gray-400">
                <span>{percentage.toFixed(1)}% used</span>
                <span>${remaining.toLocaleString()} remaining</span>
              </div>
            </div>
          );
        })}
      </div>

      <button className="w-full mt-4 px-4 py-2 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-lg font-medium text-sm hover:shadow-lg transition-all duration-200">
        Manage Budgets
      </button>
    </div>
  );
};

export default BudgetWidget;