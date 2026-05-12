$ErrorActionPreference = "Stop"

$path = "C:\Users\Admin\terragest\src\runtime\modules\definitions\coreModules.ts"

$content = [System.IO.File]::ReadAllText($path)

function Replace-Schema {
  param(
    [string]$Content,
    [string]$ModuleKey,
    [string]$NewSchema
  )

  $pattern = '(?s)(key:\s*"' + $ModuleKey + '".*?schema:\s*)\{.*?\n\s*\},\n\s*\},'

  return [regex]::Replace(
    $Content,
    $pattern,
    '$1' + $NewSchema + "`n  },",
    1
  )
}

$clientsSchema = @'
{
      module: "clients",
      collection: "clients",
      timestamps: true,
      softDelete: true,
      fields: [
        { key: "code", label: "Code client", type: "text", required: true, searchable: true, sortable: true },
        { key: "nom", label: "Nom", type: "text", required: true, searchable: true, sortable: true },
        { key: "email", label: "Email", type: "email", searchable: true },
        { key: "telephone", label: "Téléphone", type: "text", searchable: true },
        { key: "adresse", label: "Adresse", type: "textarea" },
        { key: "typeClient", label: "Type client", type: "select", filterable: true, options: [{ label: "Particulier", value: "particulier" }, { label: "Entreprise", value: "entreprise" }, { label: "Coopérative", value: "cooperative" }] },
        { key: "statut", label: "Statut", type: "status", required: true, filterable: true },
      ],
    },
'@

$commandesSchema = @'
{
      module: "commandes",
      collection: "commandes",
      timestamps: true,
      softDelete: true,
      fields: [
        { key: "numero", label: "Numéro commande", type: "text", required: true, searchable: true, sortable: true },
        { key: "clientId", label: "Client", type: "relation", relation: "clients", required: true, filterable: true },
        { key: "dateCommande", label: "Date commande", type: "date", required: true, sortable: true },
        { key: "montantTotal", label: "Montant total", type: "number", sortable: true },
        { key: "statut", label: "Statut", type: "status", required: true, filterable: true },
      ],
    },
'@

$facturesSchema = @'
{
      module: "factures",
      collection: "factures",
      timestamps: true,
      softDelete: true,
      fields: [
        { key: "numero", label: "Numéro facture", type: "text", required: true, searchable: true, sortable: true },
        { key: "clientId", label: "Client", type: "relation", relation: "clients", required: true, filterable: true },
        { key: "commandeId", label: "Commande", type: "relation", relation: "commandes" },
        { key: "dateFacture", label: "Date facture", type: "date", required: true, sortable: true },
        { key: "montantHT", label: "Montant HT", type: "number", sortable: true },
        { key: "montantTTC", label: "Montant TTC", type: "number", sortable: true },
        { key: "statut", label: "Statut", type: "status", required: true, filterable: true },
      ],
    },
'@

$devisSchema = @'
{
      module: "devis",
      collection: "devis",
      timestamps: true,
      softDelete: true,
      fields: [
        { key: "numero", label: "Numéro devis", type: "text", required: true, searchable: true, sortable: true },
        { key: "clientId", label: "Client", type: "relation", relation: "clients", required: true, filterable: true },
        { key: "dateDevis", label: "Date devis", type: "date", required: true, sortable: true },
        { key: "validite", label: "Date validité", type: "date", sortable: true },
        { key: "montantTotal", label: "Montant total", type: "number", sortable: true },
        { key: "statut", label: "Statut", type: "status", required: true, filterable: true },
      ],
    },
'@

$depensesSchema = @'
{
      module: "depenses",
      collection: "depenses",
      timestamps: true,
      softDelete: true,
      fields: [
        { key: "libelle", label: "Libellé", type: "text", required: true, searchable: true, sortable: true },
        { key: "categorie", label: "Catégorie", type: "select", filterable: true, options: [{ label: "Achat", value: "achat" }, { label: "Transport", value: "transport" }, { label: "Maintenance", value: "maintenance" }, { label: "Salaire", value: "salaire" }, { label: "Autre", value: "autre" }] },
        { key: "montant", label: "Montant", type: "number", required: true, sortable: true },
        { key: "dateDepense", label: "Date dépense", type: "date", required: true, sortable: true },
        { key: "statut", label: "Statut", type: "status", filterable: true },
      ],
    },
'@

$recettesSchema = @'
{
      module: "recettes",
      collection: "recettes",
      timestamps: true,
      softDelete: true,
      fields: [
        { key: "libelle", label: "Libellé", type: "text", required: true, searchable: true, sortable: true },
        { key: "source", label: "Source", type: "text", searchable: true },
        { key: "montant", label: "Montant", type: "number", required: true, sortable: true },
        { key: "dateRecette", label: "Date recette", type: "date", required: true, sortable: true },
        { key: "statut", label: "Statut", type: "status", filterable: true },
      ],
    },
'@

$content = Replace-Schema $content "clients" $clientsSchema
$content = Replace-Schema $content "commandes" $commandesSchema
$content = Replace-Schema $content "factures" $facturesSchema
$content = Replace-Schema $content "devis" $devisSchema
$content = Replace-Schema $content "depenses" $depensesSchema
$content = Replace-Schema $content "recettes" $recettesSchema

[System.IO.File]::WriteAllText(
  $path,
  $content,
  [System.Text.UTF8Encoding]::new($false)
)

Write-Host "Business schemas enrichis."