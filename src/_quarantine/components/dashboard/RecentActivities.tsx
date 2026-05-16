const activities = [
  "Ajout d'un nouveau produit",
  "Mise à jour du stock",
  "Création d'une exploitation",
  "Maintenance matériel",
];

export const RecentActivities =
() => {

  return (
    <div
      className="
        bg-white
        rounded-2xl
        p-6
        border
        shadow-sm
      "
    >
      <h3
        className="
          text-xl
          font-semibold
          mb-4
        "
      >
        Activités Récentes
      </h3>

      <div className="space-y-3">

        {activities.map(
          (activity, index) => (

          <div
            key={index}
            className="
              p-3
              rounded-xl
              bg-gray-50
            "
          >
            {activity}
          </div>
        ))}
      </div>
    </div>
  );
};