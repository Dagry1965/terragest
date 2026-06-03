# TEST-DATA-PREP-A3-C1-D-B — Essential supply flow fields

## commandesstockauto

> src\runtime\modules\generated\commandesstockauto\commandesstockauto.module.ts:45:        key: 
"numeroCommande",
  src\runtime\modules\generated\commandesstockauto\commandesstockauto.module.ts:46:        label: 
"Numero commande",
  src\runtime\modules\generated\commandesstockauto\commandesstockauto.module.ts:47:        type: 
"text",
  src\runtime\modules\generated\commandesstockauto\commandesstockauto.module.ts:48:        
searchable: true,
  src\runtime\modules\generated\commandesstockauto\commandesstockauto.module.ts:49:        list: { 
visible: true, order: 1 },
  src\runtime\modules\generated\commandesstockauto\commandesstockauto.module.ts:50:        grid: { 
cols: 4 },
> src\runtime\modules\generated\commandesstockauto\commandesstockauto.module.ts:53:        key: 
"fournisseurId",
  src\runtime\modules\generated\commandesstockauto\commandesstockauto.module.ts:54:        label: 
"Fournisseur",
  src\runtime\modules\generated\commandesstockauto\commandesstockauto.module.ts:55:        type: 
"relation",
  src\runtime\modules\generated\commandesstockauto\commandesstockauto.module.ts:56:        relation: 
{ module: "fournisseursauto" },
  src\runtime\modules\generated\commandesstockauto\commandesstockauto.module.ts:57:        required: 
true,
  src\runtime\modules\generated\commandesstockauto\commandesstockauto.module.ts:58:        
searchable: true,
> src\runtime\modules\generated\commandesstockauto\commandesstockauto.module.ts:63:        key: 
"dateCommande",
  src\runtime\modules\generated\commandesstockauto\commandesstockauto.module.ts:64:        label: 
"Date commande",
  src\runtime\modules\generated\commandesstockauto\commandesstockauto.module.ts:65:        type: 
"date",
  src\runtime\modules\generated\commandesstockauto\commandesstockauto.module.ts:66:        required: 
true,
  src\runtime\modules\generated\commandesstockauto\commandesstockauto.module.ts:67:        list: { 
visible: true, order: 3 },
  src\runtime\modules\generated\commandesstockauto\commandesstockauto.module.ts:68:        grid: { 
cols: 4 },
> src\runtime\modules\generated\commandesstockauto\commandesstockauto.module.ts:71:        key: 
"dateLivraisonPrevue",
  src\runtime\modules\generated\commandesstockauto\commandesstockauto.module.ts:72:        label: 
"Date livraison prevue",
  src\runtime\modules\generated\commandesstockauto\commandesstockauto.module.ts:73:        type: 
"date",
  src\runtime\modules\generated\commandesstockauto\commandesstockauto.module.ts:74:        list: { 
visible: false },
  src\runtime\modules\generated\commandesstockauto\commandesstockauto.module.ts:75:        grid: { 
cols: 4 },
  src\runtime\modules\generated\commandesstockauto\commandesstockauto.module.ts:76:      },
> src\runtime\modules\generated\commandesstockauto\commandesstockauto.module.ts:78:        key: 
"montantHT",
  src\runtime\modules\generated\commandesstockauto\commandesstockauto.module.ts:79:        label: 
"Montant HT",
  src\runtime\modules\generated\commandesstockauto\commandesstockauto.module.ts:80:        type: 
"number",
  src\runtime\modules\generated\commandesstockauto\commandesstockauto.module.ts:81:        
defaultValue: 0,
  src\runtime\modules\generated\commandesstockauto\commandesstockauto.module.ts:82:        list: { 
visible: false },
  src\runtime\modules\generated\commandesstockauto\commandesstockauto.module.ts:83:        grid: { 
cols: 4 },
> src\runtime\modules\generated\commandesstockauto\commandesstockauto.module.ts:86:        key: 
"montantTTC",
  src\runtime\modules\generated\commandesstockauto\commandesstockauto.module.ts:87:        label: 
"Montant TTC",
  src\runtime\modules\generated\commandesstockauto\commandesstockauto.module.ts:88:        type: 
"number",
  src\runtime\modules\generated\commandesstockauto\commandesstockauto.module.ts:89:        
defaultValue: 0,
  src\runtime\modules\generated\commandesstockauto\commandesstockauto.module.ts:90:        list: { 
visible: true, order: 4 },
  src\runtime\modules\generated\commandesstockauto\commandesstockauto.module.ts:91:        grid: { 
cols: 4 },
> src\runtime\modules\generated\commandesstockauto\commandesstockauto.module.ts:94:        key: 
"statut",
  src\runtime\modules\generated\commandesstockauto\commandesstockauto.module.ts:95:        label: 
