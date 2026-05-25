# Audit local logic / ERP generic compliance

Date: 2026-05-25T01:55:24.134Z

## Synthèse

- HIGH: 204
- MEDIUM: 302
- INFO: 180
- OK_METADATA: 211

## Règle

Aucune logique métier locale ne doit être ajoutée dans les composants génériques, les pages ou les formulaires.
Toute logique doit passer par metadata + moteur runtime générique, sauf exception temporaire documentée.

## Résultats

### HIGH

#### src/app/(private)/clientsauto/[id]/edit/page.tsx:19

- Type: hardcoded-business-module
- Match: `clientsauto`
- Code: `moduleKey="clientsauto"`
- Diagnostic: Nom de module métier codé en dur.
- Action cible: Les pages ne doivent pas contenir de métier. Déplacer vers runtime/generic page/metadata.

#### src/app/(private)/clientsauto/[id]/page.tsx:19

- Type: hardcoded-business-module
- Match: `clientsauto`
- Code: `moduleKey="clientsauto"`
- Diagnostic: Nom de module métier codé en dur.
- Action cible: Les pages ne doivent pas contenir de métier. Déplacer vers runtime/generic page/metadata.

#### src/app/(private)/clientsauto/analytics/page.tsx:6

- Type: hardcoded-business-module
- Match: `clientsauto`
- Code: `module="clientsauto"`
- Diagnostic: Nom de module métier codé en dur.
- Action cible: Les pages ne doivent pas contenir de métier. Déplacer vers runtime/generic page/metadata.

#### src/app/(private)/clientsauto/audit/page.tsx:6

- Type: hardcoded-business-module
- Match: `clientsauto`
- Code: `module="clientsauto"`
- Diagnostic: Nom de module métier codé en dur.
- Action cible: Les pages ne doivent pas contenir de métier. Déplacer vers runtime/generic page/metadata.

#### src/app/(private)/clientsauto/dashboard/page.tsx:6

- Type: hardcoded-business-module
- Match: `clientsauto`
- Code: `module="clientsauto"`
- Diagnostic: Nom de module métier codé en dur.
- Action cible: Les pages ne doivent pas contenir de métier. Déplacer vers runtime/generic page/metadata.

#### src/app/(private)/clientsauto/export/page.tsx:6

- Type: hardcoded-business-module
- Match: `clientsauto`
- Code: `module="clientsauto"`
- Diagnostic: Nom de module métier codé en dur.
- Action cible: Les pages ne doivent pas contenir de métier. Déplacer vers runtime/generic page/metadata.

#### src/app/(private)/clientsauto/import/page.tsx:6

- Type: hardcoded-business-module
- Match: `clientsauto`
- Code: `module="clientsauto"`
- Diagnostic: Nom de module métier codé en dur.
- Action cible: Les pages ne doivent pas contenir de métier. Déplacer vers runtime/generic page/metadata.

#### src/app/(private)/clientsauto/nouveau/page.tsx:8

- Type: hardcoded-business-module
- Match: `clientsauto`
- Code: `moduleKey="clientsauto"`
- Diagnostic: Nom de module métier codé en dur.
- Action cible: Les pages ne doivent pas contenir de métier. Déplacer vers runtime/generic page/metadata.

#### src/app/(private)/clientsauto/page.tsx:8

- Type: hardcoded-business-module
- Match: `clientsauto`
- Code: `moduleKey="clientsauto"`
- Diagnostic: Nom de module métier codé en dur.
- Action cible: Les pages ne doivent pas contenir de métier. Déplacer vers runtime/generic page/metadata.

#### src/app/(private)/clientsauto/relations/page.tsx:6

- Type: hardcoded-business-module
- Match: `clientsauto`
- Code: `module="clientsauto"`
- Diagnostic: Nom de module métier codé en dur.
- Action cible: Les pages ne doivent pas contenir de métier. Déplacer vers runtime/generic page/metadata.

#### src/app/(private)/clientsauto/workflows/page.tsx:6

- Type: hardcoded-business-module
- Match: `clientsauto`
- Code: `module="clientsauto"`
- Diagnostic: Nom de module métier codé en dur.
- Action cible: Les pages ne doivent pas contenir de métier. Déplacer vers runtime/generic page/metadata.

#### src/app/(private)/commandesstockauto/[id]/edit/page.tsx:19

- Type: hardcoded-business-module
- Match: `commandesstockauto`
- Code: `moduleKey="commandesstockauto"`
- Diagnostic: Nom de module métier codé en dur.
- Action cible: Les pages ne doivent pas contenir de métier. Déplacer vers runtime/generic page/metadata.

#### src/app/(private)/commandesstockauto/[id]/page.tsx:19

- Type: hardcoded-business-module
- Match: `commandesstockauto`
- Code: `moduleKey="commandesstockauto"`
- Diagnostic: Nom de module métier codé en dur.
- Action cible: Les pages ne doivent pas contenir de métier. Déplacer vers runtime/generic page/metadata.

#### src/app/(private)/commandesstockauto/analytics/page.tsx:6

- Type: hardcoded-business-module
- Match: `commandesstockauto`
- Code: `module="commandesstockauto"`
- Diagnostic: Nom de module métier codé en dur.
- Action cible: Les pages ne doivent pas contenir de métier. Déplacer vers runtime/generic page/metadata.

#### src/app/(private)/commandesstockauto/audit/page.tsx:6

- Type: hardcoded-business-module
- Match: `commandesstockauto`
- Code: `module="commandesstockauto"`
- Diagnostic: Nom de module métier codé en dur.
- Action cible: Les pages ne doivent pas contenir de métier. Déplacer vers runtime/generic page/metadata.

#### src/app/(private)/commandesstockauto/dashboard/page.tsx:6

- Type: hardcoded-business-module
- Match: `commandesstockauto`
- Code: `module="commandesstockauto"`
- Diagnostic: Nom de module métier codé en dur.
- Action cible: Les pages ne doivent pas contenir de métier. Déplacer vers runtime/generic page/metadata.

#### src/app/(private)/commandesstockauto/export/page.tsx:6

- Type: hardcoded-business-module
- Match: `commandesstockauto`
- Code: `module="commandesstockauto"`
- Diagnostic: Nom de module métier codé en dur.
- Action cible: Les pages ne doivent pas contenir de métier. Déplacer vers runtime/generic page/metadata.

#### src/app/(private)/commandesstockauto/import/page.tsx:6

- Type: hardcoded-business-module
- Match: `commandesstockauto`
- Code: `module="commandesstockauto"`
- Diagnostic: Nom de module métier codé en dur.
- Action cible: Les pages ne doivent pas contenir de métier. Déplacer vers runtime/generic page/metadata.

#### src/app/(private)/commandesstockauto/nouveau/page.tsx:8

- Type: hardcoded-business-module
- Match: `commandesstockauto`
- Code: `moduleKey="commandesstockauto"`
- Diagnostic: Nom de module métier codé en dur.
- Action cible: Les pages ne doivent pas contenir de métier. Déplacer vers runtime/generic page/metadata.

#### src/app/(private)/commandesstockauto/page.tsx:8

- Type: hardcoded-business-module
- Match: `commandesstockauto`
- Code: `moduleKey="commandesstockauto"`
- Diagnostic: Nom de module métier codé en dur.
- Action cible: Les pages ne doivent pas contenir de métier. Déplacer vers runtime/generic page/metadata.

#### src/app/(private)/commandesstockauto/relations/page.tsx:6

- Type: hardcoded-business-module
- Match: `commandesstockauto`
- Code: `module="commandesstockauto"`
- Diagnostic: Nom de module métier codé en dur.
- Action cible: Les pages ne doivent pas contenir de métier. Déplacer vers runtime/generic page/metadata.

#### src/app/(private)/commandesstockauto/workflows/page.tsx:6

- Type: hardcoded-business-module
- Match: `commandesstockauto`
- Code: `module="commandesstockauto"`
- Diagnostic: Nom de module métier codé en dur.
- Action cible: Les pages ne doivent pas contenir de métier. Déplacer vers runtime/generic page/metadata.

#### src/app/(private)/encaissementsauto/[id]/edit/page.tsx:19

- Type: hardcoded-business-module
- Match: `encaissementsauto`
- Code: `moduleKey="encaissementsauto"`
- Diagnostic: Nom de module métier codé en dur.
- Action cible: Les pages ne doivent pas contenir de métier. Déplacer vers runtime/generic page/metadata.

#### src/app/(private)/encaissementsauto/[id]/page.tsx:19

- Type: hardcoded-business-module
- Match: `encaissementsauto`
- Code: `moduleKey="encaissementsauto"`
- Diagnostic: Nom de module métier codé en dur.
- Action cible: Les pages ne doivent pas contenir de métier. Déplacer vers runtime/generic page/metadata.

#### src/app/(private)/encaissementsauto/nouveau/page.tsx:6

- Type: hardcoded-business-module
- Match: `encaissementsauto`
- Code: `return <GenericCreatePage moduleKey="encaissementsauto" />;`
- Diagnostic: Nom de module métier codé en dur.
- Action cible: Les pages ne doivent pas contenir de métier. Déplacer vers runtime/generic page/metadata.

#### src/app/(private)/encaissementsauto/page.tsx:6

- Type: hardcoded-business-module
- Match: `encaissementsauto`
- Code: `return <GenericListPage moduleKey="encaissementsauto" />;`
- Diagnostic: Nom de module métier codé en dur.
- Action cible: Les pages ne doivent pas contenir de métier. Déplacer vers runtime/generic page/metadata.

#### src/app/(private)/facturesauto/[id]/edit/page.tsx:19

- Type: hardcoded-business-module
- Match: `facturesauto`
- Code: `moduleKey="facturesauto"`
- Diagnostic: Nom de module métier codé en dur.
- Action cible: Les pages ne doivent pas contenir de métier. Déplacer vers runtime/generic page/metadata.

#### src/app/(private)/facturesauto/[id]/page.tsx:19

- Type: hardcoded-business-module
- Match: `facturesauto`
- Code: `moduleKey="facturesauto"`
- Diagnostic: Nom de module métier codé en dur.
- Action cible: Les pages ne doivent pas contenir de métier. Déplacer vers runtime/generic page/metadata.

#### src/app/(private)/facturesauto/analytics/page.tsx:6

- Type: hardcoded-business-module
- Match: `facturesauto`
- Code: `module="facturesauto"`
- Diagnostic: Nom de module métier codé en dur.
- Action cible: Les pages ne doivent pas contenir de métier. Déplacer vers runtime/generic page/metadata.

#### src/app/(private)/facturesauto/audit/page.tsx:6

- Type: hardcoded-business-module
- Match: `facturesauto`
- Code: `module="facturesauto"`
- Diagnostic: Nom de module métier codé en dur.
- Action cible: Les pages ne doivent pas contenir de métier. Déplacer vers runtime/generic page/metadata.

#### src/app/(private)/facturesauto/dashboard/page.tsx:6

- Type: hardcoded-business-module
- Match: `facturesauto`
- Code: `module="facturesauto"`
- Diagnostic: Nom de module métier codé en dur.
- Action cible: Les pages ne doivent pas contenir de métier. Déplacer vers runtime/generic page/metadata.

#### src/app/(private)/facturesauto/export/page.tsx:6

- Type: hardcoded-business-module
- Match: `facturesauto`
- Code: `module="facturesauto"`
- Diagnostic: Nom de module métier codé en dur.
- Action cible: Les pages ne doivent pas contenir de métier. Déplacer vers runtime/generic page/metadata.

#### src/app/(private)/facturesauto/import/page.tsx:6

- Type: hardcoded-business-module
- Match: `facturesauto`
- Code: `module="facturesauto"`
- Diagnostic: Nom de module métier codé en dur.
- Action cible: Les pages ne doivent pas contenir de métier. Déplacer vers runtime/generic page/metadata.

#### src/app/(private)/facturesauto/nouveau/page.tsx:8

- Type: hardcoded-business-module
- Match: `facturesauto`
- Code: `moduleKey="facturesauto"`
- Diagnostic: Nom de module métier codé en dur.
- Action cible: Les pages ne doivent pas contenir de métier. Déplacer vers runtime/generic page/metadata.

#### src/app/(private)/facturesauto/page.tsx:8

- Type: hardcoded-business-module
- Match: `facturesauto`
- Code: `moduleKey="facturesauto"`
- Diagnostic: Nom de module métier codé en dur.
- Action cible: Les pages ne doivent pas contenir de métier. Déplacer vers runtime/generic page/metadata.

#### src/app/(private)/facturesauto/relations/page.tsx:6

- Type: hardcoded-business-module
- Match: `facturesauto`
- Code: `module="facturesauto"`
- Diagnostic: Nom de module métier codé en dur.
- Action cible: Les pages ne doivent pas contenir de métier. Déplacer vers runtime/generic page/metadata.

#### src/app/(private)/facturesauto/workflows/page.tsx:6

- Type: hardcoded-business-module
- Match: `facturesauto`
- Code: `module="facturesauto"`
- Diagnostic: Nom de module métier codé en dur.
- Action cible: Les pages ne doivent pas contenir de métier. Déplacer vers runtime/generic page/metadata.

#### src/app/(private)/interventionsauto/[id]/edit/page.tsx:19

- Type: hardcoded-business-module
- Match: `interventionsauto`
- Code: `moduleKey="interventionsauto"`
- Diagnostic: Nom de module métier codé en dur.
- Action cible: Les pages ne doivent pas contenir de métier. Déplacer vers runtime/generic page/metadata.

#### src/app/(private)/interventionsauto/[id]/page.tsx:19

- Type: hardcoded-business-module
- Match: `interventionsauto`
- Code: `moduleKey="interventionsauto"`
- Diagnostic: Nom de module métier codé en dur.
- Action cible: Les pages ne doivent pas contenir de métier. Déplacer vers runtime/generic page/metadata.

#### src/app/(private)/interventionsauto/analytics/page.tsx:6

- Type: hardcoded-business-module
- Match: `interventionsauto`
- Code: `module="interventionsauto"`
- Diagnostic: Nom de module métier codé en dur.
- Action cible: Les pages ne doivent pas contenir de métier. Déplacer vers runtime/generic page/metadata.

#### src/app/(private)/interventionsauto/audit/page.tsx:6

- Type: hardcoded-business-module
- Match: `interventionsauto`
- Code: `module="interventionsauto"`
- Diagnostic: Nom de module métier codé en dur.
- Action cible: Les pages ne doivent pas contenir de métier. Déplacer vers runtime/generic page/metadata.

#### src/app/(private)/interventionsauto/dashboard/page.tsx:6

- Type: hardcoded-business-module
- Match: `interventionsauto`
- Code: `module="interventionsauto"`
- Diagnostic: Nom de module métier codé en dur.
- Action cible: Les pages ne doivent pas contenir de métier. Déplacer vers runtime/generic page/metadata.

#### src/app/(private)/interventionsauto/export/page.tsx:6

- Type: hardcoded-business-module
- Match: `interventionsauto`
- Code: `module="interventionsauto"`
- Diagnostic: Nom de module métier codé en dur.
- Action cible: Les pages ne doivent pas contenir de métier. Déplacer vers runtime/generic page/metadata.

#### src/app/(private)/interventionsauto/import/page.tsx:6

- Type: hardcoded-business-module
- Match: `interventionsauto`
- Code: `module="interventionsauto"`
- Diagnostic: Nom de module métier codé en dur.
- Action cible: Les pages ne doivent pas contenir de métier. Déplacer vers runtime/generic page/metadata.

#### src/app/(private)/interventionsauto/nouveau/page.tsx:8

- Type: hardcoded-business-module
- Match: `interventionsauto`
- Code: `moduleKey="interventionsauto"`
- Diagnostic: Nom de module métier codé en dur.
- Action cible: Les pages ne doivent pas contenir de métier. Déplacer vers runtime/generic page/metadata.

#### src/app/(private)/interventionsauto/page.tsx:8

- Type: hardcoded-business-module
- Match: `interventionsauto`
- Code: `moduleKey="interventionsauto"`
- Diagnostic: Nom de module métier codé en dur.
- Action cible: Les pages ne doivent pas contenir de métier. Déplacer vers runtime/generic page/metadata.

#### src/app/(private)/interventionsauto/relations/page.tsx:6

- Type: hardcoded-business-module
- Match: `interventionsauto`
- Code: `module="interventionsauto"`
- Diagnostic: Nom de module métier codé en dur.
- Action cible: Les pages ne doivent pas contenir de métier. Déplacer vers runtime/generic page/metadata.

#### src/app/(private)/interventionsauto/workflows/page.tsx:6

- Type: hardcoded-business-module
- Match: `interventionsauto`
- Code: `module="interventionsauto"`
- Diagnostic: Nom de module métier codé en dur.
- Action cible: Les pages ne doivent pas contenir de métier. Déplacer vers runtime/generic page/metadata.

#### src/app/(private)/lignescommandestockauto/[id]/edit/page.tsx:19

- Type: hardcoded-business-module
- Match: `lignescommandestockauto`
- Code: `moduleKey="lignescommandestockauto"`
- Diagnostic: Nom de module métier codé en dur.
- Action cible: Les pages ne doivent pas contenir de métier. Déplacer vers runtime/generic page/metadata.

#### src/app/(private)/lignescommandestockauto/[id]/page.tsx:19

- Type: hardcoded-business-module
- Match: `lignescommandestockauto`
- Code: `moduleKey="lignescommandestockauto"`
- Diagnostic: Nom de module métier codé en dur.
- Action cible: Les pages ne doivent pas contenir de métier. Déplacer vers runtime/generic page/metadata.

#### src/app/(private)/lignescommandestockauto/analytics/page.tsx:6

- Type: hardcoded-business-module
- Match: `lignescommandestockauto`
- Code: `module="lignescommandestockauto"`
- Diagnostic: Nom de module métier codé en dur.
- Action cible: Les pages ne doivent pas contenir de métier. Déplacer vers runtime/generic page/metadata.

#### src/app/(private)/lignescommandestockauto/audit/page.tsx:6

- Type: hardcoded-business-module
- Match: `lignescommandestockauto`
- Code: `module="lignescommandestockauto"`
- Diagnostic: Nom de module métier codé en dur.
- Action cible: Les pages ne doivent pas contenir de métier. Déplacer vers runtime/generic page/metadata.

#### src/app/(private)/lignescommandestockauto/dashboard/page.tsx:6

- Type: hardcoded-business-module
- Match: `lignescommandestockauto`
- Code: `module="lignescommandestockauto"`
- Diagnostic: Nom de module métier codé en dur.
- Action cible: Les pages ne doivent pas contenir de métier. Déplacer vers runtime/generic page/metadata.

#### src/app/(private)/lignescommandestockauto/export/page.tsx:6

- Type: hardcoded-business-module
- Match: `lignescommandestockauto`
- Code: `module="lignescommandestockauto"`
- Diagnostic: Nom de module métier codé en dur.
- Action cible: Les pages ne doivent pas contenir de métier. Déplacer vers runtime/generic page/metadata.

#### src/app/(private)/lignescommandestockauto/import/page.tsx:6

- Type: hardcoded-business-module
- Match: `lignescommandestockauto`
- Code: `module="lignescommandestockauto"`
- Diagnostic: Nom de module métier codé en dur.
- Action cible: Les pages ne doivent pas contenir de métier. Déplacer vers runtime/generic page/metadata.

#### src/app/(private)/lignescommandestockauto/nouveau/page.tsx:8

- Type: hardcoded-business-module
- Match: `lignescommandestockauto`
- Code: `moduleKey="lignescommandestockauto"`
- Diagnostic: Nom de module métier codé en dur.
- Action cible: Les pages ne doivent pas contenir de métier. Déplacer vers runtime/generic page/metadata.

#### src/app/(private)/lignescommandestockauto/page.tsx:8

- Type: hardcoded-business-module
- Match: `lignescommandestockauto`
- Code: `moduleKey="lignescommandestockauto"`
- Diagnostic: Nom de module métier codé en dur.
- Action cible: Les pages ne doivent pas contenir de métier. Déplacer vers runtime/generic page/metadata.

#### src/app/(private)/lignescommandestockauto/relations/page.tsx:6

- Type: hardcoded-business-module
- Match: `lignescommandestockauto`
- Code: `module="lignescommandestockauto"`
- Diagnostic: Nom de module métier codé en dur.
- Action cible: Les pages ne doivent pas contenir de métier. Déplacer vers runtime/generic page/metadata.

#### src/app/(private)/lignescommandestockauto/workflows/page.tsx:6

- Type: hardcoded-business-module
- Match: `lignescommandestockauto`
- Code: `module="lignescommandestockauto"`
- Diagnostic: Nom de module métier codé en dur.
- Action cible: Les pages ne doivent pas contenir de métier. Déplacer vers runtime/generic page/metadata.

#### src/app/(private)/lignesinterventionauto/[id]/edit/page.tsx:14

- Type: hardcoded-business-module
- Match: `lignesinterventionauto`
- Code: `return <GenericEditPage moduleKey="lignesinterventionauto" id={id} />;`
- Diagnostic: Nom de module métier codé en dur.
- Action cible: Les pages ne doivent pas contenir de métier. Déplacer vers runtime/generic page/metadata.

#### src/app/(private)/lignesinterventionauto/[id]/page.tsx:14

- Type: hardcoded-business-module
- Match: `lignesinterventionauto`
- Code: `return <GenericDetailPage moduleKey="lignesinterventionauto" id={id} />;`
- Diagnostic: Nom de module métier codé en dur.
- Action cible: Les pages ne doivent pas contenir de métier. Déplacer vers runtime/generic page/metadata.

#### src/app/(private)/lignesinterventionauto/nouveau/page.tsx:6

- Type: hardcoded-business-module
- Match: `lignesinterventionauto`
- Code: `return <GenericCreatePage moduleKey="lignesinterventionauto" />;`
- Diagnostic: Nom de module métier codé en dur.
- Action cible: Les pages ne doivent pas contenir de métier. Déplacer vers runtime/generic page/metadata.

#### src/app/(private)/lignesinterventionauto/page.tsx:6

- Type: hardcoded-business-module
- Match: `lignesinterventionauto`
- Code: `return <GenericListPage moduleKey="lignesinterventionauto" />;`
- Diagnostic: Nom de module métier codé en dur.
- Action cible: Les pages ne doivent pas contenir de métier. Déplacer vers runtime/generic page/metadata.

#### src/app/(private)/mouvementsstockauto/[id]/edit/page.tsx:14

- Type: hardcoded-business-module
- Match: `mouvementsstockauto`
- Code: `return <GenericEditPage moduleKey="mouvementsstockauto" id={id} />;`
- Diagnostic: Nom de module métier codé en dur.
- Action cible: Les pages ne doivent pas contenir de métier. Déplacer vers runtime/generic page/metadata.

#### src/app/(private)/mouvementsstockauto/[id]/page.tsx:14

- Type: hardcoded-business-module
- Match: `mouvementsstockauto`
- Code: `return <GenericDetailPage moduleKey="mouvementsstockauto" id={id} />;`
- Diagnostic: Nom de module métier codé en dur.
- Action cible: Les pages ne doivent pas contenir de métier. Déplacer vers runtime/generic page/metadata.

#### src/app/(private)/mouvementsstockauto/analytics/page.tsx:6

- Type: hardcoded-business-module
- Match: `mouvementsstockauto`
- Code: `module="mouvementsstockauto"`
- Diagnostic: Nom de module métier codé en dur.
- Action cible: Les pages ne doivent pas contenir de métier. Déplacer vers runtime/generic page/metadata.

#### src/app/(private)/mouvementsstockauto/audit/page.tsx:6

- Type: hardcoded-business-module
- Match: `mouvementsstockauto`
- Code: `module="mouvementsstockauto"`
- Diagnostic: Nom de module métier codé en dur.
- Action cible: Les pages ne doivent pas contenir de métier. Déplacer vers runtime/generic page/metadata.

#### src/app/(private)/mouvementsstockauto/dashboard/page.tsx:6

- Type: hardcoded-business-module
- Match: `mouvementsstockauto`
- Code: `module="mouvementsstockauto"`
- Diagnostic: Nom de module métier codé en dur.
- Action cible: Les pages ne doivent pas contenir de métier. Déplacer vers runtime/generic page/metadata.

#### src/app/(private)/mouvementsstockauto/export/page.tsx:6

- Type: hardcoded-business-module
- Match: `mouvementsstockauto`
- Code: `module="mouvementsstockauto"`
- Diagnostic: Nom de module métier codé en dur.
- Action cible: Les pages ne doivent pas contenir de métier. Déplacer vers runtime/generic page/metadata.

#### src/app/(private)/mouvementsstockauto/import/page.tsx:6

- Type: hardcoded-business-module
- Match: `mouvementsstockauto`
- Code: `module="mouvementsstockauto"`
- Diagnostic: Nom de module métier codé en dur.
- Action cible: Les pages ne doivent pas contenir de métier. Déplacer vers runtime/generic page/metadata.

#### src/app/(private)/mouvementsstockauto/nouveau/page.tsx:4

- Type: hardcoded-business-module
- Match: `mouvementsstockauto`
- Code: `return <GenericCreatePage moduleKey="mouvementsstockauto" />;`
- Diagnostic: Nom de module métier codé en dur.
- Action cible: Les pages ne doivent pas contenir de métier. Déplacer vers runtime/generic page/metadata.

#### src/app/(private)/mouvementsstockauto/page.tsx:4

- Type: hardcoded-business-module
- Match: `mouvementsstockauto`
- Code: `return <GenericListPage moduleKey="mouvementsstockauto" />;`
- Diagnostic: Nom de module métier codé en dur.
- Action cible: Les pages ne doivent pas contenir de métier. Déplacer vers runtime/generic page/metadata.

#### src/app/(private)/mouvementsstockauto/relations/page.tsx:6

- Type: hardcoded-business-module
- Match: `mouvementsstockauto`
- Code: `module="mouvementsstockauto"`
- Diagnostic: Nom de module métier codé en dur.
- Action cible: Les pages ne doivent pas contenir de métier. Déplacer vers runtime/generic page/metadata.

#### src/app/(private)/mouvementsstockauto/workflows/page.tsx:6

- Type: hardcoded-business-module
- Match: `mouvementsstockauto`
- Code: `module="mouvementsstockauto"`
- Diagnostic: Nom de module métier codé en dur.
- Action cible: Les pages ne doivent pas contenir de métier. Déplacer vers runtime/generic page/metadata.

#### src/app/(private)/receptionsstockauto/[id]/edit/page.tsx:19

- Type: hardcoded-business-module
- Match: `receptionsstockauto`
- Code: `moduleKey="receptionsstockauto"`
- Diagnostic: Nom de module métier codé en dur.
- Action cible: Les pages ne doivent pas contenir de métier. Déplacer vers runtime/generic page/metadata.

#### src/app/(private)/receptionsstockauto/[id]/page.tsx:19

- Type: hardcoded-business-module
- Match: `receptionsstockauto`
- Code: `moduleKey="receptionsstockauto"`
- Diagnostic: Nom de module métier codé en dur.
- Action cible: Les pages ne doivent pas contenir de métier. Déplacer vers runtime/generic page/metadata.

#### src/app/(private)/receptionsstockauto/analytics/page.tsx:6

- Type: hardcoded-business-module
- Match: `receptionsstockauto`
- Code: `module="receptionsstockauto"`
- Diagnostic: Nom de module métier codé en dur.
- Action cible: Les pages ne doivent pas contenir de métier. Déplacer vers runtime/generic page/metadata.

#### src/app/(private)/receptionsstockauto/audit/page.tsx:6

- Type: hardcoded-business-module
- Match: `receptionsstockauto`
- Code: `module="receptionsstockauto"`
- Diagnostic: Nom de module métier codé en dur.
- Action cible: Les pages ne doivent pas contenir de métier. Déplacer vers runtime/generic page/metadata.

#### src/app/(private)/receptionsstockauto/dashboard/page.tsx:6

- Type: hardcoded-business-module
- Match: `receptionsstockauto`
- Code: `module="receptionsstockauto"`
- Diagnostic: Nom de module métier codé en dur.
- Action cible: Les pages ne doivent pas contenir de métier. Déplacer vers runtime/generic page/metadata.

#### src/app/(private)/receptionsstockauto/export/page.tsx:6

- Type: hardcoded-business-module
- Match: `receptionsstockauto`
- Code: `module="receptionsstockauto"`
- Diagnostic: Nom de module métier codé en dur.
- Action cible: Les pages ne doivent pas contenir de métier. Déplacer vers runtime/generic page/metadata.

#### src/app/(private)/receptionsstockauto/import/page.tsx:6

- Type: hardcoded-business-module
- Match: `receptionsstockauto`
- Code: `module="receptionsstockauto"`
- Diagnostic: Nom de module métier codé en dur.
- Action cible: Les pages ne doivent pas contenir de métier. Déplacer vers runtime/generic page/metadata.

#### src/app/(private)/receptionsstockauto/nouveau/page.tsx:8

- Type: hardcoded-business-module
- Match: `receptionsstockauto`
- Code: `moduleKey="receptionsstockauto"`
- Diagnostic: Nom de module métier codé en dur.
- Action cible: Les pages ne doivent pas contenir de métier. Déplacer vers runtime/generic page/metadata.

#### src/app/(private)/receptionsstockauto/page.tsx:8

- Type: hardcoded-business-module
- Match: `receptionsstockauto`
- Code: `moduleKey="receptionsstockauto"`
- Diagnostic: Nom de module métier codé en dur.
- Action cible: Les pages ne doivent pas contenir de métier. Déplacer vers runtime/generic page/metadata.

#### src/app/(private)/receptionsstockauto/relations/page.tsx:6

- Type: hardcoded-business-module
- Match: `receptionsstockauto`
- Code: `module="receptionsstockauto"`
- Diagnostic: Nom de module métier codé en dur.
- Action cible: Les pages ne doivent pas contenir de métier. Déplacer vers runtime/generic page/metadata.

#### src/app/(private)/receptionsstockauto/workflows/page.tsx:6

- Type: hardcoded-business-module
- Match: `receptionsstockauto`
- Code: `module="receptionsstockauto"`
- Diagnostic: Nom de module métier codé en dur.
- Action cible: Les pages ne doivent pas contenir de métier. Déplacer vers runtime/generic page/metadata.

#### src/app/(private)/vehicules/[id]/edit/page.tsx:19

- Type: hardcoded-business-module
- Match: `vehicules`
- Code: `moduleKey="vehicules"`
- Diagnostic: Nom de module métier codé en dur.
- Action cible: Les pages ne doivent pas contenir de métier. Déplacer vers runtime/generic page/metadata.

#### src/app/(private)/vehicules/[id]/page.tsx:19

- Type: hardcoded-business-module
- Match: `vehicules`
- Code: `moduleKey="vehicules"`
- Diagnostic: Nom de module métier codé en dur.
- Action cible: Les pages ne doivent pas contenir de métier. Déplacer vers runtime/generic page/metadata.

#### src/app/(private)/vehicules/analytics/page.tsx:6

- Type: hardcoded-business-module
- Match: `vehicules`
- Code: `module="vehicules"`
- Diagnostic: Nom de module métier codé en dur.
- Action cible: Les pages ne doivent pas contenir de métier. Déplacer vers runtime/generic page/metadata.

#### src/app/(private)/vehicules/audit/page.tsx:6

- Type: hardcoded-business-module
- Match: `vehicules`
- Code: `module="vehicules"`
- Diagnostic: Nom de module métier codé en dur.
- Action cible: Les pages ne doivent pas contenir de métier. Déplacer vers runtime/generic page/metadata.

#### src/app/(private)/vehicules/dashboard/page.tsx:6

- Type: hardcoded-business-module
- Match: `vehicules`
- Code: `module="vehicules"`
- Diagnostic: Nom de module métier codé en dur.
- Action cible: Les pages ne doivent pas contenir de métier. Déplacer vers runtime/generic page/metadata.

#### src/app/(private)/vehicules/export/page.tsx:6

- Type: hardcoded-business-module
- Match: `vehicules`
- Code: `module="vehicules"`
- Diagnostic: Nom de module métier codé en dur.
- Action cible: Les pages ne doivent pas contenir de métier. Déplacer vers runtime/generic page/metadata.

#### src/app/(private)/vehicules/import/page.tsx:6

- Type: hardcoded-business-module
- Match: `vehicules`
- Code: `module="vehicules"`
- Diagnostic: Nom de module métier codé en dur.
- Action cible: Les pages ne doivent pas contenir de métier. Déplacer vers runtime/generic page/metadata.

#### src/app/(private)/vehicules/nouveau/page.tsx:8

- Type: hardcoded-business-module
- Match: `vehicules`
- Code: `moduleKey="vehicules"`
- Diagnostic: Nom de module métier codé en dur.
- Action cible: Les pages ne doivent pas contenir de métier. Déplacer vers runtime/generic page/metadata.

#### src/app/(private)/vehicules/page.tsx:8

- Type: hardcoded-business-module
- Match: `vehicules`
- Code: `moduleKey="vehicules"`
- Diagnostic: Nom de module métier codé en dur.
- Action cible: Les pages ne doivent pas contenir de métier. Déplacer vers runtime/generic page/metadata.

#### src/app/(private)/vehicules/relations/page.tsx:6

- Type: hardcoded-business-module
- Match: `vehicules`
- Code: `module="vehicules"`
- Diagnostic: Nom de module métier codé en dur.
- Action cible: Les pages ne doivent pas contenir de métier. Déplacer vers runtime/generic page/metadata.

#### src/app/(private)/vehicules/workflows/page.tsx:6

- Type: hardcoded-business-module
- Match: `vehicules`
- Code: `module="vehicules"`
- Diagnostic: Nom de module métier codé en dur.
- Action cible: Les pages ne doivent pas contenir de métier. Déplacer vers runtime/generic page/metadata.

#### src/app/facture/[token]/details/page.tsx:26

- Type: hardcoded-business-module
- Match: `facturesauto`
- Code: `} from "@/runtime/modules/generated/facturesauto";`
- Diagnostic: Nom de module métier codé en dur.
- Action cible: Les pages ne doivent pas contenir de métier. Déplacer vers runtime/generic page/metadata.

#### src/app/facture/[token]/details/page.tsx:30

- Type: hardcoded-business-module
- Match: `clientsauto`
- Code: `} from "@/runtime/modules/generated/clientsauto";`
- Diagnostic: Nom de module métier codé en dur.
- Action cible: Les pages ne doivent pas contenir de métier. Déplacer vers runtime/generic page/metadata.

#### src/app/facture/[token]/details/page.tsx:34

- Type: hardcoded-business-module
- Match: `vehicules`
- Code: `} from "@/runtime/modules/generated/vehicules";`
- Diagnostic: Nom de module métier codé en dur.
- Action cible: Les pages ne doivent pas contenir de métier. Déplacer vers runtime/generic page/metadata.

#### src/app/facture/[token]/details/page.tsx:38

- Type: hardcoded-business-module
- Match: `interventionsauto`
- Code: `} from "@/runtime/modules/generated/interventionsauto";`
- Diagnostic: Nom de module métier codé en dur.
- Action cible: Les pages ne doivent pas contenir de métier. Déplacer vers runtime/generic page/metadata.

#### src/app/facture/[token]/details/page.tsx:42

- Type: hardcoded-business-module
- Match: `lignesinterventionauto`
- Code: `} from "@/runtime/modules/generated/lignesinterventionauto";`
- Diagnostic: Nom de module métier codé en dur.
- Action cible: Les pages ne doivent pas contenir de métier. Déplacer vers runtime/generic page/metadata.

#### src/app/facture/[token]/page.tsx:29

- Type: hardcoded-business-module
- Match: `facturesauto`
- Code: `} from "@/runtime/modules/generated/facturesauto";`
- Diagnostic: Nom de module métier codé en dur.
- Action cible: Les pages ne doivent pas contenir de métier. Déplacer vers runtime/generic page/metadata.

#### src/app/facture/[token]/page.tsx:33

- Type: hardcoded-business-module
- Match: `clientsauto`
- Code: `} from "@/runtime/modules/generated/clientsauto";`
- Diagnostic: Nom de module métier codé en dur.
- Action cible: Les pages ne doivent pas contenir de métier. Déplacer vers runtime/generic page/metadata.

#### src/app/facture/[token]/page.tsx:37

- Type: hardcoded-business-module
- Match: `vehicules`
- Code: `} from "@/runtime/modules/generated/vehicules";`
- Diagnostic: Nom de module métier codé en dur.
- Action cible: Les pages ne doivent pas contenir de métier. Déplacer vers runtime/generic page/metadata.

#### src/app/facture/[token]/page.tsx:41

- Type: hardcoded-business-module
- Match: `interventionsauto`
- Code: `} from "@/runtime/modules/generated/interventionsauto";`
- Diagnostic: Nom de module métier codé en dur.
- Action cible: Les pages ne doivent pas contenir de métier. Déplacer vers runtime/generic page/metadata.

#### src/components/erp/forms/enterprise/ERPEnterpriseForm.tsx:416

- Type: module-metadata-key-conditional
- Match: `module.metadata.key === "receptionsstockauto"`
- Code: `module.metadata.key === "receptionsstockauto" &&`
- Diagnostic: Condition directe sur module.metadata.key dans du code générique.
- Action cible: Remonter vers metadata + moteur runtime générique.

#### src/components/erp/forms/enterprise/ERPEnterpriseForm.tsx:636

- Type: module-metadata-key-conditional
- Match: `module.metadata.key === "facturesauto"`
- Code: `module.metadata.key === "facturesauto" &&`
- Diagnostic: Condition directe sur module.metadata.key dans du code générique.
- Action cible: Remonter vers metadata + moteur runtime générique.

#### src/components/erp/forms/enterprise/ERPEnterpriseForm.tsx:774

- Type: module-metadata-key-conditional
- Match: `module.metadata.key !== "lignesinterventionauto"`
- Code: `if (module.metadata.key !== "lignesinterventionauto") {`
- Diagnostic: Condition directe sur module.metadata.key dans du code générique.
- Action cible: Remonter vers metadata + moteur runtime générique.

#### src/components/erp/forms/enterprise/ERPEnterpriseForm.tsx:867

- Type: module-metadata-key-conditional
- Match: `module.metadata.key === "lignesinterventionauto"`
- Code: `module.metadata.key === "lignesinterventionauto" &&`
- Diagnostic: Condition directe sur module.metadata.key dans du code générique.
- Action cible: Remonter vers metadata + moteur runtime générique.

#### src/components/erp/forms/enterprise/ERPEnterpriseForm.tsx:909

- Type: module-metadata-key-conditional
- Match: `module.metadata.key !== "terrains"`
- Code: `if (module.metadata.key !== "terrains") {`
- Diagnostic: Condition directe sur module.metadata.key dans du code générique.
- Action cible: Remonter vers metadata + moteur runtime générique.

#### src/components/erp/forms/enterprise/ERPEnterpriseForm.tsx:937

- Type: module-metadata-key-conditional
- Match: `module.metadata.key !== "terrains"`
- Code: `if (module.metadata.key !== "terrains") {`
- Diagnostic: Condition directe sur module.metadata.key dans du code générique.
- Action cible: Remonter vers metadata + moteur runtime générique.

#### src/components/erp/forms/enterprise/ERPEnterpriseForm.tsx:979

- Type: module-metadata-key-conditional
- Match: `module.metadata.key !== "contrats"`
- Code: `if (module.metadata.key !== "contrats") {`
- Diagnostic: Condition directe sur module.metadata.key dans du code générique.
- Action cible: Remonter vers metadata + moteur runtime générique.

