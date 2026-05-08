import {
  ERPTestingRegistry,
} from "../registry/ERPTestingRegistry";

import {
  ERPTestingHistoryStore,
} from "../history/ERPTestingHistoryStore";

import {
  buildERPTestingReport,
} from "../reports/ERPTestingReportBuilder";

export const ERPTestingEngine = {

  runAll() {

    ERPTestingRegistry.forEach(
      (test) => {

        ERPTestingHistoryStore.add(
          test
        );
      }
    );

    return buildERPTestingReport();
  },

  registry() {

    return ERPTestingRegistry;
  },

  history() {

    return ERPTestingHistoryStore.all();
  },

  report() {

    return buildERPTestingReport();
  },
};