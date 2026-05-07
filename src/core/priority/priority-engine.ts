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
