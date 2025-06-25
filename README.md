# 💰 MyMoney – Das Frontend der Finanzverwaltungs-App

**MyMoney** ist eine moderne Webanwendung, mit der Nutzer ihre Einnahmen und Ausgaben übersichtlich verwalten können. Es unterstützt Kategorien, wiederkehrende Ausgaben, Einsparpotenziale und Nutzerprofile.

Das Frontend basiert auf **React**, **Vite** und **TailwindCSS**.  
Optional kann es in eine CI/CD-Pipeline über **Jenkins** oder **GitHub Actions** eingebunden werden.

---

## 🚀 Features

- Einnahmen- und Ausgabenverwaltung
- Kategorien und Farben
- Wiederkehrende Ausgaben markieren
- Einsparvorschläge
- Nutzerprofile mit Avatar
- Navigation mit Links zu Finanztipps und Krypto-Apps
- Datenschutz, AGB, Impressum im Footer

---

## 📁 Projektstruktur (Auszug)

```plaintext
/mymoney
├── client/            # React Frontend
│   ├── src/
│   ├── index.html
│   └── package.json
├── server/            # Express Backend (getrennt)
├── Jenkinsfile        # Für CI mit Jenkins
├── .env               # Umgebungsvariablen (nicht committen!)
└── README.md


