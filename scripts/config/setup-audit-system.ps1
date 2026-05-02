Write-Host "Generating Terragest Audit System..." -ForegroundColor Cyan

# =====================================================
# DIRECTORIES
# =====================================================

mkdir "src\features\audit" -Force
mkdir "src\features\audit\services" -Force
mkdir "src\features\audit\types" -Force
mkdir "src\components\dashboard" -Force

# =====================================================
# AUDIT TYPE
# =====================================================

$auditType = @'
export interface AuditLog {

  id: string;

  organisationId: string;

  utilisateurId: string;

  utilisateurNom: string;

  action: string;

  module: string;

  cibleId: string;

  cibleNom: string;

  metadata?: any;

  createdAt: string;
}
'@

Set-Content `
"src\features\audit\types\AuditLog.ts" `
$auditType

# =====================================================
# AUDIT SERVICE
# =====================================================

$auditService = @'
import {
  addDoc,
  collection,
  getDocs,
  limit,
  orderBy,
  query,
  where,
} from "firebase/firestore";

import { db } from "@/lib/firebase/firebase";

export const AuditService = {

  async log(data: any) {

    return addDoc(
      collection(db, "audit_logs"),
      data
    );
  },

  async getLatestByOrganisation(
    organisationId: string
  ) {

    const q = query(
      collection(db, "audit_logs"),

      where(
        "organisationId",
        "==",
        organisationId
      ),

      orderBy(
        "createdAt",
        "desc"
      ),

      limit(20)
    );

    const snapshot =
      await getDocs(q);

    return snapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));
  },
};
'@

Set-Content `
"src\features\audit\services\AuditService.ts" `
$auditService

# =====================================================
# ACTIVITY FEED
# =====================================================

$activityFeed = @'
interface ActivityFeedProps {

  items: any[];
}

export const ActivityFeed = ({
  items,
}: ActivityFeedProps) => {

  return (

    <div className="
      bg-white
      rounded-2xl
      shadow-md
      p-6
    ">

      <h2 className="text-2xl font-bold">
        Activité récente
      </h2>

      <div className="mt-6 space-y-4">

        {items.map((item) => (

          <div
            key={item.id}
            className="
              border-b
              pb-3
            "
          >

            <p className="font-medium">

              {item.utilisateurNom}

              {" "}

              a effectué

              {" "}

              <span className="font-bold">
                {item.action}
              </span>

            </p>

            <p className="text-gray-500 text-sm">

              {item.module}

              {" • "}

              {item.cibleNom}

            </p>

          </div>

        ))}

      </div>

    </div>
  );
}
'@

Set-Content `
"src\components\dashboard\ActivityFeed.tsx" `
$activityFeed

# =====================================================
# DONE
# =====================================================

Write-Host ""
Write-Host "Terragest Audit System generated successfully." -ForegroundColor Green
Write-Host ""
Write-Host "Generated:" -ForegroundColor Yellow
Write-Host "- Audit logs"
Write-Host "- Activity feed"
Write-Host "- ERP traceability"
Write-Host "- User activity tracking"
Write-Host ""