#### src/components/erp/forms/enterprise/ERPEnterpriseForm.tsx:1002

- Type: module-metadata-key-conditional
- Match: `module.metadata.key !== "contrats"`
- Code: `if (module.metadata.key !== "contrats") {`
- Diagnostic: Condition directe sur module.metadata.key dans du code générique.
- Action cible: Remonter vers metadata + moteur runtime générique.

#### src/components/erp/forms/enterprise/ERPEnterpriseForm.tsx:1088

- Type: module-metadata-key-conditional
- Match: `module.metadata.key === "terrains"`
- Code: `if (module.metadata.key === "terrains") {`
- Diagnostic: Condition directe sur module.metadata.key dans du code générique.
- Action cible: Remonter vers metadata + moteur runtime générique.

#### src/components/erp/forms/enterprise/ERPEnterpriseForm.tsx:1095

- Type: module-metadata-key-conditional
- Match: `module.metadata.key === "contrats"`
- Code: `if (module.metadata.key === "contrats") {`
- Diagnostic: Condition directe sur module.metadata.key dans du code générique.
- Action cible: Remonter vers metadata + moteur runtime générique.

#### src/components/erp/forms/enterprise/ERPEnterpriseForm.tsx:1176

- Type: module-metadata-key-conditional
- Match: `module.metadata.key ===
"exploitations"`
- Code: `module.metadata.key ===`
- Diagnostic: Condition directe sur module.metadata.key dans du code générique.
- Action cible: Remonter vers metadata + moteur runtime générique.

#### src/components/erp/forms/enterprise/ERPEnterpriseForm.tsx:1191

- Type: module-metadata-key-conditional
- Match: `module.metadata.key === "contrats"`
- Code: `if (module.metadata.key === "contrats") {`
- Diagnostic: Condition directe sur module.metadata.key dans du code générique.
- Action cible: Remonter vers metadata + moteur runtime générique.

#### src/components/erp/forms/enterprise/ERPEnterpriseForm.tsx:1227

- Type: module-metadata-key-conditional
- Match: `module.metadata.key ===
"exploitations"`
- Code: `module.metadata.key ===`
- Diagnostic: Condition directe sur module.metadata.key dans du code générique.
- Action cible: Remonter vers metadata + moteur runtime générique.

#### src/components/erp/forms/enterprise/ERPEnterpriseForm.tsx:1242

- Type: module-metadata-key-conditional
- Match: `module.metadata.key === "contrats"`
- Code: `if (module.metadata.key === "contrats") {`
- Diagnostic: Condition directe sur module.metadata.key dans du code générique.
- Action cible: Remonter vers metadata + moteur runtime générique.

#### src/components/erp/forms/enterprise/ERPEnterpriseForm.tsx:1251

- Type: module-metadata-key-conditional
- Match: `module.metadata.key === "lignesinterventionauto"`
- Code: `if (module.metadata.key === "lignesinterventionauto") {`
- Diagnostic: Condition directe sur module.metadata.key dans du code générique.
- Action cible: Remonter vers metadata + moteur runtime générique.

#### src/components/erp/forms/enterprise/ERPEnterpriseForm.tsx:1387

- Type: module-key-conditional
- Match: `moduleKey === "receptionsstockauto"`
- Code: `if (moduleKey === "receptionsstockauto" && currentStatus === "brouillon") {`
- Diagnostic: Condition directe sur moduleKey.
- Action cible: Remonter vers metadata + moteur runtime générique.

#### src/components/erp/forms/enterprise/ERPEnterpriseForm.tsx:1397

- Type: module-key-conditional
- Match: `moduleKey === "clientsauto"`
- Code: `if (moduleKey === "clientsauto" && currentStatus !== "archive") {`
- Diagnostic: Condition directe sur moduleKey.
- Action cible: Remonter vers metadata + moteur runtime générique.

#### src/components/erp/forms/enterprise/ERPEnterpriseForm.tsx:1406

- Type: module-key-conditional
- Match: `moduleKey === "vehicules"`
- Code: `if (moduleKey === "vehicules" && currentStatus !== "archive") {`
- Diagnostic: Condition directe sur moduleKey.
- Action cible: Remonter vers metadata + moteur runtime générique.

#### src/components/erp/forms/enterprise/ERPEnterpriseForm.tsx:1419

- Type: module-key-conditional
- Match: `moduleKey === "facturesauto"`
- Code: `moduleKey === "facturesauto" &&`
- Diagnostic: Condition directe sur moduleKey.
- Action cible: Remonter vers metadata + moteur runtime générique.

#### src/components/erp/forms/enterprise/ERPEnterpriseForm.tsx:1431

- Type: module-key-conditional
- Match: `moduleKey === "encaissementsauto"`
- Code: `if (moduleKey === "encaissementsauto" && currentStatus !== "annule") {`
- Diagnostic: Condition directe sur moduleKey.
- Action cible: Remonter vers metadata + moteur runtime générique.

#### src/components/erp/forms/enterprise/ERPEnterpriseForm.tsx:1440

- Type: module-key-conditional
- Match: `moduleKey === "echeancespaiementauto"`
- Code: `if (moduleKey === "echeancespaiementauto" && currentStatus !== "annulee") {`
- Diagnostic: Condition directe sur moduleKey.
- Action cible: Remonter vers metadata + moteur runtime générique.

#### src/components/erp/forms/enterprise/ERPEnterpriseForm.tsx:230

- Type: metadata-key-conditional
- Match: `metadata.key === "lignesinterventionauto"`
- Code: `(item) => item.metadata.key === "lignesinterventionauto"`
- Diagnostic: Condition directe sur metadata.key.
- Action cible: Remonter vers metadata + moteur runtime générique.

#### src/components/erp/forms/enterprise/ERPEnterpriseForm.tsx:235

- Type: metadata-key-conditional
- Match: `metadata.key === "interventionsauto"`
- Code: `(item) => item.metadata.key === "interventionsauto"`
- Diagnostic: Condition directe sur metadata.key.
- Action cible: Remonter vers metadata + moteur runtime générique.

#### src/components/erp/forms/enterprise/ERPEnterpriseForm.tsx:416

- Type: metadata-key-conditional
- Match: `metadata.key === "receptionsstockauto"`
- Code: `module.metadata.key === "receptionsstockauto" &&`
- Diagnostic: Condition directe sur metadata.key.
- Action cible: Remonter vers metadata + moteur runtime générique.

#### src/components/erp/forms/enterprise/ERPEnterpriseForm.tsx:636

- Type: metadata-key-conditional
- Match: `metadata.key === "facturesauto"`
- Code: `module.metadata.key === "facturesauto" &&`
- Diagnostic: Condition directe sur metadata.key.
- Action cible: Remonter vers metadata + moteur runtime générique.

#### src/components/erp/forms/enterprise/ERPEnterpriseForm.tsx:774

- Type: metadata-key-conditional
- Match: `metadata.key !== "lignesinterventionauto"`
- Code: `if (module.metadata.key !== "lignesinterventionauto") {`
- Diagnostic: Condition directe sur metadata.key.
- Action cible: Remonter vers metadata + moteur runtime générique.

#### src/components/erp/forms/enterprise/ERPEnterpriseForm.tsx:867

- Type: metadata-key-conditional
- Match: `metadata.key === "lignesinterventionauto"`
- Code: `module.metadata.key === "lignesinterventionauto" &&`
- Diagnostic: Condition directe sur metadata.key.
- Action cible: Remonter vers metadata + moteur runtime générique.

#### src/components/erp/forms/enterprise/ERPEnterpriseForm.tsx:909

- Type: metadata-key-conditional
- Match: `metadata.key !== "terrains"`
- Code: `if (module.metadata.key !== "terrains") {`
- Diagnostic: Condition directe sur metadata.key.
- Action cible: Remonter vers metadata + moteur runtime générique.

#### src/components/erp/forms/enterprise/ERPEnterpriseForm.tsx:937

- Type: metadata-key-conditional
- Match: `metadata.key !== "terrains"`
- Code: `if (module.metadata.key !== "terrains") {`
- Diagnostic: Condition directe sur metadata.key.
- Action cible: Remonter vers metadata + moteur runtime générique.

#### src/components/erp/forms/enterprise/ERPEnterpriseForm.tsx:979

- Type: metadata-key-conditional
- Match: `metadata.key !== "contrats"`
- Code: `if (module.metadata.key !== "contrats") {`
- Diagnostic: Condition directe sur metadata.key.
- Action cible: Remonter vers metadata + moteur runtime générique.

#### src/components/erp/forms/enterprise/ERPEnterpriseForm.tsx:1002

- Type: metadata-key-conditional
- Match: `metadata.key !== "contrats"`
- Code: `if (module.metadata.key !== "contrats") {`
- Diagnostic: Condition directe sur metadata.key.
- Action cible: Remonter vers metadata + moteur runtime générique.

#### src/components/erp/forms/enterprise/ERPEnterpriseForm.tsx:1088

- Type: metadata-key-conditional
- Match: `metadata.key === "terrains"`
- Code: `if (module.metadata.key === "terrains") {`
- Diagnostic: Condition directe sur metadata.key.
- Action cible: Remonter vers metadata + moteur runtime générique.

#### src/components/erp/forms/enterprise/ERPEnterpriseForm.tsx:1095

- Type: metadata-key-conditional
- Match: `metadata.key === "contrats"`
- Code: `if (module.metadata.key === "contrats") {`
- Diagnostic: Condition directe sur metadata.key.
- Action cible: Remonter vers metadata + moteur runtime générique.

#### src/components/erp/forms/enterprise/ERPEnterpriseForm.tsx:1176

- Type: metadata-key-conditional
- Match: `metadata.key ===
"exploitations"`
- Code: `module.metadata.key ===`
- Diagnostic: Condition directe sur metadata.key.
- Action cible: Remonter vers metadata + moteur runtime générique.

#### src/components/erp/forms/enterprise/ERPEnterpriseForm.tsx:1191

- Type: metadata-key-conditional
- Match: `metadata.key === "contrats"`
- Code: `if (module.metadata.key === "contrats") {`
- Diagnostic: Condition directe sur metadata.key.
- Action cible: Remonter vers metadata + moteur runtime générique.

#### src/components/erp/forms/enterprise/ERPEnterpriseForm.tsx:1227

- Type: metadata-key-conditional
- Match: `metadata.key ===
"exploitations"`
- Code: `module.metadata.key ===`
- Diagnostic: Condition directe sur metadata.key.
- Action cible: Remonter vers metadata + moteur runtime générique.

#### src/components/erp/forms/enterprise/ERPEnterpriseForm.tsx:1242

- Type: metadata-key-conditional
- Match: `metadata.key === "contrats"`
- Code: `if (module.metadata.key === "contrats") {`
- Diagnostic: Condition directe sur metadata.key.
- Action cible: Remonter vers metadata + moteur runtime générique.

#### src/components/erp/forms/enterprise/ERPEnterpriseForm.tsx:1251

- Type: metadata-key-conditional
- Match: `metadata.key === "lignesinterventionauto"`
- Code: `if (module.metadata.key === "lignesinterventionauto") {`
- Diagnostic: Condition directe sur metadata.key.
- Action cible: Remonter vers metadata + moteur runtime générique.

#### src/components/erp/forms/enterprise/ERPEnterpriseForm.tsx:1379

- Type: business-status-action-local
- Match: `getBusinessStatusAction`
- Code: `function getBusinessStatusAction() {`
- Diagnostic: Action métier probablement codée dans un composant générique.
- Action cible: Remonter vers RuntimeActionEngine + module.actions metadata.

#### src/components/erp/forms/enterprise/ERPEnterpriseForm.tsx:1452

- Type: business-status-action-local
- Match: `handleBusinessStatusAction`
- Code: `async function handleBusinessStatusAction() {`
- Diagnostic: Action métier probablement codée dans un composant générique.
- Action cible: Remonter vers RuntimeActionEngine + module.actions metadata.

#### src/components/erp/forms/enterprise/ERPEnterpriseForm.tsx:1453

- Type: business-status-action-local
- Match: `getBusinessStatusAction`
- Code: `const action = getBusinessStatusAction();`
- Diagnostic: Action métier probablement codée dans un composant générique.
- Action cible: Remonter vers RuntimeActionEngine + module.actions metadata.

#### src/components/erp/forms/enterprise/ERPEnterpriseForm.tsx:1500

- Type: business-status-action-local
- Match: `businessStatusAction`
- Code: `const businessStatusAction = isRemovedRecord ? null : getBusinessStatusAction();`
- Diagnostic: Action métier probablement codée dans un composant générique.
- Action cible: Remonter vers RuntimeActionEngine + module.actions metadata.

#### src/components/erp/forms/enterprise/ERPEnterpriseForm.tsx:1500

- Type: business-status-action-local
- Match: `getBusinessStatusAction`
- Code: `const businessStatusAction = isRemovedRecord ? null : getBusinessStatusAction();`
- Diagnostic: Action métier probablement codée dans un composant générique.
- Action cible: Remonter vers RuntimeActionEngine + module.actions metadata.

#### src/components/erp/forms/enterprise/ERPEnterpriseForm.tsx:1858

- Type: business-status-action-local
- Match: `businessStatusAction`
- Code: `{businessStatusAction ? (`
- Diagnostic: Action métier probablement codée dans un composant générique.
- Action cible: Remonter vers RuntimeActionEngine + module.actions metadata.

#### src/components/erp/forms/enterprise/ERPEnterpriseForm.tsx:1894

- Type: business-status-action-local
- Match: `businessStatusAction`
- Code: `{businessStatusAction.label}`
- Diagnostic: Action métier probablement codée dans un composant générique.
- Action cible: Remonter vers RuntimeActionEngine + module.actions metadata.

#### src/components/erp/forms/enterprise/ERPEnterpriseForm.tsx:1927

- Type: business-status-action-local
- Match: `handleBusinessStatusAction`
- Code: `onClick={handleBusinessStatusAction}`
- Diagnostic: Action métier probablement codée dans un composant générique.
- Action cible: Remonter vers RuntimeActionEngine + module.actions metadata.

#### src/components/erp/forms/enterprise/ERPEnterpriseForm.tsx:1936

- Type: business-status-action-local
- Match: `businessStatusAction`
- Code: `{businessStatusAction.label}`
- Diagnostic: Action métier probablement codée dans un composant générique.
- Action cible: Remonter vers RuntimeActionEngine + module.actions metadata.

#### src/components/erp/runtime/ERPRuntimeDetails.tsx:155

- Type: module-metadata-key-conditional
- Match: `module.metadata.key === "facturesauto"`
- Code: `module.metadata.key === "facturesauto" &&`
- Diagnostic: Condition directe sur module.metadata.key dans du code générique.
- Action cible: Remonter vers metadata + moteur runtime générique.

#### src/components/erp/runtime/ERPRuntimeDetails.tsx:155

- Type: metadata-key-conditional
- Match: `metadata.key === "facturesauto"`
- Code: `module.metadata.key === "facturesauto" &&`
- Diagnostic: Condition directe sur metadata.key.
- Action cible: Remonter vers metadata + moteur runtime générique.

#### src/runtime/business-rules/runtimeBusinessRules.ts:155

- Type: module-metadata-key-conditional
- Match: `module.metadata.key ===
              "rappelsauto"`
- Code: `module.metadata.key ===`
- Diagnostic: Condition directe sur module.metadata.key dans du code générique.
- Action cible: Remonter vers metadata + moteur runtime générique.

#### src/runtime/business-rules/runtimeBusinessRules.ts:301

- Type: module-metadata-key-conditional
- Match: `module.metadata.key ===
              "interventionsauto"`
- Code: `module.metadata.key ===`
- Diagnostic: Condition directe sur module.metadata.key dans du code générique.
- Action cible: Remonter vers metadata + moteur runtime générique.

#### src/runtime/business-rules/runtimeBusinessRules.ts:308

- Type: module-metadata-key-conditional
- Match: `module.metadata.key ===
              "rendezvous"`
- Code: `module.metadata.key ===`
- Diagnostic: Condition directe sur module.metadata.key dans du code générique.
- Action cible: Remonter vers metadata + moteur runtime générique.

#### src/runtime/business-rules/runtimeBusinessRules.ts:464

- Type: module-metadata-key-conditional
- Match: `module.metadata.key ===
              "interventionsauto"`
- Code: `module.metadata.key ===`
- Diagnostic: Condition directe sur module.metadata.key dans du code générique.
- Action cible: Remonter vers metadata + moteur runtime générique.

#### src/runtime/business-rules/runtimeBusinessRules.ts:471

- Type: module-metadata-key-conditional
- Match: `module.metadata.key ===
              "rendezvous"`
- Code: `module.metadata.key ===`
- Diagnostic: Condition directe sur module.metadata.key dans du code générique.
- Action cible: Remonter vers metadata + moteur runtime générique.

#### src/runtime/business-rules/runtimeBusinessRules.ts:636

- Type: module-metadata-key-conditional
- Match: `module.metadata.key ===
              "facturesauto"`
- Code: `module.metadata.key ===`
- Diagnostic: Condition directe sur module.metadata.key dans du code générique.
- Action cible: Remonter vers metadata + moteur runtime générique.

#### src/runtime/business-rules/runtimeBusinessRules.ts:651

- Type: module-metadata-key-conditional
- Match: `module.metadata.key ===
              "interventionsauto"`
- Code: `module.metadata.key ===`
- Diagnostic: Condition directe sur module.metadata.key dans du code générique.
- Action cible: Remonter vers metadata + moteur runtime générique.

#### src/runtime/business-rules/runtimeBusinessRules.ts:1009

- Type: module-metadata-key-conditional
- Match: `module.metadata.key ===
              "facturesauto"`
- Code: `module.metadata.key ===`
- Diagnostic: Condition directe sur module.metadata.key dans du code générique.
- Action cible: Remonter vers metadata + moteur runtime générique.

#### src/runtime/business-rules/runtimeBusinessRules.ts:1016

- Type: module-metadata-key-conditional
- Match: `module.metadata.key ===
              "encaissementsauto"`
- Code: `module.metadata.key ===`
- Diagnostic: Condition directe sur module.metadata.key dans du code générique.
- Action cible: Remonter vers metadata + moteur runtime générique.

#### src/runtime/business-rules/runtimeBusinessRules.ts:1023

- Type: module-metadata-key-conditional
- Match: `module.metadata.key ===
              "interventionsauto"`
- Code: `module.metadata.key ===`
- Diagnostic: Condition directe sur module.metadata.key dans du code générique.
- Action cible: Remonter vers metadata + moteur runtime générique.

#### src/runtime/business-rules/runtimeBusinessRules.ts:1258

- Type: module-metadata-key-conditional
- Match: `module.metadata.key ===
              "facturesauto"`
- Code: `module.metadata.key ===`
- Diagnostic: Condition directe sur module.metadata.key dans du code générique.
- Action cible: Remonter vers metadata + moteur runtime générique.

#### src/runtime/business-rules/runtimeBusinessRules.ts:1265

- Type: module-metadata-key-conditional
- Match: `module.metadata.key ===
              "encaissementsauto"`
- Code: `module.metadata.key ===`
- Diagnostic: Condition directe sur module.metadata.key dans du code générique.
- Action cible: Remonter vers metadata + moteur runtime générique.

#### src/runtime/business-rules/runtimeBusinessRules.ts:1272

- Type: module-metadata-key-conditional
- Match: `module.metadata.key ===
              "interventionsauto"`
- Code: `module.metadata.key ===`
- Diagnostic: Condition directe sur module.metadata.key dans du code générique.
- Action cible: Remonter vers metadata + moteur runtime générique.

#### src/runtime/business-rules/runtimeBusinessRules.ts:1543

- Type: module-metadata-key-conditional
- Match: `module.metadata.key ===
              "rappelsauto"`
- Code: `module.metadata.key ===`
- Diagnostic: Condition directe sur module.metadata.key dans du code générique.
- Action cible: Remonter vers metadata + moteur runtime générique.

#### src/runtime/business-rules/runtimeBusinessRules.ts:1550

- Type: module-metadata-key-conditional
- Match: `module.metadata.key ===
              "echeancespaiementauto"`
- Code: `module.metadata.key ===`
- Diagnostic: Condition directe sur module.metadata.key dans du code générique.
- Action cible: Remonter vers metadata + moteur runtime générique.

#### src/runtime/business-rules/runtimeBusinessRules.ts:1703

- Type: module-metadata-key-conditional
- Match: `module.metadata.key ===
              "rappelsauto"`
- Code: `module.metadata.key ===`
- Diagnostic: Condition directe sur module.metadata.key dans du code générique.
- Action cible: Remonter vers metadata + moteur runtime générique.

#### src/runtime/business-rules/runtimeBusinessRules.ts:1710

- Type: module-metadata-key-conditional
- Match: `module.metadata.key ===
              "echeancespaiementauto"`
- Code: `module.metadata.key ===`
- Diagnostic: Condition directe sur module.metadata.key dans du code générique.
- Action cible: Remonter vers metadata + moteur runtime générique.

#### src/runtime/business-rules/runtimeBusinessRules.ts:155

- Type: metadata-key-conditional
- Match: `metadata.key ===
              "rappelsauto"`
- Code: `module.metadata.key ===`
- Diagnostic: Condition directe sur metadata.key.
- Action cible: Remonter vers metadata + moteur runtime générique.

#### src/runtime/business-rules/runtimeBusinessRules.ts:301

- Type: metadata-key-conditional
- Match: `metadata.key ===
              "interventionsauto"`
- Code: `module.metadata.key ===`
- Diagnostic: Condition directe sur metadata.key.
- Action cible: Remonter vers metadata + moteur runtime générique.

#### src/runtime/business-rules/runtimeBusinessRules.ts:308

- Type: metadata-key-conditional
- Match: `metadata.key ===
              "rendezvous"`
- Code: `module.metadata.key ===`
- Diagnostic: Condition directe sur metadata.key.
- Action cible: Remonter vers metadata + moteur runtime générique.

#### src/runtime/business-rules/runtimeBusinessRules.ts:464

- Type: metadata-key-conditional
- Match: `metadata.key ===
              "interventionsauto"`
- Code: `module.metadata.key ===`
- Diagnostic: Condition directe sur metadata.key.
- Action cible: Remonter vers metadata + moteur runtime générique.

#### src/runtime/business-rules/runtimeBusinessRules.ts:471

- Type: metadata-key-conditional
- Match: `metadata.key ===
              "rendezvous"`
- Code: `module.metadata.key ===`
- Diagnostic: Condition directe sur metadata.key.
- Action cible: Remonter vers metadata + moteur runtime générique.

#### src/runtime/business-rules/runtimeBusinessRules.ts:636

- Type: metadata-key-conditional
- Match: `metadata.key ===
              "facturesauto"`
- Code: `module.metadata.key ===`
- Diagnostic: Condition directe sur metadata.key.
- Action cible: Remonter vers metadata + moteur runtime générique.

#### src/runtime/business-rules/runtimeBusinessRules.ts:651

- Type: metadata-key-conditional
- Match: `metadata.key ===
              "interventionsauto"`
- Code: `module.metadata.key ===`
- Diagnostic: Condition directe sur metadata.key.
- Action cible: Remonter vers metadata + moteur runtime générique.

#### src/runtime/business-rules/runtimeBusinessRules.ts:1009

- Type: metadata-key-conditional
- Match: `metadata.key ===
              "facturesauto"`
- Code: `module.metadata.key ===`
- Diagnostic: Condition directe sur metadata.key.
- Action cible: Remonter vers metadata + moteur runtime générique.

#### src/runtime/business-rules/runtimeBusinessRules.ts:1016

- Type: metadata-key-conditional
- Match: `metadata.key ===
              "encaissementsauto"`
- Code: `module.metadata.key ===`
- Diagnostic: Condition directe sur metadata.key.
- Action cible: Remonter vers metadata + moteur runtime générique.

#### src/runtime/business-rules/runtimeBusinessRules.ts:1023

- Type: metadata-key-conditional
- Match: `metadata.key ===
              "interventionsauto"`
- Code: `module.metadata.key ===`
- Diagnostic: Condition directe sur metadata.key.
- Action cible: Remonter vers metadata + moteur runtime générique.

#### src/runtime/business-rules/runtimeBusinessRules.ts:1258

- Type: metadata-key-conditional
- Match: `metadata.key ===
              "facturesauto"`
- Code: `module.metadata.key ===`
- Diagnostic: Condition directe sur metadata.key.
- Action cible: Remonter vers metadata + moteur runtime générique.

#### src/runtime/business-rules/runtimeBusinessRules.ts:1265

- Type: metadata-key-conditional
- Match: `metadata.key ===
              "encaissementsauto"`
- Code: `module.metadata.key ===`
- Diagnostic: Condition directe sur metadata.key.
- Action cible: Remonter vers metadata + moteur runtime générique.

#### src/runtime/business-rules/runtimeBusinessRules.ts:1272

- Type: metadata-key-conditional
- Match: `metadata.key ===
              "interventionsauto"`
- Code: `module.metadata.key ===`
- Diagnostic: Condition directe sur metadata.key.
- Action cible: Remonter vers metadata + moteur runtime générique.

#### src/runtime/business-rules/runtimeBusinessRules.ts:1543

- Type: metadata-key-conditional
- Match: `metadata.key ===
              "rappelsauto"`
- Code: `module.metadata.key ===`
- Diagnostic: Condition directe sur metadata.key.
- Action cible: Remonter vers metadata + moteur runtime générique.

#### src/runtime/business-rules/runtimeBusinessRules.ts:1550

- Type: metadata-key-conditional
- Match: `metadata.key ===
              "echeancespaiementauto"`
- Code: `module.metadata.key ===`
- Diagnostic: Condition directe sur metadata.key.
- Action cible: Remonter vers metadata + moteur runtime générique.

#### src/runtime/business-rules/runtimeBusinessRules.ts:1703

- Type: metadata-key-conditional
- Match: `metadata.key ===
              "rappelsauto"`
- Code: `module.metadata.key ===`
- Diagnostic: Condition directe sur metadata.key.
- Action cible: Remonter vers metadata + moteur runtime générique.

#### src/runtime/business-rules/runtimeBusinessRules.ts:1710

- Type: metadata-key-conditional
- Match: `metadata.key ===
              "echeancespaiementauto"`
- Code: `module.metadata.key ===`
- Diagnostic: Condition directe sur metadata.key.
- Action cible: Remonter vers metadata + moteur runtime générique.

#### src/runtime/firestore/FirestoreRuntimeMutation.ts:144

- Type: module-metadata-key-conditional
- Match: `module.metadata.key !== "lignesinterventionauto"`
- Code: `if (module.metadata.key !== "lignesinterventionauto") {`
- Diagnostic: Condition directe sur module.metadata.key dans du code générique.
- Action cible: Remonter vers metadata + moteur runtime générique.

#### src/runtime/firestore/FirestoreRuntimeMutation.ts:182

- Type: module-metadata-key-conditional
- Match: `module.metadata.key !== "lignesinterventionauto"`
- Code: `module.metadata.key !== "lignesinterventionauto" &&`
- Diagnostic: Condition directe sur module.metadata.key dans du code générique.
- Action cible: Remonter vers metadata + moteur runtime générique.

#### src/runtime/firestore/FirestoreRuntimeMutation.ts:183

- Type: module-metadata-key-conditional
- Match: `module.metadata.key !== "receptionsstockauto"`
- Code: `module.metadata.key !== "receptionsstockauto"`
- Diagnostic: Condition directe sur module.metadata.key dans du code générique.
- Action cible: Remonter vers metadata + moteur runtime générique.

#### src/runtime/firestore/FirestoreRuntimeMutation.ts:188

- Type: module-metadata-key-conditional
- Match: `module.metadata.key === "lignesinterventionauto"`
- Code: `if (module.metadata.key === "lignesinterventionauto") {`
- Diagnostic: Condition directe sur module.metadata.key dans du code générique.
- Action cible: Remonter vers metadata + moteur runtime générique.

#### src/runtime/firestore/FirestoreRuntimeMutation.ts:214

- Type: module-metadata-key-conditional
- Match: `module.metadata.key === "receptionsstockauto"`
- Code: `module.metadata.key === "receptionsstockauto"`
- Diagnostic: Condition directe sur module.metadata.key dans du code générique.
- Action cible: Remonter vers metadata + moteur runtime générique.

#### src/runtime/firestore/FirestoreRuntimeMutation.ts:342

- Type: module-metadata-key-conditional
- Match: `module.metadata.key === "lignesinterventionauto"`
- Code: `module.metadata.key === "lignesinterventionauto" ||`
- Diagnostic: Condition directe sur module.metadata.key dans du code générique.
- Action cible: Remonter vers metadata + moteur runtime générique.

#### src/runtime/firestore/FirestoreRuntimeMutation.ts:343

- Type: module-metadata-key-conditional
- Match: `module.metadata.key === "receptionsstockauto"`
- Code: `module.metadata.key === "receptionsstockauto"`
- Diagnostic: Condition directe sur module.metadata.key dans du code générique.
- Action cible: Remonter vers metadata + moteur runtime générique.

#### src/runtime/firestore/FirestoreRuntimeMutation.ts:424

- Type: module-metadata-key-conditional
- Match: `module.metadata.key === "lignesinterventionauto"`
- Code: `module.metadata.key === "lignesinterventionauto"`
- Diagnostic: Condition directe sur module.metadata.key dans du code générique.
- Action cible: Remonter vers metadata + moteur runtime générique.

#### src/runtime/firestore/FirestoreRuntimeMutation.ts:144

- Type: metadata-key-conditional
- Match: `metadata.key !== "lignesinterventionauto"`
- Code: `if (module.metadata.key !== "lignesinterventionauto") {`
- Diagnostic: Condition directe sur metadata.key.
- Action cible: Remonter vers metadata + moteur runtime générique.

#### src/runtime/firestore/FirestoreRuntimeMutation.ts:182

- Type: metadata-key-conditional
- Match: `metadata.key !== "lignesinterventionauto"`
- Code: `module.metadata.key !== "lignesinterventionauto" &&`
- Diagnostic: Condition directe sur metadata.key.
- Action cible: Remonter vers metadata + moteur runtime générique.

#### src/runtime/firestore/FirestoreRuntimeMutation.ts:183

- Type: metadata-key-conditional
- Match: `metadata.key !== "receptionsstockauto"`
- Code: `module.metadata.key !== "receptionsstockauto"`
- Diagnostic: Condition directe sur metadata.key.
- Action cible: Remonter vers metadata + moteur runtime générique.

#### src/runtime/firestore/FirestoreRuntimeMutation.ts:188

- Type: metadata-key-conditional
- Match: `metadata.key === "lignesinterventionauto"`
- Code: `if (module.metadata.key === "lignesinterventionauto") {`
- Diagnostic: Condition directe sur metadata.key.
- Action cible: Remonter vers metadata + moteur runtime générique.

#### src/runtime/firestore/FirestoreRuntimeMutation.ts:214

- Type: metadata-key-conditional
- Match: `metadata.key === "receptionsstockauto"`
- Code: `module.metadata.key === "receptionsstockauto"`
- Diagnostic: Condition directe sur metadata.key.
- Action cible: Remonter vers metadata + moteur runtime générique.

#### src/runtime/firestore/FirestoreRuntimeMutation.ts:342

- Type: metadata-key-conditional
- Match: `metadata.key === "lignesinterventionauto"`
- Code: `module.metadata.key === "lignesinterventionauto" ||`
- Diagnostic: Condition directe sur metadata.key.
- Action cible: Remonter vers metadata + moteur runtime générique.

#### src/runtime/firestore/FirestoreRuntimeMutation.ts:343

- Type: metadata-key-conditional
- Match: `metadata.key === "receptionsstockauto"`
- Code: `module.metadata.key === "receptionsstockauto"`
- Diagnostic: Condition directe sur metadata.key.
- Action cible: Remonter vers metadata + moteur runtime générique.

#### src/runtime/firestore/FirestoreRuntimeMutation.ts:424

- Type: metadata-key-conditional
- Match: `metadata.key === "lignesinterventionauto"`
- Code: `module.metadata.key === "lignesinterventionauto"`
- Diagnostic: Condition directe sur metadata.key.
- Action cible: Remonter vers metadata + moteur runtime générique.

### MEDIUM

#### src/components/amarkhys/dashboard/AmarkhysPremiumCockpit.tsx:64

- Type: hardcoded-business-module
- Match: `clientsauto`
- Code: `{ label: "Clients", href: "/clientsauto" },`
- Diagnostic: Nom de module métier codé en dur.
- Action cible: Vérifier si c’est une metadata, une route, ou une logique locale à généraliser.

#### src/components/amarkhys/dashboard/AmarkhysPremiumCockpit.tsx:65

- Type: hardcoded-business-module
- Match: `interventionsauto`
- Code: `{ label: "Interventions", href: "/interventionsauto" },`
- Diagnostic: Nom de module métier codé en dur.
- Action cible: Vérifier si c’est une metadata, une route, ou une logique locale à généraliser.

#### src/components/amarkhys/dashboard/AmarkhysPremiumCockpit.tsx:66

- Type: hardcoded-business-module
- Match: `facturesauto`
- Code: `{ label: "Factures", href: "/facturesauto" },`
- Diagnostic: Nom de module métier codé en dur.
- Action cible: Vérifier si c’est une metadata, une route, ou une logique locale à généraliser.

#### src/components/amarkhys/dashboard/AmarkhysPremiumCockpit.tsx:100

- Type: hardcoded-business-module
- Match: `vehicules`
- Code: `const vehicules =`
- Diagnostic: Nom de module métier codé en dur.
- Action cible: Vérifier si c’est une metadata, une route, ou une logique locale à généraliser.

#### src/components/amarkhys/dashboard/AmarkhysPremiumCockpit.tsx:101

- Type: hardcoded-business-module
- Match: `vehicules`
- Code: `findWidget(widgets, ["vehicules-actifs", "vehicules-total"]);`
- Diagnostic: Nom de module métier codé en dur.
- Action cible: Vérifier si c’est une metadata, une route, ou une logique locale à généraliser.

#### src/components/amarkhys/dashboard/AmarkhysPremiumCockpit.tsx:101

- Type: hardcoded-business-module
- Match: `vehicules`
- Code: `findWidget(widgets, ["vehicules-actifs", "vehicules-total"]);`
- Diagnostic: Nom de module métier codé en dur.
- Action cible: Vérifier si c’est une metadata, une route, ou une logique locale à généraliser.

#### src/components/amarkhys/dashboard/AmarkhysPremiumCockpit.tsx:121

- Type: hardcoded-business-module
- Match: `facturesauto`
- Code: `href: ca?.href ?? "/facturesauto",`
- Diagnostic: Nom de module métier codé en dur.
- Action cible: Vérifier si c’est une metadata, une route, ou une logique locale à généraliser.

#### src/components/amarkhys/dashboard/AmarkhysPremiumCockpit.tsx:127

- Type: hardcoded-business-module
- Match: `vehicules`
- Code: `value: formatValue(vehicules?.value),`
- Diagnostic: Nom de module métier codé en dur.
- Action cible: Vérifier si c’est une metadata, une route, ou une logique locale à généraliser.

#### src/components/amarkhys/dashboard/AmarkhysPremiumCockpit.tsx:128

- Type: hardcoded-business-module
- Match: `vehicules`
- Code: `href: vehicules?.href ?? "/vehicules",`
- Diagnostic: Nom de module métier codé en dur.
- Action cible: Vérifier si c’est une metadata, une route, ou une logique locale à généraliser.

#### src/components/amarkhys/dashboard/AmarkhysPremiumCockpit.tsx:128

- Type: hardcoded-business-module
- Match: `vehicules`
- Code: `href: vehicules?.href ?? "/vehicules",`
- Diagnostic: Nom de module métier codé en dur.
- Action cible: Vérifier si c’est une metadata, une route, ou une logique locale à généraliser.

#### src/components/amarkhys/dashboard/AmarkhysPremiumCockpit.tsx:130

- Type: hardcoded-business-module
- Match: `vehicules`
- Code: `subtitle: vehicules?.description ?? "Parc suivi",`
- Diagnostic: Nom de module métier codé en dur.
- Action cible: Vérifier si c’est une metadata, une route, ou une logique locale à généraliser.

#### src/components/amarkhys/dashboard/AmarkhysPremiumCockpit.tsx:135

- Type: hardcoded-business-module
- Match: `facturesauto`
- Code: `href: "/facturesauto",`
- Diagnostic: Nom de module métier codé en dur.
- Action cible: Vérifier si c’est une metadata, une route, ou une logique locale à généraliser.

#### src/components/amarkhys/dashboard/AmarkhysPremiumCockpit.tsx:357

- Type: hardcoded-business-module
- Match: `facturesauto`
- Code: `fallbackHref: "/facturesauto",`
- Diagnostic: Nom de module métier codé en dur.
- Action cible: Vérifier si c’est une metadata, une route, ou une logique locale à généraliser.

#### src/components/amarkhys/dashboard/AmarkhysPremiumCockpit.tsx:381

- Type: hardcoded-business-module
- Match: `interventionsauto`
- Code: `fallbackHref: "/interventionsauto",`
- Diagnostic: Nom de module métier codé en dur.
- Action cible: Vérifier si c’est une metadata, une route, ou une logique locale à généraliser.

#### src/components/amarkhys/dashboard/AmarkhysPremiumCockpit.tsx:963

- Type: hardcoded-business-module
- Match: `encaissementsauto`
- Code: `href="/encaissementsauto"`
- Diagnostic: Nom de module métier codé en dur.
- Action cible: Vérifier si c’est une metadata, une route, ou une logique locale à généraliser.

#### src/components/erp/billing/InvoiceDocumentActions.tsx:14

- Type: hardcoded-business-module
- Match: `clientsauto`
- Code: `} from "@/runtime/modules/generated/clientsauto";`
- Diagnostic: Nom de module métier codé en dur.
- Action cible: Vérifier si c’est une metadata, une route, ou une logique locale à généraliser.

#### src/components/erp/billing/InvoiceDocumentActions.tsx:18

- Type: hardcoded-business-module
- Match: `vehicules`
- Code: `} from "@/runtime/modules/generated/vehicules";`
- Diagnostic: Nom de module métier codé en dur.
- Action cible: Vérifier si c’est une metadata, une route, ou une logique locale à généraliser.

#### src/components/erp/billing/InvoiceDocumentActions.tsx:22

- Type: hardcoded-business-module
- Match: `interventionsauto`
- Code: `} from "@/runtime/modules/generated/interventionsauto";`
- Diagnostic: Nom de module métier codé en dur.
- Action cible: Vérifier si c’est une metadata, une route, ou une logique locale à généraliser.

#### src/components/erp/billing/InvoiceDocumentActions.tsx:630

- Type: hardcoded-business-module
- Match: `facturesauto`
- Code: `require("@/runtime/modules/generated/facturesauto/facturesauto.module").facturesautoModule,`
- Diagnostic: Nom de module métier codé en dur.
- Action cible: Vérifier si c’est une metadata, une route, ou une logique locale à généraliser.

#### src/components/erp/billing/InvoiceDocumentActions.tsx:630

- Type: hardcoded-business-module
- Match: `facturesauto`
- Code: `require("@/runtime/modules/generated/facturesauto/facturesauto.module").facturesautoModule,`
- Diagnostic: Nom de module métier codé en dur.
- Action cible: Vérifier si c’est une metadata, une route, ou une logique locale à généraliser.

