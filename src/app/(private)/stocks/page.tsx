"use client";

import {

  useEffect,

  useState

} from "react";

import {

  StockService

} from "@/features/stocks/services/StockService";

export default function StocksPage() {

  const [

    mouvements,

    setMouvements

  ] = useState<any[]>([]);

  useEffect(() => {

    load();

  }, []);

  const load =
    async () => {

      const data =

        await StockService
          .getAll();

      setMouvements(data);
    };

  return (

    <div className="p-10">

      <h1
        className="
          text-4xl
          font-bold
          mb-8
        "
      >
        Stocks
      </h1>

      <div
        className="
          bg-white
          rounded-2xl
          shadow-md
          p-6
        "
      >

        <div
          className="
            space-y-4
          "
        >

          {
            mouvements.map(

              (mouvement) => (

                <div

                  key={
                    mouvement.id
                  }

                  className="
                    border
                    rounded-xl
                    p-4
                  "
                >

                  <p>
                    {
                      mouvement.produitNom
                    }
                  </p>

                  <p>
                    {
                      mouvement.type
                    }
                  </p>

                  <p>
                    {
                      mouvement.quantite
                    }
                  </p>

                </div>
              )
            )
          }

        </div>

      </div>

    </div>
  );
}
