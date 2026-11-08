const WEEKS=[
 {n:1,title:'Fondements NoSQL',tag:'ACID · CAP · BASE',pdf:'semaine-1/Chapitre-1-S1.pdf',tp:'semaine-1/TP-1.pdf'},
 {n:2,title:'MongoDB & documents',tag:'BSON · collections · insertion',pdf:'semaine-2/Chapitre-2-S2.pdf',tp:'semaine-2/TP-2.pdf'},
 {n:3,title:'Lire les données',tag:'find · filtres · tableaux',pdf:'semaine-3/Chapitre-3-S3.pdf',tp:'semaine-3/TP-3.pdf'},
 {n:4,title:'Modéliser les liens',tag:'embedding · referencing',pdf:'semaine-4/Chapitre-4-S4-.pdf',tp:'semaine-4/TP-4.pdf'},
 {n:5,title:'Modifier les données',tag:'CRUD · arrayFilters',pdf:'semaine-5/Chapitre-5-S5.pdf',tp:'semaine-5/Tp-5.pdf'}
];
const QUESTIONS=[
["Fondements","Que signifie « variété » dans les 3 V ?",["Le nombre de serveurs","La diversité des formats de données","La vitesse des requêtes","La taille d’un document"],1,"Variété désigne les formats structurés, semi-structurés et non structurés.","S1 cours p. 18–20"],
["Fondements","Un virement débite Omar mais le crédit à Hamza échoue. Quelle propriété ACID exige l’annulation des deux opérations ?",["Isolation","Durabilité","Atomicité","Cohérence éventuelle"],2,"Atomicité = transaction tout ou rien.","S1 TP 1, questions 4–6"],
["Fondements","Une lecture voit une valeur modifiée par une transaction qui n’a pas encore fait COMMIT. C’est…",["Une lecture fantôme","Une lecture sale","Une lecture non répétable","Une réplication"],1,"Une lecture sale observe une modification non validée.","S1 TP 1, question 7"],
["Fondements","Pendant une partition réseau, un nœud refuse une lecture pour garantir une réponse cohérente. Quel arbitrage illustre-t-il ?",["AP","CP","BASE","Sharding"],1,"CP préserve la cohérence pendant la partition au prix de certaines réponses indisponibles.","S1 cours p. 31–35"],
["Fondements","La cohérence éventuelle signifie que…",["Toutes les lectures sont instantanément identiques","Les copies convergent après arrêt des écritures et rétablissement de la communication","Les données ne sont jamais persistées","Les transactions sont interdites"],1,"Une divergence temporaire peut exister; la convergence est attendue ensuite.","S1 cours p. 38–41"],
["Fondements","Quel mécanisme répartit les données entre plusieurs serveurs ?",["Sharding","Rollback","Projection","BSON"],0,"Le sharding découpe les données en fragments répartis entre nœuds.","S1 cours p. 25–27"],
["MongoDB","Dans MongoDB, l’équivalent le plus proche d’une ligne SQL est…",["Une collection","Un document","Une base","Un index"],1,"La collection regroupe des documents, comparables aux lignes.","S2 cours p. 17–23"],
["MongoDB","Quel champ identifie de manière unique un document dans sa collection ?",["id","clé","_id","nom"],2,"MongoDB utilise _id; s’il manque à l’insertion, un identifiant est généré.","S2 cours p. 17–23"],
["MongoDB","Quelle commande insère plusieurs documents ?",["insertOne()","insertMany()","findMany()","createMany()"],1,"insertMany() reçoit un tableau de documents.","S2 TP 2, exercice 2"],
["MongoDB","Dans « use CinemaDB », que se passe-t-il immédiatement ?",["Tous les films sont insérés","La base est sélectionnée dans mongosh","Une collection Films est créée","Une validation de schéma est lancée"],1,"use sélectionne la base courante; une écriture la matérialise si nécessaire.","S2 TP 2, exercice 2"],
["MongoDB","Comment représenter un enseignant avec nom et email dans un document Modules ?",["enseignant:{nom:\"...\",email:\"...\"}","enseignant:[nom,email] seulement","enseignant.nom sans objet","Deux bases de données obligatoires"],0,"Un sous-document conserve la structure des champs liés.","S2 TP 2, exercice 1, question 6"],
["MongoDB","BSON est…",["Une variante binaire du stockage de documents MongoDB","Un langage de jointure SQL","Un outil de dessin","Un protocole réseau seulement"],0,"MongoDB stocke des documents au format BSON, proche de JSON avec des types supplémentaires.","S2 cours p. 17–23"],
["Lecture","Quelle requête sélectionne les étudiants dont moyenne > 15 ?",["{moyenne:15}","{moyenne:{$gt:15}}","{moyenne:{$lt:15}}","{moyenne:{$in:15}}"],1,"$gt veut dire strictement supérieur.","S3 TP 3, partie 1"],
["Lecture","Dans une projection, comment afficher nom sans _id ?",["{nom:1,_id:0}","{nom:0,_id:1}","{nom:-1}","{nom:true,id:false}"],0,"L’inclusion utilise 1; _id est inclus par défaut et se retire explicitement avec 0.","S3 TP 3, partie 1"],
["Lecture","Comment filtrer une ville dans le sous-document info ?",["{info:ville}","{ville.info:\"Agadir\"}","{\"info.ville\":\"Agadir\"}","{info_ville:\"Agadir\"}"],2,"La notation pointée traverse le sous-document.","S3 TP 3, partie 2"],
["Lecture","Quel opérateur impose module=\"BD\" et note≥17 au même élément de resultats ?",["$all","$elemMatch","$size","$exists"],1,"$elemMatch regroupe les conditions sur un même élément du tableau.","S3 TP 3, partie 3"],
["Lecture","Que signifie {resultats:{$size:3}} ?",["Au moins trois résultats","Exactement trois résultats","Trois résultats ou plus","Le troisième résultat existe"],1,"$size teste une taille exacte.","S3 TP 3, partie 3"],
["Lecture","Quelle méthode trie par moyenne décroissante ?",["sort({moyenne:1})","sort({moyenne:-1})","limit({moyenne:-1})","find({moyenne:-1})"],1,"-1 signifie ordre décroissant dans sort().","S3 TP 3, partie 1"],
["Modélisation","Quand l’imbrication est-elle généralement adaptée ?",["Tableau sans limite qui grossit sans cesse","Données petites et lues avec leur parent","Même donnée partagée par des milliers de parents","Écritures indépendantes très fréquentes"],1,"Les données petites, stables et consultées ensemble se prêtent à l’imbrication.","S4 cours p. 4–6"],
["Modélisation","Que stocke une commande référencée du TP 4 pour retrouver son client ?",["client_id","Tous les avis du client","La base entière","Un objet Compass"],0,"client_id contient l’identifiant du client de la collection Clients.","S4 TP 4, exercice 2"],
["Modélisation","Quel opérateur transforme chaque client en son nom dans une projection calculée ?",["$filter","$map","$pull","$unset"],1,"$map applique une expression à chaque élément et renvoie un nouveau tableau.","S4 TP 4, exercice 1"],
["Modélisation","Quel opérateur conserve seulement les clients vivant à Agadir dans un tableau ?",["$filter","$map","$rename","$push"],0,"$filter sélectionne les éléments qui satisfont cond.","S4 TP 4, exercice 1"],
["Modélisation","Quelle limite de taille de document le cours signale-t-il pour MongoDB ?",["1 Ko","16 Mo","16 Go","Aucune limite"],1,"Le cours rappelle la limite de 16 Mo par document.","S4 cours p. 5"],
["Modélisation","Pour lire le premier élément d’un tableau calculé, utilisez…",["$arrayElemAt avec index 0","$size avec 0","$pull avec 0","$exists avec 0"],0,"Les indices commencent à 0; $arrayElemAt:[tableau,0] prend le premier.","S4 TP 4, exercice 1"],
["CRUD","Quelle opération ajoute 5 au stock des produits Accessoire ?",["updateMany + $inc","updateOne + $set","deleteMany + $inc","replaceOne + $push"],0,"updateMany cible tous les produits filtrés, $inc augmente le nombre.","S5 TP 5, question 4"],
["CRUD","Quel opérateur ajoute « promotion » sans doublon exact dans tags ?",["$push","$pull","$addToSet","$unset"],2,"$addToSet n’ajoute la valeur que si elle manque.","S5 TP 5, question 14"],
["CRUD","Quelle opération retire l’avis de Sara d’un tableau avis ?",["$pull:{avis:{client:\"Sara\"}}","$set:{avis:\"Sara\"}","$inc:{avis:1}","$rename:{avis:\"Sara\"}"],0,"$pull enlève les éléments qui correspondent au critère.","S5 TP 5, question 13"],
["CRUD","Après replaceOne(), que deviennent les anciens champs omis du document de remplacement ?",["Ils restent","Ils disparaissent","Ils deviennent null","Ils sont déplacés dans _id"],1,"replaceOne remplace l’ensemble du document hors contrainte sur _id.","S5 cours p. 37–39"],
["CRUD","Pour augmenter seulement les notes des avis d’Amal et Yassine, quel mécanisme cible ces éléments ?",["arrayFilters avec $[a]","sort()","insertMany()","countDocuments()"],0,"$[a] et arrayFilters sélectionnent les éléments du tableau à modifier.","S5 TP 5, question 9"],
["CRUD","Quelle différence entre updateOne et updateMany ?",["Un seul document contre tous les documents correspondants","Un seul champ contre tous les champs","Lecture contre écriture","Tableau contre objet"],0,"La différence porte sur le nombre de documents ciblés par le filtre.","S5 TP 5, question 18"]
];
const LESSONS=[
`<span class="pill">Semaine 01 · Fondamentaux</span><h2>Pourquoi NoSQL ?</h2>
<p>Une base relationnelle organise les données en tables liées, avec schéma déclaré, contraintes et transactions. Elle reste un bon choix quand les relations et la cohérence forte priment. Le module part de ses difficultés possibles face aux données massives, variées et réparties.</p>
<h3>Les 3 V et les quatre familles</h3><ul><li><strong>Volume</strong> : quantité de données. <strong>Vélocité</strong> : vitesse de production et de traitement. <strong>Variété</strong> : formats différents.</li><li><strong>Clé–valeur</strong> : accès direct par clé; <strong>document</strong> : objets JSON/BSON; <strong>colonnes</strong> : grandes tables distribuées; <strong>graphe</strong> : relations et parcours.</li><li><strong>Scale up</strong> augmente la puissance d’un serveur; <strong>scale out</strong> répartit la charge entre serveurs. Le sharding partage les données; la réplication conserve des copies.</li></ul>
<h3>ACID : les quatre garanties d’une transaction</h3><ul><li><strong>Atomicité</strong> : tout ou rien. Un virement débite et crédite ensemble.</li><li><strong>Cohérence</strong> : les contraintes restent respectées, par exemple solde ≥ 0.</li><li><strong>Isolation</strong> : les transactions concurrentes ne produisent que les observations permises par le niveau choisi.</li><li><strong>Durabilité</strong> : après validation, la donnée résiste à une panne prévue par le système.</li></ul>
<pre>BEGIN TRANSACTION;
UPDATE Comptes SET solde=solde-200 WHERE titulaire='Omar';
UPDATE Comptes SET solde=solde+200 WHERE titulaire='Hamza';
COMMIT;  -- ROLLBACK annule avant validation</pre>
<div class="callout">Le TP 1 fait observer lecture sale, lecture non répétable et lecture fantôme. Distinguez-les : valeur non validée, même ligne changée, ou ensemble de lignes modifié.</div>
<h3>CAP et BASE</h3><p>En cas de <strong>partition réseau</strong>, un système distribué arbitre entre répondre à toutes les requêtes (A) et garantir une vue cohérente (C), tout en supportant la coupure (P). CP peut refuser une réponse; AP peut répondre avec une donnée provisoirement ancienne.</p><p><strong>BASE</strong> signifie Basically Available, Soft state, Eventually consistent. La cohérence éventuelle signifie que les copies convergent si les mises à jour cessent et que la communication reprend; elle ne fixe pas à elle seule un délai.</p>
<div class="callout green"><strong>À savoir expliquer :</strong> ACID concerne les transactions; CAP concerne les partitions réseau; BASE décrit un modèle de disponibilité et de convergence. Ces concepts ne sont pas exclusifs.</div>`,
`<span class="pill">Semaine 02 · MongoDB</span><h2>Penser en documents</h2><p>MongoDB stocke des <strong>documents BSON</strong> dans des <strong>collections</strong>, elles-mêmes dans des bases. Un document ressemble à un objet JSON, avec des types supplémentaires comme ObjectId et Date. Le champ <code>_id</code> identifie chaque document de façon unique dans sa collection.</p>
<h3>Correspondance SQL → MongoDB</h3><p>Base → base; table → collection; ligne → document; colonne → champ. Les sous-documents et tableaux permettent de garder ensemble les données lues ensemble.</p>
<pre>use CinemaDB
db.createCollection('Films')
db.Films.insertOne({titre:'Inception', annee:2010,
  realisateur:{nom:'Christopher Nolan', pays:'UK'},
  acteurs:['Leonardo DiCaprio','Joseph Gordon-Levitt']})
db.Films.insertMany([{titre:'Film A'}, {titre:'Film B', duree:95}])</pre>
<h3>Flexibilité du schéma</h3><p>Deux documents d’une collection peuvent avoir des champs différents. Cette souplesse demande une modélisation rigoureuse : types cohérents, noms de champs stables et validation si nécessaire. <code>insertOne()</code> ajoute un document; <code>insertMany()</code> en ajoute plusieurs.</p><div class="callout green">Dans le TP 2, construisez un document <code>Modules</code> avec un <code>enseignant</code> imbriqué et un document <code>Notes</code> avec un tableau de sous-documents <code>{matiere,note}</code>.</div>
<h3>Outils de la semaine</h3><p><strong>Compass</strong> est l’interface graphique. <strong>mongosh</strong> exécute les commandes. <code>use NomBase</code> sélectionne une base; la création effective intervient à l’écriture. Une collection peut être créée explicitement ou lors de la première insertion.</p>`,
`<span class="pill">Semaine 03 · Lecture</span><h2>Interroger avec find()</h2><p><code>find(filtre, projection)</code> renvoie un curseur de documents. <code>findOne()</code> renvoie un document ou <code>null</code>. Les chemins pointés comme <code>"info.ville"</code> accèdent aux champs imbriqués.</p>
<pre>db.EtudiantsTP.find({filiere:'Informatique'},
  {nom:1, filiere:1, _id:0})
db.EtudiantsTP.find({moyenne:{$gt:15}})
  .sort({moyenne:-1}).limit(3)
db.EtudiantsTP.countDocuments({ville:'Agadir'})</pre>
<h3>Filtres indispensables</h3><ul><li><code>$gt</code>, <code>$gte</code>, <code>$lt</code>, <code>$lte</code> comparent; <code>$in</code> teste l’appartenance; <code>$regex</code> cherche un motif.</li><li><code>$exists</code> teste la présence d’un champ; <code>$type</code> vérifie son type. <code>$all</code> exige plusieurs valeurs dans un tableau.</li><li><code>$size</code> exige une taille <strong>exacte</strong>. <code>$elemMatch</code> impose plusieurs conditions au <strong>même élément</strong> d’un tableau d’objets.</li></ul>
<pre>db.EtudiantsTP2.find({'info.ville':'Agadir'})
db.EtudiantsTP3.find({resultats:{$elemMatch:
  {module:'BD', note:{$gte:17}}}})
db.movies.find({genres:{$all:['Comedy','Romance']}})
db.movies.find({'imdb.rating':{$gte:8}},
  {title:1,year:1,_id:0})</pre>
<div class="callout">Deux conditions séparées sur <code>resultats.module</code> et <code>resultats.note</code> peuvent être satisfaites par deux éléments différents. Pour une même entrée du tableau, utilisez <code>$elemMatch</code>.</div><h3>Projection et ordre</h3><p><code>{nom:1,_id:0}</code> inclut seulement le nom et retire l’identifiant. <code>sort({nom:1})</code> est croissant; <code>-1</code> est décroissant. Triez avant de limiter pour obtenir les « trois meilleurs ».</p>`,
`<span class="pill">Semaine 04 · Modélisation</span><h2>Imbrication ou référence ?</h2><p><strong>Embedding</strong> place les données liées dans un même document. Il favorise la lecture conjointe et la cohérence locale. <strong>Referencing</strong> stocke des documents séparés et conserve leurs identifiants; il évite de recopier des données qui changent souvent ou de faire grossir un tableau sans borne.</p>
<h3>Décision pratique</h3><ul><li>Imbriquez un sous-ensemble petit, stable et lu avec son parent, par exemple l’adresse d’un étudiant.</li><li>Référencez une relation très volumineuse, partagée ou mise à jour séparément, par exemple les commandes rattachées à un client.</li><li>Surveillez la limite MongoDB de <strong>16 Mo par document</strong>. Le choix dépend aussi des requêtes réelles et de la fréquence d’écriture.</li></ul>
<pre>// Référence du TP 4
{_id:101, client_id:1, produit:'Souris', total:240}
const amal = db.Clients.findOne({nom:'Amal'});
db.Commandes.find({client_id:amal._id});</pre>
<h3>Manipuler un tableau imbriqué</h3><p>Dans une projection calculée ou une agrégation, <code>$filter</code> conserve certains éléments, <code>$map</code> transforme chaque élément, <code>$arrayElemAt</code> sélectionne une position et <code>$slice</code> extrait une tranche.</p>
<pre>db.Produits.aggregate([{$project:{_id:0,
  clientsAgadir:{$filter:{input:'$clients',as:'c',
    cond:{$eq:['$$c.ville','Agadir']}}},
  noms:{$map:{input:'$clients',as:'c',in:'$$c.nom'}}
}}])</pre>
<div class="callout green">Dans le fichier du TP 4, les clients sont dans un tableau <code>clients</code>, et chaque client possède un tableau <code>achats</code>. Dessinez les niveaux avant d’écrire une expression avec <code>$$client.achats</code>.</div>`,
`<span class="pill">Semaine 05 · CRUD</span><h2>Créer, lire, modifier, supprimer</h2><p><strong>Create</strong> : <code>insertOne/insertMany</code>. <strong>Read</strong> : <code>find/findOne</code>. <strong>Update</strong> : <code>updateOne/updateMany/replaceOne</code>. <strong>Delete</strong> : <code>deleteOne/deleteMany</code>.</p>
<h3>Modifier précisément</h3><ul><li><code>$set</code> ajoute ou remplace un champ; <code>$inc</code> augmente une valeur numérique; <code>$unset</code> retire un champ; <code>$rename</code> le renomme.</li><li><code>$push</code> ajoute toujours au tableau; <code>$addToSet</code> évite le doublon exact; <code>$pull</code> enlève les éléments correspondant au critère.</li><li><code>updateOne()</code> touche un document correspondant; <code>updateMany()</code> tous les correspondants.</li></ul>
<pre>db.Produits.updateOne({nom:'Souris Gamer'},{$set:{prix:350}})
db.Produits.updateMany({categorie:'Accessoire'},{$inc:{stock:5}})
db.Produits.updateOne({nom:'Clavier Mécanique'},
  {$addToSet:{tags:'promotion'}})
db.Produits.updateOne({nom:'Souris Gamer'},
  {$pull:{avis:{client:'Sara'}}})</pre>
<h3>Éléments d’un tableau : arrayFilters</h3><p><code>$[]</code> cible tous les éléments du tableau; <code>$[a]</code> cible ceux désignés dans <code>arrayFilters</code>. Le filtre du document et celui des éléments ont deux rôles distincts.</p>
<pre>db.Produits.updateOne({nom:'Ordinateur Portable'},
  {$inc:{'avis.$[a].note':2}},
  {arrayFilters:[{'a.client':{$in:['Amal','Yassine']}}]})</pre>
<h3>Remplacement et suppression</h3><p><code>replaceOne()</code> remplace le document entier correspondant; les anciens champs non repris disparaissent. L’identifiant <code>_id</code> ne peut pas être modifié. <code>deleteOne()</code> et <code>deleteMany()</code> suppriment un ou plusieurs documents.</p><div class="callout">Attention à l’ordre des questions du TP 5 : après le renommage <code>prix → prixMAD</code> et le remplacement d’un document, les commandes suivantes doivent utiliser le nouvel état des données.</div>`
];

