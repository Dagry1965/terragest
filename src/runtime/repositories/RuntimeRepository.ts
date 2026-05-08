import type { ERPModule } from "@/runtime/modules";
import type { RuntimeRecord } from "@/runtime/data-binding/RuntimeRecord";

const memoryStore = new Map<string, RuntimeRecord[]>();

function getStore(module: ERPModule): RuntimeRecord[] {
  const collection = module.schema.collection;

  if (!memoryStore.has(collection)) {
    memoryStore.set(collection, []);
  }

  return memoryStore.get(collection) ?? [];
}

export class RuntimeRepository {
  static async findMany(module: ERPModule): Promise<RuntimeRecord[]> {
    const rows = getStore(module);

    if (rows.length > 0) {
      return rows;
    }

    return RuntimeRepository.seed(module);
  }

  static async findById(
    module: ERPModule,
    id: string
  ): Promise<RuntimeRecord | null> {
    const rows = await RuntimeRepository.findMany(module);

    return rows.find((row) => row.id === id) ?? null;
  }

  static async create(
    module: ERPModule,
    data: Record<string, unknown>
  ): Promise<RuntimeRecord> {
    const rows = getStore(module);

    const record: RuntimeRecord = {
      id: `${module.metadata.key}-${Date.now()}`,
      ...data,
    };

    rows.unshift(record);

    return record;
  }

  static async update(
    module: ERPModule,
    id: string,
    data: Record<string, unknown>
  ): Promise<RuntimeRecord> {
    const rows = getStore(module);
    const index = rows.findIndex((row) => row.id === id);

    if (index === -1) {
      const created = {
        id,
        ...data,
      };

      rows.unshift(created);

      return created;
    }

    rows[index] = {
      ...rows[index],
      ...data,
    };

    return rows[index];
  }

  static async seed(module: ERPModule): Promise<RuntimeRecord[]> {
    const rows = Array.from({ length: 8 }).map((_, index) => {
      const row: RuntimeRecord = {
        id: `${module.metadata.key}-${index + 1}`,
      };

      module.schema.fields.forEach((field) => {
        if (field.type === "number") {
          row[field.key] = index * 10 + 5;
        } else if (field.type === "status") {
          row[field.key] =
            index % 3 === 0
              ? "Actif"
              : index % 3 === 1
                ? "En suivi"
                : "A controler";
        } else if (field.type === "relation") {
          row[field.key] = "REF-" + String(index + 1).padStart(3, "0");
        } else {
          row[field.key] = `${field.label} ${index + 1}`;
        }
      });

      return row;
    });

    memoryStore.set(module.schema.collection, rows);

    return rows;
  }
}