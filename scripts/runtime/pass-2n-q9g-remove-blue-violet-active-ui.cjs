const fs = require("fs");
const path = require("path");

const root = process.cwd();

const targetDirs = [
  "src/components/erp",
  "src/features",
  "src/theme",
  "src/ui/theme",
  "src/runtime/workflow-ui",
  "src/runtime/workflows",
];

const extensions = new Set([".ts", ".tsx", ".css"]);

const replacements = [
  ["bg-blue-50", "bg-[#F8FAFC]"],
  ["bg-blue-100", "bg-[#F1F5F9]"],
  ["bg-blue-200", "bg-[#E2E8F0]"],
  ["bg-blue-300", "bg-[#CBD5E1]"],
  ["bg-blue-400", "bg-[#94A3B8]"],
  ["bg-blue-500", "bg-[#64748B]"],
  ["bg-blue-600", "bg-[#334155]"],
  ["bg-blue-700", "bg-[#1F2937]"],
  ["bg-blue-800", "bg-[#17212F]"],
  ["bg-blue-900", "bg-[#111827]"],
  ["bg-blue-950", "bg-[#0F172A]"],

  ["text-blue-50", "text-[#F8FAFC]"],
  ["text-blue-100", "text-[#F1F5F9]"],
  ["text-blue-200", "text-[#CBD5E1]"],
  ["text-blue-300", "text-[#94A3B8]"],
  ["text-blue-400", "text-[#64748B]"],
  ["text-blue-500", "text-[#475569]"],
  ["text-blue-600", "text-[#334155]"],
  ["text-blue-700", "text-[#1F2937]"],
  ["text-blue-800", "text-[#17212F]"],
  ["text-blue-900", "text-[#111827]"],
  ["text-blue-950", "text-[#0F172A]"],

  ["border-blue-50", "border-[#F8FAFC]"],
  ["border-blue-100", "border-[#D5E4E8]"],
  ["border-blue-200", "border-[#CBD5E1]"],
  ["border-blue-300", "border-[#CBD5E1]"],
  ["border-blue-400", "border-[#94A3B8]"],
  ["border-blue-500", "border-[#64748B]"],
  ["border-blue-600", "border-[#475569]"],
  ["border-blue-700", "border-[#334155]"],
  ["border-blue-800", "border-[#1F2937]"],
  ["border-blue-900", "border-[#17212F]"],
  ["border-blue-950", "border-[#111827]"],

  ["hover:bg-blue-50", "hover:bg-[#F8FAFC]"],
  ["hover:bg-blue-100", "hover:bg-[#F1F5F9]"],
  ["hover:bg-blue-500", "hover:bg-[#475569]"],
  ["hover:bg-blue-600", "hover:bg-[#334155]"],
  ["hover:bg-blue-700", "hover:bg-[#1F2937]"],
  ["hover:text-blue-600", "hover:text-[#334155]"],
  ["hover:text-blue-700", "hover:text-[#1F2937]"],
  ["hover:text-blue-900", "hover:text-[#111827]"],
  ["hover:border-blue-300", "hover:border-[#CBD5E1]"],
  ["hover:border-blue-400", "hover:border-[#94A3B8]"],
  ["hover:border-blue-500", "hover:border-[#64748B]"],

  ["focus:border-blue-500", "focus:border-[#00A68A]"],
  ["focus:ring-blue-500", "focus:ring-[#00A68A]"],
  ["focus-visible:ring-blue-500", "focus-visible:ring-[#00A68A]"],

  ["shadow-blue-200", "shadow-slate-200"],
  ["shadow-blue-950/40", "shadow-slate-950/40"],
  ["shadow-blue-950/50", "shadow-slate-950/50"],
  ["shadow-blue-950/60", "shadow-slate-950/60"],

  ["from-blue-500", "from-[#64748B]"],
  ["to-blue-700", "to-[#1F2937]"],
  ["from-blue-950", "from-[#111827]"],
  ["via-blue-950", "via-[#17212F]"],
  ["to-blue-950", "to-[#123A35]"],

  ["bg-violet-50", "bg-[#F8FAFC]"],
  ["bg-violet-100", "bg-[#F1F5F9]"],
  ["bg-violet-500", "bg-[#64748B]"],
  ["bg-violet-600", "bg-[#334155]"],
  ["bg-violet-700", "bg-[#1F2937]"],
  ["bg-violet-900", "bg-[#111827]"],
  ["bg-violet-950", "bg-[#0F172A]"],

  ["text-violet-500", "text-[#475569]"],
  ["text-violet-600", "text-[#334155]"],
  ["text-violet-700", "text-[#1F2937]"],
  ["border-violet-200", "border-[#CBD5E1]"],
  ["border-violet-500", "border-[#64748B]"],

  ["bg-purple-50", "bg-[#F8FAFC]"],
  ["bg-purple-100", "bg-[#F1F5F9]"],
  ["bg-purple-500", "bg-[#64748B]"],
  ["bg-purple-600", "bg-[#334155]"],
  ["bg-purple-700", "bg-[#1F2937]"],
  ["bg-purple-900", "bg-[#111827]"],
  ["bg-purple-950", "bg-[#0F172A]"],

  ["text-purple-500", "text-[#475569]"],
  ["text-purple-600", "text-[#334155]"],
  ["text-purple-700", "text-[#1F2937]"],
  ["border-purple-200", "border-[#CBD5E1]"],
  ["border-purple-500", "border-[#64748B]"],

  ["bg-indigo-50", "bg-[#F8FAFC]"],
  ["bg-indigo-100", "bg-[#F1F5F9]"],
  ["bg-indigo-500", "bg-[#64748B]"],
  ["bg-indigo-600", "bg-[#334155]"],
  ["bg-indigo-700", "bg-[#1F2937]"],
  ["bg-indigo-900", "bg-[#111827]"],
  ["bg-indigo-950", "bg-[#0F172A]"],

  ["text-indigo-500", "text-[#475569]"],
  ["text-indigo-600", "text-[#334155]"],
  ["text-indigo-700", "text-[#1F2937]"],
  ["border-indigo-200", "border-[#CBD5E1]"],
  ["border-indigo-500", "border-[#64748B]"],

  ["from-purple-500", "from-[#64748B]"],
  ["to-indigo-600", "to-[#334155]"],

  ["#2563eb", "#334155"],
  ["#2563EB", "#334155"],
  ["#7c3aed", "#334155"],
  ["#7C3AED", "#334155"],
  ["#3b82f6", "#64748B"],
  ["#3B82F6", "#64748B"],
  ["#6366f1", "#64748B"],
  ["#6366F1", "#64748B"],
  ["#8b5cf6", "#64748B"],
  ["#8B5CF6", "#64748B"],
  ["#9333ea", "#334155"],
  ["#9333EA", "#334155"],
];

