Write-Host "Generating Terragest API Layer..." -ForegroundColor Cyan

# =====================================================
# DIRECTORIES
# =====================================================

mkdir "src\app\api" -Force

mkdir "src\app\api\health" -Force
mkdir "src\app\api\produits" -Force
mkdir "src\app\api\interventions" -Force
mkdir "src\app\api\organisations" -Force

mkdir "src\features\api" -Force
mkdir "src\features\api\middleware" -Force
mkdir "src\features\api\services" -Force

# =====================================================
# API RESPONSE HELPER
# =====================================================

$apiResponse = @'
export const successResponse = (
  data: any,
  status = 200
) => {

  return Response.json(
    {
      success: true,
      data,
    },
    {
      status,
    }
  );
}

export const errorResponse = (
  message: string,
  status = 500
) => {

  return Response.json(
    {
      success: false,
      message,
    },
    {
      status,
    }
  );
}
'@

Set-Content `
"src\features\api\services\apiResponse.ts" `
$apiResponse

# =====================================================
# API AUTH MIDDLEWARE
# =====================================================

$apiAuth = @'
import { errorResponse } from "@/features/api/services/apiResponse";

export const apiAuth = async (
  request: Request
) => {

  const apiKey =
    request.headers.get(
      "x-api-key"
    );

  if (!apiKey) {

    return errorResponse(
      "API key manquante",
      401
    );
  }

  const validKey =
    process.env.API_KEY;

  if (apiKey !== validKey) {

    return errorResponse(
      "API key invalide",
      403
    );
  }

  return null;
}
'@

Set-Content `
"src\features\api\middleware\apiAuth.ts" `
$apiAuth

# =====================================================
# HEALTH ROUTE
# =====================================================

$healthRoute = @'
import {
  successResponse,
} from "@/features/api/services/apiResponse";

export async function GET() {

  return successResponse({

    status: "OK",

    service:
      "Terragest API",

    timestamp:
      new Date().toISOString(),
  });
}
'@

Set-Content `
"src\app\api\health\route.ts" `
$healthRoute

# =====================================================
# PRODUITS API
# =====================================================

$produitsApi = @'
import { apiAuth } from "@/features/api/middleware/apiAuth";

import {
  errorResponse,
  successResponse,
} from "@/features/api/services/apiResponse";

import { ProduitService } from "@/features/produits/services/ProduitService";

export async function GET(
  request: Request
) {

  const authError =
    await apiAuth(request);

  if (authError) {
    return authError;
  }

  try {

    const { searchParams } =
      new URL(request.url);

    const organisationId =
      searchParams.get(
        "organisationId"
      );

    if (!organisationId) {

      return errorResponse(
        "organisationId requis",
        400
      );
    }

    const produits =
      await ProduitService.getAllByOrganisation(
        organisationId
      );

    return successResponse(
      produits
    );

  } catch (err) {

    console.error(err);

    return errorResponse(
      "Erreur récupération produits"
    );
  }
}
'@

Set-Content `
"src\app\api\produits\route.ts" `
$produitsApi

# =====================================================
# INTERVENTIONS API
# =====================================================

$interventionsApi = @'
import { apiAuth } from "@/features/api/middleware/apiAuth";

import {
  errorResponse,
  successResponse,
} from "@/features/api/services/apiResponse";

import { InterventionService } from "@/features/interventions/services/InterventionService";

export async function GET(
  request: Request
) {

  const authError =
    await apiAuth(request);

  if (authError) {
    return authError;
  }

  try {

    const { searchParams } =
      new URL(request.url);

    const organisationId =
      searchParams.get(
        "organisationId"
      );

    if (!organisationId) {

      return errorResponse(
        "organisationId requis",
        400
      );
    }

    const interventions =
      await InterventionService.getAllByOrganisation(
        organisationId
      );

    return successResponse(
      interventions
    );

  } catch (err) {

    console.error(err);

    return errorResponse(
      "Erreur récupération interventions"
    );
  }
}
'@

Set-Content `
"src\app\api\interventions\route.ts" `
$interventionsApi

# =====================================================
# ORGANISATIONS API
# =====================================================

$organisationsApi = @'
import { apiAuth } from "@/features/api/middleware/apiAuth";

import {
  errorResponse,
  successResponse,
} from "@/features/api/services/apiResponse";

import { OrganisationService } from "@/features/organisations/services/OrganisationService";

export async function GET(
  request: Request
) {

  const authError =
    await apiAuth(request);

  if (authError) {
    return authError;
  }

  try {

    const organisations =
      await OrganisationService.getAll();

    return successResponse(
      organisations
    );

  } catch (err) {

    console.error(err);

    return errorResponse(
      "Erreur récupération organisations"
    );
  }
}
'@

Set-Content `
"src\app\api\organisations\route.ts" `
$organisationsApi

# =====================================================
# ENV TEMPLATE
# =====================================================

$envTemplate = @'
API_KEY=CHANGE_ME_SUPER_SECRET_KEY
'@

Set-Content `
".env.api.example" `
$envTemplate

# =====================================================
# DONE
# =====================================================

Write-Host ""
Write-Host "Terragest API Layer generated successfully." -ForegroundColor Green
Write-Host ""
Write-Host "Generated:" -ForegroundColor Yellow
Write-Host "- API routes"
Write-Host "- API auth middleware"
Write-Host "- Produits API"
Write-Host "- Interventions API"
Write-Host "- Organisations API"
Write-Host "- SaaS integration foundation"
Write-Host ""