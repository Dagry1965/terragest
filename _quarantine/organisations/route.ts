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
