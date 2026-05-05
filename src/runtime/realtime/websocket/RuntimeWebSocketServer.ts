export class
RuntimeWebSocketServer {

  start() {

    console.log(
      "[Realtime] WebSocket server started"
    );
  }

  broadcast(
    channel: string,
    payload?: unknown
  ) {

    console.log(
      "[Realtime Broadcast]",
      channel,
      payload
    );
  }
}
