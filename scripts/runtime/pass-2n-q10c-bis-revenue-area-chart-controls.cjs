const fs = require("fs");
const path = require("path");

const root = process.cwd();

function abs(filePath) {
  return path.join(root, filePath);
}

function patch(filePath, updater) {
  const target = abs(filePath);

  if (!fs.existsSync(target)) {
    console.log("SKIP", filePath);
    return;
  }

  const before = fs.readFileSync(target, "utf8");
  const after = updater(before);

  if (before !== after) {
    fs.writeFileSync(target, after, "utf8");
    console.log("UPDATED", filePath);
  } else {
    console.log("NO CHANGE", filePath);
  }
}

/**
 * PASS 2N-Q10C-BIS
 * Historique revenus :
 * - aire réelle
 * - axes visibles
 * - stats : total, moyenne, meilleur jour
 * - sélecteur 7J / 30J / 90J
 */

patch("src/components/amarkhys/dashboard/AmarkhysPremiumCockpit.tsx", (content) => {
  let next = content;

  /**
   * 1. Ajouter l'état de période dans le composant.
   */
  next = next.replace(
    `const [loading, setLoading] = useState(true);`,
    `const [loading, setLoading] = useState(true);
  const [revenuePeriod, setRevenuePeriod] = useState<7 | 30 | 90>(30);`
  );

  /**
   * 2. Remplacer RevenueChart par une version avec axes + stats + période.
   */
  next = next.replace(
    /function RevenueChart\(\{ data \}: \{ data: RevenuePoint\[\] \}\) \{[\s\S]*?\n\}/,
    `function RevenueChart({
  data,
  period,
}: {
  data: RevenuePoint[];
  period: 7 | 30 | 90;
}) {
  const width = 560;
  const height = 260;
  const paddingLeft = 58;
  const paddingRight = 22;
  const paddingTop = 30;
  const paddingBottom = 42;

  const visibleData = data.slice(-period);
  const max = Math.max(...visibleData.map((point) => point.value), 1);
  const total = visibleData.reduce((sum, point) => sum + point.value, 0);
  const average = Math.round(total / Math.max(visibleData.length, 1));
  const best = visibleData.reduce(
    (maxPoint, point) => (point.value > maxPoint.value ? point : maxPoint),
    { date: "", value: 0 }
  );

  const yTicks = [0, 0.25, 0.5, 0.75, 1].map((ratio) => {
    const value = Math.round(max * ratio);
    const y =
      height -
      paddingBottom -
      ratio * (height - paddingTop - paddingBottom);

    return { value, y };
  });

  const points = visibleData.map((point, index) => {
    const x =
      visibleData.length <= 1
        ? paddingLeft
        : paddingLeft +
          (index / (visibleData.length - 1)) *
            (width - paddingLeft - paddingRight);

    const y =
      height -
      paddingBottom -
      (point.value / max) * (height - paddingTop - paddingBottom);

    return { x, y, value: point.value, date: point.date };
  });

  const linePath = points
    .map((point, index) => \`\${index === 0 ? "M" : "L"}\${point.x.toFixed(1)} \${point.y.toFixed(1)}\`)
    .join(" ");

  const areaPath =
    points.length > 0
      ? \`\${linePath} L\${points[points.length - 1].x.toFixed(1)} \${height - paddingBottom} L\${points[0].x.toFixed(1)} \${height - paddingBottom} Z\`
      : "";

  const formatShortMoney = (value: number) => {
    if (value >= 1000000) {
      return Math.round(value / 100000) / 10 + "M";
    }

    if (value >= 1000) {
      return Math.round(value / 1000) + "k";
    }

    return String(value);
  };

  const formatDateLabel = (value: string) => {
    const date = new Date(value);

    if (Number.isNaN(date.getTime())) {
      return value;
    }

    return date.toLocaleDateString("fr-FR", {
      day: "2-digit",
      month: "2-digit",
    });
  };

  const xLabels =
    visibleData.length > 0
      ? [
          visibleData[0],
          visibleData[Math.floor(visibleData.length / 2)],
          visibleData[visibleData.length - 1],
        ]
      : [];

  return (
    <div className="mt-6 rounded-[1.6rem] border border-white/10 bg-black/25 p-5">
      <div className="grid grid-cols-1 gap-3 sm:grid-cols-3">
        <div>
          <p className="text-xs font-black uppercase tracking-[0.18em] text-slate-400">
            Total période
          </p>
          <p className="mt-1 text-xl font-black text-white">
            {total.toLocaleString("fr-FR")} FCFA
          </p>
        </div>

        <div>
          <p className="text-xs font-black uppercase tracking-[0.18em] text-slate-400">
            Moyenne / jour
          </p>
          <p className="mt-1 text-xl font-black text-white">
            {average.toLocaleString("fr-FR")} FCFA
          </p>
        </div>

        <div>
          <p className="text-xs font-black uppercase tracking-[0.18em] text-slate-400">
            Meilleur jour
          </p>
          <p className="mt-1 text-xl font-black text-white">
            {best.value.toLocaleString("fr-FR")} FCFA
          </p>
        </div>
      </div>

      <div className="mt-5 h-72">
        <svg viewBox="0 0 560 260" className="h-full w-full" aria-hidden="true">
          <defs>
            <linearGradient id="revenueFill" x1="0" x2="0" y1="0" y2="1">
              <stop offset="0%" stopColor="#27F3D5" stopOpacity="0.48" />
              <stop offset="100%" stopColor="#0EAFAA" stopOpacity="0.04" />
            </linearGradient>
          </defs>

          {yTicks.map((tick) => (
            <g key={tick.y}>
              <line
                x1={paddingLeft}
                x2={width - paddingRight}
                y1={tick.y}
                y2={tick.y}
                stroke="rgba(255,255,255,0.12)"
                strokeDasharray="8 8"
              />
              <text
                x={paddingLeft - 10}
                y={tick.y + 4}
                textAnchor="end"
                className="fill-slate-400 text-[11px] font-bold"
              >
                {formatShortMoney(tick.value)}
              </text>
            </g>
          ))}

          <line
            x1={paddingLeft}
            x2={width - paddingRight}
            y1={height - paddingBottom}
            y2={height - paddingBottom}
            stroke="rgba(255,255,255,0.18)"
          />

          <line
            x1={paddingLeft}
            x2={paddingLeft}
            y1={paddingTop}
            y2={height - paddingBottom}
            stroke="rgba(255,255,255,0.18)"
          />

          {points.length > 0 ? (
            <>
              <path d={areaPath} fill="url(#revenueFill)" />
              <path
                d={linePath}
                fill="none"
                stroke="#27F3D5"
                strokeWidth="5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />

              {points.map((point, index) =>
                index === 0 ||
                index === points.length - 1 ||
                point.value === best.value ? (
                  <circle
                    key={point.date}
                    cx={point.x}
                    cy={point.y}
                    r="5"
                    fill="white"
                  />
                ) : null
              )}
            </>
          ) : null}

          {xLabels.map((point, index) => {
            const matchingPoint = points.find((candidate) => candidate.date === point.date);

            if (!matchingPoint) {
              return null;
            }

            return (
              <text
                key={index + point.date}
                x={matchingPoint.x}
                y={height - 14}
                textAnchor={index === 0 ? "start" : index === 2 ? "end" : "middle"}
                className="fill-slate-400 text-[11px] font-bold"
              >
                {formatDateLabel(point.date)}
              </text>
            );
          })}
        </svg>
      </div>
    </div>
  );
}`
  );

  /**
   * 3. Ajouter le sélecteur dans le widget Historique.
   */
  next = next.replace(
    `<WidgetShell title="Historique des revenus (J-30)" action="⋮">
            <div className="mt-6 flex justify-center gap-4 text-sm text-slate-300">`,
    `<WidgetShell title={\`Historique des revenus (J-\${revenuePeriod})\`} action="⋮">
            <div className="mt-6 flex flex-wrap items-center justify-between gap-4 text-sm text-slate-300">
              <div className="flex rounded-2xl border border-white/10 bg-white/5 p-1">
                {[7, 30, 90].map((period) => (
                  <button
                    key={period}
                    type="button"
                    onClick={() => setRevenuePeriod(period as 7 | 30 | 90)}
                    className={[
                      "rounded-xl px-3 py-2 text-xs font-black transition",
                      revenuePeriod === period
                        ? "bg-[#27F3D5] text-[#02110F]"
                        : "text-slate-300 hover:bg-white/10 hover:text-white",
                    ].join(" ")}
                  >
                    {period}J
                  </button>
                ))}
              </div>`
  );

  /**
   * 4. Remplacer l'appel du composant.
   */
  next = next.replace(
    `<RevenueChart data={data.revenueHistory} />`,
    `<RevenueChart data={data.revenueHistory} period={revenuePeriod} />`
  );

  return next;
});

console.log("PASS 2N-Q10C-BIS OK: revenue area chart axes and period controls added.");