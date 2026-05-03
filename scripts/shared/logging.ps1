function Convert-ToKebabCase {
    param([string]$Value)

    return $Value.ToLower()
}