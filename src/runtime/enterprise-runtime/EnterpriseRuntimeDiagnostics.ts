import { EnterpriseRuntimeKernel } from "./EnterpriseRuntimeKernel";

export class EnterpriseRuntimeDiagnostics {
  static summary() {
    const services = EnterpriseRuntimeKernel.status();

    const healthy = services.filter((service) => service.status === "healthy").length;
    const warning = services.filter((service) => service.status === "warning").length;
    const critical = services.filter((service) => service.status === "critical").length;

    return {
      total: services.length,
      healthy,
      warning,
      critical,
      score: Math.round((healthy / services.length) * 100),
      services,
    };
  }
}