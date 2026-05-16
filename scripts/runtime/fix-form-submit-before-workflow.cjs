const fs = require("fs");
const path = require("path");

const ROOT = process.cwd();

const runtimePagePath = path.join(
  ROOT,
  "src/components/erp/runtime/ERPRuntimePage.tsx"
);

const formPath = path.join(
  ROOT,
  "src/components/erp/forms/enterprise/ERPEnterpriseForm.tsx"
);

function read(file) {
  if (!fs.existsSync(file)) {
    throw new Error(`File not found: ${file}`);
  }

  return fs.readFileSync(file, "utf8");
}

function write(file, content) {
  fs.writeFileSync(file, content, "utf8");
}

function backup(file) {
  const backupPath = `${file}.bak-workflow-submit`;
  if (!fs.existsSync(backupPath)) {
    fs.copyFileSync(file, backupPath);
  }
}

backup(runtimePagePath);
backup(formPath);

let runtimePage = read(runtimePagePath);
let form = read(formPath);

const originalRuntimePage = runtimePage;
const originalForm = form;

// -----------------------------------------------------------------------------
// 1. ERPRuntimePage : les boutons workflow directs restent uniquement en DETAIL.
//    En EDIT, ils seront passés au formulaire pour déclencher submit + workflow.
// -----------------------------------------------------------------------------

runtimePage = runtimePage.replace(
  `{type !== "list" && runtimeActions.length > 0 && (`,
  `{type === "detail" && runtimeActions.length > 0 && (`
);

runtimePage = runtimePage.replace(
  `<ERPEnterpriseForm
            module={module}
            mode="edit"
            initialData={record}
          />`,
  `<ERPEnterpriseForm
            module={module}
            mode="edit"
            initialData={record}
            workflowActions={runtimeActions}
          />`
);

// -----------------------------------------------------------------------------
// 2. ERPEnterpriseForm : imports nécessaires.
// -----------------------------------------------------------------------------

form = form.replace(
  `import { useState } from "react";`,
  `import { useRef, useState } from "react";`
);

if (!form.includes(`RuntimeActionEngine`)) {
  form = form.replace(
    `import { RuntimeDataBinding } from "@/runtime/data-binding";`,
    `import { RuntimeDataBinding } from "@/runtime/data-binding";
import { RuntimeActionEngine } from "@/runtime/actions/RuntimeActionEngine";`
  );
}

if (!form.includes(`ERPModuleAction`)) {
  form = form.replace(
    `import type { ERPModule } from "@/runtime/modules";`,
    `import type { ERPModule } from "@/runtime/modules";
import type { ERPModuleAction } from "@/runtime/modules/ERPModule";`
  );
}

// -----------------------------------------------------------------------------
// 3. ERPEnterpriseFormProps : ajout workflowActions.
// -----------------------------------------------------------------------------

if (!form.includes(`workflowActions?: ERPModuleAction[];`)) {
  form = form.replace(
    /(interface ERPEnterpriseFormProps\s*{[\s\S]*?)(\n})/,
    `$1
  workflowActions?: ERPModuleAction[];$2`
  );
}

// -----------------------------------------------------------------------------
// 4. Destructuring des props : ajout workflowActions = [].
// -----------------------------------------------------------------------------

form = form.replace(
  /(export function ERPEnterpriseForm\s*\(\s*{\s*[\s\S]*?returnTo,)(\s*}\s*:\s*ERPEnterpriseFormProps\s*\))/,
  `$1
  workflowActions = [],$2`
);

// Fallback si returnTo n'est pas dans le destructuring.
if (!form.includes(`workflowActions = []`)) {
  form = form.replace(
    /(export function ERPEnterpriseForm\s*\(\s*{\s*[\s\S]*?initialData[^,]*,)(\s*}\s*:\s*ERPEnterpriseFormProps\s*\))/,
    `$1
  workflowActions = [],$2`
  );
}

// -----------------------------------------------------------------------------
// 5. Refs workflow : le bouton workflow déclenchera requestSubmit().
// -----------------------------------------------------------------------------

if (!form.includes(`pendingWorkflowActionRef`)) {
  form = form.replace(
    `  const router = useRouter();`,
    `  const router = useRouter();

  const formRef =
    useRef<HTMLFormElement | null>(null);

  const pendingWorkflowActionRef =
    useRef<ERPModuleAction | null>(null);`
  );
}

// -----------------------------------------------------------------------------
// 6. Dans handleSubmit : capturer l'action workflow demandée.
// -----------------------------------------------------------------------------

