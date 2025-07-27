@echo off
echo Starting .NET and Python servers...

REM --- Start the .NET Gateway Server in a new Command Prompt ---
start "Gateway Server" cmd /k "cd CITS_solution\CITS_APIGateway && dotnet run"

REM --- Start the .NET Web Server in a new Command Prompt ---
start "Web Server" cmd /k "cd CITS_solution\CITS_WebServices && dotnet run --urls=https://localhost:7181"

REM --- Start the Python Model Server with venv activation in a new Command Prompt ---
start "Python Model Server" cmd /k "cd resume_parser && call venv\Scripts\activate && python app.py"

REM --- Start the Angular App in a new Command Prompt ---
start "Angular App" cmd /k "cd CITS_solution\CITS_App && ng s -o"

echo servers launched in separate Command Prompts.
pause