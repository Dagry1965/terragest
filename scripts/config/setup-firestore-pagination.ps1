Write-Host "Generating Firestore Pagination..." -ForegroundColor Cyan

# =====================================================
# ROOT
# =====================================================

$ROOT =
"C:\Users\Admin\terragest"

Set-Location $ROOT

# =====================================================
# PAGINATED HOOK
# =====================================================

$hook = @'
"use client";

import {
  useEffect,
  useState,
} from "react";

import {
  collection,
  getDocs,
  limit,
  orderBy,
  query,
  startAfter,
  where,
} from "firebase/firestore";

import {
  db,
} from "@/lib/firebase/firebase";

const PAGE_SIZE = 10;

export const usePaginatedExploitations =
(
  tenantId: string
) => {

  const [exploitations,
    setExploitations] =
    useState<any[]>([]);

  const [loading,
    setLoading] =
    useState(true);

  const [loadingMore,
    setLoadingMore] =
    useState(false);

  const [lastDoc,
    setLastDoc] =
    useState<any>(null);

  const [hasMore,
    setHasMore] =
    useState(true);

  const loadInitial =
    async () => {

      setLoading(true);

      const q =
        query(

          collection(
            db,
            "exploitations"
          ),

          where(
            "tenantId",
            "==",
            tenantId
          ),

          orderBy(
            "createdAt",
            "desc"
          ),

          limit(
            PAGE_SIZE
          )
        );

      const snapshot =
        await getDocs(q);

      const data =
        snapshot.docs.map(
          (doc) => ({

            id: doc.id,

            ...doc.data(),
          })
        );

      setExploitations(
        data
      );

      setLastDoc(
        snapshot.docs[
          snapshot.docs.length - 1
        ]
      );

      setHasMore(
        snapshot.docs.length ===
        PAGE_SIZE
      );

      setLoading(false);
    };

  const loadMore =
    async () => {

      if (
        !lastDoc ||
        !hasMore
      ) {

        return;
      }

      setLoadingMore(true);

      const q =
        query(

          collection(
            db,
            "exploitations"
          ),

          where(
            "tenantId",
            "==",
            tenantId
          ),

          orderBy(
            "createdAt",
            "desc"
          ),

          startAfter(
            lastDoc
          ),

          limit(
            PAGE_SIZE
          )
        );

      const snapshot =
        await getDocs(q);

      const data =
        snapshot.docs.map(
          (doc) => ({

            id: doc.id,

            ...doc.data(),
          })
        );

      setExploitations(
        (
          previous
        ) => [

          ...previous,

          ...data,
        ]
      );

      setLastDoc(
        snapshot.docs[
          snapshot.docs.length - 1
        ]
      );

      setHasMore(
        snapshot.docs.length ===
        PAGE_SIZE
      );

      setLoadingMore(false);
    };

  useEffect(() => {

    loadInitial();

  }, [tenantId]);

  return {

    exploitations,

    loading,

    loadMore,

    loadingMore,

    hasMore,
  };
}
'@

Set-Content `
"$ROOT\src\features\exploitations\hooks\usePaginatedExploitations.ts" `
$hook

# =====================================================
# LOAD MORE BUTTON
# =====================================================

$button = @'
"use client";

interface Props {

  loading: boolean;

  hasMore: boolean;

  onClick:
    () => void;
}

export const LoadMoreButton = ({
  loading,
  hasMore,
  onClick,
}: Props) => {

  if (!hasMore) {

    return null;
  }

  return (

    <div className="
      flex
      justify-center
    ">

      <button
        onClick={onClick}
        disabled={loading}
        className="
          bg-black
          text-white
          px-6
          py-3
          rounded-2xl
        "
      >

        {loading
          ? "Chargement..."
          : "Charger plus"}

      </button>

    </div>
  );
}
'@

Set-Content `
"$ROOT\src\features\exploitations\components\LoadMoreButton.tsx" `
$button

# =====================================================
# UPDATED PAGE
# =====================================================

$page = @'
"use client";

import {
  useMemo,
  useState,
} from "react";

import {
  AppLayout,
} from "@/components/layout/AppLayout";

import {
  ExploitationForm,
} from "@/features/exploitations/components/ExploitationForm";

