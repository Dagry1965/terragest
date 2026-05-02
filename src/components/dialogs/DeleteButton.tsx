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
