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
