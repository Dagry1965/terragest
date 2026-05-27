import type {
  ERPModule,
} from "@/runtime/modules";

export type PublicRuntimeServerRecord =
  Record<string, unknown>;

type FirestoreValue = {
  stringValue?: string;
  integerValue?: string;
  doubleValue?: number;
  booleanValue?: boolean;
  timestampValue?: string;
  nullValue?: null;
  mapValue?: {
    fields?: Record<string, FirestoreValue>;
  };
  arrayValue?: {
    values?: FirestoreValue[];
  };
};

type FirestoreDocument = {
  name: string;
  fields?: Record<string, FirestoreValue>;
};

function getProjectId(): string {
  const projectId =
    process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID ||
    process.env.FIREBASE_PROJECT_ID;

  if (!projectId) {
    throw new Error(
      "Firebase projectId manquant pour PublicRuntimeServerReadRepository."
    );
  }

  return projectId;
}

function getApiKey(): string {
  const apiKey =
    process.env.NEXT_PUBLIC_FIREBASE_API_KEY;

  if (!apiKey) {
    throw new Error(
      "Firebase apiKey manquant pour PublicRuntimeServerReadRepository."
    );
  }

  return apiKey;
}

function fromFirestoreValue(value: FirestoreValue | undefined): unknown {
  if (!value) {
    return undefined;
  }

  if ("stringValue" in value) {
    return value.stringValue ?? "";
  }

  if ("integerValue" in value) {
    return Number(value.integerValue ?? 0);
  }

  if ("doubleValue" in value) {
    return value.doubleValue ?? 0;
  }

  if ("booleanValue" in value) {
    return Boolean(value.booleanValue);
  }

  if ("timestampValue" in value) {
    return value.timestampValue ?? "";
  }

  if ("nullValue" in value) {
    return null;
  }

  if ("mapValue" in value) {
    return fromFirestoreFields(value.mapValue?.fields ?? {});
  }

  if ("arrayValue" in value) {
    return (value.arrayValue?.values ?? []).map(fromFirestoreValue);
  }

  return undefined;
}

function fromFirestoreFields(
  fields: Record<string, FirestoreValue>
): PublicRuntimeServerRecord {
  const record: PublicRuntimeServerRecord = {};

  for (const [key, value] of Object.entries(fields)) {
    const parsed = fromFirestoreValue(value);

    if (parsed !== undefined) {
      record[key] = parsed;
    }
  }

  return record;
}

function getDocumentId(name: string): string {
  const parts = name.split("/");

  return parts[parts.length - 1] ?? "";
}

export class PublicRuntimeServerReadRepository {
  static async findMany(
    module: ERPModule
  ): Promise<PublicRuntimeServerRecord[]> {
    const projectId = getProjectId();
    const apiKey = getApiKey();
    const collectionName = module.schema.collection;

    const url =
      "https://firestore.googleapis.com/v1/projects/" +
      encodeURIComponent(projectId) +
      "/databases/(default)/documents/" +
      encodeURIComponent(collectionName) +
      "?key=" +
      encodeURIComponent(apiKey);

    const response =
      await fetch(url, {
        method: "GET",
        cache: "no-store",
      });

    if (!response.ok) {
      const body = await response.text();

      throw new Error(
        "Public Firestore REST read failed for " +
          collectionName +
          ": " +
          response.status +
          " " +
          body
      );
    }

    const payload =
      await response.json() as {
        documents?: FirestoreDocument[];
      };

    return (payload.documents ?? []).map((document) => ({
      id: getDocumentId(document.name),
      ...fromFirestoreFields(document.fields ?? {}),
    }));
  }
}
