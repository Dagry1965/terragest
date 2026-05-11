export class RuntimeVisibilityEngine {

  static isVisible(
    field: {
      visibility?: {
        field: string;
        equals?: unknown;
        notEquals?: unknown;
        in?: unknown[];
        notIn?: unknown[];
      };
    },
    values: Record<string, unknown>
  ) {

    const visibility =
      field.visibility;

    if (!visibility) {
      return true;
    }

    const currentValue =
      values[visibility.field];

    /*
     * EQUALS
     */

    if (
      visibility.equals !== undefined
    ) {
      return (
        currentValue ===
        visibility.equals
      );
    }

    /*
     * NOT EQUALS
     */

    if (
      visibility.notEquals !== undefined
    ) {
      return (
        currentValue !==
        visibility.notEquals
      );
    }

    /*
     * IN
     */

    if (
      visibility.in &&
      visibility.in.length > 0
    ) {
      return visibility.in.includes(
        currentValue
      );
    }

    /*
     * NOT IN
     */

    if (
      visibility.notIn &&
      visibility.notIn.length > 0
    ) {
      return !visibility.notIn.includes(
        currentValue
      );
    }

    return true;
  }
}