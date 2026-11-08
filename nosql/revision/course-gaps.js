// Course-only additions verified against the supplied chapter PDFs.

LESSONS[0]+=`
<div class="chapter-divider">Complément du chapitre · formes normales</div>
<h3>Rappel relationnel : 1FN, 2FN, 3FN</h3>
<p><strong>1FN</strong> : chaque attribut contient une valeur atomique, sans liste ni colonnes répétées. <strong>2FN</strong> : être en 1FN et chaque attribut non-clé dépend de toute la clé primaire. <strong>3FN</strong> : être en 2FN et aucun attribut non-clé ne dépend d’un autre attribut non-clé (pas de dépendance transitive).</p>
<div class="callout green">Ce rappel du chapitre 1 explique pourquoi le relationnel sépare les données en tables; un document MongoDB peut, lui, regrouper des données lues ensemble.</div>`;

LESSONS[1]+=`
<div class="chapter-divider">Complément du chapitre · serveur et collections</div>
<h3>Ne confondez pas serveur, shell et interface</h3>
<p><code>mongod</code> est le <strong>processus serveur</strong> qui reçoit les requêtes. Il peut être lancé manuellement; le service MongoDB Windows démarre automatiquement. <code>mongosh</code> est le shell REPL qui envoie les commandes; Compass est l’interface graphique. La connexion locale du chapitre est <code>mongodb://localhost:27017</code>.</p>
<h3>Collections capped et validation</h3>
<pre>db.createCollection("Logs",{capped:true,size:1048576,max:100})</pre>
<p>Une collection <em>capped</em> a une taille fixe : quand sa limite est atteinte, les anciens documents sont remplacés (FIFO). <code>size</code> est obligatoire avec <code>capped:true</code>; <code>max</code> limite le nombre de documents. <code>validator</code>, <code>validationLevel</code> et <code>validationAction</code> servent à contrôler la validation.</p>`;

LESSONS[2]+=`
<div class="chapter-divider">Complément du chapitre · logique, pages et cas spéciaux</div>
<h3>ET, OU et pagination</h3>
<pre>// Virgule = ET implicite
db.Films.find({titre:"Inception",annee:2010})
db.Films.find({$or:[{realisateur:"Christopher Nolan"},{genre:"Science-fiction"}]})
db.Etudiants6.find().sort({nom:1}).skip(2).limit(2)</pre>
<p><code>$and</code> peut écrire le ET explicitement; <code>$or</code> exige au moins une condition. <code>skip(n)</code> ignore les n premiers résultats; avec <code>sort()</code> et <code>limit()</code>, il sert à afficher une page.</p>
<h3>Champ nul, champ absent et comptage</h3>
<pre>db.users.find({notes:null})              // null OU champ absent
db.users.find({notes:{$exists:true}})    // champ présent, même si null
db.Etudiants.countDocuments({filiere:"Informatique"})
db.Etudiants.estimatedDocumentCount()</pre>
<p><code>countDocuments(filtre)</code> compte selon un filtre. Le chapitre cite aussi <code>estimatedDocumentCount()</code> pour l’estimation du total de la collection.</p>`;

LESSONS[4]+=`
<div class="chapter-divider">Complément du chapitre · positionnel simple</div>
<h3><code>$</code> contre <code>$[]</code> et <code>$[alias]</code></h3>
<pre>db.produits.updateOne(
  {"avis.client":"Amal"},
  {$set:{"avis.$.note":7}}
)</pre>
<p>Le positionnel <code>$</code> cible la première occurrence correspondante. <code>$[]</code> cible tous les éléments; <code>$[alias]</code> avec <code>arrayFilters</code> peut cibler toutes les occurrences qui respectent une condition.</p>`;

