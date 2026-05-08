import { ERPSection } from "@/components/erp/ui";
import type { getERPAISnapshot } from "@/runtime/ai";

type Snapshot = ReturnType<typeof getERPAISnapshot>;

type Props = {
  snapshot: Snapshot;
};

export function ERPAISearchPanel({
  snapshot,
}: Props) {
  return (
    <ERPSection>
      <div className="mb-5">
        <h2 className="text-lg font-semibold text-slate-950">
          Semantic Runtime Search
        </h2>
        <p className="mt-1 text-sm text-slate-500">
          Recherche semantique simulee sur le registre ERP.
        </p>
      </div>

      <div className="space-y-4">
        {snapshot.searchResults.map((result) => (
          <div
            key={result.id}
            className="rounded-2xl border border-slate-200 bg-white p-5"
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="font-semibold text-slate-900">
                  {result.title}
                </p>
                <p className="mt-1 text-sm text-slate-500">
                  {result.excerpt}
                </p>
              </div>

              <span className="rounded-full bg-slate-100 px-3 py-1 text-xs font-semibold text-slate-700">
                {result.score}
              </span>
            </div>
          </div>
        ))}
      </div>
    </ERPSection>
  );
}