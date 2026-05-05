export default function
EnterpriseSidebar() {

  const items = [

    "Dashboard",
    "Exploitations",
    "Terrains",
    "MatÃ©riels",
    "Interventions",
    "Stocks",
    "Workflows",
    "Supervision",
    "Analytics",
    "Runtime",
  ];

  return (

    <aside
      className="
        w-72
        bg-slate-950
        text-white
        min-h-screen
        p-6
      "
    >

      <h1
        className="
          text-2xl
          font-bold
          mb-10
        "
      >
        TERRAGEST V2
      </h1>

      <div
        className="
          flex
          flex-col
          gap-4
        "
      >

        {items.map(item => (

          <div
            key={item}
            className="
              p-3
              rounded-xl
              hover:bg-slate-800
              cursor-pointer
            "
          >
            {item}
          </div>
        ))}

      </div>

    </aside>
  );
}
