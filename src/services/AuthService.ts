export const AuthService = {

  async login(
    email: string,
    password: string
  ) {

    return {
      email,
    };
  },

  async logout() {

    return true;
  },
};
