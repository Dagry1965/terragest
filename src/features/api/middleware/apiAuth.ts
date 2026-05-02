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
