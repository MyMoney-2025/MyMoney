import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

export default function Profile() {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState({ text: '', type: '' });

  // Formular-States
  const [profileData, setProfileData] = useState({
    name: '',
    theme: 'light'
  });
  
  const [passwordData, setPasswordData] = useState({
    oldPassword: '',
    newPassword: '',
    confirmPassword: ''
  });

  // Lade Nutzerdaten beim Mounting
  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) {
      navigate('/login');
      return;
    }

    const fetchUserData = async () => {
      try {
        const response = await fetch('http://localhost:3001/api/me', {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        });
        
        if (response.ok) {
          const data = await response.json();
          setUser(data);
          setProfileData({
            name: data.name,
            theme: data.theme || 'light'
          });
        }
        setLoading(false);
      } catch (error) {
        console.error('Fehler beim Laden der Userdaten:', error);
        setLoading(false);
      }
    };

    fetchUserData();
  }, [navigate]);

  // Profildaten aktualisieren
  const handleProfileSubmit = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem('token');
    try {
      const response = await fetch('http://localhost:3001/api/profile', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(profileData)
      });
      
      if (response.ok) {
        setMessage({ text: 'Profil erfolgreich aktualisiert!', type: 'success' });
        // Aktualisiere Theme im HTML element
        document.documentElement.classList.remove('light', 'dark');
        document.documentElement.classList.add(profileData.theme);
      } else {
        setMessage({ text: 'Fehler beim Aktualisieren des Profils', type: 'error' });
      }
    } catch (error) {
      setMessage({ text: 'Netzwerk- oder Serverfehler', type: 'error' });
    }
  };

  // Passwort ändern
  const handlePasswordSubmit = async (e) => {
    e.preventDefault();
    if (passwordData.newPassword !== passwordData.confirmPassword) {
      setMessage({ text: 'Passwörter stimmen nicht überein', type: 'error' });
      return;
    }

    const token = localStorage.getItem('token');
    try {
      const response = await fetch('http://localhost:3001/api/change-password', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({
          oldPassword: passwordData.oldPassword,
          newPassword: passwordData.newPassword
        })
      });
      
      if (response.ok) {
        setMessage({ text: 'Passwort erfolgreich geändert!', type: 'success' });
        setPasswordData({ oldPassword: '', newPassword: '', confirmPassword: '' });
      } else {
        const data = await response.json();
        setMessage({ text: data.error || 'Fehler beim Ändern des Passworts', type: 'error' });
      }
    } catch (error) {
      setMessage({ text: 'Netzwerk- oder Serverfehler', type: 'error' });
    }
  };

  if (loading) {
    return <div className="flex justify-center items-center h-screen">Laden...</div>;
  }

  return (
    <div className="min-h-screen bg-gray-50 py-6">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Profil Einstellungen</h1>
        </div>

        {message.text && (
          <div className={`mb-4 p-4 rounded ${
            message.type === 'success' ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'
          }`}>
            {message.text}
          </div>
        )}

        <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
          {/* Profil Bearbeiten */}
          <div className="bg-white rounded-lg shadow p-6">
            <h2 className="text-lg font-medium text-gray-900 mb-4">Profil Bearbeiten</h2>
            <form onSubmit={handleProfileSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Name
                </label>
                <input
                  type="text"
                  value={profileData.name}
                  onChange={(e) => setProfileData(prev => ({ ...prev, name: e.target.value }))}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-green-500 focus:ring-green-500 sm:text-sm text-gray-900 font-medium"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Farbschema
                </label>
                <select
                  value={profileData.theme}
                  onChange={(e) => setProfileData(prev => ({ ...prev, theme: e.target.value }))}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-green-500 focus:ring-green-500 sm:text-sm text-gray-900 font-medium"
                >
                  <option value="light">Hell</option>
                  <option value="dark">Dunkel</option>
                </select>
              </div>

              <button
                type="submit"
                className="w-full bg-green-600 text-white px-4 py-2 rounded-md hover:bg-green-700"
              >
                Änderungen speichern
              </button>
            </form>
          </div>

          {/* Passwort Ändern */}
          <div className="bg-white rounded-lg shadow p-6">
            <h2 className="text-lg font-medium text-gray-900 mb-4">Passwort Ändern</h2>
            <form onSubmit={handlePasswordSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Altes Passwort
                </label>
                <input
                  type="password"
                  value={passwordData.oldPassword}
                  onChange={(e) => setPasswordData(prev => ({ ...prev, oldPassword: e.target.value }))}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-green-500 focus:ring-green-500 sm:text-sm text-gray-900 font-medium"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Neues Passwort
                </label>
                <input
                  type="password"
                  value={passwordData.newPassword}
                  onChange={(e) => setPasswordData(prev => ({ ...prev, newPassword: e.target.value }))}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-green-500 focus:ring-green-500 sm:text-sm text-gray-900 font-medium"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Neues Passwort bestätigen
                </label>
                <input
                  type="password"
                  value={passwordData.confirmPassword}
                  onChange={(e) => setPasswordData(prev => ({ ...prev, confirmPassword: e.target.value }))}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-green-500 focus:ring-green-500 sm:text-sm text-gray-900 font-medium"
                />
              </div>

              <button
                type="submit"
                className="w-full bg-green-600 text-white px-4 py-2 rounded-md hover:bg-green-700"
              >
                Passwort ändern
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}