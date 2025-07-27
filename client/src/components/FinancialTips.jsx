import React, { useState } from 'react';

const tips = [
  {
    id: 1,
    category: 'Sparen im Alltag',
    title: '50/30/20 Regel',
    description: '50% für Notwendiges, 30% für Wünsche, 20% zum Sparen.',
    icon: '💰'
  },
  {
    id: 2,
    category: 'Budgetierung',
    title: 'Notgroschen aufbauen',
    description: 'Spare 3-6 Monatsgehälter für Notfälle.',
    icon: '🏦'
  },
  {
    id: 3,
    category: 'Clever Einkaufen',
    title: 'Einkaufsliste nutzen',
    description: 'Plane deine Einkäufe im Voraus und vermeide Spontankäufe.',
    icon: '🛒'
  },
  {
    id: 4,
    category: 'Energie sparen',
    title: 'Stromfresser identifizieren',
    description: 'Überprüfe regelmäßig deine Stromkosten und finde Einsparpotenziale.',
    icon: '⚡'
  }
];

export default function FinancialTips() {
  const [selectedCategory, setSelectedCategory] = useState('Alle');
  const categories = ['Alle', ...new Set(tips.map(tip => tip.category))];

  const filteredTips = selectedCategory === 'Alle' 
    ? tips 
    : tips.filter(tip => tip.category === selectedCategory);

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-gray-100 mb-8">Finanztipps</h1>
      
      {/* Kategorie-Filter */}
      <div className="flex gap-2 mb-6 overflow-x-auto pb-2">
        {categories.map(category => (
          <button
            key={category}
            onClick={() => setSelectedCategory(category)}
            className={`px-4 py-2 rounded-full text-sm whitespace-nowrap
              ${selectedCategory === category 
                ? 'bg-green-600 text-white' 
                : 'bg-gray-700 text-gray-300 hover:bg-gray-600'}`}
          >
            {category}
          </button>
        ))}
      </div>

      {/* Tips Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredTips.map(tip => (
          <div 
            key={tip.id}
            className="bg-gray-800 rounded-lg p-6 shadow-lg border border-gray-700 hover:border-green-500 transition-colors"
          >
            <div className="text-4xl mb-4">{tip.icon}</div>
            <h3 className="text-xl font-semibold text-gray-100 mb-2">{tip.title}</h3>
            <p className="text-gray-400">{tip.description}</p>
            <div className="mt-4">
              <span className="inline-block bg-gray-700 rounded-full px-3 py-1 text-sm text-gray-300">
                {tip.category}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}