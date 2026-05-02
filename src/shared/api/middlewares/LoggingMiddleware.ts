export const LoggingMiddleware = {

  log(
    method: string,
    endpoint: string
  ) {

    console.log({

      method,

      endpoint,

      timestamp:
        new Date().toISOString(),
    });
  },
};
