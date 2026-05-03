type Props = {
  open: boolean;

  title: string;

  description: string;

  onConfirm: () => void;

  onCancel: () => void;
};

export const ConfirmDialog = ({
  open,
  title,
  description,
  onConfirm,
  onCancel,
}: Props) => {

  if (!open) {

    return null;
  }

  return (
    <div
      className="
        fixed
        inset-0
        bg-black/50
        flex
        items-center
        justify-center
        z-50
      "
    >
      <div
        className="
          bg-white
          rounded-2xl
          p-6
          w-full
          max-w-md
        "
      >
        <h3
          className="
            text-xl
            font-semibold
          "
        >
          {title}
        </h3>

        <p
          className="
            text-gray-500
            mt-3
          "
        >
          {description}
        </p>

        <div
          className="
            flex
            justify-end
            gap-3
            mt-6
          "
        >
          <button
            onClick={onCancel}
            className="
              border
              px-4
              py-2
              rounded-xl
            "
          >
            Annuler
          </button>

          <button
            onClick={onConfirm}
            className="
              bg-red-600
              text-white
              px-4
              py-2
              rounded-xl
            "
          >
            Confirmer
          </button>
        </div>
      </div>
    </div>
  );
};