const fs = require("fs");
const path = require("path");

const root = process.cwd();
const target = path.join(
  root,
  "src/components/amarkhys/dashboard/AmarkhysPremiumCockpit.tsx"
);

if (!fs.existsSync(target)) {
  console.error("Missing:", target);
  process.exit(1);
}

let content = fs.readFileSync(target, "utf8");

/**
 * PASS 2N-Q10G
 * Notifications cockpit :
 * - état vide premium
 * - priorité visuelle plus claire
 *
 * Scope strict :
 * - pas de RevenueChart
 * - pas de sidebar
 * - pas de config dashboard
 */

const oldBlock = `{data.notifications.map((notification) => (
                <Link
                  key={notification.title}
                  href={notification.href}
                  className="group block rounded-[1.5rem] border border-white/10 bg-white/[0.04] p-4 transition hover:border-[#7FFFE8]/30 hover:bg-white/[0.07]"
                >
                  <div className="flex items-start justify-between gap-3">
                    <div>
                      <p className="text-sm font-black text-white">
                        {notification.title}
                      </p>
                      <p className="mt-1 text-xs leading-relaxed text-slate-400">
                        {notification.description}
                      </p>
                    </div>
                    <span
                      className={[
                        "rounded-full px-2 py-1 text-[10px] font-black uppercase tracking-[0.18em]",
                        notification.tone === "alert"
                          ? "bg-red-500/15 text-red-200"
                          : notification.tone === "warning"
                            ? "bg-amber-500/15 text-amber-200"
                            : "bg-[#0EAFAA]/15 text-[#7FFFE8]",
                      ].join(" ")}
                    >
                      {notification.tone}
                    </span>
                  </div>
                </Link>
              ))}`;

const newBlock = `{data.notifications.length > 0 ? (
                data.notifications.map((notification) => (
                  <Link
                    key={[notification.title, notification.href].join("-")}
                    href={notification.href}
                    className="group block rounded-[1.5rem] border border-white/10 bg-white/[0.04] p-4 transition hover:border-[#7FFFE8]/30 hover:bg-white/[0.07]"
                  >
                    <div className="flex items-start justify-between gap-3">
                      <div>
                        <p className="text-sm font-black text-white">
                          {notification.title}
                        </p>
                        <p className="mt-1 text-xs leading-relaxed text-slate-400">
                          {notification.description}
                        </p>
                      </div>

                      <span
                        className={[
                          "rounded-full px-2 py-1 text-[10px] font-black uppercase tracking-[0.18em]",
                          notification.tone === "alert"
                            ? "bg-red-500/15 text-red-200"
                            : notification.tone === "warning"
                              ? "bg-amber-500/15 text-amber-200"
                              : "bg-[#0EAFAA]/15 text-[#7FFFE8]",
                        ].join(" ")}
                      >
                        {notification.tone === "alert"
                          ? "Urgent"
                          : notification.tone === "warning"
                            ? "À traiter"
                            : "Info"}
                      </span>
                    </div>
                  </Link>
                ))
              ) : (
                <div className="rounded-[1.5rem] border border-[#7FFFE8]/15 bg-[#0EAFAA]/10 p-5">
                  <p className="text-sm font-black text-white">
                    Aucun point critique
                  </p>
                  <p className="mt-2 text-xs leading-relaxed text-slate-400">
                    Les rendez-vous, factures, stocks, rappels, interventions et échéances ne signalent aucune alerte prioritaire.
                  </p>
                </div>
              )}`;

if (!content.includes(oldBlock)) {
  console.error("Notification render block not found. No change made.");
  process.exit(1);
}

content = content.replace(oldBlock, newBlock);

fs.writeFileSync(target, content, "utf8");

console.log("PASS 2N-Q10G OK: notification empty state improved.");