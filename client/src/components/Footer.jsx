import React from 'react';

function Footer() {
  return (
    <footer className="bg-gray-100 text-sm text-gray-600 py-8 px-6 mt-12">
      <div className="flex flex-wrap justify-center gap-6">
        <a href="/datenschutz" className="hover:underline transition-colors">Datenschutz</a>
        <a href="/agb" className="hover:underline transition-colors">AGB</a>
        <a href="/faq" className="hover:underline transition-colors">FAQ</a>
        <a href="/kontakt" className="hover:underline transition-colors">Kontakt</a>
        <a href="/impressum" className="hover:underline transition-colors">Impressum</a>
      </div>
      <div className="text-center mt-6 text-xs text-gray-400">
        © {new Date().getFullYear()} MyMoney – Alle Rechte vorbehalten.
      </div>
    </footer>
  );
}

export default Footer;
