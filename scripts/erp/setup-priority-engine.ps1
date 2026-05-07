Write-Host "=== TERRAGEST_V2 - SETUP ERP PRIORITY ENGINE ===" -ForegroundColor Cyan

New-Item -ItemType Directory -Force "src/core/priority" | Out-Null

@'
import {
  ERPJob,
} from "@/core/jobs/job-queue";

const priorityWeights = {
  critical: 3,
  normal: 2,
  low: 1,
};

export function sortJobsByPriority(
  jobs: ERPJob[]
) {
  return [...jobs].sort(
    (a, b) => {
      const priorityDiff =
        priorityWeights[
          b.priority
        ] -
        priorityWeights[
          a.priority
        ];

      if (priorityDiff !== 0) {
        return priorityDiff;
      }

      return (
        new Date(
          a.createdAt
        ).getTime() -
        new Date(
          b.createdAt
        ).getTime()
      );
    }
  );
}
'@ | Set-Content "src/core/priority/priority-engine.ts"

Write-Host "=== ERP PRIORITY ENGINE créé avec succès ===" -ForegroundColor Green