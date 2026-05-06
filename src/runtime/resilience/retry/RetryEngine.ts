export type RetryOptions = {
  maxAttempts?: number;
  delayMs?: number;
};

export class RetryEngine {

  async execute<T>(
    action: () => Promise<T>,
    options: RetryOptions = {}
  ): Promise<T> {

    const maxAttempts =
      options.maxAttempts ?? 3;

    const delayMs =
      options.delayMs ?? 500;

    let lastError:
      unknown;

    for (
      let attempt = 1;
      attempt <= maxAttempts;
      attempt++
    ) {

      try {

        return await action();

      } catch (error) {

        lastError = error;

        if (attempt < maxAttempts) {

          await new Promise(resolve =>
            setTimeout(
              resolve,
              delayMs * attempt
            )
          );
        }
      }
    }

    throw lastError;
  }
}