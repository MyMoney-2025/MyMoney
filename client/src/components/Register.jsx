// Beispiel: src/pages/Register.jsx
import { useState } from 'react';

export default function Register() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [msg, setMsg] = useState('');

  async function handleRegister(e) {
    e.preventDefault();
    const res = await fetch('/api/register', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ username, password }),
    });
    const data = await res.json();
    setMsg(data.success ? 'Registrierung erfolgreich!' : data.error);
  }

  return (
    <form onSubmit={handleRegister} className="space-y-4">
      <input className="border p-2 w-full" placeholder="Benutzername" value={username} onChange={e => setUsername(e.target.value)} />
      <input className="border p-2 w-full" type="password" placeholder="Passwort" value={password} onChange={e => setPassword(e.target.value)} />
      <button className="bg-green-600 text-white px-4 py-2 rounded" type="submit">Registrieren</button>
      <div>{msg}</div>
    </form>
  );
}