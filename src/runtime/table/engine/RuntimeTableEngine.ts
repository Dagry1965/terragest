import { runtimeTableSearch } from "../search/RuntimeTableSearch";
import { runtimeTableSorting } from "../sorting/RuntimeTableSorting";
import { runtimeTablePagination } from "../pagination/RuntimeTablePagination";

import type {
  RuntimeTableResult,
  RuntimeTableState,
} from "../types/RuntimeTableTypes";

export class RuntimeTableEngine {
  static process<T extends Record<string, any>>(
    rows: T[],
    state: RuntimeTableState
  ): RuntimeTableResult<T> {
    const searched = runtimeTableSearch(rows, state.search);

    const sorted = runtimeTableSorting(
      searched,
      state.sortKey,
      state.sortDirection
    );

    const paginated = runtimeTablePagination(
      sorted,
      state.page,
      state.pageSize
    );

    return {
      rows: paginated,
      total: searched.length,
    };
  }
}