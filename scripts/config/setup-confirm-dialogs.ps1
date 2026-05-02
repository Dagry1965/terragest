Write-Host "Generating Terragest Confirm Dialog System..." -ForegroundColor Cyan

# =====================================================
# UI DIRECTORY
# =====================================================

New-Item -ItemType Directory -Force -Path "src\components\dialogs"

# =====================================================
# CONFIRM DIALOG
# =====================================================

$confirmDialog = @'
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
'@

Set-Content `
"src\components\dialogs\ConfirmDialog.tsx" `
$confirmDialog

# =====================================================
# DELETE BUTTON COMPONENT
# =====================================================

$deleteButton = @'
"use client";

import { useState } from "react";

import toast from "react-hot-toast";

import { ConfirmDialog } from "@/components/dialogs/ConfirmDialog";

interface DeleteButtonProps {

  itemName: string;

  onDelete: () => Promise<void>;
}

export const DeleteButton = ({
  itemName,
  onDelete,
}: DeleteButtonProps) => {

  const [open, setOpen] = useState(false);

  const [loading, setLoading] = useState(false);

  const handleDelete = async () => {

    try {

      setLoading(true);

      await onDelete();

      toast.success(
        "Suppression effectuée"
      );

      setOpen(false);

    } catch (err) {

      console.error(err);

      toast.error(
        "Erreur suppression"
      );

    } finally {

      setLoading(false);

    }
  };

  return (

    <>

      <button
        onClick={() => setOpen(true)}
        className="px-3 py-2 rounded-lg bg-red-600 text-white"
      >
        Supprimer
      </button>

      <ConfirmDialog
        open={open}
        title="Confirmer suppression"
        description={`Supprimer ${itemName} ?`}
        confirmText={
          loading
            ? "Suppression..."
            : "Supprimer"
        }
        onConfirm={handleDelete}
        onCancel={() => setOpen(false)}
      />

    </>
  );
}
'@

Set-Content `
"src\components\dialogs\DeleteButton.tsx" `
$deleteButton

# =====================================================
# EMPTY STATE COMPONENT
# =====================================================

$emptyState = @'
interface EmptyStateProps {

  title: string;

  description?: string;
}

export const EmptyState = ({
  title,
  description,
}: EmptyStateProps) => {

  return (

    <div className="bg-white rounded-2xl shadow-md p-10 text-center">

      <h2 className="text-2xl font-bold">
        {title}
      </h2>

      {description && (

        <p className="text-gray-500 mt-2">

          {description}

        </p>

      )}

    </div>
  );
}
'@

Set-Content `
"src\components\ui\EmptyState.tsx" `
$emptyState

# =====================================================
# SKELETON CARD
# =====================================================

$skeletonCard = @'
export const SkeletonCard = () => {

  return (

    <div className="bg-white rounded-2xl shadow-md p-6 animate-pulse">

      <div className="h-6 bg-gray-200 rounded w-1/2"></div>

      <div className="mt-4 h-4 bg-gray-200 rounded w-full"></div>

      <div className="mt-2 h-4 bg-gray-200 rounded w-2/3"></div>

    </div>
  );
}
'@

Set-Content `
"src\components\ui\SkeletonCard.tsx" `
$skeletonCard

# =====================================================
# DONE
# =====================================================

Write-Host ""
Write-Host "Terragest Confirm Dialog System generated successfully." -ForegroundColor Green
Write-Host ""
Write-Host "Generated:" -ForegroundColor Yellow
Write-Host "- ConfirmDialog"
Write-Host "- DeleteButton"
Write-Host "- EmptyState"
Write-Host "- SkeletonCard"
Write-Host ""