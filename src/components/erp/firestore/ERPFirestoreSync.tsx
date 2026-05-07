"use client";

import { ERPHealthBadge }
from "@/components/erp/badges/ERPHealthBadge";

export function ERPFirestoreSync() {

  const collections = [
    "exploitations",
    "terrains",
    "materiels",
    "interventions",
    "maintenance",
    "stocks",
  ];

  return (

    <div className="space-y-3">

      {collections.map((collection) => (

        <div
          key={collection}
          className="
            flex
            items-center
            justify-between
            rounded-2xl
            border
            border-slate-200
            bg-white
            px-5
            py-4
            shadow-sm
          "
        >

          <div>

            <p
              className="
                text-sm
                font-semibold
                text-slate-900
              "
            >
              {collection}
            </p>

            <p
              className="
                mt-1
                text-xs
                text-slate-500
              "
            >
              Firestore synchronized
            </p>

          </div>

          <ERPHealthBadge health="healthy" />

        </div>

      ))}

    </div>

  );
}