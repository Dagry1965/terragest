const API_URL =
  "http://localhost:3000/api";

const API_KEY =
  "terrageest_super_secret_key_2026";

export const apiClient = {

  async get(
    endpoint: string
  ) {

    const response =
      await fetch(
        `${API_URL}${endpoint}`,
        {
          headers: {
            "x-api-key":
              API_KEY,
          },
        }
      );

    return response.json();
  },
};
