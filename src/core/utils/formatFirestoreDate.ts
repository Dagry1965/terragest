export function formatFirestoreDate(value: any): string {
  if (!value) return "";

  if (typeof value === "string") return value;
  if (value instanceof Date) return value.toLocaleDateString("fr-FR");

  if (typeof value === "object" && value !== null && "seconds" in value) {
    return new Date(value.seconds * 1000).toLocaleDateString("fr-FR");
  }

  return "";
}

export function formatDisplayValue(value: any): string {
  if (value === null || value === undefined) return "";

  if (typeof value === "string") return value;
  if (typeof value === "number") return String(value);
  if (typeof value === "boolean") return value ? "Oui" : "Non";

  if (typeof value === "object" && value !== null && "seconds" in value) {
    return formatFirestoreDate(value);
  }

  if (Array.isArray(value)) {
    return value.map(formatDisplayValue).join(", ");
  }

  if (typeof value === "object") {
    return JSON.stringify(value);
  }

  return String(value);
}
