# Q21X-B — Classification audit local logic

Date: 2026-05-25T01:39:18.612Z

## Synthèse

- CRITICAL_GENERIC_COMPONENT: 101
- PAGE_SHOULD_BE_THIN: 126
- RUNTIME_ENGINE_TO_GENERALIZE: 154
- TO_REVIEW: 172
- MODULE_METADATA_OK: 200
- FALSE_POSITIVE_OR_LOW: 144

## Priorité immédiate

Traiter d’abord les catégories P1 :

- CRITICAL_GENERIC_COMPONENT
- PAGE_SHOULD_BE_THIN

Ne pas corriger les 897 résultats un par un. Remonter les répétitions vers des moteurs génériques.

## Résultats classifiés

## CRITICAL_GENERIC_COMPONENT

### src/components/erp/forms/enterprise/ERPEnterpriseForm.tsx:416

- Priorité: P1
- Type audit: module-metadata-key-conditional
- Match: `module.metadata.key === "receptionsstockauto"`
- Code: `module.metadata.key === "receptionsstockauto" &&`
- Recommandation: À extraire vers un moteur runtime générique ou vers metadata. Ne pas ajouter de nouvelle logique locale ici.
- Moteur cible: RuntimeAutoFillEngine / RuntimeComputedFieldsEngine / RuntimeFieldLockingEngine / RuntimeRelationRefreshEngine / RuntimeActionEngine

### src/components/erp/forms/enterprise/ERPEnterpriseForm.tsx:636

- Priorité: P1
- Type audit: module-metadata-key-conditional
- Match: `module.metadata.key === "facturesauto"`
- Code: `module.metadata.key === "facturesauto" &&`
- Recommandation: À extraire vers un moteur runtime générique ou vers metadata. Ne pas ajouter de nouvelle logique locale ici.
- Moteur cible: RuntimeAutoFillEngine / RuntimeComputedFieldsEngine / RuntimeFieldLockingEngine / RuntimeRelationRefreshEngine / RuntimeActionEngine

### src/components/erp/forms/enterprise/ERPEnterpriseForm.tsx:774

- Priorité: P1
- Type audit: module-metadata-key-conditional
- Match: `module.metadata.key !== "lignesinterventionauto"`
- Code: `if (module.metadata.key !== "lignesinterventionauto") {`
- Recommandation: À extraire vers un moteur runtime générique ou vers metadata. Ne pas ajouter de nouvelle logique locale ici.
- Moteur cible: RuntimeAutoFillEngine / RuntimeComputedFieldsEngine / RuntimeFieldLockingEngine / RuntimeRelationRefreshEngine / RuntimeActionEngine

### src/components/erp/forms/enterprise/ERPEnterpriseForm.tsx:867

- Priorité: P1
- Type audit: module-metadata-key-conditional
- Match: `module.metadata.key === "lignesinterventionauto"`
- Code: `module.metadata.key === "lignesinterventionauto" &&`
- Recommandation: À extraire vers un moteur runtime générique ou vers metadata. Ne pas ajouter de nouvelle logique locale ici.
- Moteur cible: RuntimeAutoFillEngine / RuntimeComputedFieldsEngine / RuntimeFieldLockingEngine / RuntimeRelationRefreshEngine / RuntimeActionEngine

### src/components/erp/forms/enterprise/ERPEnterpriseForm.tsx:909

- Priorité: P1
- Type audit: module-metadata-key-conditional
- Match: `module.metadata.key !== "terrains"`
- Code: `if (module.metadata.key !== "terrains") {`
- Recommandation: À extraire vers un moteur runtime générique ou vers metadata. Ne pas ajouter de nouvelle logique locale ici.
- Moteur cible: RuntimeAutoFillEngine / RuntimeComputedFieldsEngine / RuntimeFieldLockingEngine / RuntimeRelationRefreshEngine / RuntimeActionEngine

### src/components/erp/forms/enterprise/ERPEnterpriseForm.tsx:937

- Priorité: P1
- Type audit: module-metadata-key-conditional
- Match: `module.metadata.key !== "terrains"`
- Code: `if (module.metadata.key !== "terrains") {`
- Recommandation: À extraire vers un moteur runtime générique ou vers metadata. Ne pas ajouter de nouvelle logique locale ici.
- Moteur cible: RuntimeAutoFillEngine / RuntimeComputedFieldsEngine / RuntimeFieldLockingEngine / RuntimeRelationRefreshEngine / RuntimeActionEngine

### src/components/erp/forms/enterprise/ERPEnterpriseForm.tsx:979

- Priorité: P1
- Type audit: module-metadata-key-conditional
- Match: `module.metadata.key !== "contrats"`
- Code: `if (module.metadata.key !== "contrats") {`
- Recommandation: À extraire vers un moteur runtime générique ou vers metadata. Ne pas ajouter de nouvelle logique locale ici.
- Moteur cible: RuntimeAutoFillEngine / RuntimeComputedFieldsEngine / RuntimeFieldLockingEngine / RuntimeRelationRefreshEngine / RuntimeActionEngine

### src/components/erp/forms/enterprise/ERPEnterpriseForm.tsx:1002

- Priorité: P1
- Type audit: module-metadata-key-conditional
- Match: `module.metadata.key !== "contrats"`
- Code: `if (module.metadata.key !== "contrats") {`
- Recommandation: À extraire vers un moteur runtime générique ou vers metadata. Ne pas ajouter de nouvelle logique locale ici.
- Moteur cible: RuntimeAutoFillEngine / RuntimeComputedFieldsEngine / RuntimeFieldLockingEngine / RuntimeRelationRefreshEngine / RuntimeActionEngine

### src/components/erp/forms/enterprise/ERPEnterpriseForm.tsx:1088

- Priorité: P1
- Type audit: module-metadata-key-conditional
- Match: `module.metadata.key === "terrains"`
- Code: `if (module.metadata.key === "terrains") {`
- Recommandation: À extraire vers un moteur runtime générique ou vers metadata. Ne pas ajouter de nouvelle logique locale ici.
- Moteur cible: RuntimeAutoFillEngine / RuntimeComputedFieldsEngine / RuntimeFieldLockingEngine / RuntimeRelationRefreshEngine / RuntimeActionEngine

### src/components/erp/forms/enterprise/ERPEnterpriseForm.tsx:1095

- Priorité: P1
- Type audit: module-metadata-key-conditional
- Match: `module.metadata.key === "contrats"`
- Code: `if (module.metadata.key === "contrats") {`
- Recommandation: À extraire vers un moteur runtime générique ou vers metadata. Ne pas ajouter de nouvelle logique locale ici.
- Moteur cible: RuntimeAutoFillEngine / RuntimeComputedFieldsEngine / RuntimeFieldLockingEngine / RuntimeRelationRefreshEngine / RuntimeActionEngine

### src/components/erp/forms/enterprise/ERPEnterpriseForm.tsx:1176

- Priorité: P1
- Type audit: module-metadata-key-conditional
- Match: `module.metadata.key ===
"exploitations"`
- Code: `module.metadata.key ===`
- Recommandation: À extraire vers un moteur runtime générique ou vers metadata. Ne pas ajouter de nouvelle logique locale ici.
- Moteur cible: RuntimeAutoFillEngine / RuntimeComputedFieldsEngine / RuntimeFieldLockingEngine / RuntimeRelationRefreshEngine / RuntimeActionEngine

### src/components/erp/forms/enterprise/ERPEnterpriseForm.tsx:1191

- Priorité: P1
- Type audit: module-metadata-key-conditional
- Match: `module.metadata.key === "contrats"`
- Code: `if (module.metadata.key === "contrats") {`
- Recommandation: À extraire vers un moteur runtime générique ou vers metadata. Ne pas ajouter de nouvelle logique locale ici.
- Moteur cible: RuntimeAutoFillEngine / RuntimeComputedFieldsEngine / RuntimeFieldLockingEngine / RuntimeRelationRefreshEngine / RuntimeActionEngine

### src/components/erp/forms/enterprise/ERPEnterpriseForm.tsx:1227

- Priorité: P1
- Type audit: module-metadata-key-conditional
- Match: `module.metadata.key ===
"exploitations"`
- Code: `module.metadata.key ===`
- Recommandation: À extraire vers un moteur runtime générique ou vers metadata. Ne pas ajouter de nouvelle logique locale ici.
- Moteur cible: RuntimeAutoFillEngine / RuntimeComputedFieldsEngine / RuntimeFieldLockingEngine / RuntimeRelationRefreshEngine / RuntimeActionEngine

### src/components/erp/forms/enterprise/ERPEnterpriseForm.tsx:1242

- Priorité: P1
- Type audit: module-metadata-key-conditional
- Match: `module.metadata.key === "contrats"`
- Code: `if (module.metadata.key === "contrats") {`
- Recommandation: À extraire vers un moteur runtime générique ou vers metadata. Ne pas ajouter de nouvelle logique locale ici.
- Moteur cible: RuntimeAutoFillEngine / RuntimeComputedFieldsEngine / RuntimeFieldLockingEngine / RuntimeRelationRefreshEngine / RuntimeActionEngine

### src/components/erp/forms/enterprise/ERPEnterpriseForm.tsx:1251

- Priorité: P1
- Type audit: module-metadata-key-conditional
- Match: `module.metadata.key === "lignesinterventionauto"`
- Code: `if (module.metadata.key === "lignesinterventionauto") {`
- Recommandation: À extraire vers un moteur runtime générique ou vers metadata. Ne pas ajouter de nouvelle logique locale ici.
- Moteur cible: RuntimeAutoFillEngine / RuntimeComputedFieldsEngine / RuntimeFieldLockingEngine / RuntimeRelationRefreshEngine / RuntimeActionEngine

### src/components/erp/forms/enterprise/ERPEnterpriseForm.tsx:1387

- Priorité: P1
- Type audit: module-key-conditional
- Match: `moduleKey === "receptionsstockauto"`
- Code: `if (moduleKey === "receptionsstockauto" && currentStatus === "brouillon") {`
- Recommandation: À extraire vers un moteur runtime générique ou vers metadata. Ne pas ajouter de nouvelle logique locale ici.
- Moteur cible: RuntimeAutoFillEngine / RuntimeComputedFieldsEngine / RuntimeFieldLockingEngine / RuntimeRelationRefreshEngine / RuntimeActionEngine

### src/components/erp/forms/enterprise/ERPEnterpriseForm.tsx:1397

- Priorité: P1
- Type audit: module-key-conditional
- Match: `moduleKey === "clientsauto"`
- Code: `if (moduleKey === "clientsauto" && currentStatus !== "archive") {`
- Recommandation: À extraire vers un moteur runtime générique ou vers metadata. Ne pas ajouter de nouvelle logique locale ici.
- Moteur cible: RuntimeAutoFillEngine / RuntimeComputedFieldsEngine / RuntimeFieldLockingEngine / RuntimeRelationRefreshEngine / RuntimeActionEngine

### src/components/erp/forms/enterprise/ERPEnterpriseForm.tsx:1406

- Priorité: P1
- Type audit: module-key-conditional
- Match: `moduleKey === "vehicules"`
- Code: `if (moduleKey === "vehicules" && currentStatus !== "archive") {`
- Recommandation: À extraire vers un moteur runtime générique ou vers metadata. Ne pas ajouter de nouvelle logique locale ici.
- Moteur cible: RuntimeAutoFillEngine / RuntimeComputedFieldsEngine / RuntimeFieldLockingEngine / RuntimeRelationRefreshEngine / RuntimeActionEngine

### src/components/erp/forms/enterprise/ERPEnterpriseForm.tsx:1419

- Priorité: P1
- Type audit: module-key-conditional
- Match: `moduleKey === "facturesauto"`
- Code: `moduleKey === "facturesauto" &&`
- Recommandation: À extraire vers un moteur runtime générique ou vers metadata. Ne pas ajouter de nouvelle logique locale ici.
- Moteur cible: RuntimeAutoFillEngine / RuntimeComputedFieldsEngine / RuntimeFieldLockingEngine / RuntimeRelationRefreshEngine / RuntimeActionEngine

### src/components/erp/forms/enterprise/ERPEnterpriseForm.tsx:1431

- Priorité: P1
- Type audit: module-key-conditional
- Match: `moduleKey === "encaissementsauto"`
- Code: `if (moduleKey === "encaissementsauto" && currentStatus !== "annule") {`
- Recommandation: À extraire vers un moteur runtime générique ou vers metadata. Ne pas ajouter de nouvelle logique locale ici.
- Moteur cible: RuntimeAutoFillEngine / RuntimeComputedFieldsEngine / RuntimeFieldLockingEngine / RuntimeRelationRefreshEngine / RuntimeActionEngine

### src/components/erp/forms/enterprise/ERPEnterpriseForm.tsx:1440

- Priorité: P1
- Type audit: module-key-conditional
- Match: `moduleKey === "echeancespaiementauto"`
- Code: `if (moduleKey === "echeancespaiementauto" && currentStatus !== "annulee") {`
- Recommandation: À extraire vers un moteur runtime générique ou vers metadata. Ne pas ajouter de nouvelle logique locale ici.
- Moteur cible: RuntimeAutoFillEngine / RuntimeComputedFieldsEngine / RuntimeFieldLockingEngine / RuntimeRelationRefreshEngine / RuntimeActionEngine

### src/components/erp/forms/enterprise/ERPEnterpriseForm.tsx:230

- Priorité: P1
- Type audit: metadata-key-conditional
- Match: `metadata.key === "lignesinterventionauto"`
- Code: `(item) => item.metadata.key === "lignesinterventionauto"`
- Recommandation: À extraire vers un moteur runtime générique ou vers metadata. Ne pas ajouter de nouvelle logique locale ici.
- Moteur cible: RuntimeAutoFillEngine / RuntimeComputedFieldsEngine / RuntimeFieldLockingEngine / RuntimeRelationRefreshEngine / RuntimeActionEngine

### src/components/erp/forms/enterprise/ERPEnterpriseForm.tsx:235

- Priorité: P1
- Type audit: metadata-key-conditional
- Match: `metadata.key === "interventionsauto"`
- Code: `(item) => item.metadata.key === "interventionsauto"`
- Recommandation: À extraire vers un moteur runtime générique ou vers metadata. Ne pas ajouter de nouvelle logique locale ici.
- Moteur cible: RuntimeAutoFillEngine / RuntimeComputedFieldsEngine / RuntimeFieldLockingEngine / RuntimeRelationRefreshEngine / RuntimeActionEngine

### src/components/erp/forms/enterprise/ERPEnterpriseForm.tsx:416

- Priorité: P1
- Type audit: metadata-key-conditional
- Match: `metadata.key === "receptionsstockauto"`
- Code: `module.metadata.key === "receptionsstockauto" &&`
- Recommandation: À extraire vers un moteur runtime générique ou vers metadata. Ne pas ajouter de nouvelle logique locale ici.
- Moteur cible: RuntimeAutoFillEngine / RuntimeComputedFieldsEngine / RuntimeFieldLockingEngine / RuntimeRelationRefreshEngine / RuntimeActionEngine

### src/components/erp/forms/enterprise/ERPEnterpriseForm.tsx:636

- Priorité: P1
- Type audit: metadata-key-conditional
- Match: `metadata.key === "facturesauto"`
- Code: `module.metadata.key === "facturesauto" &&`
- Recommandation: À extraire vers un moteur runtime générique ou vers metadata. Ne pas ajouter de nouvelle logique locale ici.
- Moteur cible: RuntimeAutoFillEngine / RuntimeComputedFieldsEngine / RuntimeFieldLockingEngine / RuntimeRelationRefreshEngine / RuntimeActionEngine

### src/components/erp/forms/enterprise/ERPEnterpriseForm.tsx:774

- Priorité: P1
- Type audit: metadata-key-conditional
- Match: `metadata.key !== "lignesinterventionauto"`
- Code: `if (module.metadata.key !== "lignesinterventionauto") {`
- Recommandation: À extraire vers un moteur runtime générique ou vers metadata. Ne pas ajouter de nouvelle logique locale ici.
- Moteur cible: RuntimeAutoFillEngine / RuntimeComputedFieldsEngine / RuntimeFieldLockingEngine / RuntimeRelationRefreshEngine / RuntimeActionEngine

### src/components/erp/forms/enterprise/ERPEnterpriseForm.tsx:867

- Priorité: P1
- Type audit: metadata-key-conditional
- Match: `metadata.key === "lignesinterventionauto"`
- Code: `module.metadata.key === "lignesinterventionauto" &&`
- Recommandation: À extraire vers un moteur runtime générique ou vers metadata. Ne pas ajouter de nouvelle logique locale ici.
- Moteur cible: RuntimeAutoFillEngine / RuntimeComputedFieldsEngine / RuntimeFieldLockingEngine / RuntimeRelationRefreshEngine / RuntimeActionEngine

### src/components/erp/forms/enterprise/ERPEnterpriseForm.tsx:909

- Priorité: P1
- Type audit: metadata-key-conditional
- Match: `metadata.key !== "terrains"`
- Code: `if (module.metadata.key !== "terrains") {`
- Recommandation: À extraire vers un moteur runtime générique ou vers metadata. Ne pas ajouter de nouvelle logique locale ici.
- Moteur cible: RuntimeAutoFillEngine / RuntimeComputedFieldsEngine / RuntimeFieldLockingEngine / RuntimeRelationRefreshEngine / RuntimeActionEngine

### src/components/erp/forms/enterprise/ERPEnterpriseForm.tsx:937

- Priorité: P1
- Type audit: metadata-key-conditional
- Match: `metadata.key !== "terrains"`
- Code: `if (module.metadata.key !== "terrains") {`
- Recommandation: À extraire vers un moteur runtime générique ou vers metadata. Ne pas ajouter de nouvelle logique locale ici.
- Moteur cible: RuntimeAutoFillEngine / RuntimeComputedFieldsEngine / RuntimeFieldLockingEngine / RuntimeRelationRefreshEngine / RuntimeActionEngine

### src/components/erp/forms/enterprise/ERPEnterpriseForm.tsx:979

- Priorité: P1
- Type audit: metadata-key-conditional
- Match: `metadata.key !== "contrats"`
- Code: `if (module.metadata.key !== "contrats") {`
- Recommandation: À extraire vers un moteur runtime générique ou vers metadata. Ne pas ajouter de nouvelle logique locale ici.
- Moteur cible: RuntimeAutoFillEngine / RuntimeComputedFieldsEngine / RuntimeFieldLockingEngine / RuntimeRelationRefreshEngine / RuntimeActionEngine

### src/components/erp/forms/enterprise/ERPEnterpriseForm.tsx:1002

- Priorité: P1
- Type audit: metadata-key-conditional
- Match: `metadata.key !== "contrats"`
- Code: `if (module.metadata.key !== "contrats") {`
- Recommandation: À extraire vers un moteur runtime générique ou vers metadata. Ne pas ajouter de nouvelle logique locale ici.
- Moteur cible: RuntimeAutoFillEngine / RuntimeComputedFieldsEngine / RuntimeFieldLockingEngine / RuntimeRelationRefreshEngine / RuntimeActionEngine

### src/components/erp/forms/enterprise/ERPEnterpriseForm.tsx:1088

- Priorité: P1
- Type audit: metadata-key-conditional
- Match: `metadata.key === "terrains"`
- Code: `if (module.metadata.key === "terrains") {`
- Recommandation: À extraire vers un moteur runtime générique ou vers metadata. Ne pas ajouter de nouvelle logique locale ici.
- Moteur cible: RuntimeAutoFillEngine / RuntimeComputedFieldsEngine / RuntimeFieldLockingEngine / RuntimeRelationRefreshEngine / RuntimeActionEngine

### src/components/erp/forms/enterprise/ERPEnterpriseForm.tsx:1095

- Priorité: P1
- Type audit: metadata-key-conditional
- Match: `metadata.key === "contrats"`
- Code: `if (module.metadata.key === "contrats") {`
- Recommandation: À extraire vers un moteur runtime générique ou vers metadata. Ne pas ajouter de nouvelle logique locale ici.
- Moteur cible: RuntimeAutoFillEngine / RuntimeComputedFieldsEngine / RuntimeFieldLockingEngine / RuntimeRelationRefreshEngine / RuntimeActionEngine

### src/components/erp/forms/enterprise/ERPEnterpriseForm.tsx:1176

- Priorité: P1
- Type audit: metadata-key-conditional
- Match: `metadata.key ===
"exploitations"`
- Code: `module.metadata.key ===`
- Recommandation: À extraire vers un moteur runtime générique ou vers metadata. Ne pas ajouter de nouvelle logique locale ici.
- Moteur cible: RuntimeAutoFillEngine / RuntimeComputedFieldsEngine / RuntimeFieldLockingEngine / RuntimeRelationRefreshEngine / RuntimeActionEngine

### src/components/erp/forms/enterprise/ERPEnterpriseForm.tsx:1191

- Priorité: P1
- Type audit: metadata-key-conditional
- Match: `metadata.key === "contrats"`
- Code: `if (module.metadata.key === "contrats") {`
- Recommandation: À extraire vers un moteur runtime générique ou vers metadata. Ne pas ajouter de nouvelle logique locale ici.
- Moteur cible: RuntimeAutoFillEngine / RuntimeComputedFieldsEngine / RuntimeFieldLockingEngine / RuntimeRelationRefreshEngine / RuntimeActionEngine

### src/components/erp/forms/enterprise/ERPEnterpriseForm.tsx:1227

- Priorité: P1
- Type audit: metadata-key-conditional
- Match: `metadata.key ===
"exploitations"`
- Code: `module.metadata.key ===`
- Recommandation: À extraire vers un moteur runtime générique ou vers metadata. Ne pas ajouter de nouvelle logique locale ici.
- Moteur cible: RuntimeAutoFillEngine / RuntimeComputedFieldsEngine / RuntimeFieldLockingEngine / RuntimeRelationRefreshEngine / RuntimeActionEngine

### src/components/erp/forms/enterprise/ERPEnterpriseForm.tsx:1242

- Priorité: P1
- Type audit: metadata-key-conditional
- Match: `metadata.key === "contrats"`
- Code: `if (module.metadata.key === "contrats") {`
- Recommandation: À extraire vers un moteur runtime générique ou vers metadata. Ne pas ajouter de nouvelle logique locale ici.
- Moteur cible: RuntimeAutoFillEngine / RuntimeComputedFieldsEngine / RuntimeFieldLockingEngine / RuntimeRelationRefreshEngine / RuntimeActionEngine

### src/components/erp/forms/enterprise/ERPEnterpriseForm.tsx:1251

- Priorité: P1
- Type audit: metadata-key-conditional
- Match: `metadata.key === "lignesinterventionauto"`
- Code: `if (module.metadata.key === "lignesinterventionauto") {`
- Recommandation: À extraire vers un moteur runtime générique ou vers metadata. Ne pas ajouter de nouvelle logique locale ici.
- Moteur cible: RuntimeAutoFillEngine / RuntimeComputedFieldsEngine / RuntimeFieldLockingEngine / RuntimeRelationRefreshEngine / RuntimeActionEngine

### src/components/erp/forms/enterprise/ERPEnterpriseForm.tsx:206

- Priorité: P1
- Type audit: hardcoded-business-module
- Match: `facturesauto`
- Code: `"/facturesauto/" + factureId + "/edit"`
- Recommandation: À extraire vers un moteur runtime générique ou vers metadata. Ne pas ajouter de nouvelle logique locale ici.
- Moteur cible: RuntimeAutoFillEngine / RuntimeComputedFieldsEngine / RuntimeFieldLockingEngine / RuntimeRelationRefreshEngine / RuntimeActionEngine

### src/components/erp/forms/enterprise/ERPEnterpriseForm.tsx:214

- Priorité: P1
- Type audit: hardcoded-business-module
- Match: `encaissementsauto`
- Code: `return "/encaissementsauto/nouveau?" + params.toString();`
- Recommandation: À extraire vers un moteur runtime générique ou vers metadata. Ne pas ajouter de nouvelle logique locale ici.
- Moteur cible: RuntimeAutoFillEngine / RuntimeComputedFieldsEngine / RuntimeFieldLockingEngine / RuntimeRelationRefreshEngine / RuntimeActionEngine

### src/components/erp/forms/enterprise/ERPEnterpriseForm.tsx:230

