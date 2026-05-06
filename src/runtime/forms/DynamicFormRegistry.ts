import {
  DynamicFormContext,
}
from "@/runtime/forms/DynamicField";

import {
  maintenanceForm,
}
from "@/runtime/forms/definitions/maintenance.form";

import {
  materielsForm,
}
from "@/runtime/forms/definitions/materiels.form";

import {
  terrainsForm,
}
from "@/runtime/forms/definitions/terrains.form";

import {
  exploitationsForm,
}
from "@/runtime/forms/definitions/exploitations.form";

import {
  stocksForm,
}
from "@/runtime/forms/definitions/stocks.form";

import {
  produitsForm,
}
from "@/runtime/forms/definitions/produits.form";

import {
  interventionsForm,
}
from "@/runtime/forms/definitions/interventions.form";

import {
  contratsForm,
}
from "@/runtime/forms/definitions/contrats.form";

import {
  paiementsForm,
}
from "@/runtime/forms/definitions/paiements.form";

const registry = {

  maintenance:
    maintenanceForm,

  materiels:
    materielsForm,

  terrains:
    terrainsForm,

  exploitations:
    exploitationsForm,

  stocks:
    stocksForm,

  produits:
    produitsForm,

  interventions:
    interventionsForm,

  contrats:
    contratsForm,

  paiements:
    paiementsForm,
};

export class DynamicFormRegistry {

  static getForm(
    module: string,

    context:
      DynamicFormContext
  ) {

    const definition =
      registry[
        module as keyof typeof registry
      ];

    if (!definition) {

      console.warn(
        "No dynamic form definition for module:",
        module
      );

      return [];
    }

    return definition.build(
      context
    );
  }

  static getAvailableModules() {

    return Object.keys(
      registry
    );
  }
}
