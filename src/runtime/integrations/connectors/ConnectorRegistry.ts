export class ConnectorRegistry {

  private connectors:
    string[] = [];

  register(
    connector: string
  ) {

    this.connectors.push(
      connector
    );

    console.log(
      "[Connector]",
      connector
    );
  }

  getAll() {

    return this.connectors;
  }
}
