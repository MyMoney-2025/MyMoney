import React from 'react';
import { Pie } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';

ChartJS.register(ArcElement, Tooltip, Legend);

export default function ExpenseAnalytics({ expenses }) {
  // Gruppiere Ausgaben nach Kategorie und summiere die Beträge
  const categoryData = expenses.reduce((acc, expense) => {
    if (!acc[expense.category]) {
      acc[expense.category] = {
        amount: 0,
        color: expense.color || '#34D399'
      };
    }
    acc[expense.category].amount += expense.amount;
    return acc;
  }, {});

  const data = {
    labels: Object.keys(categoryData),
    datasets: [{
      data: Object.values(categoryData).map(cat => cat.amount),
      backgroundColor: Object.values(categoryData).map(cat => cat.color),
      borderWidth: 1
    }]
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: 'bottom'
      },
      tooltip: {
        callbacks: {
          label: function(context) {
            const value = context.raw;
            return `${context.label}: ${value.toFixed(2)} €`;
          }
        }
      }
    }
  };

  return (
    <div className="bg-white rounded-lg shadow p-6">
      <h2 className="text-lg font-medium text-gray-900 mb-4">Ausgaben nach Kategorie</h2>
      <div className="h-64">
        <Pie data={data} options={options} />
      </div>
    </div>
  );
}
