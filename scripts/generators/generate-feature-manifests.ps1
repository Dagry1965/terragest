$features = @(
    @{
        Name = "stocks"
        Label = "Stocks"
        Export = "StocksFeature"
    },
    @{
        Name = "produits"
        Label = "Produits"
        Export = "ProduitsFeature"
    },
    @{
        Name = "exploitations"
        Label = "Exploitations"
        Export = "ExploitationsFeature"
    },
    @{
        Name = "terrains"
        Label = "Terrains"
        Export = "TerrainsFeature"
    },
    @{
        Name = "interventions"
        Label = "Interventions"
        Export = "InterventionsFeature"
    },
    @{
        Name = "observability"
        Label = "Observability"
        Export = "ObservabilityFeature"
    }
)

foreach ($feature in $features) {

    $path =
        ".\src\features\$($feature.Name)\$($feature.Name).feature.ts"

    $content = @"
import type {
  FeatureDefinition
}
from "@/platform/registry/FeatureDefinition";

export const $($feature.Export):
  FeatureDefinition = {

  name:
    "$($feature.Name)",

  label:
    "$($feature.Label)",

  enabled:
    true,

  version:
    "1.0.0",

  route:
    "/$($feature.Name)",

  capabilities: [
    "crud",
    "runtime",
    "workflow",
    "rules",
    "automation",
    "observability",
    "realtime",
  ],

  dependencies: [],
};
"@

    Set-Content `
        -Path $path `
        -Value $content

    Write-Host `
        "[FEATURE MANIFEST GENERATED] $($feature.Name)" `
        -ForegroundColor Green
}

Write-Host ""
Write-Host "Feature manifests generated." `
    -ForegroundColor Yellow