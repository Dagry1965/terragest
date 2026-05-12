$ErrorActionPreference = "Stop"

$Root = (Get-Location).Path

$file = Join-Path $Root "src\runtime\modules\definitions\coreModules.ts"

$content = [System.IO.File]::ReadAllText($file)

$modules = @(
  "clients",
  "commandes",
  "factures",
  "devis",
  "achats",
  "livraisons",
  "employes",
  "taches",
  "incidents",
  "vehicules",
  "parcelles",
  "recoltes",
  "intrants",
  "depenses",
  "recettes"
)

$insert = ""

foreach ($module in $modules) {

  if ($content.Contains("key: `"$module`"")) {
    Write-Host "DEJA PRESENT -> $module"
    continue
  }

  $label =
    $module.Substring(0,1).ToUpper() +
    $module.Substring(1)

  $insert += @"

  {
    metadata: {
      key: "$module",
      label: "$label",
      description: "Module ERP $label.",
      icon: "package",
      category: "Metier",
      enabled: true,

      routes: {
        list: "/$module",
        create: "/$module/nouveau",
        details: "/$module",
        edit: "/$module",
      },

      features: {
        dashboard: true,
        analytics: true,
        workflows: true,
        audit: true,
        realtime: true,
        automation: true,
        notifications: true,
        observability: true,
      },
    },

    schema: {
      fields: [
        {
          name: "nom",
          label: "Nom",
          type: "text",
          required: true,
        },
      ],
    },
  },

"@
}

$index = $content.LastIndexOf("];")

$newContent =
  $content.Substring(0, $index) +
  $insert +
  $content.Substring($index)

[System.IO.File]::WriteAllText(
  $file,
  $newContent,
  [System.Text.UTF8Encoding]::new($false)
)

Write-Host "coreModules.ts mis a jour."