import React, { useState } from 'react';

const INTERVALS = [
  { value: 'weekly', label: 'Wöchentlich' },
  { value: 'monthly', label: 'Monatlich' },
  { value: 'quarterly', label: 'Vierteljährlich' },
  { value: 'yearly', label: 'Jährlich' }
];

export default function RecurringExpenses() {
  const [expenses, setExpenses] = useState([]);
  const [newExpense, setNewExpense] = useState({
    name: '',
    amount: '',
    category: '',
    interval: 'monthly',
    nextDue: '',
    description: ''
  });

  const handleAddExpense = (e) => {
    e.preventDefault();
    setExpenses([...expenses, { ...newExpense, id: Date.now() }]);
    setNewExpense({
      name: '',
      amount: '',
      category: '',
      interval: 'monthly',
      nextDue: '',
      description: ''
    });
  };

  const handleDeleteExpense = (id) => {
    if (window.confirm('Möchten Sie diese wiederkehrende Ausgabe wirklich löschen?')) {
      setExpenses(expenses.filter(expense => expense.id !== id));
    }
  };

  const calculateNextDueDate = (expense) => {
    const date = new Date(expense.nextDue);
    switch (expense.interval) {
      case 'weekly':
        date.setDate(date.getDate() + 7);
        break;
      case 'monthly':
        date.setMonth(date.getMonth() + 1);
        break;
      case 'quarterly':
        date.setMonth(date.getMonth() + 3);
        break;
      case 'yearly':
        date.setFullYear(date.getFullYear() + 1);
        break;
      default:
        break;
    }
    return date.toISOString().split('T')[0];
  };

  const markAsPaid = (id) => {
    setExpenses(expenses.map(expense =>
      expense.id === id
        ? { ...expense, nextDue: calculateNextDueDate(expense) }
        : expense
    ));
  };

  return (
    <div className="bg-white rounded-lg shadow p-6">
      <h2 className="text-lg font-medium text-gray-900 mb-4">Wiederkehrende Ausgaben</h2>

      {/* Neue wiederkehrende Ausgabe Form */}
      <form onSubmit={handleAddExpense} className="mb-6 space-y-4">
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">Name</label>
            <input
              type="text"
              value={newExpense.name}
              onChange={(e) => setNewExpense({ ...newExpense, name: e.target.value })}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-green-500 focus:ring-green-500 sm:text-sm"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Betrag (€)</label>
            <input
              type="number"
              value={newExpense.amount}
              onChange={(e) => setNewExpense({ ...newExpense, amount: e.target.value })}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-green-500 focus:ring-green-500 sm:text-sm"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Kategorie</label>
            <input
              type="text"
              value={newExpense.category}
              onChange={(e) => setNewExpense({ ...newExpense, category: e.target.value })}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-green-500 focus:ring-green-500 sm:text-sm"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Intervall</label>
            <select
              value={newExpense.interval}
              onChange={(e) => setNewExpense({ ...newExpense, interval: e.target.value })}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-green-500 focus:ring-green-500 sm:text-sm"
            >
              {INTERVALS.map(interval => (
                <option key={interval.value} value={interval.value}>
                  {interval.label}
                </option>
              ))}
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Nächste Fälligkeit</label>
            <input
              type="date"
              value={newExpense.nextDue}
              onChange={(e) => setNewExpense({ ...newExpense, nextDue: e.target.value })}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-green-500 focus:ring-green-500 sm:text-sm"
              required
            />
          </div>
          <div className="col-span-2">
            <label className="block text-sm font-medium text-gray-700">Beschreibung</label>
            <textarea
              value={newExpense.description}
              onChange={(e) => setNewExpense({ ...newExpense, description: e.target.value })}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-green-500 focus:ring-green-500 sm:text-sm"
              rows="2"
            />
          </div>
        </div>
        <button
          type="submit"
          className="w-full bg-green-600 text-white px-4 py-2 rounded-md hover:bg-green-700"
        >
          Wiederkehrende Ausgabe hinzufügen
        </button>
      </form>

      {/* Liste der wiederkehrenden Ausgaben */}
      <div className="space-y-4">
        {expenses.map(expense => (
          <div key={expense.id} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
            <div className="flex-1">
              <div className="flex items-center justify-between mb-2">
                <h3 className="text-lg font-medium text-gray-900">{expense.name}</h3>
                <span className="text-lg font-medium text-gray-900">{expense.amount}€</span>
              </div>
              <div className="flex items-center text-sm text-gray-500 space-x-4">
                <span>{expense.category}</span>
                <span>•</span>
                <span>{INTERVALS.find(i => i.value === expense.interval)?.label}</span>
                <span>•</span>
                <span>Nächste Fälligkeit: {new Date(expense.nextDue).toLocaleDateString()}</span>
              </div>
              {expense.description && (
                <p className="mt-1 text-sm text-gray-500">{expense.description}</p>
              )}
            </div>
            <div className="ml-4 flex items-center space-x-2">
              <button
                onClick={() => markAsPaid(expense.id)}
                className="px-3 py-1 bg-green-100 text-green-800 rounded-md hover:bg-green-200"
              >
                Bezahlt
              </button>
              <button
                onClick={() => handleDeleteExpense(expense.id)}
                className="text-gray-400 hover:text-red-600"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z" clipRule="evenodd" />
                </svg>
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