import {
  ExploitationsSearchBar,
} from "@/features/exploitations/components/ExploitationsSearchBar";

import {
  ExploitationsFilterBar,
} from "@/features/exploitations/components/ExploitationsFilterBar";

import {
  ExploitationsEnterpriseTable,
} from "@/features/exploitations/components/ExploitationsEnterpriseTable";

import {
  ExploitationEditModal,
} from "@/features/exploitations/components/ExploitationEditModal";

import {
  LoadMoreButton,
} from "@/features/exploitations/components/LoadMoreButton";

import {
  usePaginatedExploitations,
} from "@/features/exploitations/hooks/usePaginatedExploitations";

import {
  ExploitationsRepository,
} from "@/features/exploitations/repositories/ExploitationsRepository";

export default function ExploitationsPage() {

  const [search,
    setSearch] =
    useState("");

  const [type,
    setType] =
    useState("");

  const [status,
    setStatus] =
    useState("");

  const [selected,
    setSelected] =
    useState<any>(null);

  const [open,
    setOpen] =
    useState(false);

  const {
    exploitations,
    loading,
    loadMore,
    loadingMore,
    hasMore,
  } =
    usePaginatedExploitations(
      "tenant-demo"
    );

  const filtered =
    useMemo(() => {

      return exploitations.filter(
        (
          item
        ) => {

          const matchesSearch =

            item.nom
              ?.toLowerCase()
              .includes(
                search.toLowerCase()
              )

            ||

            item.proprietaire
              ?.toLowerCase()
              .includes(
                search.toLowerCase()
              );

          const matchesType =

            !type ||
            item.type === type;

          const matchesStatus =

            !status ||
            item.statut === status;

          return (
            matchesSearch &&
            matchesType &&
            matchesStatus
          );
        }
      );

    }, [
      exploitations,
      search,
      type,
      status,
    ]);

  const handleDelete =
    async (
      id: string
    ) => {

      const confirmed =
        window.confirm(
          "Supprimer cette exploitation ?"
        );

      if (!confirmed) {

        return;
      }

      await ExploitationsRepository.delete(
        id
      );
    };

  const handleEdit =
    (
      exploitation: any
    ) => {

      setSelected(
        exploitation
      );

      setOpen(true);
    };

  return (

    <AppLayout>

      <div className="
        space-y-8
      ">

        <div>

          <h1 className="
            text-5xl
            font-bold
          ">

            Exploitations

          </h1>

        </div>

        <ExploitationForm />

        <ExploitationsSearchBar
          value={search}
          onChange={setSearch}
        />

        <ExploitationsFilterBar
          type={type}
          status={status}
          onTypeChange={setType}
          onStatusChange={setStatus}
        />

        {loading ? (

          <div className="
            bg-white
            rounded-2xl
            p-10
          ">

            Chargement...

          </div>

        ) : (

          <>
            <ExploitationsEnterpriseTable
              exploitations={filtered}
              onDelete={handleDelete}
              onEdit={handleEdit}
            />

            <LoadMoreButton
              loading={loadingMore}
              hasMore={hasMore}
              onClick={loadMore}
            />
          </>

        )}

        <ExploitationEditModal
          exploitation={selected}
          open={open}
          onClose={() =>
            setOpen(false)
          }
        />

      </div>

    </AppLayout>
  );
}
'@

Set-Content `
"$ROOT\src\app\(private)\exploitations\page.tsx" `
$page

# =====================================================
# DOCUMENTATION
# =====================================================

$doc = @'
# Firestore Pagination

## Features

- Paginated Firestore queries
- Load more UX
- Enterprise performance foundation
- Progressive loading

--------------------------------------------------

## Status

Phase 6 complete.
Ready for Firestore security rules.
'@

Set-Content `
"$ROOT\docs\FIRESTORE_PAGINATION.md" `
$doc

# =====================================================
# DONE
# =====================================================

Write-Host ""
Write-Host "Firestore Pagination generated successfully." -ForegroundColor Green
Write-Host ""
Write-Host "Generated:" -ForegroundColor Yellow
Write-Host "- Paginated queries"
Write-Host "- Load more UX"
Write-Host "- Firestore optimization"
Write-Host "- Enterprise scalability foundation"
Write-Host ""