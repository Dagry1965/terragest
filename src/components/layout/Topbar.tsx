"use client";

export const Topbar = () => {
  return (
    <header
      className="
        h-16
        bg-white
        border-b
        flex
        items-center
        justify-between
        px-6
      "
    >
      <h2
        className="
          text-xl
          font-semibold
        "
      >
        ERP Agricole
      </h2>

      <div
        className="
          flex
          items-center
          gap-4
        "
      >
        <span>
          Admin
        </span>

        <div
          className="
            w-10
            h-10
            rounded-full
            bg-black
          "
        />
      </div>
    </header>
  );
};