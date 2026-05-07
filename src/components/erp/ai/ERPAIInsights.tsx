"use client";

export function ERPAIInsights() {

  const insights = [
    {
      title: "Maintenance prédictive",
      description:
        "Le matériel TR-204 présente un risque élevé de panne.",
    },
    {
      title: "Optimisation exploitation",
      description:
        "Le rendement de Ferme Nord peut être amélioré de 12%.",
    },
    {
      title: "Analyse stock",
      description:
        "Réapprovisionnement recommandé pour 3 produits.",
    },
    {
      title: "Performance workflow",
      description:
        "Les validations superviseur ralentissent les interventions.",
    },
  ];

  return (

    <div className="space-y-4">

      {insights.map((insight) => (

        <div
          key={insight.title}
          className="
            rounded-2xl
            border
            border-slate-200
            bg-white
            p-5
            shadow-sm
          "
        >

          <p
            className="
              text-sm
              font-semibold
              text-slate-900
            "
          >
            {insight.title}
          </p>

          <p
            className="
              mt-2
              text-sm
              text-slate-500
            "
          >
            {insight.description}
          </p>

        </div>

      ))}

    </div>

  );
}