"Statut",
  src\runtime\modules\generated\commandesstockauto\commandesstockauto.module.ts:96:        type: 
"select",
> src\runtime\modules\generated\commandesstockauto\commandesstockauto.module.ts:97:        
defaultValue: "brouillon",
  src\runtime\modules\generated\commandesstockauto\commandesstockauto.module.ts:98:        options: [
> src\runtime\modules\generated\commandesstockauto\commandesstockauto.module.ts:99:          { 
label: "Brouillon", value: "brouillon" },
> src\runtime\modules\generated\commandesstockauto\commandesstockauto.module.ts:100:          { 
label: "Envoyee", value: "envoyee" },
> src\runtime\modules\generated\commandesstockauto\commandesstockauto.module.ts:101:          { 
label: "Partiellement recue", value: "partiellement_recue" },
> src\runtime\modules\generated\commandesstockauto\commandesstockauto.module.ts:102:          { 
label: "Recue", value: "recue" },
> src\runtime\modules\generated\commandesstockauto\commandesstockauto.module.ts:103:          { 
label: "Annulee", value: "annulee" },
  src\runtime\modules\generated\commandesstockauto\commandesstockauto.module.ts:104:        ],
  src\runtime\modules\generated\commandesstockauto\commandesstockauto.module.ts:105:        list: { 
visible: true, order: 5 },
  src\runtime\modules\generated\commandesstockauto\commandesstockauto.module.ts:106:        grid: { 
cols: 4 },
  src\runtime\modules\generated\commandesstockauto\commandesstockauto.module.ts:107:      },
  src\runtime\modules\generated\commandesstockauto\commandesstockauto.module.ts:108:{
> src\runtime\modules\generated\commandesstockauto\commandesstockauto.module.ts:109:        key: 
"notes",
  src\runtime\modules\generated\commandesstockauto\commandesstockauto.module.ts:110:        label: 
"Notes",
  src\runtime\modules\generated\commandesstockauto\commandesstockauto.module.ts:111:        type: 
"textarea",
  src\runtime\modules\generated\commandesstockauto\commandesstockauto.module.ts:112:        list: { 
visible: false },
  src\runtime\modules\generated\commandesstockauto\commandesstockauto.module.ts:113:        grid: { 
cols: 12 },
  src\runtime\modules\generated\commandesstockauto\commandesstockauto.module.ts:114:      }



## lignescommandestockauto

> src\runtime\modules\generated\lignescommandestockauto\lignescommandestockauto.module.ts:26:        
key: "commandeId",
  src\runtime\modules\generated\lignescommandestockauto\lignescommandestockauto.module.ts:27:        
label: "Commande",
  src\runtime\modules\generated\lignescommandestockauto\lignescommandestockauto.module.ts:28:        
type: "relation",
  src\runtime\modules\generated\lignescommandestockauto\lignescommandestockauto.module.ts:29:        
relation: { module: "commandesstockauto" },
  src\runtime\modules\generated\lignescommandestockauto\lignescommandestockauto.module.ts:30:        
required: true,
  src\runtime\modules\generated\lignescommandestockauto\lignescommandestockauto.module.ts:31:        
searchable: true,
> src\runtime\modules\generated\lignescommandestockauto\lignescommandestockauto.module.ts:36:        
key: "produitId",
  src\runtime\modules\generated\lignescommandestockauto\lignescommandestockauto.module.ts:37:        
label: "Produit",
  src\runtime\modules\generated\lignescommandestockauto\lignescommandestockauto.module.ts:38:        
type: "relation",
  src\runtime\modules\generated\lignescommandestockauto\lignescommandestockauto.module.ts:39:        
