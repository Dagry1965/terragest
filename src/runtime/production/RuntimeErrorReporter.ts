import { ProductionLogger } from "./ProductionLogger";

export class RuntimeErrorReporter {
  static capture(error: unknown, scope = "runtime") {
    const message =
      error instanceof Error
        ? error.message
        : "Erreur inconnue";

    return ProductionLogger.error(scope, message, {
      error,
    });
  }
}