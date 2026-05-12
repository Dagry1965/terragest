$ErrorActionPreference = "Stop"

$root = "C:\Users\Admin\terragest"

$dir = Join-Path $root "src\runtime\domain\adapters"
$file = Join-Path $dir "TerragestBusinessRuleAdapter.ts"

New-Item `
  -ItemType Directory `
  -Force `
  -Path $dir | Out-Null

$content = @'
import type {
  ERPBusinessRule,
} from "@/runtime/rules/ERPBusinessRuleEngine";

import type {
  TerragestBusinessRule,
} from "../rules/TerragestBusinessRules";

export class TerragestBusinessRuleAdapter {
  static adapt(
    rule: TerragestBusinessRule
  ): ERPBusinessRule {
    return {
      id: rule.code,

      module: rule.module,

      description: [
        rule.label,
        `[${rule.category}]`,
        `[${rule.severity}]`,
        rule.description,
        rule.event
          ? `[event:${rule.event}]`
          : "",
      ]
        .filter(Boolean)
        .join(" "),

      validate: (
        data: Record<string, unknown>
      ) => {
        console.log(
          "[TERRAGEST RULE VALIDATION]",
          rule.code,
          data
        );

        return true;
      },
    };
  }

  static adaptMany(
    rules: TerragestBusinessRule[]
  ): ERPBusinessRule[] {
    return rules.map((rule) =>
      TerragestBusinessRuleAdapter.adapt(rule)
    );
  }
}
'@

[System.IO.File]::WriteAllText(
  $file,
  $content,
  [System.Text.UTF8Encoding]::new($false)
)

Write-Host "OK - TerragestBusinessRuleAdapter créé :" $file