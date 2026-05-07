// src/components/topbar/ERPTopbar.tsx

"use client";

export function ERPTopbar() {

  return (

    <header
      className="
        h-16
        border-b
        bg-white
        flex
        items-center
        justify-between
        px-6
      "
    >

      <div>

        <h2
          className="
            text-xl
            font-semibold
          "
        >
          ERP Terragest
        </h2>
      </div>

      <div
        className="
          flex
          items-center
          gap-4
        "
      >

        <div>
          Notifications
        </div>

        <div>
          Admin
        </div>
      </div>
    </header>
  );
}
