# TERRAGEST ERP REPOSITORY CONSOLIDATION AUDIT

Date : 2026-05-12 16:08:52

# CORE RUNTIME REPOSITORIES


## RuntimeRepository

```txt
C:\Users\Admin\terragest\src\runtime\data\ERPDataEngine.ts:4 import { FirestoreRuntimeRepository } from "@/runtime/firestore/FirestoreRuntimeRepository";
C:\Users\Admin\terragest\src\runtime\data\ERPDataEngine.ts:48 return FirestoreRuntimeRepository.findMany(module);
C:\Users\Admin\terragest\src\runtime\firestore\FirestoreRuntimeMutation.ts:4 FirestoreRuntimeRepository,
C:\Users\Admin\terragest\src\runtime\firestore\FirestoreRuntimeMutation.ts:5 } from "./FirestoreRuntimeRepository";
C:\Users\Admin\terragest\src\runtime\firestore\FirestoreRuntimeMutation.ts:12 return FirestoreRuntimeRepository.create(
C:\Users\Admin\terragest\src\runtime\firestore\FirestoreRuntimeMutation.ts:23 return FirestoreRuntimeRepository.update(
C:\Users\Admin\terragest\src\runtime\firestore\FirestoreRuntimeMutation.ts:34 return FirestoreRuntimeRepository.delete(
C:\Users\Admin\terragest\src\runtime\firestore\FirestoreRuntimeQuery.ts:4 FirestoreRuntimeRepository,
C:\Users\Admin\terragest\src\runtime\firestore\FirestoreRuntimeQuery.ts:5 } from "./FirestoreRuntimeRepository";
C:\Users\Admin\terragest\src\runtime\firestore\FirestoreRuntimeQuery.ts:12 return FirestoreRuntimeRepository.findMany(
C:\Users\Admin\terragest\src\runtime\firestore\FirestoreRuntimeQuery.ts:21 return FirestoreRuntimeRepository.findById(
C:\Users\Admin\terragest\src\runtime\firestore\FirestoreRuntimeRepository.ts:16 export class FirestoreRuntimeRepository {
C:\Users\Admin\terragest\src\runtime\firestore\index.ts:2 FirestoreRuntimeRepository,
C:\Users\Admin\terragest\src\runtime\firestore\index.ts:3 } from "./FirestoreRuntimeRepository";
C:\Users\Admin\terragest\src\runtime\persistence\index.ts:3 export * from "./repositories/ERPRuntimeRepository";
C:\Users\Admin\terragest\src\runtime\persistence\repositories\ERPRuntimeRepository.ts:18 export class ERPRuntimeRepository<T = unknown> {
C:\Users\Admin\terragest\src\runtime\persistence\stores\ERPRuntimePersistenceService.ts:2 ERPRuntimeRepository,
C:\Users\Admin\terragest\src\runtime\persistence\stores\ERPRuntimePersistenceService.ts:3 } from "../repositories/ERPRuntimeRepository";
C:\Users\Admin\terragest\src\runtime\persistence\stores\ERPRuntimePersistenceService.ts:11 new ERPRuntimeRepository(
C:\Users\Admin\terragest\src\runtime\persistence\stores\ERPRuntimePersistenceService.ts:16 new ERPRuntimeRepository(
C:\Users\Admin\terragest\src\runtime\persistence\stores\ERPRuntimePersistenceService.ts:21 new ERPRuntimeRepository(
C:\Users\Admin\terragest\src\runtime\persistence\stores\ERPRuntimePersistenceService.ts:26 new ERPRuntimeRepository(
C:\Users\Admin\terragest\src\runtime\persistence\stores\ERPRuntimePersistenceService.ts:31 new ERPRuntimeRepository(
C:\Users\Admin\terragest\src\runtime\persistence\stores\ERPRuntimePersistenceService.ts:36 new ERPRuntimeRepository(
C:\Users\Admin\terragest\src\runtime\persistence\stores\ERPRuntimePersistenceService.ts:41 new ERPRuntimeRepository(
C:\Users\Admin\terragest\src\runtime\query\RuntimeQueryEngine.ts:2 import { RuntimeRepository } from "@/runtime/repositories/RuntimeRepository";
C:\Users\Admin\terragest\src\runtime\query\RuntimeQueryEngine.ts:6 return RuntimeRepository.findMany(module);
C:\Users\Admin\terragest\src\runtime\query\RuntimeQueryEngine.ts:10 return RuntimeRepository.findById(module, id);
C:\Users\Admin\terragest\src\runtime\repositories\index.ts:1 export { RuntimeRepository } from "./RuntimeRepository";
C:\Users\Admin\terragest\src\runtime\repositories\RuntimeRepository.ts:16 export class RuntimeRepository {
C:\Users\Admin\terragest\src\runtime\repositories\RuntimeRepository.ts:24 return RuntimeRepository.seed(module);
C:\Users\Admin\terragest\src\runtime\repositories\RuntimeRepository.ts:31 const rows = await RuntimeRepository.findMany(module);
```

## FirestoreRuntimeRepository

```txt
C:\Users\Admin\terragest\src\runtime\data\ERPDataEngine.ts:4 import { FirestoreRuntimeRepository } from "@/runtime/firestore/FirestoreRuntimeRepository";
C:\Users\Admin\terragest\src\runtime\data\ERPDataEngine.ts:48 return FirestoreRuntimeRepository.findMany(module);
C:\Users\Admin\terragest\src\runtime\firestore\FirestoreRuntimeMutation.ts:4 FirestoreRuntimeRepository,
C:\Users\Admin\terragest\src\runtime\firestore\FirestoreRuntimeMutation.ts:5 } from "./FirestoreRuntimeRepository";
C:\Users\Admin\terragest\src\runtime\firestore\FirestoreRuntimeMutation.ts:12 return FirestoreRuntimeRepository.create(
C:\Users\Admin\terragest\src\runtime\firestore\FirestoreRuntimeMutation.ts:23 return FirestoreRuntimeRepository.update(
C:\Users\Admin\terragest\src\runtime\firestore\FirestoreRuntimeMutation.ts:34 return FirestoreRuntimeRepository.delete(
C:\Users\Admin\terragest\src\runtime\firestore\FirestoreRuntimeQuery.ts:4 FirestoreRuntimeRepository,
C:\Users\Admin\terragest\src\runtime\firestore\FirestoreRuntimeQuery.ts:5 } from "./FirestoreRuntimeRepository";
C:\Users\Admin\terragest\src\runtime\firestore\FirestoreRuntimeQuery.ts:12 return FirestoreRuntimeRepository.findMany(
C:\Users\Admin\terragest\src\runtime\firestore\FirestoreRuntimeQuery.ts:21 return FirestoreRuntimeRepository.findById(
C:\Users\Admin\terragest\src\runtime\firestore\FirestoreRuntimeRepository.ts:16 export class FirestoreRuntimeRepository {
C:\Users\Admin\terragest\src\runtime\firestore\index.ts:2 FirestoreRuntimeRepository,
C:\Users\Admin\terragest\src\runtime\firestore\index.ts:3 } from "./FirestoreRuntimeRepository";
```

## RuntimeDataBinding

```txt
C:\Users\Admin\terragest\src\components\erp\forms\enterprise\ERPEnterpriseForm.tsx:8 import { RuntimeDataBinding } from "@/runtime/data-binding";
C:\Users\Admin\terragest\src\components\erp\forms\enterprise\ERPEnterpriseForm.tsx:201 await RuntimeDataBinding.create(
C:\Users\Admin\terragest\src\components\erp\forms\enterprise\ERPEnterpriseForm.tsx:209 await RuntimeDataBinding.update(
C:\Users\Admin\terragest\src\components\erp\generic\GenericDetailPage.tsx:7 import { RuntimeDataBinding } from "@/runtime/data-binding";
C:\Users\Admin\terragest\src\components\erp\generic\GenericDetailPage.tsx:45 await RuntimeDataBinding.detail(
C:\Users\Admin\terragest\src\components\erp\generic\GenericEditPage.tsx:6 import { RuntimeDataBinding } from "@/runtime/data-binding";
C:\Users\Admin\terragest\src\components\erp\generic\GenericEditPage.tsx:40 await RuntimeDataBinding.detail(runtimeModule, id);
C:\Users\Admin\terragest\src\components\erp\generic\GenericListPage.tsx:7 import { RuntimeDataBinding } from "@/runtime/data-binding";
C:\Users\Admin\terragest\src\components\erp\generic\GenericListPage.tsx:42 await RuntimeDataBinding.list(
C:\Users\Admin\terragest\src\runtime\data-binding\index.ts:2 export { RuntimeDataBinding } from "./RuntimeDataBinding";
C:\Users\Admin\terragest\src\runtime\data-binding\RuntimeDataBinding.ts:10 export class RuntimeDataBinding {
C:\Users\Admin\terragest\src\runtime\modules\lifecycle\ERPRelationDataLoader.ts:1 import { RuntimeDataBinding } from "@/runtime/data-binding";
C:\Users\Admin\terragest\src\runtime\modules\lifecycle\ERPRelationDataLoader.ts:14 const records = await RuntimeDataBinding.list(module);
```

# LEGACY REPOSITORIES


## Repository.ts files

```txt
C:\Users\Admin\terragest\src\analytics\repositories\AnalyticsRepository.ts:10 export const AnalyticsRepository = {
C:\Users\Admin\terragest\src\components\erp\persistence\ERPPersistenceDashboard.tsx:34 description="Repository runtime tenant-aware pour events, traces, alerts, workflows, queue jobs et audit."
C:\Users\Admin\terragest\src\components\ui\ProductRealtimeForm.tsx:8 ProductsRepository,
C:\Users\Admin\terragest\src\components\ui\ProductRealtimeForm.tsx:9 } from "@/lib/firestore/repositories/ProductsRepository";
C:\Users\Admin\terragest\src\components\ui\ProductRealtimeForm.tsx:32 await ProductsRepository.create({
C:\Users\Admin\terragest\src\domains\materiels\repositories\MaterielsRepository.ts:1 // src/domains/materiels/repositories/MaterielsRepository.ts
C:\Users\Admin\terragest\src\domains\materiels\repositories\MaterielsRepository.ts:4 BaseFirestoreRepository
C:\Users\Admin\terragest\src\domains\materiels\repositories\MaterielsRepository.ts:6 from "@/infrastructure/repositories/firestore/BaseFirestoreRepository";
C:\Users\Admin\terragest\src\domains\materiels\repositories\MaterielsRepository.ts:13 export class MaterielsRepository
C:\Users\Admin\terragest\src\domains\materiels\repositories\MaterielsRepository.ts:14 extends BaseFirestoreRepository<MaterielItem> {
C:\Users\Admin\terragest\src\domains\materiels\repositories\MaterielsRepository.ts:24 export const materielsRepository =
C:\Users\Admin\terragest\src\domains\materiels\repositories\MaterielsRepository.ts:25 new MaterielsRepository();
C:\Users\Admin\terragest\src\domains\materiels\store\MaterielsStore.ts:4 materielsRepository
C:\Users\Admin\terragest\src\domains\materiels\store\MaterielsStore.ts:6 from "@/domains/materiels/repositories/MaterielsRepository";
C:\Users\Admin\terragest\src\domains\materiels\store\MaterielsStore.ts:28 await materielsRepository
C:\Users\Admin\terragest\src\domains\materiels\store\MaterielsStore.ts:42 materielsRepository.subscribe(
C:\Users\Admin\terragest\src\domains\materiels\store\MaterielsStore.ts:65 await materielsRepository
C:\Users\Admin\terragest\src\domains\materiels\store\MaterielsStore.ts:107 await materielsRepository
C:\Users\Admin\terragest\src\features\billing\repositories\BillingRepository.ts:1 import { BaseRepository }
C:\Users\Admin\terragest\src\features\billing\repositories\BillingRepository.ts:2 from "@/lib/firestore/BaseRepository";
C:\Users\Admin\terragest\src\features\billing\repositories\BillingRepository.ts:7 class BillingRepositoryClass
C:\Users\Admin\terragest\src\features\billing\repositories\BillingRepository.ts:8 extends BaseRepository<Subscription> {
C:\Users\Admin\terragest\src\features\billing\repositories\BillingRepository.ts:16 export const BillingRepository =
C:\Users\Admin\terragest\src\features\billing\repositories\BillingRepository.ts:17 new BillingRepositoryClass();
C:\Users\Admin\terragest\src\features\billing\services\BillingService.ts:4 import { BillingRepository }
C:\Users\Admin\terragest\src\features\billing\services\BillingService.ts:5 from "@/features/billing/repositories/BillingRepository";
C:\Users\Admin\terragest\src\features\billing\services\BillingService.ts:52 BillingRepository.getAll();
C:\Users\Admin\terragest\src\features\billing\services\BillingService.ts:61 BillingRepository.update(
C:\Users\Admin\terragest\src\features\exploitations\components\ExploitationEditModal.tsx:21 ExploitationsRepository,
C:\Users\Admin\terragest\src\features\exploitations\components\ExploitationEditModal.tsx:22 } from "@/features/exploitations/repositories/ExploitationsRepository";
C:\Users\Admin\terragest\src\features\exploitations\components\ExploitationEditModal.tsx:103 await ExploitationsRepository.update(
C:\Users\Admin\terragest\src\features\exploitations\repositories\ExploitationRepository.ts:15 export const ExploitationRepository = {
C:\Users\Admin\terragest\src\features\exploitations\repositories\ExploitationsRepository.ts:26 export const ExploitationsRepository = {
C:\Users\Admin\terragest\src\features\exploitations\repositories\firestore\FirestoreExploitationRepository.ts:21 FirestoreExploitationRepository {
C:\Users\Admin\terragest\src\features\exploitations\services\ExploitationService.ts:2 FirestoreExploitationRepository
C:\Users\Admin\terragest\src\features\exploitations\services\ExploitationService.ts:4 from "../repositories/firestore/FirestoreExploitationRepository";
C:\Users\Admin\terragest\src\features\exploitations\services\ExploitationService.ts:15 return FirestoreExploitationRepository
C:\Users\Admin\terragest\src\features\exploitations\services\ExploitationService.ts:21 return FirestoreExploitationRepository
C:\Users\Admin\terragest\src\features\exploitations\services\ExploitationService.ts:29 return FirestoreExploitationRepository
C:\Users\Admin\terragest\src\features\exploitations\services\ExploitationService.ts:41 return FirestoreExploitationRepository
C:\Users\Admin\terragest\src\features\exploitations\services\ExploitationService.ts:49 return FirestoreExploitationRepository
C:\Users\Admin\terragest\src\features\exploitations\services\ExploitationsService.ts:6 ExploitationsRepository,
C:\Users\Admin\terragest\src\features\exploitations\services\ExploitationsService.ts:7 } from "@/features/exploitations/repositories/ExploitationsRepository";
C:\Users\Admin\terragest\src\features\exploitations\services\ExploitationsService.ts:20 return ExploitationsRepository.create(
C:\Users\Admin\terragest\src\features\fournisseurs\application\FournisseursService.ts:2 FirestoreFournisseursRepository
C:\Users\Admin\terragest\src\features\fournisseurs\application\FournisseursService.ts:4 from "../infrastructure/FirestoreFournisseursRepository";
C:\Users\Admin\terragest\src\features\fournisseurs\application\FournisseursService.ts:15 return FirestoreFournisseursRepository.create(
C:\Users\Admin\terragest\src\features\fournisseurs\application\FournisseursService.ts:21 return FirestoreFournisseursRepository.getAll();
C:\Users\Admin\terragest\src\features\fournisseurs\application\FournisseursService.ts:27 return FirestoreFournisseursRepository.getById(
C:\Users\Admin\terragest\src\features\fournisseurs\application\FournisseursService.ts:36 return FirestoreFournisseursRepository.update(
C:\Users\Admin\terragest\src\features\fournisseurs\application\FournisseursService.ts:45 return FirestoreFournisseursRepository.delete(
C:\Users\Admin\terragest\src\features\fournisseurs\domain\FournisseursRepository.ts:6 export interface FournisseursRepository {
C:\Users\Admin\terragest\src\features\fournisseurs\infrastructure\FirestoreFournisseursRepository.ts:21 FournisseursRepository
C:\Users\Admin\terragest\src\features\fournisseurs\infrastructure\FirestoreFournisseursRepository.ts:23 from "../domain/FournisseursRepository";
C:\Users\Admin\terragest\src\features\fournisseurs\infrastructure\FirestoreFournisseursRepository.ts:25 class FirestoreRepository
C:\Users\Admin\terragest\src\features\fournisseurs\infrastructure\FirestoreFournisseursRepository.ts:27 FournisseursRepository {
C:\Users\Admin\terragest\src\features\fournisseurs\infrastructure\FirestoreFournisseursRepository.ts:134 FirestoreFournisseursRepository =
C:\Users\Admin\terragest\src\features\fournisseurs\infrastructure\FirestoreFournisseursRepository.ts:135 new FirestoreRepository();
C:\Users\Admin\terragest\src\features\interventions\repositories\firestore\FirestoreInterventionRepository.ts:21 FirestoreInterventionRepository {
C:\Users\Admin\terragest\src\features\interventions\services\InterventionService.ts:2 FirestoreInterventionRepository
C:\Users\Admin\terragest\src\features\interventions\services\InterventionService.ts:4 from "../repositories/firestore/FirestoreInterventionRepository";
C:\Users\Admin\terragest\src\features\interventions\services\InterventionService.ts:15 return FirestoreInterventionRepository
C:\Users\Admin\terragest\src\features\interventions\services\InterventionService.ts:21 return FirestoreInterventionRepository
C:\Users\Admin\terragest\src\features\interventions\services\InterventionService.ts:29 return FirestoreInterventionRepository
C:\Users\Admin\terragest\src\features\interventions\services\InterventionService.ts:41 return FirestoreInterventionRepository
C:\Users\Admin\terragest\src\features\interventions\services\InterventionService.ts:49 return FirestoreInterventionRepository
C:\Users\Admin\terragest\src\features\invitations\repositories\InvitationsRepository.ts:1 import { BaseRepository }
C:\Users\Admin\terragest\src\features\invitations\repositories\InvitationsRepository.ts:2 from "@/lib/firestore/BaseRepository";
C:\Users\Admin\terragest\src\features\invitations\repositories\InvitationsRepository.ts:7 class InvitationsRepositoryClass
C:\Users\Admin\terragest\src\features\invitations\repositories\InvitationsRepository.ts:8 extends BaseRepository<Invitation> {
C:\Users\Admin\terragest\src\features\invitations\repositories\InvitationsRepository.ts:16 export const InvitationsRepository =
C:\Users\Admin\terragest\src\features\invitations\repositories\InvitationsRepository.ts:17 new InvitationsRepositoryClass();
C:\Users\Admin\terragest\src\features\invitations\services\InvitationService.ts:4 import { InvitationsRepository }
C:\Users\Admin\terragest\src\features\invitations\services\InvitationService.ts:5 from "@/features/invitations/repositories/InvitationsRepository";
C:\Users\Admin\terragest\src\features\invitations\services\InvitationService.ts:7 import { MembershipsRepository }
C:\Users\Admin\terragest\src\features\invitations\services\InvitationService.ts:8 from "@/features/memberships/repositories/MembershipsRepository";
C:\Users\Admin\terragest\src\features\invitations\services\InvitationService.ts:24 InvitationsRepository.create(
C:\Users\Admin\terragest\src\features\invitations\services\InvitationService.ts:34 InvitationsRepository.update(
C:\Users\Admin\terragest\src\features\invitations\services\InvitationService.ts:49 await InvitationsRepository.getAll()
C:\Users\Admin\terragest\src\features\invitations\services\InvitationService.ts:86 await MembershipsRepository.create({
C:\Users\Admin\terragest\src\features\invitations\services\InvitationService.ts:97 await InvitationsRepository.update(
C:\Users\Admin\terragest\src\features\invitations\services\InvitationService.ts:110 InvitationsRepository.getAll();
C:\Users\Admin\terragest\src\features\materiels\application\MaterielService.ts:2 FirestoreMaterielRepository
C:\Users\Admin\terragest\src\features\materiels\application\MaterielService.ts:4 from "../repositories/firestore/FirestoreMaterielRepository";
C:\Users\Admin\terragest\src\features\materiels\application\MaterielService.ts:15 return FirestoreMaterielRepository
C:\Users\Admin\terragest\src\features\materiels\application\MaterielService.ts:21 return FirestoreMaterielRepository
C:\Users\Admin\terragest\src\features\materiels\application\MaterielService.ts:29 return FirestoreMaterielRepository
C:\Users\Admin\terragest\src\features\materiels\application\MaterielService.ts:41 return FirestoreMaterielRepository
C:\Users\Admin\terragest\src\features\materiels\application\MaterielService.ts:49 return FirestoreMaterielRepository
C:\Users\Admin\terragest\src\features\materiels\domain\MaterielRepository.ts:4 export interface MaterielRepository {
C:\Users\Admin\terragest\src\features\materiels\infrastructure\FirestoreMaterielRepository.ts:21 FirestoreMaterielRepository {
C:\Users\Admin\terragest\src\features\materiels\repositories\MaterielRepository.ts:4 export interface MaterielRepository {
C:\Users\Admin\terragest\src\features\materiels\repositories\firestore\FirestoreMaterielRepository.ts:21 FirestoreMaterielRepository {
C:\Users\Admin\terragest\src\features\materiels\services\MaterielService.ts:2 FirestoreMaterielRepository
C:\Users\Admin\terragest\src\features\materiels\services\MaterielService.ts:4 from "../repositories/firestore/FirestoreMaterielRepository";
C:\Users\Admin\terragest\src\features\materiels\services\MaterielService.ts:15 return FirestoreMaterielRepository
C:\Users\Admin\terragest\src\features\materiels\services\MaterielService.ts:21 return FirestoreMaterielRepository
C:\Users\Admin\terragest\src\features\materiels\services\MaterielService.ts:29 return FirestoreMaterielRepository
C:\Users\Admin\terragest\src\features\materiels\services\MaterielService.ts:41 return FirestoreMaterielRepository
C:\Users\Admin\terragest\src\features\materiels\services\MaterielService.ts:49 return FirestoreMaterielRepository
C:\Users\Admin\terragest\src\features\memberships\repositories\MembershipsRepository.ts:1 import { BaseRepository }
C:\Users\Admin\terragest\src\features\memberships\repositories\MembershipsRepository.ts:2 from "@/lib/firestore/BaseRepository";
C:\Users\Admin\terragest\src\features\memberships\repositories\MembershipsRepository.ts:7 class MembershipsRepositoryClass
C:\Users\Admin\terragest\src\features\memberships\repositories\MembershipsRepository.ts:8 extends BaseRepository<Membership> {
C:\Users\Admin\terragest\src\features\memberships\repositories\MembershipsRepository.ts:16 export const MembershipsRepository =
C:\Users\Admin\terragest\src\features\memberships\repositories\MembershipsRepository.ts:17 new MembershipsRepositoryClass();
C:\Users\Admin\terragest\src\features\memberships\services\MembershipService.ts:4 import { MembershipsRepository }
C:\Users\Admin\terragest\src\features\memberships\services\MembershipService.ts:5 from "@/features/memberships/repositories/MembershipsRepository";
C:\Users\Admin\terragest\src\features\memberships\services\MembershipService.ts:28 MembershipsRepository.create(
C:\Users\Admin\terragest\src\features\memberships\services\MembershipService.ts:36 MembershipsRepository.getAll();
C:\Users\Admin\terragest\src\features\mouvements\repositories\MouvementRepository.ts:16 export const MouvementRepository = {
C:\Users\Admin\terragest\src\features\mouvements\services\MouvementService.ts:1 import { MouvementRepository } from "../repositories/MouvementRepository";
C:\Users\Admin\terragest\src\features\mouvements\services\MouvementService.ts:11 await MouvementRepository.create(data);
C:\Users\Admin\terragest\src\features\mouvements\services\MouvementService.ts:25 return MouvementRepository.getAllByOrganisation(
C:\Users\Admin\terragest\src\features\organisations\repositories\OrganisationRepository.ts:13 export const OrganisationRepository = {
C:\Users\Admin\terragest\src\features\organizations\repositories\OrganizationsRepository.ts:1 import { BaseRepository }
C:\Users\Admin\terragest\src\features\organizations\repositories\OrganizationsRepository.ts:2 from "@/lib/firestore/BaseRepository";
C:\Users\Admin\terragest\src\features\organizations\repositories\OrganizationsRepository.ts:7 class OrganizationsRepositoryClass
C:\Users\Admin\terragest\src\features\organizations\repositories\OrganizationsRepository.ts:8 extends BaseRepository<Organization> {
C:\Users\Admin\terragest\src\features\organizations\repositories\OrganizationsRepository.ts:16 export const OrganizationsRepository =
C:\Users\Admin\terragest\src\features\organizations\repositories\OrganizationsRepository.ts:17 new OrganizationsRepositoryClass();
C:\Users\Admin\terragest\src\features\organizations\services\OrganizationService.ts:4 import { OrganizationsRepository }
C:\Users\Admin\terragest\src\features\organizations\services\OrganizationService.ts:5 from "@/features/organizations/repositories/OrganizationsRepository";
C:\Users\Admin\terragest\src\features\organizations\services\OrganizationService.ts:21 OrganizationsRepository.create(
C:\Users\Admin\terragest\src\features\organizations\services\OrganizationService.ts:29 OrganizationsRepository.getAll();
C:\Users\Admin\terragest\src\features\produits\components\ProductEditForm.tsx:17 import { ProductsRepository }
C:\Users\Admin\terragest\src\features\produits\components\ProductEditForm.tsx:18 from "@/features/produits/repositories/ProductsRepository";
C:\Users\Admin\terragest\src\features\produits\components\ProductEditForm.tsx:61 await ProductsRepository.update(
C:\Users\Admin\terragest\src\features\produits\components\ProductsTable.tsx:25 import { ProductsRepository }
C:\Users\Admin\terragest\src\features\produits\components\ProductsTable.tsx:26 from "@/features/produits/repositories/ProductsRepository";
C:\Users\Admin\terragest\src\features\produits\components\ProductsTable.tsx:69 await ProductsRepository.delete(
C:\Users\Admin\terragest\src\features\produits\repositories\ProductsRepository.ts:1 import { BaseRepository }
C:\Users\Admin\terragest\src\features\produits\repositories\ProductsRepository.ts:2 from "@/lib/firestore/BaseRepository";
C:\Users\Admin\terragest\src\features\produits\repositories\ProductsRepository.ts:7 class ProductsRepositoryClass
C:\Users\Admin\terragest\src\features\produits\repositories\ProductsRepository.ts:8 extends BaseRepository<Product> {
C:\Users\Admin\terragest\src\features\produits\repositories\ProductsRepository.ts:16 export const ProductsRepository =
C:\Users\Admin\terragest\src\features\produits\repositories\ProductsRepository.ts:17 new ProductsRepositoryClass();
C:\Users\Admin\terragest\src\features\produits\repositories\ProduitRepository.ts:7 export class ProduitRepository {
C:\Users\Admin\terragest\src\features\produits\repositories\firestore\FirestoreProduitRepository.ts:21 FirestoreProduitRepository {
C:\Users\Admin\terragest\src\features\produits\services\ProductService.ts:4 import { ProductsRepository }
C:\Users\Admin\terragest\src\features\produits\services\ProductService.ts:5 from "@/features/produits/repositories/ProductsRepository";
C:\Users\Admin\terragest\src\features\produits\services\ProductService.ts:27 return await ProductsRepository.create(
C:\Users\Admin\terragest\src\features\produits\services\ProductService.ts:34 return await ProductsRepository.getAll();
C:\Users\Admin\terragest\src\features\produits\services\ProduitService.ts:2 FirestoreProduitRepository
C:\Users\Admin\terragest\src\features\produits\services\ProduitService.ts:4 from "../repositories/firestore/FirestoreProduitRepository";
C:\Users\Admin\terragest\src\features\produits\services\ProduitService.ts:15 return FirestoreProduitRepository
C:\Users\Admin\terragest\src\features\produits\services\ProduitService.ts:23 return FirestoreProduitRepository
C:\Users\Admin\terragest\src\features\produits\services\ProduitService.ts:31 return FirestoreProduitRepository
C:\Users\Admin\terragest\src\features\produits\services\ProduitService.ts:43 return FirestoreProduitRepository
C:\Users\Admin\terragest\src\features\produits\services\ProduitService.ts:51 return FirestoreProduitRepository
C:\Users\Admin\terragest\src\features\ressources\repositories\RessourceRepository.ts:18 export const RessourceRepository = {
C:\Users\Admin\terragest\src\features\stocks\repositories\firestore\FirestoreStockRepository.ts:29 FirestoreStockRepository = {
C:\Users\Admin\terragest\src\features\stocks\services\StockService.ts:3 FirestoreStockRepository
C:\Users\Admin\terragest\src\features\stocks\services\StockService.ts:5 } from "@/features/stocks/repositories/firestore/FirestoreStockRepository";
C:\Users\Admin\terragest\src\features\stocks\services\StockService.ts:14 return FirestoreStockRepository
C:\Users\Admin\terragest\src\features\stocks\services\StockService.ts:20 return FirestoreStockRepository
C:\Users\Admin\terragest\src\features\teams\services\TeamService.ts:7 import { MembershipsRepository }
C:\Users\Admin\terragest\src\features\teams\services\TeamService.ts:8 from "@/features/memberships/repositories/MembershipsRepository";
C:\Users\Admin\terragest\src\features\teams\services\TeamService.ts:15 MembershipsRepository.getAll();
C:\Users\Admin\terragest\src\features\teams\services\TeamService.ts:23 MembershipsRepository.delete(
C:\Users\Admin\terragest\src\features\teams\services\TeamService.ts:34 MembershipsRepository.update(
C:\Users\Admin\terragest\src\features\terrains\repositories\TerrainRepository.ts:15 export const TerrainRepository = {
C:\Users\Admin\terragest\src\hooks\useCollection.ts:8 import { BaseRepository }
C:\Users\Admin\terragest\src\hooks\useCollection.ts:9 from "@/lib/firestore/BaseRepository";
C:\Users\Admin\terragest\src\hooks\useCollection.ts:23 const repository =
C:\Users\Admin\terragest\src\hooks\useCollection.ts:24 new BaseRepository<T>(
C:\Users\Admin\terragest\src\hooks\useCollection.ts:29 repository.subscribe(
C:\Users\Admin\terragest\src\infrastructure\firebase\FirestoreRepository.ts:1 export class FirestoreRepository<T> {
C:\Users\Admin\terragest\src\infrastructure\repositories\firestore\BaseFirestoreRepository.ts:1 // src/infrastructure/repositories/firestore/BaseFirestoreRepository.ts
C:\Users\Admin\terragest\src\infrastructure\repositories\firestore\BaseFirestoreRepository.ts:24 export class BaseFirestoreRepository<T> {
C:\Users\Admin\terragest\src\infrastructure\repositories\firestore\FirestoreMaterielRepository.ts:4 import type { MaterielRepository }
C:\Users\Admin\terragest\src\infrastructure\repositories\firestore\FirestoreMaterielRepository.ts:5 from "../../../features/materiels/repositories/MaterielRepository";
C:\Users\Admin\terragest\src\infrastructure\repositories\firestore\FirestoreMaterielRepository.ts:7 export class FirestoreMaterielRepository
C:\Users\Admin\terragest\src\infrastructure\repositories\firestore\FirestoreMaterielRepository.ts:8 implements MaterielRepository {
C:\Users\Admin\terragest\src\lib\firestore\BaseRepository.ts:15 export class BaseRepository<T> {
C:\Users\Admin\terragest\src\lib\firestore\repositories\ProductsRepository.ts:1 export const ProductsRepository = {
C:\Users\Admin\terragest\src\runtime\data\ERPDataEngine.ts:4 import { FirestoreRuntimeRepository } from "@/runtime/firestore/FirestoreRuntimeRepository";
C:\Users\Admin\terragest\src\runtime\data\ERPDataEngine.ts:48 return FirestoreRuntimeRepository.findMany(module);
C:\Users\Admin\terragest\src\runtime\data\ERPDataRepository.ts:9 export class ERPDataRepository {
C:\Users\Admin\terragest\src\runtime\data\ERPDataRepository.ts:97 export const erpDataRepository =
C:\Users\Admin\terragest\src\runtime\data\ERPDataRepository.ts:98 new ERPDataRepository();
C:\Users\Admin\terragest\src\runtime\data\ERPModuleDataService.ts:2 erpDataRepository,
C:\Users\Admin\terragest\src\runtime\data\ERPModuleDataService.ts:4 } from "./ERPDataRepository";
C:\Users\Admin\terragest\src\runtime\data\ERPModuleDataService.ts:12 return erpDataRepository
C:\Users\Admin\terragest\src\runtime\data\ERPModuleDataService.ts:21 return erpDataRepository
C:\Users\Admin\terragest\src\runtime\data\ERPModuleDataService.ts:33 return erpDataRepository
C:\Users\Admin\terragest\src\runtime\data\ERPModuleDataService.ts:46 return erpDataRepository
C:\Users\Admin\terragest\src\runtime\data\ERPModuleDataService.ts:59 return erpDataRepository
C:\Users\Admin\terragest\src\runtime\data\index.ts:1 export * from "./ERPDataRepository";
C:\Users\Admin\terragest\src\runtime\data\analytics\PersistentAnalyticsEngine.ts:2 AnalyticsRepository
C:\Users\Admin\terragest\src\runtime\data\analytics\PersistentAnalyticsEngine.ts:4 from "../../persistence/analytics/AnalyticsRepository";
C:\Users\Admin\terragest\src\runtime\data\analytics\PersistentAnalyticsEngine.ts:9 private repository =
C:\Users\Admin\terragest\src\runtime\data\analytics\PersistentAnalyticsEngine.ts:10 new AnalyticsRepository();
C:\Users\Admin\terragest\src\runtime\data\analytics\PersistentAnalyticsEngine.ts:17 await this.repository.save({
C:\Users\Admin\terragest\src\runtime\execution\PersistentWorkflowExecutor.ts:2 WorkflowRepository
C:\Users\Admin\terragest\src\runtime\execution\PersistentWorkflowExecutor.ts:4 from "../persistence/workflows/WorkflowRepository";
C:\Users\Admin\terragest\src\runtime\execution\PersistentWorkflowExecutor.ts:9 private repository =
C:\Users\Admin\terragest\src\runtime\execution\PersistentWorkflowExecutor.ts:10 new WorkflowRepository();
C:\Users\Admin\terragest\src\runtime\execution\PersistentWorkflowExecutor.ts:17 await this.repository.save({
C:\Users\Admin\terragest\src\runtime\firestore\FirestoreRuntimeMutation.ts:4 FirestoreRuntimeRepository,
C:\Users\Admin\terragest\src\runtime\firestore\FirestoreRuntimeMutation.ts:5 } from "./FirestoreRuntimeRepository";
C:\Users\Admin\terragest\src\runtime\firestore\FirestoreRuntimeMutation.ts:12 return FirestoreRuntimeRepository.create(
C:\Users\Admin\terragest\src\runtime\firestore\FirestoreRuntimeMutation.ts:23 return FirestoreRuntimeRepository.update(
C:\Users\Admin\terragest\src\runtime\firestore\FirestoreRuntimeMutation.ts:34 return FirestoreRuntimeRepository.delete(
C:\Users\Admin\terragest\src\runtime\firestore\FirestoreRuntimeQuery.ts:4 FirestoreRuntimeRepository,
C:\Users\Admin\terragest\src\runtime\firestore\FirestoreRuntimeQuery.ts:5 } from "./FirestoreRuntimeRepository";
C:\Users\Admin\terragest\src\runtime\firestore\FirestoreRuntimeQuery.ts:12 return FirestoreRuntimeRepository.findMany(
C:\Users\Admin\terragest\src\runtime\firestore\FirestoreRuntimeQuery.ts:21 return FirestoreRuntimeRepository.findById(
C:\Users\Admin\terragest\src\runtime\firestore\FirestoreRuntimeRepository.ts:16 export class FirestoreRuntimeRepository {
C:\Users\Admin\terragest\src\runtime\firestore\index.ts:2 FirestoreRuntimeRepository,
C:\Users\Admin\terragest\src\runtime\firestore\index.ts:3 } from "./FirestoreRuntimeRepository";
C:\Users\Admin\terragest\src\runtime\governance\EnterpriseGovernanceEngine.ts:63 "RepositoryPattern"
C:\Users\Admin\terragest\src\runtime\monitoring\PersistentRuntimePublisher.ts:2 RuntimeEventRepository
C:\Users\Admin\terragest\src\runtime\monitoring\PersistentRuntimePublisher.ts:4 from "../persistence/events/RuntimeEventRepository";
C:\Users\Admin\terragest\src\runtime\monitoring\PersistentRuntimePublisher.ts:14 private repository =
C:\Users\Admin\terragest\src\runtime\monitoring\PersistentRuntimePublisher.ts:15 new RuntimeEventRepository();
C:\Users\Admin\terragest\src\runtime\monitoring\PersistentRuntimePublisher.ts:25 await this.repository.append({
C:\Users\Admin\terragest\src\runtime\os\audit\PersistentAuditStream.ts:2 AuditRepository
C:\Users\Admin\terragest\src\runtime\os\audit\PersistentAuditStream.ts:4 from "../../persistence/audit/AuditRepository";
C:\Users\Admin\terragest\src\runtime\os\audit\PersistentAuditStream.ts:9 private repository =
C:\Users\Admin\terragest\src\runtime\os\audit\PersistentAuditStream.ts:10 new AuditRepository();
C:\Users\Admin\terragest\src\runtime\os\audit\PersistentAuditStream.ts:17 await this.repository.save({
C:\Users\Admin\terragest\src\runtime\persistence\FirestoreHealthCheck.ts:2 RuntimeEventRepository
C:\Users\Admin\terragest\src\runtime\persistence\FirestoreHealthCheck.ts:4 from "./events/RuntimeEventRepository";
C:\Users\Admin\terragest\src\runtime\persistence\FirestoreHealthCheck.ts:9 const repository =
C:\Users\Admin\terragest\src\runtime\persistence\FirestoreHealthCheck.ts:10 new RuntimeEventRepository();
C:\Users\Admin\terragest\src\runtime\persistence\FirestoreHealthCheck.ts:13 await repository.getAll();
C:\Users\Admin\terragest\src\runtime\persistence\index.ts:3 export * from "./repositories/ERPRuntimeRepository";
C:\Users\Admin\terragest\src\runtime\persistence\analytics\AnalyticsRepository.ts:10 export class AnalyticsRepository {
C:\Users\Admin\terragest\src\runtime\persistence\audit\AuditRepository.ts:10 export class AuditRepository {
C:\Users\Admin\terragest\src\runtime\persistence\events\RuntimeEventRepository.ts:12 RuntimeEventRepository {
C:\Users\Admin\terragest\src\runtime\persistence\processes\ProcessRepository.ts:10 export class ProcessRepository {
C:\Users\Admin\terragest\src\runtime\persistence\projections\ProjectionRepository.ts:10 export class ProjectionRepository {
C:\Users\Admin\terragest\src\runtime\persistence\repositories\ERPRuntimeRepository.ts:18 export class ERPRuntimeRepository<T = unknown> {
C:\Users\Admin\terragest\src\runtime\persistence\stores\ERPRuntimePersistenceService.ts:2 ERPRuntimeRepository,
C:\Users\Admin\terragest\src\runtime\persistence\stores\ERPRuntimePersistenceService.ts:3 } from "../repositories/ERPRuntimeRepository";
C:\Users\Admin\terragest\src\runtime\persistence\stores\ERPRuntimePersistenceService.ts:11 new ERPRuntimeRepository(
C:\Users\Admin\terragest\src\runtime\persistence\stores\ERPRuntimePersistenceService.ts:16 new ERPRuntimeRepository(
C:\Users\Admin\terragest\src\runtime\persistence\stores\ERPRuntimePersistenceService.ts:21 new ERPRuntimeRepository(
C:\Users\Admin\terragest\src\runtime\persistence\stores\ERPRuntimePersistenceService.ts:26 new ERPRuntimeRepository(
C:\Users\Admin\terragest\src\runtime\persistence\stores\ERPRuntimePersistenceService.ts:31 new ERPRuntimeRepository(
C:\Users\Admin\terragest\src\runtime\persistence\stores\ERPRuntimePersistenceService.ts:36 new ERPRuntimeRepository(
C:\Users\Admin\terragest\src\runtime\persistence\stores\ERPRuntimePersistenceService.ts:41 new ERPRuntimeRepository(
C:\Users\Admin\terragest\src\runtime\persistence\workflows\WorkflowRepository.ts:10 export class WorkflowRepository {
C:\Users\Admin\terragest\src\runtime\processes\PersistentProcessExecutor.ts:2 ProcessRepository
C:\Users\Admin\terragest\src\runtime\processes\PersistentProcessExecutor.ts:4 from "../persistence/processes/ProcessRepository";
C:\Users\Admin\terragest\src\runtime\processes\PersistentProcessExecutor.ts:9 private repository =
C:\Users\Admin\terragest\src\runtime\processes\PersistentProcessExecutor.ts:10 new ProcessRepository();
C:\Users\Admin\terragest\src\runtime\processes\PersistentProcessExecutor.ts:17 await this.repository.save({
C:\Users\Admin\terragest\src\runtime\query\RuntimeQueryEngine.ts:2 import { RuntimeRepository } from "@/runtime/repositories/RuntimeRepository";
C:\Users\Admin\terragest\src\runtime\query\RuntimeQueryEngine.ts:6 return RuntimeRepository.findMany(module);
C:\Users\Admin\terragest\src\runtime\query\RuntimeQueryEngine.ts:10 return RuntimeRepository.findById(module, id);
C:\Users\Admin\terragest\src\runtime\repositories\index.ts:1 export { RuntimeRepository } from "./RuntimeRepository";
C:\Users\Admin\terragest\src\runtime\repositories\RuntimeRepository.ts:16 export class RuntimeRepository {
C:\Users\Admin\terragest\src\runtime\repositories\RuntimeRepository.ts:24 return RuntimeRepository.seed(module);
C:\Users\Admin\terragest\src\runtime\repositories\RuntimeRepository.ts:31 const rows = await RuntimeRepository.findMany(module);
C:\Users\Admin\terragest\src\services\StockService.ts:2 FirestoreStockRepository
C:\Users\Admin\terragest\src\services\StockService.ts:4 from "@/features/stocks/repositories/firestore/FirestoreStockRepository";
C:\Users\Admin\terragest\src\services\StockService.ts:15 return FirestoreStockRepository
C:\Users\Admin\terragest\src\services\StockService.ts:21 return FirestoreStockRepository
C:\Users\Admin\terragest\src\services\StockService.ts:29 return FirestoreStockRepository
C:\Users\Admin\terragest\src\services\StockService.ts:41 return FirestoreStockRepository
C:\Users\Admin\terragest\src\services\StockService.ts:49 return FirestoreStockRepository
C:\Users\Admin\terragest\src\shared\repositories\BaseRepository.ts:13 export class BaseRepository<T> {
C:\Users\Admin\terragest\src\shared\repositories\ProductRepository.ts:1 import { BaseRepository } from "@/shared/repositories/BaseRepository";
C:\Users\Admin\terragest\src\shared\repositories\ProductRepository.ts:5 export class ProductRepository
C:\Users\Admin\terragest\src\shared\repositories\ProductRepository.ts:6 extends BaseRepository<Product> {
C:\Users\Admin\terragest\src\shared\services\BaseCrudService.ts:3 repository: any;
C:\Users\Admin\terragest\src\shared\services\BaseCrudService.ts:6 repository: any
C:\Users\Admin\terragest\src\shared\services\BaseCrudService.ts:9 this.repository =
C:\Users\Admin\terragest\src\shared\services\BaseCrudService.ts:10 repository;
C:\Users\Admin\terragest\src\shared\services\BaseCrudService.ts:17 return this.repository.create(
C:\Users\Admin\terragest\src\shared\services\BaseCrudService.ts:24 return this.repository.getAll();
C:\Users\Admin\terragest\src\shared\services\BaseCrudService.ts:31 return this.repository.getById(
C:\Users\Admin\terragest\src\shared\services\BaseCrudService.ts:41 return this.repository.update(
C:\Users\Admin\terragest\src\shared\services\BaseCrudService.ts:51 return this.repository.delete(
C:\Users\Admin\terragest\src\shared\services\ProductService.ts:3 import { ProductRepository } from "@/shared/repositories/ProductRepository";
C:\Users\Admin\terragest\src\shared\services\ProductService.ts:13 new ProductRepository()
C:\Users\Admin\terragest\src\_quarantine\modules\alertes\index.ts:2 export * from "./repositories/AlertesRepository";
C:\Users\Admin\terragest\src\_quarantine\modules\alertes\repositories\AlertesRepository.ts:1 import { FirestoreRepository } from "@/infrastructure/firebase/FirestoreRepository";
C:\Users\Admin\terragest\src\_quarantine\modules\alertes\repositories\AlertesRepository.ts:4 export class AlertesRepository extends FirestoreRepository<AlertesDTO> {
C:\Users\Admin\terragest\src\_quarantine\modules\alertes\services\AlertesService.ts:1 import { AlertesRepository } from "../repositories/AlertesRepository";
C:\Users\Admin\terragest\src\_quarantine\modules\alertes\services\AlertesService.ts:4 private repository =
C:\Users\Admin\terragest\src\_quarantine\modules\alertes\services\AlertesService.ts:5 new AlertesRepository();
C:\Users\Admin\terragest\src\_quarantine\modules\alertes\services\AlertesService.ts:8 return this.repository.findAll();
C:\Users\Admin\terragest\src\_quarantine\modules\alertes\services\AlertesService.ts:12 return this.repository.findById(id);
C:\Users\Admin\terragest\src\_quarantine\modules\alertes\services\AlertesService.ts:16 return this.repository.create(data);
C:\Users\Admin\terragest\src\_quarantine\modules\alertes\services\AlertesService.ts:23 return this.repository.update(id, data);
C:\Users\Admin\terragest\src\_quarantine\modules\alertes\services\AlertesService.ts:27 return this.repository.delete(id);
C:\Users\Admin\terragest\src\_quarantine\modules\analytics\index.ts:2 export * from "./repositories/AnalyticsRepository";
C:\Users\Admin\terragest\src\_quarantine\modules\analytics\repositories\AnalyticsRepository.ts:1 import { FirestoreRepository } from "@/infrastructure/firebase/FirestoreRepository";
C:\Users\Admin\terragest\src\_quarantine\modules\analytics\repositories\AnalyticsRepository.ts:4 export class AnalyticsRepository extends FirestoreRepository<AnalyticsDTO> {
C:\Users\Admin\terragest\src\_quarantine\modules\analytics\services\AnalyticsService.ts:1 import { AnalyticsRepository } from "../repositories/AnalyticsRepository";
C:\Users\Admin\terragest\src\_quarantine\modules\analytics\services\AnalyticsService.ts:4 private repository =
C:\Users\Admin\terragest\src\_quarantine\modules\analytics\services\AnalyticsService.ts:5 new AnalyticsRepository();
C:\Users\Admin\terragest\src\_quarantine\modules\analytics\services\AnalyticsService.ts:8 return this.repository.findAll();
C:\Users\Admin\terragest\src\_quarantine\modules\analytics\services\AnalyticsService.ts:12 return this.repository.findById(id);
C:\Users\Admin\terragest\src\_quarantine\modules\analytics\services\AnalyticsService.ts:16 return this.repository.create(data);
C:\Users\Admin\terragest\src\_quarantine\modules\analytics\services\AnalyticsService.ts:23 return this.repository.update(id, data);
C:\Users\Admin\terragest\src\_quarantine\modules\analytics\services\AnalyticsService.ts:27 return this.repository.delete(id);
C:\Users\Admin\terragest\src\_quarantine\modules\clients\index.ts:2 export * from "./repositories/ClientsRepository";
C:\Users\Admin\terragest\src\_quarantine\modules\clients\repositories\ClientsRepository.ts:1 import { FirestoreRepository } from "@/infrastructure/firebase/FirestoreRepository";
C:\Users\Admin\terragest\src\_quarantine\modules\clients\repositories\ClientsRepository.ts:4 export class ClientsRepository extends FirestoreRepository<ClientsDTO> {
C:\Users\Admin\terragest\src\_quarantine\modules\clients\services\ClientsService.ts:1 import { ClientsRepository } from "../repositories/ClientsRepository";
C:\Users\Admin\terragest\src\_quarantine\modules\clients\services\ClientsService.ts:4 private repository =
C:\Users\Admin\terragest\src\_quarantine\modules\clients\services\ClientsService.ts:5 new ClientsRepository();
C:\Users\Admin\terragest\src\_quarantine\modules\clients\services\ClientsService.ts:8 return this.repository.findAll();
C:\Users\Admin\terragest\src\_quarantine\modules\clients\services\ClientsService.ts:12 return this.repository.findById(id);
C:\Users\Admin\terragest\src\_quarantine\modules\clients\services\ClientsService.ts:16 return this.repository.create(data);
C:\Users\Admin\terragest\src\_quarantine\modules\clients\services\ClientsService.ts:23 return this.repository.update(id, data);
C:\Users\Admin\terragest\src\_quarantine\modules\clients\services\ClientsService.ts:27 return this.repository.delete(id);
C:\Users\Admin\terragest\src\_quarantine\modules\contrats\index.ts:2 export * from "./repositories/ContratsRepository";
C:\Users\Admin\terragest\src\_quarantine\modules\contrats\repositories\ContratsRepository.ts:1 import { FirestoreRepository } from "@/infrastructure/firebase/FirestoreRepository";
C:\Users\Admin\terragest\src\_quarantine\modules\contrats\repositories\ContratsRepository.ts:4 export class ContratsRepository extends FirestoreRepository<ContratsDTO> {
C:\Users\Admin\terragest\src\_quarantine\modules\contrats\repositories\Repository.ts:1 import { FirestoreRepository } from "@/infrastructure/firebase/FirestoreRepository";
C:\Users\Admin\terragest\src\_quarantine\modules\contrats\repositories\Repository.ts:4 export class Repository extends FirestoreRepository<DTO> {
C:\Users\Admin\terragest\src\_quarantine\modules\contrats\services\ContratsService.ts:1 import { ContratsRepository } from "../repositories/ContratsRepository";
C:\Users\Admin\terragest\src\_quarantine\modules\contrats\services\ContratsService.ts:4 private repository =
C:\Users\Admin\terragest\src\_quarantine\modules\contrats\services\ContratsService.ts:5 new ContratsRepository();
C:\Users\Admin\terragest\src\_quarantine\modules\contrats\services\ContratsService.ts:8 return this.repository.findAll();
C:\Users\Admin\terragest\src\_quarantine\modules\contrats\services\ContratsService.ts:12 return this.repository.findById(id);
C:\Users\Admin\terragest\src\_quarantine\modules\contrats\services\ContratsService.ts:16 return this.repository.create(data);
C:\Users\Admin\terragest\src\_quarantine\modules\contrats\services\ContratsService.ts:23 return this.repository.update(id, data);
C:\Users\Admin\terragest\src\_quarantine\modules\contrats\services\ContratsService.ts:27 return this.repository.delete(id);
C:\Users\Admin\terragest\src\_quarantine\modules\contrats\services\Service.ts:1 import { Repository } from "../repositories/Repository";
C:\Users\Admin\terragest\src\_quarantine\modules\contrats\services\Service.ts:4 private repository = new Repository();
C:\Users\Admin\terragest\src\_quarantine\modules\exploitations\index.ts:2 export * from "./repositories/ExploitationsRepository";
C:\Users\Admin\terragest\src\_quarantine\modules\exploitations\repositories\ExploitationsRepository.ts:1 import { FirestoreRepository } from "@/infrastructure/firebase/FirestoreRepository";
C:\Users\Admin\terragest\src\_quarantine\modules\exploitations\repositories\ExploitationsRepository.ts:4 export class ExploitationsRepository extends FirestoreRepository<ExploitationsDTO> {
C:\Users\Admin\terragest\src\_quarantine\modules\exploitations\services\ExploitationsService.ts:1 import { ExploitationsRepository } from "../repositories/ExploitationsRepository";
C:\Users\Admin\terragest\src\_quarantine\modules\exploitations\services\ExploitationsService.ts:4 private repository =
C:\Users\Admin\terragest\src\_quarantine\modules\exploitations\services\ExploitationsService.ts:5 new ExploitationsRepository();
C:\Users\Admin\terragest\src\_quarantine\modules\exploitations\services\ExploitationsService.ts:8 return this.repository.findAll();
C:\Users\Admin\terragest\src\_quarantine\modules\exploitations\services\ExploitationsService.ts:12 return this.repository.findById(id);
C:\Users\Admin\terragest\src\_quarantine\modules\exploitations\services\ExploitationsService.ts:16 return this.repository.create(data);
C:\Users\Admin\terragest\src\_quarantine\modules\exploitations\services\ExploitationsService.ts:23 return this.repository.update(id, data);
C:\Users\Admin\terragest\src\_quarantine\modules\exploitations\services\ExploitationsService.ts:27 return this.repository.delete(id);
C:\Users\Admin\terragest\src\_quarantine\modules\factures\index.ts:2 export * from "./repositories/FacturesRepository";
C:\Users\Admin\terragest\src\_quarantine\modules\factures\repositories\FacturesRepository.ts:1 import { FirestoreRepository } from "@/infrastructure/firebase/FirestoreRepository";
C:\Users\Admin\terragest\src\_quarantine\modules\factures\repositories\FacturesRepository.ts:4 export class FacturesRepository extends FirestoreRepository<FacturesDTO> {
C:\Users\Admin\terragest\src\_quarantine\modules\factures\services\FacturesService.ts:1 import { FacturesRepository } from "../repositories/FacturesRepository";
C:\Users\Admin\terragest\src\_quarantine\modules\factures\services\FacturesService.ts:4 private repository =
C:\Users\Admin\terragest\src\_quarantine\modules\factures\services\FacturesService.ts:5 new FacturesRepository();
C:\Users\Admin\terragest\src\_quarantine\modules\factures\services\FacturesService.ts:8 return this.repository.findAll();
C:\Users\Admin\terragest\src\_quarantine\modules\factures\services\FacturesService.ts:12 return this.repository.findById(id);
C:\Users\Admin\terragest\src\_quarantine\modules\factures\services\FacturesService.ts:16 return this.repository.create(data);
C:\Users\Admin\terragest\src\_quarantine\modules\factures\services\FacturesService.ts:23 return this.repository.update(id, data);
C:\Users\Admin\terragest\src\_quarantine\modules\factures\services\FacturesService.ts:27 return this.repository.delete(id);
C:\Users\Admin\terragest\src\_quarantine\modules\fournisseurs\index.ts:2 export * from "./repositories/FournisseursRepository";
C:\Users\Admin\terragest\src\_quarantine\modules\fournisseurs\repositories\FournisseursRepository.ts:1 import { FirestoreRepository } from "@/infrastructure/firebase/FirestoreRepository";
C:\Users\Admin\terragest\src\_quarantine\modules\fournisseurs\repositories\FournisseursRepository.ts:4 export class FournisseursRepository extends FirestoreRepository<FournisseursDTO> {
C:\Users\Admin\terragest\src\_quarantine\modules\fournisseurs\repositories\Repository.ts:1 import { FirestoreRepository } from "@/infrastructure/firebase/FirestoreRepository";
C:\Users\Admin\terragest\src\_quarantine\modules\fournisseurs\repositories\Repository.ts:4 export class Repository extends FirestoreRepository<DTO> {
C:\Users\Admin\terragest\src\_quarantine\modules\fournisseurs\services\FournisseursService.ts:1 import { FournisseursRepository } from "../repositories/FournisseursRepository";
C:\Users\Admin\terragest\src\_quarantine\modules\fournisseurs\services\FournisseursService.ts:4 private repository =
C:\Users\Admin\terragest\src\_quarantine\modules\fournisseurs\services\FournisseursService.ts:5 new FournisseursRepository();
C:\Users\Admin\terragest\src\_quarantine\modules\fournisseurs\services\FournisseursService.ts:8 return this.repository.findAll();
C:\Users\Admin\terragest\src\_quarantine\modules\fournisseurs\services\FournisseursService.ts:12 return this.repository.findById(id);
C:\Users\Admin\terragest\src\_quarantine\modules\fournisseurs\services\FournisseursService.ts:16 return this.repository.create(data);
C:\Users\Admin\terragest\src\_quarantine\modules\fournisseurs\services\FournisseursService.ts:23 return this.repository.update(id, data);
C:\Users\Admin\terragest\src\_quarantine\modules\fournisseurs\services\FournisseursService.ts:27 return this.repository.delete(id);
C:\Users\Admin\terragest\src\_quarantine\modules\fournisseurs\services\Service.ts:1 import { Repository } from "../repositories/Repository";
C:\Users\Admin\terragest\src\_quarantine\modules\fournisseurs\services\Service.ts:4 private repository = new Repository();
C:\Users\Admin\terragest\src\_quarantine\modules\interventions\index.ts:2 export * from "./repositories/InterventionsRepository";
C:\Users\Admin\terragest\src\_quarantine\modules\interventions\repositories\InterventionsRepository.ts:1 import { FirestoreRepository } from "@/infrastructure/firebase/FirestoreRepository";
C:\Users\Admin\terragest\src\_quarantine\modules\interventions\repositories\InterventionsRepository.ts:4 export class InterventionsRepository extends FirestoreRepository<InterventionsDTO> {
C:\Users\Admin\terragest\src\_quarantine\modules\interventions\services\InterventionsService.ts:1 import { InterventionsRepository } from "../repositories/InterventionsRepository";
C:\Users\Admin\terragest\src\_quarantine\modules\interventions\services\InterventionsService.ts:4 private repository =
C:\Users\Admin\terragest\src\_quarantine\modules\interventions\services\InterventionsService.ts:5 new InterventionsRepository();
C:\Users\Admin\terragest\src\_quarantine\modules\interventions\services\InterventionsService.ts:8 return this.repository.findAll();
C:\Users\Admin\terragest\src\_quarantine\modules\interventions\services\InterventionsService.ts:12 return this.repository.findById(id);
C:\Users\Admin\terragest\src\_quarantine\modules\interventions\services\InterventionsService.ts:16 return this.repository.create(data);
C:\Users\Admin\terragest\src\_quarantine\modules\interventions\services\InterventionsService.ts:23 return this.repository.update(id, data);
C:\Users\Admin\terragest\src\_quarantine\modules\interventions\services\InterventionsService.ts:27 return this.repository.delete(id);
C:\Users\Admin\terragest\src\_quarantine\modules\maintenance\index.ts:2 export * from "./repositories/MaintenanceRepository";
C:\Users\Admin\terragest\src\_quarantine\modules\maintenance\repositories\MaintenanceRepository.ts:1 import { FirestoreRepository } from "@/infrastructure/firebase/FirestoreRepository";
C:\Users\Admin\terragest\src\_quarantine\modules\maintenance\repositories\MaintenanceRepository.ts:4 export class MaintenanceRepository extends FirestoreRepository<MaintenanceDTO> {
C:\Users\Admin\terragest\src\_quarantine\modules\maintenance\services\MaintenanceService.ts:1 import { MaintenanceRepository } from "../repositories/MaintenanceRepository";
C:\Users\Admin\terragest\src\_quarantine\modules\maintenance\services\MaintenanceService.ts:4 private repository =
C:\Users\Admin\terragest\src\_quarantine\modules\maintenance\services\MaintenanceService.ts:5 new MaintenanceRepository();
C:\Users\Admin\terragest\src\_quarantine\modules\maintenance\services\MaintenanceService.ts:8 return this.repository.findAll();
C:\Users\Admin\terragest\src\_quarantine\modules\maintenance\services\MaintenanceService.ts:12 return this.repository.findById(id);
C:\Users\Admin\terragest\src\_quarantine\modules\maintenance\services\MaintenanceService.ts:16 return this.repository.create(data);
C:\Users\Admin\terragest\src\_quarantine\modules\maintenance\services\MaintenanceService.ts:23 return this.repository.update(id, data);
C:\Users\Admin\terragest\src\_quarantine\modules\maintenance\services\MaintenanceService.ts:27 return this.repository.delete(id);
C:\Users\Admin\terragest\src\_quarantine\modules\materiels\index.ts:2 export * from "./repositories/MaterielsRepository";
C:\Users\Admin\terragest\src\_quarantine\modules\materiels\repositories\MaterielsRepository.ts:1 import { FirestoreRepository } from "@/infrastructure/firebase/FirestoreRepository";
C:\Users\Admin\terragest\src\_quarantine\modules\materiels\repositories\MaterielsRepository.ts:4 export class MaterielsRepository extends FirestoreRepository<MaterielsDTO> {
C:\Users\Admin\terragest\src\_quarantine\modules\materiels\services\MaterielsService.ts:1 import { MaterielsRepository } from "../repositories/MaterielsRepository";
C:\Users\Admin\terragest\src\_quarantine\modules\materiels\services\MaterielsService.ts:4 private repository =
C:\Users\Admin\terragest\src\_quarantine\modules\materiels\services\MaterielsService.ts:5 new MaterielsRepository();
C:\Users\Admin\terragest\src\_quarantine\modules\materiels\services\MaterielsService.ts:8 return this.repository.findAll();
C:\Users\Admin\terragest\src\_quarantine\modules\materiels\services\MaterielsService.ts:12 return this.repository.findById(id);
C:\Users\Admin\terragest\src\_quarantine\modules\materiels\services\MaterielsService.ts:16 return this.repository.create(data);
C:\Users\Admin\terragest\src\_quarantine\modules\materiels\services\MaterielsService.ts:23 return this.repository.update(id, data);
C:\Users\Admin\terragest\src\_quarantine\modules\materiels\services\MaterielsService.ts:27 return this.repository.delete(id);
C:\Users\Admin\terragest\src\_quarantine\modules\mobile\index.ts:2 export * from "./repositories/MobileRepository";
C:\Users\Admin\terragest\src\_quarantine\modules\mobile\repositories\MobileRepository.ts:1 import { FirestoreRepository } from "@/infrastructure/firebase/FirestoreRepository";
C:\Users\Admin\terragest\src\_quarantine\modules\mobile\repositories\MobileRepository.ts:4 export class MobileRepository extends FirestoreRepository<MobileDTO> {
C:\Users\Admin\terragest\src\_quarantine\modules\mobile\services\MobileService.ts:1 import { MobileRepository } from "../repositories/MobileRepository";
C:\Users\Admin\terragest\src\_quarantine\modules\mobile\services\MobileService.ts:4 private repository =
C:\Users\Admin\terragest\src\_quarantine\modules\mobile\services\MobileService.ts:5 new MobileRepository();
C:\Users\Admin\terragest\src\_quarantine\modules\mobile\services\MobileService.ts:8 return this.repository.findAll();
C:\Users\Admin\terragest\src\_quarantine\modules\mobile\services\MobileService.ts:12 return this.repository.findById(id);
C:\Users\Admin\terragest\src\_quarantine\modules\mobile\services\MobileService.ts:16 return this.repository.create(data);
C:\Users\Admin\terragest\src\_quarantine\modules\mobile\services\MobileService.ts:23 return this.repository.update(id, data);
C:\Users\Admin\terragest\src\_quarantine\modules\mobile\services\MobileService.ts:27 return this.repository.delete(id);
C:\Users\Admin\terragest\src\_quarantine\modules\monitoring\index.ts:2 export * from "./repositories/MonitoringRepository";
C:\Users\Admin\terragest\src\_quarantine\modules\monitoring\repositories\MonitoringRepository.ts:1 import { FirestoreRepository } from "@/infrastructure/firebase/FirestoreRepository";
C:\Users\Admin\terragest\src\_quarantine\modules\monitoring\repositories\MonitoringRepository.ts:4 export class MonitoringRepository extends FirestoreRepository<MonitoringDTO> {
C:\Users\Admin\terragest\src\_quarantine\modules\monitoring\services\MonitoringService.ts:1 import { MonitoringRepository } from "../repositories/MonitoringRepository";
C:\Users\Admin\terragest\src\_quarantine\modules\monitoring\services\MonitoringService.ts:4 private repository =
C:\Users\Admin\terragest\src\_quarantine\modules\monitoring\services\MonitoringService.ts:5 new MonitoringRepository();
C:\Users\Admin\terragest\src\_quarantine\modules\monitoring\services\MonitoringService.ts:8 return this.repository.findAll();
C:\Users\Admin\terragest\src\_quarantine\modules\monitoring\services\MonitoringService.ts:12 return this.repository.findById(id);
C:\Users\Admin\terragest\src\_quarantine\modules\monitoring\services\MonitoringService.ts:16 return this.repository.create(data);
C:\Users\Admin\terragest\src\_quarantine\modules\monitoring\services\MonitoringService.ts:23 return this.repository.update(id, data);
C:\Users\Admin\terragest\src\_quarantine\modules\monitoring\services\MonitoringService.ts:27 return this.repository.delete(id);
C:\Users\Admin\terragest\src\_quarantine\modules\mouvements-stock\index.ts:2 export * from "./repositories/MouvementsStockRepository";
C:\Users\Admin\terragest\src\_quarantine\modules\mouvements-stock\repositories\MouvementsStockRepository.ts:1 import { FirestoreRepository } from "@/infrastructure/firebase/FirestoreRepository";
C:\Users\Admin\terragest\src\_quarantine\modules\mouvements-stock\repositories\MouvementsStockRepository.ts:4 export class MouvementsStockRepository extends FirestoreRepository<MouvementsStockDTO> {
C:\Users\Admin\terragest\src\_quarantine\modules\mouvements-stock\services\MouvementsStockService.ts:1 import { MouvementsStockRepository } from "../repositories/MouvementsStockRepository";
C:\Users\Admin\terragest\src\_quarantine\modules\mouvements-stock\services\MouvementsStockService.ts:4 private repository =
C:\Users\Admin\terragest\src\_quarantine\modules\mouvements-stock\services\MouvementsStockService.ts:5 new MouvementsStockRepository();
C:\Users\Admin\terragest\src\_quarantine\modules\mouvements-stock\services\MouvementsStockService.ts:8 return this.repository.findAll();
C:\Users\Admin\terragest\src\_quarantine\modules\mouvements-stock\services\MouvementsStockService.ts:12 return this.repository.findById(id);
C:\Users\Admin\terragest\src\_quarantine\modules\mouvements-stock\services\MouvementsStockService.ts:16 return this.repository.create(data);
C:\Users\Admin\terragest\src\_quarantine\modules\mouvements-stock\services\MouvementsStockService.ts:23 return this.repository.update(id, data);
C:\Users\Admin\terragest\src\_quarantine\modules\mouvements-stock\services\MouvementsStockService.ts:27 return this.repository.delete(id);
C:\Users\Admin\terragest\src\_quarantine\modules\paiements\index.ts:2 export * from "./repositories/PaiementsRepository";
C:\Users\Admin\terragest\src\_quarantine\modules\paiements\repositories\PaiementsRepository.ts:1 import { FirestoreRepository } from "@/infrastructure/firebase/FirestoreRepository";
C:\Users\Admin\terragest\src\_quarantine\modules\paiements\repositories\PaiementsRepository.ts:4 export class PaiementsRepository extends FirestoreRepository<PaiementsDTO> {
C:\Users\Admin\terragest\src\_quarantine\modules\paiements\services\PaiementsService.ts:1 import { PaiementsRepository } from "../repositories/PaiementsRepository";
C:\Users\Admin\terragest\src\_quarantine\modules\paiements\services\PaiementsService.ts:4 private repository =
C:\Users\Admin\terragest\src\_quarantine\modules\paiements\services\PaiementsService.ts:5 new PaiementsRepository();
C:\Users\Admin\terragest\src\_quarantine\modules\paiements\services\PaiementsService.ts:8 return this.repository.findAll();
C:\Users\Admin\terragest\src\_quarantine\modules\paiements\services\PaiementsService.ts:12 return this.repository.findById(id);
C:\Users\Admin\terragest\src\_quarantine\modules\paiements\services\PaiementsService.ts:16 return this.repository.create(data);
C:\Users\Admin\terragest\src\_quarantine\modules\paiements\services\PaiementsService.ts:23 return this.repository.update(id, data);
C:\Users\Admin\terragest\src\_quarantine\modules\paiements\services\PaiementsService.ts:27 return this.repository.delete(id);
C:\Users\Admin\terragest\src\_quarantine\modules\parcelles\index.ts:2 export * from "./repositories/ParcellesRepository";
C:\Users\Admin\terragest\src\_quarantine\modules\parcelles\repositories\ParcellesRepository.ts:1 import { FirestoreRepository } from "@/infrastructure/firebase/FirestoreRepository";
C:\Users\Admin\terragest\src\_quarantine\modules\parcelles\repositories\ParcellesRepository.ts:4 export class ParcellesRepository extends FirestoreRepository<ParcellesDTO> {
C:\Users\Admin\terragest\src\_quarantine\modules\parcelles\services\ParcellesService.ts:1 import { ParcellesRepository } from "../repositories/ParcellesRepository";
C:\Users\Admin\terragest\src\_quarantine\modules\parcelles\services\ParcellesService.ts:4 private repository = new ParcellesRepository();
C:\Users\Admin\terragest\src\_quarantine\modules\productions\index.ts:2 export * from "./repositories/ProductionsRepository";
C:\Users\Admin\terragest\src\_quarantine\modules\productions\repositories\ProductionsRepository.ts:1 import { FirestoreRepository } from "@/infrastructure/firebase/FirestoreRepository";
C:\Users\Admin\terragest\src\_quarantine\modules\productions\repositories\ProductionsRepository.ts:4 export class ProductionsRepository extends FirestoreRepository<ProductionsDTO> {
C:\Users\Admin\terragest\src\_quarantine\modules\productions\services\ProductionsService.ts:1 import { ProductionsRepository } from "../repositories/ProductionsRepository";
C:\Users\Admin\terragest\src\_quarantine\modules\productions\services\ProductionsService.ts:4 private repository =
C:\Users\Admin\terragest\src\_quarantine\modules\productions\services\ProductionsService.ts:5 new ProductionsRepository();
C:\Users\Admin\terragest\src\_quarantine\modules\productions\services\ProductionsService.ts:8 return this.repository.findAll();
C:\Users\Admin\terragest\src\_quarantine\modules\productions\services\ProductionsService.ts:12 return this.repository.findById(id);
C:\Users\Admin\terragest\src\_quarantine\modules\productions\services\ProductionsService.ts:16 return this.repository.create(data);
C:\Users\Admin\terragest\src\_quarantine\modules\productions\services\ProductionsService.ts:23 return this.repository.update(id, data);
C:\Users\Admin\terragest\src\_quarantine\modules\productions\services\ProductionsService.ts:27 return this.repository.delete(id);
C:\Users\Admin\terragest\src\_quarantine\modules\recoltes\index.ts:2 export * from "./repositories/RecoltesRepository";
C:\Users\Admin\terragest\src\_quarantine\modules\recoltes\repositories\RecoltesRepository.ts:1 import { FirestoreRepository } from "@/infrastructure/firebase/FirestoreRepository";
C:\Users\Admin\terragest\src\_quarantine\modules\recoltes\repositories\RecoltesRepository.ts:4 export class RecoltesRepository extends FirestoreRepository<RecoltesDTO> {
C:\Users\Admin\terragest\src\_quarantine\modules\recoltes\services\RecoltesService.ts:1 import { RecoltesRepository } from "../repositories/RecoltesRepository";
C:\Users\Admin\terragest\src\_quarantine\modules\recoltes\services\RecoltesService.ts:4 private repository =
C:\Users\Admin\terragest\src\_quarantine\modules\recoltes\services\RecoltesService.ts:5 new RecoltesRepository();
C:\Users\Admin\terragest\src\_quarantine\modules\recoltes\services\RecoltesService.ts:8 return this.repository.findAll();
C:\Users\Admin\terragest\src\_quarantine\modules\recoltes\services\RecoltesService.ts:12 return this.repository.findById(id);
C:\Users\Admin\terragest\src\_quarantine\modules\recoltes\services\RecoltesService.ts:16 return this.repository.create(data);
C:\Users\Admin\terragest\src\_quarantine\modules\recoltes\services\RecoltesService.ts:23 return this.repository.update(id, data);
C:\Users\Admin\terragest\src\_quarantine\modules\recoltes\services\RecoltesService.ts:27 return this.repository.delete(id);
C:\Users\Admin\terragest\src\_quarantine\modules\stocks\index.ts:2 export * from "./repositories/StocksRepository";
C:\Users\Admin\terragest\src\_quarantine\modules\stocks\repositories\StocksRepository.ts:1 import { FirestoreRepository } from "@/infrastructure/firebase/FirestoreRepository";
C:\Users\Admin\terragest\src\_quarantine\modules\stocks\repositories\StocksRepository.ts:4 export class StocksRepository extends FirestoreRepository<StocksDTO> {
C:\Users\Admin\terragest\src\_quarantine\modules\stocks\services\StocksService.ts:1 import { StocksRepository } from "../repositories/StocksRepository";
C:\Users\Admin\terragest\src\_quarantine\modules\stocks\services\StocksService.ts:4 private repository =
C:\Users\Admin\terragest\src\_quarantine\modules\stocks\services\StocksService.ts:5 new StocksRepository();
C:\Users\Admin\terragest\src\_quarantine\modules\stocks\services\StocksService.ts:8 return this.repository.findAll();
C:\Users\Admin\terragest\src\_quarantine\modules\stocks\services\StocksService.ts:12 return this.repository.findById(id);
C:\Users\Admin\terragest\src\_quarantine\modules\stocks\services\StocksService.ts:16 return this.repository.create(data);
C:\Users\Admin\terragest\src\_quarantine\modules\stocks\services\StocksService.ts:23 return this.repository.update(id, data);
C:\Users\Admin\terragest\src\_quarantine\modules\stocks\services\StocksService.ts:27 return this.repository.delete(id);
C:\Users\Admin\terragest\src\_quarantine\modules\sync\index.ts:2 export * from "./repositories/SyncRepository";
C:\Users\Admin\terragest\src\_quarantine\modules\sync\repositories\SyncRepository.ts:1 import { FirestoreRepository } from "@/infrastructure/firebase/FirestoreRepository";
C:\Users\Admin\terragest\src\_quarantine\modules\sync\repositories\SyncRepository.ts:4 export class SyncRepository extends FirestoreRepository<SyncDTO> {
C:\Users\Admin\terragest\src\_quarantine\modules\sync\services\SyncService.ts:1 import { SyncRepository } from "../repositories/SyncRepository";
C:\Users\Admin\terragest\src\_quarantine\modules\sync\services\SyncService.ts:4 private repository =
C:\Users\Admin\terragest\src\_quarantine\modules\sync\services\SyncService.ts:5 new SyncRepository();
C:\Users\Admin\terragest\src\_quarantine\modules\sync\services\SyncService.ts:8 return this.repository.findAll();
C:\Users\Admin\terragest\src\_quarantine\modules\sync\services\SyncService.ts:12 return this.repository.findById(id);
C:\Users\Admin\terragest\src\_quarantine\modules\sync\services\SyncService.ts:16 return this.repository.create(data);
C:\Users\Admin\terragest\src\_quarantine\modules\sync\services\SyncService.ts:23 return this.repository.update(id, data);
C:\Users\Admin\terragest\src\_quarantine\modules\sync\services\SyncService.ts:27 return this.repository.delete(id);
C:\Users\Admin\terragest\src\_quarantine\modules\terrains\index.ts:2 export * from "./repositories/TerrainsRepository";
C:\Users\Admin\terragest\src\_quarantine\modules\terrains\repositories\TerrainsRepository.ts:1 import { FirestoreRepository } from "@/infrastructure/firebase/FirestoreRepository";
C:\Users\Admin\terragest\src\_quarantine\modules\terrains\repositories\TerrainsRepository.ts:4 export class TerrainsRepository extends FirestoreRepository<TerrainsDTO> {
C:\Users\Admin\terragest\src\_quarantine\modules\terrains\services\TerrainsService.ts:1 import { TerrainsRepository } from "../repositories/TerrainsRepository";
C:\Users\Admin\terragest\src\_quarantine\modules\terrains\services\TerrainsService.ts:4 private repository =
C:\Users\Admin\terragest\src\_quarantine\modules\terrains\services\TerrainsService.ts:5 new TerrainsRepository();
C:\Users\Admin\terragest\src\_quarantine\modules\terrains\services\TerrainsService.ts:8 return this.repository.findAll();
C:\Users\Admin\terragest\src\_quarantine\modules\terrains\services\TerrainsService.ts:12 return this.repository.findById(id);
C:\Users\Admin\terragest\src\_quarantine\modules\terrains\services\TerrainsService.ts:16 return this.repository.create(data);
C:\Users\Admin\terragest\src\_quarantine\modules\terrains\services\TerrainsService.ts:23 return this.repository.update(id, data);
C:\Users\Admin\terragest\src\_quarantine\modules\terrains\services\TerrainsService.ts:27 return this.repository.delete(id);
C:\Users\Admin\terragest\src\_quarantine\modules\utilisateurs\index.ts:2 export * from "./repositories/UtilisateursRepository";
C:\Users\Admin\terragest\src\_quarantine\modules\utilisateurs\repositories\UtilisateursRepository.ts:1 import { FirestoreRepository } from "@/infrastructure/firebase/FirestoreRepository";
C:\Users\Admin\terragest\src\_quarantine\modules\utilisateurs\repositories\UtilisateursRepository.ts:4 export class UtilisateursRepository extends FirestoreRepository<UtilisateursDTO> {
C:\Users\Admin\terragest\src\_quarantine\modules\utilisateurs\services\UtilisateursService.ts:1 import { UtilisateursRepository } from "../repositories/UtilisateursRepository";
C:\Users\Admin\terragest\src\_quarantine\modules\utilisateurs\services\UtilisateursService.ts:4 private repository =
C:\Users\Admin\terragest\src\_quarantine\modules\utilisateurs\services\UtilisateursService.ts:5 new UtilisateursRepository();
C:\Users\Admin\terragest\src\_quarantine\modules\utilisateurs\services\UtilisateursService.ts:8 return this.repository.findAll();
C:\Users\Admin\terragest\src\_quarantine\modules\utilisateurs\services\UtilisateursService.ts:12 return this.repository.findById(id);
C:\Users\Admin\terragest\src\_quarantine\modules\utilisateurs\services\UtilisateursService.ts:16 return this.repository.create(data);
C:\Users\Admin\terragest\src\_quarantine\modules\utilisateurs\services\UtilisateursService.ts:23 return this.repository.update(id, data);
C:\Users\Admin\terragest\src\_quarantine\modules\utilisateurs\services\UtilisateursService.ts:27 return this.repository.delete(id);
C:\Users\Admin\terragest\src\_quarantine\workflow\services\WorkflowProductsRepository.ts:14 export const WorkflowProductsRepository = {
```

## Firestore repositories

```txt
C:\Users\Admin\terragest\src\analytics\repositories\AnalyticsRepository.ts:4 } from "firebase/firestore";
C:\Users\Admin\terragest\src\components\erp\audit\ERPAuditTrail.tsx:23 action: "Synchronisation Firestore",
C:\Users\Admin\terragest\src\components\erp\firestore\ERPFirestoreSync.tsx:6 export function ERPFirestoreSync() {
C:\Users\Admin\terragest\src\components\erp\firestore\ERPFirestoreSync.tsx:58 Firestore synchronized
C:\Users\Admin\terragest\src\components\erp\live\ERPLiveEvents.tsx:12 label: "Synchronisation Firestore",
C:\Users\Admin\terragest\src\components\erp\persistence\ERPPersistenceDashboard.tsx:54 Couche de persistance generique prete pour Firestore ou autre backend.
C:\Users\Admin\terragest\src\components\erp\production\readiness.ts:24 id: "firestore",
C:\Users\Admin\terragest\src\components\erp\production\readiness.ts:25 label: "Accès Firestore",
C:\Users\Admin\terragest\src\components\erp\realtime\ERPRealtimeSyncBadge.tsx:17 FirestoreRuntimeRealtime,
C:\Users\Admin\terragest\src\components\erp\realtime\ERPRealtimeSyncBadge.tsx:18 } from "@/runtime/firestore";
C:\Users\Admin\terragest\src\components\erp\realtime\ERPRealtimeSyncBadge.tsx:34 FirestoreRuntimeRealtime.subscribe(
C:\Users\Admin\terragest\src\components\timeline\Timeline.tsx:1 import { formatDisplayValue } from "@/core/utils/formatFirestoreDate";
C:\Users\Admin\terragest\src\components\ui\ProductRealtimeForm.tsx:9 } from "@/lib/firestore/repositories/ProductsRepository";
C:\Users\Admin\terragest\src\core\persistence\providers\firestore-persistence-provider.ts:18 } from "firebase/firestore";
C:\Users\Admin\terragest\src\core\persistence\providers\firestore-persistence-provider.ts:20 export class FirestorePersistenceProvider
C:\Users\Admin\terragest\src\core\utils\formatFirestoreDate.ts:1 export function formatFirestoreDate(value: any): string {
C:\Users\Admin\terragest\src\core\utils\formatFirestoreDate.ts:22 return formatFirestoreDate(value);
C:\Users\Admin\terragest\src\domains\materiels\repositories\MaterielsRepository.ts:4 BaseFirestoreRepository
C:\Users\Admin\terragest\src\domains\materiels\repositories\MaterielsRepository.ts:6 from "@/infrastructure/repositories/firestore/BaseFirestoreRepository";
C:\Users\Admin\terragest\src\domains\materiels\repositories\MaterielsRepository.ts:14 extends BaseFirestoreRepository<MaterielItem> {
C:\Users\Admin\terragest\src\features\audit\services\AuditService.ts:9 } from "firebase/firestore";
C:\Users\Admin\terragest\src\features\billing\repositories\BillingRepository.ts:2 from "@/lib/firestore/BaseRepository";
C:\Users\Admin\terragest\src\features\exploitations\hooks\useExploitations.ts:13 } from "firebase/firestore";
C:\Users\Admin\terragest\src\features\exploitations\hooks\usePaginatedExploitations.ts:16 } from "firebase/firestore";
C:\Users\Admin\terragest\src\features\exploitations\repositories\ExploitationRepository.ts:7 } from "firebase/firestore";
C:\Users\Admin\terragest\src\features\exploitations\repositories\ExploitationsRepository.ts:13 } from "firebase/firestore";
C:\Users\Admin\terragest\src\features\exploitations\repositories\firestore\FirestoreExploitationRepository.ts:9 } from "firebase/firestore";
C:\Users\Admin\terragest\src\features\exploitations\repositories\firestore\FirestoreExploitationRepository.ts:21 FirestoreExploitationRepository {
C:\Users\Admin\terragest\src\features\exploitations\services\ExploitationService.ts:2 FirestoreExploitationRepository
C:\Users\Admin\terragest\src\features\exploitations\services\ExploitationService.ts:4 from "../repositories/firestore/FirestoreExploitationRepository";
C:\Users\Admin\terragest\src\features\exploitations\services\ExploitationService.ts:15 return FirestoreExploitationRepository
C:\Users\Admin\terragest\src\features\exploitations\services\ExploitationService.ts:21 return FirestoreExploitationRepository
C:\Users\Admin\terragest\src\features\exploitations\services\ExploitationService.ts:29 return FirestoreExploitationRepository
C:\Users\Admin\terragest\src\features\exploitations\services\ExploitationService.ts:41 return FirestoreExploitationRepository
C:\Users\Admin\terragest\src\features\exploitations\services\ExploitationService.ts:49 return FirestoreExploitationRepository
C:\Users\Admin\terragest\src\features\fournisseurs\application\FournisseursService.ts:2 FirestoreFournisseursRepository
C:\Users\Admin\terragest\src\features\fournisseurs\application\FournisseursService.ts:4 from "../infrastructure/FirestoreFournisseursRepository";
C:\Users\Admin\terragest\src\features\fournisseurs\application\FournisseursService.ts:15 return FirestoreFournisseursRepository.create(
C:\Users\Admin\terragest\src\features\fournisseurs\application\FournisseursService.ts:21 return FirestoreFournisseursRepository.getAll();
C:\Users\Admin\terragest\src\features\fournisseurs\application\FournisseursService.ts:27 return FirestoreFournisseursRepository.getById(
C:\Users\Admin\terragest\src\features\fournisseurs\application\FournisseursService.ts:36 return FirestoreFournisseursRepository.update(
C:\Users\Admin\terragest\src\features\fournisseurs\application\FournisseursService.ts:45 return FirestoreFournisseursRepository.delete(
C:\Users\Admin\terragest\src\features\fournisseurs\infrastructure\FirestoreFournisseursRepository.ts:10 from "firebase/firestore";
C:\Users\Admin\terragest\src\features\fournisseurs\infrastructure\FirestoreFournisseursRepository.ts:25 class FirestoreRepository
C:\Users\Admin\terragest\src\features\fournisseurs\infrastructure\FirestoreFournisseursRepository.ts:134 FirestoreFournisseursRepository =
C:\Users\Admin\terragest\src\features\fournisseurs\infrastructure\FirestoreFournisseursRepository.ts:135 new FirestoreRepository();
C:\Users\Admin\terragest\src\features\interventions\repositories\firestore\FirestoreInterventionRepository.ts:9 } from "firebase/firestore";
C:\Users\Admin\terragest\src\features\interventions\repositories\firestore\FirestoreInterventionRepository.ts:21 FirestoreInterventionRepository {
C:\Users\Admin\terragest\src\features\interventions\services\InterventionService.ts:2 FirestoreInterventionRepository
C:\Users\Admin\terragest\src\features\interventions\services\InterventionService.ts:4 from "../repositories/firestore/FirestoreInterventionRepository";
C:\Users\Admin\terragest\src\features\interventions\services\InterventionService.ts:15 return FirestoreInterventionRepository
C:\Users\Admin\terragest\src\features\interventions\services\InterventionService.ts:21 return FirestoreInterventionRepository
C:\Users\Admin\terragest\src\features\interventions\services\InterventionService.ts:29 return FirestoreInterventionRepository
C:\Users\Admin\terragest\src\features\interventions\services\InterventionService.ts:41 return FirestoreInterventionRepository
C:\Users\Admin\terragest\src\features\interventions\services\InterventionService.ts:49 return FirestoreInterventionRepository
C:\Users\Admin\terragest\src\features\invitations\repositories\InvitationsRepository.ts:2 from "@/lib/firestore/BaseRepository";
C:\Users\Admin\terragest\src\features\materiels\application\MaterielService.ts:2 FirestoreMaterielRepository
C:\Users\Admin\terragest\src\features\materiels\application\MaterielService.ts:4 from "../repositories/firestore/FirestoreMaterielRepository";
C:\Users\Admin\terragest\src\features\materiels\application\MaterielService.ts:15 return FirestoreMaterielRepository
C:\Users\Admin\terragest\src\features\materiels\application\MaterielService.ts:21 return FirestoreMaterielRepository
C:\Users\Admin\terragest\src\features\materiels\application\MaterielService.ts:29 return FirestoreMaterielRepository
C:\Users\Admin\terragest\src\features\materiels\application\MaterielService.ts:41 return FirestoreMaterielRepository
C:\Users\Admin\terragest\src\features\materiels\application\MaterielService.ts:49 return FirestoreMaterielRepository
C:\Users\Admin\terragest\src\features\materiels\infrastructure\FirestoreMaterielRepository.ts:9 } from "firebase/firestore";
C:\Users\Admin\terragest\src\features\materiels\infrastructure\FirestoreMaterielRepository.ts:21 FirestoreMaterielRepository {
C:\Users\Admin\terragest\src\features\materiels\repositories\firestore\FirestoreMaterielRepository.ts:9 } from "firebase/firestore";
C:\Users\Admin\terragest\src\features\materiels\repositories\firestore\FirestoreMaterielRepository.ts:21 FirestoreMaterielRepository {
C:\Users\Admin\terragest\src\features\materiels\services\MaterielService.ts:2 FirestoreMaterielRepository
C:\Users\Admin\terragest\src\features\materiels\services\MaterielService.ts:4 from "../repositories/firestore/FirestoreMaterielRepository";
C:\Users\Admin\terragest\src\features\materiels\services\MaterielService.ts:15 return FirestoreMaterielRepository
C:\Users\Admin\terragest\src\features\materiels\services\MaterielService.ts:21 return FirestoreMaterielRepository
C:\Users\Admin\terragest\src\features\materiels\services\MaterielService.ts:29 return FirestoreMaterielRepository
C:\Users\Admin\terragest\src\features\materiels\services\MaterielService.ts:41 return FirestoreMaterielRepository
C:\Users\Admin\terragest\src\features\materiels\services\MaterielService.ts:49 return FirestoreMaterielRepository
C:\Users\Admin\terragest\src\features\memberships\repositories\MembershipsRepository.ts:2 from "@/lib/firestore/BaseRepository";
C:\Users\Admin\terragest\src\features\mouvements\repositories\MouvementRepository.ts:8 } from "firebase/firestore";
C:\Users\Admin\terragest\src\features\observability\services\live\LiveObservabilityService.ts:8 from "firebase/firestore";
C:\Users\Admin\terragest\src\features\observability\services\workflows\WorkflowExecutionRealtimeService.ts:8 from "firebase/firestore";
C:\Users\Admin\terragest\src\features\observability\widgets\live\LiveEventStream.tsx:3 import { formatDisplayValue } from "@/core/utils/formatFirestoreDate";
C:\Users\Admin\terragest\src\features\organisations\repositories\OrganisationRepository.ts:5 } from "firebase/firestore";
C:\Users\Admin\terragest\src\features\organisations\services\OrganisationService.ts:8 } from "firebase/firestore";
C:\Users\Admin\terragest\src\features\organizations\repositories\OrganizationsRepository.ts:2 from "@/lib/firestore/BaseRepository";
C:\Users\Admin\terragest\src\features\platform-monitoring\components\graphs\EventTimeline.tsx:3 import { formatDisplayValue } from "@/core/utils/formatFirestoreDate";
C:\Users\Admin\terragest\src\features\produits\repositories\ProductsRepository.ts:2 from "@/lib/firestore/BaseRepository";
C:\Users\Admin\terragest\src\features\produits\repositories\firestore\FirestoreProduitRepository.ts:9 } from "firebase/firestore";
C:\Users\Admin\terragest\src\features\produits\repositories\firestore\FirestoreProduitRepository.ts:21 FirestoreProduitRepository {
C:\Users\Admin\terragest\src\features\produits\services\ProduitService.ts:2 FirestoreProduitRepository
C:\Users\Admin\terragest\src\features\produits\services\ProduitService.ts:4 from "../repositories/firestore/FirestoreProduitRepository";
C:\Users\Admin\terragest\src\features\produits\services\ProduitService.ts:15 return FirestoreProduitRepository
C:\Users\Admin\terragest\src\features\produits\services\ProduitService.ts:23 return FirestoreProduitRepository
C:\Users\Admin\terragest\src\features\produits\services\ProduitService.ts:31 return FirestoreProduitRepository
C:\Users\Admin\terragest\src\features\produits\services\ProduitService.ts:43 return FirestoreProduitRepository
C:\Users\Admin\terragest\src\features\produits\services\ProduitService.ts:51 return FirestoreProduitRepository
C:\Users\Admin\terragest\src\features\ressources\repositories\RessourceRepository.ts:10 } from "firebase/firestore";
C:\Users\Admin\terragest\src\features\ressources\services\RessourceService.ts:11 } from "firebase/firestore";
C:\Users\Admin\terragest\src\features\stocks\repositories\firestore\FirestoreStockRepository.ts:17 } from "firebase/firestore";
C:\Users\Admin\terragest\src\features\stocks\repositories\firestore\FirestoreStockRepository.ts:29 FirestoreStockRepository = {
C:\Users\Admin\terragest\src\features\stocks\services\StockService.ts:3 FirestoreStockRepository
C:\Users\Admin\terragest\src\features\stocks\services\StockService.ts:5 } from "@/features/stocks/repositories/firestore/FirestoreStockRepository";
C:\Users\Admin\terragest\src\features\stocks\services\StockService.ts:14 return FirestoreStockRepository
C:\Users\Admin\terragest\src\features\stocks\services\StockService.ts:20 return FirestoreStockRepository
C:\Users\Admin\terragest\src\features\superadmin\services\SuperAdminService.ts:4 } from "firebase/firestore";
C:\Users\Admin\terragest\src\features\terrains\repositories\TerrainRepository.ts:7 } from "firebase/firestore";
C:\Users\Admin\terragest\src\features\terrains\services\TerrainService.ts:11 } from "firebase/firestore";
C:\Users\Admin\terragest\src\hooks\useCollection.ts:9 from "@/lib/firestore/BaseRepository";
C:\Users\Admin\terragest\src\hooks\useDocument.ts:6 } from "firebase/firestore";
C:\Users\Admin\terragest\src\hooks\useRealtimeCollection.ts:8 } from "firebase/firestore";
C:\Users\Admin\terragest\src\infrastructure\firebase\firebase.ts:7 getFirestore
C:\Users\Admin\terragest\src\infrastructure\firebase\firebase.ts:9 from "firebase/firestore";
C:\Users\Admin\terragest\src\infrastructure\firebase\firebase.ts:38 getFirestore(app);
C:\Users\Admin\terragest\src\infrastructure\firebase\FirestoreRepository.ts:1 export class FirestoreRepository<T> {
C:\Users\Admin\terragest\src\infrastructure\repositories\firestore\BaseFirestoreRepository.ts:1 // src/infrastructure/repositories/firestore/BaseFirestoreRepository.ts
C:\Users\Admin\terragest\src\infrastructure\repositories\firestore\BaseFirestoreRepository.ts:19 from "firebase/firestore";
C:\Users\Admin\terragest\src\infrastructure\repositories\firestore\BaseFirestoreRepository.ts:24 export class BaseFirestoreRepository<T> {
C:\Users\Admin\terragest\src\infrastructure\repositories\firestore\FirestoreMaterielRepository.ts:7 export class FirestoreMaterielRepository
C:\Users\Admin\terragest\src\lib\firebase.ts:4 import { getFirestore } from "firebase/firestore";
C:\Users\Admin\terragest\src\lib\firebase.ts:32 getFirestore(app);
C:\Users\Admin\terragest\src\lib\firebase\config.ts:3 import { getFirestore } from "firebase/firestore";
C:\Users\Admin\terragest\src\lib\firebase\config.ts:21 export const db = getFirestore(app);
C:\Users\Admin\terragest\src\lib\firestore\BaseRepository.ts:10 } from "firebase/firestore";
C:\Users\Admin\terragest\src\runtime\production.ts:104 key: "firestore",
C:\Users\Admin\terragest\src\runtime\production.ts:105 label: "Firestore Backend",
C:\Users\Admin\terragest\src\runtime\ai\recommendations\ERPAIRecommendationEngine.ts:20 title: "Brancher la persistance Firestore",
C:\Users\Admin\terragest\src\runtime\ai\recommendations\ERPAIRecommendationEngine.ts:21 description: "Remplacer progressivement le driver in-memory par un driver Firestore tenant-aware.",
C:\Users\Admin\terragest\src\runtime\ai\recommendations\ERPAIRecommendationEngine.ts:24 actionLabel: "Activer Firestore driver",
C:\Users\Admin\terragest\src\runtime\data\ERPDataEngine.ts:4 import { FirestoreRuntimeRepository } from "@/runtime/firestore/FirestoreRuntimeRepository";
C:\Users\Admin\terragest\src\runtime\data\ERPDataEngine.ts:48 return FirestoreRuntimeRepository.findMany(module);
C:\Users\Admin\terragest\src\runtime\data-binding\RuntimeDataBinding.ts:6 FirestoreRuntimeQuery,
C:\Users\Admin\terragest\src\runtime\data-binding\RuntimeDataBinding.ts:7 FirestoreRuntimeMutation,
C:\Users\Admin\terragest\src\runtime\data-binding\RuntimeDataBinding.ts:8 } from "@/runtime/firestore";
C:\Users\Admin\terragest\src\runtime\data-binding\RuntimeDataBinding.ts:14 return FirestoreRuntimeQuery.list(
C:\Users\Admin\terragest\src\runtime\data-binding\RuntimeDataBinding.ts:23 return FirestoreRuntimeQuery.detail(
C:\Users\Admin\terragest\src\runtime\data-binding\RuntimeDataBinding.ts:33 return FirestoreRuntimeMutation.create(
C:\Users\Admin\terragest\src\runtime\data-binding\RuntimeDataBinding.ts:44 return FirestoreRuntimeMutation.update(
C:\Users\Admin\terragest\src\runtime\data-binding\RuntimeDataBinding.ts:55 return FirestoreRuntimeMutation.delete(
C:\Users\Admin\terragest\src\runtime\enterprise-runtime\EnterpriseRuntimeKernel.ts:16 name: "Firestore Runtime",
C:\Users\Admin\terragest\src\runtime\firebase\runtime-firestore.ts:4 getFirestore,
C:\Users\Admin\terragest\src\runtime\firebase\runtime-firestore.ts:5 } from "firebase/firestore";
C:\Users\Admin\terragest\src\runtime\firebase\runtime-firestore.ts:32 export const runtimeFirestore =
C:\Users\Admin\terragest\src\runtime\firebase\runtime-firestore.ts:33 getFirestore(app);
C:\Users\Admin\terragest\src\runtime\firestore\FirestoreRuntimeMutation.ts:4 FirestoreRuntimeRepository,
C:\Users\Admin\terragest\src\runtime\firestore\FirestoreRuntimeMutation.ts:5 } from "./FirestoreRuntimeRepository";
C:\Users\Admin\terragest\src\runtime\firestore\FirestoreRuntimeMutation.ts:7 export class FirestoreRuntimeMutation {
C:\Users\Admin\terragest\src\runtime\firestore\FirestoreRuntimeMutation.ts:12 return FirestoreRuntimeRepository.create(
C:\Users\Admin\terragest\src\runtime\firestore\FirestoreRuntimeMutation.ts:23 return FirestoreRuntimeRepository.update(
C:\Users\Admin\terragest\src\runtime\firestore\FirestoreRuntimeMutation.ts:34 return FirestoreRuntimeRepository.delete(
C:\Users\Admin\terragest\src\runtime\firestore\FirestoreRuntimeQuery.ts:4 FirestoreRuntimeRepository,
C:\Users\Admin\terragest\src\runtime\firestore\FirestoreRuntimeQuery.ts:5 } from "./FirestoreRuntimeRepository";
C:\Users\Admin\terragest\src\runtime\firestore\FirestoreRuntimeQuery.ts:7 export class FirestoreRuntimeQuery {
C:\Users\Admin\terragest\src\runtime\firestore\FirestoreRuntimeQuery.ts:12 return FirestoreRuntimeRepository.findMany(
C:\Users\Admin\terragest\src\runtime\firestore\FirestoreRuntimeQuery.ts:21 return FirestoreRuntimeRepository.findById(
C:\Users\Admin\terragest\src\runtime\firestore\FirestoreRuntimeRealtime.ts:4 } from "firebase/firestore";
C:\Users\Admin\terragest\src\runtime\firestore\FirestoreRuntimeRealtime.ts:9 runtimeFirestore,
C:\Users\Admin\terragest\src\runtime\firestore\FirestoreRuntimeRealtime.ts:10 } from "@/runtime/firebase/runtime-firestore";
C:\Users\Admin\terragest\src\runtime\firestore\FirestoreRuntimeRealtime.ts:12 export class FirestoreRuntimeRealtime {
C:\Users\Admin\terragest\src\runtime\firestore\FirestoreRuntimeRealtime.ts:23 runtimeFirestore,
C:\Users\Admin\terragest\src\runtime\firestore\FirestoreRuntimeRepository.ts:9 } from "firebase/firestore";
C:\Users\Admin\terragest\src\runtime\firestore\FirestoreRuntimeRepository.ts:14 import { runtimeFirestore } from "@/runtime/firebase/runtime-firestore";
C:\Users\Admin\terragest\src\runtime\firestore\FirestoreRuntimeRepository.ts:16 export class FirestoreRuntimeRepository {
C:\Users\Admin\terragest\src\runtime\firestore\FirestoreRuntimeRepository.ts:21 collection(runtimeFirestore, module.schema.collection)
C:\Users\Admin\terragest\src\runtime\firestore\FirestoreRuntimeRepository.ts:35 doc(runtimeFirestore, module.schema.collection, id)
C:\Users\Admin\terragest\src\runtime\firestore\FirestoreRuntimeRepository.ts:53 collection(runtimeFirestore, module.schema.collection),
C:\Users\Admin\terragest\src\runtime\firestore\FirestoreRuntimeRepository.ts:72 doc(runtimeFirestore, module.schema.collection, id),
C:\Users\Admin\terragest\src\runtime\firestore\FirestoreRuntimeRepository.ts:90 doc(runtimeFirestore, module.schema.collection, id)
C:\Users\Admin\terragest\src\runtime\firestore\index.ts:2 FirestoreRuntimeRepository,
C:\Users\Admin\terragest\src\runtime\firestore\index.ts:3 } from "./FirestoreRuntimeRepository";
C:\Users\Admin\terragest\src\runtime\firestore\index.ts:6 FirestoreRuntimeQuery,
C:\Users\Admin\terragest\src\runtime\firestore\index.ts:7 } from "./FirestoreRuntimeQuery";
C:\Users\Admin\terragest\src\runtime\firestore\index.ts:10 FirestoreRuntimeMutation,
C:\Users\Admin\terragest\src\runtime\firestore\index.ts:11 } from "./FirestoreRuntimeMutation";
C:\Users\Admin\terragest\src\runtime\firestore\index.ts:14 FirestoreRuntimeRealtime,
C:\Users\Admin\terragest\src\runtime\firestore\index.ts:15 } from "./FirestoreRuntimeRealtime";
C:\Users\Admin\terragest\src\runtime\listeners\MaintenanceAuditListener.ts:7 } from "firebase/firestore";
C:\Users\Admin\terragest\src\runtime\listeners\MaintenanceNotificationListener.ts:7 } from "firebase/firestore";
C:\Users\Admin\terragest\src\runtime\modules\ERPModule.ts:36 firestore?: boolean;
C:\Users\Admin\terragest\src\runtime\modules\factory\createBusinessModule.ts:70 firestore: true,
C:\Users\Admin\terragest\src\runtime\monitoring\RuntimeEventPublisher.ts:5 from "firebase/firestore";
C:\Users\Admin\terragest\src\runtime\mutations\RuntimeMutationEngine.ts:2 import { FirestoreRuntimeMutation } from "@/runtime/firestore/FirestoreRuntimeMutation";
C:\Users\Admin\terragest\src\runtime\mutations\RuntimeMutationEngine.ts:9 return FirestoreRuntimeMutation.create(
C:\Users\Admin\terragest\src\runtime\mutations\RuntimeMutationEngine.ts:20 return FirestoreRuntimeMutation.update(
C:\Users\Admin\terragest\src\runtime\mutations\RuntimeMutationEngine.ts:31 return FirestoreRuntimeMutation.delete(
C:\Users\Admin\terragest\src\runtime\notifications\ERPNotificationsPanel.tsx:14 from "firebase/firestore";
C:\Users\Admin\terragest\src\runtime\notifications\ERPNotificationsPanel.tsx:22 from "@/core/utils/formatFirestoreDate";
C:\Users\Admin\terragest\src\runtime\notifications\RuntimeNotificationEngine.ts:9 from "firebase/firestore";
C:\Users\Admin\terragest\src\runtime\observability\RuntimeLogsPanel.tsx:14 from "firebase/firestore";
C:\Users\Admin\terragest\src\runtime\observability\RuntimeLogsPanel.tsx:22 from "@/core/utils/formatFirestoreDate";
C:\Users\Admin\terragest\src\runtime\observability\RuntimeObservabilityEngine.ts:9 from "firebase/firestore";
C:\Users\Admin\terragest\src\runtime\persistence\FirestoreHealthCheck.ts:7 firestoreHealthCheck() {
C:\Users\Admin\terragest\src\runtime\persistence\FirestoreHealthCheck.ts:16 "[Firestore Health]",
C:\Users\Admin\terragest\src\runtime\persistence\analytics\AnalyticsRepository.ts:5 from "firebase/firestore";
C:\Users\Admin\terragest\src\runtime\persistence\audit\AuditRepository.ts:5 from "firebase/firestore";
C:\Users\Admin\terragest\src\runtime\persistence\events\RuntimeEventRepository.ts:6 from "firebase/firestore";
C:\Users\Admin\terragest\src\runtime\persistence\processes\ProcessRepository.ts:5 from "firebase/firestore";
C:\Users\Admin\terragest\src\runtime\persistence\projections\ProjectionRepository.ts:5 from "firebase/firestore";
C:\Users\Admin\terragest\src\runtime\persistence\workflows\WorkflowRepository.ts:5 from "firebase/firestore";
C:\Users\Admin\terragest\src\runtime\production\backup\ERPBackupPlanRegistry.ts:5 key: "firestore-runtime-backup",
C:\Users\Admin\terragest\src\runtime\production\backup\ERPBackupPlanRegistry.ts:6 label: "Firestore Runtime Backup",
C:\Users\Admin\terragest\src\runtime\production\cloud\ERPCloudReadinessRegistry.ts:11 key: "firestore",
C:\Users\Admin\terragest\src\runtime\production\cloud\ERPCloudReadinessRegistry.ts:12 label: "Firestore Backend",
C:\Users\Admin\terragest\src\runtime\production\cloud\ERPCloudReadinessRegistry.ts:14 description: "Firestore est present mais la persistance runtime doit etre branchee.",
C:\Users\Admin\terragest\src\runtime\resilience\dlq\DeadLetterQueue.ts:5 from "firebase/firestore";
C:\Users\Admin\terragest\src\runtime\workflow-persistence\WorkflowPersistenceEngine.ts:9 from "firebase/firestore";
C:\Users\Admin\terragest\src\runtime\workflows\persistence\WorkflowExecutionPersistence.ts:7 from "firebase/firestore";
C:\Users\Admin\terragest\src\services\StockService.ts:2 FirestoreStockRepository
C:\Users\Admin\terragest\src\services\StockService.ts:4 from "@/features/stocks/repositories/firestore/FirestoreStockRepository";
C:\Users\Admin\terragest\src\services\StockService.ts:15 return FirestoreStockRepository
C:\Users\Admin\terragest\src\services\StockService.ts:21 return FirestoreStockRepository
C:\Users\Admin\terragest\src\services\StockService.ts:29 return FirestoreStockRepository
C:\Users\Admin\terragest\src\services\StockService.ts:41 return FirestoreStockRepository
C:\Users\Admin\terragest\src\services\StockService.ts:49 return FirestoreStockRepository
C:\Users\Admin\terragest\src\services\UtilisateurService.ts:4 } from "firebase/firestore";
C:\Users\Admin\terragest\src\shared\constants\firestoreCollections.ts:1 export const FIRESTORE_COLLECTIONS = {
C:\Users\Admin\terragest\src\shared\repositories\BaseRepository.ts:9 } from "firebase/firestore";
C:\Users\Admin\terragest\src\_quarantine\modules\alertes\repositories\AlertesRepository.ts:1 import { FirestoreRepository } from "@/infrastructure/firebase/FirestoreRepository";
C:\Users\Admin\terragest\src\_quarantine\modules\alertes\repositories\AlertesRepository.ts:4 export class AlertesRepository extends FirestoreRepository<AlertesDTO> {
C:\Users\Admin\terragest\src\_quarantine\modules\alertes\services\subscribeToAlertes.ts:4 } from "firebase/firestore";
C:\Users\Admin\terragest\src\_quarantine\modules\analytics\repositories\AnalyticsRepository.ts:1 import { FirestoreRepository } from "@/infrastructure/firebase/FirestoreRepository";
C:\Users\Admin\terragest\src\_quarantine\modules\analytics\repositories\AnalyticsRepository.ts:4 export class AnalyticsRepository extends FirestoreRepository<AnalyticsDTO> {
C:\Users\Admin\terragest\src\_quarantine\modules\clients\repositories\ClientsRepository.ts:1 import { FirestoreRepository } from "@/infrastructure/firebase/FirestoreRepository";
C:\Users\Admin\terragest\src\_quarantine\modules\clients\repositories\ClientsRepository.ts:4 export class ClientsRepository extends FirestoreRepository<ClientsDTO> {
C:\Users\Admin\terragest\src\_quarantine\modules\clients\services\subscribeToClients.ts:4 } from "firebase/firestore";
C:\Users\Admin\terragest\src\_quarantine\modules\contrats\repositories\ContratsRepository.ts:1 import { FirestoreRepository } from "@/infrastructure/firebase/FirestoreRepository";
C:\Users\Admin\terragest\src\_quarantine\modules\contrats\repositories\ContratsRepository.ts:4 export class ContratsRepository extends FirestoreRepository<ContratsDTO> {
C:\Users\Admin\terragest\src\_quarantine\modules\contrats\repositories\Repository.ts:1 import { FirestoreRepository } from "@/infrastructure/firebase/FirestoreRepository";
C:\Users\Admin\terragest\src\_quarantine\modules\contrats\repositories\Repository.ts:4 export class Repository extends FirestoreRepository<DTO> {
C:\Users\Admin\terragest\src\_quarantine\modules\contrats\services\subscribeToContrats.ts:4 } from "firebase/firestore";
C:\Users\Admin\terragest\src\_quarantine\modules\exploitations\repositories\ExploitationsRepository.ts:1 import { FirestoreRepository } from "@/infrastructure/firebase/FirestoreRepository";
C:\Users\Admin\terragest\src\_quarantine\modules\exploitations\repositories\ExploitationsRepository.ts:4 export class ExploitationsRepository extends FirestoreRepository<ExploitationsDTO> {
C:\Users\Admin\terragest\src\_quarantine\modules\exploitations\services\subscribeToExploitations.ts:4 } from "firebase/firestore";
C:\Users\Admin\terragest\src\_quarantine\modules\factures\repositories\FacturesRepository.ts:1 import { FirestoreRepository } from "@/infrastructure/firebase/FirestoreRepository";
C:\Users\Admin\terragest\src\_quarantine\modules\factures\repositories\FacturesRepository.ts:4 export class FacturesRepository extends FirestoreRepository<FacturesDTO> {
C:\Users\Admin\terragest\src\_quarantine\modules\factures\services\subscribeToFactures.ts:4 } from "firebase/firestore";
C:\Users\Admin\terragest\src\_quarantine\modules\fournisseurs\repositories\FournisseursRepository.ts:1 import { FirestoreRepository } from "@/infrastructure/firebase/FirestoreRepository";
C:\Users\Admin\terragest\src\_quarantine\modules\fournisseurs\repositories\FournisseursRepository.ts:4 export class FournisseursRepository extends FirestoreRepository<FournisseursDTO> {
C:\Users\Admin\terragest\src\_quarantine\modules\fournisseurs\repositories\Repository.ts:1 import { FirestoreRepository } from "@/infrastructure/firebase/FirestoreRepository";
C:\Users\Admin\terragest\src\_quarantine\modules\fournisseurs\repositories\Repository.ts:4 export class Repository extends FirestoreRepository<DTO> {
C:\Users\Admin\terragest\src\_quarantine\modules\fournisseurs\services\subscribeToFournisseurs.ts:4 } from "firebase/firestore";
C:\Users\Admin\terragest\src\_quarantine\modules\interventions\repositories\InterventionsRepository.ts:1 import { FirestoreRepository } from "@/infrastructure/firebase/FirestoreRepository";
C:\Users\Admin\terragest\src\_quarantine\modules\interventions\repositories\InterventionsRepository.ts:4 export class InterventionsRepository extends FirestoreRepository<InterventionsDTO> {
C:\Users\Admin\terragest\src\_quarantine\modules\interventions\services\subscribeToInterventions.ts:4 } from "firebase/firestore";
C:\Users\Admin\terragest\src\_quarantine\modules\maintenance\repositories\MaintenanceRepository.ts:1 import { FirestoreRepository } from "@/infrastructure/firebase/FirestoreRepository";
C:\Users\Admin\terragest\src\_quarantine\modules\maintenance\repositories\MaintenanceRepository.ts:4 export class MaintenanceRepository extends FirestoreRepository<MaintenanceDTO> {
C:\Users\Admin\terragest\src\_quarantine\modules\maintenance\services\subscribeToMaintenance.ts:4 } from "firebase/firestore";
C:\Users\Admin\terragest\src\_quarantine\modules\materiels\repositories\MaterielsRepository.ts:1 import { FirestoreRepository } from "@/infrastructure/firebase/FirestoreRepository";
C:\Users\Admin\terragest\src\_quarantine\modules\materiels\repositories\MaterielsRepository.ts:4 export class MaterielsRepository extends FirestoreRepository<MaterielsDTO> {
C:\Users\Admin\terragest\src\_quarantine\modules\materiels\services\subscribeToMateriels.ts:4 } from "firebase/firestore";
C:\Users\Admin\terragest\src\_quarantine\modules\mobile\repositories\MobileRepository.ts:1 import { FirestoreRepository } from "@/infrastructure/firebase/FirestoreRepository";
C:\Users\Admin\terragest\src\_quarantine\modules\mobile\repositories\MobileRepository.ts:4 export class MobileRepository extends FirestoreRepository<MobileDTO> {
C:\Users\Admin\terragest\src\_quarantine\modules\mobile\services\subscribeToMobile.ts:4 } from "firebase/firestore";
C:\Users\Admin\terragest\src\_quarantine\modules\monitoring\repositories\MonitoringRepository.ts:1 import { FirestoreRepository } from "@/infrastructure/firebase/FirestoreRepository";
C:\Users\Admin\terragest\src\_quarantine\modules\monitoring\repositories\MonitoringRepository.ts:4 export class MonitoringRepository extends FirestoreRepository<MonitoringDTO> {
C:\Users\Admin\terragest\src\_quarantine\modules\mouvements-stock\repositories\MouvementsStockRepository.ts:1 import { FirestoreRepository } from "@/infrastructure/firebase/FirestoreRepository";
C:\Users\Admin\terragest\src\_quarantine\modules\mouvements-stock\repositories\MouvementsStockRepository.ts:4 export class MouvementsStockRepository extends FirestoreRepository<MouvementsStockDTO> {
C:\Users\Admin\terragest\src\_quarantine\modules\mouvements-stock\services\subscribeToMouvementsStock.ts:4 } from "firebase/firestore";
C:\Users\Admin\terragest\src\_quarantine\modules\paiements\repositories\PaiementsRepository.ts:1 import { FirestoreRepository } from "@/infrastructure/firebase/FirestoreRepository";
C:\Users\Admin\terragest\src\_quarantine\modules\paiements\repositories\PaiementsRepository.ts:4 export class PaiementsRepository extends FirestoreRepository<PaiementsDTO> {
C:\Users\Admin\terragest\src\_quarantine\modules\paiements\services\subscribeToPaiements.ts:4 } from "firebase/firestore";
C:\Users\Admin\terragest\src\_quarantine\modules\parcelles\repositories\ParcellesRepository.ts:1 import { FirestoreRepository } from "@/infrastructure/firebase/FirestoreRepository";
C:\Users\Admin\terragest\src\_quarantine\modules\parcelles\repositories\ParcellesRepository.ts:4 export class ParcellesRepository extends FirestoreRepository<ParcellesDTO> {
C:\Users\Admin\terragest\src\_quarantine\modules\productions\repositories\ProductionsRepository.ts:1 import { FirestoreRepository } from "@/infrastructure/firebase/FirestoreRepository";
C:\Users\Admin\terragest\src\_quarantine\modules\productions\repositories\ProductionsRepository.ts:4 export class ProductionsRepository extends FirestoreRepository<ProductionsDTO> {
C:\Users\Admin\terragest\src\_quarantine\modules\productions\services\subscribeToProductions.ts:4 } from "firebase/firestore";
C:\Users\Admin\terragest\src\_quarantine\modules\recoltes\repositories\RecoltesRepository.ts:1 import { FirestoreRepository } from "@/infrastructure/firebase/FirestoreRepository";
C:\Users\Admin\terragest\src\_quarantine\modules\recoltes\repositories\RecoltesRepository.ts:4 export class RecoltesRepository extends FirestoreRepository<RecoltesDTO> {
C:\Users\Admin\terragest\src\_quarantine\modules\recoltes\services\subscribeToRecoltes.ts:4 } from "firebase/firestore";
C:\Users\Admin\terragest\src\_quarantine\modules\stocks\repositories\StocksRepository.ts:1 import { FirestoreRepository } from "@/infrastructure/firebase/FirestoreRepository";
C:\Users\Admin\terragest\src\_quarantine\modules\stocks\repositories\StocksRepository.ts:4 export class StocksRepository extends FirestoreRepository<StocksDTO> {
C:\Users\Admin\terragest\src\_quarantine\modules\sync\repositories\SyncRepository.ts:1 import { FirestoreRepository } from "@/infrastructure/firebase/FirestoreRepository";
C:\Users\Admin\terragest\src\_quarantine\modules\sync\repositories\SyncRepository.ts:4 export class SyncRepository extends FirestoreRepository<SyncDTO> {
C:\Users\Admin\terragest\src\_quarantine\modules\sync\services\subscribeToSync.ts:4 } from "firebase/firestore";
C:\Users\Admin\terragest\src\_quarantine\modules\terrains\repositories\TerrainsRepository.ts:1 import { FirestoreRepository } from "@/infrastructure/firebase/FirestoreRepository";
C:\Users\Admin\terragest\src\_quarantine\modules\terrains\repositories\TerrainsRepository.ts:4 export class TerrainsRepository extends FirestoreRepository<TerrainsDTO> {
C:\Users\Admin\terragest\src\_quarantine\modules\terrains\services\subscribeToTerrains.ts:4 } from "firebase/firestore";
C:\Users\Admin\terragest\src\_quarantine\modules\utilisateurs\repositories\UtilisateursRepository.ts:1 import { FirestoreRepository } from "@/infrastructure/firebase/FirestoreRepository";
C:\Users\Admin\terragest\src\_quarantine\modules\utilisateurs\repositories\UtilisateursRepository.ts:4 export class UtilisateursRepository extends FirestoreRepository<UtilisateursDTO> {
C:\Users\Admin\terragest\src\_quarantine\modules\utilisateurs\services\subscribeToUtilisateurs.ts:4 } from "firebase/firestore";
C:\Users\Admin\terragest\src\_quarantine\workflow\services\WorkflowProductsRepository.ts:4 } from "firebase/firestore";
```

## BaseRepository

```txt
C:\Users\Admin\terragest\src\features\billing\repositories\BillingRepository.ts:1 import { BaseRepository }
C:\Users\Admin\terragest\src\features\billing\repositories\BillingRepository.ts:2 from "@/lib/firestore/BaseRepository";
C:\Users\Admin\terragest\src\features\billing\repositories\BillingRepository.ts:8 extends BaseRepository<Subscription> {
C:\Users\Admin\terragest\src\features\invitations\repositories\InvitationsRepository.ts:1 import { BaseRepository }
C:\Users\Admin\terragest\src\features\invitations\repositories\InvitationsRepository.ts:2 from "@/lib/firestore/BaseRepository";
C:\Users\Admin\terragest\src\features\invitations\repositories\InvitationsRepository.ts:8 extends BaseRepository<Invitation> {
C:\Users\Admin\terragest\src\features\memberships\repositories\MembershipsRepository.ts:1 import { BaseRepository }
C:\Users\Admin\terragest\src\features\memberships\repositories\MembershipsRepository.ts:2 from "@/lib/firestore/BaseRepository";
C:\Users\Admin\terragest\src\features\memberships\repositories\MembershipsRepository.ts:8 extends BaseRepository<Membership> {
C:\Users\Admin\terragest\src\features\organizations\repositories\OrganizationsRepository.ts:1 import { BaseRepository }
C:\Users\Admin\terragest\src\features\organizations\repositories\OrganizationsRepository.ts:2 from "@/lib/firestore/BaseRepository";
C:\Users\Admin\terragest\src\features\organizations\repositories\OrganizationsRepository.ts:8 extends BaseRepository<Organization> {
C:\Users\Admin\terragest\src\features\produits\repositories\ProductsRepository.ts:1 import { BaseRepository }
C:\Users\Admin\terragest\src\features\produits\repositories\ProductsRepository.ts:2 from "@/lib/firestore/BaseRepository";
C:\Users\Admin\terragest\src\features\produits\repositories\ProductsRepository.ts:8 extends BaseRepository<Product> {
C:\Users\Admin\terragest\src\hooks\useCollection.ts:8 import { BaseRepository }
C:\Users\Admin\terragest\src\hooks\useCollection.ts:9 from "@/lib/firestore/BaseRepository";
C:\Users\Admin\terragest\src\hooks\useCollection.ts:24 new BaseRepository<T>(
C:\Users\Admin\terragest\src\lib\firestore\BaseRepository.ts:15 export class BaseRepository<T> {
C:\Users\Admin\terragest\src\shared\repositories\BaseRepository.ts:13 export class BaseRepository<T> {
C:\Users\Admin\terragest\src\shared\repositories\ProductRepository.ts:1 import { BaseRepository } from "@/shared/repositories/BaseRepository";
C:\Users\Admin\terragest\src\shared\repositories\ProductRepository.ts:6 extends BaseRepository<Product> {
```

# DIRECT FIRESTORE ACCESS


## collection(

```txt
C:\Users\Admin\terragest\src\analytics\repositories\AnalyticsRepository.ts:17 collection(
C:\Users\Admin\terragest\src\analytics\repositories\AnalyticsRepository.ts:38 collection(
C:\Users\Admin\terragest\src\components\dashboard\RealtimeActivityFeed.tsx:18 } = useRealtimeCollection({
C:\Users\Admin\terragest\src\components\dashboard\RealtimeKpiCard.tsx:22 } = useRealtimeCollection({
C:\Users\Admin\terragest\src\core\persistence\providers\firestore-persistence-provider.ts:27 collection(
C:\Users\Admin\terragest\src\core\persistence\providers\firestore-persistence-provider.ts:38 collection(
C:\Users\Admin\terragest\src\core\persistence\providers\firestore-persistence-provider.ts:56 collection(
C:\Users\Admin\terragest\src\core\persistence\providers\firestore-persistence-provider.ts:67 collection(
C:\Users\Admin\terragest\src\core\persistence\providers\firestore-persistence-provider.ts:85 collection(
C:\Users\Admin\terragest\src\core\persistence\providers\firestore-persistence-provider.ts:96 collection(
C:\Users\Admin\terragest\src\core\persistence\providers\firestore-persistence-provider.ts:114 collection(
C:\Users\Admin\terragest\src\core\persistence\providers\firestore-persistence-provider.ts:125 collection(
C:\Users\Admin\terragest\src\core\persistence\providers\firestore-persistence-provider.ts:143 collection(
C:\Users\Admin\terragest\src\core\persistence\providers\firestore-persistence-provider.ts:154 collection(
C:\Users\Admin\terragest\src\features\audit\services\AuditService.ts:18 collection(db, "audit_logs"),
C:\Users\Admin\terragest\src\features\audit\services\AuditService.ts:28 collection(db, "audit_logs"),
C:\Users\Admin\terragest\src\features\exploitations\hooks\useExploitations.ts:37 collection(
C:\Users\Admin\terragest\src\features\exploitations\hooks\usePaginatedExploitations.ts:57 collection(
C:\Users\Admin\terragest\src\features\exploitations\hooks\usePaginatedExploitations.ts:125 collection(
C:\Users\Admin\terragest\src\features\exploitations\repositories\ExploitationRepository.ts:20 collection(db, COLLECTION_NAME),
C:\Users\Admin\terragest\src\features\exploitations\repositories\ExploitationRepository.ts:30 collection(db, COLLECTION_NAME),
C:\Users\Admin\terragest\src\features\exploitations\repositories\ExploitationsRepository.ts:34 collection(
C:\Users\Admin\terragest\src\features\exploitations\repositories\ExploitationsRepository.ts:120 collection(
C:\Users\Admin\terragest\src\features\exploitations\repositories\firestore\FirestoreExploitationRepository.ts:28 collection(
C:\Users\Admin\terragest\src\features\exploitations\repositories\firestore\FirestoreExploitationRepository.ts:40 collection(
C:\Users\Admin\terragest\src\features\fournisseurs\infrastructure\FirestoreFournisseursRepository.ts:36 collection(
C:\Users\Admin\terragest\src\features\fournisseurs\infrastructure\FirestoreFournisseursRepository.ts:85 collection(
C:\Users\Admin\terragest\src\features\interventions\repositories\firestore\FirestoreInterventionRepository.ts:28 collection(
C:\Users\Admin\terragest\src\features\interventions\repositories\firestore\FirestoreInterventionRepository.ts:40 collection(
C:\Users\Admin\terragest\src\features\materiels\infrastructure\FirestoreMaterielRepository.ts:28 collection(
C:\Users\Admin\terragest\src\features\materiels\infrastructure\FirestoreMaterielRepository.ts:40 collection(
C:\Users\Admin\terragest\src\features\materiels\repositories\firestore\FirestoreMaterielRepository.ts:28 collection(
C:\Users\Admin\terragest\src\features\materiels\repositories\firestore\FirestoreMaterielRepository.ts:40 collection(
C:\Users\Admin\terragest\src\features\mouvements\repositories\MouvementRepository.ts:21 collection(db, COLLECTION_NAME),
C:\Users\Admin\terragest\src\features\mouvements\repositories\MouvementRepository.ts:31 collection(db, COLLECTION_NAME),
C:\Users\Admin\terragest\src\features\notifications\components\RealtimeNotifications.tsx:22 } = useRealtimeCollection({
C:\Users\Admin\terragest\src\features\observability\services\live\LiveObservabilityService.ts:38 collection(
C:\Users\Admin\terragest\src\features\observability\services\workflows\WorkflowExecutionRealtimeService.ts:26 collection(
C:\Users\Admin\terragest\src\features\organisations\repositories\OrganisationRepository.ts:18 collection(db, COLLECTION_NAME),
C:\Users\Admin\terragest\src\features\organisations\repositories\OrganisationRepository.ts:26 collection(db, COLLECTION_NAME)
C:\Users\Admin\terragest\src\features\organisations\services\OrganisationService.ts:17 collection(
C:\Users\Admin\terragest\src\features\organisations\services\OrganisationService.ts:29 collection(
C:\Users\Admin\terragest\src\features\produits\repositories\firestore\FirestoreProduitRepository.ts:28 collection(
C:\Users\Admin\terragest\src\features\produits\repositories\firestore\FirestoreProduitRepository.ts:40 collection(
C:\Users\Admin\terragest\src\features\ressources\repositories\RessourceRepository.ts:23 collection(db, COLLECTION_NAME),
C:\Users\Admin\terragest\src\features\ressources\repositories\RessourceRepository.ts:33 collection(db, COLLECTION_NAME),
C:\Users\Admin\terragest\src\features\ressources\services\RessourceService.ts:22 collection(
C:\Users\Admin\terragest\src\features\ressources\services\RessourceService.ts:81 collection(
C:\Users\Admin\terragest\src\features\stocks\repositories\firestore\FirestoreStockRepository.ts:37 collection(
C:\Users\Admin\terragest\src\features\stocks\repositories\firestore\FirestoreStockRepository.ts:52 collection(
C:\Users\Admin\terragest\src\features\superadmin\services\SuperAdminService.ts:20 collection(
C:\Users\Admin\terragest\src\features\superadmin\services\SuperAdminService.ts:27 collection(
C:\Users\Admin\terragest\src\features\superadmin\services\SuperAdminService.ts:34 collection(
C:\Users\Admin\terragest\src\features\superadmin\services\SuperAdminService.ts:41 collection(
C:\Users\Admin\terragest\src\features\terrains\repositories\TerrainRepository.ts:20 collection(db, COLLECTION_NAME),
C:\Users\Admin\terragest\src\features\terrains\repositories\TerrainRepository.ts:30 collection(db, COLLECTION_NAME),
C:\Users\Admin\terragest\src\features\terrains\services\TerrainService.ts:22 collection(
C:\Users\Admin\terragest\src\features\terrains\services\TerrainService.ts:81 collection(
C:\Users\Admin\terragest\src\hooks\useRealtimeCollection.ts:42 collection(
C:\Users\Admin\terragest\src\hooks\useRealtimeCollection.ts:56 q = collection(
C:\Users\Admin\terragest\src\infrastructure\repositories\firestore\BaseFirestoreRepository.ts:38 collection(
C:\Users\Admin\terragest\src\infrastructure\repositories\firestore\BaseFirestoreRepository.ts:52 collection(
C:\Users\Admin\terragest\src\infrastructure\repositories\firestore\BaseFirestoreRepository.ts:123 collection(
C:\Users\Admin\terragest\src\lib\firestore\BaseRepository.ts:24 collection(
C:\Users\Admin\terragest\src\lib\firestore\BaseRepository.ts:90 collection(
C:\Users\Admin\terragest\src\lib\firestore\BaseRepository.ts:109 collection(
C:\Users\Admin\terragest\src\runtime\firestore\FirestoreRuntimeRealtime.ts:22 collection(
C:\Users\Admin\terragest\src\runtime\firestore\FirestoreRuntimeRepository.ts:21 collection(runtimeFirestore, module.schema.collection)
C:\Users\Admin\terragest\src\runtime\firestore\FirestoreRuntimeRepository.ts:53 collection(runtimeFirestore, module.schema.collection),
C:\Users\Admin\terragest\src\runtime\listeners\MaintenanceAuditListener.ts:23 collection(db, "audit_logs"),
C:\Users\Admin\terragest\src\runtime\listeners\MaintenanceNotificationListener.ts:23 collection(db, "notifications"),
C:\Users\Admin\terragest\src\runtime\monitoring\RuntimeEventPublisher.ts:33 collection(
C:\Users\Admin\terragest\src\runtime\notifications\ERPNotificationsPanel.tsx:36 collection(
C:\Users\Admin\terragest\src\runtime\notifications\RuntimeNotificationEngine.ts:32 collection(
C:\Users\Admin\terragest\src\runtime\observability\RuntimeLogsPanel.tsx:36 collection(
C:\Users\Admin\terragest\src\runtime\observability\RuntimeObservabilityEngine.ts:29 collection(
C:\Users\Admin\terragest\src\runtime\persistence\analytics\AnalyticsRepository.ts:17 collection(
C:\Users\Admin\terragest\src\runtime\persistence\audit\AuditRepository.ts:17 collection(
C:\Users\Admin\terragest\src\runtime\persistence\events\RuntimeEventRepository.ts:19 collection(
C:\Users\Admin\terragest\src\runtime\persistence\events\RuntimeEventRepository.ts:35 collection(
C:\Users\Admin\terragest\src\runtime\persistence\processes\ProcessRepository.ts:17 collection(
C:\Users\Admin\terragest\src\runtime\persistence\projections\ProjectionRepository.ts:17 collection(
C:\Users\Admin\terragest\src\runtime\persistence\workflows\WorkflowRepository.ts:17 collection(
C:\Users\Admin\terragest\src\runtime\resilience\dlq\DeadLetterQueue.ts:25 collection(
C:\Users\Admin\terragest\src\runtime\workflow-persistence\WorkflowPersistenceEngine.ts:27 collection(
C:\Users\Admin\terragest\src\runtime\workflows\persistence\WorkflowExecutionPersistence.ts:28 collection(
C:\Users\Admin\terragest\src\shared\repositories\BaseRepository.ts:30 collection(
C:\Users\Admin\terragest\src\shared\repositories\BaseRepository.ts:42 collection(
C:\Users\Admin\terragest\src\_quarantine\modules\alertes\services\subscribeToAlertes.ts:12 collection(
C:\Users\Admin\terragest\src\_quarantine\modules\clients\services\subscribeToClients.ts:12 collection(
C:\Users\Admin\terragest\src\_quarantine\modules\contrats\services\subscribeToContrats.ts:12 collection(
C:\Users\Admin\terragest\src\_quarantine\modules\exploitations\services\subscribeToExploitations.ts:12 collection(
C:\Users\Admin\terragest\src\_quarantine\modules\factures\services\subscribeToFactures.ts:12 collection(
C:\Users\Admin\terragest\src\_quarantine\modules\fournisseurs\services\subscribeToFournisseurs.ts:12 collection(
C:\Users\Admin\terragest\src\_quarantine\modules\interventions\services\subscribeToInterventions.ts:12 collection(
C:\Users\Admin\terragest\src\_quarantine\modules\maintenance\services\subscribeToMaintenance.ts:12 collection(
C:\Users\Admin\terragest\src\_quarantine\modules\materiels\services\subscribeToMateriels.ts:12 collection(
C:\Users\Admin\terragest\src\_quarantine\modules\mobile\services\subscribeToMobile.ts:12 collection(
C:\Users\Admin\terragest\src\_quarantine\modules\mouvements-stock\services\subscribeToMouvementsStock.ts:12 collection(
C:\Users\Admin\terragest\src\_quarantine\modules\paiements\services\subscribeToPaiements.ts:12 collection(
C:\Users\Admin\terragest\src\_quarantine\modules\productions\services\subscribeToProductions.ts:12 collection(
C:\Users\Admin\terragest\src\_quarantine\modules\recoltes\services\subscribeToRecoltes.ts:12 collection(
C:\Users\Admin\terragest\src\_quarantine\modules\sync\services\subscribeToSync.ts:12 collection(
C:\Users\Admin\terragest\src\_quarantine\modules\terrains\services\subscribeToTerrains.ts:12 collection(
C:\Users\Admin\terragest\src\_quarantine\modules\utilisateurs\services\subscribeToUtilisateurs.ts:12 collection(
C:\Users\Admin\terragest\src\_quarantine\workflow\services\WorkflowProductsRepository.ts:23 collection(
```

## doc(

```txt
C:\Users\Admin\terragest\src\core\persistence\providers\firestore-persistence-provider.ts:26 await addDoc(
C:\Users\Admin\terragest\src\core\persistence\providers\firestore-persistence-provider.ts:55 await addDoc(
C:\Users\Admin\terragest\src\core\persistence\providers\firestore-persistence-provider.ts:84 await addDoc(
C:\Users\Admin\terragest\src\core\persistence\providers\firestore-persistence-provider.ts:113 await addDoc(
C:\Users\Admin\terragest\src\core\persistence\providers\firestore-persistence-provider.ts:142 await addDoc(
C:\Users\Admin\terragest\src\features\audit\services\AuditService.ts:17 return addDoc(
C:\Users\Admin\terragest\src\features\exploitations\hooks\usePaginatedExploitations.ts:95 setLastDoc(
C:\Users\Admin\terragest\src\features\exploitations\hooks\usePaginatedExploitations.ts:174 setLastDoc(
C:\Users\Admin\terragest\src\features\exploitations\repositories\ExploitationRepository.ts:19 return addDoc(
C:\Users\Admin\terragest\src\features\exploitations\repositories\ExploitationsRepository.ts:32 return addDoc(
C:\Users\Admin\terragest\src\features\exploitations\repositories\ExploitationsRepository.ts:56 return updateDoc(
C:\Users\Admin\terragest\src\features\exploitations\repositories\ExploitationsRepository.ts:58 doc(
C:\Users\Admin\terragest\src\features\exploitations\repositories\ExploitationsRepository.ts:77 return deleteDoc(
C:\Users\Admin\terragest\src\features\exploitations\repositories\ExploitationsRepository.ts:79 doc(
C:\Users\Admin\terragest\src\features\exploitations\repositories\firestore\FirestoreExploitationRepository.ts:27 return addDoc(
C:\Users\Admin\terragest\src\features\exploitations\repositories\firestore\FirestoreExploitationRepository.ts:67 await getDoc(
C:\Users\Admin\terragest\src\features\exploitations\repositories\firestore\FirestoreExploitationRepository.ts:68 doc(
C:\Users\Admin\terragest\src\features\exploitations\repositories\firestore\FirestoreExploitationRepository.ts:99 await updateDoc(
C:\Users\Admin\terragest\src\features\exploitations\repositories\firestore\FirestoreExploitationRepository.ts:101 doc(
C:\Users\Admin\terragest\src\features\exploitations\repositories\firestore\FirestoreExploitationRepository.ts:115 await deleteDoc(
C:\Users\Admin\terragest\src\features\exploitations\repositories\firestore\FirestoreExploitationRepository.ts:117 doc(
C:\Users\Admin\terragest\src\features\fournisseurs\infrastructure\FirestoreFournisseursRepository.ts:58 await getDoc(
C:\Users\Admin\terragest\src\features\fournisseurs\infrastructure\FirestoreFournisseursRepository.ts:59 doc(
C:\Users\Admin\terragest\src\features\fournisseurs\infrastructure\FirestoreFournisseursRepository.ts:83 return addDoc(
C:\Users\Admin\terragest\src\features\fournisseurs\infrastructure\FirestoreFournisseursRepository.ts:106 await updateDoc(
C:\Users\Admin\terragest\src\features\fournisseurs\infrastructure\FirestoreFournisseursRepository.ts:108 doc(
C:\Users\Admin\terragest\src\features\fournisseurs\infrastructure\FirestoreFournisseursRepository.ts:122 await deleteDoc(
C:\Users\Admin\terragest\src\features\fournisseurs\infrastructure\FirestoreFournisseursRepository.ts:124 doc(
C:\Users\Admin\terragest\src\features\interventions\repositories\firestore\FirestoreInterventionRepository.ts:27 return addDoc(
C:\Users\Admin\terragest\src\features\interventions\repositories\firestore\FirestoreInterventionRepository.ts:67 await getDoc(
C:\Users\Admin\terragest\src\features\interventions\repositories\firestore\FirestoreInterventionRepository.ts:68 doc(
C:\Users\Admin\terragest\src\features\interventions\repositories\firestore\FirestoreInterventionRepository.ts:99 await updateDoc(
C:\Users\Admin\terragest\src\features\interventions\repositories\firestore\FirestoreInterventionRepository.ts:101 doc(
C:\Users\Admin\terragest\src\features\interventions\repositories\firestore\FirestoreInterventionRepository.ts:115 await deleteDoc(
C:\Users\Admin\terragest\src\features\interventions\repositories\firestore\FirestoreInterventionRepository.ts:117 doc(
C:\Users\Admin\terragest\src\features\materiels\infrastructure\FirestoreMaterielRepository.ts:27 return addDoc(
C:\Users\Admin\terragest\src\features\materiels\infrastructure\FirestoreMaterielRepository.ts:67 await getDoc(
C:\Users\Admin\terragest\src\features\materiels\infrastructure\FirestoreMaterielRepository.ts:68 doc(
C:\Users\Admin\terragest\src\features\materiels\infrastructure\FirestoreMaterielRepository.ts:99 await updateDoc(
C:\Users\Admin\terragest\src\features\materiels\infrastructure\FirestoreMaterielRepository.ts:101 doc(
C:\Users\Admin\terragest\src\features\materiels\infrastructure\FirestoreMaterielRepository.ts:115 await deleteDoc(
C:\Users\Admin\terragest\src\features\materiels\infrastructure\FirestoreMaterielRepository.ts:117 doc(
C:\Users\Admin\terragest\src\features\materiels\repositories\firestore\FirestoreMaterielRepository.ts:27 return addDoc(
C:\Users\Admin\terragest\src\features\materiels\repositories\firestore\FirestoreMaterielRepository.ts:67 await getDoc(
C:\Users\Admin\terragest\src\features\materiels\repositories\firestore\FirestoreMaterielRepository.ts:68 doc(
C:\Users\Admin\terragest\src\features\materiels\repositories\firestore\FirestoreMaterielRepository.ts:99 await updateDoc(
C:\Users\Admin\terragest\src\features\materiels\repositories\firestore\FirestoreMaterielRepository.ts:101 doc(
C:\Users\Admin\terragest\src\features\materiels\repositories\firestore\FirestoreMaterielRepository.ts:115 await deleteDoc(
C:\Users\Admin\terragest\src\features\materiels\repositories\firestore\FirestoreMaterielRepository.ts:117 doc(
C:\Users\Admin\terragest\src\features\mouvements\repositories\MouvementRepository.ts:20 return addDoc(
C:\Users\Admin\terragest\src\features\organisations\repositories\OrganisationRepository.ts:17 return addDoc(
C:\Users\Admin\terragest\src\features\organisations\services\OrganisationService.ts:16 return addDoc(
C:\Users\Admin\terragest\src\features\organisations\services\OrganisationService.ts:44 await getDoc(
C:\Users\Admin\terragest\src\features\organisations\services\OrganisationService.ts:45 doc(
C:\Users\Admin\terragest\src\features\organisations\services\OrganisationService.ts:67 return updateDoc(
C:\Users\Admin\terragest\src\features\organisations\services\OrganisationService.ts:68 doc(
C:\Users\Admin\terragest\src\features\produits\repositories\firestore\FirestoreProduitRepository.ts:27 return addDoc(
C:\Users\Admin\terragest\src\features\produits\repositories\firestore\FirestoreProduitRepository.ts:67 await getDoc(
C:\Users\Admin\terragest\src\features\produits\repositories\firestore\FirestoreProduitRepository.ts:68 doc(
C:\Users\Admin\terragest\src\features\produits\repositories\firestore\FirestoreProduitRepository.ts:99 await updateDoc(
C:\Users\Admin\terragest\src\features\produits\repositories\firestore\FirestoreProduitRepository.ts:101 doc(
C:\Users\Admin\terragest\src\features\produits\repositories\firestore\FirestoreProduitRepository.ts:115 await deleteDoc(
C:\Users\Admin\terragest\src\features\produits\repositories\firestore\FirestoreProduitRepository.ts:117 doc(
C:\Users\Admin\terragest\src\features\ressources\repositories\RessourceRepository.ts:22 return addDoc(
C:\Users\Admin\terragest\src\features\ressources\repositories\RessourceRepository.ts:54 const ref = doc(
C:\Users\Admin\terragest\src\features\ressources\repositories\RessourceRepository.ts:60 await updateDoc(ref, {
C:\Users\Admin\terragest\src\features\ressources\repositories\RessourceRepository.ts:67 const ref = doc(
C:\Users\Admin\terragest\src\features\ressources\repositories\RessourceRepository.ts:73 const snapshot = await getDoc(ref);
C:\Users\Admin\terragest\src\features\ressources\services\RessourceService.ts:21 return addDoc(
C:\Users\Admin\terragest\src\features\ressources\services\RessourceService.ts:32 const snapshot = await getDoc(
C:\Users\Admin\terragest\src\features\ressources\services\RessourceService.ts:33 doc(
C:\Users\Admin\terragest\src\features\ressources\services\RessourceService.ts:55 return updateDoc(
C:\Users\Admin\terragest\src\features\ressources\services\RessourceService.ts:56 doc(
C:\Users\Admin\terragest\src\features\ressources\services\RessourceService.ts:67 return deleteDoc(
C:\Users\Admin\terragest\src\features\ressources\services\RessourceService.ts:68 doc(
C:\Users\Admin\terragest\src\features\stocks\repositories\firestore\FirestoreStockRepository.ts:35 return addDoc(
C:\Users\Admin\terragest\src\features\stocks\repositories\firestore\FirestoreStockRepository.ts:75 await getDoc(
C:\Users\Admin\terragest\src\features\stocks\repositories\firestore\FirestoreStockRepository.ts:77 doc(
C:\Users\Admin\terragest\src\features\stocks\repositories\firestore\FirestoreStockRepository.ts:107 return updateDoc(
C:\Users\Admin\terragest\src\features\stocks\repositories\firestore\FirestoreStockRepository.ts:109 doc(
C:\Users\Admin\terragest\src\features\stocks\repositories\firestore\FirestoreStockRepository.ts:123 return deleteDoc(
C:\Users\Admin\terragest\src\features\stocks\repositories\firestore\FirestoreStockRepository.ts:125 doc(
C:\Users\Admin\terragest\src\features\terrains\repositories\TerrainRepository.ts:19 return addDoc(
C:\Users\Admin\terragest\src\features\terrains\services\TerrainService.ts:21 return addDoc(
C:\Users\Admin\terragest\src\features\terrains\services\TerrainService.ts:32 const snapshot = await getDoc(
C:\Users\Admin\terragest\src\features\terrains\services\TerrainService.ts:33 doc(
C:\Users\Admin\terragest\src\features\terrains\services\TerrainService.ts:55 return updateDoc(
C:\Users\Admin\terragest\src\features\terrains\services\TerrainService.ts:56 doc(
C:\Users\Admin\terragest\src\features\terrains\services\TerrainService.ts:67 return deleteDoc(
C:\Users\Admin\terragest\src\features\terrains\services\TerrainService.ts:68 doc(
C:\Users\Admin\terragest\src\hooks\useDocument.ts:36 doc(
C:\Users\Admin\terragest\src\infrastructure\repositories\firestore\BaseFirestoreRepository.ts:36 return addDoc(
C:\Users\Admin\terragest\src\infrastructure\repositories\firestore\BaseFirestoreRepository.ts:74 await getDoc(
C:\Users\Admin\terragest\src\infrastructure\repositories\firestore\BaseFirestoreRepository.ts:76 doc(
C:\Users\Admin\terragest\src\infrastructure\repositories\firestore\BaseFirestoreRepository.ts:104 await updateDoc(
C:\Users\Admin\terragest\src\infrastructure\repositories\firestore\BaseFirestoreRepository.ts:106 doc(
C:\Users\Admin\terragest\src\lib\firestore\BaseRepository.ts:23 return await addDoc(
C:\Users\Admin\terragest\src\lib\firestore\BaseRepository.ts:44 return await updateDoc(
C:\Users\Admin\terragest\src\lib\firestore\BaseRepository.ts:45 doc(
C:\Users\Admin\terragest\src\lib\firestore\BaseRepository.ts:60 return await deleteDoc(
C:\Users\Admin\terragest\src\lib\firestore\BaseRepository.ts:61 doc(
C:\Users\Admin\terragest\src\lib\firestore\BaseRepository.ts:72 await getDoc(
C:\Users\Admin\terragest\src\lib\firestore\BaseRepository.ts:73 doc(
C:\Users\Admin\terragest\src\runtime\firestore\FirestoreRuntimeRepository.ts:34 const snapshot = await getDoc(
C:\Users\Admin\terragest\src\runtime\firestore\FirestoreRuntimeRepository.ts:35 doc(runtimeFirestore, module.schema.collection, id)
C:\Users\Admin\terragest\src\runtime\firestore\FirestoreRuntimeRepository.ts:52 const result = await addDoc(
C:\Users\Admin\terragest\src\runtime\firestore\FirestoreRuntimeRepository.ts:71 await updateDoc(
C:\Users\Admin\terragest\src\runtime\firestore\FirestoreRuntimeRepository.ts:72 doc(runtimeFirestore, module.schema.collection, id),
C:\Users\Admin\terragest\src\runtime\firestore\FirestoreRuntimeRepository.ts:89 await deleteDoc(
C:\Users\Admin\terragest\src\runtime\firestore\FirestoreRuntimeRepository.ts:90 doc(runtimeFirestore, module.schema.collection, id)
C:\Users\Admin\terragest\src\runtime\listeners\MaintenanceAuditListener.ts:22 await addDoc(
C:\Users\Admin\terragest\src\runtime\listeners\MaintenanceNotificationListener.ts:22 await addDoc(
C:\Users\Admin\terragest\src\runtime\monitoring\RuntimeEventPublisher.ts:32 await addDoc(
C:\Users\Admin\terragest\src\runtime\notifications\RuntimeNotificationEngine.ts:30 await addDoc(
C:\Users\Admin\terragest\src\runtime\observability\RuntimeObservabilityEngine.ts:27 await addDoc(
C:\Users\Admin\terragest\src\runtime\persistence\analytics\AnalyticsRepository.ts:16 return addDoc(
C:\Users\Admin\terragest\src\runtime\persistence\audit\AuditRepository.ts:16 return addDoc(
C:\Users\Admin\terragest\src\runtime\persistence\events\RuntimeEventRepository.ts:18 return addDoc(
C:\Users\Admin\terragest\src\runtime\persistence\processes\ProcessRepository.ts:16 return addDoc(
C:\Users\Admin\terragest\src\runtime\persistence\projections\ProjectionRepository.ts:16 return addDoc(
C:\Users\Admin\terragest\src\runtime\persistence\workflows\WorkflowRepository.ts:16 return addDoc(
C:\Users\Admin\terragest\src\runtime\resilience\dlq\DeadLetterQueue.ts:24 await addDoc(
C:\Users\Admin\terragest\src\runtime\workflow-persistence\WorkflowPersistenceEngine.ts:25 await addDoc(
C:\Users\Admin\terragest\src\runtime\workflows\persistence\WorkflowExecutionPersistence.ts:26 await addDoc(
C:\Users\Admin\terragest\src\runtime\workflows\persistence\WorkflowExecutionPersistence.ts:52 await updateDoc(
C:\Users\Admin\terragest\src\runtime\workflows\persistence\WorkflowExecutionPersistence.ts:54 doc(
C:\Users\Admin\terragest\src\services\UtilisateurService.ts:16 const ref = doc(
C:\Users\Admin\terragest\src\services\UtilisateurService.ts:22 const snapshot = await getDoc(ref);
C:\Users\Admin\terragest\src\shared\repositories\BaseRepository.ts:29 return addDoc(
C:\Users\Admin\terragest\src\shared\repositories\BaseRepository.ts:61 await getDoc(
C:\Users\Admin\terragest\src\shared\repositories\BaseRepository.ts:62 doc(
C:\Users\Admin\terragest\src\shared\repositories\BaseRepository.ts:83 return updateDoc(
C:\Users\Admin\terragest\src\shared\repositories\BaseRepository.ts:84 doc(
C:\Users\Admin\terragest\src\shared\repositories\BaseRepository.ts:97 return deleteDoc(
C:\Users\Admin\terragest\src\shared\repositories\BaseRepository.ts:98 doc(
C:\Users\Admin\terragest\src\_quarantine\workflow\services\WorkflowProductsRepository.ts:21 await addDoc(
```

## query(

```txt
C:\Users\Admin\terragest\src\features\audit\services\AuditService.ts:27 const q = query(
C:\Users\Admin\terragest\src\features\exploitations\hooks\useExploitations.ts:35 query(
C:\Users\Admin\terragest\src\features\exploitations\hooks\usePaginatedExploitations.ts:55 query(
C:\Users\Admin\terragest\src\features\exploitations\hooks\usePaginatedExploitations.ts:123 query(
C:\Users\Admin\terragest\src\features\exploitations\repositories\ExploitationRepository.ts:29 const q = query(
C:\Users\Admin\terragest\src\features\exploitations\repositories\ExploitationsRepository.ts:118 query(
C:\Users\Admin\terragest\src\features\mouvements\repositories\MouvementRepository.ts:30 const q = query(
C:\Users\Admin\terragest\src\features\observability\services\live\LiveObservabilityService.ts:37 query(
C:\Users\Admin\terragest\src\features\observability\services\workflows\WorkflowExecutionRealtimeService.ts:24 query(
C:\Users\Admin\terragest\src\features\ressources\repositories\RessourceRepository.ts:32 const q = query(
C:\Users\Admin\terragest\src\features\ressources\services\RessourceService.ts:80 const q = query(
C:\Users\Admin\terragest\src\features\terrains\repositories\TerrainRepository.ts:29 const q = query(
C:\Users\Admin\terragest\src\features\terrains\services\TerrainService.ts:80 const q = query(
C:\Users\Admin\terragest\src\hooks\useProducts.ts:12 return useQuery({
C:\Users\Admin\terragest\src\hooks\useRealtimeCollection.ts:41 q = query(
C:\Users\Admin\terragest\src\runtime\data\cqrs\CQRSBus.ts:13 query(
C:\Users\Admin\terragest\src\runtime\notifications\ERPNotificationsPanel.tsx:34 query(
C:\Users\Admin\terragest\src\runtime\observability\RuntimeLogsPanel.tsx:34 query(
C:\Users\Admin\terragest\src\_quarantine\modules\alertes\hooks\useAlertes.ts:10 return useQuery({
C:\Users\Admin\terragest\src\_quarantine\modules\analytics\hooks\useAnalytics.ts:10 return useQuery({
C:\Users\Admin\terragest\src\_quarantine\modules\clients\hooks\useClients.ts:10 return useQuery({
C:\Users\Admin\terragest\src\_quarantine\modules\contrats\hooks\useContrats.ts:10 return useQuery({
C:\Users\Admin\terragest\src\_quarantine\modules\exploitations\hooks\useExploitations.ts:10 return useQuery({
C:\Users\Admin\terragest\src\_quarantine\modules\factures\hooks\useFactures.ts:10 return useQuery({
C:\Users\Admin\terragest\src\_quarantine\modules\fournisseurs\hooks\useFournisseurs.ts:10 return useQuery({
C:\Users\Admin\terragest\src\_quarantine\modules\interventions\hooks\useInterventions.ts:10 return useQuery({
C:\Users\Admin\terragest\src\_quarantine\modules\maintenance\hooks\useMaintenance.ts:10 return useQuery({
C:\Users\Admin\terragest\src\_quarantine\modules\materiels\hooks\useMateriels.ts:10 return useQuery({
C:\Users\Admin\terragest\src\_quarantine\modules\mobile\hooks\useMobile.ts:10 return useQuery({
C:\Users\Admin\terragest\src\_quarantine\modules\monitoring\hooks\useMonitoring.ts:10 return useQuery({
C:\Users\Admin\terragest\src\_quarantine\modules\mouvements-stock\hooks\useMouvementsStock.ts:10 return useQuery({
C:\Users\Admin\terragest\src\_quarantine\modules\paiements\hooks\usePaiements.ts:10 return useQuery({
C:\Users\Admin\terragest\src\_quarantine\modules\productions\hooks\useProductions.ts:10 return useQuery({
C:\Users\Admin\terragest\src\_quarantine\modules\recoltes\hooks\useRecoltes.ts:10 return useQuery({
C:\Users\Admin\terragest\src\_quarantine\modules\stocks\hooks\useStocks.ts:10 return useQuery({
C:\Users\Admin\terragest\src\_quarantine\modules\sync\hooks\useSync.ts:10 return useQuery({
C:\Users\Admin\terragest\src\_quarantine\modules\terrains\hooks\useTerrains.ts:10 return useQuery({
C:\Users\Admin\terragest\src\_quarantine\modules\utilisateurs\hooks\useUtilisateurs.ts:10 return useQuery({
```

## onSnapshot(

```txt
C:\Users\Admin\terragest\src\features\exploitations\hooks\useExploitations.ts:50 onSnapshot(
C:\Users\Admin\terragest\src\features\observability\services\live\LiveObservabilityService.ts:49 return onSnapshot(
C:\Users\Admin\terragest\src\features\observability\services\workflows\WorkflowExecutionRealtimeService.ts:39 return onSnapshot(
C:\Users\Admin\terragest\src\hooks\useDocument.ts:35 onSnapshot(
C:\Users\Admin\terragest\src\hooks\useRealtimeCollection.ts:63 onSnapshot(
C:\Users\Admin\terragest\src\infrastructure\repositories\firestore\BaseFirestoreRepository.ts:121 return onSnapshot(
C:\Users\Admin\terragest\src\lib\firestore\BaseRepository.ts:108 return onSnapshot(
C:\Users\Admin\terragest\src\runtime\firestore\FirestoreRuntimeRealtime.ts:21 return onSnapshot(
C:\Users\Admin\terragest\src\runtime\notifications\ERPNotificationsPanel.tsx:48 onSnapshot(
C:\Users\Admin\terragest\src\runtime\observability\RuntimeLogsPanel.tsx:48 onSnapshot(
C:\Users\Admin\terragest\src\_quarantine\modules\alertes\services\subscribeToAlertes.ts:11 return onSnapshot(
C:\Users\Admin\terragest\src\_quarantine\modules\clients\services\subscribeToClients.ts:11 return onSnapshot(
C:\Users\Admin\terragest\src\_quarantine\modules\contrats\services\subscribeToContrats.ts:11 return onSnapshot(
C:\Users\Admin\terragest\src\_quarantine\modules\exploitations\services\subscribeToExploitations.ts:11 return onSnapshot(
C:\Users\Admin\terragest\src\_quarantine\modules\factures\services\subscribeToFactures.ts:11 return onSnapshot(
C:\Users\Admin\terragest\src\_quarantine\modules\fournisseurs\services\subscribeToFournisseurs.ts:11 return onSnapshot(
C:\Users\Admin\terragest\src\_quarantine\modules\interventions\services\subscribeToInterventions.ts:11 return onSnapshot(
C:\Users\Admin\terragest\src\_quarantine\modules\maintenance\services\subscribeToMaintenance.ts:11 return onSnapshot(
C:\Users\Admin\terragest\src\_quarantine\modules\materiels\services\subscribeToMateriels.ts:11 return onSnapshot(
C:\Users\Admin\terragest\src\_quarantine\modules\mobile\services\subscribeToMobile.ts:11 return onSnapshot(
C:\Users\Admin\terragest\src\_quarantine\modules\mouvements-stock\services\subscribeToMouvementsStock.ts:11 return onSnapshot(
C:\Users\Admin\terragest\src\_quarantine\modules\paiements\services\subscribeToPaiements.ts:11 return onSnapshot(
C:\Users\Admin\terragest\src\_quarantine\modules\productions\services\subscribeToProductions.ts:11 return onSnapshot(
C:\Users\Admin\terragest\src\_quarantine\modules\recoltes\services\subscribeToRecoltes.ts:11 return onSnapshot(
C:\Users\Admin\terragest\src\_quarantine\modules\sync\services\subscribeToSync.ts:11 return onSnapshot(
C:\Users\Admin\terragest\src\_quarantine\modules\terrains\services\subscribeToTerrains.ts:11 return onSnapshot(
C:\Users\Admin\terragest\src\_quarantine\modules\utilisateurs\services\subscribeToUtilisateurs.ts:11 return onSnapshot(
```

# FEATURE PERSISTENCE


## services/

```txt
C:\Users\Admin\terragest\src\analytics\aggregation\AggregationService.ts:1 export class AggregationService {
C:\Users\Admin\terragest\src\analytics\reporting\ReportingService.ts:1 import { AggregationService } from "../aggregation/AggregationService";
C:\Users\Admin\terragest\src\analytics\reporting\ReportingService.ts:3 export class ReportingService {
C:\Users\Admin\terragest\src\analytics\reporting\ReportingService.ts:6 await AggregationService.buildDashboardMetrics();
C:\Users\Admin\terragest\src\analytics\services\AggregationService.ts:1 export const AggregationService = {
C:\Users\Admin\terragest\src\app\api\platform\status\route.ts:6 import { ERPMonitoringService }
C:\Users\Admin\terragest\src\app\api\platform\status\route.ts:7 from "@/platform/monitoring/ERPMonitoringService";
C:\Users\Admin\terragest\src\app\api\platform\status\route.ts:12 ERPMonitoringService
C:\Users\Admin\terragest\src\app\invitations\accept\[token]\page.tsx:7 import { InvitationService }
C:\Users\Admin\terragest\src\app\invitations\accept\[token]\page.tsx:8 from "@/features/invitations/services/InvitationService";
C:\Users\Admin\terragest\src\app\invitations\accept\[token]\page.tsx:59 await InvitationService.accept(
C:\Users\Admin\terragest\src\app\login\page.tsx:11 import { AuthService }
C:\Users\Admin\terragest\src\app\login\page.tsx:12 from "@/platform/auth/AuthService";
C:\Users\Admin\terragest\src\app\login\page.tsx:28 AuthService.login(
C:\Users\Admin\terragest\src\components\erp\enterprise-runtime\EnterpriseRuntimeDiagnosticsPanel.tsx:23 {diagnostics.services.map((service) => (
C:\Users\Admin\terragest\src\components\erp\enterprise-runtime\EnterpriseRuntimeDiagnosticsPanel.tsx:25 key={service.name}
C:\Users\Admin\terragest\src\components\erp\enterprise-runtime\EnterpriseRuntimeDiagnosticsPanel.tsx:31 {service.name}
C:\Users\Admin\terragest\src\components\erp\enterprise-runtime\EnterpriseRuntimeDiagnosticsPanel.tsx:34 {service.description}
C:\Users\Admin\terragest\src\components\erp\enterprise-runtime\EnterpriseRuntimeDiagnosticsPanel.tsx:40 service.status === "healthy"
C:\Users\Admin\terragest\src\components\erp\enterprise-runtime\EnterpriseRuntimeDiagnosticsPanel.tsx:42 : service.status === "warning"
C:\Users\Admin\terragest\src\components\erp\enterprise-runtime\EnterpriseRuntimeDiagnosticsPanel.tsx:47 {service.status}
C:\Users\Admin\terragest\src\components\erp\realtime\ERPRealtimePresencePanel.tsx:20 Utilisateurs et services connectes au runtime.
C:\Users\Admin\terragest\src\components\erp\runtime\ERPRuntimeStatus.tsx:8 const services = [
C:\Users\Admin\terragest\src\components\erp\runtime\ERPRuntimeStatus.tsx:39 {services.map((service) => (
C:\Users\Admin\terragest\src\components\erp\runtime\ERPRuntimeStatus.tsx:42 key={service.name}
C:\Users\Admin\terragest\src\components\erp\runtime\ERPRuntimeStatus.tsx:64 {service.name}
C:\Users\Admin\terragest\src\components\erp\runtime\ERPRuntimeStatus.tsx:69 service.health as
C:\Users\Admin\terragest\src\components\materiels\details\MaterielDetails.tsx:13 import { MaintenanceWorkflowService }
C:\Users\Admin\terragest\src\components\materiels\details\MaterielDetails.tsx:14 from "@/domains/maintenance/services/MaintenanceWorkflowService";
C:\Users\Admin\terragest\src\components\materiels\details\MaterielDetails.tsx:32 MaintenanceWorkflowService
C:\Users\Admin\terragest\src\components\materiels\details\MaterielDetails.tsx:45 MaintenanceWorkflowService
C:\Users\Admin\terragest\src\data-platform\bi\BIService.ts:1 export const BIService = {
C:\Users\Admin\terragest\src\data-platform\etl\ETLPipeline.ts:2 EventStreamingService,
C:\Users\Admin\terragest\src\data-platform\etl\ETLPipeline.ts:3 } from "@/data-platform/streaming/EventStreamingService";
C:\Users\Admin\terragest\src\data-platform\etl\ETLPipeline.ts:6 DataWarehouseService,
C:\Users\Admin\terragest\src\data-platform\etl\ETLPipeline.ts:7 } from "@/data-platform/warehouse/DataWarehouseService";
C:\Users\Admin\terragest\src\data-platform\etl\ETLPipeline.ts:16 EventStreamingService.publish(
C:\Users\Admin\terragest\src\data-platform\etl\ETLPipeline.ts:21 await DataWarehouseService.store(
C:\Users\Admin\terragest\src\data-platform\historical\HistoricalAnalyticsService.ts:1 export const HistoricalAnalyticsService = {
C:\Users\Admin\terragest\src\data-platform\services\DataOrchestrationService.ts:6 HistoricalAnalyticsService,
C:\Users\Admin\terragest\src\data-platform\services\DataOrchestrationService.ts:7 } from "@/data-platform/historical/HistoricalAnalyticsService";
C:\Users\Admin\terragest\src\data-platform\services\DataOrchestrationService.ts:10 BIService,
C:\Users\Admin\terragest\src\data-platform\services\DataOrchestrationService.ts:11 } from "@/data-platform/bi/BIService";
C:\Users\Admin\terragest\src\data-platform\services\DataOrchestrationService.ts:13 export const DataOrchestrationService = {
C:\Users\Admin\terragest\src\data-platform\services\DataOrchestrationService.ts:25 HistoricalAnalyticsService.analyzeTrend(
C:\Users\Admin\terragest\src\data-platform\services\DataOrchestrationService.ts:29 return BIService.generateInsights({
C:\Users\Admin\terragest\src\data-platform\streaming\EventStreamingService.ts:1 export const EventStreamingService = {
C:\Users\Admin\terragest\src\data-platform\warehouse\DataWarehouseService.ts:1 export const DataWarehouseService = {
C:\Users\Admin\terragest\src\domains\maintenance\services\MaintenanceWorkflowService.ts:1 // src/domains/maintenance/services/MaintenanceWorkflowService.ts
C:\Users\Admin\terragest\src\domains\maintenance\services\MaintenanceWorkflowService.ts:9 export class MaintenanceWorkflowService {
C:\Users\Admin\terragest\src\domains\paiement\services\PaiementService.ts:1 // src/domains/paiement/services/PaiementService.ts
C:\Users\Admin\terragest\src\domains\paiement\services\PaiementService.ts:3 import { createModuleService }
C:\Users\Admin\terragest\src\domains\paiement\services\PaiementService.ts:4 from "@/platform/factories/createModuleService";
C:\Users\Admin\terragest\src\domains\paiement\services\PaiementService.ts:6 export const PaiementService =
C:\Users\Admin\terragest\src\domains\paiement\services\PaiementService.ts:7 createModuleService(
C:\Users\Admin\terragest\src\domains\stock\services\StockService.ts:1 // src/domains/stock/services/StockService.ts
C:\Users\Admin\terragest\src\domains\stock\services\StockService.ts:9 export class StockService {
C:\Users\Admin\terragest\src\features\alerts\hooks\useAlerts.ts:9 import { AlertService }
C:\Users\Admin\terragest\src\features\alerts\hooks\useAlerts.ts:10 from "@/features/alerts/services/AlertService";
C:\Users\Admin\terragest\src\features\alerts\hooks\useAlerts.ts:22 return AlertService
C:\Users\Admin\terragest\src\features\alerts\services\AlertService.ts:14 export const AlertService = {
C:\Users\Admin\terragest\src\features\analytics\services\DashboardAnalyticsService.ts:1 export const DashboardAnalyticsService = {
C:\Users\Admin\terragest\src\features\analytics\services\DashboardAnalyticsService.ts:16 export default DashboardAnalyticsService;
C:\Users\Admin\terragest\src\features\api\middleware\apiAuth.ts:1 import { errorResponse } from "@/features/api/services/apiResponse";
C:\Users\Admin\terragest\src\features\audit\services\AuditService.ts:13 export const AuditService = {
C:\Users\Admin\terragest\src\features\auth\components\LoginForm.tsx:12 AuthService,
C:\Users\Admin\terragest\src\features\auth\components\LoginForm.tsx:13 } from "@/features/auth/services/AuthService";
C:\Users\Admin\terragest\src\features\auth\components\LoginForm.tsx:45 await AuthService.login(
C:\Users\Admin\terragest\src\features\auth\hooks\usePermissions.ts:1 import { PermissionService } from "@/features/auth/services/PermissionService";
C:\Users\Admin\terragest\src\features\auth\hooks\usePermissions.ts:6 PermissionService.canViewDashboard(role),
C:\Users\Admin\terragest\src\features\auth\hooks\usePermissions.ts:9 PermissionService.canViewModules(role),
C:\Users\Admin\terragest\src\features\auth\hooks\usePermissions.ts:12 PermissionService.canManageUsers(role),
C:\Users\Admin\terragest\src\features\auth\providers\EnterpriseAuthProvider.tsx:10 import { AuthService }
C:\Users\Admin\terragest\src\features\auth\providers\EnterpriseAuthProvider.tsx:11 from "@/features/auth/services/AuthService";
C:\Users\Admin\terragest\src\features\auth\providers\EnterpriseAuthProvider.tsx:31 AuthService.subscribe(
C:\Users\Admin\terragest\src\features\auth\services\AuthService.ts:20 AuthService = {
C:\Users\Admin\terragest\src\features\auth\services\PermissionService.ts:1 export const PermissionService = {
C:\Users\Admin\terragest\src\features\auth\services\PermissionService.ts:15 export default PermissionService;
C:\Users\Admin\terragest\src\features\billing\components\FeatureGuard.tsx:5 import { hasFeatureAccess } from "@/features/billing/services/hasFeatureAccess";
C:\Users\Admin\terragest\src\features\billing\services\BillingService.ts:7 export const BillingService = {
C:\Users\Admin\terragest\src\features\exploitations\components\ExploitationForm.tsx:17 ExploitationsService,
C:\Users\Admin\terragest\src\features\exploitations\components\ExploitationForm.tsx:18 } from "@/features/exploitations/services/ExploitationsService";
C:\Users\Admin\terragest\src\features\exploitations\components\ExploitationForm.tsx:65 await ExploitationsService.create(
C:\Users\Admin\terragest\src\features\exploitations\services\ExploitationService.ts:9 export const ExploitationService = {
C:\Users\Admin\terragest\src\features\exploitations\services\ExploitationsService.ts:9 export const ExploitationsService = {
C:\Users\Admin\terragest\src\features\exports\components\ExportButtons.tsx:3 import { ExportService } from "@/features/exports/services/ExportService";
C:\Users\Admin\terragest\src\features\exports\components\ExportButtons.tsx:27 ExportService.exportExcel(
C:\Users\Admin\terragest\src\features\exports\components\ExportButtons.tsx:45 ExportService.exportPdf(
C:\Users\Admin\terragest\src\features\exports\services\ExportService.ts:9 export const ExportService = {
C:\Users\Admin\terragest\src\features\fournisseurs\application\FournisseursService.ts:11 export const FournisseursService = {
C:\Users\Admin\terragest\src\features\interventions\services\InterventionService.ts:9 export const InterventionService = {
C:\Users\Admin\terragest\src\features\interventions\workflows\BreakdownInterventionWorkflow.ts:1 import { InterventionService }
C:\Users\Admin\terragest\src\features\interventions\workflows\BreakdownInterventionWorkflow.ts:2 from "../services/InterventionService";
C:\Users\Admin\terragest\src\features\interventions\workflows\BreakdownInterventionWorkflow.ts:6 return InterventionService.create(
C:\Users\Admin\terragest\src\features\invitations\components\InvitationForm.tsx:7 import { InvitationService }
C:\Users\Admin\terragest\src\features\invitations\components\InvitationForm.tsx:8 from "@/features/invitations/services/InvitationService";
C:\Users\Admin\terragest\src\features\invitations\components\InvitationForm.tsx:25 await InvitationService.create({
C:\Users\Admin\terragest\src\features\invitations\services\InvitationService.ts:10 export const InvitationService = {
C:\Users\Admin\terragest\src\features\materiels\application\MaterielService.ts:9 export const MaterielService = {
C:\Users\Admin\terragest\src\features\materiels\runtime\EnterpriseMaterielFlow.ts:12 MaterielSupervisionService
C:\Users\Admin\terragest\src\features\materiels\runtime\EnterpriseMaterielFlow.ts:14 from "../supervision/MaterielSupervisionService";
C:\Users\Admin\terragest\src\features\materiels\runtime\EnterpriseMaterielFlow.ts:94 new MaterielSupervisionService();
C:\Users\Admin\terragest\src\features\materiels\services\MaterielService.ts:9 export const MaterielService = {
C:\Users\Admin\terragest\src\features\materiels\supervision\MaterielSupervisionService.ts:2 MaterielSupervisionService {
C:\Users\Admin\terragest\src\features\materiels\tests\MaterielService.test.ts:2 "MaterielService",
C:\Users\Admin\terragest\src\features\memberships\services\MembershipService.ts:7 export const MembershipService = {
C:\Users\Admin\terragest\src\features\mouvements\services\MouvementService.ts:5 import { StockService } from "@/services/StockService";
C:\Users\Admin\terragest\src\features\mouvements\services\MouvementService.ts:7 export const MouvementService = {
C:\Users\Admin\terragest\src\features\mouvements\services\MouvementService.ts:13 await StockService.applyMouvement(
C:\Users\Admin\terragest\src\features\notifications\hooks\useNotifications.ts:12 import { NotificationService }
C:\Users\Admin\terragest\src\features\notifications\hooks\useNotifications.ts:13 from "@/features/notifications/services/NotificationService";
C:\Users\Admin\terragest\src\features\notifications\hooks\useNotifications.ts:29 await NotificationService
C:\Users\Admin\terragest\src\features\notifications\services\createStockAlert.ts:1 import { NotificationService }
C:\Users\Admin\terragest\src\features\notifications\services\createStockAlert.ts:2 from "@/features/notifications/services/NotificationService";
C:\Users\Admin\terragest\src\features\notifications\services\createStockAlert.ts:10 await NotificationService.create({
C:\Users\Admin\terragest\src\features\notifications\services\NotificationService.ts:44 export const NotificationService = {
C:\Users\Admin\terragest\src\features\observability\hooks\useAuditEvents.ts:12 import { AuditService }
C:\Users\Admin\terragest\src\features\observability\hooks\useAuditEvents.ts:13 from "@/features/observability/services/AuditService";
C:\Users\Admin\terragest\src\features\observability\hooks\useAuditEvents.ts:29 await AuditService
C:\Users\Admin\terragest\src\features\observability\hooks\useRuntimeHealth.ts:7 import { RuntimeObservabilityService }
C:\Users\Admin\terragest\src\features\observability\hooks\useRuntimeHealth.ts:8 from "../services/RuntimeObservabilityService";
C:\Users\Admin\terragest\src\features\observability\hooks\useRuntimeHealth.ts:19 const service =
C:\Users\Admin\terragest\src\features\observability\hooks\useRuntimeHealth.ts:20 new RuntimeObservabilityService();
C:\Users\Admin\terragest\src\features\observability\hooks\useRuntimeHealth.ts:22 service
C:\Users\Admin\terragest\src\features\observability\services\AuditService.ts:8 export const AuditService = {
C:\Users\Admin\terragest\src\features\observability\services\RuntimeObservabilityService.ts:4 export class RuntimeObservabilityService {
C:\Users\Admin\terragest\src\features\observability\services\live\LiveObservabilityService.ts:19 export class LiveObservabilityService {
C:\Users\Admin\terragest\src\features\observability\services\workflows\WorkflowExecutionRealtimeService.ts:19 WorkflowExecutionRealtimeService {
C:\Users\Admin\terragest\src\features\observability\widgets\live\LiveEventStream.tsx:16 LiveObservabilityService
C:\Users\Admin\terragest\src\features\observability\widgets\live\LiveEventStream.tsx:18 from "../../services/live/LiveObservabilityService";
C:\Users\Admin\terragest\src\features\observability\widgets\live\LiveEventStream.tsx:30 const service =
C:\Users\Admin\terragest\src\features\observability\widgets\live\LiveEventStream.tsx:31 new LiveObservabilityService();
C:\Users\Admin\terragest\src\features\observability\widgets\live\LiveEventStream.tsx:34 service.subscribeToRuntimeEvents();
C:\Users\Admin\terragest\src\features\observability\widgets\workflows\WorkflowExecutionMonitor.tsx:15 WorkflowExecutionRealtimeService
C:\Users\Admin\terragest\src\features\observability\widgets\workflows\WorkflowExecutionMonitor.tsx:17 from "../../services/workflows/WorkflowExecutionRealtimeService";
C:\Users\Admin\terragest\src\features\observability\widgets\workflows\WorkflowExecutionMonitor.tsx:23 const service =
C:\Users\Admin\terragest\src\features\observability\widgets\workflows\WorkflowExecutionMonitor.tsx:24 new WorkflowExecutionRealtimeService();
C:\Users\Admin\terragest\src\features\observability\widgets\workflows\WorkflowExecutionMonitor.tsx:27 service.subscribe();
C:\Users\Admin\terragest\src\features\offline\components\OfflineSyncCard.tsx:7 import { SyncService }
C:\Users\Admin\terragest\src\features\offline\components\OfflineSyncCard.tsx:8 from "@/features/offline/sync/SyncService";
C:\Users\Admin\terragest\src\features\offline\components\OfflineSyncCard.tsx:32 await SyncService.sync();
C:\Users\Admin\terragest\src\features\offline\sync\SyncService.ts:5 export const SyncService = {
C:\Users\Admin\terragest\src\features\organisations\services\OrganisationService.ts:12 export const OrganisationService = {
C:\Users\Admin\terragest\src\features\organization-analytics\components\OrganizationAnalyticsCards.tsx:8 import { OrganizationAnalyticsService }
C:\Users\Admin\terragest\src\features\organization-analytics\components\OrganizationAnalyticsCards.tsx:9 from "@/features/organization-analytics/services/OrganizationAnalyticsService";
C:\Users\Admin\terragest\src\features\organization-analytics\components\OrganizationAnalyticsCards.tsx:22 await OrganizationAnalyticsService
C:\Users\Admin\terragest\src\features\organization-analytics\components\PlanUsageCard.tsx:8 import { OrganizationAnalyticsService }
C:\Users\Admin\terragest\src\features\organization-analytics\components\PlanUsageCard.tsx:9 from "@/features/organization-analytics/services/OrganizationAnalyticsService";
C:\Users\Admin\terragest\src\features\organization-analytics\components\PlanUsageCard.tsx:22 await OrganizationAnalyticsService
C:\Users\Admin\terragest\src\features\organization-analytics\services\OrganizationAnalyticsService.ts:1 import { BillingService }
C:\Users\Admin\terragest\src\features\organization-analytics\services\OrganizationAnalyticsService.ts:2 from "@/features/billing/services/BillingService";
C:\Users\Admin\terragest\src\features\organization-analytics\services\OrganizationAnalyticsService.ts:4 export const OrganizationAnalyticsService = {
C:\Users\Admin\terragest\src\features\organization-analytics\services\OrganizationAnalyticsService.ts:25 BillingService.getPlanLimits(
C:\Users\Admin\terragest\src\features\organizations\services\OrganizationService.ts:7 export const OrganizationService = {
C:\Users\Admin\terragest\src\features\payments\components\CheckoutButton.tsx:11 import { PaymentService }
C:\Users\Admin\terragest\src\features\payments\components\CheckoutButton.tsx:12 from "@/features/payments/services/PaymentService";
C:\Users\Admin\terragest\src\features\payments\components\CheckoutButton.tsx:33 await PaymentService
C:\Users\Admin\terragest\src\features\payments\services\PaymentService.ts:6 export const PaymentService = {
C:\Users\Admin\terragest\src\features\produits\components\ProductForm.tsx:9 import { ProductService }
C:\Users\Admin\terragest\src\features\produits\components\ProductForm.tsx:10 from "@/features/produits/services/ProductService";
C:\Users\Admin\terragest\src\features\produits\components\ProductForm.tsx:36 await ProductService.create({
C:\Users\Admin\terragest\src\features\produits\services\ProductService.ts:7 export const ProductService = {
C:\Users\Admin\terragest\src\features\produits\services\ProduitService.ts:9 export const ProduitService = {
C:\Users\Admin\terragest\src\features\ressources\services\RessourceService.ts:17 export const RessourceService = {
C:\Users\Admin\terragest\src\features\stocks\services\StockService.ts:8 StockService = {
C:\Users\Admin\terragest\src\features\superadmin\services\SuperAdminService.ts:8 export const SuperAdminService = {
C:\Users\Admin\terragest\src\features\teams\components\TeamMembersTable.tsx:11 import { TeamService }
C:\Users\Admin\terragest\src\features\teams\components\TeamMembersTable.tsx:12 from "@/features/teams/services/TeamService";
C:\Users\Admin\terragest\src\features\teams\components\TeamMembersTable.tsx:23 await TeamService.getMembers();
C:\Users\Admin\terragest\src\features\teams\components\TeamMembersTable.tsx:38 await TeamService.removeMember(
C:\Users\Admin\terragest\src\features\teams\components\TeamMembersTable.tsx:50 await TeamService.updateRole(
C:\Users\Admin\terragest\src\features\teams\services\TeamService.ts:10 export const TeamService = {
C:\Users\Admin\terragest\src\features\tenancy\context\TenantProvider.tsx:12 TenantService,
C:\Users\Admin\terragest\src\features\tenancy\context\TenantProvider.tsx:14 } from "@/features/tenancy/services/TenantService";
C:\Users\Admin\terragest\src\features\tenancy\context\TenantProvider.tsx:63 ...TenantService.buildContext(
C:\Users\Admin\terragest\src\features\tenancy\services\TenantService.ts:25 export const TenantService = {
C:\Users\Admin\terragest\src\features\terrains\services\TerrainService.ts:17 export const TerrainService = {
C:\Users\Admin\terragest\src\features\workflow-engine\services\ProcessOrchestrator.ts:1 import { EventBus } from "@/features/workflow-engine/services/EventBus";
C:\Users\Admin\terragest\src\platform\auth\AuthService.ts:1 // src/platform/auth/AuthService.ts
C:\Users\Admin\terragest\src\platform\auth\AuthService.ts:8 export class AuthService {
C:\Users\Admin\terragest\src\platform\factories\createModuleService.ts:1 // src/platform/factories/createModuleService.ts
C:\Users\Admin\terragest\src\platform\factories\createModuleService.ts:9 export function createModuleService(
C:\Users\Admin\terragest\src\platform\intelligence\AutoHealingService.ts:1 // src/platform/intelligence/AutoHealingService.ts
C:\Users\Admin\terragest\src\platform\intelligence\AutoHealingService.ts:6 export class AutoHealingService {
C:\Users\Admin\terragest\src\platform\intelligence\OperationalIntelligenceScheduler.ts:6 import { AutoHealingService }
C:\Users\Admin\terragest\src\platform\intelligence\OperationalIntelligenceScheduler.ts:7 from "@/platform/intelligence/AutoHealingService";
C:\Users\Admin\terragest\src\platform\intelligence\OperationalIntelligenceScheduler.ts:23 AutoHealingService
C:\Users\Admin\terragest\src\platform\monitoring\ERPMonitoringService.ts:1 // src/platform/monitoring/ERPMonitoringService.ts
C:\Users\Admin\terragest\src\platform\monitoring\ERPMonitoringService.ts:12 export class ERPMonitoringService {
C:\Users\Admin\terragest\src\platform\persistence\RuntimePersistenceService.ts:1 // src/platform/persistence/RuntimePersistenceService.ts
C:\Users\Admin\terragest\src\platform\persistence\RuntimePersistenceService.ts:9 export class RuntimePersistenceService {
C:\Users\Admin\terragest\src\platform\persistence\RuntimeRecoveryScheduler.ts:3 import { RuntimePersistenceService }
C:\Users\Admin\terragest\src\platform\persistence\RuntimeRecoveryScheduler.ts:4 from "@/platform/persistence/RuntimePersistenceService";
C:\Users\Admin\terragest\src\platform\persistence\RuntimeRecoveryScheduler.ts:17 RuntimePersistenceService
C:\Users\Admin\terragest\src\runtime\data\ERPModuleDataService.ts:6 export class ERPModuleDataService {
C:\Users\Admin\terragest\src\runtime\data\ERPModuleDataService.ts:67 export const erpModuleDataService =
C:\Users\Admin\terragest\src\runtime\data\ERPModuleDataService.ts:68 new ERPModuleDataService();
C:\Users\Admin\terragest\src\runtime\data\ERPModuleRuntimeDataBridge.ts:6 erpModuleDataService,
C:\Users\Admin\terragest\src\runtime\data\ERPModuleRuntimeDataBridge.ts:7 } from "./ERPModuleDataService";
C:\Users\Admin\terragest\src\runtime\data\ERPModuleRuntimeDataBridge.ts:24 return erpModuleDataService
C:\Users\Admin\terragest\src\runtime\data\ERPModuleRuntimeDataBridge.ts:33 return erpModuleDataService
C:\Users\Admin\terragest\src\runtime\data\index.ts:2 export * from "./ERPModuleDataService";
C:\Users\Admin\terragest\src\runtime\enterprise-runtime\EnterpriseRuntimeDiagnostics.ts:5 const services = EnterpriseRuntimeKernel.status();
C:\Users\Admin\terragest\src\runtime\enterprise-runtime\EnterpriseRuntimeDiagnostics.ts:7 const healthy = services.filter((service) => service.status === "healthy").length;
C:\Users\Admin\terragest\src\runtime\enterprise-runtime\EnterpriseRuntimeDiagnostics.ts:8 const warning = services.filter((service) => service.status === "warning").length;
C:\Users\Admin\terragest\src\runtime\enterprise-runtime\EnterpriseRuntimeDiagnostics.ts:9 const critical = services.filter((service) => service.status === "critical").length;
C:\Users\Admin\terragest\src\runtime\enterprise-runtime\EnterpriseRuntimeDiagnostics.ts:12 total: services.length,
C:\Users\Admin\terragest\src\runtime\enterprise-runtime\EnterpriseRuntimeDiagnostics.ts:16 score: Math.round((healthy / services.length) * 100),
C:\Users\Admin\terragest\src\runtime\enterprise-runtime\EnterpriseRuntimeDiagnostics.ts:17 services,
C:\Users\Admin\terragest\src\runtime\monitoring\RuntimeEventPublisher.ts:11 LiveObservabilityService
C:\Users\Admin\terragest\src\runtime\monitoring\RuntimeEventPublisher.ts:13 from "../../features/observability/services/live/LiveObservabilityService";
C:\Users\Admin\terragest\src\runtime\monitoring\RuntimeEventPublisher.ts:17 private service =
C:\Users\Admin\terragest\src\runtime\monitoring\RuntimeEventPublisher.ts:18 new LiveObservabilityService();
C:\Users\Admin\terragest\src\runtime\monitoring\RuntimeEventPublisher.ts:40 this.service.publish(
C:\Users\Admin\terragest\src\runtime\orchestration\RuntimeModuleOrchestrator.ts:4 from "../core/services/RuntimePublisher";
C:\Users\Admin\terragest\src\runtime\persistence\ERPPersistenceSeed.ts:2 ERPRuntimePersistenceService,
C:\Users\Admin\terragest\src\runtime\persistence\ERPPersistenceSeed.ts:3 } from "./stores/ERPRuntimePersistenceService";
C:\Users\Admin\terragest\src\runtime\persistence\ERPPersistenceSeed.ts:14 await ERPRuntimePersistenceService.events.save({
C:\Users\Admin\terragest\src\runtime\persistence\ERPPersistenceSeed.ts:20 await ERPRuntimePersistenceService.traces.save({
C:\Users\Admin\terragest\src\runtime\persistence\ERPPersistenceSeed.ts:26 await ERPRuntimePersistenceService.alerts.save({
C:\Users\Admin\terragest\src\runtime\persistence\ERPPersistenceSeed.ts:32 await ERPRuntimePersistenceService.workflows.save({
C:\Users\Admin\terragest\src\runtime\persistence\ERPPersistenceSeed.ts:37 await ERPRuntimePersistenceService.queueJobs.save({
C:\Users\Admin\terragest\src\runtime\persistence\ERPPersistenceSeed.ts:43 await ERPRuntimePersistenceService.audit.save({
C:\Users\Admin\terragest\src\runtime\persistence\ERPPersistenceSeed.ts:49 await ERPRuntimePersistenceService.securityAudit.save({
C:\Users\Admin\terragest\src\runtime\persistence\index.ts:5 export * from "./stores/ERPRuntimePersistenceService";
C:\Users\Admin\terragest\src\runtime\persistence\snapshots\ERPPersistenceSnapshot.ts:2 ERPRuntimePersistenceService,
C:\Users\Admin\terragest\src\runtime\persistence\snapshots\ERPPersistenceSnapshot.ts:3 } from "../stores/ERPRuntimePersistenceService";
C:\Users\Admin\terragest\src\runtime\persistence\snapshots\ERPPersistenceSnapshot.ts:15 ERPRuntimePersistenceService.events.list(),
C:\Users\Admin\terragest\src\runtime\persistence\snapshots\ERPPersistenceSnapshot.ts:16 ERPRuntimePersistenceService.traces.list(),
C:\Users\Admin\terragest\src\runtime\persistence\snapshots\ERPPersistenceSnapshot.ts:17 ERPRuntimePersistenceService.alerts.list(),
C:\Users\Admin\terragest\src\runtime\persistence\snapshots\ERPPersistenceSnapshot.ts:18 ERPRuntimePersistenceService.workflows.list(),
C:\Users\Admin\terragest\src\runtime\persistence\snapshots\ERPPersistenceSnapshot.ts:19 ERPRuntimePersistenceService.queueJobs.list(),
C:\Users\Admin\terragest\src\runtime\persistence\snapshots\ERPPersistenceSnapshot.ts:20 ERPRuntimePersistenceService.audit.list(),
C:\Users\Admin\terragest\src\runtime\persistence\snapshots\ERPPersistenceSnapshot.ts:21 ERPRuntimePersistenceService.securityAudit.list(),
C:\Users\Admin\terragest\src\runtime\persistence\stores\ERPRuntimePersistenceService.ts:9 export const ERPRuntimePersistenceService = {
C:\Users\Admin\terragest\src\runtime\realtime\gateway\RuntimeRealtimeGateway.ts:7 LiveNotificationService
C:\Users\Admin\terragest\src\runtime\realtime\gateway\RuntimeRealtimeGateway.ts:9 from "../notifications/LiveNotificationService";
C:\Users\Admin\terragest\src\runtime\realtime\gateway\RuntimeRealtimeGateway.ts:18 new LiveNotificationService();
C:\Users\Admin\terragest\src\runtime\realtime\notifications\LiveNotificationService.ts:2 LiveNotificationService {
C:\Users\Admin\terragest\src\runtime\state\runtimeStates.ts:121 "hors_service",
C:\Users\Admin\terragest\src\runtime\state\runtimeStates.ts:124 "Hors service",
C:\Users\Admin\terragest\src\runtime\workflow-persistence\WorkflowRuntimeService.ts:6 export class WorkflowRuntimeService {
C:\Users\Admin\terragest\src\runtime\workflow-runtime\WorkflowRuntimeDefinitions.ts:14 { key: "service", label: "Retour service" },
C:\Users\Admin\terragest\src\runtime\workflow-runtime\WorkflowRuntimeDefinitions.ts:20 { from: "repair", to: "service", label: "Retour en service" },
C:\Users\Admin\terragest\src\saas\deployment\DeploymentService.ts:1 export const DeploymentService = {
C:\Users\Admin\terragest\src\saas\features\FeatureFlagService.ts:1 export const FeatureFlagService = {
C:\Users\Admin\terragest\src\saas\monitoring\CloudMonitoringService.ts:1 export const CloudMonitoringService = {
C:\Users\Admin\terragest\src\saas\monitoring\MonitoringService.ts:1 export const MonitoringService = {
C:\Users\Admin\terragest\src\saas\services\SaaSOrchestrationService.ts:2 TenantService,
C:\Users\Admin\terragest\src\saas\services\SaaSOrchestrationService.ts:3 } from "@/saas/tenants/TenantService";
C:\Users\Admin\terragest\src\saas\services\SaaSOrchestrationService.ts:6 SubscriptionService,
C:\Users\Admin\terragest\src\saas\services\SaaSOrchestrationService.ts:7 } from "@/saas/subscriptions/SubscriptionService";
C:\Users\Admin\terragest\src\saas\services\SaaSOrchestrationService.ts:10 FeatureFlagService,
C:\Users\Admin\terragest\src\saas\services\SaaSOrchestrationService.ts:11 } from "@/saas/features/FeatureFlagService";
C:\Users\Admin\terragest\src\saas\services\SaaSOrchestrationService.ts:13 export const SaaSOrchestrationService = {
C:\Users\Admin\terragest\src\saas\services\SaaSOrchestrationService.ts:20 TenantService.resolveTenant(
C:\Users\Admin\terragest\src\saas\services\SaaSOrchestrationService.ts:25 SubscriptionService.getSubscription(
C:\Users\Admin\terragest\src\saas\services\SaaSOrchestrationService.ts:38 FeatureFlagService.hasFeature(
C:\Users\Admin\terragest\src\saas\services\SaaSOrchestrationService.ts:43 FeatureFlagService.hasFeature(
C:\Users\Admin\terragest\src\saas\services\SaaSOrchestrationService.ts:48 FeatureFlagService.hasFeature(
C:\Users\Admin\terragest\src\saas\subscriptions\SubscriptionService.ts:1 export const SubscriptionService = {
C:\Users\Admin\terragest\src\saas\tenants\TenantService.ts:1 export const TenantService = {
C:\Users\Admin\terragest\src\security\audit\AuditService.ts:1 export const AuditService = {
C:\Users\Admin\terragest\src\services\AuthService.ts:1 export const AuthService = {
C:\Users\Admin\terragest\src\services\StockService.ts:9 export const StockService = {
C:\Users\Admin\terragest\src\services\UtilisateurService.ts:12 export const UtilisateurService = {
C:\Users\Admin\terragest\src\shared\services\BaseCrudService.ts:1 export class BaseCrudService<T> {
C:\Users\Admin\terragest\src\shared\services\ProductService.ts:1 import { BaseCrudService } from "@/shared/services/BaseCrudService";
C:\Users\Admin\terragest\src\shared\services\ProductService.ts:7 export class ProductService
C:\Users\Admin\terragest\src\shared\services\ProductService.ts:8 extends BaseCrudService<Product> {
C:\Users\Admin\terragest\src\shared\validators\ValidationService.ts:1 export const ValidationService = {
C:\Users\Admin\terragest\src\_quarantine\modules\alertes\index.ts:3 export * from "./services/AlertesService";
C:\Users\Admin\terragest\src\_quarantine\modules\alertes\hooks\useAlertes.ts:5 import { AlertesService } from "../services/AlertesService";
C:\Users\Admin\terragest\src\_quarantine\modules\alertes\hooks\useAlertes.ts:7 const service = new AlertesService();
C:\Users\Admin\terragest\src\_quarantine\modules\alertes\hooks\useAlertes.ts:12 queryFn: () => service.findAll(),
C:\Users\Admin\terragest\src\_quarantine\modules\alertes\hooks\useCreateAlertes.ts:7 import { AlertesService } from "../services/AlertesService";
C:\Users\Admin\terragest\src\_quarantine\modules\alertes\hooks\useCreateAlertes.ts:9 const service = new AlertesService();
C:\Users\Admin\terragest\src\_quarantine\modules\alertes\hooks\useCreateAlertes.ts:14 service.create(data),
C:\Users\Admin\terragest\src\_quarantine\modules\alertes\hooks\useDeleteAlertes.ts:7 import { AlertesService } from "../services/AlertesService";
C:\Users\Admin\terragest\src\_quarantine\modules\alertes\hooks\useDeleteAlertes.ts:9 const service = new AlertesService();
C:\Users\Admin\terragest\src\_quarantine\modules\alertes\hooks\useDeleteAlertes.ts:14 service.delete(id),
C:\Users\Admin\terragest\src\_quarantine\modules\alertes\hooks\useUpdateAlertes.ts:7 import { AlertesService } from "../services/AlertesService";
C:\Users\Admin\terragest\src\_quarantine\modules\alertes\hooks\useUpdateAlertes.ts:9 const service = new AlertesService();
C:\Users\Admin\terragest\src\_quarantine\modules\alertes\hooks\useUpdateAlertes.ts:20 service.update(id, data),
C:\Users\Admin\terragest\src\_quarantine\modules\alertes\services\AlertesService.ts:3 export class AlertesService {
C:\Users\Admin\terragest\src\_quarantine\modules\alertes\tests\AlertesService.test.ts:3 describe("AlertesService", () => {
C:\Users\Admin\terragest\src\_quarantine\modules\analytics\index.ts:3 export * from "./services/AnalyticsService";
C:\Users\Admin\terragest\src\_quarantine\modules\analytics\hooks\useAnalytics.ts:5 import { AnalyticsService } from "../services/AnalyticsService";
C:\Users\Admin\terragest\src\_quarantine\modules\analytics\hooks\useAnalytics.ts:7 const service = new AnalyticsService();
C:\Users\Admin\terragest\src\_quarantine\modules\analytics\hooks\useAnalytics.ts:12 queryFn: () => service.findAll(),
C:\Users\Admin\terragest\src\_quarantine\modules\analytics\hooks\useCreateAnalytics.ts:7 import { AnalyticsService } from "../services/AnalyticsService";
C:\Users\Admin\terragest\src\_quarantine\modules\analytics\hooks\useCreateAnalytics.ts:9 const service = new AnalyticsService();
C:\Users\Admin\terragest\src\_quarantine\modules\analytics\hooks\useCreateAnalytics.ts:14 service.create(data),
C:\Users\Admin\terragest\src\_quarantine\modules\analytics\hooks\useDeleteAnalytics.ts:7 import { AnalyticsService } from "../services/AnalyticsService";
C:\Users\Admin\terragest\src\_quarantine\modules\analytics\hooks\useDeleteAnalytics.ts:9 const service = new AnalyticsService();
C:\Users\Admin\terragest\src\_quarantine\modules\analytics\hooks\useDeleteAnalytics.ts:14 service.delete(id),
C:\Users\Admin\terragest\src\_quarantine\modules\analytics\hooks\useUpdateAnalytics.ts:7 import { AnalyticsService } from "../services/AnalyticsService";
C:\Users\Admin\terragest\src\_quarantine\modules\analytics\hooks\useUpdateAnalytics.ts:9 const service = new AnalyticsService();
C:\Users\Admin\terragest\src\_quarantine\modules\analytics\hooks\useUpdateAnalytics.ts:20 service.update(id, data),
C:\Users\Admin\terragest\src\_quarantine\modules\analytics\services\AnalyticsService.ts:3 export class AnalyticsService {
C:\Users\Admin\terragest\src\_quarantine\modules\analytics\tests\AnalyticsService.test.ts:3 describe("AnalyticsService", () => {
C:\Users\Admin\terragest\src\_quarantine\modules\clients\index.ts:3 export * from "./services/ClientsService";
C:\Users\Admin\terragest\src\_quarantine\modules\clients\hooks\useClients.ts:5 import { ClientsService } from "../services/ClientsService";
C:\Users\Admin\terragest\src\_quarantine\modules\clients\hooks\useClients.ts:7 const service = new ClientsService();
C:\Users\Admin\terragest\src\_quarantine\modules\clients\hooks\useClients.ts:12 queryFn: () => service.findAll(),
C:\Users\Admin\terragest\src\_quarantine\modules\clients\hooks\useCreateClients.ts:7 import { ClientsService } from "../services/ClientsService";
C:\Users\Admin\terragest\src\_quarantine\modules\clients\hooks\useCreateClients.ts:9 const service = new ClientsService();
C:\Users\Admin\terragest\src\_quarantine\modules\clients\hooks\useCreateClients.ts:14 service.create(data),
C:\Users\Admin\terragest\src\_quarantine\modules\clients\hooks\useDeleteClients.ts:7 import { ClientsService } from "../services/ClientsService";
C:\Users\Admin\terragest\src\_quarantine\modules\clients\hooks\useDeleteClients.ts:9 const service = new ClientsService();
C:\Users\Admin\terragest\src\_quarantine\modules\clients\hooks\useDeleteClients.ts:14 service.delete(id),
C:\Users\Admin\terragest\src\_quarantine\modules\clients\hooks\useUpdateClients.ts:7 import { ClientsService } from "../services/ClientsService";
C:\Users\Admin\terragest\src\_quarantine\modules\clients\hooks\useUpdateClients.ts:9 const service = new ClientsService();
C:\Users\Admin\terragest\src\_quarantine\modules\clients\hooks\useUpdateClients.ts:20 service.update(id, data),
C:\Users\Admin\terragest\src\_quarantine\modules\clients\services\ClientsService.ts:3 export class ClientsService {
C:\Users\Admin\terragest\src\_quarantine\modules\clients\tests\ClientsService.test.ts:3 describe("ClientsService", () => {
C:\Users\Admin\terragest\src\_quarantine\modules\contrats\index.ts:3 export * from "./services/ContratsService";
C:\Users\Admin\terragest\src\_quarantine\modules\contrats\hooks\useContrats.ts:5 import { ContratsService } from "../services/ContratsService";
C:\Users\Admin\terragest\src\_quarantine\modules\contrats\hooks\useContrats.ts:7 const service = new ContratsService();
C:\Users\Admin\terragest\src\_quarantine\modules\contrats\hooks\useContrats.ts:12 queryFn: () => service.findAll(),
C:\Users\Admin\terragest\src\_quarantine\modules\contrats\hooks\useCreateContrats.ts:7 import { ContratsService } from "../services/ContratsService";
C:\Users\Admin\terragest\src\_quarantine\modules\contrats\hooks\useCreateContrats.ts:9 const service = new ContratsService();
C:\Users\Admin\terragest\src\_quarantine\modules\contrats\hooks\useCreateContrats.ts:14 service.create(data),
C:\Users\Admin\terragest\src\_quarantine\modules\contrats\hooks\useDeleteContrats.ts:7 import { ContratsService } from "../services/ContratsService";
C:\Users\Admin\terragest\src\_quarantine\modules\contrats\hooks\useDeleteContrats.ts:9 const service = new ContratsService();
C:\Users\Admin\terragest\src\_quarantine\modules\contrats\hooks\useDeleteContrats.ts:14 service.delete(id),
C:\Users\Admin\terragest\src\_quarantine\modules\contrats\hooks\useUpdateContrats.ts:7 import { ContratsService } from "../services/ContratsService";
C:\Users\Admin\terragest\src\_quarantine\modules\contrats\hooks\useUpdateContrats.ts:9 const service = new ContratsService();
C:\Users\Admin\terragest\src\_quarantine\modules\contrats\hooks\useUpdateContrats.ts:20 service.update(id, data),
C:\Users\Admin\terragest\src\_quarantine\modules\contrats\services\ContratsService.ts:3 export class ContratsService {
C:\Users\Admin\terragest\src\_quarantine\modules\contrats\services\Service.ts:3 export class Service {
C:\Users\Admin\terragest\src\_quarantine\modules\contrats\tests\ContratsService.test.ts:3 describe("ContratsService", () => {
C:\Users\Admin\terragest\src\_quarantine\modules\contrats\tests\Service.test.ts:3 describe("Service", () => {
C:\Users\Admin\terragest\src\_quarantine\modules\exploitations\index.ts:3 export * from "./services/ExploitationsService";
C:\Users\Admin\terragest\src\_quarantine\modules\exploitations\hooks\useCreateExploitations.ts:7 import { ExploitationsService } from "../services/ExploitationsService";
C:\Users\Admin\terragest\src\_quarantine\modules\exploitations\hooks\useCreateExploitations.ts:9 const service = new ExploitationsService();
C:\Users\Admin\terragest\src\_quarantine\modules\exploitations\hooks\useCreateExploitations.ts:14 service.create(data),
C:\Users\Admin\terragest\src\_quarantine\modules\exploitations\hooks\useDeleteExploitations.ts:7 import { ExploitationsService } from "../services/ExploitationsService";
C:\Users\Admin\terragest\src\_quarantine\modules\exploitations\hooks\useDeleteExploitations.ts:9 const service = new ExploitationsService();
C:\Users\Admin\terragest\src\_quarantine\modules\exploitations\hooks\useDeleteExploitations.ts:14 service.delete(id),
C:\Users\Admin\terragest\src\_quarantine\modules\exploitations\hooks\useExploitations.ts:5 import { ExploitationsService } from "../services/ExploitationsService";
C:\Users\Admin\terragest\src\_quarantine\modules\exploitations\hooks\useExploitations.ts:7 const service = new ExploitationsService();
C:\Users\Admin\terragest\src\_quarantine\modules\exploitations\hooks\useExploitations.ts:12 queryFn: () => service.findAll(),
C:\Users\Admin\terragest\src\_quarantine\modules\exploitations\hooks\useUpdateExploitations.ts:7 import { ExploitationsService } from "../services/ExploitationsService";
C:\Users\Admin\terragest\src\_quarantine\modules\exploitations\hooks\useUpdateExploitations.ts:9 const service = new ExploitationsService();
C:\Users\Admin\terragest\src\_quarantine\modules\exploitations\hooks\useUpdateExploitations.ts:20 service.update(id, data),
C:\Users\Admin\terragest\src\_quarantine\modules\exploitations\services\ExploitationsService.ts:3 export class ExploitationsService {
C:\Users\Admin\terragest\src\_quarantine\modules\exploitations\tests\ExploitationsService.test.ts:3 describe("ExploitationsService", () => {
C:\Users\Admin\terragest\src\_quarantine\modules\factures\index.ts:3 export * from "./services/FacturesService";
C:\Users\Admin\terragest\src\_quarantine\modules\factures\hooks\useCreateFactures.ts:7 import { FacturesService } from "../services/FacturesService";
C:\Users\Admin\terragest\src\_quarantine\modules\factures\hooks\useCreateFactures.ts:9 const service = new FacturesService();
C:\Users\Admin\terragest\src\_quarantine\modules\factures\hooks\useCreateFactures.ts:14 service.create(data),
C:\Users\Admin\terragest\src\_quarantine\modules\factures\hooks\useDeleteFactures.ts:7 import { FacturesService } from "../services/FacturesService";
C:\Users\Admin\terragest\src\_quarantine\modules\factures\hooks\useDeleteFactures.ts:9 const service = new FacturesService();
C:\Users\Admin\terragest\src\_quarantine\modules\factures\hooks\useDeleteFactures.ts:14 service.delete(id),
C:\Users\Admin\terragest\src\_quarantine\modules\factures\hooks\useFactures.ts:5 import { FacturesService } from "../services/FacturesService";
C:\Users\Admin\terragest\src\_quarantine\modules\factures\hooks\useFactures.ts:7 const service = new FacturesService();
C:\Users\Admin\terragest\src\_quarantine\modules\factures\hooks\useFactures.ts:12 queryFn: () => service.findAll(),
C:\Users\Admin\terragest\src\_quarantine\modules\factures\hooks\useUpdateFactures.ts:7 import { FacturesService } from "../services/FacturesService";
C:\Users\Admin\terragest\src\_quarantine\modules\factures\hooks\useUpdateFactures.ts:9 const service = new FacturesService();
C:\Users\Admin\terragest\src\_quarantine\modules\factures\hooks\useUpdateFactures.ts:20 service.update(id, data),
C:\Users\Admin\terragest\src\_quarantine\modules\factures\services\FacturesService.ts:3 export class FacturesService {
C:\Users\Admin\terragest\src\_quarantine\modules\factures\tests\FacturesService.test.ts:3 describe("FacturesService", () => {
C:\Users\Admin\terragest\src\_quarantine\modules\fournisseurs\index.ts:3 export * from "./services/FournisseursService";
C:\Users\Admin\terragest\src\_quarantine\modules\fournisseurs\hooks\useCreateFournisseurs.ts:7 import { FournisseursService } from "../services/FournisseursService";
C:\Users\Admin\terragest\src\_quarantine\modules\fournisseurs\hooks\useCreateFournisseurs.ts:9 const service = new FournisseursService();
C:\Users\Admin\terragest\src\_quarantine\modules\fournisseurs\hooks\useCreateFournisseurs.ts:14 service.create(data),
C:\Users\Admin\terragest\src\_quarantine\modules\fournisseurs\hooks\useDeleteFournisseurs.ts:7 import { FournisseursService } from "../services/FournisseursService";
C:\Users\Admin\terragest\src\_quarantine\modules\fournisseurs\hooks\useDeleteFournisseurs.ts:9 const service = new FournisseursService();
C:\Users\Admin\terragest\src\_quarantine\modules\fournisseurs\hooks\useDeleteFournisseurs.ts:14 service.delete(id),
C:\Users\Admin\terragest\src\_quarantine\modules\fournisseurs\hooks\useFournisseurs.ts:5 import { FournisseursService } from "../services/FournisseursService";
C:\Users\Admin\terragest\src\_quarantine\modules\fournisseurs\hooks\useFournisseurs.ts:7 const service = new FournisseursService();
C:\Users\Admin\terragest\src\_quarantine\modules\fournisseurs\hooks\useFournisseurs.ts:12 queryFn: () => service.findAll(),
C:\Users\Admin\terragest\src\_quarantine\modules\fournisseurs\hooks\useUpdateFournisseurs.ts:7 import { FournisseursService } from "../services/FournisseursService";
C:\Users\Admin\terragest\src\_quarantine\modules\fournisseurs\hooks\useUpdateFournisseurs.ts:9 const service = new FournisseursService();
C:\Users\Admin\terragest\src\_quarantine\modules\fournisseurs\hooks\useUpdateFournisseurs.ts:20 service.update(id, data),
C:\Users\Admin\terragest\src\_quarantine\modules\fournisseurs\services\FournisseursService.ts:3 export class FournisseursService {
C:\Users\Admin\terragest\src\_quarantine\modules\fournisseurs\services\Service.ts:3 export class Service {
C:\Users\Admin\terragest\src\_quarantine\modules\fournisseurs\tests\FournisseursService.test.ts:3 describe("FournisseursService", () => {
C:\Users\Admin\terragest\src\_quarantine\modules\fournisseurs\tests\Service.test.ts:3 describe("Service", () => {
C:\Users\Admin\terragest\src\_quarantine\modules\interventions\index.ts:3 export * from "./services/InterventionsService";
C:\Users\Admin\terragest\src\_quarantine\modules\interventions\hooks\useCreateInterventions.ts:7 import { InterventionsService } from "../services/InterventionsService";
C:\Users\Admin\terragest\src\_quarantine\modules\interventions\hooks\useCreateInterventions.ts:9 const service = new InterventionsService();
C:\Users\Admin\terragest\src\_quarantine\modules\interventions\hooks\useCreateInterventions.ts:14 service.create(data),
C:\Users\Admin\terragest\src\_quarantine\modules\interventions\hooks\useDeleteInterventions.ts:7 import { InterventionsService } from "../services/InterventionsService";
C:\Users\Admin\terragest\src\_quarantine\modules\interventions\hooks\useDeleteInterventions.ts:9 const service = new InterventionsService();
C:\Users\Admin\terragest\src\_quarantine\modules\interventions\hooks\useDeleteInterventions.ts:14 service.delete(id),
C:\Users\Admin\terragest\src\_quarantine\modules\interventions\hooks\useInterventions.ts:5 import { InterventionsService } from "../services/InterventionsService";
C:\Users\Admin\terragest\src\_quarantine\modules\interventions\hooks\useInterventions.ts:7 const service = new InterventionsService();
C:\Users\Admin\terragest\src\_quarantine\modules\interventions\hooks\useInterventions.ts:12 queryFn: () => service.findAll(),
C:\Users\Admin\terragest\src\_quarantine\modules\interventions\hooks\useUpdateInterventions.ts:7 import { InterventionsService } from "../services/InterventionsService";
C:\Users\Admin\terragest\src\_quarantine\modules\interventions\hooks\useUpdateInterventions.ts:9 const service = new InterventionsService();
C:\Users\Admin\terragest\src\_quarantine\modules\interventions\hooks\useUpdateInterventions.ts:20 service.update(id, data),
C:\Users\Admin\terragest\src\_quarantine\modules\interventions\services\InterventionsService.ts:3 export class InterventionsService {
C:\Users\Admin\terragest\src\_quarantine\modules\interventions\tests\InterventionsService.test.ts:3 describe("InterventionsService", () => {
C:\Users\Admin\terragest\src\_quarantine\modules\maintenance\index.ts:3 export * from "./services/MaintenanceService";
C:\Users\Admin\terragest\src\_quarantine\modules\maintenance\hooks\useCreateMaintenance.ts:7 import { MaintenanceService } from "../services/MaintenanceService";
C:\Users\Admin\terragest\src\_quarantine\modules\maintenance\hooks\useCreateMaintenance.ts:9 const service = new MaintenanceService();
C:\Users\Admin\terragest\src\_quarantine\modules\maintenance\hooks\useCreateMaintenance.ts:14 service.create(data),
C:\Users\Admin\terragest\src\_quarantine\modules\maintenance\hooks\useDeleteMaintenance.ts:7 import { MaintenanceService } from "../services/MaintenanceService";
C:\Users\Admin\terragest\src\_quarantine\modules\maintenance\hooks\useDeleteMaintenance.ts:9 const service = new MaintenanceService();
C:\Users\Admin\terragest\src\_quarantine\modules\maintenance\hooks\useDeleteMaintenance.ts:14 service.delete(id),
C:\Users\Admin\terragest\src\_quarantine\modules\maintenance\hooks\useMaintenance.ts:5 import { MaintenanceService } from "../services/MaintenanceService";
C:\Users\Admin\terragest\src\_quarantine\modules\maintenance\hooks\useMaintenance.ts:7 const service = new MaintenanceService();
C:\Users\Admin\terragest\src\_quarantine\modules\maintenance\hooks\useMaintenance.ts:12 queryFn: () => service.findAll(),
C:\Users\Admin\terragest\src\_quarantine\modules\maintenance\hooks\useUpdateMaintenance.ts:7 import { MaintenanceService } from "../services/MaintenanceService";
C:\Users\Admin\terragest\src\_quarantine\modules\maintenance\hooks\useUpdateMaintenance.ts:9 const service = new MaintenanceService();
C:\Users\Admin\terragest\src\_quarantine\modules\maintenance\hooks\useUpdateMaintenance.ts:20 service.update(id, data),
C:\Users\Admin\terragest\src\_quarantine\modules\maintenance\services\MaintenanceService.ts:3 export class MaintenanceService {
C:\Users\Admin\terragest\src\_quarantine\modules\maintenance\tests\MaintenanceService.test.ts:3 describe("MaintenanceService", () => {
C:\Users\Admin\terragest\src\_quarantine\modules\materiels\index.ts:3 export * from "./services/MaterielsService";
C:\Users\Admin\terragest\src\_quarantine\modules\materiels\hooks\useCreateMateriels.ts:7 import { MaterielsService } from "../services/MaterielsService";
C:\Users\Admin\terragest\src\_quarantine\modules\materiels\hooks\useCreateMateriels.ts:9 const service = new MaterielsService();
C:\Users\Admin\terragest\src\_quarantine\modules\materiels\hooks\useCreateMateriels.ts:14 service.create(data),
C:\Users\Admin\terragest\src\_quarantine\modules\materiels\hooks\useDeleteMateriels.ts:7 import { MaterielsService } from "../services/MaterielsService";
C:\Users\Admin\terragest\src\_quarantine\modules\materiels\hooks\useDeleteMateriels.ts:9 const service = new MaterielsService();
C:\Users\Admin\terragest\src\_quarantine\modules\materiels\hooks\useDeleteMateriels.ts:14 service.delete(id),
C:\Users\Admin\terragest\src\_quarantine\modules\materiels\hooks\useMateriels.ts:5 import { MaterielsService } from "../services/MaterielsService";
C:\Users\Admin\terragest\src\_quarantine\modules\materiels\hooks\useMateriels.ts:7 const service = new MaterielsService();
C:\Users\Admin\terragest\src\_quarantine\modules\materiels\hooks\useMateriels.ts:12 queryFn: () => service.findAll(),
C:\Users\Admin\terragest\src\_quarantine\modules\materiels\hooks\useUpdateMateriels.ts:7 import { MaterielsService } from "../services/MaterielsService";
C:\Users\Admin\terragest\src\_quarantine\modules\materiels\hooks\useUpdateMateriels.ts:9 const service = new MaterielsService();
C:\Users\Admin\terragest\src\_quarantine\modules\materiels\hooks\useUpdateMateriels.ts:20 service.update(id, data),
C:\Users\Admin\terragest\src\_quarantine\modules\materiels\services\MaterielsService.ts:3 export class MaterielsService {
C:\Users\Admin\terragest\src\_quarantine\modules\materiels\tests\MaterielsService.test.ts:3 describe("MaterielsService", () => {
C:\Users\Admin\terragest\src\_quarantine\modules\mobile\index.ts:3 export * from "./services/MobileService";
C:\Users\Admin\terragest\src\_quarantine\modules\mobile\hooks\useCreateMobile.ts:7 import { MobileService } from "../services/MobileService";
C:\Users\Admin\terragest\src\_quarantine\modules\mobile\hooks\useCreateMobile.ts:9 const service = new MobileService();
C:\Users\Admin\terragest\src\_quarantine\modules\mobile\hooks\useCreateMobile.ts:14 service.create(data),
C:\Users\Admin\terragest\src\_quarantine\modules\mobile\hooks\useDeleteMobile.ts:7 import { MobileService } from "../services/MobileService";
C:\Users\Admin\terragest\src\_quarantine\modules\mobile\hooks\useDeleteMobile.ts:9 const service = new MobileService();
C:\Users\Admin\terragest\src\_quarantine\modules\mobile\hooks\useDeleteMobile.ts:14 service.delete(id),
C:\Users\Admin\terragest\src\_quarantine\modules\mobile\hooks\useMobile.ts:5 import { MobileService } from "../services/MobileService";
C:\Users\Admin\terragest\src\_quarantine\modules\mobile\hooks\useMobile.ts:7 const service = new MobileService();
C:\Users\Admin\terragest\src\_quarantine\modules\mobile\hooks\useMobile.ts:12 queryFn: () => service.findAll(),
C:\Users\Admin\terragest\src\_quarantine\modules\mobile\hooks\useUpdateMobile.ts:7 import { MobileService } from "../services/MobileService";
C:\Users\Admin\terragest\src\_quarantine\modules\mobile\hooks\useUpdateMobile.ts:9 const service = new MobileService();
C:\Users\Admin\terragest\src\_quarantine\modules\mobile\hooks\useUpdateMobile.ts:20 service.update(id, data),
C:\Users\Admin\terragest\src\_quarantine\modules\mobile\services\MobileService.ts:3 export class MobileService {
C:\Users\Admin\terragest\src\_quarantine\modules\mobile\tests\MobileService.test.ts:3 describe("MobileService", () => {
C:\Users\Admin\terragest\src\_quarantine\modules\monitoring\index.ts:3 export * from "./services/MonitoringService";
C:\Users\Admin\terragest\src\_quarantine\modules\monitoring\hooks\useCreateMonitoring.ts:7 import { MonitoringService } from "../services/MonitoringService";
C:\Users\Admin\terragest\src\_quarantine\modules\monitoring\hooks\useCreateMonitoring.ts:9 const service = new MonitoringService();
C:\Users\Admin\terragest\src\_quarantine\modules\monitoring\hooks\useCreateMonitoring.ts:14 service.create(data),
C:\Users\Admin\terragest\src\_quarantine\modules\monitoring\hooks\useDeleteMonitoring.ts:7 import { MonitoringService } from "../services/MonitoringService";
C:\Users\Admin\terragest\src\_quarantine\modules\monitoring\hooks\useDeleteMonitoring.ts:9 const service = new MonitoringService();
C:\Users\Admin\terragest\src\_quarantine\modules\monitoring\hooks\useDeleteMonitoring.ts:14 service.delete(id),
C:\Users\Admin\terragest\src\_quarantine\modules\monitoring\hooks\useMonitoring.ts:5 import { MonitoringService } from "../services/MonitoringService";
C:\Users\Admin\terragest\src\_quarantine\modules\monitoring\hooks\useMonitoring.ts:7 const service = new MonitoringService();
C:\Users\Admin\terragest\src\_quarantine\modules\monitoring\hooks\useMonitoring.ts:12 queryFn: () => service.findAll(),
C:\Users\Admin\terragest\src\_quarantine\modules\monitoring\hooks\useUpdateMonitoring.ts:7 import { MonitoringService } from "../services/MonitoringService";
C:\Users\Admin\terragest\src\_quarantine\modules\monitoring\hooks\useUpdateMonitoring.ts:9 const service = new MonitoringService();
C:\Users\Admin\terragest\src\_quarantine\modules\monitoring\hooks\useUpdateMonitoring.ts:20 service.update(id, data),
C:\Users\Admin\terragest\src\_quarantine\modules\monitoring\services\MonitoringService.ts:3 export class MonitoringService {
C:\Users\Admin\terragest\src\_quarantine\modules\monitoring\tests\MonitoringService.test.ts:3 describe("MonitoringService", () => {
C:\Users\Admin\terragest\src\_quarantine\modules\mouvements-stock\index.ts:3 export * from "./services/MouvementsStockService";
C:\Users\Admin\terragest\src\_quarantine\modules\mouvements-stock\hooks\useCreateMouvementsStock.ts:7 import { MouvementsStockService } from "../services/MouvementsStockService";
C:\Users\Admin\terragest\src\_quarantine\modules\mouvements-stock\hooks\useCreateMouvementsStock.ts:9 const service = new MouvementsStockService();
C:\Users\Admin\terragest\src\_quarantine\modules\mouvements-stock\hooks\useCreateMouvementsStock.ts:14 service.create(data),
C:\Users\Admin\terragest\src\_quarantine\modules\mouvements-stock\hooks\useDeleteMouvementsStock.ts:7 import { MouvementsStockService } from "../services/MouvementsStockService";
C:\Users\Admin\terragest\src\_quarantine\modules\mouvements-stock\hooks\useDeleteMouvementsStock.ts:9 const service = new MouvementsStockService();
C:\Users\Admin\terragest\src\_quarantine\modules\mouvements-stock\hooks\useDeleteMouvementsStock.ts:14 service.delete(id),
C:\Users\Admin\terragest\src\_quarantine\modules\mouvements-stock\hooks\useMouvementsStock.ts:5 import { MouvementsStockService } from "../services/MouvementsStockService";
C:\Users\Admin\terragest\src\_quarantine\modules\mouvements-stock\hooks\useMouvementsStock.ts:7 const service = new MouvementsStockService();
C:\Users\Admin\terragest\src\_quarantine\modules\mouvements-stock\hooks\useMouvementsStock.ts:12 queryFn: () => service.findAll(),
C:\Users\Admin\terragest\src\_quarantine\modules\mouvements-stock\hooks\useUpdateMouvementsStock.ts:7 import { MouvementsStockService } from "../services/MouvementsStockService";
C:\Users\Admin\terragest\src\_quarantine\modules\mouvements-stock\hooks\useUpdateMouvementsStock.ts:9 const service = new MouvementsStockService();
C:\Users\Admin\terragest\src\_quarantine\modules\mouvements-stock\hooks\useUpdateMouvementsStock.ts:20 service.update(id, data),
C:\Users\Admin\terragest\src\_quarantine\modules\mouvements-stock\services\MouvementsStockService.ts:3 export class MouvementsStockService {
C:\Users\Admin\terragest\src\_quarantine\modules\mouvements-stock\tests\MouvementsStockService.test.ts:3 describe("MouvementsStockService", () => {
C:\Users\Admin\terragest\src\_quarantine\modules\paiements\index.ts:3 export * from "./services/PaiementsService";
C:\Users\Admin\terragest\src\_quarantine\modules\paiements\hooks\useCreatePaiements.ts:7 import { PaiementsService } from "../services/PaiementsService";
C:\Users\Admin\terragest\src\_quarantine\modules\paiements\hooks\useCreatePaiements.ts:9 const service = new PaiementsService();
C:\Users\Admin\terragest\src\_quarantine\modules\paiements\hooks\useCreatePaiements.ts:14 service.create(data),
C:\Users\Admin\terragest\src\_quarantine\modules\paiements\hooks\useDeletePaiements.ts:7 import { PaiementsService } from "../services/PaiementsService";
C:\Users\Admin\terragest\src\_quarantine\modules\paiements\hooks\useDeletePaiements.ts:9 const service = new PaiementsService();
C:\Users\Admin\terragest\src\_quarantine\modules\paiements\hooks\useDeletePaiements.ts:14 service.delete(id),
C:\Users\Admin\terragest\src\_quarantine\modules\paiements\hooks\usePaiements.ts:5 import { PaiementsService } from "../services/PaiementsService";
C:\Users\Admin\terragest\src\_quarantine\modules\paiements\hooks\usePaiements.ts:7 const service = new PaiementsService();
C:\Users\Admin\terragest\src\_quarantine\modules\paiements\hooks\usePaiements.ts:12 queryFn: () => service.findAll(),
C:\Users\Admin\terragest\src\_quarantine\modules\paiements\hooks\useUpdatePaiements.ts:7 import { PaiementsService } from "../services/PaiementsService";
C:\Users\Admin\terragest\src\_quarantine\modules\paiements\hooks\useUpdatePaiements.ts:9 const service = new PaiementsService();
C:\Users\Admin\terragest\src\_quarantine\modules\paiements\hooks\useUpdatePaiements.ts:20 service.update(id, data),
C:\Users\Admin\terragest\src\_quarantine\modules\paiements\services\PaiementsService.ts:3 export class PaiementsService {
C:\Users\Admin\terragest\src\_quarantine\modules\paiements\tests\PaiementsService.test.ts:3 describe("PaiementsService", () => {
C:\Users\Admin\terragest\src\_quarantine\modules\parcelles\index.ts:3 export * from "./services/ParcellesService";
C:\Users\Admin\terragest\src\_quarantine\modules\parcelles\services\ParcellesService.ts:3 export class ParcellesService {
C:\Users\Admin\terragest\src\_quarantine\modules\parcelles\tests\ParcellesService.test.ts:3 describe("ParcellesService", () => {
C:\Users\Admin\terragest\src\_quarantine\modules\productions\index.ts:3 export * from "./services/ProductionsService";
C:\Users\Admin\terragest\src\_quarantine\modules\productions\hooks\useCreateProductions.ts:7 import { ProductionsService } from "../services/ProductionsService";
C:\Users\Admin\terragest\src\_quarantine\modules\productions\hooks\useCreateProductions.ts:9 const service = new ProductionsService();
C:\Users\Admin\terragest\src\_quarantine\modules\productions\hooks\useCreateProductions.ts:14 service.create(data),
C:\Users\Admin\terragest\src\_quarantine\modules\productions\hooks\useDeleteProductions.ts:7 import { ProductionsService } from "../services/ProductionsService";
C:\Users\Admin\terragest\src\_quarantine\modules\productions\hooks\useDeleteProductions.ts:9 const service = new ProductionsService();
C:\Users\Admin\terragest\src\_quarantine\modules\productions\hooks\useDeleteProductions.ts:14 service.delete(id),
C:\Users\Admin\terragest\src\_quarantine\modules\productions\hooks\useProductions.ts:5 import { ProductionsService } from "../services/ProductionsService";
C:\Users\Admin\terragest\src\_quarantine\modules\productions\hooks\useProductions.ts:7 const service = new ProductionsService();
C:\Users\Admin\terragest\src\_quarantine\modules\productions\hooks\useProductions.ts:12 queryFn: () => service.findAll(),
C:\Users\Admin\terragest\src\_quarantine\modules\productions\hooks\useUpdateProductions.ts:7 import { ProductionsService } from "../services/ProductionsService";
C:\Users\Admin\terragest\src\_quarantine\modules\productions\hooks\useUpdateProductions.ts:9 const service = new ProductionsService();
C:\Users\Admin\terragest\src\_quarantine\modules\productions\hooks\useUpdateProductions.ts:20 service.update(id, data),
C:\Users\Admin\terragest\src\_quarantine\modules\productions\services\ProductionsService.ts:3 export class ProductionsService {
C:\Users\Admin\terragest\src\_quarantine\modules\productions\tests\ProductionsService.test.ts:3 describe("ProductionsService", () => {
C:\Users\Admin\terragest\src\_quarantine\modules\recoltes\index.ts:3 export * from "./services/RecoltesService";
C:\Users\Admin\terragest\src\_quarantine\modules\recoltes\hooks\useCreateRecoltes.ts:7 import { RecoltesService } from "../services/RecoltesService";
C:\Users\Admin\terragest\src\_quarantine\modules\recoltes\hooks\useCreateRecoltes.ts:9 const service = new RecoltesService();
C:\Users\Admin\terragest\src\_quarantine\modules\recoltes\hooks\useCreateRecoltes.ts:14 service.create(data),
C:\Users\Admin\terragest\src\_quarantine\modules\recoltes\hooks\useDeleteRecoltes.ts:7 import { RecoltesService } from "../services/RecoltesService";
C:\Users\Admin\terragest\src\_quarantine\modules\recoltes\hooks\useDeleteRecoltes.ts:9 const service = new RecoltesService();
C:\Users\Admin\terragest\src\_quarantine\modules\recoltes\hooks\useDeleteRecoltes.ts:14 service.delete(id),
C:\Users\Admin\terragest\src\_quarantine\modules\recoltes\hooks\useRecoltes.ts:5 import { RecoltesService } from "../services/RecoltesService";
C:\Users\Admin\terragest\src\_quarantine\modules\recoltes\hooks\useRecoltes.ts:7 const service = new RecoltesService();
C:\Users\Admin\terragest\src\_quarantine\modules\recoltes\hooks\useRecoltes.ts:12 queryFn: () => service.findAll(),
C:\Users\Admin\terragest\src\_quarantine\modules\recoltes\hooks\useUpdateRecoltes.ts:7 import { RecoltesService } from "../services/RecoltesService";
C:\Users\Admin\terragest\src\_quarantine\modules\recoltes\hooks\useUpdateRecoltes.ts:9 const service = new RecoltesService();
C:\Users\Admin\terragest\src\_quarantine\modules\recoltes\hooks\useUpdateRecoltes.ts:20 service.update(id, data),
C:\Users\Admin\terragest\src\_quarantine\modules\recoltes\services\RecoltesService.ts:3 export class RecoltesService {
C:\Users\Admin\terragest\src\_quarantine\modules\recoltes\tests\RecoltesService.test.ts:3 describe("RecoltesService", () => {
C:\Users\Admin\terragest\src\_quarantine\modules\stocks\index.ts:3 export * from "./services/StocksService";
C:\Users\Admin\terragest\src\_quarantine\modules\stocks\hooks\useCreateStocks.ts:7 import { StocksService } from "../services/StocksService";
C:\Users\Admin\terragest\src\_quarantine\modules\stocks\hooks\useCreateStocks.ts:9 const service = new StocksService();
C:\Users\Admin\terragest\src\_quarantine\modules\stocks\hooks\useCreateStocks.ts:14 service.create(data),
C:\Users\Admin\terragest\src\_quarantine\modules\stocks\hooks\useDeleteStocks.ts:7 import { StocksService } from "../services/StocksService";
C:\Users\Admin\terragest\src\_quarantine\modules\stocks\hooks\useDeleteStocks.ts:9 const service = new StocksService();
C:\Users\Admin\terragest\src\_quarantine\modules\stocks\hooks\useDeleteStocks.ts:14 service.delete(id),
C:\Users\Admin\terragest\src\_quarantine\modules\stocks\hooks\useStocks.ts:5 import { StocksService } from "../services/StocksService";
C:\Users\Admin\terragest\src\_quarantine\modules\stocks\hooks\useStocks.ts:7 const service = new StocksService();
C:\Users\Admin\terragest\src\_quarantine\modules\stocks\hooks\useStocks.ts:12 queryFn: () => service.findAll(),
C:\Users\Admin\terragest\src\_quarantine\modules\stocks\hooks\useUpdateStocks.ts:7 import { StocksService } from "../services/StocksService";
C:\Users\Admin\terragest\src\_quarantine\modules\stocks\hooks\useUpdateStocks.ts:9 const service = new StocksService();
C:\Users\Admin\terragest\src\_quarantine\modules\stocks\hooks\useUpdateStocks.ts:20 service.update(id, data),
C:\Users\Admin\terragest\src\_quarantine\modules\stocks\services\StocksService.ts:3 export class StocksService {
C:\Users\Admin\terragest\src\_quarantine\modules\stocks\tests\StocksService.test.ts:3 describe("StocksService", () => {
C:\Users\Admin\terragest\src\_quarantine\modules\sync\index.ts:3 export * from "./services/SyncService";
C:\Users\Admin\terragest\src\_quarantine\modules\sync\hooks\useCreateSync.ts:7 import { SyncService } from "../services/SyncService";
C:\Users\Admin\terragest\src\_quarantine\modules\sync\hooks\useCreateSync.ts:9 const service = new SyncService();
C:\Users\Admin\terragest\src\_quarantine\modules\sync\hooks\useCreateSync.ts:14 service.create(data),
C:\Users\Admin\terragest\src\_quarantine\modules\sync\hooks\useDeleteSync.ts:7 import { SyncService } from "../services/SyncService";
C:\Users\Admin\terragest\src\_quarantine\modules\sync\hooks\useDeleteSync.ts:9 const service = new SyncService();
C:\Users\Admin\terragest\src\_quarantine\modules\sync\hooks\useDeleteSync.ts:14 service.delete(id),
C:\Users\Admin\terragest\src\_quarantine\modules\sync\hooks\useSync.ts:5 import { SyncService } from "../services/SyncService";
C:\Users\Admin\terragest\src\_quarantine\modules\sync\hooks\useSync.ts:7 const service = new SyncService();
C:\Users\Admin\terragest\src\_quarantine\modules\sync\hooks\useSync.ts:12 queryFn: () => service.findAll(),
C:\Users\Admin\terragest\src\_quarantine\modules\sync\hooks\useUpdateSync.ts:7 import { SyncService } from "../services/SyncService";
C:\Users\Admin\terragest\src\_quarantine\modules\sync\hooks\useUpdateSync.ts:9 const service = new SyncService();
C:\Users\Admin\terragest\src\_quarantine\modules\sync\hooks\useUpdateSync.ts:20 service.update(id, data),
C:\Users\Admin\terragest\src\_quarantine\modules\sync\services\SyncService.ts:3 export class SyncService {
C:\Users\Admin\terragest\src\_quarantine\modules\sync\tests\SyncService.test.ts:3 describe("SyncService", () => {
C:\Users\Admin\terragest\src\_quarantine\modules\terrains\index.ts:3 export * from "./services/TerrainsService";
C:\Users\Admin\terragest\src\_quarantine\modules\terrains\hooks\useCreateTerrains.ts:7 import { TerrainsService } from "../services/TerrainsService";
C:\Users\Admin\terragest\src\_quarantine\modules\terrains\hooks\useCreateTerrains.ts:9 const service = new TerrainsService();
C:\Users\Admin\terragest\src\_quarantine\modules\terrains\hooks\useCreateTerrains.ts:14 service.create(data),
C:\Users\Admin\terragest\src\_quarantine\modules\terrains\hooks\useDeleteTerrains.ts:7 import { TerrainsService } from "../services/TerrainsService";
C:\Users\Admin\terragest\src\_quarantine\modules\terrains\hooks\useDeleteTerrains.ts:9 const service = new TerrainsService();
C:\Users\Admin\terragest\src\_quarantine\modules\terrains\hooks\useDeleteTerrains.ts:14 service.delete(id),
C:\Users\Admin\terragest\src\_quarantine\modules\terrains\hooks\useTerrains.ts:5 import { TerrainsService } from "../services/TerrainsService";
C:\Users\Admin\terragest\src\_quarantine\modules\terrains\hooks\useTerrains.ts:7 const service = new TerrainsService();
C:\Users\Admin\terragest\src\_quarantine\modules\terrains\hooks\useTerrains.ts:12 queryFn: () => service.findAll(),
C:\Users\Admin\terragest\src\_quarantine\modules\terrains\hooks\useUpdateTerrains.ts:7 import { TerrainsService } from "../services/TerrainsService";
C:\Users\Admin\terragest\src\_quarantine\modules\terrains\hooks\useUpdateTerrains.ts:9 const service = new TerrainsService();
C:\Users\Admin\terragest\src\_quarantine\modules\terrains\hooks\useUpdateTerrains.ts:20 service.update(id, data),
C:\Users\Admin\terragest\src\_quarantine\modules\terrains\services\TerrainsService.ts:3 export class TerrainsService {
C:\Users\Admin\terragest\src\_quarantine\modules\terrains\tests\TerrainsService.test.ts:3 describe("TerrainsService", () => {
C:\Users\Admin\terragest\src\_quarantine\modules\utilisateurs\index.ts:3 export * from "./services/UtilisateursService";
C:\Users\Admin\terragest\src\_quarantine\modules\utilisateurs\hooks\useCreateUtilisateurs.ts:7 import { UtilisateursService } from "../services/UtilisateursService";
C:\Users\Admin\terragest\src\_quarantine\modules\utilisateurs\hooks\useCreateUtilisateurs.ts:9 const service = new UtilisateursService();
C:\Users\Admin\terragest\src\_quarantine\modules\utilisateurs\hooks\useCreateUtilisateurs.ts:14 service.create(data),
C:\Users\Admin\terragest\src\_quarantine\modules\utilisateurs\hooks\useDeleteUtilisateurs.ts:7 import { UtilisateursService } from "../services/UtilisateursService";
C:\Users\Admin\terragest\src\_quarantine\modules\utilisateurs\hooks\useDeleteUtilisateurs.ts:9 const service = new UtilisateursService();
C:\Users\Admin\terragest\src\_quarantine\modules\utilisateurs\hooks\useDeleteUtilisateurs.ts:14 service.delete(id),
C:\Users\Admin\terragest\src\_quarantine\modules\utilisateurs\hooks\useUpdateUtilisateurs.ts:7 import { UtilisateursService } from "../services/UtilisateursService";
C:\Users\Admin\terragest\src\_quarantine\modules\utilisateurs\hooks\useUpdateUtilisateurs.ts:9 const service = new UtilisateursService();
C:\Users\Admin\terragest\src\_quarantine\modules\utilisateurs\hooks\useUpdateUtilisateurs.ts:20 service.update(id, data),
C:\Users\Admin\terragest\src\_quarantine\modules\utilisateurs\hooks\useUtilisateurs.ts:5 import { UtilisateursService } from "../services/UtilisateursService";
C:\Users\Admin\terragest\src\_quarantine\modules\utilisateurs\hooks\useUtilisateurs.ts:7 const service = new UtilisateursService();
C:\Users\Admin\terragest\src\_quarantine\modules\utilisateurs\hooks\useUtilisateurs.ts:12 queryFn: () => service.findAll(),
C:\Users\Admin\terragest\src\_quarantine\modules\utilisateurs\services\UtilisateursService.ts:3 export class UtilisateursService {
C:\Users\Admin\terragest\src\_quarantine\modules\utilisateurs\tests\UtilisateursService.test.ts:3 describe("UtilisateursService", () => {
C:\Users\Admin\terragest\src\_quarantine\workflow\automations\WorkflowAutomation.ts:3 } from "@/workflow/services/EventBus";
C:\Users\Admin\terragest\src\_quarantine\workflow\listeners\ProductCreatedListener.ts:3 } from "@/workflow/services/EventBus";
C:\Users\Admin\terragest\src\_quarantine\workflow\listeners\StockAlertListener.ts:3 } from "@/workflow/services/EventBus";
```

## repositories/

```txt
C:\Users\Admin\terragest\src\components\ui\ProductRealtimeForm.tsx:9 } from "@/lib/firestore/repositories/ProductsRepository";
C:\Users\Admin\terragest\src\domains\materiels\repositories\MaterielsRepository.ts:1 // src/domains/materiels/repositories/MaterielsRepository.ts
C:\Users\Admin\terragest\src\domains\materiels\repositories\MaterielsRepository.ts:6 from "@/infrastructure/repositories/firestore/BaseFirestoreRepository";
C:\Users\Admin\terragest\src\domains\materiels\store\MaterielsStore.ts:6 from "@/domains/materiels/repositories/MaterielsRepository";
C:\Users\Admin\terragest\src\features\billing\services\BillingService.ts:5 from "@/features/billing/repositories/BillingRepository";
C:\Users\Admin\terragest\src\features\exploitations\components\ExploitationEditModal.tsx:22 } from "@/features/exploitations/repositories/ExploitationsRepository";
C:\Users\Admin\terragest\src\features\exploitations\services\ExploitationService.ts:4 from "../repositories/firestore/FirestoreExploitationRepository";
C:\Users\Admin\terragest\src\features\exploitations\services\ExploitationsService.ts:7 } from "@/features/exploitations/repositories/ExploitationsRepository";
C:\Users\Admin\terragest\src\features\interventions\services\InterventionService.ts:4 from "../repositories/firestore/FirestoreInterventionRepository";
C:\Users\Admin\terragest\src\features\invitations\services\InvitationService.ts:5 from "@/features/invitations/repositories/InvitationsRepository";
C:\Users\Admin\terragest\src\features\invitations\services\InvitationService.ts:8 from "@/features/memberships/repositories/MembershipsRepository";
C:\Users\Admin\terragest\src\features\materiels\application\MaterielService.ts:4 from "../repositories/firestore/FirestoreMaterielRepository";
C:\Users\Admin\terragest\src\features\materiels\services\MaterielService.ts:4 from "../repositories/firestore/FirestoreMaterielRepository";
C:\Users\Admin\terragest\src\features\memberships\services\MembershipService.ts:5 from "@/features/memberships/repositories/MembershipsRepository";
C:\Users\Admin\terragest\src\features\mouvements\services\MouvementService.ts:1 import { MouvementRepository } from "../repositories/MouvementRepository";
C:\Users\Admin\terragest\src\features\organizations\services\OrganizationService.ts:5 from "@/features/organizations/repositories/OrganizationsRepository";
C:\Users\Admin\terragest\src\features\produits\components\ProductEditForm.tsx:18 from "@/features/produits/repositories/ProductsRepository";
C:\Users\Admin\terragest\src\features\produits\components\ProductsTable.tsx:26 from "@/features/produits/repositories/ProductsRepository";
C:\Users\Admin\terragest\src\features\produits\services\ProductService.ts:5 from "@/features/produits/repositories/ProductsRepository";
C:\Users\Admin\terragest\src\features\produits\services\ProduitService.ts:4 from "../repositories/firestore/FirestoreProduitRepository";
C:\Users\Admin\terragest\src\features\stocks\services\StockService.ts:5 } from "@/features/stocks/repositories/firestore/FirestoreStockRepository";
C:\Users\Admin\terragest\src\features\teams\services\TeamService.ts:8 from "@/features/memberships/repositories/MembershipsRepository";
C:\Users\Admin\terragest\src\infrastructure\repositories\firestore\BaseFirestoreRepository.ts:1 // src/infrastructure/repositories/firestore/BaseFirestoreRepository.ts
C:\Users\Admin\terragest\src\infrastructure\repositories\firestore\FirestoreMaterielRepository.ts:5 from "../../../features/materiels/repositories/MaterielRepository";
C:\Users\Admin\terragest\src\runtime\enterprise-runtime\EnterpriseRuntimeKernel.ts:18 description: "Repositories, queries, mutations et realtime sont branches.",
C:\Users\Admin\terragest\src\runtime\persistence\index.ts:3 export * from "./repositories/ERPRuntimeRepository";
C:\Users\Admin\terragest\src\runtime\persistence\stores\ERPRuntimePersistenceService.ts:3 } from "../repositories/ERPRuntimeRepository";
C:\Users\Admin\terragest\src\runtime\query\RuntimeQueryEngine.ts:2 import { RuntimeRepository } from "@/runtime/repositories/RuntimeRepository";
C:\Users\Admin\terragest\src\services\StockService.ts:4 from "@/features/stocks/repositories/firestore/FirestoreStockRepository";
C:\Users\Admin\terragest\src\shared\repositories\ProductRepository.ts:1 import { BaseRepository } from "@/shared/repositories/BaseRepository";
C:\Users\Admin\terragest\src\shared\services\ProductService.ts:3 import { ProductRepository } from "@/shared/repositories/ProductRepository";
C:\Users\Admin\terragest\src\_quarantine\modules\alertes\index.ts:2 export * from "./repositories/AlertesRepository";
C:\Users\Admin\terragest\src\_quarantine\modules\alertes\services\AlertesService.ts:1 import { AlertesRepository } from "../repositories/AlertesRepository";
C:\Users\Admin\terragest\src\_quarantine\modules\analytics\index.ts:2 export * from "./repositories/AnalyticsRepository";
C:\Users\Admin\terragest\src\_quarantine\modules\analytics\services\AnalyticsService.ts:1 import { AnalyticsRepository } from "../repositories/AnalyticsRepository";
C:\Users\Admin\terragest\src\_quarantine\modules\clients\index.ts:2 export * from "./repositories/ClientsRepository";
C:\Users\Admin\terragest\src\_quarantine\modules\clients\services\ClientsService.ts:1 import { ClientsRepository } from "../repositories/ClientsRepository";
C:\Users\Admin\terragest\src\_quarantine\modules\contrats\index.ts:2 export * from "./repositories/ContratsRepository";
C:\Users\Admin\terragest\src\_quarantine\modules\contrats\services\ContratsService.ts:1 import { ContratsRepository } from "../repositories/ContratsRepository";
C:\Users\Admin\terragest\src\_quarantine\modules\contrats\services\Service.ts:1 import { Repository } from "../repositories/Repository";
C:\Users\Admin\terragest\src\_quarantine\modules\exploitations\index.ts:2 export * from "./repositories/ExploitationsRepository";
C:\Users\Admin\terragest\src\_quarantine\modules\exploitations\services\ExploitationsService.ts:1 import { ExploitationsRepository } from "../repositories/ExploitationsRepository";
C:\Users\Admin\terragest\src\_quarantine\modules\factures\index.ts:2 export * from "./repositories/FacturesRepository";
C:\Users\Admin\terragest\src\_quarantine\modules\factures\services\FacturesService.ts:1 import { FacturesRepository } from "../repositories/FacturesRepository";
C:\Users\Admin\terragest\src\_quarantine\modules\fournisseurs\index.ts:2 export * from "./repositories/FournisseursRepository";
C:\Users\Admin\terragest\src\_quarantine\modules\fournisseurs\services\FournisseursService.ts:1 import { FournisseursRepository } from "../repositories/FournisseursRepository";
C:\Users\Admin\terragest\src\_quarantine\modules\fournisseurs\services\Service.ts:1 import { Repository } from "../repositories/Repository";
C:\Users\Admin\terragest\src\_quarantine\modules\interventions\index.ts:2 export * from "./repositories/InterventionsRepository";
C:\Users\Admin\terragest\src\_quarantine\modules\interventions\services\InterventionsService.ts:1 import { InterventionsRepository } from "../repositories/InterventionsRepository";
C:\Users\Admin\terragest\src\_quarantine\modules\maintenance\index.ts:2 export * from "./repositories/MaintenanceRepository";
C:\Users\Admin\terragest\src\_quarantine\modules\maintenance\services\MaintenanceService.ts:1 import { MaintenanceRepository } from "../repositories/MaintenanceRepository";
C:\Users\Admin\terragest\src\_quarantine\modules\materiels\index.ts:2 export * from "./repositories/MaterielsRepository";
C:\Users\Admin\terragest\src\_quarantine\modules\materiels\services\MaterielsService.ts:1 import { MaterielsRepository } from "../repositories/MaterielsRepository";
C:\Users\Admin\terragest\src\_quarantine\modules\mobile\index.ts:2 export * from "./repositories/MobileRepository";
C:\Users\Admin\terragest\src\_quarantine\modules\mobile\services\MobileService.ts:1 import { MobileRepository } from "../repositories/MobileRepository";
C:\Users\Admin\terragest\src\_quarantine\modules\monitoring\index.ts:2 export * from "./repositories/MonitoringRepository";
C:\Users\Admin\terragest\src\_quarantine\modules\monitoring\services\MonitoringService.ts:1 import { MonitoringRepository } from "../repositories/MonitoringRepository";
C:\Users\Admin\terragest\src\_quarantine\modules\mouvements-stock\index.ts:2 export * from "./repositories/MouvementsStockRepository";
C:\Users\Admin\terragest\src\_quarantine\modules\mouvements-stock\services\MouvementsStockService.ts:1 import { MouvementsStockRepository } from "../repositories/MouvementsStockRepository";
C:\Users\Admin\terragest\src\_quarantine\modules\paiements\index.ts:2 export * from "./repositories/PaiementsRepository";
C:\Users\Admin\terragest\src\_quarantine\modules\paiements\services\PaiementsService.ts:1 import { PaiementsRepository } from "../repositories/PaiementsRepository";
C:\Users\Admin\terragest\src\_quarantine\modules\parcelles\index.ts:2 export * from "./repositories/ParcellesRepository";
C:\Users\Admin\terragest\src\_quarantine\modules\parcelles\services\ParcellesService.ts:1 import { ParcellesRepository } from "../repositories/ParcellesRepository";
C:\Users\Admin\terragest\src\_quarantine\modules\productions\index.ts:2 export * from "./repositories/ProductionsRepository";
C:\Users\Admin\terragest\src\_quarantine\modules\productions\services\ProductionsService.ts:1 import { ProductionsRepository } from "../repositories/ProductionsRepository";
C:\Users\Admin\terragest\src\_quarantine\modules\recoltes\index.ts:2 export * from "./repositories/RecoltesRepository";
C:\Users\Admin\terragest\src\_quarantine\modules\recoltes\services\RecoltesService.ts:1 import { RecoltesRepository } from "../repositories/RecoltesRepository";
C:\Users\Admin\terragest\src\_quarantine\modules\stocks\index.ts:2 export * from "./repositories/StocksRepository";
C:\Users\Admin\terragest\src\_quarantine\modules\stocks\services\StocksService.ts:1 import { StocksRepository } from "../repositories/StocksRepository";
C:\Users\Admin\terragest\src\_quarantine\modules\sync\index.ts:2 export * from "./repositories/SyncRepository";
C:\Users\Admin\terragest\src\_quarantine\modules\sync\services\SyncService.ts:1 import { SyncRepository } from "../repositories/SyncRepository";
C:\Users\Admin\terragest\src\_quarantine\modules\terrains\index.ts:2 export * from "./repositories/TerrainsRepository";
C:\Users\Admin\terragest\src\_quarantine\modules\terrains\services\TerrainsService.ts:1 import { TerrainsRepository } from "../repositories/TerrainsRepository";
C:\Users\Admin\terragest\src\_quarantine\modules\utilisateurs\index.ts:2 export * from "./repositories/UtilisateursRepository";
C:\Users\Admin\terragest\src\_quarantine\modules\utilisateurs\services\UtilisateursService.ts:1 import { UtilisateursRepository } from "../repositories/UtilisateursRepository";
```

## hooks/

```txt
C:\Users\Admin\terragest\src\app\(private)\dashboard\page.tsx:1 "use client";
C:\Users\Admin\terragest\src\app\(private)\exploitations\details\page.tsx:1 "use client";
C:\Users\Admin\terragest\src\app\(private)\interventions\workflow\page.tsx:1 "use client";
C:\Users\Admin\terragest\src\app\invitations\accept\[token]\page.tsx:1 "use client";
C:\Users\Admin\terragest\src\app\invitations\accept\[token]\page.tsx:4 useState,
C:\Users\Admin\terragest\src\app\invitations\accept\[token]\page.tsx:41 ] = useState(false);
C:\Users\Admin\terragest\src\app\invitations\accept\[token]\page.tsx:46 ] = useState(false);
C:\Users\Admin\terragest\src\app\invitations\accept\[token]\page.tsx:51 ] = useState("");
C:\Users\Admin\terragest\src\app\invitations\accept\[token]\page.tsx:61 "demo-user"
C:\Users\Admin\terragest\src\app\login\page.tsx:3 "use client";
C:\Users\Admin\terragest\src\app\login\page.tsx:5 import { useState }
C:\Users\Admin\terragest\src\app\login\page.tsx:8 import { useRouter }
C:\Users\Admin\terragest\src\app\login\page.tsx:17 useRouter();
C:\Users\Admin\terragest\src\app\login\page.tsx:20 useState("");
C:\Users\Admin\terragest\src\app\login\page.tsx:23 useState("");
C:\Users\Admin\terragest\src\components\auth\PrivateGuard.tsx:1 "use client";
C:\Users\Admin\terragest\src\components\auth\PrivateGuard.tsx:5 useEffect
C:\Users\Admin\terragest\src\components\auth\PrivateGuard.tsx:11 useRouter
C:\Users\Admin\terragest\src\components\auth\PrivateGuard.tsx:17 useAuth
C:\Users\Admin\terragest\src\components\auth\PrivateGuard.tsx:33 user,
C:\Users\Admin\terragest\src\components\auth\PrivateGuard.tsx:37 } = useAuth();
C:\Users\Admin\terragest\src\components\auth\PrivateGuard.tsx:40 useRouter();
C:\Users\Admin\terragest\src\components\auth\PrivateGuard.tsx:42 useEffect(() => {
C:\Users\Admin\terragest\src\components\auth\PrivateGuard.tsx:46 !user
C:\Users\Admin\terragest\src\components\auth\PrivateGuard.tsx:56 user,
C:\Users\Admin\terragest\src\components\auth\PrivateGuard.tsx:80 !user
C:\Users\Admin\terragest\src\components\bootstrap\RuntimeBootstrapProvider.tsx:3 "use client";
C:\Users\Admin\terragest\src\components\bootstrap\RuntimeBootstrapProvider.tsx:6 useEffect,
C:\Users\Admin\terragest\src\components\bootstrap\RuntimeBootstrapProvider.tsx:8 useState
C:\Users\Admin\terragest\src\components\bootstrap\RuntimeBootstrapProvider.tsx:27 useState(false);
C:\Users\Admin\terragest\src\components\bootstrap\RuntimeBootstrapProvider.tsx:29 useEffect(() => {
C:\Users\Admin\terragest\src\components\contrats\ContratsForm.tsx:3 "use client";
C:\Users\Admin\terragest\src\components\contrats\ContratsForm.tsx:5 import { useState }
C:\Users\Admin\terragest\src\components\contrats\ContratsForm.tsx:8 import { useRouter }
C:\Users\Admin\terragest\src\components\contrats\ContratsForm.tsx:28 useRouter();
C:\Users\Admin\terragest\src\components\contrats\ContratsForm.tsx:31 useState("");
C:\Users\Admin\terragest\src\components\contrats\ContratsForm.tsx:46 user:
C:\Users\Admin\terragest\src\components\crud\EntityForm.tsx:1 "use client";
C:\Users\Admin\terragest\src\components\dashboard\DashboardAnalytics.tsx:1 "use client";
C:\Users\Admin\terragest\src\components\dashboard\RealtimeActivityFeed.tsx:1 "use client";
C:\Users\Admin\terragest\src\components\dashboard\RealtimeActivityFeed.tsx:5 import { useRealtimeCollection } from "@/hooks/useRealtimeCollection";
C:\Users\Admin\terragest\src\components\dashboard\RealtimeActivityFeed.tsx:18 } = useRealtimeCollection({
C:\Users\Admin\terragest\src\components\dashboard\RealtimeKpiCard.tsx:1 "use client";
C:\Users\Admin\terragest\src\components\dashboard\RealtimeKpiCard.tsx:3 import { useRealtimeCollection } from "@/hooks/useRealtimeCollection";
C:\Users\Admin\terragest\src\components\dashboard\RealtimeKpiCard.tsx:22 } = useRealtimeCollection({
C:\Users\Admin\terragest\src\components\data-table\DataTable.tsx:1 "use client";
C:\Users\Admin\terragest\src\components\data-table\DataTable.tsx:4 useMemo,
C:\Users\Admin\terragest\src\components\data-table\DataTable.tsx:5 useState,
C:\Users\Admin\terragest\src\components\data-table\DataTable.tsx:31 const [search, setSearch] = useState("");
C:\Users\Admin\terragest\src\components\data-table\DataTable.tsx:33 const [page, setPage] = useState(1);
C:\Users\Admin\terragest\src\components\data-table\DataTable.tsx:37 const filteredData = useMemo(() => {
C:\Users\Admin\terragest\src\components\data-table\DataTable.tsx:49 const paginatedData = useMemo(() => {
C:\Users\Admin\terragest\src\components\dialogs\ConfirmDialog.tsx:1 "use client";
C:\Users\Admin\terragest\src\components\dialogs\DeleteButton.tsx:1 "use client";
C:\Users\Admin\terragest\src\components\dialogs\DeleteButton.tsx:3 import { useState } from "react";
C:\Users\Admin\terragest\src\components\dialogs\DeleteButton.tsx:21 const [open, setOpen] = useState(false);
C:\Users\Admin\terragest\src\components\dialogs\DeleteButton.tsx:23 const [loading, setLoading] = useState(false);
C:\Users\Admin\terragest\src\components\erp\actions\ERPActionButton.tsx:1 "use client";
C:\Users\Admin\terragest\src\components\erp\activity\ERPActivityFeed.tsx:1 "use client";
C:\Users\Admin\terragest\src\components\erp\ai\ERPAIInsights.tsx:1 "use client";
C:\Users\Admin\terragest\src\components\erp\analytics\ERPAnalyticsCard.tsx:1 "use client";
C:\Users\Admin\terragest\src\components\erp\audit\ERPAuditTrail.tsx:1 "use client";
C:\Users\Admin\terragest\src\components\erp\audit\ERPAuditTrail.tsx:7 user: "admin",
C:\Users\Admin\terragest\src\components\erp\audit\ERPAuditTrail.tsx:12 user: "supervisor",
C:\Users\Admin\terragest\src\components\erp\audit\ERPAuditTrail.tsx:17 user: "system",
C:\Users\Admin\terragest\src\components\erp\audit\ERPAuditTrail.tsx:22 user: "admin",
C:\Users\Admin\terragest\src\components\erp\audit\ERPAuditTrail.tsx:35 key={`${entry.user}-${entry.time}`}
C:\Users\Admin\terragest\src\components\erp\audit\ERPAuditTrail.tsx:77 {entry.user}
C:\Users\Admin\terragest\src\components\erp\automation\ERPAutomationCard.tsx:1 "use client";
C:\Users\Admin\terragest\src\components\erp\automation\ERPAutomationTimeline.tsx:1 "use client";
C:\Users\Admin\terragest\src\components\erp\automation-runtime\ERPAutomationRuntimePanel.tsx:1 "use client";
C:\Users\Admin\terragest\src\components\erp\automation-runtime\ERPAutomationRuntimePanel.tsx:3 import { useState } from "react";
C:\Users\Admin\terragest\src\components\erp\automation-runtime\ERPAutomationRuntimePanel.tsx:23 useState<AutomationRuntimeJob[]>(AutomationRuntimeQueue.all());
C:\Users\Admin\terragest\src\components\erp\badges\ERPHealthBadge.tsx:1 "use client";
C:\Users\Admin\terragest\src\components\erp\charts\ERPTrendCard.tsx:1 "use client";
C:\Users\Admin\terragest\src\components\erp\dashboard\ErpDashboard.tsx:1 "use client";
C:\Users\Admin\terragest\src\components\erp\dashboard\ERPDashboardActivityFeed.tsx:1 "use client";
C:\Users\Admin\terragest\src\components\erp\dashboard\ERPDashboardMetrics.tsx:1 "use client";
C:\Users\Admin\terragest\src\components\erp\dashboard\ERPDashboardPanel.tsx:1 "use client";
C:\Users\Admin\terragest\src\components\erp\dashboard\ERPDashboardQuickActions.tsx:1 "use client";
C:\Users\Admin\terragest\src\components\erp\dashboard\ERPDashboardSection.tsx:1 "use client";
C:\Users\Admin\terragest\src\components\erp\datatable\ERPTable.tsx:1 "use client";
C:\Users\Admin\terragest\src\components\erp\errors\ERPErrorBoundary.tsx:1 "use client";
C:\Users\Admin\terragest\src\components\erp\event-runtime\ERPEventRuntimePanel.tsx:1 "use client";
C:\Users\Admin\terragest\src\components\erp\event-runtime\ERPEventRuntimePanel.tsx:3 import { useState } from "react";
C:\Users\Admin\terragest\src\components\erp\event-runtime\ERPEventRuntimePanel.tsx:21 useState<ERPEventRuntimeEvent[]>(
C:\Users\Admin\terragest\src\components\erp\executive-dashboard\ERPExecutiveDashboard.tsx:1 "use client";
C:\Users\Admin\terragest\src\components\erp\finance\ERPFinancialOverview.tsx:1 "use client";
C:\Users\Admin\terragest\src\components\erp\firestore\ERPFirestoreSync.tsx:1 "use client";
C:\Users\Admin\terragest\src\components\erp\forms\ERPDynamicForm.tsx:1 "use client";
C:\Users\Admin\terragest\src\components\erp\forms\ERPDynamicForm.tsx:4 useMemo,
C:\Users\Admin\terragest\src\components\erp\forms\ERPDynamicForm.tsx:5 useState,
C:\Users\Admin\terragest\src\components\erp\forms\ERPDynamicForm.tsx:40 useMemo(() => {
C:\Users\Admin\terragest\src\components\erp\forms\ERPDynamicForm.tsx:50 useMemo(() => {
C:\Users\Admin\terragest\src\components\erp\forms\ERPDynamicForm.tsx:66 ] = useState<
C:\Users\Admin\terragest\src\components\erp\forms\ERPFormRenderer.tsx:1 "use client";
C:\Users\Admin\terragest\src\components\erp\forms\ERPFormSection.tsx:1 "use client";
C:\Users\Admin\terragest\src\components\erp\forms\enterprise\ERPEnterpriseForm.tsx:1 "use client";
C:\Users\Admin\terragest\src\components\erp\forms\enterprise\ERPEnterpriseForm.tsx:3 import { useEffect, useState } from "react";
C:\Users\Admin\terragest\src\components\erp\forms\enterprise\ERPEnterpriseForm.tsx:4 import { useRouter } from "next/navigation";
C:\Users\Admin\terragest\src\components\erp\forms\enterprise\ERPEnterpriseForm.tsx:48 const [saving, setSaving] = useState(false);
C:\Users\Admin\terragest\src\components\erp\forms\enterprise\ERPEnterpriseForm.tsx:51 useState<RuntimeValidationError[]>([]);
C:\Users\Admin\terragest\src\components\erp\forms\enterprise\ERPEnterpriseForm.tsx:54 useState<Record<string, unknown>>(initialData);
C:\Users\Admin\terragest\src\components\erp\forms\enterprise\ERPEnterpriseForm.tsx:56 const router = useRouter();
C:\Users\Admin\terragest\src\components\erp\forms\enterprise\ERPEnterpriseForm.tsx:61 useEffect(() => {
C:\Users\Admin\terragest\src\components\erp\forms\enterprise\ERPFormField.tsx:1 "use client";
C:\Users\Admin\terragest\src\components\erp\forms\enterprise\ERPFormField.tsx:3 import { useEffect, useState } from "react";
C:\Users\Admin\terragest\src\components\erp\forms\enterprise\ERPFormField.tsx:21 const [relationOptions, setRelationOptions] = useState<RelationOption[]>([]);
C:\Users\Admin\terragest\src\components\erp\forms\enterprise\ERPFormField.tsx:23 useEffect(() => {
C:\Users\Admin\terragest\src\components\erp\forms\enterprise\ERPFormTabs.tsx:1 "use client";
C:\Users\Admin\terragest\src\components\erp\forms\enterprise\ERPFormTabs.tsx:3 import { useState } from "react";
C:\Users\Admin\terragest\src\components\erp\forms\enterprise\ERPFormTabs.tsx:28 useState(
C:\Users\Admin\terragest\src\components\erp\generic\GenericDetailPage.tsx:1 "use client";
C:\Users\Admin\terragest\src\components\erp\generic\GenericDetailPage.tsx:3 import { useEffect, useState } from "react";
C:\Users\Admin\terragest\src\components\erp\generic\GenericDetailPage.tsx:31 useState<Record<string, unknown> | null | undefined>(record);
C:\Users\Admin\terragest\src\components\erp\generic\GenericDetailPage.tsx:34 useState(true);
C:\Users\Admin\terragest\src\components\erp\generic\GenericDetailPage.tsx:36 useEffect(() => {
C:\Users\Admin\terragest\src\components\erp\generic\GenericEditPage.tsx:1 "use client";
C:\Users\Admin\terragest\src\components\erp\generic\GenericEditPage.tsx:3 import { useEffect, useState } from "react";
C:\Users\Admin\terragest\src\components\erp\generic\GenericEditPage.tsx:27 useState<Record<string, unknown> | null | undefined>(record);
C:\Users\Admin\terragest\src\components\erp\generic\GenericEditPage.tsx:29 const [loading, setLoading] = useState(true);
C:\Users\Admin\terragest\src\components\erp\generic\GenericEditPage.tsx:31 useEffect(() => {
C:\Users\Admin\terragest\src\components\erp\generic\GenericListPage.tsx:1 "use client";
C:\Users\Admin\terragest\src\components\erp\generic\GenericListPage.tsx:3 import { useEffect, useState } from "react";
C:\Users\Admin\terragest\src\components\erp\generic\GenericListPage.tsx:28 useState<RuntimeRecord[]>([]);
C:\Users\Admin\terragest\src\components\erp\generic\GenericListPage.tsx:31 useState(true);
C:\Users\Admin\terragest\src\components\erp\generic\GenericListPage.tsx:33 useEffect(() => {
C:\Users\Admin\terragest\src\components\erp\kpi\ERPKPIGrid.tsx:1 "use client";
C:\Users\Admin\terragest\src\components\erp\layout\ERPAppShell.tsx:1 "use client";
C:\Users\Admin\terragest\src\components\erp\layout\ERPContentArea.tsx:1 "use client";
C:\Users\Admin\terragest\src\components\erp\layout\ERPDashboardLayout.tsx:1 "use client";
C:\Users\Admin\terragest\src\components\erp\layout\ERPPageHero.tsx:1 "use client";
C:\Users\Admin\terragest\src\components\erp\layout\ERPSidebarSection.tsx:1 "use client";
C:\Users\Admin\terragest\src\components\erp\layout\ERPTopBar.tsx:1 "use client";
C:\Users\Admin\terragest\src\components\erp\lists\ERPDataList.tsx:1 "use client";
C:\Users\Admin\terragest\src\components\erp\live\ERPLiveEvents.tsx:1 "use client";
C:\Users\Admin\terragest\src\components\erp\monitoring\ERPSystemHealth.tsx:1 "use client";
C:\Users\Admin\terragest\src\components\erp\navigation\ERPModuleCard.tsx:1 "use client";
C:\Users\Admin\terragest\src\components\erp\notifications\ERPNotificationCard.tsx:1 "use client";
C:\Users\Admin\terragest\src\components\erp\observability\ERPObservabilityCenter.tsx:1 "use client";
C:\Users\Admin\terragest\src\components\erp\os\ERPWorkspaceSwitcher.tsx:2 import { ERPUserContextProvider } from "@/runtime/os-enterprise";
C:\Users\Admin\terragest\src\components\erp\os\ERPWorkspaceSwitcher.tsx:5 const context = ERPUserContextProvider.current();
C:\Users\Admin\terragest\src\components\erp\os\ERPWorkspaceSwitcher.tsx:23 {context.userName}
C:\Users\Admin\terragest\src\components\erp\page\ERPMetricCard.tsx:1 "use client";
C:\Users\Admin\terragest\src\components\erp\page\ERPPage.tsx:1 "use client";
C:\Users\Admin\terragest\src\components\erp\page\ERPQuickAction.tsx:1 "use client";
C:\Users\Admin\terragest\src\components\erp\page\ERPSection.tsx:1 "use client";
C:\Users\Admin\terragest\src\components\erp\page\ERPStatCard.tsx:1 "use client";
C:\Users\Admin\terragest\src\components\erp\page\ERPStatusBadge.tsx:1 "use client";
C:\Users\Admin\terragest\src\components\erp\page\ERPWidgetCard.tsx:1 "use client";
C:\Users\Admin\terragest\src\components\erp\panels\ERPInfoPanel.tsx:1 "use client";
C:\Users\Admin\terragest\src\components\erp\production\ERPProductionQuotasPanel.tsx:33 Users: {quota.maxUsers} / Modules: {quota.maxModules} / Storage: {quota.maxStorageGb}GB
C:\Users\Admin\terragest\src\components\erp\realtime\ERPRealtimeMetrics.tsx:16 <ERPStatCard label="Online" value={snapshot.onlineUsers} helper="Presence active" />
C:\Users\Admin\terragest\src\components\erp\realtime\ERPRealtimePresencePanel.tsx:25 {snapshot.presence.map((user) => (
C:\Users\Admin\terragest\src\components\erp\realtime\ERPRealtimePresencePanel.tsx:27 key={user.id}
C:\Users\Admin\terragest\src\components\erp\realtime\ERPRealtimePresencePanel.tsx:33 {user.name}
C:\Users\Admin\terragest\src\components\erp\realtime\ERPRealtimePresencePanel.tsx:36 {user.role} - {user.module ?? "global"}
C:\Users\Admin\terragest\src\components\erp\realtime\ERPRealtimePresencePanel.tsx:41 {user.status}
C:\Users\Admin\terragest\src\components\erp\realtime\ERPRealtimeSyncBadge.tsx:1 "use client";
C:\Users\Admin\terragest\src\components\erp\realtime\ERPRealtimeSyncBadge.tsx:4 useEffect,
C:\Users\Admin\terragest\src\components\erp\realtime\ERPRealtimeSyncBadge.tsx:5 useState,
C:\Users\Admin\terragest\src\components\erp\realtime\ERPRealtimeSyncBadge.tsx:29 useState<number>(0);
C:\Users\Admin\terragest\src\components\erp\realtime\ERPRealtimeSyncBadge.tsx:31 useEffect(() => {
C:\Users\Admin\terragest\src\components\erp\relation-graph\ERPRelationGraph.tsx:1 "use client";
C:\Users\Admin\terragest\src\components\erp\relations\ERPRelationField.tsx:1 "use client";
C:\Users\Admin\terragest\src\components\erp\relations\ERPRelationField.tsx:3 import { useEffect, useMemo, useState } from "react";
C:\Users\Admin\terragest\src\components\erp\relations\ERPRelationField.tsx:28 useState<RelationOption[]>([]);
C:\Users\Admin\terragest\src\components\erp\relations\ERPRelationField.tsx:31 useState("");
C:\Users\Admin\terragest\src\components\erp\relations\ERPRelationField.tsx:34 useState(false);
C:\Users\Admin\terragest\src\components\erp\relations\ERPRelationField.tsx:44 useEffect(() => {
C:\Users\Admin\terragest\src\components\erp\relations\ERPRelationField.tsx:84 useMemo(() => {
C:\Users\Admin\terragest\src\components\erp\relations\ERPRelationsGraph.tsx:1 "use client";
C:\Users\Admin\terragest\src\components\erp\runtime\ERPRuntimeAlertsPanel.tsx:1 "use client";
C:\Users\Admin\terragest\src\components\erp\runtime\ERPRuntimeDeadLetterPanel.tsx:1 "use client";
C:\Users\Admin\terragest\src\components\erp\runtime\ERPRuntimeMetricsPanel.tsx:1 "use client";
C:\Users\Admin\terragest\src\components\erp\runtime\ERPRuntimeOverviewPage.tsx:1 "use client";
C:\Users\Admin\terragest\src\components\erp\runtime\ERPRuntimePage.tsx:1 "use client";
C:\Users\Admin\terragest\src\components\erp\runtime\ERPRuntimeQueuesPanel.tsx:1 "use client";
C:\Users\Admin\terragest\src\components\erp\runtime\ERPRuntimeRetryPanel.tsx:1 "use client";
C:\Users\Admin\terragest\src\components\erp\runtime\ERPRuntimeStatus.tsx:1 "use client";
C:\Users\Admin\terragest\src\components\erp\runtime\ERPRuntimeStatusPanel.tsx:1 "use client";
C:\Users\Admin\terragest\src\components\erp\runtime\ERPRuntimeWorkersPanel.tsx:1 "use client";
C:\Users\Admin\terragest\src\components\erp\runtime-timeline\ERPRuntimeTimeline.tsx:1 "use client";
C:\Users\Admin\terragest\src\components\erp\runtime-timeline\ERPRuntimeTimeline.tsx:4 useEffect,
C:\Users\Admin\terragest\src\components\erp\runtime-timeline\ERPRuntimeTimeline.tsx:5 useState,
C:\Users\Admin\terragest\src\components\erp\runtime-timeline\ERPRuntimeTimeline.tsx:18 useState<any[]>(
C:\Users\Admin\terragest\src\components\erp\runtime-timeline\ERPRuntimeTimeline.tsx:22 useEffect(() => {
C:\Users\Admin\terragest\src\components\erp\security\ERPSecurityAuditPanel.tsx:42 {entry.userId} - {entry.role}
C:\Users\Admin\terragest\src\components\erp\security\ERPSecurityMetrics.tsx:19 <ERPStatCard label="Denied" value={snapshot.deniedCount} helper="Acces refuses" />
C:\Users\Admin\terragest\src\components\erp\security\ERPSecurityPanel.tsx:1 "use client";
C:\Users\Admin\terragest\src\components\erp\security-runtime\ERPProtectedAction.tsx:1 "use client";
C:\Users\Admin\terragest\src\components\erp\security-runtime\ERPRuntimeSecurityBadge.tsx:5 const user = RuntimeSecurityContext.currentUser();
C:\Users\Admin\terragest\src\components\erp\security-runtime\ERPRuntimeSecurityBadge.tsx:9 Role {user.role}
C:\Users\Admin\terragest\src\components\erp\security-runtime\ERPSecurityContextPanel.tsx:8 const user = RuntimeSecurityContext.currentUser();
C:\Users\Admin\terragest\src\components\erp\security-runtime\ERPSecurityContextPanel.tsx:9 const permissions = runtimeRolePermissions[user.role];
C:\Users\Admin\terragest\src\components\erp\security-runtime\ERPSecurityContextPanel.tsx:29 {user.name}
C:\Users\Admin\terragest\src\components\erp\security-runtime\ERPSecurityContextPanel.tsx:38 {user.role}
C:\Users\Admin\terragest\src\components\erp\shell\ErpSidebar.tsx:1 "use client";
C:\Users\Admin\terragest\src\components\erp\shell\ErpSidebar.tsx:4 import { usePathname } from "next/navigation";
C:\Users\Admin\terragest\src\components\erp\shell\ErpSidebar.tsx:10 const pathname = usePathname();
C:\Users\Admin\terragest\src\components\erp\stats\ERPStatTile.tsx:1 "use client";
C:\Users\Admin\terragest\src\components\erp\tenant\ERPTenantMetricsPanel.tsx:53 <p className="text-sm text-slate-500">Users</p>
C:\Users\Admin\terragest\src\components\erp\tenant\ERPTenantMetricsPanel.tsx:55 {metrics.activeUsers}
C:\Users\Admin\terragest\src\components\erp\timeline\ERPEventTimeline.tsx:1 "use client";
C:\Users\Admin\terragest\src\components\erp\ui\ERPBadge.tsx:1 "use client";
C:\Users\Admin\terragest\src\components\erp\ui\ERPButton.tsx:1 "use client";
C:\Users\Admin\terragest\src\components\erp\ui\ERPCard.tsx:1 "use client";
C:\Users\Admin\terragest\src\components\erp\ui\ERPDataList.tsx:1 "use client";
C:\Users\Admin\terragest\src\components\erp\ui\ERPDrawer.tsx:1 "use client";
C:\Users\Admin\terragest\src\components\erp\ui\ERPEmptyState.tsx:1 "use client";
C:\Users\Admin\terragest\src\components\erp\ui\ERPGrid.tsx:1 "use client";
C:\Users\Admin\terragest\src\components\erp\ui\ERPInput.tsx:1 "use client";
C:\Users\Admin\terragest\src\components\erp\ui\ERPMetricCard.tsx:1 "use client";
C:\Users\Admin\terragest\src\components\erp\ui\ERPModal.tsx:1 "use client";
C:\Users\Admin\terragest\src\components\erp\ui\ERPPage.tsx:1 "use client";
C:\Users\Admin\terragest\src\components\erp\ui\ERPPanel.tsx:1 "use client";
C:\Users\Admin\terragest\src\components\erp\ui\ERPSection.tsx:1 "use client";
C:\Users\Admin\terragest\src\components\erp\ui\ERPSelect.tsx:1 "use client";
C:\Users\Admin\terragest\src\components\erp\ui\ERPSkeleton.tsx:1 "use client";
C:\Users\Admin\terragest\src\components\erp\ui\ERPStack.tsx:1 "use client";
C:\Users\Admin\terragest\src\components\erp\ui\ERPStatCard.tsx:1 "use client";
C:\Users\Admin\terragest\src\components\erp\ui\ERPTable.tsx:1 "use client";
C:\Users\Admin\terragest\src\components\erp\ui\ERPTabs.tsx:1 "use client";
C:\Users\Admin\terragest\src\components\erp\ui\ERPToast.tsx:1 "use client";
C:\Users\Admin\terragest\src\components\erp\ui\ERPToolbar.tsx:1 "use client";
C:\Users\Admin\terragest\src\components\erp\workers\ERPWorkerQueue.tsx:1 "use client";
C:\Users\Admin\terragest\src\components\erp\workflow\ERPWorkflowBoard.tsx:1 "use client";
C:\Users\Admin\terragest\src\components\erp\workflow\ERPWorkflowStep.tsx:1 "use client";
C:\Users\Admin\terragest\src\components\erp\workflow-designer\ERPWorkflowDesigner.tsx:1 "use client";
C:\Users\Admin\terragest\src\components\erp\workflow-editor\ERPVisualWorkflowEditor.tsx:1 "use client";
C:\Users\Admin\terragest\src\components\erp\workflow-editor\ERPVisualWorkflowEditor.tsx:4 useState,
C:\Users\Admin\terragest\src\components\erp\workflow-editor\ERPVisualWorkflowEditor.tsx:30 useState(initialSteps);
C:\Users\Admin\terragest\src\components\erp\workflow-editor\ERPVisualWorkflowEditor.tsx:35 ] = useState(
C:\Users\Admin\terragest\src\components\erp\workflow-editor\ERPVisualWorkflowEditor.tsx:40 useState("");
C:\Users\Admin\terragest\src\components\erp\workflow-editor\ERPVisualWorkflowEditor.tsx:43 useState("");
C:\Users\Admin\terragest\src\components\erp\workflow-editor\ERPVisualWorkflowEditor.tsx:46 useState("");
C:\Users\Admin\terragest\src\components\erp\workflow-runtime\ERPWorkflowRuntimePanel.tsx:1 "use client";
C:\Users\Admin\terragest\src\components\erp\workflow-runtime\ERPWorkflowRuntimePanel.tsx:3 import { useState } from "react";
C:\Users\Admin\terragest\src\components\erp\workflow-runtime\ERPWorkflowRuntimePanel.tsx:26 useState<WorkflowRuntimeInstance | null>(null);
C:\Users\Admin\terragest\src\components\interventions\InterventionsForm.tsx:3 "use client";
C:\Users\Admin\terragest\src\components\interventions\InterventionsForm.tsx:5 import { useState }
C:\Users\Admin\terragest\src\components\interventions\InterventionsForm.tsx:8 import { useRouter }
C:\Users\Admin\terragest\src\components\interventions\InterventionsForm.tsx:28 useRouter();
C:\Users\Admin\terragest\src\components\interventions\InterventionsForm.tsx:31 useState("");
C:\Users\Admin\terragest\src\components\interventions\InterventionsForm.tsx:46 user:
C:\Users\Admin\terragest\src\components\layout\ERPLayout.tsx:1 "use client";
C:\Users\Admin\terragest\src\components\maintenance\MaintenanceForm.tsx:3 "use client";
C:\Users\Admin\terragest\src\components\maintenance\MaintenanceForm.tsx:5 import { useState }
C:\Users\Admin\terragest\src\components\maintenance\MaintenanceForm.tsx:8 import { useRouter }
C:\Users\Admin\terragest\src\components\maintenance\MaintenanceForm.tsx:28 useRouter();
C:\Users\Admin\terragest\src\components\maintenance\MaintenanceForm.tsx:31 useState("");
C:\Users\Admin\terragest\src\components\maintenance\MaintenanceForm.tsx:46 user:
C:\Users\Admin\terragest\src\components\materiels\MaterielsForm.tsx:3 "use client";
C:\Users\Admin\terragest\src\components\materiels\MaterielsForm.tsx:5 import { useState }
C:\Users\Admin\terragest\src\components\materiels\MaterielsForm.tsx:8 import { useRouter }
C:\Users\Admin\terragest\src\components\materiels\MaterielsForm.tsx:28 useRouter();
C:\Users\Admin\terragest\src\components\materiels\MaterielsForm.tsx:31 useState("");
C:\Users\Admin\terragest\src\components\materiels\MaterielsForm.tsx:34 useState(false);
C:\Users\Admin\terragest\src\components\materiels\MaterielsForm.tsx:53 user:
C:\Users\Admin\terragest\src\components\materiels\details\MaterielDetails.tsx:3 "use client";
C:\Users\Admin\terragest\src\components\materiels\details\MaterielDetails.tsx:5 import { useRouter }
C:\Users\Admin\terragest\src\components\materiels\details\MaterielDetails.tsx:28 useRouter();
C:\Users\Admin\terragest\src\components\notifications\NotificationCenter.tsx:1 "use client";
C:\Users\Admin\terragest\src\components\shell\EnterpriseAppShell.tsx:1 "use client";
C:\Users\Admin\terragest\src\components\sidebar\AppSidebar.tsx:1 "use client";
C:\Users\Admin\terragest\src\components\stock\StockForm.tsx:3 "use client";
C:\Users\Admin\terragest\src\components\stock\StockForm.tsx:5 import { useState }
C:\Users\Admin\terragest\src\components\stock\StockForm.tsx:8 import { useRouter }
C:\Users\Admin\terragest\src\components\stock\StockForm.tsx:26 useRouter();
C:\Users\Admin\terragest\src\components\stock\StockForm.tsx:29 useState("");
C:\Users\Admin\terragest\src\components\stock\StockForm.tsx:32 useState("");
C:\Users\Admin\terragest\src\components\stock\StockForm.tsx:35 useState(false);
C:\Users\Admin\terragest\src\components\stock\StockForm.tsx:54 user:
C:\Users\Admin\terragest\src\components\stock\details\StockDetails.tsx:3 "use client";
C:\Users\Admin\terragest\src\components\stock\details\StockDetails.tsx:5 import { useRouter }
C:\Users\Admin\terragest\src\components\stock\details\StockDetails.tsx:39 useRouter();
C:\Users\Admin\terragest\src\components\topbar\AppTopbar.tsx:1 "use client";
C:\Users\Admin\terragest\src\components\ui\Button.tsx:1 "use client";
C:\Users\Admin\terragest\src\components\ui\EnterpriseForm.tsx:1 "use client";
C:\Users\Admin\terragest\src\components\ui\ProductRealtimeForm.tsx:1 "use client";
C:\Users\Admin\terragest\src\components\ui\ProductRealtimeForm.tsx:4 useState,
C:\Users\Admin\terragest\src\components\ui\ProductRealtimeForm.tsx:15 useState("");
C:\Users\Admin\terragest\src\components\ui\ProductRealtimeForm.tsx:19 useState("");
C:\Users\Admin\terragest\src\components\ui\ProductRealtimeForm.tsx:23 useState(false);
C:\Users\Admin\terragest\src\contexts\AuthContext.tsx:1 "use client";
C:\Users\Admin\terragest\src\contexts\AuthContext.tsx:5 User,
C:\Users\Admin\terragest\src\contexts\AuthContext.tsx:10 useContext,
C:\Users\Admin\terragest\src\contexts\AuthContext.tsx:11 useEffect,
C:\Users\Admin\terragest\src\contexts\AuthContext.tsx:12 useState,
C:\Users\Admin\terragest\src\contexts\AuthContext.tsx:18 user: User | null;
C:\Users\Admin\terragest\src\contexts\AuthContext.tsx:23 user: null,
C:\Users\Admin\terragest\src\contexts\AuthContext.tsx:32 const [user, setUser] =
C:\Users\Admin\terragest\src\contexts\AuthContext.tsx:33 useState<User | null>(null);
C:\Users\Admin\terragest\src\contexts\AuthContext.tsx:36 useState(true);
C:\Users\Admin\terragest\src\contexts\AuthContext.tsx:38 useEffect(() => {
C:\Users\Admin\terragest\src\contexts\AuthContext.tsx:42 (user) => {
C:\Users\Admin\terragest\src\contexts\AuthContext.tsx:43 setUser(user);
C:\Users\Admin\terragest\src\contexts\AuthContext.tsx:53 value={{ user, loading }}
C:\Users\Admin\terragest\src\contexts\AuthContext.tsx:60 export const useAuth = () =>
C:\Users\Admin\terragest\src\contexts\AuthContext.tsx:61 useContext(AuthContext);
C:\Users\Admin\terragest\src\core\auth\auth-enterprise-layer.ts:2 User,
C:\Users\Admin\terragest\src\core\auth\auth-enterprise-layer.ts:12 user: User | null
C:\Users\Admin\terragest\src\core\auth\auth-enterprise-layer.ts:15 let currentUser:
C:\Users\Admin\terragest\src\core\auth\auth-enterprise-layer.ts:16 User | null = null;
C:\Users\Admin\terragest\src\core\auth\auth-enterprise-layer.ts:23 (user) => {
C:\Users\Admin\terragest\src\core\auth\auth-enterprise-layer.ts:24 currentUser = user;
C:\Users\Admin\terragest\src\core\auth\auth-enterprise-layer.ts:27 listener(user);
C:\Users\Admin\terragest\src\core\auth\auth-enterprise-layer.ts:32 user?.email
C:\Users\Admin\terragest\src\core\auth\auth-enterprise-layer.ts:37 export function getCurrentUser() {
C:\Users\Admin\terragest\src\core\auth\auth-enterprise-layer.ts:38 return currentUser;
C:\Users\Admin\terragest\src\core\auth\auth-enterprise-layer.ts:46 listener(currentUser);
C:\Users\Admin\terragest\src\core\collaboration\collaborative-runtime.ts:2 userId: string;
C:\Users\Admin\terragest\src\core\collaboration\collaborative-runtime.ts:4 userName: string;
C:\Users\Admin\terragest\src\core\collaboration\collaborative-runtime.ts:15 const activeUsers:
C:\Users\Admin\terragest\src\core\collaboration\collaborative-runtime.ts:22 activeUsers.find(
C:\Users\Admin\terragest\src\core\collaboration\collaborative-runtime.ts:23 (user) =>
C:\Users\Admin\terragest\src\core\collaboration\collaborative-runtime.ts:24 user.userId ===
C:\Users\Admin\terragest\src\core\collaboration\collaborative-runtime.ts:25 presence.userId
C:\Users\Admin\terragest\src\core\collaboration\collaborative-runtime.ts:32 activeUsers.push(
C:\Users\Admin\terragest\src\core\collaboration\collaborative-runtime.ts:37 "ERP USER JOINED RUNTIME",
C:\Users\Admin\terragest\src\core\collaboration\collaborative-runtime.ts:38 presence.userName
C:\Users\Admin\terragest\src\core\collaboration\collaborative-runtime.ts:43 userId: string
C:\Users\Admin\terragest\src\core\collaboration\collaborative-runtime.ts:46 activeUsers.findIndex(
C:\Users\Admin\terragest\src\core\collaboration\collaborative-runtime.ts:47 (user) =>
C:\Users\Admin\terragest\src\core\collaboration\collaborative-runtime.ts:48 user.userId ===
C:\Users\Admin\terragest\src\core\collaboration\collaborative-runtime.ts:49 userId
C:\Users\Admin\terragest\src\core\collaboration\collaborative-runtime.ts:53 activeUsers.splice(
C:\Users\Admin\terragest\src\core\collaboration\collaborative-runtime.ts:60 "ERP USER LEFT RUNTIME",
C:\Users\Admin\terragest\src\core\collaboration\collaborative-runtime.ts:61 userId
C:\Users\Admin\terragest\src\core\collaboration\collaborative-runtime.ts:66 userId: string,
C:\Users\Admin\terragest\src\core\collaboration\collaborative-runtime.ts:69 const user =
C:\Users\Admin\terragest\src\core\collaboration\collaborative-runtime.ts:70 activeUsers.find(
C:\Users\Admin\terragest\src\core\collaboration\collaborative-runtime.ts:72 item.userId ===
C:\Users\Admin\terragest\src\core\collaboration\collaborative-runtime.ts:73 userId
C:\Users\Admin\terragest\src\core\collaboration\collaborative-runtime.ts:76 if (!user) {
C:\Users\Admin\terragest\src\core\collaboration\collaborative-runtime.ts:80 user.activity =
C:\Users\Admin\terragest\src\core\collaboration\collaborative-runtime.ts:85 return activeUsers;
C:\Users\Admin\terragest\src\core\event-store\event-store.ts:14 user?: string;
C:\Users\Admin\terragest\src\core\event-store\event-store.ts:25 user?: string;
C:\Users\Admin\terragest\src\core\event-store\event-store.ts:41 user:
C:\Users\Admin\terragest\src\core\event-store\event-store.ts:42 options?.user,
C:\Users\Admin\terragest\src\core\layout\AppShell.tsx:1 "use client";
C:\Users\Admin\terragest\src\core\layout\Sidebar.tsx:1 "use client";
C:\Users\Admin\terragest\src\core\permissions\permission-engine.ts:1 export type ERPUserRole =
C:\Users\Admin\terragest\src\core\permissions\permission-engine.ts:23 ERPUserRole,
C:\Users\Admin\terragest\src\core\permissions\permission-engine.ts:104 role: ERPUserRole,
C:\Users\Admin\terragest\src\core\permissions\permissions.ts:4 USER: "USER",
C:\Users\Admin\terragest\src\core\schemas\exploitations.schema.ts:55 statuses: [
C:\Users\Admin\terragest\src\core\schemas\materiels.schema.ts:47 statuses: [
C:\Users\Admin\terragest\src\core\schemas\terrains.schema.ts:47 statuses: [
C:\Users\Admin\terragest\src\core\schemas\types.ts:39 statuses?: ERPStatus[];
C:\Users\Admin\terragest\src\core\security-audit\security-audit-engine.ts:6 userId?: string;
C:\Users\Admin\terragest\src\core\security-audit\security-audit-engine.ts:8 userName?: string;
C:\Users\Admin\terragest\src\core\security-audit\security-audit-engine.ts:74 export function getAuditsByUser(
C:\Users\Admin\terragest\src\core\security-audit\security-audit-engine.ts:75 userId: string
C:\Users\Admin\terragest\src\core\security-audit\security-audit-engine.ts:79 entry.userId ===
C:\Users\Admin\terragest\src\core\security-audit\security-audit-engine.ts:80 userId
C:\Users\Admin\terragest\src\core\status\register-statuses.ts:2 registerStatuses,
C:\Users\Admin\terragest\src\core\status\register-statuses.ts:5 registerStatuses({
C:\Users\Admin\terragest\src\core\status\register-statuses.ts:8 statuses: [
C:\Users\Admin\terragest\src\core\status\register-statuses.ts:43 registerStatuses({
C:\Users\Admin\terragest\src\core\status\register-statuses.ts:46 statuses: [
C:\Users\Admin\terragest\src\core\status\register-statuses.ts:79 registerStatuses({
C:\Users\Admin\terragest\src\core\status\register-statuses.ts:82 statuses: [
C:\Users\Admin\terragest\src\core\status\status-engine.ts:16 export type ERPModuleStatuses = {
C:\Users\Admin\terragest\src\core\status\status-engine.ts:19 statuses:
C:\Users\Admin\terragest\src\core\status\status-engine.ts:24 ERPModuleStatuses[] = [];
C:\Users\Admin\terragest\src\core\status\status-engine.ts:26 export function registerStatuses(
C:\Users\Admin\terragest\src\core\status\status-engine.ts:27 config: ERPModuleStatuses
C:\Users\Admin\terragest\src\core\status\status-engine.ts:32 export function getModuleStatuses(
C:\Users\Admin\terragest\src\core\status\status-engine.ts:47 getModuleStatuses(module);
C:\Users\Admin\terragest\src\core\status\status-engine.ts:54 config.statuses.find(
C:\Users\Admin\terragest\src\data-platform\etl\ETLPipeline.ts:6 DataWarehouseService,
C:\Users\Admin\terragest\src\data-platform\etl\ETLPipeline.ts:7 } from "@/data-platform/warehouse/DataWarehouseService";
C:\Users\Admin\terragest\src\data-platform\etl\ETLPipeline.ts:21 await DataWarehouseService.store(
C:\Users\Admin\terragest\src\data-platform\warehouse\DataWarehouseService.ts:1 export const DataWarehouseService = {
C:\Users\Admin\terragest\src\data-platform\warehouse\DataWarehouseService.ts:10 `[WAREHOUSE]`,
C:\Users\Admin\terragest\src\features\alerts\components\AlertsPanel.tsx:1 "use client";
C:\Users\Admin\terragest\src\features\alerts\components\AlertsPanel.tsx:3 import { useAlerts }
C:\Users\Admin\terragest\src\features\alerts\components\AlertsPanel.tsx:4 from "@/features/alerts/hooks/useAlerts";
C:\Users\Admin\terragest\src\features\alerts\components\AlertsPanel.tsx:11 } = useAlerts();
C:\Users\Admin\terragest\src\features\alerts\hooks\useAlerts.ts:1 "use client";
C:\Users\Admin\terragest\src\features\alerts\hooks\useAlerts.ts:3 import { useMemo }
C:\Users\Admin\terragest\src\features\alerts\hooks\useAlerts.ts:6 import { useProducts }
C:\Users\Admin\terragest\src\features\alerts\hooks\useAlerts.ts:7 from "@/features/produits/hooks/useProducts";
C:\Users\Admin\terragest\src\features\alerts\hooks\useAlerts.ts:12 export function useAlerts() {
C:\Users\Admin\terragest\src\features\alerts\hooks\useAlerts.ts:17 } = useProducts();
C:\Users\Admin\terragest\src\features\alerts\hooks\useAlerts.ts:20 useMemo(() => {
C:\Users\Admin\terragest\src\features\analytics\components\AnalyticsCards.tsx:1 "use client";
C:\Users\Admin\terragest\src\features\analytics\components\AnalyticsCards.tsx:6 import { useAnalytics }
C:\Users\Admin\terragest\src\features\analytics\components\AnalyticsCards.tsx:7 from "@/features/analytics/hooks/useAnalytics";
C:\Users\Admin\terragest\src\features\analytics\components\AnalyticsCards.tsx:15 } = useAnalytics();
C:\Users\Admin\terragest\src\features\analytics\components\DashboardBarChart.tsx:1 "use client";
C:\Users\Admin\terragest\src\features\analytics\components\KpiBarChart.tsx:1 "use client";
C:\Users\Admin\terragest\src\features\analytics\components\KpiLineChart.tsx:1 "use client";
C:\Users\Admin\terragest\src\features\analytics\components\KpiPieChart.tsx:1 "use client";
C:\Users\Admin\terragest\src\features\analytics\components\ProductsCategoryChart.tsx:1 "use client";
C:\Users\Admin\terragest\src\features\analytics\components\ProductsCategoryChart.tsx:11 import { useProducts }
C:\Users\Admin\terragest\src\features\analytics\components\ProductsCategoryChart.tsx:12 from "@/features/produits/hooks/useProducts";
C:\Users\Admin\terragest\src\features\analytics\components\ProductsCategoryChart.tsx:20 } = useProducts();
C:\Users\Admin\terragest\src\features\analytics\components\StockAlerts.tsx:1 "use client";
C:\Users\Admin\terragest\src\features\analytics\components\StockValueChart.tsx:1 "use client";
C:\Users\Admin\terragest\src\features\analytics\components\StockValueChart.tsx:12 import { useProducts }
C:\Users\Admin\terragest\src\features\analytics\components\StockValueChart.tsx:13 from "@/features/produits/hooks/useProducts";
C:\Users\Admin\terragest\src\features\analytics\components\StockValueChart.tsx:21 } = useProducts();
C:\Users\Admin\terragest\src\features\analytics\hooks\useAnalytics.ts:1 "use client";
C:\Users\Admin\terragest\src\features\analytics\hooks\useAnalytics.ts:3 import { useMemo }
C:\Users\Admin\terragest\src\features\analytics\hooks\useAnalytics.ts:6 import { useProducts }
C:\Users\Admin\terragest\src\features\analytics\hooks\useAnalytics.ts:7 from "@/features/produits/hooks/useProducts";
C:\Users\Admin\terragest\src\features\analytics\hooks\useAnalytics.ts:9 export function useAnalytics() {
C:\Users\Admin\terragest\src\features\analytics\hooks\useAnalytics.ts:14 } = useProducts();
C:\Users\Admin\terragest\src\features\analytics\hooks\useAnalytics.ts:17 useMemo(() => {
C:\Users\Admin\terragest\src\features\analytics\hooks\useDashboardStats.ts:1 "use client";
C:\Users\Admin\terragest\src\features\analytics\hooks\useDashboardStats.ts:3 import { useEffect, useState } from "react";
C:\Users\Admin\terragest\src\features\analytics\hooks\useDashboardStats.ts:12 export function useDashboardStats() {
C:\Users\Admin\terragest\src\features\analytics\hooks\useDashboardStats.ts:14 useState<DashboardStats>({
C:\Users\Admin\terragest\src\features\analytics\hooks\useDashboardStats.ts:21 useEffect(() => {
C:\Users\Admin\terragest\src\features\analytics\hooks\useDashboardStats.ts:33 export default useDashboardStats;
C:\Users\Admin\terragest\src\features\auth\components\LoginForm.tsx:1 "use client";
C:\Users\Admin\terragest\src\features\auth\components\LoginForm.tsx:4 useState,
C:\Users\Admin\terragest\src\features\auth\components\LoginForm.tsx:8 useRouter,
C:\Users\Admin\terragest\src\features\auth\components\LoginForm.tsx:18 useRouter();
C:\Users\Admin\terragest\src\features\auth\components\LoginForm.tsx:22 useState("");
C:\Users\Admin\terragest\src\features\auth\components\LoginForm.tsx:26 useState("");
C:\Users\Admin\terragest\src\features\auth\components\LoginForm.tsx:30 useState(false);
C:\Users\Admin\terragest\src\features\auth\components\LoginForm.tsx:34 useState("");
C:\Users\Admin\terragest\src\features\auth\components\RoleBadge.tsx:1 import { UserRole }
C:\Users\Admin\terragest\src\features\auth\components\RoleBadge.tsx:2 from "@/features/auth/types/UserRole";
C:\Users\Admin\terragest\src\features\auth\components\RoleBadge.tsx:6 role: UserRole;
C:\Users\Admin\terragest\src\features\auth\components\RoleGuard.tsx:3 import { usePermission } from "@/features/auth/hooks/usePermission";
C:\Users\Admin\terragest\src\features\auth\components\RoleGuard.tsx:21 usePermission(
C:\Users\Admin\terragest\src\features\auth\guards\AuthGuard.tsx:1 "use client";
C:\Users\Admin\terragest\src\features\auth\guards\AuthGuard.tsx:3 import { useRouter }
C:\Users\Admin\terragest\src\features\auth\guards\AuthGuard.tsx:7 useEffect,
C:\Users\Admin\terragest\src\features\auth\guards\AuthGuard.tsx:11 useEnterpriseAuth,
C:\Users\Admin\terragest\src\features\auth\guards\AuthGuard.tsx:19 useRouter();
C:\Users\Admin\terragest\src\features\auth\guards\AuthGuard.tsx:22 user,
C:\Users\Admin\terragest\src\features\auth\guards\AuthGuard.tsx:25 useEnterpriseAuth();
C:\Users\Admin\terragest\src\features\auth\guards\AuthGuard.tsx:27 useEffect(() => {
C:\Users\Admin\terragest\src\features\auth\guards\AuthGuard.tsx:31 !user
C:\Users\Admin\terragest\src\features\auth\guards\AuthGuard.tsx:40 user,
C:\Users\Admin\terragest\src\features\auth\guards\AuthGuard.tsx:54 !user
C:\Users\Admin\terragest\src\features\auth\guards\RoleGuard.tsx:1 "use client";
C:\Users\Admin\terragest\src\features\auth\guards\RoleGuard.tsx:6 import { UserRole }
C:\Users\Admin\terragest\src\features\auth\guards\RoleGuard.tsx:7 from "@/features/auth/types/UserRole";
C:\Users\Admin\terragest\src\features\auth\guards\RoleGuard.tsx:9 import { usePermissions }
C:\Users\Admin\terragest\src\features\auth\guards\RoleGuard.tsx:10 from "@/features/auth/hooks/usePermissions";
C:\Users\Admin\terragest\src\features\auth\guards\RoleGuard.tsx:13 role?: UserRole;
C:\Users\Admin\terragest\src\features\auth\guards\RoleGuard.tsx:17 typeof usePermissions
C:\Users\Admin\terragest\src\features\auth\guards\RoleGuard.tsx:30 usePermissions(role);
C:\Users\Admin\terragest\src\features\auth\hooks\usePermission.ts:3 export const usePermission = (
C:\Users\Admin\terragest\src\features\auth\hooks\usePermissions.ts:3 export function usePermissions(role: string) {
C:\Users\Admin\terragest\src\features\auth\hooks\usePermissions.ts:11 canManageUsers:
C:\Users\Admin\terragest\src\features\auth\hooks\usePermissions.ts:12 PermissionService.canManageUsers(role),
C:\Users\Admin\terragest\src\features\auth\hooks\usePermissions.ts:16 export default usePermissions;
C:\Users\Admin\terragest\src\features\auth\hooks\useSessionStore.ts:14 export const useSessionStore =
C:\Users\Admin\terragest\src\features\auth\providers\EnterpriseAuthProvider.tsx:1 "use client";
C:\Users\Admin\terragest\src\features\auth\providers\EnterpriseAuthProvider.tsx:5 useContext,
C:\Users\Admin\terragest\src\features\auth\providers\EnterpriseAuthProvider.tsx:6 useEffect,
C:\Users\Admin\terragest\src\features\auth\providers\EnterpriseAuthProvider.tsx:7 useState,
C:\Users\Admin\terragest\src\features\auth\providers\EnterpriseAuthProvider.tsx:20 const [user,
C:\Users\Admin\terragest\src\features\auth\providers\EnterpriseAuthProvider.tsx:21 setUser] =
C:\Users\Admin\terragest\src\features\auth\providers\EnterpriseAuthProvider.tsx:22 useState<any>(null);
C:\Users\Admin\terragest\src\features\auth\providers\EnterpriseAuthProvider.tsx:26 useState(true);
C:\Users\Admin\terragest\src\features\auth\providers\EnterpriseAuthProvider.tsx:28 useEffect(() => {
C:\Users\Admin\terragest\src\features\auth\providers\EnterpriseAuthProvider.tsx:33 currentUser: any
C:\Users\Admin\terragest\src\features\auth\providers\EnterpriseAuthProvider.tsx:36 setUser(
C:\Users\Admin\terragest\src\features\auth\providers\EnterpriseAuthProvider.tsx:37 currentUser
C:\Users\Admin\terragest\src\features\auth\providers\EnterpriseAuthProvider.tsx:55 user,
C:\Users\Admin\terragest\src\features\auth\providers\EnterpriseAuthProvider.tsx:66 export const useEnterpriseAuth =
C:\Users\Admin\terragest\src\features\auth\providers\EnterpriseAuthProvider.tsx:67 () => useContext(AuthContext);
C:\Users\Admin\terragest\src\features\auth\services\AuthService.ts:1 "use client";
C:\Users\Admin\terragest\src\features\auth\services\PermissionService.ts:3 return ["admin", "manager", "user"].includes(role);
C:\Users\Admin\terragest\src\features\auth\services\PermissionService.ts:10 canManageUsers(role: string) {
C:\Users\Admin\terragest\src\features\auth\types\Permissions.ts:1 import { UserRole }
C:\Users\Admin\terragest\src\features\auth\types\Permissions.ts:2 from "@/features/auth/types/UserRole";
C:\Users\Admin\terragest\src\features\auth\types\Permissions.ts:10 ] satisfies UserRole[],
C:\Users\Admin\terragest\src\features\auth\types\Permissions.ts:16 ] satisfies UserRole[],
C:\Users\Admin\terragest\src\features\auth\types\Permissions.ts:21 ] satisfies UserRole[],
C:\Users\Admin\terragest\src\features\auth\types\Permissions.ts:26 ] satisfies UserRole[],
C:\Users\Admin\terragest\src\features\auth\types\Permissions.ts:31 ] satisfies UserRole[],
C:\Users\Admin\terragest\src\features\auth\types\Permissions.ts:38 ] satisfies UserRole[],
C:\Users\Admin\terragest\src\features\auth\types\UserRole.ts:1 export type UserRole =
C:\Users\Admin\terragest\src\features\auth\types\USER_ROLE.ts:1 export type USER_ROLE =
C:\Users\Admin\terragest\src\features\billing\components\BillingPlans.tsx:1 "use client";
C:\Users\Admin\terragest\src\features\billing\components\FeatureGuard.tsx:1 "use client";
C:\Users\Admin\terragest\src\features\billing\hooks\useSubscriptions.ts:1 "use client";
C:\Users\Admin\terragest\src\features\billing\hooks\useSubscriptions.ts:3 import { useCollection }
C:\Users\Admin\terragest\src\features\billing\hooks\useSubscriptions.ts:4 from "@/hooks/useCollection";
C:\Users\Admin\terragest\src\features\billing\hooks\useSubscriptions.ts:9 export function useSubscriptions() {
C:\Users\Admin\terragest\src\features\billing\hooks\useSubscriptions.ts:11 return useCollection<Subscription>(
C:\Users\Admin\terragest\src\features\billing\services\BillingService.ts:18 maxUsers: 3,
C:\Users\Admin\terragest\src\features\billing\services\BillingService.ts:26 maxUsers: 25,
C:\Users\Admin\terragest\src\features\billing\services\BillingService.ts:34 maxUsers: 999,
C:\Users\Admin\terragest\src\features\billing\services\BillingService.ts:42 maxUsers: 1,
C:\Users\Admin\terragest\src\features\dashboard\components\DashboardKPICards.tsx:1 "use client";
C:\Users\Admin\terragest\src\features\dashboard\widgets\DashboardActivityFeed.tsx:1 "use client";
C:\Users\Admin\terragest\src\features\dashboard\widgets\DashboardAlertCenter.tsx:1 "use client";
C:\Users\Admin\terragest\src\features\dashboard\widgets\DashboardAnalyticsPanel.tsx:1 "use client";
C:\Users\Admin\terragest\src\features\exploitations\components\ExploitationEditModal.tsx:1 "use client";
C:\Users\Admin\terragest\src\features\exploitations\components\ExploitationEditModal.tsx:4 useEffect,
C:\Users\Admin\terragest\src\features\exploitations\components\ExploitationEditModal.tsx:8 useForm,
C:\Users\Admin\terragest\src\features\exploitations\components\ExploitationEditModal.tsx:48 } = useForm<ExploitationInput>({
C:\Users\Admin\terragest\src\features\exploitations\components\ExploitationEditModal.tsx:56 useEffect(() => {
C:\Users\Admin\terragest\src\features\exploitations\components\ExploitationForm.tsx:1 "use client";
C:\Users\Admin\terragest\src\features\exploitations\components\ExploitationForm.tsx:4 useForm,
C:\Users\Admin\terragest\src\features\exploitations\components\ExploitationForm.tsx:21 useToast,
C:\Users\Admin\terragest\src\features\exploitations\components\ExploitationForm.tsx:22 } from "@/hooks/useToast";
C:\Users\Admin\terragest\src\features\exploitations\components\ExploitationForm.tsx:30 } = useToast();
C:\Users\Admin\terragest\src\features\exploitations\components\ExploitationForm.tsx:40 } = useForm<ExploitationInput>({
C:\Users\Admin\terragest\src\features\exploitations\components\ExploitationsEnterpriseTable.tsx:1 "use client";
C:\Users\Admin\terragest\src\features\exploitations\components\ExploitationsFilterBar.tsx:1 "use client";
C:\Users\Admin\terragest\src\features\exploitations\components\ExploitationsSearchBar.tsx:1 "use client";
C:\Users\Admin\terragest\src\features\exploitations\components\ExploitationsTable.tsx:1 "use client";
C:\Users\Admin\terragest\src\features\exploitations\components\LoadMoreButton.tsx:1 "use client";
C:\Users\Admin\terragest\src\features\exploitations\hooks\useExploitations.ts:1 "use client";
C:\Users\Admin\terragest\src\features\exploitations\hooks\useExploitations.ts:4 useEffect,
C:\Users\Admin\terragest\src\features\exploitations\hooks\useExploitations.ts:5 useState,
C:\Users\Admin\terragest\src\features\exploitations\hooks\useExploitations.ts:19 export const useExploitations =
C:\Users\Admin\terragest\src\features\exploitations\hooks\useExploitations.ts:26 useState<any[]>([]);
C:\Users\Admin\terragest\src\features\exploitations\hooks\useExploitations.ts:30 useState(true);
C:\Users\Admin\terragest\src\features\exploitations\hooks\useExploitations.ts:32 useEffect(() => {
C:\Users\Admin\terragest\src\features\exploitations\hooks\usePaginatedExploitations.ts:1 "use client";
C:\Users\Admin\terragest\src\features\exploitations\hooks\usePaginatedExploitations.ts:4 useEffect,
C:\Users\Admin\terragest\src\features\exploitations\hooks\usePaginatedExploitations.ts:5 useState,
C:\Users\Admin\terragest\src\features\exploitations\hooks\usePaginatedExploitations.ts:24 export const usePaginatedExploitations =
C:\Users\Admin\terragest\src\features\exploitations\hooks\usePaginatedExploitations.ts:31 useState<any[]>([]);
C:\Users\Admin\terragest\src\features\exploitations\hooks\usePaginatedExploitations.ts:35 useState(true);
C:\Users\Admin\terragest\src\features\exploitations\hooks\usePaginatedExploitations.ts:39 useState(false);
C:\Users\Admin\terragest\src\features\exploitations\hooks\usePaginatedExploitations.ts:43 useState<any>(null);
C:\Users\Admin\terragest\src\features\exploitations\hooks\usePaginatedExploitations.ts:47 useState(true);
C:\Users\Admin\terragest\src\features\exploitations\hooks\usePaginatedExploitations.ts:188 useEffect(() => {
C:\Users\Admin\terragest\src\features\exports\components\ExportButtons.tsx:1 "use client";
C:\Users\Admin\terragest\src\features\exports\services\ExportService.ts:1 "use client";
C:\Users\Admin\terragest\src\features\invitations\components\InvitationForm.tsx:1 "use client";
C:\Users\Admin\terragest\src\features\invitations\components\InvitationForm.tsx:4 useState,
C:\Users\Admin\terragest\src\features\invitations\components\InvitationForm.tsx:14 useState("");
C:\Users\Admin\terragest\src\features\invitations\components\InvitationForm.tsx:17 useState("viewer");
C:\Users\Admin\terragest\src\features\invitations\hooks\useInvitations.ts:1 "use client";
C:\Users\Admin\terragest\src\features\invitations\hooks\useInvitations.ts:3 import { useCollection }
C:\Users\Admin\terragest\src\features\invitations\hooks\useInvitations.ts:4 from "@/hooks/useCollection";
C:\Users\Admin\terragest\src\features\invitations\hooks\useInvitations.ts:9 export function useInvitations() {
C:\Users\Admin\terragest\src\features\invitations\hooks\useInvitations.ts:11 return useCollection<Invitation>(
C:\Users\Admin\terragest\src\features\invitations\services\InvitationService.ts:44 userId: string
C:\Users\Admin\terragest\src\features\invitations\services\InvitationService.ts:87 userId,
C:\Users\Admin\terragest\src\features\invitations\types\Invitation.ts:6 import { UserRole }
C:\Users\Admin\terragest\src\features\invitations\types\Invitation.ts:7 from "@/features/auth/types/UserRole";
C:\Users\Admin\terragest\src\features\invitations\types\Invitation.ts:24 role: UserRole;
C:\Users\Admin\terragest\src\features\materiels\runtime\EnterpriseMaterielFlow.ts:63 ERPUserRole
C:\Users\Admin\terragest\src\features\memberships\hooks\useMemberships.ts:1 "use client";
C:\Users\Admin\terragest\src\features\memberships\hooks\useMemberships.ts:3 import { useCollection }
C:\Users\Admin\terragest\src\features\memberships\hooks\useMemberships.ts:4 from "@/hooks/useCollection";
C:\Users\Admin\terragest\src\features\memberships\hooks\useMemberships.ts:9 export function useMemberships() {
C:\Users\Admin\terragest\src\features\memberships\hooks\useMemberships.ts:11 return useCollection<Membership>(
C:\Users\Admin\terragest\src\features\memberships\services\MembershipService.ts:13 if (!membership.userId) {
C:\Users\Admin\terragest\src\features\memberships\types\Membership.ts:6 import { UserRole }
C:\Users\Admin\terragest\src\features\memberships\types\Membership.ts:7 from "@/features/auth/types/UserRole";
C:\Users\Admin\terragest\src\features\memberships\types\Membership.ts:12 userId: string;
C:\Users\Admin\terragest\src\features\memberships\types\Membership.ts:18 role: UserRole;
C:\Users\Admin\terragest\src\features\notifications\components\NotificationCenter.tsx:1 "use client";
C:\Users\Admin\terragest\src\features\notifications\components\NotificationCenter.tsx:7 import { useNotifications }
C:\Users\Admin\terragest\src\features\notifications\components\NotificationCenter.tsx:8 from "@/features/notifications/hooks/useNotifications";
C:\Users\Admin\terragest\src\features\notifications\components\NotificationCenter.tsx:22 } = useNotifications();
C:\Users\Admin\terragest\src\features\notifications\components\RealtimeNotifications.tsx:1 "use client";
C:\Users\Admin\terragest\src\features\notifications\components\RealtimeNotifications.tsx:3 import { useEffect } from "react";
C:\Users\Admin\terragest\src\features\notifications\components\RealtimeNotifications.tsx:9 import { useRealtimeCollection } from "@/hooks/useRealtimeCollection";
C:\Users\Admin\terragest\src\features\notifications\components\RealtimeNotifications.tsx:22 } = useRealtimeCollection({
C:\Users\Admin\terragest\src\features\notifications\components\RealtimeNotifications.tsx:30 useEffect(() => {
C:\Users\Admin\terragest\src\features\notifications\hooks\useNotifications.ts:1 "use client";
C:\Users\Admin\terragest\src\features\notifications\hooks\useNotifications.ts:4 useEffect,
C:\Users\Admin\terragest\src\features\notifications\hooks\useNotifications.ts:5 useState,
C:\Users\Admin\terragest\src\features\notifications\hooks\useNotifications.ts:15 export function useNotifications() {
C:\Users\Admin\terragest\src\features\notifications\hooks\useNotifications.ts:20 ] = useState<
C:\Users\Admin\terragest\src\features\notifications\hooks\useNotifications.ts:24 useEffect(() => {
C:\Users\Admin\terragest\src\features\observability\components\AuditTable.tsx:1 "use client";
C:\Users\Admin\terragest\src\features\observability\components\AuditTable.tsx:3 import { useAuditEvents }
C:\Users\Admin\terragest\src\features\observability\components\AuditTable.tsx:4 from "@/features/observability/hooks/useAuditEvents";
C:\Users\Admin\terragest\src\features\observability\components\AuditTable.tsx:10 useAuditEvents();
C:\Users\Admin\terragest\src\features\observability\components\RuntimeStatusCard.tsx:1 import { useRuntimeHealth }
C:\Users\Admin\terragest\src\features\observability\components\RuntimeStatusCard.tsx:2 from "../hooks/useRuntimeHealth";
C:\Users\Admin\terragest\src\features\observability\components\RuntimeStatusCard.tsx:8 useRuntimeHealth();
C:\Users\Admin\terragest\src\features\observability\dashboards\LiveRuntimeDashboard.tsx:1 "use client";
C:\Users\Admin\terragest\src\features\observability\hooks\useAuditEvents.ts:1 "use client";
C:\Users\Admin\terragest\src\features\observability\hooks\useAuditEvents.ts:4 useEffect,
C:\Users\Admin\terragest\src\features\observability\hooks\useAuditEvents.ts:5 useState,
C:\Users\Admin\terragest\src\features\observability\hooks\useAuditEvents.ts:15 export function useAuditEvents() {
C:\Users\Admin\terragest\src\features\observability\hooks\useAuditEvents.ts:20 ] = useState<
C:\Users\Admin\terragest\src\features\observability\hooks\useAuditEvents.ts:24 useEffect(() => {
C:\Users\Admin\terragest\src\features\observability\hooks\useRuntimeHealth.ts:1 import { useEffect, useState }
C:\Users\Admin\terragest\src\features\observability\hooks\useRuntimeHealth.ts:10 export function useRuntimeHealth() {
C:\Users\Admin\terragest\src\features\observability\hooks\useRuntimeHealth.ts:13 useState<RuntimeHealth | null>(
C:\Users\Admin\terragest\src\features\observability\hooks\useRuntimeHealth.ts:17 useEffect(() => {
C:\Users\Admin\terragest\src\features\observability\types\AuditEvent.ts:16 userId?: string;
C:\Users\Admin\terragest\src\features\observability\widgets\live\LiveEventStream.tsx:1 "use client";
C:\Users\Admin\terragest\src\features\observability\widgets\live\LiveEventStream.tsx:5 useEffect,
C:\Users\Admin\terragest\src\features\observability\widgets\live\LiveEventStream.tsx:6 useSyncExternalStore,
C:\Users\Admin\terragest\src\features\observability\widgets\live\LiveEventStream.tsx:28 useEffect(() => {
C:\Users\Admin\terragest\src\features\observability\widgets\live\LiveEventStream.tsx:43 useSyncExternalStore(
C:\Users\Admin\terragest\src\features\observability\widgets\workflows\WorkflowExecutionMonitor.tsx:1 "use client";
C:\Users\Admin\terragest\src\features\observability\widgets\workflows\WorkflowExecutionMonitor.tsx:4 useEffect,
C:\Users\Admin\terragest\src\features\observability\widgets\workflows\WorkflowExecutionMonitor.tsx:5 useSyncExternalStore,
C:\Users\Admin\terragest\src\features\observability\widgets\workflows\WorkflowExecutionMonitor.tsx:21 useEffect(() => {
C:\Users\Admin\terragest\src\features\observability\widgets\workflows\WorkflowExecutionMonitor.tsx:36 useSyncExternalStore(
C:\Users\Admin\terragest\src\features\offline\components\OfflineSyncCard.tsx:1 "use client";
C:\Users\Admin\terragest\src\features\offline\components\OfflineSyncCard.tsx:4 useState,
C:\Users\Admin\terragest\src\features\offline\components\OfflineSyncCard.tsx:16 ] = useState(false);
C:\Users\Admin\terragest\src\features\offline\components\OfflineSyncCard.tsx:21 ] = useState<number | null>(
C:\Users\Admin\terragest\src\features\offline\hooks\useOfflineStatus.ts:1 "use client";
C:\Users\Admin\terragest\src\features\offline\hooks\useOfflineStatus.ts:4 useEffect,
C:\Users\Admin\terragest\src\features\offline\hooks\useOfflineStatus.ts:5 useState,
C:\Users\Admin\terragest\src\features\offline\hooks\useOfflineStatus.ts:8 export function useOfflineStatus() {
C:\Users\Admin\terragest\src\features\offline\hooks\useOfflineStatus.ts:13 ] = useState(true);
C:\Users\Admin\terragest\src\features\offline\hooks\useOfflineStatus.ts:15 useEffect(() => {
C:\Users\Admin\terragest\src\features\organisations\components\OrganisationSwitcher.tsx:1 "use client";
C:\Users\Admin\terragest\src\features\organization-analytics\components\OrganizationAnalyticsCards.tsx:1 "use client";
C:\Users\Admin\terragest\src\features\organization-analytics\components\OrganizationAnalyticsCards.tsx:4 useEffect,
C:\Users\Admin\terragest\src\features\organization-analytics\components\OrganizationAnalyticsCards.tsx:5 useState,
C:\Users\Admin\terragest\src\features\organization-analytics\components\OrganizationAnalyticsCards.tsx:15 useState<any>(null);
C:\Users\Admin\terragest\src\features\organization-analytics\components\OrganizationAnalyticsCards.tsx:17 useEffect(() => {
C:\Users\Admin\terragest\src\features\organization-analytics\components\OrganizationAnalyticsCards.tsx:40 value: metrics.users,
C:\Users\Admin\terragest\src\features\organization-analytics\components\OrganizationAnalyticsCards.tsx:44 value: metrics.activeUsers,
C:\Users\Admin\terragest\src\features\organization-analytics\components\PlanUsageCard.tsx:1 "use client";
C:\Users\Admin\terragest\src\features\organization-analytics\components\PlanUsageCard.tsx:4 useEffect,
C:\Users\Admin\terragest\src\features\organization-analytics\components\PlanUsageCard.tsx:5 useState,
C:\Users\Admin\terragest\src\features\organization-analytics\components\PlanUsageCard.tsx:15 useState<any>(null);
C:\Users\Admin\terragest\src\features\organization-analytics\components\PlanUsageCard.tsx:17 useEffect(() => {
C:\Users\Admin\terragest\src\features\organization-analytics\components\PlanUsageCard.tsx:93 metrics.limits.maxUsers
C:\Users\Admin\terragest\src\features\organization-analytics\services\OrganizationAnalyticsService.ts:10 users: 18,
C:\Users\Admin\terragest\src\features\organization-analytics\services\OrganizationAnalyticsService.ts:12 activeUsers: 12,
C:\Users\Admin\terragest\src\features\organizations\hooks\useOrganizations.ts:1 "use client";
C:\Users\Admin\terragest\src\features\organizations\hooks\useOrganizations.ts:3 import { useCollection }
C:\Users\Admin\terragest\src\features\organizations\hooks\useOrganizations.ts:4 from "@/hooks/useCollection";
C:\Users\Admin\terragest\src\features\organizations\hooks\useOrganizations.ts:9 export function useOrganizations() {
C:\Users\Admin\terragest\src\features\organizations\hooks\useOrganizations.ts:11 return useCollection<Organization>(
C:\Users\Admin\terragest\src\features\payments\components\CheckoutButton.tsx:1 "use client";
C:\Users\Admin\terragest\src\features\payments\components\CheckoutButton.tsx:4 useState,
C:\Users\Admin\terragest\src\features\payments\components\CheckoutButton.tsx:24 useState(false);
C:\Users\Admin\terragest\src\features\platform-monitoring\components\ERPStatusDashboard.tsx:1 "use client";
C:\Users\Admin\terragest\src\features\platform-monitoring\components\graphs\EventTimeline.tsx:1 "use client";
C:\Users\Admin\terragest\src\features\platform-monitoring\components\graphs\MetricsPanel.tsx:3 "use client";
C:\Users\Admin\terragest\src\features\produits\components\ProductEditForm.tsx:1 "use client";
C:\Users\Admin\terragest\src\features\produits\components\ProductEditForm.tsx:4 useEffect,
C:\Users\Admin\terragest\src\features\produits\components\ProductEditForm.tsx:5 useState,
C:\Users\Admin\terragest\src\features\produits\components\ProductEditForm.tsx:11 import { useDocument }
C:\Users\Admin\terragest\src\features\produits\components\ProductEditForm.tsx:12 from "@/hooks/useDocument";
C:\Users\Admin\terragest\src\features\produits\components\ProductEditForm.tsx:31 } = useDocument<Product>(
C:\Users\Admin\terragest\src\features\produits\components\ProductEditForm.tsx:37 useState<any>(null);
C:\Users\Admin\terragest\src\features\produits\components\ProductEditForm.tsx:39 useEffect(() => {
C:\Users\Admin\terragest\src\features\produits\components\ProductForm.tsx:1 "use client";
C:\Users\Admin\terragest\src\features\produits\components\ProductForm.tsx:3 import { useState }
C:\Users\Admin\terragest\src\features\produits\components\ProductForm.tsx:15 useState({
C:\Users\Admin\terragest\src\features\produits\components\ProductsTable.tsx:1 "use client";
C:\Users\Admin\terragest\src\features\produits\components\ProductsTable.tsx:6 useMemo,
C:\Users\Admin\terragest\src\features\produits\components\ProductsTable.tsx:7 useState,
C:\Users\Admin\terragest\src\features\produits\components\ProductsTable.tsx:22 import { useProducts }
C:\Users\Admin\terragest\src\features\produits\components\ProductsTable.tsx:23 from "@/features/produits/hooks/useProducts";
C:\Users\Admin\terragest\src\features\produits\components\ProductsTable.tsx:34 } = useProducts();
C:\Users\Admin\terragest\src\features\produits\components\ProductsTable.tsx:37 useState("");
C:\Users\Admin\terragest\src\features\produits\components\ProductsTable.tsx:40 useState<string | null>(null);
C:\Users\Admin\terragest\src\features\produits\components\ProductsTable.tsx:43 useMemo(() => {
C:\Users\Admin\terragest\src\features\produits\hooks\useProducts.ts:1 "use client";
C:\Users\Admin\terragest\src\features\produits\hooks\useProducts.ts:3 import { useCollection }
C:\Users\Admin\terragest\src\features\produits\hooks\useProducts.ts:4 from "@/hooks/useCollection";
C:\Users\Admin\terragest\src\features\produits\hooks\useProducts.ts:9 export function useProducts() {
C:\Users\Admin\terragest\src\features\produits\hooks\useProducts.ts:11 return useCollection<Product>(
C:\Users\Admin\terragest\src\features\pwa\components\OfflineStatusCard.tsx:1 "use client";
C:\Users\Admin\terragest\src\features\pwa\components\OfflineStatusCard.tsx:4 useEffect,
C:\Users\Admin\terragest\src\features\pwa\components\OfflineStatusCard.tsx:5 useState,
C:\Users\Admin\terragest\src\features\pwa\components\OfflineStatusCard.tsx:14 ] = useState(true);
C:\Users\Admin\terragest\src\features\pwa\components\OfflineStatusCard.tsx:16 useEffect(() => {
C:\Users\Admin\terragest\src\features\pwa\components\PWAInstallButton.tsx:1 "use client";
C:\Users\Admin\terragest\src\features\pwa\components\PWAInstallButton.tsx:4 useEffect,
C:\Users\Admin\terragest\src\features\pwa\components\PWAInstallButton.tsx:5 useState,
C:\Users\Admin\terragest\src\features\pwa\components\PWAInstallButton.tsx:14 ] = useState<any>(null);
C:\Users\Admin\terragest\src\features\pwa\components\PWAInstallButton.tsx:16 useEffect(() => {
C:\Users\Admin\terragest\src\features\pwa\components\PWAInstallButton.tsx:49 await deferredPrompt.userChoice;
C:\Users\Admin\terragest\src\features\runtime-supervision\RuntimeSupervisionDashboard.tsx:1 "use client";
C:\Users\Admin\terragest\src\features\teams\components\TeamMembersTable.tsx:1 "use client";
C:\Users\Admin\terragest\src\features\teams\components\TeamMembersTable.tsx:4 useEffect,
C:\Users\Admin\terragest\src\features\teams\components\TeamMembersTable.tsx:5 useState,
C:\Users\Admin\terragest\src\features\teams\components\TeamMembersTable.tsx:8 import { UserRole }
C:\Users\Admin\terragest\src\features\teams\components\TeamMembersTable.tsx:9 from "@/features/auth/types/UserRole";
C:\Users\Admin\terragest\src\features\teams\components\TeamMembersTable.tsx:18 useState<any[]>([]);
C:\Users\Admin\terragest\src\features\teams\components\TeamMembersTable.tsx:28 useEffect(() => {
C:\Users\Admin\terragest\src\features\teams\components\TeamMembersTable.tsx:47 role: UserRole
C:\Users\Admin\terragest\src\features\teams\components\TeamMembersTable.tsx:134 {member.userId}
C:\Users\Admin\terragest\src\features\teams\components\TeamMembersTable.tsx:144 e.target.value as UserRole
C:\Users\Admin\terragest\src\features\teams\services\TeamService.ts:1 import { UserRole }
C:\Users\Admin\terragest\src\features\teams\services\TeamService.ts:2 from "@/features/auth/types/UserRole";
C:\Users\Admin\terragest\src\features\teams\services\TeamService.ts:30 role: UserRole
C:\Users\Admin\terragest\src\features\tenancy\components\OrganizationSwitcher.tsx:1 "use client";
C:\Users\Admin\terragest\src\features\tenancy\components\OrganizationSwitcher.tsx:3 import { useTenant }
C:\Users\Admin\terragest\src\features\tenancy\components\OrganizationSwitcher.tsx:4 from "@/features/tenancy/hooks/useTenant";
C:\Users\Admin\terragest\src\features\tenancy\components\OrganizationSwitcher.tsx:10 useTenant() as any;
C:\Users\Admin\terragest\src\features\tenancy\context\TenantProvider.tsx:1 "use client";
C:\Users\Admin\terragest\src\features\tenancy\context\TenantProvider.tsx:6 useContext,
C:\Users\Admin\terragest\src\features\tenancy\context\TenantProvider.tsx:7 useMemo,
C:\Users\Admin\terragest\src\features\tenancy\context\TenantProvider.tsx:8 useState,
C:\Users\Admin\terragest\src\features\tenancy\context\TenantProvider.tsx:50 ] = useState(
C:\Users\Admin\terragest\src\features\tenancy\context\TenantProvider.tsx:59 useMemo(() => {
C:\Users\Admin\terragest\src\features\tenancy\context\TenantProvider.tsx:85 export const useTenantContext =
C:\Users\Admin\terragest\src\features\tenancy\context\TenantProvider.tsx:88 return useContext(
C:\Users\Admin\terragest\src\features\tenancy\hooks\useTenant.ts:1 "use client";
C:\Users\Admin\terragest\src\features\tenancy\hooks\useTenant.ts:4 useTenantContext,
C:\Users\Admin\terragest\src\features\tenancy\hooks\useTenant.ts:7 export function useTenant() {
C:\Users\Admin\terragest\src\features\tenancy\hooks\useTenant.ts:9 return useTenantContext();
C:\Users\Admin\terragest\src\features\workflow-engine\components\WorkflowDashboard.tsx:1 "use client";
C:\Users\Admin\terragest\src\hooks\useCollection.ts:1 "use client";
C:\Users\Admin\terragest\src\hooks\useCollection.ts:4 useEffect,
C:\Users\Admin\terragest\src\hooks\useCollection.ts:5 useState,
C:\Users\Admin\terragest\src\hooks\useCollection.ts:11 export function useCollection<T>(
C:\Users\Admin\terragest\src\hooks\useCollection.ts:16 useState<T[]>([]);
C:\Users\Admin\terragest\src\hooks\useCollection.ts:19 useState(true);
C:\Users\Admin\terragest\src\hooks\useCollection.ts:21 useEffect(() => {
C:\Users\Admin\terragest\src\hooks\useDocument.ts:1 "use client";
C:\Users\Admin\terragest\src\hooks\useDocument.ts:9 useEffect,
C:\Users\Admin\terragest\src\hooks\useDocument.ts:10 useState,
C:\Users\Admin\terragest\src\hooks\useDocument.ts:16 export function useDocument<T>(
C:\Users\Admin\terragest\src\hooks\useDocument.ts:22 useState<T | null>(null);
C:\Users\Admin\terragest\src\hooks\useDocument.ts:25 useState(true);
C:\Users\Admin\terragest\src\hooks\useDocument.ts:27 useEffect(() => {
C:\Users\Admin\terragest\src\hooks\useProducts.ts:1 "use client";
C:\Users\Admin\terragest\src\hooks\useProducts.ts:3 import { useQuery }
C:\Users\Admin\terragest\src\hooks\useProducts.ts:9 export const useProducts =
C:\Users\Admin\terragest\src\hooks\useProducts.ts:12 return useQuery({
C:\Users\Admin\terragest\src\hooks\useRealtime.ts:1 "use client";
C:\Users\Admin\terragest\src\hooks\useRealtime.ts:4 useEffect,
C:\Users\Admin\terragest\src\hooks\useRealtime.ts:5 useState,
C:\Users\Admin\terragest\src\hooks\useRealtime.ts:8 export const useRealtime =
C:\Users\Admin\terragest\src\hooks\useRealtime.ts:16 useState<T | null>(null);
C:\Users\Admin\terragest\src\hooks\useRealtime.ts:18 useEffect(() => {
C:\Users\Admin\terragest\src\hooks\useRealtimeCollection.ts:1 "use client";
C:\Users\Admin\terragest\src\hooks\useRealtimeCollection.ts:11 useEffect,
C:\Users\Admin\terragest\src\hooks\useRealtimeCollection.ts:12 useState,
C:\Users\Admin\terragest\src\hooks\useRealtimeCollection.ts:24 export const useRealtimeCollection = ({
C:\Users\Admin\terragest\src\hooks\useRealtimeCollection.ts:30 useState<any[]>([]);
C:\Users\Admin\terragest\src\hooks\useRealtimeCollection.ts:33 useState(true);
C:\Users\Admin\terragest\src\hooks\useRealtimeCollection.ts:35 useEffect(() => {
C:\Users\Admin\terragest\src\hooks\useToast.ts:2 useToast,
C:\Users\Admin\terragest\src\hooks\runtime\useRuntimeChannel.ts:1 "use client";
C:\Users\Admin\terragest\src\hooks\runtime\useRuntimeChannel.ts:4 useEffect,
C:\Users\Admin\terragest\src\hooks\runtime\useRuntimeChannel.ts:5 useState,
C:\Users\Admin\terragest\src\hooks\runtime\useRuntimeChannel.ts:12 export function useRuntimeChannel(
C:\Users\Admin\terragest\src\hooks\runtime\useRuntimeChannel.ts:16 useState<any[]>([]);
C:\Users\Admin\terragest\src\hooks\runtime\useRuntimeChannel.ts:18 useEffect(() => {
C:\Users\Admin\terragest\src\platform\auth\AuthService.ts:24 userId:
C:\Users\Admin\terragest\src\platform\auth\session\SessionStore.ts:3 export interface UserSession {
C:\Users\Admin\terragest\src\platform\auth\session\SessionStore.ts:5 userId: string;
C:\Users\Admin\terragest\src\platform\auth\session\SessionStore.ts:17 UserSession;
C:\Users\Admin\terragest\src\platform\auth\session\SessionStore.ts:20 session: UserSession
C:\Users\Admin\terragest\src\platform\governance\GovernanceContext.ts:7 user?: string;
C:\Users\Admin\terragest\src\platform\modules\runtime\ModuleRuntime.ts:46 user:
C:\Users\Admin\terragest\src\platform\modules\runtime\ModuleRuntime.ts:47 context.user
C:\Users\Admin\terragest\src\platform\modules\runtime\ModuleRuntime.ts:64 user:
C:\Users\Admin\terragest\src\platform\modules\runtime\ModuleRuntime.ts:65 context.user,
C:\Users\Admin\terragest\src\platform\modules\runtime\ModuleRuntime.ts:103 user:
C:\Users\Admin\terragest\src\platform\modules\runtime\ModuleRuntime.ts:104 context.user
C:\Users\Admin\terragest\src\platform\modules\runtime\ModuleRuntime.ts:137 user:
C:\Users\Admin\terragest\src\platform\modules\runtime\ModuleRuntime.ts:138 context.user,
C:\Users\Admin\terragest\src\platform\modules\runtime\ModuleRuntime.ts:161 user:
C:\Users\Admin\terragest\src\platform\modules\runtime\ModuleRuntime.ts:162 context.user
C:\Users\Admin\terragest\src\platform\modules\runtime\ModuleRuntime.ts:179 user:
C:\Users\Admin\terragest\src\platform\modules\runtime\ModuleRuntime.ts:180 context.user,
C:\Users\Admin\terragest\src\platform\modules\runtime\ModuleRuntime.ts:213 user:
C:\Users\Admin\terragest\src\platform\modules\runtime\ModuleRuntime.ts:214 context.user,
C:\Users\Admin\terragest\src\platform\modules\runtime\ModuleRuntime.ts:237 user:
C:\Users\Admin\terragest\src\platform\modules\runtime\ModuleRuntime.ts:238 context.user
C:\Users\Admin\terragest\src\platform\modules\runtime\ModuleRuntime.ts:255 user:
C:\Users\Admin\terragest\src\platform\modules\runtime\ModuleRuntime.ts:256 context.user,
C:\Users\Admin\terragest\src\platform\modules\runtime\ModuleRuntime.ts:289 user:
C:\Users\Admin\terragest\src\platform\modules\runtime\ModuleRuntime.ts:290 context.user,
C:\Users\Admin\terragest\src\platform\modules\types\ModuleContext.ts:17 user?: string;
C:\Users\Admin\terragest\src\platform\navigation\buildNavigation.ts:12 ERPUserRole
C:\Users\Admin\terragest\src\platform\navigation\buildNavigation.ts:26 role: ERPUserRole
C:\Users\Admin\terragest\src\platform\rules\core\RuleExecutionContext.ts:13 user?: string;
C:\Users\Admin\terragest\src\platform\rules\security\RuleSecurityPolicy.ts:15 context.user === "admin"
C:\Users\Admin\terragest\src\platform\security\ExecutionPolicy.ts:5 user?: string;
C:\Users\Admin\terragest\src\platform\security\guards\FeatureGuard.ts:12 ERPUserRole
C:\Users\Admin\terragest\src\platform\security\guards\FeatureGuard.ts:22 role: ERPUserRole,
C:\Users\Admin\terragest\src\platform\security\permissions\PermissionEngine.ts:7 ERPUserRole,
C:\Users\Admin\terragest\src\platform\security\permissions\PermissionEngine.ts:70 role: ERPUserRole,
C:\Users\Admin\terragest\src\platform\security\roles\RoleDefinition.ts:1 export type ERPUserRole =
C:\Users\Admin\terragest\src\platform\security\roles\RoleDefinition.ts:10 role: ERPUserRole;
C:\Users\Admin\terragest\src\platform\workflows\history\WorkflowHistoryEntry.ts:18 user?: string;
C:\Users\Admin\terragest\src\platform\workflows\timeline\WorkflowTimelineEntry.ts:13 user?: string;
C:\Users\Admin\terragest\src\providers\AppQueryProvider.tsx:1 "use client";
C:\Users\Admin\terragest\src\providers\AuthProvider.tsx:1 "use client";
C:\Users\Admin\terragest\src\providers\AuthProvider.tsx:7 useContext,
C:\Users\Admin\terragest\src\providers\AuthProvider.tsx:9 useEffect,
C:\Users\Admin\terragest\src\providers\AuthProvider.tsx:11 useState
C:\Users\Admin\terragest\src\providers\AuthProvider.tsx:19 User
C:\Users\Admin\terragest\src\providers\AuthProvider.tsx:31 user: User | null;
C:\Users\Admin\terragest\src\providers\AuthProvider.tsx:39 user: null,
C:\Users\Admin\terragest\src\providers\AuthProvider.tsx:56 user,
C:\Users\Admin\terragest\src\providers\AuthProvider.tsx:58 setUser
C:\Users\Admin\terragest\src\providers\AuthProvider.tsx:60 ] = useState<User | null>(
C:\Users\Admin\terragest\src\providers\AuthProvider.tsx:70 ] = useState(true);
C:\Users\Admin\terragest\src\providers\AuthProvider.tsx:72 useEffect(() => {
C:\Users\Admin\terragest\src\providers\AuthProvider.tsx:80 (user) => {
C:\Users\Admin\terragest\src\providers\AuthProvider.tsx:82 setUser(user);
C:\Users\Admin\terragest\src\providers\AuthProvider.tsx:99 user,
C:\Users\Admin\terragest\src\providers\AuthProvider.tsx:112 export function useAuth() {
C:\Users\Admin\terragest\src\providers\AuthProvider.tsx:114 return useContext(
C:\Users\Admin\terragest\src\providers\RootProviders.tsx:1 "use client";
C:\Users\Admin\terragest\src\providers\TenantProvider.tsx:1 "use client";
C:\Users\Admin\terragest\src\providers\TenantProvider.tsx:5 useContext,
C:\Users\Admin\terragest\src\providers\TenantProvider.tsx:6 useState,
C:\Users\Admin\terragest\src\providers\TenantProvider.tsx:18 useState({
C:\Users\Admin\terragest\src\providers\TenantProvider.tsx:42 export const useTenant =
C:\Users\Admin\terragest\src\providers\TenantProvider.tsx:43 () => useContext(TenantContext);
C:\Users\Admin\terragest\src\providers\ToastProvider.tsx:1 "use client";
C:\Users\Admin\terragest\src\providers\ToastProvider.tsx:5 useContext,
C:\Users\Admin\terragest\src\providers\ToastProvider.tsx:6 useState,
C:\Users\Admin\terragest\src\providers\ToastProvider.tsx:46 useState<Toast[]>([]);
C:\Users\Admin\terragest\src\providers\ToastProvider.tsx:179 export const useToast =
C:\Users\Admin\terragest\src\providers\ToastProvider.tsx:183 useContext(
C:\Users\Admin\terragest\src\providers\ToastProvider.tsx:190 "useToast must be used within ToastProvider"
C:\Users\Admin\terragest\src\runtime\production.ts:114 maxUsers: 100,
C:\Users\Admin\terragest\src\runtime\actions\ERPActionExecutor.ts:1 "use client";
C:\Users\Admin\terragest\src\runtime\core\RuntimeAuditRegistry.ts:9 userId?: string;
C:\Users\Admin\terragest\src\runtime\core\RuntimeLifecycle.ts:4 | "paused"
C:\Users\Admin\terragest\src\runtime\core\RuntimeLifecycle.ts:25 pause() {
C:\Users\Admin\terragest\src\runtime\core\RuntimeLifecycle.ts:27 this.status = "paused";
C:\Users\Admin\terragest\src\runtime\core\context\RuntimeContext.ts:4 userId?: string;
C:\Users\Admin\terragest\src\runtime\data\warehouse\DataWarehouseConnector.ts:1 export class DataWarehouseConnector {
C:\Users\Admin\terragest\src\runtime\data\warehouse\DataWarehouseConnector.ts:4 warehouse: string
C:\Users\Admin\terragest\src\runtime\data\warehouse\DataWarehouseConnector.ts:8 "[Warehouse]",
C:\Users\Admin\terragest\src\runtime\data\warehouse\DataWarehouseConnector.ts:9 warehouse
C:\Users\Admin\terragest\src\runtime\domain\rules\TerragestBusinessRules.ts:276 description: "Une opÃ©ration coÃ»teuse doit alimenter les dÃ©penses de la campagne.",
C:\Users\Admin\terragest\src\runtime\forms\ERPFormEngine.tsx:1 "use client";
C:\Users\Admin\terragest\src\runtime\forms\ERPFormEngine.tsx:3 import { useEffect, useMemo, useState } from "react";
C:\Users\Admin\terragest\src\runtime\forms\ERPFormEngine.tsx:52 const fields = useMemo(() => {
C:\Users\Admin\terragest\src\runtime\forms\ERPFormEngine.tsx:56 const [values, setValues] = useState<Record<string, unknown>>(initialData);
C:\Users\Admin\terragest\src\runtime\forms\ERPFormEngine.tsx:58 const [relationOptions, setRelationOptions] = useState<
C:\Users\Admin\terragest\src\runtime\forms\ERPFormEngine.tsx:62 useEffect(() => {
C:\Users\Admin\terragest\src\runtime\generation\ERPModuleRuntimeFactory.tsx:1 "use client";
C:\Users\Admin\terragest\src\runtime\generation\ERPPageGenerationEngine.tsx:1 "use client";
C:\Users\Admin\terragest\src\runtime\modules\renderer\ERPModuleListRenderer.tsx:1 "use client";
C:\Users\Admin\terragest\src\runtime\navigation\ERPRelationNavigation.tsx:1 "use client";
C:\Users\Admin\terragest\src\runtime\notifications\ERPNotificationsPanel.tsx:1 "use client";
C:\Users\Admin\terragest\src\runtime\notifications\ERPNotificationsPanel.tsx:4 useEffect,
C:\Users\Admin\terragest\src\runtime\notifications\ERPNotificationsPanel.tsx:5 useState,
C:\Users\Admin\terragest\src\runtime\notifications\ERPNotificationsPanel.tsx:29 ] = useState<any[]>([]);
C:\Users\Admin\terragest\src\runtime\notifications\ERPNotificationsPanel.tsx:31 useEffect(() => {
C:\Users\Admin\terragest\src\runtime\observability\ERPRuntimeAuditTrail.ts:9 user?: string;
C:\Users\Admin\terragest\src\runtime\observability\RuntimeLogsPanel.tsx:1 "use client";
C:\Users\Admin\terragest\src\runtime\observability\RuntimeLogsPanel.tsx:4 useEffect,
C:\Users\Admin\terragest\src\runtime\observability\RuntimeLogsPanel.tsx:5 useState,
C:\Users\Admin\terragest\src\runtime\observability\RuntimeLogsPanel.tsx:29 ] = useState<any[]>([]);
C:\Users\Admin\terragest\src\runtime\observability\RuntimeLogsPanel.tsx:31 useEffect(() => {
C:\Users\Admin\terragest\src\runtime\os-enterprise\ERPUserContext.ts:1 export interface ERPUserContext {
C:\Users\Admin\terragest\src\runtime\os-enterprise\ERPUserContext.ts:2 userName: string;
C:\Users\Admin\terragest\src\runtime\os-enterprise\ERPUserContext.ts:7 export class ERPUserContextProvider {
C:\Users\Admin\terragest\src\runtime\os-enterprise\ERPUserContext.ts:8 static current(): ERPUserContext {
C:\Users\Admin\terragest\src\runtime\os-enterprise\ERPUserContext.ts:10 userName: "Utilisateur ERP",
C:\Users\Admin\terragest\src\runtime\os-enterprise\index.ts:13 export type { ERPUserContext } from "./ERPUserContext";
C:\Users\Admin\terragest\src\runtime\os-enterprise\index.ts:14 export { ERPUserContextProvider } from "./ERPUserContext";
C:\Users\Admin\terragest\src\runtime\permissions\ERPProtectedAction.tsx:1 "use client";
C:\Users\Admin\terragest\src\runtime\processes\human-tasks\HumanTaskManager.ts:5 user: string
C:\Users\Admin\terragest\src\runtime\processes\human-tasks\HumanTaskManager.ts:11 user
C:\Users\Admin\terragest\src\runtime\production\limits\ERPRateLimit.ts:3 scope: "tenant" | "user" | "module" | "global";
C:\Users\Admin\terragest\src\runtime\production\quotas\ERPTenantQuota.ts:3 maxUsers: number;
C:\Users\Admin\terragest\src\runtime\production\quotas\ERPTenantQuotaRegistry.ts:6 maxUsers: 100,
C:\Users\Admin\terragest\src\runtime\production\quotas\ERPTenantQuotaRegistry.ts:14 maxUsers: 30,
C:\Users\Admin\terragest\src\runtime\production\quotas\ERPTenantQuotaRegistry.ts:22 maxUsers: 10,
C:\Users\Admin\terragest\src\runtime\realtime\ERPRealtimeSeed.ts:25 id: "user_admin",
C:\Users\Admin\terragest\src\runtime\realtime\ERPRealtimeSeed.ts:34 id: "user_ops",
C:\Users\Admin\terragest\src\runtime\realtime\presence\ERPRealtimePresence.ts:11 private users: ERPRealtimePresence[] = [];
C:\Users\Admin\terragest\src\runtime\realtime\presence\ERPRealtimePresence.ts:13 upsert(user: ERPRealtimePresence) {
C:\Users\Admin\terragest\src\runtime\realtime\presence\ERPRealtimePresence.ts:15 this.users.some((item) => item.id === user.id);
C:\Users\Admin\terragest\src\runtime\realtime\presence\ERPRealtimePresence.ts:18 this.users = this.users.map((item) =>
C:\Users\Admin\terragest\src\runtime\realtime\presence\ERPRealtimePresence.ts:19 item.id === user.id ? user : item
C:\Users\Admin\terragest\src\runtime\realtime\presence\ERPRealtimePresence.ts:22 this.users.unshift(user);
C:\Users\Admin\terragest\src\runtime\realtime\presence\ERPRealtimePresence.ts:25 this.users = this.users.slice(0, 100);
C:\Users\Admin\terragest\src\runtime\realtime\presence\ERPRealtimePresence.ts:29 return this.users;
C:\Users\Admin\terragest\src\runtime\realtime\snapshots\ERPRealtimeSnapshot.ts:17 onlineUsers: presence.filter((user) => user.status === "online").length,
C:\Users\Admin\terragest\src\runtime\scheduler\RuntimeSchedulerBootstrap.tsx:1 "use client";
C:\Users\Admin\terragest\src\runtime\scheduler\RuntimeSchedulerBootstrap.tsx:4 useEffect,
C:\Users\Admin\terragest\src\runtime\scheduler\RuntimeSchedulerBootstrap.tsx:15 useEffect(() => {
C:\Users\Admin\terragest\src\runtime\security\RuntimeSecurityManager.ts:17 ERPUserRole
C:\Users\Admin\terragest\src\runtime\security\RuntimeSecurityManager.ts:43 role: ERPUserRole,
C:\Users\Admin\terragest\src\runtime\security\audit\ERPSecurityAuditLog.ts:8 userId: string;
C:\Users\Admin\terragest\src\runtime\security\guards\ERPAccessGuard.ts:30 userId: session.userId,
C:\Users\Admin\terragest\src\runtime\security\sessions\ERPSecuritySession.ts:4 userId: string;
C:\Users\Admin\terragest\src\runtime\security\sessions\ERPSessionContext.ts:4 userId: "admin",
C:\Users\Admin\terragest\src\runtime\security-runtime\index.ts:1 export type { RuntimeRole, RuntimeUser } from "./RuntimeRole";
C:\Users\Admin\terragest\src\runtime\security-runtime\RuntimeActionGuard.ts:8 const user = RuntimeSecurityContext.currentUser();
C:\Users\Admin\terragest\src\runtime\security-runtime\RuntimeActionGuard.ts:15 return RuntimePolicyEngine.can(user, permission);
C:\Users\Admin\terragest\src\runtime\security-runtime\RuntimePolicyEngine.ts:2 import type { RuntimeUser } from "./RuntimeRole";
C:\Users\Admin\terragest\src\runtime\security-runtime\RuntimePolicyEngine.ts:7 user: RuntimeUser,
C:\Users\Admin\terragest\src\runtime\security-runtime\RuntimePolicyEngine.ts:10 return runtimeRolePermissions[user.role].includes(permission);
C:\Users\Admin\terragest\src\runtime\security-runtime\RuntimePolicyEngine.ts:14 user: RuntimeUser,
C:\Users\Admin\terragest\src\runtime\security-runtime\RuntimePolicyEngine.ts:22 return RuntimePolicyEngine.can(user, item.permission);
C:\Users\Admin\terragest\src\runtime\security-runtime\RuntimeRole.ts:7 export interface RuntimeUser {
C:\Users\Admin\terragest\src\runtime\security-runtime\RuntimeSecurityContext.ts:1 import type { RuntimeUser } from "./RuntimeRole";
C:\Users\Admin\terragest\src\runtime\security-runtime\RuntimeSecurityContext.ts:4 static currentUser(): RuntimeUser {
C:\Users\Admin\terragest\src\runtime\security-runtime\RuntimeSecurityContext.ts:6 id: "user-admin",
C:\Users\Admin\terragest\src\runtime\security-runtime\RuntimeWorkflowGuard.ts:6 const user = RuntimeSecurityContext.currentUser();
C:\Users\Admin\terragest\src\runtime\security-runtime\RuntimeWorkflowGuard.ts:8 return RuntimePolicyEngine.can(user, "workflow.start");
C:\Users\Admin\terragest\src\runtime\security-runtime\RuntimeWorkflowGuard.ts:12 const user = RuntimeSecurityContext.currentUser();
C:\Users\Admin\terragest\src\runtime\security-runtime\RuntimeWorkflowGuard.ts:14 return RuntimePolicyEngine.can(user, "workflow.transition");
C:\Users\Admin\terragest\src\runtime\security-runtime\RuntimeWorkflowGuard.ts:18 const user = RuntimeSecurityContext.currentUser();
C:\Users\Admin\terragest\src\runtime\security-runtime\RuntimeWorkflowGuard.ts:20 return RuntimePolicyEngine.can(user, "workflow.validate");
C:\Users\Admin\terragest\src\runtime\selects\DynamicSelectEngine.ts:68 "Moissonneuse ERP",
C:\Users\Admin\terragest\src\runtime\selects\DynamicSelectEngine.ts:71 "moissonneuse-erp",
C:\Users\Admin\terragest\src\runtime\selects\DynamicSelectEngine.ts:75 "moissonneuse",
C:\Users\Admin\terragest\src\runtime\selects\ERPDynamicSelect.tsx:1 "use client";
C:\Users\Admin\terragest\src\runtime\selects\ERPDynamicSelect.tsx:4 useEffect,
C:\Users\Admin\terragest\src\runtime\selects\ERPDynamicSelect.tsx:5 useState,
C:\Users\Admin\terragest\src\runtime\selects\ERPDynamicSelect.tsx:42 ] = useState<any[]>([]);
C:\Users\Admin\terragest\src\runtime\selects\ERPDynamicSelect.tsx:44 useEffect(() => {
C:\Users\Admin\terragest\src\runtime\state\ERPStateBadge.tsx:1 "use client";
C:\Users\Admin\terragest\src\runtime\streams\ERPStreamsSeed.ts:32 message: "Tentative d'acces refusee",
C:\Users\Admin\terragest\src\runtime\tenant\ERPTenantSeed.ts:17 activeUsers: 18,
C:\Users\Admin\terragest\src\runtime\tenant\ERPTenantSeed.ts:27 activeUsers: 7,
C:\Users\Admin\terragest\src\runtime\tenant\ERPTenantSeed.ts:37 activeUsers: 2,
C:\Users\Admin\terragest\src\runtime\tenant\metrics\ERPTenantMetrics.ts:4 activeUsers: number;
C:\Users\Admin\terragest\src\runtime\ui\ERPDynamicFormFactory.tsx:1 "use client";
C:\Users\Admin\terragest\src\runtime\ui\ERPDynamicTableFactory.tsx:1 "use client";
C:\Users\Admin\terragest\src\runtime\workers\engine\ERPWorkerTypes.ts:4 | "paused"
C:\Users\Admin\terragest\src\runtime\workflow-persistence\WorkflowHistoryEntry.ts:13 user?: string;
C:\Users\Admin\terragest\src\runtime\workflow-persistence\WorkflowRuntimeService.ts:20 user,
C:\Users\Admin\terragest\src\runtime\workflow-persistence\WorkflowRuntimeService.ts:50 user,
C:\Users\Admin\terragest\src\runtime\workflow-ui\ERPWorkflowActions.tsx:1 "use client";
C:\Users\Admin\terragest\src\saas\billing\BillingEngine.ts:4 users: number,
C:\Users\Admin\terragest\src\saas\billing\BillingEngine.ts:25 users * 5
C:\Users\Admin\terragest\src\security\rbac\UserRole.ts:1 export type UserRole =
C:\Users\Admin\terragest\src\security\tenant\TenantProvider.tsx:1 "use client";
C:\Users\Admin\terragest\src\security\tenant\TenantProvider.tsx:5 useContext,
C:\Users\Admin\terragest\src\security\tenant\TenantProvider.tsx:45 export const useTenant =
C:\Users\Admin\terragest\src\security\tenant\TenantProvider.tsx:49 useContext(
C:\Users\Admin\terragest\src\security\tenant\TenantProvider.tsx:56 "useTenant must be used within TenantProvider"
C:\Users\Admin\terragest\src\shared\constants\firestoreCollections.ts:6 USERS:
C:\Users\Admin\terragest\src\shared\constants\firestoreCollections.ts:7 "users",
C:\Users\Admin\terragest\src\shared\hooks\useDebounce.ts:1 import { useEffect, useState } from "react";
C:\Users\Admin\terragest\src\shared\hooks\useDebounce.ts:3 export function useDebounce<T>(
C:\Users\Admin\terragest\src\shared\hooks\useDebounce.ts:7 const [debouncedValue, setDebouncedValue] = useState(value);
C:\Users\Admin\terragest\src\shared\hooks\useDebounce.ts:9 useEffect(() => {
C:\Users\Admin\terragest\src\shared\hooks\useFilters.ts:1 import { useState } from "react";
C:\Users\Admin\terragest\src\shared\hooks\useFilters.ts:3 export function useFilters<T>(
C:\Users\Admin\terragest\src\shared\hooks\useFilters.ts:7 useState(initialFilters);
C:\Users\Admin\terragest\src\shared\hooks\usePagination.ts:1 import { useState } from "react";
C:\Users\Admin\terragest\src\shared\hooks\usePagination.ts:3 export function usePagination() {
C:\Users\Admin\terragest\src\shared\hooks\usePagination.ts:4 const [page, setPage] = useState(1);
C:\Users\Admin\terragest\src\shared\lib\query\AppQueryProvider.tsx:1 "use client";
C:\Users\Admin\terragest\src\shared\types\User.ts:1 export interface User {
C:\Users\Admin\terragest\src\store\useAppStore.ts:14 export const useAppStore =
C:\Users\Admin\terragest\src\theme\store\useAppStore.ts:14 export const useAppStore =
C:\Users\Admin\terragest\src\types\utilisateur.ts:1 import { UserRole } from "@/features/auth/types/UserRole";
C:\Users\Admin\terragest\src\types\utilisateur.ts:13 role: UserRole;
C:\Users\Admin\terragest\src\ui\sidebar\ERPSidebar.tsx:1 "use client";
C:\Users\Admin\terragest\src\ui\theme\ThemeProvider.tsx:1 "use client";
C:\Users\Admin\terragest\src\ui\theme\ThemeProvider.tsx:3 import { createContext, useContext }
C:\Users\Admin\terragest\src\ui\theme\ThemeProvider.tsx:28 export function useERPTheme() {
C:\Users\Admin\terragest\src\ui\theme\ThemeProvider.tsx:29 return useContext(ThemeContext);
C:\Users\Admin\terragest\src\ui\topbar\ERPTopbar.tsx:1 "use client";
C:\Users\Admin\terragest\src\_quarantine\layout\AppLayout.tsx:1 "use client";
C:\Users\Admin\terragest\src\_quarantine\layout\ERPLayout.tsx:3 "use client";
C:\Users\Admin\terragest\src\_quarantine\layout\PrivateShell.tsx:1 "use client";
C:\Users\Admin\terragest\src\_quarantine\layout\Sidebar.tsx:1 "use client";
C:\Users\Admin\terragest\src\_quarantine\layout\Sidebar.tsx:6 useEffect,
C:\Users\Admin\terragest\src\_quarantine\layout\Sidebar.tsx:7 useState,
C:\Users\Admin\terragest\src\_quarantine\layout\Sidebar.tsx:12 usePathname
C:\Users\Admin\terragest\src\_quarantine\layout\Sidebar.tsx:30 usePathname();
C:\Users\Admin\terragest\src\_quarantine\layout\Sidebar.tsx:35 ] = useState<
C:\Users\Admin\terragest\src\_quarantine\layout\Sidebar.tsx:39 useEffect(() => {
C:\Users\Admin\terragest\src\_quarantine\layout\Topbar.tsx:1 "use client";
C:\Users\Admin\terragest\src\_quarantine\layout\Topbar.tsx:10 import { useRouter }
C:\Users\Admin\terragest\src\_quarantine\layout\Topbar.tsx:16 useRouter();
C:\Users\Admin\terragest\src\_quarantine\modules\alertes\components\AlertesBulkActions.tsx:1 "use client";
C:\Users\Admin\terragest\src\_quarantine\modules\alertes\components\AlertesChartWidget.tsx:1 "use client";
C:\Users\Admin\terragest\src\_quarantine\modules\alertes\components\AlertesDashboardCard.tsx:1 "use client";
C:\Users\Admin\terragest\src\_quarantine\modules\alertes\components\AlertesExportActions.tsx:1 "use client";
C:\Users\Admin\terragest\src\_quarantine\modules\alertes\components\AlertesFilters.tsx:1 "use client";
C:\Users\Admin\terragest\src\_quarantine\modules\alertes\components\AlertesForm.tsx:1 "use client";
C:\Users\Admin\terragest\src\_quarantine\modules\alertes\components\AlertesForm.tsx:3 import { useForm } from "react-hook-form";
C:\Users\Admin\terragest\src\_quarantine\modules\alertes\components\AlertesForm.tsx:12 import { useCreateAlertes } from "../hooks/useCreateAlertes";
C:\Users\Admin\terragest\src\_quarantine\modules\alertes\components\AlertesForm.tsx:16 useCreateAlertes();
C:\Users\Admin\terragest\src\_quarantine\modules\alertes\components\AlertesForm.tsx:18 const form = useForm<AlertesSchemaType>({
C:\Users\Admin\terragest\src\_quarantine\modules\alertes\components\AlertesPagination.tsx:1 "use client";
C:\Users\Admin\terragest\src\_quarantine\modules\alertes\components\AlertesRealtimeWidget.tsx:1 "use client";
C:\Users\Admin\terragest\src\_quarantine\modules\alertes\components\AlertesSorting.tsx:1 "use client";
C:\Users\Admin\terragest\src\_quarantine\modules\alertes\components\AlertesTable.tsx:1 "use client";
C:\Users\Admin\terragest\src\_quarantine\modules\alertes\components\AlertesTable.tsx:3 import { useAlertes } from "../hooks/useAlertes";
C:\Users\Admin\terragest\src\_quarantine\modules\alertes\components\AlertesTable.tsx:9 } = useAlertes();
C:\Users\Admin\terragest\src\_quarantine\modules\alertes\hooks\useAlertes.ts:1 "use client";
C:\Users\Admin\terragest\src\_quarantine\modules\alertes\hooks\useAlertes.ts:3 import { useQuery } from "@tanstack/react-query";
C:\Users\Admin\terragest\src\_quarantine\modules\alertes\hooks\useAlertes.ts:9 export function useAlertes() {
C:\Users\Admin\terragest\src\_quarantine\modules\alertes\hooks\useAlertes.ts:10 return useQuery({
C:\Users\Admin\terragest\src\_quarantine\modules\alertes\hooks\useCreateAlertes.ts:1 "use client";
C:\Users\Admin\terragest\src\_quarantine\modules\alertes\hooks\useCreateAlertes.ts:3 import { useMutation } from "@tanstack/react-query";
C:\Users\Admin\terragest\src\_quarantine\modules\alertes\hooks\useCreateAlertes.ts:11 export function useCreateAlertes() {
C:\Users\Admin\terragest\src\_quarantine\modules\alertes\hooks\useCreateAlertes.ts:12 return useMutation({
C:\Users\Admin\terragest\src\_quarantine\modules\alertes\hooks\useDeleteAlertes.ts:1 "use client";
C:\Users\Admin\terragest\src\_quarantine\modules\alertes\hooks\useDeleteAlertes.ts:3 import { useMutation } from "@tanstack/react-query";
C:\Users\Admin\terragest\src\_quarantine\modules\alertes\hooks\useDeleteAlertes.ts:11 export function useDeleteAlertes() {
C:\Users\Admin\terragest\src\_quarantine\modules\alertes\hooks\useDeleteAlertes.ts:12 return useMutation({
C:\Users\Admin\terragest\src\_quarantine\modules\alertes\hooks\useUpdateAlertes.ts:1 "use client";
C:\Users\Admin\terragest\src\_quarantine\modules\alertes\hooks\useUpdateAlertes.ts:3 import { useMutation } from "@tanstack/react-query";
C:\Users\Admin\terragest\src\_quarantine\modules\alertes\hooks\useUpdateAlertes.ts:11 export function useUpdateAlertes() {
C:\Users\Admin\terragest\src\_quarantine\modules\alertes\hooks\useUpdateAlertes.ts:12 return useMutation({
C:\Users\Admin\terragest\src\_quarantine\modules\analytics\components\AnalyticsBulkActions.tsx:1 "use client";
C:\Users\Admin\terragest\src\_quarantine\modules\analytics\components\AnalyticsChartWidget.tsx:1 "use client";
C:\Users\Admin\terragest\src\_quarantine\modules\analytics\components\AnalyticsDashboardCard.tsx:1 "use client";
C:\Users\Admin\terragest\src\_quarantine\modules\analytics\components\AnalyticsExportActions.tsx:1 "use client";
C:\Users\Admin\terragest\src\_quarantine\modules\analytics\components\AnalyticsFilters.tsx:1 "use client";
C:\Users\Admin\terragest\src\_quarantine\modules\analytics\components\AnalyticsForm.tsx:1 "use client";
C:\Users\Admin\terragest\src\_quarantine\modules\analytics\components\AnalyticsForm.tsx:3 import { useForm } from "react-hook-form";
C:\Users\Admin\terragest\src\_quarantine\modules\analytics\components\AnalyticsForm.tsx:12 import { useCreateAnalytics } from "../hooks/useCreateAnalytics";
C:\Users\Admin\terragest\src\_quarantine\modules\analytics\components\AnalyticsForm.tsx:16 useCreateAnalytics();
C:\Users\Admin\terragest\src\_quarantine\modules\analytics\components\AnalyticsForm.tsx:18 const form = useForm<AnalyticsSchemaType>({
C:\Users\Admin\terragest\src\_quarantine\modules\analytics\components\AnalyticsPagination.tsx:1 "use client";
C:\Users\Admin\terragest\src\_quarantine\modules\analytics\components\AnalyticsSorting.tsx:1 "use client";
C:\Users\Admin\terragest\src\_quarantine\modules\analytics\components\AnalyticsTable.tsx:1 "use client";
C:\Users\Admin\terragest\src\_quarantine\modules\analytics\components\AnalyticsTable.tsx:3 import { useAnalytics } from "../hooks/useAnalytics";
C:\Users\Admin\terragest\src\_quarantine\modules\analytics\components\AnalyticsTable.tsx:9 } = useAnalytics();
C:\Users\Admin\terragest\src\_quarantine\modules\analytics\hooks\useAnalytics.ts:1 "use client";
C:\Users\Admin\terragest\src\_quarantine\modules\analytics\hooks\useAnalytics.ts:3 import { useQuery } from "@tanstack/react-query";
C:\Users\Admin\terragest\src\_quarantine\modules\analytics\hooks\useAnalytics.ts:9 export function useAnalytics() {
C:\Users\Admin\terragest\src\_quarantine\modules\analytics\hooks\useAnalytics.ts:10 return useQuery({
C:\Users\Admin\terragest\src\_quarantine\modules\analytics\hooks\useCreateAnalytics.ts:1 "use client";
C:\Users\Admin\terragest\src\_quarantine\modules\analytics\hooks\useCreateAnalytics.ts:3 import { useMutation } from "@tanstack/react-query";
C:\Users\Admin\terragest\src\_quarantine\modules\analytics\hooks\useCreateAnalytics.ts:11 export function useCreateAnalytics() {
C:\Users\Admin\terragest\src\_quarantine\modules\analytics\hooks\useCreateAnalytics.ts:12 return useMutation({
C:\Users\Admin\terragest\src\_quarantine\modules\analytics\hooks\useDeleteAnalytics.ts:1 "use client";
C:\Users\Admin\terragest\src\_quarantine\modules\analytics\hooks\useDeleteAnalytics.ts:3 import { useMutation } from "@tanstack/react-query";
C:\Users\Admin\terragest\src\_quarantine\modules\analytics\hooks\useDeleteAnalytics.ts:11 export function useDeleteAnalytics() {
C:\Users\Admin\terragest\src\_quarantine\modules\analytics\hooks\useDeleteAnalytics.ts:12 return useMutation({
C:\Users\Admin\terragest\src\_quarantine\modules\analytics\hooks\useUpdateAnalytics.ts:1 "use client";
C:\Users\Admin\terragest\src\_quarantine\modules\analytics\hooks\useUpdateAnalytics.ts:3 import { useMutation } from "@tanstack/react-query";
C:\Users\Admin\terragest\src\_quarantine\modules\analytics\hooks\useUpdateAnalytics.ts:11 export function useUpdateAnalytics() {
C:\Users\Admin\terragest\src\_quarantine\modules\analytics\hooks\useUpdateAnalytics.ts:12 return useMutation({
C:\Users\Admin\terragest\src\_quarantine\modules\clients\components\ClientsBulkActions.tsx:1 "use client";
C:\Users\Admin\terragest\src\_quarantine\modules\clients\components\ClientsChartWidget.tsx:1 "use client";
C:\Users\Admin\terragest\src\_quarantine\modules\clients\components\ClientsDashboardCard.tsx:1 "use client";
C:\Users\Admin\terragest\src\_quarantine\modules\clients\components\ClientsExportActions.tsx:1 "use client";
C:\Users\Admin\terragest\src\_quarantine\modules\clients\components\ClientsFilters.tsx:1 "use client";
C:\Users\Admin\terragest\src\_quarantine\modules\clients\components\ClientsForm.tsx:1 "use client";
C:\Users\Admin\terragest\src\_quarantine\modules\clients\components\ClientsForm.tsx:3 import { useForm } from "react-hook-form";
C:\Users\Admin\terragest\src\_quarantine\modules\clients\components\ClientsForm.tsx:12 import { useCreateClients } from "../hooks/useCreateClients";
C:\Users\Admin\terragest\src\_quarantine\modules\clients\components\ClientsForm.tsx:16 useCreateClients();
C:\Users\Admin\terragest\src\_quarantine\modules\clients\components\ClientsForm.tsx:18 const form = useForm<ClientsSchemaType>({
C:\Users\Admin\terragest\src\_quarantine\modules\clients\components\ClientsPagination.tsx:1 "use client";
C:\Users\Admin\terragest\src\_quarantine\modules\clients\components\ClientsRealtimeWidget.tsx:1 "use client";
C:\Users\Admin\terragest\src\_quarantine\modules\clients\components\ClientsSorting.tsx:1 "use client";
C:\Users\Admin\terragest\src\_quarantine\modules\clients\components\ClientsTable.tsx:1 "use client";
C:\Users\Admin\terragest\src\_quarantine\modules\clients\components\ClientsTable.tsx:3 import { useClients } from "../hooks/useClients";
C:\Users\Admin\terragest\src\_quarantine\modules\clients\components\ClientsTable.tsx:9 } = useClients();
C:\Users\Admin\terragest\src\_quarantine\modules\clients\hooks\useClients.ts:1 "use client";
C:\Users\Admin\terragest\src\_quarantine\modules\clients\hooks\useClients.ts:3 import { useQuery } from "@tanstack/react-query";
C:\Users\Admin\terragest\src\_quarantine\modules\clients\hooks\useClients.ts:9 export function useClients() {
C:\Users\Admin\terragest\src\_quarantine\modules\clients\hooks\useClients.ts:10 return useQuery({
C:\Users\Admin\terragest\src\_quarantine\modules\clients\hooks\useCreateClients.ts:1 "use client";
C:\Users\Admin\terragest\src\_quarantine\modules\clients\hooks\useCreateClients.ts:3 import { useMutation } from "@tanstack/react-query";
C:\Users\Admin\terragest\src\_quarantine\modules\clients\hooks\useCreateClients.ts:11 export function useCreateClients() {
C:\Users\Admin\terragest\src\_quarantine\modules\clients\hooks\useCreateClients.ts:12 return useMutation({
C:\Users\Admin\terragest\src\_quarantine\modules\clients\hooks\useDeleteClients.ts:1 "use client";
C:\Users\Admin\terragest\src\_quarantine\modules\clients\hooks\useDeleteClients.ts:3 import { useMutation } from "@tanstack/react-query";
C:\Users\Admin\terragest\src\_quarantine\modules\clients\hooks\useDeleteClients.ts:11 export function useDeleteClients() {
C:\Users\Admin\terragest\src\_quarantine\modules\clients\hooks\useDeleteClients.ts:12 return useMutation({
C:\Users\Admin\terragest\src\_quarantine\modules\clients\hooks\useUpdateClients.ts:1 "use client";
C:\Users\Admin\terragest\src\_quarantine\modules\clients\hooks\useUpdateClients.ts:3 import { useMutation } from "@tanstack/react-query";
C:\Users\Admin\terragest\src\_quarantine\modules\clients\hooks\useUpdateClients.ts:11 export function useUpdateClients() {
C:\Users\Admin\terragest\src\_quarantine\modules\clients\hooks\useUpdateClients.ts:12 return useMutation({
C:\Users\Admin\terragest\src\_quarantine\modules\contrats\components\ContratsBulkActions.tsx:1 "use client";
C:\Users\Admin\terragest\src\_quarantine\modules\contrats\components\ContratsChartWidget.tsx:1 "use client";
C:\Users\Admin\terragest\src\_quarantine\modules\contrats\components\ContratsDashboardCard.tsx:1 "use client";
C:\Users\Admin\terragest\src\_quarantine\modules\contrats\components\ContratsExportActions.tsx:1 "use client";
C:\Users\Admin\terragest\src\_quarantine\modules\contrats\components\ContratsFilters.tsx:1 "use client";
C:\Users\Admin\terragest\src\_quarantine\modules\contrats\components\ContratsForm.tsx:1 "use client";
C:\Users\Admin\terragest\src\_quarantine\modules\contrats\components\ContratsForm.tsx:3 import { useForm } from "react-hook-form";
C:\Users\Admin\terragest\src\_quarantine\modules\contrats\components\ContratsForm.tsx:12 import { useCreateContrats } from "../hooks/useCreateContrats";
C:\Users\Admin\terragest\src\_quarantine\modules\contrats\components\ContratsForm.tsx:16 useCreateContrats();
C:\Users\Admin\terragest\src\_quarantine\modules\contrats\components\ContratsForm.tsx:18 const form = useForm<ContratsSchemaType>({
C:\Users\Admin\terragest\src\_quarantine\modules\contrats\components\ContratsPagination.tsx:1 "use client";
C:\Users\Admin\terragest\src\_quarantine\modules\contrats\components\ContratsRealtimeWidget.tsx:1 "use client";
C:\Users\Admin\terragest\src\_quarantine\modules\contrats\components\ContratsSorting.tsx:1 "use client";
C:\Users\Admin\terragest\src\_quarantine\modules\contrats\components\ContratsTable.tsx:1 "use client";
C:\Users\Admin\terragest\src\_quarantine\modules\contrats\components\ContratsTable.tsx:3 import { useContrats } from "../hooks/useContrats";
C:\Users\Admin\terragest\src\_quarantine\modules\contrats\components\ContratsTable.tsx:9 } = useContrats();
C:\Users\Admin\terragest\src\_quarantine\modules\contrats\hooks\useContrats.ts:1 "use client";
C:\Users\Admin\terragest\src\_quarantine\modules\contrats\hooks\useContrats.ts:3 import { useQuery } from "@tanstack/react-query";
C:\Users\Admin\terragest\src\_quarantine\modules\contrats\hooks\useContrats.ts:9 export function useContrats() {
C:\Users\Admin\terragest\src\_quarantine\modules\contrats\hooks\useContrats.ts:10 return useQuery({
C:\Users\Admin\terragest\src\_quarantine\modules\contrats\hooks\useCreateContrats.ts:1 "use client";
C:\Users\Admin\terragest\src\_quarantine\modules\contrats\hooks\useCreateContrats.ts:3 import { useMutation } from "@tanstack/react-query";
C:\Users\Admin\terragest\src\_quarantine\modules\contrats\hooks\useCreateContrats.ts:11 export function useCreateContrats() {
C:\Users\Admin\terragest\src\_quarantine\modules\contrats\hooks\useCreateContrats.ts:12 return useMutation({
C:\Users\Admin\terragest\src\_quarantine\modules\contrats\hooks\useDeleteContrats.ts:1 "use client";
C:\Users\Admin\terragest\src\_quarantine\modules\contrats\hooks\useDeleteContrats.ts:3 import { useMutation } from "@tanstack/react-query";
C:\Users\Admin\terragest\src\_quarantine\modules\contrats\hooks\useDeleteContrats.ts:11 export function useDeleteContrats() {
C:\Users\Admin\terragest\src\_quarantine\modules\contrats\hooks\useDeleteContrats.ts:12 return useMutation({
C:\Users\Admin\terragest\src\_quarantine\modules\contrats\hooks\useUpdateContrats.ts:1 "use client";
C:\Users\Admin\terragest\src\_quarantine\modules\contrats\hooks\useUpdateContrats.ts:3 import { useMutation } from "@tanstack/react-query";
C:\Users\Admin\terragest\src\_quarantine\modules\contrats\hooks\useUpdateContrats.ts:11 export function useUpdateContrats() {
C:\Users\Admin\terragest\src\_quarantine\modules\contrats\hooks\useUpdateContrats.ts:12 return useMutation({
C:\Users\Admin\terragest\src\_quarantine\modules\exploitations\components\ExploitationsBulkActions.tsx:1 "use client";
C:\Users\Admin\terragest\src\_quarantine\modules\exploitations\components\ExploitationsChartWidget.tsx:1 "use client";
C:\Users\Admin\terragest\src\_quarantine\modules\exploitations\components\ExploitationsDashboardCard.tsx:1 "use client";
C:\Users\Admin\terragest\src\_quarantine\modules\exploitations\components\ExploitationsExportActions.tsx:1 "use client";
C:\Users\Admin\terragest\src\_quarantine\modules\exploitations\components\ExploitationsFilters.tsx:1 "use client";
C:\Users\Admin\terragest\src\_quarantine\modules\exploitations\components\ExploitationsForm.tsx:1 "use client";
C:\Users\Admin\terragest\src\_quarantine\modules\exploitations\components\ExploitationsForm.tsx:3 import { useForm } from "react-hook-form";
C:\Users\Admin\terragest\src\_quarantine\modules\exploitations\components\ExploitationsForm.tsx:12 import { useCreateExploitations } from "../hooks/useCreateExploitations";
C:\Users\Admin\terragest\src\_quarantine\modules\exploitations\components\ExploitationsForm.tsx:16 useCreateExploitations();
C:\Users\Admin\terragest\src\_quarantine\modules\exploitations\components\ExploitationsForm.tsx:18 const form = useForm<ExploitationsSchemaType>({
C:\Users\Admin\terragest\src\_quarantine\modules\exploitations\components\ExploitationsPagination.tsx:1 "use client";
C:\Users\Admin\terragest\src\_quarantine\modules\exploitations\components\ExploitationsRealtimeWidget.tsx:1 "use client";
C:\Users\Admin\terragest\src\_quarantine\modules\exploitations\components\ExploitationsSorting.tsx:1 "use client";
C:\Users\Admin\terragest\src\_quarantine\modules\exploitations\components\ExploitationsTable.tsx:1 "use client";
C:\Users\Admin\terragest\src\_quarantine\modules\exploitations\components\ExploitationsTable.tsx:3 import { useExploitations } from "../hooks/useExploitations";
C:\Users\Admin\terragest\src\_quarantine\modules\exploitations\components\ExploitationsTable.tsx:9 } = useExploitations();
C:\Users\Admin\terragest\src\_quarantine\modules\exploitations\hooks\useCreateExploitations.ts:1 "use client";
C:\Users\Admin\terragest\src\_quarantine\modules\exploitations\hooks\useCreateExploitations.ts:3 import { useMutation } from "@tanstack/react-query";
C:\Users\Admin\terragest\src\_quarantine\modules\exploitations\hooks\useCreateExploitations.ts:11 export function useCreateExploitations() {
C:\Users\Admin\terragest\src\_quarantine\modules\exploitations\hooks\useCreateExploitations.ts:12 return useMutation({
C:\Users\Admin\terragest\src\_quarantine\modules\exploitations\hooks\useDeleteExploitations.ts:1 "use client";
C:\Users\Admin\terragest\src\_quarantine\modules\exploitations\hooks\useDeleteExploitations.ts:3 import { useMutation } from "@tanstack/react-query";
C:\Users\Admin\terragest\src\_quarantine\modules\exploitations\hooks\useDeleteExploitations.ts:11 export function useDeleteExploitations() {
C:\Users\Admin\terragest\src\_quarantine\modules\exploitations\hooks\useDeleteExploitations.ts:12 return useMutation({
C:\Users\Admin\terragest\src\_quarantine\modules\exploitations\hooks\useExploitations.ts:1 "use client";
C:\Users\Admin\terragest\src\_quarantine\modules\exploitations\hooks\useExploitations.ts:3 import { useQuery } from "@tanstack/react-query";
C:\Users\Admin\terragest\src\_quarantine\modules\exploitations\hooks\useExploitations.ts:9 export function useExploitations() {
C:\Users\Admin\terragest\src\_quarantine\modules\exploitations\hooks\useExploitations.ts:10 return useQuery({
C:\Users\Admin\terragest\src\_quarantine\modules\exploitations\hooks\useUpdateExploitations.ts:1 "use client";
C:\Users\Admin\terragest\src\_quarantine\modules\exploitations\hooks\useUpdateExploitations.ts:3 import { useMutation } from "@tanstack/react-query";
C:\Users\Admin\terragest\src\_quarantine\modules\exploitations\hooks\useUpdateExploitations.ts:11 export function useUpdateExploitations() {
C:\Users\Admin\terragest\src\_quarantine\modules\exploitations\hooks\useUpdateExploitations.ts:12 return useMutation({
C:\Users\Admin\terragest\src\_quarantine\modules\factures\components\FacturesBulkActions.tsx:1 "use client";
C:\Users\Admin\terragest\src\_quarantine\modules\factures\components\FacturesChartWidget.tsx:1 "use client";
C:\Users\Admin\terragest\src\_quarantine\modules\factures\components\FacturesDashboardCard.tsx:1 "use client";
C:\Users\Admin\terragest\src\_quarantine\modules\factures\components\FacturesExportActions.tsx:1 "use client";
C:\Users\Admin\terragest\src\_quarantine\modules\factures\components\FacturesFilters.tsx:1 "use client";
C:\Users\Admin\terragest\src\_quarantine\modules\factures\components\FacturesForm.tsx:1 "use client";
C:\Users\Admin\terragest\src\_quarantine\modules\factures\components\FacturesForm.tsx:3 import { useForm } from "react-hook-form";
C:\Users\Admin\terragest\src\_quarantine\modules\factures\components\FacturesForm.tsx:12 import { useCreateFactures } from "../hooks/useCreateFactures";
C:\Users\Admin\terragest\src\_quarantine\modules\factures\components\FacturesForm.tsx:16 useCreateFactures();
C:\Users\Admin\terragest\src\_quarantine\modules\factures\components\FacturesForm.tsx:18 const form = useForm<FacturesSchemaType>({
C:\Users\Admin\terragest\src\_quarantine\modules\factures\components\FacturesPagination.tsx:1 "use client";
C:\Users\Admin\terragest\src\_quarantine\modules\factures\components\FacturesRealtimeWidget.tsx:1 "use client";
C:\Users\Admin\terragest\src\_quarantine\modules\factures\components\FacturesSorting.tsx:1 "use client";
C:\Users\Admin\terragest\src\_quarantine\modules\factures\components\FacturesTable.tsx:1 "use client";
C:\Users\Admin\terragest\src\_quarantine\modules\factures\components\FacturesTable.tsx:3 import { useFactures } from "../hooks/useFactures";
C:\Users\Admin\terragest\src\_quarantine\modules\factures\components\FacturesTable.tsx:9 } = useFactures();
C:\Users\Admin\terragest\src\_quarantine\modules\factures\hooks\useCreateFactures.ts:1 "use client";
C:\Users\Admin\terragest\src\_quarantine\modules\factures\hooks\useCreateFactures.ts:3 import { useMutation } from "@tanstack/react-query";
C:\Users\Admin\terragest\src\_quarantine\modules\factures\hooks\useCreateFactures.ts:11 export function useCreateFactures() {
C:\Users\Admin\terragest\src\_quarantine\modules\factures\hooks\useCreateFactures.ts:12 return useMutation({
C:\Users\Admin\terragest\src\_quarantine\modules\factures\hooks\useDeleteFactures.ts:1 "use client";
C:\Users\Admin\terragest\src\_quarantine\modules\factures\hooks\useDeleteFactures.ts:3 import { useMutation } from "@tanstack/react-query";
C:\Users\Admin\terragest\src\_quarantine\modules\factures\hooks\useDeleteFactures.ts:11 export function useDeleteFactures() {
C:\Users\Admin\terragest\src\_quarantine\modules\factures\hooks\useDeleteFactures.ts:12 return useMutation({
C:\Users\Admin\terragest\src\_quarantine\modules\factures\hooks\useFactures.ts:1 "use client";
C:\Users\Admin\terragest\src\_quarantine\modules\factures\hooks\useFactures.ts:3 import { useQuery } from "@tanstack/react-query";
C:\Users\Admin\terragest\src\_quarantine\modules\factures\hooks\useFactures.ts:9 export function useFactures() {
C:\Users\Admin\terragest\src\_quarantine\modules\factures\hooks\useFactures.ts:10 return useQuery({
C:\Users\Admin\terragest\src\_quarantine\modules\factures\hooks\useUpdateFactures.ts:1 "use client";
C:\Users\Admin\terragest\src\_quarantine\modules\factures\hooks\useUpdateFactures.ts:3 import { useMutation } from "@tanstack/react-query";
C:\Users\Admin\terragest\src\_quarantine\modules\factures\hooks\useUpdateFactures.ts:11 export function useUpdateFactures() {
C:\Users\Admin\terragest\src\_quarantine\modules\factures\hooks\useUpdateFactures.ts:12 return useMutation({
C:\Users\Admin\terragest\src\_quarantine\modules\fournisseurs\components\FournisseursBulkActions.tsx:1 "use client";
C:\Users\Admin\terragest\src\_quarantine\modules\fournisseurs\components\FournisseursChartWidget.tsx:1 "use client";
C:\Users\Admin\terragest\src\_quarantine\modules\fournisseurs\components\FournisseursDashboardCard.tsx:1 "use client";
C:\Users\Admin\terragest\src\_quarantine\modules\fournisseurs\components\FournisseursExportActions.tsx:1 "use client";
C:\Users\Admin\terragest\src\_quarantine\modules\fournisseurs\components\FournisseursFilters.tsx:1 "use client";
C:\Users\Admin\terragest\src\_quarantine\modules\fournisseurs\components\FournisseursForm.tsx:1 "use client";
C:\Users\Admin\terragest\src\_quarantine\modules\fournisseurs\components\FournisseursForm.tsx:3 import { useForm } from "react-hook-form";
C:\Users\Admin\terragest\src\_quarantine\modules\fournisseurs\components\FournisseursForm.tsx:12 import { useCreateFournisseurs } from "../hooks/useCreateFournisseurs";
C:\Users\Admin\terragest\src\_quarantine\modules\fournisseurs\components\FournisseursForm.tsx:16 useCreateFournisseurs();
C:\Users\Admin\terragest\src\_quarantine\modules\fournisseurs\components\FournisseursForm.tsx:18 const form = useForm<FournisseursSchemaType>({
C:\Users\Admin\terragest\src\_quarantine\modules\fournisseurs\components\FournisseursPagination.tsx:1 "use client";
C:\Users\Admin\terragest\src\_quarantine\modules\fournisseurs\components\FournisseursRealtimeWidget.tsx:1 "use client";
C:\Users\Admin\terragest\src\_quarantine\modules\fournisseurs\components\FournisseursSorting.tsx:1 "use client";
C:\Users\Admin\terragest\src\_quarantine\modules\fournisseurs\components\FournisseursTable.tsx:1 "use client";
C:\Users\Admin\terragest\src\_quarantine\modules\fournisseurs\components\FournisseursTable.tsx:3 import { useFournisseurs } from "../hooks/useFournisseurs";
C:\Users\Admin\terragest\src\_quarantine\modules\fournisseurs\components\FournisseursTable.tsx:9 } = useFournisseurs();
C:\Users\Admin\terragest\src\_quarantine\modules\fournisseurs\hooks\useCreateFournisseurs.ts:1 "use client";
C:\Users\Admin\terragest\src\_quarantine\modules\fournisseurs\hooks\useCreateFournisseurs.ts:3 import { useMutation } from "@tanstack/react-query";
C:\Users\Admin\terragest\src\_quarantine\modules\fournisseurs\hooks\useCreateFournisseurs.ts:11 export function useCreateFournisseurs() {
C:\Users\Admin\terragest\src\_quarantine\modules\fournisseurs\hooks\useCreateFournisseurs.ts:12 return useMutation({
C:\Users\Admin\terragest\src\_quarantine\modules\fournisseurs\hooks\useDeleteFournisseurs.ts:1 "use client";
C:\Users\Admin\terragest\src\_quarantine\modules\fournisseurs\hooks\useDeleteFournisseurs.ts:3 import { useMutation } from "@tanstack/react-query";
C:\Users\Admin\terragest\src\_quarantine\modules\fournisseurs\hooks\useDeleteFournisseurs.ts:11 export function useDeleteFournisseurs() {
C:\Users\Admin\terragest\src\_quarantine\modules\fournisseurs\hooks\useDeleteFournisseurs.ts:12 return useMutation({
C:\Users\Admin\terragest\src\_quarantine\modules\fournisseurs\hooks\useFournisseurs.ts:1 "use client";
C:\Users\Admin\terragest\src\_quarantine\modules\fournisseurs\hooks\useFournisseurs.ts:3 import { useQuery } from "@tanstack/react-query";
C:\Users\Admin\terragest\src\_quarantine\modules\fournisseurs\hooks\useFournisseurs.ts:9 export function useFournisseurs() {
C:\Users\Admin\terragest\src\_quarantine\modules\fournisseurs\hooks\useFournisseurs.ts:10 return useQuery({
C:\Users\Admin\terragest\src\_quarantine\modules\fournisseurs\hooks\useUpdateFournisseurs.ts:1 "use client";
C:\Users\Admin\terragest\src\_quarantine\modules\fournisseurs\hooks\useUpdateFournisseurs.ts:3 import { useMutation } from "@tanstack/react-query";
C:\Users\Admin\terragest\src\_quarantine\modules\fournisseurs\hooks\useUpdateFournisseurs.ts:11 export function useUpdateFournisseurs() {
C:\Users\Admin\terragest\src\_quarantine\modules\fournisseurs\hooks\useUpdateFournisseurs.ts:12 return useMutation({
C:\Users\Admin\terragest\src\_quarantine\modules\interventions\components\InterventionsBulkActions.tsx:1 "use client";
C:\Users\Admin\terragest\src\_quarantine\modules\interventions\components\InterventionsChartWidget.tsx:1 "use client";
C:\Users\Admin\terragest\src\_quarantine\modules\interventions\components\InterventionsDashboardCard.tsx:1 "use client";
C:\Users\Admin\terragest\src\_quarantine\modules\interventions\components\InterventionsExportActions.tsx:1 "use client";
C:\Users\Admin\terragest\src\_quarantine\modules\interventions\components\InterventionsFilters.tsx:1 "use client";
C:\Users\Admin\terragest\src\_quarantine\modules\interventions\components\InterventionsForm.tsx:1 "use client";
C:\Users\Admin\terragest\src\_quarantine\modules\interventions\components\InterventionsForm.tsx:3 import { useForm } from "react-hook-form";
C:\Users\Admin\terragest\src\_quarantine\modules\interventions\components\InterventionsForm.tsx:12 import { useCreateInterventions } from "../hooks/useCreateInterventions";
C:\Users\Admin\terragest\src\_quarantine\modules\interventions\components\InterventionsForm.tsx:16 useCreateInterventions();
C:\Users\Admin\terragest\src\_quarantine\modules\interventions\components\InterventionsForm.tsx:18 const form = useForm<InterventionsSchemaType>({
C:\Users\Admin\terragest\src\_quarantine\modules\interventions\components\InterventionsPagination.tsx:1 "use client";
C:\Users\Admin\terragest\src\_quarantine\modules\interventions\components\InterventionsRealtimeWidget.tsx:1 "use client";
C:\Users\Admin\terragest\src\_quarantine\modules\interventions\components\InterventionsSorting.tsx:1 "use client";
C:\Users\Admin\terragest\src\_quarantine\modules\interventions\components\InterventionsTable.tsx:1 "use client";
C:\Users\Admin\terragest\src\_quarantine\modules\interventions\components\InterventionsTable.tsx:3 import { useInterventions } from "../hooks/useInterventions";
C:\Users\Admin\terragest\src\_quarantine\modules\interventions\components\InterventionsTable.tsx:9 } = useInterventions();
C:\Users\Admin\terragest\src\_quarantine\modules\interventions\hooks\useCreateInterventions.ts:1 "use client";
C:\Users\Admin\terragest\src\_quarantine\modules\interventions\hooks\useCreateInterventions.ts:3 import { useMutation } from "@tanstack/react-query";
C:\Users\Admin\terragest\src\_quarantine\modules\interventions\hooks\useCreateInterventions.ts:11 export function useCreateInterventions() {
C:\Users\Admin\terragest\src\_quarantine\modules\interventions\hooks\useCreateInterventions.ts:12 return useMutation({
C:\Users\Admin\terragest\src\_quarantine\modules\interventions\hooks\useDeleteInterventions.ts:1 "use client";
C:\Users\Admin\terragest\src\_quarantine\modules\interventions\hooks\useDeleteInterventions.ts:3 import { useMutation } from "@tanstack/react-query";
C:\Users\Admin\terragest\src\_quarantine\modules\interventions\hooks\useDeleteInterventions.ts:11 export function useDeleteInterventions() {
C:\Users\Admin\terragest\src\_quarantine\modules\interventions\hooks\useDeleteInterventions.ts:12 return useMutation({
C:\Users\Admin\terragest\src\_quarantine\modules\interventions\hooks\useInterventions.ts:1 "use client";
C:\Users\Admin\terragest\src\_quarantine\modules\interventions\hooks\useInterventions.ts:3 import { useQuery } from "@tanstack/react-query";
C:\Users\Admin\terragest\src\_quarantine\modules\interventions\hooks\useInterventions.ts:9 export function useInterventions() {
C:\Users\Admin\terragest\src\_quarantine\modules\interventions\hooks\useInterventions.ts:10 return useQuery({
C:\Users\Admin\terragest\src\_quarantine\modules\interventions\hooks\useUpdateInterventions.ts:1 "use client";
C:\Users\Admin\terragest\src\_quarantine\modules\interventions\hooks\useUpdateInterventions.ts:3 import { useMutation } from "@tanstack/react-query";
C:\Users\Admin\terragest\src\_quarantine\modules\interventions\hooks\useUpdateInterventions.ts:11 export function useUpdateInterventions() {
C:\Users\Admin\terragest\src\_quarantine\modules\interventions\hooks\useUpdateInterventions.ts:12 return useMutation({
C:\Users\Admin\terragest\src\_quarantine\modules\maintenance\components\MaintenanceBulkActions.tsx:1 "use client";
C:\Users\Admin\terragest\src\_quarantine\modules\maintenance\components\MaintenanceChartWidget.tsx:1 "use client";
C:\Users\Admin\terragest\src\_quarantine\modules\maintenance\components\MaintenanceDashboardCard.tsx:1 "use client";
C:\Users\Admin\terragest\src\_quarantine\modules\maintenance\components\MaintenanceExportActions.tsx:1 "use client";
C:\Users\Admin\terragest\src\_quarantine\modules\maintenance\components\MaintenanceFilters.tsx:1 "use client";
C:\Users\Admin\terragest\src\_quarantine\modules\maintenance\components\MaintenanceForm.tsx:1 "use client";
C:\Users\Admin\terragest\src\_quarantine\modules\maintenance\components\MaintenanceForm.tsx:3 import { useForm } from "react-hook-form";
C:\Users\Admin\terragest\src\_quarantine\modules\maintenance\components\MaintenanceForm.tsx:12 import { useCreateMaintenance } from "../hooks/useCreateMaintenance";
C:\Users\Admin\terragest\src\_quarantine\modules\maintenance\components\MaintenanceForm.tsx:16 useCreateMaintenance();
C:\Users\Admin\terragest\src\_quarantine\modules\maintenance\components\MaintenanceForm.tsx:18 const form = useForm<MaintenanceSchemaType>({
C:\Users\Admin\terragest\src\_quarantine\modules\maintenance\components\MaintenancePagination.tsx:1 "use client";
C:\Users\Admin\terragest\src\_quarantine\modules\maintenance\components\MaintenanceRealtimeWidget.tsx:1 "use client";
C:\Users\Admin\terragest\src\_quarantine\modules\maintenance\components\MaintenanceSorting.tsx:1 "use client";
C:\Users\Admin\terragest\src\_quarantine\modules\maintenance\components\MaintenanceTable.tsx:1 "use client";
C:\Users\Admin\terragest\src\_quarantine\modules\maintenance\components\MaintenanceTable.tsx:3 import { useMaintenance } from "../hooks/useMaintenance";
C:\Users\Admin\terragest\src\_quarantine\modules\maintenance\components\MaintenanceTable.tsx:9 } = useMaintenance();
C:\Users\Admin\terragest\src\_quarantine\modules\maintenance\hooks\useCreateMaintenance.ts:1 "use client";
C:\Users\Admin\terragest\src\_quarantine\modules\maintenance\hooks\useCreateMaintenance.ts:3 import { useMutation } from "@tanstack/react-query";
C:\Users\Admin\terragest\src\_quarantine\modules\maintenance\hooks\useCreateMaintenance.ts:11 export function useCreateMaintenance() {
C:\Users\Admin\terragest\src\_quarantine\modules\maintenance\hooks\useCreateMaintenance.ts:12 return useMutation({
C:\Users\Admin\terragest\src\_quarantine\modules\maintenance\hooks\useDeleteMaintenance.ts:1 "use client";
C:\Users\Admin\terragest\src\_quarantine\modules\maintenance\hooks\useDeleteMaintenance.ts:3 import { useMutation } from "@tanstack/react-query";
C:\Users\Admin\terragest\src\_quarantine\modules\maintenance\hooks\useDeleteMaintenance.ts:11 export function useDeleteMaintenance() {
C:\Users\Admin\terragest\src\_quarantine\modules\maintenance\hooks\useDeleteMaintenance.ts:12 return useMutation({
C:\Users\Admin\terragest\src\_quarantine\modules\maintenance\hooks\useMaintenance.ts:1 "use client";
C:\Users\Admin\terragest\src\_quarantine\modules\maintenance\hooks\useMaintenance.ts:3 import { useQuery } from "@tanstack/react-query";
C:\Users\Admin\terragest\src\_quarantine\modules\maintenance\hooks\useMaintenance.ts:9 export function useMaintenance() {
C:\Users\Admin\terragest\src\_quarantine\modules\maintenance\hooks\useMaintenance.ts:10 return useQuery({
C:\Users\Admin\terragest\src\_quarantine\modules\maintenance\hooks\useUpdateMaintenance.ts:1 "use client";
C:\Users\Admin\terragest\src\_quarantine\modules\maintenance\hooks\useUpdateMaintenance.ts:3 import { useMutation } from "@tanstack/react-query";
C:\Users\Admin\terragest\src\_quarantine\modules\maintenance\hooks\useUpdateMaintenance.ts:11 export function useUpdateMaintenance() {
C:\Users\Admin\terragest\src\_quarantine\modules\maintenance\hooks\useUpdateMaintenance.ts:12 return useMutation({
C:\Users\Admin\terragest\src\_quarantine\modules\materiels\components\MaterielsBulkActions.tsx:1 "use client";
C:\Users\Admin\terragest\src\_quarantine\modules\materiels\components\MaterielsChartWidget.tsx:1 "use client";
C:\Users\Admin\terragest\src\_quarantine\modules\materiels\components\MaterielsDashboardCard.tsx:1 "use client";
C:\Users\Admin\terragest\src\_quarantine\modules\materiels\components\MaterielsExportActions.tsx:1 "use client";
C:\Users\Admin\terragest\src\_quarantine\modules\materiels\components\MaterielsFilters.tsx:1 "use client";
C:\Users\Admin\terragest\src\_quarantine\modules\materiels\components\MaterielsForm.tsx:1 "use client";
C:\Users\Admin\terragest\src\_quarantine\modules\materiels\components\MaterielsForm.tsx:3 import { useForm } from "react-hook-form";
C:\Users\Admin\terragest\src\_quarantine\modules\materiels\components\MaterielsForm.tsx:12 import { useCreateMateriels } from "../hooks/useCreateMateriels";
C:\Users\Admin\terragest\src\_quarantine\modules\materiels\components\MaterielsForm.tsx:16 useCreateMateriels();
C:\Users\Admin\terragest\src\_quarantine\modules\materiels\components\MaterielsForm.tsx:18 const form = useForm<MaterielsSchemaType>({
C:\Users\Admin\terragest\src\_quarantine\modules\materiels\components\MaterielsPagination.tsx:1 "use client";
C:\Users\Admin\terragest\src\_quarantine\modules\materiels\components\MaterielsRealtimeWidget.tsx:1 "use client";
C:\Users\Admin\terragest\src\_quarantine\modules\materiels\components\MaterielsSorting.tsx:1 "use client";
C:\Users\Admin\terragest\src\_quarantine\modules\materiels\components\MaterielsTable.tsx:1 "use client";
C:\Users\Admin\terragest\src\_quarantine\modules\materiels\components\MaterielsTable.tsx:3 import { useMateriels } from "../hooks/useMateriels";
C:\Users\Admin\terragest\src\_quarantine\modules\materiels\components\MaterielsTable.tsx:9 } = useMateriels();
C:\Users\Admin\terragest\src\_quarantine\modules\materiels\hooks\useCreateMateriels.ts:1 "use client";
C:\Users\Admin\terragest\src\_quarantine\modules\materiels\hooks\useCreateMateriels.ts:3 import { useMutation } from "@tanstack/react-query";
C:\Users\Admin\terragest\src\_quarantine\modules\materiels\hooks\useCreateMateriels.ts:11 export function useCreateMateriels() {
C:\Users\Admin\terragest\src\_quarantine\modules\materiels\hooks\useCreateMateriels.ts:12 return useMutation({
C:\Users\Admin\terragest\src\_quarantine\modules\materiels\hooks\useDeleteMateriels.ts:1 "use client";
C:\Users\Admin\terragest\src\_quarantine\modules\materiels\hooks\useDeleteMateriels.ts:3 import { useMutation } from "@tanstack/react-query";
C:\Users\Admin\terragest\src\_quarantine\modules\materiels\hooks\useDeleteMateriels.ts:11 export function useDeleteMateriels() {
C:\Users\Admin\terragest\src\_quarantine\modules\materiels\hooks\useDeleteMateriels.ts:12 return useMutation({
C:\Users\Admin\terragest\src\_quarantine\modules\materiels\hooks\useMateriels.ts:1 "use client";
C:\Users\Admin\terragest\src\_quarantine\modules\materiels\hooks\useMateriels.ts:3 import { useQuery } from "@tanstack/react-query";
C:\Users\Admin\terragest\src\_quarantine\modules\materiels\hooks\useMateriels.ts:9 export function useMateriels() {
C:\Users\Admin\terragest\src\_quarantine\modules\materiels\hooks\useMateriels.ts:10 return useQuery({
C:\Users\Admin\terragest\src\_quarantine\modules\materiels\hooks\useUpdateMateriels.ts:1 "use client";
C:\Users\Admin\terragest\src\_quarantine\modules\materiels\hooks\useUpdateMateriels.ts:3 import { useMutation } from "@tanstack/react-query";
C:\Users\Admin\terragest\src\_quarantine\modules\materiels\hooks\useUpdateMateriels.ts:11 export function useUpdateMateriels() {
C:\Users\Admin\terragest\src\_quarantine\modules\materiels\hooks\useUpdateMateriels.ts:12 return useMutation({
C:\Users\Admin\terragest\src\_quarantine\modules\mobile\components\MobileBulkActions.tsx:1 "use client";
C:\Users\Admin\terragest\src\_quarantine\modules\mobile\components\MobileChartWidget.tsx:1 "use client";
C:\Users\Admin\terragest\src\_quarantine\modules\mobile\components\MobileDashboardCard.tsx:1 "use client";
C:\Users\Admin\terragest\src\_quarantine\modules\mobile\components\MobileExportActions.tsx:1 "use client";
C:\Users\Admin\terragest\src\_quarantine\modules\mobile\components\MobileFilters.tsx:1 "use client";
C:\Users\Admin\terragest\src\_quarantine\modules\mobile\components\MobileForm.tsx:1 "use client";
C:\Users\Admin\terragest\src\_quarantine\modules\mobile\components\MobileForm.tsx:3 import { useForm } from "react-hook-form";
C:\Users\Admin\terragest\src\_quarantine\modules\mobile\components\MobileForm.tsx:12 import { useCreateMobile } from "../hooks/useCreateMobile";
C:\Users\Admin\terragest\src\_quarantine\modules\mobile\components\MobileForm.tsx:16 useCreateMobile();
C:\Users\Admin\terragest\src\_quarantine\modules\mobile\components\MobileForm.tsx:18 const form = useForm<MobileSchemaType>({
C:\Users\Admin\terragest\src\_quarantine\modules\mobile\components\MobilePagination.tsx:1 "use client";
C:\Users\Admin\terragest\src\_quarantine\modules\mobile\components\MobileRealtimeWidget.tsx:1 "use client";
C:\Users\Admin\terragest\src\_quarantine\modules\mobile\components\MobileSorting.tsx:1 "use client";
C:\Users\Admin\terragest\src\_quarantine\modules\mobile\components\MobileTable.tsx:1 "use client";
C:\Users\Admin\terragest\src\_quarantine\modules\mobile\components\MobileTable.tsx:3 import { useMobile } from "../hooks/useMobile";
C:\Users\Admin\terragest\src\_quarantine\modules\mobile\components\MobileTable.tsx:9 } = useMobile();
C:\Users\Admin\terragest\src\_quarantine\modules\mobile\hooks\useCreateMobile.ts:1 "use client";
C:\Users\Admin\terragest\src\_quarantine\modules\mobile\hooks\useCreateMobile.ts:3 import { useMutation } from "@tanstack/react-query";
C:\Users\Admin\terragest\src\_quarantine\modules\mobile\hooks\useCreateMobile.ts:11 export function useCreateMobile() {
C:\Users\Admin\terragest\src\_quarantine\modules\mobile\hooks\useCreateMobile.ts:12 return useMutation({
C:\Users\Admin\terragest\src\_quarantine\modules\mobile\hooks\useDeleteMobile.ts:1 "use client";
C:\Users\Admin\terragest\src\_quarantine\modules\mobile\hooks\useDeleteMobile.ts:3 import { useMutation } from "@tanstack/react-query";
C:\Users\Admin\terragest\src\_quarantine\modules\mobile\hooks\useDeleteMobile.ts:11 export function useDeleteMobile() {
C:\Users\Admin\terragest\src\_quarantine\modules\mobile\hooks\useDeleteMobile.ts:12 return useMutation({
C:\Users\Admin\terragest\src\_quarantine\modules\mobile\hooks\useMobile.ts:1 "use client";
C:\Users\Admin\terragest\src\_quarantine\modules\mobile\hooks\useMobile.ts:3 import { useQuery } from "@tanstack/react-query";
C:\Users\Admin\terragest\src\_quarantine\modules\mobile\hooks\useMobile.ts:9 export function useMobile() {
C:\Users\Admin\terragest\src\_quarantine\modules\mobile\hooks\useMobile.ts:10 return useQuery({
C:\Users\Admin\terragest\src\_quarantine\modules\mobile\hooks\useUpdateMobile.ts:1 "use client";
C:\Users\Admin\terragest\src\_quarantine\modules\mobile\hooks\useUpdateMobile.ts:3 import { useMutation } from "@tanstack/react-query";
C:\Users\Admin\terragest\src\_quarantine\modules\mobile\hooks\useUpdateMobile.ts:11 export function useUpdateMobile() {
C:\Users\Admin\terragest\src\_quarantine\modules\mobile\hooks\useUpdateMobile.ts:12 return useMutation({
C:\Users\Admin\terragest\src\_quarantine\modules\monitoring\components\MonitoringBulkActions.tsx:1 "use client";
C:\Users\Admin\terragest\src\_quarantine\modules\monitoring\components\MonitoringChartWidget.tsx:1 "use client";
C:\Users\Admin\terragest\src\_quarantine\modules\monitoring\components\MonitoringDashboardCard.tsx:1 "use client";
C:\Users\Admin\terragest\src\_quarantine\modules\monitoring\components\MonitoringExportActions.tsx:1 "use client";
C:\Users\Admin\terragest\src\_quarantine\modules\monitoring\components\MonitoringFilters.tsx:1 "use client";
C:\Users\Admin\terragest\src\_quarantine\modules\monitoring\components\MonitoringForm.tsx:1 "use client";
C:\Users\Admin\terragest\src\_quarantine\modules\monitoring\components\MonitoringForm.tsx:3 import { useForm } from "react-hook-form";
C:\Users\Admin\terragest\src\_quarantine\modules\monitoring\components\MonitoringForm.tsx:12 import { useCreateMonitoring } from "../hooks/useCreateMonitoring";
C:\Users\Admin\terragest\src\_quarantine\modules\monitoring\components\MonitoringForm.tsx:16 useCreateMonitoring();
C:\Users\Admin\terragest\src\_quarantine\modules\monitoring\components\MonitoringForm.tsx:18 const form = useForm<MonitoringSchemaType>({
C:\Users\Admin\terragest\src\_quarantine\modules\monitoring\components\MonitoringPagination.tsx:1 "use client";
C:\Users\Admin\terragest\src\_quarantine\modules\monitoring\components\MonitoringRealtimeWidget.tsx:1 "use client";
C:\Users\Admin\terragest\src\_quarantine\modules\monitoring\components\MonitoringSorting.tsx:1 "use client";
C:\Users\Admin\terragest\src\_quarantine\modules\monitoring\components\MonitoringTable.tsx:1 "use client";
C:\Users\Admin\terragest\src\_quarantine\modules\monitoring\components\MonitoringTable.tsx:3 import { useMonitoring } from "../hooks/useMonitoring";
C:\Users\Admin\terragest\src\_quarantine\modules\monitoring\components\MonitoringTable.tsx:9 } = useMonitoring();
C:\Users\Admin\terragest\src\_quarantine\modules\monitoring\hooks\useCreateMonitoring.ts:1 "use client";
C:\Users\Admin\terragest\src\_quarantine\modules\monitoring\hooks\useCreateMonitoring.ts:3 import { useMutation } from "@tanstack/react-query";
C:\Users\Admin\terragest\src\_quarantine\modules\monitoring\hooks\useCreateMonitoring.ts:11 export function useCreateMonitoring() {
C:\Users\Admin\terragest\src\_quarantine\modules\monitoring\hooks\useCreateMonitoring.ts:12 return useMutation({
C:\Users\Admin\terragest\src\_quarantine\modules\monitoring\hooks\useDeleteMonitoring.ts:1 "use client";
C:\Users\Admin\terragest\src\_quarantine\modules\monitoring\hooks\useDeleteMonitoring.ts:3 import { useMutation } from "@tanstack/react-query";
C:\Users\Admin\terragest\src\_quarantine\modules\monitoring\hooks\useDeleteMonitoring.ts:11 export function useDeleteMonitoring() {
C:\Users\Admin\terragest\src\_quarantine\modules\monitoring\hooks\useDeleteMonitoring.ts:12 return useMutation({
C:\Users\Admin\terragest\src\_quarantine\modules\monitoring\hooks\useMonitoring.ts:1 "use client";
C:\Users\Admin\terragest\src\_quarantine\modules\monitoring\hooks\useMonitoring.ts:3 import { useQuery } from "@tanstack/react-query";
C:\Users\Admin\terragest\src\_quarantine\modules\monitoring\hooks\useMonitoring.ts:9 export function useMonitoring() {
C:\Users\Admin\terragest\src\_quarantine\modules\monitoring\hooks\useMonitoring.ts:10 return useQuery({
C:\Users\Admin\terragest\src\_quarantine\modules\monitoring\hooks\useUpdateMonitoring.ts:1 "use client";
C:\Users\Admin\terragest\src\_quarantine\modules\monitoring\hooks\useUpdateMonitoring.ts:3 import { useMutation } from "@tanstack/react-query";
C:\Users\Admin\terragest\src\_quarantine\modules\monitoring\hooks\useUpdateMonitoring.ts:11 export function useUpdateMonitoring() {
C:\Users\Admin\terragest\src\_quarantine\modules\monitoring\hooks\useUpdateMonitoring.ts:12 return useMutation({
C:\Users\Admin\terragest\src\_quarantine\modules\mouvements-stock\components\MouvementsStockBulkActions.tsx:1 "use client";
C:\Users\Admin\terragest\src\_quarantine\modules\mouvements-stock\components\MouvementsStockChartWidget.tsx:1 "use client";
C:\Users\Admin\terragest\src\_quarantine\modules\mouvements-stock\components\MouvementsStockDashboardCard.tsx:1 "use client";
C:\Users\Admin\terragest\src\_quarantine\modules\mouvements-stock\components\MouvementsStockExportActions.tsx:1 "use client";
C:\Users\Admin\terragest\src\_quarantine\modules\mouvements-stock\components\MouvementsStockFilters.tsx:1 "use client";
C:\Users\Admin\terragest\src\_quarantine\modules\mouvements-stock\components\MouvementsStockForm.tsx:1 "use client";
C:\Users\Admin\terragest\src\_quarantine\modules\mouvements-stock\components\MouvementsStockForm.tsx:3 import { useForm } from "react-hook-form";
C:\Users\Admin\terragest\src\_quarantine\modules\mouvements-stock\components\MouvementsStockForm.tsx:12 import { useCreateMouvementsStock } from "../hooks/useCreateMouvementsStock";
C:\Users\Admin\terragest\src\_quarantine\modules\mouvements-stock\components\MouvementsStockForm.tsx:16 useCreateMouvementsStock();
C:\Users\Admin\terragest\src\_quarantine\modules\mouvements-stock\components\MouvementsStockForm.tsx:18 const form = useForm<MouvementsStockSchemaType>({
C:\Users\Admin\terragest\src\_quarantine\modules\mouvements-stock\components\MouvementsStockPagination.tsx:1 "use client";
C:\Users\Admin\terragest\src\_quarantine\modules\mouvements-stock\components\MouvementsStockRealtimeWidget.tsx:1 "use client";
C:\Users\Admin\terragest\src\_quarantine\modules\mouvements-stock\components\MouvementsStockSorting.tsx:1 "use client";
C:\Users\Admin\terragest\src\_quarantine\modules\mouvements-stock\components\MouvementsStockTable.tsx:1 "use client";
C:\Users\Admin\terragest\src\_quarantine\modules\mouvements-stock\components\MouvementsStockTable.tsx:3 import { useMouvementsStock } from "../hooks/useMouvementsStock";
C:\Users\Admin\terragest\src\_quarantine\modules\mouvements-stock\components\MouvementsStockTable.tsx:9 } = useMouvementsStock();
C:\Users\Admin\terragest\src\_quarantine\modules\mouvements-stock\hooks\useCreateMouvementsStock.ts:1 "use client";
C:\Users\Admin\terragest\src\_quarantine\modules\mouvements-stock\hooks\useCreateMouvementsStock.ts:3 import { useMutation } from "@tanstack/react-query";
C:\Users\Admin\terragest\src\_quarantine\modules\mouvements-stock\hooks\useCreateMouvementsStock.ts:11 export function useCreateMouvementsStock() {
C:\Users\Admin\terragest\src\_quarantine\modules\mouvements-stock\hooks\useCreateMouvementsStock.ts:12 return useMutation({
C:\Users\Admin\terragest\src\_quarantine\modules\mouvements-stock\hooks\useDeleteMouvementsStock.ts:1 "use client";
C:\Users\Admin\terragest\src\_quarantine\modules\mouvements-stock\hooks\useDeleteMouvementsStock.ts:3 import { useMutation } from "@tanstack/react-query";
C:\Users\Admin\terragest\src\_quarantine\modules\mouvements-stock\hooks\useDeleteMouvementsStock.ts:11 export function useDeleteMouvementsStock() {
C:\Users\Admin\terragest\src\_quarantine\modules\mouvements-stock\hooks\useDeleteMouvementsStock.ts:12 return useMutation({
C:\Users\Admin\terragest\src\_quarantine\modules\mouvements-stock\hooks\useMouvementsStock.ts:1 "use client";
C:\Users\Admin\terragest\src\_quarantine\modules\mouvements-stock\hooks\useMouvementsStock.ts:3 import { useQuery } from "@tanstack/react-query";
C:\Users\Admin\terragest\src\_quarantine\modules\mouvements-stock\hooks\useMouvementsStock.ts:9 export function useMouvementsStock() {
C:\Users\Admin\terragest\src\_quarantine\modules\mouvements-stock\hooks\useMouvementsStock.ts:10 return useQuery({
C:\Users\Admin\terragest\src\_quarantine\modules\mouvements-stock\hooks\useUpdateMouvementsStock.ts:1 "use client";
C:\Users\Admin\terragest\src\_quarantine\modules\mouvements-stock\hooks\useUpdateMouvementsStock.ts:3 import { useMutation } from "@tanstack/react-query";
C:\Users\Admin\terragest\src\_quarantine\modules\mouvements-stock\hooks\useUpdateMouvementsStock.ts:11 export function useUpdateMouvementsStock() {
C:\Users\Admin\terragest\src\_quarantine\modules\mouvements-stock\hooks\useUpdateMouvementsStock.ts:12 return useMutation({
C:\Users\Admin\terragest\src\_quarantine\modules\paiements\components\PaiementsBulkActions.tsx:1 "use client";
C:\Users\Admin\terragest\src\_quarantine\modules\paiements\components\PaiementsChartWidget.tsx:1 "use client";
C:\Users\Admin\terragest\src\_quarantine\modules\paiements\components\PaiementsDashboardCard.tsx:1 "use client";
C:\Users\Admin\terragest\src\_quarantine\modules\paiements\components\PaiementsExportActions.tsx:1 "use client";
C:\Users\Admin\terragest\src\_quarantine\modules\paiements\components\PaiementsFilters.tsx:1 "use client";
C:\Users\Admin\terragest\src\_quarantine\modules\paiements\components\PaiementsForm.tsx:1 "use client";
C:\Users\Admin\terragest\src\_quarantine\modules\paiements\components\PaiementsForm.tsx:3 import { useForm } from "react-hook-form";
C:\Users\Admin\terragest\src\_quarantine\modules\paiements\components\PaiementsForm.tsx:12 import { useCreatePaiements } from "../hooks/useCreatePaiements";
C:\Users\Admin\terragest\src\_quarantine\modules\paiements\components\PaiementsForm.tsx:16 useCreatePaiements();
C:\Users\Admin\terragest\src\_quarantine\modules\paiements\components\PaiementsForm.tsx:18 const form = useForm<PaiementsSchemaType>({
C:\Users\Admin\terragest\src\_quarantine\modules\paiements\components\PaiementsPagination.tsx:1 "use client";
C:\Users\Admin\terragest\src\_quarantine\modules\paiements\components\PaiementsRealtimeWidget.tsx:1 "use client";
C:\Users\Admin\terragest\src\_quarantine\modules\paiements\components\PaiementsSorting.tsx:1 "use client";
C:\Users\Admin\terragest\src\_quarantine\modules\paiements\components\PaiementsTable.tsx:1 "use client";
C:\Users\Admin\terragest\src\_quarantine\modules\paiements\components\PaiementsTable.tsx:3 import { usePaiements } from "../hooks/usePaiements";
C:\Users\Admin\terragest\src\_quarantine\modules\paiements\components\PaiementsTable.tsx:9 } = usePaiements();
C:\Users\Admin\terragest\src\_quarantine\modules\paiements\hooks\useCreatePaiements.ts:1 "use client";
C:\Users\Admin\terragest\src\_quarantine\modules\paiements\hooks\useCreatePaiements.ts:3 import { useMutation } from "@tanstack/react-query";
C:\Users\Admin\terragest\src\_quarantine\modules\paiements\hooks\useCreatePaiements.ts:11 export function useCreatePaiements() {
C:\Users\Admin\terragest\src\_quarantine\modules\paiements\hooks\useCreatePaiements.ts:12 return useMutation({
C:\Users\Admin\terragest\src\_quarantine\modules\paiements\hooks\useDeletePaiements.ts:1 "use client";
C:\Users\Admin\terragest\src\_quarantine\modules\paiements\hooks\useDeletePaiements.ts:3 import { useMutation } from "@tanstack/react-query";
C:\Users\Admin\terragest\src\_quarantine\modules\paiements\hooks\useDeletePaiements.ts:11 export function useDeletePaiements() {
C:\Users\Admin\terragest\src\_quarantine\modules\paiements\hooks\useDeletePaiements.ts:12 return useMutation({
C:\Users\Admin\terragest\src\_quarantine\modules\paiements\hooks\usePaiements.ts:1 "use client";
C:\Users\Admin\terragest\src\_quarantine\modules\paiements\hooks\usePaiements.ts:3 import { useQuery } from "@tanstack/react-query";
C:\Users\Admin\terragest\src\_quarantine\modules\paiements\hooks\usePaiements.ts:9 export function usePaiements() {
C:\Users\Admin\terragest\src\_quarantine\modules\paiements\hooks\usePaiements.ts:10 return useQuery({
C:\Users\Admin\terragest\src\_quarantine\modules\paiements\hooks\useUpdatePaiements.ts:1 "use client";
C:\Users\Admin\terragest\src\_quarantine\modules\paiements\hooks\useUpdatePaiements.ts:3 import { useMutation } from "@tanstack/react-query";
C:\Users\Admin\terragest\src\_quarantine\modules\paiements\hooks\useUpdatePaiements.ts:11 export function useUpdatePaiements() {
C:\Users\Admin\terragest\src\_quarantine\modules\paiements\hooks\useUpdatePaiements.ts:12 return useMutation({
C:\Users\Admin\terragest\src\_quarantine\modules\productions\components\ProductionsBulkActions.tsx:1 "use client";
C:\Users\Admin\terragest\src\_quarantine\modules\productions\components\ProductionsChartWidget.tsx:1 "use client";
C:\Users\Admin\terragest\src\_quarantine\modules\productions\components\ProductionsDashboardCard.tsx:1 "use client";
C:\Users\Admin\terragest\src\_quarantine\modules\productions\components\ProductionsExportActions.tsx:1 "use client";
C:\Users\Admin\terragest\src\_quarantine\modules\productions\components\ProductionsFilters.tsx:1 "use client";
C:\Users\Admin\terragest\src\_quarantine\modules\productions\components\ProductionsForm.tsx:1 "use client";
C:\Users\Admin\terragest\src\_quarantine\modules\productions\components\ProductionsForm.tsx:3 import { useForm } from "react-hook-form";
C:\Users\Admin\terragest\src\_quarantine\modules\productions\components\ProductionsForm.tsx:12 import { useCreateProductions } from "../hooks/useCreateProductions";
C:\Users\Admin\terragest\src\_quarantine\modules\productions\components\ProductionsForm.tsx:16 useCreateProductions();
C:\Users\Admin\terragest\src\_quarantine\modules\productions\components\ProductionsForm.tsx:18 const form = useForm<ProductionsSchemaType>({
C:\Users\Admin\terragest\src\_quarantine\modules\productions\components\ProductionsPagination.tsx:1 "use client";
C:\Users\Admin\terragest\src\_quarantine\modules\productions\components\ProductionsRealtimeWidget.tsx:1 "use client";
C:\Users\Admin\terragest\src\_quarantine\modules\productions\components\ProductionsSorting.tsx:1 "use client";
C:\Users\Admin\terragest\src\_quarantine\modules\productions\components\ProductionsTable.tsx:1 "use client";
C:\Users\Admin\terragest\src\_quarantine\modules\productions\components\ProductionsTable.tsx:3 import { useProductions } from "../hooks/useProductions";
C:\Users\Admin\terragest\src\_quarantine\modules\productions\components\ProductionsTable.tsx:9 } = useProductions();
C:\Users\Admin\terragest\src\_quarantine\modules\productions\hooks\useCreateProductions.ts:1 "use client";
C:\Users\Admin\terragest\src\_quarantine\modules\productions\hooks\useCreateProductions.ts:3 import { useMutation } from "@tanstack/react-query";
C:\Users\Admin\terragest\src\_quarantine\modules\productions\hooks\useCreateProductions.ts:11 export function useCreateProductions() {
C:\Users\Admin\terragest\src\_quarantine\modules\productions\hooks\useCreateProductions.ts:12 return useMutation({
C:\Users\Admin\terragest\src\_quarantine\modules\productions\hooks\useDeleteProductions.ts:1 "use client";
C:\Users\Admin\terragest\src\_quarantine\modules\productions\hooks\useDeleteProductions.ts:3 import { useMutation } from "@tanstack/react-query";
C:\Users\Admin\terragest\src\_quarantine\modules\productions\hooks\useDeleteProductions.ts:11 export function useDeleteProductions() {
C:\Users\Admin\terragest\src\_quarantine\modules\productions\hooks\useDeleteProductions.ts:12 return useMutation({
C:\Users\Admin\terragest\src\_quarantine\modules\productions\hooks\useProductions.ts:1 "use client";
C:\Users\Admin\terragest\src\_quarantine\modules\productions\hooks\useProductions.ts:3 import { useQuery } from "@tanstack/react-query";
C:\Users\Admin\terragest\src\_quarantine\modules\productions\hooks\useProductions.ts:9 export function useProductions() {
C:\Users\Admin\terragest\src\_quarantine\modules\productions\hooks\useProductions.ts:10 return useQuery({
C:\Users\Admin\terragest\src\_quarantine\modules\productions\hooks\useUpdateProductions.ts:1 "use client";
C:\Users\Admin\terragest\src\_quarantine\modules\productions\hooks\useUpdateProductions.ts:3 import { useMutation } from "@tanstack/react-query";
C:\Users\Admin\terragest\src\_quarantine\modules\productions\hooks\useUpdateProductions.ts:11 export function useUpdateProductions() {
C:\Users\Admin\terragest\src\_quarantine\modules\productions\hooks\useUpdateProductions.ts:12 return useMutation({
C:\Users\Admin\terragest\src\_quarantine\modules\recoltes\components\RecoltesBulkActions.tsx:1 "use client";
C:\Users\Admin\terragest\src\_quarantine\modules\recoltes\components\RecoltesChartWidget.tsx:1 "use client";
C:\Users\Admin\terragest\src\_quarantine\modules\recoltes\components\RecoltesDashboardCard.tsx:1 "use client";
C:\Users\Admin\terragest\src\_quarantine\modules\recoltes\components\RecoltesExportActions.tsx:1 "use client";
C:\Users\Admin\terragest\src\_quarantine\modules\recoltes\components\RecoltesFilters.tsx:1 "use client";
C:\Users\Admin\terragest\src\_quarantine\modules\recoltes\components\RecoltesForm.tsx:1 "use client";
C:\Users\Admin\terragest\src\_quarantine\modules\recoltes\components\RecoltesForm.tsx:3 import { useForm } from "react-hook-form";
C:\Users\Admin\terragest\src\_quarantine\modules\recoltes\components\RecoltesForm.tsx:12 import { useCreateRecoltes } from "../hooks/useCreateRecoltes";
C:\Users\Admin\terragest\src\_quarantine\modules\recoltes\components\RecoltesForm.tsx:16 useCreateRecoltes();
C:\Users\Admin\terragest\src\_quarantine\modules\recoltes\components\RecoltesForm.tsx:18 const form = useForm<RecoltesSchemaType>({
C:\Users\Admin\terragest\src\_quarantine\modules\recoltes\components\RecoltesPagination.tsx:1 "use client";
C:\Users\Admin\terragest\src\_quarantine\modules\recoltes\components\RecoltesRealtimeWidget.tsx:1 "use client";
C:\Users\Admin\terragest\src\_quarantine\modules\recoltes\components\RecoltesSorting.tsx:1 "use client";
C:\Users\Admin\terragest\src\_quarantine\modules\recoltes\components\RecoltesTable.tsx:1 "use client";
C:\Users\Admin\terragest\src\_quarantine\modules\recoltes\components\RecoltesTable.tsx:3 import { useRecoltes } from "../hooks/useRecoltes";
C:\Users\Admin\terragest\src\_quarantine\modules\recoltes\components\RecoltesTable.tsx:9 } = useRecoltes();
C:\Users\Admin\terragest\src\_quarantine\modules\recoltes\hooks\useCreateRecoltes.ts:1 "use client";
C:\Users\Admin\terragest\src\_quarantine\modules\recoltes\hooks\useCreateRecoltes.ts:3 import { useMutation } from "@tanstack/react-query";
C:\Users\Admin\terragest\src\_quarantine\modules\recoltes\hooks\useCreateRecoltes.ts:11 export function useCreateRecoltes() {
C:\Users\Admin\terragest\src\_quarantine\modules\recoltes\hooks\useCreateRecoltes.ts:12 return useMutation({
C:\Users\Admin\terragest\src\_quarantine\modules\recoltes\hooks\useDeleteRecoltes.ts:1 "use client";
C:\Users\Admin\terragest\src\_quarantine\modules\recoltes\hooks\useDeleteRecoltes.ts:3 import { useMutation } from "@tanstack/react-query";
C:\Users\Admin\terragest\src\_quarantine\modules\recoltes\hooks\useDeleteRecoltes.ts:11 export function useDeleteRecoltes() {
C:\Users\Admin\terragest\src\_quarantine\modules\recoltes\hooks\useDeleteRecoltes.ts:12 return useMutation({
C:\Users\Admin\terragest\src\_quarantine\modules\recoltes\hooks\useRecoltes.ts:1 "use client";
C:\Users\Admin\terragest\src\_quarantine\modules\recoltes\hooks\useRecoltes.ts:3 import { useQuery } from "@tanstack/react-query";
C:\Users\Admin\terragest\src\_quarantine\modules\recoltes\hooks\useRecoltes.ts:9 export function useRecoltes() {
C:\Users\Admin\terragest\src\_quarantine\modules\recoltes\hooks\useRecoltes.ts:10 return useQuery({
C:\Users\Admin\terragest\src\_quarantine\modules\recoltes\hooks\useUpdateRecoltes.ts:1 "use client";
C:\Users\Admin\terragest\src\_quarantine\modules\recoltes\hooks\useUpdateRecoltes.ts:3 import { useMutation } from "@tanstack/react-query";
C:\Users\Admin\terragest\src\_quarantine\modules\recoltes\hooks\useUpdateRecoltes.ts:11 export function useUpdateRecoltes() {
C:\Users\Admin\terragest\src\_quarantine\modules\recoltes\hooks\useUpdateRecoltes.ts:12 return useMutation({
C:\Users\Admin\terragest\src\_quarantine\modules\stocks\components\StocksBulkActions.tsx:1 "use client";
C:\Users\Admin\terragest\src\_quarantine\modules\stocks\components\StocksDashboardCard.tsx:1 "use client";
C:\Users\Admin\terragest\src\_quarantine\modules\stocks\components\StocksExportActions.tsx:1 "use client";
C:\Users\Admin\terragest\src\_quarantine\modules\stocks\components\StocksFilters.tsx:1 "use client";
C:\Users\Admin\terragest\src\_quarantine\modules\stocks\components\StocksForm.tsx:1 "use client";
C:\Users\Admin\terragest\src\_quarantine\modules\stocks\components\StocksForm.tsx:3 import { useForm } from "react-hook-form";
C:\Users\Admin\terragest\src\_quarantine\modules\stocks\components\StocksForm.tsx:12 import { useCreateStocks } from "../hooks/useCreateStocks";
C:\Users\Admin\terragest\src\_quarantine\modules\stocks\components\StocksForm.tsx:16 useCreateStocks();
C:\Users\Admin\terragest\src\_quarantine\modules\stocks\components\StocksForm.tsx:18 const form = useForm<StocksSchemaType>({
C:\Users\Admin\terragest\src\_quarantine\modules\stocks\components\StocksPagination.tsx:1 "use client";
C:\Users\Admin\terragest\src\_quarantine\modules\stocks\components\StocksSorting.tsx:1 "use client";
C:\Users\Admin\terragest\src\_quarantine\modules\stocks\components\StocksTable.tsx:1 "use client";
C:\Users\Admin\terragest\src\_quarantine\modules\stocks\components\StocksTable.tsx:3 import { useStocks } from "../hooks/useStocks";
C:\Users\Admin\terragest\src\_quarantine\modules\stocks\components\StocksTable.tsx:9 } = useStocks();
C:\Users\Admin\terragest\src\_quarantine\modules\stocks\hooks\useCreateStocks.ts:1 "use client";
C:\Users\Admin\terragest\src\_quarantine\modules\stocks\hooks\useCreateStocks.ts:3 import { useMutation } from "@tanstack/react-query";
C:\Users\Admin\terragest\src\_quarantine\modules\stocks\hooks\useCreateStocks.ts:11 export function useCreateStocks() {
C:\Users\Admin\terragest\src\_quarantine\modules\stocks\hooks\useCreateStocks.ts:12 return useMutation({
C:\Users\Admin\terragest\src\_quarantine\modules\stocks\hooks\useDeleteStocks.ts:1 "use client";
C:\Users\Admin\terragest\src\_quarantine\modules\stocks\hooks\useDeleteStocks.ts:3 import { useMutation } from "@tanstack/react-query";
C:\Users\Admin\terragest\src\_quarantine\modules\stocks\hooks\useDeleteStocks.ts:11 export function useDeleteStocks() {
C:\Users\Admin\terragest\src\_quarantine\modules\stocks\hooks\useDeleteStocks.ts:12 return useMutation({
C:\Users\Admin\terragest\src\_quarantine\modules\stocks\hooks\useStocks.ts:1 "use client";
C:\Users\Admin\terragest\src\_quarantine\modules\stocks\hooks\useStocks.ts:3 import { useQuery } from "@tanstack/react-query";
C:\Users\Admin\terragest\src\_quarantine\modules\stocks\hooks\useStocks.ts:9 export function useStocks() {
C:\Users\Admin\terragest\src\_quarantine\modules\stocks\hooks\useStocks.ts:10 return useQuery({
C:\Users\Admin\terragest\src\_quarantine\modules\stocks\hooks\useUpdateStocks.ts:1 "use client";
C:\Users\Admin\terragest\src\_quarantine\modules\stocks\hooks\useUpdateStocks.ts:3 import { useMutation } from "@tanstack/react-query";
C:\Users\Admin\terragest\src\_quarantine\modules\stocks\hooks\useUpdateStocks.ts:11 export function useUpdateStocks() {
C:\Users\Admin\terragest\src\_quarantine\modules\stocks\hooks\useUpdateStocks.ts:12 return useMutation({
C:\Users\Admin\terragest\src\_quarantine\modules\sync\components\SyncBulkActions.tsx:1 "use client";
C:\Users\Admin\terragest\src\_quarantine\modules\sync\components\SyncChartWidget.tsx:1 "use client";
C:\Users\Admin\terragest\src\_quarantine\modules\sync\components\SyncDashboardCard.tsx:1 "use client";
C:\Users\Admin\terragest\src\_quarantine\modules\sync\components\SyncExportActions.tsx:1 "use client";
C:\Users\Admin\terragest\src\_quarantine\modules\sync\components\SyncFilters.tsx:1 "use client";
C:\Users\Admin\terragest\src\_quarantine\modules\sync\components\SyncForm.tsx:1 "use client";
C:\Users\Admin\terragest\src\_quarantine\modules\sync\components\SyncForm.tsx:3 import { useForm } from "react-hook-form";
C:\Users\Admin\terragest\src\_quarantine\modules\sync\components\SyncForm.tsx:12 import { useCreateSync } from "../hooks/useCreateSync";
C:\Users\Admin\terragest\src\_quarantine\modules\sync\components\SyncForm.tsx:16 useCreateSync();
C:\Users\Admin\terragest\src\_quarantine\modules\sync\components\SyncForm.tsx:18 const form = useForm<SyncSchemaType>({
C:\Users\Admin\terragest\src\_quarantine\modules\sync\components\SyncPagination.tsx:1 "use client";
C:\Users\Admin\terragest\src\_quarantine\modules\sync\components\SyncRealtimeWidget.tsx:1 "use client";
C:\Users\Admin\terragest\src\_quarantine\modules\sync\components\SyncSorting.tsx:1 "use client";
C:\Users\Admin\terragest\src\_quarantine\modules\sync\components\SyncTable.tsx:1 "use client";
C:\Users\Admin\terragest\src\_quarantine\modules\sync\components\SyncTable.tsx:3 import { useSync } from "../hooks/useSync";
C:\Users\Admin\terragest\src\_quarantine\modules\sync\components\SyncTable.tsx:9 } = useSync();
C:\Users\Admin\terragest\src\_quarantine\modules\sync\hooks\useCreateSync.ts:1 "use client";
C:\Users\Admin\terragest\src\_quarantine\modules\sync\hooks\useCreateSync.ts:3 import { useMutation } from "@tanstack/react-query";
C:\Users\Admin\terragest\src\_quarantine\modules\sync\hooks\useCreateSync.ts:11 export function useCreateSync() {
C:\Users\Admin\terragest\src\_quarantine\modules\sync\hooks\useCreateSync.ts:12 return useMutation({
C:\Users\Admin\terragest\src\_quarantine\modules\sync\hooks\useDeleteSync.ts:1 "use client";
C:\Users\Admin\terragest\src\_quarantine\modules\sync\hooks\useDeleteSync.ts:3 import { useMutation } from "@tanstack/react-query";
C:\Users\Admin\terragest\src\_quarantine\modules\sync\hooks\useDeleteSync.ts:11 export function useDeleteSync() {
C:\Users\Admin\terragest\src\_quarantine\modules\sync\hooks\useDeleteSync.ts:12 return useMutation({
C:\Users\Admin\terragest\src\_quarantine\modules\sync\hooks\useSync.ts:1 "use client";
C:\Users\Admin\terragest\src\_quarantine\modules\sync\hooks\useSync.ts:3 import { useQuery } from "@tanstack/react-query";
C:\Users\Admin\terragest\src\_quarantine\modules\sync\hooks\useSync.ts:9 export function useSync() {
C:\Users\Admin\terragest\src\_quarantine\modules\sync\hooks\useSync.ts:10 return useQuery({
C:\Users\Admin\terragest\src\_quarantine\modules\sync\hooks\useUpdateSync.ts:1 "use client";
C:\Users\Admin\terragest\src\_quarantine\modules\sync\hooks\useUpdateSync.ts:3 import { useMutation } from "@tanstack/react-query";
C:\Users\Admin\terragest\src\_quarantine\modules\sync\hooks\useUpdateSync.ts:11 export function useUpdateSync() {
C:\Users\Admin\terragest\src\_quarantine\modules\sync\hooks\useUpdateSync.ts:12 return useMutation({
C:\Users\Admin\terragest\src\_quarantine\modules\terrains\components\TerrainsBulkActions.tsx:1 "use client";
C:\Users\Admin\terragest\src\_quarantine\modules\terrains\components\TerrainsChartWidget.tsx:1 "use client";
C:\Users\Admin\terragest\src\_quarantine\modules\terrains\components\TerrainsDashboardCard.tsx:1 "use client";
C:\Users\Admin\terragest\src\_quarantine\modules\terrains\components\TerrainsExportActions.tsx:1 "use client";
C:\Users\Admin\terragest\src\_quarantine\modules\terrains\components\TerrainsFilters.tsx:1 "use client";
C:\Users\Admin\terragest\src\_quarantine\modules\terrains\components\TerrainsForm.tsx:1 "use client";
C:\Users\Admin\terragest\src\_quarantine\modules\terrains\components\TerrainsForm.tsx:3 import { useForm } from "react-hook-form";
C:\Users\Admin\terragest\src\_quarantine\modules\terrains\components\TerrainsForm.tsx:12 import { useCreateTerrains } from "../hooks/useCreateTerrains";
C:\Users\Admin\terragest\src\_quarantine\modules\terrains\components\TerrainsForm.tsx:16 useCreateTerrains();
C:\Users\Admin\terragest\src\_quarantine\modules\terrains\components\TerrainsForm.tsx:18 const form = useForm<TerrainsSchemaType>({
C:\Users\Admin\terragest\src\_quarantine\modules\terrains\components\TerrainsPagination.tsx:1 "use client";
C:\Users\Admin\terragest\src\_quarantine\modules\terrains\components\TerrainsRealtimeWidget.tsx:1 "use client";
C:\Users\Admin\terragest\src\_quarantine\modules\terrains\components\TerrainsSorting.tsx:1 "use client";
C:\Users\Admin\terragest\src\_quarantine\modules\terrains\components\TerrainsTable.tsx:1 "use client";
C:\Users\Admin\terragest\src\_quarantine\modules\terrains\components\TerrainsTable.tsx:3 import { useTerrains } from "../hooks/useTerrains";
C:\Users\Admin\terragest\src\_quarantine\modules\terrains\components\TerrainsTable.tsx:9 } = useTerrains();
C:\Users\Admin\terragest\src\_quarantine\modules\terrains\hooks\useCreateTerrains.ts:1 "use client";
C:\Users\Admin\terragest\src\_quarantine\modules\terrains\hooks\useCreateTerrains.ts:3 import { useMutation } from "@tanstack/react-query";
C:\Users\Admin\terragest\src\_quarantine\modules\terrains\hooks\useCreateTerrains.ts:11 export function useCreateTerrains() {
C:\Users\Admin\terragest\src\_quarantine\modules\terrains\hooks\useCreateTerrains.ts:12 return useMutation({
C:\Users\Admin\terragest\src\_quarantine\modules\terrains\hooks\useDeleteTerrains.ts:1 "use client";
C:\Users\Admin\terragest\src\_quarantine\modules\terrains\hooks\useDeleteTerrains.ts:3 import { useMutation } from "@tanstack/react-query";
C:\Users\Admin\terragest\src\_quarantine\modules\terrains\hooks\useDeleteTerrains.ts:11 export function useDeleteTerrains() {
C:\Users\Admin\terragest\src\_quarantine\modules\terrains\hooks\useDeleteTerrains.ts:12 return useMutation({
C:\Users\Admin\terragest\src\_quarantine\modules\terrains\hooks\useTerrains.ts:1 "use client";
C:\Users\Admin\terragest\src\_quarantine\modules\terrains\hooks\useTerrains.ts:3 import { useQuery } from "@tanstack/react-query";
C:\Users\Admin\terragest\src\_quarantine\modules\terrains\hooks\useTerrains.ts:9 export function useTerrains() {
C:\Users\Admin\terragest\src\_quarantine\modules\terrains\hooks\useTerrains.ts:10 return useQuery({
C:\Users\Admin\terragest\src\_quarantine\modules\terrains\hooks\useUpdateTerrains.ts:1 "use client";
C:\Users\Admin\terragest\src\_quarantine\modules\terrains\hooks\useUpdateTerrains.ts:3 import { useMutation } from "@tanstack/react-query";
C:\Users\Admin\terragest\src\_quarantine\modules\terrains\hooks\useUpdateTerrains.ts:11 export function useUpdateTerrains() {
C:\Users\Admin\terragest\src\_quarantine\modules\terrains\hooks\useUpdateTerrains.ts:12 return useMutation({
C:\Users\Admin\terragest\src\_quarantine\modules\utilisateurs\components\UtilisateursBulkActions.tsx:1 "use client";
C:\Users\Admin\terragest\src\_quarantine\modules\utilisateurs\components\UtilisateursChartWidget.tsx:1 "use client";
C:\Users\Admin\terragest\src\_quarantine\modules\utilisateurs\components\UtilisateursDashboardCard.tsx:1 "use client";
C:\Users\Admin\terragest\src\_quarantine\modules\utilisateurs\components\UtilisateursExportActions.tsx:1 "use client";
C:\Users\Admin\terragest\src\_quarantine\modules\utilisateurs\components\UtilisateursFilters.tsx:1 "use client";
C:\Users\Admin\terragest\src\_quarantine\modules\utilisateurs\components\UtilisateursForm.tsx:1 "use client";
C:\Users\Admin\terragest\src\_quarantine\modules\utilisateurs\components\UtilisateursForm.tsx:3 import { useForm } from "react-hook-form";
C:\Users\Admin\terragest\src\_quarantine\modules\utilisateurs\components\UtilisateursForm.tsx:12 import { useCreateUtilisateurs } from "../hooks/useCreateUtilisateurs";
C:\Users\Admin\terragest\src\_quarantine\modules\utilisateurs\components\UtilisateursForm.tsx:16 useCreateUtilisateurs();
C:\Users\Admin\terragest\src\_quarantine\modules\utilisateurs\components\UtilisateursForm.tsx:18 const form = useForm<UtilisateursSchemaType>({
C:\Users\Admin\terragest\src\_quarantine\modules\utilisateurs\components\UtilisateursPagination.tsx:1 "use client";
C:\Users\Admin\terragest\src\_quarantine\modules\utilisateurs\components\UtilisateursRealtimeWidget.tsx:1 "use client";
C:\Users\Admin\terragest\src\_quarantine\modules\utilisateurs\components\UtilisateursSorting.tsx:1 "use client";
C:\Users\Admin\terragest\src\_quarantine\modules\utilisateurs\components\UtilisateursTable.tsx:1 "use client";
C:\Users\Admin\terragest\src\_quarantine\modules\utilisateurs\components\UtilisateursTable.tsx:3 import { useUtilisateurs } from "../hooks/useUtilisateurs";
C:\Users\Admin\terragest\src\_quarantine\modules\utilisateurs\components\UtilisateursTable.tsx:9 } = useUtilisateurs();
C:\Users\Admin\terragest\src\_quarantine\modules\utilisateurs\hooks\useCreateUtilisateurs.ts:1 "use client";
C:\Users\Admin\terragest\src\_quarantine\modules\utilisateurs\hooks\useCreateUtilisateurs.ts:3 import { useMutation } from "@tanstack/react-query";
C:\Users\Admin\terragest\src\_quarantine\modules\utilisateurs\hooks\useCreateUtilisateurs.ts:11 export function useCreateUtilisateurs() {
C:\Users\Admin\terragest\src\_quarantine\modules\utilisateurs\hooks\useCreateUtilisateurs.ts:12 return useMutation({
C:\Users\Admin\terragest\src\_quarantine\modules\utilisateurs\hooks\useDeleteUtilisateurs.ts:1 "use client";
C:\Users\Admin\terragest\src\_quarantine\modules\utilisateurs\hooks\useDeleteUtilisateurs.ts:3 import { useMutation } from "@tanstack/react-query";
C:\Users\Admin\terragest\src\_quarantine\modules\utilisateurs\hooks\useDeleteUtilisateurs.ts:11 export function useDeleteUtilisateurs() {
C:\Users\Admin\terragest\src\_quarantine\modules\utilisateurs\hooks\useDeleteUtilisateurs.ts:12 return useMutation({
C:\Users\Admin\terragest\src\_quarantine\modules\utilisateurs\hooks\useUpdateUtilisateurs.ts:1 "use client";
C:\Users\Admin\terragest\src\_quarantine\modules\utilisateurs\hooks\useUpdateUtilisateurs.ts:3 import { useMutation } from "@tanstack/react-query";
C:\Users\Admin\terragest\src\_quarantine\modules\utilisateurs\hooks\useUpdateUtilisateurs.ts:11 export function useUpdateUtilisateurs() {
C:\Users\Admin\terragest\src\_quarantine\modules\utilisateurs\hooks\useUpdateUtilisateurs.ts:12 return useMutation({
C:\Users\Admin\terragest\src\_quarantine\modules\utilisateurs\hooks\useUtilisateurs.ts:1 "use client";
C:\Users\Admin\terragest\src\_quarantine\modules\utilisateurs\hooks\useUtilisateurs.ts:3 import { useQuery } from "@tanstack/react-query";
C:\Users\Admin\terragest\src\_quarantine\modules\utilisateurs\hooks\useUtilisateurs.ts:9 export function useUtilisateurs() {
C:\Users\Admin\terragest\src\_quarantine\modules\utilisateurs\hooks\useUtilisateurs.ts:10 return useQuery({
C:\Users\Admin\terragest\src\_quarantine\navigation\Sidebar.tsx:1 "use client";
C:\Users\Admin\terragest\src\_quarantine\navigation\Topbar.tsx:1 "use client";
C:\Users\Admin\terragest\src\_quarantine\sidebar\AppSidebar.tsx:2 "use client";
C:\Users\Admin\terragest\src\_quarantine\sidebar\ERPSidebar.tsx:3 "use client";
C:\Users\Admin\terragest\src\_quarantine\topbar\AppTopbar.tsx:1 "use client";
C:\Users\Admin\terragest\src\_quarantine\topbar\ERPTopbar.tsx:3 "use client";
C:\Users\Admin\terragest\src\_quarantine\workflow\notifications\WorkflowNotificationCenter.tsx:1 "use client";
C:\Users\Admin\terragest\src\_quarantine\workflow\notifications\WorkflowNotificationCenter.tsx:4 useEffect,
C:\Users\Admin\terragest\src\_quarantine\workflow\notifications\WorkflowNotificationCenter.tsx:5 useState,
C:\Users\Admin\terragest\src\_quarantine\workflow\notifications\WorkflowNotificationCenter.tsx:13 useState<any[]>([]);
C:\Users\Admin\terragest\src\_quarantine\workflow\notifications\WorkflowNotificationCenter.tsx:15 useEffect(() => {
```

# QUARANTINE


## _quarantine

```txt
```

# TARGET ARCHITECTURE

```txt
UI
â†
â†
```

# FINAL ANALYSIS

- Runtime repository maturity :
- Repository duplication level :
- Firestore fragmentation level :
- Legacy persistence risk :
- Recommended consolidation priority :
- Runtime repository convergence readiness :
