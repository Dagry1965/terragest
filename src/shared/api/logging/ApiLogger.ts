export const ApiLogger = {

  info(
    message: string
  ) {

    console.log(
      "[INFO]",
      message
    );
  },

  error(
    message: string
  ) {

    console.error(
      "[ERROR]",
      message
    );
  },

  warn(
    message: string
  ) {

    console.warn(
      "[WARN]",
      message
    );
  },
};
