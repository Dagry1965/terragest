const fs = require("fs");
const path = require("path");

const ROOT = process.cwd();
const TAG = "q22e4b-render-list-navigation-actions";

const targetFile =
  "src/components/erp/runtime/ERPRuntimePage.tsx";

const target = path.join(ROOT, targetFile);

if (!fs.existsSync(target)) {
  throw new Error(`[MISSING] ${targetFile}`);
}

const backup = `${target}.bak-${TAG}`;

if (!fs.existsSync(backup)) {
  fs.copyFileSync(target, backup);
  console.log(`[BACKUP] ${targetFile}.bak-${TAG}`);
}

let content = fs.readFileSync(target, "utf8");

if (content.includes("Q22E4B_LIST_NAVIGATION_ACTIONS")) {
  console.log("[SKIP] Q22E-4B already installed.");
  process.exit(0);
}

const runtimeActionsMarker = `  const runtimeActions =


    (type === "detail" || type === "edit") && !isRemovedRecord


      ? RuntimeActionEngine.getAvailableActions({
          actions: module?.actions ?? [],
          workflow: module?.workflows?.[0],
          record,
        })


      : [];`;

const runtimeActionsReplacement = `  const runtimeActions =


    (type === "detail" || type === "edit") && !isRemovedRecord


      ? RuntimeActionEngine.getAvailableActions({
          actions: module?.actions ?? [],
          workflow: module?.workflows?.[0],
          record,
        })


      : [];

  const listNavigationActions =
    // Q22E4B_LIST_NAVIGATION_ACTIONS
    // Generic runtime: list pages may expose module actions with href.
    type === "list"
      ? (module?.actions ?? []).filter((action) =>
          Boolean(action.href)
        )
      : [];`;

if (!content.includes(runtimeActionsMarker)) {
  throw new Error("[MISSING] runtimeActions block");
}

content = content.replace(runtimeActionsMarker, runtimeActionsReplacement);

const listHeaderMarker = `        {type === "list" && module && (
          <div className="flex items-center justify-end">
            <a
              href={createActionHref}
              className="
                rounded-2xl
                bg-[var(--erp-table-head)]
                px-5
                py-3
                text-sm
                font-bold
                text-[var(--erp-table-head-text)]
                shadow-[0_14px_40px_rgba(15,23,42,0.07)]
                transition
                hover:bg-[#007F6D]
              "
            >
              {createActionLabel}
            </a>
          </div>
        )}`;

const listHeaderReplacement = `        {type === "list" && module && (
          <div className="flex flex-wrap items-center justify-end gap-3">
            {listNavigationActions.map((action) => (
              <Link
                key={action.key}
                href={action.href ?? "#"}
                className={[
                  "rounded-2xl px-5 py-3 text-sm font-bold shadow-[0_14px_40px_rgba(15,23,42,0.07)] transition",
                  action.type === "secondary"
                    ? "bg-slate-100 text-[var(--erp-text)] hover:bg-slate-200"
                    : action.type === "danger"
                      ? "bg-red-600 text-white hover:bg-red-700"
                      : "bg-[var(--erp-table-head)] text-[var(--erp-table-head-text)] hover:bg-[#007F6D]",
                ].join(" ")}
              >
                {action.label}
              </Link>
            ))}

            <Link
              href={createActionHref}
              className="
                rounded-2xl
                bg-[var(--erp-table-head)]
                px-5
                py-3
                text-sm
                font-bold
                text-[var(--erp-table-head-text)]
                shadow-[0_14px_40px_rgba(15,23,42,0.07)]
                transition
                hover:bg-[#007F6D]
              "
            >
              {createActionLabel}
            </Link>
          </div>
        )}`;

if (!content.includes(listHeaderMarker)) {
  throw new Error("[MISSING] list header action block");
}

content = content.replace(listHeaderMarker, listHeaderReplacement);

fs.writeFileSync(target, content, "utf8");

console.log(`[WRITTEN] ${targetFile}`);
console.log("[Q22E4B_DONE] List navigation module actions rendered.");
console.log("");
console.log("Next:");
console.log("  pnpm build");
console.log("  open /rendezvous and verify Planning action");