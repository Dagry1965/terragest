$ErrorActionPreference = "Stop"

$ProjectRoot = "C:\Users\Admin\terragest"

Set-Location $ProjectRoot

Write-Host ""
Write-Host "======================================="
Write-Host " FIRESTORE SAAS RULES SETUP"
Write-Host "======================================="
Write-Host ""

# -------------------------------------------------
# FIRESTORE RULES
# -------------------------------------------------

$rules = @'
rules_version = '2';

service cloud.firestore {

  match /databases/{database}/documents {

    # -------------------------------------------------
    # HELPERS
    # -------------------------------------------------

    function isAuthenticated() {

      return request.auth != null;
    }

    function isSameOrganization() {

      return isAuthenticated()
        &&
        resource.data.organizationId
          ==
        request.auth.token.organizationId;
    }

    function incomingSameOrganization() {

      return isAuthenticated()
        &&
        request.resource.data.organizationId
          ==
        request.auth.token.organizationId;
    }

    function isAdmin() {

      return request.auth.token.role
        == "admin";
    }

    # -------------------------------------------------
    # ORGANIZATIONS
    # -------------------------------------------------

    match /organizations/{docId} {

      allow read:
        if isSameOrganization();

      allow create:
        if isAuthenticated();

      allow update, delete:
        if isAdmin()
        &&
        isSameOrganization();
    }

    # -------------------------------------------------
    # MEMBERSHIPS
    # -------------------------------------------------

    match /memberships/{docId} {

      allow read:
        if isSameOrganization();

      allow create:
        if isAdmin();

      allow update, delete:
        if isAdmin()
        &&
        isSameOrganization();
    }

    # -------------------------------------------------
    # PRODUITS
    # -------------------------------------------------

    match /produits/{docId} {

      allow read:
        if isSameOrganization();

      allow create:
        if incomingSameOrganization();

      allow update:
        if incomingSameOrganization();

      allow delete:
        if isAdmin()
        &&
        isSameOrganization();
    }

    # -------------------------------------------------
    # STOCKS
    # -------------------------------------------------

    match /stocks/{docId} {

      allow read:
        if isSameOrganization();

      allow create:
        if incomingSameOrganization();

      allow update:
        if incomingSameOrganization();

      allow delete:
        if isAdmin()
        &&
        isSameOrganization();
    }

    # -------------------------------------------------
    # MATERIELS
    # -------------------------------------------------

    match /materiels/{docId} {

      allow read:
        if isSameOrganization();

      allow create:
        if incomingSameOrganization();

      allow update:
        if incomingSameOrganization();

      allow delete:
        if isAdmin()
        &&
        isSameOrganization();
    }
  }
}
'@

[System.IO.File]::WriteAllText(
  "$ProjectRoot\firestore.rules",
  $rules
)

Write-Host "Updated: firestore.rules"

Write-Host ""
Write-Host "======================================="
Write-Host " FIRESTORE SAAS RULES COMPLETE"
Write-Host "======================================="
Write-Host ""
Write-Host "NEXT:"
Write-Host "1. firebase deploy --only firestore:rules"
Write-Host "2. pnpm build"
Write-Host "3. git commit"
Write-Host ""