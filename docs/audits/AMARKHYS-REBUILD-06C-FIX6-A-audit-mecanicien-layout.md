# AMARKHYS-REBUILD-06C-FIX6-A — Audit mecanicienId layout

Date: 2026-05-31T22:07:04.860Z

## Objectif

Vérifier si mecanicienId est réellement dans le form.tabs.sections.fields rendu par ERPEnterpriseForm.

## Hits

- key: "mecanicienId" — L63: key: "mecanicienId",
- "mecanicienId" — L63: key: "mecanicienId",
- "mecanicienId" — L182: "mecanicienId",
- "mecanicienId" — L195: "mecanicienId",
- form: — L170: form: {
- tabs: — L173: tabs: [
- sections: — L187: sections: [
- sections: — L212: sections: [
- sections: — L234: sections: [
- fields: — L32: fields: [
- fields: — L178: fields: [
- fields: — L191: fields: [
- fields: — L207: fields: [
- fields: — L216: fields: [
- fields: — L228: fields: [
- fields: — L238: fields: [
- fields: — L341: fields: [
- clientId — L34: key: "clientId",
- clientId — L179: "clientId",
- clientId — L192: "clientId",
- clientId — L331: key: "clientId",
- clientId — L333: field: "clientId",
- clientId — L342: "clientId",
- clientId — L350: clientId: [
- clientId — L414: relationField: "clientId",
- clientId — L455: field: "clientId",
- clientId — L485: field: "clientId",
- clientId — L513: "clientId",
- clientId — L530: "clientId",
- clientId — L539: "clientId",
- clientId — L548: "clientId",
- clientId — L623: clientId: "clientId",
- clientId — L626: lockFields: ["interventionId", "clientId", "vehiculeId"],
- clientId — L628: subtitleFields: ["clientId", "vehiculeId", "dateFacture"],
- clientId — L632: field: "clientId",
- vehiculeId — L44: key: "vehiculeId",
- vehiculeId — L180: "vehiculeId",
- vehiculeId — L193: "vehiculeId",
- vehiculeId — L343: "vehiculeId",
- vehiculeId — L355: vehiculeId: [
- vehiculeId — L424: relationField: "vehiculeId",
- vehiculeId — L464: field: "vehiculeId",
- vehiculeId — L502: field: "vehiculeId",
- vehiculeId — L531: "vehiculeId",
- vehiculeId — L540: "vehiculeId",
- vehiculeId — L549: "vehiculeId",
- vehiculeId — L624: vehiculeId: "vehiculeId",
- vehiculeId — L626: lockFields: ["interventionId", "clientId", "vehiculeId"],
- vehiculeId — L628: subtitleFields: ["clientId", "vehiculeId", "dateFacture"],
- vehiculeId — L637: field: "vehiculeId",
- rendezVousId — L54: key: "rendezVousId",
- rendezVousId — L181: "rendezVousId",
- rendezVousId — L194: "rendezVousId",
- rendezVousId — L360: rendezVousId: [
- rendezVousId — L434: relationField: "rendezVousId",
- rendezVousId — L473: field: "rendezVousId",
- rendezVousId — L519: field: "rendezVousId",
- rendezVousId — L541: "rendezVousId",
- rendezVousId — L550: "rendezVousId",
- dateIntervention — L73: key: "dateIntervention",
- dateIntervention — L183: "dateIntervention",
- dateIntervention — L196: "dateIntervention",
- dateIntervention — L344: "dateIntervention",
- dateIntervention — L448: "dateIntervention",
- kilometrage — L96: key: "kilometrage",

## Bloc field mecanicienId

   53: {
   54:         key: "rendezVousId",
   55:         label: "Rendez-vous",
   56:         type: "relation",
   57:         relation: { module: "rendezvous" },
   58:         searchable: true,
   59:         list: { visible: false },
   60:         grid: { cols: 6 },
   61:       },
   62:       {
   63:         key: "mecanicienId",
   64:         label: "Mécanicien responsable",
   65:         type: "relation",
   66:         relation: { module: "employes" },
   67:         searchable: true,
   68:         list: { visible: true, order: 5 },
   69:         grid: { cols: 6 },
   70:         helperText: "Mécanicien responsable réel de l’intervention.",
   71:       },
   72: {
   73:         key: "dateIntervention",
   74:         label: "Date intervention",
   75:         type: "date",
   76:         required: true,
   77:         list: { visible: true, order: 3 },
   78:         grid: { cols: 6 },
   79:       },
   80: {
   81:         key: "typeIntervention",
   82:         label: "Type intervention",
   83:         type: "select",

## Bloc form

  170:   form: {
  171:     layout: "tabs",
  172: 
  173:     tabs: [
  174:       {
  175:         key: "contexte",
  176:         label: "Contexte",
  177: 
  178:         fields: [
  179:           "clientId",
  180:           "vehiculeId",
  181:           "rendezVousId",
  182:               "mecanicienId",
  183:           "dateIntervention",
  184:           "typeIntervention",          "statut",
  185:         ],
  186: 
  187:         sections: [
  188:           {
  189:             key: "infos",
  190:             title: "Informations intervention",
  191:             fields: [
  192:               "clientId",
  193:               "vehiculeId",
  194:               "rendezVousId",
  195:               "mecanicienId",
  196:               "dateIntervention",
  197:               "typeIntervention",              "statut",
  198:             ],
  199:           },
  200:         ],
  201:       },
  202: 
  203:       {
  204:         key: "atelier",
  205:         label: "Atelier",
  206: 
  207:         fields: [
  208:           "diagnostic",
  209:           "travauxEffectues",
  210:         ],
  211: 
  212:         sections: [
  213:           {
  214:             key: "travaux",
  215:             title: "Diagnostic et travaux",
  216:             fields: [
  217:               "diagnostic",
  218:               "travauxEffectues",
  219:             ],
  220:           },
  221:         ],
  222:       },
  223: 
  224:       {
  225:         key: "couts",
  226:         label: "Coûts",
  227: 
  228:         fields: [
  229:           "coutPieces",
  230:           "coutMainOeuvre",
  231:           "coutTotal",
  232:         ],
  233: 
  234:         sections: [
  235:           {
  236:             key: "financier",
  237:             title: "Coûts intervention",
  238:             fields: [
  239:               "coutPieces",
  240:               "coutMainOeuvre",
  241:               "coutTotal",
  242:             ],
  243:           },
  244:         ],
  245:       },
  246:     ],
  247:   },
  248: 
  249: 
  250:   operational: {
  251:     enabled: true,
  252:     title: "Interventions",
  253:     subtitle: "Vue opérationnelle des interventions atelier.",
  254:     branding: {
  255:       brandName: "AMARKHYS",
  256:       runtimeLabel: "Runtime ERP",
  257:       eyebrow: "AMARKHYS · Runtime ERP",
  258:     },
  259:     kpis: [
  260:       {
  261:         key: "total",
  262:         label: "Total",
  263:         count: true,
  264:         tone: "blue",
  265:         icon: "activity",
  266:         description: "Nombre total d'interventions affichées.",
  267:       },
  268:       {
  269:         key: "ouvertes",
  270:         label: "Ouvertes",
  271:         field: "statut",
  272:         equals: "ouverte",
  273:         tone: "blue",
  274:         icon: "calendar",
  275:       },
  276:       {
  277:         key: "en_cours",
  278:         label: "En cours",
  279:         field: "statut",
  280:         equals: "en_cours",
  281:         tone: "orange",
  282:         icon: "clock",
  283:       },
  284:       {
  285:         key: "terminees",
  286:         label: "Terminées",
  287:         field: "statut",
  288:         equals: "terminee",
  289:         tone: "green",
  290:         icon: "check",
  291:       },
  292:       {
  293:         key: "annulees",
  294:         label: "Annulées",
  295:         field: "statut",
  296:         equals: "annulee",
  297:         tone: "gray",
  298:         icon: "x",
  299:       },
  300:     ],
  301:     filters: [
  302:       {
  303:         key: "statut",
  304:         label: "Statut",
  305:         field: "statut",
  306:         type: "select",
  307:         options: [
  308:           { label: "Ouverte", value: "ouverte" },
  309:           { label: "Diagnostic", value: "diagnostic" },
  310:           { label: "En cours", value: "en_cours" },
  311:           { label: "Terminée", value: "terminee" },
  312:           { label: "Facturée", value: "facturee" },
  313:           { label: "Annulée", value: "annulee" },
  314:         ],
  315:       },
  316:       {
  317:         key: "typeIntervention",
  318:         label: "Type intervention",
  319:         field: "typeIntervention",
  320:         type: "select",
  321:         options: [
  322:           { label: "Vidange", value: "vidange" },
  323:           { label: "Diagnostic", value: "diagnostic" },
  324:           { label: "Réparation", value: "reparation" },
  325:           { label: "Pneumatiques", value: "pneumatiques" },
  326:           { label: "Contrôle", value: "controle" },
  327:           { label: "Autre", value: "autre" },
  328:         ],
  329:       },
  330:       {

## Bloc rendezVousId

   34:         key: "clientId",
   35:         label: "Client",
   36:         type: "relation",
   37:         relation: { module: "clientsauto" },
   38:         required: true,
   39:         searchable: true,
   40:         list: { visible: true, order: 1 },
   41:         grid: { cols: 6 },
   42:       },
   43: {
   44:         key: "vehiculeId",
   45:         label: "Véhicule",
   46:         type: "relation",
   47:         relation: { module: "vehicules" },
   48:         required: true,
   49:         searchable: true,
   50:         list: { visible: true, order: 2 },
   51:         grid: { cols: 6 },
   52:       },
   53: {
   54:         key: "rendezVousId",
   55:         label: "Rendez-vous",
   56:         type: "relation",
   57:         relation: { module: "rendezvous" },
   58:         searchable: true,
   59:         list: { visible: false },
   60:         grid: { cols: 6 },
   61:       },
   62:       {
   63:         key: "mecanicienId",
   64:         label: "Mécanicien responsable",
   65:         type: "relation",
   66:         relation: { module: "employes" },
   67:         searchable: true,
   68:         list: { visible: true, order: 5 },
   69:         grid: { cols: 6 },
   70:         helperText: "Mécanicien responsable réel de l’intervention.",
   71:       },
   72: {
   73:         key: "dateIntervention",
   74:         label: "Date intervention",
   75:         type: "date",
   76:         required: true,
   77:         list: { visible: true, order: 3 },
   78:         grid: { cols: 6 },
   79:       },
   80: {
   81:         key: "typeIntervention",
   82:         label: "Type intervention",
   83:         type: "select",
   84:         options: [
   85:           { label: "Vidange", value: "vidange" },
   86:           { label: "Diagnostic", value: "diagnostic" },
   87:           { label: "Réparation", value: "reparation" },
   88:           { label: "Pneumatiques", value: "pneumatiques" },
   89:           { label: "Contrôle", value: "controle" },
   90:           { label: "Autre", value: "autre" },
   91:         ],
   92:         list: { visible: true, order: 4 },
   93:         grid: { cols: 6 },
   94:       },