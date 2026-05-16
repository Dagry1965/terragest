import type {
  ERPGeneratedSchema,
} from "./ERPGeneratedSchema";

/*
  LEGACY FALLBACK FILE

  Les schemas sont maintenant
  générés depuis :

  CoreModuleRuntimeAdapter
    .toGeneratedSchemas()

  Ce fichier reste présent
  temporairement pour éviter
  les imports cassés.
*/

export const ERPDefaultSchemas:
  ERPGeneratedSchema[] = [];