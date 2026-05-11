export class RuntimeComputedEngine {

  static compute(
    formula: string,
    values: Record<string, unknown>
  ) {

    try {

      const keys =
        Object.keys(values);

      const args =
        keys.map(
          (key) =>
            Number(values[key] ?? 0)
        );

      const fn =
        new Function(
          ...keys,
          `return ${formula};`
        );

      return fn(...args);

    } catch (error) {

      console.error(
        "RUNTIME COMPUTED ERROR",
        error
      );

      return null;
    }
  }
}