import type { RuntimeTableState }
from "../types/RuntimeTableTypes";

export const defaultRuntimeTableState: RuntimeTableState = {
  search: "",
  page: 1,
  pageSize: 10,
  filters: {},
};