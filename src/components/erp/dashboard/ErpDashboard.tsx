"use client";

export function ErpDashboard() {
  return (
    <div className="p-10 space-y-4 sm:space-y-5 lg:space-y-6">
      <div>
        <h1 className="text-xl sm:text-2xl sm:text-3xl font-bold">
          ERP Dashboard
        </h1>

        <p className="text-gray-500 mt-2">
          Dashboard principal Terragest ERP.
        </p>
      </div>

      <div className="rounded-2xl border bg-[#0B201D] p-4 sm:p-4 sm:p-5 lg:p-6 shadow-[0_8px_24px_rgba(15,23,42,0.08)]">
        Runtime ERP opérationnel.
      </div>
    </div>
  );
}
