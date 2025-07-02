// Beispiel: src/pages/Login.jsx
import { useState } from 'react';

export default function Login({ onLogin }) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [msg, setMsg] = useState('');

  async function handleLogin(e) {
    e.preventDefault();
    const res = await fetch('/api/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ username, password }),
    });
    const data = await res.json();
    if (data.token) {
      localStorage.setItem('token', data.token);
      setMsg('Login erfolgreich!');
      onLogin && onLogin(data.token);
    } else {
      setMsg(data.error);
    }
  }

  return (
    <form onSubmit={handleLogin} className="space-y-4">
      <input className="border p-2 w-full" placeholder="Benutzername" value={username} onChange={e => setUsername(e.target.value)} />
      <input className="border p-2 w-full" type="password" placeholder="Passwort" value={password} onChange={e => setPassword(e.target.value)} />
      <button className="bg-green-600 text-white px-4 py-2 rounded" type="submit">Login</button>
      <div>{msg}</div>
    </form>
  );
}

// Logout Beispiel (z.B. Button):
// localStorage.removeItem('token');