#### src/components/erp/billing/InvoicePaymentSchedule.tsx:157

- Type: hardcoded-business-module
- Match: `facturesauto`
- Code: `"/facturesauto/" + factureId + "/edit"`
- Diagnostic: Nom de module métier codé en dur.
- Action cible: Vérifier si c’est une metadata, une route, ou une logique locale à généraliser.

#### src/components/erp/billing/InvoicePaymentsHistory.tsx:12

- Type: hardcoded-business-module
- Match: `encaissementsauto`
- Code: `} from "@/runtime/modules/generated/encaissementsauto";`
- Diagnostic: Nom de module métier codé en dur.
- Action cible: Vérifier si c’est une metadata, une route, ou une logique locale à généraliser.

#### src/components/erp/billing/InvoicePaymentsHistory.tsx:94

- Type: hardcoded-business-module
- Match: `facturesauto`
- Code: `return "/facturesauto/" + encodeURIComponent(factureId) + "/edit";`
- Diagnostic: Nom de module métier codé en dur.
- Action cible: Vérifier si c’est une metadata, une route, ou une logique locale à généraliser.

#### src/components/erp/billing/InvoicePaymentsHistory.tsx:118

- Type: hardcoded-business-module
- Match: `facturesauto`
- Code: `params.set("parentModuleKey", "facturesauto");`
- Diagnostic: Nom de module métier codé en dur.
- Action cible: Vérifier si c’est une metadata, une route, ou une logique locale à généraliser.

#### src/components/erp/billing/InvoicePaymentsHistory.tsx:134

- Type: hardcoded-business-module
- Match: `encaissementsauto`
- Code: `return "/encaissementsauto/nouveau?" + params.toString();`
- Diagnostic: Nom de module métier codé en dur.
- Action cible: Vérifier si c’est une metadata, une route, ou une logique locale à généraliser.

#### src/components/erp/billing/InvoicePaymentsHistory.tsx:151

- Type: hardcoded-business-module
- Match: `encaissementsauto`
- Code: `"/encaissementsauto/" +`
- Diagnostic: Nom de module métier codé en dur.
- Action cible: Vérifier si c’est une metadata, une route, ou une logique locale à généraliser.

#### src/components/erp/billing/PaymentReceiptActions.tsx:12

- Type: hardcoded-business-module
- Match: `facturesauto`
- Code: `} from "@/runtime/modules/generated/facturesauto";`
- Diagnostic: Nom de module métier codé en dur.
- Action cible: Vérifier si c’est une metadata, une route, ou une logique locale à généraliser.

#### src/components/erp/billing/PaymentReceiptActions.tsx:16

- Type: hardcoded-business-module
- Match: `clientsauto`
- Code: `} from "@/runtime/modules/generated/clientsauto";`
- Diagnostic: Nom de module métier codé en dur.
- Action cible: Vérifier si c’est une metadata, une route, ou une logique locale à généraliser.

#### src/components/erp/billing/PaymentReceiptActions.tsx:20

- Type: hardcoded-business-module
- Match: `vehicules`
- Code: `} from "@/runtime/modules/generated/vehicules";`
- Diagnostic: Nom de module métier codé en dur.
- Action cible: Vérifier si c’est une metadata, une route, ou une logique locale à généraliser.

#### src/components/erp/billing/PaymentReceiptActions.tsx:24

- Type: hardcoded-business-module
- Match: `encaissementsauto`
- Code: `} from "@/runtime/modules/generated/encaissementsauto";`
- Diagnostic: Nom de module métier codé en dur.
- Action cible: Vérifier si c’est une metadata, une route, ou une logique locale à généraliser.

#### src/components/erp/forms/enterprise/ERPEnterpriseForm.tsx:206

- Type: hardcoded-business-module
- Match: `facturesauto`
- Code: `"/facturesauto/" + factureId + "/edit"`
- Diagnostic: Nom de module métier codé en dur.
- Action cible: Vérifier si c’est une metadata, une route, ou une logique locale à généraliser.

#### src/components/erp/forms/enterprise/ERPEnterpriseForm.tsx:214

- Type: hardcoded-business-module
- Match: `encaissementsauto`
- Code: `return "/encaissementsauto/nouveau?" + params.toString();`
- Diagnostic: Nom de module métier codé en dur.
- Action cible: Vérifier si c’est une metadata, une route, ou une logique locale à généraliser.

#### src/components/erp/forms/enterprise/ERPEnterpriseForm.tsx:230

- Type: hardcoded-business-module
- Match: `lignesinterventionauto`
- Code: `(item) => item.metadata.key === "lignesinterventionauto"`
- Diagnostic: Nom de module métier codé en dur.
- Action cible: Vérifier si c’est une metadata, une route, ou une logique locale à généraliser.

#### src/components/erp/forms/enterprise/ERPEnterpriseForm.tsx:235

- Type: hardcoded-business-module
- Match: `interventionsauto`
- Code: `(item) => item.metadata.key === "interventionsauto"`
- Diagnostic: Nom de module métier codé en dur.
- Action cible: Vérifier si c’est une metadata, une route, ou une logique locale à généraliser.

#### src/components/erp/forms/enterprise/ERPEnterpriseForm.tsx:416

- Type: hardcoded-business-module
- Match: `receptionsstockauto`
- Code: `module.metadata.key === "receptionsstockauto" &&`
- Diagnostic: Nom de module métier codé en dur.
- Action cible: Vérifier si c’est une metadata, une route, ou une logique locale à généraliser.

#### src/components/erp/forms/enterprise/ERPEnterpriseForm.tsx:636

- Type: hardcoded-business-module
- Match: `facturesauto`
- Code: `module.metadata.key === "facturesauto" &&`
- Diagnostic: Nom de module métier codé en dur.
- Action cible: Vérifier si c’est une metadata, une route, ou une logique locale à généraliser.

#### src/components/erp/forms/enterprise/ERPEnterpriseForm.tsx:774

- Type: hardcoded-business-module
- Match: `lignesinterventionauto`
- Code: `if (module.metadata.key !== "lignesinterventionauto") {`
- Diagnostic: Nom de module métier codé en dur.
- Action cible: Vérifier si c’est une metadata, une route, ou une logique locale à généraliser.

#### src/components/erp/forms/enterprise/ERPEnterpriseForm.tsx:867

- Type: hardcoded-business-module
- Match: `lignesinterventionauto`
- Code: `module.metadata.key === "lignesinterventionauto" &&`
- Diagnostic: Nom de module métier codé en dur.
- Action cible: Vérifier si c’est une metadata, une route, ou une logique locale à généraliser.

#### src/components/erp/forms/enterprise/ERPEnterpriseForm.tsx:1251

- Type: hardcoded-business-module
- Match: `lignesinterventionauto`
- Code: `if (module.metadata.key === "lignesinterventionauto") {`
- Diagnostic: Nom de module métier codé en dur.
- Action cible: Vérifier si c’est une metadata, une route, ou une logique locale à généraliser.

#### src/components/erp/forms/enterprise/ERPEnterpriseForm.tsx:1387

- Type: hardcoded-business-module
- Match: `receptionsstockauto`
- Code: `if (moduleKey === "receptionsstockauto" && currentStatus === "brouillon") {`
- Diagnostic: Nom de module métier codé en dur.
- Action cible: Vérifier si c’est une metadata, une route, ou une logique locale à généraliser.

#### src/components/erp/forms/enterprise/ERPEnterpriseForm.tsx:1397

- Type: hardcoded-business-module
- Match: `clientsauto`
- Code: `if (moduleKey === "clientsauto" && currentStatus !== "archive") {`
- Diagnostic: Nom de module métier codé en dur.
- Action cible: Vérifier si c’est une metadata, une route, ou une logique locale à généraliser.

#### src/components/erp/forms/enterprise/ERPEnterpriseForm.tsx:1406

- Type: hardcoded-business-module
- Match: `vehicules`
- Code: `if (moduleKey === "vehicules" && currentStatus !== "archive") {`
- Diagnostic: Nom de module métier codé en dur.
- Action cible: Vérifier si c’est une metadata, une route, ou une logique locale à généraliser.

#### src/components/erp/forms/enterprise/ERPEnterpriseForm.tsx:1419

- Type: hardcoded-business-module
- Match: `facturesauto`
- Code: `moduleKey === "facturesauto" &&`
- Diagnostic: Nom de module métier codé en dur.
- Action cible: Vérifier si c’est une metadata, une route, ou une logique locale à généraliser.

#### src/components/erp/forms/enterprise/ERPEnterpriseForm.tsx:1431

- Type: hardcoded-business-module
- Match: `encaissementsauto`
- Code: `if (moduleKey === "encaissementsauto" && currentStatus !== "annule") {`
- Diagnostic: Nom de module métier codé en dur.
- Action cible: Vérifier si c’est une metadata, une route, ou une logique locale à généraliser.

#### src/components/erp/forms/enterprise/ERPEnterpriseForm.tsx:1504

- Type: hardcoded-business-module
- Match: `clientsauto`
- Code: `"clientsauto",`
- Diagnostic: Nom de module métier codé en dur.
- Action cible: Vérifier si c’est une metadata, une route, ou une logique locale à généraliser.

#### src/components/erp/forms/enterprise/ERPEnterpriseForm.tsx:1505

- Type: hardcoded-business-module
- Match: `vehicules`
- Code: `"vehicules",`
- Diagnostic: Nom de module métier codé en dur.
- Action cible: Vérifier si c’est une metadata, une route, ou une logique locale à généraliser.

#### src/components/erp/forms/enterprise/ERPEnterpriseForm.tsx:1506

- Type: hardcoded-business-module
- Match: `facturesauto`
- Code: `"facturesauto",`
- Diagnostic: Nom de module métier codé en dur.
- Action cible: Vérifier si c’est une metadata, une route, ou une logique locale à généraliser.

#### src/components/erp/forms/enterprise/ERPEnterpriseForm.tsx:1507

- Type: hardcoded-business-module
- Match: `encaissementsauto`
- Code: `"encaissementsauto",`
- Diagnostic: Nom de module métier codé en dur.
- Action cible: Vérifier si c’est une metadata, une route, ou une logique locale à généraliser.

#### src/components/erp/forms/enterprise/ERPEnterpriseForm.tsx:1509

- Type: hardcoded-business-module
- Match: `lignesinterventionauto`
- Code: `"lignesinterventionauto",`
- Diagnostic: Nom de module métier codé en dur.
- Action cible: Vérifier si c’est une metadata, une route, ou une logique locale à généraliser.

#### src/components/erp/forms/enterprise/ERPEnterpriseForm.tsx:1510

- Type: hardcoded-business-module
- Match: `receptionsstockauto`
- Code: `"receptionsstockauto",`
- Diagnostic: Nom de module métier codé en dur.
- Action cible: Vérifier si c’est une metadata, une route, ou une logique locale à généraliser.

#### src/components/erp/relations/ClientVehiclesReadonlyCard.tsx:12

- Type: hardcoded-business-module
- Match: `vehicules`
- Code: `} from "@/runtime/modules/generated/vehicules";`
- Diagnostic: Nom de module métier codé en dur.
- Action cible: Vérifier si c’est une metadata, une route, ou une logique locale à généraliser.

#### src/components/erp/relations/ClientVehiclesReadonlyCard.tsx:178

- Type: hardcoded-business-module
- Match: `vehicules`
- Code: `pathname: '/vehicules/${id}/edit',`
- Diagnostic: Nom de module métier codé en dur.
- Action cible: Vérifier si c’est une metadata, une route, ou une logique locale à généraliser.

#### src/components/erp/relations/ClientVehiclesReadonlyCard.tsx:180

- Type: hardcoded-business-module
- Match: `clientsauto`
- Code: `returnTo: '/clientsauto/${clientId}/edit',`
- Diagnostic: Nom de module métier codé en dur.
- Action cible: Vérifier si c’est une metadata, une route, ou une logique locale à généraliser.

#### src/components/erp/runtime/ERPRelatedRecordsPanel.tsx:169

- Type: hardcoded-business-module
- Match: `encaissementsauto`
- Code: `if (childModuleKey === "encaissementsauto") {`
- Diagnostic: Nom de module métier codé en dur.
- Action cible: Vérifier si c’est une metadata, une route, ou une logique locale à généraliser.

#### src/components/erp/runtime/ERPRelatedRecordsPanel.tsx:207

- Type: hardcoded-business-module
- Match: `interventionsauto`
- Code: `if (childModuleKey === "interventionsauto") {`
- Diagnostic: Nom de module métier codé en dur.
- Action cible: Vérifier si c’est une metadata, une route, ou une logique locale à généraliser.

#### src/components/erp/runtime/ERPRelatedRecordsPanel.tsx:216

- Type: hardcoded-business-module
- Match: `lignesinterventionauto`
- Code: `if (childModuleKey === "lignesinterventionauto") {`
- Diagnostic: Nom de module métier codé en dur.
- Action cible: Vérifier si c’est une metadata, une route, ou une logique locale à généraliser.

#### src/components/erp/runtime/ERPRuntimeDetails.tsx:96

- Type: hardcoded-business-module
- Match: `facturesauto`
- Code: `"/facturesauto/" + factureId`
- Diagnostic: Nom de module métier codé en dur.
- Action cible: Vérifier si c’est une metadata, une route, ou une logique locale à généraliser.

#### src/components/erp/runtime/ERPRuntimeDetails.tsx:104

- Type: hardcoded-business-module
- Match: `encaissementsauto`
- Code: `return "/encaissementsauto/nouveau?" + params.toString();`
- Diagnostic: Nom de module métier codé en dur.
- Action cible: Vérifier si c’est une metadata, une route, ou une logique locale à généraliser.

#### src/components/erp/runtime/ERPRuntimeDetails.tsx:155

- Type: hardcoded-business-module
- Match: `facturesauto`
- Code: `module.metadata.key === "facturesauto" &&`
- Diagnostic: Nom de module métier codé en dur.
- Action cible: Vérifier si c’est une metadata, une route, ou une logique locale à généraliser.

#### src/components/erp/runtime/ERPRuntimePage.tsx:88

- Type: hardcoded-business-module
- Match: `facturesauto`
- Code: `"/facturesauto/" + factureId`
- Diagnostic: Nom de module métier codé en dur.
- Action cible: Vérifier si c’est une metadata, une route, ou une logique locale à généraliser.

#### src/components/erp/runtime/ERPRuntimePage.tsx:96

- Type: hardcoded-business-module
- Match: `encaissementsauto`
- Code: `return "/encaissementsauto/nouveau?" + params.toString();`
- Diagnostic: Nom de module métier codé en dur.
- Action cible: Vérifier si c’est une metadata, une route, ou une logique locale à généraliser.

#### src/components/erp/runtime/ERPRuntimePage.tsx:211

- Type: hardcoded-business-module
- Match: `facturesauto`
- Code: `module?.metadata?.key === "facturesauto" &&`
- Diagnostic: Nom de module métier codé en dur.
- Action cible: Vérifier si c’est une metadata, une route, ou une logique locale à généraliser.

#### src/components/erp/shell/ErpSidebar.tsx:38

- Type: hardcoded-business-module
- Match: `clientsauto`
- Code: `key: "clientsauto",`
- Diagnostic: Nom de module métier codé en dur.
- Action cible: Vérifier si c’est une metadata, une route, ou une logique locale à généraliser.

#### src/components/erp/shell/ErpSidebar.tsx:40

- Type: hardcoded-business-module
- Match: `clientsauto`
- Code: `href: "/clientsauto",`
- Diagnostic: Nom de module métier codé en dur.
- Action cible: Vérifier si c’est une metadata, une route, ou une logique locale à généraliser.

#### src/components/erp/shell/ErpSidebar.tsx:43

- Type: hardcoded-business-module
- Match: `vehicules`
- Code: `key: "vehicules",`
- Diagnostic: Nom de module métier codé en dur.
- Action cible: Vérifier si c’est une metadata, une route, ou une logique locale à généraliser.

#### src/components/erp/shell/ErpSidebar.tsx:45

- Type: hardcoded-business-module
- Match: `vehicules`
- Code: `href: "/vehicules",`
- Diagnostic: Nom de module métier codé en dur.
- Action cible: Vérifier si c’est une metadata, une route, ou une logique locale à généraliser.

#### src/components/erp/shell/ErpSidebar.tsx:53

- Type: hardcoded-business-module
- Match: `interventionsauto`
- Code: `key: "interventionsauto",`
- Diagnostic: Nom de module métier codé en dur.
- Action cible: Vérifier si c’est une metadata, une route, ou une logique locale à généraliser.

#### src/components/erp/shell/ErpSidebar.tsx:55

- Type: hardcoded-business-module
- Match: `interventionsauto`
- Code: `href: "/interventionsauto",`
- Diagnostic: Nom de module métier codé en dur.
- Action cible: Vérifier si c’est une metadata, une route, ou une logique locale à généraliser.

#### src/components/erp/shell/ErpSidebar.tsx:58

- Type: hardcoded-business-module
- Match: `facturesauto`
- Code: `key: "facturesauto",`
- Diagnostic: Nom de module métier codé en dur.
- Action cible: Vérifier si c’est une metadata, une route, ou une logique locale à généraliser.

#### src/components/erp/shell/ErpSidebar.tsx:60

- Type: hardcoded-business-module
- Match: `facturesauto`
- Code: `href: "/facturesauto",`
- Diagnostic: Nom de module métier codé en dur.
- Action cible: Vérifier si c’est une metadata, une route, ou une logique locale à généraliser.

#### src/components/erp/shell/ErpSidebar.tsx:78

- Type: hardcoded-business-module
- Match: `mouvementsstockauto`
- Code: `key: "mouvementsstockauto",`
- Diagnostic: Nom de module métier codé en dur.
- Action cible: Vérifier si c’est une metadata, une route, ou une logique locale à généraliser.

#### src/components/erp/shell/ErpSidebar.tsx:80

- Type: hardcoded-business-module
- Match: `mouvementsstockauto`
- Code: `href: "/mouvementsstockauto",`
- Diagnostic: Nom de module métier codé en dur.
- Action cible: Vérifier si c’est une metadata, une route, ou une logique locale à généraliser.

#### src/components/erp/shell/ErpSidebar.tsx:88

- Type: hardcoded-business-module
- Match: `commandesstockauto`
- Code: `key: "commandesstockauto",`
- Diagnostic: Nom de module métier codé en dur.
- Action cible: Vérifier si c’est une metadata, une route, ou une logique locale à généraliser.

#### src/components/erp/shell/ErpSidebar.tsx:90

- Type: hardcoded-business-module
- Match: `commandesstockauto`
- Code: `href: "/commandesstockauto",`
- Diagnostic: Nom de module métier codé en dur.
- Action cible: Vérifier si c’est une metadata, une route, ou une logique locale à généraliser.

#### src/components/erp/shell/ErpSidebar.tsx:93

- Type: hardcoded-business-module
- Match: `receptionsstockauto`
- Code: `key: "receptionsstockauto",`
- Diagnostic: Nom de module métier codé en dur.
- Action cible: Vérifier si c’est une metadata, une route, ou une logique locale à généraliser.

#### src/components/erp/shell/ErpSidebar.tsx:95

- Type: hardcoded-business-module
- Match: `receptionsstockauto`
- Code: `href: "/receptionsstockauto",`
- Diagnostic: Nom de module métier codé en dur.
- Action cible: Vérifier si c’est une metadata, une route, ou une logique locale à généraliser.

#### src/components/erp/shell/ErpSidebar.tsx:112

- Type: hardcoded-business-module
- Match: `clientsauto`
- Code: `pathname === "/clientsauto" ||`
- Diagnostic: Nom de module métier codé en dur.
- Action cible: Vérifier si c’est une metadata, une route, ou une logique locale à généraliser.

#### src/components/erp/shell/ErpSidebar.tsx:113

- Type: hardcoded-business-module
- Match: `clientsauto`
- Code: `pathname.startsWith("/clientsauto/") ||`
- Diagnostic: Nom de module métier codé en dur.
- Action cible: Vérifier si c’est une metadata, une route, ou une logique locale à généraliser.

#### src/components/erp/shell/ErpSidebar.tsx:114

- Type: hardcoded-business-module
- Match: `vehicules`
- Code: `pathname === "/vehicules" ||`
- Diagnostic: Nom de module métier codé en dur.
- Action cible: Vérifier si c’est une metadata, une route, ou une logique locale à généraliser.

#### src/components/erp/shell/ErpSidebar.tsx:115

- Type: hardcoded-business-module
- Match: `vehicules`
- Code: `pathname.startsWith("/vehicules/") ||`
- Diagnostic: Nom de module métier codé en dur.
- Action cible: Vérifier si c’est une metadata, une route, ou une logique locale à généraliser.

#### src/components/erp/shell/ErpSidebar.tsx:118

- Type: hardcoded-business-module
- Match: `interventionsauto`
- Code: `pathname === "/interventionsauto" ||`
- Diagnostic: Nom de module métier codé en dur.
- Action cible: Vérifier si c’est une metadata, une route, ou une logique locale à généraliser.

#### src/components/erp/shell/ErpSidebar.tsx:119

- Type: hardcoded-business-module
- Match: `interventionsauto`
- Code: `pathname.startsWith("/interventionsauto/") ||`
- Diagnostic: Nom de module métier codé en dur.
- Action cible: Vérifier si c’est une metadata, une route, ou une logique locale à généraliser.

#### src/components/erp/shell/ErpSidebar.tsx:120

- Type: hardcoded-business-module
- Match: `facturesauto`
- Code: `pathname === "/facturesauto" ||`
- Diagnostic: Nom de module métier codé en dur.
- Action cible: Vérifier si c’est une metadata, une route, ou une logique locale à généraliser.

#### src/components/erp/shell/ErpSidebar.tsx:121

- Type: hardcoded-business-module
- Match: `facturesauto`
- Code: `pathname.startsWith("/facturesauto/") ||`
- Diagnostic: Nom de module métier codé en dur.
- Action cible: Vérifier si c’est une metadata, une route, ou une logique locale à généraliser.

#### src/components/erp/shell/ErpSidebar.tsx:128

- Type: hardcoded-business-module
- Match: `mouvementsstockauto`
- Code: `pathname === "/mouvementsstockauto" ||`
- Diagnostic: Nom de module métier codé en dur.
- Action cible: Vérifier si c’est une metadata, une route, ou une logique locale à généraliser.

#### src/components/erp/shell/ErpSidebar.tsx:129

- Type: hardcoded-business-module
- Match: `mouvementsstockauto`
- Code: `pathname.startsWith("/mouvementsstockauto/") ||`
- Diagnostic: Nom de module métier codé en dur.
- Action cible: Vérifier si c’est une metadata, une route, ou une logique locale à généraliser.

#### src/components/erp/shell/ErpSidebar.tsx:132

- Type: hardcoded-business-module
- Match: `commandesstockauto`
- Code: `pathname === "/commandesstockauto" ||`
- Diagnostic: Nom de module métier codé en dur.
- Action cible: Vérifier si c’est une metadata, une route, ou une logique locale à généraliser.

#### src/components/erp/shell/ErpSidebar.tsx:133

- Type: hardcoded-business-module
- Match: `commandesstockauto`
- Code: `pathname.startsWith("/commandesstockauto/") ||`
- Diagnostic: Nom de module métier codé en dur.
- Action cible: Vérifier si c’est une metadata, une route, ou une logique locale à généraliser.

#### src/components/erp/shell/ErpSidebar.tsx:134

- Type: hardcoded-business-module
- Match: `lignescommandestockauto`
- Code: `pathname === "/lignescommandestockauto" ||`
- Diagnostic: Nom de module métier codé en dur.
- Action cible: Vérifier si c’est une metadata, une route, ou une logique locale à généraliser.

#### src/components/erp/shell/ErpSidebar.tsx:135

- Type: hardcoded-business-module
- Match: `lignescommandestockauto`
- Code: `pathname.startsWith("/lignescommandestockauto/") ||`
- Diagnostic: Nom de module métier codé en dur.
- Action cible: Vérifier si c’est une metadata, une route, ou une logique locale à généraliser.

#### src/components/erp/shell/ErpSidebar.tsx:136

- Type: hardcoded-business-module
- Match: `receptionsstockauto`
- Code: `pathname === "/receptionsstockauto" ||`
- Diagnostic: Nom de module métier codé en dur.
- Action cible: Vérifier si c’est une metadata, une route, ou une logique locale à généraliser.

#### src/components/erp/shell/ErpSidebar.tsx:137

- Type: hardcoded-business-module
- Match: `receptionsstockauto`
- Code: `pathname.startsWith("/receptionsstockauto/")`
- Diagnostic: Nom de module métier codé en dur.
- Action cible: Vérifier si c’est une metadata, une route, ou une logique locale à généraliser.

#### src/components/public/PublicAppointmentService.ts:11

- Type: hardcoded-business-module
- Match: `clientsauto`
- Code: `} from "@/runtime/modules/generated/clientsauto/clientsauto.module";`
- Diagnostic: Nom de module métier codé en dur.
- Action cible: Vérifier si c’est une metadata, une route, ou une logique locale à généraliser.

#### src/components/public/PublicAppointmentService.ts:11

- Type: hardcoded-business-module
- Match: `clientsauto`
- Code: `} from "@/runtime/modules/generated/clientsauto/clientsauto.module";`
- Diagnostic: Nom de module métier codé en dur.
- Action cible: Vérifier si c’est une metadata, une route, ou une logique locale à généraliser.

#### src/components/public/PublicAppointmentService.ts:15

- Type: hardcoded-business-module
- Match: `vehicules`
- Code: `} from "@/runtime/modules/generated/vehicules/vehicules.module";`
- Diagnostic: Nom de module métier codé en dur.
- Action cible: Vérifier si c’est une metadata, une route, ou une logique locale à généraliser.

#### src/components/public/PublicAppointmentService.ts:15

- Type: hardcoded-business-module
- Match: `vehicules`
- Code: `} from "@/runtime/modules/generated/vehicules/vehicules.module";`
- Diagnostic: Nom de module métier codé en dur.
- Action cible: Vérifier si c’est une metadata, une route, ou une logique locale à généraliser.

#### src/runtime/actions/RuntimeActionEngine.ts:145

- Type: hardcoded-business-module
- Match: `lignesinterventionauto`
- Code: `module?.metadata?.key === "lignesinterventionauto" &&`
- Diagnostic: Nom de module métier codé en dur.
- Action cible: Vérifier si c’est une metadata, une route, ou une logique locale à généraliser.

#### src/runtime/ai/anomalies/ERPAIAnomalyDetector.ts:69

- Type: hardcoded-business-module
- Match: `facturesauto`
- Code: `module: "facturesauto",`
- Diagnostic: Nom de module métier codé en dur.
- Action cible: Acceptable seulement si c’est dans un moteur runtime générique ou une règle documentée.

#### src/runtime/ai/anomalies/ERPAIAnomalyDetector.ts:83

- Type: hardcoded-business-module
- Match: `interventionsauto`
- Code: `module: "interventionsauto",`
- Diagnostic: Nom de module métier codé en dur.
- Action cible: Acceptable seulement si c’est dans un moteur runtime générique ou une règle documentée.

#### src/runtime/ai/anomalies/ERPAIAnomalyDetector.ts:98

- Type: hardcoded-business-module
- Match: `facturesauto`
- Code: `module: "facturesauto",`
- Diagnostic: Nom de module métier codé en dur.
- Action cible: Acceptable seulement si c’est dans un moteur runtime générique ou une règle documentée.

#### src/runtime/business-rules/runtimeBusinessRules.ts:132

- Type: hardcoded-business-module
- Match: `interventionsauto`
- Code: `"interventionsauto",`
- Diagnostic: Nom de module métier codé en dur.
- Action cible: Vérifier si c’est une metadata, une route, ou une logique locale à généraliser.

#### src/runtime/business-rules/runtimeBusinessRules.ts:135

- Type: hardcoded-business-module
- Match: `interventionsauto`
- Code: `"interventionsauto.created",`
- Diagnostic: Nom de module métier codé en dur.
- Action cible: Vérifier si c’est une metadata, une route, ou une logique locale à généraliser.

#### src/runtime/business-rules/runtimeBusinessRules.ts:237

- Type: hardcoded-business-module
- Match: `facturesauto`
- Code: `"facturesauto",`
- Diagnostic: Nom de module métier codé en dur.
- Action cible: Vérifier si c’est une metadata, une route, ou une logique locale à généraliser.

#### src/runtime/business-rules/runtimeBusinessRules.ts:250

- Type: hardcoded-business-module
- Match: `interventionsauto`
- Code: `"interventionsauto",`
- Diagnostic: Nom de module métier codé en dur.
- Action cible: Vérifier si c’est une metadata, une route, ou une logique locale à généraliser.

#### src/runtime/business-rules/runtimeBusinessRules.ts:302

- Type: hardcoded-business-module
- Match: `interventionsauto`
- Code: `"interventionsauto"`
- Diagnostic: Nom de module métier codé en dur.
- Action cible: Vérifier si c’est une metadata, une route, ou une logique locale à généraliser.

#### src/runtime/business-rules/runtimeBusinessRules.ts:352

- Type: hardcoded-business-module
- Match: `interventionsauto`
- Code: `"interventionsauto",`
- Diagnostic: Nom de module métier codé en dur.
- Action cible: Vérifier si c’est une metadata, une route, ou une logique locale à généraliser.

#### src/runtime/business-rules/runtimeBusinessRules.ts:428

- Type: hardcoded-business-module
- Match: `interventionsauto`
- Code: `"interventionsauto",`
- Diagnostic: Nom de module métier codé en dur.
- Action cible: Vérifier si c’est une metadata, une route, ou une logique locale à généraliser.

#### src/runtime/business-rules/runtimeBusinessRules.ts:465

- Type: hardcoded-business-module
- Match: `interventionsauto`
- Code: `"interventionsauto"`
- Diagnostic: Nom de module métier codé en dur.
- Action cible: Vérifier si c’est une metadata, une route, ou une logique locale à généraliser.

#### src/runtime/business-rules/runtimeBusinessRules.ts:515

- Type: hardcoded-business-module
- Match: `interventionsauto`
- Code: `"interventionsauto",`
- Diagnostic: Nom de module métier codé en dur.
- Action cible: Vérifier si c’est une metadata, une route, ou une logique locale à généraliser.

#### src/runtime/business-rules/runtimeBusinessRules.ts:591

- Type: hardcoded-business-module
- Match: `interventionsauto`
- Code: `"interventionsauto",`
- Diagnostic: Nom de module métier codé en dur.
- Action cible: Vérifier si c’est une metadata, une route, ou une logique locale à généraliser.

#### src/runtime/business-rules/runtimeBusinessRules.ts:616

- Type: hardcoded-business-module
- Match: `interventionsauto`
- Code: `"interventionsauto",`
- Diagnostic: Nom de module métier codé en dur.
- Action cible: Vérifier si c’est une metadata, une route, ou une logique locale à généraliser.

#### src/runtime/business-rules/runtimeBusinessRules.ts:619

- Type: hardcoded-business-module
- Match: `interventionsauto`
- Code: `"interventionsauto.updated",`
- Diagnostic: Nom de module métier codé en dur.
- Action cible: Vérifier si c’est une metadata, une route, ou une logique locale à généraliser.

#### src/runtime/business-rules/runtimeBusinessRules.ts:637

- Type: hardcoded-business-module
- Match: `facturesauto`
- Code: `"facturesauto"`
- Diagnostic: Nom de module métier codé en dur.
- Action cible: Vérifier si c’est une metadata, une route, ou une logique locale à généraliser.

#### src/runtime/business-rules/runtimeBusinessRules.ts:652

- Type: hardcoded-business-module
- Match: `interventionsauto`
- Code: `"interventionsauto"`
- Diagnostic: Nom de module métier codé en dur.
- Action cible: Vérifier si c’est une metadata, une route, ou une logique locale à généraliser.

#### src/runtime/business-rules/runtimeBusinessRules.ts:855

- Type: hardcoded-business-module
- Match: `interventionsauto`
- Code: `"interventionsauto",`
- Diagnostic: Nom de module métier codé en dur.
- Action cible: Vérifier si c’est une metadata, une route, ou une logique locale à généraliser.

#### src/runtime/business-rules/runtimeBusinessRules.ts:869

- Type: hardcoded-business-module
- Match: `facturesauto`
- Code: `"facturesauto",`
- Diagnostic: Nom de module métier codé en dur.
- Action cible: Vérifier si c’est une metadata, une route, ou une logique locale à généraliser.

#### src/runtime/business-rules/runtimeBusinessRules.ts:897

- Type: hardcoded-business-module
- Match: `facturesauto`
- Code: `"facturesauto",`
- Diagnostic: Nom de module métier codé en dur.
- Action cible: Vérifier si c’est une metadata, une route, ou une logique locale à généraliser.

#### src/runtime/business-rules/runtimeBusinessRules.ts:900

- Type: hardcoded-business-module
- Match: `facturesauto`
- Code: `"facturesauto.updated",`
- Diagnostic: Nom de module métier codé en dur.
- Action cible: Vérifier si c’est une metadata, une route, ou une logique locale à généraliser.

#### src/runtime/business-rules/runtimeBusinessRules.ts:925

- Type: hardcoded-business-module
- Match: `facturesauto`
- Code: `"facturesauto",`
- Diagnostic: Nom de module métier codé en dur.
- Action cible: Vérifier si c’est une metadata, une route, ou une logique locale à généraliser.

#### src/runtime/business-rules/runtimeBusinessRules.ts:948

- Type: hardcoded-business-module
- Match: `facturesauto`
- Code: `"facturesauto",`
- Diagnostic: Nom de module métier codé en dur.
- Action cible: Vérifier si c’est une metadata, une route, ou une logique locale à généraliser.

#### src/runtime/business-rules/runtimeBusinessRules.ts:965

- Type: hardcoded-business-module
- Match: `facturesauto`
- Code: `"facturesauto",`
- Diagnostic: Nom de module métier codé en dur.
- Action cible: Vérifier si c’est une metadata, une route, ou une logique locale à généraliser.

#### src/runtime/business-rules/runtimeBusinessRules.ts:993

- Type: hardcoded-business-module
- Match: `encaissementsauto`
- Code: `"encaissementsauto",`
- Diagnostic: Nom de module métier codé en dur.
- Action cible: Vérifier si c’est une metadata, une route, ou une logique locale à généraliser.

#### src/runtime/business-rules/runtimeBusinessRules.ts:996

- Type: hardcoded-business-module
- Match: `encaissementsauto`
- Code: `"encaissementsauto.created",`
- Diagnostic: Nom de module métier codé en dur.
- Action cible: Vérifier si c’est une metadata, une route, ou une logique locale à généraliser.

#### src/runtime/business-rules/runtimeBusinessRules.ts:1010

- Type: hardcoded-business-module
- Match: `facturesauto`
- Code: `"facturesauto"`
- Diagnostic: Nom de module métier codé en dur.
- Action cible: Vérifier si c’est une metadata, une route, ou une logique locale à généraliser.

#### src/runtime/business-rules/runtimeBusinessRules.ts:1017

- Type: hardcoded-business-module
- Match: `encaissementsauto`
- Code: `"encaissementsauto"`
- Diagnostic: Nom de module métier codé en dur.
- Action cible: Vérifier si c’est une metadata, une route, ou une logique locale à généraliser.

#### src/runtime/business-rules/runtimeBusinessRules.ts:1024

- Type: hardcoded-business-module
- Match: `interventionsauto`
- Code: `"interventionsauto"`
- Diagnostic: Nom de module métier codé en dur.
- Action cible: Vérifier si c’est une metadata, une route, ou une logique locale à généraliser.

#### src/runtime/business-rules/runtimeBusinessRules.ts:1218

- Type: hardcoded-business-module
- Match: `facturesauto`
- Code: `"facturesauto",`
- Diagnostic: Nom de module métier codé en dur.
- Action cible: Vérifier si c’est une metadata, une route, ou une logique locale à généraliser.

#### src/runtime/business-rules/runtimeBusinessRules.ts:1242

- Type: hardcoded-business-module
- Match: `encaissementsauto`
- Code: `"encaissementsauto",`
- Diagnostic: Nom de module métier codé en dur.
- Action cible: Vérifier si c’est une metadata, une route, ou une logique locale à généraliser.

#### src/runtime/business-rules/runtimeBusinessRules.ts:1245

- Type: hardcoded-business-module
- Match: `encaissementsauto`
- Code: `"encaissementsauto.updated",`
- Diagnostic: Nom de module métier codé en dur.
- Action cible: Vérifier si c’est une metadata, une route, ou une logique locale à généraliser.

#### src/runtime/business-rules/runtimeBusinessRules.ts:1259

- Type: hardcoded-business-module
- Match: `facturesauto`
- Code: `"facturesauto"`
- Diagnostic: Nom de module métier codé en dur.
- Action cible: Vérifier si c’est une metadata, une route, ou une logique locale à généraliser.

#### src/runtime/business-rules/runtimeBusinessRules.ts:1266

- Type: hardcoded-business-module
- Match: `encaissementsauto`
- Code: `"encaissementsauto"`
- Diagnostic: Nom de module métier codé en dur.
- Action cible: Vérifier si c’est une metadata, une route, ou une logique locale à généraliser.

#### src/runtime/business-rules/runtimeBusinessRules.ts:1273

- Type: hardcoded-business-module
- Match: `interventionsauto`
- Code: `"interventionsauto"`
- Diagnostic: Nom de module métier codé en dur.
- Action cible: Vérifier si c’est une metadata, une route, ou une logique locale à généraliser.

#### src/runtime/business-rules/runtimeBusinessRules.ts:1467

- Type: hardcoded-business-module
- Match: `facturesauto`
- Code: `"facturesauto",`
- Diagnostic: Nom de module métier codé en dur.
- Action cible: Vérifier si c’est une metadata, une route, ou une logique locale à généraliser.

#### src/runtime/business/contrats/attachContratToTerrain.ts:27

- Type: module-metadata-key-conditional
- Match: `module.metadata.key ===
        "terrains"`
- Code: `module.metadata.key ===`
- Diagnostic: Condition directe sur module.metadata.key dans du code générique.
- Action cible: Acceptable seulement si c’est dans un moteur runtime générique ou une règle documentée.

#### src/runtime/business/contrats/attachContratToTerrain.ts:27

- Type: metadata-key-conditional
- Match: `metadata.key ===
        "terrains"`
- Code: `module.metadata.key ===`
- Diagnostic: Condition directe sur metadata.key.
- Action cible: Acceptable seulement si c’est dans un moteur runtime générique ou une règle documentée.

#### src/runtime/business/exploitations/recomputeTerrainSurfaceDisponible.ts:22

- Type: metadata-key-conditional
- Match: `metadata.key ===
        "terrains"`
- Code: `m.metadata.key ===`
- Diagnostic: Condition directe sur metadata.key.
- Action cible: Acceptable seulement si c’est dans un moteur runtime générique ou une règle documentée.

#### src/runtime/business/exploitations/recomputeTerrainSurfaceDisponible.ts:29

- Type: metadata-key-conditional
- Match: `metadata.key ===
        "exploitations"`
- Code: `m.metadata.key ===`
- Diagnostic: Condition directe sur metadata.key.
- Action cible: Acceptable seulement si c’est dans un moteur runtime générique ou une règle documentée.

#### src/runtime/business/terrains/recalculateTerrainSurfaceDisponible.ts:9

