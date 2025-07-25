#!/bin/bash

# Farben für die Ausgabe
GREEN='\033[0;32m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# ASCII Art
echo -e "${GREEN}"
echo "╔═╗┌─┐┌┐┌┌─┐┬ ┬  ╔═╗┌┬┐┌─┐┬─┐┌┬┐┌─┐┬─┐"
echo "╠═╣├─┘│││├┤ └┬┘  ╚═╗ │ ├─┤├┬┘ │ ├┤ ├┬┘"
echo "╩ ╩┴  ┘└┘└─┘ ┴   ╚═╝ ┴ ┴ ┴┴└─ ┴ └─┘┴└─"
echo -e "${NC}"

# Funktion zum Beenden aller Prozesse
cleanup() {
    echo -e "\n${GREEN}Beende alle Prozesse...${NC}"
    kill $(jobs -p) 2>/dev/null
    exit
}

# Trap für SIGINT (Ctrl+C) und SIGTERM
trap cleanup SIGINT SIGTERM

# Prüfe ob node installiert ist
if ! command -v node &> /dev/null; then
    echo "Node.js ist nicht installiert. Bitte installiere Node.js"
    exit 1
fi

# Prüfe ob die package.json Dateien existieren
if [ ! -f "./server/package.json" ] || [ ! -f "./client/package.json" ]; then
    echo "package.json nicht gefunden. Bist du im richtigen Verzeichnis?"
    exit 1
fi

# Installiere Dependencies wenn node_modules nicht existiert
echo -e "${BLUE}Prüfe Dependencies...${NC}"

if [ ! -d "./server/node_modules" ]; then
    echo -e "${BLUE}Installiere Server Dependencies...${NC}"
    cd server && npm install
    cd ..
fi

if [ ! -d "./client/node_modules" ]; then
    echo -e "${BLUE}Installiere Client Dependencies...${NC}"
    cd client && npm install
    cd ..
fi

# Starte Backend
echo -e "${GREEN}Starte Backend Server...${NC}"
cd server && npm start &
BACKEND_PID=$!

# Warte kurz damit der Backend-Server Zeit hat zu starten
sleep 2

# Starte Frontend (korrigierter Pfad)
echo -e "${GREEN}Starte Frontend Development Server...${NC}"
cd client && npm run dev &
FRONTEND_PID=$!

# Warte bis einer der Prozesse beendet wird
wait $BACKEND_PID $FRONTEND_PID

# Cleanup beim Beenden
cleanup
