import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
// CategoryManager Import entfernen
import ExpenseAnalytics from './ExpenseAnalytics';
import SavingsGoals from './SavingsGoals';
import RecurringExpenses from './RecurringExpenses';

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
  const [editingExpense, setEditingExpense] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let isMounted = true;
    const token = localStorage.getItem('token');
    
    if (!token) {
      navigate('/login');
      return;
    }

    const fetchData = async () => {
      try {
        const userResponse = await fetch('http://localhost:3001/api/me', {
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
          }
        });

        if (!userResponse.ok) {
          throw new Error('Unauthorized');
        }

        if (isMounted) {
          const userData = await userResponse.json();
          setUser(userData);

          const budgetResponse = await fetch('http://localhost:3001/api/budget', {
            headers: {
              'Authorization': `Bearer ${token}`,
              'Content-Type': 'application/json'
            }
          });

          if (budgetResponse.ok && isMounted) {
            const budgetData = await budgetResponse.json();
            setBudget({
              monthlyBudget: budgetData.monthlyBudget || 0,
              expenses: budgetData.expenses || []
            });
          }
        }
      } catch (error) {
        console.error('Error fetching data:', error);
        if (error.message === 'Unauthorized') {
          localStorage.removeItem('token');
          navigate('/login');
        }
      } finally {
        if (isMounted) {
          setLoading(false);
        }
      }
    };

    fetchData();

    return () => {
      isMounted = false;
    };
  }, [navigate]);

  const handleBudgetSubmit = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem('token');
    try {
      const response = await fetch('http://localhost:3001/api/budget', {
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
      const response = await fetch('http://localhost:3001/api/expenses', {
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

  const handleUpdateExpense = async (e, expenseId) => {
    e.preventDefault();
    const token = localStorage.getItem('token');
    try {
      const response = await fetch(`http://localhost:3001/api/expenses/${expenseId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(newExpense)
      });
      
      if (response.ok) {
        const data = await response.json();
        setBudget(prev => ({ ...prev, expenses: prev.expenses.map(exp => 
          exp._id === expenseId ? { ...exp, ...newExpense } : exp
        )}));
        setEditingExpense(null);
        setNewExpense({ category: '', amount: '' });
      }
    } catch (error) {
      console.error('Fehler beim Aktualisieren der Ausgabe:', error);
    }
  };

  const handleDeleteExpense = async (expenseId) => {
    if (!window.confirm('Möchten Sie diese Ausgabe wirklich löschen?')) {
      return;
    }

    const token = localStorage.getItem('token');
    try {
      const response = await fetch(`http://localhost:3001/api/expenses/${expenseId}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      
      if (response.ok) {
        setBudget(prev => ({
          ...prev,
          expenses: prev.expenses.filter(exp => exp._id !== expenseId)
        }));
      }
    } catch (error) {
      console.error('Fehler beim Löschen der Ausgabe:', error);
    }
  };

  const calculateRemainingBudget = () => {
    const totalExpenses = budget.expenses.reduce((sum, expense) => sum + (expense?.amount || 0), 0);
    return (budget?.monthlyBudget || 0) - totalExpenses;
  };

  // Sicheres Rendern von Beträgen
  const formatAmount = (amount) => {
    return (Number(amount) || 0).toFixed(2);
  };

  // Loading Screen
  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-500"></div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
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
                {formatAmount(budget.monthlyBudget)} €
              </p>
            </div>
            <div>
              <p className="text-sm text-gray-500">Ausgaben</p>
              <p className="text-2xl font-semibold text-red-600">
                {formatAmount(budget.expenses.reduce((sum, exp) => sum + (exp?.amount || 0), 0))} €
              </p>
            </div>
            <div>
              <p className="text-sm text-gray-500">Verbleibend</p>
              <p className="text-2xl font-semibold text-green-600">
                {formatAmount(calculateRemainingBudget())} €
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Analytics */}
      <div className="mb-8">
        <ExpenseAnalytics expenses={budget.expenses} />
      </div>

      {/* Sparziele */}
      <div className="mb-8">
        <SavingsGoals />
      </div>

      {/* Wiederkehrende Ausgaben */}
      <div className="mb-8">
        <RecurringExpenses />
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
                {editingExpense === expense._id ? (
                  <form onSubmit={(e) => handleUpdateExpense(e, expense._id)} className="space-y-2">
                    <div className="flex items-center space-x-2">
                      <input
                        type="text"
                        value={newExpense.category}
                        onChange={(e) => setNewExpense(prev => ({ ...prev, category: e.target.value }))}
                        className="flex-1 rounded-md border-gray-300 shadow-sm focus:border-green-500 focus:ring-green-500 sm:text-sm"
                        placeholder="Kategorie"
                      />
                      <input
                        type="number"
                        value={newExpense.amount}
                        onChange={(e) => setNewExpense(prev => ({ ...prev, amount: parseFloat(e.target.value) }))}
                        className="w-24 rounded-md border-gray-300 shadow-sm focus:border-green-500 focus:ring-green-500 sm:text-sm"
                        placeholder="Betrag"
                      />
                    </div>
                    <div className="flex justify-end space-x-2">
                      <button
                        type="submit"
                        className="px-3 py-1 bg-green-600 text-white text-sm rounded-md hover:bg-green-700"
                      >
                        Speichern
                      </button>
                      <button
                        type="button"
                        onClick={() => {
                          setEditingExpense(null);
                          setNewExpense({ category: '', amount: '' });
                        }}
                        className="px-3 py-1 bg-gray-200 text-gray-700 text-sm rounded-md hover:bg-gray-300"
                      >
                        Abbrechen
                      </button>
                    </div>
                  </form>
                ) : (
                  <div>
                    <div className="flex items-center justify-between">
                      <div className="text-sm font-medium text-gray-900">
                        {expense.category}
                      </div>
                      <div className="flex items-center space-x-4">
                        <div className="text-sm text-gray-500">
                          {formatAmount(expense?.amount)} €
                        </div>
                        <div className="flex items-center space-x-2">
                          <button
                            onClick={() => {
                              setEditingExpense(expense._id);
                              setNewExpense({
                                category: expense.category,
                                amount: expense.amount
                              });
                            }}
                            className="text-gray-400 hover:text-green-600"
                          >
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
                            </svg>
                          </button>
                          <button
                            onClick={() => handleDeleteExpense(expense._id)}
                            className="text-gray-400 hover:text-red-600"
                          >
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                            </svg>
                          </button>
                        </div>
                      </div>
                    </div>
                    <div className="mt-1 text-xs text-gray-500">
                      {new Date(expense.date).toLocaleDateString()}
                    </div>
                  </div>
                )}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}