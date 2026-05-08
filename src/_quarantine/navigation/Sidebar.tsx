"use client";

const items = [

  "Dashboard",

  "Exploitations",

  "Terrains",

  "Stocks",

  "Produits",

  "Interventions",

  "IoT",

  "Analytics",

  "Billing",

  "Security",
];

export const Sidebar = () => {

  return (

    <aside className="
      w-72
      bg-black
      text-white
      min-h-screen
      p-6
    ">

      <h1 className="
        text-3xl
        font-bold
        mb-10
      ">
        Terragest
      </h1>

      <nav className="
        space-y-3
      ">

        {items.map(
          (item) => (

            <div
              key={item}
              className="
                px-4
                py-3
                rounded-xl
                hover:bg-white/10
                cursor-pointer
              "
            >

              {item}

            </div>

          )
        )}

      </nav>

    </aside>
  );
}
