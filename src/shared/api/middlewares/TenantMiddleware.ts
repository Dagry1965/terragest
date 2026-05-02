export const TenantMiddleware = {

  validateOrganisation(
    organisationId?: string
  ) {

    if (
      !organisationId
    ) {

      throw new Error(
        "organisationId missing"
      );
    }

    return true;
  },
};
