interface ActivityFeedProps {

  items: any[];
}

export const ActivityFeed = ({
  items,
}: ActivityFeedProps) => {

  return (

    <div className="
      bg-white
      rounded-2xl
      shadow-md
      p-6
    ">

      <h2 className="text-2xl font-bold">
        Activité récente
      </h2>

      <div className="mt-6 space-y-4">

        {items.map((item) => (

          <div
            key={item.id}
            className="
              border-b
              pb-3
            "
          >

            <p className="font-medium">

              {item.utilisateurNom}

              {" "}

              a effectué

              {" "}

              <span className="font-bold">
                {item.action}
              </span>

            </p>

            <p className="text-gray-500 text-sm">

              {item.module}

              {" • "}

              {item.cibleNom}

            </p>

          </div>

        ))}

      </div>

    </div>
  );
}
