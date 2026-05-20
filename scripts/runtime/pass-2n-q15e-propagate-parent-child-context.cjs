const fs = require("fs");
const path = require("path");

const ROOT = process.cwd();

function read(file) {
  return fs.readFileSync(path.join(ROOT, file), "utf8");
}

function write(file, content) {
  fs.writeFileSync(path.join(ROOT, file), content, "utf8");
  console.log("[Q15E_WRITTEN]", file);
}

function backup(file) {
  const full = path.join(ROOT, file);
  const backupPath = full + ".bak-q15e-parent-child-context";
  if (!fs.existsSync(backupPath)) {
    fs.copyFileSync(full, backupPath);
    console.log("[Q15E_BACKUP]", backupPath);
  }
}

function replaceOnce(content, from, to, label) {
  if (!content.includes(from)) {
    throw new Error(`[Q15E_MISSING_PATTERN] ${label}`);
  }
  return content.replace(from, to);
}

/**
 * 1) ERPRelatedRecordsPanel
 * Ajoute parentModuleKey / parentRecordId / parentForeignKey dans l’URL de création enfant.
 */
function patchRelatedRecordsPanel() {
  const file = "src/components/erp/runtime/ERPRelatedRecordsPanel.tsx";
  backup(file);

  let content = read(file);

  const oldBlock = `  params.set(child.foreignKey, parentRecordId);
  params.set(
    "returnTo",
    "/" + parentModuleKey + "/" +
      parentRecordId +
      (mode === "edit" ? "/edit" : "")
  );
  params.set("lockFields", child.foreignKey);`;

  const altOldBlock = `  params.set(child.foreignKey, parentRecordId);
  params.set(
    "returnTo",
    "/" + parentModuleKey + "/" + parentRecordId + (mode === "edit" ? "/edit" : "")
  );
  params.set("lockFields", child.foreignKey);`;

  const newBlock = `  params.set(child.foreignKey, parentRecordId);

  // Q15E_PARENT_CHILD_CONTEXT
  // Transport générique du contexte parent vers la création enfant.
  params.set("parentModuleKey", parentModuleKey);
  params.set("parentRecordId", parentRecordId);
  params.set("parentForeignKey", child.foreignKey);

  params.set(
    "returnTo",
    "/" + parentModuleKey + "/" +
      parentRecordId +
      (mode === "edit" ? "/edit" : "")
  );

  params.set("lockFields", child.foreignKey);`;

  if (content.includes(oldBlock)) {
    content = content.replace(oldBlock, newBlock);
  } else if (content.includes(altOldBlock)) {
    content = content.replace(altOldBlock, newBlock);
  } else if (!content.includes("Q15E_PARENT_CHILD_CONTEXT")) {
    throw new Error("[Q15E] Impossible de localiser buildCreateHref dans ERPRelatedRecordsPanel.");
  }

  write(file, content);
}

/**
 * 2) ERPEnterpriseForm
 * Lit les query params parent/enfant côté client et les ajoute au payload.
 */
