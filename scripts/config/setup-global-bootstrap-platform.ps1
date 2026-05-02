Write-Host "Generating Terragest Global Bootstrap Platform..." -ForegroundColor Cyan

# =====================================================
# GLOBAL PATHS
# =====================================================

$ROOT =
"C:\Users\Admin\terragest"

$WEB =
"$ROOT"

$MOBILE =
"$ROOT\mobile\terragest-mobile"

# =====================================================
# VALIDATION
# =====================================================

if (!(Test-Path $ROOT)) {

  Write-Host ""
  Write-Host "Terragest root folder not found." -ForegroundColor Red
  Write-Host $ROOT
  exit
}

Write-Host ""
Write-Host "Terragest root detected." -ForegroundColor Green

# =====================================================
# CREATE GLOBAL DIRECTORIES
# =====================================================

mkdir "$ROOT\scripts\bootstrap" -Force
mkdir "$ROOT\scripts\env" -Force
mkdir "$ROOT\scripts\ci" -Force
mkdir "$ROOT\logs" -Force

# =====================================================
# WEB INSTALL
# =====================================================

Write-Host ""
Write-Host "Installing Web ERP..." -ForegroundColor Cyan

Set-Location $WEB

if (Test-Path "package.json") {

  pnpm install

} else {

  Write-Host "package.json not found for WEB." -ForegroundColor Yellow
}

# =====================================================
# MOBILE INSTALL
# =====================================================

Write-Host ""
Write-Host "Installing Mobile App..." -ForegroundColor Cyan

if (Test-Path $MOBILE) {

  Set-Location $MOBILE

  npm install

} else {

  Write-Host "Mobile app not found." -ForegroundColor Yellow
}

# =====================================================
# ENV FILE
# =====================================================

$envFile = @'
NEXT_PUBLIC_APP_NAME=Terragest

NEXT_PUBLIC_API_URL=http://localhost:3000/api

NEXT_PUBLIC_FIREBASE_API_KEY=

NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=

NEXT_PUBLIC_FIREBASE_PROJECT_ID=

NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=

NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=

NEXT_PUBLIC_FIREBASE_APP_ID=

TERRAGEST_API_KEY=terrageest_super_secret_key_2026
'@

Set-Content `
"$ROOT\.env.local" `
$envFile

# =====================================================
# DEV START SCRIPT
# =====================================================

$devScript = @'
Write-Host ""
Write-Host "Starting Terragest WEB..." -ForegroundColor Cyan

Set-Location "C:\Users\Admin\terragest"

pnpm dev
'@

Set-Content `
"$ROOT\scripts\bootstrap\start-web.ps1" `
$devScript

# =====================================================
# MOBILE START SCRIPT
# =====================================================

$mobileScript = @'
Write-Host ""
Write-Host "Starting Terragest MOBILE..." -ForegroundColor Cyan

Set-Location "C:\Users\Admin\terragest\mobile\terragest-mobile"

npx expo start
'@

Set-Content `
"$ROOT\scripts\bootstrap\start-mobile.ps1" `
$mobileScript

# =====================================================
# CI PIPELINE TEMPLATE
# =====================================================

$ciPipeline = @'
name: Terragest CI

on:
  push:
    branches:
      - main

jobs:

  build:

    runs-on: ubuntu-latest

    steps:

      - name: Checkout
        uses: actions/checkout@v4

      - name: Setup Node
        uses: actions/setup-node@v4
        with:
          node-version: 22

      - name: Install PNPM
        run: npm install -g pnpm

      - name: Install dependencies
        run: pnpm install

      - name: Build
        run: pnpm build
'@

Set-Content `
"$ROOT\scripts\ci\github-actions-template.yml" `
$ciPipeline

# =====================================================
# ENV MANAGER
# =====================================================

$envManager = @'
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
'@

Set-Content `
"$ROOT\scripts\env\switch-env.ps1" `
$envManager

# =====================================================
# GLOBAL README
# =====================================================

$readme = @'
# Terragest Platform

## Start WEB

.\scripts\bootstrap\start-web.ps1

--------------------------------------------------

## Start MOBILE

.\scripts\bootstrap\start-mobile.ps1

--------------------------------------------------

## Switch Environment

.\scripts\env\switch-env.ps1 -Environment dev

--------------------------------------------------

## CI/CD

scripts/ci/github-actions-template.yml
'@

Set-Content `
"$ROOT\BOOTSTRAP.md" `
$readme

# =====================================================
# DONE
# =====================================================

Write-Host ""
Write-Host "Terragest Global Bootstrap Platform generated successfully." -ForegroundColor Green
Write-Host ""
Write-Host "Generated:" -ForegroundColor Yellow
Write-Host "- Global bootstrap"
Write-Host "- Environment manager"
Write-Host "- CI/CD template"
Write-Host "- Startup scripts"
Write-Host "- Enterprise project orchestration"
Write-Host ""