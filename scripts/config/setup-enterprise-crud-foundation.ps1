Write-Host "Generating Terragest Enterprise CRUD Foundation..." -ForegroundColor Cyan

# =====================================================
# ROOT PATH
# =====================================================

$ROOT =
"C:\Users\Admin\terragest"

Set-Location $ROOT

# =====================================================
# DIRECTORIES
# =====================================================

mkdir "src\shared\repositories" -Force
mkdir "src\shared\services" -Force
mkdir "src\shared\validators" -Force
mkdir "src\shared\errors" -Force
mkdir "src\shared\utils" -Force

# =====================================================
# BASE REPOSITORY
# =====================================================

$baseRepository = @'
import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  getDoc,
  getDocs,
  updateDoc,
} from "firebase/firestore";

import { db } from "@/lib/firebase/firebase";

export class BaseRepository<T> {

  collectionName: string;

  constructor(
    collectionName: string
  ) {

    this.collectionName =
      collectionName;
  }

  async create(
    data: T
  ) {

    return addDoc(
      collection(
        db,
        this.collectionName
      ),
      data as any
    );
  }

  async getAll() {

    const snapshot =
      await getDocs(
        collection(
          db,
          this.collectionName
        )
      );

    return snapshot.docs.map(
      (doc) => ({
        id: doc.id,
        ...doc.data(),
      })
    );
  }

  async getById(
    id: string
  ) {

    const snapshot =
      await getDoc(
        doc(
          db,
          this.collectionName,
          id
        )
      );

    return {

      id:
        snapshot.id,

      ...snapshot.data(),
    };
  }

  async update(
    id: string,
    data: Partial<T>
  ) {

    return updateDoc(
      doc(
        db,
        this.collectionName,
        id
      ),
      data as any
    );
  }

  async delete(
    id: string
  ) {

    return deleteDoc(
      doc(
        db,
        this.collectionName,
        id
      )
    );
  }
}
'@

Set-Content `
"$ROOT\src\shared\repositories\BaseRepository.ts" `
$baseRepository

# =====================================================
# BASE CRUD SERVICE
# =====================================================

$crudService = @'
export class BaseCrudService<T> {

  repository: any;

  constructor(
    repository: any
  ) {

    this.repository =
      repository;
  }

  async create(
    data: T
  ) {

    return this.repository.create(
      data
    );
  }

  async getAll() {

    return this.repository.getAll();
  }

  async getById(
    id: string
  ) {

    return this.repository.getById(
      id
    );
  }

  async update(
    id: string,
    data: Partial<T>
  ) {

    return this.repository.update(
      id,
      data
    );
  }

  async delete(
    id: string
  ) {

    return this.repository.delete(
      id
    );
  }
}
'@

Set-Content `
"$ROOT\src\shared\services\BaseCrudService.ts" `
$crudService

# =====================================================
# VALIDATION SERVICE
# =====================================================

$validationService = @'
export const ValidationService = {

  required(
    value: any,
    field: string
  ) {

    if (
      value === undefined ||
      value === null ||
      value === ""
    ) {

      throw new Error(
        `${field} is required`
      );
    }
  },

  email(
    value: string
  ) {

    const regex =
      /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (
      !regex.test(value)
    ) {

      throw new Error(
        "Invalid email"
      );
    }
  },
};
'@

Set-Content `
"$ROOT\src\shared\validators\ValidationService.ts" `
$validationService

# =====================================================
# APP ERROR
# =====================================================

$appError = @'
export class AppError
extends Error {

  code?: string;

  status?: number;

  constructor(
    message: string,
    code?: string,
    status?: number
  ) {

    super(message);

    this.code = code;

    this.status = status;
  }
}
'@

Set-Content `
"$ROOT\src\shared\errors\AppError.ts" `
$appError

# =====================================================
# ERROR HANDLER
# =====================================================

$errorHandler = @'
import { AppError } from "@/shared/errors/AppError";

