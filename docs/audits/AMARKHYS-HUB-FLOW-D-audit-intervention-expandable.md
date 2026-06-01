# AMARKHYS-HUB-FLOW-D — Audit intervention expandable readiness

Date: 2026-06-01T02:52:57.328Z

## Objectif

- Auditer le rendu actuel des interventions dans le hub client.
- Préparer expansion + / - avec lignes d’intervention.

## Règle cible

- Rendez-vous = filtre.
- Intervention = élément expandable.
- Expansion intervention = synthèse + lignes + totaux + actions utiles.
- Ne pas toucher aux factures / encaissements dans cette passe.

## Checks

- OK — état expandedInterventionId existe
- OK — toggleExpandedIntervention existe
- OK — rendu interventions localisé
- OK — sélection intervention existe
- OK — lignes disponibles dans le composant
- OK — filtrage lignes par intervention existe ou à créer
- FAIL — bloc actuel des lignes localisé

## Synthèse

- OK: 6
- FAIL: 1

## Hits

- L169 — statut — labelFields: ["dateRendezVous", "heureRendezVous", "heure", "typeService", "statut"],
- L183 — statut — labelFields: ["dateIntervention", "titre", "numeroIntervention", "statut"],
- L183 — dateIntervention — labelFields: ["dateIntervention", "titre", "numeroIntervention", "statut"],
- L184 — montantTTC — subtitleFields: ["montantTTC", "montantHT", "rendezVousId"],
- L184 — montantHT — subtitleFields: ["montantTTC", "montantHT", "rendezVousId"],
- L193 — interventionId — foreignKey: "interventionId",
- L198 — statut — labelFields: ["designation", "typeLigne", "produitLabel", "statut"],
- L208 — interventionId — foreignKey: "interventionId",
- L212 — montantTTC — totalField: "montantTTC",
- L213 — montantTTC — labelFields: ["numero", "numeroFacture", "statut", "montantTTC"],
- L213 — statut — labelFields: ["numero", "numeroFacture", "statut", "montantTTC"],
- L214 — montantHT — subtitleFields: ["dateFacture", "montantHT", "tva", "resteAPayer"],
- L230 — expandedInterventionId — const [expandedInterventionId, setExpandedInterventionId] = useState<string | null>(null);
- L230 — setExpandedInterventionId — const [expandedInterventionId, setExpandedInterventionId] = useState<string | null>(null);
- L233 — selectedInterventionId — const [selectedInterventionId, setSelectedInterventionId] = useState<string | null>(null);
- L233 — setSelectedInterventionId — const [selectedInterventionId, setSelectedInterventionId] = useState<string | null>(null);
- L333 — toggleExpandedIntervention — const toggleExpandedIntervention = (id: string) => {
- L334 — setExpandedInterventionId — setExpandedInterventionId((current) => (current === id ? null : id));
- L374 — selectedInterventionId — (item) => recordId(item) === selectedInterventionId
- L379 — selectedInterventionId — }, [interventionsForSelectedRendezvous, selectedInterventionId]);
- L386 — interventionId — const interventionId = recordId(selectedIntervention);
- L389 — interventionId — return String(facture.interventionId ?? "") === interventionId;
- L514 — statut — badgeTone(text(vehicle, ["statut"], "actif")),
- L517 — statut — {text(vehicle, ["statut"], "actif")}
- L553 — statut — {text(vehicle, ["statut"], "actif")}
- L624 — setSelectedInterventionId — setSelectedInterventionId(null);
- L641 — statut — {text(appointment, ["statut", "status"], "suivi")}
- L648 — setSelectedInterventionId — setSelectedInterventionId(null);
- L687 — interventionsForSelectedRendezvous.map — {interventionsForSelectedRendezvous.map((intervention) => {
- L694 — data-q2-hub-client-final-c2 — data-q2-hub-client-final-c2="Q2_HUB_CLIENT_FINAL_C2_EXPAND_INTERVENTION_LINES"
- L704 — setSelectedInterventionId — onClick={() => setSelectedInterventionId(recordId(intervention))}
- L710 — dateIntervention — {text(intervention, ["displayLabel", "dateIntervention", "titre", "numeroIntervention"])}
- L713 — montantTTC — {text(intervention, ["statut", "status"], "suivi")} · {text(intervention, ["montantTTC", "montantHT"], "0")}
- L713 — montantHT — {text(intervention, ["statut", "status"], "suivi")} · {text(intervention, ["montantTTC", "montantHT"], "0")}
- L713 — statut — {text(intervention, ["statut", "status"], "suivi")} · {text(intervention, ["montantTTC", "montantHT"], "0")}
- L726 — parentModule={interventionsautoModule} — parentModule={interventionsautoModule}
- L744 — parentModule={interventionsautoModule} — parentModule={interventionsautoModule}
- L759 — montantTTC — montantTTC={numberValue(selectedInvoice, ["montantTTC", "totalTTC", "montantTotal", "total", "montant"])}
- L823 — statut — Tableau administratif avec affectation, contrat et statut.

## Contextes clés

### L169 — statut

```tsx
157:   };
158: }
159: 
160: const rendezvousChild = buildOperationalChild({
161:   key: "client-sheet-rendezvous",
162:   title: "Rendez-vous du véhicule sélectionné",
163:   description: "Les rendez-vous rattachés au véhicule sélectionné dans la fiche client.",
164:   moduleKey: "rendezvous",
165:   foreignKey: "vehiculeId",
166:   badgeLabel: "rendez-vous",
167:   mode: "readonly",
168:   allowCreate: false,
169:   labelFields: ["dateRendezVous", "heureRendezVous", "heure", "typeService", "statut"],
170:   subtitleFields: ["service", "durationMinutes", "clientLabel"],
171:   relations: [],
172: });
173: 
174: const interventionsChild = buildOperationalChild({
175:   key: "client-sheet-interventions",
176:   title: "Interventions du véhicule",
177:   description: "Les interventions rattachées au véhicule sélectionné.",
178:   moduleKey: "interventionsauto",
179:   foreignKey: "vehiculeId",
180:   badgeLabel: "intervention(s)",
181:   mode: "readonly",
182:   allowCreate: false,
183:   labelFields: ["dateIntervention", "titre", "numeroIntervention", "statut"],
184:   subtitleFields: ["montantTTC", "montantHT", "rendezVousId"],
185:   relations: [],
186: });
187: 
188: const lignesInterventionChild = buildOperationalChild({
189:   key: "client-sheet-lignes-intervention",
190:   title: "Lignes d’intervention",
191:   description: "Lignes liées à l’intervention sélectionnée. Le total ne compte que les lignes validées.",
192:   moduleKey: "lignesinterventionauto",
193:   foreignKey: "interventionId",
194:   badgeLabel: "ligne(s)",
195:   mode: "readonly",
196:   allowCreate: false,
197:   totalField: "montantTotal",
```

### L183 — statut

```tsx
171:   relations: [],
172: });
173: 
174: const interventionsChild = buildOperationalChild({
175:   key: "client-sheet-interventions",
176:   title: "Interventions du véhicule",
177:   description: "Les interventions rattachées au véhicule sélectionné.",
178:   moduleKey: "interventionsauto",
179:   foreignKey: "vehiculeId",
180:   badgeLabel: "intervention(s)",
181:   mode: "readonly",
182:   allowCreate: false,
183:   labelFields: ["dateIntervention", "titre", "numeroIntervention", "statut"],
184:   subtitleFields: ["montantTTC", "montantHT", "rendezVousId"],
185:   relations: [],
186: });
187: 
188: const lignesInterventionChild = buildOperationalChild({
189:   key: "client-sheet-lignes-intervention",
190:   title: "Lignes d’intervention",
191:   description: "Lignes liées à l’intervention sélectionnée. Le total ne compte que les lignes validées.",
192:   moduleKey: "lignesinterventionauto",
193:   foreignKey: "interventionId",
194:   badgeLabel: "ligne(s)",
195:   mode: "readonly",
196:   allowCreate: false,
197:   totalField: "montantTotal",
198:   labelFields: ["designation", "typeLigne", "produitLabel", "statut"],
199:   subtitleFields: ["quantite", "prixUnitaire", "montantTotal"],
200:   relations: [],
201: });
202: 
203: const facturesChild = buildOperationalChild({
204:   key: "client-sheet-factures",
205:   title: "Factures liées",
206:   description: "Factures liées à l’intervention sélectionnée.",
207:   moduleKey: "facturesauto",
208:   foreignKey: "interventionId",
209:   badgeLabel: "facture(s)",
210:   mode: "readonly",
211:   allowCreate: false,
```

### L183 — dateIntervention

```tsx
171:   relations: [],
172: });
173: 
174: const interventionsChild = buildOperationalChild({
175:   key: "client-sheet-interventions",
176:   title: "Interventions du véhicule",
177:   description: "Les interventions rattachées au véhicule sélectionné.",
178:   moduleKey: "interventionsauto",
179:   foreignKey: "vehiculeId",
180:   badgeLabel: "intervention(s)",
181:   mode: "readonly",
182:   allowCreate: false,
183:   labelFields: ["dateIntervention", "titre", "numeroIntervention", "statut"],
184:   subtitleFields: ["montantTTC", "montantHT", "rendezVousId"],
185:   relations: [],
186: });
187: 
188: const lignesInterventionChild = buildOperationalChild({
189:   key: "client-sheet-lignes-intervention",
190:   title: "Lignes d’intervention",
191:   description: "Lignes liées à l’intervention sélectionnée. Le total ne compte que les lignes validées.",
192:   moduleKey: "lignesinterventionauto",
193:   foreignKey: "interventionId",
194:   badgeLabel: "ligne(s)",
195:   mode: "readonly",
196:   allowCreate: false,
197:   totalField: "montantTotal",
198:   labelFields: ["designation", "typeLigne", "produitLabel", "statut"],
199:   subtitleFields: ["quantite", "prixUnitaire", "montantTotal"],
200:   relations: [],
201: });
202: 
203: const facturesChild = buildOperationalChild({
204:   key: "client-sheet-factures",
205:   title: "Factures liées",
206:   description: "Factures liées à l’intervention sélectionnée.",
207:   moduleKey: "facturesauto",
208:   foreignKey: "interventionId",
209:   badgeLabel: "facture(s)",
210:   mode: "readonly",
211:   allowCreate: false,
```

### L184 — montantTTC

```tsx
172: });
173: 
174: const interventionsChild = buildOperationalChild({
175:   key: "client-sheet-interventions",
176:   title: "Interventions du véhicule",
177:   description: "Les interventions rattachées au véhicule sélectionné.",
178:   moduleKey: "interventionsauto",
179:   foreignKey: "vehiculeId",
180:   badgeLabel: "intervention(s)",
181:   mode: "readonly",
182:   allowCreate: false,
183:   labelFields: ["dateIntervention", "titre", "numeroIntervention", "statut"],
184:   subtitleFields: ["montantTTC", "montantHT", "rendezVousId"],
185:   relations: [],
186: });
187: 
188: const lignesInterventionChild = buildOperationalChild({
189:   key: "client-sheet-lignes-intervention",
190:   title: "Lignes d’intervention",
191:   description: "Lignes liées à l’intervention sélectionnée. Le total ne compte que les lignes validées.",
192:   moduleKey: "lignesinterventionauto",
193:   foreignKey: "interventionId",
194:   badgeLabel: "ligne(s)",
195:   mode: "readonly",
196:   allowCreate: false,
197:   totalField: "montantTotal",
198:   labelFields: ["designation", "typeLigne", "produitLabel", "statut"],
199:   subtitleFields: ["quantite", "prixUnitaire", "montantTotal"],
200:   relations: [],
201: });
202: 
203: const facturesChild = buildOperationalChild({
204:   key: "client-sheet-factures",
205:   title: "Factures liées",
206:   description: "Factures liées à l’intervention sélectionnée.",
207:   moduleKey: "facturesauto",
208:   foreignKey: "interventionId",
209:   badgeLabel: "facture(s)",
210:   mode: "readonly",
211:   allowCreate: false,
212:   totalField: "montantTTC",
```

### L184 — montantHT

```tsx
172: });
173: 
174: const interventionsChild = buildOperationalChild({
175:   key: "client-sheet-interventions",
176:   title: "Interventions du véhicule",
177:   description: "Les interventions rattachées au véhicule sélectionné.",
178:   moduleKey: "interventionsauto",
179:   foreignKey: "vehiculeId",
180:   badgeLabel: "intervention(s)",
181:   mode: "readonly",
182:   allowCreate: false,
183:   labelFields: ["dateIntervention", "titre", "numeroIntervention", "statut"],
184:   subtitleFields: ["montantTTC", "montantHT", "rendezVousId"],
185:   relations: [],
186: });
187: 
188: const lignesInterventionChild = buildOperationalChild({
189:   key: "client-sheet-lignes-intervention",
190:   title: "Lignes d’intervention",
191:   description: "Lignes liées à l’intervention sélectionnée. Le total ne compte que les lignes validées.",
192:   moduleKey: "lignesinterventionauto",
193:   foreignKey: "interventionId",
194:   badgeLabel: "ligne(s)",
195:   mode: "readonly",
196:   allowCreate: false,
197:   totalField: "montantTotal",
198:   labelFields: ["designation", "typeLigne", "produitLabel", "statut"],
199:   subtitleFields: ["quantite", "prixUnitaire", "montantTotal"],
200:   relations: [],
201: });
202: 
203: const facturesChild = buildOperationalChild({
204:   key: "client-sheet-factures",
205:   title: "Factures liées",
206:   description: "Factures liées à l’intervention sélectionnée.",
207:   moduleKey: "facturesauto",
208:   foreignKey: "interventionId",
209:   badgeLabel: "facture(s)",
210:   mode: "readonly",
211:   allowCreate: false,
212:   totalField: "montantTTC",
```

### L193 — interventionId

```tsx
181:   mode: "readonly",
182:   allowCreate: false,
183:   labelFields: ["dateIntervention", "titre", "numeroIntervention", "statut"],
184:   subtitleFields: ["montantTTC", "montantHT", "rendezVousId"],
185:   relations: [],
186: });
187: 
188: const lignesInterventionChild = buildOperationalChild({
189:   key: "client-sheet-lignes-intervention",
190:   title: "Lignes d’intervention",
191:   description: "Lignes liées à l’intervention sélectionnée. Le total ne compte que les lignes validées.",
192:   moduleKey: "lignesinterventionauto",
193:   foreignKey: "interventionId",
194:   badgeLabel: "ligne(s)",
195:   mode: "readonly",
196:   allowCreate: false,
197:   totalField: "montantTotal",
198:   labelFields: ["designation", "typeLigne", "produitLabel", "statut"],
199:   subtitleFields: ["quantite", "prixUnitaire", "montantTotal"],
200:   relations: [],
201: });
202: 
203: const facturesChild = buildOperationalChild({
204:   key: "client-sheet-factures",
205:   title: "Factures liées",
206:   description: "Factures liées à l’intervention sélectionnée.",
207:   moduleKey: "facturesauto",
208:   foreignKey: "interventionId",
209:   badgeLabel: "facture(s)",
210:   mode: "readonly",
211:   allowCreate: false,
212:   totalField: "montantTTC",
213:   labelFields: ["numero", "numeroFacture", "statut", "montantTTC"],
214:   subtitleFields: ["dateFacture", "montantHT", "tva", "resteAPayer"],
215:   relations: [],
216: });
217: 
218: export function ERPClientOperationalSheet({
219:   config: _config,
220:   rootRecord,
221:   vehicles,
```

### L198 — statut

```tsx
186: });
187: 
188: const lignesInterventionChild = buildOperationalChild({
189:   key: "client-sheet-lignes-intervention",
190:   title: "Lignes d’intervention",
191:   description: "Lignes liées à l’intervention sélectionnée. Le total ne compte que les lignes validées.",
192:   moduleKey: "lignesinterventionauto",
193:   foreignKey: "interventionId",
194:   badgeLabel: "ligne(s)",
195:   mode: "readonly",
196:   allowCreate: false,
197:   totalField: "montantTotal",
198:   labelFields: ["designation", "typeLigne", "produitLabel", "statut"],
199:   subtitleFields: ["quantite", "prixUnitaire", "montantTotal"],
200:   relations: [],
201: });
202: 
203: const facturesChild = buildOperationalChild({
204:   key: "client-sheet-factures",
205:   title: "Factures liées",
206:   description: "Factures liées à l’intervention sélectionnée.",
207:   moduleKey: "facturesauto",
208:   foreignKey: "interventionId",
209:   badgeLabel: "facture(s)",
210:   mode: "readonly",
211:   allowCreate: false,
212:   totalField: "montantTTC",
213:   labelFields: ["numero", "numeroFacture", "statut", "montantTTC"],
214:   subtitleFields: ["dateFacture", "montantHT", "tva", "resteAPayer"],
215:   relations: [],
216: });
217: 
218: export function ERPClientOperationalSheet({
219:   config: _config,
220:   rootRecord,
221:   vehicles,
222:   relatedRecordsBySection,
223:   selectedVehicleId = null,
224: }: ERPClientOperationalSheetProps) {
225:   const [localSelectedVehicleId, setLocalSelectedVehicleId] = useState<string | null>(
226:     selectedVehicleId ?? recordId(vehicles[0]) ?? null
```

### L208 — interventionId

```tsx
196:   allowCreate: false,
197:   totalField: "montantTotal",
198:   labelFields: ["designation", "typeLigne", "produitLabel", "statut"],
199:   subtitleFields: ["quantite", "prixUnitaire", "montantTotal"],
200:   relations: [],
201: });
202: 
203: const facturesChild = buildOperationalChild({
204:   key: "client-sheet-factures",
205:   title: "Factures liées",
206:   description: "Factures liées à l’intervention sélectionnée.",
207:   moduleKey: "facturesauto",
208:   foreignKey: "interventionId",
209:   badgeLabel: "facture(s)",
210:   mode: "readonly",
211:   allowCreate: false,
212:   totalField: "montantTTC",
213:   labelFields: ["numero", "numeroFacture", "statut", "montantTTC"],
214:   subtitleFields: ["dateFacture", "montantHT", "tva", "resteAPayer"],
215:   relations: [],
216: });
217: 
218: export function ERPClientOperationalSheet({
219:   config: _config,
220:   rootRecord,
221:   vehicles,
222:   relatedRecordsBySection,
223:   selectedVehicleId = null,
224: }: ERPClientOperationalSheetProps) {
225:   const [localSelectedVehicleId, setLocalSelectedVehicleId] = useState<string | null>(
226:     selectedVehicleId ?? recordId(vehicles[0]) ?? null
227:   );
228: 
229:   const [selectedRendezvousId, setSelectedRendezvousId] = useState<string | null>(null);
230:   const [expandedInterventionId, setExpandedInterventionId] = useState<string | null>(null);
231:   const [expandedFactureId, setExpandedFactureId] = useState<string | null>(null);
232:   const [expandedEncaissementId, setExpandedEncaissementId] = useState<string | null>(null);
233:   const [selectedInterventionId, setSelectedInterventionId] = useState<string | null>(null);
234: 
235:   const selectedVehicle = useMemo(() => {
236:     return (
```

### L212 — montantTTC

```tsx
200:   relations: [],
201: });
202: 
203: const facturesChild = buildOperationalChild({
204:   key: "client-sheet-factures",
205:   title: "Factures liées",
206:   description: "Factures liées à l’intervention sélectionnée.",
207:   moduleKey: "facturesauto",
208:   foreignKey: "interventionId",
209:   badgeLabel: "facture(s)",
210:   mode: "readonly",
211:   allowCreate: false,
212:   totalField: "montantTTC",
213:   labelFields: ["numero", "numeroFacture", "statut", "montantTTC"],
214:   subtitleFields: ["dateFacture", "montantHT", "tva", "resteAPayer"],
215:   relations: [],
216: });
217: 
218: export function ERPClientOperationalSheet({
219:   config: _config,
220:   rootRecord,
221:   vehicles,
222:   relatedRecordsBySection,
223:   selectedVehicleId = null,
224: }: ERPClientOperationalSheetProps) {
225:   const [localSelectedVehicleId, setLocalSelectedVehicleId] = useState<string | null>(
226:     selectedVehicleId ?? recordId(vehicles[0]) ?? null
227:   );
228: 
229:   const [selectedRendezvousId, setSelectedRendezvousId] = useState<string | null>(null);
230:   const [expandedInterventionId, setExpandedInterventionId] = useState<string | null>(null);
231:   const [expandedFactureId, setExpandedFactureId] = useState<string | null>(null);
232:   const [expandedEncaissementId, setExpandedEncaissementId] = useState<string | null>(null);
233:   const [selectedInterventionId, setSelectedInterventionId] = useState<string | null>(null);
234: 
235:   const selectedVehicle = useMemo(() => {
236:     return (
237:       vehicles.find((vehicle) => recordId(vehicle) === localSelectedVehicleId) ??
238:       vehicles[0] ??
239:       null
240:     );
```

### L213 — montantTTC

```tsx
201: });
202: 
203: const facturesChild = buildOperationalChild({
204:   key: "client-sheet-factures",
205:   title: "Factures liées",
206:   description: "Factures liées à l’intervention sélectionnée.",
207:   moduleKey: "facturesauto",
208:   foreignKey: "interventionId",
209:   badgeLabel: "facture(s)",
210:   mode: "readonly",
211:   allowCreate: false,
212:   totalField: "montantTTC",
213:   labelFields: ["numero", "numeroFacture", "statut", "montantTTC"],
214:   subtitleFields: ["dateFacture", "montantHT", "tva", "resteAPayer"],
215:   relations: [],
216: });
217: 
218: export function ERPClientOperationalSheet({
219:   config: _config,
220:   rootRecord,
221:   vehicles,
222:   relatedRecordsBySection,
223:   selectedVehicleId = null,
224: }: ERPClientOperationalSheetProps) {
225:   const [localSelectedVehicleId, setLocalSelectedVehicleId] = useState<string | null>(
226:     selectedVehicleId ?? recordId(vehicles[0]) ?? null
227:   );
228: 
229:   const [selectedRendezvousId, setSelectedRendezvousId] = useState<string | null>(null);
230:   const [expandedInterventionId, setExpandedInterventionId] = useState<string | null>(null);
231:   const [expandedFactureId, setExpandedFactureId] = useState<string | null>(null);
232:   const [expandedEncaissementId, setExpandedEncaissementId] = useState<string | null>(null);
233:   const [selectedInterventionId, setSelectedInterventionId] = useState<string | null>(null);
234: 
235:   const selectedVehicle = useMemo(() => {
236:     return (
237:       vehicles.find((vehicle) => recordId(vehicle) === localSelectedVehicleId) ??
238:       vehicles[0] ??
239:       null
240:     );
241:   }, [vehicles, localSelectedVehicleId]);
```

### L213 — statut

```tsx
201: });
202: 
203: const facturesChild = buildOperationalChild({
204:   key: "client-sheet-factures",
205:   title: "Factures liées",
206:   description: "Factures liées à l’intervention sélectionnée.",
207:   moduleKey: "facturesauto",
208:   foreignKey: "interventionId",
209:   badgeLabel: "facture(s)",
210:   mode: "readonly",
211:   allowCreate: false,
212:   totalField: "montantTTC",
213:   labelFields: ["numero", "numeroFacture", "statut", "montantTTC"],
214:   subtitleFields: ["dateFacture", "montantHT", "tva", "resteAPayer"],
215:   relations: [],
216: });
217: 
218: export function ERPClientOperationalSheet({
219:   config: _config,
220:   rootRecord,
221:   vehicles,
222:   relatedRecordsBySection,
223:   selectedVehicleId = null,
224: }: ERPClientOperationalSheetProps) {
225:   const [localSelectedVehicleId, setLocalSelectedVehicleId] = useState<string | null>(
226:     selectedVehicleId ?? recordId(vehicles[0]) ?? null
227:   );
228: 
229:   const [selectedRendezvousId, setSelectedRendezvousId] = useState<string | null>(null);
230:   const [expandedInterventionId, setExpandedInterventionId] = useState<string | null>(null);
231:   const [expandedFactureId, setExpandedFactureId] = useState<string | null>(null);
232:   const [expandedEncaissementId, setExpandedEncaissementId] = useState<string | null>(null);
233:   const [selectedInterventionId, setSelectedInterventionId] = useState<string | null>(null);
234: 
235:   const selectedVehicle = useMemo(() => {
236:     return (
237:       vehicles.find((vehicle) => recordId(vehicle) === localSelectedVehicleId) ??
238:       vehicles[0] ??
239:       null
240:     );
241:   }, [vehicles, localSelectedVehicleId]);
```

### L214 — montantHT

```tsx
202: 
203: const facturesChild = buildOperationalChild({
204:   key: "client-sheet-factures",
205:   title: "Factures liées",
206:   description: "Factures liées à l’intervention sélectionnée.",
207:   moduleKey: "facturesauto",
208:   foreignKey: "interventionId",
209:   badgeLabel: "facture(s)",
210:   mode: "readonly",
211:   allowCreate: false,
212:   totalField: "montantTTC",
213:   labelFields: ["numero", "numeroFacture", "statut", "montantTTC"],
214:   subtitleFields: ["dateFacture", "montantHT", "tva", "resteAPayer"],
215:   relations: [],
216: });
217: 
218: export function ERPClientOperationalSheet({
219:   config: _config,
220:   rootRecord,
221:   vehicles,
222:   relatedRecordsBySection,
223:   selectedVehicleId = null,
224: }: ERPClientOperationalSheetProps) {
225:   const [localSelectedVehicleId, setLocalSelectedVehicleId] = useState<string | null>(
226:     selectedVehicleId ?? recordId(vehicles[0]) ?? null
227:   );
228: 
229:   const [selectedRendezvousId, setSelectedRendezvousId] = useState<string | null>(null);
230:   const [expandedInterventionId, setExpandedInterventionId] = useState<string | null>(null);
231:   const [expandedFactureId, setExpandedFactureId] = useState<string | null>(null);
232:   const [expandedEncaissementId, setExpandedEncaissementId] = useState<string | null>(null);
233:   const [selectedInterventionId, setSelectedInterventionId] = useState<string | null>(null);
234: 
235:   const selectedVehicle = useMemo(() => {
236:     return (
237:       vehicles.find((vehicle) => recordId(vehicle) === localSelectedVehicleId) ??
238:       vehicles[0] ??
239:       null
240:     );
241:   }, [vehicles, localSelectedVehicleId]);
242: 
```