relation: {
  src\runtime\modules\generated\lignescommandestockauto\lignescommandestockauto.module.ts:40:        
  module: "produitsauto",
  src\runtime\modules\generated\lignescommandestockauto\lignescommandestockauto.module.ts:41:        
  // Q21D3B3_PRODUCT_AUTOFILL
> src\runtime\modules\generated\lignescommandestockauto\lignescommandestockauto.module.ts:57:        
key: "stockId",
  src\runtime\modules\generated\lignescommandestockauto\lignescommandestockauto.module.ts:58:        
label: "Stock destination",
  src\runtime\modules\generated\lignescommandestockauto\lignescommandestockauto.module.ts:59:        
type: "relation",
  src\runtime\modules\generated\lignescommandestockauto\lignescommandestockauto.module.ts:60:        
relation: {
  src\runtime\modules\generated\lignescommandestockauto\lignescommandestockauto.module.ts:61:        
  module: "stocksauto",
  src\runtime\modules\generated\lignescommandestockauto\lignescommandestockauto.module.ts:62:        
  filterBy: {
> src\runtime\modules\generated\lignescommandestockauto\lignescommandestockauto.module.ts:73:        
key: "designation",
  src\runtime\modules\generated\lignescommandestockauto\lignescommandestockauto.module.ts:74:        
label: "Designation",
  src\runtime\modules\generated\lignescommandestockauto\lignescommandestockauto.module.ts:75:        
type: "text",
  src\runtime\modules\generated\lignescommandestockauto\lignescommandestockauto.module.ts:76:        
searchable: true,
  src\runtime\modules\generated\lignescommandestockauto\lignescommandestockauto.module.ts:77:        
grid: { cols: 6 },
  src\runtime\modules\generated\lignescommandestockauto\lignescommandestockauto.module.ts:78:      },
> src\runtime\modules\generated\lignescommandestockauto\lignescommandestockauto.module.ts:80:        
key: "quantiteCommandee",
  src\runtime\modules\generated\lignescommandestockauto\lignescommandestockauto.module.ts:81:        
label: "Quantite commandee",
  src\runtime\modules\generated\lignescommandestockauto\lignescommandestockauto.module.ts:82:        
type: "number",
  src\runtime\modules\generated\lignescommandestockauto\lignescommandestockauto.module.ts:83:        
required: true,
> src\runtime\modules\generated\lignescommandestockauto\lignescommandestockauto.module.ts:84:        
defaultValue: 1,
  src\runtime\modules\generated\lignescommandestockauto\lignescommandestockauto.module.ts:85:        
list: { order: 4 },
  src\runtime\modules\generated\lignescommandestockauto\lignescommandestockauto.module.ts:86:        
grid: { cols: 3 },
  src\runtime\modules\generated\lignescommandestockauto\lignescommandestockauto.module.ts:87:      },
  src\runtime\modules\generated\lignescommandestockauto\lignescommandestockauto.module.ts:88:      {
> src\runtime\modules\generated\lignescommandestockauto\lignescommandestockauto.module.ts:89:        
key: "quantiteRecue",
  src\runtime\modules\generated\lignescommandestockauto\lignescommandestockauto.module.ts:90:        
label: "Quantite recue",
  src\runtime\modules\generated\lignescommandestockauto\lignescommandestockauto.module.ts:91:        
type: "number",
> src\runtime\modules\generated\lignescommandestockauto\lignescommandestockauto.module.ts:92:        
defaultValue: 0,
  src\runtime\modules\generated\lignescommandestockauto\lignescommandestockauto.module.ts:93:        
list: { visible: false },
  src\runtime\modules\generated\lignescommandestockauto\lignescommandestockauto.module.ts:94:        
grid: { cols: 3 },
  src\runtime\modules\generated\lignescommandestockauto\lignescommandestockauto.module.ts:95:      },
  src\runtime\modules\generated\lignescommandestockauto\lignescommandestockauto.module.ts:96:      {
> src\runtime\modules\generated\lignescommandestockauto\lignescommandestockauto.module.ts:97:        
key: "prixUnitaireHT",
  src\runtime\modules\generated\lignescommandestockauto\lignescommandestockauto.module.ts:98:        
label: "Prix unitaire HT",
  src\runtime\modules\generated\lignescommandestockauto\lignescommandestockauto.module.ts:99:        
type: "number",
> src\runtime\modules\generated\lignescommandestockauto\lignescommandestockauto.module.ts:100:       
 defaultValue: 0,
  src\runtime\modules\generated\lignescommandestockauto\lignescommandestockauto.module.ts:101:       
 grid: { cols: 4 },
  src\runtime\modules\generated\lignescommandestockauto\lignescommandestockauto.module.ts:102:      
},
  src\runtime\modules\generated\lignescommandestockauto\lignescommandestockauto.module.ts:103:      {
> src\runtime\modules\generated\lignescommandestockauto\lignescommandestockauto.module.ts:104:       
 key: "montantHT",
  src\runtime\modules\generated\lignescommandestockauto\lignescommandestockauto.module.ts:105:       
 label: "Montant HT",
  src\runtime\modules\generated\lignescommandestockauto\lignescommandestockauto.module.ts:106:       
 type: "number",
> src\runtime\modules\generated\lignescommandestockauto\lignescommandestockauto.module.ts:107:       
 defaultValue: 0,
  src\runtime\modules\generated\lignescommandestockauto\lignescommandestockauto.module.ts:108:       
 list: { order: 6 },
  src\runtime\modules\generated\lignescommandestockauto\lignescommandestockauto.module.ts:109:       
 grid: { cols: 4 },
  src\runtime\modules\generated\lignescommandestockauto\lignescommandestockauto.module.ts:110:      
},
  src\runtime\modules\generated\lignescommandestockauto\lignescommandestockauto.module.ts:111:      {
> src\runtime\modules\generated\lignescommandestockauto\lignescommandestockauto.module.ts:112:       
 key: "montantTTC",
  src\runtime\modules\generated\lignescommandestockauto\lignescommandestockauto.module.ts:113:       
 label: "Montant TTC",
  src\runtime\modules\generated\lignescommandestockauto\lignescommandestockauto.module.ts:114:       
 type: "number",
> src\runtime\modules\generated\lignescommandestockauto\lignescommandestockauto.module.ts:115:       
 defaultValue: 0,
  src\runtime\modules\generated\lignescommandestockauto\lignescommandestockauto.module.ts:116:       
 list: { order: 7 },
  src\runtime\modules\generated\lignescommandestockauto\lignescommandestockauto.module.ts:117:       
 grid: { cols: 4 },
  src\runtime\modules\generated\lignescommandestockauto\lignescommandestockauto.module.ts:118:      
},
  src\runtime\modules\generated\lignescommandestockauto\lignescommandestockauto.module.ts:119:      {
> src\runtime\modules\generated\lignescommandestockauto\lignescommandestockauto.module.ts:120:       
 key: "statut",
  src\runtime\modules\generated\lignescommandestockauto\lignescommandestockauto.module.ts:121:       
 label: "Statut",
  src\runtime\modules\generated\lignescommandestockauto\lignescommandestockauto.module.ts:122:       
 type: "select",
> src\runtime\modules\generated\lignescommandestockauto\lignescommandestockauto.module.ts:123:       
 defaultValue: "brouillon",
  src\runtime\modules\generated\lignescommandestockauto\lignescommandestockauto.module.ts:124:       
 options: [
> src\runtime\modules\generated\lignescommandestockauto\lignescommandestockauto.module.ts:125:   { 
label: "Brouillon", value: "brouillon" },
> src\runtime\modules\generated\lignescommandestockauto\lignescommandestockauto.module.ts:126:   { 
label: "Validee", value: "validee" },
  src\runtime\modules\generated\lignescommandestockauto\lignescommandestockauto.module.ts:127: ],
  src\runtime\modules\generated\lignescommandestockauto\lignescommandestockauto.module.ts:128:       
 list: { order: 7 },
  src\runtime\modules\generated\lignescommandestockauto\lignescommandestockauto.module.ts:129:       
 grid: { cols: 4 },
  src\runtime\modules\generated\lignescommandestockauto\lignescommandestockauto.module.ts:130:      
},
  src\runtime\modules\generated\lignescommandestockauto\lignescommandestockauto.module.ts:131:    ],
