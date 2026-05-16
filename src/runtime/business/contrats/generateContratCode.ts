export async function generateContratCode(
  payload: Record<string, unknown>,
  existingContrats: Array<Record<string, unknown>>
) {

  const typeContrat =
    String(
      payload.typeContrat ??
      ""
    )
    .substring(0,3)
    .toUpperCase();

  const objet =
    String(
      payload.objetContrat ??
      payload.nom ??
      ""
    )
    .substring(0,3)
    .toUpperCase();

  const prefix =
    `CON-${typeContrat}-${objet}`;

  const currentId =
    String(
      payload.id ??
      ""
    );

  const matching =
    existingContrats.filter(
      contrat =>
        contrat.id !== currentId &&
        String(
          contrat.code ?? ""
        )
        .startsWith(prefix)
    );

  return `${prefix}-${matching.length+1}`;
}