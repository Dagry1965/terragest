Write-Host "Generating Terragest Enterprise API Foundation..." -ForegroundColor Cyan

# =====================================================
# ROOT PATH
# =====================================================

$ROOT =
"C:\Users\Admin\terragest"

Set-Location $ROOT

# =====================================================
# DIRECTORIES
# =====================================================

mkdir "src\shared\api" -Force
mkdir "src\shared\api\middlewares" -Force
mkdir "src\shared\api\responses" -Force
mkdir "src\shared\api\versioning" -Force
mkdir "src\shared\api\logging" -Force

# =====================================================
# STANDARD API RESPONSE
# =====================================================

$apiResponse = @'
export interface ApiResponse<T> {

  success: boolean;

  message?: string;

  data?: T;

  error?: any;

  timestamp: string;
}

export const ApiSuccess =
<T>(
  data: T,
  message?: string
): ApiResponse<T> => {

  return {

    success: true,

    data,

    message,

    timestamp:
      new Date().toISOString(),
  };
};

export const ApiError =
(
  message: string,
  error?: any
): ApiResponse<any> => {

  return {

    success: false,

    message,

    error,

    timestamp:
      new Date().toISOString(),
  };
};
'@

Set-Content `
"$ROOT\src\shared\api\responses\ApiResponse.ts" `
$apiResponse

# =====================================================
# AUTH MIDDLEWARE
# =====================================================

$authMiddleware = @'
export const AuthMiddleware = {

  validateApiKey(
    request: Request
  ) {

    const apiKey =
      request.headers.get(
        "x-api-key"
      );

    if (
      !apiKey
    ) {

      throw new Error(
        "API key missing"
      );
    }

    return true;
  },
};
'@

Set-Content `
"$ROOT\src\shared\api\middlewares\AuthMiddleware.ts" `
$authMiddleware

# =====================================================
# TENANT MIDDLEWARE
# =====================================================

$tenantMiddleware = @'
export const TenantMiddleware = {

  validateOrganisation(
    organisationId?: string
  ) {

    if (
      !organisationId
    ) {

      throw new Error(
        "organisationId missing"
      );
    }

    return true;
  },
};
'@

Set-Content `
"$ROOT\src\shared\api\middlewares\TenantMiddleware.ts" `
$tenantMiddleware

# =====================================================
# LOGGING MIDDLEWARE
# =====================================================

$loggingMiddleware = @'
export const LoggingMiddleware = {

  log(
    method: string,
    endpoint: string
  ) {

    console.log({

      method,

      endpoint,

      timestamp:
        new Date().toISOString(),
    });
  },
};
'@

Set-Content `
"$ROOT\src\shared\api\middlewares\LoggingMiddleware.ts" `
$loggingMiddleware

# =====================================================
# API VERSIONING
# =====================================================

$versioning = @'
export const API_VERSION = {

  CURRENT: "v1",

  SUPPORTED: [
    "v1",
  ],
};
'@

Set-Content `
"$ROOT\src\shared\api\versioning\ApiVersion.ts" `
$versioning

# =====================================================
# API LOGGER
# =====================================================

$apiLogger = @'
export const ApiLogger = {

  info(
    message: string
  ) {

    console.log(
      "[INFO]",
      message
    );
  },

  error(
    message: string
  ) {

    console.error(
      "[ERROR]",
      message
    );
  },

  warn(
    message: string
  ) {

    console.warn(
      "[WARN]",
      message
    );
  },
};
'@

Set-Content `
"$ROOT\src\shared\api\logging\ApiLogger.ts" `
$apiLogger

# =====================================================
# API WRAPPER
# =====================================================

$apiWrapper = @'
import {
  ApiError,
  ApiSuccess,
} from "@/shared/api/responses/ApiResponse";

export const ApiWrapper =
async (
  callback: any
) => {

  try {

    const result =
      await callback();

    return Response.json(
      ApiSuccess(result)
    );

  } catch (error: any) {

    return Response.json(
      ApiError(
        error.message
      ),
      {
        status: 500,
      }
    );
  }
};
'@

Set-Content `
"$ROOT\src\shared\api\ApiWrapper.ts" `
$apiWrapper

# =====================================================
# PRODUCT API ROUTE
# =====================================================

$productApi = @'
import { NextRequest } from "next/server";

import { ApiWrapper } from "@/shared/api/ApiWrapper";

import { AuthMiddleware } from "@/shared/api/middlewares/AuthMiddleware";

import { TenantMiddleware } from "@/shared/api/middlewares/TenantMiddleware";

import { ProductService } from "@/shared/services/ProductService";

const productService =
  new ProductService();

export async function GET(
  request: NextRequest
) {

  return ApiWrapper(
    async () => {

      AuthMiddleware.validateApiKey(
        request
      );

      const organisationId =
        request.nextUrl.searchParams.get(
          "organisationId"
        );

      TenantMiddleware.validateOrganisation(
        organisationId || undefined
      );

      return productService.getAll();
    }
  );
}
'@

mkdir `
"$ROOT\src\app\api\v1\products" `
-Force

Set-Content `
"$ROOT\src\app\api\v1\products\route.ts" `
$productApi

# =====================================================
# API DOCUMENTATION
# =====================================================

$apiDoc = @'
# Terragest Enterprise API Foundation

## Standards

- ApiResponse
- ApiWrapper
- Middleware architecture
- API versioning
- Logging

--------------------------------------------------

## Middleware

- AuthMiddleware
- TenantMiddleware
- LoggingMiddleware

--------------------------------------------------

## API Versioning

/api/v1/

--------------------------------------------------

## Example

GET /api/v1/products?organisationId=ORG_001

Headers:

x-api-key: YOUR_API_KEY
'@

Set-Content `
"$ROOT\docs\API_FOUNDATION.md" `
$apiDoc

# =====================================================
# DONE
# =====================================================

Write-Host ""
Write-Host "Terragest Enterprise API Foundation generated successfully." -ForegroundColor Green
Write-Host ""
Write-Host "Generated:" -ForegroundColor Yellow
Write-Host "- Standard API responses"
Write-Host "- Auth middleware"
Write-Host "- Tenant middleware"
Write-Host "- Logging middleware"
Write-Host "- API versioning"
Write-Host "- Enterprise API architecture"
Write-Host ""