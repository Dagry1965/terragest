# AMARKHYS-REBUILD-06C-FIX7 — Audit mecanicienId relation

Date: 2026-05-31T22:27:29.878Z

## Synthèse

- OK: 7
- FAIL: 0

## Checks

- OK — interventionsauto.module.ts existe
- OK — mecanicienId pointe vers employes
- OK — employes.module.ts existe
- OK — employes enregistré dans coreModules
- OK — employes possède nom/prenom/email ou libellé
- OK — interventionsauto possède relationLabelFields mecanicienId
- OK — ERPFormField charge les relations

## interventionsauto — src/runtime/modules/generated/interventionsauto/interventionsauto.module.ts

- collection — L30: collection: "interventionsauto",
- relation: — L37: relation: { module: "clientsauto" },
- module: — L37: relation: { module: "clientsauto" },
- relation: — L47: relation: { module: "vehicules" },
- module: — L47: relation: { module: "vehicules" },
- relation: — L57: relation: { module: "rendezvous" },
- module: — L57: relation: { module: "rendezvous" },
- mecanicienId — L63: key: "mecanicienId",
- relation: — L66: relation: { module: "employes" },
- module: — L66: relation: { module: "employes" },
- employes — L66: relation: { module: "employes" },
- mecanicienId — L182: "mecanicienId",
- mecanicienId — L195: "mecanicienId",
- relationLabelFields — L349: relationLabelFields: {
- mecanicienId — L350: mecanicienId: ["prenom", "nom", "fonction", "telephone"],
- nom — L350: mecanicienId: ["prenom", "nom", "fonction", "telephone"],
- prenom — L350: mecanicienId: ["prenom", "nom", "fonction", "telephone"],
- telephone — L350: mecanicienId: ["prenom", "nom", "fonction", "telephone"],
- nom — L352: "nom",
- nom — L353: "prenom",
- prenom — L353: "prenom",
- telephone — L354: "telephone",
- moduleKey — L416: moduleKey: "clientsauto",
- labelFields — L417: labelFields: [
- nom — L418: "prenom",
- prenom — L418: "prenom",
- nom — L419: "nom",
- telephone — L420: "telephone",
- moduleKey — L426: moduleKey: "vehicules",
- labelFields — L427: labelFields: [
- moduleKey — L436: moduleKey: "rendezvous",
- labelFields — L437: labelFields: [
- labelFields — L448: labelFields: [
- moduleKey — L457: moduleKey: "clientsauto",
- labelFields — L458: labelFields: [
- nom — L459: "nom",
- nom — L460: "prenoms",
- prenom — L460: "prenoms",
- telephone — L461: "telephone",
- moduleKey — L466: moduleKey: "vehicules",
- labelFields — L467: labelFields: [
- moduleKey — L475: moduleKey: "rendezvous",
- labelFields — L476: labelFields: [
- moduleKey — L487: moduleKey: "clientsauto",
- labelFields — L488: labelFields: [
- nom — L489: "nom",
- nom — L490: "prenoms",
- prenom — L490: "prenoms",
- telephone — L491: "telephone",
- nom — L494: "nom",
- nom — L495: "prenoms",
- prenom — L495: "prenoms",
- telephone — L496: "telephone",
- email — L497: "email",
- moduleKey — L504: moduleKey: "vehicules",
- labelFields — L505: labelFields: [
- moduleKey — L521: moduleKey: "rendezvous",
- labelFields — L522: labelFields: [
- moduleKey — L562: moduleKey: "lignesinterventionauto",
- labelFields — L574: labelFields: [
- moduleKey — L589: moduleKey: "produitsauto",
- labelFields — L590: labelFields: [
- nom — L591: "nom",
- moduleKey — L599: moduleKey: "stocksauto",
- labelFields — L600: labelFields: [
- nom — L601: "nom",
- moduleKey — L613: moduleKey: "facturesauto",
- labelFields — L628: labelFields: ["numeroFacture", "montantTTC", "resteAPayer", "statutPaiement"],
- moduleKey — L634: moduleKey: "clientsauto",
- labelFields — L635: labelFields: ["prenom", "nom", "telephone"],
- nom — L635: labelFields: ["prenom", "nom", "telephone"],
- prenom — L635: labelFields: ["prenom", "nom", "telephone"],
- telephone — L635: labelFields: ["prenom", "nom", "telephone"],
- moduleKey — L639: moduleKey: "vehicules",
- labelFields — L640: labelFields: ["marque", "modele", "immatriculation"],

## employes — src/runtime/modules/generated/employes/employes.module.ts

- employes — L3: export const employesModule = {
- employes — L5: key: "employes",
- employes — L13: collection: "employes",
- collection — L13: collection: "employes",
- nom — L16: key: "nom",
- nom — L24: key: "prenom",
- prenom — L24: key: "prenom",
- nom — L25: label: "Prénom",
- telephone — L47: key: "telephone",
- email — L55: key: "email",
- email — L57: type: "email",
- nom — L83: fields: ["nom", "prenom", "fonction", "telephone", "email", "statut"],
- prenom — L83: fields: ["nom", "prenom", "fonction", "telephone", "email", "statut"],
- email — L83: fields: ["nom", "prenom", "fonction", "telephone", "email", "statut"],
- telephone — L83: fields: ["nom", "prenom", "fonction", "telephone", "email", "statut"],
- nom — L88: fields: ["nom", "prenom", "fonction", "telephone", "email", "statut"],
- prenom — L88: fields: ["nom", "prenom", "fonction", "telephone", "email", "statut"],
- email — L88: fields: ["nom", "prenom", "fonction", "telephone", "email", "statut"],
- telephone — L88: fields: ["nom", "prenom", "fonction", "telephone", "email", "statut"],

## coreModules — src/runtime/modules/definitions/coreModules.ts

- employes — L2: import { employesModule } from "../generated/employes";
- collection — L108: collection: "incidents",
- nom — L111: key: "nom",
- collection — L165: collection: "intrants",
- nom — L168: key: "nom",

## ERPFormField relation loader — src/components/erp/forms/enterprise/ERPFormField.tsx

- moduleKey — L226: function resolveRuntimeModuleByKey(moduleKey?: string) {
- moduleKey — L227: if (!moduleKey) {
- collection — L236: collection?: string;
- collection — L239: collection?: string;
- moduleKey — L244: moduleRecord.key === moduleKey ||
- collection — L245: moduleRecord.collection === moduleKey ||
- moduleKey — L245: moduleRecord.collection === moduleKey ||
- moduleKey — L246: moduleRecord.metadata?.key === moduleKey ||
- collection — L247: moduleRecord.metadata?.collection === moduleKey
- moduleKey — L247: moduleRecord.metadata?.collection === moduleKey
- email — L1282: : field.type === "email"
- email — L1283: ? "email"

## RuntimeRelationFilterEngine — src/runtime/relations/RuntimeRelationFilterEngine.ts

- Aucun hit.

## Lecture attendue

- Si employes.module.ts n'existe pas ou n'est pas enregistré, la liste sera vide.
- Si aucun employé n'existe en base, la liste sera vide malgré une relation correcte.
- Si relationLabelFields.mecanicienId manque, le label peut être vide ou illisible.
- Si le vrai module personnel est utilisateurs ou employesauto, mecanicienId doit pointer vers le bon module.
