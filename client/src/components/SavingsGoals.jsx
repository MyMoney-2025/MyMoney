import React, { useState } from 'react';

export default function SavingsGoals() {
  const [goals, setGoals] = useState([]);
  const [newGoal, setNewGoal] = useState({
    name: '',
    target: 0,
    current: 0,
    deadline: '',
    color: '#10B981'
  });

  const handleAddGoal = (e) => {
    e.preventDefault();
    setGoals([...goals, { ...newGoal, id: Date.now() }]);
    setNewGoal({ name: '', target: 0, current: 0, deadline: '', color: '#10B981' });
  };

  const handleUpdateProgress = (id, amount) => {
    setGoals(goals.map(goal =>
      goal.id === id
        ? { ...goal, current: Math.min(goal.current + parseFloat(amount), goal.target) }
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
              value={newGoal.name}
              onChange={(e) => setNewGoal({ ...newGoal, name: e.target.value })}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-green-500 focus:ring-green-500 sm:text-sm"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Zielbetrag (€)</label>
            <input
              type="number"
              value={newGoal.target}
              onChange={(e) => setNewGoal({ ...newGoal, target: parseFloat(e.target.value) })}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-green-500 focus:ring-green-500 sm:text-sm"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Aktueller Stand (€)</label>
            <input
              type="number"
              value={newGoal.current}
              onChange={(e) => setNewGoal({ ...newGoal, current: parseFloat(e.target.value) })}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-green-500 focus:ring-green-500 sm:text-sm"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Zieldatum</label>
            <input
              type="date"
              value={newGoal.deadline}
              onChange={(e) => setNewGoal({ ...newGoal, deadline: e.target.value })}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-green-500 focus:ring-green-500 sm:text-sm"
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
                <h3 className="font-medium text-gray-900">{goal.name}</h3>
                <p className="text-sm text-gray-500">
                  Ziel: {goal.deadline}
                </p>
              </div>
              <div className="text-right">
                <p className="font-medium text-gray-900">
                  {goal.current}€ / {goal.target}€
                </p>
                <p className="text-sm text-gray-500">
                  {calculateProgress(goal.current, goal.target).toFixed(1)}%
                </p>
              </div>
            </div>

            {/* Fortschrittsbalken */}
            <div className="w-full bg-gray-200 rounded-full h-2.5 mb-4">
              <div
                className="bg-green-600 h-2.5 rounded-full"
                style={{ width: `${calculateProgress(goal.current, goal.target)}%` }}
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
