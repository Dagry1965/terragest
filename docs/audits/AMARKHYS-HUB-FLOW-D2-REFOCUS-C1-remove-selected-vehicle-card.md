# AMARKHYS-HUB-FLOW-D2-REFOCUS-C1 — Remove selected vehicle card

Date: 2026-06-01T03:20:48.587Z

## Objectif

- Supprimer uniquement la carte verte `Véhicule sélectionné`.
- Ne pas modifier le flux RDV / interventions / factures / encaissements.

## Checks

- OK — carte verte Véhicule sélectionné supprimée
- OK — section RDV conservée
- OK — section interventions conservée
- OK — filtrage interventions conservé
- OK — factures conservées
- OK — encaissements conservés
- OK — selectedVehicle logique conservée
- OK — fichier modifié

## Synthèse

- OK: 8
- FAIL: 0

## Bloc supprimé

```tsx
{selectedVehicle ? (
                  <div className="space-y-6">
                    <div className="rounded-[1.5rem] bg-emerald-50 p-5 ring-1 ring-emerald-100">
                      <p className="text-xs font-bold uppercase tracking-wide text-emerald-700">
                        Véhicule sélectionné
                      </p>
                      <p className="mt-2 text-lg font-extrabold text-slate-950">
                        {text(selectedVehicle, ["displayLabel", "immatriculation", "marque"])}
                      </p>
                      <p className="mt-1 text-sm text-slate-600">
                        {text(selectedVehicle, ["marque"])} · {text(selectedVehicle, ["modele", "modèle"])}
                      </p>
                    </div>

                    

```
