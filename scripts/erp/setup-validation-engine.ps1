Write-Host "=== TERRAGEST_V2 - SETUP ERP VALIDATION ENGINE ===" -ForegroundColor Cyan

New-Item -ItemType Directory -Force "src/core/validation" | Out-Null

@'
export type ValidationRule = {
  field: string;

  message: string;

  validate: (
    value: any,
    payload?: any
  ) => boolean;
};

type ValidationRegistry =
  Record<
    string,
    ValidationRule[]
  >;

const validationRegistry:
  ValidationRegistry = {
    materiels: [
      {
        field: "prix",

        message:
          "Le prix est obligatoire",

        validate: (
          value
        ) =>
          value !== undefined &&
          value !== null &&
          value !== "",
      },
    ],

    contrats: [
      {
        field: "dateFin",

        message:
          "La date de fin doit être supérieure à la date de début",

        validate: (
          value,
          payload
        ) => {
          if (
            !payload?.dateDebut ||
            !value
          ) {
            return true;
          }

          return (
            new Date(value) >
            new Date(
              payload.dateDebut
            )
          );
        },
      },
    ],

    stocks: [
      {
        field: "quantite",

        message:
          "La quantité doit être positive",

        validate: (
          value
        ) =>
          typeof value ===
            "number" &&
          value >= 0,
      },
    ],
  };

export function validatePayload(
  module: string,
  payload: any
) {
  const rules =
    validationRegistry[
      module
    ] || [];

  const errors:
    string[] = [];

  for (const rule of rules) {
    const valid =
      rule.validate(
        payload[
          rule.field
        ],
        payload
      );

    if (!valid) {
      errors.push(
        rule.message
      );
    }
  }

  return {
    valid:
      errors.length === 0,

    errors,
  };
}

export function getValidationRules(
  module: string
) {
  return (
    validationRegistry[
      module
    ] || []
  );
}
'@ | Set-Content "src/core/validation/validation-engine.ts"

Write-Host "=== ERP VALIDATION ENGINE créé avec succès ===" -ForegroundColor Green