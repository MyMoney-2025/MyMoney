import React, { useState } from 'react';

export default function SavingsGoals() {
  const [goals, setGoals] = useState([]);
  const [newGoal, setNewGoal] = useState({
    title: '',
    targetAmount: 0,
    currentAmount: 0,
    targetDate: '',
    color: '#10B981'
  });

  const handleAddGoal = (e) => {
    e.preventDefault();
    setGoals([...goals, { ...newGoal, id: Date.now() }]);
    setNewGoal({ title: '', targetAmount: 0, currentAmount: 0, targetDate: '', color: '#10B981' });
  };

  const handleUpdateProgress = (id, amount) => {
    setGoals(goals.map(goal =>
      goal.id === id
        ? { ...goal, currentAmount: Math.min(goal.currentAmount + parseFloat(amount), goal.targetAmount) }
        : goal
    ));
  };

  const calculateProgress = (current, target) => {
    return (current / target) * 100;
  };

  return (
    <div className="bg-white rounded-lg shadow p-6">
      <h2 className="text-lg font-medium text-gray-900 mb-4">Sparziele</h2>

      {/* Neues Sparziel Form */}
      <form onSubmit={handleAddGoal} className="mb-6 space-y-4">
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">Ziel Name</label>
            <input
              type="text"
              value={newGoal.title}
              onChange={(e) => setNewGoal(prev => ({ ...prev, title: e.target.value }))}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-green-500 focus:ring-green-500 sm:text-sm text-gray-900 font-medium"
              placeholder="z.B. Neues Auto"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Zielbetrag (€)</label>
            <input
              type="number"
              value={newGoal.targetAmount}
              onChange={(e) => setNewGoal(prev => ({ ...prev, targetAmount: parseFloat(e.target.value) || 0 }))}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-green-500 focus:ring-green-500 sm:text-sm text-gray-900 font-medium"
              min="0"
              step="0.01"
              placeholder="0.00"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Aktueller Stand (€)</label>
            <input
              type="number"
              value={newGoal.currentAmount}
              onChange={(e) => setNewGoal(prev => ({ ...prev, currentAmount: parseFloat(e.target.value) }))}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-green-500 focus:ring-green-500 sm:text-sm text-gray-900 font-medium"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Zieldatum</label>
            <input
              type="date"
              value={newGoal.targetDate}
              onChange={(e) => setNewGoal(prev => ({ ...prev, targetDate: e.target.value }))}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-green-500 focus:ring-green-500 sm:text-sm text-gray-900 font-medium"
              required
            />
          </div>
        </div>
        <button
          type="submit"
          className="w-full bg-green-600 text-white px-4 py-2 rounded-md hover:bg-green-700"
        >
          Sparziel hinzufügen
        </button>
      </form>

      {/* Sparziele Liste */}
      <div className="space-y-6">
        {goals.map(goal => (
          <div key={goal.id} className="bg-gray-50 rounded-lg p-4">
            <div className="flex justify-between items-start mb-2">
              <div>
                <h3 className="font-medium text-gray-900">{goal.title}</h3>
                <p className="text-sm text-gray-500">
                  Ziel: {goal.targetDate}
                </p>
              </div>
              <div className="text-right">
                <p className="font-medium text-gray-900">
                  {goal.currentAmount}€ / {goal.targetAmount}€
                </p>
                <p className="text-sm text-gray-500">
                  {calculateProgress(goal.currentAmount, goal.targetAmount).toFixed(1)}%
                </p>
              </div>
            </div>

            {/* Fortschrittsbalken */}
            <div className="w-full bg-gray-200 rounded-full h-2.5 mb-4">
              <div
                className="bg-green-600 h-2.5 rounded-full"
                style={{ width: `${calculateProgress(goal.currentAmount, goal.targetAmount)}%` }}
              ></div>
            </div>

            {/* Schnell-Einzahlung */}
            <div className="flex space-x-2">
              {[10, 20, 50, 100].map(amount => (
                <button
                  key={amount}
                  onClick={() => handleUpdateProgress(goal.id, amount)}
                  className="flex-1 px-2 py-1 text-sm bg-green-100 text-green-800 rounded-md hover:bg-green-200"
                >
                  +{amount}€
                </button>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
