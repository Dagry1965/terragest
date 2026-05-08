import {
  RuntimeWebSocketServer
}
from "../websocket/RuntimeWebSocketServer";

import {
  LiveNotificationService
}
from "../notifications/LiveNotificationService";

export class
RuntimeRealtimeGateway {

  private websocket =
    new RuntimeWebSocketServer();

  private notifications =
    new LiveNotificationService();

  publish(
    event: string,
    payload?: unknown
  ) {

    this.websocket.broadcast(
      event,
      payload
    );

    this.notifications.notify(
      event,
      payload
    );

    console.log(
      "[Realtime Gateway]",
      event
    );
  }
}
