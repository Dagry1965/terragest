"use client";

type DashboardBarChartItem = {
  label: string;
  value: number;
};

type DashboardBarChartProps = {
  data: DashboardBarChartItem[];
};

export function DashboardBarChart({
  data,
}: DashboardBarChartProps) {
  const maxValue = Math.max(
    1,
    ...data.map((item) => item.value)
  );

  return (
    <div className="rounded-2xl border bg-white p-6 shadow-sm space-y-4">
      <h2 className="text-lg font-semibold">
        Dashboard Bar Chart
      </h2>

      <div className="space-y-3">
        {data.map((item) => (
          <div key={item.label} className="space-y-1">
            <div className="flex justify-between text-sm">
              <span>{item.label}</span>
              <span>{item.value}</span>
            </div>

            <div className="h-2 rounded-full bg-gray-100">
              <div
                className="h-2 rounded-full bg-black"
                style={{
                  width: `${(item.value / maxValue) * 100}%`,
                }}
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default DashboardBarChart;
