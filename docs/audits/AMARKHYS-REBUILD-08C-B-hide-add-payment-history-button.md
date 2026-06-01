# AMARKHYS-REBUILD-08C-B — Hide add payment history button

Date: 2026-06-01T01:43:56.300Z

## Décision

- Garder le bouton métier Enregistrer un paiement dans le bloc vert facture.
- Masquer Ajouter un paiement dans Paiements enregistrés.
- Conserver l’historique et les actions de paiement.

## Checks

- OK — Ajouter un paiement supprimé
- OK — Paiements enregistrés conservé
- OK — Modifier ce paiement conservé
- OK — Historique conservé
- OK — Fichier modifié

## Synthèse

- OK: 5
- FAIL: 0

## Bloc supprimé

```tsx
<Link
            href={createPaymentHref}
            className="inline-flex items-center justify-center rounded-2xl bg-[#009B7D] px-5 py-3 text-sm font-black text-white shadow-[0_10px_22px_rgba(0,155,125,0.24)] transition hover:-translate-y-0.5 hover:bg-[#007F6D]"
          >
            Ajouter un paiement
          </Link>
```
