
    [CmdletBinding()]
    param(
        [Parameter()]
        [bool]$overwriteIfExist = $false,   
        [string]$iisAppPoolName = "myWebAppPool",
        [string]$iisAppPoolDotNetVersion = "v4.0",
        [string]$iisAppName = "myWebApp",
        [string]$hostName = "localhost",
        [string]$hostsFilePath = "C:\Windows\System32\drivers\etc\hosts",
        [bool]$autoLaunchOnCompletion = $true
    )
    Process {
        Write-Host "Starting install..." -ForegroundColor Yellow

        Set-ExecutionPolicy -Scope Process -ExecutionPolicy Unrestricted

        $executionPolicy = Get-ExecutionPolicy -Scope Process
        Write-Host ("Execution policy set to: " + $executionPolicy) -ForegroundColor Yellow

        try {
            Import-Module WebAdministration -ErrorAction Stop            
        }
        catch {
            Write-Host "Failed to Import WebAdminstration Module" -ForegroundColor Red
            Write-Host "Try running executing commnand with administrative privileges" -ForegroundColor Red
            Return
        }
                        
        $invocation = (Get-Variable MyInvocation).Value
        $directoryPath = Split-Path $invocation.MyCommand.Path
        $directoryPath = $directoryPath.replace("\deploy", "")
        
        Set-Location IIS:\AppPools\
        
        if (!(Test-Path $iisAppPoolName -PathType Container))
        {
            Write-Host "Creating app pool" -ForegroundColor Yellow
            $appPool = New-Item $iisAppPoolName
            $appPool | Set-ItemProperty -Name "managedRuntimeVersion" -Value $iisAppPoolDotNetVersion
        }
        
        Set-Location IIS:\Sites\
        
        if ((Test-Path $iisAppName -PathType Container) -and ($overwriteIfExist -ne $true))
        {
            Write-Host "Site already exists" -ForegroundColor Yellow
            Write-Host "Install completed" -ForegroundColor Yellow
            return;
        }
        
        Write-Host "Creating site" -ForegroundColor Yellow

        $iisApp = New-Item $iisAppName -Bindings @{protocol="http"; bindingInformation=":321:" + $hostName} -PhysicalPath $directoryPath
        $iisApp | Set-ItemProperty -Name "applicationPool" -Value $iisAppPoolName

        if ($hostName -ne "localhost") {
            Write-Host ("Adding dns entry for: {0}" -f $hostName) -ForegroundColor Yellow
            
            $hostEntry = ("`n127.0.0.1 {0}" -f $hostName)
            if ((Get-Content $hostsFilePath).Contains($hostEntry) -ne $false) {
                Add-Content -Value $hostEntry -PassThru $hostsFilePath
            }
        }

        Write-Host "Install completed" -ForegroundColor Yellow
        
        if ($autoLaunchOnCompletion) {
            Start-Process -FilePath ("http://{0}:321/" -f $hostName)
        }
    }