> src\runtime\modules\generated\lignescommandestockauto\lignescommandestockauto.module.ts:182:       
 defaultValue: 0,
  src\runtime\modules\generated\lignescommandestockauto\lignescommandestockauto.module.ts:183:      
},
  src\runtime\modules\generated\lignescommandestockauto\lignescommandestockauto.module.ts:184:      {
  src\runtime\modules\generated\lignescommandestockauto\lignescommandestockauto.module.ts:185:       
 target: "montantTTC",
  src\runtime\modules\generated\lignescommandestockauto\lignescommandestockauto.module.ts:186:       
 formula: "add",
  src\runtime\modules\generated\lignescommandestockauto\lignescommandestockauto.module.ts:187:       
 sources: ["montantHT"],
> src\runtime\modules\generated\lignescommandestockauto\lignescommandestockauto.module.ts:189:       
 defaultValue: 0,
  src\runtime\modules\generated\lignescommandestockauto\lignescommandestockauto.module.ts:190:      
},
  src\runtime\modules\generated\lignescommandestockauto\lignescommandestockauto.module.ts:191:    ],
  src\runtime\modules\generated\lignescommandestockauto\lignescommandestockauto.module.ts:192:
  src\runtime\modules\generated\lignescommandestockauto\lignescommandestockauto.module.ts:193:    
requiresParentContext: true,
  src\runtime\modules\generated\lignescommandestockauto\lignescommandestockauto.module.ts:194:    
allowedParents: [
> src\runtime\modules\generated\lignescommandestockauto\lignescommandestockauto.module.ts:197:       
 foreignKey: "commandeId",
  src\runtime\modules\generated\lignescommandestockauto\lignescommandestockauto.module.ts:198:      
},
  src\runtime\modules\generated\lignescommandestockauto\lignescommandestockauto.module.ts:199:    ],
  src\runtime\modules\generated\lignescommandestockauto\lignescommandestockauto.module.ts:200:    
