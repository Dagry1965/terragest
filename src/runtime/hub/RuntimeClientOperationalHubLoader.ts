import type {
  ERPRecordHubConfig,
  ERPRecordHubRecord,
} from "./RuntimeHubTypes";

export type RuntimeClientOperationalHubLoadResult = {
  config: ERPRecordHubConfig;
  rootRecord: ERPRecordHubRecord | null;
  primaryRecords: ERPRecordHubRecord[];
  relatedRecordsBySection: Record<string, ERPRecordHubRecord[]>;
};

export type RuntimeClientOperationalHubLoaderInput = {
  config: ERPRecordHubConfig;
  clientId?: string | null;
};

/**
 * Q2-OC foundation loader.
 *
 * This loader intentionally does not query Firestore directly yet.
 * Data loading will be delegated to existing runtime binding/query layers
 * in the next pass, to avoid local Firestore logic in the hub UI.
 */
export class RuntimeClientOperationalHubLoader {
  static async load(
    input: RuntimeClientOperationalHubLoaderInput
  ): Promise<RuntimeClientOperationalHubLoadResult> {
    return {
      config: input.config,
      rootRecord: input.clientId
        ? {
            id: input.clientId,
            nom: "Client",
            prenom: "sélectionné",
            typeClient: "Particulier",
            statut: "actif",
          }
        : {
            id: "preview-client",
            nom: "Client",
            prenom: "opérationnel",
            typeClient: "Particulier",
            statut: "aperçu",
          },
      primaryRecords: [],
      relatedRecordsBySection: {},
    };
  }
}