- Priorité: P1
- Type audit: hardcoded-business-module
- Match: `lignesinterventionauto`
- Code: `(item) => item.metadata.key === "lignesinterventionauto"`
- Recommandation: À extraire vers un moteur runtime générique ou vers metadata. Ne pas ajouter de nouvelle logique locale ici.
- Moteur cible: RuntimeAutoFillEngine / RuntimeComputedFieldsEngine / RuntimeFieldLockingEngine / RuntimeRelationRefreshEngine / RuntimeActionEngine

### src/components/erp/forms/enterprise/ERPEnterpriseForm.tsx:235

- Priorité: P1
- Type audit: hardcoded-business-module
- Match: `interventionsauto`
- Code: `(item) => item.metadata.key === "interventionsauto"`
- Recommandation: À extraire vers un moteur runtime générique ou vers metadata. Ne pas ajouter de nouvelle logique locale ici.
- Moteur cible: RuntimeAutoFillEngine / RuntimeComputedFieldsEngine / RuntimeFieldLockingEngine / RuntimeRelationRefreshEngine / RuntimeActionEngine

### src/components/erp/forms/enterprise/ERPEnterpriseForm.tsx:416

- Priorité: P1
- Type audit: hardcoded-business-module
- Match: `receptionsstockauto`
- Code: `module.metadata.key === "receptionsstockauto" &&`
- Recommandation: À extraire vers un moteur runtime générique ou vers metadata. Ne pas ajouter de nouvelle logique locale ici.
- Moteur cible: RuntimeAutoFillEngine / RuntimeComputedFieldsEngine / RuntimeFieldLockingEngine / RuntimeRelationRefreshEngine / RuntimeActionEngine

### src/components/erp/forms/enterprise/ERPEnterpriseForm.tsx:636

- Priorité: P1
- Type audit: hardcoded-business-module
- Match: `facturesauto`
- Code: `module.metadata.key === "facturesauto" &&`
- Recommandation: À extraire vers un moteur runtime générique ou vers metadata. Ne pas ajouter de nouvelle logique locale ici.
- Moteur cible: RuntimeAutoFillEngine / RuntimeComputedFieldsEngine / RuntimeFieldLockingEngine / RuntimeRelationRefreshEngine / RuntimeActionEngine

### src/components/erp/forms/enterprise/ERPEnterpriseForm.tsx:774

- Priorité: P1
- Type audit: hardcoded-business-module
- Match: `lignesinterventionauto`
- Code: `if (module.metadata.key !== "lignesinterventionauto") {`
- Recommandation: À extraire vers un moteur runtime générique ou vers metadata. Ne pas ajouter de nouvelle logique locale ici.
- Moteur cible: RuntimeAutoFillEngine / RuntimeComputedFieldsEngine / RuntimeFieldLockingEngine / RuntimeRelationRefreshEngine / RuntimeActionEngine

### src/components/erp/forms/enterprise/ERPEnterpriseForm.tsx:867

- Priorité: P1
- Type audit: hardcoded-business-module
- Match: `lignesinterventionauto`
- Code: `module.metadata.key === "lignesinterventionauto" &&`
- Recommandation: À extraire vers un moteur runtime générique ou vers metadata. Ne pas ajouter de nouvelle logique locale ici.
- Moteur cible: RuntimeAutoFillEngine / RuntimeComputedFieldsEngine / RuntimeFieldLockingEngine / RuntimeRelationRefreshEngine / RuntimeActionEngine

### src/components/erp/forms/enterprise/ERPEnterpriseForm.tsx:1251

- Priorité: P1
- Type audit: hardcoded-business-module
- Match: `lignesinterventionauto`
- Code: `if (module.metadata.key === "lignesinterventionauto") {`
- Recommandation: À extraire vers un moteur runtime générique ou vers metadata. Ne pas ajouter de nouvelle logique locale ici.
- Moteur cible: RuntimeAutoFillEngine / RuntimeComputedFieldsEngine / RuntimeFieldLockingEngine / RuntimeRelationRefreshEngine / RuntimeActionEngine

### src/components/erp/forms/enterprise/ERPEnterpriseForm.tsx:1387

- Priorité: P1
- Type audit: hardcoded-business-module
- Match: `receptionsstockauto`
- Code: `if (moduleKey === "receptionsstockauto" && currentStatus === "brouillon") {`
- Recommandation: À extraire vers un moteur runtime générique ou vers metadata. Ne pas ajouter de nouvelle logique locale ici.
- Moteur cible: RuntimeAutoFillEngine / RuntimeComputedFieldsEngine / RuntimeFieldLockingEngine / RuntimeRelationRefreshEngine / RuntimeActionEngine

### src/components/erp/forms/enterprise/ERPEnterpriseForm.tsx:1397

- Priorité: P1
- Type audit: hardcoded-business-module
- Match: `clientsauto`
- Code: `if (moduleKey === "clientsauto" && currentStatus !== "archive") {`
- Recommandation: À extraire vers un moteur runtime générique ou vers metadata. Ne pas ajouter de nouvelle logique locale ici.
- Moteur cible: RuntimeAutoFillEngine / RuntimeComputedFieldsEngine / RuntimeFieldLockingEngine / RuntimeRelationRefreshEngine / RuntimeActionEngine

### src/components/erp/forms/enterprise/ERPEnterpriseForm.tsx:1406

- Priorité: P1
- Type audit: hardcoded-business-module
- Match: `vehicules`
- Code: `if (moduleKey === "vehicules" && currentStatus !== "archive") {`
- Recommandation: À extraire vers un moteur runtime générique ou vers metadata. Ne pas ajouter de nouvelle logique locale ici.
- Moteur cible: RuntimeAutoFillEngine / RuntimeComputedFieldsEngine / RuntimeFieldLockingEngine / RuntimeRelationRefreshEngine / RuntimeActionEngine

### src/components/erp/forms/enterprise/ERPEnterpriseForm.tsx:1419

- Priorité: P1
- Type audit: hardcoded-business-module
- Match: `facturesauto`
- Code: `moduleKey === "facturesauto" &&`
- Recommandation: À extraire vers un moteur runtime générique ou vers metadata. Ne pas ajouter de nouvelle logique locale ici.
- Moteur cible: RuntimeAutoFillEngine / RuntimeComputedFieldsEngine / RuntimeFieldLockingEngine / RuntimeRelationRefreshEngine / RuntimeActionEngine

### src/components/erp/forms/enterprise/ERPEnterpriseForm.tsx:1431

- Priorité: P1
- Type audit: hardcoded-business-module
- Match: `encaissementsauto`
- Code: `if (moduleKey === "encaissementsauto" && currentStatus !== "annule") {`
- Recommandation: À extraire vers un moteur runtime générique ou vers metadata. Ne pas ajouter de nouvelle logique locale ici.
- Moteur cible: RuntimeAutoFillEngine / RuntimeComputedFieldsEngine / RuntimeFieldLockingEngine / RuntimeRelationRefreshEngine / RuntimeActionEngine

### src/components/erp/forms/enterprise/ERPEnterpriseForm.tsx:1504

- Priorité: P1
- Type audit: hardcoded-business-module
- Match: `clientsauto`
- Code: `"clientsauto",`
- Recommandation: À extraire vers un moteur runtime générique ou vers metadata. Ne pas ajouter de nouvelle logique locale ici.
- Moteur cible: RuntimeAutoFillEngine / RuntimeComputedFieldsEngine / RuntimeFieldLockingEngine / RuntimeRelationRefreshEngine / RuntimeActionEngine

### src/components/erp/forms/enterprise/ERPEnterpriseForm.tsx:1505

- Priorité: P1
- Type audit: hardcoded-business-module
- Match: `vehicules`
- Code: `"vehicules",`
- Recommandation: À extraire vers un moteur runtime générique ou vers metadata. Ne pas ajouter de nouvelle logique locale ici.
- Moteur cible: RuntimeAutoFillEngine / RuntimeComputedFieldsEngine / RuntimeFieldLockingEngine / RuntimeRelationRefreshEngine / RuntimeActionEngine

### src/components/erp/forms/enterprise/ERPEnterpriseForm.tsx:1506

- Priorité: P1
- Type audit: hardcoded-business-module
- Match: `facturesauto`
- Code: `"facturesauto",`
- Recommandation: À extraire vers un moteur runtime générique ou vers metadata. Ne pas ajouter de nouvelle logique locale ici.
- Moteur cible: RuntimeAutoFillEngine / RuntimeComputedFieldsEngine / RuntimeFieldLockingEngine / RuntimeRelationRefreshEngine / RuntimeActionEngine

### src/components/erp/forms/enterprise/ERPEnterpriseForm.tsx:1507

- Priorité: P1
- Type audit: hardcoded-business-module
- Match: `encaissementsauto`
- Code: `"encaissementsauto",`
- Recommandation: À extraire vers un moteur runtime générique ou vers metadata. Ne pas ajouter de nouvelle logique locale ici.
- Moteur cible: RuntimeAutoFillEngine / RuntimeComputedFieldsEngine / RuntimeFieldLockingEngine / RuntimeRelationRefreshEngine / RuntimeActionEngine

### src/components/erp/forms/enterprise/ERPEnterpriseForm.tsx:1509

- Priorité: P1
- Type audit: hardcoded-business-module
- Match: `lignesinterventionauto`
- Code: `"lignesinterventionauto",`
- Recommandation: À extraire vers un moteur runtime générique ou vers metadata. Ne pas ajouter de nouvelle logique locale ici.
- Moteur cible: RuntimeAutoFillEngine / RuntimeComputedFieldsEngine / RuntimeFieldLockingEngine / RuntimeRelationRefreshEngine / RuntimeActionEngine

### src/components/erp/forms/enterprise/ERPEnterpriseForm.tsx:1510

- Priorité: P1
- Type audit: hardcoded-business-module
- Match: `receptionsstockauto`
- Code: `"receptionsstockauto",`
- Recommandation: À extraire vers un moteur runtime générique ou vers metadata. Ne pas ajouter de nouvelle logique locale ici.
- Moteur cible: RuntimeAutoFillEngine / RuntimeComputedFieldsEngine / RuntimeFieldLockingEngine / RuntimeRelationRefreshEngine / RuntimeActionEngine

### src/components/erp/forms/enterprise/ERPEnterpriseForm.tsx:1379

- Priorité: P1
- Type audit: business-status-action-local
- Match: `getBusinessStatusAction`
- Code: `function getBusinessStatusAction() {`
- Recommandation: À extraire vers un moteur runtime générique ou vers metadata. Ne pas ajouter de nouvelle logique locale ici.
- Moteur cible: RuntimeAutoFillEngine / RuntimeComputedFieldsEngine / RuntimeFieldLockingEngine / RuntimeRelationRefreshEngine / RuntimeActionEngine

### src/components/erp/forms/enterprise/ERPEnterpriseForm.tsx:1452

- Priorité: P1
- Type audit: business-status-action-local
- Match: `handleBusinessStatusAction`
- Code: `async function handleBusinessStatusAction() {`
- Recommandation: À extraire vers un moteur runtime générique ou vers metadata. Ne pas ajouter de nouvelle logique locale ici.
- Moteur cible: RuntimeAutoFillEngine / RuntimeComputedFieldsEngine / RuntimeFieldLockingEngine / RuntimeRelationRefreshEngine / RuntimeActionEngine

### src/components/erp/forms/enterprise/ERPEnterpriseForm.tsx:1453

- Priorité: P1
- Type audit: business-status-action-local
- Match: `getBusinessStatusAction`
- Code: `const action = getBusinessStatusAction();`
- Recommandation: À extraire vers un moteur runtime générique ou vers metadata. Ne pas ajouter de nouvelle logique locale ici.
- Moteur cible: RuntimeAutoFillEngine / RuntimeComputedFieldsEngine / RuntimeFieldLockingEngine / RuntimeRelationRefreshEngine / RuntimeActionEngine

### src/components/erp/forms/enterprise/ERPEnterpriseForm.tsx:1500

- Priorité: P1
- Type audit: business-status-action-local
- Match: `businessStatusAction`
- Code: `const businessStatusAction = isRemovedRecord ? null : getBusinessStatusAction();`
- Recommandation: À extraire vers un moteur runtime générique ou vers metadata. Ne pas ajouter de nouvelle logique locale ici.
- Moteur cible: RuntimeAutoFillEngine / RuntimeComputedFieldsEngine / RuntimeFieldLockingEngine / RuntimeRelationRefreshEngine / RuntimeActionEngine

### src/components/erp/forms/enterprise/ERPEnterpriseForm.tsx:1500

- Priorité: P1
- Type audit: business-status-action-local
- Match: `getBusinessStatusAction`
- Code: `const businessStatusAction = isRemovedRecord ? null : getBusinessStatusAction();`
- Recommandation: À extraire vers un moteur runtime générique ou vers metadata. Ne pas ajouter de nouvelle logique locale ici.
- Moteur cible: RuntimeAutoFillEngine / RuntimeComputedFieldsEngine / RuntimeFieldLockingEngine / RuntimeRelationRefreshEngine / RuntimeActionEngine

### src/components/erp/forms/enterprise/ERPEnterpriseForm.tsx:1858

- Priorité: P1
- Type audit: business-status-action-local
- Match: `businessStatusAction`
- Code: `{businessStatusAction ? (`
- Recommandation: À extraire vers un moteur runtime générique ou vers metadata. Ne pas ajouter de nouvelle logique locale ici.
- Moteur cible: RuntimeAutoFillEngine / RuntimeComputedFieldsEngine / RuntimeFieldLockingEngine / RuntimeRelationRefreshEngine / RuntimeActionEngine

### src/components/erp/forms/enterprise/ERPEnterpriseForm.tsx:1894

- Priorité: P1
- Type audit: business-status-action-local
- Match: `businessStatusAction`
- Code: `{businessStatusAction.label}`
- Recommandation: À extraire vers un moteur runtime générique ou vers metadata. Ne pas ajouter de nouvelle logique locale ici.
- Moteur cible: RuntimeAutoFillEngine / RuntimeComputedFieldsEngine / RuntimeFieldLockingEngine / RuntimeRelationRefreshEngine / RuntimeActionEngine

### src/components/erp/forms/enterprise/ERPEnterpriseForm.tsx:1927

- Priorité: P1
- Type audit: business-status-action-local
- Match: `handleBusinessStatusAction`
- Code: `onClick={handleBusinessStatusAction}`
- Recommandation: À extraire vers un moteur runtime générique ou vers metadata. Ne pas ajouter de nouvelle logique locale ici.
- Moteur cible: RuntimeAutoFillEngine / RuntimeComputedFieldsEngine / RuntimeFieldLockingEngine / RuntimeRelationRefreshEngine / RuntimeActionEngine

### src/components/erp/forms/enterprise/ERPEnterpriseForm.tsx:1936

- Priorité: P1
- Type audit: business-status-action-local
- Match: `businessStatusAction`
- Code: `{businessStatusAction.label}`
- Recommandation: À extraire vers un moteur runtime générique ou vers metadata. Ne pas ajouter de nouvelle logique locale ici.
- Moteur cible: RuntimeAutoFillEngine / RuntimeComputedFieldsEngine / RuntimeFieldLockingEngine / RuntimeRelationRefreshEngine / RuntimeActionEngine

### src/components/erp/forms/enterprise/ERPEnterpriseForm.tsx:146

- Priorité: P1
- Type audit: manual-amount-calculation
- Match: `montantTTC`
- Code: `const montantTTC =`
- Recommandation: À extraire vers un moteur runtime générique ou vers metadata. Ne pas ajouter de nouvelle logique locale ici.
- Moteur cible: RuntimeAutoFillEngine / RuntimeComputedFieldsEngine / RuntimeFieldLockingEngine / RuntimeRelationRefreshEngine / RuntimeActionEngine

### src/components/erp/forms/enterprise/ERPEnterpriseForm.tsx:147

- Priorité: P1
- Type audit: manual-amount-calculation
- Match: `montantTTC`
- Code: `Number(invoice.montantTTC ?? 0);`
- Recommandation: À extraire vers un moteur runtime générique ou vers metadata. Ne pas ajouter de nouvelle logique locale ici.
- Moteur cible: RuntimeAutoFillEngine / RuntimeComputedFieldsEngine / RuntimeFieldLockingEngine / RuntimeRelationRefreshEngine / RuntimeActionEngine

### src/components/erp/forms/enterprise/ERPEnterpriseForm.tsx:159

- Priorité: P1
- Type audit: manual-amount-calculation
- Match: `montantTTC`
- Code: `montantTTC - montantPaye,`
- Recommandation: À extraire vers un moteur runtime générique ou vers metadata. Ne pas ajouter de nouvelle logique locale ici.
- Moteur cible: RuntimeAutoFillEngine / RuntimeComputedFieldsEngine / RuntimeFieldLockingEngine / RuntimeRelationRefreshEngine / RuntimeActionEngine

### src/components/erp/forms/enterprise/ERPEnterpriseForm.tsx:313

- Priorité: P1
- Type audit: manual-amount-calculation
- Match: `montantTTC`
- Code: `const montantTTC =`
- Recommandation: À extraire vers un moteur runtime générique ou vers metadata. Ne pas ajouter de nouvelle logique locale ici.
- Moteur cible: RuntimeAutoFillEngine / RuntimeComputedFieldsEngine / RuntimeFieldLockingEngine / RuntimeRelationRefreshEngine / RuntimeActionEngine

### src/components/erp/forms/enterprise/ERPEnterpriseForm.tsx:314

- Priorité: P1
- Type audit: manual-amount-calculation
- Match: `montantTTC`
- Code: `Number(invoice.montantTTC ?? 0);`
- Recommandation: À extraire vers un moteur runtime générique ou vers metadata. Ne pas ajouter de nouvelle logique locale ici.
- Moteur cible: RuntimeAutoFillEngine / RuntimeComputedFieldsEngine / RuntimeFieldLockingEngine / RuntimeRelationRefreshEngine / RuntimeActionEngine

### src/components/erp/forms/enterprise/ERPEnterpriseForm.tsx:326

- Priorité: P1
- Type audit: manual-amount-calculation
- Match: `montantTTC`
- Code: `montantTTC - montantPaye,`
- Recommandation: À extraire vers un moteur runtime générique ou vers metadata. Ne pas ajouter de nouvelle logique locale ici.
- Moteur cible: RuntimeAutoFillEngine / RuntimeComputedFieldsEngine / RuntimeFieldLockingEngine / RuntimeRelationRefreshEngine / RuntimeActionEngine

### src/components/erp/forms/enterprise/ERPEnterpriseForm.tsx:331

- Priorité: P1
- Type audit: manual-amount-calculation
- Match: `montantTTC`
- Code: `montantTTC,`
- Recommandation: À extraire vers un moteur runtime générique ou vers metadata. Ne pas ajouter de nouvelle logique locale ici.
- Moteur cible: RuntimeAutoFillEngine / RuntimeComputedFieldsEngine / RuntimeFieldLockingEngine / RuntimeRelationRefreshEngine / RuntimeActionEngine

### src/components/erp/forms/enterprise/ERPEnterpriseForm.tsx:783

- Priorité: P1
- Type audit: manual-amount-calculation
- Match: `prixUnitaireHT`
- Code: `values.prixUnitaireHT ??`
- Recommandation: À extraire vers un moteur runtime générique ou vers metadata. Ne pas ajouter de nouvelle logique locale ici.
- Moteur cible: RuntimeAutoFillEngine / RuntimeComputedFieldsEngine / RuntimeFieldLockingEngine / RuntimeRelationRefreshEngine / RuntimeActionEngine

### src/components/erp/forms/enterprise/ERPEnterpriseForm.tsx:789

- Priorité: P1
- Type audit: manual-amount-calculation
- Match: `tauxTVA`
- Code: `toRuntimeNumber(values.tauxTVA, 18);`
- Recommandation: À extraire vers un moteur runtime générique ou vers metadata. Ne pas ajouter de nouvelle logique locale ici.
- Moteur cible: RuntimeAutoFillEngine / RuntimeComputedFieldsEngine / RuntimeFieldLockingEngine / RuntimeRelationRefreshEngine / RuntimeActionEngine

### src/components/erp/forms/enterprise/ERPEnterpriseForm.tsx:791

- Priorité: P1
- Type audit: manual-amount-calculation
- Match: `montantHT`
- Code: `const montantHT =`
- Recommandation: À extraire vers un moteur runtime générique ou vers metadata. Ne pas ajouter de nouvelle logique locale ici.
- Moteur cible: RuntimeAutoFillEngine / RuntimeComputedFieldsEngine / RuntimeFieldLockingEngine / RuntimeRelationRefreshEngine / RuntimeActionEngine

### src/components/erp/forms/enterprise/ERPEnterpriseForm.tsx:795

- Priorité: P1
- Type audit: manual-amount-calculation
- Match: `montantHT`
- Code: `Math.round((montantHT * taxRate / 100) * 100) / 100;`
- Recommandation: À extraire vers un moteur runtime générique ou vers metadata. Ne pas ajouter de nouvelle logique locale ici.
- Moteur cible: RuntimeAutoFillEngine / RuntimeComputedFieldsEngine / RuntimeFieldLockingEngine / RuntimeRelationRefreshEngine / RuntimeActionEngine

### src/components/erp/forms/enterprise/ERPEnterpriseForm.tsx:797

- Priorité: P1
- Type audit: manual-amount-calculation
- Match: `montantTTC`
- Code: `const montantTTC =`
- Recommandation: À extraire vers un moteur runtime générique ou vers metadata. Ne pas ajouter de nouvelle logique locale ici.
- Moteur cible: RuntimeAutoFillEngine / RuntimeComputedFieldsEngine / RuntimeFieldLockingEngine / RuntimeRelationRefreshEngine / RuntimeActionEngine

### src/components/erp/forms/enterprise/ERPEnterpriseForm.tsx:798

- Priorité: P1
- Type audit: manual-amount-calculation
- Match: `montantHT`
- Code: `Math.round((montantHT + montantTVA) * 100) / 100;`
- Recommandation: À extraire vers un moteur runtime générique ou vers metadata. Ne pas ajouter de nouvelle logique locale ici.
- Moteur cible: RuntimeAutoFillEngine / RuntimeComputedFieldsEngine / RuntimeFieldLockingEngine / RuntimeRelationRefreshEngine / RuntimeActionEngine

> 21 autres entrées masquées dans ce rapport Markdown. Voir JSON complet.

## PAGE_SHOULD_BE_THIN

### src/app/(private)/clientsauto/[id]/edit/page.tsx:19

- Priorité: P1
- Type audit: hardcoded-business-module
- Match: `clientsauto`
- Code: `moduleKey="clientsauto"`
- Recommandation: Les pages doivent rester minces. Toute logique métier doit passer par Generic pages + runtime.
- Moteur cible: GenericPage / ModuleRegistry / RuntimePage

### src/app/(private)/clientsauto/[id]/page.tsx:19

- Priorité: P1
- Type audit: hardcoded-business-module
- Match: `clientsauto`
- Code: `moduleKey="clientsauto"`
- Recommandation: Les pages doivent rester minces. Toute logique métier doit passer par Generic pages + runtime.
- Moteur cible: GenericPage / ModuleRegistry / RuntimePage

### src/app/(private)/clientsauto/analytics/page.tsx:6

- Priorité: P1
- Type audit: hardcoded-business-module
- Match: `clientsauto`
- Code: `module="clientsauto"`
- Recommandation: Les pages doivent rester minces. Toute logique métier doit passer par Generic pages + runtime.
- Moteur cible: GenericPage / ModuleRegistry / RuntimePage

### src/app/(private)/clientsauto/audit/page.tsx:6

- Priorité: P1
- Type audit: hardcoded-business-module
- Match: `clientsauto`
- Code: `module="clientsauto"`
- Recommandation: Les pages doivent rester minces. Toute logique métier doit passer par Generic pages + runtime.
- Moteur cible: GenericPage / ModuleRegistry / RuntimePage

### src/app/(private)/clientsauto/dashboard/page.tsx:6

- Priorité: P1
- Type audit: hardcoded-business-module
- Match: `clientsauto`
- Code: `module="clientsauto"`
- Recommandation: Les pages doivent rester minces. Toute logique métier doit passer par Generic pages + runtime.
- Moteur cible: GenericPage / ModuleRegistry / RuntimePage

