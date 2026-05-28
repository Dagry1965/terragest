const fs = require("fs");
const path = require("path");

const ROOT = process.cwd();

const pageRel = "src/components/erp/operational/ERPOperationalModulePage.tsx";
const tableRel = "src/components/erp/operational/ERPOperationalTable.tsx";
const expandedRel = "src/components/erp/operational/ERPOperationalExpandedChildren.tsx";

const pageFile = path.join(ROOT, pageRel);
const tableFile = path.join(ROOT, tableRel);
const expandedFile = path.join(ROOT, expandedRel);

for (const file of [pageFile, tableFile, expandedFile]) {
  if (!fs.existsSync(file)) {
    throw new Error("File not found: " + file);
  }
}

function backup(file, suffix) {
  fs.writeFileSync(file + suffix, fs.readFileSync(file, "utf8"), "utf8");
  console.log("[BACKUP]", path.relative(ROOT, file + suffix));
}

/**
 * 1. Remonter encore plus toute la page opérationnelle.
 */
{
  backup(pageFile, ".bak-q2a-e5-lift-operational-page-more");

  let content = fs.readFileSync(pageFile, "utf8");

  content = content
    .replace('className="-mt-20 space-y-3"', 'className="-mt-36 space-y-3"')
    .replace('className="-mt-32 space-y-3"', 'className="-mt-36 space-y-3"')
    .replace('className="-mt-8 space-y-3"', 'className="-mt-36 space-y-3"')
    .replace('className="-mt-3 space-y-4"', 'className="-mt-36 space-y-3"')
    .replace('className="space-y-5"', 'className="-mt-36 space-y-3"');

  fs.writeFileSync(pageFile, content, "utf8");
  console.log("[WRITTEN]", pageRel);
}

/**
 * 2. Retirer la colonne Actions de la table principale.
 */
{
  backup(tableFile, ".bak-q2a-e5-remove-main-actions-column");

  let content = fs.readFileSync(tableFile, "utf8");

  // Retirer le header Actions.
  content = content.replace(
    /\s*<th className="whitespace-nowrap px-5 py-3\.5 text-right text-\[11px\] font-black uppercase tracking-\[0\.16em\] text-slate-500">\s*Actions\s*<\/th>/,
    ""
  );

  // Retirer la cellule bouton Ouvrir principale.
  content = content.replace(
    /\s*<td className="whitespace-nowrap px-5 py-4 text-right">\s*<button[\s\S]*?<\/button>\s*<\/td>/,
    ""
  );

  // Ajuster colspan empty state.
  content = content.replace(
    /colSpan=\{columns\.length \+ 2\}/g,
    "colSpan={columns.length + (hasExpandableChildren ? 1 : 0)}"
  );

  // Ajuster colspan expanded.
  content = content.replace(
    /colSpan=\{columns\.length \+ \(hasExpandableChildren \? 2 : 1\)\}/g,
    "colSpan={columns.length + (hasExpandableChildren ? 1 : 0)}"
  );

  if (content.includes(">Actions</th>")) {
    throw new Error("La colonne Actions est encore présente.");
  }

  fs.writeFileSync(tableFile, content, "utf8");
  console.log("[WRITTEN]", tableRel);
}

