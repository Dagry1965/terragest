export interface RuntimeTableColumn {
  key: string;
  label: string;
  sortable?: boolean;
  searchable?: boolean;
}

export interface RuntimeTableState {
  search: string;
  page: number;
  pageSize: number;

  sortKey?: string;
  sortDirection?: "asc" | "desc";

  filters: Record<string, unknown>;
}

export interface RuntimeTableResult<T> {
  rows: T[];
  total: number;
}