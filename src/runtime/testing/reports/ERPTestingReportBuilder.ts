import {
  ERPTestingRegistry,
} from "../registry/ERPTestingRegistry";

export function buildERPTestingReport() {

  const total =
    ERPTestingRegistry.length;

  const passed =
    ERPTestingRegistry.filter(
      (test) =>
        test.status === "passed"
    ).length;

  const failed =
    ERPTestingRegistry.filter(
      (test) =>
        test.status === "failed"
    ).length;

  return {
    total,
    passed,
    failed,
    successRate:
      total === 0
        ? 0
        : Math.round(
            (passed / total) * 100
          ),
  };
}