import React, { useState } from 'react';
import { useExpenses } from '../context/ExpenseContext';
import StatsCards from '../components/dashboard/StatsCards';
import ExpenseChart from '../components/dashboard/ExpenseChart';
import RecentTransactions from '../components/dashboard/RecentTransactions';
import QuickActions from '../components/dashboard/QuickActions';
import AddExpenseModal from '../components/modals/AddExpenseModal';
import BudgetWidget from '../components/dashboard/BudgetWidget';
import SmartInsights from '../components/dashboard/SmartInsights';

const Dashboard: React.FC = () => {
  const { expenses, getTotalSpending, getCategoryTotals } = useExpenses();
  const [showAddExpense, setShowAddExpense] = useState(false);

  const monthlySpending = getTotalSpending('month');
  const categoryTotals = getCategoryTotals();
  const recentExpenses = expenses.filter(e => e.type === 'expense').slice(0, 5);
  const totalIncome = expenses.filter(e => e.type === 'income').reduce((sum, e) => sum + e.amount, 0);
  const totalExpenses = expenses.filter(e => e.type === 'expense').reduce((sum, e) => sum + e.amount, 0);

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
            Dashboard
          </h1>
          <p className="text-gray-600 dark:text-gray-400 mt-1">
            Welcome back! Here's your financial overview.
          </p>
        </div>
        <QuickActions onAddExpense={() => setShowAddExpense(true)} />
      </div>

      <StatsCards 
        totalIncome={totalIncome}
        totalExpenses={totalExpenses}
        monthlySpending={monthlySpending}
        expensesCount={expenses.filter(e => e.type === 'expense').length}
      />

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-6">
          <ExpenseChart categoryTotals={categoryTotals} />
          <RecentTransactions transactions={recentExpenses} />
        </div>
        
        <div className="space-y-6">
          <BudgetWidget />
          <SmartInsights 
            categoryTotals={categoryTotals}
            monthlySpending={monthlySpending}
            totalIncome={totalIncome}
          />
        </div>
      </div>

      {showAddExpense && (
        <AddExpenseModal 
          isOpen={showAddExpense}
          onClose={() => setShowAddExpense(false)}
        />
      )}
    </div>
  );
};

export default Dashboard;