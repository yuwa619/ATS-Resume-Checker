@echo off
REM ATS Resume Checker - Server Launcher for Windows
REM This script starts a local server to run the app

echo 🎯 Starting ATS Resume Checker...
echo.

REM Check if Python is available
python --version >nul 2>&1
if %errorlevel% == 0 (
    echo ✓ Python found
    echo Starting server on http://localhost:8000
    echo Press Ctrl+C to stop the server
    echo.
    cd dist
    python -m http.server 8000
) else (
    echo ❌ Python not found. Trying Node.js...
    where npx >nul 2>&1
    if %errorlevel% == 0 (
        echo ✓ Node.js found
        echo Starting server...
        echo.
        npx serve dist
    ) else (
        echo ❌ Neither Python nor Node.js found.
        echo Please install Python 3 or Node.js to run this app.
        echo.
        echo Or manually start a server:
        echo   cd dist
        echo   python -m http.server 8000
        pause
        exit /b 1
    )
)