- Type: metadata-key-conditional
- Match: `metadata.key === "terrains"`
- Code: `m => m.metadata.key === "terrains"`
- Diagnostic: Condition directe sur metadata.key.
- Action cible: Acceptable seulement si c’est dans un moteur runtime générique ou une règle documentée.

#### src/runtime/business/terrains/recalculateTerrainSurfaceDisponible.ts:14

- Type: metadata-key-conditional
- Match: `metadata.key === "exploitations"`
- Code: `m => m.metadata.key === "exploitations"`
- Diagnostic: Condition directe sur metadata.key.
- Action cible: Acceptable seulement si c’est dans un moteur runtime générique ou une règle documentée.

#### src/runtime/dashboard/ERPBusinessMetricsEngine.ts:84

- Type: hardcoded-business-module
- Match: `clientsauto`
- Code: `await listModule("clientsauto");`
- Diagnostic: Nom de module métier codé en dur.
- Action cible: Acceptable seulement si c’est dans un moteur runtime générique ou une règle documentée.

#### src/runtime/dashboard/ERPBusinessMetricsEngine.ts:86

- Type: hardcoded-business-module
- Match: `vehicules`
- Code: `const vehicules =`
- Diagnostic: Nom de module métier codé en dur.
- Action cible: Acceptable seulement si c’est dans un moteur runtime générique ou une règle documentée.

#### src/runtime/dashboard/ERPBusinessMetricsEngine.ts:87

- Type: hardcoded-business-module
- Match: `vehicules`
- Code: `await listModule("vehicules");`
- Diagnostic: Nom de module métier codé en dur.
- Action cible: Acceptable seulement si c’est dans un moteur runtime générique ou une règle documentée.

#### src/runtime/dashboard/ERPBusinessMetricsEngine.ts:93

- Type: hardcoded-business-module
- Match: `interventionsauto`
- Code: `await listModule("interventionsauto");`
- Diagnostic: Nom de module métier codé en dur.
- Action cible: Acceptable seulement si c’est dans un moteur runtime générique ou une règle documentée.

#### src/runtime/dashboard/ERPBusinessMetricsEngine.ts:96

- Type: hardcoded-business-module
- Match: `facturesauto`
- Code: `await listModule("facturesauto");`
- Diagnostic: Nom de module métier codé en dur.
- Action cible: Acceptable seulement si c’est dans un moteur runtime générique ou une règle documentée.

#### src/runtime/dashboard/ERPBusinessMetricsEngine.ts:183

- Type: hardcoded-business-module
- Match: `clientsauto`
- Code: `href: "/clientsauto",`
- Diagnostic: Nom de module métier codé en dur.
- Action cible: Acceptable seulement si c’est dans un moteur runtime générique ou une règle documentée.

#### src/runtime/dashboard/ERPBusinessMetricsEngine.ts:186

- Type: hardcoded-business-module
- Match: `vehicules`
- Code: `key: "vehicules",`
- Diagnostic: Nom de module métier codé en dur.
- Action cible: Acceptable seulement si c’est dans un moteur runtime générique ou une règle documentée.

#### src/runtime/dashboard/ERPBusinessMetricsEngine.ts:188

- Type: hardcoded-business-module
- Match: `vehicules`
- Code: `value: vehicules.length,`
- Diagnostic: Nom de module métier codé en dur.
- Action cible: Acceptable seulement si c’est dans un moteur runtime générique ou une règle documentée.

#### src/runtime/dashboard/ERPBusinessMetricsEngine.ts:189

- Type: hardcoded-business-module
- Match: `vehicules`
- Code: `href: "/vehicules",`
- Diagnostic: Nom de module métier codé en dur.
- Action cible: Acceptable seulement si c’est dans un moteur runtime générique ou une règle documentée.

#### src/runtime/dashboard/ERPBusinessMetricsEngine.ts:213

- Type: hardcoded-business-module
- Match: `interventionsauto`
- Code: `href: "/interventionsauto",`
- Diagnostic: Nom de module métier codé en dur.
- Action cible: Acceptable seulement si c’est dans un moteur runtime générique ou une règle documentée.

#### src/runtime/dashboard/ERPBusinessMetricsEngine.ts:219

- Type: hardcoded-business-module
- Match: `interventionsauto`
- Code: `href: "/interventionsauto",`
- Diagnostic: Nom de module métier codé en dur.
- Action cible: Acceptable seulement si c’est dans un moteur runtime générique ou une règle documentée.

#### src/runtime/dashboard/ERPBusinessMetricsEngine.ts:225

- Type: hardcoded-business-module
- Match: `facturesauto`
- Code: `href: "/facturesauto",`
- Diagnostic: Nom de module métier codé en dur.
- Action cible: Acceptable seulement si c’est dans un moteur runtime générique ou une règle documentée.

#### src/runtime/dashboard/ERPBusinessMetricsEngine.ts:231

- Type: hardcoded-business-module
- Match: `facturesauto`
- Code: `href: "/facturesauto",`
- Diagnostic: Nom de module métier codé en dur.
- Action cible: Acceptable seulement si c’est dans un moteur runtime générique ou une règle documentée.

#### src/runtime/dashboard/ERPBusinessMetricsEngine.ts:237

- Type: hardcoded-business-module
- Match: `facturesauto`
- Code: `href: "/facturesauto",`
- Diagnostic: Nom de module métier codé en dur.
- Action cible: Acceptable seulement si c’est dans un moteur runtime générique ou une règle documentée.

#### src/runtime/dashboard/ERPBusinessMetricsEngine.ts:243

- Type: hardcoded-business-module
- Match: `facturesauto`
- Code: `href: "/facturesauto",`
- Diagnostic: Nom de module métier codé en dur.
- Action cible: Acceptable seulement si c’est dans un moteur runtime générique ou une règle documentée.

#### src/runtime/dashboard/generic/ERPBusinessAmarkhysDashboardConfig.ts:54

- Type: hardcoded-business-module
- Match: `clientsauto`
- Code: `moduleKey: "clientsauto",`
- Diagnostic: Nom de module métier codé en dur.
- Action cible: Acceptable seulement si c’est dans un moteur runtime générique ou une règle documentée.

#### src/runtime/dashboard/generic/ERPBusinessAmarkhysDashboardConfig.ts:57

- Type: hardcoded-business-module
- Match: `clientsauto`
- Code: `href: "/clientsauto",`
- Diagnostic: Nom de module métier codé en dur.
- Action cible: Acceptable seulement si c’est dans un moteur runtime générique ou une règle documentée.

#### src/runtime/dashboard/generic/ERPBusinessAmarkhysDashboardConfig.ts:67

- Type: hardcoded-business-module
- Match: `vehicules`
- Code: `key: "vehicules-actifs",`
- Diagnostic: Nom de module métier codé en dur.
- Action cible: Acceptable seulement si c’est dans un moteur runtime générique ou une règle documentée.

#### src/runtime/dashboard/generic/ERPBusinessAmarkhysDashboardConfig.ts:69

- Type: hardcoded-business-module
- Match: `vehicules`
- Code: `moduleKey: "vehicules",`
- Diagnostic: Nom de module métier codé en dur.
- Action cible: Acceptable seulement si c’est dans un moteur runtime générique ou une règle documentée.

#### src/runtime/dashboard/generic/ERPBusinessAmarkhysDashboardConfig.ts:72

- Type: hardcoded-business-module
- Match: `vehicules`
- Code: `href: "/vehicules",`
- Diagnostic: Nom de module métier codé en dur.
- Action cible: Acceptable seulement si c’est dans un moteur runtime générique ou une règle documentée.

#### src/runtime/dashboard/generic/ERPBusinessAmarkhysDashboardConfig.ts:85

- Type: hardcoded-business-module
- Match: `encaissementsauto`
- Code: `moduleKey: "encaissementsauto",`
- Diagnostic: Nom de module métier codé en dur.
- Action cible: Acceptable seulement si c’est dans un moteur runtime générique ou une règle documentée.

#### src/runtime/dashboard/generic/ERPBusinessAmarkhysDashboardConfig.ts:90

- Type: hardcoded-business-module
- Match: `encaissementsauto`
- Code: `href: "/encaissementsauto",`
- Diagnostic: Nom de module métier codé en dur.
- Action cible: Acceptable seulement si c’est dans un moteur runtime générique ou une règle documentée.

#### src/runtime/dashboard/generic/ERPBusinessAmarkhysDashboardConfig.ts:108

- Type: hardcoded-business-module
- Match: `encaissementsauto`
- Code: `moduleKey: "encaissementsauto",`
- Diagnostic: Nom de module métier codé en dur.
- Action cible: Acceptable seulement si c’est dans un moteur runtime générique ou une règle documentée.

#### src/runtime/dashboard/generic/ERPBusinessAmarkhysDashboardConfig.ts:113

- Type: hardcoded-business-module
- Match: `encaissementsauto`
- Code: `href: "/encaissementsauto",`
- Diagnostic: Nom de module métier codé en dur.
- Action cible: Acceptable seulement si c’est dans un moteur runtime générique ou une règle documentée.

#### src/runtime/dashboard/generic/ERPBusinessAmarkhysDashboardConfig.ts:203

- Type: hardcoded-business-module
- Match: `clientsauto`
- Code: `href: "/clientsauto",`
- Diagnostic: Nom de module métier codé en dur.
- Action cible: Acceptable seulement si c’est dans un moteur runtime générique ou une règle documentée.

#### src/runtime/dashboard/generic/ERPBusinessAmarkhysDashboardConfig.ts:208

- Type: hardcoded-business-module
- Match: `interventionsauto`
- Code: `href: "/interventionsauto",`
- Diagnostic: Nom de module métier codé en dur.
- Action cible: Acceptable seulement si c’est dans un moteur runtime générique ou une règle documentée.

#### src/runtime/dashboard/generic/ERPBusinessAmarkhysDashboardConfig.ts:213

- Type: hardcoded-business-module
- Match: `facturesauto`
- Code: `href: "/facturesauto",`
- Diagnostic: Nom de module métier codé en dur.
- Action cible: Acceptable seulement si c’est dans un moteur runtime générique ou une règle documentée.

#### src/runtime/dashboard/generic/ERPBusinessAmarkhysDashboardConfig.ts:264

- Type: hardcoded-business-module
- Match: `facturesauto`
- Code: `moduleKey: "facturesauto",`
- Diagnostic: Nom de module métier codé en dur.
- Action cible: Acceptable seulement si c’est dans un moteur runtime générique ou une règle documentée.

#### src/runtime/dashboard/generic/ERPBusinessAmarkhysDashboardConfig.ts:269

- Type: hardcoded-business-module
- Match: `facturesauto`
- Code: `href: "/facturesauto",`
- Diagnostic: Nom de module métier codé en dur.
- Action cible: Acceptable seulement si c’est dans un moteur runtime générique ou une règle documentée.

#### src/runtime/dashboard/generic/ERPBusinessAmarkhysDashboardConfig.ts:288

- Type: hardcoded-business-module
- Match: `interventionsauto`
- Code: `moduleKey: "interventionsauto",`
- Diagnostic: Nom de module métier codé en dur.
- Action cible: Acceptable seulement si c’est dans un moteur runtime générique ou une règle documentée.

#### src/runtime/dashboard/generic/ERPBusinessAmarkhysDashboardConfig.ts:293

- Type: hardcoded-business-module
- Match: `interventionsauto`
- Code: `href: "/interventionsauto",`
- Diagnostic: Nom de module métier codé en dur.
- Action cible: Acceptable seulement si c’est dans un moteur runtime générique ou une règle documentée.

#### src/runtime/dashboard/generic/ERPBusinessAmarkhysDashboardConfig.ts:341

- Type: hardcoded-business-module
- Match: `facturesauto`
- Code: `moduleKey: "facturesauto",`
- Diagnostic: Nom de module métier codé en dur.
- Action cible: Acceptable seulement si c’est dans un moteur runtime générique ou une règle documentée.

#### src/runtime/dashboard/generic/ERPBusinessAmarkhysDashboardConfig.ts:344

- Type: hardcoded-business-module
- Match: `facturesauto`
- Code: `href: "/facturesauto",`
- Diagnostic: Nom de module métier codé en dur.
- Action cible: Acceptable seulement si c’est dans un moteur runtime générique ou une règle documentée.

#### src/runtime/dashboard/generic/ERPBusinessAmarkhysDashboardConfig.ts:444

- Type: hardcoded-business-module
- Match: `clientsauto`
- Code: `moduleKey: "clientsauto",`
- Diagnostic: Nom de module métier codé en dur.
- Action cible: Acceptable seulement si c’est dans un moteur runtime générique ou une règle documentée.

#### src/runtime/dashboard/generic/ERPBusinessAmarkhysDashboardConfig.ts:445

- Type: hardcoded-business-module
- Match: `clientsauto`
- Code: `href: "/clientsauto",`
- Diagnostic: Nom de module métier codé en dur.
- Action cible: Acceptable seulement si c’est dans un moteur runtime générique ou une règle documentée.

#### src/runtime/dashboard/generic/ERPBusinessAmarkhysDashboardConfig.ts:463

- Type: hardcoded-business-module
- Match: `interventionsauto`
- Code: `moduleKey: "interventionsauto",`
- Diagnostic: Nom de module métier codé en dur.
- Action cible: Acceptable seulement si c’est dans un moteur runtime générique ou une règle documentée.

#### src/runtime/dashboard/generic/ERPBusinessAmarkhysDashboardConfig.ts:464

- Type: hardcoded-business-module
- Match: `interventionsauto`
- Code: `href: "/interventionsauto",`
- Diagnostic: Nom de module métier codé en dur.
- Action cible: Acceptable seulement si c’est dans un moteur runtime générique ou une règle documentée.

#### src/runtime/dashboard/generic/ERPBusinessAmarkhysDashboardConfig.ts:469

- Type: hardcoded-business-module
- Match: `facturesauto`
- Code: `moduleKey: "facturesauto",`
- Diagnostic: Nom de module métier codé en dur.
- Action cible: Acceptable seulement si c’est dans un moteur runtime générique ou une règle documentée.

#### src/runtime/dashboard/generic/ERPBusinessAmarkhysDashboardConfig.ts:470

- Type: hardcoded-business-module
- Match: `facturesauto`
- Code: `href: "/facturesauto",`
- Diagnostic: Nom de module métier codé en dur.
- Action cible: Acceptable seulement si c’est dans un moteur runtime générique ou une règle documentée.

#### src/runtime/dashboard/generic/ERPBusinessAmarkhysDashboardConfig.ts:475

- Type: hardcoded-business-module
- Match: `facturesauto`
- Code: `moduleKey: "facturesauto",`
- Diagnostic: Nom de module métier codé en dur.
- Action cible: Acceptable seulement si c’est dans un moteur runtime générique ou une règle documentée.

#### src/runtime/dashboard/generic/ERPBusinessAmarkhysDashboardConfig.ts:476

- Type: hardcoded-business-module
- Match: `facturesauto`
- Code: `href: "/facturesauto",`
- Diagnostic: Nom de module métier codé en dur.
- Action cible: Acceptable seulement si c’est dans un moteur runtime générique ou une règle documentée.

#### src/runtime/dashboard/generic/ERPBusinessAmarkhysDashboardConfig.ts:495

- Type: hardcoded-business-module
- Match: `facturesauto`
- Code: `moduleKey: "facturesauto",`
- Diagnostic: Nom de module métier codé en dur.
- Action cible: Acceptable seulement si c’est dans un moteur runtime générique ou une règle documentée.

#### src/runtime/dashboard/generic/ERPBusinessAmarkhysDashboardConfig.ts:498

- Type: hardcoded-business-module
- Match: `facturesauto`
- Code: `href: "/facturesauto",`
- Diagnostic: Nom de module métier codé en dur.
- Action cible: Acceptable seulement si c’est dans un moteur runtime générique ou une règle documentée.

#### src/runtime/dashboard/generic/ERPBusinessAmarkhysDashboardConfig.ts:513

- Type: hardcoded-business-module
- Match: `facturesauto`
- Code: `moduleKey: "facturesauto",`
- Diagnostic: Nom de module métier codé en dur.
- Action cible: Acceptable seulement si c’est dans un moteur runtime générique ou une règle documentée.

#### src/runtime/dashboard/generic/ERPBusinessAmarkhysDashboardConfig.ts:516

- Type: hardcoded-business-module
- Match: `facturesauto`
- Code: `href: "/facturesauto",`
- Diagnostic: Nom de module métier codé en dur.
- Action cible: Acceptable seulement si c’est dans un moteur runtime générique ou une règle documentée.

#### src/runtime/dashboard/generic/ERPBusinessAmarkhysDashboardConfig.ts:536

- Type: hardcoded-business-module
- Match: `facturesauto`
- Code: `moduleKey: "facturesauto",`
- Diagnostic: Nom de module métier codé en dur.
- Action cible: Acceptable seulement si c’est dans un moteur runtime générique ou une règle documentée.

#### src/runtime/dashboard/generic/ERPBusinessAmarkhysDashboardConfig.ts:539

- Type: hardcoded-business-module
- Match: `facturesauto`
- Code: `href: "/facturesauto",`
- Diagnostic: Nom de module métier codé en dur.
- Action cible: Acceptable seulement si c’est dans un moteur runtime générique ou une règle documentée.

#### src/runtime/dashboard/generic/ERPBusinessAmarkhysDashboardConfig.ts:559

- Type: hardcoded-business-module
- Match: `clientsauto`
- Code: `moduleKey: "clientsauto",`
- Diagnostic: Nom de module métier codé en dur.
- Action cible: Acceptable seulement si c’est dans un moteur runtime générique ou une règle documentée.

#### src/runtime/dashboard/generic/ERPBusinessAmarkhysDashboardConfig.ts:562

- Type: hardcoded-business-module
- Match: `clientsauto`
- Code: `href: "/clientsauto",`
- Diagnostic: Nom de module métier codé en dur.
- Action cible: Acceptable seulement si c’est dans un moteur runtime générique ou une règle documentée.

#### src/runtime/dashboard/generic/ERPBusinessAmarkhysDashboardConfig.ts:572

- Type: hardcoded-business-module
- Match: `vehicules`
- Code: `key: "vehicules-total",`
- Diagnostic: Nom de module métier codé en dur.
- Action cible: Acceptable seulement si c’est dans un moteur runtime générique ou une règle documentée.

#### src/runtime/dashboard/generic/ERPBusinessAmarkhysDashboardConfig.ts:574

- Type: hardcoded-business-module
- Match: `vehicules`
- Code: `moduleKey: "vehicules",`
- Diagnostic: Nom de module métier codé en dur.
- Action cible: Acceptable seulement si c’est dans un moteur runtime générique ou une règle documentée.

#### src/runtime/dashboard/generic/ERPBusinessAmarkhysDashboardConfig.ts:577

- Type: hardcoded-business-module
- Match: `vehicules`
- Code: `href: "/vehicules",`
- Diagnostic: Nom de module métier codé en dur.
- Action cible: Acceptable seulement si c’est dans un moteur runtime générique ou une règle documentée.

#### src/runtime/dashboard/generic/ERPBusinessAmarkhysDashboardConfig.ts:612

- Type: hardcoded-business-module
- Match: `interventionsauto`
- Code: `moduleKey: "interventionsauto",`
- Diagnostic: Nom de module métier codé en dur.
- Action cible: Acceptable seulement si c’est dans un moteur runtime générique ou une règle documentée.

#### src/runtime/dashboard/generic/ERPBusinessAmarkhysDashboardConfig.ts:615

- Type: hardcoded-business-module
- Match: `interventionsauto`
- Code: `href: "/interventionsauto",`
- Diagnostic: Nom de module métier codé en dur.
- Action cible: Acceptable seulement si c’est dans un moteur runtime générique ou une règle documentée.

#### src/runtime/dashboard/generic/ERPBusinessAmarkhysDashboardConfig.ts:627

- Type: hardcoded-business-module
- Match: `interventionsauto`
- Code: `moduleKey: "interventionsauto",`
- Diagnostic: Nom de module métier codé en dur.
- Action cible: Acceptable seulement si c’est dans un moteur runtime générique ou une règle documentée.

#### src/runtime/dashboard/generic/ERPBusinessAmarkhysDashboardConfig.ts:630

- Type: hardcoded-business-module
- Match: `interventionsauto`
- Code: `href: "/interventionsauto",`
- Diagnostic: Nom de module métier codé en dur.
- Action cible: Acceptable seulement si c’est dans un moteur runtime générique ou une règle documentée.

#### src/runtime/dashboard/generic/ERPBusinessAmarkhysDashboardConfig.ts:642

- Type: hardcoded-business-module
- Match: `facturesauto`
- Code: `moduleKey: "facturesauto",`
- Diagnostic: Nom de module métier codé en dur.
- Action cible: Acceptable seulement si c’est dans un moteur runtime générique ou une règle documentée.

#### src/runtime/dashboard/generic/ERPBusinessAmarkhysDashboardConfig.ts:645

- Type: hardcoded-business-module
- Match: `facturesauto`
- Code: `href: "/facturesauto",`
- Diagnostic: Nom de module métier codé en dur.
- Action cible: Acceptable seulement si c’est dans un moteur runtime générique ou une règle documentée.

#### src/runtime/dashboard/generic/ERPBusinessAmarkhysDashboardConfig.ts:662

- Type: hardcoded-business-module
- Match: `facturesauto`
- Code: `moduleKey: "facturesauto",`
- Diagnostic: Nom de module métier codé en dur.
- Action cible: Acceptable seulement si c’est dans un moteur runtime générique ou une règle documentée.

#### src/runtime/dashboard/generic/ERPBusinessAmarkhysDashboardConfig.ts:665

- Type: hardcoded-business-module
- Match: `facturesauto`
- Code: `href: "/facturesauto",`
- Diagnostic: Nom de module métier codé en dur.
- Action cible: Acceptable seulement si c’est dans un moteur runtime générique ou une règle documentée.

#### src/runtime/dashboard/generic/ERPBusinessAmarkhysDashboardConfig.ts:682

- Type: hardcoded-business-module
- Match: `facturesauto`
- Code: `moduleKey: "facturesauto",`
- Diagnostic: Nom de module métier codé en dur.
- Action cible: Acceptable seulement si c’est dans un moteur runtime générique ou une règle documentée.

#### src/runtime/dashboard/generic/ERPBusinessAmarkhysDashboardConfig.ts:685

- Type: hardcoded-business-module
- Match: `facturesauto`
- Code: `href: "/facturesauto",`
- Diagnostic: Nom de module métier codé en dur.
- Action cible: Acceptable seulement si c’est dans un moteur runtime générique ou une règle documentée.

#### src/runtime/dashboard/generic/ERPBusinessAmarkhysDashboardConfig.ts:717

- Type: hardcoded-business-module
- Match: `clientsauto`
- Code: `moduleKey: "clientsauto",`
- Diagnostic: Nom de module métier codé en dur.
- Action cible: Acceptable seulement si c’est dans un moteur runtime générique ou une règle documentée.

#### src/runtime/dashboard/generic/ERPBusinessAmarkhysDashboardConfig.ts:722

- Type: hardcoded-business-module
- Match: `clientsauto`
- Code: `href: "/clientsauto",`
- Diagnostic: Nom de module métier codé en dur.
- Action cible: Acceptable seulement si c’est dans un moteur runtime générique ou une règle documentée.

#### src/runtime/dashboard/generic/ERPBusinessAmarkhysDashboardConfig.ts:753

- Type: hardcoded-business-module
- Match: `facturesauto`
- Code: `moduleKey: "facturesauto",`
- Diagnostic: Nom de module métier codé en dur.
- Action cible: Acceptable seulement si c’est dans un moteur runtime générique ou une règle documentée.

#### src/runtime/dashboard/generic/ERPBusinessAmarkhysDashboardConfig.ts:758

- Type: hardcoded-business-module
- Match: `facturesauto`
- Code: `href: "/facturesauto",`
- Diagnostic: Nom de module métier codé en dur.
- Action cible: Acceptable seulement si c’est dans un moteur runtime générique ou une règle documentée.

#### src/runtime/dashboard/generic/ERPDashboardWidgetEngine.ts:372

- Type: hardcoded-business-module
- Match: `clientsauto`
- Code: `const clientLabel = await resolveRelationLabel("clientsauto", record.clientId);`
- Diagnostic: Nom de module métier codé en dur.
- Action cible: Acceptable seulement si c’est dans un moteur runtime générique ou une règle documentée.

#### src/runtime/dashboard/generic/ERPDashboardWidgetEngine.ts:373

- Type: hardcoded-business-module
- Match: `vehicules`
- Code: `const vehicleLabel = await resolveRelationLabel("vehicules", record.vehiculeId);`
- Diagnostic: Nom de module métier codé en dur.
- Action cible: Acceptable seulement si c’est dans un moteur runtime générique ou une règle documentée.

#### src/runtime/dashboard/generic/ERPDashboardWidgetEngine.ts:374

- Type: hardcoded-business-module
- Match: `facturesauto`
- Code: `const invoiceLabel = await resolveRelationLabel("facturesauto", record.factureId);`
- Diagnostic: Nom de module métier codé en dur.
- Action cible: Acceptable seulement si c’est dans un moteur runtime générique ou une règle documentée.

#### src/runtime/dashboard/generic/ERPDashboardWidgetEngine.ts:375

- Type: hardcoded-business-module
- Match: `interventionsauto`
- Code: `const interventionLabel = await resolveRelationLabel("interventionsauto", record.interventionId);`
- Diagnostic: Nom de module métier codé en dur.
- Action cible: Acceptable seulement si c’est dans un moteur runtime générique ou une règle documentée.

#### src/runtime/firestore/FirestoreRuntimeMutation.ts:144

- Type: hardcoded-business-module
- Match: `lignesinterventionauto`
- Code: `if (module.metadata.key !== "lignesinterventionauto") {`
- Diagnostic: Nom de module métier codé en dur.
- Action cible: Vérifier si c’est une metadata, une route, ou une logique locale à généraliser.

#### src/runtime/firestore/FirestoreRuntimeMutation.ts:182

- Type: hardcoded-business-module
- Match: `lignesinterventionauto`
- Code: `module.metadata.key !== "lignesinterventionauto" &&`
- Diagnostic: Nom de module métier codé en dur.
- Action cible: Vérifier si c’est une metadata, une route, ou une logique locale à généraliser.

#### src/runtime/firestore/FirestoreRuntimeMutation.ts:183

- Type: hardcoded-business-module
- Match: `receptionsstockauto`
- Code: `module.metadata.key !== "receptionsstockauto"`
- Diagnostic: Nom de module métier codé en dur.
- Action cible: Vérifier si c’est une metadata, une route, ou une logique locale à généraliser.

#### src/runtime/firestore/FirestoreRuntimeMutation.ts:188

- Type: hardcoded-business-module
- Match: `lignesinterventionauto`
- Code: `if (module.metadata.key === "lignesinterventionauto") {`
- Diagnostic: Nom de module métier codé en dur.
- Action cible: Vérifier si c’est une metadata, une route, ou une logique locale à généraliser.

#### src/runtime/firestore/FirestoreRuntimeMutation.ts:214

- Type: hardcoded-business-module
- Match: `receptionsstockauto`
- Code: `module.metadata.key === "receptionsstockauto"`
- Diagnostic: Nom de module métier codé en dur.
- Action cible: Vérifier si c’est une metadata, une route, ou une logique locale à généraliser.

#### src/runtime/firestore/FirestoreRuntimeMutation.ts:342

- Type: hardcoded-business-module
- Match: `lignesinterventionauto`
- Code: `module.metadata.key === "lignesinterventionauto" ||`
- Diagnostic: Nom de module métier codé en dur.
- Action cible: Vérifier si c’est une metadata, une route, ou une logique locale à généraliser.

#### src/runtime/firestore/FirestoreRuntimeMutation.ts:343

- Type: hardcoded-business-module
- Match: `receptionsstockauto`
- Code: `module.metadata.key === "receptionsstockauto"`
- Diagnostic: Nom de module métier codé en dur.
- Action cible: Vérifier si c’est une metadata, une route, ou une logique locale à généraliser.

#### src/runtime/firestore/FirestoreRuntimeMutation.ts:424

- Type: hardcoded-business-module
- Match: `lignesinterventionauto`
- Code: `module.metadata.key === "lignesinterventionauto"`
- Diagnostic: Nom de module métier codé en dur.
- Action cible: Vérifier si c’est une metadata, une route, ou une logique locale à généraliser.

#### src/runtime/guards/RuntimeChronologyGuard.ts:271

- Type: module-metadata-key-conditional
- Match: `module.metadata.key === "interventionsauto"`
- Code: `module.metadata.key === "interventionsauto" &&`
- Diagnostic: Condition directe sur module.metadata.key dans du code générique.
- Action cible: Acceptable seulement si c’est dans un moteur runtime générique ou une règle documentée.

#### src/runtime/guards/RuntimeChronologyGuard.ts:282

- Type: module-metadata-key-conditional
- Match: `module.metadata.key === "facturesauto"`
- Code: `module.metadata.key === "facturesauto" &&`
- Diagnostic: Condition directe sur module.metadata.key dans du code générique.
- Action cible: Acceptable seulement si c’est dans un moteur runtime générique ou une règle documentée.

#### src/runtime/guards/RuntimeChronologyGuard.ts:293

- Type: module-metadata-key-conditional
- Match: `module.metadata.key === "encaissementsauto"`
- Code: `module.metadata.key === "encaissementsauto" &&`
- Diagnostic: Condition directe sur module.metadata.key dans du code générique.
- Action cible: Acceptable seulement si c’est dans un moteur runtime générique ou une règle documentée.

#### src/runtime/guards/RuntimeChronologyGuard.ts:271

- Type: metadata-key-conditional
- Match: `metadata.key === "interventionsauto"`
- Code: `module.metadata.key === "interventionsauto" &&`
- Diagnostic: Condition directe sur metadata.key.
- Action cible: Acceptable seulement si c’est dans un moteur runtime générique ou une règle documentée.

#### src/runtime/guards/RuntimeChronologyGuard.ts:282

- Type: metadata-key-conditional
- Match: `metadata.key === "facturesauto"`
- Code: `module.metadata.key === "facturesauto" &&`
- Diagnostic: Condition directe sur metadata.key.
- Action cible: Acceptable seulement si c’est dans un moteur runtime générique ou une règle documentée.

#### src/runtime/guards/RuntimeChronologyGuard.ts:293

- Type: metadata-key-conditional
- Match: `metadata.key === "encaissementsauto"`
- Code: `module.metadata.key === "encaissementsauto" &&`
- Diagnostic: Condition directe sur metadata.key.
- Action cible: Acceptable seulement si c’est dans un moteur runtime générique ou une règle documentée.

#### src/runtime/guards/RuntimeChronologyGuard.ts:179

- Type: hardcoded-business-module
- Match: `interventionsauto`
- Code: `"interventionsauto",`
- Diagnostic: Nom de module métier codé en dur.
- Action cible: Acceptable seulement si c’est dans un moteur runtime générique ou une règle documentée.

#### src/runtime/guards/RuntimeChronologyGuard.ts:216

- Type: hardcoded-business-module
- Match: `facturesauto`
- Code: `"facturesauto",`
- Diagnostic: Nom de module métier codé en dur.
- Action cible: Acceptable seulement si c’est dans un moteur runtime générique ou une règle documentée.

#### src/runtime/guards/RuntimeChronologyGuard.ts:271

- Type: hardcoded-business-module
- Match: `interventionsauto`
- Code: `module.metadata.key === "interventionsauto" &&`
- Diagnostic: Nom de module métier codé en dur.
- Action cible: Acceptable seulement si c’est dans un moteur runtime générique ou une règle documentée.

#### src/runtime/guards/RuntimeChronologyGuard.ts:282

- Type: hardcoded-business-module
- Match: `facturesauto`
- Code: `module.metadata.key === "facturesauto" &&`
- Diagnostic: Nom de module métier codé en dur.
- Action cible: Acceptable seulement si c’est dans un moteur runtime générique ou une règle documentée.

#### src/runtime/guards/RuntimeChronologyGuard.ts:293

- Type: hardcoded-business-module
- Match: `encaissementsauto`
- Code: `module.metadata.key === "encaissementsauto" &&`
- Diagnostic: Nom de module métier codé en dur.
- Action cible: Acceptable seulement si c’est dans un moteur runtime générique ou une règle documentée.

#### src/runtime/guards/processRuntimeBeforeMutationGuards.ts:172

- Type: module-metadata-key-conditional
- Match: `module.metadata.key === "rendezvous"`
- Code: `return module.metadata.key === "rendezvous";`
- Diagnostic: Condition directe sur module.metadata.key dans du code générique.
- Action cible: Acceptable seulement si c’est dans un moteur runtime générique ou une règle documentée.

#### src/runtime/guards/processRuntimeBeforeMutationGuards.ts:172

- Type: metadata-key-conditional
- Match: `metadata.key === "rendezvous"`
- Code: `return module.metadata.key === "rendezvous";`
- Diagnostic: Condition directe sur metadata.key.
- Action cible: Acceptable seulement si c’est dans un moteur runtime générique ou une règle documentée.

#### src/runtime/integrity/RuntimeReferentialIntegrityEngine.ts:155

- Type: module-key-conditional
- Match: `moduleKey === "encaissementsauto"`
- Code: `if (moduleKey === "encaissementsauto") {`
- Diagnostic: Condition directe sur moduleKey.
- Action cible: Acceptable seulement si c’est dans un moteur runtime générique ou une règle documentée.

#### src/runtime/integrity/RuntimeReferentialIntegrityEngine.ts:171

- Type: module-key-conditional
- Match: `moduleKey === "echeancespaiementauto"`
- Code: `if (moduleKey === "echeancespaiementauto") {`
- Diagnostic: Condition directe sur moduleKey.
- Action cible: Acceptable seulement si c’est dans un moteur runtime générique ou une règle documentée.

#### src/runtime/integrity/RuntimeReferentialIntegrityEngine.ts:27

- Type: hardcoded-business-module
- Match: `vehicules`
- Code: `sourceModule: "vehicules",`
- Diagnostic: Nom de module métier codé en dur.
- Action cible: Acceptable seulement si c’est dans un moteur runtime générique ou une règle documentée.

#### src/runtime/integrity/RuntimeReferentialIntegrityEngine.ts:29

- Type: hardcoded-business-module
- Match: `clientsauto`
- Code: `targetModule: "clientsauto",`
- Diagnostic: Nom de module métier codé en dur.
- Action cible: Acceptable seulement si c’est dans un moteur runtime générique ou une règle documentée.

#### src/runtime/integrity/RuntimeReferentialIntegrityEngine.ts:36

- Type: hardcoded-business-module
- Match: `clientsauto`
- Code: `targetModule: "clientsauto",`
- Diagnostic: Nom de module métier codé en dur.
- Action cible: Acceptable seulement si c’est dans un moteur runtime générique ou une règle documentée.

#### src/runtime/integrity/RuntimeReferentialIntegrityEngine.ts:41

- Type: hardcoded-business-module
- Match: `interventionsauto`
- Code: `sourceModule: "interventionsauto",`
- Diagnostic: Nom de module métier codé en dur.
- Action cible: Acceptable seulement si c’est dans un moteur runtime générique ou une règle documentée.

#### src/runtime/integrity/RuntimeReferentialIntegrityEngine.ts:43

- Type: hardcoded-business-module
- Match: `clientsauto`
- Code: `targetModule: "clientsauto",`
- Diagnostic: Nom de module métier codé en dur.
- Action cible: Acceptable seulement si c’est dans un moteur runtime générique ou une règle documentée.

#### src/runtime/integrity/RuntimeReferentialIntegrityEngine.ts:48

- Type: hardcoded-business-module
- Match: `facturesauto`
- Code: `sourceModule: "facturesauto",`
- Diagnostic: Nom de module métier codé en dur.
- Action cible: Acceptable seulement si c’est dans un moteur runtime générique ou une règle documentée.

#### src/runtime/integrity/RuntimeReferentialIntegrityEngine.ts:50

- Type: hardcoded-business-module
- Match: `clientsauto`
- Code: `targetModule: "clientsauto",`
- Diagnostic: Nom de module métier codé en dur.
- Action cible: Acceptable seulement si c’est dans un moteur runtime générique ou une règle documentée.

#### src/runtime/integrity/RuntimeReferentialIntegrityEngine.ts:57

- Type: hardcoded-business-module
- Match: `vehicules`
- Code: `targetModule: "vehicules",`
- Diagnostic: Nom de module métier codé en dur.
- Action cible: Acceptable seulement si c’est dans un moteur runtime générique ou une règle documentée.

#### src/runtime/integrity/RuntimeReferentialIntegrityEngine.ts:62

- Type: hardcoded-business-module
- Match: `interventionsauto`
- Code: `sourceModule: "interventionsauto",`
- Diagnostic: Nom de module métier codé en dur.
- Action cible: Acceptable seulement si c’est dans un moteur runtime générique ou une règle documentée.

#### src/runtime/integrity/RuntimeReferentialIntegrityEngine.ts:64

- Type: hardcoded-business-module
- Match: `vehicules`
- Code: `targetModule: "vehicules",`
- Diagnostic: Nom de module métier codé en dur.
- Action cible: Acceptable seulement si c’est dans un moteur runtime générique ou une règle documentée.

#### src/runtime/integrity/RuntimeReferentialIntegrityEngine.ts:69

- Type: hardcoded-business-module
- Match: `facturesauto`
- Code: `sourceModule: "facturesauto",`
- Diagnostic: Nom de module métier codé en dur.
- Action cible: Acceptable seulement si c’est dans un moteur runtime générique ou une règle documentée.

#### src/runtime/integrity/RuntimeReferentialIntegrityEngine.ts:71

- Type: hardcoded-business-module
- Match: `vehicules`
- Code: `targetModule: "vehicules",`
- Diagnostic: Nom de module métier codé en dur.
- Action cible: Acceptable seulement si c’est dans un moteur runtime générique ou une règle documentée.

#### src/runtime/integrity/RuntimeReferentialIntegrityEngine.ts:76

- Type: hardcoded-business-module
- Match: `encaissementsauto`
- Code: `sourceModule: "encaissementsauto",`
- Diagnostic: Nom de module métier codé en dur.
- Action cible: Acceptable seulement si c’est dans un moteur runtime générique ou une règle documentée.

#### src/runtime/integrity/RuntimeReferentialIntegrityEngine.ts:78

- Type: hardcoded-business-module
- Match: `facturesauto`
- Code: `targetModule: "facturesauto",`
- Diagnostic: Nom de module métier codé en dur.
- Action cible: Acceptable seulement si c’est dans un moteur runtime générique ou une règle documentée.

#### src/runtime/integrity/RuntimeReferentialIntegrityEngine.ts:85

- Type: hardcoded-business-module
- Match: `facturesauto`
- Code: `targetModule: "facturesauto",`
- Diagnostic: Nom de module métier codé en dur.
- Action cible: Acceptable seulement si c’est dans un moteur runtime générique ou une règle documentée.

#### src/runtime/integrity/RuntimeReferentialIntegrityEngine.ts:155

- Type: hardcoded-business-module
- Match: `encaissementsauto`
- Code: `if (moduleKey === "encaissementsauto") {`
- Diagnostic: Nom de module métier codé en dur.
- Action cible: Acceptable seulement si c’est dans un moteur runtime générique ou une règle documentée.

