const fs = require("fs");
const path = require("path");

const ROOT = process.cwd();

const componentPath = path.join(
  ROOT,
  "src",
  "components",
  "erp",
  "operational",
  "ERPOperationalExpandedChildren.tsx"
);

function fail(message) {
  console.log("[FAIL]", message);
  process.exit(1);
}

if (!fs.existsSync(componentPath)) {
  fail("File not found: " + path.relative(ROOT, componentPath));
}

let content = fs.readFileSync(componentPath, "utf8");
const original = content;

const backupPath = componentPath + ".bak-q2f-d-b3-wire-children-resolver";
fs.writeFileSync(backupPath, original, "utf8");
console.log("[BACKUP]", path.relative(ROOT, backupPath));

function replaceOnce(source, search, replacement, label) {
  if (!source.includes(search)) {
    fail("Missing expected block: " + label);
  }

  return source.replace(search, replacement);
}

/**
 * 1. Imports
 */
content = content.replace(
  'import { RuntimeDataBinding } from "@/runtime/data-binding/RuntimeDataBinding";\n',
  ""
);

content = content.replace(
  'import { allERPModules } from "@/runtime/modules/definitions/coreModules";\n',
  ""
);

if (!content.includes('import { RuntimeOperationalChildrenResolver } from "@/runtime/operational";')) {
  content = replaceOnce(
    content,
    'import { ERPRuntimeFieldValue } from "@/components/erp/runtime/ERPRuntimeFieldValue";',
    'import { RuntimeOperationalChildrenResolver } from "@/runtime/operational";\nimport { ERPRuntimeFieldValue } from "@/components/erp/runtime/ERPRuntimeFieldValue";',
    "import marker"
  );
}

/**
 * 2. Remove getModule helper
 */
const oldGetModule = `function getModule(moduleKey: string): ERPModule | undefined {
  return allERPModules.find((module) => module.metadata.key === moduleKey);
}

`;

content = replaceOnce(content, oldGetModule, "", "getModule helper");

/**
 * 3. Replace local recursive loadChildGroup by resolver adapter.
 */
const oldLoadChildGroup = `async function loadChildGroup(
  parentRecordId: string,
  child: ERPCompositionChild
): Promise<ExpandedGroup | null> {
  const module = getModule(child.moduleKey);

  if (!module) {
    return null;
  }

  const records = (await RuntimeDataBinding.list(module)).filter(
    (record) =>
      String(record[child.foreignKey] ?? "").trim() === parentRecordId &&
      isVisibleRuntimeRecord(record)
  );

  const grandchildrenByParentId: Record<string, ExpandedGroup[]> = {};

  for (const record of records) {
    const recordId = getRecordId(record);

    if (!recordId) continue;

    const grandchildren = module.composition?.children ?? [];
    const groups: ExpandedGroup[] = [];

    for (const grandchild of grandchildren) {
      const group = await loadChildGroup(recordId, grandchild);

      if (group && group.records.length > 0) {
        groups.push(group);
      }
    }

    grandchildrenByParentId[recordId] = groups;
  }

  return {
    child,
    module,
    records,
    grandchildrenByParentId,
  };
}

`;

const newLoadExpandedGroups = `async function loadExpandedGroups(
  parentModule: ERPModule,
  parentRecord: Record<string, unknown>
): Promise<ExpandedGroup[]> {
  const resolvedGroups = await RuntimeOperationalChildrenResolver.resolveExpandedChildren({
    module: parentModule,
    record: parentRecord,
    maxDepth: 2,
  });

  const rootChildren = parentModule.composition?.children ?? [];

  return resolvedGroups
    .map((group) => {
      const child = rootChildren.find(
        (candidate) => candidate.moduleKey === group.moduleKey
      );

      if (!child) {
        return null;
      }

      const module = {
        ...parentModule,
        metadata: {
          ...parentModule.metadata,
          key: group.moduleKey,
          label: group.moduleLabel,
        },
      } as ERPModule;

      const grandchildrenByParentId: Record<string, ExpandedGroup[]> = {};

      for (const record of group.records) {
        const recordId = getRecordId(record);

        if (!recordId) {
          continue;
        }

        grandchildrenByParentId[recordId] = group.children
          .filter((childGroup) => childGroup.parentRecordId === recordId)
          .map((childGroup) => {
            const nestedChild = {
              moduleKey: childGroup.moduleKey,
              foreignKey: childGroup.foreignKey,
              label: childGroup.moduleLabel,
              openLabel: childGroup.openLabel,
            } as ERPCompositionChild;

            const nestedModule = {
              ...module,
              metadata: {
                ...module.metadata,
                key: childGroup.moduleKey,
                label: childGroup.moduleLabel,
              },
            } as ERPModule;

            return {
              child: nestedChild,
              module: nestedModule,
              records: childGroup.records,
              grandchildrenByParentId: {},
            };
          })
          .filter((nestedGroup) => nestedGroup.records.length > 0);
      }

      return {
        child,
        module,
        records: group.records,
        grandchildrenByParentId,
      };
    })
    .filter((group): group is ExpandedGroup => Boolean(group));
}

`;

