// src/platform/integrations/WebhookDispatcher.ts

import { WebhookRegistry }
from "@/platform/integrations/WebhookRegistry";

export class WebhookDispatcher {

  static async dispatch(

    event: string,

    payload?: unknown
  ) {

    const webhooks =
      WebhookRegistry
        .getWebhooks()
        .filter(
          webhook =>
            webhook.event === event
        );

    for (const webhook of webhooks) {

      console.log(
        "[WEBHOOK DISPATCH]",
        webhook.endpoint,
        payload
      );

      await Promise.resolve();
    }
  }
}