if (!form.includes(`const workflowAction = pendingWorkflowActionRef.current;`)) {
  form = form.replace(
    /(async function handleSubmit[\s\S]*?{\s*[\s\S]*?setSaving\(true\);\s*)/,
    `$1

    const workflowAction =
      pendingWorkflowActionRef.current;
`
  );
}

// Si validation échoue : annuler l'action workflow en attente.
form = form.replace(
  `    if (validationErrors.length > 0) {
      setSaving(false);
      return;
    }`,
  `    if (validationErrors.length > 0) {
      pendingWorkflowActionRef.current = null;
      setSaving(false);
      return;
    }`
);

form = form.replace(
  `      setSaving(false);
      return;
    }
  }`,
  `      pendingWorkflowActionRef.current = null;
      setSaving(false);
      return;
    }
  }`
);

// -----------------------------------------------------------------------------
// 7. Sauvegarde : construire savedRecord après create/update.
// -----------------------------------------------------------------------------

if (!form.includes(`let savedRecord: Record<string, unknown> | null = null;`)) {
  form = form.replace(
    `    try {
      if (mode === "create") {`,
    `    try {
      let savedRecord: Record<string, unknown> | null = null;

      if (mode === "create") {`
  );
}

form = form.replace(
  `        const created =
          await RuntimeDataBinding.create(
            module,
            preparedPayload
          );`,
  `        const created =
          await RuntimeDataBinding.create(
            module,
            preparedPayload
          );

        savedRecord = {
          ...preparedPayload,
          ...(created && typeof created === "object"
            ? created
            : {}),
        };`
);

form = form.replace(
  `        await RuntimeDataBinding.update(
          module,
          String(recordId),
          preparedPayload
        );`,
  `        const updated =
          await RuntimeDataBinding.update(
            module,
            String(recordId),
            preparedPayload
          );

        savedRecord = {
          ...initialData,
          ...preparedPayload,
          id: String(recordId),
          ...(updated && typeof updated === "object"
            ? updated
            : {}),
        };`
);

// -----------------------------------------------------------------------------
// 8. Après sauvegarde OK : si workflowAction existe, exécuter workflow puis retour.
// -----------------------------------------------------------------------------

if (!form.includes(`RuntimeActionEngine.execute({`)) {
  form = form.replace(
    `      router.push(
        returnTo ??
          module.metadata.routes?.list ??
          \`/\${module.metadata.key}\`
      );`,
    `      if (workflowAction && savedRecord) {
        const workflowResult =
          await RuntimeActionEngine.execute({
            module,
            action: workflowAction,
            record: savedRecord,
          });

        pendingWorkflowActionRef.current = null;

        if (!workflowResult?.success) {
          setErrors([
            {
              field: "workflow",
              message:
                workflowResult?.message ??
                "Action workflow impossible.",
            },
          ]);

          setSaving(false);
          return;
        }
      }

      router.push(
        returnTo ??
          module.metadata.routes?.list ??
          \`/\${module.metadata.key}\`
      );`
  );
}

// En cas d'erreur catch : nettoyer l'action en attente.
form = form.replace(
  `    } catch (error) {
      console.error(`,
  `    } catch (error) {
      pendingWorkflowActionRef.current = null;

      console.error(`
);

// -----------------------------------------------------------------------------
// 9. Le form reçoit une ref + boutons workflow dans le formulaire.
// -----------------------------------------------------------------------------

form = form.replace(
  `<form
      className="space-y-8"
      onSubmit={handleSubmit}
    >`,
  `<form
      ref={formRef}
      className="space-y-8"
      onSubmit={handleSubmit}
    >
      {mode === "edit" && workflowActions.length > 0 && (
        <section className="rounded-3xl border border-blue-100 bg-blue-50 p-4">
          <div className="mb-3">
            <p className="text-xs font-black uppercase tracking-wide text-blue-700">
              Workflow
            </p>
            <p className="text-sm text-blue-900">
              Ces actions enregistrent d'abord le formulaire, puis exécutent le workflow.
            </p>
          </div>

          <div className="flex flex-wrap gap-3">
            {workflowActions.map((action) => (
              <button
                key={action.key}
                type="button"
                onClick={() => {
                  pendingWorkflowActionRef.current = action;
                  formRef.current?.requestSubmit();
                }}
                className={\`
                  rounded-2xl
                  px-4
                  py-2
                  text-sm
                  font-bold
                  transition
                  \${
                    action.type === "danger"
                      ? "bg-red-600 text-white hover:bg-red-700"
                      : action.type === "secondary"
                        ? "bg-slate-200 text-slate-900 hover:bg-slate-300"
                        : "bg-slate-950 text-white hover:bg-slate-800"
                  }
                \`}
              >
                {action.label}
              </button>
            ))}
          </div>
        </section>
      )}`
);

// -----------------------------------------------------------------------------
// 10. Vérifications minimales.
// -----------------------------------------------------------------------------

if (runtimePage === originalRuntimePage && form === originalForm) {
  throw new Error("Aucune modification appliquée.");
}

if (!form.includes("requestSubmit")) {
  throw new Error("Patch incomplet : requestSubmit absent.");
}

if (!form.includes("RuntimeActionEngine.execute")) {
  throw new Error("Patch incomplet : RuntimeActionEngine.execute absent du formulaire.");
}

write(runtimePagePath, runtimePage);
write(formPath, form);

console.log("OK workflow formulaire corrigé.");
console.log("- ERPRuntimePage : boutons directs uniquement en detail, actions passées au formulaire edit.");
console.log("- ERPEnterpriseForm : workflow = submit + validation + save + action workflow + retour liste.");
