import { Routes, Route, Navigate } from "react-router-dom";
import Header from "./components/Header";
import Footer from "./components/Footer";
import Dashboard from "./components/Dashboard";
import Login from "./components/Login";
import Register from "./components/Register";
import Profile from "./components/Profile";
import ErrorBoundary from './components/ErrorBoundary';
import PasswordReset from "./components/PasswordReset";
import FinancialTips from "./components/FinancialTips";
import About from './components/About';

function App() {
  const isAuthenticated = !!localStorage.getItem('token');

  return (
    <div className="flex flex-col min-h-screen bg-gradient-to-b from-gray-900 to-gray-800 text-gray-100">
      <Header />

      <main className="flex-grow container mx-auto px-4 py-12">
        <Routes>
          <Route path="/" element={
            <div className="flex flex-col items-center justify-center">
              <div className="bg-gray-800 rounded-xl shadow-lg shadow-gray-700/20 p-8 w-full max-w-xl text-center border border-gray-700">
                <h1 className="text-4xl font-extrabold text-green-400 mb-6">
                  Willkommen bei <span className="text-green-500">MyMoney</span>
                </h1>
                <p className="text-gray-300 text-lg mb-4">
                  Behalte deine Finanzen im Blick – mit Übersicht, Kontrolle und Tipps zum Sparen.
                </p>
                {!isAuthenticated && (
                  <div className="space-x-4">
                    <a href="/login" className="inline-block px-6 py-2 bg-green-600 text-white rounded-md hover:bg-green-700">
                      Login
                    </a>
                    <a href="/register" className="inline-block px-6 py-2 border border-green-500 text-green-500 rounded-md hover:bg-gray-700">
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
          <Route path="/reset-password" element={<PasswordReset />} />

          {/* Geschützte Routen */}
          <Route path="/dashboard" element={
            <ErrorBoundary>
              {isAuthenticated ? <Dashboard /> : <Navigate to="/login" />}
            </ErrorBoundary>
          } />
          <Route path="/profile" element={
            isAuthenticated ? <Profile /> : <Navigate to="/login" />
          } />
          <Route path="/financial-tips" element={
            <ErrorBoundary>
              {isAuthenticated ? <FinancialTips /> : <Navigate to="/login" />}
            </ErrorBoundary>
          } />
          <Route path="/about" element={<About />} />

          {/* Fallback für unbekannte Routen */}
          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
      </main>

      <Footer />
    </div>
  );
}

export default App;
