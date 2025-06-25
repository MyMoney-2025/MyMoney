import Header from './components/Header';
import Footer from './components/Footer';

function App() {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />

      <main className="flex-grow container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold text-green-600 mb-4">Willkommen bei MyMoney</h1>
        <p className="text-gray-700">
          Behalte deine Finanzen im Blick – mit Übersicht, Kontrolle und Tipps zum Sparen.
        </p>
        {/* Hier kann später das Dashboard oder Routing hin */}
      </main>

      <Footer />
    </div>
  );
}

export default App;

