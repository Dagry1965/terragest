export const required = (
  value: string
) => {

  return value.trim() !== "";
};

export const minLength = (
  value: string,
  length: number
) => {

  return value.trim().length >= length;
};
