# =====================================================
# TERRAGEST PWA SETUP
# =====================================================

Write-Host ""
Write-Host "Installing PWA dependencies..." `
-ForegroundColor Cyan

Set-Location `
"C:\Users\Admin\terragest"

# =====================================================
# INSTALL
# =====================================================

pnpm add `
next-pwa

# =====================================================
# CREATE PUBLIC FOLDER
# =====================================================

New-Item `
-ItemType Directory `
-Force `
-Path "public"

# =====================================================
# MANIFEST
# =====================================================

$manifest = @'
{
  "name": "Terragest",
  "short_name": "Terragest",
  "description": "ERP patrimonial rural intelligent",
  "start_url": "/",
  "display": "standalone",
  "background_color": "#ffffff",
  "theme_color": "#16a34a",
  "orientation": "portrait",
  "icons": [
    {
      "src": "/icon-192.png",
      "sizes": "192x192",
      "type": "image/png"
    },
    {
      "src": "/icon-512.png",
      "sizes": "512x512",
      "type": "image/png"
    }
  ]
}
'@

Set-Content `
-Path "public\manifest.json" `
-Value $manifest

# =====================================================
# NEXT CONFIG
# =====================================================

$nextConfig = @'
import withPWA from "next-pwa";

const nextConfig = {

  reactStrictMode: true,
};

export default withPWA({

  dest: "public",

  disable:
    process.env.NODE_ENV ===
    "development",

})(nextConfig);
'@

Set-Content `
-Path "next.config.ts" `
-Value $nextConfig

# =====================================================
# LAYOUT
# =====================================================

$layoutPath =
"src\app\layout.tsx"

if (Test-Path $layoutPath) {

  $layout =
  Get-Content `
    $layoutPath `
    -Raw

  if ($layout -notmatch
    'manifest.json') {

    $layout =
    $layout -replace `
'</head>',
'
<link rel="manifest" href="/manifest.json" />
<meta name="theme-color" content="#16a34a" />
</head>
'

    Set-Content `
    $layoutPath `
    -Value $layout
  }
}

# =====================================================
# OFFLINE PAGE
# =====================================================

New-Item `
-ItemType Directory `
-Force `
-Path "src\app\offline"

$offline = @'
export default function OfflinePage() {

  return (

    <div
      className="
        min-h-screen
        flex
        items-center
        justify-center
        p-10
      "
    >

      <div
        className="
          bg-white
          rounded-2xl
          shadow-md
          p-10
          text-center
        "
      >

        <h1
          className="
            text-4xl
            font-bold
            mb-4
          "
        >
          Hors ligne
        </h1>

        <p>
          Synchronisation en attente...
        </p>

      </div>

    </div>
  );
}
'@

Set-Content `
-Path "src\app\offline\page.tsx" `
-Value $offline

# =====================================================
# DONE
# =====================================================

Write-Host ""
Write-Host "PWA setup completed." `
-ForegroundColor Green

Write-Host ""
Write-Host "Run now:" `
-ForegroundColor Cyan

Write-Host "pnpm build"

Write-Host ""
Write-Host "Then:" `
-ForegroundColor Cyan

Write-Host "firebase deploy"

Write-Host ""
