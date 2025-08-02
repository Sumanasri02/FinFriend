import React from 'react';
import { format } from 'date-fns';
import { ArrowUpRight, ArrowDownRight } from 'lucide-react';
import { Expense } from '../../context/ExpenseContext';

interface RecentTransactionsProps {
  transactions: Expense[];
}

const RecentTransactions: React.FC<RecentTransactionsProps> = ({ transactions }) => {
  const getCategoryColor = (category: string) => {
    const colors: { [key: string]: string } = {
      Food: 'bg-orange-100 text-orange-800 dark:bg-orange-900 dark:text-orange-300',
      Transport: 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300',
      Entertainment: 'bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-300',
      Shopping: 'bg-pink-100 text-pink-800 dark:bg-pink-900 dark:text-pink-300',
      Health: 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300',
      Utilities: 'bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-300',
      Income: 'bg-emerald-100 text-emerald-800 dark:bg-emerald-900 dark:text-emerald-300',
    };
    return colors[category] || 'bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-300';
  };

  return (
    <div className="glass-card rounded-2xl p-6 animate-slide-up">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
          Recent Transactions
        </h3>
        <button className="text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 text-sm font-medium">
          View All
        </button>
      </div>

      <div className="space-y-3">
        {transactions.length === 0 ? (
          <div className="text-center py-8 text-gray-500 dark:text-gray-400">
            No transactions yet
          </div>
        ) : (
          transactions.map((transaction) => (
            <div
              key={transaction.id}
              className="flex items-center justify-between p-3 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors"
            >
              <div className="flex items-center space-x-3">
                <div className={`p-2 rounded-lg ${transaction.type === 'income' ? 'bg-green-100 dark:bg-green-900' : 'bg-red-100 dark:bg-red-900'}`}>
                  {transaction.type === 'income' ? (
                    <ArrowUpRight className="h-4 w-4 text-green-600 dark:text-green-400" />
                  ) : (
                    <ArrowDownRight className="h-4 w-4 text-red-600 dark:text-red-400" />
                  )}
                </div>
                <div>
                  <p className="font-medium text-gray-900 dark:text-white">
                    {transaction.description}
                  </p>
                  <div className="flex items-center space-x-2">
                    <span className={`px-2 py-1 text-xs font-medium rounded-full ${getCategoryColor(transaction.category)}`}>
                      {transaction.category}
                    </span>
                    <span className="text-xs text-gray-500 dark:text-gray-400">
                      {format(new Date(transaction.date), 'MMM dd')}
                    </span>
                  </div>
                </div>
              </div>
              <div className="text-right">
                <span className={`font-semibold ${transaction.type === 'income' ? 'text-green-600 dark:text-green-400' : 'text-red-600 dark:text-red-400'}`}>
                  {transaction.type === 'income' ? '+' : '-'}${transaction.amount.toLocaleString()}
                </span>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default RecentTransactions;