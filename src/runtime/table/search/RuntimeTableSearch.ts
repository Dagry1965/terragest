export function runtimeTableSearch<T extends Record<string, any>>(
  rows: T[],
  search: string
) {
  if (!search) {
    return rows;
  }

  const term = search.toLowerCase();

  return rows.filter((row) =>
    Object.values(row).some((value) =>
      String(value ?? "")
        .toLowerCase()
        .includes(term)
    )
  );
}