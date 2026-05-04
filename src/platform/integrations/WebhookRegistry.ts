// src/platform/integrations/WebhookRegistry.ts

export interface ERPWebhook {

  name: string;

  endpoint: string;

  event: string;
}

class WebhookRegistryManager {

  private webhooks:
    ERPWebhook[] = [];

  register(
    webhook: ERPWebhook
  ) {

    console.log(
      "[WEBHOOK REGISTERED]",
      webhook.name
    );

    this.webhooks.push(
      webhook
    );
  }

  getWebhooks() {

    return this.webhooks;
  }
}

export const WebhookRegistry =
  new WebhookRegistryManager();