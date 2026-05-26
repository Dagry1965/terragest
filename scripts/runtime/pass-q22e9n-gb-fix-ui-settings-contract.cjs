const fs = require("fs");
const path = require("path");

const ROOT = process.cwd();

const TARGET =
  "src/components/erp/scheduling/settings/ERPSchedulingSettingsPanel.tsx";

const targetPath = path.join(ROOT, TARGET);

if (!fs.existsSync(targetPath)) {
  throw new Error(`Fichier introuvable: ${TARGET}`);
}

const backupPath = `${targetPath}.bak-q22e9n-gb-fix-ui-settings-contract`;
fs.copyFileSync(targetPath, backupPath);

let content = fs.readFileSync(targetPath, "utf8");

const oldToSettings = `function toSettings(form: FormState): RuntimeSchedulingSettings {
  return {
    enabled: form.enabled,
    defaultDurationMinutes: form.defaultDurationMinutes,
    bufferMinutes: form.bufferMinutes,
    capacity: form.capacity,
    resourceField: form.resourceField || undefined,
    dateField: form.dateField,
    timeField: form.timeField,
    durationField: form.durationField,
    startField: form.startField,
    endField: form.endField,
  };
}`;

const newToSettings = `function toSettings(form: FormState): RuntimeSchedulingSettings {
  return {
    enabled: form.enabled,
    defaultDurationMinutes: form.defaultDurationMinutes,
    bufferMinutes: form.bufferMinutes,
    capacity: form.capacity,
    resourceField: form.resourceField || undefined,
  };
}`;

if (!content.includes(oldToSettings)) {
  throw new Error("Bloc toSettings attendu introuvable.");
}

content = content.replace(oldToSettings, newToSettings);

content = content.replace(
  `<div className="grid gap-4 md:grid-cols-3">
        {[
          ["dateField", "Champ date"],
          ["timeField", "Champ heure"],
          ["durationField", "Champ durée"],
          ["startField", "Champ début calculé"],
          ["endField", "Champ fin calculé"],
          ["resourceField", "Champ ressource"],
        ].map(([key, label]) => (
          <label key={key} className="space-y-2">
            <span className="text-sm font-medium text-slate-700">{label}</span>
            <input
              value={String(form[key as keyof FormState] ?? "")}
              onChange={(event) =>
                updateField(
                  key as keyof FormState,
                  event.target.value as never
                )
              }
              className="w-full rounded-xl border border-slate-300 px-3 py-2 text-sm"
            />
          </label>
        ))}
      </div>`,
  `<div className="grid gap-4 md:grid-cols-3">
        <label className="space-y-2">
          <span className="text-sm font-medium text-slate-700">Champ ressource</span>
          <input
            value={form.resourceField}
            onChange={(event) =>
              updateField("resourceField", event.target.value)
            }
            className="w-full rounded-xl border border-slate-300 px-3 py-2 text-sm"
          />
        </label>

        {[
          ["dateField", "Champ date"],
          ["timeField", "Champ heure"],
          ["durationField", "Champ durée"],
          ["startField", "Champ début calculé"],
          ["endField", "Champ fin calculé"],
        ].map(([key, label]) => (
          <label key={key} className="space-y-2 opacity-75">
            <span className="text-sm font-medium text-slate-700">{label}</span>
            <input
              value={String(form[key as keyof FormState] ?? "")}
              readOnly
              className="w-full rounded-xl border border-slate-200 bg-slate-50 px-3 py-2 text-sm text-slate-500"
            />
          </label>
        ))}
      </div>`
);

fs.writeFileSync(targetPath, content, "utf8");

console.log("");
console.log("[Q22E-9N-G-B] DONE");
console.log(`[BACKUP] ${path.relative(ROOT, backupPath).replace(/\\\\/g, "/")}`);
console.log(`[UPDATED] ${TARGET}`);
console.log("");
console.log("Next:");
console.log("pnpm build");