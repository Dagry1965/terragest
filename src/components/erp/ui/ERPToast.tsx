interface ERPToastProps {
  title: string;
  message?: string;
  tone?: "success" | "warning" | "danger" | "info";
}

export function ERPToast({
  title,
  message,
  tone = "info",
}: ERPToastProps) {
  const toneClass = {
    success: "border-emerald-800 bg-emerald-950 text-emerald-200",
    warning: "border-amber-800 bg-amber-950 text-amber-200",
    danger: "border-red-800 bg-red-950 text-red-200",
    info: "border-sky-800 bg-sky-950 text-sky-200",
  }[tone];

  return (
    <div className={`rounded-xl border p-4 shadow-lg ${toneClass}`}>
      <strong className="block text-sm">{title}</strong>
      {message && <p className="mt-1 text-sm opacity-80">{message}</p>}
    </div>
  );
}
