interface TenantGuardProps {

  utilisateurOrganisationId?: string;

  resourceOrganisationId?: string;

  children: React.ReactNode;
}

export const TenantGuard = ({
  utilisateurOrganisationId,
  resourceOrganisationId,
  children,
}: TenantGuardProps) => {

  if (
    utilisateurOrganisationId !==
    resourceOrganisationId
  ) {

    return (

      <div className="
        p-6
        bg-red-50
        border
        border-red-300
        rounded-2xl
        text-red-700
      ">

        Accès refusé

      </div>
    );
  }

  return <>{children}</>;
}
