import { Routes, Route, Navigate } from "react-router-dom";
import Header from "./components/Header";
import Footer from "./components/Footer";
import Dashboard from "./components/Dashboard";
import Login from "./components/Login";
import Register from "./components/Register";
import Profile from "./components/Profile";
import ErrorBoundary from './components/ErrorBoundary';

function App() {
  const isAuthenticated = !!localStorage.getItem('token');

  return (
    <div className="flex flex-col min-h-screen bg-gradient-to-b from-green-50 to-white">
      <Header />

      <main className="flex-grow container mx-auto px-4 py-12">
        <Routes>
          <Route path="/" element={
            <div className="flex flex-col items-center justify-center">
              <div className="bg-white rounded-xl shadow-lg p-8 w-full max-w-xl text-center">
                <h1 className="text-4xl font-extrabold text-green-700 mb-6">
                  Willkommen bei <span className="text-green-500">MyMoney</span>
                </h1>
                <p className="text-gray-600 text-lg mb-4">
                  Behalte deine Finanzen im Blick – mit Übersicht, Kontrolle und Tipps zum Sparen.
                </p>
                {!isAuthenticated && (
                  <div className="space-x-4">
                    <a href="/login" className="inline-block px-6 py-2 bg-green-600 text-white rounded-md hover:bg-green-700">
                      Login
                    </a>
                    <a href="/register" className="inline-block px-6 py-2 border border-green-600 text-green-600 rounded-md hover:bg-green-50">
                      Registrieren
                    </a>
                  </div>
                )}
              </div>
            </div>
          } />
          
          {/* Öffentliche Routen */}
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />

          {/* Geschützte Routen */}
          <Route path="/dashboard" element={
            <ErrorBoundary>
              {isAuthenticated ? <Dashboard /> : <Navigate to="/login" />}
            </ErrorBoundary>
          } />
          <Route path="/profile" element={
            isAuthenticated ? <Profile /> : <Navigate to="/login" />
          } />

          {/* Fallback für unbekannte Routen */}
          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
      </main>

      <Footer />
    </div>
  );
}

export default App;
