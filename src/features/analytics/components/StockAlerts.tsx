"use client";

interface Produit {

  id: string;

  nom: string;

  stockActuel: number;

  seuilAlerte: number;
}

interface Props {

  produits: Produit[];
}

export function
StockAlerts({

  produits

}: Props) {

  const alerts =
    produits.filter(

      (produit) =>

        produit.stockActuel <=
        produit.seuilAlerte
    );

  if (alerts.length === 0) {

    return (

      <div
        className="
          bg-white
          rounded-2xl
          shadow-md
          p-6
        "
      >

        <h2
          className="
            text-xl
            font-bold
            mb-4
          "
        >
          Alertes Stock
        </h2>

        <p>
          Aucun stock critique
        </p>

      </div>
    );
  }

  return (

    <div
      className="
        bg-white
        rounded-2xl
        shadow-md
        p-6
      "
    >

      <h2
        className="
          text-xl
          font-bold
          mb-4
        "
      >
        Alertes Stock
      </h2>

      <div className="space-y-3">

        {
          alerts.map(
            (produit) => (

              <div

                key={produit.id}

                className="
                  border
                  rounded-xl
                  p-4
                  flex
                  justify-between
                "
              >

                <span>
                  {produit.nom}
                </span>

                <span>
                  {
                    produit.stockActuel
                  }
                </span>

              </div>
            )
          )
        }

      </div>

    </div>
  );
}