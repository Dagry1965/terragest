export type PublicServiceCatalogItem = {
  id: string;
  code: string;
  label: string;
  category?: string;
  description?: string;
  durationMinutes: number;
  price?: number;
  order: number;
};

export type PublicServicesCatalogResult = {
  ok: true;
  services: PublicServiceCatalogItem[];
};