#### src/runtime/interventions/RuntimeInterventionTotalsService.ts:214

- Type: hardcoded-business-module
- Match: `lignesinterventionauto`
- Code: `getModule("lignesinterventionauto");`
- Diagnostic: Nom de module métier codé en dur.
- Action cible: Acceptable seulement si c’est dans un moteur runtime générique ou une règle documentée.

#### src/runtime/interventions/RuntimeInterventionTotalsService.ts:217

- Type: hardcoded-business-module
- Match: `interventionsauto`
- Code: `getModule("interventionsauto");`
- Diagnostic: Nom de module métier codé en dur.
- Action cible: Acceptable seulement si c’est dans un moteur runtime générique ou une règle documentée.

#### src/runtime/line-items/RuntimeLineRemovalService.ts:81

- Type: hardcoded-business-module
- Match: `lignesinterventionauto`
- Code: `const lineModule = getModule("lignesinterventionauto");`
- Diagnostic: Nom de module métier codé en dur.
- Action cible: Acceptable seulement si c’est dans un moteur runtime générique ou une règle documentée.

#### src/runtime/line-items/RuntimeLineRemovalService.ts:83

- Type: hardcoded-business-module
- Match: `mouvementsstockauto`
- Code: `const movementModule = getModule("mouvementsstockauto");`
- Diagnostic: Nom de module métier codé en dur.
- Action cible: Acceptable seulement si c’est dans un moteur runtime générique ou une règle documentée.

#### src/runtime/line-items/RuntimeLineRemovalService.ts:161

- Type: hardcoded-business-module
- Match: `lignesinterventionauto`
- Code: `sourceModule: "lignesinterventionauto",`
- Diagnostic: Nom de module métier codé en dur.
- Action cible: Acceptable seulement si c’est dans un moteur runtime générique ou une règle documentée.

#### src/runtime/modules/ERPModule.ts:200

- Type: hardcoded-business-module
- Match: `lignesinterventionauto`
- Code: `* Exemple : lignesinterventionauto -> interventionsauto via interventionId.`
- Diagnostic: Nom de module métier codé en dur.
- Action cible: Acceptable seulement si c’est dans un moteur runtime générique ou une règle documentée.

#### src/runtime/modules/ERPModule.ts:200

- Type: hardcoded-business-module
- Match: `interventionsauto`
- Code: `* Exemple : lignesinterventionauto -> interventionsauto via interventionId.`
- Diagnostic: Nom de module métier codé en dur.
- Action cible: Acceptable seulement si c’est dans un moteur runtime générique ou une règle documentée.

#### src/runtime/modules/lifecycle/ERPRelationDataLoader.ts:11

- Type: hardcoded-business-module
- Match: `clientsauto`
- Code: `clientsauto: [`
- Diagnostic: Nom de module métier codé en dur.
- Action cible: Vérifier si c’est une metadata, une route, ou une logique locale à généraliser.

#### src/runtime/modules/lifecycle/ERPRelationDataLoader.ts:12

- Type: hardcoded-business-module
- Match: `clientsauto`
- Code: `"clientsauto",`
- Diagnostic: Nom de module métier codé en dur.
- Action cible: Vérifier si c’est une metadata, une route, ou une logique locale à généraliser.

#### src/runtime/modules/lifecycle/ERPRelationDataLoader.ts:14

- Type: hardcoded-business-module
- Match: `vehicules`
- Code: `vehicules: [`
- Diagnostic: Nom de module métier codé en dur.
- Action cible: Vérifier si c’est une metadata, une route, ou une logique locale à généraliser.

#### src/runtime/modules/lifecycle/ERPRelationDataLoader.ts:15

- Type: hardcoded-business-module
- Match: `vehicules`
- Code: `"vehicules",`
- Diagnostic: Nom de module métier codé en dur.
- Action cible: Vérifier si c’est une metadata, une route, ou une logique locale à généraliser.

#### src/runtime/modules/lifecycle/ERPRelationDataLoader.ts:26

- Type: hardcoded-business-module
- Match: `facturesauto`
- Code: `facturesauto: [`
- Diagnostic: Nom de module métier codé en dur.
- Action cible: Vérifier si c’est une metadata, une route, ou une logique locale à généraliser.

#### src/runtime/modules/lifecycle/ERPRelationDataLoader.ts:27

- Type: hardcoded-business-module
- Match: `facturesauto`
- Code: `"facturesauto",`
- Diagnostic: Nom de module métier codé en dur.
- Action cible: Vérifier si c’est une metadata, une route, ou une logique locale à généraliser.

#### src/runtime/modules/lifecycle/ERPRelationDataLoader.ts:30

- Type: hardcoded-business-module
- Match: `interventionsauto`
- Code: `interventionsauto: [`
- Diagnostic: Nom de module métier codé en dur.
- Action cible: Vérifier si c’est une metadata, une route, ou une logique locale à généraliser.

#### src/runtime/modules/lifecycle/ERPRelationDataLoader.ts:31

- Type: hardcoded-business-module
- Match: `interventionsauto`
- Code: `"interventionsauto",`
- Diagnostic: Nom de module métier codé en dur.
- Action cible: Vérifier si c’est une metadata, une route, ou une logique locale à généraliser.

#### src/runtime/modules/lifecycle/ERPRelationDataLoader.ts:42

- Type: hardcoded-business-module
- Match: `encaissementsauto`
- Code: `encaissementsauto: [`
- Diagnostic: Nom de module métier codé en dur.
- Action cible: Vérifier si c’est une metadata, une route, ou une logique locale à généraliser.

#### src/runtime/modules/lifecycle/ERPRelationDataLoader.ts:43

- Type: hardcoded-business-module
- Match: `encaissementsauto`
- Code: `"encaissementsauto",`
- Diagnostic: Nom de module métier codé en dur.
- Action cible: Vérifier si c’est une metadata, une route, ou une logique locale à généraliser.

#### src/runtime/modules/lifecycle/ERPRelationDataLoader.ts:521

- Type: hardcoded-business-module
- Match: `clientsauto`
- Code: `if (normalizedModuleKey === "clientsauto") {`
- Diagnostic: Nom de module métier codé en dur.
- Action cible: Vérifier si c’est une metadata, une route, ou une logique locale à généraliser.

#### src/runtime/modules/lifecycle/ERPRelationDataLoader.ts:533

- Type: hardcoded-business-module
- Match: `vehicules`
- Code: `normalizedModuleKey === "vehicules" ||`
- Diagnostic: Nom de module métier codé en dur.
- Action cible: Vérifier si c’est une metadata, une route, ou une logique locale à généraliser.

#### src/runtime/modules/lifecycle/ERPRelationDataLoader.ts:564

- Type: hardcoded-business-module
- Match: `interventionsauto`
- Code: `if (normalizedModuleKey === "interventionsauto") {`
- Diagnostic: Nom de module métier codé en dur.
- Action cible: Vérifier si c’est une metadata, une route, ou une logique locale à généraliser.

#### src/runtime/modules/lifecycle/ERPRelationDataLoader.ts:618

- Type: hardcoded-business-module
- Match: `facturesauto`
- Code: `if (normalizedModuleKey === "facturesauto") {`
- Diagnostic: Nom de module métier codé en dur.
- Action cible: Vérifier si c’est une metadata, une route, ou une logique locale à généraliser.

#### src/runtime/modules/lifecycle/ERPRelationDataLoader.ts:630

- Type: hardcoded-business-module
- Match: `lignesinterventionauto`
- Code: `if (normalizedModuleKey === "lignesinterventionauto") {`
- Diagnostic: Nom de module métier codé en dur.
- Action cible: Vérifier si c’est une metadata, une route, ou une logique locale à généraliser.

#### src/runtime/modules/lifecycle/ERPRelationDataLoader.ts:642

- Type: hardcoded-business-module
- Match: `mouvementsstockauto`
- Code: `if (normalizedModuleKey === "mouvementsstockauto") {`
- Diagnostic: Nom de module métier codé en dur.
- Action cible: Vérifier si c’est une metadata, une route, ou une logique locale à généraliser.

#### src/runtime/observability/RuntimeMetricAlertEvaluator.ts:35

- Type: hardcoded-business-module
- Match: `facturesauto`
- Code: `"facturesauto",`
- Diagnostic: Nom de module métier codé en dur.
- Action cible: Acceptable seulement si c’est dans un moteur runtime générique ou une règle documentée.

#### src/runtime/observability/RuntimeMetricAlertEvaluator.ts:74

- Type: hardcoded-business-module
- Match: `facturesauto`
- Code: `"facturesauto",`
- Diagnostic: Nom de module métier codé en dur.
- Action cible: Acceptable seulement si c’est dans un moteur runtime générique ou une règle documentée.

#### src/runtime/observability/generated/vehicules/vehicules.observability.ts:4

- Type: hardcoded-business-module
- Match: `vehicules`
- Code: `"vehicules",`
- Diagnostic: Nom de module métier codé en dur.
- Action cible: Acceptable seulement si c’est dans un moteur runtime générique ou une règle documentée.

#### src/runtime/policies/generated/vehicules/vehicules.policy.ts:4

- Type: hardcoded-business-module
- Match: `vehicules`
- Code: `"vehicules",`
- Diagnostic: Nom de module métier codé en dur.
- Action cible: Acceptable seulement si c’est dans un moteur runtime générique ou une règle documentée.

#### src/runtime/smart-intelligence/SmartAnomalyDetector.ts:6

- Type: module-metadata-key-conditional
- Match: `module.metadata.key === "stocks"`
- Code: `if (module.metadata.key === "stocks") {`
- Diagnostic: Condition directe sur module.metadata.key dans du code générique.
- Action cible: Acceptable seulement si c’est dans un moteur runtime générique ou une règle documentée.

#### src/runtime/smart-intelligence/SmartAnomalyDetector.ts:27

- Type: module-metadata-key-conditional
- Match: `module.metadata.key === "materiels"`
- Code: `if (module.metadata.key === "materiels") {`
- Diagnostic: Condition directe sur module.metadata.key dans du code générique.
- Action cible: Acceptable seulement si c’est dans un moteur runtime générique ou une règle documentée.

#### src/runtime/smart-intelligence/SmartAnomalyDetector.ts:6

- Type: metadata-key-conditional
- Match: `metadata.key === "stocks"`
- Code: `if (module.metadata.key === "stocks") {`
- Diagnostic: Condition directe sur metadata.key.
- Action cible: Acceptable seulement si c’est dans un moteur runtime générique ou une règle documentée.

#### src/runtime/smart-intelligence/SmartAnomalyDetector.ts:27

- Type: metadata-key-conditional
- Match: `metadata.key === "materiels"`
- Code: `if (module.metadata.key === "materiels") {`
- Diagnostic: Condition directe sur metadata.key.
- Action cible: Acceptable seulement si c’est dans un moteur runtime générique ou une règle documentée.

#### src/runtime/smart-intelligence/SmartPredictionEngine.ts:6

- Type: module-metadata-key-conditional
- Match: `module.metadata.key === "stocks"`
- Code: `if (module.metadata.key === "stocks") {`
- Diagnostic: Condition directe sur module.metadata.key dans du code générique.
- Action cible: Acceptable seulement si c’est dans un moteur runtime générique ou une règle documentée.

#### src/runtime/smart-intelligence/SmartPredictionEngine.ts:19

- Type: module-metadata-key-conditional
- Match: `module.metadata.key === "materiels"`
- Code: `if (module.metadata.key === "materiels") {`
- Diagnostic: Condition directe sur module.metadata.key dans du code générique.
- Action cible: Acceptable seulement si c’est dans un moteur runtime générique ou une règle documentée.

#### src/runtime/smart-intelligence/SmartPredictionEngine.ts:6

- Type: metadata-key-conditional
- Match: `metadata.key === "stocks"`
- Code: `if (module.metadata.key === "stocks") {`
- Diagnostic: Condition directe sur metadata.key.
- Action cible: Acceptable seulement si c’est dans un moteur runtime générique ou une règle documentée.

#### src/runtime/smart-intelligence/SmartPredictionEngine.ts:19

- Type: metadata-key-conditional
- Match: `metadata.key === "materiels"`
- Code: `if (module.metadata.key === "materiels") {`
- Diagnostic: Condition directe sur metadata.key.
- Action cible: Acceptable seulement si c’est dans un moteur runtime générique ou une règle documentée.

#### src/runtime/smart-intelligence/SmartRecommendationEngine.ts:18

- Type: module-metadata-key-conditional
- Match: `module.metadata.key === "stocks"`
- Code: `if (module.metadata.key === "stocks") {`
- Diagnostic: Condition directe sur module.metadata.key dans du code générique.
- Action cible: Acceptable seulement si c’est dans un moteur runtime générique ou une règle documentée.

#### src/runtime/smart-intelligence/SmartRecommendationEngine.ts:33

- Type: module-metadata-key-conditional
- Match: `module.metadata.key === "materiels"`
- Code: `if (module.metadata.key === "materiels") {`
- Diagnostic: Condition directe sur module.metadata.key dans du code générique.
- Action cible: Acceptable seulement si c’est dans un moteur runtime générique ou une règle documentée.

#### src/runtime/smart-intelligence/SmartRecommendationEngine.ts:18

- Type: metadata-key-conditional
- Match: `metadata.key === "stocks"`
- Code: `if (module.metadata.key === "stocks") {`
- Diagnostic: Condition directe sur metadata.key.
- Action cible: Acceptable seulement si c’est dans un moteur runtime générique ou une règle documentée.

#### src/runtime/smart-intelligence/SmartRecommendationEngine.ts:33

- Type: metadata-key-conditional
- Match: `metadata.key === "materiels"`
- Code: `if (module.metadata.key === "materiels") {`
- Diagnostic: Condition directe sur metadata.key.
- Action cible: Acceptable seulement si c’est dans un moteur runtime générique ou une règle documentée.

#### src/runtime/status/RuntimeStatusGovernanceEngine.ts:12

- Type: hardcoded-business-module
- Match: `lignesinterventionauto`
- Code: `moduleKey: "lignesinterventionauto",`
- Diagnostic: Nom de module métier codé en dur.
- Action cible: Vérifier si c’est une metadata, une route, ou une logique locale à généraliser.

#### src/runtime/status/RuntimeStatusGovernanceEngine.ts:95

- Type: hardcoded-business-module
- Match: `receptionsstockauto`
- Code: `moduleKey: "receptionsstockauto",`
- Diagnostic: Nom de module métier codé en dur.
- Action cible: Vérifier si c’est une metadata, une route, ou une logique locale à généraliser.

#### src/runtime/stock/RuntimeStockMovementService.ts:133

- Type: hardcoded-business-module
- Match: `mouvementsstockauto`
- Code: `const movementModule = getModule("mouvementsstockauto");`
- Diagnostic: Nom de module métier codé en dur.
- Action cible: Acceptable seulement si c’est dans un moteur runtime générique ou une règle documentée.

#### src/runtime/stock/RuntimeStockMovementService.ts:134

- Type: hardcoded-business-module
- Match: `lignesinterventionauto`
- Code: `const lineModule = getModule("lignesinterventionauto");`
- Diagnostic: Nom de module métier codé en dur.
- Action cible: Acceptable seulement si c’est dans un moteur runtime générique ou une règle documentée.

#### src/runtime/stock/RuntimeStockMovementService.ts:169

- Type: hardcoded-business-module
- Match: `lignesinterventionauto`
- Code: `sourceModule: "lignesinterventionauto",`
- Diagnostic: Nom de module métier codé en dur.
- Action cible: Acceptable seulement si c’est dans un moteur runtime générique ou une règle documentée.

#### src/runtime/stock/RuntimeStockMovementService.ts:243

- Type: hardcoded-business-module
- Match: `mouvementsstockauto`
- Code: `const movementModule = getModule("mouvementsstockauto");`
- Diagnostic: Nom de module métier codé en dur.
- Action cible: Acceptable seulement si c’est dans un moteur runtime générique ou une règle documentée.

#### src/runtime/stock/RuntimeStockMovementService.ts:244

- Type: hardcoded-business-module
- Match: `receptionsstockauto`
- Code: `const receptionModule = getModule("receptionsstockauto");`
- Diagnostic: Nom de module métier codé en dur.
- Action cible: Acceptable seulement si c’est dans un moteur runtime générique ou une règle documentée.

#### src/runtime/stock/RuntimeStockMovementService.ts:272

- Type: hardcoded-business-module
- Match: `receptionsstockauto`
- Code: `sourceModule: "receptionsstockauto",`
- Diagnostic: Nom de module métier codé en dur.
- Action cible: Acceptable seulement si c’est dans un moteur runtime générique ou une règle documentée.

#### src/runtime/workspaces/ERPWorkspaceRegistry.ts:242

- Type: hardcoded-business-module
- Match: `clientsauto`
- Code: `key: "clientsauto",`
- Diagnostic: Nom de module métier codé en dur.
- Action cible: Acceptable seulement si c’est dans un moteur runtime générique ou une règle documentée.

#### src/runtime/workspaces/ERPWorkspaceRegistry.ts:246

- Type: hardcoded-business-module
- Match: `vehicules`
- Code: `key: "vehicules",`
- Diagnostic: Nom de module métier codé en dur.
- Action cible: Acceptable seulement si c’est dans un moteur runtime générique ou une règle documentée.

#### src/runtime/workspaces/ERPWorkspaceRegistry.ts:254

- Type: hardcoded-business-module
- Match: `interventionsauto`
- Code: `key: "interventionsauto",`
- Diagnostic: Nom de module métier codé en dur.
- Action cible: Acceptable seulement si c’est dans un moteur runtime générique ou une règle documentée.

#### src/runtime/workspaces/ERPWorkspaceRegistry.ts:258

- Type: hardcoded-business-module
- Match: `facturesauto`
- Code: `key: "facturesauto",`
- Diagnostic: Nom de module métier codé en dur.
- Action cible: Acceptable seulement si c’est dans un moteur runtime générique ou une règle documentée.

#### src/runtime/workspaces/ERPWorkspaceRegistry.ts:281

- Type: hardcoded-business-module
- Match: `vehicules`
- Code: `key: "vehicules",`
- Diagnostic: Nom de module métier codé en dur.
- Action cible: Acceptable seulement si c’est dans un moteur runtime générique ou une règle documentée.

#### src/runtime/workspaces/ERPWorkspaceRegistry.ts:303

- Type: hardcoded-business-module
- Match: `clientsauto`
- Code: `href: "/clientsauto/nouveau",`
- Diagnostic: Nom de module métier codé en dur.
- Action cible: Acceptable seulement si c’est dans un moteur runtime générique ou une règle documentée.

#### src/runtime/workspaces/ERPWorkspaceRegistry.ts:313

- Type: hardcoded-business-module
- Match: `interventionsauto`
- Code: `href: "/interventionsauto/nouveau",`
- Diagnostic: Nom de module métier codé en dur.
- Action cible: Acceptable seulement si c’est dans un moteur runtime générique ou une règle documentée.

### INFO

#### src/app/facture/[token]/details/page.tsx:344

- Type: manual-amount-calculation
- Match: `montantHT`
- Code: `const montantHT =`
- Diagnostic: Calcul financier ou champ montant détecté.
- Action cible: Les pages ne doivent pas contenir de métier. Déplacer vers runtime/generic page/metadata.

#### src/app/facture/[token]/details/page.tsx:347

- Type: manual-amount-calculation
- Match: `montantHT`
- Code: `sum + amount(line, "montantHT"),`
- Diagnostic: Calcul financier ou champ montant détecté.
- Action cible: Les pages ne doivent pas contenir de métier. Déplacer vers runtime/generic page/metadata.

#### src/app/facture/[token]/details/page.tsx:358

- Type: manual-amount-calculation
- Match: `montantTTC`
- Code: `const montantTTC =`
- Diagnostic: Calcul financier ou champ montant détecté.
- Action cible: Les pages ne doivent pas contenir de métier. Déplacer vers runtime/generic page/metadata.

#### src/app/facture/[token]/details/page.tsx:361

- Type: manual-amount-calculation
- Match: `montantTTC`
- Code: `sum + amount(line, "montantTTC"),`
- Diagnostic: Calcul financier ou champ montant détecté.
- Action cible: Les pages ne doivent pas contenir de métier. Déplacer vers runtime/generic page/metadata.

#### src/app/facture/[token]/details/page.tsx:366

- Type: manual-amount-calculation
- Match: `montantHT`
- Code: `montantHT:`
- Diagnostic: Calcul financier ou champ montant détecté.
- Action cible: Les pages ne doivent pas contenir de métier. Déplacer vers runtime/generic page/metadata.

#### src/app/facture/[token]/details/page.tsx:367

- Type: manual-amount-calculation
- Match: `montantHT`
- Code: `montantHT || amount(invoice, "montantHT"),`
- Diagnostic: Calcul financier ou champ montant détecté.
- Action cible: Les pages ne doivent pas contenir de métier. Déplacer vers runtime/generic page/metadata.

#### src/app/facture/[token]/details/page.tsx:367

- Type: manual-amount-calculation
- Match: `montantHT`
- Code: `montantHT || amount(invoice, "montantHT"),`
- Diagnostic: Calcul financier ou champ montant détecté.
- Action cible: Les pages ne doivent pas contenir de métier. Déplacer vers runtime/generic page/metadata.

#### src/app/facture/[token]/details/page.tsx:370

- Type: manual-amount-calculation
- Match: `montantTTC`
- Code: `montantTTC:`
- Diagnostic: Calcul financier ou champ montant détecté.
- Action cible: Les pages ne doivent pas contenir de métier. Déplacer vers runtime/generic page/metadata.

#### src/app/facture/[token]/details/page.tsx:371

- Type: manual-amount-calculation
- Match: `montantTTC`
- Code: `montantTTC || amount(invoice, "montantTTC"),`
- Diagnostic: Calcul financier ou champ montant détecté.
- Action cible: Les pages ne doivent pas contenir de métier. Déplacer vers runtime/generic page/metadata.

#### src/app/facture/[token]/details/page.tsx:371

- Type: manual-amount-calculation
- Match: `montantTTC`
- Code: `montantTTC || amount(invoice, "montantTTC"),`
- Diagnostic: Calcul financier ou champ montant détecté.
- Action cible: Les pages ne doivent pas contenir de métier. Déplacer vers runtime/generic page/metadata.

#### src/app/facture/[token]/details/page.tsx:492

- Type: manual-amount-calculation
- Match: `montantHT`
- Code: `{formatMoney(totals.montantHT)}`
- Diagnostic: Calcul financier ou champ montant détecté.
- Action cible: Les pages ne doivent pas contenir de métier. Déplacer vers runtime/generic page/metadata.

#### src/app/facture/[token]/details/page.tsx:510

- Type: manual-amount-calculation
- Match: `montantTTC`
- Code: `{formatMoney(totals.montantTTC)}`
- Diagnostic: Calcul financier ou champ montant détecté.
- Action cible: Les pages ne doivent pas contenir de métier. Déplacer vers runtime/generic page/metadata.

#### src/app/facture/[token]/details/page.tsx:543

- Type: manual-amount-calculation
- Match: `prixUnitaireHT`
- Code: `{formatMoney(amount(line, "prixUnitaireHT") || amount(line, "prixUnitaire"))}`
- Diagnostic: Calcul financier ou champ montant détecté.
- Action cible: Les pages ne doivent pas contenir de métier. Déplacer vers runtime/generic page/metadata.

#### src/app/facture/[token]/details/page.tsx:547

- Type: manual-amount-calculation
- Match: `montantTTC`
- Code: `{formatMoney(amount(line, "montantTTC") || amount(line, "montantTotal"))}`
- Diagnostic: Calcul financier ou champ montant détecté.
- Action cible: Les pages ne doivent pas contenir de métier. Déplacer vers runtime/generic page/metadata.

#### src/app/facture/[token]/page.tsx:106

- Type: manual-amount-calculation
- Match: `montantTTC`
- Code: `const montantTTC =`
- Diagnostic: Calcul financier ou champ montant détecté.
- Action cible: Les pages ne doivent pas contenir de métier. Déplacer vers runtime/generic page/metadata.

#### src/app/facture/[token]/page.tsx:107

- Type: manual-amount-calculation
- Match: `montantTTC`
- Code: `amount(invoice, "montantTTC");`
- Diagnostic: Calcul financier ou champ montant détecté.
- Action cible: Les pages ne doivent pas contenir de métier. Déplacer vers runtime/generic page/metadata.

#### src/app/facture/[token]/page.tsx:120

- Type: manual-amount-calculation
- Match: `montantTTC`
- Code: `montantTTC - montantPaye,`
- Diagnostic: Calcul financier ou champ montant détecté.
- Action cible: Les pages ne doivent pas contenir de métier. Déplacer vers runtime/generic page/metadata.

#### src/app/facture/[token]/page.tsx:533

- Type: manual-amount-calculation
- Match: `montantTTC`
- Code: `const montantTTC =`
- Diagnostic: Calcul financier ou champ montant détecté.
- Action cible: Les pages ne doivent pas contenir de métier. Déplacer vers runtime/generic page/metadata.

#### src/app/facture/[token]/page.tsx:534

- Type: manual-amount-calculation
- Match: `montantTTC`
- Code: `amount(invoice, "montantTTC");`
- Diagnostic: Calcul financier ou champ montant détecté.
- Action cible: Les pages ne doivent pas contenir de métier. Déplacer vers runtime/generic page/metadata.

#### src/app/facture/[token]/page.tsx:557

- Type: manual-amount-calculation
- Match: `montantTTC`
- Code: `montantTTC,`
- Diagnostic: Calcul financier ou champ montant détecté.
- Action cible: Les pages ne doivent pas contenir de métier. Déplacer vers runtime/generic page/metadata.

#### src/app/facture/[token]/page.tsx:819

- Type: manual-amount-calculation
- Match: `montantTTC`
- Code: `value={summary.montantTTC}`
- Diagnostic: Calcul financier ou champ montant détecté.
- Action cible: Les pages ne doivent pas contenir de métier. Déplacer vers runtime/generic page/metadata.

#### src/components/erp/billing/InvoiceDocumentActions.tsx:91

- Type: manual-amount-calculation
- Match: `montantTTC`
- Code: `const montantTTC =`
- Diagnostic: Calcul financier ou champ montant détecté.
- Action cible: Vérifier si le calcul passe par RuntimeComputedFieldsEngine.

#### src/components/erp/billing/InvoiceDocumentActions.tsx:92

- Type: manual-amount-calculation
- Match: `montantTTC`
- Code: `amount(invoice, "montantTTC");`
- Diagnostic: Calcul financier ou champ montant détecté.
- Action cible: Vérifier si le calcul passe par RuntimeComputedFieldsEngine.

#### src/components/erp/billing/InvoiceDocumentActions.tsx:105

- Type: manual-amount-calculation
- Match: `montantTTC`
- Code: `montantTTC - montantPaye,`
- Diagnostic: Calcul financier ou champ montant détecté.
- Action cible: Vérifier si le calcul passe par RuntimeComputedFieldsEngine.

#### src/components/erp/billing/InvoiceDocumentActions.tsx:333

- Type: manual-amount-calculation
- Match: `montantTTC`
- Code: `amount(invoice, "montantTTC");`
- Diagnostic: Calcul financier ou champ montant détecté.
- Action cible: Vérifier si le calcul passe par RuntimeComputedFieldsEngine.

#### src/components/erp/billing/InvoiceDocumentActions.tsx:414

- Type: manual-amount-calculation
- Match: `montantHT`
- Code: `const montantHT =`
- Diagnostic: Calcul financier ou champ montant détecté.
- Action cible: Vérifier si le calcul passe par RuntimeComputedFieldsEngine.

#### src/components/erp/billing/InvoiceDocumentActions.tsx:415

- Type: manual-amount-calculation
- Match: `montantHT`
- Code: `amount(invoice, "montantHT");`
- Diagnostic: Calcul financier ou champ montant détecté.
- Action cible: Vérifier si le calcul passe par RuntimeComputedFieldsEngine.

#### src/components/erp/billing/InvoiceDocumentActions.tsx:420

- Type: manual-amount-calculation
- Match: `montantTTC`
- Code: `const montantTTC =`
- Diagnostic: Calcul financier ou champ montant détecté.
- Action cible: Vérifier si le calcul passe par RuntimeComputedFieldsEngine.

#### src/components/erp/billing/InvoiceDocumentActions.tsx:421

- Type: manual-amount-calculation
- Match: `montantTTC`
- Code: `amount(invoice, "montantTTC");`
- Diagnostic: Calcul financier ou champ montant détecté.
- Action cible: Vérifier si le calcul passe par RuntimeComputedFieldsEngine.

#### src/components/erp/billing/InvoiceDocumentActions.tsx:496

- Type: manual-amount-calculation
- Match: `montantHT`
- Code: `formatMoney(montantHT),`
- Diagnostic: Calcul financier ou champ montant détecté.
- Action cible: Vérifier si le calcul passe par RuntimeComputedFieldsEngine.

#### src/components/erp/billing/InvoiceDocumentActions.tsx:498

- Type: manual-amount-calculation
- Match: `montantTTC`
- Code: `formatMoney(montantTTC),`
- Diagnostic: Calcul financier ou champ montant détecté.
- Action cible: Vérifier si le calcul passe par RuntimeComputedFieldsEngine.

#### src/components/erp/billing/InvoiceDocumentActions.tsx:514

- Type: manual-amount-calculation
- Match: `montantHT`
- Code: `["Montant HT", formatMoney(montantHT)],`
- Diagnostic: Calcul financier ou champ montant détecté.
- Action cible: Vérifier si le calcul passe par RuntimeComputedFieldsEngine.

#### src/components/erp/billing/InvoiceDocumentActions.tsx:516

- Type: manual-amount-calculation
- Match: `montantTTC`
- Code: `["Montant TTC", formatMoney(montantTTC)],`
- Diagnostic: Calcul financier ou champ montant détecté.
- Action cible: Vérifier si le calcul passe par RuntimeComputedFieldsEngine.

#### src/components/erp/billing/InvoicePaymentSchedule.tsx:18

- Type: manual-amount-calculation
- Match: `montantTTC`
- Code: `montantTTC?: number;`
- Diagnostic: Calcul financier ou champ montant détecté.
- Action cible: Vérifier si le calcul passe par RuntimeComputedFieldsEngine.

#### src/components/erp/billing/InvoicePaymentSchedule.tsx:172

- Type: manual-amount-calculation
- Match: `montantTTC`
- Code: `montantTTC = 0,`
- Diagnostic: Calcul financier ou champ montant détecté.
- Action cible: Vérifier si le calcul passe par RuntimeComputedFieldsEngine.

#### src/components/erp/billing/InvoicePaymentSchedule.tsx:248

- Type: manual-amount-calculation
- Match: `montantTTC`
- Code: `Number(montantTTC) - Number(montantPaye),`
- Diagnostic: Calcul financier ou champ montant détecté.
- Action cible: Vérifier si le calcul passe par RuntimeComputedFieldsEngine.

#### src/components/erp/billing/InvoicePaymentsHistory.tsx:20

- Type: manual-amount-calculation
- Match: `montantTTC`
- Code: `montantTTC?: number;`
- Diagnostic: Calcul financier ou champ montant détecté.
- Action cible: Vérifier si le calcul passe par RuntimeComputedFieldsEngine.

#### src/components/erp/billing/InvoicePaymentsHistory.tsx:313

- Type: manual-amount-calculation
- Match: `montantTTC`
- Code: `montantTTC = 0,`
- Diagnostic: Calcul financier ou champ montant détecté.
- Action cible: Vérifier si le calcul passe par RuntimeComputedFieldsEngine.

#### src/components/erp/billing/InvoicePaymentsHistory.tsx:387

- Type: manual-amount-calculation
- Match: `montantTTC`
- Code: `Number(montantTTC ?? 0) - totalValide,`
- Diagnostic: Calcul financier ou champ montant détecté.
- Action cible: Vérifier si le calcul passe par RuntimeComputedFieldsEngine.

#### src/components/erp/forms/enterprise/ERPEnterpriseForm.tsx:146

- Type: manual-amount-calculation
- Match: `montantTTC`
- Code: `const montantTTC =`
- Diagnostic: Calcul financier ou champ montant détecté.
- Action cible: Vérifier si le calcul passe par RuntimeComputedFieldsEngine.

#### src/components/erp/forms/enterprise/ERPEnterpriseForm.tsx:147

- Type: manual-amount-calculation
- Match: `montantTTC`
- Code: `Number(invoice.montantTTC ?? 0);`
- Diagnostic: Calcul financier ou champ montant détecté.
- Action cible: Vérifier si le calcul passe par RuntimeComputedFieldsEngine.

#### src/components/erp/forms/enterprise/ERPEnterpriseForm.tsx:159

- Type: manual-amount-calculation
- Match: `montantTTC`
- Code: `montantTTC - montantPaye,`
- Diagnostic: Calcul financier ou champ montant détecté.
- Action cible: Vérifier si le calcul passe par RuntimeComputedFieldsEngine.

#### src/components/erp/forms/enterprise/ERPEnterpriseForm.tsx:313

- Type: manual-amount-calculation
- Match: `montantTTC`
- Code: `const montantTTC =`
- Diagnostic: Calcul financier ou champ montant détecté.
- Action cible: Vérifier si le calcul passe par RuntimeComputedFieldsEngine.

#### src/components/erp/forms/enterprise/ERPEnterpriseForm.tsx:314

- Type: manual-amount-calculation
- Match: `montantTTC`
- Code: `Number(invoice.montantTTC ?? 0);`
- Diagnostic: Calcul financier ou champ montant détecté.
- Action cible: Vérifier si le calcul passe par RuntimeComputedFieldsEngine.

#### src/components/erp/forms/enterprise/ERPEnterpriseForm.tsx:326

- Type: manual-amount-calculation
- Match: `montantTTC`
- Code: `montantTTC - montantPaye,`
- Diagnostic: Calcul financier ou champ montant détecté.
- Action cible: Vérifier si le calcul passe par RuntimeComputedFieldsEngine.

#### src/components/erp/forms/enterprise/ERPEnterpriseForm.tsx:331

- Type: manual-amount-calculation
- Match: `montantTTC`
- Code: `montantTTC,`
- Diagnostic: Calcul financier ou champ montant détecté.
- Action cible: Vérifier si le calcul passe par RuntimeComputedFieldsEngine.

#### src/components/erp/forms/enterprise/ERPEnterpriseForm.tsx:783

- Type: manual-amount-calculation
- Match: `prixUnitaireHT`
- Code: `values.prixUnitaireHT ??`
- Diagnostic: Calcul financier ou champ montant détecté.
- Action cible: Vérifier si le calcul passe par RuntimeComputedFieldsEngine.

#### src/components/erp/forms/enterprise/ERPEnterpriseForm.tsx:789

- Type: manual-amount-calculation
- Match: `tauxTVA`
- Code: `toRuntimeNumber(values.tauxTVA, 18);`
- Diagnostic: Calcul financier ou champ montant détecté.
- Action cible: Vérifier si le calcul passe par RuntimeComputedFieldsEngine.

#### src/components/erp/forms/enterprise/ERPEnterpriseForm.tsx:791

- Type: manual-amount-calculation
- Match: `montantHT`
- Code: `const montantHT =`
- Diagnostic: Calcul financier ou champ montant détecté.
- Action cible: Vérifier si le calcul passe par RuntimeComputedFieldsEngine.

#### src/components/erp/forms/enterprise/ERPEnterpriseForm.tsx:795

- Type: manual-amount-calculation
- Match: `montantHT`
- Code: `Math.round((montantHT * taxRate / 100) * 100) / 100;`
- Diagnostic: Calcul financier ou champ montant détecté.
- Action cible: Vérifier si le calcul passe par RuntimeComputedFieldsEngine.

#### src/components/erp/forms/enterprise/ERPEnterpriseForm.tsx:797

- Type: manual-amount-calculation
- Match: `montantTTC`
- Code: `const montantTTC =`
- Diagnostic: Calcul financier ou champ montant détecté.
- Action cible: Vérifier si le calcul passe par RuntimeComputedFieldsEngine.

#### src/components/erp/forms/enterprise/ERPEnterpriseForm.tsx:798

- Type: manual-amount-calculation
- Match: `montantHT`
- Code: `Math.round((montantHT + montantTVA) * 100) / 100;`
- Diagnostic: Calcul financier ou champ montant détecté.
- Action cible: Vérifier si le calcul passe par RuntimeComputedFieldsEngine.

#### src/components/erp/forms/enterprise/ERPEnterpriseForm.tsx:804

- Type: manual-amount-calculation
- Match: `prixUnitaireHT`
- Code: `prixUnitaireHT: unitPrice,`
- Diagnostic: Calcul financier ou champ montant détecté.
- Action cible: Vérifier si le calcul passe par RuntimeComputedFieldsEngine.

#### src/components/erp/forms/enterprise/ERPEnterpriseForm.tsx:805

- Type: manual-amount-calculation
- Match: `tauxTVA`
- Code: `tauxTVA: taxRate,`
- Diagnostic: Calcul financier ou champ montant détecté.
- Action cible: Vérifier si le calcul passe par RuntimeComputedFieldsEngine.

#### src/components/erp/forms/enterprise/ERPEnterpriseForm.tsx:806

- Type: manual-amount-calculation
- Match: `montantHT`
- Code: `montantHT,`
- Diagnostic: Calcul financier ou champ montant détecté.
- Action cible: Vérifier si le calcul passe par RuntimeComputedFieldsEngine.

#### src/components/erp/forms/enterprise/ERPEnterpriseForm.tsx:808

- Type: manual-amount-calculation
- Match: `montantTTC`
- Code: `montantTTC,`
- Diagnostic: Calcul financier ou champ montant détecté.
- Action cible: Vérifier si le calcul passe par RuntimeComputedFieldsEngine.

#### src/components/erp/forms/enterprise/ERPEnterpriseForm.tsx:809

- Type: manual-amount-calculation
- Match: `montantHT`
- Code: `montantTotal: montantHT,`
- Diagnostic: Calcul financier ou champ montant détecté.
- Action cible: Vérifier si le calcul passe par RuntimeComputedFieldsEngine.

#### src/components/erp/forms/enterprise/ERPEnterpriseForm.tsx:871

- Type: manual-amount-calculation
- Match: `prixUnitaireHT`
- Code: `"prixUnitaireHT",`
- Diagnostic: Calcul financier ou champ montant détecté.
- Action cible: Vérifier si le calcul passe par RuntimeComputedFieldsEngine.

#### src/components/erp/forms/enterprise/ERPEnterpriseForm.tsx:872

- Type: manual-amount-calculation
- Match: `tauxTVA`
- Code: `"tauxTVA",`
- Diagnostic: Calcul financier ou champ montant détecté.
- Action cible: Vérifier si le calcul passe par RuntimeComputedFieldsEngine.

#### src/components/erp/forms/enterprise/ERPEnterpriseForm.tsx:1613

- Type: manual-amount-calculation
- Match: `montantTTC`
- Code: `{invoiceAmountSummary.montantTTC.toLocaleString("fr-FR")} FCFA`
- Diagnostic: Calcul financier ou champ montant détecté.
- Action cible: Vérifier si le calcul passe par RuntimeComputedFieldsEngine.

#### src/components/erp/forms/enterprise/ERPEnterpriseForm.tsx:1664

- Type: manual-amount-calculation
- Match: `montantTTC`
- Code: `montantTTC={Number(initialData.montantTTC ?? 0)}`
- Diagnostic: Calcul financier ou champ montant détecté.
- Action cible: Vérifier si le calcul passe par RuntimeComputedFieldsEngine.

