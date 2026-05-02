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
