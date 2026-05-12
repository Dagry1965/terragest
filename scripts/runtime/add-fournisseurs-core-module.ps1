$ErrorActionPreference = "Stop"

$root = "C:\Users\Admin\terragest"
$file = Join-Path $root "src\runtime\modules\definitions\coreModules.ts"

Copy-Item $file "$file.bak" -Force

$content = Get-Content $file -Raw

if ($content -match 'key:\s*"fournisseurs"') {
  Write-Host "Module fournisseurs deja present."
  exit 0
}

$module = @'

  ,

  {
    metadata: {
      key: "fournisseurs",
      label: "Fournisseurs",
      description: "Gestion des fournisseurs, partenaires et prestataires.",
      icon: "building",
      category: "Référentiel",
      enabled: true,
      visible: true,
      order: 90,
      routes: {
        list: "/fournisseurs",
        create: "/fournisseurs/nouveau",
        details: "/fournisseurs",
        edit: "/fournisseurs",
      },
      features: {
        dashboard: true,
        analytics: true,
        workflows: true,
        automation: true,
        notifications: true,
        audit: true,
        realtime: true,
      },
    },
    schema: {
      module: "fournisseurs",
      collection: "fournisseurs",
      timestamps: true,
      softDelete: true,
      fields: [
        { key: "nom", label: "Nom", type: "text", required: true, searchable: true, sortable: true },
        { key: "email", label: "Email", type: "email", searchable: true },
        { key: "telephone", label: "Téléphone", type: "text", searchable: true },
        {
          key: "categorie",
          label: "Catégorie",
          type: "select",
          options: [
            { label: "Agricole", value: "agricole" },
            { label: "Matériel", value: "materiel" },
            { label: "Service", value: "service" },
            { label: "Transport", value: "transport" },
            { label: "Autre", value: "autre" },
          ],
        },
        { key: "statut", label: "Statut", type: "status", required: true, filterable: true },
      ],
    },
    actions: [
      { key: "create", label: "Créer", type: "primary", href: "/fournisseurs/nouveau", event: "FOURNISSEUR_CREATED" },
      { key: "edit", label: "Modifier", type: "secondary", event: "FOURNISSEUR_UPDATED" },
      { key: "archive", label: "Archiver", type: "danger", event: "FOURNISSEUR_ARCHIVED" },
    ],
    workflows: [
      {
        key: "create-fournisseur",
        label: "Création fournisseur",
        initialState: "draft",
        states: ["draft", "validated", "active", "archived"],
      },
    ],
  }

'@

$content = $content -replace '\s*\];\s*$', "$module`r`n];"

[System.IO.File]::WriteAllText(
  $file,
  $content,
  [System.Text.UTF8Encoding]::new($false)
)

Write-Host "OK - Module fournisseurs ajoute dans coreModules.ts"
Write-Host "Backup cree: $file.bak"