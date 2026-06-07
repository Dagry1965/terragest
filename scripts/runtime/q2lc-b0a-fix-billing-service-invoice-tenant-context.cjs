const fs = require("fs");
const path = require("path");

const root = process.cwd();
const file = "src/runtime/billing/RuntimeBillingService.ts";
const fullPath = path.join(root, file);

let content = fs.readFileSync(fullPath, "utf8");
const before = content;

if (!content.includes("Q2_L_C_B0_INVOICE_TENANT_CONTEXT")) {
  content = content.replace(
`      const numeroFacture =
        \`FAC-\${Date.now()}\`;

      const createdFacture =
        await RuntimeDataBinding.create(
          facturesModule,
          {
            numeroFacture,`,
`      const numeroFacture =
        \`FAC-\${Date.now()}\`;

      // Q2_L_C_B0_INVOICE_TENANT_CONTEXT
      // Invoice header must inherit the tenant/workspace context from its source intervention.
      const invoiceTenantId =
        String(intervention.tenantId ?? "");

      const invoiceWorkspace =
        String(intervention.workspace ?? "amarkhys");

      const invoiceUserId =
        String(
          (params.user as Record<string, unknown> | undefined)?.id ??
          (params.user as Record<string, unknown> | undefined)?.uid ??
          intervention.userId ??
          "system"
        );

      const createdFacture =
        await RuntimeDataBinding.create(
          facturesModule,
          {
            tenantId: invoiceTenantId,
            workspace: invoiceWorkspace,
            userId: invoiceUserId,
            moduleKey: "facturesauto",
            contextPath: \`\${invoiceTenantId}/\${invoiceWorkspace}/facturesauto\`,
            numeroFacture,`
  );
}

if (content === before) {
  console.log("[UNCHANGED]", file);
} else {
  fs.writeFileSync(fullPath, content, "utf8");
  console.log("[UPDATED]", file);
}

console.log("[Q2-L-C-B0A] Done");