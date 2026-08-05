[CmdletBinding()]
param(
    [Parameter(Mandatory = $true)]
    [ValidatePattern('^v\d+\.\d+\.\d+$')]
    [string]$Version
)

$ErrorActionPreference = 'Stop'
$siteRoot = Split-Path -Parent $PSScriptRoot
$releaseDataPath = Join-Path $siteRoot 'data\latest-release.json'

Push-Location $siteRoot
try {
    if (-not (Test-Path -LiteralPath (Join-Path $siteRoot 'node_modules'))) {
        & npm.cmd ci
        if ($LASTEXITCODE -ne 0) {
            throw "npm ci failed with exit code $LASTEXITCODE."
        }
    }

    & node .\scripts\sync-latest-release.mjs --tag $Version
    if ($LASTEXITCODE -ne 0) {
        throw "Release metadata synchronization failed with exit code $LASTEXITCODE."
    }

    & npm.cmd test
    if ($LASTEXITCODE -ne 0) {
        throw "Website validation failed with exit code $LASTEXITCODE."
    }

    $releaseData = Get-Content -Raw -Encoding UTF8 -LiteralPath $releaseDataPath | ConvertFrom-Json
    if ($releaseData.tag -ne $Version) {
        throw "Website release data reports $($releaseData.tag), expected $Version."
    }

    [ordered]@{
        status      = 'Passed'
        tag         = $releaseData.tag
        releaseUrl  = $releaseData.releaseUrl
        downloadUrl = $releaseData.asset.url
        size        = $releaseData.asset.size
        sha256      = $releaseData.asset.sha256
    } | ConvertTo-Json -Compress
}
finally {
    Pop-Location
}
