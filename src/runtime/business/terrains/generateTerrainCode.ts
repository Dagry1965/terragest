export async function generateTerrainCode(
  payload: Record<string, unknown>,
  existingTerrains: Array<Record<string, unknown>>
) {
  const nom =
    String(payload.nom ?? "")
      .trim()
      .substring(0, 3)
      .toUpperCase();

  const ville =
    String(payload.ville ?? "")
      .trim()
      .substring(0, 3)
      .toUpperCase();

  const prefix =
    `${nom}-${ville}`;

  const currentId =
    String(payload.id ?? "");

  const matching =
    existingTerrains.filter(
      (item) =>
        item.id !== currentId &&
        String(item.code ?? "")
          .startsWith(prefix)
    );

  return `${prefix}-${matching.length + 1}`;
}