### src/app/(private)/clientsauto/export/page.tsx:6

- Priorité: P1
- Type audit: hardcoded-business-module
- Match: `clientsauto`
- Code: `module="clientsauto"`
- Recommandation: Les pages doivent rester minces. Toute logique métier doit passer par Generic pages + runtime.
- Moteur cible: GenericPage / ModuleRegistry / RuntimePage

### src/app/(private)/clientsauto/import/page.tsx:6

- Priorité: P1
- Type audit: hardcoded-business-module
- Match: `clientsauto`
- Code: `module="clientsauto"`
- Recommandation: Les pages doivent rester minces. Toute logique métier doit passer par Generic pages + runtime.
- Moteur cible: GenericPage / ModuleRegistry / RuntimePage

### src/app/(private)/clientsauto/nouveau/page.tsx:8

- Priorité: P1
- Type audit: hardcoded-business-module
- Match: `clientsauto`
- Code: `moduleKey="clientsauto"`
- Recommandation: Les pages doivent rester minces. Toute logique métier doit passer par Generic pages + runtime.
- Moteur cible: GenericPage / ModuleRegistry / RuntimePage

### src/app/(private)/clientsauto/page.tsx:8

- Priorité: P1
- Type audit: hardcoded-business-module
- Match: `clientsauto`
- Code: `moduleKey="clientsauto"`
- Recommandation: Les pages doivent rester minces. Toute logique métier doit passer par Generic pages + runtime.
- Moteur cible: GenericPage / ModuleRegistry / RuntimePage

### src/app/(private)/clientsauto/relations/page.tsx:6

- Priorité: P1
- Type audit: hardcoded-business-module
- Match: `clientsauto`
- Code: `module="clientsauto"`
- Recommandation: Les pages doivent rester minces. Toute logique métier doit passer par Generic pages + runtime.
- Moteur cible: GenericPage / ModuleRegistry / RuntimePage

### src/app/(private)/clientsauto/workflows/page.tsx:6

- Priorité: P1
- Type audit: hardcoded-business-module
- Match: `clientsauto`
- Code: `module="clientsauto"`
- Recommandation: Les pages doivent rester minces. Toute logique métier doit passer par Generic pages + runtime.
- Moteur cible: GenericPage / ModuleRegistry / RuntimePage

### src/app/(private)/commandesstockauto/[id]/edit/page.tsx:19

- Priorité: P1
- Type audit: hardcoded-business-module
- Match: `commandesstockauto`
- Code: `moduleKey="commandesstockauto"`
- Recommandation: Les pages doivent rester minces. Toute logique métier doit passer par Generic pages + runtime.
- Moteur cible: GenericPage / ModuleRegistry / RuntimePage

### src/app/(private)/commandesstockauto/[id]/page.tsx:19

- Priorité: P1
- Type audit: hardcoded-business-module
- Match: `commandesstockauto`
- Code: `moduleKey="commandesstockauto"`
- Recommandation: Les pages doivent rester minces. Toute logique métier doit passer par Generic pages + runtime.
- Moteur cible: GenericPage / ModuleRegistry / RuntimePage

### src/app/(private)/commandesstockauto/analytics/page.tsx:6

- Priorité: P1
- Type audit: hardcoded-business-module
- Match: `commandesstockauto`
- Code: `module="commandesstockauto"`
- Recommandation: Les pages doivent rester minces. Toute logique métier doit passer par Generic pages + runtime.
- Moteur cible: GenericPage / ModuleRegistry / RuntimePage

### src/app/(private)/commandesstockauto/audit/page.tsx:6

- Priorité: P1
- Type audit: hardcoded-business-module
- Match: `commandesstockauto`
- Code: `module="commandesstockauto"`
- Recommandation: Les pages doivent rester minces. Toute logique métier doit passer par Generic pages + runtime.
- Moteur cible: GenericPage / ModuleRegistry / RuntimePage

### src/app/(private)/commandesstockauto/dashboard/page.tsx:6

- Priorité: P1
- Type audit: hardcoded-business-module
- Match: `commandesstockauto`
- Code: `module="commandesstockauto"`
- Recommandation: Les pages doivent rester minces. Toute logique métier doit passer par Generic pages + runtime.
- Moteur cible: GenericPage / ModuleRegistry / RuntimePage

### src/app/(private)/commandesstockauto/export/page.tsx:6

- Priorité: P1
- Type audit: hardcoded-business-module
- Match: `commandesstockauto`
- Code: `module="commandesstockauto"`
- Recommandation: Les pages doivent rester minces. Toute logique métier doit passer par Generic pages + runtime.
- Moteur cible: GenericPage / ModuleRegistry / RuntimePage

### src/app/(private)/commandesstockauto/import/page.tsx:6

- Priorité: P1
- Type audit: hardcoded-business-module
- Match: `commandesstockauto`
- Code: `module="commandesstockauto"`
- Recommandation: Les pages doivent rester minces. Toute logique métier doit passer par Generic pages + runtime.
- Moteur cible: GenericPage / ModuleRegistry / RuntimePage

### src/app/(private)/commandesstockauto/nouveau/page.tsx:8

- Priorité: P1
- Type audit: hardcoded-business-module
- Match: `commandesstockauto`
- Code: `moduleKey="commandesstockauto"`
- Recommandation: Les pages doivent rester minces. Toute logique métier doit passer par Generic pages + runtime.
- Moteur cible: GenericPage / ModuleRegistry / RuntimePage

### src/app/(private)/commandesstockauto/page.tsx:8

- Priorité: P1
- Type audit: hardcoded-business-module
- Match: `commandesstockauto`
- Code: `moduleKey="commandesstockauto"`
- Recommandation: Les pages doivent rester minces. Toute logique métier doit passer par Generic pages + runtime.
- Moteur cible: GenericPage / ModuleRegistry / RuntimePage

### src/app/(private)/commandesstockauto/relations/page.tsx:6

- Priorité: P1
- Type audit: hardcoded-business-module
- Match: `commandesstockauto`
- Code: `module="commandesstockauto"`
- Recommandation: Les pages doivent rester minces. Toute logique métier doit passer par Generic pages + runtime.
- Moteur cible: GenericPage / ModuleRegistry / RuntimePage

### src/app/(private)/commandesstockauto/workflows/page.tsx:6

- Priorité: P1
- Type audit: hardcoded-business-module
- Match: `commandesstockauto`
- Code: `module="commandesstockauto"`
- Recommandation: Les pages doivent rester minces. Toute logique métier doit passer par Generic pages + runtime.
- Moteur cible: GenericPage / ModuleRegistry / RuntimePage

### src/app/(private)/encaissementsauto/[id]/edit/page.tsx:19

- Priorité: P1
- Type audit: hardcoded-business-module
- Match: `encaissementsauto`
- Code: `moduleKey="encaissementsauto"`
- Recommandation: Les pages doivent rester minces. Toute logique métier doit passer par Generic pages + runtime.
- Moteur cible: GenericPage / ModuleRegistry / RuntimePage

### src/app/(private)/encaissementsauto/[id]/page.tsx:19

- Priorité: P1
- Type audit: hardcoded-business-module
- Match: `encaissementsauto`
- Code: `moduleKey="encaissementsauto"`
- Recommandation: Les pages doivent rester minces. Toute logique métier doit passer par Generic pages + runtime.
- Moteur cible: GenericPage / ModuleRegistry / RuntimePage

### src/app/(private)/encaissementsauto/nouveau/page.tsx:6

- Priorité: P1
- Type audit: hardcoded-business-module
- Match: `encaissementsauto`
- Code: `return <GenericCreatePage moduleKey="encaissementsauto" />;`
- Recommandation: Les pages doivent rester minces. Toute logique métier doit passer par Generic pages + runtime.
- Moteur cible: GenericPage / ModuleRegistry / RuntimePage

### src/app/(private)/encaissementsauto/page.tsx:6

- Priorité: P1
- Type audit: hardcoded-business-module
- Match: `encaissementsauto`
- Code: `return <GenericListPage moduleKey="encaissementsauto" />;`
- Recommandation: Les pages doivent rester minces. Toute logique métier doit passer par Generic pages + runtime.
- Moteur cible: GenericPage / ModuleRegistry / RuntimePage

### src/app/(private)/facturesauto/[id]/edit/page.tsx:19

- Priorité: P1
- Type audit: hardcoded-business-module
- Match: `facturesauto`
- Code: `moduleKey="facturesauto"`
- Recommandation: Les pages doivent rester minces. Toute logique métier doit passer par Generic pages + runtime.
- Moteur cible: GenericPage / ModuleRegistry / RuntimePage

### src/app/(private)/facturesauto/[id]/page.tsx:19

- Priorité: P1
- Type audit: hardcoded-business-module
- Match: `facturesauto`
- Code: `moduleKey="facturesauto"`
- Recommandation: Les pages doivent rester minces. Toute logique métier doit passer par Generic pages + runtime.
- Moteur cible: GenericPage / ModuleRegistry / RuntimePage

### src/app/(private)/facturesauto/analytics/page.tsx:6

- Priorité: P1
- Type audit: hardcoded-business-module
- Match: `facturesauto`
- Code: `module="facturesauto"`
- Recommandation: Les pages doivent rester minces. Toute logique métier doit passer par Generic pages + runtime.
- Moteur cible: GenericPage / ModuleRegistry / RuntimePage

### src/app/(private)/facturesauto/audit/page.tsx:6

- Priorité: P1
- Type audit: hardcoded-business-module
- Match: `facturesauto`
- Code: `module="facturesauto"`
- Recommandation: Les pages doivent rester minces. Toute logique métier doit passer par Generic pages + runtime.
- Moteur cible: GenericPage / ModuleRegistry / RuntimePage

### src/app/(private)/facturesauto/dashboard/page.tsx:6

- Priorité: P1
- Type audit: hardcoded-business-module
- Match: `facturesauto`
- Code: `module="facturesauto"`
- Recommandation: Les pages doivent rester minces. Toute logique métier doit passer par Generic pages + runtime.
- Moteur cible: GenericPage / ModuleRegistry / RuntimePage

### src/app/(private)/facturesauto/export/page.tsx:6

- Priorité: P1
- Type audit: hardcoded-business-module
- Match: `facturesauto`
- Code: `module="facturesauto"`
- Recommandation: Les pages doivent rester minces. Toute logique métier doit passer par Generic pages + runtime.
- Moteur cible: GenericPage / ModuleRegistry / RuntimePage

### src/app/(private)/facturesauto/import/page.tsx:6

- Priorité: P1
- Type audit: hardcoded-business-module
- Match: `facturesauto`
- Code: `module="facturesauto"`
- Recommandation: Les pages doivent rester minces. Toute logique métier doit passer par Generic pages + runtime.
- Moteur cible: GenericPage / ModuleRegistry / RuntimePage

### src/app/(private)/facturesauto/nouveau/page.tsx:8

- Priorité: P1
- Type audit: hardcoded-business-module
- Match: `facturesauto`
- Code: `moduleKey="facturesauto"`
- Recommandation: Les pages doivent rester minces. Toute logique métier doit passer par Generic pages + runtime.
- Moteur cible: GenericPage / ModuleRegistry / RuntimePage

### src/app/(private)/facturesauto/page.tsx:8

- Priorité: P1
- Type audit: hardcoded-business-module
- Match: `facturesauto`
- Code: `moduleKey="facturesauto"`
- Recommandation: Les pages doivent rester minces. Toute logique métier doit passer par Generic pages + runtime.
- Moteur cible: GenericPage / ModuleRegistry / RuntimePage

### src/app/(private)/facturesauto/relations/page.tsx:6

- Priorité: P1
- Type audit: hardcoded-business-module
- Match: `facturesauto`
- Code: `module="facturesauto"`
- Recommandation: Les pages doivent rester minces. Toute logique métier doit passer par Generic pages + runtime.
- Moteur cible: GenericPage / ModuleRegistry / RuntimePage

### src/app/(private)/facturesauto/workflows/page.tsx:6

- Priorité: P1
- Type audit: hardcoded-business-module
- Match: `facturesauto`
- Code: `module="facturesauto"`
- Recommandation: Les pages doivent rester minces. Toute logique métier doit passer par Generic pages + runtime.
- Moteur cible: GenericPage / ModuleRegistry / RuntimePage

### src/app/(private)/interventionsauto/[id]/edit/page.tsx:19

- Priorité: P1
- Type audit: hardcoded-business-module
- Match: `interventionsauto`
- Code: `moduleKey="interventionsauto"`
- Recommandation: Les pages doivent rester minces. Toute logique métier doit passer par Generic pages + runtime.
- Moteur cible: GenericPage / ModuleRegistry / RuntimePage

### src/app/(private)/interventionsauto/[id]/page.tsx:19

- Priorité: P1
- Type audit: hardcoded-business-module
- Match: `interventionsauto`
- Code: `moduleKey="interventionsauto"`
- Recommandation: Les pages doivent rester minces. Toute logique métier doit passer par Generic pages + runtime.
- Moteur cible: GenericPage / ModuleRegistry / RuntimePage

### src/app/(private)/interventionsauto/analytics/page.tsx:6

- Priorité: P1
- Type audit: hardcoded-business-module
- Match: `interventionsauto`
- Code: `module="interventionsauto"`
- Recommandation: Les pages doivent rester minces. Toute logique métier doit passer par Generic pages + runtime.
- Moteur cible: GenericPage / ModuleRegistry / RuntimePage

### src/app/(private)/interventionsauto/audit/page.tsx:6

- Priorité: P1
- Type audit: hardcoded-business-module
- Match: `interventionsauto`
- Code: `module="interventionsauto"`
- Recommandation: Les pages doivent rester minces. Toute logique métier doit passer par Generic pages + runtime.
- Moteur cible: GenericPage / ModuleRegistry / RuntimePage

### src/app/(private)/interventionsauto/dashboard/page.tsx:6

- Priorité: P1
- Type audit: hardcoded-business-module
- Match: `interventionsauto`
- Code: `module="interventionsauto"`
- Recommandation: Les pages doivent rester minces. Toute logique métier doit passer par Generic pages + runtime.
- Moteur cible: GenericPage / ModuleRegistry / RuntimePage

### src/app/(private)/interventionsauto/export/page.tsx:6

- Priorité: P1
- Type audit: hardcoded-business-module
- Match: `interventionsauto`
- Code: `module="interventionsauto"`
- Recommandation: Les pages doivent rester minces. Toute logique métier doit passer par Generic pages + runtime.
- Moteur cible: GenericPage / ModuleRegistry / RuntimePage

### src/app/(private)/interventionsauto/import/page.tsx:6

- Priorité: P1
- Type audit: hardcoded-business-module
- Match: `interventionsauto`
- Code: `module="interventionsauto"`
- Recommandation: Les pages doivent rester minces. Toute logique métier doit passer par Generic pages + runtime.
- Moteur cible: GenericPage / ModuleRegistry / RuntimePage

### src/app/(private)/interventionsauto/nouveau/page.tsx:8

- Priorité: P1
- Type audit: hardcoded-business-module
- Match: `interventionsauto`
- Code: `moduleKey="interventionsauto"`
- Recommandation: Les pages doivent rester minces. Toute logique métier doit passer par Generic pages + runtime.
- Moteur cible: GenericPage / ModuleRegistry / RuntimePage

### src/app/(private)/interventionsauto/page.tsx:8

- Priorité: P1
- Type audit: hardcoded-business-module
- Match: `interventionsauto`
- Code: `moduleKey="interventionsauto"`
- Recommandation: Les pages doivent rester minces. Toute logique métier doit passer par Generic pages + runtime.
- Moteur cible: GenericPage / ModuleRegistry / RuntimePage

### src/app/(private)/interventionsauto/relations/page.tsx:6

- Priorité: P1
- Type audit: hardcoded-business-module
- Match: `interventionsauto`
- Code: `module="interventionsauto"`
- Recommandation: Les pages doivent rester minces. Toute logique métier doit passer par Generic pages + runtime.
- Moteur cible: GenericPage / ModuleRegistry / RuntimePage

### src/app/(private)/interventionsauto/workflows/page.tsx:6

- Priorité: P1
- Type audit: hardcoded-business-module
- Match: `interventionsauto`
- Code: `module="interventionsauto"`
- Recommandation: Les pages doivent rester minces. Toute logique métier doit passer par Generic pages + runtime.
- Moteur cible: GenericPage / ModuleRegistry / RuntimePage

### src/app/(private)/lignescommandestockauto/[id]/edit/page.tsx:19

- Priorité: P1
- Type audit: hardcoded-business-module
- Match: `lignescommandestockauto`
- Code: `moduleKey="lignescommandestockauto"`
- Recommandation: Les pages doivent rester minces. Toute logique métier doit passer par Generic pages + runtime.
- Moteur cible: GenericPage / ModuleRegistry / RuntimePage

### src/app/(private)/lignescommandestockauto/[id]/page.tsx:19

- Priorité: P1
- Type audit: hardcoded-business-module
- Match: `lignescommandestockauto`
- Code: `moduleKey="lignescommandestockauto"`
- Recommandation: Les pages doivent rester minces. Toute logique métier doit passer par Generic pages + runtime.
- Moteur cible: GenericPage / ModuleRegistry / RuntimePage

### src/app/(private)/lignescommandestockauto/analytics/page.tsx:6

- Priorité: P1
- Type audit: hardcoded-business-module
- Match: `lignescommandestockauto`
- Code: `module="lignescommandestockauto"`
- Recommandation: Les pages doivent rester minces. Toute logique métier doit passer par Generic pages + runtime.
- Moteur cible: GenericPage / ModuleRegistry / RuntimePage

### src/app/(private)/lignescommandestockauto/audit/page.tsx:6

- Priorité: P1
- Type audit: hardcoded-business-module
- Match: `lignescommandestockauto`
- Code: `module="lignescommandestockauto"`
- Recommandation: Les pages doivent rester minces. Toute logique métier doit passer par Generic pages + runtime.
- Moteur cible: GenericPage / ModuleRegistry / RuntimePage

### src/app/(private)/lignescommandestockauto/dashboard/page.tsx:6

- Priorité: P1
- Type audit: hardcoded-business-module
- Match: `lignescommandestockauto`
- Code: `module="lignescommandestockauto"`
- Recommandation: Les pages doivent rester minces. Toute logique métier doit passer par Generic pages + runtime.
- Moteur cible: GenericPage / ModuleRegistry / RuntimePage

### src/app/(private)/lignescommandestockauto/export/page.tsx:6

- Priorité: P1
- Type audit: hardcoded-business-module
- Match: `lignescommandestockauto`
- Code: `module="lignescommandestockauto"`
- Recommandation: Les pages doivent rester minces. Toute logique métier doit passer par Generic pages + runtime.
- Moteur cible: GenericPage / ModuleRegistry / RuntimePage

### src/app/(private)/lignescommandestockauto/import/page.tsx:6

- Priorité: P1
- Type audit: hardcoded-business-module
- Match: `lignescommandestockauto`
- Code: `module="lignescommandestockauto"`
- Recommandation: Les pages doivent rester minces. Toute logique métier doit passer par Generic pages + runtime.
- Moteur cible: GenericPage / ModuleRegistry / RuntimePage

### src/app/(private)/lignescommandestockauto/nouveau/page.tsx:8

- Priorité: P1
- Type audit: hardcoded-business-module
- Match: `lignescommandestockauto`
- Code: `moduleKey="lignescommandestockauto"`
- Recommandation: Les pages doivent rester minces. Toute logique métier doit passer par Generic pages + runtime.
- Moteur cible: GenericPage / ModuleRegistry / RuntimePage

### src/app/(private)/lignescommandestockauto/page.tsx:8

- Priorité: P1
- Type audit: hardcoded-business-module
- Match: `lignescommandestockauto`
- Code: `moduleKey="lignescommandestockauto"`
- Recommandation: Les pages doivent rester minces. Toute logique métier doit passer par Generic pages + runtime.
- Moteur cible: GenericPage / ModuleRegistry / RuntimePage

### src/app/(private)/lignescommandestockauto/relations/page.tsx:6

- Priorité: P1
- Type audit: hardcoded-business-module
- Match: `lignescommandestockauto`
- Code: `module="lignescommandestockauto"`
- Recommandation: Les pages doivent rester minces. Toute logique métier doit passer par Generic pages + runtime.
- Moteur cible: GenericPage / ModuleRegistry / RuntimePage

### src/app/(private)/lignescommandestockauto/workflows/page.tsx:6

- Priorité: P1
- Type audit: hardcoded-business-module
- Match: `lignescommandestockauto`
- Code: `module="lignescommandestockauto"`
- Recommandation: Les pages doivent rester minces. Toute logique métier doit passer par Generic pages + runtime.
- Moteur cible: GenericPage / ModuleRegistry / RuntimePage

### src/app/(private)/lignesinterventionauto/[id]/edit/page.tsx:14

- Priorité: P1
- Type audit: hardcoded-business-module
- Match: `lignesinterventionauto`
- Code: `return <GenericEditPage moduleKey="lignesinterventionauto" id={id} />;`
- Recommandation: Les pages doivent rester minces. Toute logique métier doit passer par Generic pages + runtime.
- Moteur cible: GenericPage / ModuleRegistry / RuntimePage

### src/app/(private)/lignesinterventionauto/[id]/page.tsx:14

- Priorité: P1
- Type audit: hardcoded-business-module
- Match: `lignesinterventionauto`
- Code: `return <GenericDetailPage moduleKey="lignesinterventionauto" id={id} />;`
- Recommandation: Les pages doivent rester minces. Toute logique métier doit passer par Generic pages + runtime.
- Moteur cible: GenericPage / ModuleRegistry / RuntimePage

### src/app/(private)/lignesinterventionauto/nouveau/page.tsx:6

- Priorité: P1
- Type audit: hardcoded-business-module
- Match: `lignesinterventionauto`
- Code: `return <GenericCreatePage moduleKey="lignesinterventionauto" />;`
- Recommandation: Les pages doivent rester minces. Toute logique métier doit passer par Generic pages + runtime.
- Moteur cible: GenericPage / ModuleRegistry / RuntimePage

### src/app/(private)/lignesinterventionauto/page.tsx:6

- Priorité: P1
- Type audit: hardcoded-business-module
- Match: `lignesinterventionauto`
- Code: `return <GenericListPage moduleKey="lignesinterventionauto" />;`
- Recommandation: Les pages doivent rester minces. Toute logique métier doit passer par Generic pages + runtime.
- Moteur cible: GenericPage / ModuleRegistry / RuntimePage

### src/app/(private)/mouvementsstockauto/[id]/edit/page.tsx:14

- Priorité: P1
- Type audit: hardcoded-business-module
- Match: `mouvementsstockauto`
- Code: `return <GenericEditPage moduleKey="mouvementsstockauto" id={id} />;`
- Recommandation: Les pages doivent rester minces. Toute logique métier doit passer par Generic pages + runtime.
- Moteur cible: GenericPage / ModuleRegistry / RuntimePage

### src/app/(private)/mouvementsstockauto/[id]/page.tsx:14

- Priorité: P1
- Type audit: hardcoded-business-module
- Match: `mouvementsstockauto`
- Code: `return <GenericDetailPage moduleKey="mouvementsstockauto" id={id} />;`
- Recommandation: Les pages doivent rester minces. Toute logique métier doit passer par Generic pages + runtime.
- Moteur cible: GenericPage / ModuleRegistry / RuntimePage

### src/app/(private)/mouvementsstockauto/analytics/page.tsx:6

- Priorité: P1
- Type audit: hardcoded-business-module
- Match: `mouvementsstockauto`
- Code: `module="mouvementsstockauto"`
- Recommandation: Les pages doivent rester minces. Toute logique métier doit passer par Generic pages + runtime.
- Moteur cible: GenericPage / ModuleRegistry / RuntimePage

### src/app/(private)/mouvementsstockauto/audit/page.tsx:6

- Priorité: P1
- Type audit: hardcoded-business-module
- Match: `mouvementsstockauto`
- Code: `module="mouvementsstockauto"`
- Recommandation: Les pages doivent rester minces. Toute logique métier doit passer par Generic pages + runtime.
- Moteur cible: GenericPage / ModuleRegistry / RuntimePage

