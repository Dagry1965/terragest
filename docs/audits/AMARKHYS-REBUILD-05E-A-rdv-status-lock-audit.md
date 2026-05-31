# AMARKHYS-REBUILD-05E-A — Audit verrouillage statut RDV

Date: 2026-05-31T19:41:18.600Z

## Objectif

Vérifier comment rendre le champ statut du module rendezvous visible mais non modifiable directement, en s'appuyant sur le runtime existant.

## Synthèse

- OK: 16
- FAIL: 0

## Checks

### Fichiers

- OK — rendezvous.module.ts existe
- OK — RuntimeStatusGovernanceEngine existe

### Champ statut

- OK — champ statut présent dans rendezvous.module.ts
- OK — champ statut actuellement visible dans le formulaire

### Statuts

- OK — statut attendu présent: planifie
- OK — statut attendu présent: confirme
- OK — statut attendu présent: en_cours
- OK — statut attendu présent: termine
- OK — statut attendu présent: annule

### Actions

- OK — actions RDV existent et pilotent le statut

### Gouvernance

- OK — moteur gouvernance référence rendezvous
- OK — moteur gouvernance supporte action_only
- OK — formulaire lit statusGovernance
- OK — formulaire applique un verrouillage action_only

### Field rendering

- OK — ERPFormField supporte readOnly/disabled

### Metadata

- OK — contrat module supporte readonly/locked

## Bloc statut rendezvous.module.ts