#### src/components/erp/forms/enterprise/ERPEnterpriseForm.tsx:1664

- Type: manual-amount-calculation
- Match: `montantTTC`
- Code: `montantTTC={Number(initialData.montantTTC ?? 0)}`
- Diagnostic: Calcul financier ou champ montant détecté.
- Action cible: Vérifier si le calcul passe par RuntimeComputedFieldsEngine.

#### src/components/erp/forms/enterprise/ERPEnterpriseForm.tsx:1675

- Type: manual-amount-calculation
- Match: `montantTTC`
- Code: `montantTTC={Number(initialData.montantTTC ?? 0)}`
- Diagnostic: Calcul financier ou champ montant détecté.
- Action cible: Vérifier si le calcul passe par RuntimeComputedFieldsEngine.

#### src/components/erp/forms/enterprise/ERPEnterpriseForm.tsx:1675

- Type: manual-amount-calculation
- Match: `montantTTC`
- Code: `montantTTC={Number(initialData.montantTTC ?? 0)}`
- Diagnostic: Calcul financier ou champ montant détecté.
- Action cible: Vérifier si le calcul passe par RuntimeComputedFieldsEngine.

#### src/components/erp/runtime/ERPRuntimeDetails.tsx:36

- Type: manual-amount-calculation
- Match: `montantTTC`
- Code: `const montantTTC =`
- Diagnostic: Calcul financier ou champ montant détecté.
- Action cible: Vérifier si le calcul passe par RuntimeComputedFieldsEngine.

#### src/components/erp/runtime/ERPRuntimeDetails.tsx:37

- Type: manual-amount-calculation
- Match: `montantTTC`
- Code: `Number(data.montantTTC ?? 0);`
- Diagnostic: Calcul financier ou champ montant détecté.
- Action cible: Vérifier si le calcul passe par RuntimeComputedFieldsEngine.

#### src/components/erp/runtime/ERPRuntimeDetails.tsx:49

- Type: manual-amount-calculation
- Match: `montantTTC`
- Code: `montantTTC - montantPaye,`
- Diagnostic: Calcul financier ou champ montant détecté.
- Action cible: Vérifier si le calcul passe par RuntimeComputedFieldsEngine.

#### src/components/erp/runtime/ERPRuntimeDetails.tsx:110

- Type: manual-amount-calculation
- Match: `montantTTC`
- Code: `const montantTTC =`
- Diagnostic: Calcul financier ou champ montant détecté.
- Action cible: Vérifier si le calcul passe par RuntimeComputedFieldsEngine.

#### src/components/erp/runtime/ERPRuntimeDetails.tsx:111

- Type: manual-amount-calculation
- Match: `montantTTC`
- Code: `Number(data.montantTTC ?? 0);`
- Diagnostic: Calcul financier ou champ montant détecté.
- Action cible: Vérifier si le calcul passe par RuntimeComputedFieldsEngine.

#### src/components/erp/runtime/ERPRuntimeDetails.tsx:123

- Type: manual-amount-calculation
- Match: `montantTTC`
- Code: `montantTTC - montantPaye,`
- Diagnostic: Calcul financier ou champ montant détecté.
- Action cible: Vérifier si le calcul passe par RuntimeComputedFieldsEngine.

#### src/components/erp/runtime/ERPRuntimeDetails.tsx:128

- Type: manual-amount-calculation
- Match: `montantTTC`
- Code: `montantTTC,`
- Diagnostic: Calcul financier ou champ montant détecté.
- Action cible: Vérifier si le calcul passe par RuntimeComputedFieldsEngine.

#### src/components/erp/runtime/ERPRuntimeDetails.tsx:234

- Type: manual-amount-calculation
- Match: `montantTTC`
- Code: `{amountSummary.montantTTC.toLocaleString("fr-FR")} FCFA`
- Diagnostic: Calcul financier ou champ montant détecté.
- Action cible: Vérifier si le calcul passe par RuntimeComputedFieldsEngine.

#### src/components/erp/runtime/ERPRuntimePage.tsx:33

- Type: manual-amount-calculation
- Match: `montantTTC`
- Code: `const montantTTC =`
- Diagnostic: Calcul financier ou champ montant détecté.
- Action cible: Vérifier si le calcul passe par RuntimeComputedFieldsEngine.

#### src/components/erp/runtime/ERPRuntimePage.tsx:34

- Type: manual-amount-calculation
- Match: `montantTTC`
- Code: `Number(record.montantTTC ?? 0);`
- Diagnostic: Calcul financier ou champ montant détecté.
- Action cible: Vérifier si le calcul passe par RuntimeComputedFieldsEngine.

#### src/components/erp/runtime/ERPRuntimePage.tsx:45

- Type: manual-amount-calculation
- Match: `montantTTC`
- Code: `: Math.max(montantTTC - montantPaye, 0);`
- Diagnostic: Calcul financier ou champ montant détecté.
- Action cible: Vérifier si le calcul passe par RuntimeComputedFieldsEngine.

#### src/runtime/business-rules/runtimeBusinessRules.ts:722

- Type: manual-amount-calculation
- Match: `montantHT`
- Code: `const montantHT =`
- Diagnostic: Calcul financier ou champ montant détecté.
- Action cible: Vérifier si le calcul passe par RuntimeComputedFieldsEngine.

#### src/runtime/business-rules/runtimeBusinessRules.ts:724

- Type: manual-amount-calculation
- Match: `montantHT`
- Code: `asNumber(intervention.montantHT) ||`
- Diagnostic: Calcul financier ou champ montant détecté.
- Action cible: Vérifier si le calcul passe par RuntimeComputedFieldsEngine.

#### src/runtime/business-rules/runtimeBusinessRules.ts:733

- Type: manual-amount-calculation
- Match: `tauxTVA`
- Code: `const tauxTVA =`
- Diagnostic: Calcul financier ou champ montant détecté.
- Action cible: Vérifier si le calcul passe par RuntimeComputedFieldsEngine.

#### src/runtime/business-rules/runtimeBusinessRules.ts:734

- Type: manual-amount-calculation
- Match: `montantHT`
- Code: `montantHT > 0 && montantTVA > 0`
- Diagnostic: Calcul financier ou champ montant détecté.
- Action cible: Vérifier si le calcul passe par RuntimeComputedFieldsEngine.

#### src/runtime/business-rules/runtimeBusinessRules.ts:735

- Type: manual-amount-calculation
- Match: `montantHT`
- Code: `? roundMoney((montantTVA / montantHT) * 100)`
- Diagnostic: Calcul financier ou champ montant détecté.
- Action cible: Vérifier si le calcul passe par RuntimeComputedFieldsEngine.

#### src/runtime/business-rules/runtimeBusinessRules.ts:791

- Type: manual-amount-calculation
- Match: `montantTTC`
- Code: `const montantTTC =`
- Diagnostic: Calcul financier ou champ montant détecté.
- Action cible: Vérifier si le calcul passe par RuntimeComputedFieldsEngine.

#### src/runtime/business-rules/runtimeBusinessRules.ts:793

- Type: manual-amount-calculation
- Match: `montantTTC`
- Code: `asNumber(intervention.montantTTC) ||`
- Diagnostic: Calcul financier ou champ montant détecté.
- Action cible: Vérifier si le calcul passe par RuntimeComputedFieldsEngine.

#### src/runtime/business-rules/runtimeBusinessRules.ts:795

- Type: manual-amount-calculation
- Match: `montantHT`
- Code: `montantHT +`
- Diagnostic: Calcul financier ou champ montant détecté.
- Action cible: Vérifier si le calcul passe par RuntimeComputedFieldsEngine.

#### src/runtime/business-rules/runtimeBusinessRules.ts:799

- Type: manual-amount-calculation
- Match: `montantHT`
- Code: `: montantHT * tauxTVA / 100`
- Diagnostic: Calcul financier ou champ montant détecté.
- Action cible: Vérifier si le calcul passe par RuntimeComputedFieldsEngine.

#### src/runtime/business-rules/runtimeBusinessRules.ts:799

- Type: manual-amount-calculation
- Match: `tauxTVA`
- Code: `: montantHT * tauxTVA / 100`
- Diagnostic: Calcul financier ou champ montant détecté.
- Action cible: Vérifier si le calcul passe par RuntimeComputedFieldsEngine.

#### src/runtime/business-rules/runtimeBusinessRules.ts:828

- Type: manual-amount-calculation
- Match: `montantHT`
- Code: `montantHT,`
- Diagnostic: Calcul financier ou champ montant détecté.
- Action cible: Vérifier si le calcul passe par RuntimeComputedFieldsEngine.

#### src/runtime/business-rules/runtimeBusinessRules.ts:831

- Type: manual-amount-calculation
- Match: `tauxTVA`
- Code: `tauxTVA,`
- Diagnostic: Calcul financier ou champ montant détecté.
- Action cible: Vérifier si le calcul passe par RuntimeComputedFieldsEngine.

#### src/runtime/business-rules/runtimeBusinessRules.ts:833

- Type: manual-amount-calculation
- Match: `montantTTC`
- Code: `montantTTC,`
- Diagnostic: Calcul financier ou champ montant détecté.
- Action cible: Vérifier si le calcul passe par RuntimeComputedFieldsEngine.

#### src/runtime/business-rules/runtimeBusinessRules.ts:839

- Type: manual-amount-calculation
- Match: `montantTTC`
- Code: `montantTTC,`
- Diagnostic: Calcul financier ou champ montant détecté.
- Action cible: Vérifier si le calcul passe par RuntimeComputedFieldsEngine.

#### src/runtime/business-rules/runtimeBusinessRules.ts:916

- Type: manual-amount-calculation
- Match: `montantTTC`
- Code: `payload.montantTTC ?? 0`
- Diagnostic: Calcul financier ou champ montant détecté.
- Action cible: Vérifier si le calcul passe par RuntimeComputedFieldsEngine.

#### src/runtime/business-rules/runtimeBusinessRules.ts:972

- Type: manual-amount-calculation
- Match: `montantTTC`
- Code: `'Paiement reçu : ${payload.montantTTC}',`
- Diagnostic: Calcul financier ou champ montant détecté.
- Action cible: Vérifier si le calcul passe par RuntimeComputedFieldsEngine.

#### src/runtime/business-rules/runtimeBusinessRules.ts:1083

- Type: manual-amount-calculation
- Match: `montantHT`
- Code: `asRuntimeNumber(facture.montantHT);`
- Diagnostic: Calcul financier ou champ montant détecté.
- Action cible: Vérifier si le calcul passe par RuntimeComputedFieldsEngine.

#### src/runtime/business-rules/runtimeBusinessRules.ts:1090

- Type: manual-amount-calculation
- Match: `montantTTC`
- Code: `facture.montantTTC ??`
- Diagnostic: Calcul financier ou champ montant détecté.
- Action cible: Vérifier si le calcul passe par RuntimeComputedFieldsEngine.

#### src/runtime/business-rules/runtimeBusinessRules.ts:1098

- Type: manual-amount-calculation
- Match: `montantHT`
- Code: `linkedIntervention?.montantHT ??`
- Diagnostic: Calcul financier ou champ montant détecté.
- Action cible: Vérifier si le calcul passe par RuntimeComputedFieldsEngine.

#### src/runtime/business-rules/runtimeBusinessRules.ts:1109

- Type: manual-amount-calculation
- Match: `montantTTC`
- Code: `linkedIntervention?.montantTTC`
- Diagnostic: Calcul financier ou champ montant détecté.
- Action cible: Vérifier si le calcul passe par RuntimeComputedFieldsEngine.

#### src/runtime/business-rules/runtimeBusinessRules.ts:1168

- Type: manual-amount-calculation
- Match: `montantTTC`
- Code: `const montantTTC =`
- Diagnostic: Calcul financier ou champ montant détecté.
- Action cible: Vérifier si le calcul passe par RuntimeComputedFieldsEngine.

#### src/runtime/business-rules/runtimeBusinessRules.ts:1173

- Type: manual-amount-calculation
- Match: `montantTTC`
- Code: `montantTTC - montantPaye,`
- Diagnostic: Calcul financier ou champ montant détecté.
- Action cible: Vérifier si le calcul passe par RuntimeComputedFieldsEngine.

#### src/runtime/business-rules/runtimeBusinessRules.ts:1180

- Type: manual-amount-calculation
- Match: `montantTTC`
- Code: `: montantPaye < montantTTC`
- Diagnostic: Calcul financier ou champ montant détecté.
- Action cible: Vérifier si le calcul passe par RuntimeComputedFieldsEngine.

#### src/runtime/business-rules/runtimeBusinessRules.ts:1188

- Type: manual-amount-calculation
- Match: `montantHT`
- Code: `montantHT:`
- Diagnostic: Calcul financier ou champ montant détecté.
- Action cible: Vérifier si le calcul passe par RuntimeComputedFieldsEngine.

#### src/runtime/business-rules/runtimeBusinessRules.ts:1197

- Type: manual-amount-calculation
- Match: `montantTTC`
- Code: `montantTTC:`
- Diagnostic: Calcul financier ou champ montant détecté.
- Action cible: Vérifier si le calcul passe par RuntimeComputedFieldsEngine.

#### src/runtime/business-rules/runtimeBusinessRules.ts:1332

- Type: manual-amount-calculation
- Match: `montantHT`
- Code: `asRuntimeNumber(facture.montantHT);`
- Diagnostic: Calcul financier ou champ montant détecté.
- Action cible: Vérifier si le calcul passe par RuntimeComputedFieldsEngine.

#### src/runtime/business-rules/runtimeBusinessRules.ts:1339

- Type: manual-amount-calculation
- Match: `montantTTC`
- Code: `facture.montantTTC ??`
- Diagnostic: Calcul financier ou champ montant détecté.
- Action cible: Vérifier si le calcul passe par RuntimeComputedFieldsEngine.

#### src/runtime/business-rules/runtimeBusinessRules.ts:1347

- Type: manual-amount-calculation
- Match: `montantHT`
- Code: `linkedIntervention?.montantHT ??`
- Diagnostic: Calcul financier ou champ montant détecté.
- Action cible: Vérifier si le calcul passe par RuntimeComputedFieldsEngine.

#### src/runtime/business-rules/runtimeBusinessRules.ts:1358

- Type: manual-amount-calculation
- Match: `montantTTC`
- Code: `linkedIntervention?.montantTTC`
- Diagnostic: Calcul financier ou champ montant détecté.
- Action cible: Vérifier si le calcul passe par RuntimeComputedFieldsEngine.

#### src/runtime/business-rules/runtimeBusinessRules.ts:1417

- Type: manual-amount-calculation
- Match: `montantTTC`
- Code: `const montantTTC =`
- Diagnostic: Calcul financier ou champ montant détecté.
- Action cible: Vérifier si le calcul passe par RuntimeComputedFieldsEngine.

#### src/runtime/business-rules/runtimeBusinessRules.ts:1422

- Type: manual-amount-calculation
- Match: `montantTTC`
- Code: `montantTTC - montantPaye,`
- Diagnostic: Calcul financier ou champ montant détecté.
- Action cible: Vérifier si le calcul passe par RuntimeComputedFieldsEngine.

#### src/runtime/business-rules/runtimeBusinessRules.ts:1429

- Type: manual-amount-calculation
- Match: `montantTTC`
- Code: `: montantPaye < montantTTC`
- Diagnostic: Calcul financier ou champ montant détecté.
- Action cible: Vérifier si le calcul passe par RuntimeComputedFieldsEngine.

#### src/runtime/business-rules/runtimeBusinessRules.ts:1437

- Type: manual-amount-calculation
- Match: `montantHT`
- Code: `montantHT:`
- Diagnostic: Calcul financier ou champ montant détecté.
- Action cible: Vérifier si le calcul passe par RuntimeComputedFieldsEngine.

#### src/runtime/business-rules/runtimeBusinessRules.ts:1446

- Type: manual-amount-calculation
- Match: `montantTTC`
- Code: `montantTTC:`
- Diagnostic: Calcul financier ou champ montant détecté.
- Action cible: Vérifier si le calcul passe par RuntimeComputedFieldsEngine.

#### src/runtime/dashboard/ERPBusinessMetricsEngine.ts:138

- Type: manual-amount-calculation
- Match: `montantTTC`
- Code: `"montantTTC",`
- Diagnostic: Calcul financier ou champ montant détecté.
- Action cible: Acceptable seulement si c’est dans un moteur runtime générique ou une règle documentée.

#### src/runtime/dashboard/generic/ERPBusinessAmarkhysDashboardConfig.ts:500

- Type: manual-amount-calculation
- Match: `montantTTC`
- Code: `sumFields: ["montantTTC", "totalTTC", "montantTotal", "total"],`
- Diagnostic: Calcul financier ou champ montant détecté.
- Action cible: Acceptable seulement si c’est dans un moteur runtime générique ou une règle documentée.

#### src/runtime/dashboard/generic/ERPBusinessAmarkhysDashboardConfig.ts:518

- Type: manual-amount-calculation
- Match: `montantTTC`
- Code: `sumFields: ["montantTTC", "totalTTC", "montantTotal", "total"],`
- Diagnostic: Calcul financier ou champ montant détecté.
- Action cible: Acceptable seulement si c’est dans un moteur runtime générique ou une règle documentée.

#### src/runtime/dashboard/generic/ERPBusinessAmarkhysDashboardConfig.ts:541

- Type: manual-amount-calculation
- Match: `montantTTC`
- Code: `sumFields: ["montantTTC", "totalTTC", "montantTotal", "total"],`
- Diagnostic: Calcul financier ou champ montant détecté.
- Action cible: Acceptable seulement si c’est dans un moteur runtime générique ou une règle documentée.

#### src/runtime/dashboard/generic/ERPDashboardWidgetEngine.ts:380

- Type: manual-amount-calculation
- Match: `montantTTC`
- Code: `formatMoney(record.montantTTC) ||`
- Diagnostic: Calcul financier ou champ montant détecté.
- Action cible: Acceptable seulement si c’est dans un moteur runtime générique ou une règle documentée.

#### src/runtime/interventions/RuntimeInterventionTotalsService.ts:15

- Type: manual-amount-calculation
- Match: `montantHT`
- Code: `montantHT: number;`
- Diagnostic: Calcul financier ou champ montant détecté.
- Action cible: Acceptable seulement si c’est dans un moteur runtime générique ou une règle documentée.

#### src/runtime/interventions/RuntimeInterventionTotalsService.ts:17

- Type: manual-amount-calculation
- Match: `montantTTC`
- Code: `montantTTC: number;`
- Diagnostic: Calcul financier ou champ montant détecté.
- Action cible: Acceptable seulement si c’est dans un moteur runtime générique ou une règle documentée.

#### src/runtime/interventions/RuntimeInterventionTotalsService.ts:69

- Type: manual-amount-calculation
- Match: `montantHT`
- Code: `const montantHT =`
- Diagnostic: Calcul financier ou champ montant détecté.
- Action cible: Acceptable seulement si c’est dans un moteur runtime générique ou une règle documentée.

#### src/runtime/interventions/RuntimeInterventionTotalsService.ts:70

- Type: manual-amount-calculation
- Match: `montantHT`
- Code: `asNumber(line.montantHT);`
- Diagnostic: Calcul financier ou champ montant détecté.
- Action cible: Acceptable seulement si c’est dans un moteur runtime générique ou une règle documentée.

#### src/runtime/interventions/RuntimeInterventionTotalsService.ts:72

- Type: manual-amount-calculation
- Match: `montantHT`
- Code: `if (montantHT !== 0) {`
- Diagnostic: Calcul financier ou champ montant détecté.
- Action cible: Acceptable seulement si c’est dans un moteur runtime générique ou une règle documentée.

#### src/runtime/interventions/RuntimeInterventionTotalsService.ts:73

- Type: manual-amount-calculation
- Match: `montantHT`
- Code: `return montantHT;`
- Diagnostic: Calcul financier ou champ montant détecté.
- Action cible: Acceptable seulement si c’est dans un moteur runtime générique ou une règle documentée.

#### src/runtime/interventions/RuntimeInterventionTotalsService.ts:86

- Type: manual-amount-calculation
- Match: `montantHT`
- Code: `function getLineTVA(line: RuntimeRecord, montantHT: number): number {`
- Diagnostic: Calcul financier ou champ montant détecté.
- Action cible: Acceptable seulement si c’est dans un moteur runtime générique ou une règle documentée.

#### src/runtime/interventions/RuntimeInterventionTotalsService.ts:94

- Type: manual-amount-calculation
- Match: `tauxTVA`
- Code: `const tauxTVA =`
- Diagnostic: Calcul financier ou champ montant détecté.
- Action cible: Acceptable seulement si c’est dans un moteur runtime générique ou une règle documentée.

#### src/runtime/interventions/RuntimeInterventionTotalsService.ts:95

- Type: manual-amount-calculation
- Match: `tauxTVA`
- Code: `asNumber(line.tauxTVA);`
- Diagnostic: Calcul financier ou champ montant détecté.
- Action cible: Acceptable seulement si c’est dans un moteur runtime générique ou une règle documentée.

#### src/runtime/interventions/RuntimeInterventionTotalsService.ts:97

- Type: manual-amount-calculation
- Match: `tauxTVA`
- Code: `if (tauxTVA <= 0) {`
- Diagnostic: Calcul financier ou champ montant détecté.
- Action cible: Acceptable seulement si c’est dans un moteur runtime générique ou une règle documentée.

#### src/runtime/interventions/RuntimeInterventionTotalsService.ts:101

- Type: manual-amount-calculation
- Match: `montantHT`
- Code: `return montantHT * tauxTVA / 100;`
- Diagnostic: Calcul financier ou champ montant détecté.
- Action cible: Acceptable seulement si c’est dans un moteur runtime générique ou une règle documentée.

#### src/runtime/interventions/RuntimeInterventionTotalsService.ts:101

- Type: manual-amount-calculation
- Match: `tauxTVA`
- Code: `return montantHT * tauxTVA / 100;`
- Diagnostic: Calcul financier ou champ montant détecté.
- Action cible: Acceptable seulement si c’est dans un moteur runtime générique ou une règle documentée.

#### src/runtime/interventions/RuntimeInterventionTotalsService.ts:106

- Type: manual-amount-calculation
- Match: `montantHT`
- Code: `montantHT: number,`
- Diagnostic: Calcul financier ou champ montant détecté.
- Action cible: Acceptable seulement si c’est dans un moteur runtime générique ou une règle documentée.

#### src/runtime/interventions/RuntimeInterventionTotalsService.ts:109

- Type: manual-amount-calculation
- Match: `montantTTC`
- Code: `const montantTTC =`
- Diagnostic: Calcul financier ou champ montant détecté.
- Action cible: Acceptable seulement si c’est dans un moteur runtime générique ou une règle documentée.

#### src/runtime/interventions/RuntimeInterventionTotalsService.ts:110

- Type: manual-amount-calculation
- Match: `montantTTC`
- Code: `asNumber(line.montantTTC);`
- Diagnostic: Calcul financier ou champ montant détecté.
- Action cible: Acceptable seulement si c’est dans un moteur runtime générique ou une règle documentée.

#### src/runtime/interventions/RuntimeInterventionTotalsService.ts:112

- Type: manual-amount-calculation
- Match: `montantTTC`
- Code: `if (montantTTC !== 0) {`
- Diagnostic: Calcul financier ou champ montant détecté.
- Action cible: Acceptable seulement si c’est dans un moteur runtime générique ou une règle documentée.

#### src/runtime/interventions/RuntimeInterventionTotalsService.ts:113

- Type: manual-amount-calculation
- Match: `montantTTC`
- Code: `return montantTTC;`
- Diagnostic: Calcul financier ou champ montant détecté.
- Action cible: Acceptable seulement si c’est dans un moteur runtime générique ou une règle documentée.

#### src/runtime/interventions/RuntimeInterventionTotalsService.ts:116

- Type: manual-amount-calculation
- Match: `montantHT`
- Code: `return montantHT + montantTVA;`
- Diagnostic: Calcul financier ou champ montant détecté.
- Action cible: Acceptable seulement si c’est dans un moteur runtime générique ou une règle documentée.

#### src/runtime/interventions/RuntimeInterventionTotalsService.ts:145

- Type: manual-amount-calculation
- Match: `montantHT`
- Code: `const montantHT =`
- Diagnostic: Calcul financier ou champ montant détecté.
- Action cible: Acceptable seulement si c’est dans un moteur runtime générique ou une règle documentée.

#### src/runtime/interventions/RuntimeInterventionTotalsService.ts:155

- Type: manual-amount-calculation
- Match: `montantTTC`
- Code: `const montantTTC =`
- Diagnostic: Calcul financier ou champ montant détecté.
- Action cible: Acceptable seulement si c’est dans un moteur runtime générique ou une règle documentée.

#### src/runtime/interventions/RuntimeInterventionTotalsService.ts:161

- Type: manual-amount-calculation
- Match: `montantHT`
- Code: `totals.coutPieces += montantHT;`
- Diagnostic: Calcul financier ou champ montant détecté.
- Action cible: Acceptable seulement si c’est dans un moteur runtime générique ou une règle documentée.

#### src/runtime/interventions/RuntimeInterventionTotalsService.ts:166

- Type: manual-amount-calculation
- Match: `montantHT`
- Code: `totals.coutMainOeuvre += montantHT;`
- Diagnostic: Calcul financier ou champ montant détecté.
- Action cible: Acceptable seulement si c’est dans un moteur runtime générique ou une règle documentée.

#### src/runtime/interventions/RuntimeInterventionTotalsService.ts:169

- Type: manual-amount-calculation
- Match: `montantHT`
- Code: `totals.montantHT += montantHT;`
- Diagnostic: Calcul financier ou champ montant détecté.
- Action cible: Acceptable seulement si c’est dans un moteur runtime générique ou une règle documentée.

#### src/runtime/interventions/RuntimeInterventionTotalsService.ts:169

- Type: manual-amount-calculation
- Match: `montantHT`
- Code: `totals.montantHT += montantHT;`
- Diagnostic: Calcul financier ou champ montant détecté.
- Action cible: Acceptable seulement si c’est dans un moteur runtime générique ou une règle documentée.

#### src/runtime/interventions/RuntimeInterventionTotalsService.ts:171

- Type: manual-amount-calculation
- Match: `montantTTC`
- Code: `totals.montantTTC += montantTTC;`
- Diagnostic: Calcul financier ou champ montant détecté.
- Action cible: Acceptable seulement si c’est dans un moteur runtime générique ou une règle documentée.

#### src/runtime/interventions/RuntimeInterventionTotalsService.ts:171

- Type: manual-amount-calculation
- Match: `montantTTC`
- Code: `totals.montantTTC += montantTTC;`
- Diagnostic: Calcul financier ou champ montant détecté.
- Action cible: Acceptable seulement si c’est dans un moteur runtime générique ou une règle documentée.

#### src/runtime/interventions/RuntimeInterventionTotalsService.ts:174

- Type: manual-amount-calculation
- Match: `montantHT`
- Code: `totals.coutTotal += montantHT;`
- Diagnostic: Calcul financier ou champ montant détecté.
- Action cible: Acceptable seulement si c’est dans un moteur runtime générique ou une règle documentée.

#### src/runtime/interventions/RuntimeInterventionTotalsService.ts:182

- Type: manual-amount-calculation
- Match: `montantHT`
- Code: `montantHT: 0,`
- Diagnostic: Calcul financier ou champ montant détecté.
- Action cible: Acceptable seulement si c’est dans un moteur runtime générique ou une règle documentée.

#### src/runtime/interventions/RuntimeInterventionTotalsService.ts:184

- Type: manual-amount-calculation
- Match: `montantTTC`
- Code: `montantTTC: 0,`
- Diagnostic: Calcul financier ou champ montant détecté.
- Action cible: Acceptable seulement si c’est dans un moteur runtime générique ou une règle documentée.

#### src/runtime/interventions/RuntimeInterventionTotalsService.ts:196

- Type: manual-amount-calculation
- Match: `montantHT`
- Code: `montantHT: roundMoney(totals.montantHT),`
- Diagnostic: Calcul financier ou champ montant détecté.
- Action cible: Acceptable seulement si c’est dans un moteur runtime générique ou une règle documentée.

#### src/runtime/interventions/RuntimeInterventionTotalsService.ts:196

- Type: manual-amount-calculation
- Match: `montantHT`
- Code: `montantHT: roundMoney(totals.montantHT),`
- Diagnostic: Calcul financier ou champ montant détecté.
- Action cible: Acceptable seulement si c’est dans un moteur runtime générique ou une règle documentée.

#### src/runtime/interventions/RuntimeInterventionTotalsService.ts:198

- Type: manual-amount-calculation
- Match: `montantTTC`
- Code: `montantTTC: roundMoney(totals.montantTTC),`
- Diagnostic: Calcul financier ou champ montant détecté.
- Action cible: Acceptable seulement si c’est dans un moteur runtime générique ou une règle documentée.

#### src/runtime/interventions/RuntimeInterventionTotalsService.ts:198

- Type: manual-amount-calculation
- Match: `montantTTC`
- Code: `montantTTC: roundMoney(totals.montantTTC),`
- Diagnostic: Calcul financier ou champ montant détecté.
- Action cible: Acceptable seulement si c’est dans un moteur runtime générique ou une règle documentée.

#### src/runtime/interventions/RuntimeInterventionTotalsService.ts:257

- Type: manual-amount-calculation
- Match: `montantHT`
- Code: `montantHT: totals.montantHT,`
- Diagnostic: Calcul financier ou champ montant détecté.
- Action cible: Acceptable seulement si c’est dans un moteur runtime générique ou une règle documentée.

#### src/runtime/interventions/RuntimeInterventionTotalsService.ts:257

- Type: manual-amount-calculation
- Match: `montantHT`
- Code: `montantHT: totals.montantHT,`
- Diagnostic: Calcul financier ou champ montant détecté.
- Action cible: Acceptable seulement si c’est dans un moteur runtime générique ou une règle documentée.

#### src/runtime/interventions/RuntimeInterventionTotalsService.ts:259

- Type: manual-amount-calculation
- Match: `montantTTC`
- Code: `montantTTC: totals.montantTTC,`
- Diagnostic: Calcul financier ou champ montant détecté.
- Action cible: Acceptable seulement si c’est dans un moteur runtime générique ou une règle documentée.

#### src/runtime/interventions/RuntimeInterventionTotalsService.ts:259

- Type: manual-amount-calculation
- Match: `montantTTC`
- Code: `montantTTC: totals.montantTTC,`
- Diagnostic: Calcul financier ou champ montant détecté.
- Action cible: Acceptable seulement si c’est dans un moteur runtime générique ou une règle documentée.

#### src/runtime/line-items/RuntimeLineItemEngine.ts:11

- Type: manual-amount-calculation
- Match: `prixUnitaireHT`
- Code: `prixUnitaireHT?: unknown;`
- Diagnostic: Calcul financier ou champ montant détecté.
- Action cible: Acceptable seulement si c’est dans un moteur runtime générique ou une règle documentée.

#### src/runtime/line-items/RuntimeLineItemEngine.ts:13

- Type: manual-amount-calculation
- Match: `tauxTVA`
- Code: `tauxTVA?: unknown;`
- Diagnostic: Calcul financier ou champ montant détecté.
- Action cible: Acceptable seulement si c’est dans un moteur runtime générique ou une règle documentée.

#### src/runtime/line-items/RuntimeLineItemEngine.ts:26

- Type: manual-amount-calculation
- Match: `prixUnitaireHT`
- Code: `prixUnitaireHT?: unknown;`
- Diagnostic: Calcul financier ou champ montant détecté.
- Action cible: Acceptable seulement si c’est dans un moteur runtime générique ou une règle documentée.

#### src/runtime/line-items/RuntimeLineItemEngine.ts:27

- Type: manual-amount-calculation
- Match: `tauxTVA`
- Code: `tauxTVA?: unknown;`
- Diagnostic: Calcul financier ou champ montant détecté.
- Action cible: Acceptable seulement si c’est dans un moteur runtime générique ou une règle documentée.

#### src/runtime/line-items/RuntimeLineItemEngine.ts:28

- Type: manual-amount-calculation
- Match: `montantHT`
- Code: `montantHT?: unknown;`
- Diagnostic: Calcul financier ou champ montant détecté.
- Action cible: Acceptable seulement si c’est dans un moteur runtime générique ou une règle documentée.

#### src/runtime/line-items/RuntimeLineItemEngine.ts:30

- Type: manual-amount-calculation
- Match: `montantTTC`
- Code: `montantTTC?: unknown;`
- Diagnostic: Calcul financier ou champ montant détecté.
- Action cible: Acceptable seulement si c’est dans un moteur runtime générique ou une règle documentée.

#### src/runtime/line-items/RuntimeLineItemEngine.ts:96

- Type: manual-amount-calculation
- Match: `prixUnitaireHT`
- Code: `product.prixUnitaireHT,`
- Diagnostic: Calcul financier ou champ montant détecté.
- Action cible: Acceptable seulement si c’est dans un moteur runtime générique ou une règle documentée.

#### src/runtime/line-items/RuntimeLineItemEngine.ts:176

- Type: manual-amount-calculation
- Match: `prixUnitaireHT`
- Code: `next.prixUnitaireHT ?? next.prixUnitaire,`
- Diagnostic: Calcul financier ou champ montant détecté.
- Action cible: Acceptable seulement si c’est dans un moteur runtime générique ou une règle documentée.

#### src/runtime/line-items/RuntimeLineItemEngine.ts:189

- Type: manual-amount-calculation
- Match: `tauxTVA`
- Code: `toNumber(product?.tauxTVA, 18);`
- Diagnostic: Calcul financier ou champ montant détecté.
- Action cible: Acceptable seulement si c’est dans un moteur runtime générique ou une règle documentée.

#### src/runtime/line-items/RuntimeLineItemEngine.ts:192

- Type: manual-amount-calculation
- Match: `tauxTVA`
- Code: `toNumber(next.tauxTVA, Number.NaN);`
- Diagnostic: Calcul financier ou champ montant détecté.
- Action cible: Acceptable seulement si c’est dans un moteur runtime générique ou une règle documentée.

#### src/runtime/line-items/RuntimeLineItemEngine.ts:199

- Type: manual-amount-calculation
- Match: `montantHT`
- Code: `const montantHT =`
- Diagnostic: Calcul financier ou champ montant détecté.
- Action cible: Acceptable seulement si c’est dans un moteur runtime générique ou une règle documentée.

#### src/runtime/line-items/RuntimeLineItemEngine.ts:203

- Type: manual-amount-calculation
- Match: `montantHT`
- Code: `Math.round((montantHT * taxRate / 100) * 100) / 100;`
- Diagnostic: Calcul financier ou champ montant détecté.
- Action cible: Acceptable seulement si c’est dans un moteur runtime générique ou une règle documentée.

#### src/runtime/line-items/RuntimeLineItemEngine.ts:205

- Type: manual-amount-calculation
- Match: `montantTTC`
- Code: `const montantTTC =`
- Diagnostic: Calcul financier ou champ montant détecté.
- Action cible: Acceptable seulement si c’est dans un moteur runtime générique ou une règle documentée.

#### src/runtime/line-items/RuntimeLineItemEngine.ts:206

- Type: manual-amount-calculation
- Match: `montantHT`
- Code: `Math.round((montantHT + montantTVA) * 100) / 100;`
- Diagnostic: Calcul financier ou champ montant détecté.
- Action cible: Acceptable seulement si c’est dans un moteur runtime générique ou une règle documentée.

#### src/runtime/line-items/RuntimeLineItemEngine.ts:224

- Type: manual-amount-calculation
- Match: `prixUnitaireHT`
- Code: `next.prixUnitaireHT = unitPriceHT;`
- Diagnostic: Calcul financier ou champ montant détecté.
- Action cible: Acceptable seulement si c’est dans un moteur runtime générique ou une règle documentée.

#### src/runtime/line-items/RuntimeLineItemEngine.ts:227

- Type: manual-amount-calculation
- Match: `tauxTVA`
- Code: `next.tauxTVA = taxRate;`
- Diagnostic: Calcul financier ou champ montant détecté.
- Action cible: Acceptable seulement si c’est dans un moteur runtime générique ou une règle documentée.

#### src/runtime/line-items/RuntimeLineItemEngine.ts:228

- Type: manual-amount-calculation
- Match: `montantHT`
- Code: `next.montantHT = montantHT;`
- Diagnostic: Calcul financier ou champ montant détecté.
- Action cible: Acceptable seulement si c’est dans un moteur runtime générique ou une règle documentée.

#### src/runtime/line-items/RuntimeLineItemEngine.ts:228

- Type: manual-amount-calculation
- Match: `montantHT`
- Code: `next.montantHT = montantHT;`
- Diagnostic: Calcul financier ou champ montant détecté.
- Action cible: Acceptable seulement si c’est dans un moteur runtime générique ou une règle documentée.

#### src/runtime/line-items/RuntimeLineItemEngine.ts:230

- Type: manual-amount-calculation
- Match: `montantTTC`
- Code: `next.montantTTC = montantTTC;`
- Diagnostic: Calcul financier ou champ montant détecté.
- Action cible: Acceptable seulement si c’est dans un moteur runtime générique ou une règle documentée.

#### src/runtime/line-items/RuntimeLineItemEngine.ts:230

- Type: manual-amount-calculation
- Match: `montantTTC`
- Code: `next.montantTTC = montantTTC;`
- Diagnostic: Calcul financier ou champ montant détecté.
- Action cible: Acceptable seulement si c’est dans un moteur runtime générique ou une règle documentée.

#### src/runtime/line-items/RuntimeLineItemEngine.ts:233

- Type: manual-amount-calculation
- Match: `montantHT`
- Code: `next.montantTotal = montantHT;`
- Diagnostic: Calcul financier ou champ montant détecté.
- Action cible: Acceptable seulement si c’est dans un moteur runtime générique ou une règle documentée.

#### src/runtime/modules/factory/businessFields.ts:40

- Type: manual-amount-calculation
- Match: `montantHT`
- Code: `{ key: "montantHT", label: "Montant HT", type: "number", sortable: true },`
- Diagnostic: Calcul financier ou champ montant détecté.
- Action cible: Acceptable seulement si c’est dans un moteur runtime générique ou une règle documentée.

#### src/runtime/modules/factory/businessFields.ts:41

- Type: manual-amount-calculation
- Match: `montantTTC`
- Code: `{ key: "montantTTC", label: "Montant TTC", type: "number", sortable: true },`
- Diagnostic: Calcul financier ou champ montant détecté.
- Action cible: Acceptable seulement si c’est dans un moteur runtime générique ou une règle documentée.

#### src/runtime/modules/factory/businessFields.ts:126

- Type: manual-amount-calculation
- Match: `montantHT`
- Code: `{ key: "montantHT", label: "Montant HT", type: "number" },`
- Diagnostic: Calcul financier ou champ montant détecté.
- Action cible: Acceptable seulement si c’est dans un moteur runtime générique ou une règle documentée.

#### src/runtime/modules/factory/businessFields.ts:127

- Type: manual-amount-calculation
- Match: `montantTTC`
- Code: `{ key: "montantTTC", label: "Montant TTC", type: "number" },`
- Diagnostic: Calcul financier ou champ montant détecté.
- Action cible: Acceptable seulement si c’est dans un moteur runtime générique ou une règle documentée.