### src/app/(private)/mouvementsstockauto/dashboard/page.tsx:6

- Priorité: P1
- Type audit: hardcoded-business-module
- Match: `mouvementsstockauto`
- Code: `module="mouvementsstockauto"`
- Recommandation: Les pages doivent rester minces. Toute logique métier doit passer par Generic pages + runtime.
- Moteur cible: GenericPage / ModuleRegistry / RuntimePage

### src/app/(private)/mouvementsstockauto/export/page.tsx:6

- Priorité: P1
- Type audit: hardcoded-business-module
- Match: `mouvementsstockauto`
- Code: `module="mouvementsstockauto"`
- Recommandation: Les pages doivent rester minces. Toute logique métier doit passer par Generic pages + runtime.
- Moteur cible: GenericPage / ModuleRegistry / RuntimePage

### src/app/(private)/mouvementsstockauto/import/page.tsx:6

- Priorité: P1
- Type audit: hardcoded-business-module
- Match: `mouvementsstockauto`
- Code: `module="mouvementsstockauto"`
- Recommandation: Les pages doivent rester minces. Toute logique métier doit passer par Generic pages + runtime.
- Moteur cible: GenericPage / ModuleRegistry / RuntimePage

### src/app/(private)/mouvementsstockauto/nouveau/page.tsx:4

- Priorité: P1
- Type audit: hardcoded-business-module
- Match: `mouvementsstockauto`
- Code: `return <GenericCreatePage moduleKey="mouvementsstockauto" />;`
- Recommandation: Les pages doivent rester minces. Toute logique métier doit passer par Generic pages + runtime.
- Moteur cible: GenericPage / ModuleRegistry / RuntimePage

### src/app/(private)/mouvementsstockauto/page.tsx:4

- Priorité: P1
- Type audit: hardcoded-business-module
- Match: `mouvementsstockauto`
- Code: `return <GenericListPage moduleKey="mouvementsstockauto" />;`
- Recommandation: Les pages doivent rester minces. Toute logique métier doit passer par Generic pages + runtime.
- Moteur cible: GenericPage / ModuleRegistry / RuntimePage

### src/app/(private)/mouvementsstockauto/relations/page.tsx:6

- Priorité: P1
- Type audit: hardcoded-business-module
- Match: `mouvementsstockauto`
- Code: `module="mouvementsstockauto"`
- Recommandation: Les pages doivent rester minces. Toute logique métier doit passer par Generic pages + runtime.
- Moteur cible: GenericPage / ModuleRegistry / RuntimePage

### src/app/(private)/mouvementsstockauto/workflows/page.tsx:6

- Priorité: P1
- Type audit: hardcoded-business-module
- Match: `mouvementsstockauto`
- Code: `module="mouvementsstockauto"`
- Recommandation: Les pages doivent rester minces. Toute logique métier doit passer par Generic pages + runtime.
- Moteur cible: GenericPage / ModuleRegistry / RuntimePage

### src/app/(private)/receptionsstockauto/[id]/edit/page.tsx:19

- Priorité: P1
- Type audit: hardcoded-business-module
- Match: `receptionsstockauto`
- Code: `moduleKey="receptionsstockauto"`
- Recommandation: Les pages doivent rester minces. Toute logique métier doit passer par Generic pages + runtime.
- Moteur cible: GenericPage / ModuleRegistry / RuntimePage

### src/app/(private)/receptionsstockauto/[id]/page.tsx:19

- Priorité: P1
- Type audit: hardcoded-business-module
- Match: `receptionsstockauto`
- Code: `moduleKey="receptionsstockauto"`
- Recommandation: Les pages doivent rester minces. Toute logique métier doit passer par Generic pages + runtime.
- Moteur cible: GenericPage / ModuleRegistry / RuntimePage

### src/app/(private)/receptionsstockauto/analytics/page.tsx:6

- Priorité: P1
- Type audit: hardcoded-business-module
- Match: `receptionsstockauto`
- Code: `module="receptionsstockauto"`
- Recommandation: Les pages doivent rester minces. Toute logique métier doit passer par Generic pages + runtime.
- Moteur cible: GenericPage / ModuleRegistry / RuntimePage

### src/app/(private)/receptionsstockauto/audit/page.tsx:6

- Priorité: P1
- Type audit: hardcoded-business-module
- Match: `receptionsstockauto`
- Code: `module="receptionsstockauto"`
- Recommandation: Les pages doivent rester minces. Toute logique métier doit passer par Generic pages + runtime.
- Moteur cible: GenericPage / ModuleRegistry / RuntimePage

### src/app/(private)/receptionsstockauto/dashboard/page.tsx:6

- Priorité: P1
- Type audit: hardcoded-business-module
- Match: `receptionsstockauto`
- Code: `module="receptionsstockauto"`
- Recommandation: Les pages doivent rester minces. Toute logique métier doit passer par Generic pages + runtime.
- Moteur cible: GenericPage / ModuleRegistry / RuntimePage

### src/app/(private)/receptionsstockauto/export/page.tsx:6

- Priorité: P1
- Type audit: hardcoded-business-module
- Match: `receptionsstockauto`
- Code: `module="receptionsstockauto"`
- Recommandation: Les pages doivent rester minces. Toute logique métier doit passer par Generic pages + runtime.
- Moteur cible: GenericPage / ModuleRegistry / RuntimePage

> 46 autres entrées masquées dans ce rapport Markdown. Voir JSON complet.

## RUNTIME_ENGINE_TO_GENERALIZE

### src/runtime/actions/RuntimeActionEngine.ts:145

- Priorité: P2
- Type audit: hardcoded-business-module
- Match: `lignesinterventionauto`
- Code: `module?.metadata?.key === "lignesinterventionauto" &&`
- Recommandation: Acceptable temporairement si c’est dans un moteur, mais doit être généralisé par metadata et documenté.
- Moteur cible: Runtime engine générique

### src/runtime/business-rules/runtimeBusinessRules.ts:155

- Priorité: P2
- Type audit: module-metadata-key-conditional
- Match: `module.metadata.key ===
              "rappelsauto"`
- Code: `module.metadata.key ===`
- Recommandation: Acceptable temporairement si c’est dans un moteur, mais doit être généralisé par metadata et documenté.
- Moteur cible: Runtime engine générique

### src/runtime/business-rules/runtimeBusinessRules.ts:301

- Priorité: P2
- Type audit: module-metadata-key-conditional
- Match: `module.metadata.key ===
              "interventionsauto"`
- Code: `module.metadata.key ===`
- Recommandation: Acceptable temporairement si c’est dans un moteur, mais doit être généralisé par metadata et documenté.
- Moteur cible: Runtime engine générique

### src/runtime/business-rules/runtimeBusinessRules.ts:308

- Priorité: P2
- Type audit: module-metadata-key-conditional
- Match: `module.metadata.key ===
              "rendezvous"`
- Code: `module.metadata.key ===`
- Recommandation: Acceptable temporairement si c’est dans un moteur, mais doit être généralisé par metadata et documenté.
- Moteur cible: Runtime engine générique

### src/runtime/business-rules/runtimeBusinessRules.ts:464

- Priorité: P2
- Type audit: module-metadata-key-conditional
- Match: `module.metadata.key ===
              "interventionsauto"`
- Code: `module.metadata.key ===`
- Recommandation: Acceptable temporairement si c’est dans un moteur, mais doit être généralisé par metadata et documenté.
- Moteur cible: Runtime engine générique

### src/runtime/business-rules/runtimeBusinessRules.ts:471

- Priorité: P2
- Type audit: module-metadata-key-conditional
- Match: `module.metadata.key ===
              "rendezvous"`
- Code: `module.metadata.key ===`
- Recommandation: Acceptable temporairement si c’est dans un moteur, mais doit être généralisé par metadata et documenté.
- Moteur cible: Runtime engine générique

### src/runtime/business-rules/runtimeBusinessRules.ts:636

- Priorité: P2
- Type audit: module-metadata-key-conditional
- Match: `module.metadata.key ===
              "facturesauto"`
- Code: `module.metadata.key ===`
- Recommandation: Acceptable temporairement si c’est dans un moteur, mais doit être généralisé par metadata et documenté.
- Moteur cible: Runtime engine générique

### src/runtime/business-rules/runtimeBusinessRules.ts:651

- Priorité: P2
- Type audit: module-metadata-key-conditional
- Match: `module.metadata.key ===
              "interventionsauto"`
- Code: `module.metadata.key ===`
- Recommandation: Acceptable temporairement si c’est dans un moteur, mais doit être généralisé par metadata et documenté.
- Moteur cible: Runtime engine générique

### src/runtime/business-rules/runtimeBusinessRules.ts:1009

- Priorité: P2
- Type audit: module-metadata-key-conditional
- Match: `module.metadata.key ===
              "facturesauto"`
- Code: `module.metadata.key ===`
- Recommandation: Acceptable temporairement si c’est dans un moteur, mais doit être généralisé par metadata et documenté.
- Moteur cible: Runtime engine générique

### src/runtime/business-rules/runtimeBusinessRules.ts:1016

- Priorité: P2
- Type audit: module-metadata-key-conditional
- Match: `module.metadata.key ===
              "encaissementsauto"`
- Code: `module.metadata.key ===`
- Recommandation: Acceptable temporairement si c’est dans un moteur, mais doit être généralisé par metadata et documenté.
- Moteur cible: Runtime engine générique

### src/runtime/business-rules/runtimeBusinessRules.ts:1023

- Priorité: P2
- Type audit: module-metadata-key-conditional
- Match: `module.metadata.key ===
              "interventionsauto"`
- Code: `module.metadata.key ===`
- Recommandation: Acceptable temporairement si c’est dans un moteur, mais doit être généralisé par metadata et documenté.
- Moteur cible: Runtime engine générique

### src/runtime/business-rules/runtimeBusinessRules.ts:1258

- Priorité: P2
- Type audit: module-metadata-key-conditional
- Match: `module.metadata.key ===
              "facturesauto"`
- Code: `module.metadata.key ===`
- Recommandation: Acceptable temporairement si c’est dans un moteur, mais doit être généralisé par metadata et documenté.
- Moteur cible: Runtime engine générique

### src/runtime/business-rules/runtimeBusinessRules.ts:1265

- Priorité: P2
- Type audit: module-metadata-key-conditional
- Match: `module.metadata.key ===
              "encaissementsauto"`
- Code: `module.metadata.key ===`
- Recommandation: Acceptable temporairement si c’est dans un moteur, mais doit être généralisé par metadata et documenté.
- Moteur cible: Runtime engine générique

### src/runtime/business-rules/runtimeBusinessRules.ts:1272

- Priorité: P2
- Type audit: module-metadata-key-conditional
- Match: `module.metadata.key ===
              "interventionsauto"`
- Code: `module.metadata.key ===`
- Recommandation: Acceptable temporairement si c’est dans un moteur, mais doit être généralisé par metadata et documenté.
- Moteur cible: Runtime engine générique

### src/runtime/business-rules/runtimeBusinessRules.ts:1543

- Priorité: P2
- Type audit: module-metadata-key-conditional
- Match: `module.metadata.key ===
              "rappelsauto"`
- Code: `module.metadata.key ===`
- Recommandation: Acceptable temporairement si c’est dans un moteur, mais doit être généralisé par metadata et documenté.
- Moteur cible: Runtime engine générique

### src/runtime/business-rules/runtimeBusinessRules.ts:1550

- Priorité: P2
- Type audit: module-metadata-key-conditional
- Match: `module.metadata.key ===
              "echeancespaiementauto"`
- Code: `module.metadata.key ===`
- Recommandation: Acceptable temporairement si c’est dans un moteur, mais doit être généralisé par metadata et documenté.
- Moteur cible: Runtime engine générique

### src/runtime/business-rules/runtimeBusinessRules.ts:1703

- Priorité: P2
- Type audit: module-metadata-key-conditional
- Match: `module.metadata.key ===
              "rappelsauto"`
- Code: `module.metadata.key ===`
- Recommandation: Acceptable temporairement si c’est dans un moteur, mais doit être généralisé par metadata et documenté.
- Moteur cible: Runtime engine générique

### src/runtime/business-rules/runtimeBusinessRules.ts:1710

- Priorité: P2
- Type audit: module-metadata-key-conditional
- Match: `module.metadata.key ===
              "echeancespaiementauto"`
- Code: `module.metadata.key ===`
- Recommandation: Acceptable temporairement si c’est dans un moteur, mais doit être généralisé par metadata et documenté.
- Moteur cible: Runtime engine générique

### src/runtime/business-rules/runtimeBusinessRules.ts:155

- Priorité: P2
- Type audit: metadata-key-conditional
- Match: `metadata.key ===
              "rappelsauto"`
- Code: `module.metadata.key ===`
- Recommandation: Acceptable temporairement si c’est dans un moteur, mais doit être généralisé par metadata et documenté.
- Moteur cible: Runtime engine générique

### src/runtime/business-rules/runtimeBusinessRules.ts:301

- Priorité: P2
- Type audit: metadata-key-conditional
- Match: `metadata.key ===
              "interventionsauto"`
- Code: `module.metadata.key ===`
- Recommandation: Acceptable temporairement si c’est dans un moteur, mais doit être généralisé par metadata et documenté.
- Moteur cible: Runtime engine générique

### src/runtime/business-rules/runtimeBusinessRules.ts:308

- Priorité: P2
- Type audit: metadata-key-conditional
- Match: `metadata.key ===
              "rendezvous"`
- Code: `module.metadata.key ===`
- Recommandation: Acceptable temporairement si c’est dans un moteur, mais doit être généralisé par metadata et documenté.
- Moteur cible: Runtime engine générique

### src/runtime/business-rules/runtimeBusinessRules.ts:464

- Priorité: P2
- Type audit: metadata-key-conditional
- Match: `metadata.key ===
              "interventionsauto"`
- Code: `module.metadata.key ===`
- Recommandation: Acceptable temporairement si c’est dans un moteur, mais doit être généralisé par metadata et documenté.
- Moteur cible: Runtime engine générique

### src/runtime/business-rules/runtimeBusinessRules.ts:471

- Priorité: P2
- Type audit: metadata-key-conditional
- Match: `metadata.key ===
              "rendezvous"`
- Code: `module.metadata.key ===`
- Recommandation: Acceptable temporairement si c’est dans un moteur, mais doit être généralisé par metadata et documenté.
- Moteur cible: Runtime engine générique

### src/runtime/business-rules/runtimeBusinessRules.ts:636

- Priorité: P2
- Type audit: metadata-key-conditional
- Match: `metadata.key ===
              "facturesauto"`
- Code: `module.metadata.key ===`
- Recommandation: Acceptable temporairement si c’est dans un moteur, mais doit être généralisé par metadata et documenté.
- Moteur cible: Runtime engine générique

### src/runtime/business-rules/runtimeBusinessRules.ts:651

- Priorité: P2
- Type audit: metadata-key-conditional
- Match: `metadata.key ===
              "interventionsauto"`
- Code: `module.metadata.key ===`
- Recommandation: Acceptable temporairement si c’est dans un moteur, mais doit être généralisé par metadata et documenté.
- Moteur cible: Runtime engine générique

### src/runtime/business-rules/runtimeBusinessRules.ts:1009

- Priorité: P2
- Type audit: metadata-key-conditional
- Match: `metadata.key ===
              "facturesauto"`
- Code: `module.metadata.key ===`
- Recommandation: Acceptable temporairement si c’est dans un moteur, mais doit être généralisé par metadata et documenté.
- Moteur cible: Runtime engine générique

### src/runtime/business-rules/runtimeBusinessRules.ts:1016

- Priorité: P2
- Type audit: metadata-key-conditional
- Match: `metadata.key ===
              "encaissementsauto"`
- Code: `module.metadata.key ===`
- Recommandation: Acceptable temporairement si c’est dans un moteur, mais doit être généralisé par metadata et documenté.
- Moteur cible: Runtime engine générique

### src/runtime/business-rules/runtimeBusinessRules.ts:1023

- Priorité: P2
- Type audit: metadata-key-conditional
- Match: `metadata.key ===
              "interventionsauto"`
- Code: `module.metadata.key ===`
- Recommandation: Acceptable temporairement si c’est dans un moteur, mais doit être généralisé par metadata et documenté.
- Moteur cible: Runtime engine générique

### src/runtime/business-rules/runtimeBusinessRules.ts:1258

- Priorité: P2
- Type audit: metadata-key-conditional
- Match: `metadata.key ===
              "facturesauto"`
- Code: `module.metadata.key ===`
- Recommandation: Acceptable temporairement si c’est dans un moteur, mais doit être généralisé par metadata et documenté.
- Moteur cible: Runtime engine générique

### src/runtime/business-rules/runtimeBusinessRules.ts:1265

- Priorité: P2
- Type audit: metadata-key-conditional
- Match: `metadata.key ===
              "encaissementsauto"`
- Code: `module.metadata.key ===`
- Recommandation: Acceptable temporairement si c’est dans un moteur, mais doit être généralisé par metadata et documenté.
- Moteur cible: Runtime engine générique

### src/runtime/business-rules/runtimeBusinessRules.ts:1272

- Priorité: P2
- Type audit: metadata-key-conditional
- Match: `metadata.key ===
              "interventionsauto"`
- Code: `module.metadata.key ===`
- Recommandation: Acceptable temporairement si c’est dans un moteur, mais doit être généralisé par metadata et documenté.
- Moteur cible: Runtime engine générique

### src/runtime/business-rules/runtimeBusinessRules.ts:1543

- Priorité: P2
- Type audit: metadata-key-conditional
- Match: `metadata.key ===
              "rappelsauto"`
- Code: `module.metadata.key ===`
- Recommandation: Acceptable temporairement si c’est dans un moteur, mais doit être généralisé par metadata et documenté.
- Moteur cible: Runtime engine générique

### src/runtime/business-rules/runtimeBusinessRules.ts:1550

- Priorité: P2
- Type audit: metadata-key-conditional
- Match: `metadata.key ===
              "echeancespaiementauto"`
- Code: `module.metadata.key ===`
- Recommandation: Acceptable temporairement si c’est dans un moteur, mais doit être généralisé par metadata et documenté.
- Moteur cible: Runtime engine générique

### src/runtime/business-rules/runtimeBusinessRules.ts:1703

- Priorité: P2
- Type audit: metadata-key-conditional
- Match: `metadata.key ===
              "rappelsauto"`
- Code: `module.metadata.key ===`
- Recommandation: Acceptable temporairement si c’est dans un moteur, mais doit être généralisé par metadata et documenté.
- Moteur cible: Runtime engine générique

### src/runtime/business-rules/runtimeBusinessRules.ts:1710

- Priorité: P2
- Type audit: metadata-key-conditional
- Match: `metadata.key ===
              "echeancespaiementauto"`
- Code: `module.metadata.key ===`
- Recommandation: Acceptable temporairement si c’est dans un moteur, mais doit être généralisé par metadata et documenté.
- Moteur cible: Runtime engine générique

### src/runtime/business-rules/runtimeBusinessRules.ts:132

- Priorité: P2
- Type audit: hardcoded-business-module
- Match: `interventionsauto`
- Code: `"interventionsauto",`
- Recommandation: Acceptable temporairement si c’est dans un moteur, mais doit être généralisé par metadata et documenté.
- Moteur cible: Runtime engine générique

### src/runtime/business-rules/runtimeBusinessRules.ts:135

- Priorité: P2
- Type audit: hardcoded-business-module
- Match: `interventionsauto`
- Code: `"interventionsauto.created",`
- Recommandation: Acceptable temporairement si c’est dans un moteur, mais doit être généralisé par metadata et documenté.
- Moteur cible: Runtime engine générique

### src/runtime/business-rules/runtimeBusinessRules.ts:237

- Priorité: P2
- Type audit: hardcoded-business-module
- Match: `facturesauto`
- Code: `"facturesauto",`
- Recommandation: Acceptable temporairement si c’est dans un moteur, mais doit être généralisé par metadata et documenté.
- Moteur cible: Runtime engine générique

### src/runtime/business-rules/runtimeBusinessRules.ts:250

- Priorité: P2
- Type audit: hardcoded-business-module
- Match: `interventionsauto`
- Code: `"interventionsauto",`
- Recommandation: Acceptable temporairement si c’est dans un moteur, mais doit être généralisé par metadata et documenté.
- Moteur cible: Runtime engine générique

### src/runtime/business-rules/runtimeBusinessRules.ts:302

- Priorité: P2
- Type audit: hardcoded-business-module
- Match: `interventionsauto`
- Code: `"interventionsauto"`
- Recommandation: Acceptable temporairement si c’est dans un moteur, mais doit être généralisé par metadata et documenté.
- Moteur cible: Runtime engine générique

### src/runtime/business-rules/runtimeBusinessRules.ts:352

- Priorité: P2
- Type audit: hardcoded-business-module
- Match: `interventionsauto`
- Code: `"interventionsauto",`
- Recommandation: Acceptable temporairement si c’est dans un moteur, mais doit être généralisé par metadata et documenté.
- Moteur cible: Runtime engine générique

### src/runtime/business-rules/runtimeBusinessRules.ts:428

- Priorité: P2
- Type audit: hardcoded-business-module
- Match: `interventionsauto`
- Code: `"interventionsauto",`
- Recommandation: Acceptable temporairement si c’est dans un moteur, mais doit être généralisé par metadata et documenté.
- Moteur cible: Runtime engine générique

### src/runtime/business-rules/runtimeBusinessRules.ts:465

- Priorité: P2
- Type audit: hardcoded-business-module
- Match: `interventionsauto`
- Code: `"interventionsauto"`
- Recommandation: Acceptable temporairement si c’est dans un moteur, mais doit être généralisé par metadata et documenté.
- Moteur cible: Runtime engine générique

### src/runtime/business-rules/runtimeBusinessRules.ts:515

- Priorité: P2
- Type audit: hardcoded-business-module
- Match: `interventionsauto`
- Code: `"interventionsauto",`
- Recommandation: Acceptable temporairement si c’est dans un moteur, mais doit être généralisé par metadata et documenté.
- Moteur cible: Runtime engine générique

### src/runtime/business-rules/runtimeBusinessRules.ts:591

- Priorité: P2
- Type audit: hardcoded-business-module
- Match: `interventionsauto`
- Code: `"interventionsauto",`
- Recommandation: Acceptable temporairement si c’est dans un moteur, mais doit être généralisé par metadata et documenté.
- Moteur cible: Runtime engine générique

### src/runtime/business-rules/runtimeBusinessRules.ts:616

- Priorité: P2
- Type audit: hardcoded-business-module
- Match: `interventionsauto`
- Code: `"interventionsauto",`
- Recommandation: Acceptable temporairement si c’est dans un moteur, mais doit être généralisé par metadata et documenté.
- Moteur cible: Runtime engine générique

### src/runtime/business-rules/runtimeBusinessRules.ts:619

- Priorité: P2
- Type audit: hardcoded-business-module
- Match: `interventionsauto`
- Code: `"interventionsauto.updated",`
- Recommandation: Acceptable temporairement si c’est dans un moteur, mais doit être généralisé par metadata et documenté.
- Moteur cible: Runtime engine générique

### src/runtime/business-rules/runtimeBusinessRules.ts:637

- Priorité: P2
- Type audit: hardcoded-business-module
- Match: `facturesauto`
- Code: `"facturesauto"`
- Recommandation: Acceptable temporairement si c’est dans un moteur, mais doit être généralisé par metadata et documenté.
- Moteur cible: Runtime engine générique

### src/runtime/business-rules/runtimeBusinessRules.ts:652

- Priorité: P2
- Type audit: hardcoded-business-module
- Match: `interventionsauto`
- Code: `"interventionsauto"`
- Recommandation: Acceptable temporairement si c’est dans un moteur, mais doit être généralisé par metadata et documenté.
- Moteur cible: Runtime engine générique

### src/runtime/business-rules/runtimeBusinessRules.ts:855

- Priorité: P2
- Type audit: hardcoded-business-module
- Match: `interventionsauto`
- Code: `"interventionsauto",`
- Recommandation: Acceptable temporairement si c’est dans un moteur, mais doit être généralisé par metadata et documenté.
- Moteur cible: Runtime engine générique

### src/runtime/business-rules/runtimeBusinessRules.ts:869

