export const PUBLIC_ROUTES = [

  "/login",

  "/register",

  "/",
];

export function isPublicRoute(
  pathname: string
) {

  return PUBLIC_ROUTES.some(
    (route) => {

      if (
        route === "/"
      ) {

        return pathname === "/";
      }

      return pathname.startsWith(
        route
      );
    }
  );
}

export function isProtectedERPRoute(
  pathname: string
) {

  const protectedPrefixes = [

    "/dashboard",

    "/workspaces",

    "/terrains",

    "/exploitations",

    "/produits",

    "/stocks",

    "/materiels",

    "/maintenance",

    "/interventions",

    "/paiements",

    "/facturations",

    "/contrats",

    "/campagnes",

    "/budgets",

    "/admin",

    "/supervision",
  ];

  return protectedPrefixes.some(
    (prefix) =>
      pathname.startsWith(
        prefix
      )
  );
}