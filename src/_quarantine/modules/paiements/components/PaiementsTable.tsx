"use client";

import { usePaiements } from "../hooks/usePaiements";

export function PaiementsTable() {
  const {
    data,
    isLoading,
  } = usePaiements();

  if (isLoading) {
    return (
      <div className="p-4">
        Chargement...
      </div>
    );
  }

  if (!data || data.length === 0) {
    return (
      <div className="p-4">
        Aucune donnÃ©e.
      </div>
    );
  }

  return (
    <div className="border rounded overflow-hidden">
      <table className="w-full">
        <thead>
          <tr className="border-b bg-gray-50">
            <th className="text-left p-3">
              Nom
            </th>

            <th className="text-left p-3 w-40">
              Actions
            </th>
          </tr>
        </thead>

        <tbody>
          {data.map((item: any) => (
            <tr
              key={item.id}
              className="border-b"
            >
              <td className="p-3">
                {item.nom}
              </td>

              <td className="p-3">
                <div className="flex gap-2">
                  <button className="border px-2 py-1 rounded">
                    Voir
                  </button>

                  <button className="border px-2 py-1 rounded">
                    Modifier
                  </button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
