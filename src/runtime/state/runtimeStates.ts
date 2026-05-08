import {
  RuntimeState,
}
from "@/runtime/state/RuntimeState";

export const runtimeStates:
  RuntimeState[] = [

  // =====================================================
  // MAINTENANCE
  // =====================================================

  {
    module:
      "maintenance",

    code:
      "ouverte",

    label:
      "Ouverte",

    color:
      "yellow",

    editable:
      true,
  },

  {
    module:
      "maintenance",

    code:
      "diagnostic",

    label:
      "Diagnostic",

    color:
      "blue",

    editable:
      true,
  },

  {
    module:
      "maintenance",

    code:
      "intervention",

    label:
      "Intervention",

    color:
      "orange",

    editable:
      true,
  },

  {
    module:
      "maintenance",

    code:
      "cloturee",

    label:
      "Clôturée",

    color:
      "green",

    final:
      true,

    editable:
      false,
  },

  // =====================================================
  // MATERIELS
  // =====================================================

  {
    module:
      "materiels",

    code:
      "actif",

    label:
      "Actif",

    color:
      "green",
  },

  {
    module:
      "materiels",

    code:
      "maintenance",

    label:
      "Maintenance",

    color:
      "orange",
  },

  {
    module:
      "materiels",

    code:
      "hors_service",

    label:
      "Hors service",

    color:
      "red",

    editable:
      false,
  },

  // =====================================================
  // STOCKS
  // =====================================================

  {
    module:
      "stocks",

    code:
      "disponible",

    label:
      "Disponible",

    color:
      "green",
  },

  {
    module:
      "stocks",

    code:
      "faible",

    label:
      "Stock faible",

    color:
      "yellow",
  },

  {
    module:
      "stocks",

    code:
      "rupture",

    label:
      "Rupture",

    color:
      "red",
  },
];
