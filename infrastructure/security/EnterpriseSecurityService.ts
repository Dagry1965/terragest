export const EnterpriseSecurityService = {

  validateAccessToken(
    token: string
  ) {

    return token.length > 10;
  },

  sanitizeInput(
    value: string
  ) {

    return value.replace(
      /<script>/g,
      ""
    );
  },
};
