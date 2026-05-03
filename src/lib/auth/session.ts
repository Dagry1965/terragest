export function isPublicRoute(
  pathname: string
) {
  const publicRoutes = [
    "/login",
    "/register",
  ];

  return publicRoutes.includes(
    pathname
  );
}