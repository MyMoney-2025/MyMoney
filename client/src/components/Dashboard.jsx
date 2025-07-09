import React, { useEffect, useState } from 'react';

export default function Dashboard() {
  const [username, setUsername] = useState('');

  useEffect(() => {
    // Hole Userdaten vom Backend (z.B. /api/me), das den Google-Username zurückgibt
    async function fetchUser() {
      const res = await fetch('/api/me', { credentials: 'include' });
      if (res.ok) {
        const data = await res.json();
        setUsername(data.username || '');
      }
    }
    fetchUser();
  }, []);

  return (
    <div className="max-w-xl mx-auto mt-12 bg-white rounded-xl shadow-lg p-8 text-center">
      <h2 className="text-2xl font-bold text-green-700 mb-4">
        Willkommen {username ? username : 'User'}
      </h2>
      <p className="text-gray-700">Du bist erfolgreich eingeloggt.</p>
    </div>
  );
}