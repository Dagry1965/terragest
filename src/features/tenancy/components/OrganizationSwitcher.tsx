"use client";

import { useTenant }
from "@/features/tenancy/hooks/useTenant";

export const OrganizationSwitcher =
() => {

  const {
    organizations,
    organization,
    setActiveOrganization,
  } = useTenant() as any;

  return (
    <div
      className="
        flex
        items-center
        gap-3
      "
    >
      <span
        className="
          text-sm
          text-gray-500
        "
      >
        Organisation
      </span>

      <select
        className="
          border
          rounded-xl
          px-3
          py-2
          bg-white
        "
        value={organization?.id}
        onChange={(e) => {

          const selected =
            organizations.find(
              (org: any) =>
                org.id ===
                e.target.value
            );

          if (selected) {

            setActiveOrganization(
              selected
            );
          }
        }}
      >
        {organizations.map(
          (org: any) => (

          <option
            key={org.id}
            value={org.id}
          >
            {org.name}
          </option>
        ))}
      </select>
    </div>
  );
};