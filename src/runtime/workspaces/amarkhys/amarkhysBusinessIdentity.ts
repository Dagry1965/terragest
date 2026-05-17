export const AMARKHYS_BUSINESS_IDENTITY = {
  displayName: "AMARKHYS Garage",
  legalName: "AMARKHYS Garage",
  phone: "+2250700000000",
  whatsapp: "+2250700000000",
  email: "contact@amarkhys.com",
  address: "Abidjan",
  cityCountry: "Côte d’Ivoire",
  slogan: "L’excellence automobile au service de votre véhicule",
} as const;

export function buildAmarkhysTelHref(): string {
  return "tel:" + AMARKHYS_BUSINESS_IDENTITY.phone;
}

export function buildAmarkhysWhatsAppHref(
  message = ""
): string {
  const phone =
    AMARKHYS_BUSINESS_IDENTITY.whatsapp.replace(/[^0-9]/g, "");

  return "https://wa.me/" + phone + (
    message
      ? "?text=" + encodeURIComponent(message)
      : ""
  );
}

export function buildAmarkhysContactLabel(): string {
  return [
    AMARKHYS_BUSINESS_IDENTITY.phone,
    AMARKHYS_BUSINESS_IDENTITY.email,
    AMARKHYS_BUSINESS_IDENTITY.address,
    AMARKHYS_BUSINESS_IDENTITY.cityCountry,
  ]
    .filter(Boolean)
    .join(" • ");
}