#### src/runtime/modules/lifecycle/ERPRelationDataLoader.ts:621

- Type: manual-amount-calculation
- Match: `montantTTC`
- Code: `money("montantTTC") || money("montant") || money("resteAPayer"),`
- Diagnostic: Calcul financier ou champ montant détecté.
- Action cible: Vérifier si le calcul passe par RuntimeComputedFieldsEngine.

#### src/runtime/modules/lifecycle/ERPRelationDataLoader.ts:672

- Type: manual-amount-calculation
- Match: `montantTTC`
- Code: `const montantTTC =`
- Diagnostic: Calcul financier ou champ montant détecté.
- Action cible: Vérifier si le calcul passe par RuntimeComputedFieldsEngine.

#### src/runtime/modules/lifecycle/ERPRelationDataLoader.ts:673

- Type: manual-amount-calculation
- Match: `montantTTC`
- Code: `money("montantTTC");`
- Diagnostic: Calcul financier ou champ montant détecté.
- Action cible: Vérifier si le calcul passe par RuntimeComputedFieldsEngine.

#### src/runtime/modules/lifecycle/ERPRelationDataLoader.ts:721

- Type: manual-amount-calculation
- Match: `montantTTC`
- Code: `montantTTC ||`
- Diagnostic: Calcul financier ou champ montant détecté.
- Action cible: Vérifier si le calcul passe par RuntimeComputedFieldsEngine.

### OK_METADATA

#### src/runtime/modules/definitions/coreModules.ts:1

- Type: hardcoded-business-module
- Match: `receptionsstockauto`
- Code: `import { receptionsstockautoModule } from "@/runtime/modules/generated/receptionsstockauto";`
- Diagnostic: Nom de module métier codé en dur.
- Action cible: Acceptable si c’est déclaratif. Vérifier qu’il n’y a pas de logique exécutable.

#### src/runtime/modules/definitions/coreModules.ts:2

- Type: hardcoded-business-module
- Match: `lignescommandestockauto`
- Code: `import { lignescommandestockautoModule } from "@/runtime/modules/generated/lignescommandestockauto";`
- Diagnostic: Nom de module métier codé en dur.
- Action cible: Acceptable si c’est déclaratif. Vérifier qu’il n’y a pas de logique exécutable.

#### src/runtime/modules/definitions/coreModules.ts:3

- Type: hardcoded-business-module
- Match: `commandesstockauto`
- Code: `import { commandesstockautoModule } from "@/runtime/modules/generated/commandesstockauto";`
- Diagnostic: Nom de module métier codé en dur.
- Action cible: Acceptable si c’est déclaratif. Vérifier qu’il n’y a pas de logique exécutable.

#### src/runtime/modules/definitions/coreModules.ts:7

- Type: hardcoded-business-module
- Match: `mouvementsstockauto`
- Code: `import { mouvementsstockautoModule } from "@/runtime/modules/generated/mouvementsstockauto";`
- Diagnostic: Nom de module métier codé en dur.
- Action cible: Acceptable si c’est déclaratif. Vérifier qu’il n’y a pas de logique exécutable.

#### src/runtime/modules/definitions/coreModules.ts:10

- Type: hardcoded-business-module
- Match: `encaissementsauto`
- Code: `import { encaissementsautoModule } from "@/runtime/modules/generated/encaissementsauto";`
- Diagnostic: Nom de module métier codé en dur.
- Action cible: Acceptable si c’est déclaratif. Vérifier qu’il n’y a pas de logique exécutable.

#### src/runtime/modules/definitions/coreModules.ts:11

- Type: hardcoded-business-module
- Match: `facturesauto`
- Code: `import { facturesautoModule } from "@/runtime/modules/generated/facturesauto";`
- Diagnostic: Nom de module métier codé en dur.
- Action cible: Acceptable si c’est déclaratif. Vérifier qu’il n’y a pas de logique exécutable.

#### src/runtime/modules/definitions/coreModules.ts:12

- Type: hardcoded-business-module
- Match: `interventionsauto`
- Code: `import { interventionsautoModule } from "@/runtime/modules/generated/interventionsauto";`
- Diagnostic: Nom de module métier codé en dur.
- Action cible: Acceptable si c’est déclaratif. Vérifier qu’il n’y a pas de logique exécutable.

#### src/runtime/modules/definitions/coreModules.ts:13

- Type: hardcoded-business-module
- Match: `lignesinterventionauto`
- Code: `import { lignesinterventionautoModule } from "@/runtime/modules/generated/lignesinterventionauto";`
- Diagnostic: Nom de module métier codé en dur.
- Action cible: Acceptable si c’est déclaratif. Vérifier qu’il n’y a pas de logique exécutable.

#### src/runtime/modules/definitions/coreModules.ts:15

- Type: hardcoded-business-module
- Match: `vehicules`
- Code: `import { vehiculesModule } from "@/runtime/modules/generated/vehicules";`
- Diagnostic: Nom de module métier codé en dur.
- Action cible: Acceptable si c’est déclaratif. Vérifier qu’il n’y a pas de logique exécutable.

#### src/runtime/modules/definitions/coreModules.ts:16

- Type: hardcoded-business-module
- Match: `clientsauto`
- Code: `import { clientsautoModule } from "@/runtime/modules/generated/clientsauto";`
- Diagnostic: Nom de module métier codé en dur.
- Action cible: Acceptable si c’est déclaratif. Vérifier qu’il n’y a pas de logique exécutable.

#### src/runtime/modules/definitions/coreModules.ts:119

- Type: hardcoded-business-module
- Match: `vehicules`
- Code: `key: "vehicules",`
- Diagnostic: Nom de module métier codé en dur.
- Action cible: Acceptable si c’est déclaratif. Vérifier qu’il n’y a pas de logique exécutable.

#### src/runtime/modules/generated/clientsauto/clientsauto.module.ts:5

- Type: hardcoded-business-module
- Match: `clientsauto`
- Code: `key: "clientsauto",`
- Diagnostic: Nom de module métier codé en dur.
- Action cible: Acceptable si c’est déclaratif. Vérifier qu’il n’y a pas de logique exécutable.

#### src/runtime/modules/generated/clientsauto/clientsauto.module.ts:23

- Type: hardcoded-business-module
- Match: `clientsauto`
- Code: `collection: "clientsauto",`
- Diagnostic: Nom de module métier codé en dur.
- Action cible: Acceptable si c’est déclaratif. Vérifier qu’il n’y a pas de logique exécutable.

#### src/runtime/modules/generated/clientsauto/clientsauto.module.ts:193

- Type: hardcoded-business-module
- Match: `vehicules`
- Code: `key:"vehicules",`
- Diagnostic: Nom de module métier codé en dur.
- Action cible: Acceptable si c’est déclaratif. Vérifier qu’il n’y a pas de logique exécutable.

#### src/runtime/modules/generated/clientsauto/clientsauto.module.ts:196

- Type: hardcoded-business-module
- Match: `vehicules`
- Code: `"vehicules"`
- Diagnostic: Nom de module métier codé en dur.
- Action cible: Acceptable si c’est déclaratif. Vérifier qu’il n’y a pas de logique exécutable.

#### src/runtime/modules/generated/clientsauto/clientsauto.module.ts:203

- Type: hardcoded-business-module
- Match: `vehicules`
- Code: `"vehicules"`
- Diagnostic: Nom de module métier codé en dur.
- Action cible: Acceptable si c’est déclaratif. Vérifier qu’il n’y a pas de logique exécutable.

#### src/runtime/modules/generated/clientsauto/clientsauto.module.ts:238

- Type: hardcoded-business-module
- Match: `vehicules`
- Code: `key: "vehicules",`
- Diagnostic: Nom de module métier codé en dur.
- Action cible: Acceptable si c’est déclaratif. Vérifier qu’il n’y a pas de logique exécutable.

#### src/runtime/modules/generated/clientsauto/clientsauto.module.ts:239

- Type: hardcoded-business-module
- Match: `vehicules`
- Code: `moduleKey: "vehicules",`
- Diagnostic: Nom de module métier codé en dur.
- Action cible: Acceptable si c’est déclaratif. Vérifier qu’il n’y a pas de logique exécutable.

#### src/runtime/modules/generated/clientsauto/index.ts:1

- Type: hardcoded-business-module
- Match: `clientsauto`
- Code: `export * from "./clientsauto.module";`
- Diagnostic: Nom de module métier codé en dur.
- Action cible: Acceptable si c’est déclaratif. Vérifier qu’il n’y a pas de logique exécutable.

#### src/runtime/modules/generated/clientsauto/index.ts:2

- Type: hardcoded-business-module
- Match: `clientsauto`
- Code: `export * from "./clientsauto.actions";`
- Diagnostic: Nom de module métier codé en dur.
- Action cible: Acceptable si c’est déclaratif. Vérifier qu’il n’y a pas de logique exécutable.

#### src/runtime/modules/generated/clientsauto/index.ts:3

- Type: hardcoded-business-module
- Match: `clientsauto`
- Code: `export * from "./clientsauto.workflows";`
- Diagnostic: Nom de module métier codé en dur.
- Action cible: Acceptable si c’est déclaratif. Vérifier qu’il n’y a pas de logique exécutable.

#### src/runtime/modules/generated/clientsauto/index.ts:4

- Type: hardcoded-business-module
- Match: `clientsauto`
- Code: `export * from "./clientsauto.permissions";`
- Diagnostic: Nom de module métier codé en dur.
- Action cible: Acceptable si c’est déclaratif. Vérifier qu’il n’y a pas de logique exécutable.

#### src/runtime/modules/generated/clientsauto/index.ts:5

- Type: hardcoded-business-module
- Match: `clientsauto`
- Code: `export * from "./clientsauto.automation";`
- Diagnostic: Nom de module métier codé en dur.
- Action cible: Acceptable si c’est déclaratif. Vérifier qu’il n’y a pas de logique exécutable.

#### src/runtime/modules/generated/clientsauto/index.ts:6

- Type: hardcoded-business-module
- Match: `clientsauto`
- Code: `export * from "./clientsauto.dashboard";`
- Diagnostic: Nom de module métier codé en dur.
- Action cible: Acceptable si c’est déclaratif. Vérifier qu’il n’y a pas de logique exécutable.

#### src/runtime/modules/generated/commandesstockauto/commandesstockauto.module.ts:5

- Type: hardcoded-business-module
- Match: `commandesstockauto`
- Code: `key: "commandesstockauto",`
- Diagnostic: Nom de module métier codé en dur.
- Action cible: Acceptable si c’est déclaratif. Vérifier qu’il n’y a pas de logique exécutable.

#### src/runtime/modules/generated/commandesstockauto/commandesstockauto.module.ts:23

- Type: hardcoded-business-module
- Match: `commandesstockauto`
- Code: `collection: "commandesstockauto",`
- Diagnostic: Nom de module métier codé en dur.
- Action cible: Acceptable si c’est déclaratif. Vérifier qu’il n’y a pas de logique exécutable.

#### src/runtime/modules/generated/commandesstockauto/commandesstockauto.module.ts:138

- Type: hardcoded-business-module
- Match: `lignescommandestockauto`
- Code: `moduleKey: "lignescommandestockauto",`
- Diagnostic: Nom de module métier codé en dur.
- Action cible: Acceptable si c’est déclaratif. Vérifier qu’il n’y a pas de logique exécutable.

#### src/runtime/modules/generated/commandesstockauto/commandesstockauto.module.ts:149

- Type: hardcoded-business-module
- Match: `receptionsstockauto`
- Code: `moduleKey: "receptionsstockauto",`
- Diagnostic: Nom de module métier codé en dur.
- Action cible: Acceptable si c’est déclaratif. Vérifier qu’il n’y a pas de logique exécutable.

#### src/runtime/modules/generated/commandesstockauto/commandesstockauto.module.ts:58

- Type: manual-amount-calculation
- Match: `montantHT`
- Code: `key: "montantHT",`
- Diagnostic: Calcul financier ou champ montant détecté.
- Action cible: Acceptable si c’est déclaratif. Vérifier qu’il n’y a pas de logique exécutable.

#### src/runtime/modules/generated/commandesstockauto/commandesstockauto.module.ts:66

- Type: manual-amount-calculation
- Match: `montantTTC`
- Code: `key: "montantTTC",`
- Diagnostic: Calcul financier ou champ montant détecté.
- Action cible: Acceptable si c’est déclaratif. Vérifier qu’il n’y a pas de logique exécutable.

#### src/runtime/modules/generated/commandesstockauto/commandesstockauto.module.ts:108

- Type: manual-amount-calculation
- Match: `montantHT`
- Code: `"montantHT",`
- Diagnostic: Calcul financier ou champ montant détecté.
- Action cible: Acceptable si c’est déclaratif. Vérifier qu’il n’y a pas de logique exécutable.

#### src/runtime/modules/generated/commandesstockauto/commandesstockauto.module.ts:109

- Type: manual-amount-calculation
- Match: `montantTTC`
- Code: `"montantTTC",`
- Diagnostic: Calcul financier ou champ montant détecté.
- Action cible: Acceptable si c’est déclaratif. Vérifier qu’il n’y a pas de logique exécutable.

#### src/runtime/modules/generated/commandesstockauto/commandesstockauto.module.ts:122

- Type: manual-amount-calculation
- Match: `montantHT`
- Code: `"montantHT",`
- Diagnostic: Calcul financier ou champ montant détecté.
- Action cible: Acceptable si c’est déclaratif. Vérifier qu’il n’y a pas de logique exécutable.

#### src/runtime/modules/generated/commandesstockauto/commandesstockauto.module.ts:123

- Type: manual-amount-calculation
- Match: `montantTTC`
- Code: `"montantTTC",`
- Diagnostic: Calcul financier ou champ montant détecté.
- Action cible: Acceptable si c’est déclaratif. Vérifier qu’il n’y a pas de logique exécutable.

#### src/runtime/modules/generated/commandesstockauto/commandesstockauto.module.ts:145

- Type: manual-amount-calculation
- Match: `quantiteCommandee`
- Code: `labelFields: ["produitId", "quantiteCommandee", "prixUnitaireHT", "statut"],`
- Diagnostic: Calcul financier ou champ montant détecté.
- Action cible: Acceptable si c’est déclaratif. Vérifier qu’il n’y a pas de logique exécutable.

#### src/runtime/modules/generated/commandesstockauto/commandesstockauto.module.ts:145

- Type: manual-amount-calculation
- Match: `prixUnitaireHT`
- Code: `labelFields: ["produitId", "quantiteCommandee", "prixUnitaireHT", "statut"],`
- Diagnostic: Calcul financier ou champ montant détecté.
- Action cible: Acceptable si c’est déclaratif. Vérifier qu’il n’y a pas de logique exécutable.

#### src/runtime/modules/generated/commandesstockauto/index.ts:1

- Type: hardcoded-business-module
- Match: `commandesstockauto`
- Code: `export { commandesstockautoModule } from "./commandesstockauto.module";`
- Diagnostic: Nom de module métier codé en dur.
- Action cible: Acceptable si c’est déclaratif. Vérifier qu’il n’y a pas de logique exécutable.

#### src/runtime/modules/generated/echeancespaiementauto/echeancespaiementauto.module.ts:37

- Type: hardcoded-business-module
- Match: `facturesauto`
- Code: `module: "facturesauto",`
- Diagnostic: Nom de module métier codé en dur.
- Action cible: Acceptable si c’est déclaratif. Vérifier qu’il n’y a pas de logique exécutable.

#### src/runtime/modules/generated/echeancespaiementauto/echeancespaiementauto.module.ts:49

- Type: hardcoded-business-module
- Match: `clientsauto`
- Code: `module: "clientsauto",`
- Diagnostic: Nom de module métier codé en dur.
- Action cible: Acceptable si c’est déclaratif. Vérifier qu’il n’y a pas de logique exécutable.

#### src/runtime/modules/generated/echeancespaiementauto/echeancespaiementauto.module.ts:60

- Type: hardcoded-business-module
- Match: `vehicules`
- Code: `module: "vehicules",`
- Diagnostic: Nom de module métier codé en dur.
- Action cible: Acceptable si c’est déclaratif. Vérifier qu’il n’y a pas de logique exécutable.

#### src/runtime/modules/generated/encaissementsauto/encaissementsauto.actions.ts:10

- Type: hardcoded-business-module
- Match: `encaissementsauto`
- Code: `permission: "encaissementsauto.workflow",`
- Diagnostic: Nom de module métier codé en dur.
- Action cible: Acceptable si c’est déclaratif. Vérifier qu’il n’y a pas de logique exécutable.

#### src/runtime/modules/generated/encaissementsauto/encaissementsauto.actions.ts:16

- Type: hardcoded-business-module
- Match: `encaissementsauto`
- Code: `permission: "encaissementsauto.workflow",`
- Diagnostic: Nom de module métier codé en dur.
- Action cible: Acceptable si c’est déclaratif. Vérifier qu’il n’y a pas de logique exécutable.

#### src/runtime/modules/generated/encaissementsauto/encaissementsauto.actions.ts:22

- Type: hardcoded-business-module
- Match: `encaissementsauto`
- Code: `permission: "encaissementsauto.workflow",`
- Diagnostic: Nom de module métier codé en dur.
- Action cible: Acceptable si c’est déclaratif. Vérifier qu’il n’y a pas de logique exécutable.

#### src/runtime/modules/generated/encaissementsauto/encaissementsauto.module.ts:5

- Type: hardcoded-business-module
- Match: `encaissementsauto`
- Code: `} from "./encaissementsauto.actions";`
- Diagnostic: Nom de module métier codé en dur.
- Action cible: Acceptable si c’est déclaratif. Vérifier qu’il n’y a pas de logique exécutable.

#### src/runtime/modules/generated/encaissementsauto/encaissementsauto.module.ts:9

- Type: hardcoded-business-module
- Match: `encaissementsauto`
- Code: `key: "encaissementsauto",`
- Diagnostic: Nom de module métier codé en dur.
- Action cible: Acceptable si c’est déclaratif. Vérifier qu’il n’y a pas de logique exécutable.

#### src/runtime/modules/generated/encaissementsauto/encaissementsauto.module.ts:29

- Type: hardcoded-business-module
- Match: `encaissementsauto`
- Code: `collection: "encaissementsauto",`
- Diagnostic: Nom de module métier codé en dur.
- Action cible: Acceptable si c’est déclaratif. Vérifier qu’il n’y a pas de logique exécutable.

#### src/runtime/modules/generated/encaissementsauto/encaissementsauto.module.ts:37

- Type: hardcoded-business-module
- Match: `facturesauto`
- Code: `module: "facturesauto",`
- Diagnostic: Nom de module métier codé en dur.
- Action cible: Acceptable si c’est déclaratif. Vérifier qu’il n’y a pas de logique exécutable.

#### src/runtime/modules/generated/encaissementsauto/encaissementsauto.module.ts:49

- Type: hardcoded-business-module
- Match: `clientsauto`
- Code: `module: "clientsauto",`
- Diagnostic: Nom de module métier codé en dur.
- Action cible: Acceptable si c’est déclaratif. Vérifier qu’il n’y a pas de logique exécutable.

#### src/runtime/modules/generated/encaissementsauto/encaissementsauto.module.ts:60

- Type: hardcoded-business-module
- Match: `vehicules`
- Code: `module: "vehicules",`
- Diagnostic: Nom de module métier codé en dur.
- Action cible: Acceptable si c’est déclaratif. Vérifier qu’il n’y a pas de logique exécutable.

#### src/runtime/modules/generated/encaissementsauto/encaissementsauto.module.ts:276

- Type: hardcoded-business-module
- Match: `facturesauto`
- Code: `moduleKey: "facturesauto",`
- Diagnostic: Nom de module métier codé en dur.
- Action cible: Acceptable si c’est déclaratif. Vérifier qu’il n’y a pas de logique exécutable.

#### src/runtime/modules/generated/encaissementsauto/encaissementsauto.module.ts:286

- Type: hardcoded-business-module
- Match: `clientsauto`
- Code: `moduleKey: "clientsauto",`
- Diagnostic: Nom de module métier codé en dur.
- Action cible: Acceptable si c’est déclaratif. Vérifier qu’il n’y a pas de logique exécutable.

#### src/runtime/modules/generated/encaissementsauto/encaissementsauto.module.ts:296

- Type: hardcoded-business-module
- Match: `vehicules`
- Code: `moduleKey: "vehicules",`
- Diagnostic: Nom de module métier codé en dur.
- Action cible: Acceptable si c’est déclaratif. Vérifier qu’il n’y a pas de logique exécutable.

#### src/runtime/modules/generated/encaissementsauto/encaissementsauto.permissions.ts:2

- Type: hardcoded-business-module
- Match: `encaissementsauto`
- Code: `read: "encaissementsauto.read",`
- Diagnostic: Nom de module métier codé en dur.
- Action cible: Acceptable si c’est déclaratif. Vérifier qu’il n’y a pas de logique exécutable.

#### src/runtime/modules/generated/encaissementsauto/encaissementsauto.permissions.ts:3

- Type: hardcoded-business-module
- Match: `encaissementsauto`
- Code: `create: "encaissementsauto.create",`
- Diagnostic: Nom de module métier codé en dur.
- Action cible: Acceptable si c’est déclaratif. Vérifier qu’il n’y a pas de logique exécutable.

#### src/runtime/modules/generated/encaissementsauto/encaissementsauto.permissions.ts:4

- Type: hardcoded-business-module
- Match: `encaissementsauto`
- Code: `update: "encaissementsauto.update",`
- Diagnostic: Nom de module métier codé en dur.
- Action cible: Acceptable si c’est déclaratif. Vérifier qu’il n’y a pas de logique exécutable.

#### src/runtime/modules/generated/encaissementsauto/encaissementsauto.permissions.ts:5

- Type: hardcoded-business-module
- Match: `encaissementsauto`
- Code: `delete: "encaissementsauto.delete",`
- Diagnostic: Nom de module métier codé en dur.
- Action cible: Acceptable si c’est déclaratif. Vérifier qu’il n’y a pas de logique exécutable.

#### src/runtime/modules/generated/encaissementsauto/encaissementsauto.permissions.ts:6

- Type: hardcoded-business-module
- Match: `encaissementsauto`
- Code: `workflow: "encaissementsauto.workflow",`
- Diagnostic: Nom de module métier codé en dur.
- Action cible: Acceptable si c’est déclaratif. Vérifier qu’il n’y a pas de logique exécutable.

#### src/runtime/modules/generated/encaissementsauto/index.ts:1

- Type: hardcoded-business-module
- Match: `encaissementsauto`
- Code: `export * from "./encaissementsauto.module";`
- Diagnostic: Nom de module métier codé en dur.
- Action cible: Acceptable si c’est déclaratif. Vérifier qu’il n’y a pas de logique exécutable.

#### src/runtime/modules/generated/encaissementsauto/index.ts:2

- Type: hardcoded-business-module
- Match: `encaissementsauto`
- Code: `export * from "./encaissementsauto.actions";`
- Diagnostic: Nom de module métier codé en dur.
- Action cible: Acceptable si c’est déclaratif. Vérifier qu’il n’y a pas de logique exécutable.

#### src/runtime/modules/generated/encaissementsauto/index.ts:3

- Type: hardcoded-business-module
- Match: `encaissementsauto`
- Code: `export * from "./encaissementsauto.workflows";`
- Diagnostic: Nom de module métier codé en dur.
- Action cible: Acceptable si c’est déclaratif. Vérifier qu’il n’y a pas de logique exécutable.

#### src/runtime/modules/generated/encaissementsauto/index.ts:4

- Type: hardcoded-business-module
- Match: `encaissementsauto`
- Code: `export * from "./encaissementsauto.permissions";`
- Diagnostic: Nom de module métier codé en dur.
- Action cible: Acceptable si c’est déclaratif. Vérifier qu’il n’y a pas de logique exécutable.

#### src/runtime/modules/generated/encaissementsauto/index.ts:5

- Type: hardcoded-business-module
- Match: `encaissementsauto`
- Code: `export * from "./encaissementsauto.automation";`
- Diagnostic: Nom de module métier codé en dur.
- Action cible: Acceptable si c’est déclaratif. Vérifier qu’il n’y a pas de logique exécutable.

#### src/runtime/modules/generated/encaissementsauto/index.ts:6

- Type: hardcoded-business-module
- Match: `encaissementsauto`
- Code: `export * from "./encaissementsauto.dashboard";`
- Diagnostic: Nom de module métier codé en dur.
- Action cible: Acceptable si c’est déclaratif. Vérifier qu’il n’y a pas de logique exécutable.

#### src/runtime/modules/generated/facturesauto/facturesauto.actions.ts:10

- Type: hardcoded-business-module
- Match: `facturesauto`
- Code: `permission: "facturesauto.workflow",`
- Diagnostic: Nom de module métier codé en dur.
- Action cible: Acceptable si c’est déclaratif. Vérifier qu’il n’y a pas de logique exécutable.

#### src/runtime/modules/generated/facturesauto/facturesauto.actions.ts:16

- Type: hardcoded-business-module
- Match: `facturesauto`
- Code: `permission: "facturesauto.workflow",`
- Diagnostic: Nom de module métier codé en dur.
- Action cible: Acceptable si c’est déclaratif. Vérifier qu’il n’y a pas de logique exécutable.

#### src/runtime/modules/generated/facturesauto/facturesauto.actions.ts:22

- Type: hardcoded-business-module
- Match: `facturesauto`
- Code: `permission: "facturesauto.workflow",`
- Diagnostic: Nom de module métier codé en dur.
- Action cible: Acceptable si c’est déclaratif. Vérifier qu’il n’y a pas de logique exécutable.

#### src/runtime/modules/generated/facturesauto/facturesauto.actions.ts:28

- Type: hardcoded-business-module
- Match: `facturesauto`
- Code: `permission: "facturesauto.workflow",`
- Diagnostic: Nom de module métier codé en dur.
- Action cible: Acceptable si c’est déclaratif. Vérifier qu’il n’y a pas de logique exécutable.

#### src/runtime/modules/generated/facturesauto/facturesauto.actions.ts:34

- Type: hardcoded-business-module
- Match: `facturesauto`
- Code: `permission: "facturesauto.workflow",`
- Diagnostic: Nom de module métier codé en dur.
- Action cible: Acceptable si c’est déclaratif. Vérifier qu’il n’y a pas de logique exécutable.

#### src/runtime/modules/generated/facturesauto/facturesauto.actions.ts:40

- Type: hardcoded-business-module
- Match: `facturesauto`
- Code: `permission: "facturesauto.workflow",`
- Diagnostic: Nom de module métier codé en dur.
- Action cible: Acceptable si c’est déclaratif. Vérifier qu’il n’y a pas de logique exécutable.

#### src/runtime/modules/generated/facturesauto/facturesauto.module.ts:5

- Type: hardcoded-business-module
- Match: `facturesauto`
- Code: `} from "./facturesauto.actions";`
- Diagnostic: Nom de module métier codé en dur.
- Action cible: Acceptable si c’est déclaratif. Vérifier qu’il n’y a pas de logique exécutable.

#### src/runtime/modules/generated/facturesauto/facturesauto.module.ts:9

- Type: hardcoded-business-module
- Match: `facturesauto`
- Code: `key: "facturesauto",`
- Diagnostic: Nom de module métier codé en dur.
- Action cible: Acceptable si c’est déclaratif. Vérifier qu’il n’y a pas de logique exécutable.

#### src/runtime/modules/generated/facturesauto/facturesauto.module.ts:27

- Type: hardcoded-business-module
- Match: `facturesauto`
- Code: `collection: "facturesauto",`
- Diagnostic: Nom de module métier codé en dur.
- Action cible: Acceptable si c’est déclaratif. Vérifier qu’il n’y a pas de logique exécutable.

#### src/runtime/modules/generated/facturesauto/facturesauto.module.ts:78

- Type: hardcoded-business-module
- Match: `clientsauto`
- Code: `module: "clientsauto",`
- Diagnostic: Nom de module métier codé en dur.
- Action cible: Acceptable si c’est déclaratif. Vérifier qu’il n’y a pas de logique exécutable.

#### src/runtime/modules/generated/facturesauto/facturesauto.module.ts:88

- Type: hardcoded-business-module
- Match: `vehicules`
- Code: `module: "vehicules",`
- Diagnostic: Nom de module métier codé en dur.
- Action cible: Acceptable si c’est déclaratif. Vérifier qu’il n’y a pas de logique exécutable.

#### src/runtime/modules/generated/facturesauto/facturesauto.module.ts:98

- Type: hardcoded-business-module
- Match: `interventionsauto`
- Code: `module: "interventionsauto",`
- Diagnostic: Nom de module métier codé en dur.
- Action cible: Acceptable si c’est déclaratif. Vérifier qu’il n’y a pas de logique exécutable.

#### src/runtime/modules/generated/facturesauto/facturesauto.module.ts:332

- Type: hardcoded-business-module
- Match: `clientsauto`
- Code: `moduleKey: "clientsauto",`
- Diagnostic: Nom de module métier codé en dur.
- Action cible: Acceptable si c’est déclaratif. Vérifier qu’il n’y a pas de logique exécutable.

#### src/runtime/modules/generated/facturesauto/facturesauto.module.ts:342

- Type: hardcoded-business-module
- Match: `vehicules`
- Code: `moduleKey: "vehicules",`
- Diagnostic: Nom de module métier codé en dur.
- Action cible: Acceptable si c’est déclaratif. Vérifier qu’il n’y a pas de logique exécutable.

#### src/runtime/modules/generated/facturesauto/facturesauto.module.ts:352

- Type: hardcoded-business-module
- Match: `interventionsauto`
- Code: `moduleKey: "interventionsauto",`
- Diagnostic: Nom de module métier codé en dur.
- Action cible: Acceptable si c’est déclaratif. Vérifier qu’il n’y a pas de logique exécutable.

#### src/runtime/modules/generated/facturesauto/facturesauto.module.ts:104

- Type: manual-amount-calculation
- Match: `montantHT`
- Code: `key: "montantHT",`
- Diagnostic: Calcul financier ou champ montant détecté.
- Action cible: Acceptable si c’est déclaratif. Vérifier qu’il n’y a pas de logique exécutable.

#### src/runtime/modules/generated/facturesauto/facturesauto.module.ts:117

- Type: manual-amount-calculation
- Match: `montantTTC`
- Code: `key: "montantTTC",`
- Diagnostic: Calcul financier ou champ montant détecté.
- Action cible: Acceptable si c’est déclaratif. Vérifier qu’il n’y a pas de logique exécutable.

#### src/runtime/modules/generated/facturesauto/facturesauto.module.ts:121

- Type: manual-amount-calculation
- Match: `montantHT`
- Code: `formula: "montantHT + (montantHT * tva / 100)",`
- Diagnostic: Calcul financier ou champ montant détecté.
- Action cible: Acceptable si c’est déclaratif. Vérifier qu’il n’y a pas de logique exécutable.

#### src/runtime/modules/generated/facturesauto/facturesauto.module.ts:121

- Type: manual-amount-calculation
- Match: `montantHT`
- Code: `formula: "montantHT + (montantHT * tva / 100)",`
- Diagnostic: Calcul financier ou champ montant détecté.
- Action cible: Acceptable si c’est déclaratif. Vérifier qu’il n’y a pas de logique exécutable.

#### src/runtime/modules/generated/facturesauto/facturesauto.module.ts:122

- Type: manual-amount-calculation
- Match: `montantHT`
- Code: `dependsOn: ["montantHT", "tva"],`
- Diagnostic: Calcul financier ou champ montant détecté.
- Action cible: Acceptable si c’est déclaratif. Vérifier qu’il n’y a pas de logique exécutable.

#### src/runtime/modules/generated/facturesauto/facturesauto.module.ts:261

- Type: manual-amount-calculation
- Match: `montantHT`
- Code: `"montantHT",`
- Diagnostic: Calcul financier ou champ montant détecté.
- Action cible: Acceptable si c’est déclaratif. Vérifier qu’il n’y a pas de logique exécutable.

#### src/runtime/modules/generated/facturesauto/facturesauto.module.ts:263

- Type: manual-amount-calculation
- Match: `montantTTC`
- Code: `"montantTTC",`
- Diagnostic: Calcul financier ou champ montant détecté.
- Action cible: Acceptable si c’est déclaratif. Vérifier qu’il n’y a pas de logique exécutable.

#### src/runtime/modules/generated/facturesauto/facturesauto.module.ts:272

- Type: manual-amount-calculation
- Match: `montantHT`
- Code: `"montantHT",`
- Diagnostic: Calcul financier ou champ montant détecté.
- Action cible: Acceptable si c’est déclaratif. Vérifier qu’il n’y a pas de logique exécutable.

#### src/runtime/modules/generated/facturesauto/facturesauto.module.ts:274

- Type: manual-amount-calculation
- Match: `montantTTC`
- Code: `"montantTTC",`
- Diagnostic: Calcul financier ou champ montant détecté.
- Action cible: Acceptable si c’est déclaratif. Vérifier qu’il n’y a pas de logique exécutable.

#### src/runtime/modules/generated/facturesauto/facturesauto.module.ts:372

- Type: manual-amount-calculation
- Match: `montantTTC`
- Code: `"montantTTC",`
- Diagnostic: Calcul financier ou champ montant détecté.
- Action cible: Acceptable si c’est déclaratif. Vérifier qu’il n’y a pas de logique exécutable.

#### src/runtime/modules/generated/facturesauto/index.ts:1

- Type: hardcoded-business-module
- Match: `facturesauto`
- Code: `export * from "./facturesauto.module";`
- Diagnostic: Nom de module métier codé en dur.
- Action cible: Acceptable si c’est déclaratif. Vérifier qu’il n’y a pas de logique exécutable.

#### src/runtime/modules/generated/facturesauto/index.ts:2

- Type: hardcoded-business-module
- Match: `facturesauto`
- Code: `export * from "./facturesauto.actions";`
- Diagnostic: Nom de module métier codé en dur.
- Action cible: Acceptable si c’est déclaratif. Vérifier qu’il n’y a pas de logique exécutable.

#### src/runtime/modules/generated/facturesauto/index.ts:3

- Type: hardcoded-business-module
- Match: `facturesauto`
- Code: `export * from "./facturesauto.workflows";`
- Diagnostic: Nom de module métier codé en dur.
- Action cible: Acceptable si c’est déclaratif. Vérifier qu’il n’y a pas de logique exécutable.

#### src/runtime/modules/generated/facturesauto/index.ts:4

- Type: hardcoded-business-module
- Match: `facturesauto`
- Code: `export * from "./facturesauto.permissions";`
- Diagnostic: Nom de module métier codé en dur.
- Action cible: Acceptable si c’est déclaratif. Vérifier qu’il n’y a pas de logique exécutable.

#### src/runtime/modules/generated/facturesauto/index.ts:5

- Type: hardcoded-business-module
- Match: `facturesauto`
- Code: `export * from "./facturesauto.automation";`
- Diagnostic: Nom de module métier codé en dur.
- Action cible: Acceptable si c’est déclaratif. Vérifier qu’il n’y a pas de logique exécutable.

#### src/runtime/modules/generated/facturesauto/index.ts:6

- Type: hardcoded-business-module
- Match: `facturesauto`
- Code: `export * from "./facturesauto.dashboard";`
- Diagnostic: Nom de module métier codé en dur.
- Action cible: Acceptable si c’est déclaratif. Vérifier qu’il n’y a pas de logique exécutable.

#### src/runtime/modules/generated/interventionsauto/index.ts:1

- Type: hardcoded-business-module
- Match: `interventionsauto`
- Code: `export * from "./interventionsauto.module";`
- Diagnostic: Nom de module métier codé en dur.
- Action cible: Acceptable si c’est déclaratif. Vérifier qu’il n’y a pas de logique exécutable.

#### src/runtime/modules/generated/interventionsauto/index.ts:2

- Type: hardcoded-business-module
- Match: `interventionsauto`
- Code: `export * from "./interventionsauto.actions";`
- Diagnostic: Nom de module métier codé en dur.
- Action cible: Acceptable si c’est déclaratif. Vérifier qu’il n’y a pas de logique exécutable.

#### src/runtime/modules/generated/interventionsauto/index.ts:3

- Type: hardcoded-business-module
- Match: `interventionsauto`
- Code: `export * from "./interventionsauto.workflows";`
- Diagnostic: Nom de module métier codé en dur.
- Action cible: Acceptable si c’est déclaratif. Vérifier qu’il n’y a pas de logique exécutable.

#### src/runtime/modules/generated/interventionsauto/index.ts:4

- Type: hardcoded-business-module
- Match: `interventionsauto`
- Code: `export * from "./interventionsauto.permissions";`
- Diagnostic: Nom de module métier codé en dur.
- Action cible: Acceptable si c’est déclaratif. Vérifier qu’il n’y a pas de logique exécutable.

#### src/runtime/modules/generated/interventionsauto/index.ts:5

- Type: hardcoded-business-module
- Match: `interventionsauto`
- Code: `export * from "./interventionsauto.automation";`
- Diagnostic: Nom de module métier codé en dur.
- Action cible: Acceptable si c’est déclaratif. Vérifier qu’il n’y a pas de logique exécutable.

#### src/runtime/modules/generated/interventionsauto/index.ts:6

- Type: hardcoded-business-module
- Match: `interventionsauto`
- Code: `export * from "./interventionsauto.dashboard";`
- Diagnostic: Nom de module métier codé en dur.
- Action cible: Acceptable si c’est déclaratif. Vérifier qu’il n’y a pas de logique exécutable.

#### src/runtime/modules/generated/interventionsauto/interventionsauto.actions.ts:10

- Type: hardcoded-business-module
- Match: `interventionsauto`
- Code: `permission: "interventionsauto.workflow",`
- Diagnostic: Nom de module métier codé en dur.
- Action cible: Acceptable si c’est déclaratif. Vérifier qu’il n’y a pas de logique exécutable.

#### src/runtime/modules/generated/interventionsauto/interventionsauto.actions.ts:16

- Type: hardcoded-business-module
- Match: `interventionsauto`
- Code: `permission: "interventionsauto.workflow",`
- Diagnostic: Nom de module métier codé en dur.
- Action cible: Acceptable si c’est déclaratif. Vérifier qu’il n’y a pas de logique exécutable.

#### src/runtime/modules/generated/interventionsauto/interventionsauto.actions.ts:22

- Type: hardcoded-business-module
- Match: `interventionsauto`
- Code: `permission: "interventionsauto.workflow",`
- Diagnostic: Nom de module métier codé en dur.
- Action cible: Acceptable si c’est déclaratif. Vérifier qu’il n’y a pas de logique exécutable.

#### src/runtime/modules/generated/interventionsauto/interventionsauto.actions.ts:28

- Type: hardcoded-business-module
- Match: `interventionsauto`
- Code: `permission: "interventionsauto.workflow",`
- Diagnostic: Nom de module métier codé en dur.
- Action cible: Acceptable si c’est déclaratif. Vérifier qu’il n’y a pas de logique exécutable.

#### src/runtime/modules/generated/interventionsauto/interventionsauto.actions.ts:34

- Type: hardcoded-business-module
- Match: `interventionsauto`
- Code: `permission: "interventionsauto.workflow",`
- Diagnostic: Nom de module métier codé en dur.
- Action cible: Acceptable si c’est déclaratif. Vérifier qu’il n’y a pas de logique exécutable.

#### src/runtime/modules/generated/interventionsauto/interventionsauto.module.ts:5