lockedFields: ["commandeId"],
  src\runtime\modules\generated\lignescommandestockauto\lignescommandestockauto.module.ts:201:    
labelFields: ["produitId", "quantiteCommandee", "statut"],
  src\runtime\modules\generated\lignescommandestockauto\lignescommandestockauto.module.ts:202:



## receptionsstockauto

> src\runtime\modules\generated\receptionsstockauto\receptionsstockauto.module.ts:39:        key: 
"commandeId",
  src\runtime\modules\generated\receptionsstockauto\receptionsstockauto.module.ts:40:        label: 
"Commande",
  src\runtime\modules\generated\receptionsstockauto\receptionsstockauto.module.ts:41:        type: 
"relation",
  src\runtime\modules\generated\receptionsstockauto\receptionsstockauto.module.ts:42:        
relation: { module: "commandesstockauto" },
  src\runtime\modules\generated\receptionsstockauto\receptionsstockauto.module.ts:43:        
required: true,
  src\runtime\modules\generated\receptionsstockauto\receptionsstockauto.module.ts:44:        
searchable: true,
> src\runtime\modules\generated\receptionsstockauto\receptionsstockauto.module.ts:49:        key: 
"ligneCommandeId",
  src\runtime\modules\generated\receptionsstockauto\receptionsstockauto.module.ts:50:        label: 
"Ligne commande",
  src\runtime\modules\generated\receptionsstockauto\receptionsstockauto.module.ts:51:        type: 
"relation",
  src\runtime\modules\generated\receptionsstockauto\receptionsstockauto.module.ts:52:        
