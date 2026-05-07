"use client";

export function ERPRelationsGraph() {

  const relations = [
    {
      source: "Exploitation",
      target: "Terrains",
    },
    {
      source: "Terrains",
      target: "Matériels",
    },
    {
      source: "Matériels",
      target: "Interventions",
    },
    {
      source: "Interventions",
      target: "Maintenance",
    },
    {
      source: "Maintenance",
      target: "Stocks",
    },
  ];

  return (

    <div className="space-y-4">

      {relations.map((relation) => (

        <div
          key={`${relation.source}-${relation.target}`}
          className="
            flex
            items-center
            gap-4
            rounded-2xl
            border
            border-slate-200
            bg-white
            p-5
            shadow-sm
          "
        >

          <div
            className="
              rounded-xl
              bg-slate-900
              px-4
              py-2
              text-sm
              font-semibold
              text-white
            "
          >
            {relation.source}
          </div>

          <div className="flex-1 border-t border-dashed border-slate-300" />

          <div
            className="
              rounded-xl
              bg-slate-100
              px-4
              py-2
              text-sm
              font-semibold
              text-slate-900
            "
          >
            {relation.target}
          </div>

        </div>

      ))}

    </div>

  );
}