- Type: hardcoded-business-module
- Match: `interventionsauto`
- Code: `} from "./interventionsauto.actions";`
- Diagnostic: Nom de module métier codé en dur.
- Action cible: Acceptable si c’est déclaratif. Vérifier qu’il n’y a pas de logique exécutable.

#### src/runtime/modules/generated/interventionsauto/interventionsauto.module.ts:9

- Type: hardcoded-business-module
- Match: `interventionsauto`
- Code: `key: "interventionsauto",`
- Diagnostic: Nom de module métier codé en dur.
- Action cible: Acceptable si c’est déclaratif. Vérifier qu’il n’y a pas de logique exécutable.

#### src/runtime/modules/generated/interventionsauto/interventionsauto.module.ts:28

- Type: hardcoded-business-module
- Match: `interventionsauto`
- Code: `collection: "interventionsauto",`
- Diagnostic: Nom de module métier codé en dur.
- Action cible: Acceptable si c’est déclaratif. Vérifier qu’il n’y a pas de logique exécutable.

#### src/runtime/modules/generated/interventionsauto/interventionsauto.module.ts:35

- Type: hardcoded-business-module
- Match: `clientsauto`
- Code: `relation: { module: "clientsauto" },`
- Diagnostic: Nom de module métier codé en dur.
- Action cible: Acceptable si c’est déclaratif. Vérifier qu’il n’y a pas de logique exécutable.

#### src/runtime/modules/generated/interventionsauto/interventionsauto.module.ts:45

- Type: hardcoded-business-module
- Match: `vehicules`
- Code: `relation: { module: "vehicules" },`
- Diagnostic: Nom de module métier codé en dur.
- Action cible: Acceptable si c’est déclaratif. Vérifier qu’il n’y a pas de logique exécutable.

#### src/runtime/modules/generated/interventionsauto/interventionsauto.module.ts:224

- Type: hardcoded-business-module
- Match: `clientsauto`
- Code: `moduleKey: "clientsauto",`
- Diagnostic: Nom de module métier codé en dur.
- Action cible: Acceptable si c’est déclaratif. Vérifier qu’il n’y a pas de logique exécutable.

#### src/runtime/modules/generated/interventionsauto/interventionsauto.module.ts:234

- Type: hardcoded-business-module
- Match: `vehicules`
- Code: `moduleKey: "vehicules",`
- Diagnostic: Nom de module métier codé en dur.
- Action cible: Acceptable si c’est déclaratif. Vérifier qu’il n’y a pas de logique exécutable.

#### src/runtime/modules/generated/interventionsauto/interventionsauto.module.ts:265

- Type: hardcoded-business-module
- Match: `clientsauto`
- Code: `moduleKey: "clientsauto",`
- Diagnostic: Nom de module métier codé en dur.
- Action cible: Acceptable si c’est déclaratif. Vérifier qu’il n’y a pas de logique exécutable.

#### src/runtime/modules/generated/interventionsauto/interventionsauto.module.ts:274

- Type: hardcoded-business-module
- Match: `vehicules`
- Code: `moduleKey: "vehicules",`
- Diagnostic: Nom de module métier codé en dur.
- Action cible: Acceptable si c’est déclaratif. Vérifier qu’il n’y a pas de logique exécutable.

#### src/runtime/modules/generated/interventionsauto/interventionsauto.module.ts:295

- Type: hardcoded-business-module
- Match: `clientsauto`
- Code: `moduleKey: "clientsauto",`
- Diagnostic: Nom de module métier codé en dur.
- Action cible: Acceptable si c’est déclaratif. Vérifier qu’il n’y a pas de logique exécutable.

#### src/runtime/modules/generated/interventionsauto/interventionsauto.module.ts:312

- Type: hardcoded-business-module
- Match: `vehicules`
- Code: `moduleKey: "vehicules",`
- Diagnostic: Nom de module métier codé en dur.
- Action cible: Acceptable si c’est déclaratif. Vérifier qu’il n’y a pas de logique exécutable.

#### src/runtime/modules/generated/interventionsauto/interventionsauto.module.ts:363

- Type: hardcoded-business-module
- Match: `lignesinterventionauto`
- Code: `moduleKey: "lignesinterventionauto",`
- Diagnostic: Nom de module métier codé en dur.
- Action cible: Acceptable si c’est déclaratif. Vérifier qu’il n’y a pas de logique exécutable.

#### src/runtime/modules/generated/lignescommandestockauto/index.ts:1

- Type: hardcoded-business-module
- Match: `lignescommandestockauto`
- Code: `export { lignescommandestockautoModule } from "./lignescommandestockauto.module";`
- Diagnostic: Nom de module métier codé en dur.
- Action cible: Acceptable si c’est déclaratif. Vérifier qu’il n’y a pas de logique exécutable.

#### src/runtime/modules/generated/lignescommandestockauto/lignescommandestockauto.module.ts:5

- Type: hardcoded-business-module
- Match: `lignescommandestockauto`
- Code: `key: "lignescommandestockauto",`
- Diagnostic: Nom de module métier codé en dur.
- Action cible: Acceptable si c’est déclaratif. Vérifier qu’il n’y a pas de logique exécutable.

#### src/runtime/modules/generated/lignescommandestockauto/lignescommandestockauto.module.ts:23

- Type: hardcoded-business-module
- Match: `lignescommandestockauto`
- Code: `collection: "lignescommandestockauto",`
- Diagnostic: Nom de module métier codé en dur.
- Action cible: Acceptable si c’est déclaratif. Vérifier qu’il n’y a pas de logique exécutable.

#### src/runtime/modules/generated/lignescommandestockauto/lignescommandestockauto.module.ts:29

- Type: hardcoded-business-module
- Match: `commandesstockauto`
- Code: `relation: { module: "commandesstockauto" },`
- Diagnostic: Nom de module métier codé en dur.
- Action cible: Acceptable si c’est déclaratif. Vérifier qu’il n’y a pas de logique exécutable.

#### src/runtime/modules/generated/lignescommandestockauto/lignescommandestockauto.module.ts:165

- Type: hardcoded-business-module
- Match: `commandesstockauto`
- Code: `moduleKey: "commandesstockauto",`
- Diagnostic: Nom de module métier codé en dur.
- Action cible: Acceptable si c’est déclaratif. Vérifier qu’il n’y a pas de logique exécutable.

#### src/runtime/modules/generated/lignescommandestockauto/lignescommandestockauto.module.ts:69

- Type: manual-amount-calculation
- Match: `quantiteCommandee`
- Code: `key: "quantiteCommandee",`
- Diagnostic: Calcul financier ou champ montant détecté.
- Action cible: Acceptable si c’est déclaratif. Vérifier qu’il n’y a pas de logique exécutable.

#### src/runtime/modules/generated/lignescommandestockauto/lignescommandestockauto.module.ts:86

- Type: manual-amount-calculation
- Match: `prixUnitaireHT`
- Code: `key: "prixUnitaireHT",`
- Diagnostic: Calcul financier ou champ montant détecté.
- Action cible: Acceptable si c’est déclaratif. Vérifier qu’il n’y a pas de logique exécutable.

#### src/runtime/modules/generated/lignescommandestockauto/lignescommandestockauto.module.ts:93

- Type: manual-amount-calculation
- Match: `montantHT`
- Code: `key: "montantHT",`
- Diagnostic: Calcul financier ou champ montant détecté.
- Action cible: Acceptable si c’est déclaratif. Vérifier qu’il n’y a pas de logique exécutable.

#### src/runtime/modules/generated/lignescommandestockauto/lignescommandestockauto.module.ts:101

- Type: manual-amount-calculation
- Match: `montantTTC`
- Code: `key: "montantTTC",`
- Diagnostic: Calcul financier ou champ montant détecté.
- Action cible: Acceptable si c’est déclaratif. Vérifier qu’il n’y a pas de logique exécutable.

#### src/runtime/modules/generated/lignescommandestockauto/lignescommandestockauto.module.ts:133

- Type: manual-amount-calculation
- Match: `quantiteCommandee`
- Code: `"quantiteCommandee",`
- Diagnostic: Calcul financier ou champ montant détecté.
- Action cible: Acceptable si c’est déclaratif. Vérifier qu’il n’y a pas de logique exécutable.

#### src/runtime/modules/generated/lignescommandestockauto/lignescommandestockauto.module.ts:134

- Type: manual-amount-calculation
- Match: `prixUnitaireHT`
- Code: `"prixUnitaireHT",`
- Diagnostic: Calcul financier ou champ montant détecté.
- Action cible: Acceptable si c’est déclaratif. Vérifier qu’il n’y a pas de logique exécutable.

#### src/runtime/modules/generated/lignescommandestockauto/lignescommandestockauto.module.ts:135

- Type: manual-amount-calculation
- Match: `montantHT`
- Code: `"montantHT",`
- Diagnostic: Calcul financier ou champ montant détecté.
- Action cible: Acceptable si c’est déclaratif. Vérifier qu’il n’y a pas de logique exécutable.

#### src/runtime/modules/generated/lignescommandestockauto/lignescommandestockauto.module.ts:136

- Type: manual-amount-calculation
- Match: `montantTTC`
- Code: `"montantTTC",`
- Diagnostic: Calcul financier ou champ montant détecté.
- Action cible: Acceptable si c’est déclaratif. Vérifier qu’il n’y a pas de logique exécutable.

#### src/runtime/modules/generated/lignescommandestockauto/lignescommandestockauto.module.ts:137

- Type: manual-amount-calculation
- Match: `montantTTC`
- Code: `"montantTTC",`
- Diagnostic: Calcul financier ou champ montant détecté.
- Action cible: Acceptable si c’est déclaratif. Vérifier qu’il n’y a pas de logique exécutable.

#### src/runtime/modules/generated/lignescommandestockauto/lignescommandestockauto.module.ts:148

- Type: manual-amount-calculation
- Match: `quantiteCommandee`
- Code: `"quantiteCommandee",`
- Diagnostic: Calcul financier ou champ montant détecté.
- Action cible: Acceptable si c’est déclaratif. Vérifier qu’il n’y a pas de logique exécutable.

#### src/runtime/modules/generated/lignescommandestockauto/lignescommandestockauto.module.ts:149

- Type: manual-amount-calculation
- Match: `prixUnitaireHT`
- Code: `"prixUnitaireHT",`
- Diagnostic: Calcul financier ou champ montant détecté.
- Action cible: Acceptable si c’est déclaratif. Vérifier qu’il n’y a pas de logique exécutable.

#### src/runtime/modules/generated/lignescommandestockauto/lignescommandestockauto.module.ts:150

- Type: manual-amount-calculation
- Match: `montantHT`
- Code: `"montantHT",`
- Diagnostic: Calcul financier ou champ montant détecté.
- Action cible: Acceptable si c’est déclaratif. Vérifier qu’il n’y a pas de logique exécutable.

#### src/runtime/modules/generated/lignescommandestockauto/lignescommandestockauto.module.ts:151

- Type: manual-amount-calculation
- Match: `montantTTC`
- Code: `"montantTTC",`
- Diagnostic: Calcul financier ou champ montant détecté.
- Action cible: Acceptable si c’est déclaratif. Vérifier qu’il n’y a pas de logique exécutable.

#### src/runtime/modules/generated/lignescommandestockauto/lignescommandestockauto.module.ts:152

- Type: manual-amount-calculation
- Match: `montantTTC`
- Code: `"montantTTC",`
- Diagnostic: Calcul financier ou champ montant détecté.
- Action cible: Acceptable si c’est déclaratif. Vérifier qu’il n’y a pas de logique exécutable.

#### src/runtime/modules/generated/lignescommandestockauto/lignescommandestockauto.module.ts:170

- Type: manual-amount-calculation
- Match: `quantiteCommandee`
- Code: `labelFields: ["produitId", "quantiteCommandee", "statut"],`
- Diagnostic: Calcul financier ou champ montant détecté.
- Action cible: Acceptable si c’est déclaratif. Vérifier qu’il n’y a pas de logique exécutable.

#### src/runtime/modules/generated/lignesinterventionauto/index.ts:1

- Type: hardcoded-business-module
- Match: `lignesinterventionauto`
- Code: `export * from "./lignesinterventionauto.module";`
- Diagnostic: Nom de module métier codé en dur.
- Action cible: Acceptable si c’est déclaratif. Vérifier qu’il n’y a pas de logique exécutable.

#### src/runtime/modules/generated/lignesinterventionauto/index.ts:2

- Type: hardcoded-business-module
- Match: `lignesinterventionauto`
- Code: `export * from "./lignesinterventionauto.actions";`
- Diagnostic: Nom de module métier codé en dur.
- Action cible: Acceptable si c’est déclaratif. Vérifier qu’il n’y a pas de logique exécutable.

#### src/runtime/modules/generated/lignesinterventionauto/index.ts:3

- Type: hardcoded-business-module
- Match: `lignesinterventionauto`
- Code: `export * from "./lignesinterventionauto.workflows";`
- Diagnostic: Nom de module métier codé en dur.
- Action cible: Acceptable si c’est déclaratif. Vérifier qu’il n’y a pas de logique exécutable.

#### src/runtime/modules/generated/lignesinterventionauto/index.ts:4

- Type: hardcoded-business-module
- Match: `lignesinterventionauto`
- Code: `export * from "./lignesinterventionauto.permissions";`
- Diagnostic: Nom de module métier codé en dur.
- Action cible: Acceptable si c’est déclaratif. Vérifier qu’il n’y a pas de logique exécutable.

#### src/runtime/modules/generated/lignesinterventionauto/index.ts:5

- Type: hardcoded-business-module
- Match: `lignesinterventionauto`
- Code: `export * from "./lignesinterventionauto.automation";`
- Diagnostic: Nom de module métier codé en dur.
- Action cible: Acceptable si c’est déclaratif. Vérifier qu’il n’y a pas de logique exécutable.

#### src/runtime/modules/generated/lignesinterventionauto/index.ts:6

- Type: hardcoded-business-module
- Match: `lignesinterventionauto`
- Code: `export * from "./lignesinterventionauto.dashboard";`
- Diagnostic: Nom de module métier codé en dur.
- Action cible: Acceptable si c’est déclaratif. Vérifier qu’il n’y a pas de logique exécutable.

#### src/runtime/modules/generated/lignesinterventionauto/lignesinterventionauto.module.ts:5

- Type: hardcoded-business-module
- Match: `lignesinterventionauto`
- Code: `key: "lignesinterventionauto",`
- Diagnostic: Nom de module métier codé en dur.
- Action cible: Acceptable si c’est déclaratif. Vérifier qu’il n’y a pas de logique exécutable.

#### src/runtime/modules/generated/lignesinterventionauto/lignesinterventionauto.module.ts:24

- Type: hardcoded-business-module
- Match: `lignesinterventionauto`
- Code: `collection: "lignesinterventionauto",`
- Diagnostic: Nom de module métier codé en dur.
- Action cible: Acceptable si c’est déclaratif. Vérifier qu’il n’y a pas de logique exécutable.

#### src/runtime/modules/generated/lignesinterventionauto/lignesinterventionauto.module.ts:31

- Type: hardcoded-business-module
- Match: `interventionsauto`
- Code: `relation: { module: "interventionsauto" },`
- Diagnostic: Nom de module métier codé en dur.
- Action cible: Acceptable si c’est déclaratif. Vérifier qu’il n’y a pas de logique exécutable.

#### src/runtime/modules/generated/lignesinterventionauto/lignesinterventionauto.module.ts:198

- Type: hardcoded-business-module
- Match: `mouvementsstockauto`
- Code: `relation: { module: "mouvementsstockauto" },`
- Diagnostic: Nom de module métier codé en dur.
- Action cible: Acceptable si c’est déclaratif. Vérifier qu’il n’y a pas de logique exécutable.

#### src/runtime/modules/generated/lignesinterventionauto/lignesinterventionauto.module.ts:319

- Type: hardcoded-business-module
- Match: `interventionsauto`
- Code: `moduleKey: "interventionsauto",`
- Diagnostic: Nom de module métier codé en dur.
- Action cible: Acceptable si c’est déclaratif. Vérifier qu’il n’y a pas de logique exécutable.

#### src/runtime/modules/generated/lignesinterventionauto/lignesinterventionauto.module.ts:355

- Type: hardcoded-business-module
- Match: `interventionsauto`
- Code: `moduleKey: "interventionsauto",`
- Diagnostic: Nom de module métier codé en dur.
- Action cible: Acceptable si c’est déclaratif. Vérifier qu’il n’y a pas de logique exécutable.

#### src/runtime/modules/generated/lignesinterventionauto/lignesinterventionauto.module.ts:369

- Type: hardcoded-business-module
- Match: `interventionsauto`
- Code: `moduleKey: "interventionsauto",`
- Diagnostic: Nom de module métier codé en dur.
- Action cible: Acceptable si c’est déclaratif. Vérifier qu’il n’y a pas de logique exécutable.

#### src/runtime/modules/generated/lignesinterventionauto/lignesinterventionauto.module.ts:381

- Type: hardcoded-business-module
- Match: `interventionsauto`
- Code: `moduleKey: "interventionsauto",`
- Diagnostic: Nom de module métier codé en dur.
- Action cible: Acceptable si c’est déclaratif. Vérifier qu’il n’y a pas de logique exécutable.

#### src/runtime/modules/generated/lignesinterventionauto/lignesinterventionauto.module.ts:457

- Type: hardcoded-business-module
- Match: `lignesinterventionauto`
- Code: `permission: "lignesinterventionauto:update",`
- Diagnostic: Nom de module métier codé en dur.
- Action cible: Acceptable si c’est déclaratif. Vérifier qu’il n’y a pas de logique exécutable.

#### src/runtime/modules/generated/lignesinterventionauto/lignesinterventionauto.module.ts:49

- Type: manual-amount-calculation
- Match: `prixUnitaireHT`
- Code: `prixUnitaireHT: ["prixVente", "prixUnitaireHT", "prixUnitaire", "prixPromo"],`
- Diagnostic: Calcul financier ou champ montant détecté.
- Action cible: Acceptable si c’est déclaratif. Vérifier qu’il n’y a pas de logique exécutable.

#### src/runtime/modules/generated/lignesinterventionauto/lignesinterventionauto.module.ts:49

- Type: manual-amount-calculation
- Match: `prixUnitaireHT`
- Code: `prixUnitaireHT: ["prixVente", "prixUnitaireHT", "prixUnitaire", "prixPromo"],`
- Diagnostic: Calcul financier ou champ montant détecté.
- Action cible: Acceptable si c’est déclaratif. Vérifier qu’il n’y a pas de logique exécutable.

#### src/runtime/modules/generated/lignesinterventionauto/lignesinterventionauto.module.ts:50

- Type: manual-amount-calculation
- Match: `prixUnitaireHT`
- Code: `prixUnitaire: ["prixVente", "prixUnitaireHT", "prixUnitaire", "prixPromo"],`
- Diagnostic: Calcul financier ou champ montant détecté.
- Action cible: Acceptable si c’est déclaratif. Vérifier qu’il n’y a pas de logique exécutable.

#### src/runtime/modules/generated/lignesinterventionauto/lignesinterventionauto.module.ts:51

- Type: manual-amount-calculation
- Match: `tauxTVA`
- Code: `tauxTVA: ["tauxTVA"],`
- Diagnostic: Calcul financier ou champ montant détecté.
- Action cible: Acceptable si c’est déclaratif. Vérifier qu’il n’y a pas de logique exécutable.

#### src/runtime/modules/generated/lignesinterventionauto/lignesinterventionauto.module.ts:51

- Type: manual-amount-calculation
- Match: `tauxTVA`
- Code: `tauxTVA: ["tauxTVA"],`
- Diagnostic: Calcul financier ou champ montant détecté.
- Action cible: Acceptable si c’est déclaratif. Vérifier qu’il n’y a pas de logique exécutable.

#### src/runtime/modules/generated/lignesinterventionauto/lignesinterventionauto.module.ts:137

- Type: manual-amount-calculation
- Match: `prixUnitaireHT`
- Code: `key: "prixUnitaireHT",`
- Diagnostic: Calcul financier ou champ montant détecté.
- Action cible: Acceptable si c’est déclaratif. Vérifier qu’il n’y a pas de logique exécutable.

#### src/runtime/modules/generated/lignesinterventionauto/lignesinterventionauto.module.ts:144

- Type: manual-amount-calculation
- Match: `tauxTVA`
- Code: `key: "tauxTVA",`
- Diagnostic: Calcul financier ou champ montant détecté.
- Action cible: Acceptable si c’est déclaratif. Vérifier qu’il n’y a pas de logique exécutable.

#### src/runtime/modules/generated/lignesinterventionauto/lignesinterventionauto.module.ts:151

- Type: manual-amount-calculation
- Match: `montantHT`
- Code: `key: "montantHT",`
- Diagnostic: Calcul financier ou champ montant détecté.
- Action cible: Acceptable si c’est déclaratif. Vérifier qu’il n’y a pas de logique exécutable.

#### src/runtime/modules/generated/lignesinterventionauto/lignesinterventionauto.module.ts:163

- Type: manual-amount-calculation
- Match: `montantTTC`
- Code: `key: "montantTTC",`
- Diagnostic: Calcul financier ou champ montant détecté.
- Action cible: Acceptable si c’est déclaratif. Vérifier qu’il n’y a pas de logique exécutable.

#### src/runtime/modules/generated/lignesinterventionauto/lignesinterventionauto.module.ts:242

- Type: manual-amount-calculation
- Match: `prixUnitaireHT`
- Code: `"prixUnitaireHT",`
- Diagnostic: Calcul financier ou champ montant détecté.
- Action cible: Acceptable si c’est déclaratif. Vérifier qu’il n’y a pas de logique exécutable.

#### src/runtime/modules/generated/lignesinterventionauto/lignesinterventionauto.module.ts:243

- Type: manual-amount-calculation
- Match: `tauxTVA`
- Code: `"tauxTVA",`
- Diagnostic: Calcul financier ou champ montant détecté.
- Action cible: Acceptable si c’est déclaratif. Vérifier qu’il n’y a pas de logique exécutable.

#### src/runtime/modules/generated/lignesinterventionauto/lignesinterventionauto.module.ts:244

- Type: manual-amount-calculation
- Match: `montantHT`
- Code: `"montantHT",`
- Diagnostic: Calcul financier ou champ montant détecté.
- Action cible: Acceptable si c’est déclaratif. Vérifier qu’il n’y a pas de logique exécutable.

#### src/runtime/modules/generated/lignesinterventionauto/lignesinterventionauto.module.ts:246

- Type: manual-amount-calculation
- Match: `montantTTC`
- Code: `"montantTTC",`
- Diagnostic: Calcul financier ou champ montant détecté.
- Action cible: Acceptable si c’est déclaratif. Vérifier qu’il n’y a pas de logique exécutable.

#### src/runtime/modules/generated/lignesinterventionauto/lignesinterventionauto.module.ts:279

- Type: manual-amount-calculation
- Match: `prixUnitaireHT`
- Code: `"prixUnitaireHT",`
- Diagnostic: Calcul financier ou champ montant détecté.
- Action cible: Acceptable si c’est déclaratif. Vérifier qu’il n’y a pas de logique exécutable.

#### src/runtime/modules/generated/lignesinterventionauto/lignesinterventionauto.module.ts:280

- Type: manual-amount-calculation
- Match: `tauxTVA`
- Code: `"tauxTVA",`
- Diagnostic: Calcul financier ou champ montant détecté.
- Action cible: Acceptable si c’est déclaratif. Vérifier qu’il n’y a pas de logique exécutable.

#### src/runtime/modules/generated/lignesinterventionauto/lignesinterventionauto.module.ts:281

- Type: manual-amount-calculation
- Match: `montantHT`
- Code: `"montantHT",`
- Diagnostic: Calcul financier ou champ montant détecté.
- Action cible: Acceptable si c’est déclaratif. Vérifier qu’il n’y a pas de logique exécutable.

#### src/runtime/modules/generated/lignesinterventionauto/lignesinterventionauto.module.ts:283

- Type: manual-amount-calculation
- Match: `montantTTC`
- Code: `"montantTTC",`
- Diagnostic: Calcul financier ou champ montant détecté.
- Action cible: Acceptable si c’est déclaratif. Vérifier qu’il n’y a pas de logique exécutable.

#### src/runtime/modules/generated/lignesinterventionauto/lignesinterventionauto.module.ts:424

- Type: manual-amount-calculation
- Match: `prixUnitaireHT`
- Code: `"prixUnitaireHT",`
- Diagnostic: Calcul financier ou champ montant détecté.
- Action cible: Acceptable si c’est déclaratif. Vérifier qu’il n’y a pas de logique exécutable.

#### src/runtime/modules/generated/lignesinterventionauto/lignesinterventionauto.module.ts:425

- Type: manual-amount-calculation
- Match: `tauxTVA`
- Code: `"tauxTVA",`
- Diagnostic: Calcul financier ou champ montant détecté.
- Action cible: Acceptable si c’est déclaratif. Vérifier qu’il n’y a pas de logique exécutable.

#### src/runtime/modules/generated/lignesinterventionauto/lignesinterventionauto.module.ts:426

- Type: manual-amount-calculation
- Match: `montantHT`
- Code: `"montantHT",`
- Diagnostic: Calcul financier ou champ montant détecté.
- Action cible: Acceptable si c’est déclaratif. Vérifier qu’il n’y a pas de logique exécutable.

#### src/runtime/modules/generated/lignesinterventionauto/lignesinterventionauto.module.ts:428

- Type: manual-amount-calculation
- Match: `montantTTC`
- Code: `"montantTTC",`
- Diagnostic: Calcul financier ou champ montant détecté.
- Action cible: Acceptable si c’est déclaratif. Vérifier qu’il n’y a pas de logique exécutable.

#### src/runtime/modules/generated/lignesinterventionauto/lignesinterventionauto.module.ts:439

- Type: manual-amount-calculation
- Match: `prixUnitaireHT`
- Code: `"prixUnitaireHT",`
- Diagnostic: Calcul financier ou champ montant détecté.
- Action cible: Acceptable si c’est déclaratif. Vérifier qu’il n’y a pas de logique exécutable.

#### src/runtime/modules/generated/lignesinterventionauto/lignesinterventionauto.module.ts:440

- Type: manual-amount-calculation
- Match: `tauxTVA`
- Code: `"tauxTVA",`
- Diagnostic: Calcul financier ou champ montant détecté.
- Action cible: Acceptable si c’est déclaratif. Vérifier qu’il n’y a pas de logique exécutable.

#### src/runtime/modules/generated/lignesinterventionauto/lignesinterventionauto.module.ts:441

- Type: manual-amount-calculation
- Match: `montantHT`
- Code: `"montantHT",`
- Diagnostic: Calcul financier ou champ montant détecté.
- Action cible: Acceptable si c’est déclaratif. Vérifier qu’il n’y a pas de logique exécutable.

#### src/runtime/modules/generated/lignesinterventionauto/lignesinterventionauto.module.ts:443

- Type: manual-amount-calculation
- Match: `montantTTC`
- Code: `"montantTTC",`
- Diagnostic: Calcul financier ou champ montant détecté.
- Action cible: Acceptable si c’est déclaratif. Vérifier qu’il n’y a pas de logique exécutable.

#### src/runtime/modules/generated/mouvementsstockauto/index.ts:1

- Type: hardcoded-business-module
- Match: `mouvementsstockauto`
- Code: `export { mouvementsstockautoModule } from "./mouvementsstockauto.module";`
- Diagnostic: Nom de module métier codé en dur.
- Action cible: Acceptable si c’est déclaratif. Vérifier qu’il n’y a pas de logique exécutable.

#### src/runtime/modules/generated/mouvementsstockauto/mouvementsstockauto.module.ts:5

- Type: hardcoded-business-module
- Match: `mouvementsstockauto`
- Code: `key: "mouvementsstockauto",`
- Diagnostic: Nom de module métier codé en dur.
- Action cible: Acceptable si c’est déclaratif. Vérifier qu’il n’y a pas de logique exécutable.

#### src/runtime/modules/generated/mouvementsstockauto/mouvementsstockauto.module.ts:24

- Type: hardcoded-business-module
- Match: `mouvementsstockauto`
- Code: `collection: "mouvementsstockauto",`
- Diagnostic: Nom de module métier codé en dur.
- Action cible: Acceptable si c’est déclaratif. Vérifier qu’il n’y a pas de logique exécutable.

#### src/runtime/modules/generated/mouvementsstockauto/mouvementsstockauto.module.ts:98

- Type: hardcoded-business-module
- Match: `interventionsauto`
- Code: `relation: { module: "interventionsauto" },`
- Diagnostic: Nom de module métier codé en dur.
- Action cible: Acceptable si c’est déclaratif. Vérifier qu’il n’y a pas de logique exécutable.

#### src/runtime/modules/generated/mouvementsstockauto/mouvementsstockauto.module.ts:106

- Type: hardcoded-business-module
- Match: `lignesinterventionauto`
- Code: `relation: { module: "lignesinterventionauto" },`
- Diagnostic: Nom de module métier codé en dur.
- Action cible: Acceptable si c’est déclaratif. Vérifier qu’il n’y a pas de logique exécutable.

#### src/runtime/modules/generated/produitsauto/produitsauto.module.ts:97

- Type: manual-amount-calculation
- Match: `tauxTVA`
- Code: `key: "tauxTVA",`
- Diagnostic: Calcul financier ou champ montant détecté.
- Action cible: Acceptable si c’est déclaratif. Vérifier qu’il n’y a pas de logique exécutable.

#### src/runtime/modules/generated/produitsauto/produitsauto.module.ts:364

- Type: manual-amount-calculation
- Match: `tauxTVA`
- Code: `"tauxTVA",`
- Diagnostic: Calcul financier ou champ montant détecté.
- Action cible: Acceptable si c’est déclaratif. Vérifier qu’il n’y a pas de logique exécutable.

#### src/runtime/modules/generated/produitsauto/produitsauto.module.ts:376

- Type: manual-amount-calculation
- Match: `tauxTVA`
- Code: `"tauxTVA",`
- Diagnostic: Calcul financier ou champ montant détecté.
- Action cible: Acceptable si c’est déclaratif. Vérifier qu’il n’y a pas de logique exécutable.

#### src/runtime/modules/generated/rappelsauto/rappelsauto.module.ts:31

- Type: hardcoded-business-module
- Match: `clientsauto`
- Code: `relation: { module: "clientsauto" },`
- Diagnostic: Nom de module métier codé en dur.
- Action cible: Acceptable si c’est déclaratif. Vérifier qu’il n’y a pas de logique exécutable.

#### src/runtime/modules/generated/rappelsauto/rappelsauto.module.ts:41

- Type: hardcoded-business-module
- Match: `vehicules`
- Code: `relation: { module: "vehicules" },`
- Diagnostic: Nom de module métier codé en dur.
- Action cible: Acceptable si c’est déclaratif. Vérifier qu’il n’y a pas de logique exécutable.

#### src/runtime/modules/generated/receptionsstockauto/index.ts:1

- Type: hardcoded-business-module
- Match: `receptionsstockauto`
- Code: `export { receptionsstockautoModule } from "./receptionsstockauto.module";`
- Diagnostic: Nom de module métier codé en dur.
- Action cible: Acceptable si c’est déclaratif. Vérifier qu’il n’y a pas de logique exécutable.

#### src/runtime/modules/generated/receptionsstockauto/receptionsstockauto.module.ts:5

- Type: hardcoded-business-module
- Match: `receptionsstockauto`
- Code: `key: "receptionsstockauto",`
- Diagnostic: Nom de module métier codé en dur.
- Action cible: Acceptable si c’est déclaratif. Vérifier qu’il n’y a pas de logique exécutable.

#### src/runtime/modules/generated/receptionsstockauto/receptionsstockauto.module.ts:23

- Type: hardcoded-business-module
- Match: `receptionsstockauto`
- Code: `collection: "receptionsstockauto",`
- Diagnostic: Nom de module métier codé en dur.
- Action cible: Acceptable si c’est déclaratif. Vérifier qu’il n’y a pas de logique exécutable.

#### src/runtime/modules/generated/receptionsstockauto/receptionsstockauto.module.ts:29

- Type: hardcoded-business-module
- Match: `commandesstockauto`
- Code: `relation: { module: "commandesstockauto" },`
- Diagnostic: Nom de module métier codé en dur.
- Action cible: Acceptable si c’est déclaratif. Vérifier qu’il n’y a pas de logique exécutable.

#### src/runtime/modules/generated/receptionsstockauto/receptionsstockauto.module.ts:40

- Type: hardcoded-business-module
- Match: `lignescommandestockauto`
- Code: `module: "lignescommandestockauto",`
- Diagnostic: Nom de module métier codé en dur.
- Action cible: Acceptable si c’est déclaratif. Vérifier qu’il n’y a pas de logique exécutable.

#### src/runtime/modules/generated/receptionsstockauto/receptionsstockauto.module.ts:100

- Type: hardcoded-business-module
- Match: `mouvementsstockauto`
- Code: `relation: { module: "mouvementsstockauto" },`
- Diagnostic: Nom de module métier codé en dur.
- Action cible: Acceptable si c’est déclaratif. Vérifier qu’il n’y a pas de logique exécutable.

#### src/runtime/modules/generated/receptionsstockauto/receptionsstockauto.module.ts:184

- Type: hardcoded-business-module
- Match: `commandesstockauto`
- Code: `moduleKey: "commandesstockauto",`
- Diagnostic: Nom de module métier codé en dur.
- Action cible: Acceptable si c’est déclaratif. Vérifier qu’il n’y a pas de logique exécutable.

#### src/runtime/modules/generated/rendezvous/rendezvous.module.ts:35

- Type: hardcoded-business-module
- Match: `clientsauto`
- Code: `relation: { module: "clientsauto" },`
- Diagnostic: Nom de module métier codé en dur.
- Action cible: Acceptable si c’est déclaratif. Vérifier qu’il n’y a pas de logique exécutable.

#### src/runtime/modules/generated/rendezvous/rendezvous.module.ts:46

- Type: hardcoded-business-module
- Match: `vehicules`
- Code: `module: "vehicules",`
- Diagnostic: Nom de module métier codé en dur.
- Action cible: Acceptable si c’est déclaratif. Vérifier qu’il n’y a pas de logique exécutable.

#### src/runtime/modules/generated/rendezvous/rendezvous.module.ts:100

- Type: hardcoded-business-module
- Match: `interventionsauto`
- Code: `relation: { module: "interventionsauto" },`
- Diagnostic: Nom de module métier codé en dur.
- Action cible: Acceptable si c’est déclaratif. Vérifier qu’il n’y a pas de logique exécutable.

#### src/runtime/modules/generated/vehicules/index.ts:1

- Type: hardcoded-business-module
- Match: `vehicules`
- Code: `export * from "./vehicules.module";`
- Diagnostic: Nom de module métier codé en dur.
- Action cible: Acceptable si c’est déclaratif. Vérifier qu’il n’y a pas de logique exécutable.

#### src/runtime/modules/generated/vehicules/index.ts:2

- Type: hardcoded-business-module
- Match: `vehicules`
- Code: `export * from "./vehicules.actions";`
- Diagnostic: Nom de module métier codé en dur.
- Action cible: Acceptable si c’est déclaratif. Vérifier qu’il n’y a pas de logique exécutable.

#### src/runtime/modules/generated/vehicules/index.ts:3

- Type: hardcoded-business-module
- Match: `vehicules`
- Code: `export * from "./vehicules.workflows";`
- Diagnostic: Nom de module métier codé en dur.
- Action cible: Acceptable si c’est déclaratif. Vérifier qu’il n’y a pas de logique exécutable.

#### src/runtime/modules/generated/vehicules/index.ts:4

- Type: hardcoded-business-module
- Match: `vehicules`
- Code: `export * from "./vehicules.permissions";`
- Diagnostic: Nom de module métier codé en dur.
- Action cible: Acceptable si c’est déclaratif. Vérifier qu’il n’y a pas de logique exécutable.

#### src/runtime/modules/generated/vehicules/index.ts:5

- Type: hardcoded-business-module
- Match: `vehicules`
- Code: `export * from "./vehicules.automation";`
- Diagnostic: Nom de module métier codé en dur.
- Action cible: Acceptable si c’est déclaratif. Vérifier qu’il n’y a pas de logique exécutable.

#### src/runtime/modules/generated/vehicules/index.ts:6

- Type: hardcoded-business-module
- Match: `vehicules`
- Code: `export * from "./vehicules.dashboard";`
- Diagnostic: Nom de module métier codé en dur.
- Action cible: Acceptable si c’est déclaratif. Vérifier qu’il n’y a pas de logique exécutable.

#### src/runtime/modules/generated/vehicules/vehicules.module.ts:7

- Type: hardcoded-business-module
- Match: `vehicules`
- Code: `key: "vehicules",`
- Diagnostic: Nom de module métier codé en dur.
- Action cible: Acceptable si c’est déclaratif. Vérifier qu’il n’y a pas de logique exécutable.

#### src/runtime/modules/generated/vehicules/vehicules.module.ts:33

- Type: hardcoded-business-module
- Match: `vehicules`
- Code: `collection: "vehicules",`
- Diagnostic: Nom de module métier codé en dur.
- Action cible: Acceptable si c’est déclaratif. Vérifier qu’il n’y a pas de logique exécutable.

#### src/runtime/modules/generated/vehicules/vehicules.module.ts:116

- Type: hardcoded-business-module
- Match: `clientsauto`
- Code: `relation: { module: "clientsauto"`
- Diagnostic: Nom de module métier codé en dur.
- Action cible: Acceptable si c’est déclaratif. Vérifier qu’il n’y a pas de logique exécutable.

#### src/runtime/modules/generated/vehicules/vehicules.module.ts:323

- Type: hardcoded-business-module
- Match: `clientsauto`
- Code: `moduleKey: "clientsauto",`
- Diagnostic: Nom de module métier codé en dur.
- Action cible: Acceptable si c’est déclaratif. Vérifier qu’il n’y a pas de logique exécutable.

#### src/runtime/modules/generated/vehicules/vehicules.module.ts:343

- Type: hardcoded-business-module
- Match: `clientsauto`
- Code: `moduleKey: "clientsauto",`
- Diagnostic: Nom de module métier codé en dur.
- Action cible: Acceptable si c’est déclaratif. Vérifier qu’il n’y a pas de logique exécutable.

#### src/runtime/modules/generated/vehicules/vehicules.module.ts:355

- Type: hardcoded-business-module
- Match: `clientsauto`
- Code: `moduleKey: "clientsauto",`
- Diagnostic: Nom de module métier codé en dur.
- Action cible: Acceptable si c’est déclaratif. Vérifier qu’il n’y a pas de logique exécutable.

#### src/runtime/modules/generated/vehicules/vehicules.module.ts:415

- Type: hardcoded-business-module
- Match: `interventionsauto`
- Code: `moduleKey: "interventionsauto",`
- Diagnostic: Nom de module métier codé en dur.
- Action cible: Acceptable si c’est déclaratif. Vérifier qu’il n’y a pas de logique exécutable.

#### src/runtime/modules/generated/vehicules/vehicules.module.ts:438

- Type: hardcoded-business-module
- Match: `clientsauto`
- Code: `moduleKey: "clientsauto",`
- Diagnostic: Nom de module métier codé en dur.
- Action cible: Acceptable si c’est déclaratif. Vérifier qu’il n’y a pas de logique exécutable.
