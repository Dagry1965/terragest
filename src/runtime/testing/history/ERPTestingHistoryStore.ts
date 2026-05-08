import type {
  ERPTestCase,
} from "../engine/ERPTestingTypes";

class ERPTestingHistoryStoreClass {

  private history:
    ERPTestCase[] = [];

  add(
    item: ERPTestCase
  ) {

    this.history.unshift(item);

    this.history =
      this.history.slice(0, 500);
  }

  all() {

    return this.history;
  }

  passed() {

    return this.history.filter(
      (item) =>
        item.status === "passed"
    );
  }

  failed() {

    return this.history.filter(
      (item) =>
        item.status === "failed"
    );
  }
}

export const ERPTestingHistoryStore =
  new ERPTestingHistoryStoreClass();