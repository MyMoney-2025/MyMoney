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
## 🎯 Sprint 2 – Planung und Umsetzung

🧠 **Sprint Goal:**  
> *„Ein funktionsfähiges Grundgerüst mit Nutzerregistrierung, Login und persistenter Datenspeicherung aufbauen.“*

Das Ziel ist es, die technische Basis zu schaffen, damit ein Nutzer sich registrieren, einloggen und seine Daten sicher speichern kann. Dazu zählen sowohl Frontend-Komponenten als auch das Backend inkl. Datenbankanbindung.

📅 **Sprintzeitraum:** 7. Juli – 14. Juli  
📍 **Jira Sprint Board:**  
🔗 [Zum Sprint-Backlog in Jira](https://allerchecker.atlassian.net/jira/software/projects/MYM/boards/2/backlog)

### 📌 Sprint Backlog

**Epic: Technische Grundlagen / Setup**

| Vorgang-ID | Aufgabe                                                                 |
|------------|-------------------------------------------------------------------------|
| MYM-16     | Ausarbeiten der technischen Voraussetzungen zur Installation            |
| MYM-15     | Backend API                                                             |                        
| MYM-8      | Registrierung von Benutzern                                             |
| MYM-9      | Login & Logout                                                          |
| MYM-11     | Profilverwaltung                                                        |






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

## Projekt Cockpit

1 - Github Repository: https://github.com/MyMoney-2025/MyMoney.git

2 - Projektmanagement-Board: https://allerchecker.atlassian.net/jira/software/projects/MYM/boards/2

3 - Team Meeting Raum: https://meet.google.com/dfy-iwhg-igm

4 - Daily Scrum: 10:00Uhr 
    Der Sinn des Daily Scrum:
    Das Daily Scrum ist ein 15-minütiges Event für die Entwickler des Scrum Teams. Der Zweck des Daily Scrums ist es, den Fortschritt in Richtung des Sprint-Ziels zu überprüfen und den Sprint-Backlog bei Bedarf anzupassen, um den Arbeitsplan für den nächsten Arbeitstag abzustimmen. 
    
    Da ich von nun an im Projekt alleine arbeite, sind die folgenden Personen die zentralen Teilnehmer des Daily Scrum: 
    1) Affan Ahmad; Product Owner
    2) Marco Lindner; Class Teacher

    Es ist keine Status-Runde für den Product Owner oder Scrum Master, sondern ein kurzes Planungsmeeting für das Team selbst, um die Zusammenarbeit und Leistung zu optimieren und eventuelle Hindernisse (Impediments) frühzeitig zu identifizieren. 

