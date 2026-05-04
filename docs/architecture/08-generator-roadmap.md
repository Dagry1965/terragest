# ERP Terragest - Generator Roadmap

# Objectif

Faire converger tous les générateurs et scripts ERP vers un pipeline officiel unique.

---

# Générateur Officiel Cible

Generate-EnterpriseModule.ps1

Ce script devient progressivement :

- le point d’entrée principal
- le moteur officiel ERP
- l’orchestrateur de génération
- la chaîne industrielle officielle

---

# Générateurs Existants

## Core

- Generate-CoreFoundation.ps1
- Generate-Domain.ps1

## Enterprise

- Generate-EnterpriseModule.ps1

## Legacy / spécialisés

- setup-dashboard
- setup-auth
- setup-mobile
- setup-observability
- scripts spécialisés métier

---

# Objectif de Convergence

Réduire progressivement :

- les scripts dupliqués
- les setup isolés
- les conventions multiples
- les pipelines parallèles

---

# Pipeline Cible

Generate-EnterpriseModule.ps1 `
  -Domain "stocks" `
  -Features Crud,Realtime,Offline,Tests

---

# Fonctionnalités Futures

## Backend

- services
- repositories
- schemas
- DTOs

## Frontend

- forms
- tables
- dashboards
- pages

## React Query

- query hooks
- mutations

## Realtime

- listeners
- subscriptions

## Offline

- IndexedDB
- queues
- synchronisation

## QA

- unit tests
- integration tests
- coverage
- mocks

## Platform

- observability
- monitoring
- events
- workflows

---

# Shared Core Obligatoire

Tous les générateurs doivent utiliser :

- filesystem.ps1
- naming.ps1
- logging.ps1
- validation.ps1
- template-engine.ps1

---

# Règles

- éviter les nouveaux scripts spécialisés
- mutualiser avant créer
- centraliser les templates
- standardiser les conventions
- privilégier le pipeline officiel

---

# Vision Long Terme

Construire un framework ERP capable de générer :

- modules métier
- APIs
- mobile
- realtime
- offline
- workflows
- observabilité
- QA

depuis une architecture unifiée.