- Priorité: P2
- Type audit: hardcoded-business-module
- Match: `facturesauto`
- Code: `"facturesauto",`
- Recommandation: Acceptable temporairement si c’est dans un moteur, mais doit être généralisé par metadata et documenté.
- Moteur cible: Runtime engine générique

### src/runtime/business-rules/runtimeBusinessRules.ts:897

- Priorité: P2
- Type audit: hardcoded-business-module
- Match: `facturesauto`
- Code: `"facturesauto",`
- Recommandation: Acceptable temporairement si c’est dans un moteur, mais doit être généralisé par metadata et documenté.
- Moteur cible: Runtime engine générique

### src/runtime/business-rules/runtimeBusinessRules.ts:900

- Priorité: P2
- Type audit: hardcoded-business-module
- Match: `facturesauto`
- Code: `"facturesauto.updated",`
- Recommandation: Acceptable temporairement si c’est dans un moteur, mais doit être généralisé par metadata et documenté.
- Moteur cible: Runtime engine générique

### src/runtime/business-rules/runtimeBusinessRules.ts:925

- Priorité: P2
- Type audit: hardcoded-business-module
- Match: `facturesauto`
- Code: `"facturesauto",`
- Recommandation: Acceptable temporairement si c’est dans un moteur, mais doit être généralisé par metadata et documenté.
- Moteur cible: Runtime engine générique

### src/runtime/business-rules/runtimeBusinessRules.ts:948

- Priorité: P2
- Type audit: hardcoded-business-module
- Match: `facturesauto`
- Code: `"facturesauto",`
- Recommandation: Acceptable temporairement si c’est dans un moteur, mais doit être généralisé par metadata et documenté.
- Moteur cible: Runtime engine générique

### src/runtime/business-rules/runtimeBusinessRules.ts:965

- Priorité: P2
- Type audit: hardcoded-business-module
- Match: `facturesauto`
- Code: `"facturesauto",`
- Recommandation: Acceptable temporairement si c’est dans un moteur, mais doit être généralisé par metadata et documenté.
- Moteur cible: Runtime engine générique

### src/runtime/business-rules/runtimeBusinessRules.ts:993

- Priorité: P2
- Type audit: hardcoded-business-module
- Match: `encaissementsauto`
- Code: `"encaissementsauto",`
- Recommandation: Acceptable temporairement si c’est dans un moteur, mais doit être généralisé par metadata et documenté.
- Moteur cible: Runtime engine générique

### src/runtime/business-rules/runtimeBusinessRules.ts:996

- Priorité: P2
- Type audit: hardcoded-business-module
- Match: `encaissementsauto`
- Code: `"encaissementsauto.created",`
- Recommandation: Acceptable temporairement si c’est dans un moteur, mais doit être généralisé par metadata et documenté.
- Moteur cible: Runtime engine générique

### src/runtime/business-rules/runtimeBusinessRules.ts:1010

- Priorité: P2
- Type audit: hardcoded-business-module
- Match: `facturesauto`
- Code: `"facturesauto"`
- Recommandation: Acceptable temporairement si c’est dans un moteur, mais doit être généralisé par metadata et documenté.
- Moteur cible: Runtime engine générique

### src/runtime/business-rules/runtimeBusinessRules.ts:1017

- Priorité: P2
- Type audit: hardcoded-business-module
- Match: `encaissementsauto`
- Code: `"encaissementsauto"`
- Recommandation: Acceptable temporairement si c’est dans un moteur, mais doit être généralisé par metadata et documenté.
- Moteur cible: Runtime engine générique

### src/runtime/business-rules/runtimeBusinessRules.ts:1024

- Priorité: P2
- Type audit: hardcoded-business-module
- Match: `interventionsauto`
- Code: `"interventionsauto"`
- Recommandation: Acceptable temporairement si c’est dans un moteur, mais doit être généralisé par metadata et documenté.
- Moteur cible: Runtime engine générique

### src/runtime/business-rules/runtimeBusinessRules.ts:1218

- Priorité: P2
- Type audit: hardcoded-business-module
- Match: `facturesauto`
- Code: `"facturesauto",`
- Recommandation: Acceptable temporairement si c’est dans un moteur, mais doit être généralisé par metadata et documenté.
- Moteur cible: Runtime engine générique

### src/runtime/business-rules/runtimeBusinessRules.ts:1242

- Priorité: P2
- Type audit: hardcoded-business-module
- Match: `encaissementsauto`
- Code: `"encaissementsauto",`
- Recommandation: Acceptable temporairement si c’est dans un moteur, mais doit être généralisé par metadata et documenté.
- Moteur cible: Runtime engine générique

### src/runtime/business-rules/runtimeBusinessRules.ts:1245

- Priorité: P2
- Type audit: hardcoded-business-module
- Match: `encaissementsauto`
- Code: `"encaissementsauto.updated",`
- Recommandation: Acceptable temporairement si c’est dans un moteur, mais doit être généralisé par metadata et documenté.
- Moteur cible: Runtime engine générique

### src/runtime/business-rules/runtimeBusinessRules.ts:1259

- Priorité: P2
- Type audit: hardcoded-business-module
- Match: `facturesauto`
- Code: `"facturesauto"`
- Recommandation: Acceptable temporairement si c’est dans un moteur, mais doit être généralisé par metadata et documenté.
- Moteur cible: Runtime engine générique

### src/runtime/business-rules/runtimeBusinessRules.ts:1266

- Priorité: P2
- Type audit: hardcoded-business-module
- Match: `encaissementsauto`
- Code: `"encaissementsauto"`
- Recommandation: Acceptable temporairement si c’est dans un moteur, mais doit être généralisé par metadata et documenté.
- Moteur cible: Runtime engine générique

### src/runtime/business-rules/runtimeBusinessRules.ts:1273

- Priorité: P2
- Type audit: hardcoded-business-module
- Match: `interventionsauto`
- Code: `"interventionsauto"`
- Recommandation: Acceptable temporairement si c’est dans un moteur, mais doit être généralisé par metadata et documenté.
- Moteur cible: Runtime engine générique

### src/runtime/business-rules/runtimeBusinessRules.ts:1467

- Priorité: P2
- Type audit: hardcoded-business-module
- Match: `facturesauto`
- Code: `"facturesauto",`
- Recommandation: Acceptable temporairement si c’est dans un moteur, mais doit être généralisé par metadata et documenté.
- Moteur cible: Runtime engine générique

### src/runtime/business-rules/runtimeBusinessRules.ts:722

- Priorité: P2
- Type audit: manual-amount-calculation
- Match: `montantHT`
- Code: `const montantHT =`
- Recommandation: Acceptable temporairement si c’est dans un moteur, mais doit être généralisé par metadata et documenté.
- Moteur cible: Runtime engine générique

### src/runtime/business-rules/runtimeBusinessRules.ts:724

- Priorité: P2
- Type audit: manual-amount-calculation
- Match: `montantHT`
- Code: `asNumber(intervention.montantHT) ||`
- Recommandation: Acceptable temporairement si c’est dans un moteur, mais doit être généralisé par metadata et documenté.
- Moteur cible: Runtime engine générique

### src/runtime/business-rules/runtimeBusinessRules.ts:733

- Priorité: P2
- Type audit: manual-amount-calculation
- Match: `tauxTVA`
- Code: `const tauxTVA =`
- Recommandation: Acceptable temporairement si c’est dans un moteur, mais doit être généralisé par metadata et documenté.
- Moteur cible: Runtime engine générique

### src/runtime/business-rules/runtimeBusinessRules.ts:734

- Priorité: P2
- Type audit: manual-amount-calculation
- Match: `montantHT`
- Code: `montantHT > 0 && montantTVA > 0`
- Recommandation: Acceptable temporairement si c’est dans un moteur, mais doit être généralisé par metadata et documenté.
- Moteur cible: Runtime engine générique

### src/runtime/business-rules/runtimeBusinessRules.ts:735

- Priorité: P2
- Type audit: manual-amount-calculation
- Match: `montantHT`
- Code: `? roundMoney((montantTVA / montantHT) * 100)`
- Recommandation: Acceptable temporairement si c’est dans un moteur, mais doit être généralisé par metadata et documenté.
- Moteur cible: Runtime engine générique

### src/runtime/business-rules/runtimeBusinessRules.ts:791

- Priorité: P2
- Type audit: manual-amount-calculation
- Match: `montantTTC`
- Code: `const montantTTC =`
- Recommandation: Acceptable temporairement si c’est dans un moteur, mais doit être généralisé par metadata et documenté.
- Moteur cible: Runtime engine générique

### src/runtime/business-rules/runtimeBusinessRules.ts:793

- Priorité: P2
- Type audit: manual-amount-calculation
- Match: `montantTTC`
- Code: `asNumber(intervention.montantTTC) ||`
- Recommandation: Acceptable temporairement si c’est dans un moteur, mais doit être généralisé par metadata et documenté.
- Moteur cible: Runtime engine générique

### src/runtime/business-rules/runtimeBusinessRules.ts:795

- Priorité: P2
- Type audit: manual-amount-calculation
- Match: `montantHT`
- Code: `montantHT +`
- Recommandation: Acceptable temporairement si c’est dans un moteur, mais doit être généralisé par metadata et documenté.
- Moteur cible: Runtime engine générique

### src/runtime/business-rules/runtimeBusinessRules.ts:799

- Priorité: P2
- Type audit: manual-amount-calculation
- Match: `montantHT`
- Code: `: montantHT * tauxTVA / 100`
- Recommandation: Acceptable temporairement si c’est dans un moteur, mais doit être généralisé par metadata et documenté.
- Moteur cible: Runtime engine générique

### src/runtime/business-rules/runtimeBusinessRules.ts:799

- Priorité: P2
- Type audit: manual-amount-calculation
- Match: `tauxTVA`
- Code: `: montantHT * tauxTVA / 100`
- Recommandation: Acceptable temporairement si c’est dans un moteur, mais doit être généralisé par metadata et documenté.
- Moteur cible: Runtime engine générique

### src/runtime/business-rules/runtimeBusinessRules.ts:828

- Priorité: P2
- Type audit: manual-amount-calculation
- Match: `montantHT`
- Code: `montantHT,`
- Recommandation: Acceptable temporairement si c’est dans un moteur, mais doit être généralisé par metadata et documenté.
- Moteur cible: Runtime engine générique

### src/runtime/business-rules/runtimeBusinessRules.ts:831

- Priorité: P2
- Type audit: manual-amount-calculation
- Match: `tauxTVA`
- Code: `tauxTVA,`
- Recommandation: Acceptable temporairement si c’est dans un moteur, mais doit être généralisé par metadata et documenté.
- Moteur cible: Runtime engine générique

> 74 autres entrées masquées dans ce rapport Markdown. Voir JSON complet.

## TO_REVIEW

### src/components/amarkhys/dashboard/AmarkhysPremiumCockpit.tsx:100

- Priorité: P3
- Type audit: hardcoded-business-module
- Match: `vehicules`
- Code: `const vehicules =`
- Recommandation: À examiner manuellement pour décider s’il faut généraliser ou documenter.
- Moteur cible: À déterminer

### src/components/amarkhys/dashboard/AmarkhysPremiumCockpit.tsx:101

- Priorité: P3
- Type audit: hardcoded-business-module
- Match: `vehicules`
- Code: `findWidget(widgets, ["vehicules-actifs", "vehicules-total"]);`
- Recommandation: À examiner manuellement pour décider s’il faut généraliser ou documenter.
- Moteur cible: À déterminer

### src/components/amarkhys/dashboard/AmarkhysPremiumCockpit.tsx:101

- Priorité: P3
- Type audit: hardcoded-business-module
- Match: `vehicules`
- Code: `findWidget(widgets, ["vehicules-actifs", "vehicules-total"]);`
- Recommandation: À examiner manuellement pour décider s’il faut généraliser ou documenter.
- Moteur cible: À déterminer

### src/components/amarkhys/dashboard/AmarkhysPremiumCockpit.tsx:127

- Priorité: P3
- Type audit: hardcoded-business-module
- Match: `vehicules`
- Code: `value: formatValue(vehicules?.value),`
- Recommandation: À examiner manuellement pour décider s’il faut généraliser ou documenter.
- Moteur cible: À déterminer

### src/components/amarkhys/dashboard/AmarkhysPremiumCockpit.tsx:130

- Priorité: P3
- Type audit: hardcoded-business-module
- Match: `vehicules`
- Code: `subtitle: vehicules?.description ?? "Parc suivi",`
- Recommandation: À examiner manuellement pour décider s’il faut généraliser ou documenter.
- Moteur cible: À déterminer

### src/components/amarkhys/dashboard/AmarkhysPremiumCockpit.tsx:357

- Priorité: P3
- Type audit: hardcoded-business-module
- Match: `facturesauto`
- Code: `fallbackHref: "/facturesauto",`
- Recommandation: À examiner manuellement pour décider s’il faut généraliser ou documenter.
- Moteur cible: À déterminer

### src/components/amarkhys/dashboard/AmarkhysPremiumCockpit.tsx:381

- Priorité: P3
- Type audit: hardcoded-business-module
- Match: `interventionsauto`
- Code: `fallbackHref: "/interventionsauto",`
- Recommandation: À examiner manuellement pour décider s’il faut généraliser ou documenter.
- Moteur cible: À déterminer

### src/components/erp/billing/InvoiceDocumentActions.tsx:14

- Priorité: P3
- Type audit: hardcoded-business-module
- Match: `clientsauto`
- Code: `} from "@/runtime/modules/generated/clientsauto";`
- Recommandation: À examiner manuellement pour décider s’il faut généraliser ou documenter.
- Moteur cible: À déterminer

### src/components/erp/billing/InvoiceDocumentActions.tsx:18

- Priorité: P3
- Type audit: hardcoded-business-module
- Match: `vehicules`
- Code: `} from "@/runtime/modules/generated/vehicules";`
- Recommandation: À examiner manuellement pour décider s’il faut généraliser ou documenter.
- Moteur cible: À déterminer

### src/components/erp/billing/InvoiceDocumentActions.tsx:22

- Priorité: P3
- Type audit: hardcoded-business-module
- Match: `interventionsauto`
- Code: `} from "@/runtime/modules/generated/interventionsauto";`
- Recommandation: À examiner manuellement pour décider s’il faut généraliser ou documenter.
- Moteur cible: À déterminer

### src/components/erp/billing/InvoiceDocumentActions.tsx:630

- Priorité: P3
- Type audit: hardcoded-business-module
- Match: `facturesauto`
- Code: `require("@/runtime/modules/generated/facturesauto/facturesauto.module").facturesautoModule,`
- Recommandation: À examiner manuellement pour décider s’il faut généraliser ou documenter.
- Moteur cible: À déterminer

### src/components/erp/billing/InvoiceDocumentActions.tsx:630

- Priorité: P3
- Type audit: hardcoded-business-module
- Match: `facturesauto`
- Code: `require("@/runtime/modules/generated/facturesauto/facturesauto.module").facturesautoModule,`
- Recommandation: À examiner manuellement pour décider s’il faut généraliser ou documenter.
- Moteur cible: À déterminer

### src/components/erp/billing/InvoicePaymentSchedule.tsx:157

- Priorité: P3
- Type audit: hardcoded-business-module
- Match: `facturesauto`
- Code: `"/facturesauto/" + factureId + "/edit"`
- Recommandation: À examiner manuellement pour décider s’il faut généraliser ou documenter.
- Moteur cible: À déterminer

### src/components/erp/billing/InvoicePaymentsHistory.tsx:12

- Priorité: P3
- Type audit: hardcoded-business-module
- Match: `encaissementsauto`
- Code: `} from "@/runtime/modules/generated/encaissementsauto";`
- Recommandation: À examiner manuellement pour décider s’il faut généraliser ou documenter.
- Moteur cible: À déterminer

### src/components/erp/billing/InvoicePaymentsHistory.tsx:94

- Priorité: P3
- Type audit: hardcoded-business-module
- Match: `facturesauto`
- Code: `return "/facturesauto/" + encodeURIComponent(factureId) + "/edit";`
- Recommandation: À examiner manuellement pour décider s’il faut généraliser ou documenter.
- Moteur cible: À déterminer

### src/components/erp/billing/InvoicePaymentsHistory.tsx:118

- Priorité: P3
- Type audit: hardcoded-business-module
- Match: `facturesauto`
- Code: `params.set("parentModuleKey", "facturesauto");`
- Recommandation: À examiner manuellement pour décider s’il faut généraliser ou documenter.
- Moteur cible: À déterminer

### src/components/erp/billing/InvoicePaymentsHistory.tsx:134

- Priorité: P3
- Type audit: hardcoded-business-module
- Match: `encaissementsauto`
- Code: `return "/encaissementsauto/nouveau?" + params.toString();`
- Recommandation: À examiner manuellement pour décider s’il faut généraliser ou documenter.
- Moteur cible: À déterminer

### src/components/erp/billing/InvoicePaymentsHistory.tsx:151

- Priorité: P3
- Type audit: hardcoded-business-module
- Match: `encaissementsauto`
- Code: `"/encaissementsauto/" +`
- Recommandation: À examiner manuellement pour décider s’il faut généraliser ou documenter.
- Moteur cible: À déterminer

### src/components/erp/billing/PaymentReceiptActions.tsx:12

- Priorité: P3
- Type audit: hardcoded-business-module
- Match: `facturesauto`
- Code: `} from "@/runtime/modules/generated/facturesauto";`
- Recommandation: À examiner manuellement pour décider s’il faut généraliser ou documenter.
- Moteur cible: À déterminer

### src/components/erp/billing/PaymentReceiptActions.tsx:16

- Priorité: P3
- Type audit: hardcoded-business-module
- Match: `clientsauto`
- Code: `} from "@/runtime/modules/generated/clientsauto";`
- Recommandation: À examiner manuellement pour décider s’il faut généraliser ou documenter.
- Moteur cible: À déterminer

### src/components/erp/billing/PaymentReceiptActions.tsx:20

- Priorité: P3
- Type audit: hardcoded-business-module
- Match: `vehicules`
- Code: `} from "@/runtime/modules/generated/vehicules";`
- Recommandation: À examiner manuellement pour décider s’il faut généraliser ou documenter.
- Moteur cible: À déterminer

### src/components/erp/billing/PaymentReceiptActions.tsx:24

- Priorité: P3
- Type audit: hardcoded-business-module
- Match: `encaissementsauto`
- Code: `} from "@/runtime/modules/generated/encaissementsauto";`
- Recommandation: À examiner manuellement pour décider s’il faut généraliser ou documenter.
- Moteur cible: À déterminer

### src/components/erp/relations/ClientVehiclesReadonlyCard.tsx:12

- Priorité: P3
- Type audit: hardcoded-business-module
- Match: `vehicules`
- Code: `} from "@/runtime/modules/generated/vehicules";`
- Recommandation: À examiner manuellement pour décider s’il faut généraliser ou documenter.
- Moteur cible: À déterminer

### src/components/erp/relations/ClientVehiclesReadonlyCard.tsx:178

- Priorité: P3
- Type audit: hardcoded-business-module
- Match: `vehicules`
- Code: `pathname: '/vehicules/${id}/edit',`
- Recommandation: À examiner manuellement pour décider s’il faut généraliser ou documenter.
- Moteur cible: À déterminer

### src/components/erp/relations/ClientVehiclesReadonlyCard.tsx:180

- Priorité: P3
- Type audit: hardcoded-business-module
- Match: `clientsauto`
- Code: `returnTo: '/clientsauto/${clientId}/edit',`
- Recommandation: À examiner manuellement pour décider s’il faut généraliser ou documenter.
- Moteur cible: À déterminer

### src/components/erp/runtime/ERPRuntimeDetails.tsx:155

- Priorité: P3
- Type audit: module-metadata-key-conditional
- Match: `module.metadata.key === "facturesauto"`
- Code: `module.metadata.key === "facturesauto" &&`
- Recommandation: À examiner manuellement pour décider s’il faut généraliser ou documenter.
- Moteur cible: À déterminer

### src/components/erp/runtime/ERPRuntimeDetails.tsx:155

- Priorité: P3
- Type audit: metadata-key-conditional
- Match: `metadata.key === "facturesauto"`
- Code: `module.metadata.key === "facturesauto" &&`
- Recommandation: À examiner manuellement pour décider s’il faut généraliser ou documenter.
- Moteur cible: À déterminer

### src/components/erp/runtime/ERPRuntimeDetails.tsx:96

- Priorité: P3
- Type audit: hardcoded-business-module
- Match: `facturesauto`
- Code: `"/facturesauto/" + factureId`
- Recommandation: À examiner manuellement pour décider s’il faut généraliser ou documenter.
- Moteur cible: À déterminer

### src/components/erp/runtime/ERPRuntimeDetails.tsx:104

- Priorité: P3
- Type audit: hardcoded-business-module
- Match: `encaissementsauto`
- Code: `return "/encaissementsauto/nouveau?" + params.toString();`
- Recommandation: À examiner manuellement pour décider s’il faut généraliser ou documenter.
- Moteur cible: À déterminer

### src/components/erp/runtime/ERPRuntimeDetails.tsx:155

- Priorité: P3
- Type audit: hardcoded-business-module
- Match: `facturesauto`
- Code: `module.metadata.key === "facturesauto" &&`
- Recommandation: À examiner manuellement pour décider s’il faut généraliser ou documenter.
- Moteur cible: À déterminer

### src/components/erp/shell/ErpSidebar.tsx:38

- Priorité: P3
- Type audit: hardcoded-business-module
- Match: `clientsauto`
- Code: `key: "clientsauto",`
- Recommandation: À examiner manuellement pour décider s’il faut généraliser ou documenter.
- Moteur cible: À déterminer

### src/components/erp/shell/ErpSidebar.tsx:43

- Priorité: P3
- Type audit: hardcoded-business-module
- Match: `vehicules`
- Code: `key: "vehicules",`
- Recommandation: À examiner manuellement pour décider s’il faut généraliser ou documenter.
- Moteur cible: À déterminer

### src/components/erp/shell/ErpSidebar.tsx:53

- Priorité: P3
- Type audit: hardcoded-business-module
- Match: `interventionsauto`
- Code: `key: "interventionsauto",`
- Recommandation: À examiner manuellement pour décider s’il faut généraliser ou documenter.
- Moteur cible: À déterminer

### src/components/erp/shell/ErpSidebar.tsx:58

- Priorité: P3
- Type audit: hardcoded-business-module
- Match: `facturesauto`
- Code: `key: "facturesauto",`
- Recommandation: À examiner manuellement pour décider s’il faut généraliser ou documenter.
- Moteur cible: À déterminer

### src/components/erp/shell/ErpSidebar.tsx:78

- Priorité: P3
- Type audit: hardcoded-business-module
- Match: `mouvementsstockauto`
- Code: `key: "mouvementsstockauto",`
- Recommandation: À examiner manuellement pour décider s’il faut généraliser ou documenter.
- Moteur cible: À déterminer

### src/components/erp/shell/ErpSidebar.tsx:88

- Priorité: P3
- Type audit: hardcoded-business-module
- Match: `commandesstockauto`
- Code: `key: "commandesstockauto",`
- Recommandation: À examiner manuellement pour décider s’il faut généraliser ou documenter.
- Moteur cible: À déterminer

### src/components/erp/shell/ErpSidebar.tsx:93

- Priorité: P3
- Type audit: hardcoded-business-module
- Match: `receptionsstockauto`
- Code: `key: "receptionsstockauto",`
- Recommandation: À examiner manuellement pour décider s’il faut généraliser ou documenter.
- Moteur cible: À déterminer

### src/components/erp/shell/ErpSidebar.tsx:112

- Priorité: P3
- Type audit: hardcoded-business-module
- Match: `clientsauto`
- Code: `pathname === "/clientsauto" ||`
- Recommandation: À examiner manuellement pour décider s’il faut généraliser ou documenter.
- Moteur cible: À déterminer

### src/components/erp/shell/ErpSidebar.tsx:113

- Priorité: P3
- Type audit: hardcoded-business-module
- Match: `clientsauto`
- Code: `pathname.startsWith("/clientsauto/") ||`
- Recommandation: À examiner manuellement pour décider s’il faut généraliser ou documenter.
- Moteur cible: À déterminer

### src/components/erp/shell/ErpSidebar.tsx:114

