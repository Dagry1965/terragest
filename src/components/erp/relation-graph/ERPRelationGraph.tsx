"use client";

import {
  getAllRelations,
} from "@/core/relations/relation-engine";

export function ERPRelationGraph() {
  const relations =
    getAllRelations();

  return (
    <div className="rounded-3xl border border-slate-200 bg-white shadow-sm">
      <div className="border-b border-slate-200 px-6 py-5">
        <h2 className="text-lg font-semibold text-slate-950">
          ERP Relation Graph
        </h2>
      </div>

      <div className="space-y-4 p-6">
        {relations.map(
          (relation) => (
            <div
              key={`${relation.sourceModule}-${relation.targetModule}`}
              className="
                flex
                items-center
                justify-between
                rounded-2xl
                border
                border-slate-200
                bg-slate-50
                p-5
              "
            >
              <div className="flex items-center gap-4">
                <div className="rounded-2xl bg-slate-900 px-4 py-2 text-sm font-medium text-white">
                  {
                    relation.sourceModule
                  }
                </div>

                <div className="text-sm font-semibold text-slate-400">
                  →
                </div>

                <div className="rounded-2xl bg-slate-200 px-4 py-2 text-sm font-medium text-slate-800">
                  {
                    relation.targetModule
                  }
                </div>
              </div>

              <div className="text-right">
                <div className="text-sm font-semibold text-slate-900">
                  {relation.label}
                </div>

                <div className="mt-1 text-xs text-slate-500">
                  {
                    relation.relationType
                  }
                </div>
              </div>
            </div>
          )
        )}

        {relations.length === 0 && (
          <div className="text-sm text-slate-500">
            Aucune relation ERP.
          </div>
        )}
      </div>
    </div>
  );
}
