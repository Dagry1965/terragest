"use client";

import { useEffect, useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import {
  RuntimeClientOperationalSearchLoader,
  type ClientOperationalSearchItem,
} from "@/runtime/hub/RuntimeClientOperationalSearchLoader";

type ClientOperationalSearchBoxProps = {
  className?: string;
};

function resultHref(item: ClientOperationalSearchItem): string {
  const params = new URLSearchParams();
  params.set("clientId", item.clientId);

  if (item.vehicleId) {
    params.set("selectedVehicleId", item.vehicleId);
  }

  return `/clientsauto/hub?${params.toString()}`;
}

export function ClientOperationalSearchBox({
  className = "",
}: ClientOperationalSearchBoxProps) {
  const router = useRouter();

  const [items, setItems] = useState<ClientOperationalSearchItem[]>([]);
  const [query, setQuery] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    let active = true;

    async function load() {
      setIsLoading(true);

      try {
        const result = await RuntimeClientOperationalSearchLoader.load();

        if (!active) return;

        setItems(result);
      } catch (error) {
        console.error("[ClientOperationalSearchBox] load failed", error);
      } finally {
        if (active) {
          setIsLoading(false);
        }
      }
    }

    load();

    return () => {
      active = false;
    };
  }, []);

  const filteredItems = useMemo(() => {
    const normalized = query.trim().toLowerCase();

    if (!normalized) {
      return items.slice(0, 8);
    }

    return items
      .filter((item) => item.searchableText.includes(normalized))
      .slice(0, 10);
  }, [items, query]);

  function openItem(item: ClientOperationalSearchItem) {
    setIsOpen(false);
    setQuery("");
    router.push(resultHref(item));
  }

  return (
    <div className={["relative", className].filter(Boolean).join(" ")}>
      <div className="flex items-center gap-3 rounded-[1.5rem] bg-white px-5 py-4 shadow-sm ring-1 ring-slate-200">
        <span className="text-lg">🔎</span>
        <input
          value={query}
          onChange={(event) => {
            setQuery(event.target.value);
            setIsOpen(true);
          }}
          onFocus={() => setIsOpen(true)}
          placeholder="Rechercher un client, une voiture, une immatriculation, un téléphone..."
          className="min-w-0 flex-1 bg-transparent text-sm font-medium text-slate-900 outline-none placeholder:text-slate-400"
        />
        {isLoading ? (
          <span className="text-xs font-semibold text-slate-400">Chargement...</span>
        ) : (
          <span className="text-xs font-semibold text-slate-400">
            {items.length} résultat(s)
          </span>
        )}
      </div>

      {isOpen ? (
        <div className="absolute left-0 right-0 z-30 mt-3 overflow-hidden rounded-[1.5rem] bg-white shadow-xl ring-1 ring-slate-200">
          {filteredItems.length > 0 ? (
            <div className="max-h-[420px] overflow-auto p-2">
              {filteredItems.map((item) => (
                <button
                  key={item.id}
                  type="button"
                  onMouseDown={(event) => {
                    event.preventDefault();
                    openItem(item);
                  }}
                  className="flex w-full items-start gap-3 rounded-[1.25rem] px-4 py-3 text-left hover:bg-emerald-50"
                >
                  <span className="mt-1 flex h-10 w-10 items-center justify-center rounded-2xl bg-emerald-100 text-lg">
                    {item.type === "client" ? "👤" : "🚗"}
                  </span>

                  <span className="min-w-0 flex-1">
                    <span className="block truncate text-sm font-extrabold text-slate-950">
                      {item.label}
                    </span>
                    <span className="mt-1 block truncate text-xs text-slate-500">
                      {item.type === "client" ? "Client" : "Véhicule"} · {item.subtitle || "Aucun détail"}
                    </span>
                  </span>
                </button>
              ))}
            </div>
          ) : (
            <div className="p-5 text-sm text-slate-500">
              Aucun client ou véhicule trouvé.
            </div>
          )}
        </div>
      ) : null}
    </div>
  );
}
