# Fix npm PATH for current PowerShell session
$env:PATH = [System.Environment]::GetEnvironmentVariable("PATH","Machine") + ";" + [System.Environment]::GetEnvironmentVariable("PATH","User")
Write-Host "PATH updated! Try running: npm --version" -ForegroundColor Green

