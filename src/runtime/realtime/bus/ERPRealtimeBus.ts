import type {
  ERPRealtimeMessage,
  ERPRealtimeChannelType,
} from "../channels/ERPRealtimeChannel";

type ERPRealtimeSubscriber = (
  message: ERPRealtimeMessage
) => void;

class ERPRealtimeBusClass {
  private messages: ERPRealtimeMessage[] = [];
  private subscribers: ERPRealtimeSubscriber[] = [];

  publish(message: ERPRealtimeMessage) {
    this.messages.unshift(message);
    this.messages = this.messages.slice(0, 300);

    for (const subscriber of this.subscribers) {
      subscriber(message);
    }
  }

  subscribe(subscriber: ERPRealtimeSubscriber) {
    this.subscribers.push(subscriber);

    return () => {
      this.subscribers =
        this.subscribers.filter((item) => item !== subscriber);
    };
  }

  all() {
    return this.messages;
  }

  byChannel(channel: ERPRealtimeChannelType) {
    return this.messages.filter(
      (message) => message.channel === channel
    );
  }
}

export const ERPRealtimeBus =
  new ERPRealtimeBusClass();