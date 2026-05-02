const API_URL =
process.env.NEXT_PUBLIC_API_URL;

const API_KEY =
process.env.NEXT_PUBLIC_API_KEY;

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
              API_KEY || "",
          },
        }
      );

    return response.json();
  },

  async post(
    endpoint: string,
    payload: any
  ) {

    const response =
      await fetch(
        `${API_URL}${endpoint}`,
        {
          method: "POST",

          headers: {

            "Content-Type":
              "application/json",

            "x-api-key":
              API_KEY || "",
          },

          body:
            JSON.stringify(
              payload
            ),
        }
      );

    return response.json();
  },
};
