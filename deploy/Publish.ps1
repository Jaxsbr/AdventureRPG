
    [CmdletBinding()]
    param(
        [Parameter()]
        [bool]$recursiveCopy = $true,   
        [string]$source = "E:\Code\_Repo\AdventureRPG\*",
        [string]$destination = "C:\AdventureRPG\",
        [string]$include = "*.html, *.css, *.json, *.js *.ts"
    )
    Process {
        Test-Path $destination
        Copy-Item -Path $source -Destination $destination -Recurse -Force -ErrorAction Continue
    }
