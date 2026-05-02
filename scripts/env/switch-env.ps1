param(
  [string]$Environment = "dev"
)

Write-Host ""
Write-Host "Switching environment..." -ForegroundColor Cyan

switch ($Environment) {

  "dev" {

    Write-Host "DEV environment activated" -ForegroundColor Green
  }

  "test" {

    Write-Host "TEST environment activated" -ForegroundColor Yellow
  }

  "prod" {

    Write-Host "PROD environment activated" -ForegroundColor Red
  }

  default {

    Write-Host "Unknown environment"
  }
}