export const ErrorHandler = {

  handle(
    error: any
  ) {

    console.error(error);

    if (
      error instanceof AppError
    ) {

      return {

        success: false,

        message:
          error.message,

        code:
          error.code,
      };
    }

    return {

      success: false,

      message:
        "Internal server error",
    };
  },
};
'@

Set-Content `
"$ROOT\src\shared\errors\ErrorHandler.ts" `
$errorHandler

# =====================================================
# PAGINATION UTILS
# =====================================================

$paginationUtils = @'
export const PaginationUtils = {

  paginate(
    items: any[],
    page: number,
    limit: number
  ) {

    const start =
      (page - 1) * limit;

    const end =
      start + limit;

    return {

      data:
        items.slice(
          start,
          end
        ),

      total:
        items.length,

      page,

      limit,
    };
  },
};
'@

Set-Content `
"$ROOT\src\shared\utils\PaginationUtils.ts" `
$paginationUtils

# =====================================================
# FILTER UTILS
# =====================================================

$filterUtils = @'
export const FilterUtils = {

  filterByField(
    items: any[],
    field: string,
    value: any
  ) {

    return items.filter(
      (item) =>
        item[field] === value
    );
  },
};
'@

Set-Content `
"$ROOT\src\shared\utils\FilterUtils.ts" `
$filterUtils

# =====================================================
# SORT UTILS
# =====================================================

$sortUtils = @'
export const SortUtils = {

  sortByField(
    items: any[],
    field: string
  ) {

    return items.sort(
      (
        a,
        b
      ) => {

        if (
          a[field] < b[field]
        ) {

          return -1;
        }

        if (
          a[field] > b[field]
        ) {

          return 1;
        }

        return 0;
      }
    );
  },
};
'@

Set-Content `
"$ROOT\src\shared\utils\SortUtils.ts" `
$sortUtils

# =====================================================
# PRODUCT REPOSITORY EXAMPLE
# =====================================================

$productRepository = @'
import { BaseRepository } from "@/shared/repositories/BaseRepository";

import { Product } from "@/shared/types/Product";

export class ProductRepository
extends BaseRepository<Product> {

  constructor() {

    super("products");
  }
}
'@

Set-Content `
"$ROOT\src\shared\repositories\ProductRepository.ts" `
$productRepository

# =====================================================
# PRODUCT SERVICE EXAMPLE
# =====================================================

$productService = @'
import { BaseCrudService } from "@/shared/services/BaseCrudService";

import { ProductRepository } from "@/shared/repositories/ProductRepository";

import { Product } from "@/shared/types/Product";

export class ProductService
extends BaseCrudService<Product> {

  constructor() {

    super(
      new ProductRepository()
    );
  }
}
'@

Set-Content `
"$ROOT\src\shared\services\ProductService.ts" `
$productService

# =====================================================
# DOCUMENTATION
# =====================================================

$crudDoc = @'
# Terragest CRUD Foundation

## Core Components

- BaseRepository
- BaseCrudService
- ValidationService
- ErrorHandler
- PaginationUtils
- FilterUtils
- SortUtils

--------------------------------------------------

## Architecture

Repository Pattern
Service Layer
Validation Layer
Error Layer

--------------------------------------------------

## Benefits

- Reusable CRUD
- Standardized APIs
- Enterprise error handling
- Scalable architecture
- Multi-tenant ready
'@

Set-Content `
"$ROOT\docs\CRUD_FOUNDATION.md" `
$crudDoc

# =====================================================
# DONE
# =====================================================

Write-Host ""
Write-Host "Terragest Enterprise CRUD Foundation generated successfully." -ForegroundColor Green
Write-Host ""
Write-Host "Generated:" -ForegroundColor Yellow
Write-Host "- Base repository"
Write-Host "- CRUD services"
Write-Host "- Validation layer"
Write-Host "- Error handling"
Write-Host "- Pagination / filtering / sorting"
Write-Host "- Enterprise scalable architecture"
Write-Host ""