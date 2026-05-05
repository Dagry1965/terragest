export class EventSerializer {

  serialize(
    payload?: unknown
  ) {

    return JSON.stringify(
      payload
    );
  }

  deserialize(
    payload: string
  ) {

    return JSON.parse(
      payload
    );
  }
}
