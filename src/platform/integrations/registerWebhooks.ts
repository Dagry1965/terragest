// src/platform/integrations/registerWebhooks.ts

import { WebhookRegistry }
from "@/platform/integrations/WebhookRegistry";

export function registerERPWebhooks() {

  WebhookRegistry.register({

    name: "billing-webhook",

    endpoint:
      "https://billing.example.com",

    event:
      "paiement.created"
  });

  WebhookRegistry.register({

    name: "stock-webhook",

    endpoint:
      "https://stock.example.com",

    event:
      "stock.created"
  });
}