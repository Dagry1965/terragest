export interface ERPBusinessMetric {

  key:
    string;

  label:
    string;

  value:
    number;

  href?:
    string;
}


export interface ERPBusinessDashboardMetrics {

  workspace:
    string;

  metrics:
    ERPBusinessMetric[];

}