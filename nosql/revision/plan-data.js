// Plan de révision 7 jours — adaptable selon les points faibles détectés.
// Chaque jour : [titre, [activités]], chaque activité : [type, label, lien(optionnel)]
// types : learn (cours), practice (TP), recall (flashcards), quiz, exam (examen écrit), revise (révision)
const STUDY_PLAN=[
 {day:1,title:"Fondements NoSQL — comprendre le pourquoi",items:[
  ["learn","Leçon S1 : Pourquoi NoSQL ? (3 V, 4 familles, scale)","learn:0"],
  ["learn","Approfondissement S1 : ACID, CAP, BASE","learn:0"],
  ["recall","Flashcards Fondements (faciles d'abord)","cards:Fondements"],
  ["practice","TP 1 : virement atomique, ROLLBACK, contrainte solde","tp:Fondements"],
  ["quiz","Quiz de la semaine 1","quiz:0"],
  ["revise","Écrivez de tête : définition ACID + exemple virement"]
 ]},
 {day:2,title:"MongoDB : penser en documents",items:[
  ["learn","Leçon S2 : bases, collections, documents BSON","learn:1"],
  ["learn","Approfondissement S2 : JSON/BSON, schéma flexible, outils","learn:1"],
  ["recall","Flashcards MongoDB","cards:MongoDB"],
  ["practice","TP 2 : création, insertOne/insertMany, sous-documents","tp:MongoDB"],
  ["quiz","Quiz de la semaine 2","quiz:1"],
  ["revise","Écrivez de tête : un document Films complet avec réalisateur imbriqué"]
 ]},
 {day:3,title:"Lire les données : find() et filtres",items:[
  ["learn","Leçon S3 : find, filtres, projections, tri","learn:2"],
  ["learn","Approfondissement S3 : le piège du « même élément »","learn:2"],
  ["recall","Flashcards Lecture","cards:Lecture"],
  ["practice","TP 3 : 10 exercices au choix (filtres, $elemMatch, movies)","tp:Lecture"],
  ["quiz","Quiz de la semaine 3","quiz:2"],
  ["revise","Écrivez de tête : top 3 des moyennes + $elemMatch BD ≥17"]
 ]},
 {day:4,title:"Modélisation : embedding vs referencing",items:[
  ["learn","Leçon S4 : imbrication ou référence ?","learn:3"],
  ["learn","Approfondissement S4 : $filter/$map, composer les niveaux","learn:3"],
  ["recall","Flashcards Modélisation","cards:Modélisation"],
  ["practice","TP 4 : $filter, $map, références Clients/Commandes","tp:Modélisation"],
  ["quiz","Quiz de la semaine 4","quiz:3"],
  ["revise","Dessinez les niveaux Produits→clients→achats et écrivez 2 requêtes"]
 ]},
 {day:5,title:"CRUD : modifier les données",items:[
  ["learn","Leçon S5 : CRUD complet","learn:4"],
  ["learn","Approfondissement S5 : arrayFilters, replaceOne, états successifs","learn:4"],
  ["recall","Flashcards CRUD","cards:CRUD"],
  ["practice","TP 5 : $set/$inc/$push/$pull/arrayFilters dans l'ordre","tp:CRUD"],
  ["quiz","Quiz de la semaine 5","quiz:4"],
  ["revise","Écrivez de tête : arrayFilters sur les avis + $addToSet vs $push"]
 ]},
 {day:6,title:"Examen blanc 1 + consolidation",items:[
  ["exam","Examen blanc 1 (90 min, sans notes)","exam:0"],
  ["revise","Corrigez-vous avec le barème ; notez chaque erreur par topic"],
  ["quiz","Quiz « Mes points faibles » jusqu'à maîtrise","quiz:weak"],
  ["recall","Reprenez les flashcards marquées « à revoir »","cards:weak"],
  ["revise","Relisez les fiches 1–3 du centre de révision","rev:0"]
 ]},
 {day:7,title:"Examen blanc 2 + révision finale",items:[
  ["exam","Examen blanc 2 (90 min, conditions réelles)","exam:1"],
  ["revise","Corrigez-vous ; comparez avec l'examen 1 : progrès ?"],
  ["revise","Fiches 4–5 + liste des pièges du centre de révision","rev:1"],
  ["recall","Dernière passe : toutes les flashcards difficiles","cards:hard"],
  ["revise","Checklist finale : cochez ce que vous savez faire de tête"]
 ]}
];
