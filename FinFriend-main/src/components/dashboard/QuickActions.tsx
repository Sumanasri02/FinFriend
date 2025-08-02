import React from 'react';
import { Plus, Upload, Download, PieChart } from 'lucide-react';

interface QuickActionsProps {
  onAddExpense: () => void;
}

const QuickActions: React.FC<QuickActionsProps> = ({ onAddExpense }) => {
  const actions = [
    {
      name: 'Add Expense',
      icon: Plus,
      onClick: onAddExpense,
      color: 'bg-blue-600 hover:bg-blue-700',
    },
    {
      name: 'Import',
      icon: Upload,
      onClick: () => console.log('Import'),
      color: 'bg-green-600 hover:bg-green-700',
    },
    {
      name: 'Export',
      icon: Download,
      onClick: () => console.log('Export'),
      color: 'bg-purple-600 hover:bg-purple-700',
    },
    {
      name: 'Reports',
      icon: PieChart,
      onClick: () => console.log('Reports'),
      color: 'bg-orange-600 hover:bg-orange-700',
    },
  ];

  return (
    <div className="flex flex-wrap gap-2">
      {actions.map((action) => {
        const Icon = action.icon;
        return (
          <button
            key={action.name}
            onClick={action.onClick}
            className={`${action.color} text-white px-4 py-2 rounded-lg font-medium text-sm flex items-center space-x-2 transition-all duration-200 hover:scale-105 shadow-lg`}
          >
            <Icon className="h-4 w-4" />
            <span>{action.name}</span>
          </button>
        );
      })}
    </div>
  );
};

export default QuickActions;