export const apiClient = {
  async get(url: string) {
    console.log("GET", url);

    return {
      data: [],
    };
  },

  async post(url: string, data: any) {
    console.log("POST", url, data);

    return {
      data,
    };
  },

  async put(url: string, data: any) {
    console.log("PUT", url, data);

    return {
      data,
    };
  },

  async delete(url: string) {
    console.log("DELETE", url);

    return {
      success: true,
    };
  },
};