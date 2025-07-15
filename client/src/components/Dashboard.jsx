import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

export default function Dashboard() {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [budget, setBudget] = useState({
    monthlyBudget: 0,
    expenses: []
  });
  const [newExpense, setNewExpense] = useState({
    category: '',
    amount: ''
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) {
      navigate('/login');
      return;
    }

    // Lade Userdaten
    const fetchUserData = async () => {
      try {
        const response = await fetch('http://localhost:3000/api/me', {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        });
        
        if (response.ok) {
          const data = await response.json();
          setUser(data);
          fetchBudgetData();
        }
      } catch (error) {
        console.error('Fehler beim Laden der Userdaten:', error);
      }
    };

    fetchUserData();
  }, [navigate]);

  const fetchBudgetData = async () => {
    const token = localStorage.getItem('token');
    try {
      const response = await fetch('http://localhost:3000/api/budget', {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      
      if (response.ok) {
        const data = await response.json();
        setBudget(data);
      }
      setLoading(false);
    } catch (error) {
      console.error('Fehler beim Laden des Budgets:', error);
      setLoading(false);
    }
  };

  const handleBudgetSubmit = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem('token');
    try {
      const response = await fetch('http://localhost:3000/api/budget', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({ monthlyBudget: budget.monthlyBudget })
      });
      
      if (response.ok) {
        const data = await response.json();
        setBudget(prev => ({ ...prev, monthlyBudget: data.monthlyBudget }));
      }
    } catch (error) {
      console.error('Fehler beim Speichern des Budgets:', error);
    }
  };

  const handleExpenseSubmit = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem('token');
    try {
      const response = await fetch('http://localhost:3000/api/expenses', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(newExpense)
      });
      
      if (response.ok) {
        const data = await response.json();
        setBudget(prev => ({ ...prev, expenses: data.expenses }));
        setNewExpense({ category: '', amount: '' });
      }
    } catch (error) {
      console.error('Fehler beim Speichern der Ausgabe:', error);
    }
  };

  const calculateRemainingBudget = () => {
    const totalExpenses = budget.expenses.reduce((sum, expense) => sum + expense.amount, 0);
    return budget.monthlyBudget - totalExpenses;
  };

  if (loading) {
    return <div className="flex justify-center items-center h-screen">Laden...</div>;
  }

  return (
    <div className="min-h-screen bg-gray-50 py-6">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">
            Willkommen {user?.name}
          </h1>
          <p className="mt-1 text-sm text-gray-500">
            Hier ist deine Finanzübersicht
          </p>
        </div>

        {/* Budget Overview */}
        <div className="grid grid-cols-1 gap-6 mb-8 lg:grid-cols-3">
          <div className="bg-white rounded-lg shadow p-6">
            <h2 className="text-lg font-medium text-gray-900 mb-4">Monatsbudget</h2>
            <form onSubmit={handleBudgetSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Budget festlegen
                </label>
                <input
                  type="number"
                  value={budget.monthlyBudget}
                  onChange={(e) => setBudget(prev => ({ ...prev, monthlyBudget: parseFloat(e.target.value) }))}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-green-500 focus:ring-green-500 sm:text-sm"
                />
              </div>
              <button
                type="submit"
                className="w-full bg-green-600 text-white px-4 py-2 rounded-md hover:bg-green-700"
              >
                Budget speichern
              </button>
            </form>
          </div>

          <div className="bg-white rounded-lg shadow p-6">
            <h2 className="text-lg font-medium text-gray-900 mb-4">Neue Ausgabe</h2>
            <form onSubmit={handleExpenseSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Kategorie
                </label>
                <input
                  type="text"
                  value={newExpense.category}
                  onChange={(e) => setNewExpense(prev => ({ ...prev, category: e.target.value }))}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-green-500 focus:ring-green-500 sm:text-sm"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Betrag
                </label>
                <input
                  type="number"
                  value={newExpense.amount}
                  onChange={(e) => setNewExpense(prev => ({ ...prev, amount: parseFloat(e.target.value) }))}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-green-500 focus:ring-green-500 sm:text-sm"
                />
              </div>
              <button
                type="submit"
                className="w-full bg-green-600 text-white px-4 py-2 rounded-md hover:bg-green-700"
              >
                Ausgabe hinzufügen
              </button>
            </form>
          </div>

          <div className="bg-white rounded-lg shadow p-6">
            <h2 className="text-lg font-medium text-gray-900 mb-4">Übersicht</h2>
            <div className="space-y-4">
              <div>
                <p className="text-sm text-gray-500">Gesamt Budget</p>
                <p className="text-2xl font-semibold text-gray-900">
                  {budget.monthlyBudget.toFixed(2)} €
                </p>
              </div>
              <div>
                <p className="text-sm text-gray-500">Ausgaben</p>
                <p className="text-2xl font-semibold text-red-600">
                  {budget.expenses.reduce((sum, exp) => sum + exp.amount, 0).toFixed(2)} €
                </p>
              </div>
              <div>
                <p className="text-sm text-gray-500">Verbleibend</p>
                <p className="text-2xl font-semibold text-green-600">
                  {calculateRemainingBudget().toFixed(2)} €
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Ausgaben Liste */}
        <div className="bg-white rounded-lg shadow">
          <div className="px-4 py-5 sm:px-6">
            <h3 className="text-lg font-medium leading-6 text-gray-900">
              Letzte Ausgaben
            </h3>
          </div>
          <div className="border-t border-gray-200">
            <ul className="divide-y divide-gray-200">
              {budget.expenses.map((expense, index) => (
                <li key={index} className="px-4 py-4 sm:px-6">
                  <div className="flex items-center justify-between">
                    <div className="text-sm font-medium text-gray-900">
                      {expense.category}
                    </div>
                    <div className="text-sm text-gray-500">
                      {expense.amount.toFixed(2)} €
                    </div>
                  </div>
                  <div className="mt-1 text-xs text-gray-500">
                    {new Date(expense.date).toLocaleDateString()}
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}