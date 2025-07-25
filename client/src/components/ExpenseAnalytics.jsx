import React from 'react';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  ArcElement
} from 'chart.js';
import { Line, Doughnut } from 'react-chartjs-2';

// Chart.js Registrierung
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  ArcElement
);

export default function ExpenseAnalytics({ expenses }) {
  // Ausgaben nach Kategorie gruppieren
  const expensesByCategory = expenses.reduce((acc, expense) => {
    acc[expense.category] = (acc[expense.category] || 0) + expense.amount;
    return acc;
  }, {});

  // Ausgaben nach Monat gruppieren
  const expensesByMonth = expenses.reduce((acc, expense) => {
    const date = new Date(expense.date);
    const monthYear = date.toLocaleString('de-DE', { month: 'long', year: 'numeric' });
    acc[monthYear] = (acc[monthYear] || 0) + expense.amount;
    return acc;
  }, {});

  // Daten für den Donut-Chart
  const categoryData = {
    labels: Object.keys(expensesByCategory),
    datasets: [
      {
        data: Object.values(expensesByCategory),
        backgroundColor: [
          '#34D399',
          '#60A5FA',
          '#F472B6',
          '#A78BFA',
          '#FBBF24',
          '#EC4899',
          '#8B5CF6',
          '#F59E0B',
        ],
        borderWidth: 1,
      },
    ],
  };

  // Daten für den Linien-Chart
  const monthlyData = {
    labels: Object.keys(expensesByMonth),
    datasets: [
      {
        label: 'Ausgaben pro Monat',
        data: Object.values(expensesByMonth),
        borderColor: '#10B981',
        tension: 0.4,
        fill: true,
        backgroundColor: 'rgba(16, 185, 129, 0.1)',
      },
    ],
  };

  // Chart Optionen
  const lineOptions = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top',
      },
      title: {
        display: true,
        text: 'Ausgaben Trend',
      },
    },
    scales: {
      y: {
        beginAtZero: true,
        ticks: {
          callback: (value) => `${value}€`,
        },
      },
    },
  };

  const doughnutOptions = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top',
      },
      title: {
        display: true,
        text: 'Ausgaben nach Kategorie',
      },
    },
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      <div className="bg-white p-6 rounded-lg shadow">
        <Line data={monthlyData} options={lineOptions} />
      </div>
      <div className="bg-white p-6 rounded-lg shadow">
        <Doughnut data={categoryData} options={doughnutOptions} />
      </div>
    </div>
  );
}
