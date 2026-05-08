$ErrorActionPreference = "Stop"
$projectRoot = "C:\Users\Admin\terragest"

$globals = @'
@import "tailwindcss";

html,
body {
  min-height: 100%;
}

body {
  margin: 0;
  background: #f1f5f9;
}
'@

$postcss = @'
const config = {
  plugins: {
    "@tailwindcss/postcss": {},
  },
};

export default config;
'@

$utf8NoBom = New-Object System.Text.UTF8Encoding($false)

[System.IO.File]::WriteAllText(
  (Join-Path $projectRoot "src\app\globals.css"),
  $globals,
  $utf8NoBom
)

[System.IO.File]::WriteAllText(
  (Join-Path $projectRoot "postcss.config.mjs"),
  $postcss,
  $utf8NoBom
)

Set-Location $projectRoot

Remove-Item -Recurse -Force .next -ErrorAction SilentlyContinue

pnpm build