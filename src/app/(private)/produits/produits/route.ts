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
