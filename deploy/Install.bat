powershell "Unblock-File -Path '%~dp0\Install.ps1'"
powershell "& '%~dp0\Install.ps1' -overwriteIfExist $false -iisAppPoolName AdventureRPGApppool -iisAppPoolDotNetVersion v4.0 -iisAppName AdventureRPG -hostName localhost"
pause
