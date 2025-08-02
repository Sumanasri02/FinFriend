// import React, { createContext, useContext, useState, ReactNode } from 'react';
// import { format, startOfMonth, endOfMonth, isWithinInterval } from 'date-fns';

// export interface Expense {
//   id: string;
//   amount: number;
//   category: string;
//   date: string;
//   description: string;
//   type: 'expense' | 'income';
// }

// export interface Budget {
//   id: string;
//   category: string;
//   amount: number;
//   spent: number;
//   period: 'monthly' | 'weekly';
// }

// export interface Goal {
//   id: string;
//   name: string;
//   targetAmount: number;
//   currentAmount: number;
//   deadline: string;
//   category: string;
// }

// interface ExpenseContextType {
//   expenses: Expense[];
//   budgets: Budget[];
//   goals: Goal[];
//   addExpense: (expense: Omit<Expense, 'id'>) => void;
//   updateExpense: (id: string, expense: Partial<Expense>) => void;
//   deleteExpense: (id: string) => void;
//   addBudget: (budget: Omit<Budget, 'id' | 'spent'>) => void;
//   updateBudget: (id: string, budget: Partial<Budget>) => void;
//   addGoal: (goal: Omit<Goal, 'id'>) => void;
//   updateGoal: (id: string, goal: Partial<Goal>) => void;
//   getFilteredExpenses: (category?: string, startDate?: string, endDate?: string) => Expense[];
//   getTotalSpending: (period?: 'week' | 'month' | 'year') => number;
//   getCategoryTotals: () => { [key: string]: number };
// }

// const ExpenseContext = createContext<ExpenseContextType | undefined>(undefined);

// export const useExpenses = () => {
//   const context = useContext(ExpenseContext);
//   if (context === undefined) {
//     throw new Error('useExpenses must be used within an ExpenseProvider');
//   }
//   return context;
// };

// interface ExpenseProviderProps {
//   children: ReactNode;
// }

// // Mock data
// const mockExpenses: Expense[] = [
//   { id: '1', amount: 85.50, category: 'Food', date: '2025-01-15', description: 'Grocery shopping', type: 'expense' },
//   { id: '2', amount: 12.99, category: 'Entertainment', date: '2025-01-14', description: 'Netflix subscription', type: 'expense' },
//   { id: '3', amount: 45.00, category: 'Transport', date: '2025-01-13', description: 'Gas fill-up', type: 'expense' },
//   { id: '4', amount: 120.00, category: 'Shopping', date: '2025-01-12', description: 'New headphones', type: 'expense' },
//   { id: '5', amount: 2500.00, category: 'Income', date: '2025-01-01', description: 'Salary', type: 'income' },
//   { id: '6', amount: 32.50, category: 'Food', date: '2025-01-11', description: 'Lunch with friends', type: 'expense' },
//   { id: '7', amount: 75.00, category: 'Health', date: '2025-01-10', description: 'Gym membership', type: 'expense' },
//   { id: '8', amount: 200.00, category: 'Utilities', date: '2025-01-09', description: 'Monthly bills', type: 'expense' },
// ];

// const mockBudgets: Budget[] = [
//   { id: '1', category: 'Food', amount: 400, spent: 118, period: 'monthly' },
//   { id: '2', category: 'Entertainment', amount: 100, spent: 12.99, period: 'monthly' },
//   { id: '3', category: 'Transport', amount: 200, spent: 45, period: 'monthly' },
//   { id: '4', category: 'Shopping', amount: 300, spent: 120, period: 'monthly' },
// ];

// const mockGoals: Goal[] = [
//   { id: '1', name: 'Emergency Fund', targetAmount: 5000, currentAmount: 1250, deadline: '2025-12-31', category: 'Savings' },
//   { id: '2', name: 'Vacation Fund', targetAmount: 2000, currentAmount: 800, deadline: '2025-08-15', category: 'Travel' },
//   { id: '3', name: 'New Laptop', targetAmount: 1500, currentAmount: 450, deadline: '2025-06-30', category: 'Technology' },
// ];

// export const ExpenseProvider: React.FC<ExpenseProviderProps> = ({ children }) => {
//   const [expenses, setExpenses] = useState<Expense[]>(mockExpenses);
//   const [budgets, setBudgets] = useState<Budget[]>(mockBudgets);
//   const [goals, setGoals] = useState<Goal[]>(mockGoals);

