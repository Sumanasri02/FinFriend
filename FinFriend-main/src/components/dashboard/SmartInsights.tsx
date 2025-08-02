import React from 'react';
import { Brain, TrendingUp, AlertCircle, Lightbulb } from 'lucide-react';

interface SmartInsightsProps {
  categoryTotals: { [key: string]: number };
  monthlySpending: number;
  totalIncome: number;
}

const SmartInsights: React.FC<SmartInsightsProps> = ({
  categoryTotals,
  monthlySpending,
  totalIncome
}) => {
  const generateInsights = () => {
    const insights = [];
    
    // Find highest spending category
    const highestCategory = Object.entries(categoryTotals).reduce(
      (max, [category, amount]) => amount > max.amount ? { category, amount } : max,
      { category: '', amount: 0 }
    );
    
    if (highestCategory.category) {
      insights.push({
        type: 'spending',
        icon: TrendingUp,
        title: 'Top Spending Category',
        message: `Your highest spending is on ${highestCategory.category} ($${highestCategory.amount.toLocaleString()})`,
        color: 'blue'
      });
    }

    // Savings rate insight
    const savingsRate = totalIncome > 0 ? ((totalIncome - monthlySpending) / totalIncome * 100) : 0;
    if (savingsRate < 20) {
      insights.push({
        type: 'warning',
        icon: AlertCircle,
        title: 'Low Savings Rate',
        message: `You're saving ${savingsRate.toFixed(1)}% of your income. Consider reducing expenses.`,
        color: 'orange'
      });
    } else {
      insights.push({
        type: 'success',
        icon: Lightbulb,
        title: 'Great Savings!',
        message: `You're saving ${savingsRate.toFixed(1)}% of your income. Keep it up!`,
        color: 'green'
      });
    }

    // Spending pattern insight
    const totalExpenses = Object.values(categoryTotals).reduce((sum, amount) => sum + amount, 0);
    if (totalExpenses > 0) {
      const foodPercentage = (categoryTotals['Food'] || 0) / totalExpenses * 100;
      if (foodPercentage > 30) {
        insights.push({
          type: 'tip',
          icon: Lightbulb,
          title: 'Food Spending',
          message: `Food is ${foodPercentage.toFixed(1)}% of your expenses. Try meal planning to reduce costs.`,
          color: 'purple'
        });
      }
    }

    return insights;
  };

  const insights = generateInsights();

  return (
    <div className="glass-card rounded-2xl p-6 animate-slide-up">
      <div className="flex items-center space-x-2 mb-4">
        <Brain className="h-5 w-5 text-purple-600 dark:text-purple-400" />
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
          Smart Insights
        </h3>
      </div>

      <div className="space-y-4">
        {insights.length === 0 ? (
          <div className="text-center py-6 text-gray-500 dark:text-gray-400">
            Add more transactions to get personalized insights
          </div>
        ) : (
          insights.map((insight, index) => {
            const Icon = insight.icon;
            return (
              <div
                key={index}
                className="flex items-start space-x-3 p-3 rounded-lg bg-gray-50 dark:bg-gray-700/50"
              >
                <div className={`p-2 rounded-lg bg-${insight.color}-100 dark:bg-${insight.color}-900`}>
                  <Icon className={`h-4 w-4 text-${insight.color}-600 dark:text-${insight.color}-400`} />
                </div>
                <div className="flex-1">
                  <h4 className="font-medium text-gray-900 dark:text-white text-sm">
                    {insight.title}
                  </h4>
                  <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                    {insight.message}
                  </p>
                </div>
              </div>
            );
          })
        )}
      </div>

      <div className="mt-4 p-3 bg-gradient-to-r from-blue-50 to-purple-50 dark:from-blue-900/20 dark:to-purple-900/20 rounded-lg">
        <p className="text-xs text-gray-600 dark:text-gray-400 text-center">
          AI-powered insights based on your spending patterns
        </p>
      </div>
    </div>
  );
};

export default SmartInsights;