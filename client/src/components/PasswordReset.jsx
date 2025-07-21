import React, { useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';

export default function PasswordReset() {
  const [searchParams] = useSearchParams();
  const token = searchParams.get('token');
  const navigate = useNavigate();
  
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    confirmPassword: ''
  });
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setMessage('');

    // Wenn wir einen Token haben, setzen wir ein neues Passwort
    if (token) {
      if (formData.password !== formData.confirmPassword) {
        setError('Die Passwörter stimmen nicht überein');
        return;
      }

      try {
        const response = await fetch('http://localhost:3001/api/reset-password', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            token,
            newPassword: formData.password
          }),
        });

        const data = await response.json();

        if (response.ok) {
          setMessage('Passwort wurde erfolgreich zurückgesetzt');
          setTimeout(() => navigate('/login'), 2000);
        } else {
          setError(data.error || 'Fehler beim Zurücksetzen des Passworts');
        }
      } catch (err) {
        setError('Ein Fehler ist aufgetreten');
      }
    } 
    // Sonst senden wir eine E-Mail zum Zurücksetzen
    else {
      try {
        const response = await fetch('http://localhost:3001/api/forgot-password', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ email: formData.email }),
        });

        const data = await response.json();

        if (response.ok) {
          setMessage('Eine E-Mail mit weiteren Anweisungen wurde versendet');
        } else {
          setError(data.error || 'E-Mail konnte nicht gesendet werden');
        }
      } catch (err) {
        setError('Ein Fehler ist aufgetreten');
      }
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <div>
          <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
            {token ? 'Neues Passwort setzen' : 'Passwort zurücksetzen'}
          </h2>
          <p className="mt-2 text-center text-sm text-gray-600">
            {token ? 
              'Bitte geben Sie Ihr neues Passwort ein' : 
              'Geben Sie Ihre E-Mail-Adresse ein, um Ihr Passwort zurückzusetzen'
            }
          </p>
        </div>

        {message && (
          <div className="rounded-md bg-green-50 p-4">
            <div className="text-sm text-green-700">{message}</div>
          </div>
        )}

        {error && (
          <div className="rounded-md bg-red-50 p-4">
            <div className="text-sm text-red-700">{error}</div>
          </div>
        )}

        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
          <div className="rounded-md shadow-sm -space-y-px">
            {token ? (
              <>
                <div>
                  <input
                    id="password"
                    name="password"
                    type="password"
                    required
                    className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-green-500 focus:border-green-500 focus:z-10 sm:text-sm"
                    placeholder="Neues Passwort"
                    value={formData.password}
                    onChange={handleChange}
                  />
                </div>
                <div>
                  <input
                    id="confirmPassword"
                    name="confirmPassword"
                    type="password"
                    required
                    className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-green-500 focus:border-green-500 focus:z-10 sm:text-sm"
                    placeholder="Passwort bestätigen"
                    value={formData.confirmPassword}
                    onChange={handleChange}
                  />
                </div>
              </>
            ) : (
              <div>
                <input
                  id="email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  required
                  className="appearance-none rounded-md relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-green-500 focus:border-green-500 focus:z-10 sm:text-sm"
                  placeholder="E-Mail Adresse"
                  value={formData.email}
                  onChange={handleChange}
                />
              </div>
            )}
          </div>

          <div>
            <button
              type="submit"
              className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
            >
              {token ? 'Passwort ändern' : 'Zurücksetzen Link senden'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