### key: "statut" — ligne 155

  145:         grid: { cols: 12 },
  146:       },
  147: {
  148:         key: "commentaire",
  149:         label: "Commentaire",
  150:         type: "textarea",
  151:         list: { visible: false },
  152:         grid: { cols: 12 },
  153:       },
  154: {
  155:         key: "statut",
  156:         label: "Statut",
  157:         type: "select",
  158:         defaultValue: "planifie",
  159:         options: [
  160:           { label: "Planifié", value: "planifie" },
  161:           { label: "Confirmé", value: "confirme" },
  162:           { label: "En cours", value: "en_cours" },
  163:           { label: "Terminé", value: "termine" },
  164:           { label: "Annulé", value: "annule" },
  165:         ],
  166:         list: { visible: true, order: 7 },
  167:         grid: { cols: 6 },
  168:       }
  169:     ],
  170:   },
  171: 
  172:   form: {
  173:     layout: "tabs",
  174: 
  175:     tabs: [
  176:       {
  177:         key: "planification",
  178:         label: "Planification",
  179: 
  180:         fields: [
  181:           "clientId",
  182:           "vehiculeId",
  183:           "dateRendezVous",
  184:           "heureRendezVous",
  185:           "durationMinutes",
  186:           "typeService",
  187:           "statut",
  188:         ],
  189: 
  190:         sections: [

### key: "statut" — ligne 277

  267:         key: "annules",
  268:         label: "Annulés",
  269:         field: "statut",
  270:         equals: "annule",
  271:         tone: "gray",
  272:         icon: "x",
  273:       },
  274:     ],
  275:     filters: [
  276:       {
  277:         key: "statut",
  278:         label: "Statut",
  279:         field: "statut",
  280:         type: "select",
  281:         options: [
  282:           { label: "Planifié", value: "planifie" },
  283:           { label: "Confirmé", value: "confirme" },
  284:           { label: "En cours", value: "en_cours" },
  285:           { label: "Terminé", value: "termine" },
  286:           { label: "Annulé", value: "annule" },
  287:         ],
  288:       },
  289:       {
  290:         key: "typeService",
  291:         label: "Type de service",
  292:         field: "typeService",
  293:         type: "select",
  294:         options: [
  295:           { label: "Vidange", value: "vidange" },
  296:           { label: "Diagnostic", value: "diagnostic" },
  297:           { label: "Réparation", value: "reparation" },
  298:           { label: "Contrôle", value: "controle" },
  299:           { label: "Autre", value: "autre" },
  300:         ],
  301:       },
  302:       {
  303:         key: "vehiculeId",
  304:         label: "Véhicule",
  305:         field: "vehiculeId",
  306:         type: "relation",
  307:       },
  308:     ],
  309:     table: {
  310:       enableSearch: true,
  311:       enableSelection: true,
  312:       enableDensityToggle: true,

## Blocs RuntimeStatusGovernanceEngine

### rendezvous — ligne 130

  118:         description:
  119:           "L'annulation d'une reception validee devra passer par une action controlee avec mouvement inverse.",
  120:         visibility: "hidden",
  121:         tone: "danger",
  122:       },
  123:     ],
  124:     technicalFields: [
  125:       "mouvementStockId",
  126:       "stockProcessedAt",
  127:       "stockProcessedQuantity",
  128:     ],
  129:   },  {
  130:     moduleKey: "rendezvous",
  131:     statusField: "statut",
  132:     editMode: "action_only",
  133:     statuses: [
  134:       {
  135:         key: "planifie",
  136:         label: "Planifié",
  137:         description: "Le rendez-vous est enregistré et bloque le créneau planning.",
  138:         visibility: "visible",
  139:         tone: "info",
  140:       },
  141:       {
  142:         key: "confirme",
  143:         label: "Confirmé",
  144:         description: "Le rendez-vous est confirmé. Le runtime peut créer ou lier une intervention.",
  145:         visibility: "visible",
  146:         tone: "success",
  147:       },
  148:       {
  149:         key: "en_cours",
  150:         label: "En cours",
  151:         description: "Le rendez-vous est en cours de traitement à l'atelier.",
  152:         visibility: "visible",
  153:         tone: "warning",
  154:       },
  155:       {
  156:         key: "termine",
  157:         label: "Terminé",
  158:         description: "Le rendez-vous est terminé. La suite métier se poursuit dans l'intervention et la facture.",
  159:         visibility: "visible",
  160:         tone: "success",
  161:       },
  162:       {
  163:         key: "annule",
  164:         label: "Annulé",
  165:         description: "Le rendez-vous est annulé. Le créneau n'est plus bloquant et la trace est conservée.",
  166:         visibility: "visible",
  167:         tone: "danger",
  168:       },
  169:       {
  170:         key: "facture",

### action_only — ligne 14

    4:   RuntimeStatusGovernanceContext,
    5:   RuntimeStatusGovernancePolicy,
    6:   RuntimeStatusGovernanceResult,
    7:   RuntimeStatusGuidanceDefinition,
    8: } from "./RuntimeStatusGovernanceTypes";
    9: 
   10: const runtimeStatusPolicies: RuntimeStatusGovernancePolicy[] = [
   11:   {
   12:     moduleKey: "lignesinterventionauto",
   13:     statusField: "statut",
   14:     editMode: "action_only",
   15:     statuses: [
   16:       {
   17:         key: "brouillon",
   18:         label: "Brouillon",
   19:         description:
   20:           "La ligne est en préparation. Elle n'est pas encore comptabilisée et ne déclenche pas de sortie stock.",
   21:         visibility: "visible",
   22:         tone: "default",
   23:       },
   24:       {
   25:         key: "validee",
   26:         label: "Validée",
   27:         description:
   28:           "La ligne est confirmée. Elle est comptabilisée et peut déclencher une sortie stock si elle concerne une pièce.",
   29:         visibility: "visible",
   30:         tone: "success",
   31:       },
   32:       {
   33:         key: "facturee",
   34:         label: "Facturée",
   35:         description:
   36:           "État technique remplacé par une relation facture/document. Non exposé comme statut utilisateur.",
   37:         visibility: "technical",
   38:         tone: "info",
   39:       },
   40:       {
   41:         key: "annulee",
   42:         label: "Annulée",
   43:         description:
   44:           "État technique remplacé par une action métier de retrait contrôlé.",
   45:         visibility: "technical",
   46:         tone: "danger",
   47:       },
   48:     ],
   49:     actions: [

### action_only — ligne 132

  122:       },
  123:     ],
  124:     technicalFields: [
  125:       "mouvementStockId",
  126:       "stockProcessedAt",
  127:       "stockProcessedQuantity",
  128:     ],
  129:   },  {
  130:     moduleKey: "rendezvous",
  131:     statusField: "statut",
  132:     editMode: "action_only",
  133:     statuses: [
  134:       {
  135:         key: "planifie",
  136:         label: "Planifié",
  137:         description: "Le rendez-vous est enregistré et bloque le créneau planning.",
  138:         visibility: "visible",
  139:         tone: "info",
  140:       },
  141:       {
  142:         key: "confirme",
  143:         label: "Confirmé",
  144:         description: "Le rendez-vous est confirmé. Le runtime peut créer ou lier une intervention.",
  145:         visibility: "visible",
  146:         tone: "success",
  147:       },
  148:       {
  149:         key: "en_cours",
  150:         label: "En cours",
  151:         description: "Le rendez-vous est en cours de traitement à l'atelier.",
  152:         visibility: "visible",
  153:         tone: "warning",
  154:       },
  155:       {
  156:         key: "termine",
  157:         label: "Terminé",
  158:         description: "Le rendez-vous est terminé. La suite métier se poursuit dans l'intervention et la facture.",
  159:         visibility: "visible",
  160:         tone: "success",
  161:       },
  162:       {
  163:         key: "annule",
  164:         label: "Annulé",
  165:         description: "Le rendez-vous est annulé. Le créneau n'est plus bloquant et la trace est conservée.",
  166:         visibility: "visible",
  167:         tone: "danger",

### editMode — ligne 14

    4:   RuntimeStatusGovernanceContext,
    5:   RuntimeStatusGovernancePolicy,
    6:   RuntimeStatusGovernanceResult,
    7:   RuntimeStatusGuidanceDefinition,
    8: } from "./RuntimeStatusGovernanceTypes";
    9: 
   10: const runtimeStatusPolicies: RuntimeStatusGovernancePolicy[] = [
   11:   {
   12:     moduleKey: "lignesinterventionauto",
   13:     statusField: "statut",
   14:     editMode: "action_only",
   15:     statuses: [
   16:       {
   17:         key: "brouillon",
   18:         label: "Brouillon",
   19:         description:
   20:           "La ligne est en préparation. Elle n'est pas encore comptabilisée et ne déclenche pas de sortie stock.",
   21:         visibility: "visible",
   22:         tone: "default",
   23:       },
   24:       {
   25:         key: "validee",
   26:         label: "Validée",
   27:         description:
   28:           "La ligne est confirmée. Elle est comptabilisée et peut déclencher une sortie stock si elle concerne une pièce.",
   29:         visibility: "visible",
   30:         tone: "success",
   31:       },
   32:       {
   33:         key: "facturee",
   34:         label: "Facturée",
   35:         description:
   36:           "État technique remplacé par une relation facture/document. Non exposé comme statut utilisateur.",
   37:         visibility: "technical",
   38:         tone: "info",
   39:       },
   40:       {
   41:         key: "annulee",
   42:         label: "Annulée",
   43:         description:
   44:           "État technique remplacé par une action métier de retrait contrôlé.",
   45:         visibility: "technical",
   46:         tone: "danger",
   47:       },
   48:     ],
   49:     actions: [

### editMode — ligne 97

   87:       "stockProcessedQuantity",
   88:       "factureId",
   89:       "removedAt",
   90:       "removedBy",
   91:       "removedReason",
   92:     ],
   93:   },
   94:   {
   95:     moduleKey: "receptionsstockauto",
   96:     statusField: "statut",
   97:     editMode: "manual",
   98:     statuses: [
   99:       {
  100:         key: "brouillon",
  101:         label: "Brouillon",
  102:         description:
  103:           "La reception est en preparation. Elle ne declenche aucun mouvement stock.",
  104:         visibility: "visible",
  105:         tone: "default",
  106:       },
  107:       {
  108:         key: "validee",
  109:         label: "Validee",
  110:         description:
  111:           "La reception est validee. Elle cree une entree stock et ne doit plus etre modifiee librement.",
  112:         visibility: "visible",
  113:         tone: "success",
  114:       },
  115:       {
  116:         key: "annulee",
  117:         label: "Annulee",
  118:         description:
  119:           "L'annulation d'une reception validee devra passer par une action controlee avec mouvement inverse.",
  120:         visibility: "hidden",
  121:         tone: "danger",
  122:       },
  123:     ],
  124:     technicalFields: [
  125:       "mouvementStockId",
  126:       "stockProcessedAt",
  127:       "stockProcessedQuantity",
  128:     ],
  129:   },  {
  130:     moduleKey: "rendezvous",
  131:     statusField: "statut",
  132:     editMode: "action_only",

### editMode — ligne 132

  122:       },
  123:     ],
  124:     technicalFields: [
  125:       "mouvementStockId",
  126:       "stockProcessedAt",
  127:       "stockProcessedQuantity",
  128:     ],
  129:   },  {
  130:     moduleKey: "rendezvous",
  131:     statusField: "statut",
  132:     editMode: "action_only",
  133:     statuses: [
  134:       {
  135:         key: "planifie",
  136:         label: "Planifié",
  137:         description: "Le rendez-vous est enregistré et bloque le créneau planning.",
  138:         visibility: "visible",
  139:         tone: "info",
  140:       },
  141:       {
  142:         key: "confirme",
  143:         label: "Confirmé",
  144:         description: "Le rendez-vous est confirmé. Le runtime peut créer ou lier une intervention.",
  145:         visibility: "visible",
  146:         tone: "success",
  147:       },
  148:       {
  149:         key: "en_cours",
  150:         label: "En cours",
  151:         description: "Le rendez-vous est en cours de traitement à l'atelier.",
  152:         visibility: "visible",
  153:         tone: "warning",
  154:       },
  155:       {
  156:         key: "termine",
  157:         label: "Terminé",
  158:         description: "Le rendez-vous est terminé. La suite métier se poursuit dans l'intervention et la facture.",
  159:         visibility: "visible",
  160:         tone: "success",
  161:       },
  162:       {
  163:         key: "annule",
  164:         label: "Annulé",
  165:         description: "Le rendez-vous est annulé. Le créneau n'est plus bloquant et la trace est conservée.",
  166:         visibility: "visible",
  167:         tone: "danger",

### editMode — ligne 312

  302: 
  303:     if (!policy) {
  304:       return null;
  305:     }
  306: 
  307:     const currentStatus = getCurrentStatus(policy, context.record);
  308: 
  309:     return {
  310:       moduleKey: policy.moduleKey,
  311:       statusField: policy.statusField ?? "statut",
  312:       editMode: policy.editMode,
  313:       visibleStatuses: byVisibility(policy.statuses, "visible"),
  314:       technicalStatuses: byVisibility(policy.statuses, "technical"),
  315:       hiddenStatuses: byVisibility(policy.statuses, "hidden"),
  316:       actions: filterActions(policy.actions, currentStatus),
  317:       guidance: filterGuidance(policy.guidance, currentStatus),
  318:       technicalFields: policy.technicalFields ?? [],
  319:     };
  320:   },
  321: 
  322:   getVisibleStatusKeys(moduleKey: string): string[] {
  323:     const policy = getPolicy(moduleKey);
  324: 
  325:     if (!policy) return [];
  326: 
  327:     return byVisibility(policy.statuses, "visible").map(
  328:       (status) => status.key
  329:     );
  330:   },
  331: 
  332:   isStatusManuallyEditable(moduleKey: string): boolean {
  333:     const policy = getPolicy(moduleKey);
  334: 
  335:     if (!policy) return true;
  336: 
  337:     return policy.editMode === "manual";
  338:   },
  339: 
  340:   isTechnicalField(moduleKey: string, fieldKey: string): boolean {
  341:     const policy = getPolicy(moduleKey);
  342: 
  343:     if (!policy) return false;
  344: 
  345:     return (policy.technicalFields ?? []).includes(fieldKey);
  346:   },
  347: };

### editMode — ligne 337

  327:     return byVisibility(policy.statuses, "visible").map(
  328:       (status) => status.key
  329:     );
  330:   },
  331: 
  332:   isStatusManuallyEditable(moduleKey: string): boolean {
  333:     const policy = getPolicy(moduleKey);
  334: 
  335:     if (!policy) return true;
  336: 
  337:     return policy.editMode === "manual";
  338:   },
  339: 
  340:   isTechnicalField(moduleKey: string, fieldKey: string): boolean {
  341:     const policy = getPolicy(moduleKey);
  342: 
  343:     if (!policy) return false;
  344: 
  345:     return (policy.technicalFields ?? []).includes(fieldKey);
  346:   },
  347: };
  348: 

## Blocs ERPEnterpriseForm statut/verrouillage

### statusGovernance — ligne 649

  639:   const mainFields =
  640:     visibleFields.filter(
  641:       (field) => field.type !== "relation"
  642:     );
  643: 
  644:   const relationFields =
  645:     visibleFields.filter(
  646:       (field) => field.type === "relation"
  647:     );
  648: 
  649:   const statusGovernance =
  650:     RuntimeStatusGovernanceEngine.resolve({
  651:       moduleKey: module.metadata.key,
  652:       record: {
  653:         ...initialData,
  654:         ...formValues,
  655:       },
  656:     });
  657: 
  658:   const statusGuidance =
  659:     isRemovedRecord
  660:       ? null
  661:       : statusGovernance?.guidance?.[0] ?? null;
  662: 
  663:   const isStatusActionOnly =
  664:     // Q20H4D_ACTION_ONLY_STATUS_NOTICE
  665:     !isRemovedRecord && statusGovernance?.editMode === "action_only";
  666: 
  667:   const statusGuidanceToneClass =
  668:     // Q20H4C2_STATUS_GUIDANCE_TONE
  669:     statusGuidance?.tone === "success"
  670:       ? "border-emerald-100 bg-emerald-50/70 text-emerald-950"
  671:       : statusGuidance?.tone === "warning"
  672:         ? "border-amber-200 bg-amber-50/80 text-amber-950"
  673:         : statusGuidance?.tone === "danger"
  674:           ? "border-rose-200 bg-rose-50/80 text-rose-950"
  675:           : statusGuidance?.tone === "info"
  676:             ? "border-cyan-200 bg-cyan-50/80 text-cyan-950"
  677:             : "border-amber-200 bg-amber-50/80 text-amber-950";
  678: 
  679:   const statusGuidanceMessageClass =
  680:     statusGuidance?.tone === "success"
  681:       ? "text-emerald-900/80"
  682:       : statusGuidance?.tone === "danger"
  683:         ? "text-rose-900/80"
  684:         : statusGuidance?.tone === "info"

### statusGovernance — ligne 661

  651:       moduleKey: module.metadata.key,
  652:       record: {
  653:         ...initialData,
  654:         ...formValues,
  655:       },
  656:     });
  657: 
  658:   const statusGuidance =
  659:     isRemovedRecord
  660:       ? null
  661:       : statusGovernance?.guidance?.[0] ?? null;
  662: 
  663:   const isStatusActionOnly =
  664:     // Q20H4D_ACTION_ONLY_STATUS_NOTICE
  665:     !isRemovedRecord && statusGovernance?.editMode === "action_only";
  666: 
  667:   const statusGuidanceToneClass =
  668:     // Q20H4C2_STATUS_GUIDANCE_TONE
  669:     statusGuidance?.tone === "success"
  670:       ? "border-emerald-100 bg-emerald-50/70 text-emerald-950"
  671:       : statusGuidance?.tone === "warning"
  672:         ? "border-amber-200 bg-amber-50/80 text-amber-950"
  673:         : statusGuidance?.tone === "danger"
  674:           ? "border-rose-200 bg-rose-50/80 text-rose-950"
  675:           : statusGuidance?.tone === "info"
  676:             ? "border-cyan-200 bg-cyan-50/80 text-cyan-950"
  677:             : "border-amber-200 bg-amber-50/80 text-amber-950";
  678: 
  679:   const statusGuidanceMessageClass =
  680:     statusGuidance?.tone === "success"
  681:       ? "text-emerald-900/80"
  682:       : statusGuidance?.tone === "danger"
  683:         ? "text-rose-900/80"
  684:         : statusGuidance?.tone === "info"
  685:           ? "text-cyan-900/80"
  686:           : "text-amber-900/80";
  687: 
  688:   const errorByField =
  689:     Object.fromEntries(
  690:       errors.map((error) => [
  691:         error.field,
  692:         error.message,
  693:       ])
  694:     ) as Record<string, string>;
  695: 
  696:   function toFriendlyRuntimeErrorMessage(

### statusGovernance — ligne 665

  655:       },
  656:     });
  657: 
  658:   const statusGuidance =
  659:     isRemovedRecord
  660:       ? null
  661:       : statusGovernance?.guidance?.[0] ?? null;
  662: 
  663:   const isStatusActionOnly =
  664:     // Q20H4D_ACTION_ONLY_STATUS_NOTICE
  665:     !isRemovedRecord && statusGovernance?.editMode === "action_only";
  666: 
  667:   const statusGuidanceToneClass =
  668:     // Q20H4C2_STATUS_GUIDANCE_TONE
  669:     statusGuidance?.tone === "success"
  670:       ? "border-emerald-100 bg-emerald-50/70 text-emerald-950"
  671:       : statusGuidance?.tone === "warning"
  672:         ? "border-amber-200 bg-amber-50/80 text-amber-950"
  673:         : statusGuidance?.tone === "danger"
  674:           ? "border-rose-200 bg-rose-50/80 text-rose-950"
  675:           : statusGuidance?.tone === "info"
  676:             ? "border-cyan-200 bg-cyan-50/80 text-cyan-950"
  677:             : "border-amber-200 bg-amber-50/80 text-amber-950";
  678: 
  679:   const statusGuidanceMessageClass =
  680:     statusGuidance?.tone === "success"
  681:       ? "text-emerald-900/80"
  682:       : statusGuidance?.tone === "danger"
  683:         ? "text-rose-900/80"
  684:         : statusGuidance?.tone === "info"
  685:           ? "text-cyan-900/80"
  686:           : "text-amber-900/80";
  687: 
  688:   const errorByField =
  689:     Object.fromEntries(
  690:       errors.map((error) => [
  691:         error.field,
  692:         error.message,
  693:       ])
  694:     ) as Record<string, string>;
  695: 
  696:   function toFriendlyRuntimeErrorMessage(
  697:     error: unknown
  698:   ): string {
  699:     const message =
  700:       error instanceof Error

### action_only — ligne 665

  655:       },
  656:     });
  657: 
  658:   const statusGuidance =
  659:     isRemovedRecord
  660:       ? null
  661:       : statusGovernance?.guidance?.[0] ?? null;
  662: 
  663:   const isStatusActionOnly =
  664:     // Q20H4D_ACTION_ONLY_STATUS_NOTICE
  665:     !isRemovedRecord && statusGovernance?.editMode === "action_only";
  666: 
  667:   const statusGuidanceToneClass =
  668:     // Q20H4C2_STATUS_GUIDANCE_TONE
  669:     statusGuidance?.tone === "success"
  670:       ? "border-emerald-100 bg-emerald-50/70 text-emerald-950"
  671:       : statusGuidance?.tone === "warning"
  672:         ? "border-amber-200 bg-amber-50/80 text-amber-950"
  673:         : statusGuidance?.tone === "danger"
  674:           ? "border-rose-200 bg-rose-50/80 text-rose-950"
  675:           : statusGuidance?.tone === "info"
  676:             ? "border-cyan-200 bg-cyan-50/80 text-cyan-950"
  677:             : "border-amber-200 bg-amber-50/80 text-amber-950";
  678: 
  679:   const statusGuidanceMessageClass =
  680:     statusGuidance?.tone === "success"
  681:       ? "text-emerald-900/80"
  682:       : statusGuidance?.tone === "danger"
  683:         ? "text-rose-900/80"
  684:         : statusGuidance?.tone === "info"
  685:           ? "text-cyan-900/80"
  686:           : "text-amber-900/80";
  687: 
  688:   const errorByField =
  689:     Object.fromEntries(
  690:       errors.map((error) => [
  691:         error.field,
  692:         error.message,
  693:       ])
  694:     ) as Record<string, string>;
  695: 
  696:   function toFriendlyRuntimeErrorMessage(
  697:     error: unknown
  698:   ): string {
  699:     const message =
  700:       error instanceof Error

### lockedFields — ligne 429

  419:   const queryLockedFields =
  420:     searchParams
  421:       .get("lockFields")
  422:       ?.split(",")
  423:       .map((item) => item.trim())
  424:       .filter(Boolean) ?? [];
  425: 
  426:   const compositionLocking =
  427:     module.composition as
  428:       | {
  429:           lockedFields?: string[];
  430:           readOnlyFields?: string[];
  431:           allowOverride?: string[];
  432:         }
  433:       | undefined;
  434: 
  435:   const hasParentContext =
  436:     Boolean(
  437:       queryValues.parentModuleKey ||
  438:       queryValues.parentRecordId ||
  439:       queryValues.parentForeignKey
  440:     );
  441: 
  442:   const compositionLockedFields =
  443:     compositionLocking?.lockedFields ?? [];
  444: 
  445:   const compositionReadOnlyFields =
  446:     compositionLocking?.readOnlyFields ?? [];
  447: 
  448:   const lockedFields =
  449:     mode === "create"
  450:       ? Array.from(
  451:           new Set([
  452:             ...queryLockedFields,
  453:           ])
  454:         )
  455:       : Array.from(
  456:           new Set([
  457:             ...compositionLockedFields,
  458:             ...queryLockedFields,
  459:           ])
  460:         );
  461: 
  462:   const isRemovedRecord =
  463:     forceReadOnlyBecauseRemoved ||
  464:     Boolean(initialData?.removedAt) ||

### lockedFields — ligne 443

  433:       | undefined;
  434: 
  435:   const hasParentContext =
  436:     Boolean(
  437:       queryValues.parentModuleKey ||
  438:       queryValues.parentRecordId ||
  439:       queryValues.parentForeignKey
  440:     );
  441: 
  442:   const compositionLockedFields =
  443:     compositionLocking?.lockedFields ?? [];
  444: 
  445:   const compositionReadOnlyFields =
  446:     compositionLocking?.readOnlyFields ?? [];
  447: 
  448:   const lockedFields =
  449:     mode === "create"
  450:       ? Array.from(
  451:           new Set([
  452:             ...queryLockedFields,
  453:           ])
  454:         )
  455:       : Array.from(
  456:           new Set([
  457:             ...compositionLockedFields,
  458:             ...queryLockedFields,
  459:           ])
  460:         );
  461: 
  462:   const isRemovedRecord =
  463:     forceReadOnlyBecauseRemoved ||
  464:     Boolean(initialData?.removedAt) ||
  465:     Boolean(initialData?.removedFromStatus) ||
  466:     Boolean(initialData?.removedReason) ||
  467:     Boolean(initialData?.stockReversalMovementId);
  468: 
  469:   const validatedReceptionReadOnlyFields =
  470:     // Q21D1B_VALIDATED_RECEPTION_READONLY_FIELDS
  471:     // A validated reception is a stock proof.
  472:     // Its critical fields must not be edited freely after stock impact.
  473:     module.metadata.key === "receptionsstockauto" &&
  474:     mode === "edit" &&
  475:     (
  476:       String(initialData?.statut ?? "") === "validee" ||
  477:       Boolean(initialData?.mouvementStockId)
  478:     )

### lockedFields — ligne 448

  438:       queryValues.parentRecordId ||
  439:       queryValues.parentForeignKey
  440:     );
  441: 
  442:   const compositionLockedFields =
  443:     compositionLocking?.lockedFields ?? [];
  444: 
  445:   const compositionReadOnlyFields =
  446:     compositionLocking?.readOnlyFields ?? [];
  447: 
  448:   const lockedFields =
  449:     mode === "create"
  450:       ? Array.from(
  451:           new Set([
  452:             ...queryLockedFields,
  453:           ])
  454:         )
  455:       : Array.from(
  456:           new Set([
  457:             ...compositionLockedFields,
  458:             ...queryLockedFields,
  459:           ])
  460:         );
  461: 
  462:   const isRemovedRecord =
  463:     forceReadOnlyBecauseRemoved ||
  464:     Boolean(initialData?.removedAt) ||
  465:     Boolean(initialData?.removedFromStatus) ||
  466:     Boolean(initialData?.removedReason) ||
  467:     Boolean(initialData?.stockReversalMovementId);
  468: 
  469:   const validatedReceptionReadOnlyFields =
  470:     // Q21D1B_VALIDATED_RECEPTION_READONLY_FIELDS
  471:     // A validated reception is a stock proof.
  472:     // Its critical fields must not be edited freely after stock impact.
  473:     module.metadata.key === "receptionsstockauto" &&
  474:     mode === "edit" &&
  475:     (
  476:       String(initialData?.statut ?? "") === "validee" ||
  477:       Boolean(initialData?.mouvementStockId)
  478:     )
  479:       ? [
  480:           "commandeId",
  481:           "ligneCommandeId",
  482:           "produitId",
  483:           "stockId",

### lockedFields — ligne 503

  493:       : mode === "create"
  494:         ? []
  495:         : Array.from(
  496:             new Set([
  497:               ...compositionReadOnlyFields,
  498:               ...validatedReceptionReadOnlyFields,
  499:             ])
  500:           );
  501: 
  502:   // Q15F_A2_ACTIVE_CREATE_LOCK_POLICY
  503:   // Creation directe : aucun champ composition.lockedFields n'est bloque.
  504:   // Creation enfant : seuls les champs transmis par lockFields dans l'URL sont bloques.es.
  505:   // Edit/detail : les verrous de composition restent appliques.
  506: 
  507:   const [saving, setSaving] = useState(false);
  508: 
  509:   const [errors, setErrors] =
  510:     useState<RuntimeValidationError[]>([]);
  511: 
  512:   const form =
  513:     ERPModuleBuilder.buildForm(module);
  514: 
  515:   function resolveInitialFormValues() {
  516:     const defaultValues =
  517:       Object.fromEntries(
  518:         form.fields
  519:           .filter(
  520:             (field) =>
  521:               field.defaultValue !== undefined
  522:           )
  523:           .map((field) => [
  524:             field.key,
  525:             field.defaultValue,
  526:           ])
  527:       );
  528: 
  529:     if (mode === "create") {
  530:       return applySchedulingInitialValues(
  531:         module,
  532:         {
  533:           ...defaultValues,
  534:           ...initialData,
  535:           ...queryValues,
  536:         }
  537:       );
  538:     }

### lockedFields — ligne 1686

 1676: 
 1677:       <section className="grid gap-8 xl:grid-cols-[1fr_360px]">
 1678:         <div className="space-y-6">
 1679:           {module.form?.layout === "tabs" ? (
 1680:             <ERPFormTabs
 1681:               module={module}
 1682:               initialData={formValues}
 1683:               formValues={formValues}
 1684:               onFieldChange={handleFieldChange}
 1685:               fieldErrors={errorByField}
 1686:               lockedFields={lockedFields}
 1687:               readOnlyFields={readOnlyFields}
 1688:             />
 1689:           ) : (
 1690:             <>
 1691:               <ERPFormSection
 1692:                 title="Informations principales"
 1693:                 description="Renseigne les champs principaux du module."
 1694:               >
 1695:                 {mainFields.map((field) => (
 1696:                   <ERPFormField
 1697:                     key={field.key}
 1698:                     field={field}
 1699:                     value={formValues[field.key]}
 1700:                     formValues={formValues}
 1701:                     onChange={handleFieldChange}
 1702:                     error={errorByField[field.key]}
 1703:                     lockedFields={lockedFields}
 1704:                       readOnlyFields={readOnlyFields}
 1705:                   />
 1706:                 ))}
 1707:               </ERPFormSection>
 1708: 
 1709:               {relationFields.length > 0 && (
 1710:                 <ERPFormSection
 1711:                   title="Relations"
 1712:                   description="Associe cet element aux autres objets metier."
 1713:                 >
 1714:                   {relationFields.map((field) => (
 1715:                     <ERPFormField
 1716:                       key={field.key}
 1717:                       field={field}
 1718:                       value={formValues[field.key]}
 1719:                       formValues={formValues}
 1720:                     onChange={handleFieldChange}
 1721:                       error={errorByField[field.key]}

### lockedFields — ligne 1703

 1693:                 description="Renseigne les champs principaux du module."
 1694:               >
 1695:                 {mainFields.map((field) => (
 1696:                   <ERPFormField
 1697:                     key={field.key}
 1698:                     field={field}
 1699:                     value={formValues[field.key]}
 1700:                     formValues={formValues}
 1701:                     onChange={handleFieldChange}
 1702:                     error={errorByField[field.key]}
 1703:                     lockedFields={lockedFields}
 1704:                       readOnlyFields={readOnlyFields}
 1705:                   />
 1706:                 ))}
 1707:               </ERPFormSection>
 1708: 
 1709:               {relationFields.length > 0 && (
 1710:                 <ERPFormSection
 1711:                   title="Relations"
 1712:                   description="Associe cet element aux autres objets metier."
 1713:                 >
 1714:                   {relationFields.map((field) => (
 1715:                     <ERPFormField
 1716:                       key={field.key}
 1717:                       field={field}
 1718:                       value={formValues[field.key]}
 1719:                       formValues={formValues}
 1720:                     onChange={handleFieldChange}
 1721:                       error={errorByField[field.key]}
 1722:                       lockedFields={lockedFields}
 1723:                       readOnlyFields={readOnlyFields}
 1724:                     />
 1725:                   ))}
 1726:                 </ERPFormSection>
 1727:               )}
 1728:             </>
 1729:           )}
 1730: <div className="flex flex-wrap gap-3 rounded-2xl sm:rounded-3xl border border-[var(--erp-border)] bg-[var(--erp-surface)] p-5 shadow-sm">
 1731:             {isStatusActionOnly && (
 1732:           <div
 1733:             className="
 1734:               rounded-2xl
 1735:               border
 1736:               border-slate-200
 1737:               bg-slate-50
 1738:               px-5

### lockedFields — ligne 1722

 1712:                   description="Associe cet element aux autres objets metier."
 1713:                 >
 1714:                   {relationFields.map((field) => (
 1715:                     <ERPFormField
 1716:                       key={field.key}
 1717:                       field={field}
 1718:                       value={formValues[field.key]}
 1719:                       formValues={formValues}
 1720:                     onChange={handleFieldChange}
 1721:                       error={errorByField[field.key]}
 1722:                       lockedFields={lockedFields}
 1723:                       readOnlyFields={readOnlyFields}
 1724:                     />
 1725:                   ))}
 1726:                 </ERPFormSection>
 1727:               )}
 1728:             </>
 1729:           )}
 1730: <div className="flex flex-wrap gap-3 rounded-2xl sm:rounded-3xl border border-[var(--erp-border)] bg-[var(--erp-surface)] p-5 shadow-sm">
 1731:             {isStatusActionOnly && (
 1732:           <div
 1733:             className="
 1734:               rounded-2xl
 1735:               border
 1736:               border-slate-200
 1737:               bg-slate-50
 1738:               px-5
 1739:               py-3
 1740:               text-sm
 1741:               text-slate-700
 1742:               shadow-sm
 1743:             "
 1744:           >
 1745:             <span className="font-semibold text-slate-900">
 1746:               Statut pilote par les actions.
 1747:             </span>{" "}
 1748:             Le statut indique l'etat metier de la fiche. Pour changer cet etat,
 1749:             utilisez les boutons d'action prevus par le systeme.
 1750:           </div>
 1751:         )}
 1752: 
 1753:         {statusGuidance && (
 1754:           <div
 1755:             className={[
 1756:               "rounded-2xl border px-5 py-4 text-sm shadow-sm",
 1757:               statusGuidanceToneClass,

### readOnly — ligne 430

  420:     searchParams
  421:       .get("lockFields")
  422:       ?.split(",")
  423:       .map((item) => item.trim())
  424:       .filter(Boolean) ?? [];
  425: 
  426:   const compositionLocking =
  427:     module.composition as
  428:       | {
  429:           lockedFields?: string[];
  430:           readOnlyFields?: string[];
  431:           allowOverride?: string[];
  432:         }
  433:       | undefined;
  434: 
  435:   const hasParentContext =
  436:     Boolean(
  437:       queryValues.parentModuleKey ||
  438:       queryValues.parentRecordId ||
  439:       queryValues.parentForeignKey
  440:     );
  441: 
  442:   const compositionLockedFields =
  443:     compositionLocking?.lockedFields ?? [];
  444: 
  445:   const compositionReadOnlyFields =
  446:     compositionLocking?.readOnlyFields ?? [];
  447: 
  448:   const lockedFields =
  449:     mode === "create"
  450:       ? Array.from(
  451:           new Set([
  452:             ...queryLockedFields,
  453:           ])
  454:         )
  455:       : Array.from(
  456:           new Set([
  457:             ...compositionLockedFields,
  458:             ...queryLockedFields,
  459:           ])
  460:         );
  461: 
  462:   const isRemovedRecord =
  463:     forceReadOnlyBecauseRemoved ||
  464:     Boolean(initialData?.removedAt) ||
  465:     Boolean(initialData?.removedFromStatus) ||

### readOnly — ligne 446

  436:     Boolean(
  437:       queryValues.parentModuleKey ||
  438:       queryValues.parentRecordId ||
  439:       queryValues.parentForeignKey
  440:     );
  441: 
  442:   const compositionLockedFields =
  443:     compositionLocking?.lockedFields ?? [];
  444: 
  445:   const compositionReadOnlyFields =
  446:     compositionLocking?.readOnlyFields ?? [];
  447: 
  448:   const lockedFields =
  449:     mode === "create"
  450:       ? Array.from(
  451:           new Set([
  452:             ...queryLockedFields,
  453:           ])
  454:         )
  455:       : Array.from(
  456:           new Set([
  457:             ...compositionLockedFields,
  458:             ...queryLockedFields,
  459:           ])
  460:         );
  461: 
  462:   const isRemovedRecord =
  463:     forceReadOnlyBecauseRemoved ||
  464:     Boolean(initialData?.removedAt) ||
  465:     Boolean(initialData?.removedFromStatus) ||
  466:     Boolean(initialData?.removedReason) ||
  467:     Boolean(initialData?.stockReversalMovementId);
  468: 
  469:   const validatedReceptionReadOnlyFields =
  470:     // Q21D1B_VALIDATED_RECEPTION_READONLY_FIELDS
  471:     // A validated reception is a stock proof.
  472:     // Its critical fields must not be edited freely after stock impact.
  473:     module.metadata.key === "receptionsstockauto" &&
  474:     mode === "edit" &&
  475:     (
  476:       String(initialData?.statut ?? "") === "validee" ||
  477:       Boolean(initialData?.mouvementStockId)
  478:     )
  479:       ? [
  480:           "commandeId",
  481:           "ligneCommandeId",

### readOnly — ligne 490

  480:           "commandeId",
  481:           "ligneCommandeId",
  482:           "produitId",
  483:           "stockId",
  484:           "quantiteRecue",
  485:           "dateReception",
  486:           "statut",
  487:         ]
  488:       : [];
  489: 
  490:   const readOnlyFields =
  491:     isRemovedRecord
  492:       ? module.schema.fields.map((field) => field.key)
  493:       : mode === "create"
  494:         ? []
  495:         : Array.from(
  496:             new Set([
  497:               ...compositionReadOnlyFields,
  498:               ...validatedReceptionReadOnlyFields,
  499:             ])
  500:           );
  501: 
  502:   // Q15F_A2_ACTIVE_CREATE_LOCK_POLICY
  503:   // Creation directe : aucun champ composition.lockedFields n'est bloque.
  504:   // Creation enfant : seuls les champs transmis par lockFields dans l'URL sont bloques.es.
  505:   // Edit/detail : les verrous de composition restent appliques.
  506: 
  507:   const [saving, setSaving] = useState(false);
  508: 
  509:   const [errors, setErrors] =
  510:     useState<RuntimeValidationError[]>([]);
  511: 
  512:   const form =
  513:     ERPModuleBuilder.buildForm(module);
  514: 
  515:   function resolveInitialFormValues() {
  516:     const defaultValues =
  517:       Object.fromEntries(
  518:         form.fields
  519:           .filter(
  520:             (field) =>
  521:               field.defaultValue !== undefined
  522:           )
  523:           .map((field) => [
  524:             field.key,
  525:             field.defaultValue,

### readOnly — ligne 1687

 1677:       <section className="grid gap-8 xl:grid-cols-[1fr_360px]">
 1678:         <div className="space-y-6">
 1679:           {module.form?.layout === "tabs" ? (
 1680:             <ERPFormTabs
 1681:               module={module}
 1682:               initialData={formValues}
 1683:               formValues={formValues}
 1684:               onFieldChange={handleFieldChange}
 1685:               fieldErrors={errorByField}
 1686:               lockedFields={lockedFields}
 1687:               readOnlyFields={readOnlyFields}
 1688:             />
 1689:           ) : (
 1690:             <>
 1691:               <ERPFormSection
 1692:                 title="Informations principales"
 1693:                 description="Renseigne les champs principaux du module."
 1694:               >
 1695:                 {mainFields.map((field) => (
 1696:                   <ERPFormField
 1697:                     key={field.key}
 1698:                     field={field}
 1699:                     value={formValues[field.key]}
 1700:                     formValues={formValues}
 1701:                     onChange={handleFieldChange}
 1702:                     error={errorByField[field.key]}
 1703:                     lockedFields={lockedFields}
 1704:                       readOnlyFields={readOnlyFields}
 1705:                   />
 1706:                 ))}
 1707:               </ERPFormSection>
 1708: 
 1709:               {relationFields.length > 0 && (
 1710:                 <ERPFormSection
 1711:                   title="Relations"
 1712:                   description="Associe cet element aux autres objets metier."
 1713:                 >
 1714:                   {relationFields.map((field) => (
 1715:                     <ERPFormField
 1716:                       key={field.key}
 1717:                       field={field}
 1718:                       value={formValues[field.key]}
 1719:                       formValues={formValues}
 1720:                     onChange={handleFieldChange}
 1721:                       error={errorByField[field.key]}
 1722:                       lockedFields={lockedFields}

### readOnly — ligne 1704

 1694:               >
 1695:                 {mainFields.map((field) => (
 1696:                   <ERPFormField
 1697:                     key={field.key}
 1698:                     field={field}
 1699:                     value={formValues[field.key]}
 1700:                     formValues={formValues}
 1701:                     onChange={handleFieldChange}
 1702:                     error={errorByField[field.key]}
 1703:                     lockedFields={lockedFields}
 1704:                       readOnlyFields={readOnlyFields}
 1705:                   />
 1706:                 ))}
 1707:               </ERPFormSection>
 1708: 
 1709:               {relationFields.length > 0 && (
 1710:                 <ERPFormSection
 1711:                   title="Relations"
 1712:                   description="Associe cet element aux autres objets metier."
 1713:                 >
 1714:                   {relationFields.map((field) => (
 1715:                     <ERPFormField
 1716:                       key={field.key}
 1717:                       field={field}
 1718:                       value={formValues[field.key]}
 1719:                       formValues={formValues}
 1720:                     onChange={handleFieldChange}
 1721:                       error={errorByField[field.key]}
 1722:                       lockedFields={lockedFields}
 1723:                       readOnlyFields={readOnlyFields}
 1724:                     />
 1725:                   ))}
 1726:                 </ERPFormSection>
 1727:               )}
 1728:             </>
 1729:           )}
 1730: <div className="flex flex-wrap gap-3 rounded-2xl sm:rounded-3xl border border-[var(--erp-border)] bg-[var(--erp-surface)] p-5 shadow-sm">
 1731:             {isStatusActionOnly && (
 1732:           <div
 1733:             className="
 1734:               rounded-2xl
 1735:               border
 1736:               border-slate-200
 1737:               bg-slate-50
 1738:               px-5
 1739:               py-3

### readOnly — ligne 1723

 1713:                 >
 1714:                   {relationFields.map((field) => (
 1715:                     <ERPFormField
 1716:                       key={field.key}
 1717:                       field={field}
 1718:                       value={formValues[field.key]}
 1719:                       formValues={formValues}
 1720:                     onChange={handleFieldChange}
 1721:                       error={errorByField[field.key]}
 1722:                       lockedFields={lockedFields}
 1723:                       readOnlyFields={readOnlyFields}
 1724:                     />
 1725:                   ))}
 1726:                 </ERPFormSection>
 1727:               )}
 1728:             </>
 1729:           )}
 1730: <div className="flex flex-wrap gap-3 rounded-2xl sm:rounded-3xl border border-[var(--erp-border)] bg-[var(--erp-surface)] p-5 shadow-sm">
 1731:             {isStatusActionOnly && (
 1732:           <div
 1733:             className="
 1734:               rounded-2xl
 1735:               border
 1736:               border-slate-200
 1737:               bg-slate-50
 1738:               px-5
 1739:               py-3
 1740:               text-sm
 1741:               text-slate-700
 1742:               shadow-sm
 1743:             "
 1744:           >
 1745:             <span className="font-semibold text-slate-900">
 1746:               Statut pilote par les actions.
 1747:             </span>{" "}
 1748:             Le statut indique l'etat metier de la fiche. Pour changer cet etat,
 1749:             utilisez les boutons d'action prevus par le systeme.
 1750:           </div>
 1751:         )}
 1752: 
 1753:         {statusGuidance && (
 1754:           <div
 1755:             className={[
 1756:               "rounded-2xl border px-5 py-4 text-sm shadow-sm",
 1757:               statusGuidanceToneClass,
 1758:             ].join(" ")}

### disabled — ligne 1471

 1461: 
 1462:   function getBusinessStatusAction() {
 1463:     // AMARKHYS-REBUILD-05C
 1464:     // Workflow/status/business actions must be rendered by ERPRuntimePage / ERPRuntimeActionBar.
 1465:     // ERPEnterpriseForm must remain a form-only component and must not expose record-level actions.
 1466:     return null;
 1467:   }
 1468: 
 1469:   async function handleBusinessStatusAction() {
 1470:     // AMARKHYS-REBUILD-05C-FIX1
 1471:     // Form-level business/status actions are disabled.
 1472:     // Runtime actions must be executed from ERPRuntimePage / ERPRuntimeActionBar.
 1473:     return;
 1474:   }
 1475: 
 1476:   const businessStatusAction = mode === "create" || isRemovedRecord ? null : getBusinessStatusAction();
 1477: 
 1478:   function isSensitiveBusinessModule() {
 1479:     return [
 1480:       "clientsauto",
 1481:       "vehicules",
 1482:       "facturesauto",
 1483:       "encaissementsauto",
 1484:       "echeancespaiementauto",
 1485:       "lignesinterventionauto",
 1486:       "receptionsstockauto",
 1487:     ].includes(module.metadata.key);
 1488:   }
 1489: 
 1490:   const sensitiveBusinessModule =
 1491:     isSensitiveBusinessModule();
 1492: 
 1493:   return (
 1494:     <form
 1495:         ref={formRef}
 1496:         style={getWorkspaceThemeStyle(
 1497:           module.metadata.category === "amarkhys" ||
 1498:           module.metadata.key.endsWith("auto")
 1499:             ? "amarkhys-petronas"
 1500:             : module.metadata.category === "production" ||
 1501:                 module.metadata.category === "agri"
 1502:               ? "agri-enterprise"
 1503:               : "default-enterprise"
 1504:         )}
 1505:         className="
 1506:           space-y-5 sm:space-y-6 lg:space-y-8

### disabled — ligne 1801

 1791:             )}
 1792: 
 1793:             {/* AMARKHYS-REBUILD-05C-FIX3: form-level business/status action render removed. Runtime actions are rendered by ERPRuntimePage / ERPRuntimeActionBar. */}
 1794: 
 1795: 
 1796: 
 1797:             {!isRemovedRecord ? (
 1798:               <>
 1799:                 <ERPButton
 1800:                   type="submit"
 1801:                   disabled={saving}
 1802:                 >
 1803:                   {saving
 1804:                     ? "Enregistrement..."
 1805:                     : "Enregistrer"}
 1806:                 </ERPButton>
 1807: 
 1808:                 <ERPButton
 1809:                   variant="secondary"
 1810:                   type="button"
 1811:                   disabled={saving}
 1812:                   onClick={() =>
 1813:                     router.push(
 1814:                       returnTo ??
 1815:                         module.metadata.routes?.list ??
 1816:                         `/${module.metadata.key}`
 1817:                     )
 1818:                   }
 1819:                 >
 1820:                   Annuler
 1821:                 </ERPButton>
 1822:               </>
 1823:             ) : null}
 1824: 
 1825:                         {mode === "edit" && Boolean(initialData?.id) && sensitiveBusinessModule ? (
 1826:               <div
 1827:                 data-sensitive-delete-hidden-notice
 1828:                 className="w-full rounded-2xl border border-[var(--erp-border-strong)] bg-[var(--erp-primary-soft)] px-4 py-3 text-sm text-[var(--erp-text-muted)]"
 1829:               >
 1830:                 Suppression masquee pour preserver l'historique. Utilisez l'action metier adaptee, comme "Retirer la ligne", afin que le stock, les totaux et la tracabilite soient corriges proprement.
 1831:               </div>
 1832:             ) : null}
 1833: 
 1834: {mode === "edit" && Boolean(initialData?.id) && !sensitiveBusinessModule ? (
 1835:               <ERPButton
 1836:                 type="button"

### disabled — ligne 1811

 1801:                   disabled={saving}
 1802:                 >
 1803:                   {saving
 1804:                     ? "Enregistrement..."
 1805:                     : "Enregistrer"}
 1806:                 </ERPButton>
 1807: 
 1808:                 <ERPButton
 1809:                   variant="secondary"
 1810:                   type="button"
 1811:                   disabled={saving}
 1812:                   onClick={() =>
 1813:                     router.push(
 1814:                       returnTo ??
 1815:                         module.metadata.routes?.list ??
 1816:                         `/${module.metadata.key}`
 1817:                     )
 1818:                   }
 1819:                 >
 1820:                   Annuler
 1821:                 </ERPButton>
 1822:               </>
 1823:             ) : null}
 1824: 
 1825:                         {mode === "edit" && Boolean(initialData?.id) && sensitiveBusinessModule ? (
 1826:               <div
 1827:                 data-sensitive-delete-hidden-notice
 1828:                 className="w-full rounded-2xl border border-[var(--erp-border-strong)] bg-[var(--erp-primary-soft)] px-4 py-3 text-sm text-[var(--erp-text-muted)]"
 1829:               >
 1830:                 Suppression masquee pour preserver l'historique. Utilisez l'action metier adaptee, comme "Retirer la ligne", afin que le stock, les totaux et la tracabilite soient corriges proprement.
 1831:               </div>
 1832:             ) : null}
 1833: 
 1834: {mode === "edit" && Boolean(initialData?.id) && !sensitiveBusinessModule ? (
 1835:               <ERPButton
 1836:                 type="button"
 1837:                 variant="danger"
 1838:                 disabled={saving || isRemovedRecord}
 1839:                 onClick={handleDeleteRecord}
 1840:               >
 1841:                 Supprimer
 1842:               </ERPButton>
 1843:             ) : null}
 1844:           </div>
 1845:         </div>
 1846: 

### disabled — ligne 1838

 1828:                 className="w-full rounded-2xl border border-[var(--erp-border-strong)] bg-[var(--erp-primary-soft)] px-4 py-3 text-sm text-[var(--erp-text-muted)]"
 1829:               >
 1830:                 Suppression masquee pour preserver l'historique. Utilisez l'action metier adaptee, comme "Retirer la ligne", afin que le stock, les totaux et la tracabilite soient corriges proprement.
 1831:               </div>
 1832:             ) : null}
 1833: 
 1834: {mode === "edit" && Boolean(initialData?.id) && !sensitiveBusinessModule ? (
 1835:               <ERPButton
 1836:                 type="button"
 1837:                 variant="danger"
 1838:                 disabled={saving || isRemovedRecord}
 1839:                 onClick={handleDeleteRecord}
 1840:               >
 1841:                 Supprimer
 1842:               </ERPButton>
 1843:             ) : null}
 1844:           </div>
 1845:         </div>
 1846: 
 1847:         <ERPFormSummaryPanel module={module} />
 1848:       </section>
 1849:     </form>
 1850:   );
 1851: }
 1852: 

## Décision attendue

- Si RuntimeStatusGovernanceEngine supporte déjà action_only : ajouter rendezvous à la policy.
- Si ERPEnterpriseForm applique déjà action_only : ne pas patcher le formulaire.
- Si le champ statut doit être verrouillé par metadata : utiliser la propriété existante readonly/locked si elle existe.
- Le statut doit rester visible et être modifié uniquement par les actions runtime.
