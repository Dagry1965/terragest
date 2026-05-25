const fs = require("fs");
const path = require("path");

const ROOT = process.cwd();
const TAG = "q22e3-create-rendezvous-planning-route";

const dir = "src/app/(private)/rendezvous/planning";
const pageFile = `${dir}/page.tsx`;

function full(p) {
  return path.join(ROOT, p);
}

fs.mkdirSync(full(dir), { recursive: true });

if (fs.existsSync(full(pageFile))) {
  const backup = `${full(pageFile)}.bak-${TAG}`;
  if (!fs.existsSync(backup)) {
    fs.copyFileSync(full(pageFile), backup);
    console.log(`[BACKUP] ${pageFile}.bak-${TAG}`);
  }
}

const content = `import { ERPSchedulingPlanningView } from "@/components/erp/scheduling";
import { rendezvousModule } from "@/runtime/modules/generated/rendezvous";

export default function RendezvousPlanningPage() {
  return (
    <ERPSchedulingPlanningView
      module={rendezvousModule}
    />
  );
}
`;

fs.writeFileSync(full(pageFile), content, "utf8");

console.log(`[WRITTEN] ${pageFile}`);
console.log("[Q22E3_DONE] Rendezvous planning route created.");
console.log("");
console.log("Next:");
console.log("  pnpm build");
console.log("  open /rendezvous/planning");