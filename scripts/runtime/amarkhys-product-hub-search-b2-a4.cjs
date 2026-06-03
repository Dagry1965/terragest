const fs = require("fs");
const path = require("path");

const root = process.cwd();

const clientPath = path.join(root, "src/app/(private)/produitsauto/hub/ProductStockOperationalHubClient.tsx");
const sheetPath = path.join(root, "src/components/erp/hub/ERPProductStockOperationalSheet.tsx");
const reportPath = path.join(root, "docs/audits/AMARKHYS-PRODUCT-HUB-SEARCH-B2-A4.md");

function read(file) {
  return fs.readFileSync(file, "utf8");
}

function write(file, content) {
  fs.writeFileSync(file, content, "utf8");
}

function fail(message) {
  throw new Error(message);
}

function insertBefore(content, marker, insert) {
  const index = content.indexOf(marker);

  if (index < 0) {
    fail("Marker introuvable: " + marker.slice(0, 120));
  }

  return content.slice(0, index) + insert + content.slice(index);
}

let client = read(clientPath);
let sheet = read(sheetPath);

write(clientPath + ".bak-product-hub-search-b2-a4", client);
write(sheetPath + ".bak-product-hub-search-b2-a4", sheet);

/**
 * CLIENT
 */
client = client.replace(
  'import { useEffect, useState } from "react";',
  'import { useEffect, useMemo, useState } from "react";'
);

if (!client.includes('import { useRouter } from "next/navigation";')) {
  client = client.replace(
    'import { ERPProductStockOperationalSheet } from "@/components/erp/hub/ERPProductStockOperationalSheet";',
    'import { ERPProductStockOperationalSheet } from "@/components/erp/hub/ERPProductStockOperationalSheet";\nimport { useRouter } from "next/navigation";'
  );
}

if (!client.includes('import { RuntimeDataBinding } from "@/runtime/data-binding/RuntimeDataBinding";')) {
  client = client.replace(
    'import type {',
    'import { RuntimeDataBinding } from "@/runtime/data-binding/RuntimeDataBinding";\nimport { produitsautoModule } from "@/runtime/modules/generated/produitsauto/produitsauto.module";\nimport type {'
  );
}

if (!client.includes("function productSearchRecordId(")) {
  client = insertBefore(
    client,
    "type ProductStockHubState = {",
`function productSearchRecordId(record: ERPRecordHubRecord | null | undefined): string {
  return String(record?.id ?? record?._id ?? "");
}

function productSearchText(record: ERPRecordHubRecord, keys: string[]): string {
  return keys
    .map((key) => String((record as Record<string, unknown>)[key] ?? "").trim())
    .filter(Boolean)
    .join(" ");
}

function productSearchLabel(record: ERPRecordHubRecord): string {
  return (
    productSearchText(record, [
      "displayLabel",
      "label",
      "nom",
      "designation",
      "libelle",
      "reference",
      "code",
      "sku",
    ]) || "Produit"
  );
}

function productSearchCode(record: ERPRecordHubRecord): string {
  return productSearchText(record, ["reference", "code", "sku"]) || "-";
}

function normalizeProductSearch(value: string): string {
  return value
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\\u0300-\\u036f]/g, "")
    .trim();
}

`
  );
}

if (!client.includes("const router = useRouter();")) {
  client = client.replace(
`export function ProductStockOperationalHubClient({
  config,
  productId,
  selectedStockId = null,
}: ProductStockOperationalHubClientProps) {`,
`export function ProductStockOperationalHubClient({
  config,
  productId,
  selectedStockId = null,
}: ProductStockOperationalHubClientProps) {
  const router = useRouter();`
  );
}

if (!client.includes("const [productSearchQuery, setProductSearchQuery] = useState")) {
  client = client.replace(
`  const [isLoading, setIsLoading] = useState(true);
  const [loadError, setLoadError] = useState<string | null>(null);`,
`  const [isLoading, setIsLoading] = useState(true);
  const [loadError, setLoadError] = useState<string | null>(null);
  const [productSearchQuery, setProductSearchQuery] = useState("");
  const [productSearchRecords, setProductSearchRecords] = useState<ERPRecordHubRecord[]>([]);
  const [isProductSearchLoading, setIsProductSearchLoading] = useState(false);`
  );
}

