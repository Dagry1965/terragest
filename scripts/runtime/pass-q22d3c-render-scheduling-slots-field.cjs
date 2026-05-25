const fs = require("fs");
const path = require("path");

const ROOT = process.cwd();
const TAG = "q22d3c-render-scheduling-slots-field";

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

if (content.includes("Q22D3C_SCHEDULING_SLOTS_FIELD")) {
  console.log("[SKIP] Q22D-3C already installed.");
  process.exit(0);
}

if (!content.includes("@/runtime/scheduling")) {
  content = content.replace(
    `import { RuntimeDataBinding } from "@/runtime/data-binding/RuntimeDataBinding";`,
    `import { RuntimeDataBinding } from "@/runtime/data-binding/RuntimeDataBinding";
import { RuntimeSchedulingEngine } from "@/runtime/scheduling";`
  );
}

const stateMarker = `  const [relationFilterSourceValue, setRelationFilterSourceValue] = useState("");`;

const stateReplacement = `  const [relationFilterSourceValue, setRelationFilterSourceValue] = useState("");
  const [schedulingSlots, setSchedulingSlots] = useState<
    Array<{
      start: string;
      end: string;
      label: string;
      available: boolean;
    }>
  >([]);
  const [schedulingSlotsLoading, setSchedulingSlotsLoading] = useState(false);`;

if (!content.includes(stateMarker)) {
  throw new Error("[MISSING] relationFilterSourceValue state marker");
}

content = content.replace(stateMarker, stateReplacement);

const currentValueMarker = `  const currentValue = normalizeFormFieldValue(field, value);`;

const currentValueReplacement = `  const currentValue = normalizeFormFieldValue(field, value);

  const isSchedulingTimeField =
    Boolean(
      schedulingConfig?.enabled &&
      schedulingConfig.timeField === field.key
    );

  const schedulingDateValue =
    schedulingConfig?.dateField
      ? formValues[schedulingConfig.dateField]
      : "";

  const schedulingDurationValue =
    schedulingConfig?.durationField
      ? formValues[schedulingConfig.durationField]
      : undefined;`;

if (!content.includes(currentValueMarker)) {
  throw new Error("[MISSING] currentValue marker");
}

content = content.replace(currentValueMarker, currentValueReplacement);

const beforeLabelMarker = `  const label = (
    <span className="text-sm font-bold text-[var(--erp-text)]">`;

const schedulingEffect = `  useEffect(() => {
    async function loadSchedulingSlots() {
      // Q22D3C_SCHEDULING_SLOTS_FIELD
      // Generic ERP scheduling UI: any module declaring scheduling metadata
      // can expose availability slots on its configured time field.
      if (
        !module ||
        !schedulingConfig?.enabled ||
        !isSchedulingTimeField ||
        !schedulingDateValue
      ) {
        setSchedulingSlots([]);
        return;
      }

      setSchedulingSlotsLoading(true);

      try {
        const existingRecords =
          await RuntimeDataBinding.list(module);

        const startField =
          schedulingConfig.startField ?? "startAt";

        const endField =
          schedulingConfig.endField ?? "endAt";

        const bookings =
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
            : [];

        const durationMinutes =
          Number(schedulingDurationValue ?? 0) ||
          undefined;

        const slots =
          RuntimeSchedulingEngine.getAvailableSlotsWithBookings({
            date: String(schedulingDateValue),
            durationMinutes,
            bookings,
          });

        setSchedulingSlots(slots);
      } catch (error) {
        console.error(
          "ERP SCHEDULING SLOTS LOAD ERROR",
          error
        );
        setSchedulingSlots([]);
      } finally {
        setSchedulingSlotsLoading(false);
      }
    }

    loadSchedulingSlots();
  }, [
    module,
    schedulingConfig,
    isSchedulingTimeField,
    schedulingDateValue,
    schedulingDurationValue,
  ]);

`;

if (!content.includes(beforeLabelMarker)) {
  throw new Error("[MISSING] label marker");
}

content = content.replace(beforeLabelMarker, schedulingEffect + beforeLabelMarker);

const relationMarker = `  if (field.type === "relation") {`;

const schedulingRender = `  if (isSchedulingTimeField) {
    const hasDate =
      Boolean(String(schedulingDateValue ?? "").trim());

    return (
      <FieldWrapper field={field} error={error}>
        <label className="block space-y-2">
          {label}

          <select
            name={field.key}
            required={field.required}
            value={currentValue}
            disabled={isProtected || !hasDate || schedulingSlotsLoading}
            onChange={(event) => onChange?.(field.key, event.target.value)}
            className={\`\${className} \${
              isProtected || !hasDate
                ? "cursor-not-allowed bg-slate-100 text-[var(--erp-text-muted)]"
                : ""
            }\`}
          >
            <option value="">
              {!hasDate
                ? "Choisir d'abord une date"
                : schedulingSlotsLoading
                  ? "Chargement des créneaux..."
                  : field.placeholder ?? "Sélectionner un créneau"}
            </option>

            {schedulingSlots.map((slot) => (
              <option
                key={slot.start + "-" + slot.end}
                value={slot.start}
                disabled={!slot.available}
              >
                {slot.available
                  ? slot.label
                  : slot.label + " — indisponible"}
              </option>
            ))}
          </select>

          {hasDate && schedulingSlots.length === 0 ? (
            <p className="rounded-xl border border-amber-200 bg-amber-50 px-3 py-2 text-xs font-semibold text-amber-800">
              Aucun créneau disponible pour cette date.
            </p>
          ) : null}

          {hasDate && schedulingSlots.length > 0 ? (
            <p className="text-xs text-[var(--erp-text-muted)]">
              Créneaux calculés par le moteur ERP Scheduling Runtime.
            </p>
          ) : null}
        </label>
      </FieldWrapper>
    );
  }

`;

if (!content.includes(relationMarker)) {
  throw new Error("[MISSING] relation render marker");
}

content = content.replace(relationMarker, schedulingRender + relationMarker);

fs.writeFileSync(target, content, "utf8");

console.log(`[WRITTEN] ${targetFile}`);
console.log("[Q22D3C_DONE] Scheduling slots are rendered on configured time fields.");
console.log("");
console.log("Next:");
console.log("  pnpm build");
console.log("  test /rendezvous/nouveau");