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

## 🎯 Sprint 1 – Planung und Umsetzung

🧠 **Sprint Goal:**  
> *„Ein funktionsfähiges Grundgerüst mit Nutzerregistrierung, Login und persistenter Datenspeicherung aufbauen.“*

Das Ziel ist es, die technische Basis zu schaffen, damit ein Nutzer sich registrieren, einloggen und seine Daten sicher speichern kann. Dazu zählen sowohl Frontend-Komponenten als auch das Backend inkl. Datenbankanbindung.

📅 **Sprintzeitraum:** 1. Juli – 3. Juli  
📍 **Jira Sprint Board:**  
🔗 [Zum Sprint-Backlog in Jira](https://allerchecker.atlassian.net/jira/software/projects/MYM/boards/1)

### 📌 Sprint Backlog

**Epic: Technische Grundlage / Setup**

| Vorgang-ID | Aufgabe                                                                 |
|------------|-------------------------------------------------------------------------|
| MYM-16     | Ausarbeiten der technischen Voraussetzungen zur Installation           |
| MYM-12     | Frontend Grundstruktur                                                  |
| MYM-15     | Backend API                                                             |
| MYM-14     | MariaDB Setup                                                           |
| MYM-13     | Authentifizierung mit JWT                                               |

---

## 📁 Projektstruktur (Auszug)

```plaintext
/mymoney
├── client/            # React Frontend
│   ├── src/
│   ├── index.html
│   └── package.json
├── server/            # Express Backend (getrennt)
├── db/                # Datenbankstruktur und SQL-Dateien
├── Jenkinsfile        # Für CI mit Jenkins
├── .env               # Umgebungsvariablen (nicht committen!)
└── README.md


