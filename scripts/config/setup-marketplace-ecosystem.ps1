Write-Host "Generating Terragest Marketplace Ecosystem..." -ForegroundColor Cyan

# =====================================================
# GO TO WEB ERP ROOT
# =====================================================

Set-Location "..\..\"

# =====================================================
# DIRECTORIES
# =====================================================

mkdir "src\features\marketplace" -Force
mkdir "src\features\marketplace\types" -Force
mkdir "src\features\marketplace\services" -Force
mkdir "src\features\marketplace\components" -Force
mkdir "src\features\marketplace\hooks" -Force

# =====================================================
# PLUGIN TYPE
# =====================================================

$pluginType = @'
export interface MarketplacePlugin {

  id: string;

  nom: string;

  description: string;

  version: string;

  auteur: string;

  categorie: string;

  actif: boolean;

  apiEndpoint?: string;

  installedAt?: string;
}
'@

Set-Content `
"src\features\marketplace\types\MarketplacePlugin.ts" `
$pluginType

# =====================================================
# PARTNER TYPE
# =====================================================

$partnerType = @'
export interface MarketplacePartner {

  id: string;

  nom: string;

  type: string;

  contactEmail?: string;

  siteWeb?: string;

  actif: boolean;

  createdAt: string;
}
'@

Set-Content `
"src\features\marketplace\types\MarketplacePartner.ts" `
$partnerType

# =====================================================
# MARKETPLACE SERVICE
# =====================================================

$marketplaceService = @'
import {
  addDoc,
  collection,
  getDocs,
} from "firebase/firestore";

import { db } from "@/lib/firebase/firebase";

export const MarketplaceService = {

  async installPlugin(
    data: any
  ) {

    return addDoc(
      collection(
        db,
        "marketplace_plugins"
      ),
      data
    );
  },

  async getPlugins() {

    const snapshot =
      await getDocs(
        collection(
          db,
          "marketplace_plugins"
        )
      );

    return snapshot.docs.map(
      (doc) => ({
        id: doc.id,
        ...doc.data(),
      })
    );
  },
};
'@

Set-Content `
"src\features\marketplace\services\MarketplaceService.ts" `
$marketplaceService

# =====================================================
# PLUGIN ENGINE
# =====================================================

$pluginEngine = @'
export const PluginEngine = {

  async execute(
    plugin: any,
    payload: any
  ) {

    console.log(
      "Executing plugin",
      plugin.nom
    );

    return {

      success: true,

      result:
        payload,
    };
  },
};
'@

Set-Content `
"src\features\marketplace\services\PluginEngine.ts" `
$pluginEngine

# =====================================================
# PARTNER API SERVICE
# =====================================================

$partnerApi = @'
export const PartnerAPIService = {

  async call(
    endpoint: string,
    payload: any
  ) {

    console.log(
      "Partner API call",
      endpoint
    );

    return {

      success: true,

      data: payload,
    };
  },
};
'@

Set-Content `
"src\features\marketplace\services\PartnerAPIService.ts" `
$partnerApi

# =====================================================
# PLUGIN CARD
# =====================================================

$pluginCard = @'
interface PluginCardProps {

  plugin: any;
}

export const PluginCard = ({
  plugin,
}: PluginCardProps) => {

  return (

    <div className="
      bg-white
      rounded-2xl
      shadow-md
      p-6
      border
    ">

      <div className="
        flex
        items-center
        justify-between
      ">

        <div>

          <p className="
            text-gray-500
          ">
            {plugin.categorie}
          </p>

          <h2 className="
            text-2xl
            font-bold
            mt-2
          ">
            {plugin.nom}
          </h2>

        </div>

        <div className="
          px-3
          py-1
          rounded-full
          bg-green-100
          text-green-700
          text-sm
        ">
          {plugin.version}
        </div>

      </div>

      <p className="
        text-gray-600
        mt-4
      ">
        {plugin.description}
      </p>

      <div className="
        mt-6
        flex
        items-center
        justify-between
      ">

        <p className="
          text-sm
          text-gray-500
        ">
          {plugin.auteur}
        </p>

        <button className="
          bg-black
          text-white
          px-4
          py-2
          rounded-xl
        ">
          Installer
        </button>

      </div>

    </div>
  );
}
'@

Set-Content `
"src\features\marketplace\components\PluginCard.tsx" `
$pluginCard

# =====================================================
# MARKETPLACE DASHBOARD
# =====================================================

$marketplaceDashboard = @'
"use client";

import { PluginCard } from "@/features/marketplace/components/PluginCard";

const plugins = [

  {
    id: "iot-pack",

    nom: "IoT Pack",

    description:
      "Connecteurs capteurs intelligents",

    version: "1.0.0",

    auteur: "Terragest Labs",

    categorie: "IoT",
  },

  {
    id: "ai-vision",

    nom: "AI Vision",

    description:
      "Analyse image terrain IA",

    version: "1.2.0",

    auteur: "Terragest AI",

    categorie: "AI",
  },

  {
    id: "erp-analytics",

    nom: "ERP Analytics",

    description:
      "Dashboard BI avancé",

    version: "2.0.0",

    auteur: "Terragest BI",

    categorie: "Analytics",
  },
];

export const MarketplaceDashboard = () => {

  return (

    <div className="
      space-y-8
    ">

      <div>

        <h2 className="
          text-4xl
          font-bold
        ">
          Marketplace
        </h2>

        <p className="
          text-gray-500
          mt-2
        ">
          Extensions & partenaires
        </p>

      </div>

      <div className="
        grid
        grid-cols-1
        md:grid-cols-2
        xl:grid-cols-3
        gap-6
      ">

        {plugins.map(
          (plugin) => (

            <PluginCard
              key={plugin.id}
              plugin={plugin}
            />

          )
        )}

      </div>

    </div>
  );
}
'@

Set-Content `
"src\features\marketplace\components\MarketplaceDashboard.tsx" `
$marketplaceDashboard

# =====================================================
# EXTENSION REGISTRY
# =====================================================

$registry = @'
export const ExtensionRegistry = {

  extensions: [

    "AI",

    "IoT",

    "Analytics",

    "Workflow",

    "GIS",

    "Mobile",
  ],

  register(
    extension: string
  ) {

    console.log(
      "Register extension",
      extension
    );
  },
};
'@

Set-Content `
"src\features\marketplace\services\ExtensionRegistry.ts" `
$registry

# =====================================================
# DONE
# =====================================================

Write-Host ""
Write-Host "Terragest Marketplace Ecosystem generated successfully." -ForegroundColor Green
Write-Host ""
Write-Host "Generated:" -ForegroundColor Yellow
Write-Host "- Marketplace modules"
Write-Host "- Plugin system"
Write-Host "- Partner APIs"
Write-Host "- Extension registry"
Write-Host "- SaaS ecosystem foundation"
Write-Host ""