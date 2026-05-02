Write-Host "Setup Terragest Firebase..." -ForegroundColor Cyan

# =====================================
# FIREBASE
# =====================================

New-Item -ItemType Directory -Force -Path "src\lib\firebase"

New-Item -ItemType File -Force -Path "src\lib\firebase\firebase.ts"
New-Item -ItemType File -Force -Path "src\lib\firebase\auth.ts"
New-Item -ItemType File -Force -Path "src\lib\firebase\firestore.ts"
New-Item -ItemType File -Force -Path "src\lib\firebase\storage.ts"

# =====================================
# ENV
# =====================================

@"
NEXT_PUBLIC_FIREBASE_API_KEY=
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=
NEXT_PUBLIC_FIREBASE_PROJECT_ID=
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=
NEXT_PUBLIC_FIREBASE_APP_ID=
"@ | Set-Content ".env.local"

# =====================================
# FEATURES
# =====================================

$features = @(
    "auth",
    "organisations",
    "terrains"
)

foreach ($feature in $features) {

    New-Item -ItemType Directory -Force -Path "src\features\$feature"

    New-Item -ItemType Directory -Force -Path "src\features\$feature\components"
    New-Item -ItemType Directory -Force -Path "src\features\$feature\services"
    New-Item -ItemType Directory -Force -Path "src\features\$feature\repositories"
    New-Item -ItemType Directory -Force -Path "src\features\$feature\types"
    New-Item -ItemType Directory -Force -Path "src\features\$feature\validators"
    New-Item -ItemType Directory -Force -Path "src\features\$feature\pages"
}

# =====================================
# TYPES
# =====================================

New-Item -ItemType File -Force -Path "src\types\organisation.ts"
New-Item -ItemType File -Force -Path "src\types\utilisateur.ts"
New-Item -ItemType File -Force -Path "src\types\terrain.ts"

Write-Host "Terragest Firebase structure created." -ForegroundColor Green