export function runtimeTablePagination<T>(
  rows: T[],
  page: number,
  pageSize: number
): T[] {
  const safePage = Math.max(page, 1);
  const safePageSize = Math.max(pageSize, 1);

  const start = (safePage - 1) * safePageSize;

  return rows.slice(
    start,
    start + safePageSize
  );
}