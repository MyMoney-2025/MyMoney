import React, { useState } from "react";
import { useNavigate } from "react-router-dom";


export default function Login() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [error, setError] = useState("");

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    try {
      const response = await fetch("http://localhost:3001/api/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        const data = await response.json();
        if (data.token) {
          localStorage.setItem('token', data.token);
          localStorage.setItem('user', JSON.stringify(data.user));
          // Kurze Verzögerung für localStorage
          setTimeout(() => navigate('/dashboard'), 100);
        } else {
          setError('Kein Token vom Server erhalten');
        }
      } else {
        const data = await response.json();
        setError(data.error || "Login fehlgeschlagen");
      }
    } catch (err) {
      setError("Netzwerk- oder Serverfehler");
    }
  };

  // const handleGithubLogin = () => {
  //   // Weiterleitung zum Backend für GitHub OAuth
  //   window.location.href = "http://localhost:3000/api/auth/github";
  // };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <div>
          <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
            In Konto einloggen
          </h2>
        </div>
        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
          {error && (
            <div className="rounded-md bg-red-50 p-4">
              <div className="text-sm text-red-700">{error}</div>
            </div>
          )}
          <div className="rounded-md shadow-sm -space-y-px">
            <div>
              <input
                name="email"
                type="email"
                required
                className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-green-500 focus:border-green-500 focus:z-10 sm:text-sm"
                placeholder="Email Adresse"
                value={formData.email}
                onChange={handleChange}
              />
            </div>
            <div>
              <input
                name="password"
                type="password"
                required
                className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-green-500 focus:border-green-500 focus:z-10 sm:text-sm"
                placeholder="Passwort"
                value={formData.password}
                onChange={handleChange}
              />
            </div>
          </div>

          <div>
            <button
              type="submit"
              className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
            >
              Einloggen
            </button>
          </div>
        </form>
        {/* <div className="flex items-center justify-center gap-2">
          <span className="h-px bg-gray-300 w-full"></span>
          <span className="text-gray-500 text-sm">oder</span>
          <span className="h-px bg-gray-300 w-full"></span>
        </div>
        <div>
          <button
            onClick={handleGithubLogin}
            className="flex items-center gap-2 text-gray-700 hover:text-green-600 transition-colors border border-green-600 rounded px-4 py-2 hover:bg-green-50 w-full justify-center"
          >
            <img
              src="https://github.githubassets.com/images/modules/logos_page/GitHub-Mark.png"
              alt="GitHub"
              className="w-6 h-6"
            />
            Login mit GitHub
          </button>
        </div> */}
      </div>
    </div>
  );
}