- Priorité: P3
- Type audit: hardcoded-business-module
- Match: `vehicules`
- Code: `pathname === "/vehicules" ||`
- Recommandation: À examiner manuellement pour décider s’il faut généraliser ou documenter.
- Moteur cible: À déterminer

### src/components/erp/shell/ErpSidebar.tsx:115

- Priorité: P3
- Type audit: hardcoded-business-module
- Match: `vehicules`
- Code: `pathname.startsWith("/vehicules/") ||`
- Recommandation: À examiner manuellement pour décider s’il faut généraliser ou documenter.
- Moteur cible: À déterminer

### src/components/erp/shell/ErpSidebar.tsx:118

- Priorité: P3
- Type audit: hardcoded-business-module
- Match: `interventionsauto`
- Code: `pathname === "/interventionsauto" ||`
- Recommandation: À examiner manuellement pour décider s’il faut généraliser ou documenter.
- Moteur cible: À déterminer

### src/components/erp/shell/ErpSidebar.tsx:119

- Priorité: P3
- Type audit: hardcoded-business-module
- Match: `interventionsauto`
- Code: `pathname.startsWith("/interventionsauto/") ||`
- Recommandation: À examiner manuellement pour décider s’il faut généraliser ou documenter.
- Moteur cible: À déterminer

### src/components/erp/shell/ErpSidebar.tsx:120

- Priorité: P3
- Type audit: hardcoded-business-module
- Match: `facturesauto`
- Code: `pathname === "/facturesauto" ||`
- Recommandation: À examiner manuellement pour décider s’il faut généraliser ou documenter.
- Moteur cible: À déterminer

### src/components/erp/shell/ErpSidebar.tsx:121

- Priorité: P3
- Type audit: hardcoded-business-module
- Match: `facturesauto`
- Code: `pathname.startsWith("/facturesauto/") ||`
- Recommandation: À examiner manuellement pour décider s’il faut généraliser ou documenter.
- Moteur cible: À déterminer

### src/components/erp/shell/ErpSidebar.tsx:128

- Priorité: P3
- Type audit: hardcoded-business-module
- Match: `mouvementsstockauto`
- Code: `pathname === "/mouvementsstockauto" ||`
- Recommandation: À examiner manuellement pour décider s’il faut généraliser ou documenter.
- Moteur cible: À déterminer

### src/components/erp/shell/ErpSidebar.tsx:129

- Priorité: P3
- Type audit: hardcoded-business-module
- Match: `mouvementsstockauto`
- Code: `pathname.startsWith("/mouvementsstockauto/") ||`
- Recommandation: À examiner manuellement pour décider s’il faut généraliser ou documenter.
- Moteur cible: À déterminer

### src/components/erp/shell/ErpSidebar.tsx:132

- Priorité: P3
- Type audit: hardcoded-business-module
- Match: `commandesstockauto`
- Code: `pathname === "/commandesstockauto" ||`
- Recommandation: À examiner manuellement pour décider s’il faut généraliser ou documenter.
- Moteur cible: À déterminer

### src/components/erp/shell/ErpSidebar.tsx:133

- Priorité: P3
- Type audit: hardcoded-business-module
- Match: `commandesstockauto`
- Code: `pathname.startsWith("/commandesstockauto/") ||`
- Recommandation: À examiner manuellement pour décider s’il faut généraliser ou documenter.
- Moteur cible: À déterminer

### src/components/erp/shell/ErpSidebar.tsx:134

- Priorité: P3
- Type audit: hardcoded-business-module
- Match: `lignescommandestockauto`
- Code: `pathname === "/lignescommandestockauto" ||`
- Recommandation: À examiner manuellement pour décider s’il faut généraliser ou documenter.
- Moteur cible: À déterminer

### src/components/erp/shell/ErpSidebar.tsx:135

- Priorité: P3
- Type audit: hardcoded-business-module
- Match: `lignescommandestockauto`
- Code: `pathname.startsWith("/lignescommandestockauto/") ||`
- Recommandation: À examiner manuellement pour décider s’il faut généraliser ou documenter.
- Moteur cible: À déterminer

### src/components/erp/shell/ErpSidebar.tsx:136

- Priorité: P3
- Type audit: hardcoded-business-module
- Match: `receptionsstockauto`
- Code: `pathname === "/receptionsstockauto" ||`
- Recommandation: À examiner manuellement pour décider s’il faut généraliser ou documenter.
- Moteur cible: À déterminer

### src/components/erp/shell/ErpSidebar.tsx:137

- Priorité: P3
- Type audit: hardcoded-business-module
- Match: `receptionsstockauto`
- Code: `pathname.startsWith("/receptionsstockauto/")`
- Recommandation: À examiner manuellement pour décider s’il faut généraliser ou documenter.
- Moteur cible: À déterminer

### src/components/public/PublicAppointmentService.ts:11

- Priorité: P3
- Type audit: hardcoded-business-module
- Match: `clientsauto`
- Code: `} from "@/runtime/modules/generated/clientsauto/clientsauto.module";`
- Recommandation: À examiner manuellement pour décider s’il faut généraliser ou documenter.
- Moteur cible: À déterminer

### src/components/public/PublicAppointmentService.ts:11

- Priorité: P3
- Type audit: hardcoded-business-module
- Match: `clientsauto`
- Code: `} from "@/runtime/modules/generated/clientsauto/clientsauto.module";`
- Recommandation: À examiner manuellement pour décider s’il faut généraliser ou documenter.
- Moteur cible: À déterminer

### src/components/public/PublicAppointmentService.ts:15

- Priorité: P3
- Type audit: hardcoded-business-module
- Match: `vehicules`
- Code: `} from "@/runtime/modules/generated/vehicules/vehicules.module";`
- Recommandation: À examiner manuellement pour décider s’il faut généraliser ou documenter.
- Moteur cible: À déterminer

### src/components/public/PublicAppointmentService.ts:15

- Priorité: P3
- Type audit: hardcoded-business-module
- Match: `vehicules`
- Code: `} from "@/runtime/modules/generated/vehicules/vehicules.module";`
- Recommandation: À examiner manuellement pour décider s’il faut généraliser ou documenter.
- Moteur cible: À déterminer

### src/runtime/ai/anomalies/ERPAIAnomalyDetector.ts:69

- Priorité: P3
- Type audit: hardcoded-business-module
- Match: `facturesauto`
- Code: `module: "facturesauto",`
- Recommandation: À examiner manuellement pour décider s’il faut généraliser ou documenter.
- Moteur cible: À déterminer

### src/runtime/ai/anomalies/ERPAIAnomalyDetector.ts:83

- Priorité: P3
- Type audit: hardcoded-business-module
- Match: `interventionsauto`
- Code: `module: "interventionsauto",`
- Recommandation: À examiner manuellement pour décider s’il faut généraliser ou documenter.
- Moteur cible: À déterminer

### src/runtime/ai/anomalies/ERPAIAnomalyDetector.ts:98

- Priorité: P3
- Type audit: hardcoded-business-module
- Match: `facturesauto`
- Code: `module: "facturesauto",`
- Recommandation: À examiner manuellement pour décider s’il faut généraliser ou documenter.
- Moteur cible: À déterminer

### src/runtime/business/contrats/attachContratToTerrain.ts:27

- Priorité: P3
- Type audit: module-metadata-key-conditional
- Match: `module.metadata.key ===
        "terrains"`
- Code: `module.metadata.key ===`
- Recommandation: À examiner manuellement pour décider s’il faut généraliser ou documenter.
- Moteur cible: À déterminer

### src/runtime/business/contrats/attachContratToTerrain.ts:27

- Priorité: P3
- Type audit: metadata-key-conditional
- Match: `metadata.key ===
        "terrains"`
- Code: `module.metadata.key ===`
- Recommandation: À examiner manuellement pour décider s’il faut généraliser ou documenter.
- Moteur cible: À déterminer

### src/runtime/business/exploitations/recomputeTerrainSurfaceDisponible.ts:22

- Priorité: P3
- Type audit: metadata-key-conditional
- Match: `metadata.key ===
        "terrains"`
- Code: `m.metadata.key ===`
- Recommandation: À examiner manuellement pour décider s’il faut généraliser ou documenter.
- Moteur cible: À déterminer

### src/runtime/business/exploitations/recomputeTerrainSurfaceDisponible.ts:29

- Priorité: P3
- Type audit: metadata-key-conditional
- Match: `metadata.key ===
        "exploitations"`
- Code: `m.metadata.key ===`
- Recommandation: À examiner manuellement pour décider s’il faut généraliser ou documenter.
- Moteur cible: À déterminer

### src/runtime/business/terrains/recalculateTerrainSurfaceDisponible.ts:9

- Priorité: P3
- Type audit: metadata-key-conditional
- Match: `metadata.key === "terrains"`
- Code: `m => m.metadata.key === "terrains"`
- Recommandation: À examiner manuellement pour décider s’il faut généraliser ou documenter.
- Moteur cible: À déterminer

### src/runtime/business/terrains/recalculateTerrainSurfaceDisponible.ts:14

- Priorité: P3
- Type audit: metadata-key-conditional
- Match: `metadata.key === "exploitations"`
- Code: `m => m.metadata.key === "exploitations"`
- Recommandation: À examiner manuellement pour décider s’il faut généraliser ou documenter.
- Moteur cible: À déterminer

### src/runtime/dashboard/ERPBusinessMetricsEngine.ts:84

- Priorité: P3
- Type audit: hardcoded-business-module
- Match: `clientsauto`
- Code: `await listModule("clientsauto");`
- Recommandation: À examiner manuellement pour décider s’il faut généraliser ou documenter.
- Moteur cible: À déterminer

### src/runtime/dashboard/ERPBusinessMetricsEngine.ts:86

- Priorité: P3
- Type audit: hardcoded-business-module
- Match: `vehicules`
- Code: `const vehicules =`
- Recommandation: À examiner manuellement pour décider s’il faut généraliser ou documenter.
- Moteur cible: À déterminer

### src/runtime/dashboard/ERPBusinessMetricsEngine.ts:87

- Priorité: P3
- Type audit: hardcoded-business-module
- Match: `vehicules`
- Code: `await listModule("vehicules");`
- Recommandation: À examiner manuellement pour décider s’il faut généraliser ou documenter.
- Moteur cible: À déterminer

### src/runtime/dashboard/ERPBusinessMetricsEngine.ts:93

- Priorité: P3
- Type audit: hardcoded-business-module
- Match: `interventionsauto`
- Code: `await listModule("interventionsauto");`
- Recommandation: À examiner manuellement pour décider s’il faut généraliser ou documenter.
- Moteur cible: À déterminer

### src/runtime/dashboard/ERPBusinessMetricsEngine.ts:96

- Priorité: P3
- Type audit: hardcoded-business-module
- Match: `facturesauto`
- Code: `await listModule("facturesauto");`
- Recommandation: À examiner manuellement pour décider s’il faut généraliser ou documenter.
- Moteur cible: À déterminer

### src/runtime/dashboard/ERPBusinessMetricsEngine.ts:186

- Priorité: P3
- Type audit: hardcoded-business-module
- Match: `vehicules`
- Code: `key: "vehicules",`
- Recommandation: À examiner manuellement pour décider s’il faut généraliser ou documenter.
- Moteur cible: À déterminer

### src/runtime/dashboard/ERPBusinessMetricsEngine.ts:188

- Priorité: P3
- Type audit: hardcoded-business-module
- Match: `vehicules`
- Code: `value: vehicules.length,`
- Recommandation: À examiner manuellement pour décider s’il faut généraliser ou documenter.
- Moteur cible: À déterminer

### src/runtime/dashboard/generic/ERPBusinessAmarkhysDashboardConfig.ts:54

- Priorité: P3
- Type audit: hardcoded-business-module
- Match: `clientsauto`
- Code: `moduleKey: "clientsauto",`
- Recommandation: À examiner manuellement pour décider s’il faut généraliser ou documenter.
- Moteur cible: À déterminer

### src/runtime/dashboard/generic/ERPBusinessAmarkhysDashboardConfig.ts:67

- Priorité: P3
- Type audit: hardcoded-business-module
- Match: `vehicules`
- Code: `key: "vehicules-actifs",`
- Recommandation: À examiner manuellement pour décider s’il faut généraliser ou documenter.
- Moteur cible: À déterminer

### src/runtime/dashboard/generic/ERPBusinessAmarkhysDashboardConfig.ts:69

- Priorité: P3
- Type audit: hardcoded-business-module
- Match: `vehicules`
- Code: `moduleKey: "vehicules",`
- Recommandation: À examiner manuellement pour décider s’il faut généraliser ou documenter.
- Moteur cible: À déterminer

### src/runtime/dashboard/generic/ERPBusinessAmarkhysDashboardConfig.ts:85

- Priorité: P3
- Type audit: hardcoded-business-module
- Match: `encaissementsauto`
- Code: `moduleKey: "encaissementsauto",`
- Recommandation: À examiner manuellement pour décider s’il faut généraliser ou documenter.
- Moteur cible: À déterminer

### src/runtime/dashboard/generic/ERPBusinessAmarkhysDashboardConfig.ts:108

- Priorité: P3
- Type audit: hardcoded-business-module
- Match: `encaissementsauto`
- Code: `moduleKey: "encaissementsauto",`
- Recommandation: À examiner manuellement pour décider s’il faut généraliser ou documenter.
- Moteur cible: À déterminer

### src/runtime/dashboard/generic/ERPBusinessAmarkhysDashboardConfig.ts:264

- Priorité: P3
- Type audit: hardcoded-business-module
- Match: `facturesauto`
- Code: `moduleKey: "facturesauto",`
- Recommandation: À examiner manuellement pour décider s’il faut généraliser ou documenter.
- Moteur cible: À déterminer

### src/runtime/dashboard/generic/ERPBusinessAmarkhysDashboardConfig.ts:288

- Priorité: P3
- Type audit: hardcoded-business-module
- Match: `interventionsauto`
- Code: `moduleKey: "interventionsauto",`
- Recommandation: À examiner manuellement pour décider s’il faut généraliser ou documenter.
- Moteur cible: À déterminer

> 92 autres entrées masquées dans ce rapport Markdown. Voir JSON complet.

## MODULE_METADATA_OK

### src/runtime/modules/generated/clientsauto/clientsauto.module.ts:5

- Priorité: P4
- Type audit: hardcoded-business-module
- Match: `clientsauto`
- Code: `key: "clientsauto",`
- Recommandation: Acceptable si c’est déclaratif. Vérifier seulement que la logique n’est pas exécutable.
- Moteur cible: Module metadata / schema

### src/runtime/modules/generated/clientsauto/clientsauto.module.ts:23

- Priorité: P4
- Type audit: hardcoded-business-module
- Match: `clientsauto`
- Code: `collection: "clientsauto",`
- Recommandation: Acceptable si c’est déclaratif. Vérifier seulement que la logique n’est pas exécutable.
- Moteur cible: Module metadata / schema

### src/runtime/modules/generated/clientsauto/clientsauto.module.ts:193

- Priorité: P4
- Type audit: hardcoded-business-module
- Match: `vehicules`
- Code: `key:"vehicules",`
- Recommandation: Acceptable si c’est déclaratif. Vérifier seulement que la logique n’est pas exécutable.
- Moteur cible: Module metadata / schema

### src/runtime/modules/generated/clientsauto/clientsauto.module.ts:196

- Priorité: P4
- Type audit: hardcoded-business-module
- Match: `vehicules`
- Code: `"vehicules"`
- Recommandation: Acceptable si c’est déclaratif. Vérifier seulement que la logique n’est pas exécutable.
- Moteur cible: Module metadata / schema

### src/runtime/modules/generated/clientsauto/clientsauto.module.ts:203

- Priorité: P4
- Type audit: hardcoded-business-module
- Match: `vehicules`
- Code: `"vehicules"`
- Recommandation: Acceptable si c’est déclaratif. Vérifier seulement que la logique n’est pas exécutable.
- Moteur cible: Module metadata / schema

### src/runtime/modules/generated/clientsauto/clientsauto.module.ts:238

- Priorité: P4
- Type audit: hardcoded-business-module
- Match: `vehicules`
- Code: `key: "vehicules",`
- Recommandation: Acceptable si c’est déclaratif. Vérifier seulement que la logique n’est pas exécutable.
- Moteur cible: Module metadata / schema

### src/runtime/modules/generated/clientsauto/clientsauto.module.ts:239

- Priorité: P4
- Type audit: hardcoded-business-module
- Match: `vehicules`
- Code: `moduleKey: "vehicules",`
- Recommandation: Acceptable si c’est déclaratif. Vérifier seulement que la logique n’est pas exécutable.
- Moteur cible: Module metadata / schema

### src/runtime/modules/generated/clientsauto/index.ts:1

- Priorité: P4
- Type audit: hardcoded-business-module
- Match: `clientsauto`
- Code: `export * from "./clientsauto.module";`
- Recommandation: Acceptable si c’est déclaratif. Vérifier seulement que la logique n’est pas exécutable.
- Moteur cible: Module metadata / schema

### src/runtime/modules/generated/clientsauto/index.ts:2

- Priorité: P4
- Type audit: hardcoded-business-module
- Match: `clientsauto`
- Code: `export * from "./clientsauto.actions";`
- Recommandation: Acceptable si c’est déclaratif. Vérifier seulement que la logique n’est pas exécutable.
- Moteur cible: Module metadata / schema

### src/runtime/modules/generated/clientsauto/index.ts:3

- Priorité: P4
- Type audit: hardcoded-business-module
- Match: `clientsauto`
- Code: `export * from "./clientsauto.workflows";`
- Recommandation: Acceptable si c’est déclaratif. Vérifier seulement que la logique n’est pas exécutable.
- Moteur cible: Module metadata / schema

### src/runtime/modules/generated/clientsauto/index.ts:4

- Priorité: P4
- Type audit: hardcoded-business-module
- Match: `clientsauto`
- Code: `export * from "./clientsauto.permissions";`
- Recommandation: Acceptable si c’est déclaratif. Vérifier seulement que la logique n’est pas exécutable.
- Moteur cible: Module metadata / schema

### src/runtime/modules/generated/clientsauto/index.ts:5

- Priorité: P4
- Type audit: hardcoded-business-module
- Match: `clientsauto`
- Code: `export * from "./clientsauto.automation";`
- Recommandation: Acceptable si c’est déclaratif. Vérifier seulement que la logique n’est pas exécutable.
- Moteur cible: Module metadata / schema

### src/runtime/modules/generated/clientsauto/index.ts:6

- Priorité: P4
- Type audit: hardcoded-business-module
- Match: `clientsauto`
- Code: `export * from "./clientsauto.dashboard";`
- Recommandation: Acceptable si c’est déclaratif. Vérifier seulement que la logique n’est pas exécutable.
- Moteur cible: Module metadata / schema

### src/runtime/modules/generated/commandesstockauto/commandesstockauto.module.ts:5

- Priorité: P4
- Type audit: hardcoded-business-module
- Match: `commandesstockauto`
- Code: `key: "commandesstockauto",`
- Recommandation: Acceptable si c’est déclaratif. Vérifier seulement que la logique n’est pas exécutable.
- Moteur cible: Module metadata / schema

### src/runtime/modules/generated/commandesstockauto/commandesstockauto.module.ts:23

- Priorité: P4
- Type audit: hardcoded-business-module
- Match: `commandesstockauto`
- Code: `collection: "commandesstockauto",`
- Recommandation: Acceptable si c’est déclaratif. Vérifier seulement que la logique n’est pas exécutable.
- Moteur cible: Module metadata / schema

### src/runtime/modules/generated/commandesstockauto/commandesstockauto.module.ts:138

- Priorité: P4
- Type audit: hardcoded-business-module
- Match: `lignescommandestockauto`
- Code: `moduleKey: "lignescommandestockauto",`
- Recommandation: Acceptable si c’est déclaratif. Vérifier seulement que la logique n’est pas exécutable.
- Moteur cible: Module metadata / schema

### src/runtime/modules/generated/commandesstockauto/commandesstockauto.module.ts:149

- Priorité: P4
- Type audit: hardcoded-business-module
- Match: `receptionsstockauto`
- Code: `moduleKey: "receptionsstockauto",`
- Recommandation: Acceptable si c’est déclaratif. Vérifier seulement que la logique n’est pas exécutable.
- Moteur cible: Module metadata / schema

### src/runtime/modules/generated/commandesstockauto/commandesstockauto.module.ts:58

- Priorité: P4
- Type audit: manual-amount-calculation
- Match: `montantHT`
- Code: `key: "montantHT",`
- Recommandation: Acceptable si c’est déclaratif. Vérifier seulement que la logique n’est pas exécutable.
- Moteur cible: Module metadata / schema

### src/runtime/modules/generated/commandesstockauto/commandesstockauto.module.ts:66

- Priorité: P4
- Type audit: manual-amount-calculation
- Match: `montantTTC`
- Code: `key: "montantTTC",`
- Recommandation: Acceptable si c’est déclaratif. Vérifier seulement que la logique n’est pas exécutable.
- Moteur cible: Module metadata / schema

### src/runtime/modules/generated/commandesstockauto/commandesstockauto.module.ts:108

- Priorité: P4
- Type audit: manual-amount-calculation
- Match: `montantHT`
- Code: `"montantHT",`
- Recommandation: Acceptable si c’est déclaratif. Vérifier seulement que la logique n’est pas exécutable.
- Moteur cible: Module metadata / schema

### src/runtime/modules/generated/commandesstockauto/commandesstockauto.module.ts:109

- Priorité: P4
- Type audit: manual-amount-calculation
- Match: `montantTTC`
- Code: `"montantTTC",`
- Recommandation: Acceptable si c’est déclaratif. Vérifier seulement que la logique n’est pas exécutable.
- Moteur cible: Module metadata / schema

### src/runtime/modules/generated/commandesstockauto/commandesstockauto.module.ts:122

- Priorité: P4
- Type audit: manual-amount-calculation
- Match: `montantHT`
- Code: `"montantHT",`
- Recommandation: Acceptable si c’est déclaratif. Vérifier seulement que la logique n’est pas exécutable.
- Moteur cible: Module metadata / schema

### src/runtime/modules/generated/commandesstockauto/commandesstockauto.module.ts:123

- Priorité: P4
- Type audit: manual-amount-calculation
- Match: `montantTTC`
- Code: `"montantTTC",`
- Recommandation: Acceptable si c’est déclaratif. Vérifier seulement que la logique n’est pas exécutable.
- Moteur cible: Module metadata / schema

### src/runtime/modules/generated/commandesstockauto/commandesstockauto.module.ts:145

- Priorité: P4
- Type audit: manual-amount-calculation
- Match: `quantiteCommandee`
- Code: `labelFields: ["produitId", "quantiteCommandee", "prixUnitaireHT", "statut"],`
- Recommandation: Acceptable si c’est déclaratif. Vérifier seulement que la logique n’est pas exécutable.
- Moteur cible: Module metadata / schema

### src/runtime/modules/generated/commandesstockauto/commandesstockauto.module.ts:145

- Priorité: P4
- Type audit: manual-amount-calculation
- Match: `prixUnitaireHT`
- Code: `labelFields: ["produitId", "quantiteCommandee", "prixUnitaireHT", "statut"],`
- Recommandation: Acceptable si c’est déclaratif. Vérifier seulement que la logique n’est pas exécutable.
- Moteur cible: Module metadata / schema

### src/runtime/modules/generated/commandesstockauto/index.ts:1

- Priorité: P4
- Type audit: hardcoded-business-module
- Match: `commandesstockauto`
- Code: `export { commandesstockautoModule } from "./commandesstockauto.module";`
- Recommandation: Acceptable si c’est déclaratif. Vérifier seulement que la logique n’est pas exécutable.
- Moteur cible: Module metadata / schema

### src/runtime/modules/generated/echeancespaiementauto/echeancespaiementauto.module.ts:37

- Priorité: P4
- Type audit: hardcoded-business-module
- Match: `facturesauto`
- Code: `module: "facturesauto",`
- Recommandation: Acceptable si c’est déclaratif. Vérifier seulement que la logique n’est pas exécutable.
- Moteur cible: Module metadata / schema

### src/runtime/modules/generated/echeancespaiementauto/echeancespaiementauto.module.ts:49

