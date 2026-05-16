from pathlib import Path
import re

ROOT = Path(r"C:\Users\Admin\terragest")

PAGE_PATH = ROOT / "src" / "components" / "erp" / "runtime" / "ERPRuntimePage.tsx"
TABLE_PATH = ROOT / "src" / "components" / "erp" / "runtime" / "ERPRuntimeTable.tsx"


def read(path: Path) -> str:
    if not path.exists():
        raise FileNotFoundError(f"Fichier introuvable : {path}")

    return path.read_text(encoding="utf-8")


def write(path: Path, content: str) -> None:
    path.write_text(content, encoding="utf-8")


def fix_encoding(content: str) -> str:
    replacements = {
        "â€”": "—",
        "â†’": "→",
        "Liste opÃ©rationnelle": "Liste opérationnelle",
        "DonnÃ©es mÃ©tier": "Données métier",
        "SynchronisÃ©": "Données à jour",
        "Aucune donnÃ©e": "Aucune donnée",
        "PrÃ©cÃ©dent": "Précédent",
        "gÃ©nÃ©rÃ©e": "générée",
        "connectÃ©": "connecté",
        "mÃ©tier": "métier",
        "MÃ©tier": "Métier",
        "Ã©lÃ©ments": "éléments",
        "Ã©lÃ©ment": "élément",
        "CrÃ©ation": "Création",
        "crÃ©ation": "création",
        "DÃ©tails": "Détails",
        "dÃ©tail": "détail",
        "Ã©": "é",
        "Ã¨": "è",
        "Ã ": "à",
        "Ã´": "ô",
    }

    for bad, good in replacements.items():
        content = content.replace(bad, good)

    return content


def ensure_page_type_helper(content: str) -> str:
    if "function getRuntimePageTypeLabel" in content:
        return content

    helper = """function getRuntimePageTypeLabel(type: string): string {
  switch (type) {
    case "list":
      return "liste";
    case "create":
      return "création";
    case "edit":
      return "modification";
    case "detail":
      return "fiche";
    default:
      return type;
  }
}

interface ERPRuntimePageProps {"""

    return re.sub(
        r"interface\s+ERPRuntimePageProps\s*\{",
        helper,
        content,
        count=1,
    )


def fix_runtime_page() -> None:
    content = read(PAGE_PATH)

    content = ensure_page_type_helper(content)

    # Corrige resolvedTitle, même si le séparateur est encodé n'importe comment.
    content = re.sub(
        r"const\s+resolvedTitle\s*=\s*title\s*\?\?\s*`[^`]*`\s*;",
        'const resolvedTitle =\n    title ?? `${moduleLabel} — ${getRuntimePageTypeLabel(type)}`;',
        content,
        count=1,
    )

    # Corrige pageTitle si cette variante existe.
    content = re.sub(
        r"const\s+pageTitle\s*=\s*title\s*\?\?\s*`[^`]*`\s*;",
        'const pageTitle =\n    title ?? `${moduleLabel} — ${getRuntimePageTypeLabel(type)}`;',
        content,
        count=1,
    )

    # Les actions workflow ne doivent être disponibles qu'en détail avec record.
    content = re.sub(
        r"""const\s+runtimeActions\s*=\s*RuntimeActionEngine\.getAvailableActions\(\{\s*
\s*actions:\s*module\?\.actions\s*\?\?\s*\[\],\s*
\s*userPermissions:\s*\["\*"\],\s*
\s*workflow:\s*module\?\.workflows\?\.\[0\],\s*
\s*record,\s*
\s*\}\);""",
        """const runtimeActions =
    type === "detail" && record
      ? RuntimeActionEngine.getAvailableActions({
          actions: module?.actions ?? [],
          userPermissions: ["*"],
          workflow: module?.workflows?.[0],
          record,
        })
      : [];""",
        content,
        count=1,
        flags=re.MULTILINE,
    )

    # Sécurité : ne jamais afficher les actions en mode liste.
    content = content.replace(
        "{runtimeActions.length > 0 && (",
        '{type !== "list" && runtimeActions.length > 0 && (',
    )

    content = content.replace(
        '{type !== "list" && type !== "list" && runtimeActions.length > 0 && (',
        '{type !== "list" && runtimeActions.length > 0 && (',
    )

    content = fix_encoding(content)

    write(PAGE_PATH, content)

    print("OK - ERPRuntimePage.tsx corrigé")


def fix_runtime_table() -> None:
    content = read(TABLE_PATH)

    # Clic ligne vers edit au lieu de détail.
    content = content.replace(
        "`/${module.metadata.key}/${id}`",
        "`/${module.metadata.key}/${id}/edit`",
    )

    content = content.replace(
        'title="Cliquer pour ouvrir la fiche"',
        'title="Cliquer pour modifier"',
    )

    content = fix_encoding(content)

    write(TABLE_PATH, content)

    print("OK - ERPRuntimeTable.tsx corrigé")


def verify() -> None:
    page = read(PAGE_PATH)
    table = read(TABLE_PATH)

    print("\n=== Vérification ERPRuntimePage.tsx ===")
    checks_page = [
        "getRuntimePageTypeLabel",
        "`${moduleLabel} — ${getRuntimePageTypeLabel(type)}`",
        'type === "detail" && record',
        'type !== "list" && runtimeActions.length > 0',
    ]

    for check in checks_page:
        print(f"{check} :", "OK" if check in page else "KO")

    print("\n=== Vérification ERPRuntimeTable.tsx ===")
    checks_table = [
        "Liste opérationnelle",
        "Données métier",
        "Données à jour",
        "`/${module.metadata.key}/${id}/edit`",
        'title="Cliquer pour modifier"',
    ]

    for check in checks_table:
        print(f"{check} :", "OK" if check in table else "KO")

    forbidden = ["â€”", "SynchronisÃ©", "DonnÃ©es", "PrÃ©cÃ©dent"]

    print("\n=== Encodage restant ===")
    for bad in forbidden:
        found = bad in page or bad in table
        print(f"{bad} :", "KO" if found else "OK")


if __name__ == "__main__":
    fix_runtime_page()
    fix_runtime_table()
    verify()

    print("\nTerminé.")
    print("Lance maintenant :")
    print(r'Remove-Item -Recurse -Force ".\.next" -ErrorAction SilentlyContinue')
    print("pnpm build")