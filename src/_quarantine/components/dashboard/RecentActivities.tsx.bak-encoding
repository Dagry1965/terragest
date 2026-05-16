const activities = [
  "Ajout dâ€™un nouveau produit",
  "Mise Ã  jour du stock",
  "CrÃ©ation dâ€™une exploitation",
  "Maintenance matÃ©riel",
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
        ActivitÃ©s RÃ©centes
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