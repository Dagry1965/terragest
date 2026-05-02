"use client";

interface OrganisationSwitcherProps {

  organisations: any[];

  currentOrganisationId?: string;

  onChange: (
    organisationId: string
  ) => void;
}

export const OrganisationSwitcher = ({
  organisations,
  currentOrganisationId,
  onChange,
}: OrganisationSwitcherProps) => {

  return (

    <select
      value={currentOrganisationId}
      onChange={(e) =>
        onChange(
          e.target.value
        )
      }
      className="
        border
        rounded-xl
        px-4
        py-3
        bg-white
      "
    >

      {organisations.map(
        (organisation) => (

          <option
            key={organisation.id}
            value={organisation.id}
          >

            {organisation.nom}

          </option>

        )
      )}

    </select>
  );
}
