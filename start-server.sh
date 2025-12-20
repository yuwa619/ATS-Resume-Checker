#!/bin/bash

# ATS Resume Checker - Server Launcher
# This script starts a local server to run the app

echo "🎯 Starting ATS Resume Checker..."
echo ""

# Check if Python 3 is available
if command -v python3 &> /dev/null; then
    echo "✓ Python 3 found"
    echo "Starting server on http://localhost:8000"
    echo "Press Ctrl+C to stop the server"
    echo ""
    cd dist
    python3 -m http.server 8000
elif command -v python &> /dev/null; then
    echo "✓ Python found"
    echo "Starting server on http://localhost:8000"
    echo "Press Ctrl+C to stop the server"
    echo ""
    cd dist
    python -m http.server 8000
else
    echo "❌ Python not found. Trying Node.js..."
    if command -v npx &> /dev/null; then
        echo "✓ Node.js found"
        echo "Starting server..."
        echo ""
        npx serve dist
    else
        echo "❌ Neither Python nor Node.js found."
        echo "Please install Python 3 or Node.js to run this app."
        echo ""
        echo "Or manually start a server:"
        echo "  cd dist"
        echo "  python3 -m http.server 8000"
        exit 1
    fi
fi

