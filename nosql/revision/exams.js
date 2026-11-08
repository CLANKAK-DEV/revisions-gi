// Sujets d'examen écrit — INF4021. Chaque sujet : titre, durée (min), barème, questions.
// Types : def (définition), explain (explication), compare (comparaison), sql (SQL Server),
// mongo (MongoDB), output (prédire le résultat), scenario (analyse de situation), reasoning (raisonnement).
// Chaque question : [type, énoncé, points, corrigé (markdown léger), notion/topic]
const EXAMS=[
{
title:"Examen blanc 1 — Complet",
duration:90,
parts:[
 {label:"Partie I — Questions de cours (6 pts)",questions:[
  {t:"def",pts:1.5,q:"Définissez une base de données NoSQL et citez les quatre familles principales.",
   a:"**NoSQL** = « Not Only SQL » : bases de données conçues pour de grands volumes, des formats variés et une évolutivité horizontale, sans imposer le modèle relationnel. **Quatre familles** : clé–valeur (accès direct par clé), document (JSON/BSON), colonnes larges (grandes tables distribuées), graphe (parcours de relations).",
   topic:"Fondements"},
  {t:"def",pts:1.5,q:"Énoncez le théorème CAP et expliquez chaque lettre.",
   a:"**C**ohérence : toutes les lectures voient la même donnée à jour. **A**vailability : chaque requête reçoit une réponse (non erronée). **P**artition tolerance : le système survit à une coupure du réseau entre nœuds. Le théorème : **en cas de partition, un système doit choisir entre C et A** — il ne peut garantir pleinement les deux.",
   topic:"Fondements"},
  {t:"explain",pts:1.5,q:"Expliquez la propriété d'atomicité d'une transaction avec l'exemple du virement de 200 € d'Omar vers Hamza.",
   a:"L'atomicité impose que la transaction s'exécute **entièrement ou pas du tout**. Virement : `UPDATE solde=solde-200` pour Omar et `UPDATE solde=solde+200` pour Hamza doivent être validés **ensemble** par un seul COMMIT. Si le crédit échoue, le débit est annulé (ROLLBACK) : jamais un état où l'argent a quitté Omar sans arriver chez Hamza.",
   topic:"Fondements"},
  {t:"explain",pts:1.5,q:"Qu'est-ce que la cohérence éventuelle (eventual consistency) ? Donnez un exemple.",
   a:"Les copies des données peuvent être **provisoirement divergentes** entre nœuds, mais si les écritures cessent et que la communication reprend, elles **convergent** vers la même valeur. Exemple : un stock affiché 10 sur un nœud et 9 sur un autre juste après une vente ; après propagation, les deux affichent 9. Aucun délai n'est garanti.",
   topic:"Fondements"}
 ]},
 {label:"Partie II — Comparaisons (4 pts)",questions:[
  {t:"compare",pts:2,q:"Comparez lecture sale, lecture non répétable et lecture fantôme. Donnez un scénario pour chacune.",
   a:"| Anomalie | Ce qui change | Scénario |\n|---|---|---|\n| Lecture **sale** | Valeur **non validée** lue | B lit un stock modifié par A qui fait ensuite ROLLBACK |\n| Lecture **non répétable** | La **même ligne** change entre deux lectures | Le stock du produit 1 vaut 10 puis 9 |\n| Lecture **fantôme** | L'**ensemble de lignes** du filtre change | Un SELECT COUNT renvoie 5 puis 6 lignes après une insertion |",
   topic:"Fondements"},
  {t:"compare",pts:2,q:"Comparez embedding et referencing : définition, avantage principal, inconvénient principal, et un cas d'usage chacun.",
   a:"**Embedding** : imbriquer les données liées dans un même document. Avantage : **lecture optimisée** (tout en une requête, pas de jointure). Inconvénient : taille du document (limite 16 Mo), duplication, mise à jour plus lourde. Cas d'usage : l'adresse d'un étudiant, lise toujours avec lui.\n**Referencing** : documents séparés reliés par des identifiants (client_id). Avantage : **écriture optimisée**, pas de duplication. Inconvénient : lecture en deux temps. Cas d'usage : les commandes d'un client, nombreuses et évolutives.",
   topic:"Modélisation"}
 ]},
 {label:"Partie III — SQL Server (3 pts)",questions:[
  {t:"sql",pts:1.5,q:"Écrivez une transaction SQL qui transfère 250 € du compte de Sara (solde actuel 400) vers celui d'Omar, avec vérification du solde. Annulez si le solde devient négatif.",
   a:"```sql\nBEGIN TRANSACTION;\nUPDATE Comptes SET solde = solde - 250 WHERE titulaire = 'Sara';\nIF (SELECT solde FROM Comptes WHERE titulaire='Sara') < 0\nBEGIN\n    ROLLBACK;\n    PRINT 'Solde insuffisant';\n    RETURN;\nEND\nUPDATE Comptes SET solde = solde + 250 WHERE titulaire = 'Omar';\nCOMMIT;\n```\nLes deux UPDATE dans la même transaction garantissent l'atomicité ; le CHECK solde ≥ 0 est une autre défense possible.",
   topic:"Fondements"},
  {t:"sql",pts:1.5,q:"Écrivez la contrainte SQL qui empêche les soldes négatifs dans la table Comptes, puis expliquez quelle propriété ACID elle sert.",
   a:"```sql\nALTER TABLE Comptes\nADD CONSTRAINT CK_Comptes_Solde CHECK (solde >= 0);\n```\nElle sert la **cohérence** : après chaque transaction, les règles métier restent respectées. Une insertion ou mise à jour violant la contrainte est rejetée.",
   topic:"Fondements"}
 ]},
 {label:"Partie IV — MongoDB (5 pts)",questions:[
  {t:"mongo",pts:1.5,q:"Collection EtudiantsTP : affichez nom et moyenne (sans _id) des étudiants de filière 'Informatique' triés par moyenne décroissante.",
   a:"```js\ndb.EtudiantsTP.find(\n  {filiere:'Informatique'},\n  {nom:1, moyenne:1, _id:0}\n).sort({moyenne:-1})\n```\nLe 1er argument filtre les documents, le 2e choisit les champs ; -1 = décroissant.",
   topic:"Lecture"},
  {t:"mongo",pts:1.5,q:"Collection EtudiantsTP3, documents avec resultats:[{module,note}]. Trouvez les étudiants ayant obtenu **au moins 17 en module BD** (même élément). Expliquez pourquoi une double condition simple est fausse.",
   a:"```js\ndb.EtudiantsTP3.find({\n  resultats:{$elemMatch:{module:'BD', note:{$gte:17}}}\n})\n```\n`{'resultats.module':'BD','resultats.note':{$gte:17}}` peut être satisfait par **deux éléments différents** (BD dans l'un, note ≥17 dans l'autre). `$elemMatch` impose les deux conditions au **même** sous-document.",
   topic:"Lecture"},
  {t:"mongo",pts:2,q:"Produits avec avis:[{client,note,commentaire}]. Augmentez de 2 la note des avis de Amal et Yassine sur 'Ordinateur Portable'. Puis retirez l'avis de Sara de 'Souris Gamer'. Expliquez le rôle de arrayFilters.",
   a:"```js\ndb.Produits.updateOne(\n  {nom:'Ordinateur Portable'},\n  {$inc:{'avis.$[a].note':2}},\n  {arrayFilters:[{'a.client':{$in:['Amal','Yassine']}}]}\n)\ndb.Produits.updateOne(\n  {nom:'Souris Gamer'},\n  {$pull:{avis:{client:'Sara'}}}\n)\n```\nLe **filtre extérieur** sélectionne le document (le produit) ; **arrayFilters** sélectionne les **éléments du tableau** ciblés par `$[a]`. `$pull` retire les éléments correspondant au critère.",
   topic:"CRUD"}
 ]},
 {label:"Partie V — Analyse et raisonnement (2 pts)",questions:[
  {t:"output",pts:1,q:"Un document : {nom:'Aya', resultats:[{module:'BD',note:12},{module:'Reseaux',note:18}]}. Le filtre {'resultats.module':'BD','resultats.note':{$gte:17}} le trouve-t-il ? Justifiez.",
   a:"**Oui**, malheureusement. 'resultats.module':'BD' est vrai (élément 1) et 'resultats.note':{$gte:17} est vrai (élément 2) : chaque condition est satisfaite par **un élément différent**. C'est exactement le piège que $elemMatch corrige.",
   topic:"Lecture"},
  {t:"reasoning",pts:1,q:"Deux utilisateurs achètent simultanément le dernier produit en stock. Expliquez le risque et deux mécanismes pour l'éviter.",
   a:"Risque : **deux ventes du même exemplaire** (stock passe de 1 à -1 ou les deux commandes aboutissent). Mécanismes : 1) **transaction atomique** avec vérification et décrément dans la même transaction (ACID) ; 2) **mise à jour conditionnelle** `UPDATE Produits SET stock=stock-1 WHERE id=X AND stock>0` et vérification du nombre de lignes modifiées. En distribué, la question CAP se pose en plus.",
   topic:"Fondements"}
 ]}
 ]},
{
title:"Examen blanc 2 — Orienté pratique",
duration:90,
parts:[
 {label:"Partie I — Cours rapide (4 pts)",questions:[
  {t:"def",pts:1,q:"Définissez BSON et donnez deux types qu'il ajoute par rapport à JSON.",
   a:"**BSON** = Binary JSON : format binaire de stockage des documents MongoDB. Types ajoutés : **ObjectId**, **Date**, décimal, entiers de tailles variées.",
   topic:"MongoDB"},
  {t:"def",pts:1,q:"Qu'est-ce qu'un deadlock ? Comment un SGBD le résout-il ?",
   a:"Deux transactions s'attendent **mutuellement** : chacune tient un verrou dont l'autre a besoin (cycle d'attente). Le SGBD **détecte le cycle** et annule une transaction victime (ROLLBACK) ; l'application peut la relancer.",
   topic:"Fondements"},
  {t:"explain",pts:1,q:"Différence entre scale up et scale out. Lequel correspond au sharding ?",
   a:"**Scale up** : renforcer une machine (RAM/CPU) — limites physiques et coût. **Scale out** : ajouter des machines et répartir données/charge. Le **sharding** est du scale out : il découpe les données en fragments répartis.",
   topic:"Fondements"},
  {t:"explain",pts:1,q:"Dans le TP 2, pourquoi le champ métier id ne remplace-t-il pas _id ?",
   a:"`_id` est l'**identifiant technique** de MongoDB : unique, immuable, généré (ObjectId) si absent. `id` est un simple **champ métier** sans rôle particulier pour MongoDB.",
   topic:"MongoDB"}
 ]},
 {label:"Partie II — MongoDB écrit (8 pts)",questions:[
  {t:"mongo",pts:1.5,q:"Créez la base Genie_Informatique_MongoDB, la collection Etudiants, puis insérez trois étudiants (id, nom, ville) en une seule commande.",
   a:"```js\nuse Genie_Informatique_MongoDB\ndb.createCollection('Etudiants')\ndb.Etudiants.insertMany([\n  {id:1,nom:'Amal',ville:'Agadir'},\n  {id:2,nom:'Omar',ville:'Rabat'},\n  {id:3,nom:'Sara',ville:'Casablanca'}\n])\n```\n`use` sélectionne la base ; la création effective a lieu à la première écriture.",
   topic:"MongoDB"},
  {t:"mongo",pts:1.5,q:"Insérez un film avec titre, année, réalisateur {nom, nationalite} et un tableau d'acteurs.",
   a:"```js\ndb.Films.insertOne({\n  titre:'Inception', annee:2010,\n  realisateur:{nom:'Christopher Nolan', nationalite:'UK'},\n  acteurs:['Leonardo DiCaprio','Joseph Gordon-Levitt']\n})\n```\nLe réalisateur est un **sous-document**, les acteurs un **tableau de chaînes**.",
   topic:"MongoDB"},
  {t:"mongo",pts:1.5,q:"Collection EtudiantsTP2 avec info:{ville,age}. Trouvez les étudiants d'Agadir de plus de 21 ans, en affichant seulement nom et info.ville.",
   a:"```js\ndb.EtudiantsTP2.find(\n  {'info.ville':'Agadir', 'info.age':{$gt:21}},\n  {nom:1, 'info.ville':1, _id:0}\n)\n```\nLa notation pointée traverse le sous-document, dans le filtre comme dans la projection.",
   topic:"Lecture"},
  {t:"mongo",pts:1,q:"Comptez les films du jeu movies dont le titre contient 'love' (casse indifférente).",
   a:"```js\ndb.movies.countDocuments({title:{$regex:'love',$options:'i'}})\n```\n`$options:'i'` rend la recherche insensible à la casse.",
   topic:"Lecture"},
  {t:"mongo",pts:1.5,q:"Renommez le champ prix en prixMAD dans tous les produits qui possèdent ce champ. Que devient une commande suivante qui utilise encore prix ?",
   a:"```js\ndb.Produits.updateMany(\n  {prix:{$exists:true}},\n  {$rename:{prix:'prixMAD'}}\n)\n```\nAprès `$rename`, le champ `prix` **n'existe plus** : une commande qui l'utilise ne trouve plus rien (ou crée un champ vide avec $set). D'où l'importance de traiter le TP 5 dans l'ordre.",
   topic:"CRUD"},
  {t:"mongo",pts:1,q:"Remplacez entièrement le document 'Casque Audio' par 'Casque Bluetooth' (categorie Multimédia, prixMAD 950, stock 25, fournisseur SoundMax/Marrakech). Que perd-on si on ne recopie pas les avis ?",
   a:"```js\ndb.Produits.replaceOne(\n  {nom:'Casque Audio'},\n  {nom:'Casque Bluetooth', categorie:'Multimédia', prixMAD:950,\n   stock:25, fournisseur:{nom:'SoundMax', ville:'Marrakech'}}\n)\n```\n`replaceOne` remplace le **document entier** : les champs non recopiés (avis, tags…) **disparaissent**. `_id` ne peut pas changer.",
   topic:"CRUD"}
 ]},
 {label:"Partie III — Modélisation (4 pts)",questions:[
  {t:"mongo",pts:2,q:"Produits contient clients:[{nom,ville,achats:[{produit,quantite,prix}]}]. Pour chaque client, affichez son nom et la quantité TOTALE de 'Souris' achetées.",
   a:"```js\ndb.Produits.aggregate([{$project:{_id:0, clients:{$map:{\n  input:'$clients', as:'c',\n  in:{nom:'$$c.nom',\n     quantiteSouris:{$sum:{$map:{\n       input:{$filter:{input:'$$c.achats', as:'a',\n         cond:{$eq:['$$a.produit','Souris']}}},\n       as:'s', in:'$$s.quantite'}}}}\n}}}}])\n```\nMéthode de l'intérieur vers l'extérieur : **filtrer** les achats Souris → **extraire** les quantités → **sommer**.",
   topic:"Modélisation"},
  {t:"mongo",pts:1,q:"Même structure : affichez les clients ayant acheté au moins deux produits DISTINCTS.",
   a:"```js\ndb.Produits.aggregate([{$project:{_id:0, clients:{$filter:{\n  input:'$clients', as:'c',\n  cond:{$gte:[{$size:{$setUnion:[\n    {$map:{input:'$$c.achats', as:'a', in:'$$a.produit'}}, []]}}, 2]}}\n}}}}])\n```\n`$setUnion` **dédoublonne** les noms : compter les achats ne suffit pas (deux achats du même produit = un seul produit distinct).",
   topic:"Modélisation"},
  {t:"scenario",pts:1,q:"Clients et Commandes sont deux collections séparées (referencing). Écrivez les commandes qui retrouvent les produits commandés par Yassine.",
   a:"```js\nconst y = db.Clients.findOne({nom:'Yassine'});\ndb.Commandes.find({client_id:y._id}, {produit:1, _id:0})\n```\nDeux lectures : trouver l'_id du client, puis filtrer les commandes par client_id.",
   topic:"Modélisation"}
 ]},
 {label:"Partie IV — Raisonnement (4 pts)",questions:[
  {t:"scenario",pts:2,q:"Un site e-commerce passe du relationnel au document. Un produit a des images HD, des vidéos et des tags différents d'un produit à l'autre. Expliquez pourquoi le schéma relationnel pose problème et pourquoi un document convient mieux.",
   a:"En relationnel, chaque nouvelle forme de donnée impose **une colonne** (souvent vide pour les autres produits) ou **une table annexe** : schéma rigide, jointures nombreuses, lignes clairsemées. En document, chaque produit porte **exactement ses champs** : images, vidéos et tags variables cohabitent sans modifier le schéma. La lecture d'une fiche produit complète tient en **une requête** au lieu de plusieurs jointures.",
   topic:"Fondements"},
  {t:"reasoning",pts:2,q:"« MongoDB est AP, donc il ne garantit jamais la cohérence. » Discutez cette affirmation.",
   a:"Affirmation **fausse sur plusieurs plans**. 1) CAP décrit un arbitrage **pendant une partition**, pas une étiquette permanente. 2) MongoDB propose des **transactions ACID multi-documents** depuis la version 4.0, et des write concerns qui ajustent la cohérence. 3) Un système peut être CP dans certaines configurations. Ne pas déduire « toutes les bases NoSQL sont AP ».",
   topic:"Fondements"}
 ]}
 ]}
];
