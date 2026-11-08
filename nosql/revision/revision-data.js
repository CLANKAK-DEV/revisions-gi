// Centre de révision — fiches, pièges, checklist.
const REVISION={
sheets:[
 {title:"Fiche 1 · Fondements (S1)",html:`
  <h3>Les 3 V</h3><p><strong>Volume</strong> (quantité) · <strong>Vélocité</strong> (vitesse) · <strong>Variété</strong> (formats).</p>
  <h3>4 familles NoSQL</h3><p>Clé–valeur · Document · Colonnes larges · Graphe.</p>
  <h3>ACID</h3><ul><li><strong>A</strong>tomicité : tout ou rien.</li><li><strong>C</strong>ohérence : contraintes respectées.</li><li><strong>I</strong>solation : concurrence contrôlée.</li><li><strong>D</strong>urabilité : persiste après COMMIT.</li></ul>
  <h3>CAP</h3><p>Pendant une <strong>partition</strong> : choisir C ou A. CP refuse de répondre ; AP répond possiblement périmé.</p>
  <h3>BASE</h3><p>Basically Available · Soft state · Eventually consistent. Convergence sans délai garanti.</p>
  <h3>3 anomalies d'isolation</h3><p>Lecture <strong>sale</strong> (non validée) · <strong>non répétable</strong> (même ligne change) · <strong>fantôme</strong> (ensemble de lignes change).</p>
  <h3>Scale</h3><p>Scale <strong>up</strong> = machine plus puissante ; scale <strong>out</strong> = plus de machines (sharding = répartir, réplication = copier).</p>`},
 {title:"Fiche 2 · MongoDB (S2)",html:`
  <h3>Correspondances</h3><p>Base→base · Table→collection · Ligne→document · Colonne→champ.</p>
  <h3>Structure</h3><p>Base ⊃ Collection ⊃ Document (BSON) ; champs : valeur, objet imbriqué ou tableau. <code>_id</code> unique, généré si absent.</p>
  <h3>Commandes de base</h3><pre>use MaBase
db.createCollection('C')
db.C.insertOne({...})
db.C.insertMany([{...},{...}])</pre>
  <h3>Outils</h3><p><strong>mongosh</strong> = shell · <strong>Compass</strong> = GUI · <strong>mongoimport</strong> = import JSON/CSV.</p>
  <h3>Repères historiques</h3><p>2009 v1.0 open source · 2012 aggregation + index géo · 2018 v4.0 transactions ACID multi-documents.</p>`},
 {title:"Fiche 3 · Lecture find() (S3)",html:`
  <h3>Syntaxe</h3><pre>db.C.find(filtre, projection).sort({...}).limit(n)
db.C.findOne(filtre)   // un document ou null
db.C.countDocuments(filtre)</pre>
  <h3>Comparateurs</h3><p>$gt · $gte · $lt · $lte · $in (appartenance) · $regex (+$options:'i') · $exists · $type.</p>
  <h3>Tableaux</h3><p><strong>$all</strong> : toutes les valeurs présentes · <strong>$size</strong> : taille EXACTE · <strong>$elemMatch</strong> : conditions sur le MÊME élément · « au moins n » : <code>{'tab.'+(n-1):{$exists:true}}</code>.</p>
  <h3>Projection</h3><p>{champ:1,_id:0} — ne pas mélanger inclusion/exclusion (sauf _id).</p>
  <h3>Chemin pointé</h3><p><code>'info.ville'</code> traverse un sous-document, dans le filtre ET la projection.</p>`},
 {title:"Fiche 4 · Modélisation (S4)",html:`
  <h3>Embedding vs Referencing</h3><p><strong>Embedding</strong> = lecture optimisée : données petites, stables, lues avec le parent. <strong>Referencing</strong> = écriture optimisée : relation volumineuse, partagée, évolutive. Limite document : <strong>16 Mo</strong>.</p>
  <h3>Opérateurs de tableaux (agrégation)</h3><pre>$filter {input, as, cond}   // garder
$map    {input, as, in}     // transformer
$arrayElemAt:[tab, 0]       // un élément
$slice:[tab, 2]             // une tranche
$sum / $setUnion            // sommer / dédoublonner</pre>
  <h3>Convention $</h3><p><code>'$clients'</code> = champ du document · <code>'$$c.nom'</code> = champ de la variable c.</p>
  <h3>Référence</h3><pre>const c=db.Clients.findOne({nom:'Amal'});
db.Commandes.find({client_id:c._id})</pre>`},
 {title:"Fiche 5 · CRUD (S5)",html:`
  <h3>Les commandes</h3><p>Create : insertOne/insertMany · Read : find/findOne · Update : updateOne/updateMany/replaceOne · Delete : deleteOne/deleteMany.</p>
  <h3>Opérateurs de champ</h3><p><strong>$set</strong> fixer/créer · <strong>$inc</strong> incrémenter · <strong>$unset</strong> supprimer le champ · <strong>$rename</strong> renommer.</p>
  <h3>Opérateurs de tableau</h3><p><strong>$push</strong> ajouter (doublons ok) · <strong>$addToSet</strong> ajouter sans doublon · <strong>$pull</strong> retirer par critère.</p>
  <h3>Éléments de tableau</h3><p><code>$[]</code> tous les éléments · <code>$[a]</code> + <code>arrayFilters</code> : sélection d'éléments. Filtre extérieur = documents ; arrayFilters = éléments.</p>
  <h3>replaceOne</h3><p>Remplace TOUT le document : champs omis disparus, _id inchangé.</p>`}
],
traps:[
 "CAP décrit l'arbitrage <strong>pendant une partition réseau</strong>, pas une étiquette permanente d'une base.",
 "Lecture fantôme ≠ lecture non répétable : l'ensemble des lignes change, pas la valeur d'une ligne.",
 "$size:3 signifie <strong>exactement 3</strong>. Pour « au moins 3 » : {'resultats.2':{$exists:true}}.",
 "Deux conditions séparées sur un tableau d'objets peuvent être satisfaites par <strong>deux éléments différents</strong> → $elemMatch.",
 "$gt:15 exclut 15 ; $gte:15 l'inclut. Lisez « strictement » dans l'énoncé.",
 "_id est inclus par défaut dans les projections : _id:0 pour le retirer.",
 "Le champ métier id ne remplace pas _id.",
 "$push ajoute même un doublon ; $addToSet non ; $pull retire.",
 "replaceOne efface les champs non recopiés (avis, tags…).",
 "$regex est un opérateur de FILTRE ; $regexMatch est l'opérateur d'AGRÉGATION (TP 4).",
 "'$champ' = champ du document ; '$$alias.champ' = champ de la variable d'itération.",
 "Après $rename prix→prixMAD, toute commande utilisant encore prix ne trouve plus rien.",
 "Tri AVANT limit : sort({moyenne:-1}).limit(3) pour le top 3.",
 "MongoDB 4.0+ supporte les transactions ACID multi-documents : « NoSQL = jamais ACID » est faux.",
 "Le TP 5 se fait dans l'ordre : chaque commande change l'état des données."
],
checklist:[
 "Expliquer pourquoi le relationnel atteint ses limites (3 V, jointures, schéma rigide).",
 "Définir et illustrer ACID avec le virement.",
 "Nommer les 3 anomalies d'isolation et donner un scénario chacune.",
 "Énoncer CAP et raisonner sur un scénario de partition.",
 "Définir BASE et la cohérence éventuelle.",
 "Distinguer sharding / réplication / scale up / scale out.",
 "Citer les 4 familles NoSQL et un cas d'usage chacune.",
 "Donner la correspondance SQL ↔ MongoDB (table/ligne/colonne).",
 "Écrire insertOne / insertMany avec sous-document et tableau.",
 "Écrire find avec filtre, projection, sort, limit, countDocuments.",
 "Utiliser $gt/$gte/$lt/$lte/$in/$regex/$exists/$type sans hésiter.",
 "Expliquer le piège du « même élément » et utiliser $elemMatch.",
 "Utiliser $all, $size, et l'astuce « au moins n ».",
 "Choisir embedding ou referencing et justifier (lecture vs écriture, 16 Mo).",
 "Écrire $filter / $map / $arrayElemAt / $slice et composer les niveaux.",
 "Suivre une référence en deux lectures (Clients → Commandes).",
 "Écrire updateOne/updateMany avec $set/$inc/$unset/$rename.",
 "Utiliser $push/$addToSet/$pull à bon escient.",
 "Cibler des éléments de tableau avec $[] et $[a]+arrayFilters.",
 "Expliquer replaceOne et ses effets, et deleteOne/deleteMany."
]
};
