import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';

function Header() {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [showProfileMenu, setShowProfileMenu] = useState(false);
  const isAuthenticated = !!localStorage.getItem('token');

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      fetch('http://localhost:3001/api/me', {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      })
      .then(response => {
        if (response.ok) {
          return response.json();
        }
        throw new Error('Unauthorized');
      })
      .then(userData => {
        setUser(userData);
      })
      .catch(error => {
        console.error('Error fetching user:', error);
        localStorage.removeItem('token');
        setUser(null);
      });
    } else {
      setUser(null);
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    setUser(null);
    navigate('/login');
  };

  return (
    <header className="bg-white shadow-md py-4 px-6 flex justify-between items-center">
      {/* Links: Logo / Titel */}
      <Link to={user ? "/dashboard" : "/"} className="text-2xl font-bold text-green-600">MyMoney</Link>

      {/* Mitte: Navigation */}
      <nav className="space-x-6">
        {user ? (
          <>
            <Link to="/dashboard" className="text-gray-700 hover:text-green-600 transition-colors">Dashboard</Link>
            <Link to="/financial-tips" className="text-gray-700 hover:text-green-600 transition-colors">Finanztipps</Link>
          </>
        ) : (
          <>
            <Link to="/financial-tips" className="text-gray-700 hover:text-green-600 transition-colors">Finanztipps</Link>
            <Link to="/about" className="text-gray-700 hover:text-green-600 transition-colors">Über uns</Link>
          </>
        )}
      </nav>

      {/* Rechts: Login/Profile */}
      <div className="flex items-center space-x-4 relative">
        {user ? (
          <>
            <button
              onClick={() => setShowProfileMenu(!showProfileMenu)}
              className="flex items-center space-x-2 relative"
            >
              <img
                src={user.avatar_url || "/user-avatar.png"}
                alt="Profil"
                className="w-8 h-8 rounded-full border border-gray-300"
              />
              <span className="text-gray-700">{user.name}</span>
            </button>

            {showProfileMenu && (
              <div className="absolute right-0 top-12 bg-white rounded-md shadow-lg py-2 w-48 z-50">
                <Link
                  to="/profile"
                  className="block px-4 py-2 text-gray-700 hover:bg-green-50"
                  onClick={() => setShowProfileMenu(false)}
                >
                  Profil Einstellungen
                </Link>
                <button
                  onClick={handleLogout}
                  className="w-full text-left px-4 py-2 text-red-600 hover:bg-red-50"
                >
                  Logout
                </button>
              </div>
            )}
          </>
        ) : (
          <div className="space-x-4">
            <Link
              to="/login"
              className="text-gray-700 hover:text-green-600 transition-colors"
            >
              Login
            </Link>
            <Link
              to="/register"
              className="text-gray-700 hover:text-green-600 transition-colors border border-green-600 rounded px-3 py-1 hover:bg-green-50"
            >
              Registrieren
            </Link>
          </div>
        )}
      </div>
    </header>
  );
}

export default Header;
