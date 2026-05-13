"use client";

export function ERPDataList({
  items,
}: {
  items: {
    label: string;
    value: string;
  }[];
}) {

  return (

    <div className="space-y-3">

      {items.map((item) => (

        <div
          key={item.label}
          className="
            flex
            items-center
            justify-between
            rounded-xl
            border
            border-slate-200
            bg-slate-50
            px-4
            py-3
          "
        >

          <p className="text-sm text-slate-500">
            {item.label}
          </p>

          <p className="text-sm font-semibold text-slate-900">
            {item.value}
          </p>

        </div>

      ))}

    </div>

  );
}