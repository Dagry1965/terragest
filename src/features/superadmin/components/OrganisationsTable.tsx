interface OrganisationsTableProps {

  organisations: any[];
}

export const OrganisationsTable = ({
  organisations,
}: OrganisationsTableProps) => {

  return (

    <div className="
      bg-white
      rounded-2xl
      shadow-md
      p-6
    ">

      <h2 className="
        text-2xl
        font-bold
        mb-6
      ">
        Organisations
      </h2>

      <div className="space-y-4">

        {organisations.map(
          (organisation) => (

            <div
              key={organisation.id}
              className="
                flex
                items-center
                justify-between
                border-b
                pb-3
              "
            >

              <div>

                <p className="font-bold">
                  {organisation.nom}
                </p>

                <p className="
                  text-sm
                  text-gray-500
                ">
                  {organisation.code}
                </p>

              </div>

              <div>

                {organisation.actif
                  ? (

                    <span className="
                      px-3
                      py-1
                      rounded-full
                      bg-green-100
                      text-green-700
                      text-sm
                      font-bold
                    ">
                      ACTIF
                    </span>

                  )

                  : (

                    <span className="
                      px-3
                      py-1
                      rounded-full
                      bg-red-100
                      text-red-700
                      text-sm
                      font-bold
                    ">
                      SUSPENDU
                    </span>

                  )}
              </div>

            </div>

          )
        )}

      </div>

    </div>
  );
}
