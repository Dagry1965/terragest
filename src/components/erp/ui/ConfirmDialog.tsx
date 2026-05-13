"use client";

type ConfirmDialogProps = {
  open: boolean;
  title: string;
  description?: string;
  onConfirm: () => void | Promise<void>;
  onCancel: () => void;
};

export function ConfirmDialog({
  open,
  title,
  description,
  onConfirm,
  onCancel,
}: ConfirmDialogProps) {
  if (!open) {
    return null;
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4">
      <div className="w-full max-w-md rounded-2xl bg-white p-6 shadow-xl">
        <h2 className="text-lg font-semibold text-slate-900">
          {title}
        </h2>

        {description && (
          <p className="mt-2 text-sm text-slate-500">
            {description}
          </p>
        )}

        <div className="mt-6 flex justify-end gap-3">
          <button
            type="button"
            onClick={onCancel}
            className="rounded-xl border border-slate-200 px-4 py-2 text-sm font-medium text-slate-700"
          >
            Annuler
          </button>

          <button
            type="button"
            onClick={async () => {
              await onConfirm();
            }}
            className="rounded-xl bg-red-600 px-4 py-2 text-sm font-medium text-white"
          >
            Confirmer
          </button>
        </div>
      </div>
    </div>
  );
}