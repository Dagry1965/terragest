$ErrorActionPreference = "Stop"

$ProjectRoot = "C:\Users\Admin\terragest"

Set-Location $ProjectRoot

Write-Host ""
Write-Host "======================================="
Write-Host " AI ANALYTICS SETUP"
Write-Host "======================================="
Write-Host ""

# -------------------------------------------------
# DIRECTORIES
# -------------------------------------------------

$dirs = @(
  "$ProjectRoot\src\features\ai\services",
  "$ProjectRoot\src\features\ai\components",
  "$ProjectRoot\src\features\ai\types"
)

foreach ($dir in $dirs) {

  if (!(Test-Path $dir)) {

    New-Item `
      -ItemType Directory `
      -Path $dir `
      -Force | Out-Null

    Write-Host "Created: $dir"
  }
}

# -------------------------------------------------
# AI TYPES
# -------------------------------------------------

$types = @'
export type Prediction = {

  label: string;

  value: number;

  confidence: number;
};

export type Recommendation = {

  title: string;

  description: string;

  severity:
    | "low"
    | "medium"
    | "high";
};
'@

[System.IO.File]::WriteAllText(
  "$ProjectRoot\src\features\ai\types\AI.ts",
  $types
)

Write-Host "Created: AI.ts"

# -------------------------------------------------
# AI SERVICE
# -------------------------------------------------

$service = @'
import {
  Prediction,
  Recommendation,
} from "@/features/ai/types/AI";

export const AIAnalyticsService = {

  async getPredictions():
  Promise<Prediction[]> {

    return [
      {
        label:
          "Risque rupture stock",
        value: 72,
        confidence: 91,
      },
      {
        label:
          "Croissance ventes",
        value: 18,
        confidence: 84,
      },
      {
        label:
          "Performance exploitation",
        value: 88,
        confidence: 93,
      },
    ];
  },

  async getRecommendations():
  Promise<Recommendation[]> {

    return [
      {
        title:
          "Réapprovisionnement conseillé",

        description:
          "Le stock engrais est faible.",

        severity:
          "high",
      },

      {
        title:
          "Optimisation irrigation",

        description:
          "Consommation eau élevée.",

        severity:
          "medium",
      },

      {
        title:
          "Bonne performance",

        description:
          "Production supérieure prévisions.",

        severity:
          "low",
      },
    ];
  },
};
'@

[System.IO.File]::WriteAllText(
  "$ProjectRoot\src\features\ai\services\AIAnalyticsService.ts",
  $service
)

Write-Host "Created: AIAnalyticsService.ts"

# -------------------------------------------------
# AI PREDICTIONS CARD
# -------------------------------------------------

$predictions = @'
"use client";

import {
  useEffect,
  useState,
} from "react";

import {
  Prediction,
} from "@/features/ai/types/AI";

import { AIAnalyticsService }
from "@/features/ai/services/AIAnalyticsService";

export const AIPredictionsCard =
() => {

  const [
    predictions,
    setPredictions,
  ] = useState<Prediction[]>([]);

  useEffect(() => {

    async function load() {

      const data =
        await AIAnalyticsService
          .getPredictions();

      setPredictions(data);
    }

    load();

  }, []);

  return (
    <div
      className="
        bg-white
        border
        rounded-2xl
        p-6
        space-y-4
      "
    >
      <div>

        <h2
          className="
            text-xl
            font-semibold
          "
        >
          AI Predictions
        </h2>

        <p
          className="
            text-gray-500
            mt-1
          "
        >
          Prévisions intelligentes
        </p>
      </div>

      <div
        className="
          space-y-4
        "
      >
        {predictions.map(
          (prediction) => (

          <div
            key={prediction.label}
            className="
              border
              rounded-xl
              p-4
            "
          >
            <div
              className="
                flex
                items-center
                justify-between
              "
            >
              <span>
                {prediction.label}
              </span>

              <strong>
                {prediction.value}%
              </strong>
            </div>

            <div
              className="
                text-sm
                text-gray-500
                mt-2
              "
            >
              Confiance :
              {" "}
              {
                prediction.confidence
              }%
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
'@

[System.IO.File]::WriteAllText(
  "$ProjectRoot\src\features\ai\components\AIPredictionsCard.tsx",
  $predictions
)

Write-Host "Created: AIPredictionsCard.tsx"

# -------------------------------------------------
# AI RECOMMENDATIONS CARD
# -------------------------------------------------

$recommendations = @'
"use client";

import {
  useEffect,
  useState,
} from "react";

import {
  Recommendation,
} from "@/features/ai/types/AI";

import { AIAnalyticsService }
from "@/features/ai/services/AIAnalyticsService";

export const AIRecommendationsCard =
() => {

  const [
    recommendations,
    setRecommendations,
  ] = useState<
    Recommendation[]
  >([]);

  useEffect(() => {

    async function load() {

      const data =
        await AIAnalyticsService
          .getRecommendations();

      setRecommendations(data);
    }

    load();

  }, []);

  return (
    <div
      className="
        bg-white
        border
        rounded-2xl
        p-6
        space-y-4
      "
    >
      <div>

        <h2
          className="
            text-xl
            font-semibold
          "
        >
          AI Recommendations
        </h2>

        <p
          className="
            text-gray-500
            mt-1
          "
        >
          Recommandations automatiques
        </p>
      </div>

      <div
        className="
          space-y-4
        "
      >
        {recommendations.map(
          (recommendation) => (

          <div
            key={recommendation.title}
            className="
              border
              rounded-xl
              p-4
            "
          >
            <div
              className="
                flex
                items-center
                justify-between
              "
            >
              <strong>
                {
                  recommendation.title
                }
              </strong>

              <span
                className="
                  text-xs
                  uppercase
                  text-gray-500
                "
              >
                {
                  recommendation.severity
                }
              </span>
            </div>

            <p
              className="
                text-gray-600
                mt-2
              "
            >
              {
                recommendation.description
              }
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};
'@

[System.IO.File]::WriteAllText(
  "$ProjectRoot\src\features\ai\components\AIRecommendationsCard.tsx",
  $recommendations
)

Write-Host "Created: AIRecommendationsCard.tsx"

# -------------------------------------------------
# AI PAGE
# -------------------------------------------------

$pageDir =
"$ProjectRoot\src\app\(private)\ai"

if (!(Test-Path $pageDir)) {

  New-Item `
    -ItemType Directory `
    -Path $pageDir `
    -Force | Out-Null

  Write-Host "Created: ai page dir"
}

$page = @'
import { AIPredictionsCard }
from "@/features/ai/components/AIPredictionsCard";

import { AIRecommendationsCard }
from "@/features/ai/components/AIRecommendationsCard";

export default function AIPage() {

  return (
    <div
      className="
        p-6
        space-y-6
      "
    >
      <div>

        <h1
          className="
            text-3xl
            font-bold
          "
        >
          AI Analytics
        </h1>

        <p
          className="
            text-gray-500
            mt-2
          "
        >
          Intelligence métier
        </p>
      </div>

      <div
        className="
          grid
          grid-cols-1
          xl:grid-cols-2
          gap-6
        "
      >
        <AIPredictionsCard />

        <AIRecommendationsCard />
      </div>
    </div>
  );
}
'@

[System.IO.File]::WriteAllText(
  "$ProjectRoot\src\app\(private)\ai\page.tsx",
  $page
)

Write-Host "Created: AI page"

Write-Host ""
Write-Host "======================================="
Write-Host " AI ANALYTICS COMPLETE"
Write-Host "======================================="
Write-Host ""
Write-Host "NEXT:"
Write-Host "1. pnpm build"
Write-Host "2. git commit"
Write-Host "3. firebase deploy"
Write-Host ""