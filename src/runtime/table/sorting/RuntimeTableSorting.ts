export function runtimeTableSorting<T extends Record<string, any>>(
  rows: T[],
  key?: string,
  direction: "asc" | "desc" = "asc"
) {
  if (!key) {
    return rows;
  }

  return [...rows].sort((a, b) => {
    const av = a[key];
    const bv = b[key];

    if (av === bv) {
      return 0;
    }

    if (direction === "asc") {
      return av > bv ? 1 : -1;
    }

    return av < bv ? 1 : -1;
  });
}