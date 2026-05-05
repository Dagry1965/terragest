export class EventBus {

  emit(event: string, payload?: unknown) {
    console.log("[EventBus]", event, payload);
  }
}
