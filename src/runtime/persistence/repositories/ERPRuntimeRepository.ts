import {
  ERPTenantContext,
} from "@/runtime/tenant";

import {
  ERPInMemoryPersistenceDriver,
} from "../drivers/ERPInMemoryPersistenceDriver";

import type {
  ERPPersistedRecord,
  ERPPersistenceDriver,
} from "../drivers/ERPPersistenceDriver";

function createId(prefix: string) {
  return `${prefix}_${Date.now()}_${Math.random().toString(16).slice(2)}`;
}

export class ERPRuntimeRepository<T = unknown> {
  constructor(
    private readonly collection: string,
    private readonly driver: ERPPersistenceDriver = ERPInMemoryPersistenceDriver
  ) {}

  async save(
    data: T,
    id = createId(this.collection)
  ) {
    const tenant =
      ERPTenantContext.current();

    const now =
      new Date().toISOString();

    const record: ERPPersistedRecord<T> = {
      id,
      tenantId: tenant.id,
      collection: this.collection,
      data,
      createdAt: now,
      updatedAt: now,
    };

    await this.driver.save(
      this.collection,
      record
    );

    return record;
  }

  async list() {
    const tenant =
      ERPTenantContext.current();

    return this.driver.list<T>(
      this.collection,
      tenant.id
    );
  }

  async get(id: string) {
    const tenant =
      ERPTenantContext.current();

    return this.driver.get<T>(
      this.collection,
      tenant.id,
      id
    );
  }
}