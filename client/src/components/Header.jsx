import React from 'react';



function Header() {
  // Handler für GitHub Login
  const handleGithubLogin = () => {
    window.location.href = '/api/auth/github'; // GitHub OAuth-Route im Backend
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
          onClick={handleGithubLogin}
          className="flex items-center gap-2 text-gray-700 hover:text-green-600 transition-colors border border-green-600 rounded px-3 py-1 ml-2 hover:bg-green-50"
        >
          <img
            src="https://github.githubassets.com/images/modules/logos_page/GitHub-Mark.png"
            alt="GitHub"
            className="w-5 h-5"
          />
          Login mit GitHub
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
