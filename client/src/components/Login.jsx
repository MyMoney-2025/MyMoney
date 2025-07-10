import React from "react";
import { useNavigate } from "react-router-dom";

export default function Login() {
  const navigate = useNavigate();

  // ...existing code...
  const handleGithubLogin = () => {
    // Weiterleitung zum Backend für GitHub OAuth
    window.location.href = "/api/auth/github";
  };
  // ...existing code...

  // Optional: Wenn du nach erfolgreichem Login vom Backend auf /dashboard weiterleitest,
  // kannst du hier einen Effekt einbauen, um den Usernamen aus dem Token zu holen.

  return (
    <div className="flex flex-col items-center justify-center min-h-[60vh]">
      <div className="bg-white rounded-xl shadow-lg p-8 w-full max-w-md flex flex-col items-center">
        <h2 className="text-2xl font-bold text-green-700 mb-6">
          Login mit Google
        </h2>
        <button
          onClick={handleGithubLogin}
          className="flex items-center gap-2 text-gray-700 hover:text-green-600 transition-colors border border-green-600 rounded px-4 py-2 hover:bg-green-50"
        >
          <img
            src="https://github.githubassets.com/images/modules/logos_page/GitHub-Mark.png"
            alt="GitHub"
            className="w-6 h-6"
          />
          Login mit GitHub
        </button>
      </div>
    </div>
  );
}
