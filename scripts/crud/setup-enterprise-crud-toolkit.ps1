$ErrorActionPreference = "Stop"

$ProjectRoot = "C:\Users\Admin\terragest"

Set-Location $ProjectRoot

Write-Host ""
Write-Host "======================================="
Write-Host " ENTERPRISE CRUD TOOLKIT SETUP"
Write-Host "======================================="
Write-Host ""

# -------------------------------------------------
# DIRECTORIES
# -------------------------------------------------

$dirs = @(
  "$ProjectRoot\src\components\crud"
)

foreach ($dir in $dirs) {

  if (!(Test-Path $dir)) {

    New-Item `
      -ItemType Directory `
      -Path $dir `
      -Force | Out-Null

    Write-Host "Created: $dir"
  }
}

# -------------------------------------------------
# SEARCH BAR
# -------------------------------------------------

$searchBar = @'
type Props = {
  value: string;

  onChange: (
    value: string
  ) => void;
};

export const SearchBar = ({
  value,
  onChange,
}: Props) => {

  return (
    <div>
      <input
        type="text"
        placeholder="Rechercher..."
        value={value}
        onChange={(e) =>
          onChange(e.target.value)
        }
        className="
          w-full
          md:w-80
          border
          rounded-xl
          p-3
          bg-white
        "
      />
    </div>
  );
};
'@

[System.IO.File]::WriteAllText(
  "$ProjectRoot\src\components\crud\SearchBar.tsx",
  $searchBar
)

Write-Host "Created: SearchBar.tsx"

# -------------------------------------------------
# EMPTY STATE
# -------------------------------------------------

$emptyState = @'
type Props = {
  title: string;

  description: string;
};

export const EmptyState = ({
  title,
  description,
}: Props) => {

  return (
    <div
      className="
        bg-white
        border
        rounded-2xl
        p-10
        text-center
      "
    >
      <h3
        className="
          text-2xl
          font-semibold
        "
      >
        {title}
      </h3>

      <p
        className="
          text-gray-500
          mt-3
        "
      >
        {description}
      </p>
    </div>
  );
};
'@

[System.IO.File]::WriteAllText(
  "$ProjectRoot\src\components\crud\EmptyState.tsx",
  $emptyState
)

Write-Host "Created: EmptyState.tsx"

# -------------------------------------------------
# PAGE HEADER
# -------------------------------------------------

$pageHeader = @'
import Link from "next/link";

type Props = {
  title: string;

  description: string;

  buttonLabel?: string;

  buttonHref?: string;
};

export const PageHeader = ({
  title,
  description,
  buttonLabel,
  buttonHref,
}: Props) => {

  return (
    <div
      className="
        flex
        flex-col
        md:flex-row
        md:items-center
        md:justify-between
        gap-4
      "
    >
      <div>

        <h1
          className="
            text-3xl
            font-bold
          "
        >
          {title}
        </h1>

        <p
          className="
            text-gray-500
            mt-2
          "
        >
          {description}
        </p>
      </div>

      {buttonLabel &&
       buttonHref && (

        <Link
          href={buttonHref}
          className="
            bg-black
            text-white
            px-5
            py-3
            rounded-xl
          "
        >
          {buttonLabel}
        </Link>
      )}
    </div>
  );
};
'@

[System.IO.File]::WriteAllText(
  "$ProjectRoot\src\components\crud\PageHeader.tsx",
  $pageHeader
)

Write-Host "Created: PageHeader.tsx"

# -------------------------------------------------
# CONFIRM DIALOG
# -------------------------------------------------

$confirmDialog = @'
type Props = {
  open: boolean;

  title: string;

  description: string;

  onConfirm: () => void;

  onCancel: () => void;
};

export const ConfirmDialog = ({
  open,
  title,
  description,
  onConfirm,
  onCancel,
}: Props) => {

  if (!open) {

    return null;
  }

  return (
    <div
      className="
        fixed
        inset-0
        bg-black/50
        flex
        items-center
        justify-center
        z-50
      "
    >
      <div
        className="
          bg-white
          rounded-2xl
          p-6
          w-full
          max-w-md
        "
      >
        <h3
          className="
            text-xl
            font-semibold
          "
        >
          {title}
        </h3>

        <p
          className="
            text-gray-500
            mt-3
          "
        >
          {description}
        </p>

        <div
          className="
            flex
            justify-end
            gap-3
            mt-6
          "
        >
          <button
            onClick={onCancel}
            className="
              border
              px-4
              py-2
              rounded-xl
            "
          >
            Annuler
          </button>

          <button
            onClick={onConfirm}
            className="
              bg-red-600
              text-white
              px-4
              py-2
              rounded-xl
            "
          >
            Confirmer
          </button>
        </div>
      </div>
    </div>
  );
};
'@

[System.IO.File]::WriteAllText(
  "$ProjectRoot\src\components\crud\ConfirmDialog.tsx",
  $confirmDialog
)

Write-Host "Created: ConfirmDialog.tsx"

Write-Host ""
Write-Host "======================================="
Write-Host " CRUD TOOLKIT COMPLETE"
Write-Host "======================================="
Write-Host ""
Write-Host "NEXT:"
Write-Host "1. Upgrade Produits UI"
Write-Host "2. pnpm build"
Write-Host "3. firebase deploy"
Write-Host ""