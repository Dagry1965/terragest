"use client";

import {
  AppLayout,
} from "@/components/layout/AppLayout";

import {
  useRealtimeProducts,
} from "@/lib/firestore/hooks/useRealtimeProducts";

export default function RealtimeProductsPage() {

  const {
    products,
    loading,
  } =
    useRealtimeProducts();

  if (loading) {

    return (

      <AppLayout>

        <div className="
          p-10
        ">

          Loading realtime products...

        </div>

      </AppLayout>
    );
  }

  return (

    <AppLayout>

      <div className="
        p-10
        space-y-8
      ">

        <h1 className="
          text-5xl
          font-bold
        ">
          Realtime Products
        </h1>

        <div className="
          grid
          grid-cols-1
          md:grid-cols-2
          xl:grid-cols-3
          gap-6
        ">

          {products.map(
            (product) => (

              <div
                key={product.id}
                className="
                  bg-white
                  rounded-2xl
                  shadow-md
                  p-6
                "
              >

                <h2 className="
                  text-2xl
                  font-bold
                ">

                  {product.nom}

                </h2>

                <p className="
                  text-gray-500
                  mt-2
                ">

                  {product.categorie}

                </p>

              </div>

            )
          )}

        </div>

      </div>

    </AppLayout>
  );
}
