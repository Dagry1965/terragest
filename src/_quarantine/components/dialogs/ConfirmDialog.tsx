"use client";

interface ConfirmDialogProps {

  open: boolean;

  title: string;

  description: string;

  confirmText?: string;

  cancelText?: string;

  onConfirm: () => void;

  onCancel: () => void;
}

export const ConfirmDialog = ({
  open,
  title,
  description,
  confirmText = "Confirmer",
  cancelText = "Annuler",
  onConfirm,
  onCancel,
}: ConfirmDialogProps) => {

  if (!open) {
    return null;
  }

  return (

    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">

      <div className="bg-white rounded-2xl shadow-xl w-full max-w-md p-6 space-y-6">

        <div>

          <h2 className="text-2xl font-bold">
            {title}
          </h2>

          <p className="text-gray-500 mt-2">
            {description}
          </p>

        </div>

        <div className="flex items-center justify-end gap-3">

          <button
            onClick={onCancel}
            className="px-4 py-3 rounded-xl bg-gray-200"
          >
            {cancelText}
          </button>

          <button
            onClick={onConfirm}
            className="px-4 py-3 rounded-xl bg-red-600 text-white"
          >
            {confirmText}
          </button>

        </div>

      </div>

    </div>
  );
}
