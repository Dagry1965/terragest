const fs = require("fs");
const path = require("path");

const ROOT = process.cwd();

const rel = "src/components/erp/operational/ERPOperationalTreeView.tsx";
const file = path.join(ROOT, rel);

if (!fs.existsSync(file)) {
  throw new Error("File not found: " + rel);
}

const original = fs.readFileSync(file, "utf8");
fs.writeFileSync(file + ".bak-q2i-dd1-fix-tree-view-return-context", original, "utf8");

let next = original;

const importAnchor = 'import { operationalUiTokens } from "./operationalUiTokens";';
const returnImport =
  'import { appendRuntimeReturnContext } from "@/runtime/navigation/RuntimeReturnContextBuilder";';

if (!next.includes(returnImport)) {
  if (!next.includes(importAnchor)) {
    throw new Error("Import anchor not found: " + importAnchor);
  }

  next = next.replace(importAnchor, importAnchor + "\n" + returnImport);
  console.log("[ADDED] appendRuntimeReturnContext import");
} else {
  console.log("[SKIP] appendRuntimeReturnContext already imported");
}

const oldBlock = `function buildOpenHref(
  node: RuntimeOperationalTreeNode,
  currentReturnTo?: string,
  currentReturnLabel?: string
): string | null {
  const href = getNodeHref(node);

  if (!href) {
    return null;
  }

  void currentReturnTo;
  void currentReturnLabel;

  return href;
}`;

const newBlock = `function buildOpenHref(
  node: RuntimeOperationalTreeNode,
  currentReturnTo?: string,
  currentReturnLabel?: string
): string | null {
  const href = getNodeHref(node);

  if (!href) {
    return null;
  }

  if (!currentReturnTo && !currentReturnLabel) {
    return href;
  }

  return appendRuntimeReturnContext({
    destinationHref: href,
    returnTo: currentReturnTo,
    returnLabel: currentReturnLabel,
    sourceModule: node.moduleKey,
    sourceRecordId: node.recordId,
    expandedRecordId: node.recordId,
    scrollTargetId: node.recordId,
  });
}`;

if (!next.includes(oldBlock)) {
  throw new Error("buildOpenHref block not found. Refusing unsafe patch.");
}

next = next.replace(oldBlock, newBlock);

if (/void currentReturnTo|void currentReturnLabel/.test(next)) {
  throw new Error("Unused return context markers still present.");
}

if (!/appendRuntimeReturnContext/.test(next)) {
  throw new Error("appendRuntimeReturnContext was not wired.");
}

if (/AMARKHYS|ORG_AMARKHYS_001|amarkhys/.test(next)) {
  throw new Error("Hardcoded AMARKHYS context detected.");
}

fs.writeFileSync(file, next, "utf8");

console.log("[DONE] Q2-I-D-D1 tree view return context fixed.");
console.log("[WRITTEN]", rel);
