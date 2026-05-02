export const ValidationService = {

  required(
    value: any,
    field: string
  ) {

    if (
      value === undefined ||
      value === null ||
      value === ""
    ) {

      throw new Error(
        `${field} is required`
      );
    }
  },

  email(
    value: string
  ) {

    const regex =
      /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (
      !regex.test(value)
    ) {

      throw new Error(
        "Invalid email"
      );
    }
  },
};
