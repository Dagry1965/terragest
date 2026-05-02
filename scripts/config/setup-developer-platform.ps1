Write-Host "Generating Terragest Developer Platform..." -ForegroundColor Cyan

# =====================================================
# GO TO WEB ERP ROOT
# =====================================================

Set-Location "..\..\"

# =====================================================
# DIRECTORIES
# =====================================================

mkdir "developer-platform" -Force

mkdir "developer-platform\sdk" -Force
mkdir "developer-platform\cli" -Force
mkdir "developer-platform\docs" -Force
mkdir "developer-platform\templates" -Force

# =====================================================
# SDK CLIENT
# =====================================================

$sdkClient = @'
export class TerragestSDK {

  apiUrl: string;

  apiKey: string;

  constructor(
    apiUrl: string,
    apiKey: string
  ) {

    this.apiUrl = apiUrl;

    this.apiKey = apiKey;
  }

  async get(
    endpoint: string
  ) {

    const response =
      await fetch(
        `${this.apiUrl}${endpoint}`,
        {
          headers: {
            "x-api-key":
              this.apiKey,
          },
        }
      );

    return response.json();
  }

  async post(
    endpoint: string,
    payload: any
  ) {

    const response =
      await fetch(
        `${this.apiUrl}${endpoint}`,
        {
          method: "POST",

          headers: {

            "Content-Type":
              "application/json",

            "x-api-key":
              this.apiKey,
          },

          body: JSON.stringify(
            payload
          ),
        }
      );

    return response.json();
  }
}
'@

Set-Content `
"developer-platform\sdk\TerragestSDK.ts" `
$sdkClient

# =====================================================
# CLI GENERATOR
# =====================================================

$cliGenerator = @'
#!/usr/bin/env node

const fs =
  require("fs");

const path =
  require("path");

const moduleName =
  process.argv[2];

if (!moduleName) {

  console.log(
    "Usage: terragest-cli <module-name>"
  );

  process.exit(1);
}

const baseDir =
  path.join(
    process.cwd(),
    moduleName
  );

fs.mkdirSync(
  baseDir,
  {
    recursive: true,
  }
);

fs.mkdirSync(
  path.join(
    baseDir,
    "components"
  )
);

fs.mkdirSync(
  path.join(
    baseDir,
    "services"
  )
);

fs.mkdirSync(
  path.join(
    baseDir,
    "types"
  )
);

console.log(
  `Module ${moduleName} generated`
);
'@

Set-Content `
"developer-platform\cli\terragest-cli.js" `
$cliGenerator

# =====================================================
# API DOCS
# =====================================================

$apiDocs = @'
# Terragest API Documentation

## Authentication

All API requests require:

x-api-key

--------------------------------------------------

## Example

GET /api/produits

Headers:

x-api-key: YOUR_API_KEY

--------------------------------------------------

## Endpoints

### Produits

GET /api/produits

### Terrains

GET /api/terrains

### Exploitations

GET /api/exploitations

### IoT

GET /api/sensors

### Digital Twin

GET /api/digital-twins

--------------------------------------------------

## SDK Example

const sdk =
  new TerragestSDK(
    "http://localhost:3000/api",
    "API_KEY"
  );

const produits =
  await sdk.get(
    "/produits"
  );
'@

Set-Content `
"developer-platform\docs\API.md" `
$apiDocs

# =====================================================
# MODULE TEMPLATE
# =====================================================

$template = @'
export interface ExampleType {

  id: string;

  nom: string;
}

export const ExampleService = {

  async getAll() {

    return [];
  },
};
'@

Set-Content `
"developer-platform\templates\module-template.ts" `
$template

# =====================================================
# DEVELOPER PORTAL
# =====================================================

$developerPortal = @'
"use client";

export default function DeveloperPortal() {

  return (

    <div className="
      p-10
      space-y-10
    ">

      <div>

        <h1 className="
          text-5xl
          font-bold
        ">
          Terragest Developer Platform
        </h1>

        <p className="
          text-gray-500
          mt-4
        ">
          SDK, APIs & extensions
        </p>

      </div>

      <div className="
        grid
        grid-cols-1
        md:grid-cols-2
        xl:grid-cols-3
        gap-6
      ">

        <div className="
          bg-white
          rounded-2xl
          shadow-md
          p-6
        ">

          <h2 className="
            text-2xl
            font-bold
          ">
            SDK
          </h2>

          <p className="
            text-gray-500
            mt-4
          ">
            Connect your applications
          </p>

        </div>

        <div className="
          bg-white
          rounded-2xl
          shadow-md
          p-6
        ">

          <h2 className="
            text-2xl
            font-bold
          ">
            APIs
          </h2>

          <p className="
            text-gray-500
            mt-4
          ">
            Public APIs & integrations
          </p>

        </div>

        <div className="
          bg-white
          rounded-2xl
          shadow-md
          p-6
        ">

          <h2 className="
            text-2xl
            font-bold
          ">
            Marketplace
          </h2>

          <p className="
            text-gray-500
            mt-4
          ">
            Extensions & plugins
          </p>

        </div>

      </div>

    </div>
  );
}
'@

Set-Content `
"developer-platform\DeveloperPortal.tsx" `
$developerPortal

# =====================================================
# PACKAGE JSON
# =====================================================

$packageJson = @'
{
  "name": "terragest-sdk",

  "version": "1.0.0",

  "main": "TerragestSDK.ts",

  "license": "MIT"
}
'@

Set-Content `
"developer-platform\sdk\package.json" `
$packageJson

# =====================================================
# DONE
# =====================================================

Write-Host ""
Write-Host "Terragest Developer Platform generated successfully." -ForegroundColor Green
Write-Host ""
Write-Host "Generated:" -ForegroundColor Yellow
Write-Host "- SDK"
Write-Host "- CLI generator"
Write-Host "- API documentation"
Write-Host "- Developer portal"
Write-Host "- Extension templates"
Write-Host ""