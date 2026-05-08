"use client";

interface Props {
  title: string;

  status: string;
}

export function MouvementsStockRealtimeWidget({
  title,
  status,
}: Props) {
  return (
    <div className="border rounded p-4 shadow-sm">
      <div className="flex items-center justify-between">
        <div className="font-semibold">
          {title}
        </div>

        <div className="text-sm text-green-600">
          {status}
        </div>
      </div>

      <div className="mt-6 h-32 flex items-center justify-center text-gray-400">
        Realtime data placeholder
      </div>
    </div>
  );
}
