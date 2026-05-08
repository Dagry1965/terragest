import type { ReactNode } from "react";

interface ERPTabItem {
  key: string;
  label: string;
  content: ReactNode;
}

interface ERPTabsProps {
  items: ERPTabItem[];
  activeKey?: string;
}

export function ERPTabs({ items, activeKey }: ERPTabsProps) {
  const active = items.find((item) => item.key === activeKey) ?? items[0];

  return (
    <div>
      <div className="mb-4 flex gap-2 border-b border-slate-800">
        {items.map((item) => (
          <div
            key={item.key}
            className={`border-b-2 px-3 py-2 text-sm ${
              item.key === active.key
                ? "border-blue-500 text-blue-300"
                : "border-transparent text-slate-400"
            }`}
          >
            {item.label}
          </div>
        ))}
      </div>

      <div>{active?.content}</div>
    </div>
  );
}
