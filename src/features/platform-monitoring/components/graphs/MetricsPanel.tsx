// src/features/platform-monitoring/components/graphs/MetricsPanel.tsx

"use client";

interface Props {

  metrics:
    Record<string, number>;
}

export function MetricsPanel({
  metrics
}: Props) {

  return (

    <div>

      <h3 className="text-lg font-semibold">
        Metrics
      </h3>

      <div className="grid grid-cols-2 gap-4">

        {Object.entries(metrics)
          .map(([key, value]) => (

            <div
              key={key}
              className="
                border
                rounded
                p-4
              "
            >

              <p className="font-medium">
                {key}
              </p>

              <p className="text-2xl">
                {value}
              </p>
            </div>
          ))}
      </div>
    </div>
  );
}