export type RuntimeReturnContextInput = {
  currentPath?: string | null;
  currentQuery?: string | URLSearchParams | { toString(): string } | null;
  returnTo?: string | null;
  returnLabel?: string | null;
  sourceModule?: string | null;
  sourceRecordId?: string | null;
  expandedRecordId?: string | null;
  selectedRecordId?: string | null;
  scrollTargetId?: string | null;
};

export type RuntimeDestinationContextInput = RuntimeReturnContextInput & {
  destinationHref: string;
};

function sanitizeInternalPath(value: string | null | undefined): string {
  const trimmed = String(value ?? "").trim();

  if (!trimmed) {
    return "";
  }

  if (!trimmed.startsWith("/")) {
    return "";
  }

  if (trimmed.startsWith("//")) {
    return "";
  }

  return trimmed;
}

function normalizeQuery(
  query?: string | URLSearchParams | { toString(): string } | null
): string {
  if (!query) {
    return "";
  }

  const raw = query.toString().trim();

  if (!raw) {
    return "";
  }

  return raw.startsWith("?") ? raw.slice(1) : raw;
}

export function buildRuntimeCurrentReturnTo(
  input: RuntimeReturnContextInput
): string {
  const explicitReturnTo = sanitizeInternalPath(input.returnTo ?? "");

  if (explicitReturnTo) {
    return withRuntimeReturnState(explicitReturnTo, input);
  }

  const currentPath = sanitizeInternalPath(input.currentPath ?? "");

  if (!currentPath) {
    return "";
  }

  const query = normalizeQuery(input.currentQuery);
  const baseReturnTo = query ? currentPath + "?" + query : currentPath;

  return withRuntimeReturnState(baseReturnTo, input);
}

export function buildRuntimeReturnLabel(
  label?: string | null,
  fallbackModuleLabel?: string | null,
  fallbackModuleKey?: string | null
): string {
  const explicit = String(label ?? "").trim();

  if (explicit) {
    return explicit.slice(0, 100);
  }

  const fallback =
    String(fallbackModuleLabel ?? "").trim() ||
    String(fallbackModuleKey ?? "").trim();

  return fallback ? "Retour " + fallback : "Retour";
}

export function withRuntimeReturnState(
  returnTo: string,
  input: RuntimeReturnContextInput
): string {
  const safeReturnTo = sanitizeInternalPath(returnTo);

  if (!safeReturnTo) {
    return "";
  }

  const [rawPath, rawQuery = ""] = safeReturnTo.split("?");
  const params = new URLSearchParams(rawQuery);

  if (input.expandedRecordId) {
    params.set("expandedRecordId", String(input.expandedRecordId));
  }

  if (input.selectedRecordId) {
    params.set("selectedRecordId", String(input.selectedRecordId));
  }

  if (input.scrollTargetId) {
    params.set("scrollTargetId", String(input.scrollTargetId));
  } else if (input.expandedRecordId) {
    params.set("scrollTargetId", String(input.expandedRecordId));
  } else if (input.selectedRecordId) {
    params.set("scrollTargetId", String(input.selectedRecordId));
  }

  const query = params.toString();

  return query ? rawPath + "?" + query : rawPath;
}

export function appendRuntimeReturnContext(
  input: RuntimeDestinationContextInput
): string {
  const destinationHref = sanitizeInternalPath(input.destinationHref);

  if (!destinationHref) {
    return input.destinationHref;
  }

  if (destinationHref.includes("returnTo=")) {
    return destinationHref;
  }

  const returnTo = buildRuntimeCurrentReturnTo(input);

  if (!returnTo) {
    return destinationHref;
  }

  const separator = destinationHref.includes("?") ? "&" : "?";
  const params = new URLSearchParams();

  params.set("returnTo", returnTo);

  const returnLabel = buildRuntimeReturnLabel(input.returnLabel);

  if (returnLabel) {
    params.set("returnLabel", returnLabel);
  }

  if (input.sourceModule) {
    params.set("sourceModule", String(input.sourceModule));
  }

  if (input.sourceRecordId) {
    params.set("sourceRecordId", String(input.sourceRecordId));
  }

  if (input.expandedRecordId) {
    params.set("expandedRecordId", String(input.expandedRecordId));
  }

  if (input.selectedRecordId) {
    params.set("selectedRecordId", String(input.selectedRecordId));
  }

  if (input.scrollTargetId) {
    params.set("scrollTargetId", String(input.scrollTargetId));
  }

  return destinationHref + separator + params.toString();
}

export function readRuntimeReturnContext(
  searchParams: URLSearchParams | { get(name: string): string | null }
) {
  return {
    returnTo: sanitizeInternalPath(searchParams.get("returnTo")),
    returnLabel: searchParams.get("returnLabel") ?? "",
    sourceModule: searchParams.get("sourceModule") ?? "",
    sourceRecordId: searchParams.get("sourceRecordId") ?? "",
    expandedRecordId: searchParams.get("expandedRecordId") ?? "",
    selectedRecordId: searchParams.get("selectedRecordId") ?? "",
    scrollTargetId: searchParams.get("scrollTargetId") ?? "",
  };
}