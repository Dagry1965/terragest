const fs = require("fs");
const path = require("path");

const ROOT = process.cwd();
const TAG = "q22d4-filter-bookings-by-resource-field";

const targetFile =
  "src/components/erp/forms/enterprise/ERPFormField.tsx";

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

if (content.includes("Q22D4_RESOURCE_FIELD_BOOKING_FILTER")) {
  console.log("[SKIP] Q22D-4 already installed.");
  process.exit(0);
}

const marker = `        const bookings =
          Array.isArray(existingRecords)
            ? existingRecords
                .map((record) => ({
                  id: String(record.id ?? record._id ?? ""),
                  startAt: String(record[startField] ?? ""),
                  endAt: String(record[endField] ?? ""),
                  status: schedulingConfig.statusField
                    ? String(record[schedulingConfig.statusField] ?? "")
                    : undefined,
                }))
                .filter((booking) =>
                  Boolean(booking.startAt && booking.endAt)
                )
            : [];`;

const replacement = `        const resourceField =
          schedulingConfig.resourceField;

        const resourceValue =
          resourceField
            ? String(formValues[resourceField] ?? "").trim()
            : "";

        const blockingStatuses =
          schedulingConfig.blockingStatuses ?? [];

        const bookings =
          Array.isArray(existingRecords)
            ? existingRecords
                // Q22D4_RESOURCE_FIELD_BOOKING_FILTER
                // Generic ERP scheduling: only records sharing the configured resourceField
                // can block the current resource availability.
                .filter((record) => {
                  if (!resourceField) {
                    return true;
                  }

                  if (!resourceValue) {
                    return false;
                  }

                  return String(record[resourceField] ?? "").trim() === resourceValue;
                })
                .filter((record) => {
                  if (blockingStatuses.length === 0 || !schedulingConfig.statusField) {
                    return true;
                  }

                  return blockingStatuses.includes(
                    String(record[schedulingConfig.statusField] ?? "")
                  );
                })
                .map((record) => ({
                  id: String(record.id ?? record._id ?? ""),
                  startAt: String(record[startField] ?? ""),
                  endAt: String(record[endField] ?? ""),
                  status: schedulingConfig.statusField
                    ? String(record[schedulingConfig.statusField] ?? "")
                    : undefined,
                }))
                .filter((booking) =>
                  Boolean(booking.startAt && booking.endAt)
                )
            : [];`;

if (!content.includes(marker)) {
  throw new Error("[MISSING] bookings block marker");
}

content = content.replace(marker, replacement);

fs.writeFileSync(target, content, "utf8");

console.log(`[WRITTEN] ${targetFile}`);
console.log("[Q22D4_DONE] Scheduling bookings are filtered by resourceField.");
console.log("");
console.log("Next:");
console.log("  pnpm build");
console.log("  test /rendezvous/nouveau with different resource values");