/**
 * 3. Ajouter des boutons de navigation génériques dans l'expand.
 * Cela couvre Intervention, Facture et tout autre enfant runtime.
 */
{
  backup(expandedFile, ".bak-q2a-e5-expanded-navigation-buttons");

  let content = fs.readFileSync(expandedFile, "utf8");

  if (!content.includes('import Link from "next/link";')) {
    content = content.replace(
      'import { useEffect, useMemo, useState } from "react";',
      'import { useEffect, useMemo, useState } from "react";\nimport Link from "next/link";'
    );
  }

  if (!content.includes("function getOpenLabel")) {
    const marker = "function getRecordId(record: Record<string, unknown>): string {";

    const helper = `
function getOpenLabel(moduleKey: string): string {
  if (moduleKey === "interventionsauto") {
    return "Ouvrir intervention";
  }

  if (moduleKey === "facturesauto") {
    return "Ouvrir facture";
  }

  return "Ouvrir";
}

function buildRecordHref(moduleKey: string, record: Record<string, unknown>): string {
  const id = getRecordId(record);

  if (!id) {
    return "#";
  }

  return "/" + moduleKey + "/" + id + "/edit";
}

`;

    const index = content.indexOf(marker);

    if (index < 0) {
      throw new Error("Point insertion introuvable: getRecordId");
    }

    content = content.slice(0, index) + helper + content.slice(index);
  }

  // Ajouter bouton sur l'intervention / enfant direct.
  if (!content.includes("Q2A_E5_DIRECT_CHILD_OPEN_BUTTON")) {
    content = content.replace(
      /<div className="grid gap-2 md:grid-cols-4">\s*\{fields\.map\(\(fieldKey\) => \{/,
      `<div className="mb-3 flex justify-end">
                        <Link
                          href={buildRecordHref(group.module.metadata.key, record)}
                          className="rounded-2xl border border-emerald-200 bg-white px-3 py-2 text-xs font-black text-emerald-700 transition hover:bg-emerald-50"
                        >
                          {getOpenLabel(group.module.metadata.key)}
                        </Link>
                      </div>
                      {/* Q2A_E5_DIRECT_CHILD_OPEN_BUTTON */}
                      <div className="grid gap-2 md:grid-cols-4">
                        {fields.map((fieldKey) => {`
    );
  }

  // Ajouter colonne Action sur les petits-enfants.
  if (!content.includes("Q2A_E5_GRANDCHILD_OPEN_HEADER")) {
    content = content.replace(
      /\{grandchildFields\.map\(\(fieldKey\) => \{\s*const field = getField\(\s*grandchildGroup\.module,\s*fieldKey\s*\);\s*return \(\s*<th[\s\S]*?<\/th>\s*\);\s*\}\)\}/,
      `{grandchildFields.map((fieldKey) => {
                                          const field = getField(
                                            grandchildGroup.module,
                                            fieldKey
                                          );

                                          return (
                                            <th
                                              key={fieldKey}
                                              className="px-3 py-2 font-black uppercase tracking-wide text-slate-400"
                                            >
                                              {field?.label ?? fieldKey}
                                            </th>
                                          );
                                        })}

                                        <th className="px-3 py-2 text-right font-black uppercase tracking-wide text-slate-400">
                                          Action
                                        </th>
                                        {/* Q2A_E5_GRANDCHILD_OPEN_HEADER */}`
    );
  }

  if (!content.includes("Q2A_E5_GRANDCHILD_OPEN_BUTTON")) {
    content = content.replace(
      /\{grandchildFields\.map\(\(fieldKey\) => \{\s*const field = getField\(\s*grandchildGroup\.module,\s*fieldKey\s*\);[\s\S]*?<\/td>\s*\);\s*\}\)\}/,
      `{grandchildFields.map((fieldKey) => {
                                            const field = getField(
                                              grandchildGroup.module,
                                              fieldKey
                                            );

                                            if (!field) return null;

                                            return (
                                              <td
                                                key={fieldKey}
                                                className="px-3 py-2 font-semibold text-slate-700"
                                              >
                                                <ERPRuntimeFieldValue
                                                  field={field}
                                                  value={line[fieldKey]}
                                                />
                                              </td>
                                            );
                                          })}

                                          <td className="px-3 py-2 text-right">
                                            <Link
                                              href={buildRecordHref(grandchildGroup.module.metadata.key, line)}
                                              className="rounded-xl border border-emerald-200 bg-white px-2.5 py-1.5 text-[11px] font-black text-emerald-700 transition hover:bg-emerald-50"
                                            >
                                              {getOpenLabel(grandchildGroup.module.metadata.key)}
                                            </Link>
                                          </td>
                                          {/* Q2A_E5_GRANDCHILD_OPEN_BUTTON */}`
    );
  }

  const problems = [];

  if (!content.includes('import Link from "next/link";')) {
    problems.push("Import Link absent");
  }

  if (!content.includes("getOpenLabel")) {
    problems.push("getOpenLabel absent");
  }

  if (!content.includes("buildRecordHref")) {
    problems.push("buildRecordHref absent");
  }

  if (!content.includes("Q2A_E5_DIRECT_CHILD_OPEN_BUTTON")) {
    problems.push("Bouton enfant direct absent");
  }

  if (problems.length > 0) {
    console.log("[FAIL]");
    for (const problem of problems) console.log(" - " + problem);
    process.exit(1);
  }

  fs.writeFileSync(expandedFile, content, "utf8");
  console.log("[WRITTEN]", expandedRel);
}

console.log("");
console.log("[DONE] Q2-A-E5 layout haut + table sans actions + navigation expand.");
console.log("");
console.log("Next:");
console.log("pnpm build");
