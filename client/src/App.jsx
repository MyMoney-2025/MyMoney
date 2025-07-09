import Header from "./components/Header";
import Footer from "./components/Footer";
import Dashboard from "./components/Dashboard";
import Login from "./components/Login";

function App() {
  return (
    <div className="flex flex-col min-h-screen bg-gradient-to-b from-green-50 to-white">
      <Header />

      <main className="flex-grow container mx-auto px-4 py-12 flex flex-col items-center justify-center">
        <div className="bg-white rounded-xl shadow-lg p-8 w-full max-w-xl">
          <h1 className="text-4xl font-extrabold text-green-700 mb-6 text-center drop-shadow">
            Willkommen bei <span className="text-green-500">MyMoney</span>
          </h1>
          <p className="text-gray-600 text-lg text-center mb-4">
            Behalte deine Finanzen im Blick – mit Übersicht, Kontrolle und Tipps
            zum Sparen.
          </p>
          {/* Hier kann später das Dashboard oder Routing hin */}
          <Routes>
            {/* ...weitere Routen... */}
            <Route path="/login" element={<Login />} />
            <Route path="/dashboard" element={<Dashboard />} />
          </Routes>
        </div>
      </main>

      <Footer />
    </div>
  );
}

export default App;