- Priorité: P4
- Type audit: hardcoded-business-module
- Match: `clientsauto`
- Code: `module: "clientsauto",`
- Recommandation: Acceptable si c’est déclaratif. Vérifier seulement que la logique n’est pas exécutable.
- Moteur cible: Module metadata / schema

### src/runtime/modules/generated/echeancespaiementauto/echeancespaiementauto.module.ts:60

- Priorité: P4
- Type audit: hardcoded-business-module
- Match: `vehicules`
- Code: `module: "vehicules",`
- Recommandation: Acceptable si c’est déclaratif. Vérifier seulement que la logique n’est pas exécutable.
- Moteur cible: Module metadata / schema

### src/runtime/modules/generated/encaissementsauto/encaissementsauto.actions.ts:10

- Priorité: P4
- Type audit: hardcoded-business-module
- Match: `encaissementsauto`
- Code: `permission: "encaissementsauto.workflow",`
- Recommandation: Acceptable si c’est déclaratif. Vérifier seulement que la logique n’est pas exécutable.
- Moteur cible: Module metadata / schema

### src/runtime/modules/generated/encaissementsauto/encaissementsauto.actions.ts:16

- Priorité: P4
- Type audit: hardcoded-business-module
- Match: `encaissementsauto`
- Code: `permission: "encaissementsauto.workflow",`
- Recommandation: Acceptable si c’est déclaratif. Vérifier seulement que la logique n’est pas exécutable.
- Moteur cible: Module metadata / schema

### src/runtime/modules/generated/encaissementsauto/encaissementsauto.actions.ts:22

- Priorité: P4
- Type audit: hardcoded-business-module
- Match: `encaissementsauto`
- Code: `permission: "encaissementsauto.workflow",`
- Recommandation: Acceptable si c’est déclaratif. Vérifier seulement que la logique n’est pas exécutable.
- Moteur cible: Module metadata / schema

### src/runtime/modules/generated/encaissementsauto/encaissementsauto.module.ts:5

- Priorité: P4
- Type audit: hardcoded-business-module
- Match: `encaissementsauto`
- Code: `} from "./encaissementsauto.actions";`
- Recommandation: Acceptable si c’est déclaratif. Vérifier seulement que la logique n’est pas exécutable.
- Moteur cible: Module metadata / schema

### src/runtime/modules/generated/encaissementsauto/encaissementsauto.module.ts:9

- Priorité: P4
- Type audit: hardcoded-business-module
- Match: `encaissementsauto`
- Code: `key: "encaissementsauto",`
- Recommandation: Acceptable si c’est déclaratif. Vérifier seulement que la logique n’est pas exécutable.
- Moteur cible: Module metadata / schema

### src/runtime/modules/generated/encaissementsauto/encaissementsauto.module.ts:29

- Priorité: P4
- Type audit: hardcoded-business-module
- Match: `encaissementsauto`
- Code: `collection: "encaissementsauto",`
- Recommandation: Acceptable si c’est déclaratif. Vérifier seulement que la logique n’est pas exécutable.
- Moteur cible: Module metadata / schema

### src/runtime/modules/generated/encaissementsauto/encaissementsauto.module.ts:37

- Priorité: P4
- Type audit: hardcoded-business-module
- Match: `facturesauto`
- Code: `module: "facturesauto",`
- Recommandation: Acceptable si c’est déclaratif. Vérifier seulement que la logique n’est pas exécutable.
- Moteur cible: Module metadata / schema

### src/runtime/modules/generated/encaissementsauto/encaissementsauto.module.ts:49

- Priorité: P4
- Type audit: hardcoded-business-module
- Match: `clientsauto`
- Code: `module: "clientsauto",`
- Recommandation: Acceptable si c’est déclaratif. Vérifier seulement que la logique n’est pas exécutable.
- Moteur cible: Module metadata / schema

### src/runtime/modules/generated/encaissementsauto/encaissementsauto.module.ts:60

- Priorité: P4
- Type audit: hardcoded-business-module
- Match: `vehicules`
- Code: `module: "vehicules",`
- Recommandation: Acceptable si c’est déclaratif. Vérifier seulement que la logique n’est pas exécutable.
- Moteur cible: Module metadata / schema

### src/runtime/modules/generated/encaissementsauto/encaissementsauto.module.ts:276

- Priorité: P4
- Type audit: hardcoded-business-module
- Match: `facturesauto`
- Code: `moduleKey: "facturesauto",`
- Recommandation: Acceptable si c’est déclaratif. Vérifier seulement que la logique n’est pas exécutable.
- Moteur cible: Module metadata / schema

### src/runtime/modules/generated/encaissementsauto/encaissementsauto.module.ts:286

- Priorité: P4
- Type audit: hardcoded-business-module
- Match: `clientsauto`
- Code: `moduleKey: "clientsauto",`
- Recommandation: Acceptable si c’est déclaratif. Vérifier seulement que la logique n’est pas exécutable.
- Moteur cible: Module metadata / schema

### src/runtime/modules/generated/encaissementsauto/encaissementsauto.module.ts:296

- Priorité: P4
- Type audit: hardcoded-business-module
- Match: `vehicules`
- Code: `moduleKey: "vehicules",`
- Recommandation: Acceptable si c’est déclaratif. Vérifier seulement que la logique n’est pas exécutable.
- Moteur cible: Module metadata / schema

### src/runtime/modules/generated/encaissementsauto/encaissementsauto.permissions.ts:2

- Priorité: P4
- Type audit: hardcoded-business-module
- Match: `encaissementsauto`
- Code: `read: "encaissementsauto.read",`
- Recommandation: Acceptable si c’est déclaratif. Vérifier seulement que la logique n’est pas exécutable.
- Moteur cible: Module metadata / schema

### src/runtime/modules/generated/encaissementsauto/encaissementsauto.permissions.ts:3

- Priorité: P4
- Type audit: hardcoded-business-module
- Match: `encaissementsauto`
- Code: `create: "encaissementsauto.create",`
- Recommandation: Acceptable si c’est déclaratif. Vérifier seulement que la logique n’est pas exécutable.
- Moteur cible: Module metadata / schema

### src/runtime/modules/generated/encaissementsauto/encaissementsauto.permissions.ts:4

- Priorité: P4
- Type audit: hardcoded-business-module
- Match: `encaissementsauto`
- Code: `update: "encaissementsauto.update",`
- Recommandation: Acceptable si c’est déclaratif. Vérifier seulement que la logique n’est pas exécutable.
- Moteur cible: Module metadata / schema

### src/runtime/modules/generated/encaissementsauto/encaissementsauto.permissions.ts:5

- Priorité: P4
- Type audit: hardcoded-business-module
- Match: `encaissementsauto`
- Code: `delete: "encaissementsauto.delete",`
- Recommandation: Acceptable si c’est déclaratif. Vérifier seulement que la logique n’est pas exécutable.
- Moteur cible: Module metadata / schema

### src/runtime/modules/generated/encaissementsauto/encaissementsauto.permissions.ts:6

- Priorité: P4
- Type audit: hardcoded-business-module
- Match: `encaissementsauto`
- Code: `workflow: "encaissementsauto.workflow",`
- Recommandation: Acceptable si c’est déclaratif. Vérifier seulement que la logique n’est pas exécutable.
- Moteur cible: Module metadata / schema

### src/runtime/modules/generated/encaissementsauto/index.ts:1

- Priorité: P4
- Type audit: hardcoded-business-module
- Match: `encaissementsauto`
- Code: `export * from "./encaissementsauto.module";`
- Recommandation: Acceptable si c’est déclaratif. Vérifier seulement que la logique n’est pas exécutable.
- Moteur cible: Module metadata / schema

### src/runtime/modules/generated/encaissementsauto/index.ts:2

- Priorité: P4
- Type audit: hardcoded-business-module
- Match: `encaissementsauto`
- Code: `export * from "./encaissementsauto.actions";`
- Recommandation: Acceptable si c’est déclaratif. Vérifier seulement que la logique n’est pas exécutable.
- Moteur cible: Module metadata / schema

### src/runtime/modules/generated/encaissementsauto/index.ts:3

- Priorité: P4
- Type audit: hardcoded-business-module
- Match: `encaissementsauto`
- Code: `export * from "./encaissementsauto.workflows";`
- Recommandation: Acceptable si c’est déclaratif. Vérifier seulement que la logique n’est pas exécutable.
- Moteur cible: Module metadata / schema

### src/runtime/modules/generated/encaissementsauto/index.ts:4

- Priorité: P4
- Type audit: hardcoded-business-module
- Match: `encaissementsauto`
- Code: `export * from "./encaissementsauto.permissions";`
- Recommandation: Acceptable si c’est déclaratif. Vérifier seulement que la logique n’est pas exécutable.
- Moteur cible: Module metadata / schema

### src/runtime/modules/generated/encaissementsauto/index.ts:5

- Priorité: P4
- Type audit: hardcoded-business-module
- Match: `encaissementsauto`
- Code: `export * from "./encaissementsauto.automation";`
- Recommandation: Acceptable si c’est déclaratif. Vérifier seulement que la logique n’est pas exécutable.
- Moteur cible: Module metadata / schema

### src/runtime/modules/generated/encaissementsauto/index.ts:6

- Priorité: P4
- Type audit: hardcoded-business-module
- Match: `encaissementsauto`
- Code: `export * from "./encaissementsauto.dashboard";`
- Recommandation: Acceptable si c’est déclaratif. Vérifier seulement que la logique n’est pas exécutable.
- Moteur cible: Module metadata / schema

### src/runtime/modules/generated/facturesauto/facturesauto.actions.ts:10

- Priorité: P4
- Type audit: hardcoded-business-module
- Match: `facturesauto`
- Code: `permission: "facturesauto.workflow",`
- Recommandation: Acceptable si c’est déclaratif. Vérifier seulement que la logique n’est pas exécutable.
- Moteur cible: Module metadata / schema

### src/runtime/modules/generated/facturesauto/facturesauto.actions.ts:16

- Priorité: P4
- Type audit: hardcoded-business-module
- Match: `facturesauto`
- Code: `permission: "facturesauto.workflow",`
- Recommandation: Acceptable si c’est déclaratif. Vérifier seulement que la logique n’est pas exécutable.
- Moteur cible: Module metadata / schema

### src/runtime/modules/generated/facturesauto/facturesauto.actions.ts:22

- Priorité: P4
- Type audit: hardcoded-business-module
- Match: `facturesauto`
- Code: `permission: "facturesauto.workflow",`
- Recommandation: Acceptable si c’est déclaratif. Vérifier seulement que la logique n’est pas exécutable.
- Moteur cible: Module metadata / schema

### src/runtime/modules/generated/facturesauto/facturesauto.actions.ts:28

- Priorité: P4
- Type audit: hardcoded-business-module
- Match: `facturesauto`
- Code: `permission: "facturesauto.workflow",`
- Recommandation: Acceptable si c’est déclaratif. Vérifier seulement que la logique n’est pas exécutable.
- Moteur cible: Module metadata / schema

### src/runtime/modules/generated/facturesauto/facturesauto.actions.ts:34

- Priorité: P4
- Type audit: hardcoded-business-module
- Match: `facturesauto`
- Code: `permission: "facturesauto.workflow",`
- Recommandation: Acceptable si c’est déclaratif. Vérifier seulement que la logique n’est pas exécutable.
- Moteur cible: Module metadata / schema

### src/runtime/modules/generated/facturesauto/facturesauto.actions.ts:40

- Priorité: P4
- Type audit: hardcoded-business-module
- Match: `facturesauto`
- Code: `permission: "facturesauto.workflow",`
- Recommandation: Acceptable si c’est déclaratif. Vérifier seulement que la logique n’est pas exécutable.
- Moteur cible: Module metadata / schema

### src/runtime/modules/generated/facturesauto/facturesauto.module.ts:5

- Priorité: P4
- Type audit: hardcoded-business-module
- Match: `facturesauto`
- Code: `} from "./facturesauto.actions";`
- Recommandation: Acceptable si c’est déclaratif. Vérifier seulement que la logique n’est pas exécutable.
- Moteur cible: Module metadata / schema

### src/runtime/modules/generated/facturesauto/facturesauto.module.ts:9

- Priorité: P4
- Type audit: hardcoded-business-module
- Match: `facturesauto`
- Code: `key: "facturesauto",`
- Recommandation: Acceptable si c’est déclaratif. Vérifier seulement que la logique n’est pas exécutable.
- Moteur cible: Module metadata / schema

### src/runtime/modules/generated/facturesauto/facturesauto.module.ts:27

- Priorité: P4
- Type audit: hardcoded-business-module
- Match: `facturesauto`
- Code: `collection: "facturesauto",`
- Recommandation: Acceptable si c’est déclaratif. Vérifier seulement que la logique n’est pas exécutable.
- Moteur cible: Module metadata / schema

### src/runtime/modules/generated/facturesauto/facturesauto.module.ts:78

- Priorité: P4
- Type audit: hardcoded-business-module
- Match: `clientsauto`
- Code: `module: "clientsauto",`
- Recommandation: Acceptable si c’est déclaratif. Vérifier seulement que la logique n’est pas exécutable.
- Moteur cible: Module metadata / schema

### src/runtime/modules/generated/facturesauto/facturesauto.module.ts:88

- Priorité: P4
- Type audit: hardcoded-business-module
- Match: `vehicules`
- Code: `module: "vehicules",`
- Recommandation: Acceptable si c’est déclaratif. Vérifier seulement que la logique n’est pas exécutable.
- Moteur cible: Module metadata / schema

### src/runtime/modules/generated/facturesauto/facturesauto.module.ts:98

- Priorité: P4
- Type audit: hardcoded-business-module
- Match: `interventionsauto`
- Code: `module: "interventionsauto",`
- Recommandation: Acceptable si c’est déclaratif. Vérifier seulement que la logique n’est pas exécutable.
- Moteur cible: Module metadata / schema

### src/runtime/modules/generated/facturesauto/facturesauto.module.ts:332

- Priorité: P4
- Type audit: hardcoded-business-module
- Match: `clientsauto`
- Code: `moduleKey: "clientsauto",`
- Recommandation: Acceptable si c’est déclaratif. Vérifier seulement que la logique n’est pas exécutable.
- Moteur cible: Module metadata / schema

### src/runtime/modules/generated/facturesauto/facturesauto.module.ts:342

- Priorité: P4
- Type audit: hardcoded-business-module
- Match: `vehicules`
- Code: `moduleKey: "vehicules",`
- Recommandation: Acceptable si c’est déclaratif. Vérifier seulement que la logique n’est pas exécutable.
- Moteur cible: Module metadata / schema

### src/runtime/modules/generated/facturesauto/facturesauto.module.ts:352

- Priorité: P4
- Type audit: hardcoded-business-module
- Match: `interventionsauto`
- Code: `moduleKey: "interventionsauto",`
- Recommandation: Acceptable si c’est déclaratif. Vérifier seulement que la logique n’est pas exécutable.
- Moteur cible: Module metadata / schema

### src/runtime/modules/generated/facturesauto/facturesauto.module.ts:104

- Priorité: P4
- Type audit: manual-amount-calculation
- Match: `montantHT`
- Code: `key: "montantHT",`
- Recommandation: Acceptable si c’est déclaratif. Vérifier seulement que la logique n’est pas exécutable.
- Moteur cible: Module metadata / schema

### src/runtime/modules/generated/facturesauto/facturesauto.module.ts:117

- Priorité: P4
- Type audit: manual-amount-calculation
- Match: `montantTTC`
- Code: `key: "montantTTC",`
- Recommandation: Acceptable si c’est déclaratif. Vérifier seulement que la logique n’est pas exécutable.
- Moteur cible: Module metadata / schema

### src/runtime/modules/generated/facturesauto/facturesauto.module.ts:121

- Priorité: P4
- Type audit: manual-amount-calculation
- Match: `montantHT`
- Code: `formula: "montantHT + (montantHT * tva / 100)",`
- Recommandation: Acceptable si c’est déclaratif. Vérifier seulement que la logique n’est pas exécutable.
- Moteur cible: Module metadata / schema

### src/runtime/modules/generated/facturesauto/facturesauto.module.ts:121

- Priorité: P4
- Type audit: manual-amount-calculation
- Match: `montantHT`
- Code: `formula: "montantHT + (montantHT * tva / 100)",`
- Recommandation: Acceptable si c’est déclaratif. Vérifier seulement que la logique n’est pas exécutable.
- Moteur cible: Module metadata / schema

### src/runtime/modules/generated/facturesauto/facturesauto.module.ts:122

- Priorité: P4
- Type audit: manual-amount-calculation
- Match: `montantHT`
- Code: `dependsOn: ["montantHT", "tva"],`
- Recommandation: Acceptable si c’est déclaratif. Vérifier seulement que la logique n’est pas exécutable.
- Moteur cible: Module metadata / schema

### src/runtime/modules/generated/facturesauto/facturesauto.module.ts:261

- Priorité: P4
- Type audit: manual-amount-calculation
- Match: `montantHT`
- Code: `"montantHT",`
- Recommandation: Acceptable si c’est déclaratif. Vérifier seulement que la logique n’est pas exécutable.
- Moteur cible: Module metadata / schema

### src/runtime/modules/generated/facturesauto/facturesauto.module.ts:263

- Priorité: P4
- Type audit: manual-amount-calculation
- Match: `montantTTC`
- Code: `"montantTTC",`
- Recommandation: Acceptable si c’est déclaratif. Vérifier seulement que la logique n’est pas exécutable.
- Moteur cible: Module metadata / schema

### src/runtime/modules/generated/facturesauto/facturesauto.module.ts:272

- Priorité: P4
- Type audit: manual-amount-calculation
- Match: `montantHT`
- Code: `"montantHT",`
- Recommandation: Acceptable si c’est déclaratif. Vérifier seulement que la logique n’est pas exécutable.
- Moteur cible: Module metadata / schema

### src/runtime/modules/generated/facturesauto/facturesauto.module.ts:274

- Priorité: P4
- Type audit: manual-amount-calculation
- Match: `montantTTC`
- Code: `"montantTTC",`
- Recommandation: Acceptable si c’est déclaratif. Vérifier seulement que la logique n’est pas exécutable.
- Moteur cible: Module metadata / schema

### src/runtime/modules/generated/facturesauto/facturesauto.module.ts:372

- Priorité: P4
- Type audit: manual-amount-calculation
- Match: `montantTTC`
- Code: `"montantTTC",`
- Recommandation: Acceptable si c’est déclaratif. Vérifier seulement que la logique n’est pas exécutable.
- Moteur cible: Module metadata / schema

### src/runtime/modules/generated/facturesauto/index.ts:1

- Priorité: P4
- Type audit: hardcoded-business-module
- Match: `facturesauto`
- Code: `export * from "./facturesauto.module";`
- Recommandation: Acceptable si c’est déclaratif. Vérifier seulement que la logique n’est pas exécutable.
- Moteur cible: Module metadata / schema

### src/runtime/modules/generated/facturesauto/index.ts:2

- Priorité: P4
- Type audit: hardcoded-business-module
- Match: `facturesauto`
- Code: `export * from "./facturesauto.actions";`
- Recommandation: Acceptable si c’est déclaratif. Vérifier seulement que la logique n’est pas exécutable.
- Moteur cible: Module metadata / schema

### src/runtime/modules/generated/facturesauto/index.ts:3

- Priorité: P4
- Type audit: hardcoded-business-module
- Match: `facturesauto`
- Code: `export * from "./facturesauto.workflows";`
- Recommandation: Acceptable si c’est déclaratif. Vérifier seulement que la logique n’est pas exécutable.
- Moteur cible: Module metadata / schema

> 120 autres entrées masquées dans ce rapport Markdown. Voir JSON complet.

## FALSE_POSITIVE_OR_LOW

### src/components/amarkhys/dashboard/AmarkhysPremiumCockpit.tsx:64

- Priorité: P5
- Type audit: hardcoded-business-module
- Match: `clientsauto`
- Code: `{ label: "Clients", href: "/clientsauto" },`
- Recommandation: Probable usage navigation/route. À vérifier, mais pas prioritaire.
- Moteur cible: Navigation metadata

### src/components/amarkhys/dashboard/AmarkhysPremiumCockpit.tsx:65

- Priorité: P5
- Type audit: hardcoded-business-module
- Match: `interventionsauto`
- Code: `{ label: "Interventions", href: "/interventionsauto" },`
- Recommandation: Probable usage navigation/route. À vérifier, mais pas prioritaire.
- Moteur cible: Navigation metadata

### src/components/amarkhys/dashboard/AmarkhysPremiumCockpit.tsx:66

- Priorité: P5
- Type audit: hardcoded-business-module
- Match: `facturesauto`
- Code: `{ label: "Factures", href: "/facturesauto" },`
- Recommandation: Probable usage navigation/route. À vérifier, mais pas prioritaire.
- Moteur cible: Navigation metadata

### src/components/amarkhys/dashboard/AmarkhysPremiumCockpit.tsx:121

- Priorité: P5
- Type audit: hardcoded-business-module
- Match: `facturesauto`
- Code: `href: ca?.href ?? "/facturesauto",`
- Recommandation: Probable usage navigation/route. À vérifier, mais pas prioritaire.
- Moteur cible: Navigation metadata

### src/components/amarkhys/dashboard/AmarkhysPremiumCockpit.tsx:128

- Priorité: P5
- Type audit: hardcoded-business-module
- Match: `vehicules`
- Code: `href: vehicules?.href ?? "/vehicules",`
- Recommandation: Probable usage navigation/route. À vérifier, mais pas prioritaire.
- Moteur cible: Navigation metadata

### src/components/amarkhys/dashboard/AmarkhysPremiumCockpit.tsx:128

- Priorité: P5
- Type audit: hardcoded-business-module
- Match: `vehicules`
- Code: `href: vehicules?.href ?? "/vehicules",`
- Recommandation: Probable usage navigation/route. À vérifier, mais pas prioritaire.
- Moteur cible: Navigation metadata

### src/components/amarkhys/dashboard/AmarkhysPremiumCockpit.tsx:135

- Priorité: P5
- Type audit: hardcoded-business-module
- Match: `facturesauto`
- Code: `href: "/facturesauto",`
- Recommandation: Probable usage navigation/route. À vérifier, mais pas prioritaire.
- Moteur cible: Navigation metadata

### src/components/amarkhys/dashboard/AmarkhysPremiumCockpit.tsx:963

- Priorité: P5
- Type audit: hardcoded-business-module
- Match: `encaissementsauto`
- Code: `href="/encaissementsauto"`
- Recommandation: Probable usage navigation/route. À vérifier, mais pas prioritaire.
- Moteur cible: Navigation metadata

### src/components/erp/billing/InvoiceDocumentActions.tsx:91

- Priorité: P5
- Type audit: manual-amount-calculation
- Match: `montantTTC`
- Code: `const montantTTC =`
- Recommandation: Champ montant détecté. À vérifier seulement si un calcul est réellement codé ici.
- Moteur cible: RuntimeComputedFieldsEngine

### src/components/erp/billing/InvoiceDocumentActions.tsx:92

- Priorité: P5
- Type audit: manual-amount-calculation
- Match: `montantTTC`
- Code: `amount(invoice, "montantTTC");`
- Recommandation: Champ montant détecté. À vérifier seulement si un calcul est réellement codé ici.
- Moteur cible: RuntimeComputedFieldsEngine

### src/components/erp/billing/InvoiceDocumentActions.tsx:105

- Priorité: P5
- Type audit: manual-amount-calculation
- Match: `montantTTC`
- Code: `montantTTC - montantPaye,`
- Recommandation: Champ montant détecté. À vérifier seulement si un calcul est réellement codé ici.
- Moteur cible: RuntimeComputedFieldsEngine

### src/components/erp/billing/InvoiceDocumentActions.tsx:333

- Priorité: P5
- Type audit: manual-amount-calculation
- Match: `montantTTC`
- Code: `amount(invoice, "montantTTC");`
- Recommandation: Champ montant détecté. À vérifier seulement si un calcul est réellement codé ici.
- Moteur cible: RuntimeComputedFieldsEngine

### src/components/erp/billing/InvoiceDocumentActions.tsx:414

