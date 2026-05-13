import type { ERPModule } from "../../ERPModule";

import { campagnesModule } from "./campagnes.module";
import { commandesModule } from "./commandes.module";
import { contratsModule } from "./contrats.module";
import { employesModule } from "./employes.module";
import { exploitationsModule } from "./exploitations.module";
import { facturesModule } from "./factures.module";
import { interventionsModule } from "./interventions.module";
import { livraisonsModule } from "./livraisons.module";
import { maintenanceModule } from "./maintenance.module";
import { materielsModule } from "./materiels.module";
import { mouvementsModule } from "./mouvements.module";
import { paiementsModule } from "./paiements.module";
import { produitsModule } from "./produits.module";
import { stocksModule } from "./stocks.module";
import { terrainsModule } from "./terrains.module";

export const generatedERPModules: ERPModule[] = [
  campagnesModule,
  commandesModule,
  contratsModule,
  employesModule,
  exploitationsModule,
  facturesModule,
  interventionsModule,
  livraisonsModule,
  maintenanceModule,
  materielsModule,
  mouvementsModule,
  paiementsModule,
  produitsModule,
  stocksModule,
  terrainsModule,
];