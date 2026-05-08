export class ContextResolver {

  resolve(
    payload?: unknown
  ) {

    console.log(
      "[ContextResolver]",
      payload
    );

    return payload;
  }
}
