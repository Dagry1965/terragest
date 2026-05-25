const fs = require("fs");
const path = require("path");

const ROOT = process.cwd();
const file = "src/components/erp/runtime/ERPRelatedRecordsPanel.tsx";
const full = path.join(ROOT, file);
const tag = "q21e-b1-fix-related-badge-keys";

const backup = `${full}.bak-${tag}`;

if (!fs.existsSync(backup)) {
  fs.copyFileSync(full, backup);
  console.log(`[BACKUP] ${file}.bak-${tag}`);
}

let content = fs.readFileSync(full, "utf8");

const search = `{[...configuredSubtitleParts, ...relationParts].map((part) => {
                      const isStatus = isRelatedStatusValue(part);

                      return (
                        <span
                          key={part}
                          className={[
                            "rounded-full border px-3 py-1 font-black",
                            isStatus
                              ? getRelatedStatusBadgeClass(part)
                              : "border-slate-200 bg-slate-100 text-slate-600",
                          ].join(" ")}
                        >
                          {isStatus
                            ? formatRelatedStatusLabel(part)
                            : part}
                        </span>
                      );
                    })}`;

const replacement = `{[...configuredSubtitleParts, ...relationParts].map((part, partIndex) => {
                      const isStatus = isRelatedStatusValue(part);

                      return (
                        <span
                          key={String(part) + "-" + partIndex}
                          className={[
                            "rounded-full border px-3 py-1 font-black",
                            isStatus
                              ? getRelatedStatusBadgeClass(part)
                              : "border-slate-200 bg-slate-100 text-slate-600",
                          ].join(" ")}
                        >
                          {isStatus
                            ? formatRelatedStatusLabel(part)
                            : part}
                        </span>
                      );
                    })}`;

if (!content.includes(search)) {
  throw new Error("[MISSING] badge map block in ERPRelatedRecordsPanel");
}

content = content.replace(search, replacement);

fs.writeFileSync(full, content, "utf8");

console.log(`[WRITTEN] ${file}`);
console.log("[Q21E_B1_DONE] Related records badge keys are now unique.");