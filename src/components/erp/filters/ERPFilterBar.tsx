// src/components/erp/filters/ERPFilterBar.tsx

export function ERPFilterBar() {

  return (

    <div
      className="
        bg-white
        rounded-2xl
        shadow-sm
        p-4
        flex
        gap-4
      "
    >

      <input

        placeholder="Recherche..."

        className="
          border
          rounded-xl
          px-4
          py-2
          flex-1
        "
      />

      <button
        className="
          bg-black
          text-white
          px-4
          rounded-xl
        "
      >
        Filtrer
      </button>

    </div>
  );
}
