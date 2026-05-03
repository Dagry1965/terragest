export const PUBLIC_ROUTES = [
  "/login",
  "/offline",
];

export function isPublicRoute(
  pathname: string
) {
  return PUBLIC_ROUTES.some(
    (route) =>
      pathname.startsWith(route)
  );
}