function patchEnterpriseForm() {
  const file = "src/components/erp/forms/enterprise/ERPEnterpriseForm.tsx";
  backup(file);

  let content = read(file);

  if (!content.includes("useSearchParams")) {
    content = content.replace(
      `import { useRouter } from "next/navigation";`,
      `import { useRouter, useSearchParams } from "next/navigation";`
    );
  }

  if (!content.includes("Q15E_PARENT_CHILD_FORM_CONTEXT")) {
    const routerPattern = `  const router = useRouter();`;

    const injected = `  const router = useRouter();
  const searchParams = useSearchParams();

  // Q15E_PARENT_CHILD_FORM_CONTEXT
  // Contexte parent transmis depuis ERPRelatedRecordsPanel.
  const parentModuleKey =
    searchParams.get("parentModuleKey") ?? "";

  const parentRecordId =
    searchParams.get("parentRecordId") ?? "";

  const parentForeignKey =
    searchParams.get("parentForeignKey") ?? "";

  const returnTo =
    searchParams.get("returnTo") ?? "";

  const lockFieldsParam =
    searchParams.get("lockFields") ?? "";

  const inheritedLockedFields =
    lockFieldsParam
      .split(",")
      .map((item) => item.trim())
      .filter(Boolean);`;

    content = replaceOnce(
      content,
      routerPattern,
      injected,
      "ERPEnterpriseForm router/search params"
    );
  }

  if (!content.includes("Q15E_PARENT_CHILD_PAYLOAD_CONTEXT")) {
    const oldPayloadMarker = `    const preparedPayload =`;

    const index = content.indexOf(oldPayloadMarker);
    if (index === -1) {
      throw new Error("[Q15E] Impossible de trouver preparedPayload.");
    }

    const insertAfterPreparedPayload = `

    // Q15E_PARENT_CHILD_PAYLOAD_CONTEXT
    // Si le formulaire enfant est ouvert depuis un parent, on impose le lien parent.
    if (
      mode === "create" &&
      parentModuleKey &&
      parentRecordId &&
      parentForeignKey
    ) {
      preparedPayload[parentForeignKey] =
        preparedPayload[parentForeignKey] ?? parentRecordId;

      preparedPayload.parentModuleKey =
        preparedPayload.parentModuleKey ?? parentModuleKey;

      preparedPayload.parentRecordId =
        preparedPayload.parentRecordId ?? parentRecordId;

      preparedPayload.parentForeignKey =
        preparedPayload.parentForeignKey ?? parentForeignKey;
    }
`;

    const setErrorsMarker = `    const validationErrors =`;
    content = replaceOnce(
      content,
      setErrorsMarker,
      insertAfterPreparedPayload + "\n" + setErrorsMarker,
      "ERPEnterpriseForm parent context payload injection"
    );
  }

  if (
    content.includes("const lockedFields =") &&
    !content.includes("Q15E_INHERITED_LOCKED_FIELDS")
  ) {
    content = content.replace(
      /const lockedFields =\s*([^;]+);/,
      `const lockedFields =
    Array.from(
      new Set([
        ...($1),
        ...inheritedLockedFields,
      ])
    );

  // Q15E_INHERITED_LOCKED_FIELDS`
    );
  }

  write(file, content);
}

/**
 * 3) RuntimeContextEnforcer
 * Préserve parentModuleKey / parentRecordId / parentForeignKey / parentId dans le record final.
 */
function patchRuntimeContextEnforcer() {
  const file = "src/runtime/context/RuntimeContextEnforcer.ts";
  backup(file);

  let content = read(file);

  if (content.includes("Q15E_PARENT_CONTEXT_FIELDS")) {
    write(file, content);
    return;
  }

  const marker = `      contextPath,`;

  const replacement = `      contextPath,

      // Q15E_PARENT_CONTEXT_FIELDS
      // Traçabilité générique parent/enfant.
      parentModuleKey:
        record.parentModuleKey ??
        context.parentModuleKey,

      parentRecordId:
        record.parentRecordId ??
        context.parentRecordId ??
        context.parentId,

      parentForeignKey:
        record.parentForeignKey ??
        context.parentForeignKey,

      parentId:
        record.parentId ??
        context.parentId ??
        record.parentRecordId ??
        context.parentRecordId,`;

  content = replaceOnce(
    content,
    marker,
    replacement,
    "RuntimeContextEnforcer contextPath"
  );

  write(file, content);
}

function main() {
  patchRelatedRecordsPanel();
  patchEnterpriseForm();
  patchRuntimeContextEnforcer();

  console.log("");
  console.log("[Q15E_DONE] Parent/child context propagation installed.");
  console.log("Next:");
  console.log("  node .\\scripts\\runtime\\check-encoding.cjs");
  console.log("  pnpm build");
}

main();