function shouldSkip(absolutePath) {
  return (
    absolutePath.includes(`${path.sep}.next${path.sep}`) ||
    absolutePath.includes(`${path.sep}node_modules${path.sep}`) ||
    absolutePath.includes(`${path.sep}_quarantine${path.sep}`) ||
    absolutePath.includes(".bak") ||
    absolutePath.includes(".backup")
  );
}

function walk(dir) {
  const absoluteDir = path.join(root, dir);

  if (!fs.existsSync(absoluteDir)) {
    return [];
  }

  const result = [];
  const stack = [absoluteDir];

  while (stack.length > 0) {
    const current = stack.pop();

    for (const item of fs.readdirSync(current, { withFileTypes: true })) {
      const absolute = path.join(current, item.name);

      if (shouldSkip(absolute)) {
        continue;
      }

      if (item.isDirectory()) {
        stack.push(absolute);
        continue;
      }

      if (!item.isFile()) {
        continue;
      }

      if (!extensions.has(path.extname(item.name))) {
        continue;
      }

      result.push(absolute);
    }
  }

  return result;
}

let updated = 0;

for (const dir of targetDirs) {
  for (const absolute of walk(dir)) {
    const before = fs.readFileSync(absolute, "utf8");
    let after = before;

    for (const [from, to] of replacements) {
      after = after.replaceAll(from, to);
    }

    after = after
      .replaceAll("transition transition", "transition")
      .replaceAll("hover:bg-[#334155] hover:bg-[#334155]", "hover:bg-[#334155]")
      .replaceAll("hover:bg-[#1F2937] hover:bg-[#1F2937]", "hover:bg-[#1F2937]")
      .replaceAll("focus:border-[#00A68A] focus:border-[#00A68A]", "focus:border-[#00A68A]")
      .replaceAll("focus:ring-[#00A68A] focus:ring-[#00A68A]", "focus:ring-[#00A68A]");

    if (before !== after) {
      fs.writeFileSync(absolute, after, "utf8");
      console.log("UPDATED", path.relative(root, absolute));
      updated++;
    }
  }
}

console.log(`PASS 2N-Q9G OK: ${updated} active UI files updated.`);