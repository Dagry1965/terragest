Write-Host "Generating Terragest Notification Center..." -ForegroundColor Cyan

# =====================================================
# DIRECTORIES
# =====================================================

mkdir "src\features\notifications" -Force
mkdir "src\features\notifications\types" -Force
mkdir "src\features\notifications\services" -Force
mkdir "src\features\notifications\components" -Force

# =====================================================
# NOTIFICATION TYPE
# =====================================================

$notificationType = @'
export interface Notification {

  id: string;

  organisationId: string;

  titre: string;

  message: string;

  type: string;

  lu: boolean;

  metadata?: any;

  createdAt: string;
}
'@

Set-Content `
"src\features\notifications\types\Notification.ts" `
$notificationType

# =====================================================
# NOTIFICATION SERVICE
# =====================================================

$notificationService = @'
import {
  addDoc,
  collection,
  doc,
  getDocs,
  limit,
  orderBy,
  query,
  updateDoc,
  where,
} from "firebase/firestore";

import { db } from "@/lib/firebase/firebase";

export const NotificationService = {

  async create(data: any) {

    return addDoc(
      collection(
        db,
        "notifications"
      ),
      data
    );
  },

  async getLatestByOrganisation(
    organisationId: string
  ) {

    const q = query(
      collection(
        db,
        "notifications"
      ),

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

  async markAsRead(id: string) {

    return updateDoc(
      doc(
        db,
        "notifications",
        id
      ),
      {
        lu: true,
      }
    );
  },
};
'@

Set-Content `
"src\features\notifications\services\NotificationService.ts" `
$notificationService

# =====================================================
# NOTIFICATION BADGE
# =====================================================

$notificationBadge = @'
interface NotificationBadgeProps {

  total: number;
}

export const NotificationBadge = ({
  total,
}: NotificationBadgeProps) => {

  if (total <= 0) {
    return null;
  }

  return (

    <div
      className="
        inline-flex
        items-center
        justify-center
        min-w-[28px]
        h-7
        px-2
        rounded-full
        bg-red-600
        text-white
        text-sm
        font-bold
      "
    >
      {total}
    </div>
  );
}
'@

Set-Content `
"src\features\notifications\components\NotificationBadge.tsx" `
$notificationBadge

# =====================================================
# NOTIFICATION CENTER
# =====================================================

$notificationCenter = @'
"use client";

import { NotificationBadge } from "@/features/notifications/components/NotificationBadge";

interface NotificationCenterProps {

  notifications: any[];
}

export const NotificationCenter = ({
  notifications,
}: NotificationCenterProps) => {

  const unread =
    notifications.filter(
      (item) => !item.lu
    );

  return (

    <div className="
      bg-white
      rounded-2xl
      shadow-md
      p-6
    ">

      <div className="
        flex
        items-center
        justify-between
      ">

        <h2 className="text-2xl font-bold">
          Notifications
        </h2>

        <NotificationBadge
          total={unread.length}
        />

      </div>

      <div className="mt-6 space-y-4">

        {notifications.length === 0 && (

          <p className="text-gray-500">
            Aucune notification
          </p>

        )}

        {notifications.map((item) => (

          <div
            key={item.id}
            className={`
              border
              rounded-xl
              p-4

              ${!item.lu
                ? "border-red-300 bg-red-50"
                : "border-gray-200"}
            `}
          >

            <div className="
              flex
              items-center
              justify-between
            ">

              <h3 className="font-bold">
                {item.titre}
              </h3>

              {!item.lu && (

                <span className="
                  text-xs
                  font-bold
                  text-red-600
                ">
                  Nouveau
                </span>

              )}

            </div>

            <p className="text-gray-600 mt-2">
              {item.message}
            </p>

          </div>

        ))}

      </div>

    </div>
  );
}
'@

Set-Content `
"src\features\notifications\components\NotificationCenter.tsx" `
$notificationCenter

# =====================================================
# STOCK ALERT HELPER
# =====================================================

$stockAlert = @'
import { NotificationService } from "@/features/notifications/services/NotificationService";

export const createStockAlert =
  async (
    organisationId: string,
    produit: any
  ) => {

    if (
      produit.stockActuel >
      produit.seuilAlerte
    ) {
      return;
    }

    await NotificationService.create({

      organisationId,

      titre: "Stock faible",

      message:
        `${produit.nom} est sous le seuil d'alerte`,

      type: "STOCK_FAIBLE",

      lu: false,

      metadata: {
        produitId: produit.id,
      },

      createdAt:
        new Date().toISOString(),
    });
  };
'@

Set-Content `
"src\features\notifications\services\createStockAlert.ts" `
$stockAlert

# =====================================================
# DONE
# =====================================================

Write-Host ""
Write-Host "Terragest Notification Center generated successfully." -ForegroundColor Green
Write-Host ""
Write-Host "Generated:" -ForegroundColor Yellow
Write-Host "- Notification center"
Write-Host "- Notification badge"
Write-Host "- Notification service"
Write-Host "- Stock alerts"
Write-Host "- ERP proactive monitoring"
Write-Host ""