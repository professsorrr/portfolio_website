@echo off
cd /d "%~dp0"
echo Starting a local server for your portfolio...
echo Open this in your browser:  http://localhost:8000
echo Press Ctrl+C in this window to stop.
start "" http://localhost:8000
python -m http.server 8000 2>nul || py -m http.server 8000
pause