content = replaceOnce(
  content,
  oldLoadChildGroup,
  newLoadExpandedGroups,
  "loadChildGroup block"
);

/**
 * 4. Replace exact loading block in useEffect.
 */
const oldLoadingBlock = `        const loadedGroups = await Promise.all(
          children.map((child) => loadChildGroup(parentRecordId, child))
        );

        if (mounted) {
          setGroups(
            loadedGroups.filter(
              (group): group is ExpandedGroup =>
                Boolean(group) && (group?.records.length ?? 0) > 0
            )
          );
        }
`;

const newLoadingBlock = `        const loadedGroups = await loadExpandedGroups(parentModule, parentRecord);

        if (mounted) {
          setGroups(loadedGroups.filter((group) => group.records.length > 0));
        }
`;

content = replaceOnce(
  content,
  oldLoadingBlock,
  newLoadingBlock,
  "useEffect loading block"
);

/**
 * 5. Dependency array: children can stay because it drives the empty-state guard.
 * parentModule and parentRecord are now used inside the effect.
 */
content = replaceOnce(
  content,
  "  }, [parentRecordId, children]);",
  "  }, [parentModule, parentRecord, parentRecordId, children]);",
  "useEffect dependency array"
);

/**
 * 6. Guardrails.
 */
if (content.includes("RuntimeDataBinding")) {
  fail("RuntimeDataBinding still present after rewrite");
}

if (content.includes("allERPModules")) {
  fail("allERPModules still present after rewrite");
}

if (content.includes("loadChildGroup")) {
  fail("loadChildGroup still present after rewrite");
}

if (!content.includes("RuntimeOperationalChildrenResolver.resolveExpandedChildren")) {
  fail("Resolver call missing after rewrite");
}

if (!content.includes("<Link") || !content.includes("ERPRuntimeFieldValue")) {
  fail("JSX markers missing after rewrite");
}

fs.writeFileSync(componentPath, content, "utf8");

const checks = [
  {
    label: "Component imports RuntimeOperationalChildrenResolver",
    ok: content.includes('import { RuntimeOperationalChildrenResolver } from "@/runtime/operational";'),
  },
  {
    label: "Component calls resolveExpandedChildren",
    ok: content.includes("RuntimeOperationalChildrenResolver.resolveExpandedChildren"),
  },
  {
    label: "RuntimeDataBinding removed from component",
    ok: !content.includes("RuntimeDataBinding"),
  },
  {
    label: "allERPModules removed from component",
    ok: !content.includes("allERPModules"),
  },
  {
    label: "Local loadChildGroup removed",
    ok: !content.includes("loadChildGroup"),
  },
  {
    label: "JSX preserved: Link still used",
    ok: content.includes("<Link") && content.includes("</Link>"),
  },
  {
    label: "JSX preserved: ERPRuntimeFieldValue still used",
    ok: content.includes("ERPRuntimeFieldValue"),
  },
];

const failed = checks.filter((check) => !check.ok);

console.log("[WRITTEN]", path.relative(ROOT, componentPath));
console.log("");
console.log("[Q2-F-D-B3] Wire expanded children to RuntimeOperationalChildrenResolver");
console.log("");

for (const check of checks) {
  console.log(`${check.ok ? "[OK]" : "[FAIL]"} ${check.label}`);
}

console.log("");
console.log(`[SUMMARY] OK: ${checks.length - failed.length} FAIL: ${failed.length}`);

if (failed.length > 0) {
  process.exit(1);
}

console.log("");
console.log("[DONE] Q2-F-D-B3 wiring applied.");
console.log("");
console.log("Next:");
console.log("  Select-String -Path \".\\\\src\\\\components\\\\erp\\\\operational\\\\ERPOperationalExpandedChildren.tsx\" -Pattern \"RuntimeOperationalChildrenResolver|RuntimeDataBinding|allERPModules|resolveExpandedChildren\"");
console.log("  pnpm build");
