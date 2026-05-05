// src/components/operations/OperationsMetrics.tsx

interface OperationsMetricsProps {

  materielsEnPanne: number;

  interventionsOuvertes: number;

  workflowsActifs: number;
}

export function OperationsMetrics({

  materielsEnPanne,

  interventionsOuvertes,

  workflowsActifs
}: OperationsMetricsProps) {

  const cards = [

    {

      label:
        "Matériels en panne",

      value:
        materielsEnPanne
    },

    {

      label:
        "Interventions ouvertes",

      value:
        interventionsOuvertes
    },

    {

      label:
        "Workflows actifs",

      value:
        workflowsActifs
    }
  ];

  return (

    <div
      className="
        grid
        grid-cols-1
        md:grid-cols-3
        gap-6
      "
    >

      {cards.map(card => (

        <div

          key={card.label}

          className="
            bg-white
            rounded-2xl
            shadow-sm
            p-6
          "
        >

          <div
            className="
              text-zinc-500
              mb-2
            "
          >
            {card.label}
          </div>

          <div
            className="
              text-4xl
              font-bold
            "
          >
            {card.value}
          </div>

        </div>
      ))}
    </div>
  );
}
