import {
  RuntimeRealtimeGateway
}
from "../../../runtime/realtime/gateway/RuntimeRealtimeGateway";

export class
MaterielRealtimeGateway {

  private realtime =
    new RuntimeRealtimeGateway();

  publish(
    event: string,
    payload?: unknown
  ) {

    this.realtime.publish(
      event,
      payload
    );
  }
}
