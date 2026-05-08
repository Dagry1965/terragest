"use client";

interface Props {
  title: string;

  value: string | number;
}

export function StocksDashboardCard({
  title,
  value,
}: Props) {
  return (
    <div className="border rounded p-4 shadow-sm">
      <div className="text-sm text-gray-500">
        {title}
      </div>

      <div className="text-2xl font-bold mt-2">
        {value}
      </div>
    </div>
  );
}