if (!client.includes("loadProductSearchRecords")) {
  client = insertBefore(
    client,
`  useEffect(() => {
    let cancelled = false;

    async function loadHubData() {`,
`  useEffect(() => {
    let cancelled = false;

    async function loadProductSearchRecords() {
      setIsProductSearchLoading(true);

      try {
        const records = await RuntimeDataBinding.list(produitsautoModule);

        if (!cancelled) {
          setProductSearchRecords(records as ERPRecordHubRecord[]);
        }
      } catch (error) {
        console.warn("[ProductStockOperationalHubClient] product search list failed", error);

        if (!cancelled) {
          setProductSearchRecords([]);
        }
      } finally {
        if (!cancelled) {
          setIsProductSearchLoading(false);
        }
      }
    }

    void loadProductSearchRecords();

    return () => {
      cancelled = true;
    };
  }, []);

`
  );
}

if (!client.includes("const productSearchSuggestions = useMemo(")) {
  client = insertBefore(
    client,
"  if (isLoading) {",
`  const productSearchSuggestions = useMemo(() => {
    const query = normalizeProductSearch(productSearchQuery);

    if (query.length < 2) {
      return [];
    }

    return productSearchRecords
      .filter((record) => productSearchRecordId(record) !== productId)
      .filter((record) => {
        const haystack = normalizeProductSearch(
          productSearchText(record, [
            "displayLabel",
            "label",
            "nom",
            "designation",
            "libelle",
            "reference",
            "code",
            "sku",
            "typeArticle",
            "typeProduit",
            "categorie",
          ])
        );

        return haystack.includes(query);
      })
      .slice(0, 8)
      .map((record) => ({
        id: productSearchRecordId(record),
        label: productSearchLabel(record),
        code: productSearchCode(record),
        type: productSearchText(record, ["typeArticle", "typeProduit", "categorie"]) || "Article",
      }))
      .filter((item) => item.id);
  }, [productId, productSearchQuery, productSearchRecords]);

  function selectProductFromSearch(nextProductId: string) {
    if (!nextProductId) {
      return;
    }

    setProductSearchQuery("");
    router.push("/produitsauto/hub?productId=" + encodeURIComponent(nextProductId));
  }

`
  );
}

if (!client.includes("productSearch={{")) {
  client = client.replace(
`      relatedRecordsBySection={data.relatedRecordsBySection}
    />`,
`      relatedRecordsBySection={data.relatedRecordsBySection}
      productSearch={{
        query: productSearchQuery,
        suggestions: productSearchSuggestions,
        isLoading: isProductSearchLoading,
        onQueryChange: setProductSearchQuery,
        onSelectProduct: selectProductFromSearch,
      }}
    />`
  );
}

/**
 * SHEET TYPES + PROP
 */
if (!sheet.includes("type ProductHubSearchSuggestion =")) {
  sheet = insertBefore(
    sheet,
"type ERPProductStockOperationalSheetProps = {",
`type ProductHubSearchSuggestion = {
  id: string;
  label: string;
  code: string;
  type: string;
};

type ProductHubSearchState = {
  query: string;
  suggestions: ProductHubSearchSuggestion[];
  isLoading: boolean;
  onQueryChange: (value: string) => void;
  onSelectProduct: (productId: string) => void;
};

`
  );
}

if (!sheet.includes("productSearch")) {
  sheet = sheet.replace(
`type ERPProductStockOperationalSheetProps = {
  config: ERPRecordHubConfig;
  rootRecord: ERPRecordHubRecord | null;
  primaryRecords: ERPRecordHubRecord[];
  relatedRecordsBySection: Record<string, ERPRecordHubRecord[]>;
};`,
`type ERPProductStockOperationalSheetProps = {
  config: ERPRecordHubConfig;
  rootRecord: ERPRecordHubRecord | null;
  primaryRecords: ERPRecordHubRecord[];
  relatedRecordsBySection: Record<string, ERPRecordHubRecord[]>;
  productSearch?: ProductHubSearchState;
};`
  );
}

if (!sheet.includes("  productSearch,")) {
  sheet = sheet.replace(
`export function ERPProductStockOperationalSheet({
  config,
  rootRecord,
  primaryRecords,
  relatedRecordsBySection,
}: ERPProductStockOperationalSheetProps) {`,
`export function ERPProductStockOperationalSheet({
  config,
  rootRecord,
  primaryRecords,
  relatedRecordsBySection,
  productSearch,
}: ERPProductStockOperationalSheetProps) {`
  );
}

/**
 * SHEET UI
 */
