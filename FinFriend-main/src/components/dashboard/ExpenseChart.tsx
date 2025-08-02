import React from 'react';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement,
} from 'chart.js';
import { Doughnut } from 'react-chartjs-2';

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement
);

interface ExpenseChartProps {
  categoryTotals: { [key: string]: number };
}

const ExpenseChart: React.FC<ExpenseChartProps> = ({ categoryTotals }) => {
  const categories = Object.keys(categoryTotals);
  const amounts = Object.values(categoryTotals);

  const colors = [
    'rgba(59, 130, 246, 0.8)',
    'rgba(139, 92, 246, 0.8)',
    'rgba(16, 185, 129, 0.8)',
    'rgba(249, 115, 22, 0.8)',
    'rgba(236, 72, 153, 0.8)',
    'rgba(14, 165, 233, 0.8)',
    'rgba(168, 85, 247, 0.8)',
    'rgba(34, 197, 94, 0.8)',
  ];

  const data = {
    labels: categories,
    datasets: [
      {
        data: amounts,
        backgroundColor: colors.slice(0, categories.length),
        borderColor: colors.slice(0, categories.length).map(color => color.replace('0.8', '1')),
        borderWidth: 2,
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'bottom' as const,
        labels: {
          padding: 20,
          usePointStyle: true,
        },
      },
      tooltip: {
        callbacks: {
          label: function(context: any) {
            const total = amounts.reduce((sum, amount) => sum + amount, 0);
            const percentage = ((context.raw / total) * 100).toFixed(1);
            return `${context.label}: $${context.raw.toLocaleString()} (${percentage}%)`;
          },
        },
      },
    },
  };

  if (categories.length === 0) {
    return (
      <div className="glass-card rounded-2xl p-6">
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
          Expense Breakdown
        </h3>
        <div className="flex items-center justify-center h-64 text-gray-500 dark:text-gray-400">
          No expense data available
        </div>
      </div>
    );
  }

  return (
    <div className="glass-card rounded-2xl p-6 animate-slide-up">
      <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
        Expense Breakdown
      </h3>
      <div className="h-64">
        <Doughnut data={data} options={options} />
      </div>
    </div>
  );
};

export default ExpenseChart;