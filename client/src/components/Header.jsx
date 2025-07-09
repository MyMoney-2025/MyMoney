import React from 'react';



function Header() {
  // Handler für Google Login (Dummy-Implementierung)
  const handleGoogleLogin = () => {
    // Hier würdest du z.B. ein OAuth-Login mit Google einleiten
    window.location.href = '/api/auth/google'; // Beispiel-Route für Backend-Redirect
  };

  return (
    <header className="bg-white shadow-md py-4 px-6 flex justify-between items-center">
      {/* Links: Logo / Titel */}
      <div className="text-2xl font-bold text-green-600">MyMoney</div>

      {/* Mitte: Navigation */}
      <nav className="space-x-6">
        <a href="#finanztipps" className="text-gray-700 hover:text-green-600 transition-colors">Finanztipps</a>
        <a href="#krypto" className="text-gray-700 hover:text-green-600 transition-colors">Die besten Krypto Apps</a>
      </nav>

      {/* Rechts: Login/Profile */}
      <div className="flex items-center space-x-4">
        <button
          onClick={handleGoogleLogin}
          className="flex items-center gap-2 text-gray-700 hover:text-green-600 transition-colors border border-green-600 rounded px-3 py-1 ml-2 hover:bg-green-50"
        >
          <img
            src="https://www.svgrepo.com/show/475656/google-color.svg"
            alt="Google"
            className="w-5 h-5"
          />
          Login mit Googlemail
        </button>
        <button className="relative">
          <img
            src="/user-avatar.png"
            alt="Profil"
            className="w-8 h-8 rounded-full border border-gray-300"
          />
        </button>
      </div>
    </header>
  );
}

export default Header;
