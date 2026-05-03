param(
    [string]$Foundation
)

$root = "src/core"

switch ($Foundation) {

    "layout" {

        New-Item `
            -ItemType Directory `
            -Force `
            -Path "$root/layout"

        New-Item `
            -ItemType File `
            -Force `
            -Path "$root/layout/AppShell.tsx"

        New-Item `
            -ItemType File `
            -Force `
            -Path "$root/layout/Sidebar.tsx"

        New-Item `
            -ItemType File `
            -Force `
            -Path "$root/layout/Topbar.tsx"
    }

    "modules" {

        New-Item `
            -ItemType Directory `
            -Force `
            -Path "$root/modules"

        New-Item `
            -ItemType File `
            -Force `
            -Path "$root/modules/registry.ts"

        New-Item `
            -ItemType File `
            -Force `
            -Path "$root/modules/types.ts"
    }

    "navigation" {

        New-Item `
            -ItemType Directory `
            -Force `
            -Path "$root/navigation"

        New-Item `
            -ItemType File `
            -Force `
            -Path "$root/navigation/menu-builder.ts"
    }
}