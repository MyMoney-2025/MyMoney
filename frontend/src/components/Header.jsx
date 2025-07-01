<header className="bg-white shadow-md py-4 px-6 flex justify-between items-center">
  {/* Links: Logo / Titel */}
  <div className="text-2xl font-bold text-green-600">MyMoney</div>

  {/* Mitte: Navigation */}
  <nav className="space-x-6">
    <a href="#finanztipps" className="text-gray-700 hover:text-green-600">Finanztipps</a>
    <a href="#krypto" className="text-gray-700 hover:text-green-600">Die besten Krypto Apps</a>
  </nav>

  {/* Rechts: Login/Profile */}
  <div className="flex items-center space-x-4">
    <a href="/login" className="text-gray-700 hover:text-green-600">Login / Registrieren</a>
    <button className="relative">
      <img
        src="/user-avatar.png"
        alt="Profil"
        className="w-8 h-8 rounded-full border border-gray-300"
      />
      {/* Optional: Dropdown oder Klick auf Icon für Profilseite */}
    </button>
  </div>
</header>