QUESTIONS.push(
["Fondements","Quelle forme normale interdit les listes de valeurs dans un même attribut ?",["1FN","2FN","3FN","BASE"],0,"La 1FN exige des valeurs atomiques et l’absence de colonnes répétées ou de listes.","S1 cours p. 14"],
["MongoDB","Quel composant est le processus serveur MongoDB qui reçoit et gère les requêtes ?",["mongosh","mongod","Compass","mongoimport"],1,"mongod est le serveur; mongosh est le shell client et Compass est l’interface graphique.","S2 cours p. 8 et 33"],
["MongoDB","Dans une collection capped, quelle option est obligatoire lorsque capped:true ?",["max","validator","size","collation"],2,"size fixe la taille maximale en octets et est obligatoire pour une collection capped.","S2 cours p. 45–46"],
["Lecture","Deux champs placés dans le même filtre find({a:1,b:2}) sont interprétés comme…",["Un OU implicite","Un ET implicite","Une projection","Un tri"],1,"Plusieurs conditions dans le même objet de requête sont un ET implicite.","S3 cours p. 10–11"],
["Lecture","Quel filtre retourne les films de Nolan OU les films de science-fiction ?",["{$and:[{realisateur:'Nolan'},{genre:'Science-fiction'}]}","{realisateur:'Nolan',genre:'Science-fiction'}","{$or:[{realisateur:'Nolan'},{genre:'Science-fiction'}]}","{$in:['Nolan','Science-fiction']}"],2,"$or renvoie les documents qui satisfont au moins une condition.","S3 cours p. 13–14"],
["Lecture","Après sort({nom:1}).skip(2).limit(2), que voyez-vous ?",["Les deux premiers résultats","Deux résultats après avoir ignoré les deux premiers","Tous les résultats sauf les deux derniers","Deux résultats aléatoires"],1,"skip(2) ignore les deux premiers résultats après le tri, puis limit(2) garde les deux suivants.","S3 cours p. 53–54"],
["Lecture","Que retourne {notes:null} dans le cours ?",["Seulement les documents où notes est explicitement null","Seulement les documents sans notes","Les documents où notes est null ou absent","Une erreur"],2,"Une égalité à null correspond à un champ explicitement null ou à un champ absent; $exists distingue la présence.","S3 cours p. 55–56"],
["CRUD","Que cible l’opérateur positionnel avis.$.note dans une mise à jour filtrée sur avis.client ?",["Tous les avis","La première occurrence correspondante","Uniquement le dernier avis","Le document entier"],1,"Le positionnel $ ne modifie que la première occurrence correspondante; arrayFilters permet de viser plusieurs occurrences.","S5 cours p. 14–15"]
);

FLASHCARDS.push(
["Fondements","1FN, 2FN, 3FN : que retenir ?","1FN : valeurs atomiques, pas de listes/répétitions. 2FN : dépendance de toute la clé. 3FN : pas de dépendance transitive entre attributs non-clés.",2,"S1 cours p. 14"],
["MongoDB","mongod, mongosh et Compass : rôles ?","mongod = processus serveur. mongosh = shell REPL qui envoie les commandes. Compass = interface graphique. Service MongoDB = démarrage automatique du serveur.",2,"S2 cours p. 33–37"],
["MongoDB","Qu’est-ce qu’une collection capped ?","Collection de taille fixe, FIFO : quand la limite est atteinte, les anciens documents sont remplacés. capped:true exige size; max est optionnel.",3,"S2 cours p. 45–46"],
["Lecture","ET implicite et $or ?","{a:1,b:2} est un ET implicite. $and peut l’écrire explicitement. {$or:[{a:1},{b:2}]} exige au moins une condition.",2,"S3 cours p. 10–14"],
["Lecture","Comment paginer un résultat MongoDB ?","Trie d’abord, puis skip(n) ignore n résultats et limit(m) garde m résultats : find().sort({nom:1}).skip(2).limit(2).",2,"S3 cours p. 42–54"],
["Lecture","Différence entre {champ:null} et $exists ?","{champ:null} correspond à champ null OU absent. {champ:{$exists:true}} exige la présence, même si sa valeur est null.",3,"S3 cours p. 55–56"],
["CRUD","Différence entre $ et $[] dans un tableau ?","$ cible la première occurrence correspondante; $[] cible tous les éléments; $[alias] + arrayFilters cible tous les éléments qui passent le filtre.",3,"S5 cours p. 14–15"]
);

addTP("MongoDB","Chapitre 2 · Collection capped","Créez une collection Logs limitée à 1 Mo et 100 documents.","db.createCollection('Logs',{capped:true,size:1048576,max:100})","size est obligatoire lorsque capped:true; max est le nombre maximal de documents.");
addTP("Lecture","Chapitre 3 · OU logique","Affichez les films réalisés par Christopher Nolan OU de genre Science-fiction.","db.Films.find({$or:[{realisateur:'Christopher Nolan'},{genre:'Science-fiction'}]})","$or reçoit un tableau de conditions; une seule condition suffit.");
addTP("Lecture","Chapitre 3 · Pagination","Triez les étudiants par nom, ignorez les deux premiers, puis affichez les deux suivants.","db.Etudiants6.find().sort({nom:1}).skip(2).limit(2)","Le tri doit précéder skip et limit pour que la page soit déterministe.");
addTP("CRUD","Chapitre 5 · Positionnel simple","Pour le premier avis correspondant d’Amal, remplacez sa note par 7.","db.produits.updateOne({'avis.client':'Amal'},{$set:{'avis.$.note':7}})","$ ne met à jour que la première occurrence correspondante; utilisez $[] ou $[alias] pour plusieurs éléments.");

