import React, { useState } from 'react';

const defaultCategories = [
  { id: 1, name: 'Lebensmittel', icon: '🛒', color: '#34D399', limit: 500 },
  { id: 2, name: 'Transport', icon: '🚗', color: '#60A5FA', limit: 200 },
  { id: 3, name: 'Wohnen', icon: '🏠', color: '#F472B6', limit: 1000 },
  { id: 4, name: 'Entertainment', icon: '🎮', color: '#A78BFA', limit: 100 },
  { id: 5, name: 'Shopping', icon: '🛍️', color: '#FBBF24', limit: 300 }
];

export default function CategoryManager() {
  const [categories, setCategories] = useState(defaultCategories);
  const [newCategory, setNewCategory] = useState({ name: '', icon: '', color: '#000000', limit: 0 });
  const [editingId, setEditingId] = useState(null);

  const handleAddCategory = (e) => {
    e.preventDefault();
    setCategories([...categories, { ...newCategory, id: Date.now() }]);
    setNewCategory({ name: '', icon: '', color: '#000000', limit: 0 });
  };

  const handleUpdateCategory = (id, updatedCategory) => {
    setCategories(categories.map(cat => 
      cat.id === id ? { ...cat, ...updatedCategory } : cat
    ));
    setEditingId(null);
  };

  const handleDeleteCategory = (id) => {
    if (window.confirm('Möchten Sie diese Kategorie wirklich löschen?')) {
      setCategories(categories.filter(cat => cat.id !== id));
    }
  };

  return (
    <div className="bg-white rounded-lg shadow p-6">
      <h2 className="text-lg font-medium text-gray-900 mb-4">Kategorien verwalten</h2>
      
      {/* Neue Kategorie Form */}
      <form onSubmit={handleAddCategory} className="mb-6 space-y-4">
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">Name</label>
            <input
              type="text"
              value={newCategory.name}
              onChange={(e) => setNewCategory({...newCategory, name: e.target.value})}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-green-500 focus:ring-green-500 sm:text-sm"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Icon</label>
            <input
              type="text"
              value={newCategory.icon}
              onChange={(e) => setNewCategory({...newCategory, icon: e.target.value})}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-green-500 focus:ring-green-500 sm:text-sm"
              placeholder="🛒"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Farbe</label>
            <input
              type="color"
              value={newCategory.color}
              onChange={(e) => setNewCategory({...newCategory, color: e.target.value})}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-green-500 focus:ring-green-500 sm:text-sm h-10"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Limit (€)</label>
            <input
              type="number"
              value={newCategory.limit}
              onChange={(e) => setNewCategory({...newCategory, limit: parseFloat(e.target.value)})}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-green-500 focus:ring-green-500 sm:text-sm"
            />
          </div>
        </div>
        <button
          type="submit"
          className="w-full bg-green-600 text-white px-4 py-2 rounded-md hover:bg-green-700"
        >
          Kategorie hinzufügen
        </button>
      </form>

      {/* Kategorien Liste */}
      <div className="space-y-4">
        {categories.map(category => (
          <div
            key={category.id}
            className="flex items-center justify-between p-4 rounded-lg"
            style={{ backgroundColor: category.color + '20' }}
          >
            {editingId === category.id ? (
              <div className="flex-1 grid grid-cols-4 gap-2">
                <input
                  type="text"
                  value={category.name}
                  onChange={(e) => handleUpdateCategory(category.id, { ...category, name: e.target.value })}
                  className="rounded-md border-gray-300 shadow-sm focus:border-green-500 focus:ring-green-500 sm:text-sm"
                />
                <input
                  type="text"
                  value={category.icon}
                  onChange={(e) => handleUpdateCategory(category.id, { ...category, icon: e.target.value })}
                  className="rounded-md border-gray-300 shadow-sm focus:border-green-500 focus:ring-green-500 sm:text-sm"
                />
                <input
                  type="color"
                  value={category.color}
                  onChange={(e) => handleUpdateCategory(category.id, { ...category, color: e.target.value })}
                  className="rounded-md border-gray-300 shadow-sm focus:border-green-500 focus:ring-green-500 sm:text-sm"
                />
                <input
                  type="number"
                  value={category.limit}
                  onChange={(e) => handleUpdateCategory(category.id, { ...category, limit: parseFloat(e.target.value) })}
                  className="rounded-md border-gray-300 shadow-sm focus:border-green-500 focus:ring-green-500 sm:text-sm"
                />
              </div>
            ) : (
              <>
                <div className="flex items-center space-x-3">
                  <span className="text-2xl">{category.icon}</span>
                  <span className="font-medium" style={{ color: category.color }}>
                    {category.name}
                  </span>
                  <span className="text-sm text-gray-500">
                    Limit: {category.limit}€
                  </span>
                </div>
                <div className="flex items-center space-x-2">
                  <button
                    onClick={() => setEditingId(category.id)}
                    className="text-gray-400 hover:text-green-600"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                      <path d="M13.586 3.586a2 2 0 112.828 2.828l-.793.793-2.828-2.828.793-.793zM11.379 5.793L3 14.172V17h2.828l8.38-8.379-2.83-2.828z" />
                    </svg>
                  </button>
                  <button
                    onClick={() => handleDeleteCategory(category.id)}
                    className="text-gray-400 hover:text-red-600"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z" clipRule="evenodd" />
                    </svg>
                  </button>
                </div>
              </>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
