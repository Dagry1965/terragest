# AMARKHYS-REBUILD-05D — Audit RDV intervention related panel

Date: 2026-05-31T17:25:20.349Z

## Décision métier

- Un RDV ne doit pas servir à créer plusieurs interventions.
- Le formulaire edit RDV ne doit pas afficher le panneau de composition intervention.
- La création d'intervention doit passer par une action runtime contrôlée.
- Une intervention peut ensuite porter plusieurs lignes d'intervention.

## Hits rendezvous.module.ts

- interventionsauto — L120: relation: { module: "interventionsauto" },
- intervention — L120: relation: { module: "interventionsauto" },
- intervention — L400: // Rendez-vous knows its client, vehicle and generated intervention.
- intervention — L423: key: "interventions-rendezvous",
- interventionsauto — L424: moduleKey: "interventionsauto",
- intervention — L424: moduleKey: "interventionsauto",
- foreignKey — L425: foreignKey: "rendezVousId",
- rendezVousId — L425: foreignKey: "rendezVousId",
- Intervention générée — L426: title: "Intervention générée",
- displayIn — L428: displayIn: ["detail"],
- allowCreate — L431: allowCreate: false,
- intervention — L432: createLabel: "Créer une intervention",
- Créer une intervention — L432: createLabel: "Créer une intervention",
- intervention — L433: openLabel: "Ouvrir intervention",
- rendezVousId — L435: rendezVousId: "id",
- rendezVousId — L439: lockFields: ["rendezVousId", "clientId", "vehiculeId"],

## Hits rendezvous.actions.ts


## Lecture recommandée

Corriger uniquement le bloc related/children RDV -> interventionsauto : pas d'affichage en edit, pas de création depuis ce panneau.
