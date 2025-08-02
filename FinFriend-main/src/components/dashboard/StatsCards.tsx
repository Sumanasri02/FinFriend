import React from 'react';
import { TrendingUp, TrendingDown, Wallet, CreditCard } from 'lucide-react';

interface StatsCardsProps {
  totalIncome: number;
  totalExpenses: number;
  monthlySpending: number;
  expensesCount: number;
}

const StatsCards: React.FC<StatsCardsProps> = ({
  totalIncome,
  totalExpenses,
  monthlySpending,
  expensesCount
}) => {
  const balance = totalIncome - totalExpenses;
  const savingsRate = totalIncome > 0 ? ((totalIncome - totalExpenses) / totalIncome * 100) : 0;

  const stats = [
    {
      name: 'Total Balance',
      value: `$${balance.toLocaleString()}`,
      change: `${savingsRate.toFixed(1)}% savings rate`,
      icon: Wallet,
      color: balance >= 0 ? 'green' : 'red',
      bgColor: balance >= 0 ? 'bg-green-500' : 'bg-red-500'
    },
    {
      name: 'Monthly Spending',
      value: `$${monthlySpending.toLocaleString()}`,
      change: `${expensesCount} transactions`,
      icon: CreditCard,
      color: 'blue',
      bgColor: 'bg-blue-500'
    },
    {
      name: 'Total Income',
      value: `$${totalIncome.toLocaleString()}`,
      change: 'This month',
      icon: TrendingUp,
      color: 'green',
      bgColor: 'bg-green-500'
    },
    {
      name: 'Total Expenses',
      value: `$${totalExpenses.toLocaleString()}`,
      change: 'All time',
      icon: TrendingDown,
      color: 'red',
      bgColor: 'bg-red-500'
    }
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
      {stats.map((stat) => {
        const Icon = stat.icon;
        return (
          <div
            key={stat.name}
            className="glass-card rounded-2xl p-6 hover-lift animate-slide-up"
          >
            <div className="flex items-center justify-between">
              <div className="flex-1">
                <p className="text-sm font-medium text-gray-600 dark:text-gray-400">
                  {stat.name}
                </p>
                <p className="text-2xl font-bold text-gray-900 dark:text-white mt-2">
                  {stat.value}
                </p>
                <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
                  {stat.change}
                </p>
              </div>
              <div className={`${stat.bgColor} p-3 rounded-xl`}>
                <Icon className="h-6 w-6 text-white" />
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default StatsCards;