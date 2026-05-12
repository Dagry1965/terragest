export interface ERPBusinessMetric {
  key: string;
  label: string;
  value: number;
  href?: string;
}

export interface ERPBusinessDashboardMetrics {
  terrains: number;
  exploitations: number;
  contratsActifs: number;
  campagnesActives: number;
  stocksBas: number;
  actifsMaintenance: number;
}