//   const addExpense = (expense: Omit<Expense, 'id'>) => {
//     const newExpense: Expense = {
//       ...expense,
//       id: Date.now().toString()
//     };
//     setExpenses(prev => [newExpense, ...prev]);
    
//     // Update budget spent amount
//     if (expense.type === 'expense') {
//       setBudgets(prev => prev.map(budget => 
//         budget.category === expense.category 
//           ? { ...budget, spent: budget.spent + expense.amount }
//           : budget
//       ));
//     }
//   };

//   const updateExpense = (id: string, updatedExpense: Partial<Expense>) => {
//     setExpenses(prev => prev.map(expense => 
//       expense.id === id ? { ...expense, ...updatedExpense } : expense
//     ));
//   };

//   const deleteExpense = (id: string) => {
//     setExpenses(prev => prev.filter(expense => expense.id !== id));
//   };

//   const addBudget = (budget: Omit<Budget, 'id' | 'spent'>) => {
//     const newBudget: Budget = {
//       ...budget,
//       id: Date.now().toString(),
//       spent: 0
//     };
//     setBudgets(prev => [...prev, newBudget]);
//   };

//   const updateBudget = (id: string, updatedBudget: Partial<Budget>) => {
//     setBudgets(prev => prev.map(budget => 
//       budget.id === id ? { ...budget, ...updatedBudget } : budget
//     ));
//   };

//   const addGoal = (goal: Omit<Goal, 'id'>) => {
//     const newGoal: Goal = {
//       ...goal,
//       id: Date.now().toString()
//     };
//     setGoals(prev => [...prev, newGoal]);
//   };

//   const updateGoal = (id: string, updatedGoal: Partial<Goal>) => {
//     setGoals(prev => prev.map(goal => 
//       goal.id === id ? { ...goal, ...updatedGoal } : goal
//     ));
//   };

//   const getFilteredExpenses = (category?: string, startDate?: string, endDate?: string) => {
//     return expenses.filter(expense => {
//       const matchesCategory = !category || expense.category === category;
//       const expenseDate = new Date(expense.date);
//       const matchesDateRange = (!startDate || expenseDate >= new Date(startDate)) &&
//                               (!endDate || expenseDate <= new Date(endDate));
//       return matchesCategory && matchesDateRange;
//     });
//   };

//   const getTotalSpending = (period?: 'week' | 'month' | 'year') => {
//     const now = new Date();
//     let filteredExpenses = expenses.filter(e => e.type === 'expense');

//     if (period === 'month') {
//       const start = startOfMonth(now);
//       const end = endOfMonth(now);
//       filteredExpenses = filteredExpenses.filter(expense => 
//         isWithinInterval(new Date(expense.date), { start, end })
//       );
//     }

//     return filteredExpenses.reduce((total, expense) => total + expense.amount, 0);
//   };

//   const getCategoryTotals = () => {
//     return expenses.reduce((acc, expense) => {
//       if (expense.type === 'expense') {
//         acc[expense.category] = (acc[expense.category] || 0) + expense.amount;
//       }
//       return acc;
//     }, {} as { [key: string]: number });
//   };

//   return (
//     <ExpenseContext.Provider value={{
//       expenses,
//       budgets,
//       goals,
//       addExpense,
//       updateExpense,
//       deleteExpense,
//       addBudget,
//       updateBudget,
//       addGoal,
//       updateGoal,
//       getFilteredExpenses,
//       getTotalSpending,
//       getCategoryTotals
//     }}>
//       {children}
//     </ExpenseContext.Provider>
//   );
// };

// src/context/ThemeContext.tsx
import React, { createContext, useContext, useState, ReactNode } from 'react';

type Theme = 'light' | 'dark';

interface ThemeContextType {
  theme: Theme;
  toggleTheme: () => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export const ThemeProvider = ({ children }: { children: ReactNode }) => {
  const [theme, setTheme] = useState<Theme>('light');

  const toggleTheme = () => {
    setTheme((prev) => (prev === 'light' ? 'dark' : 'light'));
  };

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = (): ThemeContextType => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
};
