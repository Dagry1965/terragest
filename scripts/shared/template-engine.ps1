function Render-Template {
    param(
        [string]$TemplatePath,
        [hashtable]$Variables
    )

    if (-not (Test-Path $TemplatePath)) {
        throw "Template not found: $TemplatePath"
    }

    $content = Get-Content $TemplatePath -Raw

    foreach ($key in $Variables.Keys) {
        $placeholder = "{{${key}}}"
        $value = $Variables[$key]

        $content = $content.Replace($placeholder, $value)
    }

    return $content
}