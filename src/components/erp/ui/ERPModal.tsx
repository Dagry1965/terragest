import type { ReactNode } from "react";

interface ERPModalProps {
  open: boolean;
  title?: string;
  children: ReactNode;
  onClose?: () => void;
}

export function ERPModal({
  open,
  title,
  children,
  onClose,
}: ERPModalProps) {
  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4">
      <div className="w-full max-w-xl rounded-2xl border border-slate-800 bg-slate-950 p-6 shadow-2xl">
        <div className="mb-5 flex items-center justify-between">
          {title && (
            <h2 className="text-lg font-semibold text-slate-100">
              {title}
            </h2>
          )}

          {onClose && (
            <button
              type="button"
              onClick={onClose}
              className="rounded-lg px-2 py-1 text-sm text-slate-400 hover:bg-slate-800 hover:text-slate-100"
            >
              Fermer
            </button>
          )}
        </div>

        {children}
      </div>
    </div>
  );
}
