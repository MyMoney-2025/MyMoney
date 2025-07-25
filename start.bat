@echo off
echo [92m
echo ╔═╗┌─┐┌┐┌┌─┐┬ ┬  ╔═╗┌┬┐┌─┐┬─┐┌┬┐┌─┐┬─┐
echo ╠═╣├─┘│││├┤ └┬┘  ╚═╗ │ ├─┤├┬┘ │ ├┤ ├┬┘
echo ╩ ╩┴  ┘└┘└─┘ ┴   ╚═╝ ┴ ┴ ┴┴└─ ┴ └─┘┴└─
echo [0m

REM Prüfe ob Node.js installiert ist
where node >nul 2>&1
if %errorlevel% neq 0 (
    echo Node.js ist nicht installiert. Bitte installiere Node.js
    exit /b 1
)

REM Prüfe ob die package.json Dateien existieren
if not exist "server\package.json" (
    echo server/package.json nicht gefunden. Bist du im richtigen Verzeichnis?
    exit /b 1
)
if not exist "client\package.json" (
    echo client/package.json nicht gefunden. Bist du im richtigen Verzeichnis?
    exit /b 1
)

REM Installiere Dependencies wenn node_modules nicht existiert
echo [94mPrüfe Dependencies...[0m

if not exist "server\node_modules" (
    echo [94mInstalliere Server Dependencies...[0m
    cd server
    call npm install
    cd ..
)

if not exist "client\node_modules" (
    echo [94mInstalliere Client Dependencies...[0m
    cd client
    call npm install
    cd ..
)

REM Starte Backend
echo [92mStarte Backend Server...[0m
start cmd /k "cd server && npm start"

REM Warte kurz damit der Backend-Server Zeit hat zu starten
timeout /t 2 /nobreak >nul

REM Starte Frontend
echo [92mStarte Frontend Development Server...[0m
start cmd /k "cd client && npm run dev"

echo [92mAlle Server wurden gestartet![0m
echo [93mDrücke eine beliebige Taste zum Beenden aller Server...[0m
pause >nul

REM Beende alle node Prozesse
taskkill /F /IM node.exe >nul 2>&1
