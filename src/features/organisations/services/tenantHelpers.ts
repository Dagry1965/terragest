export const isSameTenant = (
  utilisateurOrganisationId?: string,
  resourceOrganisationId?: string
) => {

  return (
    utilisateurOrganisationId ===
    resourceOrganisationId
  );
}