if (!sheet.includes('id="product-hub-search"')) {
  const headerStart = sheet.indexOf("<header ");
  const headerEnd = sheet.indexOf("</header>", headerStart);

  if (headerStart < 0 || headerEnd < 0) {
    fail("Header introuvable.");
  }

  const buttonMarker = '          <div className="flex flex-wrap gap-3">';
  const buttonIndex = sheet.indexOf(buttonMarker, headerStart);

  if (buttonIndex < 0 || buttonIndex > headerEnd) {
    fail("Bloc boutons header introuvable.");
  }

  const searchBlock = `          {productSearch ? (
            <div className="relative w-full xl:max-w-[460px]">
              <label className="sr-only" htmlFor="product-hub-search">
                Rechercher un produit
              </label>
              <div className="flex items-center gap-3 rounded-full border border-slate-200 bg-slate-50 px-4 py-3 ring-1 ring-transparent transition focus-within:border-emerald-200 focus-within:bg-white focus-within:ring-emerald-100">
                <span className="text-lg">🔎</span>
                <input
                  id="product-hub-search"
                  value={productSearch.query}
                  onChange={(event) => productSearch.onQueryChange(event.target.value)}
                  placeholder="Rechercher un produit..."
                  className="min-w-0 flex-1 bg-transparent text-sm font-bold text-slate-900 outline-none placeholder:text-slate-400"
                />
                {productSearch.isLoading ? (
                  <span className="text-xs font-black text-slate-400">...</span>
                ) : null}
              </div>

              {productSearch.query.trim().length >= 2 ? (
                <div className="absolute right-0 z-30 mt-2 w-full overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-xl">
                  {productSearch.suggestions.length === 0 ? (
                    <p className="px-4 py-4 text-sm font-bold text-slate-500">
                      Aucun produit trouvé.
                    </p>
                  ) : (
                    <div className="max-h-[320px] overflow-auto p-2">
                      {productSearch.suggestions.map((item) => (
                        <button
                          key={item.id}
                          type="button"
                          onClick={() => productSearch.onSelectProduct(item.id)}
                          className="flex w-full items-center justify-between gap-4 rounded-2xl px-4 py-3 text-left transition hover:bg-emerald-50"
                        >
                          <span className="min-w-0">
                            <span className="block truncate text-sm font-black text-slate-900">
                              {item.label}
                            </span>
                            <span className="mt-1 block truncate text-xs font-bold text-slate-500">
                              Réf. {item.code} · {item.type}
                            </span>
                          </span>
                          <span className="text-sm font-black text-emerald-700">Ouvrir</span>
                        </button>
                      ))}
                    </div>
                  )}
                </div>
              ) : null}
            </div>
          ) : null}

`;

  sheet = sheet.slice(0, buttonIndex) + searchBlock + sheet.slice(buttonIndex);
}

const checks = [
  ["client RuntimeDataBinding", client.includes("RuntimeDataBinding.list(produitsautoModule)")],
  ["client suggestions", client.includes("productSearchSuggestions")],
  ["client prop", client.includes("productSearch={{")],
  ["sheet search state type", sheet.includes("type ProductHubSearchState")],
  ["sheet prop mentions productSearch", sheet.includes("productSearch")],
  ["sheet input", sheet.includes('id="product-hub-search"')],
  ["sheet suggestions", sheet.includes("productSearch.suggestions.map")],
];

console.table(checks.map(([label, ok]) => ({ label, ok })));

const failed = checks.filter(([, ok]) => !ok);

if (failed.length > 0) {
  fail("Vérifications échouées.");
}

write(clientPath, client);
write(sheetPath, sheet);

write(
  reportPath,
  [
    "# AMARKHYS-PRODUCT-HUB-SEARCH-B2-A4",
    "",
    "## Objectif",
    "",
    "Ajouter une recherche produit dans l’en-tête de la fiche produit opérationnelle.",
    "",
    "## Correction",
    "",
    "- ProductStockOperationalHubClient charge la liste produits.",
    "- Suggestions filtrées par nom, désignation, référence, code, catégorie.",
    "- ERPProductStockOperationalSheet reçoit une prop productSearch.",
    "- Le champ est inséré avant les boutons Ouvrir fiche / Éditer.",
    "- Clic suggestion ouvre /produitsauto/hub?productId=<id>.",
    "",
    "## Hors périmètre",
    "",
    "- Aucun changement moteur stock.",
    "- Aucun changement mutation stock.",
    "- Aucun changement workflow.",
    "- Aucun changement données.",
    "",
  ].join("\n")
);

console.log("[OK] AMARKHYS-PRODUCT-HUB-SEARCH-B2-A4 applied");