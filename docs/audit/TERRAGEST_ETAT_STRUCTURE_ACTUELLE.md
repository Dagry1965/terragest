# TERRAGEST V2 - ETAT STRUCTURE ACTUELLE

Date export : 2026-05-13 08:32:52
Racine projet : C:\Users\Admin\terragest


## package.json

```text
{
  "name": "terragest",
  "version": "0.1.0",
  "private": true,
  "scripts": {
    "dev": "next dev",
    "build": "next build --webpack",
    "start": "next start",
    "lint": "eslint .",
    "typecheck": "tsc --noEmit",
    "test": "vitest",
    "test:run": "vitest run",
    "test:ui": "vitest --ui",
    "test:coverage": "vitest run --coverage",
    "test:e2e": "playwright test",
    "test:e2e:headed": "playwright test --headed",
    "test:e2e:debug": "playwright test --debug"
  },
  "dependencies": {
    "@hookform/resolvers": "^5.2.2",
    "@tanstack/react-query": "^5.100.9",
    "firebase": "^12.12.1",
    "jspdf": "^4.2.1",
    "jspdf-autotable": "^5.0.7",
    "lucide-react": "^1.14.0",
    "next": "16.2.4",
    "react": "19.2.4",
    "react-dom": "19.2.4",
    "react-hook-form": "^7.75.0",
    "react-hot-toast": "^2.6.0",
    "recharts": "^3.8.1",
    "stripe": "^22.1.0",
    "xlsx": "^0.18.5",
    "zod": "^4.4.3",
    "zustand": "^5.0.12"
  },
  "devDependencies": {
    "@playwright/test": "^1.59.1",
    "@tailwindcss/postcss": "^4.2.4",
    "@testing-library/jest-dom": "^6.9.1",
    "@testing-library/react": "^16.3.2",
    "@types/node": "^20",
    "@types/react": "^19",
    "@types/react-dom": "^19",
    "@vitest/coverage-v8": "4.1.5",
    "autoprefixer": "^10.5.0",
    "dotenv": "^17.4.2",
    "eslint": "^9",
    "eslint-config-next": "16.2.4",
    "jsdom": "^29.1.1",
    "postcss": "^8.5.13",
    "tailwindcss": "^4.2.4",
    "tsx": "^4.21.0",
    "typescript": "^5",
    "vitest": "^4.1.5"
  }
}
```

## tsconfig.json

```text
{
  "compilerOptions": {
    "target": "ES2017",

    "lib": [
      "dom",
      "dom.iterable",
      "esnext"
    ],

    "allowJs": true,

    "skipLibCheck": true,

    "strict": true,

    "noEmit": true,

    "esModuleInterop": true,

    "module": "esnext",

    "moduleResolution": "bundler",

    "resolveJsonModule": true,

    "isolatedModules": true,

    "jsx": "react-jsx",

    "incremental": true,

    "baseUrl": ".",

   "paths": {
  "@/*": [
    "src/*"
  ]
},

    "plugins": [
      {
        "name": "next"
      }
    ]
  },

  "include": [
    "next-env.d.ts",
    "**/*.ts",
    "**/*.tsx",
    ".next/types/**/*.ts",
    ".next/dev/types/**/*.ts"
  ],

 "exclude": [
  "node_modules",
  ".next",
  "out",
  "dist",
  "backups",
  "coverage",
  "reports",
  "scripts",
  "tests",
  "platform/tests",
  "src/_quarantine",
  "experimental",
  "experimental/**",
  "mobile",
  "mobile/**",
  "templates",
  "templates/**",
  "src/**/*.test.ts",
  "src/**/*.test.tsx",
  "jest.config.ts"
]
}
```

## next.config.ts

```text
const nextConfig = {

  reactStrictMode: true,

  turbopack: {},
};

export default nextConfig;
```

## tailwind.config.ts

Fichier introuvable : C:\Users\Admin\terragest\tailwind.config.ts

# Structure globale src

```text
Structure du dossier
Le numÚro de sÚrie du volume est A0A2-4E35
C:\USERS\ADMIN\TERRAGEST\SRC
ª   middleware.ts
ª   
+---analytics
ª   +---aggregation
ª   ª       AggregationService.ts
ª   ª       
ª   +---dashboards
ª   ª       KPICard.tsx
ª   ª       
ª   +---kpi
ª   ª       KPIEngine.ts
ª   ª       
ª   +---predictive
ª   ª       PredictiveEngine.ts
ª   ª       
ª   +---reporting
ª   ª       ReportingService.ts
ª   ª       
ª   +---repositories
ª   ª       AnalyticsRepository.ts
ª   ª       
ª   +---services
ª           AggregationService.ts
ª           
+---app
ª   ª   favicon.ico
ª   ª   globals.css
ª   ª   layout.tsx
ª   ª   page.tsx
ª   ª   
ª   +---(private)
ª   ª   ª   layout.tsx
ª   ª   ª   page.tsx
ª   ª   ª   
ª   ª   +---achats
ª   ª   ª   ª   page.tsx
ª   ª   ª   ª   
ª   ª   ª   +---nouveau
ª   ª   ª   ª       page.tsx
ª   ª   ª   ª       
ª   ª   ª   +---[id]
ª   ª   ª       ª   page.tsx
ª   ª   ª       ª   
ª   ª   ª       +---edit
ª   ª   ª               page.tsx
ª   ª   ª               
ª   ª   +---ai-runtime
ª   ª   ª       page.tsx
ª   ª   ª       
ª   ª   +---automation
ª   ª   ª       page.tsx
ª   ª   ª       
ª   ª   +---billing
ª   ª   ª       page.tsx
ª   ª   ª       
ª   ª   +---clients
ª   ª   ª   ª   page.tsx
ª   ª   ª   ª   
ª   ª   ª   +---nouveau
ª   ª   ª   ª       page.tsx
ª   ª   ª   ª       
ª   ª   ª   +---[id]
ª   ª   ª       ª   page.tsx
ª   ª   ª       ª   
ª   ª   ª       +---edit
ª   ª   ª               page.tsx
ª   ª   ª               
ª   ª   +---commandes
ª   ª   ª   ª   page.tsx
ª   ª   ª   ª   
ª   ª   ª   +---nouveau
ª   ª   ª   ª       page.tsx
ª   ª   ª   ª       
ª   ª   ª   +---[id]
ª   ª   ª       ª   page.tsx
ª   ª   ª       ª   
ª   ª   ª       +---edit
ª   ª   ª               page.tsx
ª   ª   ª               
ª   ª   +---compliance
ª   ª   ª       page.tsx
ª   ª   ª       
ª   ª   +---contrats
ª   ª   ª   ª   page.tsx
ª   ª   ª   ª   
ª   ª   ª   +---audit
ª   ª   ª   ª       page.tsx
ª   ª   ª   ª       
ª   ª   ª   +---export
ª   ª   ª   ª       page.tsx
ª   ª   ª   ª       
ª   ª   ª   +---import
ª   ª   ª   ª       page.tsx
ª   ª   ª   ª       
ª   ª   ª   +---nouveau
ª   ª   ª   ª       page.tsx
ª   ª   ª   ª       
ª   ª   ª   +---relations
ª   ª   ª   ª       page.tsx
ª   ª   ª   ª       
ª   ª   ª   +---workflows
ª   ª   ª   ª       page.tsx
ª   ª   ª   ª       
ª   ª   ª   +---[id]
ª   ª   ª       ª   page.tsx
ª   ª   ª       ª   
ª   ª   ª       +---edit
ª   ª   ª               page.tsx
ª   ª   ª               
ª   ª   +---dashboard
ª   ª   ª   ª   page.tsx
ª   ª   ª   ª   page.tsx.bak.dashboard-split
ª   ª   ª   ª   
ª   ª   ª   +---[dashboardKey]
ª   ª   ª           page.tsx
ª   ª   ª           
ª   ª   +---depenses
ª   ª   ª   ª   page.tsx
ª   ª   ª   ª   
ª   ª   ª   +---nouveau
ª   ª   ª   ª       page.tsx
ª   ª   ª   ª       
ª   ª   ª   +---[id]
ª   ª   ª       ª   page.tsx
ª   ª   ª       ª   
ª   ª   ª       +---edit
ª   ª   ª               page.tsx
ª   ª   ª               
ª   ª   +---devis
ª   ª   ª   ª   page.tsx
ª   ª   ª   ª   
ª   ª   ª   +---nouveau
ª   ª   ª   ª       page.tsx
ª   ª   ª   ª       
ª   ª   ª   +---[id]
ª   ª   ª       ª   page.tsx
ª   ª   ª       ª   
ª   ª   ª       +---edit
ª   ª   ª               page.tsx
ª   ª   ª               
ª   ª   +---employes
ª   ª   ª   ª   page.tsx
ª   ª   ª   ª   
ª   ª   ª   +---nouveau
ª   ª   ª   ª       page.tsx
ª   ª   ª   ª       
ª   ª   ª   +---[id]
ª   ª   ª       ª   page.tsx
ª   ª   ª       ª   
ª   ª   ª       +---edit
ª   ª   ª               page.tsx
ª   ª   ª               
ª   ª   +---exploitations
ª   ª   ª   ª   page.tsx
ª   ª   ª   ª   
ª   ª   ª   +---audit
ª   ª   ª   ª       page.tsx
ª   ª   ª   ª       
ª   ª   ª   +---details
ª   ª   ª   ª       page.tsx
ª   ª   ª   ª       
ª   ª   ª   +---export
ª   ª   ª   ª       page.tsx
ª   ª   ª   ª       
ª   ª   ª   +---import
ª   ª   ª   ª       page.tsx
ª   ª   ª   ª       
ª   ª   ª   +---nouveau
ª   ª   ª   ª       page.tsx
ª   ª   ª   ª       
ª   ª   ª   +---relations
ª   ª   ª   ª       page.tsx
ª   ª   ª   ª       
ª   ª   ª   +---workflows
ª   ª   ª   ª       page.tsx
ª   ª   ª   ª       
ª   ª   ª   +---[id]
ª   ª   ª       ª   page.tsx
ª   ª   ª       ª   
ª   ª   ª       +---edit
ª   ª   ª               page.tsx
ª   ª   ª               
ª   ª   +---factures
ª   ª   ª   ª   page.tsx
ª   ª   ª   ª   
ª   ª   ª   +---nouveau
ª   ª   ª   ª       page.tsx
ª   ª   ª   ª       
ª   ª   ª   +---[id]
ª   ª   ª       ª   page.tsx
ª   ª   ª       ª   
ª   ª   ª       +---edit
ª   ª   ª               page.tsx
ª   ª   ª               
ª   ª   +---fournisseurs
ª   ª   ª   ª   page.tsx
ª   ª   ª   ª   page.tsx.bak
ª   ª   ª   ª   
ª   ª   ª   +---nouveau
ª   ª   ª   ª       page.tsx
ª   ª   ª   ª       page.tsx.bak
ª   ª   ª   ª       
ª   ª   ª   +---[id]
ª   ª   ª       ª   page.tsx
ª   ª   ª       ª   page.tsx.bak
ª   ª   ª       ª   
ª   ª   ª       +---edit
ª   ª   ª               page.tsx
ª   ª   ª               page.tsx.bak
ª   ª   ª               
ª   ª   +---incidents
ª   ª   ª   ª   page.tsx
ª   ª   ª   ª   
ª   ª   ª   +---nouveau
ª   ª   ª   ª       page.tsx
ª   ª   ª   ª       
ª   ª   ª   +---[id]
ª   ª   ª       ª   page.tsx
ª   ª   ª       ª   
ª   ª   ª       +---edit
ª   ª   ª               page.tsx
ª   ª   ª               
ª   ª   +---interventions
ª   ª   ª   ª   page.tsx
ª   ª   ª   ª   
ª   ª   ª   +---audit
ª   ª   ª   ª       page.tsx
ª   ª   ª   ª       
ª   ª   ª   +---export
ª   ª   ª   ª       page.tsx
ª   ª   ª   ª       
ª   ª   ª   +---import
ª   ª   ª   ª       page.tsx
ª   ª   ª   ª       
ª   ª   ª   +---nouveau
ª   ª   ª   ª       page.tsx
ª   ª   ª   ª       
ª   ª   ª   +---relations
ª   ª   ª   ª       page.tsx
ª   ª   ª   ª       
ª   ª   ª   +---workflow
ª   ª   ª   ª       page.tsx
ª   ª   ª   ª       
ª   ª   ª   +---workflows
ª   ª   ª   ª       page.tsx
ª   ª   ª   ª       
ª   ª   ª   +---[id]
ª   ª   ª       ª   page.tsx
ª   ª   ª       ª   
ª   ª   ª       +---edit
ª   ª   ª               page.tsx
ª   ª   ª               
ª   ª   +---intrants
ª   ª   ª   ª   page.tsx
ª   ª   ª   ª   
ª   ª   ª   +---nouveau
ª   ª   ª   ª       page.tsx
ª   ª   ª   ª       
ª   ª   ª   +---[id]
ª   ª   ª       ª   page.tsx
ª   ª   ª       ª   
ª   ª   ª       +---edit
ª   ª   ª               page.tsx
ª   ª   ª               
ª   ª   +---livraisons
ª   ª   ª   ª   page.tsx
ª   ª   ª   ª   
ª   ª   ª   +---nouveau
ª   ª   ª   ª       page.tsx
ª   ª   ª   ª       
ª   ª   ª   +---[id]
ª   ª   ª       ª   page.tsx
ª   ª   ª       ª   
ª   ª   ª       +---edit
ª   ª   ª               page.tsx
ª   ª   ª               
ª   ª   +---maintenance
ª   ª   ª   ª   page.tsx
ª   ª   ª   ª   
ª   ª   ª   +---audit
ª   ª   ª   ª       page.tsx
ª   ª   ª   ª       
ª   ª   ª   +---export
ª   ª   ª   ª       page.tsx
ª   ª   ª   ª       
ª   ª   ª   +---import
ª   ª   ª   ª       page.tsx
ª   ª   ª   ª       
ª   ª   ª   +---nouveau
ª   ª   ª   ª       page.tsx
ª   ª   ª   ª       
ª   ª   ª   +---relations
ª   ª   ª   ª       page.tsx
ª   ª   ª   ª       
ª   ª   ª   +---workflows
ª   ª   ª   ª       page.tsx
ª   ª   ª   ª       
ª   ª   ª   +---[id]
ª   ª   ª       ª   page.tsx
ª   ª   ª       ª   
ª   ª   ª       +---edit
ª   ª   ª               page.tsx
ª   ª   ª               
ª   ª   +---materiels
ª   ª   ª   ª   page.tsx
ª   ª   ª   ª   page.tsx.bak
ª   ª   ª   ª   
ª   ª   ª   +---audit
ª   ª   ª   ª       page.tsx
ª   ª   ª   ª       
ª   ª   ª   +---export
ª   ª   ª   ª       page.tsx
ª   ª   ª   ª       
ª   ª   ª   +---import
ª   ª   ª   ª       page.tsx
ª   ª   ª   ª       
ª   ª   ª   +---nouveau
ª   ª   ª   ª       page.tsx
ª   ª   ª   ª       
ª   ª   ª   +---pannes
ª   ª   ª   ª   +---nouveau
ª   ª   ª   ª           page.tsx
ª   ª   ª   ª           
ª   ª   ª   +---relations
ª   ª   ª   ª       page.tsx
ª   ª   ª   ª       
ª   ª   ª   +---workflows
ª   ª   ª   ª       page.tsx
ª   ª   ª   ª       
ª   ª   ª   +---[id]
ª   ª   ª       ª   page.tsx
ª   ª   ª       ª   
ª   ª   ª       +---edit
ª   ª   ª               page.tsx
ª   ª   ª               
ª   ª   +---monitoring
ª   ª   ª       page.tsx
ª   ª   ª       
ª   ª   +---notifications
ª   ª   ª       page.tsx
ª   ª   ª       
ª   ª   +---observability
ª   ª   ª       page.tsx
ª   ª   ª       
ª   ª   +---offline
ª   ª   ª       page.tsx
ª   ª   ª       
ª   ª   +---operations
ª   ª   ª       page.tsx
ª   ª   ª       
ª   ª   +---organization-analytics
ª   ª   ª       page.tsx
ª   ª   ª       
ª   ª   +---paiements
ª   ª   ª   ª   page.tsx
ª   ª   ª   ª   
ª   ª   ª   +---audit
ª   ª   ª   ª       page.tsx
ª   ª   ª   ª       
ª   ª   ª   +---export
ª   ª   ª   ª       page.tsx
ª   ª   ª   ª       
ª   ª   ª   +---import
ª   ª   ª   ª       page.tsx
ª   ª   ª   ª       
ª   ª   ª   +---nouveau
ª   ª   ª   ª       page.tsx
ª   ª   ª   ª       
ª   ª   ª   +---relations
ª   ª   ª   ª       page.tsx
ª   ª   ª   ª       
ª   ª   ª   +---workflows
ª   ª   ª   ª       page.tsx
ª   ª   ª   ª       
ª   ª   ª   +---[id]
ª   ª   ª       ª   page.tsx
ª   ª   ª       ª   
ª   ª   ª       +---edit
ª   ª   ª               page.tsx
ª   ª   ª               
ª   ª   +---parcelles
ª   ª   ª   ª   page.tsx
ª   ª   ª   ª   
ª   ª   ª   +---nouveau
ª   ª   ª   ª       page.tsx
ª   ª   ª   ª       
ª   ª   ª   +---[id]
ª   ª   ª       ª   page.tsx
ª   ª   ª       ª   
ª   ª   ª       +---edit
ª   ª   ª               page.tsx
ª   ª   ª               
ª   ª   +---persistence
ª   ª   ª       page.tsx
ª   ª   ª       
ª   ª   +---platform
ª   ª   ª       page.tsx
ª   ª   ª       
ª   ª   +---production
ª   ª   ª       page.tsx
ª   ª   ª       
ª   ª   +---produits
ª   ª   ª   ª   page.tsx
ª   ª   ª   ª   
ª   ª   ª   +---audit
ª   ª   ª   ª       page.tsx
ª   ª   ª   ª       
ª   ª   ª   +---export
ª   ª   ª   ª       page.tsx
ª   ª   ª   ª       
ª   ª   ª   +---import
ª   ª   ª   ª       page.tsx
ª   ª   ª   ª       
ª   ª   ª   +---nouveau
ª   ª   ª   ª       page.tsx
ª   ª   ª   ª       
ª   ª   ª   +---relations
ª   ª   ª   ª       page.tsx
ª   ª   ª   ª       
ª   ª   ª   +---workflows
ª   ª   ª   ª       page.tsx
ª   ª   ª   ª       
ª   ª   ª   +---[id]
ª   ª   ª       ª   page.tsx
ª   ª   ª       ª   
ª   ª   ª       +---edit
ª   ª   ª               page.tsx
ª   ª   ª               
ª   ª   +---pwa
ª   ª   ª       page.tsx
ª   ª   ª       
ª   ª   +---realtime
ª   ª   ª       page.tsx
ª   ª   ª       
ª   ª   +---recettes
ª   ª   ª   ª   page.tsx
ª   ª   ª   ª   
ª   ª   ª   +---nouveau
ª   ª   ª   ª       page.tsx
ª   ª   ª   ª       
ª   ª   ª   +---[id]
ª   ª   ª       ª   page.tsx
ª   ª   ª       ª   
ª   ª   ª       +---edit
ª   ª   ª               page.tsx
ª   ª   ª               
ª   ª   +---recoltes
ª   ª   ª   ª   page.tsx
ª   ª   ª   ª   
ª   ª   ª   +---nouveau
ª   ª   ª   ª       page.tsx
ª   ª   ª   ª       
ª   ª   ª   +---[id]
ª   ª   ª       ª   page.tsx
ª   ª   ª       ª   
ª   ª   ª       +---edit
ª   ª   ª               page.tsx
ª   ª   ª               
ª   ª   +---resilience
ª   ª   ª       page.tsx
ª   ª   ª       
ª   ª   +---runtime
ª   ª   ª   +---[module]
ª   ª   ª           page.tsx
ª   ª   ª           
ª   ª   +---runtime-cockpit
ª   ª   ª       page.tsx
ª   ª   ª       
ª   ª   +---runtime-registry
ª   ª   ª       page.tsx
ª   ª   ª       
ª   ª   +---runtime-supervision
ª   ª   ª       page.tsx
ª   ª   ª       
ª   ª   +---security
ª   ª   ª       page.tsx
ª   ª   ª       
ª   ª   +---stocks
ª   ª   ª   ª   page.tsx
ª   ª   ª   ª   
ª   ª   ª   +---audit
ª   ª   ª   ª       page.tsx
ª   ª   ª   ª       
ª   ª   ª   +---export
ª   ª   ª   ª       page.tsx
ª   ª   ª   ª       
ª   ª   ª   +---import
ª   ª   ª   ª       page.tsx
ª   ª   ª   ª       
ª   ª   ª   +---new
ª   ª   ª   ª       page.tsx
ª   ª   ª   ª       
ª   ª   ª   +---nouveau
ª   ª   ª   ª       page.tsx
ª   ª   ª   ª       
ª   ª   ª   +---relations
ª   ª   ª   ª       page.tsx
ª   ª   ª   ª       
ª   ª   ª   +---workflows
ª   ª   ª   ª       page.tsx
ª   ª   ª   ª       
ª   ª   ª   +---[id]
ª   ª   ª       ª   page.tsx
ª   ª   ª       ª   
ª   ª   ª       +---edit
ª   ª   ª               page.tsx
ª   ª   ª               
ª   ª   +---streams
ª   ª   ª       page.tsx
ª   ª   ª       
ª   ª   +---supervision
ª   ª   ª       page.tsx
ª   ª   ª       page.tsx.bak.dashboard-split
ª   ª   ª       
ª   ª   +---taches
ª   ª   ª   ª   page.tsx
ª   ª   ª   ª   
ª   ª   ª   +---nouveau
ª   ª   ª   ª       page.tsx
ª   ª   ª   ª       
ª   ª   ª   +---[id]
ª   ª   ª       ª   page.tsx
ª   ª   ª       ª   
ª   ª   ª       +---edit
ª   ª   ª               page.tsx
ª   ª   ª               
ª   ª   +---team
ª   ª   ª       page.tsx
ª   ª   ª       
ª   ª   +---tenants
ª   ª   ª       page.tsx
ª   ª   ª       
ª   ª   +---terrains
ª   ª   ª   ª   page.tsx
ª   ª   ª   ª   
ª   ª   ª   +---audit
ª   ª   ª   ª       page.tsx
ª   ª   ª   ª       
ª   ª   ª   +---export
ª   ª   ª   ª       page.tsx
ª   ª   ª   ª       
ª   ª   ª   +---import
ª   ª   ª   ª       page.tsx
ª   ª   ª   ª       
ª   ª   ª   +---nouveau
ª   ª   ª   ª       page.tsx
ª   ª   ª   ª       
ª   ª   ª   +---relations
ª   ª   ª   ª       page.tsx
ª   ª   ª   ª       
ª   ª   ª   +---workflows
ª   ª   ª   ª       page.tsx
ª   ª   ª   ª       
ª   ª   ª   +---[id]
ª   ª   ª       ª   page.tsx
ª   ª   ª       ª   
ª   ª   ª       +---edit
ª   ª   ª               page.tsx
ª   ª   ª               
ª   ª   +---testing
ª   ª   ª       page.tsx
ª   ª   ª       
ª   ª   +---vehicules
ª   ª   ª   ª   page.tsx
ª   ª   ª   ª   
ª   ª   ª   +---nouveau
ª   ª   ª   ª       page.tsx
ª   ª   ª   ª       
ª   ª   ª   +---[id]
ª   ª   ª       ª   page.tsx
ª   ª   ª       ª   
ª   ª   ª       +---edit
ª   ª   ª               page.tsx
ª   ª   ª               
ª   ª   +---workers
ª   ª   ª       page.tsx
ª   ª   ª       
ª   ª   +---workflows-runtime
ª   ª           page.tsx
ª   ª           
ª   +---api
ª   ª   +---health
ª   ª   ª       route.ts
ª   ª   ª       
ª   ª   +---platform
ª   ª   ª   +---status
ª   ª   ª           route.ts
ª   ª   ª           
ª   ª   +---stripe
ª   ª       +---checkout
ª   ª       ª       route.ts
ª   ª       ª       
ª   ª       +---webhook
ª   ª               route.ts
ª   ª               
ª   +---billing
ª   ª   +---success
ª   ª           page.tsx
ª   ª           
ª   +---enterprise
ª   ª       page.tsx
ª   ª       
ª   +---invitations
ª   ª   +---accept
ª   ª       +---[token]
ª   ª               page.tsx
ª   ª               
ª   +---login
ª           page.tsx
ª           
+---components
ª   +---auth
ª   ª       PrivateGuard.tsx
ª   ª       
ª   +---bootstrap
ª   ª       RuntimeBootstrapProvider.tsx
ª   ª       
ª   +---contrats
ª   ª       ContratsForm.tsx
ª   ª       
ª   +---crud
ª   ª       ConfirmDialog.tsx
ª   ª       DataTable.tsx
ª   ª       EmptyState.tsx
ª   ª       EntityForm.tsx
ª   ª       PageHeader.tsx
ª   ª       SearchBar.tsx
ª   ª       
ª   +---dashboard
ª   ª       ActivityFeed.tsx
ª   ª       AlertsPanel.tsx
ª   ª       DashboardAnalytics.tsx
ª   ª       KPICard.tsx
ª   ª       RealtimeActivityFeed.tsx
ª   ª       RealtimeKpiCard.tsx
ª   ª       RecentActivities.tsx
ª   ª       
ª   +---data-table
ª   ª       DataTable.tsx
ª   ª       
ª   +---dialogs
ª   ª       ConfirmDialog.tsx
ª   ª       DeleteButton.tsx
ª   ª       
ª   +---erp
ª   ª   +---actions
ª   ª   ª       ERPActionButton.tsx
ª   ª   ª       ERPActionToolbar.tsx
ª   ª   ª       ERPRowActions.tsx
ª   ª   ª       index.ts
ª   ª   ª       
ª   ª   +---activity
ª   ª   ª       ERPActivityFeed.tsx
ª   ª   ª       
ª   ª   +---ai
ª   ª   ª       ERPAIAnomaliesPanel.tsx
ª   ª   ª       ERPAIDashboard.tsx
ª   ª   ª       ERPAIInsights.tsx
ª   ª   ª       ERPAIInsightsPanel.tsx
ª   ª   ª       ERPAIMetricsGrid.tsx
ª   ª   ª       ERPAIRecommendationsPanel.tsx
ª   ª   ª       ERPAISearchPanel.tsx
ª   ª   ª       index.ts
ª   ª   ª       
ª   ª   +---analytics
ª   ª   ª       ERPAnalyticsCard.tsx
ª   ª   ª       
ª   ª   +---audit
ª   ª   ª       ERPAuditTrail.tsx
ª   ª   ª       
ª   ª   +---automation
ª   ª   ª       ERPAutomationCard.tsx
ª   ª   ª       ERPAutomationTimeline.tsx
ª   ª   ª       ERPAutomationTimelinePanel.tsx
ª   ª   ª       ERPNotificationsPanel.tsx
ª   ª   ª       ERPRuntimeAutomationDashboard.tsx
ª   ª   ª       index.ts
ª   ª   ª       
ª   ª   +---automation-runtime
ª   ª   ª       ERPAutomationRuntimePanel.tsx
ª   ª   ª       index.ts
ª   ª   ª       
ª   ª   +---badges
ª   ª   ª       ERPHealthBadge.tsx
ª   ª   ª       
ª   ª   +---charts
ª   ª   ª       ERPTrendCard.tsx
ª   ª   ª       
ª   ª   +---cockpit
ª   ª   ª       ERPCockpitHealthPanel.tsx
ª   ª   ª       ERPCockpitMetricGrid.tsx
ª   ª   ª       ERPCockpitModuleMatrix.tsx
ª   ª   ª       ERPCockpitStreamsPanel.tsx
ª   ª   ª       ERPRuntimeCockpit.tsx
ª   ª   ª       ERPRuntimeCockpitDashboard.tsx
ª   ª   ª       index.ts
ª   ª   ª       
ª   ª   +---command-center
ª   ª   ª       ERPCommandCenter.tsx
ª   ª   ª       
ª   ª   +---dashboard
ª   ª   ª   ª   ErpDashboard.tsx
ª   ª   ª   ª   ERPDashboardActivityFeed.tsx
ª   ª   ª   ª   ERPDashboardMetrics.tsx
ª   ª   ª   ª   ERPDashboardPanel.tsx
ª   ª   ª   ª   ERPDashboardQuickActions.tsx
ª   ª   ª   ª   ERPDashboardSection.tsx
ª   ª   ª   ª   index.ts
ª   ª   ª   ª   
ª   ª   ª   +---business
ª   ª   ª   ª   ª   ERPBusinessDashboard.tsx
ª   ª   ª   ª   ª   
ª   ª   ª   ª   +---widgets
ª   ª   ª   ª           ERPAlertPanel.tsx
ª   ª   ª   ª           ERPKPICard.tsx
ª   ª   ª   ª           
ª   ª   ª   +---generic
ª   ª   ª   ª   ª   ERPDashboardRenderer.tsx
ª   ª   ª   ª   ª   registerDashboardWidgets.ts
ª   ª   ª   ª   ª   
ª   ª   ª   ª   +---registry
ª   ª   ª   ª   ª       ERPDashboardWidgetRegistry.ts
ª   ª   ª   ª   ª       
ª   ª   ª   ª   +---widgets
ª   ª   ª   ª           ERPKPIWidget.tsx
ª   ª   ª   ª           ERPListWidget.tsx
ª   ª   ª   ª           
ª   ª   ª   +---technical
ª   ª   ª           ERPTechnicalDashboard.tsx
ª   ª   ª           
ª   ª   +---datatable
ª   ª   ª       ERPDataTable.tsx
ª   ª   ª       ERPTable.tsx
ª   ª   ª       index.ts
ª   ª   ª       
ª   ª   +---design-system
ª   ª   ª       erp-theme-tokens.ts
ª   ª   ª       
ª   ª   +---details
ª   ª   ª       EntityDetailsLayout.tsx
ª   ª   ª       
ª   ª   +---enterprise-runtime
ª   ª   ª       EnterpriseRuntimeConsolidationPanel.tsx
ª   ª   ª       EnterpriseRuntimeDiagnosticsPanel.tsx
ª   ª   ª       EnterpriseRuntimeGovernancePanel.tsx
ª   ª   ª       EnterpriseRuntimeLifecyclePanel.tsx
ª   ª   ª       EnterpriseRuntimePerformancePanel.tsx
ª   ª   ª       index.ts
ª   ª   ª       
ª   ª   +---errors
ª   ª   ª       ERPErrorBoundary.tsx
ª   ª   ª       
ª   ª   +---event-runtime
ª   ª   ª       ERPEventRuntimePanel.tsx
ª   ª   ª       index.ts
ª   ª   ª       
ª   ª   +---executive-dashboard
ª   ª   ª       ERPExecutiveDashboard.tsx
ª   ª   ª       
ª   ª   +---filters
ª   ª   ª       ERPFilterBar.tsx
ª   ª   ª       
ª   ª   +---finance
ª   ª   ª       ERPFinancialOverview.tsx
ª   ª   ª       
ª   ª   +---firestore
ª   ª   ª       ERPFirestoreSync.tsx
ª   ª   ª       
ª   ª   +---forms
ª   ª   ª   ª   ERPButton.tsx
ª   ª   ª   ª   ERPDynamicForm.tsx
ª   ª   ª   ª   ERPFormRenderer.tsx
ª   ª   ª   ª   ERPFormSection.tsx
ª   ª   ª   ª   ERPInput.tsx
ª   ª   ª   ª   index.ts
ª   ª   ª   ª   
ª   ª   ª   +---enterprise
ª   ª   ª           ERPEnterpriseForm.tsx
ª   ª   ª           ERPFormActions.tsx
ª   ª   ª           ERPFormField.tsx
ª   ª   ª           ERPFormSection.tsx
ª   ª   ª           ERPFormSummaryPanel.tsx
ª   ª   ª           ERPFormTabs.tsx
ª   ª   ª           index.ts
ª   ª   ª           
ª   ª   +---generic
ª   ª   ª       GenericCreatePage.tsx
ª   ª   ª       GenericDetailPage.tsx
ª   ª   ª       GenericEditPage.tsx
ª   ª   ª       GenericListPage.tsx
ª   ª   ª       
ª   ª   +---kpi
ª   ª   ª       ERPKPIGrid.tsx
ª   ª   ª       
ª   ª   +---layout
ª   ª   ª       ERPActionBar.tsx
ª   ª   ª       ERPAppShell.tsx
ª   ª   ª       ERPCockpitLayout.tsx
ª   ª   ª       ERPCommandPanel.tsx
ª   ª   ª       ERPContentArea.tsx
ª   ª   ª       ERPContentGrid.tsx
ª   ª   ª       ERPDashboardLayout.tsx
ª   ª   ª       ERPKpiGrid.tsx
ª   ª   ª       ERPPageHero.tsx
ª   ª   ª       ERPQuickFilters.tsx
ª   ª   ª       ERPRuntimeHealthPanel.tsx
ª   ª   ª       ERPSidebarSection.tsx
ª   ª   ª       ERPTabNavigation.tsx
ª   ª   ª       ERPTopBar.tsx
ª   ª   ª       index.ts
ª   ª   ª       
ª   ª   +---lists
ª   ª   ª       ERPDataList.tsx
ª   ª   ª       
ª   ª   +---live
ª   ª   ª       ERPLiveEvents.tsx
ª   ª   ª       
ª   ª   +---live-operational
ª   ª   ª       ERPLiveOperationalPanel.tsx
ª   ª   ª       index.ts
ª   ª   ª       
ª   ª   +---modules
ª   ª   ª       ERPModuleEnterprisePage.tsx
ª   ª   ª       ERPModulePageShell.tsx
ª   ª   ª       ERPModulePlaceholder.tsx
ª   ª   ª       index.ts
ª   ª   ª       
ª   ª   +---monitoring
ª   ª   ª       ERPErrorAnalyticsPanel.tsx
ª   ª   ª       ERPHealthPanel.tsx
ª   ª   ª       ERPMonitoringDashboard.tsx
ª   ª   ª       ERPMonitoringMetricsGrid.tsx
ª   ª   ª       ERPSystemHealth.tsx
ª   ª   ª       ERPTopologyPanel.tsx
ª   ª   ª       index.ts
ª   ª   ª       
ª   ª   +---navigation
ª   ª   ª       ERPActionButton.tsx
ª   ª   ª       ERPActionToolbar.tsx
ª   ª   ª       ERPBreadcrumbs.tsx
ª   ª   ª       ERPModuleCard.tsx
ª   ª   ª       
ª   ª   +---notifications
ª   ª   ª       ERPNotificationCard.tsx
ª   ª   ª       
ª   ª   +---observability
ª   ª   ª       ERPAlertsPanel.tsx
ª   ª   ª       ERPEventsTimeline.tsx
ª   ª   ª       ERPObservabilityCenter.tsx
ª   ª   ª       ERPRuntimeObservabilityDashboard.tsx
ª   ª   ª       ERPTracesPanel.tsx
ª   ª   ª       index.ts
ª   ª   ª       
ª   ª   +---os
ª   ª   ª       ERPCommandPalette.tsx
ª   ª   ª       ERPEnterpriseOSPanel.tsx
ª   ª   ª       ERPNotificationCenter.tsx
ª   ª   ª       ERPSavedViewsPanel.tsx
ª   ª   ª       ERPWorkspaceSwitcher.tsx
ª   ª   ª       index.ts
ª   ª   ª       
ª   ª   +---page
ª   ª   ª       ERPEmptyState.tsx
ª   ª   ª       ERPMetricCard.tsx
ª   ª   ª       ERPPage.tsx
ª   ª   ª       ERPQuickAction.tsx
ª   ª   ª       ERPSection.tsx
ª   ª   ª       ERPStatCard.tsx
ª   ª   ª       ERPStatusBadge.tsx
ª   ª   ª       ERPWidgetCard.tsx
ª   ª   ª       
ª   ª   +---panels
ª   ª   ª       ERPInfoPanel.tsx
ª   ª   ª       
ª   ª   +---persistence
ª   ª   ª       ERPPersistenceDashboard.tsx
ª   ª   ª       index.ts
ª   ª   ª       
ª   ª   +---production
ª   ª   ª       ERPProductionCloudPanel.tsx
ª   ª   ª       ERPProductionDashboard.tsx
ª   ª   ª       ERPProductionMetricsGrid.tsx
ª   ª   ª       ERPProductionPoliciesPanel.tsx
ª   ª   ª       ERPProductionQuotasPanel.tsx
ª   ª   ª       index.ts
ª   ª   ª       ProductionHardeningPanel.tsx
ª   ª   ª       ProductionLogsPanel.tsx
ª   ª   ª       ProductionReadinessPanel.tsx
ª   ª   ª       readiness.ts
ª   ª   ª       RuntimeHealthPanel.tsx
ª   ª   ª       
ª   ª   +---realtime
ª   ª   ª       ERPRealtimeFeed.tsx
ª   ª   ª       ERPRealtimeMetrics.tsx
ª   ª   ª       ERPRealtimePresencePanel.tsx
ª   ª   ª       ERPRealtimeSyncBadge.tsx
ª   ª   ª       ERPRuntimeRealtimeDashboard.tsx
ª   ª   ª       index.ts
ª   ª   ª       
ª   ª   +---relation-graph
ª   ª   ª       ERPRelationGraph.tsx
ª   ª   ª       
ª   ª   +---relations
ª   ª   ª       ERPRelationField.tsx
ª   ª   ª       ERPRelationsGraph.tsx
ª   ª   ª       index.ts
ª   ª   ª       
ª   ª   +---resilience
ª   ª   ª       ERPDLQPanel.tsx
ª   ª   ª       ERPQueuePanel.tsx
ª   ª   ª       ERPResilienceMetrics.tsx
ª   ª   ª       ERPRuntimeResilienceDashboard.tsx
ª   ª   ª       index.ts
ª   ª   ª       
ª   ª   +---runtime
ª   ª   ª       ERPRuntimeAlertsPanel.tsx
ª   ª   ª       ERPRuntimeDeadLetterPanel.tsx
ª   ª   ª       ERPRuntimeDetails.tsx
ª   ª   ª       ERPRuntimeFieldValue.tsx
ª   ª   ª       ERPRuntimeForm.tsx
ª   ª   ª       ERPRuntimeMetricsPanel.tsx
ª   ª   ª       ERPRuntimeOverviewPage.tsx
ª   ª   ª       ERPRuntimePage.tsx
ª   ª   ª       ERPRuntimeQueuesPanel.tsx
ª   ª   ª       ERPRuntimeRetryPanel.tsx
ª   ª   ª       ERPRuntimeStatus.tsx
ª   ª   ª       ERPRuntimeStatusPanel.tsx
ª   ª   ª       ERPRuntimeTable.tsx
ª   ª   ª       ERPRuntimeWorkersPanel.tsx
ª   ª   ª       index.ts
ª   ª   ª       
ª   ª   +---runtime-timeline
ª   ª   ª       ERPRuntimeTimeline.tsx
ª   ª   ª       
ª   ª   +---runtime-ui
ª   ª   ª       ERPDataTableRuntime.tsx
ª   ª   ª       ERPRuntimeModulePage.tsx
ª   ª   ª       ERPRuntimeRegistryDashboard.tsx
ª   ª   ª       index.ts
ª   ª   ª       
ª   ª   +---security
ª   ª   ª       ERPPoliciesPanel.tsx
ª   ª   ª       ERPRolesPanel.tsx
ª   ª   ª       ERPSecurityAuditPanel.tsx
ª   ª   ª       ERPSecurityDashboard.tsx
ª   ª   ª       ERPSecurityMetrics.tsx
ª   ª   ª       ERPSecurityPanel.tsx
ª   ª   ª       index.ts
ª   ª   ª       
ª   ª   +---security-runtime
ª   ª   ª       ERPProtectedAction.tsx
ª   ª   ª       ERPRuntimeSecurityBadge.tsx
ª   ª   ª       ERPSecurityContextPanel.tsx
ª   ª   ª       index.ts
ª   ª   ª       
ª   ª   +---shell
ª   ª   ª       ErpShell.tsx
ª   ª   ª       ErpSidebar.tsx
ª   ª   ª       ErpTopbar.tsx
ª   ª   ª       
ª   ª   +---smart-intelligence
ª   ª   ª       index.ts
ª   ª   ª       SmartAnomaliesPanel.tsx
ª   ª   ª       SmartOperationalIntelligencePanel.tsx
ª   ª   ª       SmartPredictionsPanel.tsx
ª   ª   ª       SmartRecommendationsPanel.tsx
ª   ª   ª       SmartRiskBadge.tsx
ª   ª   ª       SmartScorePanel.tsx
ª   ª   ª       
ª   ª   +---smart-runtime
ª   ª   ª       ERPSmartInsightsPanel.tsx
ª   ª   ª       ERPSmartPriorityPanel.tsx
ª   ª   ª       ERPSmartRecommendationsPanel.tsx
ª   ª   ª       ERPSmartRuntimePanel.tsx
ª   ª   ª       index.ts
ª   ª   ª       
ª   ª   +---stats
ª   ª   ª       ERPStatTile.tsx
ª   ª   ª       
ª   ª   +---streams
ª   ª   ª       ERPStreamsChannelsPanel.tsx
ª   ª   ª       ERPStreamsDashboard.tsx
ª   ª   ª       ERPStreamsMetricsGrid.tsx
ª   ª   ª       ERPStreamsTimelinePanel.tsx
ª   ª   ª       index.ts
ª   ª   ª       
ª   ª   +---templates
ª   ª   ª       ERPModuleActionPageTemplate.tsx
ª   ª   ª       ERPModuleActivityPanel.tsx
ª   ª   ª       ERPModuleDashboardTemplate.tsx
ª   ª   ª       ERPModuleHeader.tsx
ª   ª   ª       ERPModuleKpiGrid.tsx
ª   ª   ª       ERPModuleListTemplate.tsx
ª   ª   ª       ERPModuleTabs.tsx
ª   ª   ª       ERPModuleToolbar.tsx
ª   ª   ª       ERPModuleWorkflowPanel.tsx
ª   ª   ª       ERPPageTemplateRegistry.tsx
ª   ª   ª       index.ts
ª   ª   ª       
ª   ª   +---tenant
ª   ª   ª       ERPTenantDashboard.tsx
ª   ª   ª       ERPTenantMetricsGrid.tsx
ª   ª   ª       ERPTenantMetricsPanel.tsx
ª   ª   ª       ERPTenantRegistryPanel.tsx
ª   ª   ª       index.ts
ª   ª   ª       
ª   ª   +---testing
ª   ª   ª       ERPTestingDashboard.tsx
ª   ª   ª       ERPTestingHistoryPanel.tsx
ª   ª   ª       ERPTestingMetricsGrid.tsx
ª   ª   ª       ERPTestingRegistryPanel.tsx
ª   ª   ª       index.ts
ª   ª   ª       
ª   ª   +---theme
ª   ª   ª       ERPCard.tsx
ª   ª   ª       ERPSeverityBadge.tsx
ª   ª   ª       ERPStatusBadge.tsx
ª   ª   ª       ERPTable.tsx
ª   ª   ª       ERPTheme.ts
ª   ª   ª       ERPThemeProvider.tsx
ª   ª   ª       tokens.ts
ª   ª   ª       
ª   ª   +---timeline
ª   ª   ª       ERPEventTimeline.tsx
ª   ª   ª       
ª   ª   +---ui
ª   ª   ª   ª   ERPBadge.tsx
ª   ª   ª   ª   ERPButton.tsx
ª   ª   ª   ª   ERPCard.tsx
ª   ª   ª   ª   ERPChartCard.tsx
ª   ª   ª   ª   ERPDataList.tsx
ª   ª   ª   ª   ERPDrawer.tsx
ª   ª   ª   ª   ERPEmptyState.tsx
ª   ª   ª   ª   ERPGrid.tsx
ª   ª   ª   ª   ERPInput.tsx
ª   ª   ª   ª   ERPMetricCard.tsx
ª   ª   ª   ª   ERPModal.tsx
ª   ª   ª   ª   ERPModuleIcon.tsx
ª   ª   ª   ª   ERPPage.tsx
ª   ª   ª   ª   ERPPageHeader.tsx
ª   ª   ª   ª   ERPPanel.tsx
ª   ª   ª   ª   ERPSection.tsx
ª   ª   ª   ª   ERPSelect.tsx
ª   ª   ª   ª   ERPSkeleton.tsx
ª   ª   ª   ª   ERPStack.tsx
ª   ª   ª   ª   ERPStatCard.tsx
ª   ª   ª   ª   ERPTable.tsx
ª   ª   ª   ª   ERPTabs.tsx
ª   ª   ª   ª   ERPTheme.ts
ª   ª   ª   ª   ERPToast.tsx
ª   ª   ª   ª   ERPToolbar.tsx
ª   ª   ª   ª   index.ts
ª   ª   ª   ª   
ª   ª   ª   +---table
ª   ª   ª           ERPTable.tsx
ª   ª   ª           index.ts
ª   ª   ª           
ª   ª   +---workers
ª   ª   ª       ERPSchedulerPanel.tsx
ª   ª   ª       ERPWorkerHistoryPanel.tsx
ª   ª   ª       ERPWorkerQueue.tsx
ª   ª   ª       ERPWorkersDashboard.tsx
ª   ª   ª       ERPWorkersMetricsGrid.tsx
ª   ª   ª       ERPWorkersRegistryPanel.tsx
ª   ª   ª       index.ts
ª   ª   ª       
ª   ª   +---workflow
ª   ª   ª       ERPWorkflowBoard.tsx
ª   ª   ª       ERPWorkflowStep.tsx
ª   ª   ª       WorkflowActions.tsx
ª   ª   ª       
ª   ª   +---workflow-designer
ª   ª   ª       ERPWorkflowDesigner.tsx
ª   ª   ª       
ª   ª   +---workflow-editor
ª   ª   ª       ERPVisualWorkflowEditor.tsx
ª   ª   ª       
ª   ª   +---workflow-runtime
ª   ª   ª       ERPWorkflowRuntimePanel.tsx
ª   ª   ª       index.ts
ª   ª   ª       
ª   ª   +---workflows
ª   ª   ª       ERPRuntimeWorkflowDashboard.tsx
ª   ª   ª       ERPWorkflowDefinitionsPanel.tsx
ª   ª   ª       ERPWorkflowExecutionsPanel.tsx
ª   ª   ª       ERPWorkflowMetricGrid.tsx
ª   ª   ª       ERPWorkflowTimelinePanel.tsx
ª   ª   ª       index.ts
ª   ª   ª       
ª   ª   +---workspace
ª   ª           ERPWorkspaceActivity.tsx
ª   ª           ERPWorkspaceCommandCenter.tsx
ª   ª           ERPWorkspaceContextPanel.tsx
ª   ª           ERPWorkspaceLayout.tsx
ª   ª           ERPWorkspaceQuickActions.tsx
ª   ª           ERPWorkspaceTabs.tsx
ª   ª           index.ts
ª   ª           
ª   +---form
ª   ª       FormField.tsx
ª   ª       SelectField.tsx
ª   ª       TextAreaField.tsx
ª   ª       
ª   +---interventions
ª   ª       InterventionsForm.tsx
ª   ª       
ª   +---layout
ª   ª       ERPLayout.tsx
ª   ª       
ª   +---maintenance
ª   ª       MaintenanceForm.tsx
ª   ª       
ª   +---materiels
ª   ª   ª   MaterielsForm.tsx
ª   ª   ª   
ª   ª   +---details
ª   ª           MaterielDetails.tsx
ª   ª           
ª   +---notifications
ª   ª       NotificationCenter.tsx
ª   ª       
ª   +---operations
ª   ª       OperationsMetrics.tsx
ª   ª       OperationsTimeline.tsx
ª   ª       
ª   +---shell
ª   ª       EnterpriseAppShell.tsx
ª   ª       
ª   +---sidebar
ª   ª       AppSidebar.tsx
ª   ª       
ª   +---stock
ª   ª   ª   StockForm.tsx
ª   ª   ª   
ª   ª   +---details
ª   ª           StockDetails.tsx
ª   ª           
ª   +---timeline
ª   ª       Timeline.tsx
ª   ª       Timeline.tsx.bak
ª   ª       
ª   +---topbar
ª   ª       AppTopbar.tsx
ª   ª       
ª   +---ui
ª   ª       Button.tsx
ª   ª       Card.tsx
ª   ª       DataTable.tsx
ª   ª       EmptyState.tsx
ª   ª       EnterpriseForm.tsx
ª   ª       Input.tsx
ª   ª       KPICard.tsx
ª   ª       ProductRealtimeForm.tsx
ª   ª       SkeletonCard.tsx
ª   ª       Table.tsx
ª   ª       
ª   +---workflow
ª           WorkflowStatus.tsx
ª           
+---constants
ª       collections.ts
ª       routes.ts
ª       
+---contexts
ª       AuthContext.tsx
ª       
+---core
ª   +---actions
ª   ª       erp-action-engine.ts
ª   ª       
ª   +---audit
ª   ª       audit-service.ts
ª   ª       
ª   +---auth
ª   ª       auth-enterprise-layer.ts
ª   ª       
ª   +---automation
ª   ª   ª   automation-engine.ts
ª   ª   ª   
ª   ª   +---registry
ª   ª           automation-registry.ts
ª   ª           
ª   +---bootstrap
ª   ª       runtime-bootstrap.ts
ª   ª       
ª   +---circuit-breaker
ª   ª       circuit-breaker-engine.ts
ª   ª       
ª   +---collaboration
ª   ª       collaborative-runtime.ts
ª   ª       
ª   +---config
ª   ª       env.ts
ª   ª       
ª   +---constants
ª   ª       app.constants.ts
ª   ª       
ª   +---dead-letter
ª   ª       dead-letter-queue.ts
ª   ª       
ª   +---dto
ª   ª       BaseDTO.ts
ª   ª       
ª   +---errors
ª   ª       AppError.ts
ª   ª       BaseError.ts
ª   ª       
ª   +---event-bus
ª   ª       event-bus.ts
ª   ª       register-event-subscribers.ts
ª   ª       
ª   +---event-store
ª   ª       event-store.ts
ª   ª       
ª   +---events
ª   ª       domain-events.ts
ª   ª       
ª   +---hooks
ª   ª       erp-hooks.ts
ª   ª       register-hooks.ts
ª   ª       
ª   +---jobs
ª   ª       job-queue.ts
ª   ª       job-worker.ts
ª   ª       start-worker.ts
ª   ª       
ª   +---layout
ª   ª       AppShell.tsx
ª   ª       Sidebar.tsx
ª   ª       Topbar.tsx
ª   ª       
ª   +---lifecycle
ª   ª       job-lifecycle.ts
ª   ª       
ª   +---metrics
ª   ª       metrics-engine.ts
ª   ª       
ª   +---modules
ª   ª   ª   module-registry.ts
ª   ª   ª   module-registry.ts.bak
ª   ª   ª   
ª   ª   +---capabilities
ª   ª           module-capabilities-engine.ts
ª   ª           
ª   +---navigation
ª   ª       navigation-builder.ts
ª   ª       
ª   +---permissions
ª   ª       permission-engine.ts
ª   ª       permissions.ts
ª   ª       
ª   +---persistence
ª   ª   ª   persistence-provider.ts
ª   ª   ª   runtime-persistence.ts
ª   ª   ª   
ª   ª   +---providers
ª   ª           firestore-persistence-provider.ts
ª   ª           
ª   +---priority
ª   ª       priority-engine.ts
ª   ª       
ª   +---realtime
ª   ª       runtime-realtime-channel.ts
ª   ª       
ª   +---relations
ª   ª       relation-engine.ts
ª   ª       
ª   +---retry
ª   ª       retry-engine.ts
ª   ª       
ª   +---router
ª   ª       worker-router.ts
ª   ª       
ª   +---rules
ª   ª       register-rules.ts
ª   ª       rules-engine.ts
ª   ª       
ª   +---runtime
ª   ª       runtime-timeline.ts
ª   ª       
ª   +---schemas
ª   ª       exploitations.schema.ts
ª   ª       materiels.schema.ts
ª   ª       schema-registry.ts
ª   ª       terrains.schema.ts
ª   ª       types.ts
ª   ª       
ª   +---security-audit
ª   ª       security-audit-engine.ts
ª   ª       
ª   +---status
ª   ª       register-statuses.ts
ª   ª       status-engine.ts
ª   ª       
ª   +---supervision
ª   ª       supervision-service.ts
ª   ª       
ª   +---tenant
ª   ª       tenant-isolation-engine.ts
ª   ª       
ª   +---throttling
ª   ª       throttling-engine.ts
ª   ª       
ª   +---transactions
ª   ª       business-transaction-engine.ts
ª   ª       
ª   +---transitions
ª   ª       transition-engine.ts
ª   ª       
ª   +---types
ª   ª       Result.ts
ª   ª       
ª   +---utils
ª   ª       date.ts
ª   ª       formatFirestoreDate.ts
ª   ª       
ª   +---worker-loop
ª   ª       worker-loop.ts
ª   ª       
ª   +---workers
ª   ª       analytics-worker.ts
ª   ª       export-worker.ts
ª   ª       maintenance-worker.ts
ª   ª       notification-worker.ts
ª   ª       register-workers.ts
ª   ª       worker-registry.ts
ª   ª       workflow-worker.ts
ª   ª       
ª   +---workflows
ª           workflow-engine.ts
ª           
+---data-platform
ª   +---bi
ª   ª       BIService.ts
ª   ª       
ª   +---etl
ª   ª       ETLPipeline.ts
ª   ª       
ª   +---historical
ª   ª       HistoricalAnalyticsService.ts
ª   ª       
ª   +---services
ª   ª       DataOrchestrationService.ts
ª   ª       
ª   +---streaming
ª   ª       EventStreamingService.ts
ª   ª       
ª   +---warehouse
ª           DataWarehouseService.ts
ª           
+---domains
ª   +---achats
ª   +---clients
ª   +---commandes
ª   +---contrats
ª   ª   +---store
ª   ª           ContratsStore.ts
ª   ª           
ª   +---depenses
ª   +---devis
ª   +---employes
ª   +---factures
ª   +---fournisseurs
ª   +---incidents
ª   +---interventions
ª   ª   +---store
ª   ª           InterventionsStore.ts
ª   ª           
ª   +---intrants
ª   +---livraisons
ª   +---maintenance
ª   ª   +---services
ª   ª   ª       MaintenanceWorkflowService.ts
ª   ª   ª       
ª   ª   +---store
ª   ª           MaintenanceStore.ts
ª   ª           
ª   +---materiels
ª   ª   +---repositories
ª   ª   ª       MaterielsRepository.ts
ª   ª   ª       
ª   ª   +---store
ª   ª           MaterielsStore.ts
ª   ª           
ª   +---paiement
ª   ª   +---events
ª   ª   ª       PaiementEvents.ts
ª   ª   ª       
ª   ª   +---rules
ª   ª   ª       PaiementValidationRule.ts
ª   ª   ª       registerPaiementRules.ts
ª   ª   ª       
ª   ª   +---services
ª   ª   ª       PaiementService.ts
ª   ª   ª       
ª   ª   +---workflows
ª   ª           PaiementWorkflow.ts
ª   ª           
ª   +---parcelles
ª   +---recettes
ª   +---recoltes
ª   +---stock
ª   ª   +---rules
ª   ª   ª       PreventNegativeStockRule.ts
ª   ª   ª       registerStockRules.ts
ª   ª   ª       
ª   ª   +---services
ª   ª   ª       StockService.ts
ª   ª   ª       
ª   ª   +---store
ª   ª           StockStore.ts
ª   ª           
ª   +---taches
ª   +---vehicules
+---enums
ª       MouvementCategorie.ts
ª       MouvementSens.ts
ª       RoleUtilisateur.ts
ª       StatutStandard.ts
ª       Unite.ts
ª       
+---features
ª   +---achats
ª   ª       achats.feature.ts
ª   ª       
ª   +---alerts
ª   ª   +---components
ª   ª   ª       AlertsPanel.tsx
ª   ª   ª       
ª   ª   +---hooks
ª   ª   ª       useAlerts.ts
ª   ª   ª       
ª   ª   +---services
ª   ª           AlertService.ts
ª   ª           
ª   +---analytics
ª   ª   +---components
ª   ª   ª       AnalyticsCards.tsx
ª   ª   ª       analyticsHelpers.ts
ª   ª   ª       DashboardBarChart.tsx
ª   ª   ª       KpiBarChart.tsx
ª   ª   ª       KpiLineChart.tsx
ª   ª   ª       KpiPieChart.tsx
ª   ª   ª       ProductsCategoryChart.tsx
ª   ª   ª       StockAlerts.tsx
ª   ª   ª       StockValueChart.tsx
ª   ª   ª       
ª   ª   +---hooks
ª   ª   ª       useAnalytics.ts
ª   ª   ª       useDashboardStats.ts
ª   ª   ª       
ª   ª   +---services
ª   ª           DashboardAnalyticsService.ts
ª   ª           
ª   +---api
ª   ª   +---middleware
ª   ª   ª       apiAuth.ts
ª   ª   ª       
ª   ª   +---services
ª   ª           apiResponse.ts
ª   ª           
ª   +---audit
ª   ª   +---services
ª   ª   ª       AuditService.ts
ª   ª   ª       
ª   ª   +---types
ª   ª           AuditLog.ts
ª   ª           
ª   +---auth
ª   ª   +---components
ª   ª   ª       LoginForm.tsx
ª   ª   ª       RoleBadge.tsx
ª   ª   ª       RoleGuard.tsx
ª   ª   ª       
ª   ª   +---guards
ª   ª   ª       AuthGuard.tsx
ª   ª   ª       RoleGuard.tsx
ª   ª   ª       
ª   ª   +---hooks
ª   ª   ª       usePermission.ts
ª   ª   ª       usePermissions.ts
ª   ª   ª       useSessionStore.ts
ª   ª   ª       
ª   ª   +---providers
ª   ª   ª       EnterpriseAuthProvider.tsx
ª   ª   ª       
ª   ª   +---services
ª   ª   ª       AuthService.ts
ª   ª   ª       PermissionService.ts
ª   ª   ª       RBACEngine.ts
ª   ª   ª       
ª   ª   +---types
ª   ª           Permissions.ts
ª   ª           UserRole.ts
ª   ª           USER_ROLE.ts
ª   ª           
ª   +---billing
ª   ª   +---components
ª   ª   ª       BillingPlans.tsx
ª   ª   ª       FeatureGuard.tsx
ª   ª   ª       SubscriptionBadge.tsx
ª   ª   ª       
ª   ª   +---hooks
ª   ª   ª       useSubscriptions.ts
ª   ª   ª       
ª   ª   +---repositories
ª   ª   ª       BillingRepository.ts
ª   ª   ª       
ª   ª   +---services
ª   ª   ª       BillingService.ts
ª   ª   ª       hasFeatureAccess.ts
ª   ª   ª       
ª   ª   +---types
ª   ª           BillingSubscription.ts
ª   ª           FeatureFlags.ts
ª   ª           Subscription.ts
ª   ª           SubscriptionPlan.ts
ª   ª           
ª   +---clients
ª   ª       clients.feature.ts
ª   ª       
ª   +---commandes
ª   ª       commandes.feature.ts
ª   ª       
ª   +---dashboard
ª   ª   +---components
ª   ª   ª       DashboardKPICards.tsx
ª   ª   ª       
ª   ª   +---widgets
ª   ª           DashboardActivityFeed.tsx
ª   ª           DashboardAlertCenter.tsx
ª   ª           DashboardAnalyticsPanel.tsx
ª   ª           
ª   +---depenses
ª   ª       depenses.feature.ts
ª   ª       
ª   +---devis
ª   ª       devis.feature.ts
ª   ª       
ª   +---employes
ª   ª       employes.feature.ts
ª   ª       
ª   +---exploitations
ª   ª   ª   exploitations.feature.ts
ª   ª   ª   
ª   ª   +---components
ª   ª   ª       ExploitationEditModal.tsx
ª   ª   ª       ExploitationForm.tsx
ª   ª   ª       ExploitationsEnterpriseTable.tsx
ª   ª   ª       ExploitationsFilterBar.tsx
ª   ª   ª       ExploitationsSearchBar.tsx
ª   ª   ª       ExploitationsTable.tsx
ª   ª   ª       LoadMoreButton.tsx
ª   ª   ª       
ª   ª   +---hooks
ª   ª   ª       useExploitations.ts
ª   ª   ª       usePaginatedExploitations.ts
ª   ª   ª       
ª   ª   +---repositories
ª   ª   ª   ª   ExploitationRepository.ts
ª   ª   ª   ª   ExploitationsRepository.ts
ª   ª   ª   ª   
ª   ª   ª   +---firestore
ª   ª   ª           FirestoreExploitationRepository.ts
ª   ª   ª           
ª   ª   +---schemas
ª   ª   ª       ExploitationSchema.ts
ª   ª   ª       
ª   ª   +---services
ª   ª   ª       ExploitationService.ts
ª   ª   ª       ExploitationsService.ts
ª   ª   ª       
ª   ª   +---types
ª   ª           Exploitation.ts
ª   ª           
ª   +---exports
ª   ª   +---components
ª   ª   ª       ExportButtons.tsx
ª   ª   ª       
ª   ª   +---services
ª   ª           ExportService.ts
ª   ª           
ª   +---factures
ª   ª       factures.feature.ts
ª   ª       
ª   +---fournisseurs
ª   ª   ª   fournisseurs.feature.ts
ª   ª   ª   
ª   ª   +---application
ª   ª   ª       FournisseursService.ts
ª   ª   ª       
ª   ª   +---domain
ª   ª   ª       Fournisseurs.ts
ª   ª   ª       FournisseursRepository.ts
ª   ª   ª       
ª   ª   +---infrastructure
ª   ª   ª       FirestoreFournisseursRepository.ts
ª   ª   ª       
ª   ª   +---runtime
ª   ª           EnterpriseFournisseursFlow.ts
ª   ª           
ª   +---incidents
ª   ª       incidents.feature.ts
ª   ª       
ª   +---interventions
ª   ª   ª   interventions.feature.ts
ª   ª   ª   
ª   ª   +---events
ª   ª   ª       InterventionEvents.ts
ª   ª   ª       
ª   ª   +---repositories
ª   ª   ª   +---firestore
ª   ª   ª           FirestoreInterventionRepository.ts
ª   ª   ª           
ª   ª   +---services
ª   ª   ª       InterventionService.ts
ª   ª   ª       
ª   ª   +---types
ª   ª   ª       Intervention.ts
ª   ª   ª       
ª   ª   +---workflows
ª   ª           BreakdownInterventionWorkflow.ts
ª   ª           
ª   +---intrants
ª   ª       intrants.feature.ts
ª   ª       
ª   +---invitations
ª   ª   +---components
ª   ª   ª       InvitationForm.tsx
ª   ª   ª       
ª   ª   +---hooks
ª   ª   ª       useInvitations.ts
ª   ª   ª       
ª   ª   +---repositories
ª   ª   ª       InvitationsRepository.ts
ª   ª   ª       
ª   ª   +---services
ª   ª   ª       InvitationService.ts
ª   ª   ª       
ª   ª   +---types
ª   ª           Invitation.ts
ª   ª           
ª   +---livraisons
ª   ª       livraisons.feature.ts
ª   ª       
ª   +---materiels
ª   ª   ª   materiels.feature.ts
ª   ª   ª   
ª   ª   +---analytics
ª   ª   ª       MaterielAnalytics.ts
ª   ª   ª       
ª   ª   +---application
ª   ª   ª       MaterielService.ts
ª   ª   ª       
ª   ª   +---dashboard
ª   ª   ª       MaterielsDashboard.tsx
ª   ª   ª       
ª   ª   +---domain
ª   ª   ª       Materiel.ts
ª   ª   ª       MaterielRepository.ts
ª   ª   ª       
ª   ª   +---events
ª   ª   ª       MaterielEvents.ts
ª   ª   ª       
ª   ª   +---infrastructure
ª   ª   ª       FirestoreMaterielRepository.ts
ª   ª   ª       
ª   ª   +---policies
ª   ª   ª       MaterielPolicies.ts
ª   ª   ª       
ª   ª   +---realtime
ª   ª   ª       MaterielRealtimeGateway.ts
ª   ª   ª       
ª   ª   +---repositories
ª   ª   ª   ª   MaterielRepository.ts
ª   ª   ª   ª   
ª   ª   ª   +---firestore
ª   ª   ª           FirestoreMaterielRepository.ts
ª   ª   ª           
ª   ª   +---runtime
ª   ª   ª       EnterpriseMaterielFlow.ts
ª   ª   ª       MaterielRuntimeHook.ts
ª   ª   ª       simulateEnterpriseMaterielFlow.ts
ª   ª   ª       
ª   ª   +---services
ª   ª   ª       MaterielService.ts
ª   ª   ª       
ª   ª   +---supervision
ª   ª   ª       MaterielSupervisionService.ts
ª   ª   ª       
ª   ª   +---tests
ª   ª   ª       MaterielService.test.ts
ª   ª   ª       
ª   ª   +---types
ª   ª   ª       Materiel.ts
ª   ª   ª       
ª   ª   +---ui
ª   ª   ª       MaterielsDashboard.tsx
ª   ª   ª       
ª   ª   +---workflows
ª   ª       ª   MaterielMaintenanceWorkflow.ts
ª   ª       ª   
ª   ª       +---definitions
ª   ª               CreateMaterielWorkflow.ts
ª   ª               
ª   +---memberships
ª   ª   +---hooks
ª   ª   ª       useMemberships.ts
ª   ª   ª       
ª   ª   +---repositories
ª   ª   ª       MembershipsRepository.ts
ª   ª   ª       
ª   ª   +---services
ª   ª   ª       MembershipService.ts
ª   ª   ª       
ª   ª   +---types
ª   ª           Membership.ts
ª   ª           
ª   +---mouvements
ª   ª   +---repositories
ª   ª   ª       MouvementRepository.ts
ª   ª   ª       
ª   ª   +---services
ª   ª   ª       MouvementService.ts
ª   ª   ª       
ª   ª   +---types
ª   ª           Mouvement.ts
ª   ª           
ª   +---notifications
ª   ª   +---components
ª   ª   ª       NotificationBadge.tsx
ª   ª   ª       NotificationCenter.tsx
ª   ª   ª       RealtimeNotifications.tsx
ª   ª   ª       
ª   ª   +---hooks
ª   ª   ª       useNotifications.ts
ª   ª   ª       
ª   ª   +---services
ª   ª   ª       createStockAlert.ts
ª   ª   ª       NotificationService.ts
ª   ª   ª       
ª   ª   +---types
ª   ª           Notification.ts
ª   ª           
ª   +---observability
ª   ª   ª   observability.feature.ts
ª   ª   ª   
ª   ª   +---components
ª   ª   ª       AuditTable.tsx
ª   ª   ª       RuntimeStatusCard.tsx
ª   ª   ª       
ª   ª   +---dashboards
ª   ª   ª       LiveRuntimeDashboard.tsx
ª   ª   ª       RuntimeHealthDashboard.tsx
ª   ª   ª       
ª   ª   +---hooks
ª   ª   ª       useAuditEvents.ts
ª   ª   ª       useRuntimeHealth.ts
ª   ª   ª       
ª   ª   +---services
ª   ª   ª   ª   AuditService.ts
ª   ª   ª   ª   RuntimeObservabilityService.ts
ª   ª   ª   ª   
ª   ª   ª   +---live
ª   ª   ª   ª       LiveObservabilityService.ts
ª   ª   ª   ª       
ª   ª   ª   +---workflows
ª   ª   ª           WorkflowExecutionRealtimeService.ts
ª   ª   ª           
ª   ª   +---stores
ª   ª   ª   ª   observabilityStore.ts
ª   ª   ª   ª   
ª   ª   ª   +---live
ª   ª   ª   ª       liveEventStore.ts
ª   ª   ª   ª       
ª   ª   ª   +---workflows
ª   ª   ª           workflowExecutionStore.ts
ª   ª   ª           
ª   ª   +---types
ª   ª   ª       AuditEvent.ts
ª   ª   ª       RuntimeHealth.ts
ª   ª   ª       
ª   ª   +---widgets
ª   ª       ª   DeadLetterPanel.tsx
ª   ª       ª   EventStream.tsx
ª   ª       ª   RetryMonitor.tsx
ª   ª       ª   
ª   ª       +---live
ª   ª       ª       DeadLetterFeed.tsx
ª   ª       ª       EventReplayConsole.tsx
ª   ª       ª       LiveEventStream.tsx
ª   ª       ª       LiveEventStream.tsx.bak
ª   ª       ª       RetryActivityPanel.tsx
ª   ª       ª       WorkflowExecutionPanel.tsx
ª   ª       ª       
ª   ª       +---workflows
ª   ª               WorkflowExecutionMonitor.tsx
ª   ª               
ª   +---offline
ª   ª   +---components
ª   ª   ª       OfflineSyncCard.tsx
ª   ª   ª       
ª   ª   +---hooks
ª   ª   ª       useOfflineStatus.ts
ª   ª   ª       
ª   ª   +---queue
ª   ª   ª       OfflineQueue.ts
ª   ª   ª       
ª   ª   +---storage
ª   ª   ª       OfflineStorage.ts
ª   ª   ª       
ª   ª   +---sync
ª   ª           SyncService.ts
ª   ª           
ª   +---organisations
ª   ª   +---components
ª   ª   ª       OrganisationSwitcher.tsx
ª   ª   ª       SuperAdminBadge.tsx
ª   ª   ª       TenantGuard.tsx
ª   ª   ª       
ª   ª   +---repositories
ª   ª   ª       OrganisationRepository.ts
ª   ª   ª       
ª   ª   +---services
ª   ª   ª       OrganisationService.ts
ª   ª   ª       tenantHelpers.ts
ª   ª   ª       
ª   ª   +---types
ª   ª           Organisation.ts
ª   ª           
ª   +---organization-analytics
ª   ª   +---components
ª   ª   ª       OrganizationAnalyticsCards.tsx
ª   ª   ª       PlanUsageCard.tsx
ª   ª   ª       
ª   ª   +---services
ª   ª           OrganizationAnalyticsService.ts
ª   ª           
ª   +---organizations
ª   ª   +---hooks
ª   ª   ª       useOrganizations.ts
ª   ª   ª       
ª   ª   +---repositories
ª   ª   ª       OrganizationsRepository.ts
ª   ª   ª       
ª   ª   +---services
ª   ª   ª       OrganizationService.ts
ª   ª   ª       
ª   ª   +---types
ª   ª           Organization.ts
ª   ª           
ª   +---parcelles
ª   ª       parcelles.feature.ts
ª   ª       
ª   +---payments
ª   ª   +---components
ª   ª   ª       CheckoutButton.tsx
ª   ª   ª       
ª   ª   +---services
ª   ª   ª       PaymentService.ts
ª   ª   ª       
ª   ª   +---types
ª   ª           Checkout.ts
ª   ª           
ª   +---platform
ª   ª   +---components
ª   ª   ª   +---layout
ª   ª   ª   ª       EnterpriseTopbar.tsx
ª   ª   ª   ª       
ª   ª   ª   +---navigation
ª   ª   ª   ª       EnterpriseSidebar.tsx
ª   ª   ª   ª       
ª   ª   ª   +---notifications
ª   ª   ª   ª       NotificationCenter.tsx
ª   ª   ª   ª       
ª   ª   ª   +---runtime
ª   ª   ª           LiveActivityPanel.tsx
ª   ª   ª           RealtimeActivityPanel.tsx
ª   ª   ª           RuntimeActivityFeed.tsx
ª   ª   ª           runtimeActivityStore.ts
ª   ª   ª           RuntimeConsole.tsx
ª   ª   ª           RuntimeMetricsPanel.tsx
ª   ª   ª           WorkflowStatusPanel.tsx
ª   ª   ª           
ª   ª   +---dashboards
ª   ª   ª       ConnectedRuntimeDashboard.tsx
ª   ª   ª       EnterpriseSupervisionDashboard.tsx
ª   ª   ª       RealtimeRuntimeDashboard.tsx
ª   ª   ª       
ª   ª   +---shell
ª   ª   ª       EnterpriseShell.tsx
ª   ª   ª       
ª   ª   +---workspace
ª   ª           ConnectedEnterpriseWorkspace.tsx
ª   ª           EnterpriseWorkspace.tsx
ª   ª           
ª   +---platform-monitoring
ª   ª   +---components
ª   ª       ª   ERPStatusDashboard.tsx
ª   ª       ª   
ª   ª       +---graphs
ª   ª               EventTimeline.tsx
ª   ª               EventTimeline.tsx.bak
ª   ª               MetricsPanel.tsx
ª   ª               
ª   +---produits
ª   ª   ª   produits.feature.ts
ª   ª   ª   
ª   ª   +---components
ª   ª   ª       ProductEditForm.tsx
ª   ª   ª       ProductForm.tsx
ª   ª   ª       ProductsTable.tsx
ª   ª   ª       
ª   ª   +---hooks
ª   ª   ª       useProducts.ts
ª   ª   ª       
ª   ª   +---repositories
ª   ª   ª   ª   ProductsRepository.ts
ª   ª   ª   ª   ProduitRepository.ts
ª   ª   ª   ª   
ª   ª   ª   +---firestore
ª   ª   ª           FirestoreProduitRepository.ts
ª   ª   ª           
ª   ª   +---services
ª   ª   ª       ProductService.ts
ª   ª   ª       ProduitService.ts
ª   ª   ª       
ª   ª   +---types
ª   ª           Product.ts
ª   ª           Produit.ts
ª   ª           UNITE.ts
ª   ª           
ª   +---pwa
ª   ª   +---components
ª   ª           OfflineStatusCard.tsx
ª   ª           PWAInstallButton.tsx
ª   ª           
ª   +---recettes
ª   ª       recettes.feature.ts
ª   ª       
ª   +---recoltes
ª   ª       recoltes.feature.ts
ª   ª       
ª   +---ressources
ª   ª   +---repositories
ª   ª   ª       RessourceRepository.ts
ª   ª   ª       
ª   ª   +---services
ª   ª   ª       RessourceService.ts
ª   ª   ª       
ª   ª   +---types
ª   ª           Ressource.ts
ª   ª           
ª   +---runtime-supervision
ª   ª       RuntimeSupervisionDashboard.tsx
ª   ª       
ª   +---stocks
ª   ª   ª   stocks.feature.ts
ª   ª   ª   
ª   ª   +---repositories
ª   ª   ª   +---firestore
ª   ª   ª           FirestoreStockRepository.ts
ª   ª   ª           
ª   ª   +---services
ª   ª   ª       StockService.ts
ª   ª   ª       
ª   ª   +---types
ª   ª           MOUVEMENT_STOCK.ts
ª   ª           
ª   +---superadmin
ª   ª   +---components
ª   ª   ª       OrganisationsTable.tsx
ª   ª   ª       PlatformKpiCard.tsx
ª   ª   ª       
ª   ª   +---services
ª   ª           SuperAdminService.ts
ª   ª           
ª   +---taches
ª   ª       taches.feature.ts
ª   ª       
ª   +---teams
ª   ª   +---components
ª   ª   ª       TeamMembersTable.tsx
ª   ª   ª       
ª   ª   +---services
ª   ª           TeamService.ts
ª   ª           
ª   +---tenancy
ª   ª   +---components
ª   ª   ª       OrganizationSwitcher.tsx
ª   ª   ª       
ª   ª   +---context
ª   ª   ª       TenantProvider.tsx
ª   ª   ª       
ª   ª   +---hooks
ª   ª   ª       useTenant.ts
ª   ª   ª       
ª   ª   +---services
ª   ª           TenantService.ts
ª   ª           
ª   +---terrains
ª   ª   ª   terrains.feature.ts
ª   ª   ª   
ª   ª   +---repositories
ª   ª   ª       TerrainRepository.ts
ª   ª   ª       
ª   ª   +---services
ª   ª   ª       TerrainService.ts
ª   ª   ª       
ª   ª   +---types
ª   ª           Terrain.ts
ª   ª           
ª   +---vehicules
ª   ª       vehicules.feature.ts
ª   ª       
ª   +---workflow
ª   ª   +---components
ª   ª   ª       WorkflowActions.tsx
ª   ª   ª       WorkflowStatusBadge.tsx
ª   ª   ª       
ª   ª   +---types
ª   ª           WorkflowHistory.ts
ª   ª           WorkflowStatus.ts
ª   ª           
ª   +---workflow-engine
ª       +---components
ª       ª       WorkflowCard.tsx
ª       ª       WorkflowDashboard.tsx
ª       ª       
ª       +---services
ª       ª       EventBus.ts
ª       ª       ProcessOrchestrator.ts
ª       ª       WorkflowAnalytics.ts
ª       ª       WorkflowEngine.ts
ª       ª       
ª       +---types
ª               WorkflowDefinition.ts
ª               WorkflowExecution.ts
ª               
+---hooks
ª   ª   useCollection.ts
ª   ª   useDocument.ts
ª   ª   useProducts.ts
ª   ª   useRealtime.ts
ª   ª   useRealtimeCollection.ts
ª   ª   useToast.ts
ª   ª   
ª   +---runtime
ª           useRuntimeChannel.ts
ª           
+---infrastructure
ª   +---firebase
ª   ª       firebase.ts
ª   ª       FirestoreRepository.ts
ª   ª       
ª   +---repositories
ª       +---firestore
ª               BaseFirestoreRepository.ts
ª               FirestoreMaterielRepository.ts
ª               
+---lib
ª   ª   firebase.ts
ª   ª   
ª   +---api
ª   ª       apiClient.ts
ª   ª       
ª   +---auth
ª   ª       session.ts
ª   ª       
ª   +---firebase
ª   ª       config.ts
ª   ª       
ª   +---firestore
ª   ª   ª   BaseRepository.ts
ª   ª   ª   
ª   ª   +---repositories
ª   ª           ProductsRepository.ts
ª   ª           
ª   +---stripe
ª           client.ts
ª           
+---modules
ª   ª   disable-module.ps1
ª   ª   
ª   +---produits
ª           produit.mock.ts
ª           produit.model.ts
ª           produit.rules.ts
ª           
+---platform
ª   +---audit
ª   ª       AuditTrail.ts
ª   ª       
ª   +---auth
ª   ª   ª   AuthService.ts
ª   ª   ª   
ª   ª   +---guards
ª   ª   ª       AuthGuard.ts
ª   ª   ª       
ª   ª   +---session
ª   ª           SessionStore.ts
ª   ª           
ª   +---automation
ª   ª       ERPAutomationEngine.ts
ª   ª       registerAutomations.ts
ª   ª       
ª   +---bootstrap
ª   ª       bootstrapERP.ts
ª   ª       loadDomains.ts
ª   ª       loadFeatures.ts
ª   ª       loadFeatures.ts.bak
ª   ª       
ª   +---circuit-breaker
ª   ª       CircuitBreaker.ts
ª   ª       
ª   +---dependencies
ª   ª       DependencyValidator.ts
ª   ª       ModuleDependencies.ts
ª   ª       
ª   +---events
ª   ª       DomainEvents.ts
ª   ª       EventTypes.ts
ª   ª       
ª   +---execution
ª   ª   ª   WorkflowScheduler.ts
ª   ª   ª   
ª   ª   +---executors
ª   ª   ª       WorkflowExecutor.ts
ª   ª   ª       
ª   ª   +---queue
ª   ª           WorkflowQueue.ts
ª   ª           
ª   +---factories
ª   ª       createModuleService.ts
ª   ª       createPipelineRule.ts
ª   ª       
ª   +---governance
ª   ª   ª   GovernanceContext.ts
ª   ª   ª   GovernanceRuntime.ts
ª   ª   ª   registerPolicies.ts
ª   ª   ª   
ª   ª   +---features
ª   ª   ª       FeatureFlags.ts
ª   ª   ª       
ª   ª   +---permissions
ª   ª   ª       DomainPermissions.ts
ª   ª   ª       
ª   ª   +---policies
ª   ª   ª   ª   DefaultRuntimePolicy.ts
ª   ª   ª   ª   
ª   ª   ª   +---engine
ª   ª   ª   ª       RuntimePoliciesEngine.ts
ª   ª   ª   ª       
ª   ª   ª   +---registry
ª   ª   ª   ª       PolicyRegistry.ts
ª   ª   ª   ª       
ª   ª   ª   +---types
ª   ª   ª           RuntimePolicy.ts
ª   ª   ª           
ª   ª   +---tenants
ª   ª           TenantRegistry.ts
ª   ª           
ª   +---health
ª   ª       ERPHealthCheck.ts
ª   ª       
ª   +---integrations
ª   ª       registerWebhooks.ts
ª   ª       WebhookDispatcher.ts
ª   ª       WebhookRegistry.ts
ª   ª       
ª   +---intelligence
ª   ª       AutoHealingService.ts
ª   ª       OperationalIntelligenceScheduler.ts
ª   ª       RuntimeAnomalyDetector.ts
ª   ª       WorkflowScoringEngine.ts
ª   ª       
ª   +---modules
ª   ª   +---runtime
ª   ª   ª       ModuleRuntime.ts
ª   ª   ª       
ª   ª   +---types
ª   ª           ExecutionMode.ts
ª   ª           ModuleContext.ts
ª   ª           
ª   +---monitoring
ª   ª       ERPMonitoringService.ts
ª   ª       
ª   +---navigation
ª   ª       buildNavigation.ts
ª   ª       
ª   +---notifications
ª   ª       NotificationBus.ts
ª   ª       
ª   +---observability
ª   ª       ERPLogger.ts
ª   ª       EventStore.ts
ª   ª       MetricsRegistry.ts
ª   ª       
ª   +---orchestration
ª   ª       ERPOrchestrator.ts
ª   ª       
ª   +---persistence
ª   ª       RuntimePersistenceService.ts
ª   ª       RuntimeRecoveryScheduler.ts
ª   ª       RuntimeSnapshotStore.ts
ª   ª       
ª   +---policies
ª   ª   +---engine
ª   ª   ª       PolicyEngine.ts
ª   ª   ª       
ª   ª   +---rules
ª   ª   ª       MaintenancePolicy.ts
ª   ª   ª       
ª   ª   +---types
ª   ª           Policy.ts
ª   ª           
ª   +---registry
ª   ª       FeatureDefinition.ts
ª   ª       FeatureRegistry.ts
ª   ª       ModuleRegistry.ts
ª   ª       
ª   +---resilience
ª   ª       DeadLetterQueue.ts
ª   ª       RetryPolicy.ts
ª   ª       
ª   +---rules
ª   ª   ª   registerBusinessRules.ts
ª   ª   ª   
ª   ª   +---audit
ª   ª   ª       RuleAudit.ts
ª   ª   ª       
ª   ª   +---core
ª   ª   ª       RuleExecutionContext.ts
ª   ª   ª       
ª   ª   +---engine
ª   ª   ª       BusinessRulesEngine.ts
ª   ª   ª       
ª   ª   +---monitoring
ª   ª   ª       RuleMonitoring.ts
ª   ª   ª       
ª   ª   +---pipelines
ª   ª   ª       PipelineType.ts
ª   ª   ª       
ª   ª   +---registry
ª   ª   ª       RuleRegistry.ts
ª   ª   ª       
ª   ª   +---runtime
ª   ª   ª       RulePipelineRuntime.ts
ª   ª   ª       
ª   ª   +---security
ª   ª   ª       RuleSecurityPolicy.ts
ª   ª   ª       
ª   ª   +---types
ª   ª           BusinessRule.ts
ª   ª           PipelineRule.ts
ª   ª           
ª   +---runtime
ª   ª       RuntimeBootstrap.ts
ª   ª       
ª   +---sagas
ª   ª       registerSagas.ts
ª   ª       SagaManager.ts
ª   ª       
ª   +---scheduling
ª   ª       DomainQueues.ts
ª   ª       WorkflowPriority.ts
ª   ª       WorkflowSchedulerPolicy.ts
ª   ª       
ª   +---security
ª   ª   ª   ExecutionPolicy.ts
ª   ª   ª   SecurityAudit.ts
ª   ª   ª   
ª   ª   +---guards
ª   ª   ª       FeatureGuard.ts
ª   ª   ª       
ª   ª   +---permissions
ª   ª   ª       PermissionEngine.ts
ª   ª   ª       
ª   ª   +---roles
ª   ª           RoleDefinition.ts
ª   ª           
ª   +---throttling
ª   ª       WorkflowThrottler.ts
ª   ª       
ª   +---timeline
ª   ª       ERPTimeline.ts
ª   ª       registerTimelineListeners.ts
ª   ª       
ª   +---workers
ª   ª       ERPWorker.ts
ª   ª       WorkerPool.ts
ª   ª       
ª   +---workflows
ª       ª   ERPAudit.ts
ª       ª   ERPNotifications.ts
ª       ª   ERPWorkflow.ts
ª       ª   
ª       +---history
ª       ª       WorkflowHistoryEntry.ts
ª       ª       
ª       +---registry
ª       ª       WorkflowRegistry.ts
ª       ª       
ª       +---runtime
ª       ª       WorkflowRuntime.ts
ª       ª       
ª       +---states
ª       ª       StateTransition.ts
ª       ª       WorkflowState.ts
ª       ª       
ª       +---store
ª       ª       WorkflowStateStore.ts
ª       ª       
ª       +---supervision
ª       ª       WorkflowSupervision.ts
ª       ª       
ª       +---timeline
ª               WorkflowTimeline.ts
ª               WorkflowTimelineEntry.ts
ª               
+---providers
ª       AppQueryProvider.tsx
ª       AuthProvider.tsx
ª       RootProviders.tsx
ª       TenantProvider.tsx
ª       ToastProvider.tsx
ª       
+---runtime
ª   ª   production.ts
ª   ª   README.md
ª   ª   test-file.txt
ª   ª   
ª   +---actions
ª   ª       ERPAction.ts
ª   ª       ERPActionExecutor.ts
ª   ª       ERPActionRegistry.ts
ª   ª       ERPActionResolver.ts
ª   ª       index.ts
ª   ª       
ª   +---ai
ª   ª   ª   ERPAISnapshot.ts
ª   ª   ª   index.ts
ª   ª   ª   
ª   ª   +---anomalies
ª   ª   ª       ERPAIAnomaly.ts
ª   ª   ª       ERPAIAnomalyDetector.ts
ª   ª   ª       
ª   ª   +---assistant
ª   ª   ª       ERPAIAssistantEngine.ts
ª   ª   ª       ERPAIAssistantMessage.ts
ª   ª   ª       
ª   ª   +---insights
ª   ª   ª       ERPAIInsight.ts
ª   ª   ª       ERPAIInsightEngine.ts
ª   ª   ª       
ª   ª   +---recommendations
ª   ª   ª       ERPAIRecommendation.ts
ª   ª   ª       ERPAIRecommendationEngine.ts
ª   ª   ª       
ª   ª   +---search
ª   ª           ERPSemanticRuntimeSearch.ts
ª   ª           ERPSemanticSearchResult.ts
ª   ª           
ª   +---automation
ª   ª   ª   ERPAutomationEngine.ts
ª   ª   ª   ERPAutomationRegistry.ts
ª   ª   ª   ERPAutomationTimelineStore.ts
ª   ª   ª   ERPNotificationCenter.ts
ª   ª   ª   ERPRuntimeAutomationSeed.ts
ª   ª   ª   index.ts
ª   ª   ª   RuntimeAutomation.ts
ª   ª   ª   RuntimeAutomationEngine.ts
ª   ª   ª   runtimeAutomations.ts
ª   ª   ª   seedERPRuntimeAutomation.ts
ª   ª   ª   
ª   ª   +---actions
ª   ª   ª       ActionExecutor.ts
ª   ª   ª       
ª   ª   +---conditions
ª   ª   ª       ConditionEvaluator.ts
ª   ª   ª       
ª   ª   +---cron
ª   ª   ª       CronManager.ts
ª   ª   ª       
ª   ª   +---engine
ª   ª   ª       ERPAutomationEngine.ts
ª   ª   ª       ERPAutomationRegistry.ts
ª   ª   ª       ERPAutomationRule.ts
ª   ª   ª       
ª   ª   +---hooks
ª   ª   ª       ERPRuntimeHooks.ts
ª   ª   ª       
ª   ª   +---notifications
ª   ª   ª       ERPNotificationCenter.ts
ª   ª   ª       
ª   ª   +---pipelines
ª   ª   ª       PipelineEngine.ts
ª   ª   ª       
ª   ª   +---rules
ª   ª   ª       AutomationRule.ts
ª   ª   ª       MaterielBreakdownRule.ts
ª   ª   ª       
ª   ª   +---runner
ª   ª   ª       AutomationRunner.ts
ª   ª   ª       
ª   ª   +---sagas
ª   ª   ª       SagaCoordinator.ts
ª   ª   ª       
ª   ª   +---scheduler
ª   ª   ª       AutomationScheduler.ts
ª   ª   ª       Scheduler.ts
ª   ª   ª       
ª   ª   +---timeline
ª   ª   ª       ERPAutomationExecution.ts
ª   ª   ª       ERPAutomationTimelineStore.ts
ª   ª   ª       
ª   ª   +---triggers
ª   ª   ª       AutomationTrigger.ts
ª   ª   ª       TriggerEngine.ts
ª   ª   ª       
ª   ª   +---types
ª   ª           Automation.ts
ª   ª           
ª   +---automation-runtime
ª   ª       AutomationRuntimeEngine.ts
ª   ª       AutomationRuntimeExecutor.ts
ª   ª       AutomationRuntimeQueue.ts
ª   ª       AutomationRuntimeRegistry.ts
ª   ª       AutomationRuntimeRules.ts
ª   ª       AutomationRuntimeScheduler.ts
ª   ª       AutomationRuntimeTriggerEngine.ts
ª   ª       AutomationRuntimeTypes.ts
ª   ª       index.ts
ª   ª       
ª   +---bootstrap
ª   ª       bootstrapEnterpriseRuntime.ts
ª   ª       bootstrapRuntime.ts
ª   ª       initializeRuntime.ts
ª   ª       registerBreakdownFlow.ts
ª   ª       registerDomainEvents.ts
ª   ª       registerMaterielWorkflows.ts
ª   ª       runtimeHealthCheck.ts
ª   ª       simulateBreakdown.ts
ª   ª       simulateBreakdownFlow.ts
ª   ª       startEnterpriseRuntime.ts
ª   ª       
ª   +---bus
ª   ª       RuntimeEventBus.ts
ª   ª       
ª   +---business-rules
ª   ª       README.md
ª   ª       RuntimeBusinessRule.ts
ª   ª       runtimeBusinessRules.ts
ª   ª       RuntimeBusinessRulesEngine.ts
ª   ª       
ª   +---cockpit
ª   ª       ERPCockpitSnapshot.ts
ª   ª       index.ts
ª   ª       
ª   +---compliance
ª   ª       ERPComplianceChecker.ts
ª   ª       ERPComplianceTypes.ts
ª   ª       
ª   +---computed
ª   ª       RuntimeComputedEngine.ts
ª   ª       
ª   +---context
ª   ª       RuntimeContextEngine.ts
ª   ª       
ª   +---core
ª   ª   ª   CentralRuntimeRegistry.ts
ª   ª   ª   index.ts
ª   ª   ª   RuntimeAlertRegistry.ts
ª   ª   ª   RuntimeAuditRegistry.ts
ª   ª   ª   RuntimeBindings.ts
ª   ª   ª   RuntimeBindings.ts.bak
ª   ª   ª   RuntimeCapabilities.ts
ª   ª   ª   RuntimeContracts.ts
ª   ª   ª   RuntimeDeadLetterQueue.ts
ª   ª   ª   RuntimeEventBus.ts
ª   ª   ª   RuntimeEventStore.ts
ª   ª   ª   RuntimeEventTopology.ts
ª   ª   ª   RuntimeExecutionRegistry.ts
ª   ª   ª   RuntimeHealthRegistry.ts
ª   ª   ª   RuntimeLifecycle.ts
ª   ª   ª   RuntimeMetricsRegistry.ts
ª   ª   ª   RuntimeModuleConnector.ts
ª   ª   ª   RuntimeObservabilityRegistry.ts
ª   ª   ª   RuntimeOrchestrator.ts
ª   ª   ª   RuntimePermissionRegistry.ts
ª   ª   ª   RuntimePermissionRegistry.ts.bak
ª   ª   ª   RuntimePipeline.ts
ª   ª   ª   RuntimePolicyRegistry.ts
ª   ª   ª   RuntimeQueueRegistry.ts
ª   ª   ª   RuntimeRetryRegistry.ts
ª   ª   ª   RuntimeScheduler.ts
ª   ª   ª   RuntimeSecurityRegistry.ts
ª   ª   ª   RuntimeStateRegistry.ts
ª   ª   ª   RuntimeStateRegistry.ts.bak
ª   ª   ª   RuntimeStreamRegistry.ts
ª   ª   ª   RuntimeSupervisor.ts
ª   ª   ª   RuntimeWorkerRegistry.ts
ª   ª   ª   RuntimeWorkflowRegistry.ts
ª   ª   ª   RuntimeWorkflowRegistry.ts.bak
ª   ª   ª   
ª   ª   +---context
ª   ª   ª       RuntimeContext.ts
ª   ª   ª       
ª   ª   +---executors
ª   ª   ª       RuntimeExecutor.ts
ª   ª   ª       
ª   ª   +---registry
ª   ª   ª       RuntimeRegistry.ts
ª   ª   ª       
ª   ª   +---services
ª   ª   ª       RuntimePublisher.ts
ª   ª   ª       RuntimeSubscriber.ts
ª   ª   ª       
ª   ª   +---types
ª   ª           RuntimeEvent.ts
ª   ª           
ª   +---dashboard
ª   ª   ª   ERPBusinessAlertEngine.ts
ª   ª   ª   ERPBusinessAlerts.ts
ª   ª   ª   ERPBusinessMetricsEngine.ts
ª   ª   ª   ERPDashboardMetrics.ts
ª   ª   ª   
ª   ª   +---generic
ª   ª       ª   ERPBusinessDashboardConfig.ts
ª   ª       ª   ERPDashboardModuleResolver.ts
ª   ª       ª   ERPDashboardTypes.ts
ª   ª       ª   ERPDashboardWidgetEngine.ts
ª   ª       ª   registerERPDashboards.ts
ª   ª       ª   
ª   ª       +---configs
ª   ª       ª       ERPBusinessDashboardConfig.ts
ª   ª       ª       
ª   ª       +---registry
ª   ª               ERPDashboardRegistry.ts
ª   ª               
ª   +---data
ª   ª   ª   ERPDataEngine.ts
ª   ª   ª   ERPDataRepository.ts
ª   ª   ª   ERPModuleDataService.ts
ª   ª   ª   ERPModuleRuntimeDataBridge.ts
ª   ª   ª   index.ts
ª   ª   ª   
ª   ª   +---adapters
ª   ª   ª       ERPStorageAdapter.ts
ª   ª   ª       MemoryERPStorageAdapter.ts
ª   ª   ª       
ª   ª   +---analytics
ª   ª   ª       AnalyticsEngine.ts
ª   ª   ª       PersistentAnalyticsEngine.ts
ª   ª   ª       
ª   ª   +---cqrs
ª   ª   ª       CQRSBus.ts
ª   ª   ª       
ª   ª   +---event-store
ª   ª   ª   ª   EventStore.ts
ª   ª   ª   ª   PersistentEventStore.ts
ª   ª   ª   ª   
ª   ª   ª   +---dispatchers
ª   ª   ª   ª       ProjectionDispatcher.ts
ª   ª   ª   ª       
ª   ª   ª   +---replay
ª   ª   ª   ª       ReplayEngine.ts
ª   ª   ª   ª       
ª   ª   ª   +---serialization
ª   ª   ª   ª       EventSerializer.ts
ª   ª   ª   ª       
ª   ª   ª   +---snapshots
ª   ª   ª   ª       SnapshotManager.ts
ª   ª   ª   ª       
ª   ª   ª   +---streams
ª   ª   ª           StreamManager.ts
ª   ª   ª           
ª   ª   +---forecast
ª   ª   ª       ForecastEngine.ts
ª   ª   ª       
ª   ª   +---projections
ª   ª   ª       ProjectionEngine.ts
ª   ª   ª       
ª   ª   +---read-models
ª   ª   ª       ReadModelBuilder.ts
ª   ª   ª       
ª   ª   +---reporting
ª   ª   ª       ReportingEngine.ts
ª   ª   ª       
ª   ª   +---warehouse
ª   ª           DataWarehouseConnector.ts
ª   ª           
ª   +---data-binding
ª   ª       index.ts
ª   ª       RuntimeDataBinding.ts
ª   ª       RuntimeRecord.ts
ª   ª       
ª   +---dead-letter
ª   ª       DeadLetterQueue.ts
ª   ª       
ª   +---domain
ª   ª   ª   index.ts
ª   ª   ª   TerragestDomainRuntimeBridge.ts
ª   ª   ª   
ª   ª   +---adapters
ª   ª   ª       TerragestBusinessRuleAdapter.ts
ª   ª   ª       
ª   ª   +---models
ª   ª   ª       TerragestDomainModel.ts
ª   ª   ª       
ª   ª   +---rules
ª   ª           TerragestBusinessRules.ts
ª   ª           TerragestInterModuleRules.ts
ª   ª           
ª   +---enterprise-runtime
ª   ª       EnterpriseRuntimeDiagnostics.ts
ª   ª       EnterpriseRuntimeGovernance.ts
ª   ª       EnterpriseRuntimeKernel.ts
ª   ª       EnterpriseRuntimeLifecycle.ts
ª   ª       EnterpriseRuntimePerformance.ts
ª   ª       index.ts
ª   ª       
ª   +---event-runtime
ª   ª       ERPEventRuntimeBus.ts
ª   ª       ERPEventRuntimeOrchestrator.ts
ª   ª       ERPEventRuntimeStore.ts
ª   ª       ERPEventRuntimeSubscriptionRegistry.ts
ª   ª       ERPEventRuntimeSubscriptions.ts
ª   ª       ERPEventRuntimeTypes.ts
ª   ª       index.ts
ª   ª       
ª   +---events
ª   ª   ª   ERPDomainEvent.ts
ª   ª   ª   ERPEventAutomationBridge.ts
ª   ª   ª   ERPEventBus.ts
ª   ª   ª   ERPRuntimeEventOrchestrator.ts
ª   ª   ª   EventBus.ts
ª   ª   ª   EventPipeline.ts
ª   ª   ª   index.ts
ª   ª   ª   MaintenanceEvents.ts
ª   ª   ª   RuntimeEvent.ts
ª   ª   ª   RuntimeEventBus.ts
ª   ª   ª   RuntimeEventRegistry.ts
ª   ª   ª   
ª   ª   +---bus
ª   ª   ª       ERPEventBus.ts
ª   ª   ª       
ª   ª   +---store
ª   +---execution
ª   ª       PersistentWorkflowExecutor.ts
ª   ª       RuntimeExecutor.ts
ª   ª       
ª   +---firebase
ª   ª       runtime-firestore.ts
ª   ª       
ª   +---firestore
ª   ª   ª   FirestoreRuntimeMutation.ts
ª   ª   ª   FirestoreRuntimeQuery.ts
ª   ª   ª   FirestoreRuntimeRealtime.ts
ª   ª   ª   FirestoreRuntimeRepository.ts
ª   ª   ª   index.ts
ª   ª   ª   
ª   ª   +---generated
ª   ª       +---achats
ª   ª       +---clients
ª   ª       +---commandes
ª   ª       +---depenses
ª   ª       +---devis
ª   ª       +---employes
ª   ª       +---factures
ª   ª       +---fournisseurs
ª   ª       +---incidents
ª   ª       +---intrants
ª   ª       +---livraisons
ª   ª       +---parcelles
ª   ª       +---recettes
ª   ª       +---recoltes
ª   ª       +---taches
ª   ª       +---vehicules
ª   +---forms
ª   ª       DynamicField.ts
ª   ª       DynamicFormDefinition.ts
ª   ª       DynamicFormEngine.ts
ª   ª       DynamicFormRegistry.ts
ª   ª       DynamicFormRegistry.ts.bak
ª   ª       ERPFormEngine.tsx
ª   ª       
ª   +---generated
ª   ª       GeneratedRuntimeTopology.ts
ª   ª       
ª   +---generation
ª   ª       ERPDashboardGenerationEngine.ts
ª   ª       ERPFormGenerationEngine.ts
ª   ª       ERPMenuGenerationEngine.ts
ª   ª       ERPModuleGenerationEngine.ts
ª   ª       ERPModuleRuntimeFactory.tsx
ª   ª       ERPPageGenerationEngine.tsx
ª   ª       ERPPermissionsGenerationEngine.ts
ª   ª       ERPRoutesGenerationEngine.ts
ª   ª       ERPTableGenerationEngine.ts
ª   ª       ERPWorkflowGenerationEngine.ts
ª   ª       index.ts
ª   ª       
ª   +---governance
ª   ª   ª   EnterpriseGovernanceEngine.ts
ª   ª   ª   simulateGovernance.ts
ª   ª   ª   
ª   ª   +---boundaries
ª   ª   ª       DomainBoundaryValidator.ts
ª   ª   ª       
ª   ª   +---contracts
ª   ª   ª       RuntimeContractValidator.ts
ª   ª   ª       
ª   ª   +---duplication
ª   ª   ª       AntiDuplicationGuard.ts
ª   ª   ª       
ª   ª   +---naming
ª   ª   ª       NamingConventionChecker.ts
ª   ª   ª       
ª   ª   +---patterns
ª   ª   ª       SharedPatternRegistry.ts
ª   ª   ª       
ª   ª   +---policies
ª   ª           ArchitecturePolicyEngine.ts
ª   ª           
ª   +---integrations
ª   ª   +---adapters
ª   ª   ª       ProviderAdapter.ts
ª   ª   ª       
ª   ª   +---api
ª   ª   ª       ApiGateway.ts
ª   ª   ª       
ª   ª   +---bridges
ª   ª   ª       ExternalEventBridge.ts
ª   ª   ª       IntegrationBus.ts
ª   ª   ª       
ª   ª   +---connectors
ª   ª   ª       ConnectorRegistry.ts
ª   ª   ª       
ª   ª   +---federation
ª   ª   ª       FederationEngine.ts
ª   ª   ª       
ª   ª   +---sync
ª   ª   ª       SyncEngine.ts
ª   ª   ª       
ª   ª   +---webhooks
ª   ª           WebhookManager.ts
ª   ª           
ª   +---listeners
ª   ª       MaintenanceAuditListener.ts
ª   ª       MaintenanceNotificationListener.ts
ª   ª       
ª   +---metadata
ª   ª       ERPMetadataGenerationBridge.ts
ª   ª       ERPMetadataRegistry.ts
ª   ª       ERPModuleSchemas.ts
ª   ª       
ª   +---metrics
ª   ª       RuntimeMetrics.ts
ª   ª       
ª   +---modules
ª   ª   ª   ERPModule.ts
ª   ª   ª   ERPModuleDefinition.ts
ª   ª   ª   ERPModuleRegistry.ts
ª   ª   ª   index.ts
ª   ª   ª   registerCoreERPModules.ts
ª   ª   ª   registerCoreERPModules.ts.bak
ª   ª   ª   
ª   ª   +---adapters
ª   ª   ª       CoreModuleRuntimeAdapter.ts
ª   ª   ª       CoreModuleRuntimeAdapter.ts.bak
ª   ª   ª       
ª   ª   +---builders
ª   ª   ª       ERPModuleBuilder.ts
ª   ª   ª       
ª   ª   +---definitions
ª   ª   ª       coreModules.ts
ª   ª   ª       coreModules.ts.bak
ª   ª   ª       
ª   ª   +---factories
ª   ª   ª       RuntimeFormFactory.ts
ª   ª   ª       RuntimePageFactory.ts
ª   ª   ª       RuntimeTableFactory.ts
ª   ª   ª       
ª   ª   +---factory
ª   ª   ª       businessFields.ts
ª   ª   ª       createBusinessModule.ts
ª   ª   ª       index.ts
ª   ª   ª       
ª   ª   +---generated
ª   ª   ª   +---achats
ª   ª   ª   +---clients
ª   ª   ª   +---commandes
ª   ª   ª   +---depenses
ª   ª   ª   +---devis
ª   ª   ª   +---employes
ª   ª   ª   +---factures
ª   ª   ª   +---fournisseurs
ª   ª   ª   +---incidents
ª   ª   ª   +---intrants
ª   ª   ª   +---livraisons
ª   ª   ª   +---parcelles
ª   ª   ª   +---recettes
ª   ª   ª   +---recoltes
ª   ª   ª   +---taches
ª   ª   ª   +---vehicules
ª   ª   +---lifecycle
ª   ª   ª       ERPModuleAuditor.ts
ª   ª   ª       ERPModuleDependencyGraph.ts
ª   ª   ª       ERPModuleLifecycleManager.ts
ª   ª   ª       ERPRelationDataLoader.ts
ª   ª   ª       ERPRelationResolver.ts
ª   ª   ª       
ª   ª   +---metadata
ª   ª   ª       ERPModuleMetadata.ts
ª   ª   ª       
ª   ª   +---registry
ª   ª   ª       registerCoreModules.ts
ª   ª   ª       
ª   ª   +---renderer
ª   ª   ª       ERPModuleDetailRenderer.tsx
ª   ª   ª       ERPModuleListRenderer.tsx
ª   ª   ª       
ª   ª   +---renderers
ª   ª   ª       ERPModuleRenderer.ts
ª   ª   ª       
ª   ª   +---schemas
ª   ª   ª       ERPModuleSchema.ts
ª   ª   ª       
ª   ª   +---v2
ª   ª           contratsModuleV2.ts
ª   ª           exploitationsModuleV2.ts
ª   ª           README.md
ª   ª           terragestBusinessModelV2.ts
ª   ª           terrainsModuleV2.ts
ª   ª           
ª   +---monitoring
ª   ª   ª   ConnectedRuntimeEventPublisher.ts
ª   ª   ª   ERPMonitoringSnapshot.ts
ª   ª   ª   index.ts
ª   ª   ª   PersistentRuntimePublisher.ts
ª   ª   ª   RuntimeEventPublisher.ts
ª   ª   ª   simulateRuntimeActivity.ts
ª   ª   ª   WorkflowAnalytics.ts
ª   ª   ª   
ª   ª   +---errors
ª   ª   ª       ERPErrorAnalytics.ts
ª   ª   ª       
ª   ª   +---health
ª   ª   ª       ERPHealthCenter.ts
ª   ª   ª       ERPHealthCheck.ts
ª   ª   ª       
ª   ª   +---metrics
ª   ª   ª       ERPMonitoringMetrics.ts
ª   ª   ª       
ª   ª   +---topology
ª   ª           ERPDependencyGraph.ts
ª   ª           
ª   +---mutations
ª   ª       index.ts
ª   ª       RuntimeMutationEngine.ts
ª   ª       
ª   +---navigation
ª   ª       ERPRelationNavigation.tsx
ª   ª       RuntimeNavigationEngine.ts
ª   ª       RuntimeNavigationLink.ts
ª   ª       
ª   +---notifications
ª   ª       ERPNotificationsPanel.tsx
ª   ª       RuntimeNotification.ts
ª   ª       RuntimeNotificationEngine.ts
ª   ª       
ª   +---observability
ª   ª   ª   ERPAlertStore.ts
ª   ª   ª   ERPObservabilityTimeline.ts
ª   ª   ª   ERPRuntimeAuditBridge.ts
ª   ª   ª   ERPRuntimeAuditTrail.ts
ª   ª   ª   ERPRuntimeSeed.ts
ª   ª   ª   ERPTraceStore.ts
ª   ª   ª   index.ts
ª   ª   ª   RuntimeLog.ts
ª   ª   ª   RuntimeLogsPanel.tsx
ª   ª   ª   RuntimeObservabilityEngine.ts
ª   ª   ª   seedERPRuntimeObservability.ts
ª   ª   ª   
ª   ª   +---alerts
ª   ª   ª       ERPAlert.ts
ª   ª   ª       ERPAlertStore.ts
ª   ª   ª       
ª   ª   +---generated
ª   ª   ª   +---achats
ª   ª   ª   ª       achats.observability.ts
ª   ª   ª   ª       
ª   ª   ª   +---clients
ª   ª   ª   ª       clients.observability.ts
ª   ª   ª   ª       
ª   ª   ª   +---commandes
ª   ª   ª   ª       commandes.observability.ts
ª   ª   ª   ª       
ª   ª   ª   +---depenses
ª   ª   ª   ª       depenses.observability.ts
ª   ª   ª   ª       
ª   ª   ª   +---devis
ª   ª   ª   ª       devis.observability.ts
ª   ª   ª   ª       
ª   ª   ª   +---employes
ª   ª   ª   ª       employes.observability.ts
ª   ª   ª   ª       
ª   ª   ª   +---factures
ª   ª   ª   ª       factures.observability.ts
ª   ª   ª   ª       
ª   ª   ª   +---fournisseurs
ª   ª   ª   ª       fournisseurs.observability.ts
ª   ª   ª   ª       
ª   ª   ª   +---incidents
ª   ª   ª   ª       incidents.observability.ts
ª   ª   ª   ª       
ª   ª   ª   +---intrants
ª   ª   ª   ª       intrants.observability.ts
ª   ª   ª   ª       
ª   ª   ª   +---livraisons
ª   ª   ª   ª       livraisons.observability.ts
ª   ª   ª   ª       
ª   ª   ª   +---parcelles
ª   ª   ª   ª       parcelles.observability.ts
ª   ª   ª   ª       
ª   ª   ª   +---recettes
ª   ª   ª   ª       recettes.observability.ts
ª   ª   ª   ª       
ª   ª   ª   +---recoltes
ª   ª   ª   ª       recoltes.observability.ts
ª   ª   ª   ª       
ª   ª   ª   +---taches
ª   ª   ª   ª       taches.observability.ts
ª   ª   ª   ª       
ª   ª   ª   +---vehicules
ª   ª   ª           vehicules.observability.ts
ª   ª   ª           
ª   ª   +---timeline
ª   ª   ª       ERPObservabilityTimeline.ts
ª   ª   ª       
ª   ª   +---traces
ª   ª           ERPTrace.ts
ª   ª           ERPTraceStore.ts
ª   ª           
ª   +---orchestration
ª   ª       MaterielBreakdownFlow.ts
ª   ª       PersistentMaterielBreakdownFlow.ts
ª   ª       ProcessOrchestrator.ts
ª   ª       RuntimeModuleOrchestrator.ts
ª   ª       simulatePersistentBreakdownFlow.ts
ª   ª       WorkflowDispatcher.ts
ª   ª       
ª   +---os
ª   ª   +---access
ª   ª   ª       AccessController.ts
ª   ª   ª       
ª   ª   +---audit
ª   ª   ª       AuditStream.ts
ª   ª   ª       PersistentAuditStream.ts
ª   ª   ª       
ª   ª   +---context
ª   ª   ª       OrganizationContext.ts
ª   ª   ª       
ª   ª   +---governance
ª   ª   ª       GovernanceEngine.ts
ª   ª   ª       
ª   ª   +---permissions
ª   ª   ª       PermissionEngine.ts
ª   ª   ª       
ª   ª   +---security
ª   ª   ª       SecurityPolicy.ts
ª   ª   ª       
ª   ª   +---tenants
ª   ª           RuntimeIsolationManager.ts
ª   ª           TenantManager.ts
ª   ª           
ª   +---os-enterprise
ª   ª       ERPCommand.ts
ª   ª       ERPCommandCenter.ts
ª   ª       ERPNotification.ts
ª   ª       ERPNotificationCenter.ts
ª   ª       ERPSavedView.ts
ª   ª       ERPSavedViews.ts
ª   ª       ERPUserContext.ts
ª   ª       index.ts
ª   ª       
ª   +---permissions
ª   ª       ERPProtectedAction.tsx
ª   ª       RuntimePermission.ts
ª   ª       runtimePermissions.ts
ª   ª       RuntimePermissionsEngine.ts
ª   ª       
ª   +---persistence
ª   ª   ª   ERPPersistenceSeed.ts
ª   ª   ª   FirestoreHealthCheck.ts
ª   ª   ª   index.ts
ª   ª   ª   
ª   ª   +---analytics
ª   ª   ª       AnalyticsRepository.ts
ª   ª   ª       
ª   ª   +---audit
ª   ª   ª       AuditRepository.ts
ª   ª   ª       
ª   ª   +---drivers
ª   ª   ª       ERPInMemoryPersistenceDriver.ts
ª   ª   ª       ERPPersistenceDriver.ts
ª   ª   ª       
ª   ª   +---events
ª   ª   ª       RuntimeEventRepository.ts
ª   ª   ª       
ª   ª   +---processes
ª   ª   ª       ProcessRepository.ts
ª   ª   ª       
ª   ª   +---projections
ª   ª   ª       ProjectionRepository.ts
ª   ª   ª       
ª   ª   +---repositories
ª   ª   ª       ERPRuntimeRepository.ts
ª   ª   ª       
ª   ª   +---snapshots
ª   ª   ª       ERPPersistenceSnapshot.ts
ª   ª   ª       
ª   ª   +---stores
ª   ª   ª       ERPPersistenceCollections.ts
ª   ª   ª       ERPRuntimePersistenceService.ts
ª   ª   ª       
ª   ª   +---workflows
ª   ª           WorkflowRepository.ts
ª   ª           
ª   +---policies
ª   ª   ª   ERPPolicyEngine.ts
ª   ª   ª   ERPRuntimeAuthorizationBridge.ts
ª   ª   ª   index.ts
ª   ª   ª   
ª   ª   +---generated
ª   ª       +---achats
ª   ª       ª       achats.policy.ts
ª   ª       ª       
ª   ª       +---clients
ª   ª       ª       clients.policy.ts
ª   ª       ª       
ª   ª       +---commandes
ª   ª       ª       commandes.policy.ts
ª   ª       ª       
ª   ª       +---depenses
ª   ª       ª       depenses.policy.ts
ª   ª       ª       
ª   ª       +---devis
ª   ª       ª       devis.policy.ts
ª   ª       ª       
ª   ª       +---employes
ª   ª       ª       employes.policy.ts
ª   ª       ª       
ª   ª       +---factures
ª   ª       ª       factures.policy.ts
ª   ª       ª       
ª   ª       +---fournisseurs
ª   ª       ª       fournisseurs.policy.ts
ª   ª       ª       
ª   ª       +---incidents
ª   ª       ª       incidents.policy.ts
ª   ª       ª       
ª   ª       +---intrants
ª   ª       ª       intrants.policy.ts
ª   ª       ª       
ª   ª       +---livraisons
ª   ª       ª       livraisons.policy.ts
ª   ª       ª       
ª   ª       +---parcelles
ª   ª       ª       parcelles.policy.ts
ª   ª       ª       
ª   ª       +---recettes
ª   ª       ª       recettes.policy.ts
ª   ª       ª       
ª   ª       +---recoltes
ª   ª       ª       recoltes.policy.ts
ª   ª       ª       
ª   ª       +---taches
ª   ª       ª       taches.policy.ts
ª   ª       ª       
ª   ª       +---vehicules
ª   ª               vehicules.policy.ts
ª   ª               
ª   +---processes
ª   ª   ª   PersistentProcessExecutor.ts
ª   ª   ª   
ª   ª   +---approvals
ª   ª   ª       ApprovalEngine.ts
ª   ª   ª       
ª   ª   +---definitions
ª   ª   ª       MaterielMaintenanceProcess.ts
ª   ª   ª       ProcessDefinition.ts
ª   ª   ª       
ª   ª   +---escalations
ª   ª   ª       EscalationManager.ts
ª   ª   ª       
ª   ª   +---human-tasks
ª   ª   ª       HumanTaskManager.ts
ª   ª   ª       
ª   ª   +---lifecycle
ª   ª   ª       LifecycleManager.ts
ª   ª   ª       
ª   ª   +---sla
ª   ª   ª       SLAEngine.ts
ª   ª   ª       
ª   ª   +---state-machine
ª   ª   ª       StateMachine.ts
ª   ª   ª       
ª   ª   +---transitions
ª   ª           TransitionManager.ts
ª   ª           
ª   +---production
ª   ª   ª   index.ts
ª   ª   ª   ProductionLogger.ts
ª   ª   ª   ProductionReadiness.ts
ª   ª   ª   readiness.ts
ª   ª   ª   RuntimeCache.ts
ª   ª   ª   RuntimeErrorReporter.ts
ª   ª   ª   RuntimeHealthMonitor.ts
ª   ª   ª   RuntimeRateLimiter.ts
ª   ª   ª   
ª   ª   +---backup
ª   ª   ª       ERPBackupPlan.ts
ª   ª   ª       ERPBackupPlanRegistry.ts
ª   ª   ª       
ª   ª   +---cloud
ª   ª   ª       ERPCloudReadinessCheck.ts
ª   ª   ª       ERPCloudReadinessRegistry.ts
ª   ª   ª       
ª   ª   +---governance
ª   ª   ª       ERPProductionPolicy.ts
ª   ª   ª       ERPProductionPolicyRegistry.ts
ª   ª   ª       
ª   ª   +---limits
ª   ª   ª       ERPRateLimit.ts
ª   ª   ª       ERPRateLimitRegistry.ts
ª   ª   ª       
ª   ª   +---quotas
ª   ª   ª       ERPTenantQuota.ts
ª   ª   ª       ERPTenantQuotaRegistry.ts
ª   ª   ª       
ª   ª   +---readiness
ª   ª           ERPProductionReadinessSnapshot.ts
ª   ª           
ª   +---quality
ª   ª   ª   simulateQualityPlatform.ts
ª   ª   ª   
ª   ª   +---build
ª   ª   ª       EnterpriseBuildPipeline.ts
ª   ª   ª       
ª   ª   +---checks
ª   ª   ª       WorkflowConsistencyCheck.ts
ª   ª   ª       
ª   ª   +---gates
ª   ª   ª       QualityGateEngine.ts
ª   ª   ª       
ª   ª   +---health
ª   ª   ª       DependencyHealthChecker.ts
ª   ª   ª       
ª   ª   +---integrity
ª   ª   ª       RuntimeIntegrityCheck.ts
ª   ª   ª       
ª   ª   +---validation
ª   ª           RuntimeValidator.ts
ª   ª           
ª   +---query
ª   ª       index.ts
ª   ª       RuntimeQueryEngine.ts
ª   ª       
ª   +---realtime
ª   ª   ª   ERPRealtimeSeed.ts
ª   ª   ª   index.ts
ª   ª   ª   simulateRealtimeRuntime.ts
ª   ª   ª   
ª   ª   +---bus
ª   ª   ª       ERPRealtimeBus.ts
ª   ª   ª       
ª   ª   +---channels
ª   ª   ª       ERPRealtimeChannel.ts
ª   ª   ª       RuntimeChannelManager.ts
ª   ª   ª       
ª   ª   +---engine
ª   ª   ª       RuntimeRealtimeEngine.ts
ª   ª   ª       
ª   ª   +---gateway
ª   ª   ª       RuntimeRealtimeGateway.ts
ª   ª   ª       
ª   ª   +---hooks
ª   ª   ª       useRuntimeRealtimeCollection.ts
ª   ª   ª       
ª   ª   +---metrics
ª   ª   ª       LiveMetricsStream.ts
ª   ª   ª       
ª   ª   +---notifications
ª   ª   ª       LiveNotificationService.ts
ª   ª   ª       
ª   ª   +---presence
ª   ª   ª       ERPRealtimePresence.ts
ª   ª   ª       
ª   ª   +---snapshots
ª   ª   ª       ERPRealtimeSnapshot.ts
ª   ª   ª       
ª   ª   +---streams
ª   ª   ª       LiveWorkflowUpdates.ts
ª   ª   ª       
ª   ª   +---websocket
ª   ª           RuntimeWebSocketServer.ts
ª   ª           
ª   +---registry
ª   ª   ª   ERPRegistry.ts
ª   ª   ª   index.ts
ª   ª   ª   types.ts
ª   ª   ª   WorkflowRegistry.ts
ª   ª   ª   
ª   ª   +---actions
ª   ª   +---automation
ª   ª   +---events
ª   ª   +---modules
ª   ª   ª       ERPRegistryModules.ts
ª   ª   ª       ERPRegistryModules.ts.bak
ª   ª   ª       
ª   ª   +---navigation
ª   ª   +---permissions
ª   ª   +---schemas
ª   ª   +---workflows
ª   +---relations
ª   ª       RuntimeRelation.ts
ª   ª       runtimeRelations.ts
ª   ª       RuntimeRelationsEngine.ts
ª   ª       
ª   +---repositories
ª   ª       index.ts
ª   ª       RuntimeRepository.ts
ª   ª       
ª   +---resilience
ª   ª   ª   CircuitBreaker.ts
ª   ª   ª   ERPRuntimeResilienceSeed.ts
ª   ª   ª   index.ts
ª   ª   ª   RetryPolicy.ts
ª   ª   ª   
ª   ª   +---circuit-breaker
ª   ª   ª       ERPCircuitBreaker.ts
ª   ª   ª       
ª   ª   +---dlq
ª   ª   ª       DeadLetterQueue.ts
ª   ª   ª       ERPDeadLetterStore.ts
ª   ª   ª       
ª   ª   +---queue
ª   ª   ª       ERPQueueJob.ts
ª   ª   ª       ERPQueueStore.ts
ª   ª   ª       
ª   ª   +---retry
ª   ª   ª       ERPRetryPolicy.ts
ª   ª   ª       RetryEngine.ts
ª   ª   ª       
ª   ª   +---worker
ª   ª           ERPQueueWorker.ts
ª   ª           
ª   +---rules
ª   ª   ª   BusinessRule.ts
ª   ª   ª   ERPBusinessRuleEngine.ts
ª   ª   ª   ERPRuntimeValidationBridge.ts
ª   ª   ª   index.ts
ª   ª   ª   MaterielCriticalRule.ts
ª   ª   ª   
ª   ª   +---context
ª   ª   ª       ContextResolver.ts
ª   ª   ª       
ª   ª   +---decisions
ª   ª   ª       DecisionEngine.ts
ª   ª   ª       
ª   ª   +---engine
ª   ª   ª       RuleExecutor.ts
ª   ª   ª       
ª   ª   +---evaluators
ª   ª   ª       ConditionEvaluator.ts
ª   ª   ª       RuleEvaluator.ts
ª   ª   ª       
ª   ª   +---pipelines
ª   ª   ª       RulePipeline.ts
ª   ª   ª       
ª   ª   +---policies
ª   ª   ª       PolicyEngine.ts
ª   ª   ª       
ª   ª   +---registry
ª   ª   ª       RuleRegistry.ts
ª   ª   ª       
ª   ª   +---types
ª   ª           Rule.ts
ª   ª           
ª   +---scheduler
ª   ª       RuntimeScheduler.ts
ª   ª       RuntimeSchedulerBootstrap.tsx
ª   ª       
ª   +---schemas
ª   ª       ERPBusinessSchema.ts
ª   ª       ERPBusinessSchemaRegistry.ts
ª   ª       ERPBusinessSchemaRegistry.ts.bak
ª   ª       index.ts
ª   ª       
ª   +---security
ª   ª   ª   ERPSecuritySeed.ts
ª   ª   ª   ERPSecuritySnapshot.ts
ª   ª   ª   index.ts
ª   ª   ª   RuntimeSecurityManager.ts
ª   ª   ª   
ª   ª   +---audit
ª   ª   ª       ERPSecurityAuditLog.ts
ª   ª   ª       ERPSecurityAuditStore.ts
ª   ª   ª       
ª   ª   +---guards
ª   ª   ª       ERPAccessGuard.ts
ª   ª   ª       
ª   ª   +---permissions
ª   ª   ª       ERPPermission.ts
ª   ª   ª       ERPPermissionRegistry.ts
ª   ª   ª       
ª   ª   +---policies
ª   ª   ª       ERPPolicy.ts
ª   ª   ª       ERPPolicyRegistry.ts
ª   ª   ª       
ª   ª   +---roles
ª   ª   ª       ERPRole.ts
ª   ª   ª       ERPRoleRegistry.ts
ª   ª   ª       
ª   ª   +---sessions
ª   ª           ERPSecuritySession.ts
ª   ª           ERPSessionContext.ts
ª   ª           
ª   +---security-runtime
ª   ª       index.ts
ª   ª       RuntimeActionGuard.ts
ª   ª       RuntimeActionPermissionMapper.ts
ª   ª       RuntimePermission.ts
ª   ª       RuntimePolicyEngine.ts
ª   ª       RuntimePolicyRegistry.ts
ª   ª       RuntimeRole.ts
ª   ª       RuntimeSecurityContext.ts
ª   ª       RuntimeWorkflowGuard.ts
ª   ª       
ª   +---selects
ª   ª       DynamicSelect.types.ts
ª   ª       DynamicSelectEngine.ts
ª   ª       ERPDynamicSelect.tsx
ª   ª       
ª   +---shared
ª   ª       ERPRuntimeCollection.ts
ª   ª       ERPRuntimeEntity.ts
ª   ª       ERPRuntimeStore.ts
ª   ª       ERPRuntimeStore.ts$
ª   ª       ERPRuntimeTypes.ts
ª   ª       
ª   +---smart-intelligence
ª   ª       index.ts
ª   ª       SmartAnomalyDetector.ts
ª   ª       SmartIntelligenceTypes.ts
ª   ª       SmartOperationalIntelligence.ts
ª   ª       SmartPredictionEngine.ts
ª   ª       SmartRecommendationEngine.ts
ª   ª       SmartScoringEngine.ts
ª   ª       
ª   +---smart-runtime
ª   ª       ERPSmartInsight.ts
ª   ª       ERPSmartPriorityEngine.ts
ª   ª       ERPSmartRecommendations.ts
ª   ª       ERPSmartRuntimeEngine.ts
ª   ª       index.ts
ª   ª       
ª   +---state
ª   ª       ERPStateBadge.tsx
ª   ª       RuntimeState.ts
ª   ª       RuntimeStateEngine.ts
ª   ª       runtimeStates.ts
ª   ª       
ª   +---streams
ª   ª   ª   ERPStreamsSeed.ts
ª   ª   ª   ERPStreamsSnapshot.ts
ª   ª   ª   index.ts
ª   ª   ª   
ª   ª   +---channels
ª   ª   ª       ERPStreamChannel.ts
ª   ª   ª       ERPStreamRegistry.ts
ª   ª   ª       
ª   ª   +---events
ª   ª   ª       ERPStreamEvent.ts
ª   ª   ª       
ª   ª   +---gateway
ª   ª   ª       ERPRealtimeGateway.ts
ª   ª   ª       
ª   ª   +---history
ª   ª   ª       ERPStreamHistoryStore.ts
ª   ª   ª       
ª   ª   +---metrics
ª   ª           ERPStreamMetricsStore.ts
ª   ª           
ª   +---supervision
ª   ª       WorkflowSupervisor.ts
ª   ª       
ª   +---table
ª   ª   +---engine
ª   ª   ª       RuntimeTableEngine.ts
ª   ª   ª       
ª   ª   +---filters
ª   ª   ª       RuntimeTableFilters.ts
ª   ª   ª       
ª   ª   +---hooks
ª   ª   ª       useRuntimeTable.ts
ª   ª   ª       
ª   ª   +---pagination
ª   ª   ª       RuntimeTablePagination.ts
ª   ª   ª       
ª   ª   +---search
ª   ª   ª       RuntimeTableSearch.ts
ª   ª   ª       
ª   ª   +---sorting
ª   ª   ª       RuntimeTableSorting.ts
ª   ª   ª       
ª   ª   +---state
ª   ª   ª       RuntimeTableState.ts
ª   ª   ª       
ª   ª   +---types
ª   ª           RuntimeTableTypes.ts
ª   ª           
ª   +---tenant
ª   ª   ª   ERPTenantSeed.ts
ª   ª   ª   ERPTenantSnapshot.ts
ª   ª   ª   index.ts
ª   ª   ª   
ª   ª   +---context
ª   ª   ª       ERPTenantContext.ts
ª   ª   ª       
ª   ª   +---isolation
ª   ª   ª       ERPTenantIsolation.ts
ª   ª   ª       
ª   ª   +---metrics
ª   ª   ª       ERPTenantMetrics.ts
ª   ª   ª       ERPTenantMetricsStore.ts
ª   ª   ª       
ª   ª   +---registry
ª   ª           ERPTenant.ts
ª   ª           ERPTenantRegistry.ts
ª   ª           
ª   +---testing
ª   ª   ª   ERPTestingSeed.ts
ª   ª   ª   ERPTestingSnapshot.ts
ª   ª   ª   index.ts
ª   ª   ª   
ª   ª   +---engine
ª   ª   ª       ERPTestingEngine.ts
ª   ª   ª       ERPTestingTypes.ts
ª   ª   ª       
ª   ª   +---history
ª   ª   ª       ERPTestingHistoryStore.ts
ª   ª   ª       
ª   ª   +---registry
ª   ª   ª       ERPTestingRegistry.ts
ª   ª   ª       
ª   ª   +---reports
ª   ª   ª       ERPTestingReportBuilder.ts
ª   ª   ª       
ª   ª   +---simulation
ª   ª           ERPRuntimeSimulation.ts
ª   ª           
ª   +---tests
ª   ª   +---generated
ª   ª       +---achats
ª   ª       +---clients
ª   ª       +---commandes
ª   ª       +---depenses
ª   ª       +---devis
ª   ª       +---employes
ª   ª       +---factures
ª   ª       +---fournisseurs
ª   ª       +---incidents
ª   ª       +---intrants
ª   ª       +---livraisons
ª   ª       +---parcelles
ª   ª       +---recettes
ª   ª       +---recoltes
ª   ª       +---taches
ª   ª       +---vehicules
ª   +---tracing
ª   ª       ExecutionTrace.ts
ª   ª       
ª   +---ui
ª   ª       ERPDynamicFormFactory.tsx
ª   ª       ERPDynamicTableFactory.tsx
ª   ª       ERPUIComposition.ts
ª   ª       index.ts
ª   ª       
ª   +---ui-generation
ª   ª       ERPDefaultSchemas.ts
ª   ª       ERPDefaultSchemas.ts.bak
ª   ª       ERPFieldDefinition.ts
ª   ª       ERPGeneratedSchema.ts
ª   ª       ERPGeneratedSchemaResolver.ts
ª   ª       ERPGeneratedSchemaResolver.ts.bak
ª   ª       index.ts
ª   ª       
ª   +---validation
ª   ª       RuntimeFieldValidator.ts
ª   ª       RuntimeValidationEngine.ts
ª   ª       RuntimeValidationTypes.ts
ª   ª       
ª   +---visibility
ª   ª       RuntimeVisibilityEngine.ts
ª   ª       
ª   +---workers
ª   ª   ª   ERPWorkersSeed.ts
ª   ª   ª   ERPWorkersSnapshot.ts
ª   ª   ª   index.ts
ª   ª   ª   
ª   ª   +---engine
ª   ª   ª       ERPWorkerEngine.ts
ª   ª   ª       ERPWorkerTypes.ts
ª   ª   ª       
ª   ª   +---history
ª   ª   ª       ERPWorkerHistoryStore.ts
ª   ª   ª       
ª   ª   +---metrics
ª   ª   ª       ERPWorkerMetricsStore.ts
ª   ª   ª       
ª   ª   +---registry
ª   ª   ª       ERPWorkerRegistry.ts
ª   ª   ª       
ª   ª   +---scheduler
ª   ª           ERPSchedulerRegistry.ts
ª   ª           
ª   +---workflow-persistence
ª   ª       WorkflowHistoryEntry.ts
ª   ª       WorkflowPersistenceEngine.ts
ª   ª       WorkflowRuntimeService.ts
ª   ª       
ª   +---workflow-runtime
ª   ª       index.ts
ª   ª       WorkflowRuntimeAudit.ts
ª   ª       WorkflowRuntimeDefinitions.ts
ª   ª       WorkflowRuntimeEngine.ts
ª   ª       WorkflowRuntimeRegistry.ts
ª   ª       WorkflowRuntimeStore.ts
ª   ª       WorkflowRuntimeTypes.ts
ª   ª       WorkflowRuntimeValidator.ts
ª   ª       
ª   +---workflow-ui
ª   ª       ERPWorkflowActions.tsx
ª   ª       maintenance.workflow.ts
ª   ª       Workflow.types.ts
ª   ª       WorkflowRuntimeEngine.ts
ª   ª       
ª   +---workflows
ª       ª   ERPWorkflowRuntimeEngine.ts
ª       ª   WorkflowEngine.ts
ª       ª   
ª       +---engine
ª       ª       WorkflowExecutor.ts
ª       ª       
ª       +---enterprise
ª       ª   ª   ERPRuntimeWorkflowSeed.ts
ª       ª   ª   index.ts
ª       ª   ª   
ª       ª   +---engine
ª       ª   ª       ERPWorkflowEngine.ts
ª       ª   ª       ERPWorkflowTypes.ts
ª       ª   ª       
ª       ª   +---registry
ª       ª   ª       ERPWorkflowRegistry.ts
ª       ª   ª       
ª       ª   +---store
ª       ª   ª       ERPWorkflowExecutionStore.ts
ª       ª   ª       
ª       ª   +---timeline
ª       ª           ERPWorkflowTimelineStore.ts
ª       ª           
ª       +---generated
ª       ª   +---achats
ª       ª   ª       achats.workflow.ts
ª       ª   ª       
ª       ª   +---clients
ª       ª   ª       clients.workflow.ts
ª       ª   ª       
ª       ª   +---commandes
ª       ª   ª       commandes.workflow.ts
ª       ª   ª       
ª       ª   +---depenses
ª       ª   ª       depenses.workflow.ts
ª       ª   ª       
ª       ª   +---devis
ª       ª   ª       devis.workflow.ts
ª       ª   ª       
ª       ª   +---employes
ª       ª   ª       employes.workflow.ts
ª       ª   ª       
ª       ª   +---factures
ª       ª   ª       factures.workflow.ts
ª       ª   ª       
ª       ª   +---fournisseurs
ª       ª   ª       fournisseurs.workflow.ts
ª       ª   ª       
ª       ª   +---incidents
ª       ª   ª       incidents.workflow.ts
ª       ª   ª       
ª       ª   +---intrants
ª       ª   ª       intrants.workflow.ts
ª       ª   ª       
ª       ª   +---livraisons
ª       ª   ª       livraisons.workflow.ts
ª       ª   ª       
ª       ª   +---parcelles
ª       ª   ª       parcelles.workflow.ts
ª       ª   ª       
ª       ª   +---recettes
ª       ª   ª       recettes.workflow.ts
ª       ª   ª       
ª       ª   +---recoltes
ª       ª   ª       recoltes.workflow.ts
ª       ª   ª       
ª       ª   +---taches
ª       ª   ª       taches.workflow.ts
ª       ª   ª       
ª       ª   +---vehicules
ª       ª           vehicules.workflow.ts
ª       ª           
ª       +---persistence
ª       ª       WorkflowExecutionPersistence.ts
ª       ª       
ª       +---sagas
ª       ª       SagaCoordinator.ts
ª       ª       
ª       +---state
ª       ª       WorkflowStateStore.ts
ª       ª       
ª       +---types
ª               WorkflowDefinition.ts
ª               WorkflowExecution.ts
ª               WorkflowStep.ts
ª               
+---saas
ª   +---billing
ª   ª       BillingEngine.ts
ª   ª       
ª   +---deployment
ª   ª       DeploymentService.ts
ª   ª       
ª   +---features
ª   ª       FeatureFlagService.ts
ª   ª       
ª   +---monitoring
ª   ª       CloudMonitoringService.ts
ª   ª       MonitoringService.ts
ª   ª       
ª   +---services
ª   ª       SaaSOrchestrationService.ts
ª   ª       
ª   +---subscriptions
ª   ª       SubscriptionService.ts
ª   ª       
ª   +---tenants
ª           TenantService.ts
ª           
+---security
ª   +---audit
ª   ª       AuditService.ts
ª   ª       
ª   +---rbac
ª   ª       UserRole.ts
ª   ª       
ª   +---tenant
ª           TenantProvider.tsx
ª           
+---seeds
ª   +---v2
ª           contratsSeedV2.ts
ª           exploitationsSeedV2.ts
ª           README.md
ª           terrainsSeedV2.ts
ª           
+---services
ª       AuthService.ts
ª       StockService.ts
ª       UtilisateurService.ts
ª       
+---shared
ª   ª   README.md
ª   ª   
ª   +---api
ª   ª   ª   ApiWrapper.ts
ª   ª   ª   
ª   ª   +---logging
ª   ª   ª       ApiLogger.ts
ª   ª   ª       
ª   ª   +---middlewares
ª   ª   ª       AuthMiddleware.ts
ª   ª   ª       LoggingMiddleware.ts
ª   ª   ª       TenantMiddleware.ts
ª   ª   ª       
ª   ª   +---responses
ª   ª   ª       ApiResponse.ts
ª   ª   ª       
ª   ª   +---versioning
ª   ª           ApiVersion.ts
ª   ª           
ª   +---constants
ª   ª       firestoreCollections.ts
ª   ª       
ª   +---errors
ª   ª       AppError.ts
ª   ª       ErrorHandler.ts
ª   ª       
ª   +---hooks
ª   ª       useDebounce.ts
ª   ª       useFilters.ts
ª   ª       usePagination.ts
ª   ª       
ª   +---lib
ª   ª   +---filters
ª   ª   ª       filter.types.ts
ª   ª   ª       
ª   ª   +---pagination
ª   ª   ª       pagination.types.ts
ª   ª   ª       
ª   ª   +---query
ª   ª   ª       AppQueryProvider.tsx
ª   ª   ª       query-client.ts
ª   ª   ª       query-keys.ts
ª   ª   ª       
ª   ª   +---sorting
ª   ª   ª       sort.types.ts
ª   ª   ª       
ª   ª   +---validation
ª   ª           base-schema.ts
ª   ª           
ª   +---repositories
ª   ª       BaseRepository.ts
ª   ª       ProductRepository.ts
ª   ª       
ª   +---services
ª   ª       BaseCrudService.ts
ª   ª       ProductService.ts
ª   ª       
ª   +---tables
ª   ª       EnterpriseDataTable.tsx
ª   ª       
ª   +---types
ª   ª       api-response.ts
ª   ª       Equipment.ts
ª   ª       Exploitation.ts
ª   ª       filters.ts
ª   ª       Intervention.ts
ª   ª       Organisation.ts
ª   ª       pagination.ts
ª   ª       Product.ts
ª   ª       StockMovement.ts
ª   ª       Terrain.ts
ª   ª       User.ts
ª   ª       
ª   +---utils
ª   ª       FilterUtils.ts
ª   ª       PaginationUtils.ts
ª   ª       SortUtils.ts
ª   ª       
ª   +---validators
ª           ValidationService.ts
ª           
+---store
ª       useAppStore.ts
ª       
+---theme
ª   ª   ERPTheme.ts
ª   ª   theme.ts
ª   ª   
ª   +---store
ª           useAppStore.ts
ª           
+---types
ª       BaseEntity.ts
ª       mouvement-stock.type.ts
ª       MOUVEMENT_STOCK.ts
ª       organisation.ts
ª       STATUT_STOCK.ts
ª       terrain.ts
ª       utilisateur.ts
ª       
+---ui
ª   ª   index.ts
ª   ª   README.md
ª   ª   
ª   +---shell
ª   ª       EnterpriseShell.tsx
ª   ª       
ª   +---sidebar
ª   ª       ERPSidebar.tsx
ª   ª       
ª   +---theme
ª   ª       module.colors.ts
ª   ª       severity.colors.ts
ª   ª       status.colors.ts
ª   ª       theme.tokens.ts
ª   ª       ThemeProvider.tsx
ª   ª       
ª   +---topbar
ª           ERPTopbar.tsx
ª           
+---utils
ª   +---validation
ª           validators.ts
ª           
+---_quarantine
    +---layout
    ª       AppLayout.tsx
    ª       ERPLayout.tsx
    ª       PrivateShell.tsx
    ª       Sidebar.tsx
    ª       Topbar.tsx
    ª       
    +---modules
    ª   +---alertes
    ª   ª   ª   index.ts
    ª   ª   ª   
    ª   ª   +---components
    ª   ª   ª       AlertesBulkActions.tsx
    ª   ª   ª       AlertesChartWidget.tsx
    ª   ª   ª       AlertesDashboardCard.tsx
    ª   ª   ª       AlertesExportActions.tsx
    ª   ª   ª       AlertesFilters.tsx
    ª   ª   ª       AlertesForm.tsx
    ª   ª   ª       AlertesPagination.tsx
    ª   ª   ª       AlertesRealtimeWidget.tsx
    ª   ª   ª       AlertesSorting.tsx
    ª   ª   ª       AlertesTable.tsx
    ª   ª   ª       
    ª   ª   +---dto
    ª   ª   ª       AlertesDTO.ts
    ª   ª   ª       
    ª   ª   +---hooks
    ª   ª   ª       useAlertes.ts
    ª   ª   ª       useCreateAlertes.ts
    ª   ª   ª       useDeleteAlertes.ts
    ª   ª   ª       useUpdateAlertes.ts
    ª   ª   ª       
    ª   ª   +---pages
    ª   ª   ª   ª   page.tsx
    ª   ª   ª   ª   
    ª   ª   ª   +---nouveau
    ª   ª   ª   ª       page.tsx
    ª   ª   ª   ª       
    ª   ª   ª   +---[id]
    ª   ª   ª       ª   page.tsx
    ª   ª   ª       ª   
    ª   ª   ª       +---edit
    ª   ª   ª               page.tsx
    ª   ª   ª               
    ª   ª   +---repositories
    ª   ª   ª       AlertesRepository.ts
    ª   ª   ª       
    ª   ª   +---schemas
    ª   ª   ª       Alertes.schema.ts
    ª   ª   ª       
    ª   ª   +---services
    ª   ª   ª       AlertesService.ts
    ª   ª   ª       subscribeToAlertes.ts
    ª   ª   ª       
    ª   ª   +---tests
    ª   ª           AlertesService.test.ts
    ª   ª           
    ª   +---analytics
    ª   ª   ª   index.ts
    ª   ª   ª   
    ª   ª   +---components
    ª   ª   ª       AnalyticsBulkActions.tsx
    ª   ª   ª       AnalyticsChartWidget.tsx
    ª   ª   ª       AnalyticsDashboardCard.tsx
    ª   ª   ª       AnalyticsExportActions.tsx
    ª   ª   ª       AnalyticsFilters.tsx
    ª   ª   ª       AnalyticsForm.tsx
    ª   ª   ª       AnalyticsPagination.tsx
    ª   ª   ª       AnalyticsSorting.tsx
    ª   ª   ª       AnalyticsTable.tsx
    ª   ª   ª       
    ª   ª   +---dto
    ª   ª   ª       AnalyticsDTO.ts
    ª   ª   ª       
    ª   ª   +---hooks
    ª   ª   ª       useAnalytics.ts
    ª   ª   ª       useCreateAnalytics.ts
    ª   ª   ª       useDeleteAnalytics.ts
    ª   ª   ª       useUpdateAnalytics.ts
    ª   ª   ª       
    ª   ª   +---pages
    ª   ª   ª   ª   page.tsx
    ª   ª   ª   ª   
    ª   ª   ª   +---nouveau
    ª   ª   ª   ª       page.tsx
    ª   ª   ª   ª       
    ª   ª   ª   +---[id]
    ª   ª   ª       ª   page.tsx
    ª   ª   ª       ª   
    ª   ª   ª       +---edit
    ª   ª   ª               page.tsx
    ª   ª   ª               
    ª   ª   +---repositories
    ª   ª   ª       AnalyticsRepository.ts
    ª   ª   ª       
    ª   ª   +---schemas
    ª   ª   ª       Analytics.schema.ts
    ª   ª   ª       
    ª   ª   +---services
    ª   ª   ª       AnalyticsService.ts
    ª   ª   ª       
    ª   ª   +---tests
    ª   ª           AnalyticsService.test.ts
    ª   ª           
    ª   +---clients
    ª   ª   ª   index.ts
    ª   ª   ª   
    ª   ª   +---components
    ª   ª   ª       ClientsBulkActions.tsx
    ª   ª   ª       ClientsChartWidget.tsx
    ª   ª   ª       ClientsDashboardCard.tsx
    ª   ª   ª       ClientsExportActions.tsx
    ª   ª   ª       ClientsFilters.tsx
    ª   ª   ª       ClientsForm.tsx
    ª   ª   ª       ClientsPagination.tsx
    ª   ª   ª       ClientsRealtimeWidget.tsx
    ª   ª   ª       ClientsSorting.tsx
    ª   ª   ª       ClientsTable.tsx
    ª   ª   ª       
    ª   ª   +---dto
    ª   ª   ª       ClientsDTO.ts
    ª   ª   ª       
    ª   ª   +---hooks
    ª   ª   ª       useClients.ts
    ª   ª   ª       useCreateClients.ts
    ª   ª   ª       useDeleteClients.ts
    ª   ª   ª       useUpdateClients.ts
    ª   ª   ª       
    ª   ª   +---pages
    ª   ª   ª   ª   page.tsx
    ª   ª   ª   ª   
    ª   ª   ª   +---nouveau
    ª   ª   ª   ª       page.tsx
    ª   ª   ª   ª       
    ª   ª   ª   +---[id]
    ª   ª   ª       ª   page.tsx
    ª   ª   ª       ª   
    ª   ª   ª       +---edit
    ª   ª   ª               page.tsx
    ª   ª   ª               
    ª   ª   +---repositories
    ª   ª   ª       ClientsRepository.ts
    ª   ª   ª       
    ª   ª   +---schemas
    ª   ª   ª       Clients.schema.ts
    ª   ª   ª       
    ª   ª   +---services
    ª   ª   ª       ClientsService.ts
    ª   ª   ª       subscribeToClients.ts
    ª   ª   ª       
    ª   ª   +---tests
    ª   ª           ClientsService.test.ts
    ª   ª           
    ª   +---contrats
    ª   ª   ª   index.ts
    ª   ª   ª   
    ª   ª   +---components
    ª   ª   ª       ContratsBulkActions.tsx
    ª   ª   ª       ContratsChartWidget.tsx
    ª   ª   ª       ContratsDashboardCard.tsx
    ª   ª   ª       ContratsExportActions.tsx
    ª   ª   ª       ContratsFilters.tsx
    ª   ª   ª       ContratsForm.tsx
    ª   ª   ª       ContratsPagination.tsx
    ª   ª   ª       ContratsRealtimeWidget.tsx
    ª   ª   ª       ContratsSorting.tsx
    ª   ª   ª       ContratsTable.tsx
    ª   ª   ª       
    ª   ª   +---dto
    ª   ª   ª       ContratsDTO.ts
    ª   ª   ª       DTO.ts
    ª   ª   ª       
    ª   ª   +---hooks
    ª   ª   ª       useContrats.ts
    ª   ª   ª       useCreateContrats.ts
    ª   ª   ª       useDeleteContrats.ts
    ª   ª   ª       useUpdateContrats.ts
    ª   ª   ª       
    ª   ª   +---pages
    ª   ª   ª   ª   page.tsx
    ª   ª   ª   ª   
    ª   ª   ª   +---nouveau
    ª   ª   ª   ª       page.tsx
    ª   ª   ª   ª       
    ª   ª   ª   +---[id]
    ª   ª   ª       ª   page.tsx
    ª   ª   ª       ª   
    ª   ª   ª       +---edit
    ª   ª   ª               page.tsx
    ª   ª   ª               
    ª   ª   +---repositories
    ª   ª   ª       ContratsRepository.ts
    ª   ª   ª       Repository.ts
    ª   ª   ª       
    ª   ª   +---schemas
    ª   ª   ª       Contrats.schema.ts
    ª   ª   ª       
    ª   ª   +---services
    ª   ª   ª       ContratsService.ts
    ª   ª   ª       Service.ts
    ª   ª   ª       subscribeToContrats.ts
    ª   ª   ª       
    ª   ª   +---tests
    ª   ª           ContratsService.test.ts
    ª   ª           Service.test.ts
    ª   ª           
    ª   +---exploitations
    ª   ª   ª   index.ts
    ª   ª   ª   
    ª   ª   +---components
    ª   ª   ª       ExploitationsBulkActions.tsx
    ª   ª   ª       ExploitationsChartWidget.tsx
    ª   ª   ª       ExploitationsDashboardCard.tsx
    ª   ª   ª       ExploitationsExportActions.tsx
    ª   ª   ª       ExploitationsFilters.tsx
    ª   ª   ª       ExploitationsForm.tsx
    ª   ª   ª       ExploitationsPagination.tsx
    ª   ª   ª       ExploitationsRealtimeWidget.tsx
    ª   ª   ª       ExploitationsSorting.tsx
    ª   ª   ª       ExploitationsTable.tsx
    ª   ª   ª       
    ª   ª   +---dto
    ª   ª   ª       ExploitationsDTO.ts
    ª   ª   ª       
    ª   ª   +---hooks
    ª   ª   ª       useCreateExploitations.ts
    ª   ª   ª       useDeleteExploitations.ts
    ª   ª   ª       useExploitations.ts
    ª   ª   ª       useUpdateExploitations.ts
    ª   ª   ª       
    ª   ª   +---pages
    ª   ª   ª   ª   page.tsx
    ª   ª   ª   ª   
    ª   ª   ª   +---nouveau
    ª   ª   ª   ª       page.tsx
    ª   ª   ª   ª       
    ª   ª   ª   +---[id]
    ª   ª   ª       ª   page.tsx
    ª   ª   ª       ª   
    ª   ª   ª       +---edit
    ª   ª   ª               page.tsx
    ª   ª   ª               
    ª   ª   +---repositories
    ª   ª   ª       ExploitationsRepository.ts
    ª   ª   ª       
    ª   ª   +---schemas
    ª   ª   ª       Exploitations.schema.ts
    ª   ª   ª       
    ª   ª   +---services
    ª   ª   ª       ExploitationsService.ts
    ª   ª   ª       offlineQueue.ts
    ª   ª   ª       subscribeToExploitations.ts
    ª   ª   ª       
    ª   ª   +---tests
    ª   ª           ExploitationsService.test.ts
    ª   ª           
    ª   +---factures
    ª   ª   ª   index.ts
    ª   ª   ª   
    ª   ª   +---components
    ª   ª   ª       FacturesBulkActions.tsx
    ª   ª   ª       FacturesChartWidget.tsx
    ª   ª   ª       FacturesDashboardCard.tsx
    ª   ª   ª       FacturesExportActions.tsx
    ª   ª   ª       FacturesFilters.tsx
    ª   ª   ª       FacturesForm.tsx
    ª   ª   ª       FacturesPagination.tsx
    ª   ª   ª       FacturesRealtimeWidget.tsx
    ª   ª   ª       FacturesSorting.tsx
    ª   ª   ª       FacturesTable.tsx
    ª   ª   ª       
    ª   ª   +---dto
    ª   ª   ª       FacturesDTO.ts
    ª   ª   ª       
    ª   ª   +---hooks
    ª   ª   ª       useCreateFactures.ts
    ª   ª   ª       useDeleteFactures.ts
    ª   ª   ª       useFactures.ts
    ª   ª   ª       useUpdateFactures.ts
    ª   ª   ª       
    ª   ª   +---pages
    ª   ª   ª   ª   page.tsx
    ª   ª   ª   ª   
    ª   ª   ª   +---nouveau
    ª   ª   ª   ª       page.tsx
    ª   ª   ª   ª       
    ª   ª   ª   +---[id]
    ª   ª   ª       ª   page.tsx
    ª   ª   ª       ª   
    ª   ª   ª       +---edit
    ª   ª   ª               page.tsx
    ª   ª   ª               
    ª   ª   +---repositories
    ª   ª   ª       FacturesRepository.ts
    ª   ª   ª       
    ª   ª   +---schemas
    ª   ª   ª       Factures.schema.ts
    ª   ª   ª       
    ª   ª   +---services
    ª   ª   ª       FacturesService.ts
    ª   ª   ª       subscribeToFactures.ts
    ª   ª   ª       
    ª   ª   +---tests
    ª   ª           FacturesService.test.ts
    ª   ª           
    ª   +---fournisseurs
    ª   ª   ª   index.ts
    ª   ª   ª   
    ª   ª   +---components
    ª   ª   ª       FournisseursBulkActions.tsx
    ª   ª   ª       FournisseursChartWidget.tsx
    ª   ª   ª       FournisseursDashboardCard.tsx
    ª   ª   ª       FournisseursExportActions.tsx
    ª   ª   ª       FournisseursFilters.tsx
    ª   ª   ª       FournisseursForm.tsx
    ª   ª   ª       FournisseursPagination.tsx
    ª   ª   ª       FournisseursRealtimeWidget.tsx
    ª   ª   ª       FournisseursSorting.tsx
    ª   ª   ª       FournisseursTable.tsx
    ª   ª   ª       
    ª   ª   +---dto
    ª   ª   ª       DTO.ts
    ª   ª   ª       FournisseursDTO.ts
    ª   ª   ª       
    ª   ª   +---hooks
    ª   ª   ª       useCreateFournisseurs.ts
    ª   ª   ª       useDeleteFournisseurs.ts
    ª   ª   ª       useFournisseurs.ts
    ª   ª   ª       useUpdateFournisseurs.ts
    ª   ª   ª       
    ª   ª   +---pages
    ª   ª   ª   ª   page.tsx
    ª   ª   ª   ª   
    ª   ª   ª   +---nouveau
    ª   ª   ª   ª       page.tsx
    ª   ª   ª   ª       
    ª   ª   ª   +---[id]
    ª   ª   ª       ª   page.tsx
    ª   ª   ª       ª   
    ª   ª   ª       +---edit
    ª   ª   ª               page.tsx
    ª   ª   ª               
    ª   ª   +---repositories
    ª   ª   ª       FournisseursRepository.ts
    ª   ª   ª       Repository.ts
    ª   ª   ª       
    ª   ª   +---schemas
    ª   ª   ª       Fournisseurs.schema.ts
    ª   ª   ª       
    ª   ª   +---services
    ª   ª   ª       FournisseursService.ts
    ª   ª   ª       Service.ts
    ª   ª   ª       subscribeToFournisseurs.ts
    ª   ª   ª       
    ª   ª   +---tests
    ª   ª           FournisseursService.test.ts
    ª   ª           Service.test.ts
    ª   ª           
    ª   +---interventions
    ª   ª   ª   index.ts
    ª   ª   ª   
    ª   ª   +---components
    ª   ª   ª       InterventionsBulkActions.tsx
    ª   ª   ª       InterventionsChartWidget.tsx
    ª   ª   ª       InterventionsDashboardCard.tsx
    ª   ª   ª       InterventionsExportActions.tsx
    ª   ª   ª       InterventionsFilters.tsx
    ª   ª   ª       InterventionsForm.tsx
    ª   ª   ª       InterventionsPagination.tsx
    ª   ª   ª       InterventionsRealtimeWidget.tsx
    ª   ª   ª       InterventionsSorting.tsx
    ª   ª   ª       InterventionsTable.tsx
    ª   ª   ª       
    ª   ª   +---dto
    ª   ª   ª       InterventionsDTO.ts
    ª   ª   ª       
    ª   ª   +---hooks
    ª   ª   ª       useCreateInterventions.ts
    ª   ª   ª       useDeleteInterventions.ts
    ª   ª   ª       useInterventions.ts
    ª   ª   ª       useUpdateInterventions.ts
    ª   ª   ª       
    ª   ª   +---pages
    ª   ª   ª   ª   page.tsx
    ª   ª   ª   ª   
    ª   ª   ª   +---nouveau
    ª   ª   ª   ª       page.tsx
    ª   ª   ª   ª       
    ª   ª   ª   +---[id]
    ª   ª   ª       ª   page.tsx
    ª   ª   ª       ª   
    ª   ª   ª       +---edit
    ª   ª   ª               page.tsx
    ª   ª   ª               
    ª   ª   +---repositories
    ª   ª   ª       InterventionsRepository.ts
    ª   ª   ª       
    ª   ª   +---schemas
    ª   ª   ª       Interventions.schema.ts
    ª   ª   ª       
    ª   ª   +---services
    ª   ª   ª       InterventionsService.ts
    ª   ª   ª       offlineQueue.ts
    ª   ª   ª       subscribeToInterventions.ts
    ª   ª   ª       
    ª   ª   +---tests
    ª   ª           InterventionsService.test.ts
    ª   ª           
    ª   +---maintenance
    ª   ª   ª   index.ts
    ª   ª   ª   
    ª   ª   +---components
    ª   ª   ª       MaintenanceBulkActions.tsx
    ª   ª   ª       MaintenanceChartWidget.tsx
    ª   ª   ª       MaintenanceDashboardCard.tsx
    ª   ª   ª       MaintenanceExportActions.tsx
    ª   ª   ª       MaintenanceFilters.tsx
    ª   ª   ª       MaintenanceForm.tsx
    ª   ª   ª       MaintenancePagination.tsx
    ª   ª   ª       MaintenanceRealtimeWidget.tsx
    ª   ª   ª       MaintenanceSorting.tsx
    ª   ª   ª       MaintenanceTable.tsx
    ª   ª   ª       
    ª   ª   +---dto
    ª   ª   ª       MaintenanceDTO.ts
    ª   ª   ª       
    ª   ª   +---hooks
    ª   ª   ª       useCreateMaintenance.ts
    ª   ª   ª       useDeleteMaintenance.ts
    ª   ª   ª       useMaintenance.ts
    ª   ª   ª       useUpdateMaintenance.ts
    ª   ª   ª       
    ª   ª   +---pages
    ª   ª   ª   ª   page.tsx
    ª   ª   ª   ª   
    ª   ª   ª   +---nouveau
    ª   ª   ª   ª       page.tsx
    ª   ª   ª   ª       
    ª   ª   ª   +---[id]
    ª   ª   ª       ª   page.tsx
    ª   ª   ª       ª   
    ª   ª   ª       +---edit
    ª   ª   ª               page.tsx
    ª   ª   ª               
    ª   ª   +---repositories
    ª   ª   ª       MaintenanceRepository.ts
    ª   ª   ª       
    ª   ª   +---schemas
    ª   ª   ª       Maintenance.schema.ts
    ª   ª   ª       
    ª   ª   +---services
    ª   ª   ª       MaintenanceService.ts
    ª   ª   ª       offlineQueue.ts
    ª   ª   ª       subscribeToMaintenance.ts
    ª   ª   ª       
    ª   ª   +---tests
    ª   ª           MaintenanceService.test.ts
    ª   ª           
    ª   +---materiels
    ª   ª   ª   index.ts
    ª   ª   ª   
    ª   ª   +---components
    ª   ª   ª       MaterielsBulkActions.tsx
    ª   ª   ª       MaterielsChartWidget.tsx
    ª   ª   ª       MaterielsDashboardCard.tsx
    ª   ª   ª       MaterielsExportActions.tsx
    ª   ª   ª       MaterielsFilters.tsx
    ª   ª   ª       MaterielsForm.tsx
    ª   ª   ª       MaterielsPagination.tsx
    ª   ª   ª       MaterielsRealtimeWidget.tsx
    ª   ª   ª       MaterielsSorting.tsx
    ª   ª   ª       MaterielsTable.tsx
    ª   ª   ª       
    ª   ª   +---dto
    ª   ª   ª       MaterielsDTO.ts
    ª   ª   ª       
    ª   ª   +---hooks
    ª   ª   ª       useCreateMateriels.ts
    ª   ª   ª       useDeleteMateriels.ts
    ª   ª   ª       useMateriels.ts
    ª   ª   ª       useUpdateMateriels.ts
    ª   ª   ª       
    ª   ª   +---pages
    ª   ª   ª   ª   page.tsx
    ª   ª   ª   ª   
    ª   ª   ª   +---nouveau
    ª   ª   ª   ª       page.tsx
    ª   ª   ª   ª       
    ª   ª   ª   +---[id]
    ª   ª   ª       ª   page.tsx
    ª   ª   ª       ª   
    ª   ª   ª       +---edit
    ª   ª   ª               page.tsx
    ª   ª   ª               
    ª   ª   +---repositories
    ª   ª   ª       MaterielsRepository.ts
    ª   ª   ª       
    ª   ª   +---schemas
    ª   ª   ª       Materiels.schema.ts
    ª   ª   ª       
    ª   ª   +---services
    ª   ª   ª       MaterielsService.ts
    ª   ª   ª       offlineQueue.ts
    ª   ª   ª       subscribeToMateriels.ts
    ª   ª   ª       
    ª   ª   +---tests
    ª   ª           MaterielsService.test.ts
    ª   ª           
    ª   +---mobile
    ª   ª   ª   index.ts
    ª   ª   ª   
    ª   ª   +---components
    ª   ª   ª       MobileBulkActions.tsx
    ª   ª   ª       MobileChartWidget.tsx
    ª   ª   ª       MobileDashboardCard.tsx
    ª   ª   ª       MobileExportActions.tsx
    ª   ª   ª       MobileFilters.tsx
    ª   ª   ª       MobileForm.tsx
    ª   ª   ª       MobilePagination.tsx
    ª   ª   ª       MobileRealtimeWidget.tsx
    ª   ª   ª       MobileSorting.tsx
    ª   ª   ª       MobileTable.tsx
    ª   ª   ª       
    ª   ª   +---dto
    ª   ª   ª       MobileDTO.ts
    ª   ª   ª       
    ª   ª   +---hooks
    ª   ª   ª       useCreateMobile.ts
    ª   ª   ª       useDeleteMobile.ts
    ª   ª   ª       useMobile.ts
    ª   ª   ª       useUpdateMobile.ts
    ª   ª   ª       
    ª   ª   +---pages
    ª   ª   ª   ª   page.tsx
    ª   ª   ª   ª   
    ª   ª   ª   +---nouveau
    ª   ª   ª   ª       page.tsx
    ª   ª   ª   ª       
    ª   ª   ª   +---[id]
    ª   ª   ª       ª   page.tsx
    ª   ª   ª       ª   
    ª   ª   ª       +---edit
    ª   ª   ª               page.tsx
    ª   ª   ª               
    ª   ª   +---repositories
    ª   ª   ª       MobileRepository.ts
    ª   ª   ª       
    ª   ª   +---schemas
    ª   ª   ª       Mobile.schema.ts
    ª   ª   ª       
    ª   ª   +---services
    ª   ª   ª       MobileService.ts
    ª   ª   ª       offlineQueue.ts
    ª   ª   ª       subscribeToMobile.ts
    ª   ª   ª       
    ª   ª   +---tests
    ª   ª           MobileService.test.ts
    ª   ª           
    ª   +---monitoring
    ª   ª   ª   index.ts
    ª   ª   ª   
    ª   ª   +---components
    ª   ª   ª       MonitoringBulkActions.tsx
    ª   ª   ª       MonitoringChartWidget.tsx
    ª   ª   ª       MonitoringDashboardCard.tsx
    ª   ª   ª       MonitoringExportActions.tsx
    ª   ª   ª       MonitoringFilters.tsx
    ª   ª   ª       MonitoringForm.tsx
    ª   ª   ª       MonitoringPagination.tsx
    ª   ª   ª       MonitoringRealtimeWidget.tsx
    ª   ª   ª       MonitoringSorting.tsx
    ª   ª   ª       MonitoringTable.tsx
    ª   ª   ª       
    ª   ª   +---dto
    ª   ª   ª       MonitoringDTO.ts
    ª   ª   ª       
    ª   ª   +---hooks
    ª   ª   ª       useCreateMonitoring.ts
    ª   ª   ª       useDeleteMonitoring.ts
    ª   ª   ª       useMonitoring.ts
    ª   ª   ª       useUpdateMonitoring.ts
    ª   ª   ª       
    ª   ª   +---pages
    ª   ª   ª   ª   page.tsx
    ª   ª   ª   ª   
    ª   ª   ª   +---nouveau
    ª   ª   ª   ª       page.tsx
    ª   ª   ª   ª       
    ª   ª   ª   +---[id]
    ª   ª   ª       ª   page.tsx
    ª   ª   ª       ª   
    ª   ª   ª       +---edit
    ª   ª   ª               page.tsx
    ª   ª   ª               
    ª   ª   +---repositories
    ª   ª   ª       MonitoringRepository.ts
    ª   ª   ª       
    ª   ª   +---schemas
    ª   ª   ª       Monitoring.schema.ts
    ª   ª   ª       
    ª   ª   +---services
    ª   ª   ª       MonitoringService.ts
    ª   ª   ª       
    ª   ª   +---tests
    ª   ª           MonitoringService.test.ts
    ª   ª           
    ª   +---mouvements-stock
    ª   ª   ª   index.ts
    ª   ª   ª   
    ª   ª   +---components
    ª   ª   ª       MouvementsStockBulkActions.tsx
    ª   ª   ª       MouvementsStockChartWidget.tsx
    ª   ª   ª       MouvementsStockDashboardCard.tsx
    ª   ª   ª       MouvementsStockExportActions.tsx
    ª   ª   ª       MouvementsStockFilters.tsx
    ª   ª   ª       MouvementsStockForm.tsx
    ª   ª   ª       MouvementsStockPagination.tsx
    ª   ª   ª       MouvementsStockRealtimeWidget.tsx
    ª   ª   ª       MouvementsStockSorting.tsx
    ª   ª   ª       MouvementsStockTable.tsx
    ª   ª   ª       
    ª   ª   +---dto
    ª   ª   ª       MouvementsStockDTO.ts
    ª   ª   ª       
    ª   ª   +---hooks
    ª   ª   ª       useCreateMouvementsStock.ts
    ª   ª   ª       useDeleteMouvementsStock.ts
    ª   ª   ª       useMouvementsStock.ts
    ª   ª   ª       useUpdateMouvementsStock.ts
    ª   ª   ª       
    ª   ª   +---pages
    ª   ª   ª   ª   page.tsx
    ª   ª   ª   ª   
    ª   ª   ª   +---nouveau
    ª   ª   ª   ª       page.tsx
    ª   ª   ª   ª       
    ª   ª   ª   +---[id]
    ª   ª   ª       ª   page.tsx
    ª   ª   ª       ª   
    ª   ª   ª       +---edit
    ª   ª   ª               page.tsx
    ª   ª   ª               
    ª   ª   +---repositories
    ª   ª   ª       MouvementsStockRepository.ts
    ª   ª   ª       
    ª   ª   +---schemas
    ª   ª   ª       MouvementsStock.schema.ts
    ª   ª   ª       
    ª   ª   +---services
    ª   ª   ª       MouvementsStockService.ts
    ª   ª   ª       offlineQueue.ts
    ª   ª   ª       subscribeToMouvementsStock.ts
    ª   ª   ª       
    ª   ª   +---tests
    ª   ª           MouvementsStockService.test.ts
    ª   ª           
    ª   +---p-ro-du-it-s
    ª   ª   +---dto
    ª   ª           ProduitsDTO.ts
    ª   ª           
    ª   +---paiements
    ª   ª   ª   index.ts
    ª   ª   ª   
    ª   ª   +---components
    ª   ª   ª       PaiementsBulkActions.tsx
    ª   ª   ª       PaiementsChartWidget.tsx
    ª   ª   ª       PaiementsDashboardCard.tsx
    ª   ª   ª       PaiementsExportActions.tsx
    ª   ª   ª       PaiementsFilters.tsx
    ª   ª   ª       PaiementsForm.tsx
    ª   ª   ª       PaiementsPagination.tsx
    ª   ª   ª       PaiementsRealtimeWidget.tsx
    ª   ª   ª       PaiementsSorting.tsx
    ª   ª   ª       PaiementsTable.tsx
    ª   ª   ª       
    ª   ª   +---dto
    ª   ª   ª       PaiementsDTO.ts
    ª   ª   ª       
    ª   ª   +---hooks
    ª   ª   ª       useCreatePaiements.ts
    ª   ª   ª       useDeletePaiements.ts
    ª   ª   ª       usePaiements.ts
    ª   ª   ª       useUpdatePaiements.ts
    ª   ª   ª       
    ª   ª   +---pages
    ª   ª   ª   ª   page.tsx
    ª   ª   ª   ª   
    ª   ª   ª   +---nouveau
    ª   ª   ª   ª       page.tsx
    ª   ª   ª   ª       
    ª   ª   ª   +---[id]
    ª   ª   ª       ª   page.tsx
    ª   ª   ª       ª   
    ª   ª   ª       +---edit
    ª   ª   ª               page.tsx
    ª   ª   ª               
    ª   ª   +---repositories
    ª   ª   ª       PaiementsRepository.ts
    ª   ª   ª       
    ª   ª   +---schemas
    ª   ª   ª       Paiements.schema.ts
    ª   ª   ª       
    ª   ª   +---services
    ª   ª   ª       PaiementsService.ts
    ª   ª   ª       subscribeToPaiements.ts
    ª   ª   ª       
    ª   ª   +---tests
    ª   ª           PaiementsService.test.ts
    ª   ª           
    ª   +---parcelles
    ª   ª   ª   index.ts
    ª   ª   ª   
    ª   ª   +---dto
    ª   ª   ª       ParcellesDTO.ts
    ª   ª   ª       
    ª   ª   +---pages
    ª   ª   ª   ª   page.tsx
    ª   ª   ª   ª   
    ª   ª   ª   +---nouveau
    ª   ª   ª   ª       page.tsx
    ª   ª   ª   ª       
    ª   ª   ª   +---[id]
    ª   ª   ª       ª   page.tsx
    ª   ª   ª       ª   
    ª   ª   ª       +---edit
    ª   ª   ª               page.tsx
    ª   ª   ª               
    ª   ª   +---repositories
    ª   ª   ª       ParcellesRepository.ts
    ª   ª   ª       
    ª   ª   +---schemas
    ª   ª   ª       Parcelles.schema.ts
    ª   ª   ª       
    ª   ª   +---services
    ª   ª   ª       ParcellesService.ts
    ª   ª   ª       
    ª   ª   +---tests
    ª   ª           ParcellesService.test.ts
    ª   ª           
    ª   +---productions
    ª   ª   ª   index.ts
    ª   ª   ª   
    ª   ª   +---components
    ª   ª   ª       ProductionsBulkActions.tsx
    ª   ª   ª       ProductionsChartWidget.tsx
    ª   ª   ª       ProductionsDashboardCard.tsx
    ª   ª   ª       ProductionsExportActions.tsx
    ª   ª   ª       ProductionsFilters.tsx
    ª   ª   ª       ProductionsForm.tsx
    ª   ª   ª       ProductionsPagination.tsx
    ª   ª   ª       ProductionsRealtimeWidget.tsx
    ª   ª   ª       ProductionsSorting.tsx
    ª   ª   ª       ProductionsTable.tsx
    ª   ª   ª       
    ª   ª   +---dto
    ª   ª   ª       ProductionsDTO.ts
    ª   ª   ª       
    ª   ª   +---hooks
    ª   ª   ª       useCreateProductions.ts
    ª   ª   ª       useDeleteProductions.ts
    ª   ª   ª       useProductions.ts
    ª   ª   ª       useUpdateProductions.ts
    ª   ª   ª       
    ª   ª   +---pages
    ª   ª   ª   ª   page.tsx
    ª   ª   ª   ª   
    ª   ª   ª   +---nouveau
    ª   ª   ª   ª       page.tsx
    ª   ª   ª   ª       
    ª   ª   ª   +---[id]
    ª   ª   ª       ª   page.tsx
    ª   ª   ª       ª   
    ª   ª   ª       +---edit
    ª   ª   ª               page.tsx
    ª   ª   ª               
    ª   ª   +---repositories
    ª   ª   ª       ProductionsRepository.ts
    ª   ª   ª       
    ª   ª   +---schemas
    ª   ª   ª       Productions.schema.ts
    ª   ª   ª       
    ª   ª   +---services
    ª   ª   ª       offlineQueue.ts
    ª   ª   ª       ProductionsService.ts
    ª   ª   ª       subscribeToProductions.ts
    ª   ª   ª       
    ª   ª   +---tests
    ª   ª           ProductionsService.test.ts
    ª   ª           
    ª   +---recoltes
    ª   ª   ª   index.ts
    ª   ª   ª   
    ª   ª   +---components
    ª   ª   ª       RecoltesBulkActions.tsx
    ª   ª   ª       RecoltesChartWidget.tsx
    ª   ª   ª       RecoltesDashboardCard.tsx
    ª   ª   ª       RecoltesExportActions.tsx
    ª   ª   ª       RecoltesFilters.tsx
    ª   ª   ª       RecoltesForm.tsx
    ª   ª   ª       RecoltesPagination.tsx
    ª   ª   ª       RecoltesRealtimeWidget.tsx
    ª   ª   ª       RecoltesSorting.tsx
    ª   ª   ª       RecoltesTable.tsx
    ª   ª   ª       
    ª   ª   +---dto
    ª   ª   ª       RecoltesDTO.ts
    ª   ª   ª       
    ª   ª   +---hooks
    ª   ª   ª       useCreateRecoltes.ts
    ª   ª   ª       useDeleteRecoltes.ts
    ª   ª   ª       useRecoltes.ts
    ª   ª   ª       useUpdateRecoltes.ts
    ª   ª   ª       
    ª   ª   +---pages
    ª   ª   ª   ª   page.tsx
    ª   ª   ª   ª   
    ª   ª   ª   +---nouveau
    ª   ª   ª   ª       page.tsx
    ª   ª   ª   ª       
    ª   ª   ª   +---[id]
    ª   ª   ª       ª   page.tsx
    ª   ª   ª       ª   
    ª   ª   ª       +---edit
    ª   ª   ª               page.tsx
    ª   ª   ª               
    ª   ª   +---repositories
    ª   ª   ª       RecoltesRepository.ts
    ª   ª   ª       
    ª   ª   +---schemas
    ª   ª   ª       Recoltes.schema.ts
    ª   ª   ª       
    ª   ª   +---services
    ª   ª   ª       offlineQueue.ts
    ª   ª   ª       RecoltesService.ts
    ª   ª   ª       subscribeToRecoltes.ts
    ª   ª   ª       
    ª   ª   +---tests
    ª   ª           RecoltesService.test.ts
    ª   ª           
    ª   +---stocks
    ª   ª   ª   index.ts
    ª   ª   ª   
    ª   ª   +---components
    ª   ª   ª       StocksBulkActions.tsx
    ª   ª   ª       StocksDashboardCard.tsx
    ª   ª   ª       StocksExportActions.tsx
    ª   ª   ª       StocksFilters.tsx
    ª   ª   ª       StocksForm.tsx
    ª   ª   ª       StocksPagination.tsx
    ª   ª   ª       StocksSorting.tsx
    ª   ª   ª       StocksTable.tsx
    ª   ª   ª       
    ª   ª   +---dto
    ª   ª   ª       DTO.ts
    ª   ª   ª       StocksDTO.ts
    ª   ª   ª       
    ª   ª   +---hooks
    ª   ª   ª       useCreateStocks.ts
    ª   ª   ª       useDeleteStocks.ts
    ª   ª   ª       useStocks.ts
    ª   ª   ª       useUpdateStocks.ts
    ª   ª   ª       
    ª   ª   +---pages
    ª   ª   ª   ª   page.tsx
    ª   ª   ª   ª   
    ª   ª   ª   +---nouveau
    ª   ª   ª   ª       page.tsx
    ª   ª   ª   ª       
    ª   ª   ª   +---[id]
    ª   ª   ª       ª   page.tsx
    ª   ª   ª       ª   
    ª   ª   ª       +---edit
    ª   ª   ª               page.tsx
    ª   ª   ª               
    ª   ª   +---repositories
    ª   ª   ª       StocksRepository.ts
    ª   ª   ª       
    ª   ª   +---schemas
    ª   ª   ª       Stocks.schema.ts
    ª   ª   ª       
    ª   ª   +---services
    ª   ª   ª       StocksService.ts
    ª   ª   ª       
    ª   ª   +---tests
    ª   ª           StocksService.test.ts
    ª   ª           
    ª   +---sync
    ª   ª   ª   index.ts
    ª   ª   ª   
    ª   ª   +---components
    ª   ª   ª       SyncBulkActions.tsx
    ª   ª   ª       SyncChartWidget.tsx
    ª   ª   ª       SyncDashboardCard.tsx
    ª   ª   ª       SyncExportActions.tsx
    ª   ª   ª       SyncFilters.tsx
    ª   ª   ª       SyncForm.tsx
    ª   ª   ª       SyncPagination.tsx
    ª   ª   ª       SyncRealtimeWidget.tsx
    ª   ª   ª       SyncSorting.tsx
    ª   ª   ª       SyncTable.tsx
    ª   ª   ª       
    ª   ª   +---dto
    ª   ª   ª       SyncDTO.ts
    ª   ª   ª       
    ª   ª   +---hooks
    ª   ª   ª       useCreateSync.ts
    ª   ª   ª       useDeleteSync.ts
    ª   ª   ª       useSync.ts
    ª   ª   ª       useUpdateSync.ts
    ª   ª   ª       
    ª   ª   +---pages
    ª   ª   ª   ª   page.tsx
    ª   ª   ª   ª   
    ª   ª   ª   +---nouveau
    ª   ª   ª   ª       page.tsx
    ª   ª   ª   ª       
    ª   ª   ª   +---[id]
    ª   ª   ª       ª   page.tsx
    ª   ª   ª       ª   
    ª   ª   ª       +---edit
    ª   ª   ª               page.tsx
    ª   ª   ª               
    ª   ª   +---repositories
    ª   ª   ª       SyncRepository.ts
    ª   ª   ª       
    ª   ª   +---schemas
    ª   ª   ª       Sync.schema.ts
    ª   ª   ª       
    ª   ª   +---services
    ª   ª   ª       offlineQueue.ts
    ª   ª   ª       subscribeToSync.ts
    ª   ª   ª       SyncService.ts
    ª   ª   ª       
    ª   ª   +---tests
    ª   ª           SyncService.test.ts
    ª   ª           
    ª   +---terrains
    ª   ª   ª   index.ts
    ª   ª   ª   
    ª   ª   +---components
    ª   ª   ª       TerrainsBulkActions.tsx
    ª   ª   ª       TerrainsChartWidget.tsx
    ª   ª   ª       TerrainsDashboardCard.tsx
    ª   ª   ª       TerrainsExportActions.tsx
    ª   ª   ª       TerrainsFilters.tsx
    ª   ª   ª       TerrainsForm.tsx
    ª   ª   ª       TerrainsPagination.tsx
    ª   ª   ª       TerrainsRealtimeWidget.tsx
    ª   ª   ª       TerrainsSorting.tsx
    ª   ª   ª       TerrainsTable.tsx
    ª   ª   ª       
    ª   ª   +---dto
    ª   ª   ª       TerrainsDTO.ts
    ª   ª   ª       
    ª   ª   +---hooks
    ª   ª   ª       useCreateTerrains.ts
    ª   ª   ª       useDeleteTerrains.ts
    ª   ª   ª       useTerrains.ts
    ª   ª   ª       useUpdateTerrains.ts
    ª   ª   ª       
    ª   ª   +---pages
    ª   ª   ª   ª   page.tsx
    ª   ª   ª   ª   
    ª   ª   ª   +---nouveau
    ª   ª   ª   ª       page.tsx
    ª   ª   ª   ª       
    ª   ª   ª   +---[id]
    ª   ª   ª       ª   page.tsx
    ª   ª   ª       ª   
    ª   ª   ª       +---edit
    ª   ª   ª               page.tsx
    ª   ª   ª               
    ª   ª   +---repositories
    ª   ª   ª       TerrainsRepository.ts
    ª   ª   ª       
    ª   ª   +---schemas
    ª   ª   ª       Terrains.schema.ts
    ª   ª   ª       
    ª   ª   +---services
    ª   ª   ª       offlineQueue.ts
    ª   ª   ª       subscribeToTerrains.ts
    ª   ª   ª       TerrainsService.ts
    ª   ª   ª       
    ª   ª   +---tests
    ª   ª           TerrainsService.test.ts
    ª   ª           
    ª   +---utilisateurs
    ª       ª   index.ts
    ª       ª   
    ª       +---components
    ª       ª       UtilisateursBulkActions.tsx
    ª       ª       UtilisateursChartWidget.tsx
    ª       ª       UtilisateursDashboardCard.tsx
    ª       ª       UtilisateursExportActions.tsx
    ª       ª       UtilisateursFilters.tsx
    ª       ª       UtilisateursForm.tsx
    ª       ª       UtilisateursPagination.tsx
    ª       ª       UtilisateursRealtimeWidget.tsx
    ª       ª       UtilisateursSorting.tsx
    ª       ª       UtilisateursTable.tsx
    ª       ª       
    ª       +---dto
    ª       ª       UtilisateursDTO.ts
    ª       ª       
    ª       +---hooks
    ª       ª       useCreateUtilisateurs.ts
    ª       ª       useDeleteUtilisateurs.ts
    ª       ª       useUpdateUtilisateurs.ts
    ª       ª       useUtilisateurs.ts
    ª       ª       
    ª       +---pages
    ª       ª   ª   page.tsx
    ª       ª   ª   
    ª       ª   +---nouveau
    ª       ª   ª       page.tsx
    ª       ª   ª       
    ª       ª   +---[id]
    ª       ª       ª   page.tsx
    ª       ª       ª   
    ª       ª       +---edit
    ª       ª               page.tsx
    ª       ª               
    ª       +---repositories
    ª       ª       UtilisateursRepository.ts
    ª       ª       
    ª       +---schemas
    ª       ª       Utilisateurs.schema.ts
    ª       ª       
    ª       +---services
    ª       ª       subscribeToUtilisateurs.ts
    ª       ª       UtilisateursService.ts
    ª       ª       
    ª       +---tests
    ª               UtilisateursService.test.ts
    ª               
    +---navigation
    ª       Sidebar.tsx
    ª       Topbar.tsx
    ª       
    +---runtime-forms
    ª   +---definitions
    ª           contrats.form.ts
    ª           exploitations.form.ts
    ª           interventions.form.ts
    ª           maintenance.form.ts
    ª           materiels.form.ts
    ª           paiements.form.ts
    ª           produits.form.ts
    ª           stocks.form.ts
    ª           terrains.form.ts
    ª           
    +---runtime-generated
    ª       GeneratedRuntimeBindings.ts
    ª       GeneratedRuntimeModules.ts
    ª       GeneratedRuntimeWorkflows.ts
    ª       
    +---runtime-schemas
    ª       ExploitationsBusinessSchema.ts
    ª       MaterielsBusinessSchema.ts
    ª       ProduitsBusinessSchema.ts
    ª       StocksBusinessSchema.ts
    ª       TerrainsBusinessSchema.ts
    ª       
    +---sidebar
    ª   ª   AppSidebar.tsx
    ª   ª   ERPSidebar.tsx
    ª   ª   
    ª   +---sidebar
    ª           ERPSidebar.tsx
    ª           
    +---topbar
    ª   ª   AppTopbar.tsx
    ª   ª   ERPTopbar.tsx
    ª   ª   
    ª   +---topbar
    ª           ERPTopbar.tsx
    ª           
    +---workflow
        +---automations
        ª       WorkflowAutomation.ts
        ª       
        +---events
        ª       ProductEvents.ts
        ª       
        +---listeners
        ª       ProductCreatedListener.ts
        ª       StockAlertListener.ts
        ª       
        +---notifications
        ª       NotificationEngine.ts
        ª       WorkflowNotificationCenter.tsx
        ª       
        +---rules
        ª       RulesEngine.ts
        ª       
        +---services
                EventBus.ts
                WorkflowProductsRepository.ts
                
```

# Structure runtime

```text
Structure du dossier
Le numÚro de sÚrie du volume est A0A2-4E35
C:\USERS\ADMIN\TERRAGEST\SRC\RUNTIME
ª   production.ts
ª   README.md
ª   test-file.txt
ª   
+---actions
ª       ERPAction.ts
ª       ERPActionExecutor.ts
ª       ERPActionRegistry.ts
ª       ERPActionResolver.ts
ª       index.ts
ª       
+---ai
ª   ª   ERPAISnapshot.ts
ª   ª   index.ts
ª   ª   
ª   +---anomalies
ª   ª       ERPAIAnomaly.ts
ª   ª       ERPAIAnomalyDetector.ts
ª   ª       
ª   +---assistant
ª   ª       ERPAIAssistantEngine.ts
ª   ª       ERPAIAssistantMessage.ts
ª   ª       
ª   +---insights
ª   ª       ERPAIInsight.ts
ª   ª       ERPAIInsightEngine.ts
ª   ª       
ª   +---recommendations
ª   ª       ERPAIRecommendation.ts
ª   ª       ERPAIRecommendationEngine.ts
ª   ª       
ª   +---search
ª           ERPSemanticRuntimeSearch.ts
ª           ERPSemanticSearchResult.ts
ª           
+---automation
ª   ª   ERPAutomationEngine.ts
ª   ª   ERPAutomationRegistry.ts
ª   ª   ERPAutomationTimelineStore.ts
ª   ª   ERPNotificationCenter.ts
ª   ª   ERPRuntimeAutomationSeed.ts
ª   ª   index.ts
ª   ª   RuntimeAutomation.ts
ª   ª   RuntimeAutomationEngine.ts
ª   ª   runtimeAutomations.ts
ª   ª   seedERPRuntimeAutomation.ts
ª   ª   
ª   +---actions
ª   ª       ActionExecutor.ts
ª   ª       
ª   +---conditions
ª   ª       ConditionEvaluator.ts
ª   ª       
ª   +---cron
ª   ª       CronManager.ts
ª   ª       
ª   +---engine
ª   ª       ERPAutomationEngine.ts
ª   ª       ERPAutomationRegistry.ts
ª   ª       ERPAutomationRule.ts
ª   ª       
ª   +---hooks
ª   ª       ERPRuntimeHooks.ts
ª   ª       
ª   +---notifications
ª   ª       ERPNotificationCenter.ts
ª   ª       
ª   +---pipelines
ª   ª       PipelineEngine.ts
ª   ª       
ª   +---rules
ª   ª       AutomationRule.ts
ª   ª       MaterielBreakdownRule.ts
ª   ª       
ª   +---runner
ª   ª       AutomationRunner.ts
ª   ª       
ª   +---sagas
ª   ª       SagaCoordinator.ts
ª   ª       
ª   +---scheduler
ª   ª       AutomationScheduler.ts
ª   ª       Scheduler.ts
ª   ª       
ª   +---timeline
ª   ª       ERPAutomationExecution.ts
ª   ª       ERPAutomationTimelineStore.ts
ª   ª       
ª   +---triggers
ª   ª       AutomationTrigger.ts
ª   ª       TriggerEngine.ts
ª   ª       
ª   +---types
ª           Automation.ts
ª           
+---automation-runtime
ª       AutomationRuntimeEngine.ts
ª       AutomationRuntimeExecutor.ts
ª       AutomationRuntimeQueue.ts
ª       AutomationRuntimeRegistry.ts
ª       AutomationRuntimeRules.ts
ª       AutomationRuntimeScheduler.ts
ª       AutomationRuntimeTriggerEngine.ts
ª       AutomationRuntimeTypes.ts
ª       index.ts
ª       
+---bootstrap
ª       bootstrapEnterpriseRuntime.ts
ª       bootstrapRuntime.ts
ª       initializeRuntime.ts
ª       registerBreakdownFlow.ts
ª       registerDomainEvents.ts
ª       registerMaterielWorkflows.ts
ª       runtimeHealthCheck.ts
ª       simulateBreakdown.ts
ª       simulateBreakdownFlow.ts
ª       startEnterpriseRuntime.ts
ª       
+---bus
ª       RuntimeEventBus.ts
ª       
+---business-rules
ª       README.md
ª       RuntimeBusinessRule.ts
ª       runtimeBusinessRules.ts
ª       RuntimeBusinessRulesEngine.ts
ª       
+---cockpit
ª       ERPCockpitSnapshot.ts
ª       index.ts
ª       
+---compliance
ª       ERPComplianceChecker.ts
ª       ERPComplianceTypes.ts
ª       
+---computed
ª       RuntimeComputedEngine.ts
ª       
+---context
ª       RuntimeContextEngine.ts
ª       
+---core
ª   ª   CentralRuntimeRegistry.ts
ª   ª   index.ts
ª   ª   RuntimeAlertRegistry.ts
ª   ª   RuntimeAuditRegistry.ts
ª   ª   RuntimeBindings.ts
ª   ª   RuntimeBindings.ts.bak
ª   ª   RuntimeCapabilities.ts
ª   ª   RuntimeContracts.ts
ª   ª   RuntimeDeadLetterQueue.ts
ª   ª   RuntimeEventBus.ts
ª   ª   RuntimeEventStore.ts
ª   ª   RuntimeEventTopology.ts
ª   ª   RuntimeExecutionRegistry.ts
ª   ª   RuntimeHealthRegistry.ts
ª   ª   RuntimeLifecycle.ts
ª   ª   RuntimeMetricsRegistry.ts
ª   ª   RuntimeModuleConnector.ts
ª   ª   RuntimeObservabilityRegistry.ts
ª   ª   RuntimeOrchestrator.ts
ª   ª   RuntimePermissionRegistry.ts
ª   ª   RuntimePermissionRegistry.ts.bak
ª   ª   RuntimePipeline.ts
ª   ª   RuntimePolicyRegistry.ts
ª   ª   RuntimeQueueRegistry.ts
ª   ª   RuntimeRetryRegistry.ts
ª   ª   RuntimeScheduler.ts
ª   ª   RuntimeSecurityRegistry.ts
ª   ª   RuntimeStateRegistry.ts
ª   ª   RuntimeStateRegistry.ts.bak
ª   ª   RuntimeStreamRegistry.ts
ª   ª   RuntimeSupervisor.ts
ª   ª   RuntimeWorkerRegistry.ts
ª   ª   RuntimeWorkflowRegistry.ts
ª   ª   RuntimeWorkflowRegistry.ts.bak
ª   ª   
ª   +---context
ª   ª       RuntimeContext.ts
ª   ª       
ª   +---executors
ª   ª       RuntimeExecutor.ts
ª   ª       
ª   +---registry
ª   ª       RuntimeRegistry.ts
ª   ª       
ª   +---services
ª   ª       RuntimePublisher.ts
ª   ª       RuntimeSubscriber.ts
ª   ª       
ª   +---types
ª           RuntimeEvent.ts
ª           
+---dashboard
ª   ª   ERPBusinessAlertEngine.ts
ª   ª   ERPBusinessAlerts.ts
ª   ª   ERPBusinessMetricsEngine.ts
ª   ª   ERPDashboardMetrics.ts
ª   ª   
ª   +---generic
ª       ª   ERPBusinessDashboardConfig.ts
ª       ª   ERPDashboardModuleResolver.ts
ª       ª   ERPDashboardTypes.ts
ª       ª   ERPDashboardWidgetEngine.ts
ª       ª   registerERPDashboards.ts
ª       ª   
ª       +---configs
ª       ª       ERPBusinessDashboardConfig.ts
ª       ª       
ª       +---registry
ª               ERPDashboardRegistry.ts
ª               
+---data
ª   ª   ERPDataEngine.ts
ª   ª   ERPDataRepository.ts
ª   ª   ERPModuleDataService.ts
ª   ª   ERPModuleRuntimeDataBridge.ts
ª   ª   index.ts
ª   ª   
ª   +---adapters
ª   ª       ERPStorageAdapter.ts
ª   ª       MemoryERPStorageAdapter.ts
ª   ª       
ª   +---analytics
ª   ª       AnalyticsEngine.ts
ª   ª       PersistentAnalyticsEngine.ts
ª   ª       
ª   +---cqrs
ª   ª       CQRSBus.ts
ª   ª       
ª   +---event-store
ª   ª   ª   EventStore.ts
ª   ª   ª   PersistentEventStore.ts
ª   ª   ª   
ª   ª   +---dispatchers
ª   ª   ª       ProjectionDispatcher.ts
ª   ª   ª       
ª   ª   +---replay
ª   ª   ª       ReplayEngine.ts
ª   ª   ª       
ª   ª   +---serialization
ª   ª   ª       EventSerializer.ts
ª   ª   ª       
ª   ª   +---snapshots
ª   ª   ª       SnapshotManager.ts
ª   ª   ª       
ª   ª   +---streams
ª   ª           StreamManager.ts
ª   ª           
ª   +---forecast
ª   ª       ForecastEngine.ts
ª   ª       
ª   +---projections
ª   ª       ProjectionEngine.ts
ª   ª       
ª   +---read-models
ª   ª       ReadModelBuilder.ts
ª   ª       
ª   +---reporting
ª   ª       ReportingEngine.ts
ª   ª       
ª   +---warehouse
ª           DataWarehouseConnector.ts
ª           
+---data-binding
ª       index.ts
ª       RuntimeDataBinding.ts
ª       RuntimeRecord.ts
ª       
+---dead-letter
ª       DeadLetterQueue.ts
ª       
+---domain
ª   ª   index.ts
ª   ª   TerragestDomainRuntimeBridge.ts
ª   ª   
ª   +---adapters
ª   ª       TerragestBusinessRuleAdapter.ts
ª   ª       
ª   +---models
ª   ª       TerragestDomainModel.ts
ª   ª       
ª   +---rules
ª           TerragestBusinessRules.ts
ª           TerragestInterModuleRules.ts
ª           
+---enterprise-runtime
ª       EnterpriseRuntimeDiagnostics.ts
ª       EnterpriseRuntimeGovernance.ts
ª       EnterpriseRuntimeKernel.ts
ª       EnterpriseRuntimeLifecycle.ts
ª       EnterpriseRuntimePerformance.ts
ª       index.ts
ª       
+---event-runtime
ª       ERPEventRuntimeBus.ts
ª       ERPEventRuntimeOrchestrator.ts
ª       ERPEventRuntimeStore.ts
ª       ERPEventRuntimeSubscriptionRegistry.ts
ª       ERPEventRuntimeSubscriptions.ts
ª       ERPEventRuntimeTypes.ts
ª       index.ts
ª       
+---events
ª   ª   ERPDomainEvent.ts
ª   ª   ERPEventAutomationBridge.ts
ª   ª   ERPEventBus.ts
ª   ª   ERPRuntimeEventOrchestrator.ts
ª   ª   EventBus.ts
ª   ª   EventPipeline.ts
ª   ª   index.ts
ª   ª   MaintenanceEvents.ts
ª   ª   RuntimeEvent.ts
ª   ª   RuntimeEventBus.ts
ª   ª   RuntimeEventRegistry.ts
ª   ª   
ª   +---bus
ª   ª       ERPEventBus.ts
ª   ª       
ª   +---store
+---execution
ª       PersistentWorkflowExecutor.ts
ª       RuntimeExecutor.ts
ª       
+---firebase
ª       runtime-firestore.ts
ª       
+---firestore
ª   ª   FirestoreRuntimeMutation.ts
ª   ª   FirestoreRuntimeQuery.ts
ª   ª   FirestoreRuntimeRealtime.ts
ª   ª   FirestoreRuntimeRepository.ts
ª   ª   index.ts
ª   ª   
ª   +---generated
ª       +---achats
ª       +---clients
ª       +---commandes
ª       +---depenses
ª       +---devis
ª       +---employes
ª       +---factures
ª       +---fournisseurs
ª       +---incidents
ª       +---intrants
ª       +---livraisons
ª       +---parcelles
ª       +---recettes
ª       +---recoltes
ª       +---taches
ª       +---vehicules
+---forms
ª       DynamicField.ts
ª       DynamicFormDefinition.ts
ª       DynamicFormEngine.ts
ª       DynamicFormRegistry.ts
ª       DynamicFormRegistry.ts.bak
ª       ERPFormEngine.tsx
ª       
+---generated
ª       GeneratedRuntimeTopology.ts
ª       
+---generation
ª       ERPDashboardGenerationEngine.ts
ª       ERPFormGenerationEngine.ts
ª       ERPMenuGenerationEngine.ts
ª       ERPModuleGenerationEngine.ts
ª       ERPModuleRuntimeFactory.tsx
ª       ERPPageGenerationEngine.tsx
ª       ERPPermissionsGenerationEngine.ts
ª       ERPRoutesGenerationEngine.ts
ª       ERPTableGenerationEngine.ts
ª       ERPWorkflowGenerationEngine.ts
ª       index.ts
ª       
+---governance
ª   ª   EnterpriseGovernanceEngine.ts
ª   ª   simulateGovernance.ts
ª   ª   
ª   +---boundaries
ª   ª       DomainBoundaryValidator.ts
ª   ª       
ª   +---contracts
ª   ª       RuntimeContractValidator.ts
ª   ª       
ª   +---duplication
ª   ª       AntiDuplicationGuard.ts
ª   ª       
ª   +---naming
ª   ª       NamingConventionChecker.ts
ª   ª       
ª   +---patterns
ª   ª       SharedPatternRegistry.ts
ª   ª       
ª   +---policies
ª           ArchitecturePolicyEngine.ts
ª           
+---integrations
ª   +---adapters
ª   ª       ProviderAdapter.ts
ª   ª       
ª   +---api
ª   ª       ApiGateway.ts
ª   ª       
ª   +---bridges
ª   ª       ExternalEventBridge.ts
ª   ª       IntegrationBus.ts
ª   ª       
ª   +---connectors
ª   ª       ConnectorRegistry.ts
ª   ª       
ª   +---federation
ª   ª       FederationEngine.ts
ª   ª       
ª   +---sync
ª   ª       SyncEngine.ts
ª   ª       
ª   +---webhooks
ª           WebhookManager.ts
ª           
+---listeners
ª       MaintenanceAuditListener.ts
ª       MaintenanceNotificationListener.ts
ª       
+---metadata
ª       ERPMetadataGenerationBridge.ts
ª       ERPMetadataRegistry.ts
ª       ERPModuleSchemas.ts
ª       
+---metrics
ª       RuntimeMetrics.ts
ª       
+---modules
ª   ª   ERPModule.ts
ª   ª   ERPModuleDefinition.ts
ª   ª   ERPModuleRegistry.ts
ª   ª   index.ts
ª   ª   registerCoreERPModules.ts
ª   ª   registerCoreERPModules.ts.bak
ª   ª   
ª   +---adapters
ª   ª       CoreModuleRuntimeAdapter.ts
ª   ª       CoreModuleRuntimeAdapter.ts.bak
ª   ª       
ª   +---builders
ª   ª       ERPModuleBuilder.ts
ª   ª       
ª   +---definitions
ª   ª       coreModules.ts
ª   ª       coreModules.ts.bak
ª   ª       
ª   +---factories
ª   ª       RuntimeFormFactory.ts
ª   ª       RuntimePageFactory.ts
ª   ª       RuntimeTableFactory.ts
ª   ª       
ª   +---factory
ª   ª       businessFields.ts
ª   ª       createBusinessModule.ts
ª   ª       index.ts
ª   ª       
ª   +---generated
ª   ª   +---achats
ª   ª   +---clients
ª   ª   +---commandes
ª   ª   +---depenses
ª   ª   +---devis
ª   ª   +---employes
ª   ª   +---factures
ª   ª   +---fournisseurs
ª   ª   +---incidents
ª   ª   +---intrants
ª   ª   +---livraisons
ª   ª   +---parcelles
ª   ª   +---recettes
ª   ª   +---recoltes
ª   ª   +---taches
ª   ª   +---vehicules
ª   +---lifecycle
ª   ª       ERPModuleAuditor.ts
ª   ª       ERPModuleDependencyGraph.ts
ª   ª       ERPModuleLifecycleManager.ts
ª   ª       ERPRelationDataLoader.ts
ª   ª       ERPRelationResolver.ts
ª   ª       
ª   +---metadata
ª   ª       ERPModuleMetadata.ts
ª   ª       
ª   +---registry
ª   ª       registerCoreModules.ts
ª   ª       
ª   +---renderer
ª   ª       ERPModuleDetailRenderer.tsx
ª   ª       ERPModuleListRenderer.tsx
ª   ª       
ª   +---renderers
ª   ª       ERPModuleRenderer.ts
ª   ª       
ª   +---schemas
ª   ª       ERPModuleSchema.ts
ª   ª       
ª   +---v2
ª           contratsModuleV2.ts
ª           exploitationsModuleV2.ts
ª           README.md
ª           terragestBusinessModelV2.ts
ª           terrainsModuleV2.ts
ª           
+---monitoring
ª   ª   ConnectedRuntimeEventPublisher.ts
ª   ª   ERPMonitoringSnapshot.ts
ª   ª   index.ts
ª   ª   PersistentRuntimePublisher.ts
ª   ª   RuntimeEventPublisher.ts
ª   ª   simulateRuntimeActivity.ts
ª   ª   WorkflowAnalytics.ts
ª   ª   
ª   +---errors
ª   ª       ERPErrorAnalytics.ts
ª   ª       
ª   +---health
ª   ª       ERPHealthCenter.ts
ª   ª       ERPHealthCheck.ts
ª   ª       
ª   +---metrics
ª   ª       ERPMonitoringMetrics.ts
ª   ª       
ª   +---topology
ª           ERPDependencyGraph.ts
ª           
+---mutations
ª       index.ts
ª       RuntimeMutationEngine.ts
ª       
+---navigation
ª       ERPRelationNavigation.tsx
ª       RuntimeNavigationEngine.ts
ª       RuntimeNavigationLink.ts
ª       
+---notifications
ª       ERPNotificationsPanel.tsx
ª       RuntimeNotification.ts
ª       RuntimeNotificationEngine.ts
ª       
+---observability
ª   ª   ERPAlertStore.ts
ª   ª   ERPObservabilityTimeline.ts
ª   ª   ERPRuntimeAuditBridge.ts
ª   ª   ERPRuntimeAuditTrail.ts
ª   ª   ERPRuntimeSeed.ts
ª   ª   ERPTraceStore.ts
ª   ª   index.ts
ª   ª   RuntimeLog.ts
ª   ª   RuntimeLogsPanel.tsx
ª   ª   RuntimeObservabilityEngine.ts
ª   ª   seedERPRuntimeObservability.ts
ª   ª   
ª   +---alerts
ª   ª       ERPAlert.ts
ª   ª       ERPAlertStore.ts
ª   ª       
ª   +---generated
ª   ª   +---achats
ª   ª   ª       achats.observability.ts
ª   ª   ª       
ª   ª   +---clients
ª   ª   ª       clients.observability.ts
ª   ª   ª       
ª   ª   +---commandes
ª   ª   ª       commandes.observability.ts
ª   ª   ª       
ª   ª   +---depenses
ª   ª   ª       depenses.observability.ts
ª   ª   ª       
ª   ª   +---devis
ª   ª   ª       devis.observability.ts
ª   ª   ª       
ª   ª   +---employes
ª   ª   ª       employes.observability.ts
ª   ª   ª       
ª   ª   +---factures
ª   ª   ª       factures.observability.ts
ª   ª   ª       
ª   ª   +---fournisseurs
ª   ª   ª       fournisseurs.observability.ts
ª   ª   ª       
ª   ª   +---incidents
ª   ª   ª       incidents.observability.ts
ª   ª   ª       
ª   ª   +---intrants
ª   ª   ª       intrants.observability.ts
ª   ª   ª       
ª   ª   +---livraisons
ª   ª   ª       livraisons.observability.ts
ª   ª   ª       
ª   ª   +---parcelles
ª   ª   ª       parcelles.observability.ts
ª   ª   ª       
ª   ª   +---recettes
ª   ª   ª       recettes.observability.ts
ª   ª   ª       
ª   ª   +---recoltes
ª   ª   ª       recoltes.observability.ts
ª   ª   ª       
ª   ª   +---taches
ª   ª   ª       taches.observability.ts
ª   ª   ª       
ª   ª   +---vehicules
ª   ª           vehicules.observability.ts
ª   ª           
ª   +---timeline
ª   ª       ERPObservabilityTimeline.ts
ª   ª       
ª   +---traces
ª           ERPTrace.ts
ª           ERPTraceStore.ts
ª           
+---orchestration
ª       MaterielBreakdownFlow.ts
ª       PersistentMaterielBreakdownFlow.ts
ª       ProcessOrchestrator.ts
ª       RuntimeModuleOrchestrator.ts
ª       simulatePersistentBreakdownFlow.ts
ª       WorkflowDispatcher.ts
ª       
+---os
ª   +---access
ª   ª       AccessController.ts
ª   ª       
ª   +---audit
ª   ª       AuditStream.ts
ª   ª       PersistentAuditStream.ts
ª   ª       
ª   +---context
ª   ª       OrganizationContext.ts
ª   ª       
ª   +---governance
ª   ª       GovernanceEngine.ts
ª   ª       
ª   +---permissions
ª   ª       PermissionEngine.ts
ª   ª       
ª   +---security
ª   ª       SecurityPolicy.ts
ª   ª       
ª   +---tenants
ª           RuntimeIsolationManager.ts
ª           TenantManager.ts
ª           
+---os-enterprise
ª       ERPCommand.ts
ª       ERPCommandCenter.ts
ª       ERPNotification.ts
ª       ERPNotificationCenter.ts
ª       ERPSavedView.ts
ª       ERPSavedViews.ts
ª       ERPUserContext.ts
ª       index.ts
ª       
+---permissions
ª       ERPProtectedAction.tsx
ª       RuntimePermission.ts
ª       runtimePermissions.ts
ª       RuntimePermissionsEngine.ts
ª       
+---persistence
ª   ª   ERPPersistenceSeed.ts
ª   ª   FirestoreHealthCheck.ts
ª   ª   index.ts
ª   ª   
ª   +---analytics
ª   ª       AnalyticsRepository.ts
ª   ª       
ª   +---audit
ª   ª       AuditRepository.ts
ª   ª       
ª   +---drivers
ª   ª       ERPInMemoryPersistenceDriver.ts
ª   ª       ERPPersistenceDriver.ts
ª   ª       
ª   +---events
ª   ª       RuntimeEventRepository.ts
ª   ª       
ª   +---processes
ª   ª       ProcessRepository.ts
ª   ª       
ª   +---projections
ª   ª       ProjectionRepository.ts
ª   ª       
ª   +---repositories
ª   ª       ERPRuntimeRepository.ts
ª   ª       
ª   +---snapshots
ª   ª       ERPPersistenceSnapshot.ts
ª   ª       
ª   +---stores
ª   ª       ERPPersistenceCollections.ts
ª   ª       ERPRuntimePersistenceService.ts
ª   ª       
ª   +---workflows
ª           WorkflowRepository.ts
ª           
+---policies
ª   ª   ERPPolicyEngine.ts
ª   ª   ERPRuntimeAuthorizationBridge.ts
ª   ª   index.ts
ª   ª   
ª   +---generated
ª       +---achats
ª       ª       achats.policy.ts
ª       ª       
ª       +---clients
ª       ª       clients.policy.ts
ª       ª       
ª       +---commandes
ª       ª       commandes.policy.ts
ª       ª       
ª       +---depenses
ª       ª       depenses.policy.ts
ª       ª       
ª       +---devis
ª       ª       devis.policy.ts
ª       ª       
ª       +---employes
ª       ª       employes.policy.ts
ª       ª       
ª       +---factures
ª       ª       factures.policy.ts
ª       ª       
ª       +---fournisseurs
ª       ª       fournisseurs.policy.ts
ª       ª       
ª       +---incidents
ª       ª       incidents.policy.ts
ª       ª       
ª       +---intrants
ª       ª       intrants.policy.ts
ª       ª       
ª       +---livraisons
ª       ª       livraisons.policy.ts
ª       ª       
ª       +---parcelles
ª       ª       parcelles.policy.ts
ª       ª       
ª       +---recettes
ª       ª       recettes.policy.ts
ª       ª       
ª       +---recoltes
ª       ª       recoltes.policy.ts
ª       ª       
ª       +---taches
ª       ª       taches.policy.ts
ª       ª       
ª       +---vehicules
ª               vehicules.policy.ts
ª               
+---processes
ª   ª   PersistentProcessExecutor.ts
ª   ª   
ª   +---approvals
ª   ª       ApprovalEngine.ts
ª   ª       
ª   +---definitions
ª   ª       MaterielMaintenanceProcess.ts
ª   ª       ProcessDefinition.ts
ª   ª       
ª   +---escalations
ª   ª       EscalationManager.ts
ª   ª       
ª   +---human-tasks
ª   ª       HumanTaskManager.ts
ª   ª       
ª   +---lifecycle
ª   ª       LifecycleManager.ts
ª   ª       
ª   +---sla
ª   ª       SLAEngine.ts
ª   ª       
ª   +---state-machine
ª   ª       StateMachine.ts
ª   ª       
ª   +---transitions
ª           TransitionManager.ts
ª           
+---production
ª   ª   index.ts
ª   ª   ProductionLogger.ts
ª   ª   ProductionReadiness.ts
ª   ª   readiness.ts
ª   ª   RuntimeCache.ts
ª   ª   RuntimeErrorReporter.ts
ª   ª   RuntimeHealthMonitor.ts
ª   ª   RuntimeRateLimiter.ts
ª   ª   
ª   +---backup
ª   ª       ERPBackupPlan.ts
ª   ª       ERPBackupPlanRegistry.ts
ª   ª       
ª   +---cloud
ª   ª       ERPCloudReadinessCheck.ts
ª   ª       ERPCloudReadinessRegistry.ts
ª   ª       
ª   +---governance
ª   ª       ERPProductionPolicy.ts
ª   ª       ERPProductionPolicyRegistry.ts
ª   ª       
ª   +---limits
ª   ª       ERPRateLimit.ts
ª   ª       ERPRateLimitRegistry.ts
ª   ª       
ª   +---quotas
ª   ª       ERPTenantQuota.ts
ª   ª       ERPTenantQuotaRegistry.ts
ª   ª       
ª   +---readiness
ª           ERPProductionReadinessSnapshot.ts
ª           
+---quality
ª   ª   simulateQualityPlatform.ts
ª   ª   
ª   +---build
ª   ª       EnterpriseBuildPipeline.ts
ª   ª       
ª   +---checks
ª   ª       WorkflowConsistencyCheck.ts
ª   ª       
ª   +---gates
ª   ª       QualityGateEngine.ts
ª   ª       
ª   +---health
ª   ª       DependencyHealthChecker.ts
ª   ª       
ª   +---integrity
ª   ª       RuntimeIntegrityCheck.ts
ª   ª       
ª   +---validation
ª           RuntimeValidator.ts
ª           
+---query
ª       index.ts
ª       RuntimeQueryEngine.ts
ª       
+---realtime
ª   ª   ERPRealtimeSeed.ts
ª   ª   index.ts
ª   ª   simulateRealtimeRuntime.ts
ª   ª   
ª   +---bus
ª   ª       ERPRealtimeBus.ts
ª   ª       
ª   +---channels
ª   ª       ERPRealtimeChannel.ts
ª   ª       RuntimeChannelManager.ts
ª   ª       
ª   +---engine
ª   ª       RuntimeRealtimeEngine.ts
ª   ª       
ª   +---gateway
ª   ª       RuntimeRealtimeGateway.ts
ª   ª       
ª   +---hooks
ª   ª       useRuntimeRealtimeCollection.ts
ª   ª       
ª   +---metrics
ª   ª       LiveMetricsStream.ts
ª   ª       
ª   +---notifications
ª   ª       LiveNotificationService.ts
ª   ª       
ª   +---presence
ª   ª       ERPRealtimePresence.ts
ª   ª       
ª   +---snapshots
ª   ª       ERPRealtimeSnapshot.ts
ª   ª       
ª   +---streams
ª   ª       LiveWorkflowUpdates.ts
ª   ª       
ª   +---websocket
ª           RuntimeWebSocketServer.ts
ª           
+---registry
ª   ª   ERPRegistry.ts
ª   ª   index.ts
ª   ª   types.ts
ª   ª   WorkflowRegistry.ts
ª   ª   
ª   +---actions
ª   +---automation
ª   +---events
ª   +---modules
ª   ª       ERPRegistryModules.ts
ª   ª       ERPRegistryModules.ts.bak
ª   ª       
ª   +---navigation
ª   +---permissions
ª   +---schemas
ª   +---workflows
+---relations
ª       RuntimeRelation.ts
ª       runtimeRelations.ts
ª       RuntimeRelationsEngine.ts
ª       
+---repositories
ª       index.ts
ª       RuntimeRepository.ts
ª       
+---resilience
ª   ª   CircuitBreaker.ts
ª   ª   ERPRuntimeResilienceSeed.ts
ª   ª   index.ts
ª   ª   RetryPolicy.ts
ª   ª   
ª   +---circuit-breaker
ª   ª       ERPCircuitBreaker.ts
ª   ª       
ª   +---dlq
ª   ª       DeadLetterQueue.ts
ª   ª       ERPDeadLetterStore.ts
ª   ª       
ª   +---queue
ª   ª       ERPQueueJob.ts
ª   ª       ERPQueueStore.ts
ª   ª       
ª   +---retry
ª   ª       ERPRetryPolicy.ts
ª   ª       RetryEngine.ts
ª   ª       
ª   +---worker
ª           ERPQueueWorker.ts
ª           
+---rules
ª   ª   BusinessRule.ts
ª   ª   ERPBusinessRuleEngine.ts
ª   ª   ERPRuntimeValidationBridge.ts
ª   ª   index.ts
ª   ª   MaterielCriticalRule.ts
ª   ª   
ª   +---context
ª   ª       ContextResolver.ts
ª   ª       
ª   +---decisions
ª   ª       DecisionEngine.ts
ª   ª       
ª   +---engine
ª   ª       RuleExecutor.ts
ª   ª       
ª   +---evaluators
ª   ª       ConditionEvaluator.ts
ª   ª       RuleEvaluator.ts
ª   ª       
ª   +---pipelines
ª   ª       RulePipeline.ts
ª   ª       
ª   +---policies
ª   ª       PolicyEngine.ts
ª   ª       
ª   +---registry
ª   ª       RuleRegistry.ts
ª   ª       
ª   +---types
ª           Rule.ts
ª           
+---scheduler
ª       RuntimeScheduler.ts
ª       RuntimeSchedulerBootstrap.tsx
ª       
+---schemas
ª       ERPBusinessSchema.ts
ª       ERPBusinessSchemaRegistry.ts
ª       ERPBusinessSchemaRegistry.ts.bak
ª       index.ts
ª       
+---security
ª   ª   ERPSecuritySeed.ts
ª   ª   ERPSecuritySnapshot.ts
ª   ª   index.ts
ª   ª   RuntimeSecurityManager.ts
ª   ª   
ª   +---audit
ª   ª       ERPSecurityAuditLog.ts
ª   ª       ERPSecurityAuditStore.ts
ª   ª       
ª   +---guards
ª   ª       ERPAccessGuard.ts
ª   ª       
ª   +---permissions
ª   ª       ERPPermission.ts
ª   ª       ERPPermissionRegistry.ts
ª   ª       
ª   +---policies
ª   ª       ERPPolicy.ts
ª   ª       ERPPolicyRegistry.ts
ª   ª       
ª   +---roles
ª   ª       ERPRole.ts
ª   ª       ERPRoleRegistry.ts
ª   ª       
ª   +---sessions
ª           ERPSecuritySession.ts
ª           ERPSessionContext.ts
ª           
+---security-runtime
ª       index.ts
ª       RuntimeActionGuard.ts
ª       RuntimeActionPermissionMapper.ts
ª       RuntimePermission.ts
ª       RuntimePolicyEngine.ts
ª       RuntimePolicyRegistry.ts
ª       RuntimeRole.ts
ª       RuntimeSecurityContext.ts
ª       RuntimeWorkflowGuard.ts
ª       
+---selects
ª       DynamicSelect.types.ts
ª       DynamicSelectEngine.ts
ª       ERPDynamicSelect.tsx
ª       
+---shared
ª       ERPRuntimeCollection.ts
ª       ERPRuntimeEntity.ts
ª       ERPRuntimeStore.ts
ª       ERPRuntimeStore.ts$
ª       ERPRuntimeTypes.ts
ª       
+---smart-intelligence
ª       index.ts
ª       SmartAnomalyDetector.ts
ª       SmartIntelligenceTypes.ts
ª       SmartOperationalIntelligence.ts
ª       SmartPredictionEngine.ts
ª       SmartRecommendationEngine.ts
ª       SmartScoringEngine.ts
ª       
+---smart-runtime
ª       ERPSmartInsight.ts
ª       ERPSmartPriorityEngine.ts
ª       ERPSmartRecommendations.ts
ª       ERPSmartRuntimeEngine.ts
ª       index.ts
ª       
+---state
ª       ERPStateBadge.tsx
ª       RuntimeState.ts
ª       RuntimeStateEngine.ts
ª       runtimeStates.ts
ª       
+---streams
ª   ª   ERPStreamsSeed.ts
ª   ª   ERPStreamsSnapshot.ts
ª   ª   index.ts
ª   ª   
ª   +---channels
ª   ª       ERPStreamChannel.ts
ª   ª       ERPStreamRegistry.ts
ª   ª       
ª   +---events
ª   ª       ERPStreamEvent.ts
ª   ª       
ª   +---gateway
ª   ª       ERPRealtimeGateway.ts
ª   ª       
ª   +---history
ª   ª       ERPStreamHistoryStore.ts
ª   ª       
ª   +---metrics
ª           ERPStreamMetricsStore.ts
ª           
+---supervision
ª       WorkflowSupervisor.ts
ª       
+---table
ª   +---engine
ª   ª       RuntimeTableEngine.ts
ª   ª       
ª   +---filters
ª   ª       RuntimeTableFilters.ts
ª   ª       
ª   +---hooks
ª   ª       useRuntimeTable.ts
ª   ª       
ª   +---pagination
ª   ª       RuntimeTablePagination.ts
ª   ª       
ª   +---search
ª   ª       RuntimeTableSearch.ts
ª   ª       
ª   +---sorting
ª   ª       RuntimeTableSorting.ts
ª   ª       
ª   +---state
ª   ª       RuntimeTableState.ts
ª   ª       
ª   +---types
ª           RuntimeTableTypes.ts
ª           
+---tenant
ª   ª   ERPTenantSeed.ts
ª   ª   ERPTenantSnapshot.ts
ª   ª   index.ts
ª   ª   
ª   +---context
ª   ª       ERPTenantContext.ts
ª   ª       
ª   +---isolation
ª   ª       ERPTenantIsolation.ts
ª   ª       
ª   +---metrics
ª   ª       ERPTenantMetrics.ts
ª   ª       ERPTenantMetricsStore.ts
ª   ª       
ª   +---registry
ª           ERPTenant.ts
ª           ERPTenantRegistry.ts
ª           
+---testing
ª   ª   ERPTestingSeed.ts
ª   ª   ERPTestingSnapshot.ts
ª   ª   index.ts
ª   ª   
ª   +---engine
ª   ª       ERPTestingEngine.ts
ª   ª       ERPTestingTypes.ts
ª   ª       
ª   +---history
ª   ª       ERPTestingHistoryStore.ts
ª   ª       
ª   +---registry
ª   ª       ERPTestingRegistry.ts
ª   ª       
ª   +---reports
ª   ª       ERPTestingReportBuilder.ts
ª   ª       
ª   +---simulation
ª           ERPRuntimeSimulation.ts
ª           
+---tests
ª   +---generated
ª       +---achats
ª       +---clients
ª       +---commandes
ª       +---depenses
ª       +---devis
ª       +---employes
ª       +---factures
ª       +---fournisseurs
ª       +---incidents
ª       +---intrants
ª       +---livraisons
ª       +---parcelles
ª       +---recettes
ª       +---recoltes
ª       +---taches
ª       +---vehicules
+---tracing
ª       ExecutionTrace.ts
ª       
+---ui
ª       ERPDynamicFormFactory.tsx
ª       ERPDynamicTableFactory.tsx
ª       ERPUIComposition.ts
ª       index.ts
ª       
+---ui-generation
ª       ERPDefaultSchemas.ts
ª       ERPDefaultSchemas.ts.bak
ª       ERPFieldDefinition.ts
ª       ERPGeneratedSchema.ts
ª       ERPGeneratedSchemaResolver.ts
ª       ERPGeneratedSchemaResolver.ts.bak
ª       index.ts
ª       
+---validation
ª       RuntimeFieldValidator.ts
ª       RuntimeValidationEngine.ts
ª       RuntimeValidationTypes.ts
ª       
+---visibility
ª       RuntimeVisibilityEngine.ts
ª       
+---workers
ª   ª   ERPWorkersSeed.ts
ª   ª   ERPWorkersSnapshot.ts
ª   ª   index.ts
ª   ª   
ª   +---engine
ª   ª       ERPWorkerEngine.ts
ª   ª       ERPWorkerTypes.ts
ª   ª       
ª   +---history
ª   ª       ERPWorkerHistoryStore.ts
ª   ª       
ª   +---metrics
ª   ª       ERPWorkerMetricsStore.ts
ª   ª       
ª   +---registry
ª   ª       ERPWorkerRegistry.ts
ª   ª       
ª   +---scheduler
ª           ERPSchedulerRegistry.ts
ª           
+---workflow-persistence
ª       WorkflowHistoryEntry.ts
ª       WorkflowPersistenceEngine.ts
ª       WorkflowRuntimeService.ts
ª       
+---workflow-runtime
ª       index.ts
ª       WorkflowRuntimeAudit.ts
ª       WorkflowRuntimeDefinitions.ts
ª       WorkflowRuntimeEngine.ts
ª       WorkflowRuntimeRegistry.ts
ª       WorkflowRuntimeStore.ts
ª       WorkflowRuntimeTypes.ts
ª       WorkflowRuntimeValidator.ts
ª       
+---workflow-ui
ª       ERPWorkflowActions.tsx
ª       maintenance.workflow.ts
ª       Workflow.types.ts
ª       WorkflowRuntimeEngine.ts
ª       
+---workflows
    ª   ERPWorkflowRuntimeEngine.ts
    ª   WorkflowEngine.ts
    ª   
    +---engine
    ª       WorkflowExecutor.ts
    ª       
    +---enterprise
    ª   ª   ERPRuntimeWorkflowSeed.ts
    ª   ª   index.ts
    ª   ª   
    ª   +---engine
    ª   ª       ERPWorkflowEngine.ts
    ª   ª       ERPWorkflowTypes.ts
    ª   ª       
    ª   +---registry
    ª   ª       ERPWorkflowRegistry.ts
    ª   ª       
    ª   +---store
    ª   ª       ERPWorkflowExecutionStore.ts
    ª   ª       
    ª   +---timeline
    ª           ERPWorkflowTimelineStore.ts
    ª           
    +---generated
    ª   +---achats
    ª   ª       achats.workflow.ts
    ª   ª       
    ª   +---clients
    ª   ª       clients.workflow.ts
    ª   ª       
    ª   +---commandes
    ª   ª       commandes.workflow.ts
    ª   ª       
    ª   +---depenses
    ª   ª       depenses.workflow.ts
    ª   ª       
    ª   +---devis
    ª   ª       devis.workflow.ts
    ª   ª       
    ª   +---employes
    ª   ª       employes.workflow.ts
    ª   ª       
    ª   +---factures
    ª   ª       factures.workflow.ts
    ª   ª       
    ª   +---fournisseurs
    ª   ª       fournisseurs.workflow.ts
    ª   ª       
    ª   +---incidents
    ª   ª       incidents.workflow.ts
    ª   ª       
    ª   +---intrants
    ª   ª       intrants.workflow.ts
    ª   ª       
    ª   +---livraisons
    ª   ª       livraisons.workflow.ts
    ª   ª       
    ª   +---parcelles
    ª   ª       parcelles.workflow.ts
    ª   ª       
    ª   +---recettes
    ª   ª       recettes.workflow.ts
    ª   ª       
    ª   +---recoltes
    ª   ª       recoltes.workflow.ts
    ª   ª       
    ª   +---taches
    ª   ª       taches.workflow.ts
    ª   ª       
    ª   +---vehicules
    ª           vehicules.workflow.ts
    ª           
    +---persistence
    ª       WorkflowExecutionPersistence.ts
    ª       
    +---sagas
    ª       SagaCoordinator.ts
    ª       
    +---state
    ª       WorkflowStateStore.ts
    ª       
    +---types
            WorkflowDefinition.ts
            WorkflowExecution.ts
            WorkflowStep.ts
            
```

# Structure composants ERP

```text
Structure du dossier
Le numÚro de sÚrie du volume est A0A2-4E35
C:\USERS\ADMIN\TERRAGEST\SRC\COMPONENTS\ERP
+---actions
ª       ERPActionButton.tsx
ª       ERPActionToolbar.tsx
ª       ERPRowActions.tsx
ª       index.ts
ª       
+---activity
ª       ERPActivityFeed.tsx
ª       
+---ai
ª       ERPAIAnomaliesPanel.tsx
ª       ERPAIDashboard.tsx
ª       ERPAIInsights.tsx
ª       ERPAIInsightsPanel.tsx
ª       ERPAIMetricsGrid.tsx
ª       ERPAIRecommendationsPanel.tsx
ª       ERPAISearchPanel.tsx
ª       index.ts
ª       
+---analytics
ª       ERPAnalyticsCard.tsx
ª       
+---audit
ª       ERPAuditTrail.tsx
ª       
+---automation
ª       ERPAutomationCard.tsx
ª       ERPAutomationTimeline.tsx
ª       ERPAutomationTimelinePanel.tsx
ª       ERPNotificationsPanel.tsx
ª       ERPRuntimeAutomationDashboard.tsx
ª       index.ts
ª       
+---automation-runtime
ª       ERPAutomationRuntimePanel.tsx
ª       index.ts
ª       
+---badges
ª       ERPHealthBadge.tsx
ª       
+---charts
ª       ERPTrendCard.tsx
ª       
+---cockpit
ª       ERPCockpitHealthPanel.tsx
ª       ERPCockpitMetricGrid.tsx
ª       ERPCockpitModuleMatrix.tsx
ª       ERPCockpitStreamsPanel.tsx
ª       ERPRuntimeCockpit.tsx
ª       ERPRuntimeCockpitDashboard.tsx
ª       index.ts
ª       
+---command-center
ª       ERPCommandCenter.tsx
ª       
+---dashboard
ª   ª   ErpDashboard.tsx
ª   ª   ERPDashboardActivityFeed.tsx
ª   ª   ERPDashboardMetrics.tsx
ª   ª   ERPDashboardPanel.tsx
ª   ª   ERPDashboardQuickActions.tsx
ª   ª   ERPDashboardSection.tsx
ª   ª   index.ts
ª   ª   
ª   +---business
ª   ª   ª   ERPBusinessDashboard.tsx
ª   ª   ª   
ª   ª   +---widgets
ª   ª           ERPAlertPanel.tsx
ª   ª           ERPKPICard.tsx
ª   ª           
ª   +---generic
ª   ª   ª   ERPDashboardRenderer.tsx
ª   ª   ª   registerDashboardWidgets.ts
ª   ª   ª   
ª   ª   +---registry
ª   ª   ª       ERPDashboardWidgetRegistry.ts
ª   ª   ª       
ª   ª   +---widgets
ª   ª           ERPKPIWidget.tsx
ª   ª           ERPListWidget.tsx
ª   ª           
ª   +---technical
ª           ERPTechnicalDashboard.tsx
ª           
+---datatable
ª       ERPDataTable.tsx
ª       ERPTable.tsx
ª       index.ts
ª       
+---design-system
ª       erp-theme-tokens.ts
ª       
+---details
ª       EntityDetailsLayout.tsx
ª       
+---enterprise-runtime
ª       EnterpriseRuntimeConsolidationPanel.tsx
ª       EnterpriseRuntimeDiagnosticsPanel.tsx
ª       EnterpriseRuntimeGovernancePanel.tsx
ª       EnterpriseRuntimeLifecyclePanel.tsx
ª       EnterpriseRuntimePerformancePanel.tsx
ª       index.ts
ª       
+---errors
ª       ERPErrorBoundary.tsx
ª       
+---event-runtime
ª       ERPEventRuntimePanel.tsx
ª       index.ts
ª       
+---executive-dashboard
ª       ERPExecutiveDashboard.tsx
ª       
+---filters
ª       ERPFilterBar.tsx
ª       
+---finance
ª       ERPFinancialOverview.tsx
ª       
+---firestore
ª       ERPFirestoreSync.tsx
ª       
+---forms
ª   ª   ERPButton.tsx
ª   ª   ERPDynamicForm.tsx
ª   ª   ERPFormRenderer.tsx
ª   ª   ERPFormSection.tsx
ª   ª   ERPInput.tsx
ª   ª   index.ts
ª   ª   
ª   +---enterprise
ª           ERPEnterpriseForm.tsx
ª           ERPFormActions.tsx
ª           ERPFormField.tsx
ª           ERPFormSection.tsx
ª           ERPFormSummaryPanel.tsx
ª           ERPFormTabs.tsx
ª           index.ts
ª           
+---generic
ª       GenericCreatePage.tsx
ª       GenericDetailPage.tsx
ª       GenericEditPage.tsx
ª       GenericListPage.tsx
ª       
+---kpi
ª       ERPKPIGrid.tsx
ª       
+---layout
ª       ERPActionBar.tsx
ª       ERPAppShell.tsx
ª       ERPCockpitLayout.tsx
ª       ERPCommandPanel.tsx
ª       ERPContentArea.tsx
ª       ERPContentGrid.tsx
ª       ERPDashboardLayout.tsx
ª       ERPKpiGrid.tsx
ª       ERPPageHero.tsx
ª       ERPQuickFilters.tsx
ª       ERPRuntimeHealthPanel.tsx
ª       ERPSidebarSection.tsx
ª       ERPTabNavigation.tsx
ª       ERPTopBar.tsx
ª       index.ts
ª       
+---lists
ª       ERPDataList.tsx
ª       
+---live
ª       ERPLiveEvents.tsx
ª       
+---live-operational
ª       ERPLiveOperationalPanel.tsx
ª       index.ts
ª       
+---modules
ª       ERPModuleEnterprisePage.tsx
ª       ERPModulePageShell.tsx
ª       ERPModulePlaceholder.tsx
ª       index.ts
ª       
+---monitoring
ª       ERPErrorAnalyticsPanel.tsx
ª       ERPHealthPanel.tsx
ª       ERPMonitoringDashboard.tsx
ª       ERPMonitoringMetricsGrid.tsx
ª       ERPSystemHealth.tsx
ª       ERPTopologyPanel.tsx
ª       index.ts
ª       
+---navigation
ª       ERPActionButton.tsx
ª       ERPActionToolbar.tsx
ª       ERPBreadcrumbs.tsx
ª       ERPModuleCard.tsx
ª       
+---notifications
ª       ERPNotificationCard.tsx
ª       
+---observability
ª       ERPAlertsPanel.tsx
ª       ERPEventsTimeline.tsx
ª       ERPObservabilityCenter.tsx
ª       ERPRuntimeObservabilityDashboard.tsx
ª       ERPTracesPanel.tsx
ª       index.ts
ª       
+---os
ª       ERPCommandPalette.tsx
ª       ERPEnterpriseOSPanel.tsx
ª       ERPNotificationCenter.tsx
ª       ERPSavedViewsPanel.tsx
ª       ERPWorkspaceSwitcher.tsx
ª       index.ts
ª       
+---page
ª       ERPEmptyState.tsx
ª       ERPMetricCard.tsx
ª       ERPPage.tsx
ª       ERPQuickAction.tsx
ª       ERPSection.tsx
ª       ERPStatCard.tsx
ª       ERPStatusBadge.tsx
ª       ERPWidgetCard.tsx
ª       
+---panels
ª       ERPInfoPanel.tsx
ª       
+---persistence
ª       ERPPersistenceDashboard.tsx
ª       index.ts
ª       
+---production
ª       ERPProductionCloudPanel.tsx
ª       ERPProductionDashboard.tsx
ª       ERPProductionMetricsGrid.tsx
ª       ERPProductionPoliciesPanel.tsx
ª       ERPProductionQuotasPanel.tsx
ª       index.ts
ª       ProductionHardeningPanel.tsx
ª       ProductionLogsPanel.tsx
ª       ProductionReadinessPanel.tsx
ª       readiness.ts
ª       RuntimeHealthPanel.tsx
ª       
+---realtime
ª       ERPRealtimeFeed.tsx
ª       ERPRealtimeMetrics.tsx
ª       ERPRealtimePresencePanel.tsx
ª       ERPRealtimeSyncBadge.tsx
ª       ERPRuntimeRealtimeDashboard.tsx
ª       index.ts
ª       
+---relation-graph
ª       ERPRelationGraph.tsx
ª       
+---relations
ª       ERPRelationField.tsx
ª       ERPRelationsGraph.tsx
ª       index.ts
ª       
+---resilience
ª       ERPDLQPanel.tsx
ª       ERPQueuePanel.tsx
ª       ERPResilienceMetrics.tsx
ª       ERPRuntimeResilienceDashboard.tsx
ª       index.ts
ª       
+---runtime
ª       ERPRuntimeAlertsPanel.tsx
ª       ERPRuntimeDeadLetterPanel.tsx
ª       ERPRuntimeDetails.tsx
ª       ERPRuntimeFieldValue.tsx
ª       ERPRuntimeForm.tsx
ª       ERPRuntimeMetricsPanel.tsx
ª       ERPRuntimeOverviewPage.tsx
ª       ERPRuntimePage.tsx
ª       ERPRuntimeQueuesPanel.tsx
ª       ERPRuntimeRetryPanel.tsx
ª       ERPRuntimeStatus.tsx
ª       ERPRuntimeStatusPanel.tsx
ª       ERPRuntimeTable.tsx
ª       ERPRuntimeWorkersPanel.tsx
ª       index.ts
ª       
+---runtime-timeline
ª       ERPRuntimeTimeline.tsx
ª       
+---runtime-ui
ª       ERPDataTableRuntime.tsx
ª       ERPRuntimeModulePage.tsx
ª       ERPRuntimeRegistryDashboard.tsx
ª       index.ts
ª       
+---security
ª       ERPPoliciesPanel.tsx
ª       ERPRolesPanel.tsx
ª       ERPSecurityAuditPanel.tsx
ª       ERPSecurityDashboard.tsx
ª       ERPSecurityMetrics.tsx
ª       ERPSecurityPanel.tsx
ª       index.ts
ª       
+---security-runtime
ª       ERPProtectedAction.tsx
ª       ERPRuntimeSecurityBadge.tsx
ª       ERPSecurityContextPanel.tsx
ª       index.ts
ª       
+---shell
ª       ErpShell.tsx
ª       ErpSidebar.tsx
ª       ErpTopbar.tsx
ª       
+---smart-intelligence
ª       index.ts
ª       SmartAnomaliesPanel.tsx
ª       SmartOperationalIntelligencePanel.tsx
ª       SmartPredictionsPanel.tsx
ª       SmartRecommendationsPanel.tsx
ª       SmartRiskBadge.tsx
ª       SmartScorePanel.tsx
ª       
+---smart-runtime
ª       ERPSmartInsightsPanel.tsx
ª       ERPSmartPriorityPanel.tsx
ª       ERPSmartRecommendationsPanel.tsx
ª       ERPSmartRuntimePanel.tsx
ª       index.ts
ª       
+---stats
ª       ERPStatTile.tsx
ª       
+---streams
ª       ERPStreamsChannelsPanel.tsx
ª       ERPStreamsDashboard.tsx
ª       ERPStreamsMetricsGrid.tsx
ª       ERPStreamsTimelinePanel.tsx
ª       index.ts
ª       
+---templates
ª       ERPModuleActionPageTemplate.tsx
ª       ERPModuleActivityPanel.tsx
ª       ERPModuleDashboardTemplate.tsx
ª       ERPModuleHeader.tsx
ª       ERPModuleKpiGrid.tsx
ª       ERPModuleListTemplate.tsx
ª       ERPModuleTabs.tsx
ª       ERPModuleToolbar.tsx
ª       ERPModuleWorkflowPanel.tsx
ª       ERPPageTemplateRegistry.tsx
ª       index.ts
ª       
+---tenant
ª       ERPTenantDashboard.tsx
ª       ERPTenantMetricsGrid.tsx
ª       ERPTenantMetricsPanel.tsx
ª       ERPTenantRegistryPanel.tsx
ª       index.ts
ª       
+---testing
ª       ERPTestingDashboard.tsx
ª       ERPTestingHistoryPanel.tsx
ª       ERPTestingMetricsGrid.tsx
ª       ERPTestingRegistryPanel.tsx
ª       index.ts
ª       
+---theme
ª       ERPCard.tsx
ª       ERPSeverityBadge.tsx
ª       ERPStatusBadge.tsx
ª       ERPTable.tsx
ª       ERPTheme.ts
ª       ERPThemeProvider.tsx
ª       tokens.ts
ª       
+---timeline
ª       ERPEventTimeline.tsx
ª       
+---ui
ª   ª   ERPBadge.tsx
ª   ª   ERPButton.tsx
ª   ª   ERPCard.tsx
ª   ª   ERPChartCard.tsx
ª   ª   ERPDataList.tsx
ª   ª   ERPDrawer.tsx
ª   ª   ERPEmptyState.tsx
ª   ª   ERPGrid.tsx
ª   ª   ERPInput.tsx
ª   ª   ERPMetricCard.tsx
ª   ª   ERPModal.tsx
ª   ª   ERPModuleIcon.tsx
ª   ª   ERPPage.tsx
ª   ª   ERPPageHeader.tsx
ª   ª   ERPPanel.tsx
ª   ª   ERPSection.tsx
ª   ª   ERPSelect.tsx
ª   ª   ERPSkeleton.tsx
ª   ª   ERPStack.tsx
ª   ª   ERPStatCard.tsx
ª   ª   ERPTable.tsx
ª   ª   ERPTabs.tsx
ª   ª   ERPTheme.ts
ª   ª   ERPToast.tsx
ª   ª   ERPToolbar.tsx
ª   ª   index.ts
ª   ª   
ª   +---table
ª           ERPTable.tsx
ª           index.ts
ª           
+---workers
ª       ERPSchedulerPanel.tsx
ª       ERPWorkerHistoryPanel.tsx
ª       ERPWorkerQueue.tsx
ª       ERPWorkersDashboard.tsx
ª       ERPWorkersMetricsGrid.tsx
ª       ERPWorkersRegistryPanel.tsx
ª       index.ts
ª       
+---workflow
ª       ERPWorkflowBoard.tsx
ª       ERPWorkflowStep.tsx
ª       WorkflowActions.tsx
ª       
+---workflow-designer
ª       ERPWorkflowDesigner.tsx
ª       
+---workflow-editor
ª       ERPVisualWorkflowEditor.tsx
ª       
+---workflow-runtime
ª       ERPWorkflowRuntimePanel.tsx
ª       index.ts
ª       
+---workflows
ª       ERPRuntimeWorkflowDashboard.tsx
ª       ERPWorkflowDefinitionsPanel.tsx
ª       ERPWorkflowExecutionsPanel.tsx
ª       ERPWorkflowMetricGrid.tsx
ª       ERPWorkflowTimelinePanel.tsx
ª       index.ts
ª       
+---workspace
        ERPWorkspaceActivity.tsx
        ERPWorkspaceCommandCenter.tsx
        ERPWorkspaceContextPanel.tsx
        ERPWorkspaceLayout.tsx
        ERPWorkspaceQuickActions.tsx
        ERPWorkspaceTabs.tsx
        index.ts
        
```

# Structure routes privees

```text
Structure du dossier
Le numÚro de sÚrie du volume est A0A2-4E35
C:\USERS\ADMIN\TERRAGEST\SRC\APP\(PRIVATE)
ª   layout.tsx
ª   page.tsx
ª   
+---achats
ª   ª   page.tsx
ª   ª   
ª   +---nouveau
ª   ª       page.tsx
ª   ª       
ª   +---[id]
ª       ª   page.tsx
ª       ª   
ª       +---edit
ª               page.tsx
ª               
+---ai-runtime
ª       page.tsx
ª       
+---automation
ª       page.tsx
ª       
+---billing
ª       page.tsx
ª       
+---clients
ª   ª   page.tsx
ª   ª   
ª   +---nouveau
ª   ª       page.tsx
ª   ª       
ª   +---[id]
ª       ª   page.tsx
ª       ª   
ª       +---edit
ª               page.tsx
ª               
+---commandes
ª   ª   page.tsx
ª   ª   
ª   +---nouveau
ª   ª       page.tsx
ª   ª       
ª   +---[id]
ª       ª   page.tsx
ª       ª   
ª       +---edit
ª               page.tsx
ª               
+---compliance
ª       page.tsx
ª       
+---contrats
ª   ª   page.tsx
ª   ª   
ª   +---audit
ª   ª       page.tsx
ª   ª       
ª   +---export
ª   ª       page.tsx
ª   ª       
ª   +---import
ª   ª       page.tsx
ª   ª       
ª   +---nouveau
ª   ª       page.tsx
ª   ª       
ª   +---relations
ª   ª       page.tsx
ª   ª       
ª   +---workflows
ª   ª       page.tsx
ª   ª       
ª   +---[id]
ª       ª   page.tsx
ª       ª   
ª       +---edit
ª               page.tsx
ª               
+---dashboard
ª   ª   page.tsx
ª   ª   page.tsx.bak.dashboard-split
ª   ª   
ª   +---[dashboardKey]
ª           page.tsx
ª           
+---depenses
ª   ª   page.tsx
ª   ª   
ª   +---nouveau
ª   ª       page.tsx
ª   ª       
ª   +---[id]
ª       ª   page.tsx
ª       ª   
ª       +---edit
ª               page.tsx
ª               
+---devis
ª   ª   page.tsx
ª   ª   
ª   +---nouveau
ª   ª       page.tsx
ª   ª       
ª   +---[id]
ª       ª   page.tsx
ª       ª   
ª       +---edit
ª               page.tsx
ª               
+---employes
ª   ª   page.tsx
ª   ª   
ª   +---nouveau
ª   ª       page.tsx
ª   ª       
ª   +---[id]
ª       ª   page.tsx
ª       ª   
ª       +---edit
ª               page.tsx
ª               
+---exploitations
ª   ª   page.tsx
ª   ª   
ª   +---audit
ª   ª       page.tsx
ª   ª       
ª   +---details
ª   ª       page.tsx
ª   ª       
ª   +---export
ª   ª       page.tsx
ª   ª       
ª   +---import
ª   ª       page.tsx
ª   ª       
ª   +---nouveau
ª   ª       page.tsx
ª   ª       
ª   +---relations
ª   ª       page.tsx
ª   ª       
ª   +---workflows
ª   ª       page.tsx
ª   ª       
ª   +---[id]
ª       ª   page.tsx
ª       ª   
ª       +---edit
ª               page.tsx
ª               
+---factures
ª   ª   page.tsx
ª   ª   
ª   +---nouveau
ª   ª       page.tsx
ª   ª       
ª   +---[id]
ª       ª   page.tsx
ª       ª   
ª       +---edit
ª               page.tsx
ª               
+---fournisseurs
ª   ª   page.tsx
ª   ª   page.tsx.bak
ª   ª   
ª   +---nouveau
ª   ª       page.tsx
ª   ª       page.tsx.bak
ª   ª       
ª   +---[id]
ª       ª   page.tsx
ª       ª   page.tsx.bak
ª       ª   
ª       +---edit
ª               page.tsx
ª               page.tsx.bak
ª               
+---incidents
ª   ª   page.tsx
ª   ª   
ª   +---nouveau
ª   ª       page.tsx
ª   ª       
ª   +---[id]
ª       ª   page.tsx
ª       ª   
ª       +---edit
ª               page.tsx
ª               
+---interventions
ª   ª   page.tsx
ª   ª   
ª   +---audit
ª   ª       page.tsx
ª   ª       
ª   +---export
ª   ª       page.tsx
ª   ª       
ª   +---import
ª   ª       page.tsx
ª   ª       
ª   +---nouveau
ª   ª       page.tsx
ª   ª       
ª   +---relations
ª   ª       page.tsx
ª   ª       
ª   +---workflow
ª   ª       page.tsx
ª   ª       
ª   +---workflows
ª   ª       page.tsx
ª   ª       
ª   +---[id]
ª       ª   page.tsx
ª       ª   
ª       +---edit
ª               page.tsx
ª               
+---intrants
ª   ª   page.tsx
ª   ª   
ª   +---nouveau
ª   ª       page.tsx
ª   ª       
ª   +---[id]
ª       ª   page.tsx
ª       ª   
ª       +---edit
ª               page.tsx
ª               
+---livraisons
ª   ª   page.tsx
ª   ª   
ª   +---nouveau
ª   ª       page.tsx
ª   ª       
ª   +---[id]
ª       ª   page.tsx
ª       ª   
ª       +---edit
ª               page.tsx
ª               
+---maintenance
ª   ª   page.tsx
ª   ª   
ª   +---audit
ª   ª       page.tsx
ª   ª       
ª   +---export
ª   ª       page.tsx
ª   ª       
ª   +---import
ª   ª       page.tsx
ª   ª       
ª   +---nouveau
ª   ª       page.tsx
ª   ª       
ª   +---relations
ª   ª       page.tsx
ª   ª       
ª   +---workflows
ª   ª       page.tsx
ª   ª       
ª   +---[id]
ª       ª   page.tsx
ª       ª   
ª       +---edit
ª               page.tsx
ª               
+---materiels
ª   ª   page.tsx
ª   ª   page.tsx.bak
ª   ª   
ª   +---audit
ª   ª       page.tsx
ª   ª       
ª   +---export
ª   ª       page.tsx
ª   ª       
ª   +---import
ª   ª       page.tsx
ª   ª       
ª   +---nouveau
ª   ª       page.tsx
ª   ª       
ª   +---pannes
ª   ª   +---nouveau
ª   ª           page.tsx
ª   ª           
ª   +---relations
ª   ª       page.tsx
ª   ª       
ª   +---workflows
ª   ª       page.tsx
ª   ª       
ª   +---[id]
ª       ª   page.tsx
ª       ª   
ª       +---edit
ª               page.tsx
ª               
+---monitoring
ª       page.tsx
ª       
+---notifications
ª       page.tsx
ª       
+---observability
ª       page.tsx
ª       
+---offline
ª       page.tsx
ª       
+---operations
ª       page.tsx
ª       
+---organization-analytics
ª       page.tsx
ª       
+---paiements
ª   ª   page.tsx
ª   ª   
ª   +---audit
ª   ª       page.tsx
ª   ª       
ª   +---export
ª   ª       page.tsx
ª   ª       
ª   +---import
ª   ª       page.tsx
ª   ª       
ª   +---nouveau
ª   ª       page.tsx
ª   ª       
ª   +---relations
ª   ª       page.tsx
ª   ª       
ª   +---workflows
ª   ª       page.tsx
ª   ª       
ª   +---[id]
ª       ª   page.tsx
ª       ª   
ª       +---edit
ª               page.tsx
ª               
+---parcelles
ª   ª   page.tsx
ª   ª   
ª   +---nouveau
ª   ª       page.tsx
ª   ª       
ª   +---[id]
ª       ª   page.tsx
ª       ª   
ª       +---edit
ª               page.tsx
ª               
+---persistence
ª       page.tsx
ª       
+---platform
ª       page.tsx
ª       
+---production
ª       page.tsx
ª       
+---produits
ª   ª   page.tsx
ª   ª   
ª   +---audit
ª   ª       page.tsx
ª   ª       
ª   +---export
ª   ª       page.tsx
ª   ª       
ª   +---import
ª   ª       page.tsx
ª   ª       
ª   +---nouveau
ª   ª       page.tsx
ª   ª       
ª   +---relations
ª   ª       page.tsx
ª   ª       
ª   +---workflows
ª   ª       page.tsx
ª   ª       
ª   +---[id]
ª       ª   page.tsx
ª       ª   
ª       +---edit
ª               page.tsx
ª               
+---pwa
ª       page.tsx
ª       
+---realtime
ª       page.tsx
ª       
+---recettes
ª   ª   page.tsx
ª   ª   
ª   +---nouveau
ª   ª       page.tsx
ª   ª       
ª   +---[id]
ª       ª   page.tsx
ª       ª   
ª       +---edit
ª               page.tsx
ª               
+---recoltes
ª   ª   page.tsx
ª   ª   
ª   +---nouveau
ª   ª       page.tsx
ª   ª       
ª   +---[id]
ª       ª   page.tsx
ª       ª   
ª       +---edit
ª               page.tsx
ª               
+---resilience
ª       page.tsx
ª       
+---runtime
ª   +---[module]
ª           page.tsx
ª           
+---runtime-cockpit
ª       page.tsx
ª       
+---runtime-registry
ª       page.tsx
ª       
+---runtime-supervision
ª       page.tsx
ª       
+---security
ª       page.tsx
ª       
+---stocks
ª   ª   page.tsx
ª   ª   
ª   +---audit
ª   ª       page.tsx
ª   ª       
ª   +---export
ª   ª       page.tsx
ª   ª       
ª   +---import
ª   ª       page.tsx
ª   ª       
ª   +---new
ª   ª       page.tsx
ª   ª       
ª   +---nouveau
ª   ª       page.tsx
ª   ª       
ª   +---relations
ª   ª       page.tsx
ª   ª       
ª   +---workflows
ª   ª       page.tsx
ª   ª       
ª   +---[id]
ª       ª   page.tsx
ª       ª   
ª       +---edit
ª               page.tsx
ª               
+---streams
ª       page.tsx
ª       
+---supervision
ª       page.tsx
ª       page.tsx.bak.dashboard-split
ª       
+---taches
ª   ª   page.tsx
ª   ª   
ª   +---nouveau
ª   ª       page.tsx
ª   ª       
ª   +---[id]
ª       ª   page.tsx
ª       ª   
ª       +---edit
ª               page.tsx
ª               
+---team
ª       page.tsx
ª       
+---tenants
ª       page.tsx
ª       
+---terrains
ª   ª   page.tsx
ª   ª   
ª   +---audit
ª   ª       page.tsx
ª   ª       
ª   +---export
ª   ª       page.tsx
ª   ª       
ª   +---import
ª   ª       page.tsx
ª   ª       
ª   +---nouveau
ª   ª       page.tsx
ª   ª       
ª   +---relations
ª   ª       page.tsx
ª   ª       
ª   +---workflows
ª   ª       page.tsx
ª   ª       
ª   +---[id]
ª       ª   page.tsx
ª       ª   
ª       +---edit
ª               page.tsx
ª               
+---testing
ª       page.tsx
ª       
+---vehicules
ª   ª   page.tsx
ª   ª   
ª   +---nouveau
ª   ª       page.tsx
ª   ª       
ª   +---[id]
ª       ª   page.tsx
ª       ª   
ª       +---edit
ª               page.tsx
ª               
+---workers
ª       page.tsx
ª       
+---workflows-runtime
        page.tsx
        
```

# Structure scripts

```text
Structure du dossier
Le numÚro de sÚrie du volume est A0A2-4E35
C:\USERS\ADMIN\TERRAGEST\SCRIPTS
ª   apply-firestore-display-fix.ps1
ª   apply-ui-system-to-dashboard.ps1
ª   apply-ui-system-to-shell.ps1
ª   connect-auth-shell.ps1
ª   connect-governance-runtime.ps1
ª   connect-maintenance-workflow.ps1
ª   connect-materials-firestore.ps1
ª   connect-policies-governance.ps1
ª   connect-stock-runtime.ps1
ª   connect-workflow-permissions-states.ps1
ª   connect-workflow-store-runtime.ps1
ª   create-erp-module.ps1
ª   erp-ui-cleanup.ps1
ª   extend-module-runtime-events.ps1
ª   extend-module-runtime-workflows.ps1
ª   extend-module-runtime.ps1
ª   fix-all-use-client-imports.ps1
ª   fix-erp-scaffolder.ps1
ª   fix-exploitation-details.ps1
ª   fix-firestore-dates.ps1
ª   fix-firestore-display-values.ps1
ª   fix-maintenance-workflow-async.ps1
ª   fix-materiels-nouveau-dynamic-form.ps1
ª   fix-use-client-imports.ps1
ª   generate-domain.ps1
ª   integrate-dynamic-form-maintenance.ps1
ª   integrate-exploitations-runtime.ps1
ª   integrate-maintenance-workflow-ui.ps1
ª   integrate-materiels-runtime.ps1
ª   integrate-runtime-scheduler.ps1
ª   integrate-terrains-runtime.ps1
ª   integrate-workflow-persistence.ps1
ª   refactor-stock-generic-ui.ps1
ª   repair-format-display-imports.ps1
ª   setup-authentication.ps1
ª   setup-dynamic-domain-discovery.ps1
ª   setup-erp-shell.ps1
ª   setup-firestore-persistence.ps1
ª   setup-firestore-realtime.ps1
ª   setup-generic-erp-components.ps1
ª   setup-maintenance-ui-orchestration.ps1
ª   setup-module-runtime.ps1
ª   setup-operations-dashboard.ps1
ª   setup-premium-erp-table.ps1
ª   setup-private-stock-module.ps1
ª   setup-rule-pipeline-runtime.ps1
ª   setup-runtime-autoregistration.ps1
ª   setup-runtime-bootstrap.ps1
ª   setup-runtime-factories.ps1
ª   setup-runtime-governance.ps1
ª   setup-runtime-policies.ps1
ª   setup-stock-details.ps1
ª   setup-stock-module-runtime.ps1
ª   setup-stock-runtime-store.ps1
ª   setup-stock-ui-module.ps1
ª   setup-stock-workflow-actions.ps1
ª   setup-stock-workflow-ui.ps1
ª   setup-ui-system-final.ps1
ª   setup-workflow-state-machine.ps1
ª   setup-workflow-store.ps1
ª   setup-workflow-supervision.ps1
ª   
+---ai
ª       setup-ai-analytics.ps1
ª       
+---alerts
ª       setup-realtime-alerts.ps1
ª       
+---analytics
ª       setup-analytics-charts.ps1
ª       setup-organization-analytics.ps1
ª       setup-realtime-analytics.ps1
ª       
+---architecture
ª       consolidate-enterprise-ui.ps1
ª       migrate-materiels-clean-architecture.ps1
ª       migrate-workflow-engine-to-runtime.ps1
ª       setup-architecture-governance.ps1
ª       setup-enterprise-foundation.ps1
ª       
+---audit
ª       audit-business-fields-duplication.ps1
ª       audit-business-fields-quality.ps1
ª       audit-enterprise-datatable-usages.ps1
ª       audit-legacy-table-usages.ps1
ª       audit-production-hardening.ps1
ª       audit-repository-governance.ps1
ª       audit-runtime-consistency.ps1
ª       audit-runtime-duplications.ps1
ª       audit-runtime-realtime.ps1
ª       audit-runtime-relations.ps1
ª       audit-runtime-repositories.ps1
ª       audit-terragest-architecture.ps1
ª       audit-terragest-runtime.ps1
ª       audit-ui-runtime-convergence.ps1
ª       classify-legacy-ui.ps1
ª       export-terragest-state.ps1
ª       export-terragest-structure.ps1
ª       find-legacy-realtime-hooks.ps1
ª       run-terragest-coherent-audit.ps1
ª       
+---automation
ª       setup-automation-engine.ps1
ª       
+---bootstrap
ª       start-cloud.ps1
ª       start-mobile.ps1
ª       start-web.ps1
ª       
+---business
ª       fix-core-modules-options.ps1
ª       replace-core-modules.ps1
ª       setup-produits-usable.ps1
ª       
+---business-model
ª       create-contrats-module-v2.ps1
ª       create-exploitations-module-v2.ps1
ª       create-terrains-module-v2.ps1
ª       prepare-business-model-v2.ps1
ª       
+---ci
ª       github-actions-template.yml
ª       
+---config
ª       fix-card-title-props-global.ps1
ª       fix-private-auth-layout.ps1
ª       fix-private-layout.ps1
ª       fix-root-auth-provider.ps1
ª       generate-erp-module.ps1
ª       restore-exploitations-safe.ps1
ª       restore-exploitations-safe_1.ps1
ª       restore-materiels-safe.ps1
ª       restore-produits-safe.ps1
ª       setup-ai-automation-engine.ps1
ª       setup-ai-chat-assistant.ps1
ª       setup-ai-vision-foundation.ps1
ª       setup-api-layer.ps1
ª       setup-audit-system.ps1
ª       setup-auth-client-only.ps1
ª       setup-auth-roles-safe.ps1
ª       setup-auth.ps1
ª       setup-business-modules-foundation.ps1
ª       setup-cloud-native-platform.ps1
ª       setup-confirm-dialogs.ps1
ª       setup-core-firebase.ps1
ª       setup-dashboard-bi-integration.ps1
ª       setup-dashboard-kpi.ps1
ª       setup-dashboard-notifications.ps1
ª       setup-dashboard.ps1
ª       setup-data-platform-analytics-lake.ps1
ª       setup-data-table.ps1
ª       setup-datatable-actions.ps1
ª       setup-design-system.ps1
ª       setup-developer-platform.ps1
ª       setup-devops-cloud-platform.ps1
ª       setup-digital-twin-platform.ps1
ª       setup-domain-standardization.ps1
ª       setup-enterprise-ai-platform.ps1
ª       setup-enterprise-analytics-platform.ps1
ª       setup-enterprise-api-foundation.ps1
ª       setup-enterprise-appshell.ps1
ª       setup-enterprise-authentication-platform.ps1
ª       setup-enterprise-crud-foundation.ps1
ª       setup-enterprise-data-model.ps1
ª       setup-enterprise-data-platform.ps1
ª       setup-enterprise-frontend-foundation.ps1
ª       setup-enterprise-security-platform.ps1
ª       setup-enterprise-toast-system.ps1
ª       setup-enterprise-workflow-orchestration.ps1
ª       setup-erp-analytics.ps1
ª       setup-erp-core.ps1
ª       setup-event-driven-workflow-platform.ps1
ª       setup-exploitations-crud-ui.ps1
ª       setup-exploitations-dashboard.ps1
ª       setup-exploitations-domain.ps1
ª       setup-exploitations-edit-modal.ps1
ª       setup-exploitations-enterprise-actions.ps1
ª       setup-exploitations.ps1
ª       setup-export-engine.ps1
ª       setup-firebase.ps1
ª       setup-firestore-pagination.ps1
ª       setup-firestore-realtime-engine.ps1
ª       setup-firestore-realtime-platform.ps1
ª       setup-firestore-security-enterprise.ps1
ª       setup-form-engine.ps1
ª       setup-frontend-data-layer.ps1
ª       setup-global-bootstrap-platform.ps1
ª       setup-intervention-workflow.ps1
ª       setup-iot-monitoring-platform.ps1
ª       setup-kpi-dashboard.ps1
ª       setup-live-operations-dashboard.ps1
ª       setup-login.ps1
ª       setup-marketplace-ecosystem.ps1
ª       setup-mobile-field-operations-platform.ps1
ª       setup-mobile-foundation.ps1
ª       setup-mobile-gis.ps1
ª       setup-mobile-media-system.ps1
ª       setup-mobile-offline-engine.ps1
ª       setup-mobile-push-notifications.ps1
ª       setup-mobile-qr-scanner.ps1
ª       setup-mouvements.ps1
ª       setup-multi-organisation-enterprise-layer.ps1
ª       setup-multi-tenant-saas.ps1
ª       setup-multitenant.ps1
ª       setup-notification-center.ps1
ª       setup-permission-integration.ps1
ª       setup-private-app.ps1
ª       setup-produits-clean-architecture.ps1
ª       setup-produits-full-crud.ps1
ª       setup-produits.ps1
ª       setup-pwa-terragest.ps1
ª       setup-relational-dashboard.ps1
ª       setup-relations.ps1
ª       setup-ressources.ps1
ª       setup-roles-permissions.ps1
ª       setup-saas-billing-platform.ps1
ª       setup-saas-billing-system.ps1
ª       setup-saas-infrastructure-platform.ps1
ª       setup-saas-layout.ps1
ª       setup-stock-automation.ps1
ª       setup-stocks-firestore-safe.ps1
ª       setup-superadmin-platform.ps1
ª       setup-toast-system.ps1
ª       setup-update-delete-audit.ps1
ª       setup-workflow-engine.ps1
ª       
+---core
ª       setup-generic-firestore-core.ps1
ª       
+---crud
ª       connect-produits-pages.ps1
ª       setup-document-editing.ps1
ª       setup-enterprise-crud-toolkit.ps1
ª       setup-generic-crud.ps1
ª       setup-produits-actions.ps1
ª       upgrade-produits-ui.ps1
ª       
+---dashboard
ª       connect-business-alerts.ps1
ª       fix-business-metrics-module-lookup.ps1
ª       separate-dashboards.ps1
ª       setup-business-alerts-dashboard.ps1
ª       setup-business-runtime-dashboard.ps1
ª       setup-dashboard-registry.ps1
ª       setup-dashboard-route-resolver.ps1
ª       setup-dashboard.ps1
ª       setup-generic-erp-dashboard.ps1
ª       setup-widget-registry.ps1
ª       
+---data
ª       seed-erp-demo-data.ts
ª       setup-data-platform.ps1
ª       setup-persistent-eventstore.ps1
ª       
+---debug
ª       find-produits-nouveau.ps1
ª       
+---encoding
ª       fix-mojibake-texts.ps1
ª       
+---enterprise
ª       bootstrap-enterprise-runtime.ps1
ª       setup-materiel-breakdown-flow.ps1
ª       
+---env
ª       switch-env.ps1
ª       
+---erp
ª       connect-automation-dashboard.ps1
ª       connect-create-page-action-engine.ps1
ª       connect-erp-hooks.ps1
ª       connect-erp-rules-engine.ps1
ª       connect-erp-ui-core.ps1
ª       connect-event-bus.ps1
ª       connect-event-job-pipeline.ps1
ª       connect-job-monitoring.ps1
ª       connect-metrics-pipeline.ps1
ª       connect-realtime-metrics-dashboard.ps1
ª       connect-runtime-persistence.ps1
ª       connect-runtime-timeline-ui.ps1
ª       connect-runtime-timeline.ps1
ª       connect-transition-engine.ps1
ª       create-erp-module-v2.ps1
ª       enrich-business-fields.ps1
ª       fix-generic-detail-routes.ps1
ª       fix-generic-edit-routes.ps1
ª       fix-missing-core-modules.ps1
ª       generate-agricultural-field-factories.ps1
ª       generate-terragest-domain-model.ps1
ª       industrialize-business-modules.ps1
ª       install-terragest-global-business-model-v2.ps1
ª       migrate-core-business-modules.ps1
ª       normalize-business-module.ps1
ª       normalize-runtime-relations.ps1
ª       safe-business-module-normalization.ps1
ª       setup-auth-enterprise-layer.ps1
ª       setup-automation-engine.ps1
ª       setup-automation-registry.ps1
ª       setup-business-transaction-engine.ps1
ª       setup-circuit-breaker-engine.ps1
ª       setup-collaborative-runtime.ps1
ª       setup-command-center.ps1
ª       setup-continuous-worker-loop.ps1
ª       setup-dead-letter-queue.ps1
ª       setup-dynamic-form-engine.ps1
ª       setup-erp-action-engine.ps1
ª       setup-erp-convergence-core.ps1
ª       setup-erp-hooks-system.ps1
ª       setup-erp-rules-engine.ps1
ª       setup-erp-schemas.ps1
ª       setup-erp-ui-core.ps1
ª       setup-event-bus.ps1
ª       setup-event-store.ps1
ª       setup-executive-dashboard.ps1
ª       setup-firestore-persistence-provider.ps1
ª       setup-generic-create-page.ps1
ª       setup-generic-detail-page.ps1
ª       setup-generic-edit-page.ps1
ª       setup-generic-list-page.ps1
ª       setup-job-lifecycle.ps1
ª       setup-job-queue-system.ps1
ª       setup-live-supervision-ui.ps1
ª       setup-metrics-engine.ps1
ª       setup-module-capabilities-engine.ps1
ª       setup-module-ui-convergence.ps1
ª       setup-permission-engine.ps1
ª       setup-persistence-provider.ps1
ª       setup-priority-engine.ps1
ª       setup-relation-engine.ps1
ª       setup-relation-graph-ui.ps1
ª       setup-retry-engine.ps1
ª       setup-runtime-bootstrap.ps1
ª       setup-runtime-persistence.ps1
ª       setup-runtime-realtime-channel.ps1
ª       setup-runtime-realtime-engine.ps1
ª       setup-runtime-repository-governance.ps1
ª       setup-runtime-timeline-ui.ps1
ª       setup-runtime-timeline.ps1
ª       setup-security-audit-engine.ps1
ª       setup-status-engine.ps1
ª       setup-tenant-isolation-engine.ps1
ª       setup-throttling-engine.ps1
ª       setup-transition-engine.ps1
ª       setup-validation-engine.ps1
ª       setup-visual-workflow-editor.ps1
ª       setup-worker-loop.ps1
ª       setup-worker-router.ps1
ª       setup-worker-types.ps1
ª       setup-workflow-visual-designer.ps1
ª       verify-erp-industrialization.ps1
ª       
+---erp-actions
ª       setup-action-routing-pages.ps1
ª       setup-enterprise-action-system.ps1
ª       
+---erp-alignment
ª       erp-ui-architecture-alignment.ps1
ª       
+---erp-audit
ª       audit-module-connections.ps1
ª       
+---erp-automation-runtime
ª       setup-real-automation-runtime.ps1
ª       
+---erp-connect-all
ª       connect-all-modules.ps1
ª       
+---erp-data-binding
ª       setup-runtime-data-binding.ps1
ª       
+---erp-enterprise-consolidation
ª       setup-enterprise-runtime-consolidation.ps1
ª       
+---erp-event-runtime
ª       setup-cross-module-event-runtime.ps1
ª       
+---erp-firestore-runtime
ª       setup-firestore-runtime.ps1
ª       
+---erp-forms
ª       setup-enterprise-form-system.ps1
ª       
+---erp-layout
ª       add-enterprise-actions-tabs.ps1
ª       apply-runtime-layout-to-real-pages.ps1
ª       clean-runtime-business-ui.ps1
ª       fix-erp-shell-final.ps1
ª       fix-visible-enterprise-ui.ps1
ª       reset-clean-erp-ui.ps1
ª       setup-enterprise-layout-system.ps1
ª       
+---erp-os
ª       setup-enterprise-os.ps1
ª       
+---erp-production-hardening
ª       setup-production-hardening.ps1
ª       
+---erp-security-runtime
ª       setup-permissions-security-runtime.ps1
ª       
+---erp-smart-intelligence
ª       setup-smart-operational-intelligence.ps1
ª       
+---erp-smart-runtime
ª       setup-smart-runtime-erp.ps1
ª       
+---erp-templates
ª       clean-dashboard-business.ps1
ª       clean-visible-technical-ui.ps1
ª       fix-tailwind-v4.ps1
ª       realign-erp-ui-architecture.ps1
ª       
+---erp-workflow-runtime
ª       setup-real-workflow-runtime.ps1
ª       
+---erp-workspace
ª       setup-enterprise-workspace-system.ps1
ª       
+---features
ª       setup-produits-module.ps1
ª       
+---fix
ª   ª   fix-imports.ps1
ª   ª   fix-next-structure.ps1
ª   ª   
ª   +---scripts
ª       +---fix
ª               fix-tableau-de-bord-names.ps1
ª               
+---generators
ª   ª   Generate-CoreFoundation.ps1
ª   ª   Generate-Domain.ps1
ª   ª   Generate-EnterpriseModule.ps1
ª   ª   generate-erp-module.ps1
ª   ª   generate-feature-manifests.ps1
ª   ª   new-domain-module.ps1
ª   ª   
ª   +---registry
ª           features.ps1
ª           
+---governance
ª       setup-architecture-governance.ps1
ª       
+---integrations
ª       setup-enterprise-integrations.ps1
ª       
+---layout
ª       setup-erp-layout.ps1
ª       setup-modern-erp-layout.ps1
ª       
+---maintenance
ª       add-missing-repository-methods.ps1
ª       add-produit-delete-support.ps1
ª       add-toast-import.ps1
ª       final-build-stabilization.ps1
ª       find-broken-imports.ps1
ª       fix-card-title-props.ps1
ª       fix-firebase-auth-ssr.ps1
ª       fix-mouvement-stock-type.ps1
ª       fix-produit-null-check.ps1
ª       fix-stock-type-name.ps1
ª       fix-template-extensions.ps1
ª       fix-unite-enum-global.ps1
ª       fix-useauth-null-ssr.ps1
ª       Move-Quarantine.ps1
ª       quarantine-broken-pages.ps1
ª       wire-firestore-produit-repository.ps1
ª       
+---materiels
ª       setup-enterprise-materiels-module.ps1
ª       
+---migration
ª       enrich-business-module-schemas.ps1
ª       fix-runtime-module-pages.ps1
ª       register-mass-modules.ps1
ª       replace-clients-with-factory.ps1
ª       
+---modules
ª       audit-module.ps1
ª       disable-module.ps1
ª       
+---notifications
ª       setup-notifications-core.ps1
ª       
+---observability
ª       setup-live-observability.ps1
ª       setup-observability-core.ps1
ª       setup-runtime-observability.ps1
ª       
+---offline
ª       setup-offline-engine.ps1
ª       
+---os
ª       setup-enterprise-os.ps1
ª       
+---payments
ª       setup-stripe-api.ps1
ª       setup-stripe-core.ps1
ª       
+---persistence
ª       connect-runtime-persistence.ps1
ª       setup-firestore-persistence.ps1
ª       
+---platform
ª       connect-runtime-to-shell.ps1
ª       setup-enterprise-shell.ps1
ª       setup-erp-core.ps1
ª       
+---processes
ª       setup-process-engine.ps1
ª       
+---pwa
ª       setup-pwa-core.ps1
ª       
+---quality
ª       setup-enterprise-quality-platform.ps1
ª       
+---realtime
ª       setup-runtime-realtime-platform.ps1
ª       
+---reports
ª       technical-ui-audit.txt
ª       ui-imports-report.txt
ª       
+---rules
ª       setup-business-rule-engine.ps1
ª       
+---runtime
ª       add-campagnes-generated-runtime-module.ps1
ª       add-fournisseurs-core-module.ps1
ª       connect-materiels-runtime.ps1
ª       converge-business-schema-registry.ps1
ª       converge-core-module-registry.ps1
ª       converge-dynamic-form-registry.ps1
ª       converge-erp-registry-module-keys.ps1
ª       converge-generated-schemas.ps1
ª       converge-platform-features.ps1
ª       converge-register-core-erp-modules.ps1
ª       converge-runtime-bindings.ps1
ª       converge-runtime-workflows.ps1
ª       create-terragest-domain-runtime-bridge.ps1
ª       create-terragest-rule-adapter.ps1
ª       fix-enterprise-testing-platform.ps1
ª       fix-fournisseurs-pages-module-prop.ps1
ª       fix-production-hardening-panel.ps1
ª       fix-production-legacy-facade.ps1
ª       fix-production-readiness-definitive.ps1
ª       fix-production-runtime-exports.ps1
ª       fix-runtime-error-reporter.ps1
ª       fix-terragest-domain-runtime-bridge.ps1
ª       rewrite-fournisseurs-pages.ps1
ª       setup-advanced-observability-monitoring.ps1
ª       setup-automation-engine-runtime-hooks.ps1
ª       setup-central-runtime-convergence.ps1
ª       setup-central-runtime-registry.ps1
ª       setup-distributed-workers-engine.ps1
ª       setup-enterprise-ai-layer.ps1
ª       setup-enterprise-testing-platform.ps1
ª       setup-erp-runtime-cockpit.ps1
ª       setup-event-bus-observability-core.ps1
ª       setup-multitenant-runtime-core.ps1
ª       setup-persistence-runtime-enterprise.ps1
ª       setup-production-governance-core.ps1
ª       setup-queue-retry-dlq-runtime.ps1
ª       setup-realtime-live-stream-platform.ps1
ª       setup-realtime-runtime-core.ps1
ª       setup-runtime-module-registration.ps1
ª       setup-runtime-orchestration.ps1
ª       setup-runtime-registry-foundation.ps1
ª       setup-runtime-resilience.ps1
ª       setup-security-rbac-enterprise.ps1
ª       setup-workflow-engine-enterprise.ps1
ª       
+---runtime-modules
ª       finish-runtime-module-system.ps1
ª       
+---runtime-pages
ª       premium-runtime-design-final.ps1
ª       premium-runtime-page.ps1
ª       setup-runtime-generated-pages.ps1
ª       
+---saas
ª       setup-billing-core.ps1
ª       setup-invitation-acceptance.ps1
ª       setup-invitations-core.ps1
ª       setup-memberships-core.ps1
ª       setup-organization-switcher.ps1
ª       setup-organizations-core.ps1
ª       setup-team-management.ps1
ª       setup-tenant-context.ps1
ª       
+---security
ª       setup-firestore-saas-rules.ps1
ª       setup-middleware-auth.ps1
ª       setup-rbac-system.ps1
ª       
+---setup
ª       Initialize-ERPPlatform.ps1
ª       Initialize-EventOrchestration.ps1
ª       Initialize-ExecutionPipeline.ps1
ª       Initialize-ExecutionResilience.ps1
ª       Initialize-PolicyEngine.ps1
ª       Initialize-RuleEngine.ps1
ª       Initialize-WorkflowEngine.ps1
ª       setup-data-foundation.ps1
ª       setup-enterprise-core-files.ps1
ª       setup-enterprise-foundation.ps1
ª       setup-runtime-foundation.ps1
ª       
+---shared
ª       encoding.ps1
ª       filesystem.ps1
ª       logging.ps1
ª       naming.ps1
ª       template-engine.ps1
ª       validation.ps1
ª       
+---stabilization
ª       audit-features-governance.ps1
ª       prepare-stability-plan.ps1
ª       quarantine-legacy-architecture.ps1
ª       
+---templates
ª       bulk-actions.template.txt
ª       chart-widget.template.txt
ª       create-mutation.template.txt
ª       dashboard-card.template.txt
ª       delete-mutation.template.txt
ª       details-page.template.txt
ª       dto.template.txt
ª       edit-page.template.txt
ª       export-actions.template.txt
ª       filters.template.txt
ª       form.template.txt
ª       index.template.txt
ª       indexeddb-storage.template.txt
ª       list-page.template.txt
ª       new-page.template.txt
ª       offline-queue.template.txt
ª       pagination.template.txt
ª       query-hook.template.txt
ª       realtime-listener.template.txt
ª       realtime-widget.template.txt
ª       repository.template.txt
ª       schema.template.txt
ª       service.template.txt
ª       sorting.template.txt
ª       table.template.txt
ª       test.template.txt
ª       update-mutation.template.txt
ª       
+---testing
ª       setup-enterprise-testing.ps1
ª       
+---tests
ª       fix-vitest-playwright-conflict.ps1
ª       improve-test-coverage.ps1
ª       setup-exploitations-tests.ps1
ª       setup-stock-tests.ps1
ª       setup-testing-environment.ps1
ª       setup-tests-structure.ps1
ª       
+---ui-system
        finish-erp-ui-system.ps1
        fix-action-resolver-variants.ps1
        fix-action-system-hard.ps1
        fix-action-template-props.ps1
        fix-all-module-subpages-prerender.ps1
        fix-create-pages-prerender.ps1
        fix-datatable-action-typing.ps1
        fix-enterprise-ui-exports.ps1
        fix-legacy-module-pages-prerender.ps1
        fix-template-registry-exports.ps1
        fix-template-type-details.ps1
        rewrite-template-registry-clean.ps1
        setup-module-ui-convergence-enterprise.ps1
        setup-runtime-ui-generation.ps1
        
```

## coreModules.ts

```text
import type { ERPModule } from "../ERPModule";
import {
  createBusinessModule,
  clientFields, commandeFields, utilisateurFields, tacheFields, incidentFields, maintenanceFields, interventionFields, fournisseurFields, terrainFields, recolteFields, parcelleFields, intrantFields, mouvementFields, stockFields, produitFields, vehiculeFields, employeFields, achatFields, livraisonFields, recetteFields, depenseFields, devisFields, factureFields,
}
from "../factory";

export const coreERPModules: ERPModule[] = [
  createBusinessModule({
    key: "utilisateurs",
    label: "Utilisateurs",
    fields: utilisateurFields,
  }),

  createBusinessModule({
    key: "fournisseurs",
    label: "Fournisseurs",
    fields: fournisseurFields,
  }),

  createBusinessModule({
    key: "clients",
    label: "Clients",
    description: "Gestion centralisÃƒÂ©e des clients.",
    fields: clientFields,
  }),
  createBusinessModule({
    key: "devis",
    label: "Devis",
    description: "Gestion des devis.",
    fields: devisFields,
  }),
  createBusinessModule({
    key: "achats",
    label: "Achats",
    description: "Gestion des achats.",
    fields: achatFields,
  }),
  createBusinessModule({
    key: "taches",
    label: "TÃƒÂ¢ches",
    fields: tacheFields,
  }),

  {
    metadata: {
      key: "incidents",
      label: "Incidents",
      description: "Module ERP Incidents.",
      icon: "package",
      category: "Metier",
      enabled: true,

      routes: {
        list: "/incidents",
        create: "/incidents/nouveau",
        details: "/incidents",
        edit: "/incidents",
      },

      features: {
        dashboard: true,
        analytics: true,
        workflows: true,
        audit: true,
        realtime: true,
        automation: true,
        notifications: true,
        observability: true,
      },
    },

     schema: {
  collection: "incidents",
      fields: [
        {
          key: "nom",
          label: "Nom",
          type: "text",
          required: true,
        },
      ],
    },
  },
  createBusinessModule({
    key: "vehicules",
    label: "VÃƒÂ©hicules",
    description: "Gestion des vÃƒÂ©hicules.",
    fields: vehiculeFields,
  }),
  createBusinessModule({
    key: "parcelles",
    label: "Parcelles",
    fields: parcelleFields,
  }),
  createBusinessModule({
    key: "recoltes",
    label: "RÃƒÂ©coltes",
    fields: recolteFields,
  }),

  {
    metadata: {
      key: "intrants",
      label: "Intrants",
      description: "Module ERP Intrants.",
      icon: "package",
      category: "Metier",
      enabled: true,

      routes: {
        list: "/intrants",
        create: "/intrants/nouveau",
        details: "/intrants",
        edit: "/intrants",
      },

      features: {
        dashboard: true,
        analytics: true,
        workflows: true,
        audit: true,
        realtime: true,
        automation: true,
        notifications: true,
        observability: true,
      },
    },

    schema: {
  collection: "intrants",
      fields: [
        {
          key: "nom",
          label: "Nom",
          type: "text",
          required: true,
        },
      ],
    },
  },
  createBusinessModule({
    key: "depenses",
    label: "DÃƒÂ©penses",
    description: "Gestion des dÃƒÂ©penses.",
    fields: depenseFields,
  }),
  createBusinessModule({
    key: "recettes",
    label: "Recettes",
    description: "Gestion des recettes.",
    fields: recetteFields,
  }),

];
```

## ERPModule.ts

```text
import type { ERPModuleMetadata } from "./metadata/ERPModuleMetadata";
import type { ERPModuleSchema } from "./schemas/ERPModuleSchema";

export interface ERPModuleAction {
  key: string;
  label: string;
  type?: "primary" | "secondary" | "danger" | "ghost";
  permission?: string;
  event?: string;
  href?: string;
}

export interface ERPModuleRelation {
  key: string;
  label: string;
  targetModule?: string;
  targetmodule?: string;
  type: "one-to-one" | "one-to-many" | "many-to-one" | "many-to-many";
}

export interface ERPModuleWorkflow {
  key: string;
  label: string;
  initialState?: string;
  states?: string[];
}

export interface ERPModuleVisibility {
  field: string;
  equals?: string | number | boolean;
  notEquals?: string | number | boolean;
  in?: Array<string | number | boolean>;
}

export interface ERPModulePersistence {
  firestore?: boolean;
  timestamps?: boolean;
  softDelete?: boolean;
}

export interface ERPModulePermissions {
  create?: boolean;
  read?: boolean;
  update?: boolean;
  delete?: boolean;
  import?: boolean;
  export?: boolean;
}

export interface ERPModuleFormTab {
  key: string;
  label: string;
  fields: string[];
}

export interface ERPModuleFormConfig {
  layout?: "sections" | "tabs" | "stepper";
  tabs?: ERPModuleFormTab[];
}

export interface ERPModule {
  metadata: ERPModuleMetadata;
  schema: ERPModuleSchema;

  permissions?: ERPModulePermissions;

  persistence?: ERPModulePersistence;

  visibility?: ERPModuleVisibility;

  form?: ERPModuleFormConfig;

  actions?: ERPModuleAction[];

  relations?: ERPModuleRelation[];

  workflows?: ERPModuleWorkflow[];
}
```

## ERPModuleDefinition.ts

```text
export type ERPFieldType =
  | "text"
  | "number"
  | "date"
  | "boolean"
  | "select"
  | "relation"
  | "textarea"
  | "currency"
  | "status";

export type ERPModuleField = {
  name: string;
  label: string;
  type: ERPFieldType;
  required?: boolean;
  readonly?: boolean;
  relationModule?: string;
  options?: string[];
};

export type ERPModuleAction = {
  name: string;
  label: string;
  type:
    | "create"
    | "update"
    | "delete"
    | "transition"
    | "workflow"
    | "custom";
  event?: string;
  workflow?: string;
  permission?: string;
};

export type ERPModuleRoute = {
  list: string;
  create: string;
  detail: string;
  edit: string;
};

export type ERPModuleDefinition = {
  key: string;
  label: string;
  description?: string;
  collection: string;
  icon?: string;
  routes: ERPModuleRoute;
  fields: ERPModuleField[];
  actions: ERPModuleAction[];
  workflows?: string[];
  rules?: string[];
  events?: string[];
  automations?: string[];
  auditEnabled?: boolean;
  supervisionEnabled?: boolean;
  observabilityEnabled?: boolean;
  realtimeEnabled?: boolean;
};
```

## ERPModuleRegistry.ts

```text
import type { ERPModuleDefinition } from "./ERPModuleDefinition";

export type ERPAnyModule = ERPModuleDefinition | any;

class ERPModuleRegistryClass {
  private modules = new Map<string, ERPAnyModule>();

  private getModuleKey(module: ERPAnyModule): string {
    return (
      module.key ??
      module.id ??
      module.name ??
      module.metadata?.key ??
      module.metadata?.id ??
      module.metadata?.name
    );
  }

  register(module: ERPAnyModule) {
    const key = this.getModuleKey(module);

    if (!key) {
      throw new Error("ERPModuleRegistry: module key is missing");
    }

    this.modules.set(key, module);
    return module;
  }

  registerMany(modules: ERPAnyModule[]) {
    modules.forEach((module) => this.register(module));
    return this.all();
  }

  get(moduleKey: string) {
    return this.modules.get(moduleKey);
  }

  all() {
    return Array.from(this.modules.values());
  }

  getAll() {
    return this.all();
  }

  has(moduleKey: string) {
    return this.modules.has(moduleKey);
  }

  clear() {
    this.modules.clear();
  }
}

export const ERPModuleRegistry = new ERPModuleRegistryClass();
```

## GenericListPage

```text
"use client";

import { useEffect, useState } from "react";

import { ERPRuntimePage } from "@/components/erp/runtime";
import { coreERPModules } from "@/runtime/modules";
import { RuntimeDataBinding } from "@/runtime/data-binding";

import type { ERPModule } from "@/runtime/modules";
import type { RuntimeRecord } from "@/runtime/data-binding";

interface GenericListPageProps {
  module?: ERPModule;
  moduleKey?: string;
}

export function GenericListPage({
  module,
  moduleKey,
}: GenericListPageProps) {
  const runtimeModule =
    module ??
    coreERPModules.find(
      (item) => item.metadata.key === moduleKey
    );

  const [data, setData] =
    useState<RuntimeRecord[]>([]);

  const [loading, setLoading] =
    useState(true);

  useEffect(() => {
    async function loadData() {
      if (!runtimeModule) {
        setLoading(false);
        return;
      }

      try {
        const records =
          await RuntimeDataBinding.list(
            runtimeModule
          );

        

        setData(records);
      } catch (error) {
        console.error(
          "ERP LIST LOAD ERROR",
          error
        );
      } finally {
        setLoading(false);
      }
    }

    loadData();
  }, [runtimeModule]);

  return (
    <ERPRuntimePage
      module={runtimeModule}
      data={loading ? [] : data}
      type="list"
      description={
        loading
          ? "Chargement des donnÃ©es..."
          : undefined
      }
    />
  );
}
```

## GenericCreatePage

```text
import { ERPRuntimePage } from "@/components/erp/runtime";
import { coreERPModules } from "@/runtime/modules/definitions/coreModules";
import type { ERPModule } from "@/runtime/modules";

interface GenericCreatePageProps {
  module?: ERPModule;
  moduleKey?: string;
}

export function GenericCreatePage({
  module,
  moduleKey,
}: GenericCreatePageProps) {
  const runtimeModule =
    module ??
    coreERPModules.find((item) => item.metadata.key === moduleKey);

  return <ERPRuntimePage module={runtimeModule} type="create" />;
}
```

## GenericEditPage

```text
"use client";

import { useEffect, useState } from "react";
import { ERPRuntimePage } from "@/components/erp/runtime";
import { coreERPModules } from "@/runtime/modules";
import { RuntimeDataBinding } from "@/runtime/data-binding";
import type { ERPModule } from "@/runtime/modules";

interface GenericEditPageProps {
  module?: ERPModule;
  moduleKey?: string;
  id?: string;
  record?: Record<string, unknown> | null;
}

export function GenericEditPage({
  module,
  moduleKey,
  id,
  record,
}: GenericEditPageProps) {
  const runtimeModule =
    module ??
    coreERPModules.find((item) => item.metadata.key === moduleKey);

  const [runtimeRecord, setRuntimeRecord] =
    useState<Record<string, unknown> | null | undefined>(record);

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadRecord() {
      if (!runtimeModule || !id) {
        setLoading(false);
        return;
      }

      try {
        const loadedRecord =
          await RuntimeDataBinding.detail(runtimeModule, id);

        setRuntimeRecord(loadedRecord ?? undefined);
      } catch (error) {
        console.error("ERP EDIT LOAD ERROR", error);
        setRuntimeRecord(undefined);
      } finally {
        setLoading(false);
      }
    }

    loadRecord();
  }, [runtimeModule, id]);

  return (
    <ERPRuntimePage
      module={runtimeModule}
      type="edit"
      record={loading ? undefined : runtimeRecord ?? undefined}
      description={loading ? "Chargement de la donnÃ©e..." : undefined}
    />
  );
}
```

## GenericDetailPage

```text
"use client";

import { useEffect, useState } from "react";

import { ERPRuntimePage } from "@/components/erp/runtime";
import { coreERPModules } from "@/runtime/modules";
import { RuntimeDataBinding } from "@/runtime/data-binding";

import type { ERPModule } from "@/runtime/modules";

interface GenericDetailPageProps {
  module?: ERPModule;
  moduleKey?: string;
  id?: string;
  record?: Record<string, unknown> | null;
}

export function GenericDetailPage({
  module,
  moduleKey,
  id,
  record,
}: GenericDetailPageProps) {
  const runtimeModule =
    module ??
    coreERPModules.find(
      (item) => item.metadata.key === moduleKey
    );

  const [runtimeRecord, setRuntimeRecord] =
    useState<Record<string, unknown> | null | undefined>(record);

  const [loading, setLoading] =
    useState(true);

  useEffect(() => {
    async function loadRecord() {
      if (!runtimeModule || !id) {
        setLoading(false);
        return;
      }

      try {
        const loadedRecord =
          await RuntimeDataBinding.detail(
            runtimeModule,
            id
          );

        setRuntimeRecord(
          loadedRecord ?? undefined
        );
      } catch (error) {
        console.error(
          "ERP DETAIL LOAD ERROR",
          error
        );

        setRuntimeRecord(undefined);
      } finally {
        setLoading(false);
      }
    }

    loadRecord();
  }, [runtimeModule, id]);

  return (
    <ERPRuntimePage
      module={runtimeModule}
      type="detail"
      record={
        loading
          ? undefined
          : runtimeRecord ?? undefined
      }
      description={
        loading
          ? "Chargement de la donnÃ©e..."
          : undefined
      }
    />
  );
}
```

## ERPEnterpriseForm

```text
"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

import type { ERPModule } from "@/runtime/modules";
import { ERPModuleBuilder } from "@/runtime/modules";
import { RuntimeDataBinding } from "@/runtime/data-binding";

import { ERPButton } from "@/components/erp/ui";

import { ERPFormField } from "./ERPFormField";
import { ERPFormSection } from "./ERPFormSection";
import { ERPFormSummaryPanel } from "./ERPFormSummaryPanel";
import { ERPFormTabs } from "./ERPFormTabs";

import {
  RuntimeValidationEngine,
} from "@/runtime/validation/RuntimeValidationEngine";

import {
  RuntimeVisibilityEngine,
} from "@/runtime/visibility/RuntimeVisibilityEngine";

import {
  RuntimeComputedEngine,
} from "@/runtime/computed/RuntimeComputedEngine";

import type {
  RuntimeValidationError,
} from "@/runtime/validation/RuntimeValidationTypes";

import {
  erpRuntimeValidationBridge,
} from "@/runtime/rules/ERPRuntimeValidationBridge";

interface ERPEnterpriseFormProps {
  module: ERPModule;
  mode?: "create" | "edit";
  initialData?: Record<string, unknown>;
}

export function ERPEnterpriseForm({
  module,
  mode = "create",
  initialData = {},
}: ERPEnterpriseFormProps) {
  const [saving, setSaving] = useState(false);

  const [errors, setErrors] =
    useState<RuntimeValidationError[]>([]);

  const [formValues, setFormValues] =
    useState<Record<string, unknown>>(initialData);

  const router = useRouter();

  const form =
    ERPModuleBuilder.buildForm(module);

  useEffect(() => {
    const computedValues: Record<string, unknown> = {
      ...formValues,
    };

    form.fields.forEach((field) => {
      if (!field.computed) {
        return;
      }

      computedValues[field.key] =
        RuntimeComputedEngine.compute(
          field.computed.formula,
          computedValues
        );
    });

    const hasChanged =
      JSON.stringify(computedValues) !==
      JSON.stringify(formValues);

    if (hasChanged) {
      setFormValues(computedValues);
    }
  }, [form.fields, formValues]);

  const visibleFields =
    form.fields.filter((field) =>
      RuntimeVisibilityEngine.isVisible(
        field,
        formValues
      )
    );

  const mainFields =
    visibleFields.filter(
      (field) => field.type !== "relation"
    );

  const relationFields =
    visibleFields.filter(
      (field) => field.type === "relation"
    );

  function handleFormChange(
    event: React.FormEvent<HTMLFormElement>
  ) {
    const formData =
      new FormData(event.currentTarget);

    const values =
      Object.fromEntries(formData.entries());

    setFormValues((currentValues) => ({
      ...currentValues,
      ...values,
    }));
  }

  async function handleSubmit(
    event: React.FormEvent<HTMLFormElement>
  ) {
    event.preventDefault();
    setSaving(true);

    const formData =
      new FormData(event.currentTarget);

    const payload: Record<string, unknown> = {
      ...formValues,
    };

    visibleFields.forEach((field) => {
      let value: unknown =
        formData.get(field.key) ??
        formValues[field.key];

      if (
        field.type === "number" &&
        value !== null
      ) {
        value =
          value === ""
            ? null
            : Number(value);
      }

      payload[field.key] =
        value ?? "";
    });

    const validationErrors =
      RuntimeValidationEngine.validate(
        module,
        payload
      );

    setErrors(validationErrors);

    if (validationErrors.length > 0) {
      console.log(
        "ERP VALIDATION ERRORS",
        validationErrors
      );



      setSaving(false);
      return;
    }

const businessRulesValid =
  erpRuntimeValidationBridge.validate(
    module.metadata.key,
    payload
  );

if (!businessRulesValid) {
  console.error(
    "ERP BUSINESS RULE VALIDATION FAILED",
    {
      module: module.metadata.key,
      payload,
    }
  );

  setErrors([
    {
      field: "businessRules",
      message:
        "Les rÃ¨gles mÃ©tier ERP bloquent cet enregistrement.",
    },
  ]);

  setSaving(false);
  return;
}

    try {
      if (mode === "create") {
        await RuntimeDataBinding.create(
          module,
          payload
        );
      } else if (
        mode === "edit" &&
        initialData.id
      ) {
        await RuntimeDataBinding.update(
          module,
          String(initialData.id),
          payload
        );
      }

      router.push(
        module.metadata.routes?.list ??
          `/${module.metadata.key}`
      );

      router.refresh();

      console.log(
        "ERP ENTERPRISE FORM SAVED",
        {
          module: module.metadata.key,
          mode,
          payload,
        }
      );
    } catch (error) {
      console.error(
        "ERP ENTERPRISE FORM ERROR",
        error
      );
    } finally {
      setSaving(false);
    }
  }

  return (
    <form
      onSubmit={handleSubmit}
      onChange={handleFormChange}
      className="space-y-8"
    >
      <section className="overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-sm">
        <div className="bg-gradient-to-r from-slate-950 via-slate-900 to-blue-950 px-8 py-8 text-white">
          <p className="text-sm font-bold uppercase tracking-wide text-blue-200">
            {mode === "create"
              ? "CrÃ©ation"
              : "Modification"}
          </p>

          <h1 className="mt-3 text-4xl font-black tracking-tight">
            {module.metadata.label}
          </h1>

          <p className="mt-3 max-w-3xl text-base leading-7 text-slate-300">
            Formulaire mÃ©tier connectÃ© au binding runtime.
          </p>
        </div>
      </section>

      <section className="grid gap-8 xl:grid-cols-[1fr_360px]">
        <div className="space-y-6">
          <div className="rounded-xl bg-yellow-50 p-4 text-sm text-slate-900">
            layout: {module.form?.layout ?? "aucun"}
            <br />
            tabs: {module.form?.tabs?.length ?? 0}
          </div>

          {module.form?.layout === "tabs" ? (
            <ERPFormTabs
              module={module}
              initialData={formValues}
              formValues={formValues}
            />
          ) : (
            <>
              <ERPFormSection
                title="Informations principales"
                description="Renseigne les champs principaux du module."
              >
                {mainFields.map((field) => (
                  <ERPFormField
                    key={field.key}
                    field={field}
                    initialValue={
                      formValues[field.key]
                    }
                  />
                ))}
              </ERPFormSection>

              {relationFields.length > 0 && (
                <ERPFormSection
                  title="Relations"
                  description="Associe cet Ã©lÃ©ment aux autres objets mÃ©tier."
                >
                  {relationFields.map((field) => (
                    <ERPFormField
                      key={field.key}
                      field={field}
                      initialValue={
                        formValues[field.key]
                      }
                    />
                  ))}
                </ERPFormSection>
              )}
            </>
          )}

          <div className="flex flex-wrap gap-3 rounded-3xl border border-slate-200 bg-white p-5 shadow-sm">
            {errors.length > 0 && (
              <div className="w-full rounded-3xl border border-red-200 bg-red-50 p-5">
                <h3 className="text-sm font-black text-red-700">
                  Validation mÃ©tier
                </h3>

                <div className="mt-3 space-y-2">
                  {errors.map((error, index) => (
                    <div
                      key={index}
                      className="text-sm text-red-600"
                    >
                      â€¢ {error.field} : {error.message}
                    </div>
                  ))}
                </div>
              </div>
            )}

            <ERPButton
              type="submit"
              disabled={saving}
            >
              {saving
                ? "Enregistrement..."
                : "Enregistrer"}
            </ERPButton>

            <ERPButton
              variant="secondary"
              type="button"
              disabled={saving}
              onClick={() => {
                console.log(
                  "Enregistrer et continuer cliquÃ©"
                );
              }}
            >
              Enregistrer et continuer
            </ERPButton>

            <ERPButton
              variant="secondary"
              type="button"
              disabled={saving}
              onClick={() =>
                router.push(
                  module.metadata.routes?.list ??
                    `/${module.metadata.key}`
                )
              }
            >
              Annuler
            </ERPButton>
          </div>
        </div>

        <ERPFormSummaryPanel module={module} />
      </section>
    </form>
  );
}
```

## ERPFormTabs

```text
"use client";

import { useState } from "react";

import type {
  ERPModule,
  ERPModuleField,
} from "@/runtime/modules";

import {
  RuntimeVisibilityEngine,
} from "@/runtime/visibility/RuntimeVisibilityEngine";

import { ERPFormField } from "./ERPFormField";

interface ERPFormTabsProps {
  module: ERPModule;
  initialData?: Record<string, unknown>;
  formValues?: Record<string, unknown>;
}

export function ERPFormTabs({
  module,
  initialData = {},
  formValues = {},
}: ERPFormTabsProps) {
  const [activeTab, setActiveTab] =
    useState(
      module.form?.tabs?.[0]?.key ?? ""
    );

  const tabs =
    module.form?.tabs ?? [];

  const fields =
    module.schema.fields;

  const activeTabConfig =
    tabs.find(
      (tab) =>
        tab.key === activeTab
    );

  const visibleFields =
    fields.filter(
      (field: ERPModuleField) =>
        activeTabConfig?.fields.includes(
          field.key
        ) &&
        RuntimeVisibilityEngine.isVisible(
          field,
          formValues
        )
    );

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap gap-3 border-b border-slate-200 pb-4">
        {tabs.map((tab) => {
          const active =
            tab.key === activeTab;

          return (
            <button
              key={tab.key}
              type="button"
              onClick={() =>
                setActiveTab(tab.key)
              }
              className={`
                rounded-2xl
                px-5
                py-3
                text-sm
                font-bold
                transition
                ${
                  active
                    ? "bg-slate-950 text-white"
                    : "bg-slate-100 text-slate-700 hover:bg-slate-200"
                }
              `}
            >
              {tab.label}
            </button>
          );
        })}
      </div>

      <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
        <div className="grid gap-6 md:grid-cols-2">
          {visibleFields.map((field) => (
            <ERPFormField
              key={field.key}
              field={field}
              initialValue={
                initialData[field.key]
              }
            />
          ))}
        </div>

        {visibleFields.length === 0 ? (
          <p className="text-sm text-slate-500">
            Aucun champ Ã  afficher pour cet onglet.
          </p>
        ) : null}
      </div>
    </div>
  );
}
```

## RuntimeValidationEngine

```text
import type {
  ERPModule,
  ERPModuleField,
} from "@/runtime/modules";

import {
  RuntimeFieldValidator,
} from "./RuntimeFieldValidator";

import type {
  RuntimeValidationError,
} from "./RuntimeValidationTypes";

export class RuntimeValidationEngine {
  static validate(
    module: ERPModule,
    payload: Record<string, unknown>
  ): RuntimeValidationError[] {

    const errors: RuntimeValidationError[] = [];

    module.schema.fields.forEach(
      (field: ERPModuleField) => {

        const fieldErrors =
          RuntimeFieldValidator.validate(
            field.key,
            payload[field.key],
            field.validation
          );

        errors.push(...fieldErrors);
      }
    );

    return errors;
  }
}
```

## RuntimeValidationTypes

```text
export interface RuntimeFieldValidation {
  required?: boolean;

  min?: number;

  max?: number;

  minLength?: number;

  maxLength?: number;

  email?: boolean;

  beforeToday?: boolean;
}

export interface RuntimeValidationError {
  field: string;
  message: string;
}
```

## RuntimeDataBinding

```text
import type {
  ERPModule,
} from "@/runtime/modules";

import {
  FirestoreRuntimeQuery,
  FirestoreRuntimeMutation,
} from "@/runtime/firestore";

export class RuntimeDataBinding {
  static async list(
    module: ERPModule
  ) {
    return FirestoreRuntimeQuery.list(
      module
    );
  }

  static async detail(
    module: ERPModule,
    id: string
  ) {
    return FirestoreRuntimeQuery.detail(
      module,
      id
    );
  }

  static async create(
    module: ERPModule,
    data: Record<string, unknown>
  ) {
    return FirestoreRuntimeMutation.create(
      module,
      data
    );
  }

  static async update(
    module: ERPModule,
    id: string,
    data: Record<string, unknown>
  ) {
    return FirestoreRuntimeMutation.update(
      module,
      id,
      data
    );
  }

  static async delete(
    module: ERPModule,
    id: string
  ) {
    return FirestoreRuntimeMutation.delete(
      module,
      id
    );
  }
}
```

## FirestoreRuntimeRepository

Fichier introuvable : C:\Users\Admin\terragest\src\runtime\firebase\FirestoreRuntimeRepository.ts

## FirestoreRuntimeMutation

Fichier introuvable : C:\Users\Admin\terragest\src\runtime\firebase\FirestoreRuntimeMutation.ts

# Indicateurs automatiques

| Indicateur | Valeur |
|---|---:|
| Modules declares dans coreModules.ts | 15 |
| Pages routes privees | 369 |
| Fichiers composants ERP | 379 |
| Fichiers runtime | 1004 |
| Scripts PowerShell | 601 |

# Recherches utiles

## moduleKey utilises dans les routes
```text
C:\Users\Admin\terragest\src\app\(private)\produits\page.tsx:4 return <GenericListPage moduleKey="produits" />;
C:\Users\Admin\terragest\src\app\(private)\produits\nouveau\page.tsx:4 return <GenericCreatePage moduleKey="produits" />;
C:\Users\Admin\terragest\src\app\(private)\produits\[id]\page.tsx:8 return <GenericDetailPage moduleKey="produits" id={params.id} />;
C:\Users\Admin\terragest\src\app\(private)\produits\[id]\edit\page.tsx:8 return <GenericEditPage moduleKey="produits" id={params.id} />;
C:\Users\Admin\terragest\src\app\(private)\terrains\page.tsx:5 return <GenericListPage moduleKey="terrains" />;
C:\Users\Admin\terragest\src\app\(private)\terrains\nouveau\page.tsx:4 return <GenericCreatePage moduleKey="terrains" />;
C:\Users\Admin\terragest\src\app\(private)\terrains\[id]\page.tsx:12 moduleKey="terrains"
C:\Users\Admin\terragest\src\app\(private)\terrains\[id]\edit\page.tsx:12 moduleKey="terrains"
```

## Imports runtime/modules
```text
C:\Users\Admin\terragest\src\app\(private)\achats\page.tsx:6 import { coreERPModules }
C:\Users\Admin\terragest\src\app\(private)\achats\page.tsx:7 from "@/runtime/modules/definitions/coreModules";
C:\Users\Admin\terragest\src\app\(private)\achats\page.tsx:11 const module = coreERPModules.find(
C:\Users\Admin\terragest\src\app\(private)\achats\nouveau\page.tsx:3 import { GenericCreatePage }
C:\Users\Admin\terragest\src\app\(private)\achats\nouveau\page.tsx:4 from "@/components/erp/generic/GenericCreatePage";
C:\Users\Admin\terragest\src\app\(private)\achats\nouveau\page.tsx:6 import { coreERPModules }
C:\Users\Admin\terragest\src\app\(private)\achats\nouveau\page.tsx:7 from "@/runtime/modules/definitions/coreModules";
C:\Users\Admin\terragest\src\app\(private)\achats\nouveau\page.tsx:11 const module = coreERPModules.find(
C:\Users\Admin\terragest\src\app\(private)\achats\nouveau\page.tsx:20 <GenericCreatePage
C:\Users\Admin\terragest\src\app\(private)\achats\[id]\page.tsx:6 import { coreERPModules }
C:\Users\Admin\terragest\src\app\(private)\achats\[id]\page.tsx:7 from "@/runtime/modules/definitions/coreModules";
C:\Users\Admin\terragest\src\app\(private)\achats\[id]\page.tsx:17 const module = coreERPModules.find(
C:\Users\Admin\terragest\src\app\(private)\achats\[id]\edit\page.tsx:6 import { coreERPModules }
C:\Users\Admin\terragest\src\app\(private)\achats\[id]\edit\page.tsx:7 from "@/runtime/modules/definitions/coreModules";
C:\Users\Admin\terragest\src\app\(private)\achats\[id]\edit\page.tsx:17 const module = coreERPModules.find(
C:\Users\Admin\terragest\src\app\(private)\clients\page.tsx:6 import { coreERPModules }
C:\Users\Admin\terragest\src\app\(private)\clients\page.tsx:7 from "@/runtime/modules/definitions/coreModules";
C:\Users\Admin\terragest\src\app\(private)\clients\page.tsx:11 const module = coreERPModules.find(
C:\Users\Admin\terragest\src\app\(private)\clients\nouveau\page.tsx:3 import { GenericCreatePage }
C:\Users\Admin\terragest\src\app\(private)\clients\nouveau\page.tsx:4 from "@/components/erp/generic/GenericCreatePage";
C:\Users\Admin\terragest\src\app\(private)\clients\nouveau\page.tsx:6 import { coreERPModules }
C:\Users\Admin\terragest\src\app\(private)\clients\nouveau\page.tsx:7 from "@/runtime/modules/definitions/coreModules";
C:\Users\Admin\terragest\src\app\(private)\clients\nouveau\page.tsx:11 const module = coreERPModules.find(
C:\Users\Admin\terragest\src\app\(private)\clients\nouveau\page.tsx:20 <GenericCreatePage
C:\Users\Admin\terragest\src\app\(private)\clients\[id]\page.tsx:6 import { coreERPModules }
C:\Users\Admin\terragest\src\app\(private)\clients\[id]\page.tsx:7 from "@/runtime/modules/definitions/coreModules";
C:\Users\Admin\terragest\src\app\(private)\clients\[id]\page.tsx:17 const module = coreERPModules.find(
C:\Users\Admin\terragest\src\app\(private)\clients\[id]\edit\page.tsx:3 import { GenericEditPage }
C:\Users\Admin\terragest\src\app\(private)\clients\[id]\edit\page.tsx:4 from "@/components/erp/generic/GenericEditPage";
C:\Users\Admin\terragest\src\app\(private)\clients\[id]\edit\page.tsx:6 import { coreERPModules }
C:\Users\Admin\terragest\src\app\(private)\clients\[id]\edit\page.tsx:7 from "@/runtime/modules/definitions/coreModules";
C:\Users\Admin\terragest\src\app\(private)\clients\[id]\edit\page.tsx:17 const module = coreERPModules.find(
C:\Users\Admin\terragest\src\app\(private)\clients\[id]\edit\page.tsx:26 <GenericEditPage
C:\Users\Admin\terragest\src\app\(private)\commandes\page.tsx:6 import { coreERPModules }
C:\Users\Admin\terragest\src\app\(private)\commandes\page.tsx:7 from "@/runtime/modules/definitions/coreModules";
C:\Users\Admin\terragest\src\app\(private)\commandes\page.tsx:11 const module = coreERPModules.find(
C:\Users\Admin\terragest\src\app\(private)\commandes\nouveau\page.tsx:3 import { GenericCreatePage }
C:\Users\Admin\terragest\src\app\(private)\commandes\nouveau\page.tsx:4 from "@/components/erp/generic/GenericCreatePage";
C:\Users\Admin\terragest\src\app\(private)\commandes\nouveau\page.tsx:6 import { coreERPModules }
C:\Users\Admin\terragest\src\app\(private)\commandes\nouveau\page.tsx:7 from "@/runtime/modules/definitions/coreModules";
C:\Users\Admin\terragest\src\app\(private)\commandes\nouveau\page.tsx:11 const module = coreERPModules.find(
C:\Users\Admin\terragest\src\app\(private)\commandes\nouveau\page.tsx:20 <GenericCreatePage
C:\Users\Admin\terragest\src\app\(private)\commandes\[id]\page.tsx:6 import { coreERPModules }
C:\Users\Admin\terragest\src\app\(private)\commandes\[id]\page.tsx:7 from "@/runtime/modules/definitions/coreModules";
C:\Users\Admin\terragest\src\app\(private)\commandes\[id]\page.tsx:17 const module = coreERPModules.find(
C:\Users\Admin\terragest\src\app\(private)\commandes\[id]\edit\page.tsx:3 import { GenericEditPage }
C:\Users\Admin\terragest\src\app\(private)\commandes\[id]\edit\page.tsx:4 from "@/components/erp/generic/GenericEditPage";
C:\Users\Admin\terragest\src\app\(private)\commandes\[id]\edit\page.tsx:6 import { coreERPModules }
C:\Users\Admin\terragest\src\app\(private)\commandes\[id]\edit\page.tsx:7 from "@/runtime/modules/definitions/coreModules";
C:\Users\Admin\terragest\src\app\(private)\commandes\[id]\edit\page.tsx:17 const module = coreERPModules.find(
C:\Users\Admin\terragest\src\app\(private)\commandes\[id]\edit\page.tsx:26 <GenericEditPage
C:\Users\Admin\terragest\src\app\(private)\compliance\page.tsx:2 import { ERPModuleRegistry } from "@/runtime/modules/ERPModuleRegistry";
C:\Users\Admin\terragest\src\app\(private)\compliance\page.tsx:3 import { registerCoreERPModules } from "@/runtime/modules/registerCoreERPModules";
C:\Users\Admin\terragest\src\app\(private)\compliance\page.tsx:6 registerCoreERPModules();
C:\Users\Admin\terragest\src\app\(private)\depenses\page.tsx:6 import { coreERPModules }
C:\Users\Admin\terragest\src\app\(private)\depenses\page.tsx:7 from "@/runtime/modules/definitions/coreModules";
C:\Users\Admin\terragest\src\app\(private)\depenses\page.tsx:11 const module = coreERPModules.find(
C:\Users\Admin\terragest\src\app\(private)\depenses\nouveau\page.tsx:3 import { GenericCreatePage }
C:\Users\Admin\terragest\src\app\(private)\depenses\nouveau\page.tsx:4 from "@/components/erp/generic/GenericCreatePage";
C:\Users\Admin\terragest\src\app\(private)\depenses\nouveau\page.tsx:6 import { coreERPModules }
C:\Users\Admin\terragest\src\app\(private)\depenses\nouveau\page.tsx:7 from "@/runtime/modules/definitions/coreModules";
C:\Users\Admin\terragest\src\app\(private)\depenses\nouveau\page.tsx:11 const module = coreERPModules.find(
C:\Users\Admin\terragest\src\app\(private)\depenses\nouveau\page.tsx:20 <GenericCreatePage
C:\Users\Admin\terragest\src\app\(private)\depenses\[id]\page.tsx:6 import { coreERPModules }
C:\Users\Admin\terragest\src\app\(private)\depenses\[id]\page.tsx:7 from "@/runtime/modules/definitions/coreModules";
C:\Users\Admin\terragest\src\app\(private)\depenses\[id]\page.tsx:17 const module = coreERPModules.find(
C:\Users\Admin\terragest\src\app\(private)\depenses\[id]\edit\page.tsx:3 import { GenericEditPage }
C:\Users\Admin\terragest\src\app\(private)\depenses\[id]\edit\page.tsx:4 from "@/components/erp/generic/GenericEditPage";
C:\Users\Admin\terragest\src\app\(private)\depenses\[id]\edit\page.tsx:6 import { coreERPModules }
C:\Users\Admin\terragest\src\app\(private)\depenses\[id]\edit\page.tsx:7 from "@/runtime/modules/definitions/coreModules";
C:\Users\Admin\terragest\src\app\(private)\depenses\[id]\edit\page.tsx:17 const module = coreERPModules.find(
C:\Users\Admin\terragest\src\app\(private)\depenses\[id]\edit\page.tsx:26 <GenericEditPage
C:\Users\Admin\terragest\src\app\(private)\devis\page.tsx:6 import { coreERPModules }
C:\Users\Admin\terragest\src\app\(private)\devis\page.tsx:7 from "@/runtime/modules/definitions/coreModules";
C:\Users\Admin\terragest\src\app\(private)\devis\page.tsx:11 const module = coreERPModules.find(
C:\Users\Admin\terragest\src\app\(private)\devis\nouveau\page.tsx:3 import { GenericCreatePage }
C:\Users\Admin\terragest\src\app\(private)\devis\nouveau\page.tsx:4 from "@/components/erp/generic/GenericCreatePage";
C:\Users\Admin\terragest\src\app\(private)\devis\nouveau\page.tsx:6 import { coreERPModules }
C:\Users\Admin\terragest\src\app\(private)\devis\nouveau\page.tsx:7 from "@/runtime/modules/definitions/coreModules";
C:\Users\Admin\terragest\src\app\(private)\devis\nouveau\page.tsx:11 const module = coreERPModules.find(
C:\Users\Admin\terragest\src\app\(private)\devis\nouveau\page.tsx:20 <GenericCreatePage
C:\Users\Admin\terragest\src\app\(private)\devis\[id]\page.tsx:6 import { coreERPModules }
C:\Users\Admin\terragest\src\app\(private)\devis\[id]\page.tsx:7 from "@/runtime/modules/definitions/coreModules";
C:\Users\Admin\terragest\src\app\(private)\devis\[id]\page.tsx:17 const module = coreERPModules.find(
C:\Users\Admin\terragest\src\app\(private)\devis\[id]\edit\page.tsx:3 import { GenericEditPage }
C:\Users\Admin\terragest\src\app\(private)\devis\[id]\edit\page.tsx:4 from "@/components/erp/generic/GenericEditPage";
C:\Users\Admin\terragest\src\app\(private)\devis\[id]\edit\page.tsx:6 import { coreERPModules }
C:\Users\Admin\terragest\src\app\(private)\devis\[id]\edit\page.tsx:7 from "@/runtime/modules/definitions/coreModules";
C:\Users\Admin\terragest\src\app\(private)\devis\[id]\edit\page.tsx:17 const module = coreERPModules.find(
C:\Users\Admin\terragest\src\app\(private)\devis\[id]\edit\page.tsx:26 <GenericEditPage
C:\Users\Admin\terragest\src\app\(private)\employes\page.tsx:6 import { coreERPModules }
C:\Users\Admin\terragest\src\app\(private)\employes\page.tsx:7 from "@/runtime/modules/definitions/coreModules";
C:\Users\Admin\terragest\src\app\(private)\employes\page.tsx:11 const module = coreERPModules.find(
C:\Users\Admin\terragest\src\app\(private)\employes\nouveau\page.tsx:3 import { GenericCreatePage }
C:\Users\Admin\terragest\src\app\(private)\employes\nouveau\page.tsx:4 from "@/components/erp/generic/GenericCreatePage";
C:\Users\Admin\terragest\src\app\(private)\employes\nouveau\page.tsx:6 import { coreERPModules }
C:\Users\Admin\terragest\src\app\(private)\employes\nouveau\page.tsx:7 from "@/runtime/modules/definitions/coreModules";
C:\Users\Admin\terragest\src\app\(private)\employes\nouveau\page.tsx:11 const module = coreERPModules.find(
C:\Users\Admin\terragest\src\app\(private)\employes\nouveau\page.tsx:20 <GenericCreatePage
C:\Users\Admin\terragest\src\app\(private)\employes\[id]\page.tsx:6 import { coreERPModules }
C:\Users\Admin\terragest\src\app\(private)\employes\[id]\page.tsx:7 from "@/runtime/modules/definitions/coreModules";
C:\Users\Admin\terragest\src\app\(private)\employes\[id]\page.tsx:17 const module = coreERPModules.find(
C:\Users\Admin\terragest\src\app\(private)\employes\[id]\edit\page.tsx:3 import { GenericEditPage }
C:\Users\Admin\terragest\src\app\(private)\employes\[id]\edit\page.tsx:4 from "@/components/erp/generic/GenericEditPage";
C:\Users\Admin\terragest\src\app\(private)\employes\[id]\edit\page.tsx:6 import { coreERPModules }
C:\Users\Admin\terragest\src\app\(private)\employes\[id]\edit\page.tsx:7 from "@/runtime/modules/definitions/coreModules";
C:\Users\Admin\terragest\src\app\(private)\employes\[id]\edit\page.tsx:17 const module = coreERPModules.find(
C:\Users\Admin\terragest\src\app\(private)\employes\[id]\edit\page.tsx:26 <GenericEditPage
C:\Users\Admin\terragest\src\app\(private)\factures\page.tsx:6 import { coreERPModules }
C:\Users\Admin\terragest\src\app\(private)\factures\page.tsx:7 from "@/runtime/modules/definitions/coreModules";
C:\Users\Admin\terragest\src\app\(private)\factures\page.tsx:11 const module = coreERPModules.find(
C:\Users\Admin\terragest\src\app\(private)\factures\nouveau\page.tsx:3 import { GenericCreatePage }
C:\Users\Admin\terragest\src\app\(private)\factures\nouveau\page.tsx:4 from "@/components/erp/generic/GenericCreatePage";
C:\Users\Admin\terragest\src\app\(private)\factures\nouveau\page.tsx:6 import { coreERPModules }
C:\Users\Admin\terragest\src\app\(private)\factures\nouveau\page.tsx:7 from "@/runtime/modules/definitions/coreModules";
C:\Users\Admin\terragest\src\app\(private)\factures\nouveau\page.tsx:11 const module = coreERPModules.find(
C:\Users\Admin\terragest\src\app\(private)\factures\nouveau\page.tsx:20 <GenericCreatePage
C:\Users\Admin\terragest\src\app\(private)\factures\[id]\page.tsx:6 import { coreERPModules }
C:\Users\Admin\terragest\src\app\(private)\factures\[id]\page.tsx:7 from "@/runtime/modules/definitions/coreModules";
C:\Users\Admin\terragest\src\app\(private)\factures\[id]\page.tsx:17 const module = coreERPModules.find(
C:\Users\Admin\terragest\src\app\(private)\factures\[id]\edit\page.tsx:3 import { GenericEditPage }
C:\Users\Admin\terragest\src\app\(private)\factures\[id]\edit\page.tsx:4 from "@/components/erp/generic/GenericEditPage";
C:\Users\Admin\terragest\src\app\(private)\factures\[id]\edit\page.tsx:6 import { coreERPModules }
C:\Users\Admin\terragest\src\app\(private)\factures\[id]\edit\page.tsx:7 from "@/runtime/modules/definitions/coreModules";
C:\Users\Admin\terragest\src\app\(private)\factures\[id]\edit\page.tsx:17 const module = coreERPModules.find(
C:\Users\Admin\terragest\src\app\(private)\factures\[id]\edit\page.tsx:26 <GenericEditPage
C:\Users\Admin\terragest\src\app\(private)\fournisseurs\page.tsx:2 import { coreERPModules } from "@/runtime/modules/definitions/coreModules";
C:\Users\Admin\terragest\src\app\(private)\fournisseurs\page.tsx:3 import type { ERPModule } from "@/runtime/modules/ERPModule";
C:\Users\Admin\terragest\src\app\(private)\fournisseurs\page.tsx:6 const erpModule = coreERPModules.find(
C:\Users\Admin\terragest\src\app\(private)\fournisseurs\nouveau\page.tsx:1 import { GenericCreatePage } from "@/components/erp/generic/GenericCreatePage";
C:\Users\Admin\terragest\src\app\(private)\fournisseurs\nouveau\page.tsx:2 import { coreERPModules } from "@/runtime/modules/definitions/coreModules";
C:\Users\Admin\terragest\src\app\(private)\fournisseurs\nouveau\page.tsx:3 import type { ERPModule } from "@/runtime/modules/ERPModule";
C:\Users\Admin\terragest\src\app\(private)\fournisseurs\nouveau\page.tsx:6 const erpModule = coreERPModules.find(
C:\Users\Admin\terragest\src\app\(private)\fournisseurs\nouveau\page.tsx:14 return <GenericCreatePage module={erpModule} />;
C:\Users\Admin\terragest\src\app\(private)\fournisseurs\nouveau\page.tsx.bak:2 GenericCreatePage
C:\Users\Admin\terragest\src\app\(private)\fournisseurs\nouveau\page.tsx.bak:4 from "@/components/erp/generic/GenericCreatePage";
C:\Users\Admin\terragest\src\app\(private)\fournisseurs\nouveau\page.tsx.bak:10 <GenericCreatePage
C:\Users\Admin\terragest\src\app\(private)\fournisseurs\[id]\page.tsx:2 import { coreERPModules } from "@/runtime/modules/definitions/coreModules";
C:\Users\Admin\terragest\src\app\(private)\fournisseurs\[id]\page.tsx:3 import type { ERPModule } from "@/runtime/modules/ERPModule";
C:\Users\Admin\terragest\src\app\(private)\fournisseurs\[id]\page.tsx:14 const erpModule = coreERPModules.find(
C:\Users\Admin\terragest\src\app\(private)\fournisseurs\[id]\edit\page.tsx:1 import { GenericEditPage } from "@/components/erp/generic/GenericEditPage";
C:\Users\Admin\terragest\src\app\(private)\fournisseurs\[id]\edit\page.tsx:2 import { coreERPModules } from "@/runtime/modules/definitions/coreModules";
C:\Users\Admin\terragest\src\app\(private)\fournisseurs\[id]\edit\page.tsx:3 import type { ERPModule } from "@/runtime/modules/ERPModule";
C:\Users\Admin\terragest\src\app\(private)\fournisseurs\[id]\edit\page.tsx:14 const erpModule = coreERPModules.find(
C:\Users\Admin\terragest\src\app\(private)\fournisseurs\[id]\edit\page.tsx:22 return <GenericEditPage module={erpModule} id={id} />;
C:\Users\Admin\terragest\src\app\(private)\fournisseurs\[id]\edit\page.tsx.bak:2 GenericEditPage
C:\Users\Admin\terragest\src\app\(private)\fournisseurs\[id]\edit\page.tsx.bak:4 from "@/components/erp/generic/GenericEditPage";
C:\Users\Admin\terragest\src\app\(private)\fournisseurs\[id]\edit\page.tsx.bak:21 <GenericEditPage
C:\Users\Admin\terragest\src\app\(private)\incidents\page.tsx:6 import { coreERPModules }
C:\Users\Admin\terragest\src\app\(private)\incidents\page.tsx:7 from "@/runtime/modules/definitions/coreModules";
C:\Users\Admin\terragest\src\app\(private)\incidents\page.tsx:11 const module = coreERPModules.find(
C:\Users\Admin\terragest\src\app\(private)\incidents\nouveau\page.tsx:3 import { GenericCreatePage }
C:\Users\Admin\terragest\src\app\(private)\incidents\nouveau\page.tsx:4 from "@/components/erp/generic/GenericCreatePage";
C:\Users\Admin\terragest\src\app\(private)\incidents\nouveau\page.tsx:6 import { coreERPModules }
C:\Users\Admin\terragest\src\app\(private)\incidents\nouveau\page.tsx:7 from "@/runtime/modules/definitions/coreModules";
C:\Users\Admin\terragest\src\app\(private)\incidents\nouveau\page.tsx:11 const module = coreERPModules.find(
C:\Users\Admin\terragest\src\app\(private)\incidents\nouveau\page.tsx:20 <GenericCreatePage
C:\Users\Admin\terragest\src\app\(private)\incidents\[id]\page.tsx:6 import { coreERPModules }
C:\Users\Admin\terragest\src\app\(private)\incidents\[id]\page.tsx:7 from "@/runtime/modules/definitions/coreModules";
C:\Users\Admin\terragest\src\app\(private)\incidents\[id]\page.tsx:17 const module = coreERPModules.find(
C:\Users\Admin\terragest\src\app\(private)\incidents\[id]\edit\page.tsx:3 import { GenericEditPage }
C:\Users\Admin\terragest\src\app\(private)\incidents\[id]\edit\page.tsx:4 from "@/components/erp/generic/GenericEditPage";
C:\Users\Admin\terragest\src\app\(private)\incidents\[id]\edit\page.tsx:6 import { coreERPModules }
C:\Users\Admin\terragest\src\app\(private)\incidents\[id]\edit\page.tsx:7 from "@/runtime/modules/definitions/coreModules";
C:\Users\Admin\terragest\src\app\(private)\incidents\[id]\edit\page.tsx:17 const module = coreERPModules.find(
C:\Users\Admin\terragest\src\app\(private)\incidents\[id]\edit\page.tsx:26 <GenericEditPage
C:\Users\Admin\terragest\src\app\(private)\intrants\page.tsx:6 import { coreERPModules }
C:\Users\Admin\terragest\src\app\(private)\intrants\page.tsx:7 from "@/runtime/modules/definitions/coreModules";
C:\Users\Admin\terragest\src\app\(private)\intrants\page.tsx:11 const module = coreERPModules.find(
C:\Users\Admin\terragest\src\app\(private)\intrants\nouveau\page.tsx:3 import { GenericCreatePage }
C:\Users\Admin\terragest\src\app\(private)\intrants\nouveau\page.tsx:4 from "@/components/erp/generic/GenericCreatePage";
C:\Users\Admin\terragest\src\app\(private)\intrants\nouveau\page.tsx:6 import { coreERPModules }
C:\Users\Admin\terragest\src\app\(private)\intrants\nouveau\page.tsx:7 from "@/runtime/modules/definitions/coreModules";
C:\Users\Admin\terragest\src\app\(private)\intrants\nouveau\page.tsx:11 const module = coreERPModules.find(
C:\Users\Admin\terragest\src\app\(private)\intrants\nouveau\page.tsx:20 <GenericCreatePage
C:\Users\Admin\terragest\src\app\(private)\intrants\[id]\page.tsx:6 import { coreERPModules }
C:\Users\Admin\terragest\src\app\(private)\intrants\[id]\page.tsx:7 from "@/runtime/modules/definitions/coreModules";
C:\Users\Admin\terragest\src\app\(private)\intrants\[id]\page.tsx:17 const module = coreERPModules.find(
C:\Users\Admin\terragest\src\app\(private)\intrants\[id]\edit\page.tsx:3 import { GenericEditPage }
C:\Users\Admin\terragest\src\app\(private)\intrants\[id]\edit\page.tsx:4 from "@/components/erp/generic/GenericEditPage";
C:\Users\Admin\terragest\src\app\(private)\intrants\[id]\edit\page.tsx:6 import { coreERPModules }
C:\Users\Admin\terragest\src\app\(private)\intrants\[id]\edit\page.tsx:7 from "@/runtime/modules/definitions/coreModules";
C:\Users\Admin\terragest\src\app\(private)\intrants\[id]\edit\page.tsx:17 const module = coreERPModules.find(
C:\Users\Admin\terragest\src\app\(private)\intrants\[id]\edit\page.tsx:26 <GenericEditPage
C:\Users\Admin\terragest\src\app\(private)\livraisons\page.tsx:6 import { coreERPModules }
C:\Users\Admin\terragest\src\app\(private)\livraisons\page.tsx:7 from "@/runtime/modules/definitions/coreModules";
C:\Users\Admin\terragest\src\app\(private)\livraisons\page.tsx:11 const module = coreERPModules.find(
C:\Users\Admin\terragest\src\app\(private)\livraisons\nouveau\page.tsx:3 import { GenericCreatePage }
C:\Users\Admin\terragest\src\app\(private)\livraisons\nouveau\page.tsx:4 from "@/components/erp/generic/GenericCreatePage";
C:\Users\Admin\terragest\src\app\(private)\livraisons\nouveau\page.tsx:6 import { coreERPModules }
C:\Users\Admin\terragest\src\app\(private)\livraisons\nouveau\page.tsx:7 from "@/runtime/modules/definitions/coreModules";
C:\Users\Admin\terragest\src\app\(private)\livraisons\nouveau\page.tsx:11 const module = coreERPModules.find(
C:\Users\Admin\terragest\src\app\(private)\livraisons\nouveau\page.tsx:20 <GenericCreatePage
C:\Users\Admin\terragest\src\app\(private)\livraisons\[id]\page.tsx:6 import { coreERPModules }
C:\Users\Admin\terragest\src\app\(private)\livraisons\[id]\page.tsx:7 from "@/runtime/modules/definitions/coreModules";
C:\Users\Admin\terragest\src\app\(private)\livraisons\[id]\page.tsx:17 const module = coreERPModules.find(
C:\Users\Admin\terragest\src\app\(private)\livraisons\[id]\edit\page.tsx:3 import { GenericEditPage }
C:\Users\Admin\terragest\src\app\(private)\livraisons\[id]\edit\page.tsx:4 from "@/components/erp/generic/GenericEditPage";
C:\Users\Admin\terragest\src\app\(private)\livraisons\[id]\edit\page.tsx:6 import { coreERPModules }
C:\Users\Admin\terragest\src\app\(private)\livraisons\[id]\edit\page.tsx:7 from "@/runtime/modules/definitions/coreModules";
C:\Users\Admin\terragest\src\app\(private)\livraisons\[id]\edit\page.tsx:17 const module = coreERPModules.find(
C:\Users\Admin\terragest\src\app\(private)\livraisons\[id]\edit\page.tsx:26 <GenericEditPage
C:\Users\Admin\terragest\src\app\(private)\parcelles\page.tsx:6 import { coreERPModules }
C:\Users\Admin\terragest\src\app\(private)\parcelles\page.tsx:7 from "@/runtime/modules/definitions/coreModules";
C:\Users\Admin\terragest\src\app\(private)\parcelles\page.tsx:11 const module = coreERPModules.find(
C:\Users\Admin\terragest\src\app\(private)\parcelles\nouveau\page.tsx:3 import { GenericCreatePage }
C:\Users\Admin\terragest\src\app\(private)\parcelles\nouveau\page.tsx:4 from "@/components/erp/generic/GenericCreatePage";
C:\Users\Admin\terragest\src\app\(private)\parcelles\nouveau\page.tsx:6 import { coreERPModules }
C:\Users\Admin\terragest\src\app\(private)\parcelles\nouveau\page.tsx:7 from "@/runtime/modules/definitions/coreModules";
C:\Users\Admin\terragest\src\app\(private)\parcelles\nouveau\page.tsx:11 const module = coreERPModules.find(
C:\Users\Admin\terragest\src\app\(private)\parcelles\nouveau\page.tsx:20 <GenericCreatePage
C:\Users\Admin\terragest\src\app\(private)\parcelles\[id]\page.tsx:6 import { coreERPModules }
C:\Users\Admin\terragest\src\app\(private)\parcelles\[id]\page.tsx:7 from "@/runtime/modules/definitions/coreModules";
C:\Users\Admin\terragest\src\app\(private)\parcelles\[id]\page.tsx:17 const module = coreERPModules.find(
C:\Users\Admin\terragest\src\app\(private)\parcelles\[id]\edit\page.tsx:3 import { GenericEditPage }
C:\Users\Admin\terragest\src\app\(private)\parcelles\[id]\edit\page.tsx:4 from "@/components/erp/generic/GenericEditPage";
C:\Users\Admin\terragest\src\app\(private)\parcelles\[id]\edit\page.tsx:6 import { coreERPModules }
C:\Users\Admin\terragest\src\app\(private)\parcelles\[id]\edit\page.tsx:7 from "@/runtime/modules/definitions/coreModules";
C:\Users\Admin\terragest\src\app\(private)\parcelles\[id]\edit\page.tsx:17 const module = coreERPModules.find(
C:\Users\Admin\terragest\src\app\(private)\parcelles\[id]\edit\page.tsx:26 <GenericEditPage
C:\Users\Admin\terragest\src\app\(private)\produits\nouveau\page.tsx:1 import { GenericCreatePage } from "@/components/erp/generic/GenericCreatePage";
C:\Users\Admin\terragest\src\app\(private)\produits\nouveau\page.tsx:4 return <GenericCreatePage moduleKey="produits" />;
C:\Users\Admin\terragest\src\app\(private)\produits\[id]\edit\page.tsx:1 import { GenericEditPage } from "@/components/erp/generic/GenericEditPage";
C:\Users\Admin\terragest\src\app\(private)\produits\[id]\edit\page.tsx:8 return <GenericEditPage moduleKey="produits" id={params.id} />;
C:\Users\Admin\terragest\src\app\(private)\recettes\page.tsx:6 import { coreERPModules }
C:\Users\Admin\terragest\src\app\(private)\recettes\page.tsx:7 from "@/runtime/modules/definitions/coreModules";
C:\Users\Admin\terragest\src\app\(private)\recettes\page.tsx:11 const module = coreERPModules.find(
C:\Users\Admin\terragest\src\app\(private)\recettes\nouveau\page.tsx:3 import { GenericCreatePage }
C:\Users\Admin\terragest\src\app\(private)\recettes\nouveau\page.tsx:4 from "@/components/erp/generic/GenericCreatePage";
C:\Users\Admin\terragest\src\app\(private)\recettes\nouveau\page.tsx:6 import { coreERPModules }
C:\Users\Admin\terragest\src\app\(private)\recettes\nouveau\page.tsx:7 from "@/runtime/modules/definitions/coreModules";
C:\Users\Admin\terragest\src\app\(private)\recettes\nouveau\page.tsx:11 const module = coreERPModules.find(
C:\Users\Admin\terragest\src\app\(private)\recettes\nouveau\page.tsx:20 <GenericCreatePage
C:\Users\Admin\terragest\src\app\(private)\recettes\[id]\page.tsx:6 import { coreERPModules }
C:\Users\Admin\terragest\src\app\(private)\recettes\[id]\page.tsx:7 from "@/runtime/modules/definitions/coreModules";
C:\Users\Admin\terragest\src\app\(private)\recettes\[id]\page.tsx:17 const module = coreERPModules.find(
C:\Users\Admin\terragest\src\app\(private)\recettes\[id]\edit\page.tsx:3 import { GenericEditPage }
C:\Users\Admin\terragest\src\app\(private)\recettes\[id]\edit\page.tsx:4 from "@/components/erp/generic/GenericEditPage";
C:\Users\Admin\terragest\src\app\(private)\recettes\[id]\edit\page.tsx:6 import { coreERPModules }
C:\Users\Admin\terragest\src\app\(private)\recettes\[id]\edit\page.tsx:7 from "@/runtime/modules/definitions/coreModules";
C:\Users\Admin\terragest\src\app\(private)\recettes\[id]\edit\page.tsx:17 const module = coreERPModules.find(
C:\Users\Admin\terragest\src\app\(private)\recettes\[id]\edit\page.tsx:26 <GenericEditPage
C:\Users\Admin\terragest\src\app\(private)\recoltes\page.tsx:6 import { coreERPModules }
C:\Users\Admin\terragest\src\app\(private)\recoltes\page.tsx:7 from "@/runtime/modules/definitions/coreModules";
C:\Users\Admin\terragest\src\app\(private)\recoltes\page.tsx:11 const module = coreERPModules.find(
C:\Users\Admin\terragest\src\app\(private)\recoltes\nouveau\page.tsx:3 import { GenericCreatePage }
C:\Users\Admin\terragest\src\app\(private)\recoltes\nouveau\page.tsx:4 from "@/components/erp/generic/GenericCreatePage";
C:\Users\Admin\terragest\src\app\(private)\recoltes\nouveau\page.tsx:6 import { coreERPModules }
C:\Users\Admin\terragest\src\app\(private)\recoltes\nouveau\page.tsx:7 from "@/runtime/modules/definitions/coreModules";
C:\Users\Admin\terragest\src\app\(private)\recoltes\nouveau\page.tsx:11 const module = coreERPModules.find(
C:\Users\Admin\terragest\src\app\(private)\recoltes\nouveau\page.tsx:20 <GenericCreatePage
C:\Users\Admin\terragest\src\app\(private)\recoltes\[id]\page.tsx:6 import { coreERPModules }
C:\Users\Admin\terragest\src\app\(private)\recoltes\[id]\page.tsx:7 from "@/runtime/modules/definitions/coreModules";
C:\Users\Admin\terragest\src\app\(private)\recoltes\[id]\page.tsx:17 const module = coreERPModules.find(
C:\Users\Admin\terragest\src\app\(private)\recoltes\[id]\edit\page.tsx:3 import { GenericEditPage }
C:\Users\Admin\terragest\src\app\(private)\recoltes\[id]\edit\page.tsx:4 from "@/components/erp/generic/GenericEditPage";
C:\Users\Admin\terragest\src\app\(private)\recoltes\[id]\edit\page.tsx:6 import { coreERPModules }
C:\Users\Admin\terragest\src\app\(private)\recoltes\[id]\edit\page.tsx:7 from "@/runtime/modules/definitions/coreModules";
C:\Users\Admin\terragest\src\app\(private)\recoltes\[id]\edit\page.tsx:17 const module = coreERPModules.find(
C:\Users\Admin\terragest\src\app\(private)\recoltes\[id]\edit\page.tsx:26 <GenericEditPage
C:\Users\Admin\terragest\src\app\(private)\runtime\[module]\page.tsx:1 import { ERPModuleRegistry } from "@/runtime/modules/ERPModuleRegistry";
C:\Users\Admin\terragest\src\app\(private)\runtime\[module]\page.tsx:2 import { registerCoreERPModules } from "@/runtime/modules/registerCoreERPModules";
C:\Users\Admin\terragest\src\app\(private)\runtime\[module]\page.tsx:3 import { ERPModuleListRenderer } from "@/runtime/modules/renderer/ERPModuleListRenderer";
C:\Users\Admin\terragest\src\app\(private)\runtime\[module]\page.tsx:14 registerCoreERPModules();
C:\Users\Admin\terragest\src\app\(private)\taches\page.tsx:6 import { coreERPModules }
C:\Users\Admin\terragest\src\app\(private)\taches\page.tsx:7 from "@/runtime/modules/definitions/coreModules";
C:\Users\Admin\terragest\src\app\(private)\taches\page.tsx:11 const module = coreERPModules.find(
C:\Users\Admin\terragest\src\app\(private)\taches\nouveau\page.tsx:3 import { GenericCreatePage }
C:\Users\Admin\terragest\src\app\(private)\taches\nouveau\page.tsx:4 from "@/components/erp/generic/GenericCreatePage";
C:\Users\Admin\terragest\src\app\(private)\taches\nouveau\page.tsx:6 import { coreERPModules }
C:\Users\Admin\terragest\src\app\(private)\taches\nouveau\page.tsx:7 from "@/runtime/modules/definitions/coreModules";
C:\Users\Admin\terragest\src\app\(private)\taches\nouveau\page.tsx:11 const module = coreERPModules.find(
C:\Users\Admin\terragest\src\app\(private)\taches\nouveau\page.tsx:20 <GenericCreatePage
C:\Users\Admin\terragest\src\app\(private)\taches\[id]\page.tsx:6 import { coreERPModules }
C:\Users\Admin\terragest\src\app\(private)\taches\[id]\page.tsx:7 from "@/runtime/modules/definitions/coreModules";
C:\Users\Admin\terragest\src\app\(private)\taches\[id]\page.tsx:17 const module = coreERPModules.find(
C:\Users\Admin\terragest\src\app\(private)\taches\[id]\edit\page.tsx:3 import { GenericEditPage }
C:\Users\Admin\terragest\src\app\(private)\taches\[id]\edit\page.tsx:4 from "@/components/erp/generic/GenericEditPage";
C:\Users\Admin\terragest\src\app\(private)\taches\[id]\edit\page.tsx:6 import { coreERPModules }
C:\Users\Admin\terragest\src\app\(private)\taches\[id]\edit\page.tsx:7 from "@/runtime/modules/definitions/coreModules";
C:\Users\Admin\terragest\src\app\(private)\taches\[id]\edit\page.tsx:17 const module = coreERPModules.find(
C:\Users\Admin\terragest\src\app\(private)\taches\[id]\edit\page.tsx:26 <GenericEditPage
C:\Users\Admin\terragest\src\app\(private)\terrains\nouveau\page.tsx:1 import { GenericCreatePage } from "@/components/erp/generic/GenericCreatePage";
C:\Users\Admin\terragest\src\app\(private)\terrains\nouveau\page.tsx:4 return <GenericCreatePage moduleKey="terrains" />;
C:\Users\Admin\terragest\src\app\(private)\terrains\[id]\edit\page.tsx:1 import { GenericEditPage } from "@/components/erp/generic/GenericEditPage";
C:\Users\Admin\terragest\src\app\(private)\terrains\[id]\edit\page.tsx:11 <GenericEditPage
C:\Users\Admin\terragest\src\app\(private)\vehicules\page.tsx:6 import { coreERPModules }
C:\Users\Admin\terragest\src\app\(private)\vehicules\page.tsx:7 from "@/runtime/modules/definitions/coreModules";
C:\Users\Admin\terragest\src\app\(private)\vehicules\page.tsx:11 const module = coreERPModules.find(
C:\Users\Admin\terragest\src\app\(private)\vehicules\nouveau\page.tsx:3 import { GenericCreatePage }
C:\Users\Admin\terragest\src\app\(private)\vehicules\nouveau\page.tsx:4 from "@/components/erp/generic/GenericCreatePage";
C:\Users\Admin\terragest\src\app\(private)\vehicules\nouveau\page.tsx:6 import { coreERPModules }
C:\Users\Admin\terragest\src\app\(private)\vehicules\nouveau\page.tsx:7 from "@/runtime/modules/definitions/coreModules";
C:\Users\Admin\terragest\src\app\(private)\vehicules\nouveau\page.tsx:11 const module = coreERPModules.find(
C:\Users\Admin\terragest\src\app\(private)\vehicules\nouveau\page.tsx:20 <GenericCreatePage
C:\Users\Admin\terragest\src\app\(private)\vehicules\[id]\page.tsx:6 import { coreERPModules }
C:\Users\Admin\terragest\src\app\(private)\vehicules\[id]\page.tsx:7 from "@/runtime/modules/definitions/coreModules";
C:\Users\Admin\terragest\src\app\(private)\vehicules\[id]\page.tsx:17 const module = coreERPModules.find(
C:\Users\Admin\terragest\src\app\(private)\vehicules\[id]\edit\page.tsx:3 import { GenericEditPage }
C:\Users\Admin\terragest\src\app\(private)\vehicules\[id]\edit\page.tsx:4 from "@/components/erp/generic/GenericEditPage";
C:\Users\Admin\terragest\src\app\(private)\vehicules\[id]\edit\page.tsx:6 import { coreERPModules }
C:\Users\Admin\terragest\src\app\(private)\vehicules\[id]\edit\page.tsx:7 from "@/runtime/modules/definitions/coreModules";
C:\Users\Admin\terragest\src\app\(private)\vehicules\[id]\edit\page.tsx:17 const module = coreERPModules.find(
C:\Users\Admin\terragest\src\app\(private)\vehicules\[id]\edit\page.tsx:26 <GenericEditPage
C:\Users\Admin\terragest\src\components\erp\actions\ERPRowActions.tsx:1 import type { ERPModule } from "@/runtime/modules";
C:\Users\Admin\terragest\src\components\erp\automation-runtime\ERPAutomationRuntimePanel.tsx:5 import type { ERPModule } from "@/runtime/modules";
C:\Users\Admin\terragest\src\components\erp\event-runtime\ERPEventRuntimePanel.tsx:5 import type { ERPModule } from "@/runtime/modules";
C:\Users\Admin\terragest\src\components\erp\forms\enterprise\ERPEnterpriseForm.tsx:6 import type { ERPModule } from "@/runtime/modules";
C:\Users\Admin\terragest\src\components\erp\forms\enterprise\ERPEnterpriseForm.tsx:7 import { ERPModuleBuilder } from "@/runtime/modules";
C:\Users\Admin\terragest\src\components\erp\forms\enterprise\ERPEnterpriseForm.tsx:59 ERPModuleBuilder.buildForm(module);
C:\Users\Admin\terragest\src\components\erp\forms\enterprise\ERPFormActions.tsx:3 import type { ERPModule } from "@/runtime/modules";
C:\Users\Admin\terragest\src\components\erp\forms\enterprise\ERPFormField.tsx:4 import type { ERPModuleField } from "@/runtime/modules";
C:\Users\Admin\terragest\src\components\erp\forms\enterprise\ERPFormField.tsx:5 import { ERPRelationDataLoader } from "@/runtime/modules/lifecycle/ERPRelationDataLoader";
C:\Users\Admin\terragest\src\components\erp\forms\enterprise\ERPFormSummaryPanel.tsx:2 import type { ERPModule } from "@/runtime/modules";
C:\Users\Admin\terragest\src\components\erp\forms\enterprise\ERPFormSummaryPanel.tsx:3 import type { ERPModuleField } from "@/runtime/modules/schemas/ERPModuleSchema";
C:\Users\Admin\terragest\src\components\erp\forms\enterprise\ERPFormTabs.tsx:8 } from "@/runtime/modules";
C:\Users\Admin\terragest\src\components\erp\generic\GenericCreatePage.tsx:2 import { coreERPModules } from "@/runtime/modules/definitions/coreModules";
C:\Users\Admin\terragest\src\components\erp\generic\GenericCreatePage.tsx:3 import type { ERPModule } from "@/runtime/modules";
C:\Users\Admin\terragest\src\components\erp\generic\GenericCreatePage.tsx:5 interface GenericCreatePageProps {
C:\Users\Admin\terragest\src\components\erp\generic\GenericCreatePage.tsx:10 export function GenericCreatePage({
C:\Users\Admin\terragest\src\components\erp\generic\GenericCreatePage.tsx:13 }: GenericCreatePageProps) {
C:\Users\Admin\terragest\src\components\erp\generic\GenericCreatePage.tsx:16 coreERPModules.find((item) => item.metadata.key === moduleKey);
C:\Users\Admin\terragest\src\components\erp\generic\GenericDetailPage.tsx:6 import { coreERPModules } from "@/runtime/modules";
C:\Users\Admin\terragest\src\components\erp\generic\GenericDetailPage.tsx:9 import type { ERPModule } from "@/runtime/modules";
C:\Users\Admin\terragest\src\components\erp\generic\GenericDetailPage.tsx:26 coreERPModules.find(
C:\Users\Admin\terragest\src\components\erp\generic\GenericEditPage.tsx:5 import { coreERPModules } from "@/runtime/modules";
C:\Users\Admin\terragest\src\components\erp\generic\GenericEditPage.tsx:7 import type { ERPModule } from "@/runtime/modules";
C:\Users\Admin\terragest\src\components\erp\generic\GenericEditPage.tsx:9 interface GenericEditPageProps {
C:\Users\Admin\terragest\src\components\erp\generic\GenericEditPage.tsx:16 export function GenericEditPage({
C:\Users\Admin\terragest\src\components\erp\generic\GenericEditPage.tsx:21 }: GenericEditPageProps) {
C:\Users\Admin\terragest\src\components\erp\generic\GenericEditPage.tsx:24 coreERPModules.find((item) => item.metadata.key === moduleKey);
C:\Users\Admin\terragest\src\components\erp\generic\GenericListPage.tsx:6 import { coreERPModules } from "@/runtime/modules";
C:\Users\Admin\terragest\src\components\erp\generic\GenericListPage.tsx:9 import type { ERPModule } from "@/runtime/modules";
C:\Users\Admin\terragest\src\components\erp\generic\GenericListPage.tsx:23 coreERPModules.find(
C:\Users\Admin\terragest\src\components\erp\live-operational\ERPLiveOperationalPanel.tsx:1 import type { ERPModule } from "@/runtime/modules";
C:\Users\Admin\terragest\src\components\erp\navigation\ERPBreadcrumbs.tsx:2 import type { ERPModule } from "@/runtime/modules";
C:\Users\Admin\terragest\src\components\erp\realtime\ERPRealtimeSyncBadge.tsx:14 } from "@/runtime/modules";
C:\Users\Admin\terragest\src\components\erp\relations\ERPRelationField.tsx:5 import type { ERPModuleField } from "@/runtime/modules";
C:\Users\Admin\terragest\src\components\erp\relations\ERPRelationField.tsx:8 from "@/runtime/modules/lifecycle/ERPRelationDataLoader";
C:\Users\Admin\terragest\src\components\erp\runtime\ERPRuntimeDetails.tsx:2 import type { ERPModule } from "@/runtime/modules";
C:\Users\Admin\terragest\src\components\erp\runtime\ERPRuntimeDetails.tsx:3 import { ERPModuleBuilder } from "@/runtime/modules";
C:\Users\Admin\terragest\src\components\erp\runtime\ERPRuntimeDetails.tsx:15 const details = ERPModuleBuilder.buildDetails(module);
C:\Users\Admin\terragest\src\components\erp\runtime\ERPRuntimeFieldValue.tsx:2 import type { ERPModuleField } from "@/runtime/modules";
C:\Users\Admin\terragest\src\components\erp\runtime\ERPRuntimeForm.tsx:2 import type { ERPModule } from "@/runtime/modules";
C:\Users\Admin\terragest\src\components\erp\runtime\ERPRuntimeForm.tsx:3 import { ERPModuleBuilder } from "@/runtime/modules";
C:\Users\Admin\terragest\src\components\erp\runtime\ERPRuntimeForm.tsx:10 const form = ERPModuleBuilder.buildForm(module);
C:\Users\Admin\terragest\src\components\erp\runtime\ERPRuntimePage.tsx:14 import type { ERPModule } from "@/runtime/modules/ERPModule";
C:\Users\Admin\terragest\src\components\erp\runtime\ERPRuntimeTable.tsx:5 import type { ERPModule } from "@/runtime/modules";
C:\Users\Admin\terragest\src\components\erp\runtime\ERPRuntimeTable.tsx:6 import { ERPModuleBuilder } from "@/runtime/modules";
C:\Users\Admin\terragest\src\components\erp\runtime\ERPRuntimeTable.tsx:7 import type { ERPModuleField } from "@/runtime/modules/schemas/ERPModuleSchema";
C:\Users\Admin\terragest\src\components\erp\runtime\ERPRuntimeTable.tsx:76 ERPModuleBuilder.buildTable(
C:\Users\Admin\terragest\src\components\erp\smart-intelligence\SmartAnomaliesPanel.tsx:1 import type { ERPModule } from "@/runtime/modules";
C:\Users\Admin\terragest\src\components\erp\smart-intelligence\SmartOperationalIntelligencePanel.tsx:1 import type { ERPModule } from "@/runtime/modules";
C:\Users\Admin\terragest\src\components\erp\smart-intelligence\SmartPredictionsPanel.tsx:1 import type { ERPModule } from "@/runtime/modules";
C:\Users\Admin\terragest\src\components\erp\smart-intelligence\SmartRecommendationsPanel.tsx:2 import type { ERPModule } from "@/runtime/modules";
C:\Users\Admin\terragest\src\components\erp\smart-intelligence\SmartScorePanel.tsx:1 import type { ERPModule } from "@/runtime/modules";
C:\Users\Admin\terragest\src\components\erp\smart-runtime\ERPSmartInsightsPanel.tsx:2 import type { ERPModule } from "@/runtime/modules";
C:\Users\Admin\terragest\src\components\erp\smart-runtime\ERPSmartPriorityPanel.tsx:2 import type { ERPModule } from "@/runtime/modules";
C:\Users\Admin\terragest\src\components\erp\smart-runtime\ERPSmartRecommendationsPanel.tsx:1 import type { ERPModule } from "@/runtime/modules";
C:\Users\Admin\terragest\src\components\erp\smart-runtime\ERPSmartRuntimePanel.tsx:1 import type { ERPModule } from "@/runtime/modules";
C:\Users\Admin\terragest\src\components\erp\templates\ERPModuleActivityPanel.tsx:2 import type { ERPModule } from "@/runtime/modules";
C:\Users\Admin\terragest\src\components\erp\templates\ERPModuleDashboardTemplate.tsx:1 import type { ERPModule } from "@/runtime/modules";
C:\Users\Admin\terragest\src\components\erp\templates\ERPModuleHeader.tsx:2 import type { ERPModule } from "@/runtime/modules";
C:\Users\Admin\terragest\src\components\erp\templates\ERPModuleKpiGrid.tsx:1 import type { ERPModule } from "@/runtime/modules";
C:\Users\Admin\terragest\src\components\erp\templates\ERPModuleListTemplate.tsx:1 import type { ERPModule } from "@/runtime/modules";
C:\Users\Admin\terragest\src\components\erp\templates\ERPModuleTabs.tsx:1 import type { ERPModule } from "@/runtime/modules";
C:\Users\Admin\terragest\src\components\erp\templates\ERPModuleWorkflowPanel.tsx:2 import type { ERPModule } from "@/runtime/modules";
C:\Users\Admin\terragest\src\components\erp\templates\ERPPageTemplateRegistry.tsx:2 import type { ERPModule } from "@/runtime/modules";
C:\Users\Admin\terragest\src\components\erp\workflow-runtime\ERPWorkflowRuntimePanel.tsx:5 import type { ERPModule } from "@/runtime/modules";
C:\Users\Admin\terragest\src\components\erp\workspace\ERPWorkspaceActivity.tsx:2 import type { ERPModule } from "@/runtime/modules";
C:\Users\Admin\terragest\src\components\erp\workspace\ERPWorkspaceCommandCenter.tsx:2 import type { ERPModule } from "@/runtime/modules";
C:\Users\Admin\terragest\src\components\erp\workspace\ERPWorkspaceContextPanel.tsx:2 import type { ERPModule } from "@/runtime/modules";
C:\Users\Admin\terragest\src\components\erp\workspace\ERPWorkspaceLayout.tsx:2 import type { ERPModule } from "@/runtime/modules";
C:\Users\Admin\terragest\src\components\erp\workspace\ERPWorkspaceQuickActions.tsx:3 import type { ERPModule } from "@/runtime/modules";
C:\Users\Admin\terragest\src\core\modules\module-registry.ts:2 coreERPModules,
C:\Users\Admin\terragest\src\core\modules\module-registry.ts:3 } from "@/runtime/modules";
C:\Users\Admin\terragest\src\core\modules\module-registry.ts:73 module: (typeof coreERPModules)[number]
C:\Users\Admin\terragest\src\core\modules\module-registry.ts:157 coreERPModules.map(
C:\Users\Admin\terragest\src\hooks\useRealtimeCollection.ts:5 import { coreERPModules } from "@/runtime/modules/definitions/coreModules";
C:\Users\Admin\terragest\src\hooks\useRealtimeCollection.ts:21 const module = coreERPModules.find(
C:\Users\Admin\terragest\src\platform\bootstrap\loadFeatures.ts:12 coreERPModules,
C:\Users\Admin\terragest\src\platform\bootstrap\loadFeatures.ts:13 } from "@/runtime/modules";
C:\Users\Admin\terragest\src\platform\bootstrap\loadFeatures.ts:51 module: (typeof coreERPModules)[number]
C:\Users\Admin\terragest\src\platform\bootstrap\loadFeatures.ts:87 module: (typeof coreERPModules)[number]
C:\Users\Admin\terragest\src\platform\bootstrap\loadFeatures.ts:138 coreERPModules.map(
C:\Users\Admin\terragest\src\runtime\actions\ERPActionRegistry.ts:1 import type { ERPModule } from "@/runtime/modules";
C:\Users\Admin\terragest\src\runtime\actions\ERPActionResolver.ts:1 import type { ERPModule } from "@/runtime/modules";
C:\Users\Admin\terragest\src\runtime\compliance\ERPComplianceChecker.ts:1 import type { ERPModuleDefinition } from "@/runtime/modules/ERPModuleDefinition";
C:\Users\Admin\terragest\src\runtime\core\CentralRuntimeRegistry.ts:8 } from "@/runtime/modules/adapters/CoreModuleRuntimeAdapter";import {
C:\Users\Admin\terragest\src\runtime\core\RuntimeBindings.ts:3 } from "@/runtime/modules/adapters/CoreModuleRuntimeAdapter";
C:\Users\Admin\terragest\src\runtime\core\RuntimePermissionRegistry.ts:3 } from "@/runtime/modules/adapters/CoreModuleRuntimeAdapter";
C:\Users\Admin\terragest\src\runtime\core\RuntimeStateRegistry.ts:3 } from "@/runtime/modules/adapters/CoreModuleRuntimeAdapter";
C:\Users\Admin\terragest\src\runtime\core\RuntimeWorkflowRegistry.ts:3 } from "@/runtime/modules/adapters/CoreModuleRuntimeAdapter";
C:\Users\Admin\terragest\src\runtime\core\RuntimeWorkflowRegistry.ts.bak:3 } from "@/runtime/modules/adapters/CoreModuleRuntimeAdapter";
C:\Users\Admin\terragest\src\runtime\dashboard\ERPBusinessAlertEngine.ts:10 coreERPModules,
C:\Users\Admin\terragest\src\runtime\dashboard\ERPBusinessAlertEngine.ts:12 from "@/runtime/modules/definitions/coreModules";
C:\Users\Admin\terragest\src\runtime\dashboard\ERPBusinessAlertEngine.ts:17 from "@/runtime/modules";
C:\Users\Admin\terragest\src\runtime\dashboard\ERPBusinessAlertEngine.ts:24 coreERPModules.find(
C:\Users\Admin\terragest\src\runtime\dashboard\ERPBusinessMetricsEngine.ts:10 coreERPModules,
C:\Users\Admin\terragest\src\runtime\dashboard\ERPBusinessMetricsEngine.ts:12 from "@/runtime/modules/definitions/coreModules";
C:\Users\Admin\terragest\src\runtime\dashboard\ERPBusinessMetricsEngine.ts:17 from "@/runtime/modules";
C:\Users\Admin\terragest\src\runtime\dashboard\ERPBusinessMetricsEngine.ts:22 coreERPModules.find(
C:\Users\Admin\terragest\src\runtime\dashboard\generic\ERPDashboardModuleResolver.ts:1 import type { ERPModule } from "@/runtime/modules";
C:\Users\Admin\terragest\src\runtime\dashboard\generic\ERPDashboardModuleResolver.ts:2 import { coreERPModules } from "@/runtime/modules/definitions/coreModules";
C:\Users\Admin\terragest\src\runtime\dashboard\generic\ERPDashboardModuleResolver.ts:6 coreERPModules.find(
C:\Users\Admin\terragest\src\runtime\data\ERPDataEngine.ts:1 import type { ERPModule } from "@/runtime/modules";
C:\Users\Admin\terragest\src\runtime\data-binding\RuntimeDataBinding.ts:3 } from "@/runtime/modules";
C:\Users\Admin\terragest\src\runtime\firestore\FirestoreRuntimeMutation.ts:1 import type { ERPModule } from "@/runtime/modules";
C:\Users\Admin\terragest\src\runtime\firestore\FirestoreRuntimeQuery.ts:1 import type { ERPModule } from "@/runtime/modules";
C:\Users\Admin\terragest\src\runtime\firestore\FirestoreRuntimeRealtime.ts:6 import type { ERPModule } from "@/runtime/modules";
C:\Users\Admin\terragest\src\runtime\firestore\FirestoreRuntimeRepository.ts:11 import type { ERPModule } from "@/runtime/modules";
C:\Users\Admin\terragest\src\runtime\forms\DynamicFormRegistry.ts:7 coreERPModules,
C:\Users\Admin\terragest\src\runtime\forms\DynamicFormRegistry.ts:8 ERPModuleBuilder,
C:\Users\Admin\terragest\src\runtime\forms\DynamicFormRegistry.ts:9 } from "@/runtime/modules";
C:\Users\Admin\terragest\src\runtime\forms\DynamicFormRegistry.ts:35 coreERPModules.find(
C:\Users\Admin\terragest\src\runtime\forms\DynamicFormRegistry.ts:49 return ERPModuleBuilder
C:\Users\Admin\terragest\src\runtime\forms\DynamicFormRegistry.ts:56 return coreERPModules.map(
C:\Users\Admin\terragest\src\runtime\forms\ERPFormEngine.tsx:4 import { ERPRelationDataLoader } from "@/runtime/modules/lifecycle/ERPRelationDataLoader";
C:\Users\Admin\terragest\src\runtime\modules\index.ts:20 ERPModuleBuilder,
C:\Users\Admin\terragest\src\runtime\modules\index.ts:25 } from "./builders/ERPModuleBuilder";
C:\Users\Admin\terragest\src\runtime\modules\index.ts:32 export { coreERPModules } from "./definitions/coreModules";
C:\Users\Admin\terragest\src\runtime\modules\registerCoreERPModules.ts:2 coreERPModules,
C:\Users\Admin\terragest\src\runtime\modules\registerCoreERPModules.ts:9 export function registerCoreERPModules() {
C:\Users\Admin\terragest\src\runtime\modules\registerCoreERPModules.ts:13 coreERPModules
C:\Users\Admin\terragest\src\runtime\modules\registerCoreERPModules.ts.bak:2 coreERPModules,
C:\Users\Admin\terragest\src\runtime\modules\registerCoreERPModules.ts.bak:9 export function registerCoreERPModules() {
C:\Users\Admin\terragest\src\runtime\modules\registerCoreERPModules.ts.bak:13 coreERPModules
C:\Users\Admin\terragest\src\runtime\modules\adapters\CoreModuleRuntimeAdapter.ts:1 import { coreERPModules } from "../definitions/coreModules";
C:\Users\Admin\terragest\src\runtime\modules\adapters\CoreModuleRuntimeAdapter.ts:35 return coreERPModules.map((module) => ({
C:\Users\Admin\terragest\src\runtime\modules\adapters\CoreModuleRuntimeAdapter.ts:93 return coreERPModules.map((module) => ({
C:\Users\Admin\terragest\src\runtime\modules\adapters\CoreModuleRuntimeAdapter.ts:124 coreERPModules.map((module) => [
C:\Users\Admin\terragest\src\runtime\modules\adapters\CoreModuleRuntimeAdapter.ts:154 coreERPModules.map((module) => [
C:\Users\Admin\terragest\src\runtime\modules\adapters\CoreModuleRuntimeAdapter.ts.bak:1 import { coreERPModules } from "../definitions/coreModules";
C:\Users\Admin\terragest\src\runtime\modules\adapters\CoreModuleRuntimeAdapter.ts.bak:35 return coreERPModules.map((module) => ({
C:\Users\Admin\terragest\src\runtime\modules\adapters\CoreModuleRuntimeAdapter.ts.bak:93 return coreERPModules.map((module) => ({
C:\Users\Admin\terragest\src\runtime\modules\adapters\CoreModuleRuntimeAdapter.ts.bak:124 coreERPModules.map((module) => [
C:\Users\Admin\terragest\src\runtime\modules\adapters\CoreModuleRuntimeAdapter.ts.bak:154 coreERPModules.map((module) => [
C:\Users\Admin\terragest\src\runtime\modules\builders\ERPModuleBuilder.ts:36 export class ERPModuleBuilder {
C:\Users\Admin\terragest\src\runtime\modules\definitions\coreModules.ts:8 export const coreERPModules: ERPModule[] = [
C:\Users\Admin\terragest\src\runtime\modules\definitions\coreModules.ts.bak:3 export const coreERPModules: ERPModule[] = [
C:\Users\Admin\terragest\src\runtime\modules\factories\RuntimeFormFactory.ts:2 import { ERPModuleBuilder } from "../builders/ERPModuleBuilder";
C:\Users\Admin\terragest\src\runtime\modules\factories\RuntimeFormFactory.ts:6 return ERPModuleBuilder.buildForm(module);
C:\Users\Admin\terragest\src\runtime\modules\factories\RuntimePageFactory.ts:2 import { ERPModuleBuilder } from "../builders/ERPModuleBuilder";
C:\Users\Admin\terragest\src\runtime\modules\factories\RuntimePageFactory.ts:8 const runtime = ERPModuleBuilder.buildRuntime(module);
C:\Users\Admin\terragest\src\runtime\modules\factories\RuntimeTableFactory.ts:2 import { ERPModuleBuilder } from "../builders/ERPModuleBuilder";
C:\Users\Admin\terragest\src\runtime\modules\factories\RuntimeTableFactory.ts:6 return ERPModuleBuilder.buildTable(module);
C:\Users\Admin\terragest\src\runtime\modules\lifecycle\ERPModuleAuditor.ts:1 import { coreERPModules } from "../definitions/coreModules";
C:\Users\Admin\terragest\src\runtime\modules\lifecycle\ERPModuleAuditor.ts:10 for (const module of coreERPModules) {
C:\Users\Admin\terragest\src\runtime\modules\lifecycle\ERPModuleAuditor.ts:23 coreERPModules.some(
C:\Users\Admin\terragest\src\runtime\modules\lifecycle\ERPRelationDataLoader.ts:2 import { coreERPModules } from "../definitions/coreModules";
C:\Users\Admin\terragest\src\runtime\modules\lifecycle\ERPRelationDataLoader.ts:6 const module = coreERPModules.find(
C:\Users\Admin\terragest\src\runtime\modules\lifecycle\ERPRelationResolver.ts:5 import { coreERPModules }
C:\Users\Admin\terragest\src\runtime\modules\lifecycle\ERPRelationResolver.ts:15 coreERPModules.find(
C:\Users\Admin\terragest\src\runtime\modules\lifecycle\ERPRelationResolver.ts:38 return coreERPModules.find(
C:\Users\Admin\terragest\src\runtime\modules\lifecycle\ERPRelationResolver.ts:49 for (const module of coreERPModules) {
C:\Users\Admin\terragest\src\runtime\modules\lifecycle\ERPRelationResolver.ts:59 coreERPModules.find(
C:\Users\Admin\terragest\src\runtime\modules\registry\registerCoreModules.ts:2 import { coreERPModules } from "../definitions/coreModules";
C:\Users\Admin\terragest\src\runtime\modules\registry\registerCoreModules.ts:5 ERPModuleRegistry.registerMany(coreERPModules);
C:\Users\Admin\terragest\src\runtime\modules\renderer\ERPModuleDetailRenderer.tsx:1 import type { ERPModuleDefinition } from "@/runtime/modules/ERPModuleDefinition";
C:\Users\Admin\terragest\src\runtime\modules\renderer\ERPModuleListRenderer.tsx:1 import type { ERPModule } from "@/runtime/modules";
C:\Users\Admin\terragest\src\runtime\modules\v2\contratsModuleV2.ts:4 from "@/runtime/modules";
C:\Users\Admin\terragest\src\runtime\modules\v2\exploitationsModuleV2.ts:4 from "@/runtime/modules";
C:\Users\Admin\terragest\src\runtime\modules\v2\README.md:5 de coreERPModules.ts.
C:\Users\Admin\terragest\src\runtime\modules\v2\terragestBusinessModelV2.ts:1 import type { ERPModule } from "@/runtime/modules";
C:\Users\Admin\terragest\src\runtime\modules\v2\terrainsModuleV2.ts:4 from "@/runtime/modules";
C:\Users\Admin\terragest\src\runtime\mutations\RuntimeMutationEngine.ts:1 import type { ERPModule } from "@/runtime/modules";
C:\Users\Admin\terragest\src\runtime\query\RuntimeQueryEngine.ts:1 import type { ERPModule } from "@/runtime/modules";
C:\Users\Admin\terragest\src\runtime\realtime\engine\RuntimeRealtimeEngine.ts:1 import type { ERPModule } from "@/runtime/modules";
C:\Users\Admin\terragest\src\runtime\realtime\hooks\useRuntimeRealtimeCollection.ts:5 import type { ERPModule } from "@/runtime/modules";
C:\Users\Admin\terragest\src\runtime\registry\modules\ERPRegistryModules.ts:3 } from "@/runtime/modules/adapters/CoreModuleRuntimeAdapter";
C:\Users\Admin\terragest\src\runtime\registry\modules\ERPRegistryModules.ts.bak:3 } from "@/runtime/modules/adapters/CoreModuleRuntimeAdapter";
C:\Users\Admin\terragest\src\runtime\repositories\RuntimeRepository.ts:1 import type { ERPModule } from "@/runtime/modules";
C:\Users\Admin\terragest\src\runtime\schemas\ERPBusinessSchemaRegistry.ts:3 } from "@/runtime/modules/adapters/CoreModuleRuntimeAdapter";
C:\Users\Admin\terragest\src\runtime\smart-intelligence\SmartAnomalyDetector.ts:1 import type { ERPModule } from "@/runtime/modules";
C:\Users\Admin\terragest\src\runtime\smart-intelligence\SmartOperationalIntelligence.ts:1 import type { ERPModule } from "@/runtime/modules";
C:\Users\Admin\terragest\src\runtime\smart-intelligence\SmartPredictionEngine.ts:1 import type { ERPModule } from "@/runtime/modules";
C:\Users\Admin\terragest\src\runtime\smart-intelligence\SmartRecommendationEngine.ts:1 import type { ERPModule } from "@/runtime/modules";
C:\Users\Admin\terragest\src\runtime\smart-intelligence\SmartScoringEngine.ts:1 import type { ERPModule } from "@/runtime/modules";
C:\Users\Admin\terragest\src\runtime\smart-runtime\ERPSmartPriorityEngine.ts:1 import type { ERPModule } from "@/runtime/modules";
C:\Users\Admin\terragest\src\runtime\smart-runtime\ERPSmartRecommendations.ts:1 import type { ERPModule } from "@/runtime/modules";
C:\Users\Admin\terragest\src\runtime\smart-runtime\ERPSmartRuntimeEngine.ts:1 import type { ERPModule } from "@/runtime/modules";
C:\Users\Admin\terragest\src\runtime\ui\ERPUIComposition.ts:1 import type { ERPModule } from "@/runtime/modules";
C:\Users\Admin\terragest\src\runtime\ui-generation\ERPGeneratedSchemaResolver.ts:3 } from "@/runtime/modules/adapters/CoreModuleRuntimeAdapter";
C:\Users\Admin\terragest\src\runtime\validation\RuntimeValidationEngine.ts:4 } from "@/runtime/modules";
```
