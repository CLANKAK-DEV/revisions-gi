LESSONS[0]+=`
<div class="chapter-divider">Approfondissement · comprendre le pourquoi</div>
<h3>1. Pourquoi le modèle relationnel devient parfois coûteux</h3>
<p>Imaginez une application qui reçoit des millions d’événements par minute. Une partie des événements a une position GPS, d’autres une vidéo, d’autres un tableau de mesures. Dans un modèle tabulaire strict, chaque nouvelle forme de donnée impose souvent une modification du schéma ou des tables annexes. Les jointures et les transactions restent utiles, mais elles ont un coût lorsque les données et les utilisateurs sont répartis sur plusieurs machines. NoSQL propose plusieurs modèles pour adapter le stockage aux accès réels.</p>
<p><strong>Question de choix :</strong> si votre priorité est un virement bancaire avec des contraintes fortes, pensez aux transactions et à la cohérence. Si votre priorité est de lire rapidement un profil complet et variable, un document peut être pratique. NoSQL ne veut pas dire « sans SQL » ni « sans contraintes » : cela signifie <em>Not Only SQL</em>.</p>
<h3>2. Les quatre familles à reconnaître en situation</h3>
<table><thead><tr><th>Besoin</th><th>Modèle pertinent</th><th>Raison</th></tr></thead><tbody>
<tr><td>Retrouver une session avec son identifiant</td><td>Clé–valeur</td><td>Accès direct par clé</td></tr>
<tr><td>Conserver un film avec acteurs et réalisateur</td><td>Document</td><td>Données variées lues ensemble</td></tr>
<tr><td>Grand flux d’événements réparti</td><td>Colonnes larges</td><td>Distribution et écritures massives</td></tr>
<tr><td>Chemin entre personnes et relations</td><td>Graphe</td><td>Parcours de liens</td></tr></tbody></table>
<p>Une famille n’impose pas à elle seule les garanties de cohérence du produit précis. Ne déduisez pas « toutes les bases NoSQL sont AP ».</p>
<h3>3. ACID par un virement de 200</h3>
<p>État initial du TP : Omar a 500, Hamza a 1000. Après le virement, on veut Omar à 300 et Hamza à 1200. Un état où Omar vaut 300 mais Hamza vaut encore 1000 est incorrect. L’atomicité exige que les deux mises à jour soient validées ensemble. La cohérence vérifie en plus les règles métier, par exemple le solde non négatif. L’isolation concerne ce que les autres transactions voient pendant le virement. La durabilité concerne l’état après <code>COMMIT</code>.</p>
<table><thead><tr><th>Anomalie</th><th>Ce qui change</th><th>Exemple du TP</th></tr></thead><tbody>
<tr><td>Lecture sale</td><td>Une valeur non validée est lue</td><td>Connexion B voit une modification que A peut annuler</td></tr>
<tr><td>Lecture non répétable</td><td>La même ligne change entre deux lectures</td><td>Le stock du produit vaut 10 puis 9</td></tr>
<tr><td>Lecture fantôme</td><td>Le nombre de lignes d’un résultat change</td><td>Une nouvelle ligne satisfait le même filtre</td></tr></tbody></table>
<div class="callout">Une lecture fantôme ne se résume pas à « la valeur d’une ligne change ». C’est l’ensemble des lignes correspondant à une condition qui change.</div>
<h3>4. CAP en trois étapes</h3>
<ol><li>Deux serveurs détiennent des copies d’un stock.</li><li>Le réseau entre eux se coupe : c’est la partition P.</li><li>Une requête arrive sur le serveur isolé. Répondre tout de suite peut donner un stock ancien (A privilégiée). Refuser en attendant une confirmation préserve une réponse cohérente (C privilégiée).</li></ol>
<p>La lettre A signifie ici que chaque requête reçoit une réponse non erronée. Elle ne signifie pas simplement « le serveur est généralement disponible ». Le théorème parle de l’arbitrage lorsque les nœuds ne peuvent plus communiquer.</p>
<h3>5. BASE, convergence et limites</h3>
<p><strong>Basically Available</strong> : le système essaie de continuer à répondre. <strong>Soft state</strong> : l’état peut évoluer pendant la propagation. <strong>Eventually consistent</strong> : si les écritures cessent et que les nœuds recommuniquent, les copies finissent par converger. Cela n’assure pas que chaque lecture est immédiatement à jour. Pour un achat du dernier produit, il faut donc raisonner aussi sur la gestion des conflits et des écritures concurrentes.</p>
<div class="callout green"><strong>Auto-explication :</strong> dites à voix haute la différence entre un <code>ROLLBACK</code>, une lecture sale et une réponse AP pendant une partition. Si vous utilisez le même argument pour les trois, recommencez cette section.</div>`;
LESSONS[1]+=`
<div class="chapter-divider">Approfondissement · du SQL au document</div>
<h3>1. Lire la structure avant d’écrire une commande</h3>
<pre>Base CinemaDB
└── Collection Films
    └── Document
        ├── _id
        ├── titre : texte
        ├── annee : nombre
        ├── realisateur : objet {nom, nationalite}
        └── acteurs : tableau de textes</pre>
<p>La base contient des collections; la collection contient des documents; le document contient des champs. Un champ peut être une valeur, un objet imbriqué ou un tableau. Cette hiérarchie évite la confusion « collection = document » fréquente à l’examen.</p>
<h3>2. JSON, BSON et types</h3>
<p>Le JSON est une écriture textuelle familière. BSON est le format binaire utilisé par MongoDB, avec davantage de types : <code>ObjectId</code>, date, nombres de différentes tailles, etc. Dans <code>mongosh</code>, on écrit des objets JavaScript ressemblant au JSON; une commande <code>insertOne</code> accepte par exemple des clés sans guillemets. Le champ <code>_id</code> doit être unique. Le champ <code>id</code> du TP 2 est simplement un champ métier et ne remplace pas automatiquement <code>_id</code>.</p>
<pre>db.Films.insertOne({
  id: 1, titre: "Inception", annee: 2010,
  realisateur: {nom: "Christopher Nolan", nationalite: "UK"},
  acteurs: ["Leonardo DiCaprio", "Joseph Gordon-Levitt"]
})</pre>
<h3>3. Traduire le TP 2 pas à pas</h3>
<p>Pour <code>Genie_Informatique_MongoDB</code>, sélectionnez la base, créez la collection, puis insérez un document. Dans Compass, la même logique passe par l’interface. Dans mongosh, ces commandes aident à comprendre le modèle :</p>
<pre>use Genie_Informatique_MongoDB
db.createCollection("Etudiants")
db.Etudiants.insertOne({id:1,nom:"Amal",ville:"Agadir"})
db.Etudiants.insertMany([
  {id:2,nom:"Omar",ville:"Marrakech"},
  {id:3,nom:"Sara",ville:"Casablanca"}
])</pre>
<p>Un module peut garder l’enseignant dans un sous-document. Les notes d’un étudiant peuvent être un tableau de sous-documents. Le tableau permet plusieurs matières sans créer <code>note1</code>, <code>note2</code>, etc.</p>
<pre>db.Modules.insertOne({
  code:"INF4021", intitule:"NoSQL", semestre:7,
  enseignant:{nom:"M. Oukdach",email:"exemple@universite.ma"}
})
db.Notes.insertOne({
  etudiant_id:1,
  resultats:[{matiere:"NoSQL",note:17},{matiere:"Réseaux",note:14}]
})</pre>
<h3>4. Schéma flexible ≠ données incontrôlées</h3>
<p>MongoDB peut accepter un film avec <code>budget</code> et un autre sans ce champ. Mais si une application attend <code>annee</code> en nombre et reçoit parfois du texte, les tris et comparaisons deviennent difficiles. Décidez des noms de champs, des types et des valeurs obligatoires. Une validation de collection peut formaliser ces règles.</p>
<h3>5. Local, Atlas et outils</h3>
<p><strong>Community Server</strong> fait tourner la base en local. <strong>Atlas</strong> héberge une base gérée dans le cloud. <strong>Compass</strong> est une interface graphique; <strong>mongosh</strong> est un shell de commandes; <strong>mongoimport</strong> est un outil d’import de données, utilisé en semaine 3. Ne confondez pas ces rôles lors d’une question d’installation.</p>
<div class="callout green"><strong>Vérifiez votre compréhension :</strong> pouvez-vous créer mentalement un document <code>Projets</code> avec un titre, une année, un tableau de membres et un objet encadrant ? Si oui, vous avez la structure du TP 2.</div>`;
LESSONS[2]+=`
<div class="chapter-divider">Approfondissement · raisonner sur une requête</div>
<h3>1. La méthode en quatre questions</h3>
<ol><li><strong>Dans quelle collection ?</strong> <code>EtudiantsTP</code>, <code>EtudiantsTP2</code>, <code>EtudiantsTP3</code> ou <code>movies</code> n’ont pas la même structure.</li><li><strong>Quels documents sélectionner ?</strong> Écrivez le filtre, premier argument de <code>find</code>.</li><li><strong>Quels champs afficher ?</strong> Écrivez la projection, deuxième argument.</li><li><strong>Quel ordre et combien ?</strong> Ajoutez <code>sort</code>, <code>limit</code> ou utilisez <code>countDocuments</code>.</li></ol>
<pre>db.EtudiantsTP.find(
  {filiere:"Informatique",moyenne:{$gt:15}},
  {nom:1,moyenne:1,_id:0}
).sort({moyenne:-1}).limit(3)</pre>
<p>La virgule sépare deux conditions implicites en « ET ». Pour « OU », utilisez <code>$or</code> avec un tableau de filtres. Le filtre sélectionne des <em>documents</em>; la projection choisit les <em>champs</em> affichés.</p>
<h3>2. Comparateurs et bornes</h3>
<table><thead><tr><th>Expression</th><th>Sens</th><th>Exemple</th></tr></thead><tbody>
<tr><td><code>$gt</code> / <code>$gte</code></td><td>&gt; / ≥</td><td>moyenne supérieure à 15</td></tr>
<tr><td><code>$lt</code> / <code>$lte</code></td><td>&lt; / ≤</td><td>âge au plus 21</td></tr>
<tr><td><code>$in</code></td><td>Une valeur parmi plusieurs</td><td>ville Agadir ou Rabat</td></tr>
<tr><td><code>$regex</code></td><td>Motif textuel</td><td>titre contenant « Love »</td></tr>
<tr><td><code>$exists</code> / <code>$type</code></td><td>Présence / type</td><td>note IMDb présente</td></tr></tbody></table>
<pre>// Bornes inclusives : 15 ≤ moyenne ≤ 18
db.EtudiantsTP2.find({moyenne:{$gte:15,$lte:18}})
// Ville imbriquée
db.EtudiantsTP2.find({"info.ville":"Agadir"})
// Titre contenant Love, sans tenir compte de la casse
db.movies.find({title:{$regex:"Love",$options:"i"}})</pre>
<h3>3. Tableaux : le piège du « même élément »</h3>
<p>Considérez <code>resultats:[{module:"BD",note:12},{module:"Réseaux",note:18}]</code>. Le filtre <code>{"resultats.module":"BD","resultats.note":{$gte:17}}</code> peut correspondre au document : BD est vrai dans le premier élément, note ≥17 dans le deuxième. Il ne prouve pas une note ≥17 <em>en BD</em>.</p>
<pre>db.EtudiantsTP3.find({
  resultats:{$elemMatch:{module:"BD",note:{$gte:17}}}
})</pre>
<p><code>$elemMatch</code> lie les deux conditions au même sous-document. Un filtre sur le tableau choisit les documents; il ne raccourcit pas automatiquement le tableau retourné. Pour afficher seulement un élément, il faut une projection adaptée ou une agrégation.</p>
<h3>4. $all, $size, présence d’un indice</h3>
<pre>// Les deux valeurs doivent être présentes dans genres
db.movies.find({genres:{$all:["Comedy","Romance"]}})
// Exactement trois résultats
db.EtudiantsTP3.find({resultats:{$size:3}})
// Au moins trois résultats : le troisième élément existe
db.EtudiantsTP3.find({"resultats.2":{$exists:true}})
// Un tableau d'objets contient les deux modules
db.EtudiantsTP3.find({"resultats.module":{$all:["Programmation","Réseaux"]}})</pre>
<p><code>$size</code> ne prend pas une comparaison <code>$gte</code> dans un filtre standard. La présence de l’indice 2 est une solution simple pour « au moins trois ».</p>
<h3>5. Projection, tri et comptage</h3>
<p><code>{nom:1,filiere:1,_id:0}</code> garde deux champs et retire <code>_id</code>. En règle générale, on ne mélange pas inclusion et exclusion dans la même projection, sauf pour <code>_id</code>. <code>sort({moyenne:-1,nom:1})</code> trie d’abord par moyenne décroissante puis par nom croissant. Sans <code>sort</code>, l’ordre de <code>find</code> n’est pas garanti. <code>countDocuments({ville:"Agadir"})</code> compte les documents correspondant à un filtre.</p>
<div class="callout">Le TP 3 écrit « au moins 3 modules ($size:3) ». C’est une imprécision de l’énoncé : <code>$size:3</code> veut dire exactement 3. Pour l’examen, expliquez la différence.</div>`;
LESSONS[3]+=`
<div class="chapter-divider">Approfondissement · modélisation et tableaux profonds</div>
<h3>1. Commencer par les requêtes, puis choisir la forme</h3>
<p>Dans le TP 4, le produit contient un tableau <code>clients</code>; chaque client contient un tableau <code>achats</code>. Cette forme est pratique si l’on affiche souvent le produit et ses clients ensemble. Elle peut devenir coûteuse si le nombre de clients grandit sans limite : chaque produit grossit et peut atteindre la limite de 16 Mo. Dans l’autre exercice, <code>Clients</code> et <code>Commandes</code> sont séparés; <code>client_id</code> lie une commande à son client.</p>
<table><thead><tr><th>Critère</th><th>Imbrication</th><th>Référence</th></tr></thead><tbody>
<tr><td>Lecture conjointe fréquente</td><td>Très adaptée</td><td>Deux lectures ou jointure</td></tr>
<tr><td>Ensemble enfant sans limite</td><td>Risque de grossissement</td><td>Adaptée</td></tr>
<tr><td>Écriture indépendante des enfants</td><td>Peut réécrire le parent</td><td>Plus simple</td></tr>
<tr><td>Donnée enfant partagée</td><td>Répétition possible</td><td>Une source centrale</td></tr></tbody></table>
<h3>2. Comprendre les niveaux du document réel</h3>
<pre>Produit
└── clients: [
      {nom:"Amal", ville:"Agadir",
       achats:[
         {produit:"Souris", quantite:2, prix:120},
         {produit:"Clavier", quantite:1, prix:250}
       ]}
    ]</pre>
<p>Pour vérifier qu’un document contient Amal, filtrez sur <code>"clients.nom"</code>. Pour <em>afficher seulement Amal</em>, il faut ensuite filtrer le tableau. Ce sont deux opérations différentes : sélectionner le document et transformer son résultat.</p>
<pre>db.Produits.aggregate([
  {$match:{"clients.nom":"Amal"}},
  {$project:{nom:1,_id:0,
    clients:{$filter:{input:"$clients",as:"c",
      cond:{$eq:["$$c.nom","Amal"]}}}
  }}
])</pre>
<h3>3. Les quatre opérateurs comme une boîte à outils</h3>
<p><code>$filter</code> conserve certains éléments : <code>input</code> est le tableau, <code>as</code> le nom local, <code>cond</code> une condition. <code>$map</code> produit une valeur pour chaque élément : <code>in</code> est l’expression de sortie. Dans les expressions, <code>"$clients"</code> désigne le champ du document et <code>"$$c.nom"</code> un champ de l’élément nommé <code>c</code>.</p>
<pre>// Liste des noms
{$map:{input:"$clients",as:"c",in:"$$c.nom"}}
// Achats de Souris pour un client c
{$filter:{input:"$$c.achats",as:"a",
  cond:{$eq:["$$a.produit","Souris"]}}}
// Deux premiers clients
{$slice:["$clients",2]}
// Premier client
{$arrayElemAt:["$clients",0]}</pre>
<h3>4. Composer les opérateurs sans se perdre</h3>
<p>Pour « pour chaque client, liste de ses produits achetés », partez de l’intérieur : le tableau d’achats d’un client. Appliquez <code>$map</code> à ces achats pour obtenir seulement <code>produit</code>. Ensuite, appliquez un autre <code>$map</code> aux clients. Le résultat est un tableau de résumés par client.</p>
<pre>db.Produits.aggregate([{$project:{_id:0,
  clients:{$map:{input:"$clients",as:"c",in:{
    nom:"$$c.nom",
    produits:{$map:{input:"$$c.achats",as:"a",
      in:"$$a.produit"}}
  }}}
}}])</pre>
<p>Pour additionner les quantités, utilisez <code>$sum</code> sur un <code>$map</code> des quantités. Pour calculer la quantité de « Souris », filtrez d’abord les achats, transformez-les en quantités, puis faites la somme.</p>
<h3>5. Suivre une référence</h3>
<pre>const client = db.Clients.findOne({nom:"Amal"});
db.Commandes.find({client_id:client._id});</pre>
<p>Le TP demande deux lectures. La première trouve l’identifiant du client; la seconde sélectionne ses commandes. Dans une vraie application, une agrégation <code>$lookup</code> peut joindre les collections, mais la solution à deux étapes correspond exactement à l’exercice.</p>
<div class="callout green"><strong>Méthode d’examen :</strong> dessinez d’abord les niveaux, puis écrivez l’expression la plus intérieure. À chaque <code>$map</code> ou <code>$filter</code>, notez sur papier ce que représente l’alias.</div>`;
LESSONS[4]+=`
<div class="chapter-divider">Approfondissement · opérations et effets</div>
<h3>1. Toujours lire une commande en trois parties</h3>
<pre>db.Produits.updateMany(
  {categorie:"Accessoire"},  // quels documents ?
  {$inc:{stock:5}}            // quelle modification ?
)</pre>
<p>Le premier objet est le <strong>filtre</strong>, le deuxième l’<strong>opération</strong>, et un troisième objet éventuel contient des <strong>options</strong> comme <code>arrayFilters</code>. Une erreur fréquente est de mettre le champ à modifier dans le filtre et de croire que cela suffit.</p>
<h3>2. Choisir le bon opérateur</h3>
<table><thead><tr><th>Besoin</th><th>Opérateur</th><th>Effet</th></tr></thead><tbody>
<tr><td>Fixer un prix à 350</td><td><code>$set</code></td><td>Remplace la valeur du champ</td></tr>
<tr><td>Ajouter 5 au stock</td><td><code>$inc</code></td><td>Ajoute à une valeur numérique</td></tr>
<tr><td>Effacer commentaire</td><td><code>$unset</code></td><td>Supprime le champ</td></tr>
<tr><td>prix → prixMAD</td><td><code>$rename</code></td><td>Renomme le champ</td></tr>
<tr><td>Ajouter un avis</td><td><code>$push</code></td><td>Ajoute au tableau, doublons possibles</td></tr>
<tr><td>Ajouter un tag unique</td><td><code>$addToSet</code></td><td>Ignore un doublon exact</td></tr>
<tr><td>Retirer l’avis de Sara</td><td><code>$pull</code></td><td>Retire les éléments correspondants</td></tr></tbody></table>
<h3>3. Champs imbriqués et tableaux d’objets</h3>
<p>Un sous-document simple se modifie par chemin pointé : <code>"fournisseur.ville"</code>. Pour les avis, il faut cibler les éléments du tableau. <code>$[]</code> veut dire tous les éléments; <code>$[a]</code> veut dire les éléments qui respectent <code>arrayFilters</code>.</p>
<pre>// Un sous-document
db.Produits.updateOne(
  {"fournisseur.nom":"TechWorld"},
  {$set:{"fournisseur.ville":"Tanger"}}
)
// Tous les avis du produit
db.Produits.updateOne(
  {nom:"Ordinateur Portable"},
  {$inc:{"avis.$[].note":1}}
)
// Seulement les avis de deux clients
db.Produits.updateOne(
  {nom:"Ordinateur Portable"},
  {$inc:{"avis.$[a].note":2}},
  {arrayFilters:[{"a.client":{$in:["Amal","Yassine"]}}]}
)</pre>
<p>Dans le troisième exemple, le filtre extérieur sélectionne <em>un produit</em>. <code>arrayFilters</code> sélectionne <em>des avis à l’intérieur de ce produit</em>. Sans le second filtre, l’opération ne saurait pas quels éléments du tableau modifier.</p>
<h3>4. $set, replaceOne et suppression</h3>
<p><code>$set</code> conserve tous les autres champs du document. <code>replaceOne</code> remplace le document entier : les champs non recopiés disparaissent; <code>_id</code> ne peut pas changer. <code>deleteOne</code> enlève un document correspondant; <code>deleteMany</code> les enlève tous. Vérifiez toujours le filtre avant une suppression.</p>
<pre>db.Produits.replaceOne(
  {nom:"Casque Audio"},
  {nom:"Casque Bluetooth",categorie:"Multimédia",
   prixMAD:950,stock:25,
   fournisseur:{nom:"SoundMax",ville:"Marrakech"}}
)
db.Produits.deleteOne({nom:"Souris Gamer"})
db.Produits.deleteMany({categorie:"Accessoire"})</pre>
<h3>5. Le TP 5 est une suite d’états</h3>
<p>La question 11 renomme <code>prix</code> en <code>prixMAD</code>. À la question 15, le remplacement doit donc inclure <code>prixMAD</code> si l’on veut garder cette convention. À la question 16, « Souris Gamer » existe encore si vous ne l’avez pas déjà supprimée, mais n’existe plus après <code>deleteOne</code>. Relisez l’état des documents avant chaque commande; ne traitez pas les 21 questions comme indépendantes lorsque vous les exécutez dans l’ordre.</p>
<div class="callout">Le fichier <code>produits.json</code> fourni dans le dossier semaine 4 ne contient pas le jeu de « Souris Gamer », « Casque Audio » et « avis » décrit en semaine 5. Les commandes de cette section sont des solutions de l’énoncé du TP 5; elles demandent le jeu de données correspondant pour produire un résultat.</div>`;

