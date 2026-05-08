export function formatDate(date: Date): string {
  return new Intl.DateTimeFormat("fr-FR").format(date);
}
