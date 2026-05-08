import {
  ERPStatCard,
} from "@/components/erp/ui";

import type {
  getERPTestingSnapshot,
} from "@/runtime/testing";

type Snapshot =
  ReturnType<
    typeof getERPTestingSnapshot
  >;

type Props = {
  snapshot: Snapshot;
};

export function ERPTestingMetricsGrid({
  snapshot,
}: Props) {

  const report =
    snapshot.report;

  return (
    <div className="grid grid-cols-1 gap-5 md:grid-cols-4">

      <ERPStatCard
        label="Tests"
        value={report.total}
        helper="Runtime tests"
      />

      <ERPStatCard
        label="Passed"
        value={report.passed}
        helper="Succes"
      />

      <ERPStatCard
        label="Failed"
        value={report.failed}
        helper="Echecs"
      />

      <ERPStatCard
        label="Success Rate"
        value={`${report.successRate}%`}
        helper="Qualite runtime"
      />

    </div>
  );
}