- Priorité: P5
- Type audit: manual-amount-calculation
- Match: `montantHT`
- Code: `const montantHT =`
- Recommandation: Champ montant détecté. À vérifier seulement si un calcul est réellement codé ici.
- Moteur cible: RuntimeComputedFieldsEngine

### src/components/erp/billing/InvoiceDocumentActions.tsx:415

- Priorité: P5
- Type audit: manual-amount-calculation
- Match: `montantHT`
- Code: `amount(invoice, "montantHT");`
- Recommandation: Champ montant détecté. À vérifier seulement si un calcul est réellement codé ici.
- Moteur cible: RuntimeComputedFieldsEngine

### src/components/erp/billing/InvoiceDocumentActions.tsx:420

- Priorité: P5
- Type audit: manual-amount-calculation
- Match: `montantTTC`
- Code: `const montantTTC =`
- Recommandation: Champ montant détecté. À vérifier seulement si un calcul est réellement codé ici.
- Moteur cible: RuntimeComputedFieldsEngine

### src/components/erp/billing/InvoiceDocumentActions.tsx:421

- Priorité: P5
- Type audit: manual-amount-calculation
- Match: `montantTTC`
- Code: `amount(invoice, "montantTTC");`
- Recommandation: Champ montant détecté. À vérifier seulement si un calcul est réellement codé ici.
- Moteur cible: RuntimeComputedFieldsEngine

### src/components/erp/billing/InvoiceDocumentActions.tsx:496

- Priorité: P5
- Type audit: manual-amount-calculation
- Match: `montantHT`
- Code: `formatMoney(montantHT),`
- Recommandation: Champ montant détecté. À vérifier seulement si un calcul est réellement codé ici.
- Moteur cible: RuntimeComputedFieldsEngine

### src/components/erp/billing/InvoiceDocumentActions.tsx:498

- Priorité: P5
- Type audit: manual-amount-calculation
- Match: `montantTTC`
- Code: `formatMoney(montantTTC),`
- Recommandation: Champ montant détecté. À vérifier seulement si un calcul est réellement codé ici.
- Moteur cible: RuntimeComputedFieldsEngine

### src/components/erp/billing/InvoiceDocumentActions.tsx:514

- Priorité: P5
- Type audit: manual-amount-calculation
- Match: `montantHT`
- Code: `["Montant HT", formatMoney(montantHT)],`
- Recommandation: Champ montant détecté. À vérifier seulement si un calcul est réellement codé ici.
- Moteur cible: RuntimeComputedFieldsEngine

### src/components/erp/billing/InvoiceDocumentActions.tsx:516

- Priorité: P5
- Type audit: manual-amount-calculation
- Match: `montantTTC`
- Code: `["Montant TTC", formatMoney(montantTTC)],`
- Recommandation: Champ montant détecté. À vérifier seulement si un calcul est réellement codé ici.
- Moteur cible: RuntimeComputedFieldsEngine

### src/components/erp/billing/InvoicePaymentSchedule.tsx:18

- Priorité: P5
- Type audit: manual-amount-calculation
- Match: `montantTTC`
- Code: `montantTTC?: number;`
- Recommandation: Champ montant détecté. À vérifier seulement si un calcul est réellement codé ici.
- Moteur cible: RuntimeComputedFieldsEngine

### src/components/erp/billing/InvoicePaymentSchedule.tsx:172

- Priorité: P5
- Type audit: manual-amount-calculation
- Match: `montantTTC`
- Code: `montantTTC = 0,`
- Recommandation: Champ montant détecté. À vérifier seulement si un calcul est réellement codé ici.
- Moteur cible: RuntimeComputedFieldsEngine

### src/components/erp/billing/InvoicePaymentSchedule.tsx:248

- Priorité: P5
- Type audit: manual-amount-calculation
- Match: `montantTTC`
- Code: `Number(montantTTC) - Number(montantPaye),`
- Recommandation: Champ montant détecté. À vérifier seulement si un calcul est réellement codé ici.
- Moteur cible: RuntimeComputedFieldsEngine

### src/components/erp/billing/InvoicePaymentsHistory.tsx:20

- Priorité: P5
- Type audit: manual-amount-calculation
- Match: `montantTTC`
- Code: `montantTTC?: number;`
- Recommandation: Champ montant détecté. À vérifier seulement si un calcul est réellement codé ici.
- Moteur cible: RuntimeComputedFieldsEngine

### src/components/erp/billing/InvoicePaymentsHistory.tsx:313

- Priorité: P5
- Type audit: manual-amount-calculation
- Match: `montantTTC`
- Code: `montantTTC = 0,`
- Recommandation: Champ montant détecté. À vérifier seulement si un calcul est réellement codé ici.
- Moteur cible: RuntimeComputedFieldsEngine

### src/components/erp/billing/InvoicePaymentsHistory.tsx:387

- Priorité: P5
- Type audit: manual-amount-calculation
- Match: `montantTTC`
- Code: `Number(montantTTC ?? 0) - totalValide,`
- Recommandation: Champ montant détecté. À vérifier seulement si un calcul est réellement codé ici.
- Moteur cible: RuntimeComputedFieldsEngine

### src/components/erp/runtime/ERPRuntimeDetails.tsx:36

- Priorité: P5
- Type audit: manual-amount-calculation
- Match: `montantTTC`
- Code: `const montantTTC =`
- Recommandation: Champ montant détecté. À vérifier seulement si un calcul est réellement codé ici.
- Moteur cible: RuntimeComputedFieldsEngine

### src/components/erp/runtime/ERPRuntimeDetails.tsx:37

- Priorité: P5
- Type audit: manual-amount-calculation
- Match: `montantTTC`
- Code: `Number(data.montantTTC ?? 0);`
- Recommandation: Champ montant détecté. À vérifier seulement si un calcul est réellement codé ici.
- Moteur cible: RuntimeComputedFieldsEngine

### src/components/erp/runtime/ERPRuntimeDetails.tsx:49

- Priorité: P5
- Type audit: manual-amount-calculation
- Match: `montantTTC`
- Code: `montantTTC - montantPaye,`
- Recommandation: Champ montant détecté. À vérifier seulement si un calcul est réellement codé ici.
- Moteur cible: RuntimeComputedFieldsEngine

### src/components/erp/runtime/ERPRuntimeDetails.tsx:110

- Priorité: P5
- Type audit: manual-amount-calculation
- Match: `montantTTC`
- Code: `const montantTTC =`
- Recommandation: Champ montant détecté. À vérifier seulement si un calcul est réellement codé ici.
- Moteur cible: RuntimeComputedFieldsEngine

### src/components/erp/runtime/ERPRuntimeDetails.tsx:111

- Priorité: P5
- Type audit: manual-amount-calculation
- Match: `montantTTC`
- Code: `Number(data.montantTTC ?? 0);`
- Recommandation: Champ montant détecté. À vérifier seulement si un calcul est réellement codé ici.
- Moteur cible: RuntimeComputedFieldsEngine

### src/components/erp/runtime/ERPRuntimeDetails.tsx:123

- Priorité: P5
- Type audit: manual-amount-calculation
- Match: `montantTTC`
- Code: `montantTTC - montantPaye,`
- Recommandation: Champ montant détecté. À vérifier seulement si un calcul est réellement codé ici.
- Moteur cible: RuntimeComputedFieldsEngine

### src/components/erp/runtime/ERPRuntimeDetails.tsx:128

- Priorité: P5
- Type audit: manual-amount-calculation
- Match: `montantTTC`
- Code: `montantTTC,`
- Recommandation: Champ montant détecté. À vérifier seulement si un calcul est réellement codé ici.
- Moteur cible: RuntimeComputedFieldsEngine

### src/components/erp/runtime/ERPRuntimeDetails.tsx:234

- Priorité: P5
- Type audit: manual-amount-calculation
- Match: `montantTTC`
- Code: `{amountSummary.montantTTC.toLocaleString("fr-FR")} FCFA`
- Recommandation: Champ montant détecté. À vérifier seulement si un calcul est réellement codé ici.
- Moteur cible: RuntimeComputedFieldsEngine

### src/components/erp/shell/ErpSidebar.tsx:40

- Priorité: P5
- Type audit: hardcoded-business-module
- Match: `clientsauto`
- Code: `href: "/clientsauto",`
- Recommandation: Probable usage navigation/route. À vérifier, mais pas prioritaire.
- Moteur cible: Navigation metadata

### src/components/erp/shell/ErpSidebar.tsx:45

- Priorité: P5
- Type audit: hardcoded-business-module
- Match: `vehicules`
- Code: `href: "/vehicules",`
- Recommandation: Probable usage navigation/route. À vérifier, mais pas prioritaire.
- Moteur cible: Navigation metadata

### src/components/erp/shell/ErpSidebar.tsx:55

- Priorité: P5
- Type audit: hardcoded-business-module
- Match: `interventionsauto`
- Code: `href: "/interventionsauto",`
- Recommandation: Probable usage navigation/route. À vérifier, mais pas prioritaire.
- Moteur cible: Navigation metadata

### src/components/erp/shell/ErpSidebar.tsx:60

- Priorité: P5
- Type audit: hardcoded-business-module
- Match: `facturesauto`
- Code: `href: "/facturesauto",`
- Recommandation: Probable usage navigation/route. À vérifier, mais pas prioritaire.
- Moteur cible: Navigation metadata

### src/components/erp/shell/ErpSidebar.tsx:80

- Priorité: P5
- Type audit: hardcoded-business-module
- Match: `mouvementsstockauto`
- Code: `href: "/mouvementsstockauto",`
- Recommandation: Probable usage navigation/route. À vérifier, mais pas prioritaire.
- Moteur cible: Navigation metadata

### src/components/erp/shell/ErpSidebar.tsx:90

- Priorité: P5
- Type audit: hardcoded-business-module
- Match: `commandesstockauto`
- Code: `href: "/commandesstockauto",`
- Recommandation: Probable usage navigation/route. À vérifier, mais pas prioritaire.
- Moteur cible: Navigation metadata

### src/components/erp/shell/ErpSidebar.tsx:95

- Priorité: P5
- Type audit: hardcoded-business-module
- Match: `receptionsstockauto`
- Code: `href: "/receptionsstockauto",`
- Recommandation: Probable usage navigation/route. À vérifier, mais pas prioritaire.
- Moteur cible: Navigation metadata

### src/runtime/dashboard/ERPBusinessMetricsEngine.ts:183

- Priorité: P5
- Type audit: hardcoded-business-module
- Match: `clientsauto`
- Code: `href: "/clientsauto",`
- Recommandation: Probable usage navigation/route. À vérifier, mais pas prioritaire.
- Moteur cible: Navigation metadata

### src/runtime/dashboard/ERPBusinessMetricsEngine.ts:189

- Priorité: P5
- Type audit: hardcoded-business-module
- Match: `vehicules`
- Code: `href: "/vehicules",`
- Recommandation: Probable usage navigation/route. À vérifier, mais pas prioritaire.
- Moteur cible: Navigation metadata

### src/runtime/dashboard/ERPBusinessMetricsEngine.ts:213

- Priorité: P5
- Type audit: hardcoded-business-module
- Match: `interventionsauto`
- Code: `href: "/interventionsauto",`
- Recommandation: Probable usage navigation/route. À vérifier, mais pas prioritaire.
- Moteur cible: Navigation metadata

### src/runtime/dashboard/ERPBusinessMetricsEngine.ts:219

- Priorité: P5
- Type audit: hardcoded-business-module
- Match: `interventionsauto`
- Code: `href: "/interventionsauto",`
- Recommandation: Probable usage navigation/route. À vérifier, mais pas prioritaire.
- Moteur cible: Navigation metadata

### src/runtime/dashboard/ERPBusinessMetricsEngine.ts:225

- Priorité: P5
- Type audit: hardcoded-business-module
- Match: `facturesauto`
- Code: `href: "/facturesauto",`
- Recommandation: Probable usage navigation/route. À vérifier, mais pas prioritaire.
- Moteur cible: Navigation metadata

### src/runtime/dashboard/ERPBusinessMetricsEngine.ts:231

- Priorité: P5
- Type audit: hardcoded-business-module
- Match: `facturesauto`
- Code: `href: "/facturesauto",`
- Recommandation: Probable usage navigation/route. À vérifier, mais pas prioritaire.
- Moteur cible: Navigation metadata

### src/runtime/dashboard/ERPBusinessMetricsEngine.ts:237

- Priorité: P5
- Type audit: hardcoded-business-module
- Match: `facturesauto`
- Code: `href: "/facturesauto",`
- Recommandation: Probable usage navigation/route. À vérifier, mais pas prioritaire.
- Moteur cible: Navigation metadata

### src/runtime/dashboard/ERPBusinessMetricsEngine.ts:243

- Priorité: P5
- Type audit: hardcoded-business-module
- Match: `facturesauto`
- Code: `href: "/facturesauto",`
- Recommandation: Probable usage navigation/route. À vérifier, mais pas prioritaire.
- Moteur cible: Navigation metadata

### src/runtime/dashboard/ERPBusinessMetricsEngine.ts:138

- Priorité: P5
- Type audit: manual-amount-calculation
- Match: `montantTTC`
- Code: `"montantTTC",`
- Recommandation: Champ montant détecté. À vérifier seulement si un calcul est réellement codé ici.
- Moteur cible: RuntimeComputedFieldsEngine

### src/runtime/dashboard/generic/ERPBusinessAmarkhysDashboardConfig.ts:57

- Priorité: P5
- Type audit: hardcoded-business-module
- Match: `clientsauto`
- Code: `href: "/clientsauto",`
- Recommandation: Probable usage navigation/route. À vérifier, mais pas prioritaire.
- Moteur cible: Navigation metadata

### src/runtime/dashboard/generic/ERPBusinessAmarkhysDashboardConfig.ts:72

- Priorité: P5
- Type audit: hardcoded-business-module
- Match: `vehicules`
- Code: `href: "/vehicules",`
- Recommandation: Probable usage navigation/route. À vérifier, mais pas prioritaire.
- Moteur cible: Navigation metadata

### src/runtime/dashboard/generic/ERPBusinessAmarkhysDashboardConfig.ts:90

- Priorité: P5
- Type audit: hardcoded-business-module
- Match: `encaissementsauto`
- Code: `href: "/encaissementsauto",`
- Recommandation: Probable usage navigation/route. À vérifier, mais pas prioritaire.
- Moteur cible: Navigation metadata

### src/runtime/dashboard/generic/ERPBusinessAmarkhysDashboardConfig.ts:113

- Priorité: P5
- Type audit: hardcoded-business-module
- Match: `encaissementsauto`
- Code: `href: "/encaissementsauto",`
- Recommandation: Probable usage navigation/route. À vérifier, mais pas prioritaire.
- Moteur cible: Navigation metadata

### src/runtime/dashboard/generic/ERPBusinessAmarkhysDashboardConfig.ts:203

- Priorité: P5
- Type audit: hardcoded-business-module
- Match: `clientsauto`
- Code: `href: "/clientsauto",`
- Recommandation: Probable usage navigation/route. À vérifier, mais pas prioritaire.
- Moteur cible: Navigation metadata

### src/runtime/dashboard/generic/ERPBusinessAmarkhysDashboardConfig.ts:208

- Priorité: P5
- Type audit: hardcoded-business-module
- Match: `interventionsauto`
- Code: `href: "/interventionsauto",`
- Recommandation: Probable usage navigation/route. À vérifier, mais pas prioritaire.
- Moteur cible: Navigation metadata

### src/runtime/dashboard/generic/ERPBusinessAmarkhysDashboardConfig.ts:213

- Priorité: P5
- Type audit: hardcoded-business-module
- Match: `facturesauto`
- Code: `href: "/facturesauto",`
- Recommandation: Probable usage navigation/route. À vérifier, mais pas prioritaire.
- Moteur cible: Navigation metadata

### src/runtime/dashboard/generic/ERPBusinessAmarkhysDashboardConfig.ts:269

- Priorité: P5
- Type audit: hardcoded-business-module
- Match: `facturesauto`
- Code: `href: "/facturesauto",`
- Recommandation: Probable usage navigation/route. À vérifier, mais pas prioritaire.
- Moteur cible: Navigation metadata

### src/runtime/dashboard/generic/ERPBusinessAmarkhysDashboardConfig.ts:293

- Priorité: P5
- Type audit: hardcoded-business-module
- Match: `interventionsauto`
- Code: `href: "/interventionsauto",`
- Recommandation: Probable usage navigation/route. À vérifier, mais pas prioritaire.
- Moteur cible: Navigation metadata

### src/runtime/dashboard/generic/ERPBusinessAmarkhysDashboardConfig.ts:344

- Priorité: P5
- Type audit: hardcoded-business-module
- Match: `facturesauto`
- Code: `href: "/facturesauto",`
- Recommandation: Probable usage navigation/route. À vérifier, mais pas prioritaire.
- Moteur cible: Navigation metadata

### src/runtime/dashboard/generic/ERPBusinessAmarkhysDashboardConfig.ts:445

- Priorité: P5
- Type audit: hardcoded-business-module
- Match: `clientsauto`
- Code: `href: "/clientsauto",`
- Recommandation: Probable usage navigation/route. À vérifier, mais pas prioritaire.
- Moteur cible: Navigation metadata

### src/runtime/dashboard/generic/ERPBusinessAmarkhysDashboardConfig.ts:464

- Priorité: P5
- Type audit: hardcoded-business-module
- Match: `interventionsauto`
- Code: `href: "/interventionsauto",`
- Recommandation: Probable usage navigation/route. À vérifier, mais pas prioritaire.
- Moteur cible: Navigation metadata

### src/runtime/dashboard/generic/ERPBusinessAmarkhysDashboardConfig.ts:470

- Priorité: P5
- Type audit: hardcoded-business-module
- Match: `facturesauto`
- Code: `href: "/facturesauto",`
- Recommandation: Probable usage navigation/route. À vérifier, mais pas prioritaire.
- Moteur cible: Navigation metadata

### src/runtime/dashboard/generic/ERPBusinessAmarkhysDashboardConfig.ts:476

- Priorité: P5
- Type audit: hardcoded-business-module
- Match: `facturesauto`
- Code: `href: "/facturesauto",`
- Recommandation: Probable usage navigation/route. À vérifier, mais pas prioritaire.
- Moteur cible: Navigation metadata

### src/runtime/dashboard/generic/ERPBusinessAmarkhysDashboardConfig.ts:498

- Priorité: P5
- Type audit: hardcoded-business-module
- Match: `facturesauto`
- Code: `href: "/facturesauto",`
- Recommandation: Probable usage navigation/route. À vérifier, mais pas prioritaire.
- Moteur cible: Navigation metadata

### src/runtime/dashboard/generic/ERPBusinessAmarkhysDashboardConfig.ts:516

- Priorité: P5
- Type audit: hardcoded-business-module
- Match: `facturesauto`
- Code: `href: "/facturesauto",`
- Recommandation: Probable usage navigation/route. À vérifier, mais pas prioritaire.
- Moteur cible: Navigation metadata

### src/runtime/dashboard/generic/ERPBusinessAmarkhysDashboardConfig.ts:539

- Priorité: P5
- Type audit: hardcoded-business-module
- Match: `facturesauto`
- Code: `href: "/facturesauto",`
- Recommandation: Probable usage navigation/route. À vérifier, mais pas prioritaire.
- Moteur cible: Navigation metadata

### src/runtime/dashboard/generic/ERPBusinessAmarkhysDashboardConfig.ts:562

- Priorité: P5
- Type audit: hardcoded-business-module
- Match: `clientsauto`
- Code: `href: "/clientsauto",`
- Recommandation: Probable usage navigation/route. À vérifier, mais pas prioritaire.
- Moteur cible: Navigation metadata

### src/runtime/dashboard/generic/ERPBusinessAmarkhysDashboardConfig.ts:577

- Priorité: P5
- Type audit: hardcoded-business-module
- Match: `vehicules`
- Code: `href: "/vehicules",`
- Recommandation: Probable usage navigation/route. À vérifier, mais pas prioritaire.
- Moteur cible: Navigation metadata

### src/runtime/dashboard/generic/ERPBusinessAmarkhysDashboardConfig.ts:615

- Priorité: P5
- Type audit: hardcoded-business-module
- Match: `interventionsauto`
- Code: `href: "/interventionsauto",`
- Recommandation: Probable usage navigation/route. À vérifier, mais pas prioritaire.
- Moteur cible: Navigation metadata

### src/runtime/dashboard/generic/ERPBusinessAmarkhysDashboardConfig.ts:630

- Priorité: P5
- Type audit: hardcoded-business-module
- Match: `interventionsauto`
- Code: `href: "/interventionsauto",`
- Recommandation: Probable usage navigation/route. À vérifier, mais pas prioritaire.
- Moteur cible: Navigation metadata

### src/runtime/dashboard/generic/ERPBusinessAmarkhysDashboardConfig.ts:645

- Priorité: P5
- Type audit: hardcoded-business-module
- Match: `facturesauto`
- Code: `href: "/facturesauto",`
- Recommandation: Probable usage navigation/route. À vérifier, mais pas prioritaire.
- Moteur cible: Navigation metadata

### src/runtime/dashboard/generic/ERPBusinessAmarkhysDashboardConfig.ts:665

- Priorité: P5
- Type audit: hardcoded-business-module
- Match: `facturesauto`
- Code: `href: "/facturesauto",`
- Recommandation: Probable usage navigation/route. À vérifier, mais pas prioritaire.
- Moteur cible: Navigation metadata

### src/runtime/dashboard/generic/ERPBusinessAmarkhysDashboardConfig.ts:685

- Priorité: P5
- Type audit: hardcoded-business-module
- Match: `facturesauto`
- Code: `href: "/facturesauto",`
- Recommandation: Probable usage navigation/route. À vérifier, mais pas prioritaire.
- Moteur cible: Navigation metadata

### src/runtime/dashboard/generic/ERPBusinessAmarkhysDashboardConfig.ts:722

- Priorité: P5
- Type audit: hardcoded-business-module
- Match: `clientsauto`
- Code: `href: "/clientsauto",`
- Recommandation: Probable usage navigation/route. À vérifier, mais pas prioritaire.
- Moteur cible: Navigation metadata

### src/runtime/dashboard/generic/ERPBusinessAmarkhysDashboardConfig.ts:758

- Priorité: P5
- Type audit: hardcoded-business-module
- Match: `facturesauto`
- Code: `href: "/facturesauto",`
- Recommandation: Probable usage navigation/route. À vérifier, mais pas prioritaire.
- Moteur cible: Navigation metadata

### src/runtime/dashboard/generic/ERPBusinessAmarkhysDashboardConfig.ts:500

- Priorité: P5
- Type audit: manual-amount-calculation
- Match: `montantTTC`
- Code: `sumFields: ["montantTTC", "totalTTC", "montantTotal", "total"],`
- Recommandation: Champ montant détecté. À vérifier seulement si un calcul est réellement codé ici.
- Moteur cible: RuntimeComputedFieldsEngine

### src/runtime/dashboard/generic/ERPBusinessAmarkhysDashboardConfig.ts:518

- Priorité: P5
- Type audit: manual-amount-calculation
- Match: `montantTTC`
- Code: `sumFields: ["montantTTC", "totalTTC", "montantTotal", "total"],`
- Recommandation: Champ montant détecté. À vérifier seulement si un calcul est réellement codé ici.
- Moteur cible: RuntimeComputedFieldsEngine

### src/runtime/dashboard/generic/ERPBusinessAmarkhysDashboardConfig.ts:541

- Priorité: P5
- Type audit: manual-amount-calculation
- Match: `montantTTC`
- Code: `sumFields: ["montantTTC", "totalTTC", "montantTotal", "total"],`
- Recommandation: Champ montant détecté. À vérifier seulement si un calcul est réellement codé ici.
- Moteur cible: RuntimeComputedFieldsEngine

### src/runtime/dashboard/generic/ERPDashboardWidgetEngine.ts:380

- Priorité: P5
- Type audit: manual-amount-calculation
- Match: `montantTTC`
- Code: `formatMoney(record.montantTTC) ||`
- Recommandation: Champ montant détecté. À vérifier seulement si un calcul est réellement codé ici.
- Moteur cible: RuntimeComputedFieldsEngine

> 64 autres entrées masquées dans ce rapport Markdown. Voir JSON complet.
