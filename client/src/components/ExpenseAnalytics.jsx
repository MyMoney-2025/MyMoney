import React from 'react';
import { Bar } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
} from 'chart.js';

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

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

  // Sortiere die Kategorien nach Ausgabenhöhe (absteigend)
  const sortedCategories = Object.entries(categoryData)
    .sort(([, a], [, b]) => b.amount - a.amount);

  const data = {
    labels: sortedCategories.map(([category]) => category),
    datasets: [{
      data: sortedCategories.map(([, data]) => data.amount),
      backgroundColor: sortedCategories.map(([, data]) => data.color),
      borderWidth: 1,
      borderColor: sortedCategories.map(([, data]) => data.color)
    }]
  };

  const options = {
    indexAxis: 'y', // Macht das Balkendiagramm horizontal
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: false // Versteckt die Legende, da die Kategorien bereits als Labels erscheinen
      },
      tooltip: {
        callbacks: {
          label: function(context) {
            const value = context.raw;
            return `${value.toFixed(2)} €`;
          }
        }
      }
    },
    scales: {
      x: {
        ticks: {
          callback: function(value) {
            return value.toFixed(2) + ' €';
          }
        }
      },
      y: {
        beginAtZero: true
      }
    }
  };

  return (
    <div className="bg-white rounded-lg shadow p-6">
      <h2 className="text-lg font-medium text-gray-900 mb-4">Ausgaben nach Kategorie</h2>
      <div className="h-[600px]">
        <Bar data={data} options={options} />
      </div>
    </div>
  );
}
