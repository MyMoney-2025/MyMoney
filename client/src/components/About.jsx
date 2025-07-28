import React from 'react';

export default function About() {
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold text-gray-100 mb-8">Über MyMoney</h1>
        
        <div className="grid gap-8">
          {/* Mission */}
          <section className="bg-gray-800 rounded-lg p-6 shadow-lg border border-gray-700">
            <h2 className="text-2xl font-semibold text-green-400 mb-4">Unsere Mission</h2>
            <p className="text-gray-300">
              MyMoney wurde mit dem Ziel entwickelt, Menschen dabei zu helfen, ihre Finanzen 
              besser zu verstehen und zu verwalten. Wir glauben daran, dass finanzielle 
              Bildung und Transparenz der Schlüssel zu einem sorgenfreien Umgang mit Geld ist.
            </p>
          </section>

          {/* Features */}
          <section className="bg-gray-800 rounded-lg p-6 shadow-lg border border-gray-700">
            <h2 className="text-2xl font-semibold text-green-400 mb-4">Was wir bieten</h2>
            <ul className="grid grid-cols-1 md:grid-cols-2 gap-4 text-gray-300">
              <li className="flex items-start space-x-2">
                <span className="text-green-500">✓</span>
                <span>Intelligentes Budget-Management</span>
              </li>
              <li className="flex items-start space-x-2">
                <span className="text-green-500">✓</span>
                <span>Ausgaben-Tracking in Echtzeit</span>
              </li>
              <li className="flex items-start space-x-2">
                <span className="text-green-500">✓</span>
                <span>Visuelle Ausgabenanalyse</span>
              </li>
              <li className="flex items-start space-x-2">
                <span className="text-green-500">✓</span>
                <span>Personalisierte Finanztipps</span>
              </li>
            </ul>
          </section>

          {/* Datenschutz */}
          <section className="bg-gray-800 rounded-lg p-6 shadow-lg border border-gray-700">
            <h2 className="text-2xl font-semibold text-green-400 mb-4">Datensicherheit</h2>
            <p className="text-gray-300">
              Ihre Daten sind bei uns sicher. Wir verwenden modernste 
              Verschlüsselungstechnologien und speichern Ihre Daten ausschließlich 
              auf Servern in Deutschland. Ihre Privatsphäre hat für uns höchste Priorität.
            </p>
          </section>

          {/* Kontakt */}
          <section className="bg-gray-800 rounded-lg p-6 shadow-lg border border-gray-700">
            <h2 className="text-2xl font-semibold text-green-400 mb-4">Kontakt</h2>
            <p className="text-gray-300">
              Haben Sie Fragen oder Anregungen? Wir sind für Sie da!<br />
              E-Mail: support@mymoney.com<br />
              Telefon: +49 (0) 123 456789<br />
              Adresse: Musterstraße 123, 12345 Berlin
            </p>
          </section>
        </div>
      </div>
    </div>
  );
}