relation: {
  src\runtime\modules\generated\receptionsstockauto\receptionsstockauto.module.ts:53:          
module: "lignescommandestockauto",
  src\runtime\modules\generated\receptionsstockauto\receptionsstockauto.module.ts:54:          
filterBy: {
> src\runtime\modules\generated\receptionsstockauto\receptionsstockauto.module.ts:83:        key: 
"produitId",
  src\runtime\modules\generated\receptionsstockauto\receptionsstockauto.module.ts:84:        label: 
"Produit",
  src\runtime\modules\generated\receptionsstockauto\receptionsstockauto.module.ts:85:        type: 
"relation",
  src\runtime\modules\generated\receptionsstockauto\receptionsstockauto.module.ts:86:        
relation: { module: "produitsauto" },
  src\runtime\modules\generated\receptionsstockauto\receptionsstockauto.module.ts:87:        
required: true,
  src\runtime\modules\generated\receptionsstockauto\receptionsstockauto.module.ts:88:        
searchable: true,
> src\runtime\modules\generated\receptionsstockauto\receptionsstockauto.module.ts:93:        key: 
"stockId",
  src\runtime\modules\generated\receptionsstockauto\receptionsstockauto.module.ts:94:        label: 
"Stock destination",
  src\runtime\modules\generated\receptionsstockauto\receptionsstockauto.module.ts:95:        type: 
"relation",
  src\runtime\modules\generated\receptionsstockauto\receptionsstockauto.module.ts:96:        
relation: {
  src\runtime\modules\generated\receptionsstockauto\receptionsstockauto.module.ts:97:          
module: "stocksauto",
  src\runtime\modules\generated\receptionsstockauto\receptionsstockauto.module.ts:98:          
filterBy: {
> src\runtime\modules\generated\receptionsstockauto\receptionsstockauto.module.ts:110:        key: 
"quantiteRecue",
  src\runtime\modules\generated\receptionsstockauto\receptionsstockauto.module.ts:111:        label: 
"Quantite recue",
  src\runtime\modules\generated\receptionsstockauto\receptionsstockauto.module.ts:112:        type: 
"number",
  src\runtime\modules\generated\receptionsstockauto\receptionsstockauto.module.ts:113:        
required: true,
> src\runtime\modules\generated\receptionsstockauto\receptionsstockauto.module.ts:114:        
defaultValue: 1,
  src\runtime\modules\generated\receptionsstockauto\receptionsstockauto.module.ts:115:        list: 
{ visible: true, order: 5 },
  src\runtime\modules\generated\receptionsstockauto\receptionsstockauto.module.ts:116:        grid: 
{ cols: 4 },
  src\runtime\modules\generated\receptionsstockauto\receptionsstockauto.module.ts:117:      },
  src\runtime\modules\generated\receptionsstockauto\receptionsstockauto.module.ts:118:{
> src\runtime\modules\generated\receptionsstockauto\receptionsstockauto.module.ts:119:        key: 
"dateReception",
  src\runtime\modules\generated\receptionsstockauto\receptionsstockauto.module.ts:120:        label: 
"Date reception",
  src\runtime\modules\generated\receptionsstockauto\receptionsstockauto.module.ts:121:        type: 
"date",
  src\runtime\modules\generated\receptionsstockauto\receptionsstockauto.module.ts:122:        
required: true,
  src\runtime\modules\generated\receptionsstockauto\receptionsstockauto.module.ts:123:        list: 
{ visible: true, order: 6 },
  src\runtime\modules\generated\receptionsstockauto\receptionsstockauto.module.ts:124:        grid: 
{ cols: 4 },
> src\runtime\modules\generated\receptionsstockauto\receptionsstockauto.module.ts:127:        key: 
"mouvementStockId",
  src\runtime\modules\generated\receptionsstockauto\receptionsstockauto.module.ts:128:        label: 
"Mouvement stock",
  src\runtime\modules\generated\receptionsstockauto\receptionsstockauto.module.ts:129:        type: 
"relation",
  src\runtime\modules\generated\receptionsstockauto\receptionsstockauto.module.ts:130:        
relation: { module: "mouvementsstockauto" },
  src\runtime\modules\generated\receptionsstockauto\receptionsstockauto.module.ts:131:        grid: 
{ cols: 4 },
  src\runtime\modules\generated\receptionsstockauto\receptionsstockauto.module.ts:132:        list: 
{ visible: false },
> src\runtime\modules\generated\receptionsstockauto\receptionsstockauto.module.ts:149:        key: 
"statut",
  src\runtime\modules\generated\receptionsstockauto\receptionsstockauto.module.ts:150:        label: 
"Statut",
  src\runtime\modules\generated\receptionsstockauto\receptionsstockauto.module.ts:151:        type: 
"select",
> src\runtime\modules\generated\receptionsstockauto\receptionsstockauto.module.ts:152:        
defaultValue: "brouillon",
  src\runtime\modules\generated\receptionsstockauto\receptionsstockauto.module.ts:153:        
options: [
> src\runtime\modules\generated\receptionsstockauto\receptionsstockauto.module.ts:154:          { 
label: "Brouillon", value: "brouillon" },
> src\runtime\modules\generated\receptionsstockauto\receptionsstockauto.module.ts:155:          { 
label: "Validee", value: "validee" },
  src\runtime\modules\generated\receptionsstockauto\receptionsstockauto.module.ts:156:        ],
  src\runtime\modules\generated\receptionsstockauto\receptionsstockauto.module.ts:157:        list: 
{ visible: true, order: 7 },
  src\runtime\modules\generated\receptionsstockauto\receptionsstockauto.module.ts:158:        grid: 
{ cols: 4 },
  src\runtime\modules\generated\receptionsstockauto\receptionsstockauto.module.ts:159:        // 
Q21D_RECEPTION_STATUS_RULE
  src\runtime\modules\generated\receptionsstockauto\receptionsstockauto.module.ts:160:        // 
Statuts visibles volontairement limites :
> src\runtime\modules\generated\receptionsstockauto\receptionsstockauto.module.ts:166:        key: 
"notes",
  src\runtime\modules\generated\receptionsstockauto\receptionsstockauto.module.ts:167:        label: 
"Notes",
  src\runtime\modules\generated\receptionsstockauto\receptionsstockauto.module.ts:168:        type: 
"textarea",
  src\runtime\modules\generated\receptionsstockauto\receptionsstockauto.module.ts:169:        list: 
{ visible: false },
  src\runtime\modules\generated\receptionsstockauto\receptionsstockauto.module.ts:170:        grid: 
{ cols: 12 },
  src\runtime\modules\generated\receptionsstockauto\receptionsstockauto.module.ts:171:      }
> src\runtime\modules\generated\receptionsstockauto\receptionsstockauto.module.ts:218:        
foreignKey: "commandeId",
  src\runtime\modules\generated\receptionsstockauto\receptionsstockauto.module.ts:219:      },
  src\runtime\modules\generated\receptionsstockauto\receptionsstockauto.module.ts:220:    ],
  src\runtime\modules\generated\receptionsstockauto\receptionsstockauto.module.ts:221:    
lockedFields: ["commandeId"],
  src\runtime\modules\generated\receptionsstockauto\receptionsstockauto.module.ts:222:    
labelFields: ["ligneCommandeId", "produitId", "stockId", "quantiteRecue", "dateReception", "statut"],
  src\runtime\modules\generated\receptionsstockauto\receptionsstockauto.module.ts:223:



## mouvementsstockauto

> src\runtime\modules\generated\mouvementsstockauto\mouvementsstockauto.module.ts:28:        key: 
"typeMouvement",
  src\runtime\modules\generated\mouvementsstockauto\mouvementsstockauto.module.ts:29:        label: 
"Type mouvement",
  src\runtime\modules\generated\mouvementsstockauto\mouvementsstockauto.module.ts:30:        type: 
"select",
  src\runtime\modules\generated\mouvementsstockauto\mouvementsstockauto.module.ts:31:        
required: true,
> src\runtime\modules\generated\mouvementsstockauto\mouvementsstockauto.module.ts:32:        
defaultValue: "sortie",
  src\runtime\modules\generated\mouvementsstockauto\mouvementsstockauto.module.ts:33:        
options: [
> src\runtime\modules\generated\mouvementsstockauto\mouvementsstockauto.module.ts:34:          { 
label: "Entrée", value: "entree" },
> src\runtime\modules\generated\mouvementsstockauto\mouvementsstockauto.module.ts:35:          { 
label: "Sortie", value: "sortie" },
> src\runtime\modules\generated\mouvementsstockauto\mouvementsstockauto.module.ts:36:          { 
label: "Correction", value: "correction" },
> src\runtime\modules\generated\mouvementsstockauto\mouvementsstockauto.module.ts:37:          { 
label: "Annulation", value: "annulation" },
  src\runtime\modules\generated\mouvementsstockauto\mouvementsstockauto.module.ts:38:        ],
  src\runtime\modules\generated\mouvementsstockauto\mouvementsstockauto.module.ts:39:        list: { 
order: 1 },
  src\runtime\modules\generated\mouvementsstockauto\mouvementsstockauto.module.ts:40:        grid: { 
cols: 4 },
  src\runtime\modules\generated\mouvementsstockauto\mouvementsstockauto.module.ts:41:      },
  src\runtime\modules\generated\mouvementsstockauto\mouvementsstockauto.module.ts:42:      {
> src\runtime\modules\generated\mouvementsstockauto\mouvementsstockauto.module.ts:43:        key: 
"stockId",
  src\runtime\modules\generated\mouvementsstockauto\mouvementsstockauto.module.ts:44:        label: 
"Stock",
  src\runtime\modules\generated\mouvementsstockauto\mouvementsstockauto.module.ts:45:        type: 
"relation",
  src\runtime\modules\generated\mouvementsstockauto\mouvementsstockauto.module.ts:46:        
relation: { module: "stocksauto" },
  src\runtime\modules\generated\mouvementsstockauto\mouvementsstockauto.module.ts:47:        
required: true,
  src\runtime\modules\generated\mouvementsstockauto\mouvementsstockauto.module.ts:48:        
searchable: true,
> src\runtime\modules\generated\mouvementsstockauto\mouvementsstockauto.module.ts:53:        key: 
"produitId",
  src\runtime\modules\generated\mouvementsstockauto\mouvementsstockauto.module.ts:54:        label: 
"Produit",
  src\runtime\modules\generated\mouvementsstockauto\mouvementsstockauto.module.ts:55:        type: 
"relation",
  src\runtime\modules\generated\mouvementsstockauto\mouvementsstockauto.module.ts:56:        
relation: { module: "produitsauto" },
  src\runtime\modules\generated\mouvementsstockauto\mouvementsstockauto.module.ts:57:        
required: true,
  src\runtime\modules\generated\mouvementsstockauto\mouvementsstockauto.module.ts:58:        
searchable: true,
> src\runtime\modules\generated\mouvementsstockauto\mouvementsstockauto.module.ts:63:        key: 
"quantite",
  src\runtime\modules\generated\mouvementsstockauto\mouvementsstockauto.module.ts:64:        label: 
"Quantité",
  src\runtime\modules\generated\mouvementsstockauto\mouvementsstockauto.module.ts:65:        type: 
"number",
  src\runtime\modules\generated\mouvementsstockauto\mouvementsstockauto.module.ts:66:        
required: true,
  src\runtime\modules\generated\mouvementsstockauto\mouvementsstockauto.module.ts:67:        list: { 
order: 4 },
  src\runtime\modules\generated\mouvementsstockauto\mouvementsstockauto.module.ts:68:        grid: { 
cols: 4 },
> src\runtime\modules\generated\mouvementsstockauto\mouvementsstockauto.module.ts:71:        key: 
"quantiteAvant",
  src\runtime\modules\generated\mouvementsstockauto\mouvementsstockauto.module.ts:72:        label: 
"Quantité avant",
  src\runtime\modules\generated\mouvementsstockauto\mouvementsstockauto.module.ts:73:        type: 
"number",
  src\runtime\modules\generated\mouvementsstockauto\mouvementsstockauto.module.ts:74:        grid: { 
cols: 4 },
  src\runtime\modules\generated\mouvementsstockauto\mouvementsstockauto.module.ts:75:      },
  src\runtime\modules\generated\mouvementsstockauto\mouvementsstockauto.module.ts:76:      {
> src\runtime\modules\generated\mouvementsstockauto\mouvementsstockauto.module.ts:77:        key: 
"quantiteApres",
  src\runtime\modules\generated\mouvementsstockauto\mouvementsstockauto.module.ts:78:        label: 
"Quantité après",
  src\runtime\modules\generated\mouvementsstockauto\mouvementsstockauto.module.ts:79:        type: 
"number",
  src\runtime\modules\generated\mouvementsstockauto\mouvementsstockauto.module.ts:80:        grid: { 
cols: 4 },
  src\runtime\modules\generated\mouvementsstockauto\mouvementsstockauto.module.ts:81:      },
  src\runtime\modules\generated\mouvementsstockauto\mouvementsstockauto.module.ts:82:      {
> src\runtime\modules\generated\mouvementsstockauto\mouvementsstockauto.module.ts:83:        key: 
"sourceModule",
  src\runtime\modules\generated\mouvementsstockauto\mouvementsstockauto.module.ts:84:        label: 
"Module source",
  src\runtime\modules\generated\mouvementsstockauto\mouvementsstockauto.module.ts:85:        type: 
"text",
  src\runtime\modules\generated\mouvementsstockauto\mouvementsstockauto.module.ts:86:        grid: { 
cols: 4 },
  src\runtime\modules\generated\mouvementsstockauto\mouvementsstockauto.module.ts:87:      },
  src\runtime\modules\generated\mouvementsstockauto\mouvementsstockauto.module.ts:88:      {
> src\runtime\modules\generated\mouvementsstockauto\mouvementsstockauto.module.ts:89:        key: 
"sourceId",
  src\runtime\modules\generated\mouvementsstockauto\mouvementsstockauto.module.ts:90:        label: 
"Source",
  src\runtime\modules\generated\mouvementsstockauto\mouvementsstockauto.module.ts:91:        type: 
"text",
  src\runtime\modules\generated\mouvementsstockauto\mouvementsstockauto.module.ts:92:        grid: { 
cols: 4 },
  src\runtime\modules\generated\mouvementsstockauto\mouvementsstockauto.module.ts:93:      },
  src\runtime\modules\generated\mouvementsstockauto\mouvementsstockauto.module.ts:94:      {
> src\runtime\modules\generated\mouvementsstockauto\mouvementsstockauto.module.ts:117:        key: 
"statut",
  src\runtime\modules\generated\mouvementsstockauto\mouvementsstockauto.module.ts:118:        label: 
"Statut",
  src\runtime\modules\generated\mouvementsstockauto\mouvementsstockauto.module.ts:119:        type: 
"select",
> src\runtime\modules\generated\mouvementsstockauto\mouvementsstockauto.module.ts:120:        
defaultValue: "valide",
  src\runtime\modules\generated\mouvementsstockauto\mouvementsstockauto.module.ts:121:        
options: [
> src\runtime\modules\generated\mouvementsstockauto\mouvementsstockauto.module.ts:122:          { 
label: "Brouillon", value: "brouillon" },
> src\runtime\modules\generated\mouvementsstockauto\mouvementsstockauto.module.ts:123:          { 
label: "Validé", value: "valide" },
> src\runtime\modules\generated\mouvementsstockauto\mouvementsstockauto.module.ts:124:          { 
label: "Annulé", value: "annule" },
  src\runtime\modules\generated\mouvementsstockauto\mouvementsstockauto.module.ts:125:        ],
  src\runtime\modules\generated\mouvementsstockauto\mouvementsstockauto.module.ts:126:        list: 
{ order: 5 },
  src\runtime\modules\generated\mouvementsstockauto\mouvementsstockauto.module.ts:127:        grid: 
{ cols: 4 },
  src\runtime\modules\generated\mouvementsstockauto\mouvementsstockauto.module.ts:128:      },
  src\runtime\modules\generated\mouvementsstockauto\mouvementsstockauto.module.ts:129:      {
> src\runtime\modules\generated\mouvementsstockauto\mouvementsstockauto.module.ts:130:        key: 
"dateMouvement",
  src\runtime\modules\generated\mouvementsstockauto\mouvementsstockauto.module.ts:131:        label: 
"Date mouvement",
  src\runtime\modules\generated\mouvementsstockauto\mouvementsstockauto.module.ts:132:        type: 
"date",
  src\runtime\modules\generated\mouvementsstockauto\mouvementsstockauto.module.ts:133:        list: 
{ order: 6 },
  src\runtime\modules\generated\mouvementsstockauto\mouvementsstockauto.module.ts:134:        grid: 
{ cols: 4 },
  src\runtime\modules\generated\mouvementsstockauto\mouvementsstockauto.module.ts:135:      },


