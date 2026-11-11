window.SITE = {
  brand: "PHP, Technologies Web",
  sub: "INF4041, 4ème année Génie Informatique",
  mini: "Cours du Prof. Baqach Adil. Chapitres 1 à 5 et TP 1 à 5.",
  chapters: {
    1: "Introduction à PHP",
    2: "Structures de contrôle",
    3: "Tableaux et fonctions",
    4: "Fichiers, sessions et cookies",
    5: "Formulaires et upload",
    6: "Prédire la sortie"
  }
};

window.QCM = [
  // ---------- 1. Introduction à PHP ----------
  {"ch":1,"q":"Dans l'architecture client-serveur du Web, qui prend l'initiative de la communication ?","o":["Le serveur, qui envoie les pages dès qu'elles changent","Le serveur et le client en même temps","Le client (le navigateur), qui émet une requête","L'interpréteur PHP"],"a":2,"e":"Le client envoie une requête, le serveur attend, traite puis renvoie une réponse. Le serveur ne contacte jamais le navigateur de lui-même."},
  {"ch":1,"q":"Sur quel port écoute Apache par défaut pour HTTP et pour HTTPS ?","o":["21 et 22","80 et 443","8080 et 8443","3306 et 443"],"a":1,"e":"80 pour HTTP, 443 pour HTTPS. Le port 3306 est celui de MySQL (MariaDB), et 8080 n'est qu'une alternative quand le 80 est occupé."},
  {"ch":1,"q":"Quel code de statut HTTP signifie que la ressource demandée n'existe pas ?","o":["200","403","500","404"],"a":3,"e":"404 Not Found : URL mal saisie ou ressource absente. 403 : accès refusé. 500 : erreur dans le programme du serveur. 200 : tout va bien."},
  {"ch":1,"q":"Un script PHP plante avec une erreur fatale. Quel code de statut le serveur renvoie-t-il le plus souvent ?","o":["404 Not Found","403 Forbidden","301 Moved Permanently","500 Internal Server Error"],"a":3,"e":"Une erreur dans le programme du serveur (par exemple une erreur fatale PHP) donne un 500 Internal Server Error."},
  {"ch":1,"q":"Dans l'URL `https://www.epa.ma:8080/cours/php.php?chapitre=1`, que représente `?chapitre=1` ?","o":["Le nom de domaine","Les paramètres (la chaîne de requête)","Le port","Le chemin vers la ressource"],"a":1,"e":"Protocole https://, domaine www.epa.ma, port :8080, chemin /cours/php.php, puis les paramètres après le point d'interrogation."},
  {"ch":1,"q":"Que désigne `localhost` ?","o":["Un serveur de l'école","Le dossier htdocs","La machine elle-même, d'adresse 127.0.0.1","Le port 80"],"a":2,"e":"localhost est un nom spécial qui désigne l'ordinateur local (127.0.0.1) : l'adresse utilisée pendant le développement."},
  {"ch":1,"q":"Quelle définition de PHP est correcte ?","o":["Un langage interprété exécuté côté serveur, qui produit le plus souvent du HTML","Un langage compilé qui s'exécute dans le navigateur","Un framework basé sur JavaScript","Un système de gestion de bases de données"],"a":0,"e":"PHP est un langage de script interprété côté serveur. Le navigateur ne reçoit que le résultat (HTML). Laravel, lui, est un framework écrit en PHP."},
  {"ch":1,"q":"Que voit le navigateur quand il affiche une page PHP ?","o":["Le code PHP complet","Uniquement le HTML généré par l'interpréteur","Le code PHP s'il fait Ctrl + U","Le HTML et les requêtes SQL"],"a":1,"e":"Le code PHP s'exécute sur le serveur et n'en sort jamais. Même avec Ctrl + U, on ne voit que le HTML produit."},
  {"ch":1,"q":"Quelle différence entre un site statique et un site dynamique ?","o":["Le statique envoie des fichiers HTML écrits à l'avance, le dynamique construit ses pages au moment de la requête","Le statique utilise PHP, le dynamique non","Le dynamique ne peut pas utiliser de base de données","Le statique s'exécute dans le navigateur, le dynamique sur le client"],"a":0,"e":"Un site dynamique exécute un programme sur le serveur qui adapte la page à chaque visiteur (utilisateur connecté, panier, recherche)."},
  {"ch":1,"q":"Que contient XAMPP ?","o":["Seulement Apache et PHP","Nginx, PostgreSQL et Node.js","Visual Studio Code et Composer","Apache, MariaDB, PHP et Perl, avec phpMyAdmin"],"a":3,"e":"XAMPP : X (multiplateforme), Apache, MariaDB, PHP, Perl. Il fournit aussi phpMyAdmin pour administrer la base."},
  {"ch":1,"q":"Un fichier est placé dans `C:\\xampp\\htdocs\\inf4041\\hello.php`. Quelle adresse faut-il saisir dans le navigateur ?","o":["file:///C:/xampp/htdocs/inf4041/hello.php","http://localhost/htdocs/inf4041/hello.php","http://localhost/inf4041/hello.php","http://localhost:3306/inf4041/hello.php"],"a":2,"e":"htdocs est le dossier racine : il n'apparaît pas dans l'URL. L'adresse commence par http://localhost/ suivie du chemin relatif."},
  {"ch":1,"q":"Que se passe-t-il quand on ouvre un fichier PHP par double-clic ?","o":["Il s'exécute normalement","Apache démarre automatiquement","PHP est installé automatiquement","Le navigateur l'ouvre en file:///, sans passer par Apache ni PHP : le code n'est pas exécuté"],"a":3,"e":"Il faut toujours démarrer Apache et passer par http://localhost/. Avec file:///, le navigateur affiche le code source ou propose un téléchargement."},
  {"ch":1,"q":"Apache refuse de démarrer dans XAMPP. Quelle est la cause la plus fréquente ?","o":["PHP n'est pas installé","MySQL n'est pas démarré","Le fichier index.php est absent","Le port 80 est déjà utilisé par un autre logiciel"],"a":3,"e":"Skype, IIS ou un autre serveur occupent souvent le port 80. On peut mettre `Listen 8080` dans httpd.conf et utiliser http://localhost:8080."},
  {"ch":1,"q":"À quoi sert `php -S localhost:8000` ?","o":["Installer PHP","Lancer le serveur web intégré de PHP, pour le développement uniquement","Arrêter Apache","Vérifier la syntaxe d'un script"],"a":1,"e":"C'est un petit serveur de développement. Il ne doit jamais servir en production. Laravel s'en inspire avec `php artisan serve`."},
  {"ch":1,"q":"Pourquoi ne faut-il jamais laisser un fichier `phpinfo()` sur un serveur en production ?","o":["Il révèle des informations de configuration utiles à un attaquant","Il ralentit Apache","Il efface php.ini","Il désactive les sessions"],"a":0,"e":"phpinfo() affiche la version de PHP, le chemin de php.ini, les extensions : autant d'indices pour un pirate. Utile pour vérifier l'installation, à supprimer ensuite."},
  {"ch":1,"q":"Lequel de ces noms de variable est valide en PHP ?","o":["`$2prix`","`$prix-ht`","`prix`","`$_total`"],"a":3,"e":"Après le `$`, le nom commence par une lettre ou un tiret bas. `$2prix` commence par un chiffre, `$prix-ht` contient un tiret, `prix` n'a pas de `$`."},
  {"ch":1,"q":"Que renvoie `isset($x)` si `$x = null;` a été exécuté ?","o":["false, car la variable vaut null","true, car la variable existe","Une erreur","null"],"a":0,"e":"isset renvoie true seulement si la variable existe ET n'est pas null. Pour tester null explicitement, on a is_null()."},
  {"ch":1,"q":"Laquelle de ces valeurs fait renvoyer `true` à `empty()` ?","o":["La chaîne `'0.0'`","La chaîne `'false'`","La chaîne `' '` (un espace)","La chaîne `'0'`"],"a":3,"e":"Sont vides : \"\", \"0\", 0, 0.0, null, false et []. La chaîne \"0.0\" n'est pas vide, ni \"false\", ni un espace. Piège : une note de 0 est jugée vide."},
  {"ch":1,"q":"Que donne `(int) \"12.7abc\"` ?","o":["12.7","13","12","Une erreur"],"a":2,"e":"Le cast lit la chaîne jusqu'au premier caractère non numérique et supprime la partie décimale : 12. Aucune erreur avec un cast."},
  {"ch":1,"q":"Que produit `\"10 pommes\" + 5` en PHP 8 ?","o":["15, avec un Warning","15, sans message","Une TypeError, le script s'arrête","La chaîne \"10 pommes5\""],"a":0,"e":"Une chaîne qui commence par un nombre est utilisée avec ce nombre, mais PHP émet le Warning « A non-numeric value encountered »."},
  {"ch":1,"q":"Que produit `\"abc\" + 1` en PHP 8 ?","o":["Une TypeError « Unsupported operand types » : le script s'arrête","1, avec un Warning (comme en PHP 7)","0","La chaîne \"abc1\""],"a":0,"e":"Une chaîne non numérique dans un calcul provoque une TypeError en PHP 8 (en PHP 7, on obtenait seulement un avertissement)."},
  {"ch":1,"q":"Quelle est la différence entre guillemets simples et doubles ?","o":["Aucune","Les simples interprètent \\n, pas les doubles","Les simples sont réservés au HTML","Les doubles remplacent les variables par leur valeur (interpolation), les simples gardent le texte tel quel"],"a":3,"e":"`\"Bonjour $prenom\"` affiche la valeur de $prenom, `'Bonjour $prenom'` affiche littéralement le texte avec le signe dollar."},
  {"ch":1,"q":"Comment déclare-t-on une constante ?","o":["`$TVA = 0.20;` avec un `$` obligatoire","`let TVA = 0.20;`","`constant TVA = 0.20;`","`const TVA = 0.20;` ou `define('TVA', 0.20);`"],"a":3,"e":"Une constante n'a pas de `$`, s'écrit en majuscules par convention, et sa valeur ne change plus."},
  {"ch":1,"q":"Quel type d'erreur empêche l'exécution de toutes les instructions du script, même celles placées avant l'erreur ?","o":["Warning","Parse error (erreur de syntaxe)","Fatal error","Notice"],"a":1,"e":"Une Parse error est détectée avant l'exécution : aucune ligne ne s'exécute. Un Fatal error arrête le script à l'endroit fautif, un Warning laisse le script continuer."},
  {"ch":1,"q":"Que renvoie `gettype(3.5)` ?","o":["\"float\"","\"real\"","\"double\"","\"decimal\""],"a":2,"e":"Pour des raisons historiques, gettype renvoie \"double\". get_debug_type(3.5) renvoie \"float\", le nom utilisé dans le code."},
  // ---------- 2. Structures de contrôle ----------
  {"ch":2,"q":"Quel est le résultat de `17 % 5` ?","o":["3","3.4","12","2"],"a":3,"e":"Le modulo est le reste de la division entière : 17 = 3 x 5 + 2. Un nombre est pair si `$n % 2 === 0`."},
  {"ch":2,"q":"Quelle est la valeur de `2 ** 3 + 1` ?","o":["7","9","27","8"],"a":1,"e":"`**` est la puissance : 2 ** 3 = 8, puis + 1 donne 9. La puissance est prioritaire sur l'addition."},
  {"ch":2,"q":"Que renvoie `5 === \"5\"` ?","o":["true","Une erreur","null","false"],"a":3,"e":"`===` compare la valeur ET le type : un entier n'est pas une chaîne. `5 == \"5\"` serait vrai."},
  {"ch":2,"q":"Pourquoi `\"1e3\" == \"1000\"` est-il vrai ?","o":["Parce que les deux chaînes sont identiques","Parce que `==` compare seulement la longueur","Parce que PHP interprète les deux chaînes comme le nombre 1000","C'est faux : le résultat est false"],"a":2,"e":"La comparaison souple convertit en nombres : 1e3 vaut 1000. C'est pourquoi on préfère `===` par défaut."},
  {"ch":2,"q":"Que renvoie l'opérateur `<=>` pour `3 <=> 7` ?","o":["1","0","false","-1"],"a":3,"e":"L'opérateur « vaisseau spatial » renvoie -1 si la gauche est plus petite, 0 si égales, 1 si plus grande. Idéal dans usort."},
  {"ch":2,"q":"Dans `A && B`, que se passe-t-il si A est faux ?","o":["B est quand même évalué","B n'est pas évalué (court-circuit)","Une erreur est levée","Le résultat est null"],"a":1,"e":"Avec `&&`, si A est faux le résultat est déjà faux. Avec `||`, si A est vrai, B n'est pas évalué non plus."},
  {"ch":2,"q":"Laquelle de ces valeurs est considérée comme vraie (truthy) ?","o":["Le tableau vide `[]`","La chaîne `\"false\"`","La chaîne `\"0\"`","`0.0`"],"a":1,"e":"Sont fausses : false, 0, 0.0, \"\", \"0\", [] et null. La chaîne \"false\" est non vide : elle est donc vraie."},
  {"ch":2,"q":"Avec `if / elseif / else`, quel bloc est exécuté ?","o":["Tous les blocs dont la condition est vraie","Seulement le bloc de la première condition vraie, dans l'ordre","Le dernier bloc dont la condition est vraie","Le bloc else toujours"],"a":1,"e":"Les conditions sont testées dans l'ordre et dès qu'une est vraie, son bloc s'exécute et les suivantes sont ignorées. D'où l'importance de l'ordre des tests."},
  {"ch":2,"q":"Quelle différence principale entre `switch` et `match` ?","o":["match utilise la comparaison souple, switch la stricte","match est une expression à comparaison stricte, sans break, qui lève une erreur si rien ne correspond","switch ne permet pas de default","Aucune, ce sont des synonymes"],"a":1,"e":"match (PHP 8) renvoie une valeur, compare avec ===, n'a pas de chute accidentelle, et lance UnhandledMatchError sans branche correspondante ni default."},
  {"ch":2,"q":"Que se passe-t-il dans un `switch` si l'on oublie le `break` d'un case ?","o":["Rien, PHP ajoute le break","Une erreur de syntaxe","Le switch se termine","L'exécution continue dans le case suivant (chute)"],"a":3,"e":"Sans break, l'exécution « tombe » dans le case suivant. C'est une source d'erreurs, mais aussi un moyen de regrouper plusieurs valeurs (case 6: case 7:)."},
  {"ch":2,"q":"Que fait `$page = $_GET['page'] ?? 1;` ?","o":["Affecte 1 dans tous les cas","Compare page à 1","Provoque un avertissement si page est absent","Affecte la valeur de `$_GET['page']` si elle existe et n'est pas null, sinon 1"],"a":3,"e":"L'opérateur de coalescence nulle fournit une valeur par défaut sans avertissement. `$x ??= 5;` en est la forme courte d'affectation."},
  {"ch":2,"q":"Quelle écriture correspond à l'opérateur ternaire ?","o":["`condition : valeur1 ? valeur2`","`condition ?? valeur`","`if condition then valeur1 else valeur2`","`condition ? valeur_si_vrai : valeur_si_faux`"],"a":3,"e":"C'est une forme abrégée de if / else qui produit une valeur. On évite les ternaires imbriqués, illisibles."},
  {"ch":2,"q":"Dans une boucle `for`, quand l'initialisation est-elle exécutée ?","o":["Avant chaque itération","Après chaque itération","Une seule fois, avant la première itération","À la fin de la boucle"],"a":2,"e":"L'initialisation une fois, la condition avant chaque tour, l'incrémentation après chaque tour."},
  {"ch":2,"q":"Quelle boucle exécute toujours son bloc au moins une fois ?","o":["for","while","foreach","do ... while"],"a":3,"e":"do ... while teste la condition après le bloc. N'oubliez pas le point-virgule après `while (condition)`."},
  {"ch":2,"q":"Quelle est la différence entre `break` et `continue` ?","o":["Aucune","break saute une itération, continue arrête la boucle","continue quitte le script","break arrête la boucle, continue passe directement à l'itération suivante"],"a":3,"e":"break sort de la boucle (`break 2;` sort de deux boucles imbriquées). continue ignore le reste du tour en cours."},
  {"ch":2,"q":"Cause la plus fréquente d'une boucle infinie avec `while` ?","o":["Utiliser des accolades","Oublier l'incrémentation de la variable de la condition","Écrire la condition entre parenthèses","Utiliser foreach"],"a":1,"e":"Si rien dans le bloc ne fait évoluer la condition, elle reste vraie. PHP arrête le script après max_execution_time (30 secondes par défaut)."},
  {"ch":2,"q":"Une boucle extérieure fait 3 tours et la boucle intérieure 4 tours. Combien de fois le bloc intérieur s'exécute-t-il ?","o":["7","3","12","4"],"a":2,"e":"n x m : 3 x 4 = 12 exécutions. Chaque tour de la boucle extérieure déclenche tous les tours de l'intérieure."},
  {"ch":2,"q":"Que remplace la syntaxe alternative `if (...): ... endif;` ?","o":["L'instruction else","Les accolades, pour rendre les vues HTML plus lisibles","Les balises PHP","Les commentaires"],"a":1,"e":"L'accolade ouvrante devient `:` et la fermante un mot-clé de fin (endif, endfor, endforeach, endwhile). Elle préfigure les directives Blade de Laravel."},
  // ---------- 3. Tableaux et fonctions ----------
  {"ch":3,"q":"Quel est l'indice du premier élément d'un tableau indexé ?","o":["0","1","-1","Cela dépend du tableau"],"a":0,"e":"Les indices commencent à 0 : un tableau de 5 éléments a des indices de 0 à 4."},
  {"ch":3,"q":"Qu'est-ce qu'un tableau associatif ?","o":["Un tableau dont les clés sont des chaînes choisies par le programmeur","Un tableau de tableaux","Un tableau trié automatiquement","Un tableau à une seule valeur"],"a":0,"e":"On écrit chaque paire `\"clé\" => valeur`. Les clés sont uniques : affecter une clé existante remplace la valeur."},
  {"ch":3,"q":"Comment ajouter un élément à la fin d'un tableau `$t` ?","o":["`$t->add(40);`","`$t[] = 40;` ou `array_push($t, 40);`","`$t = $t + 40;`","`array_add($t, 40);`"],"a":1,"e":"`$t[] = valeur;` ajoute en fin avec le prochain indice libre. array_push fait la même chose."},
  {"ch":3,"q":"Après `unset($t[1])` sur un tableau indexé de 3 éléments, que se passe-t-il ?","o":["L'élément est supprimé et les indices restants sont 0 et 2 (un trou)","Les indices sont renumérotés automatiquement","Tout le tableau est vidé","Une erreur est levée"],"a":0,"e":"unset laisse un trou dans les indices. Pour renuméroter, on utilise `array_values($t)`."},
  {"ch":3,"q":"Qu'est-ce qui distingue `isset($t['a'])` de `array_key_exists('a', $t)` ?","o":["Rien","array_key_exists renvoie false si la valeur vaut null","isset renvoie false si la valeur vaut null, array_key_exists teste seulement l'existence de la clé","isset teste le type de la clé"],"a":2,"e":"Avec `$t = ['a' => null]`, isset donne false et array_key_exists donne true."},
  {"ch":3,"q":"Pourquoi `$t = sort($t);` est-il une erreur ?","o":["sort n'accepte pas les tableaux indexés","sort renvoie un tableau vide","sort modifie le tableau directement et renvoie true : $t vaut alors true et le tableau est perdu","La syntaxe est invalide"],"a":2,"e":"Les fonctions de tri travaillent par référence sur le tableau et renvoient true. Il faut écrire simplement `sort($t);`."},
  {"ch":3,"q":"Pour trier un tableau associatif par valeur en conservant les clés, on utilise :","o":["sort","rsort","asort (ou arsort)","array_values"],"a":2,"e":"sort et rsort renumérotent les clés (tableaux indexés). asort/arsort trient par valeur et gardent l'association. ksort trie par clé."},
  {"ch":3,"q":"Que doit renvoyer la fonction de comparaison passée à `usort` ?","o":["Un nombre négatif, nul ou positif","true ou false","Toujours 1","Le plus grand des deux éléments"],"a":0,"e":"Elle reçoit deux éléments. L'opérateur `<=>` est idéal : `fn($a, $b) => $b['note'] <=> $a['note']` trie par note décroissante."},
  {"ch":3,"q":"Quel est l'ordre des arguments de `array_map` ?","o":["array_map(fonction, tableau)","array_map(tableau, fonction)","array_map(fonction, valeur_de_départ, tableau)","array_map(clé, valeur)"],"a":0,"e":"array_map(fonction, tableau), mais array_filter(tableau, fonction) : l'ordre est inversé, piège classique."},
  {"ch":3,"q":"Que fait `array_filter` des clés du tableau d'origine ?","o":["Elle les renumérote","Elle les conserve (d'où des trous possibles)","Elle les supprime","Elle les transforme en chaînes"],"a":1,"e":"`array_filter([5, 12, 3, 20], fn($x) => $x > 4)` garde les clés 0, 1 et 3. `array_values` permet de renuméroter."},
  {"ch":3,"q":"Dans `array_reduce($t, fn($acc, $p) => $acc + $p, 0)`, que représente le `0` ?","o":["L'indice de départ","Le nombre de tours","La valeur de $acc au premier tour (la valeur de départ)","Le type de retour"],"a":2,"e":"Valeur de départ : 0 pour une somme, 1 pour un produit. La valeur renvoyée à un tour devient $acc au tour suivant."},
  {"ch":3,"q":"Que change le troisième argument `true` dans `in_array($v, $t, true)` ?","o":["La recherche devient insensible à la casse","La comparaison devient stricte (===)","La fonction renvoie la clé","La fonction trie le tableau"],"a":1,"e":"Sans `true`, in_array compare en souple : `in_array('1', [1, 2, 3])` est vrai, alors que `in_array('1', [1, 2, 3], true)` est faux."},
  {"ch":3,"q":"Que renvoie une fonction qui n'a pas d'instruction `return` ?","o":["null","0","Une chaîne vide","false"],"a":0,"e":"Sans return, la fonction renvoie null. Bonne pratique : une fonction de calcul renvoie son résultat avec return et n'affiche rien."},
  {"ch":3,"q":"Pour la fonction `function prixTTC(float $ht, float $tva = 0.20)`, quel appel est correct en PHP 8 ?","o":["`prixTTC(0.10, ht: )`","`prixTTC(tva: 0.10, ht: 100)`","`prixTTC[ht => 100]`","`prixTTC(100, , 0.10)`"],"a":1,"e":"Les arguments nommés (PHP 8) se donnent dans n'importe quel ordre. Les paramètres avec valeur par défaut se placent après les autres."},
  {"ch":3,"q":"Que provoque `doubler('5')` si le fichier commence par `declare(strict_types=1);` et que le paramètre est `int` ?","o":["Rien : 10 est renvoyé","Un Warning","Une TypeError","Le script continue avec 0"],"a":2,"e":"Le mode strict interdit les conversions automatiques de type pour les appels de fonctions : passer \"5\" à un int lève une TypeError."},
  {"ch":3,"q":"Une variable globale `$tva` est déclarée hors d'une fonction. Que se passe-t-il si la fonction l'utilise directement ?","o":["Elle ne la voit pas : une fonction ne connaît que ses paramètres et ses variables locales","Elle la voit sans problème","Elle la modifie dans le script principal","PHP la copie automatiquement"],"a":0,"e":"Il faut passer la valeur en paramètre. Le mot-clé global existe, mais il est déconseillé (dépendances cachées)."},
  {"ch":3,"q":"Que fait le symbole `&` dans `function ajouter(int &$n)` ?","o":["Il rend le paramètre facultatif","Il concatène deux chaînes","Il type le paramètre en tableau","Il passe la variable par référence : la fonction modifie l'original"],"a":3,"e":"Par défaut, c'est une copie (passage par valeur). Les fonctions de tri utilisent le passage par référence, c'est pourquoi elles modifient le tableau."},
  {"ch":3,"q":"À quoi sert le mot-clé `static` dans une fonction ?","o":["À rendre la fonction accessible partout","À empêcher la récursivité","À typer le retour","À garder la valeur d'une variable locale d'un appel à l'autre"],"a":3,"e":"Une variable static n'est initialisée qu'une fois. Exemple : un numéro de commande qui augmente à chaque appel. Sans static, elle repart de zéro."},
  {"ch":3,"q":"Quelle est la différence entre une fonction anonyme avec `use` et une fonction fléchée `fn` ?","o":["La fléchée ne peut pas recevoir de paramètres","La closure ne peut pas être passée en argument","La fléchée capture automatiquement les variables extérieures, la closure les importe avec use","Aucune différence de syntaxe"],"a":2,"e":"fn($x) => expression (PHP 7.4) est une forme courte à une seule expression. La closure importe explicitement avec `use ($taux)`."},
  {"ch":3,"q":"Que doit toujours comporter une fonction récursive ?","o":["Un paramètre par référence","Un cas d'arrêt qui renvoie un résultat sans rappeler la fonction","Un tableau en paramètre","Une variable static"],"a":1,"e":"Sans cas d'arrêt, la fonction s'appelle indéfiniment jusqu'à épuisement de la mémoire. Exemple : `if ($n <= 1) return 1;` pour la factorielle."},
  // ---------- 4. Fichiers, sessions et cookies ----------
  {"ch":4,"q":"Quelle différence entre `include` et `require` quand le fichier est introuvable ?","o":["include émet un avertissement et le script continue, require déclenche une erreur fatale","Aucune","include arrête le script, require continue","require ignore le fichier"],"a":0,"e":"On utilise require_once pour les fichiers indispensables (config, fonctions) et require pour les fragments d'affichage (en-tête, pied de page)."},
  {"ch":4,"q":"Pourquoi utiliser `require_once` pour un fichier de fonctions ?","o":["Pour qu'il soit inclus une seule fois, sinon la redéfinition d'une fonction cause une erreur","Pour qu'il soit exécuté plus vite","Pour le rendre privé","Pour le charger côté client"],"a":0,"e":"Les variantes _once n'incluent le fichier qu'une fois, même si l'instruction est rencontrée plusieurs fois."},
  {"ch":4,"q":"Pourquoi écrire `require_once __DIR__ . '/inc/fonctions.php';` ?","o":["Pour télécharger le fichier","Pour inclure un dossier entier","Pour éviter l'extension .php","Pour utiliser un chemin absolu, correct quel que soit le script appelant"],"a":3,"e":"Un chemin relatif est interprété par rapport au premier script appelé, pas au fichier qui contient l'instruction. __DIR__ donne le dossier du fichier courant."},
  {"ch":4,"q":"Que fait `fopen($f, 'w')` si le fichier existe déjà ?","o":["Il ajoute à la fin","Il renvoie false","Il efface son contenu dès l'ouverture","Il l'ouvre en lecture seule"],"a":2,"e":"Le mode w vide le fichier. Pour un journal ou un livre d'or, on utilise a (append). Le mode x échoue si le fichier existe."},
  {"ch":4,"q":"Quel mode d'ouverture choisir pour ajouter des lignes à un journal sans effacer l'existant ?","o":["r","w","x","a"],"a":3,"e":"a (append) crée le fichier s'il n'existe pas et écrit à la fin. Avec file_put_contents, l'équivalent est l'option FILE_APPEND."},
  {"ch":4,"q":"Que fait `fopen($f, 'x')` si le fichier existe déjà ?","o":["Il l'écrase","Il ajoute à la fin","Il renvoie false (erreur)","Il le supprime"],"a":2,"e":"Le mode x ne crée que des nouveaux fichiers : si le fichier existe, l'ouverture échoue. On teste donc `=== false`."},
  {"ch":4,"q":"Que fait `file_put_contents($f, $data)` sans option supplémentaire ?","o":["Il ajoute à la fin du fichier","Il lit le fichier","Il remplace le contenu du fichier (en le créant si besoin)","Il renvoie toujours true"],"a":2,"e":"Sans FILE_APPEND, le contenu est remplacé. `FILE_APPEND | LOCK_EX` ajoute à la fin avec un verrou."},
  {"ch":4,"q":"À quoi sert l'option `LOCK_EX` ?","o":["Chiffrer le fichier","Rendre le fichier en lecture seule","Poser un verrou exclusif pendant l'écriture, pour que deux écritures simultanées ne se mélangent pas","Compresser les données"],"a":2,"e":"Utile pour un journal ou un fichier JSON modifié par plusieurs visiteurs en même temps."},
  {"ch":4,"q":"Que fait `json_decode($json, true)` ?","o":["Il convertit un tableau PHP en JSON","Il écrit un fichier JSON","Il convertit du JSON en tableau associatif","Il valide le JSON sans le convertir"],"a":2,"e":"Sans le second argument true, on obtient des objets. json_encode fait l'inverse (tableau vers texte JSON), avec JSON_PRETTY_PRINT pour la lisibilité."},
  {"ch":4,"q":"Que signifie « HTTP est un protocole sans état » ?","o":["Chaque requête est traitée indépendamment : le serveur ne garde aucun souvenir de la précédente","Il ne fonctionne qu'en local","Il ne transporte pas de données","Il est chiffré par défaut"],"a":0,"e":"Pour reconnaître un utilisateur d'une page à l'autre, le navigateur renvoie un identifiant : c'est le rôle des cookies, sur lesquels s'appuient les sessions."},
  {"ch":4,"q":"Où est stocké un cookie, et qui peut le modifier ?","o":["Chez le client (navigateur), lisible et modifiable par l'utilisateur","Sur le serveur, personne","Dans la base de données","Sur le serveur, l'administrateur seulement"],"a":0,"e":"Environ 4 Ko au maximum. Jamais de donnée sensible dans un cookie. Les données de sécurité vont en session."},
  {"ch":4,"q":"Pourquoi appeler `setcookie()` avant tout affichage ?","o":["Pour accélérer la page","Parce qu'elle lit le cookie","Parce qu'elle envoie un en-tête HTTP, qui doit précéder le contenu","Parce qu'elle ouvre une session"],"a":2,"e":"Même un simple espace avant `<?php` envoie déjà du contenu. Il en va de même pour header() et session_start()."},
  {"ch":4,"q":"Que fait l'option `httponly` d'un cookie ?","o":["Elle l'envoie seulement en HTTPS","Elle le rend permanent","Elle le rend inaccessible au JavaScript, ce qui limite son vol par une faille XSS","Elle empêche la lecture côté serveur"],"a":2,"e":"secure : envoi en HTTPS uniquement. samesite : limite l'envoi depuis d'autres sites (protection CSRF), Lax ou Strict."},
  {"ch":4,"q":"Que contient réellement le cookie `PHPSESSID` ?","o":["Toutes les données de session","Le mot de passe de l'utilisateur","La date d'expiration seulement","Seulement l'identifiant de session, les données restent sur le serveur"],"a":3,"e":"À chaque requête le navigateur renvoie l'identifiant, ce qui permet à PHP de retrouver `$_SESSION`."},
  {"ch":4,"q":"Où doit-on appeler `session_start()` ?","o":["Au début de chaque page qui utilise la session, avant tout affichage","Une seule fois dans le site","Seulement dans la page de connexion","À la fin du script"],"a":0,"e":"La fonction envoie un en-tête HTTP, donc elle doit précéder tout envoi de HTML."},
  {"ch":4,"q":"À quoi sert `session_regenerate_id(true)` juste après la connexion ?","o":["À empêcher la fixation de session (un pirate qui impose un identifiant connu)","À chiffrer le mot de passe","À prolonger la session de 24 minutes","À supprimer le cookie"],"a":0,"e":"On change l'identifiant au moment où l'utilisateur gagne des droits. Autres mesures : httponly, secure, samesite, expiration après inactivité, HTTPS."},
  {"ch":4,"q":"Quelle fonction faut-il utiliser pour stocker un mot de passe ?","o":["md5()","password_hash($mdp, PASSWORD_DEFAULT)","sha1()","base64_encode()"],"a":1,"e":"password_hash génère un sel et utilise bcrypt (empreinte de 60 caractères). MD5 et SHA-1 sont trop rapides, base64 n'est pas un hachage."},
  {"ch":4,"q":"Comment vérifier un mot de passe saisi ?","o":["En « déchiffrant » l'empreinte stockée","Avec password_verify($saisi, $empreinte)","En comparant `$saisi == $empreinte`","En refaisant md5($saisi)"],"a":1,"e":"Le hachage est à sens unique : on ne retrouve jamais le mot de passe. Sur « Mot de passe oublié », un site envoie un lien de réinitialisation."},
  {"ch":4,"q":"Pourquoi afficher « Identifiants incorrects » quel que soit l'échec (email inconnu ou mauvais mot de passe) ?","o":["Pour économiser du code","Parce que PHP ne distingue pas les deux cas","Pour ne pas révéler si l'adresse email existe","Pour accélérer la connexion"],"a":2,"e":"Un message précis aiderait un attaquant à lister les comptes existants."},
  // ---------- 5. Formulaires et upload ----------
  {"ch":5,"q":"Quels attributs de `<form>` déterminent l'envoi des données ?","o":["name et id","action et method","type et value","enctype et class"],"a":1,"e":"action : l'adresse du script qui traite les données. method : GET ou POST. Chaque champ est identifié par son attribut name."},
  {"ch":5,"q":"Que contient `$_GET` ?","o":["Les paramètres transmis dans l'URL, après le ?","Les données du corps d'une requête POST","Les cookies","Les fichiers envoyés"],"a":0,"e":"$_POST contient le corps de la requête, $_FILES les fichiers, $_COOKIE les cookies, $_SERVER les informations de requête."},
  {"ch":5,"q":"Dans quel cas utiliser GET plutôt que POST ?","o":["Pour envoyer un mot de passe","Pour envoyer un fichier","Pour une inscription","Pour lire : recherche, filtre, tri, pagination"],"a":3,"e":"GET est visible dans l'URL, mettable en favori, et ne doit jamais modifier de données. POST sert à modifier : inscription, connexion, ajout, suppression."},
  {"ch":5,"q":"POST chiffre-t-il les données envoyées ?","o":["Oui, toujours","Non : il évite seulement leur affichage dans l'URL, sans HTTPS elles circulent en clair","Oui, mais seulement les mots de passe","Oui avec enctype multipart"],"a":1,"e":"Seul HTTPS protège la transmission."},
  {"ch":5,"q":"Quel est le type des valeurs reçues dans `$_GET` et `$_POST` ?","o":["Le type du champ HTML (number donne int)","Des entiers si la valeur est numérique","Des booléens pour les cases à cocher","Toujours des chaînes de caractères"],"a":3,"e":"Même avec `type=\"number\"`, PHP reçoit une chaîne. On convertit si nécessaire : `(int) $_GET['page']`."},
  {"ch":5,"q":"Une case à cocher n'est pas cochée. Que reçoit PHP ?","o":["La valeur false","Rien : la clé est absente de `$_POST`, on teste avec isset()","Une chaîne vide","La valeur 0"],"a":1,"e":"Une case non cochée n'est pas transmise du tout. `$cgu = isset($_POST['cgu']);` donne un booléen sans avertissement."},
  {"ch":5,"q":"Que reçoit PHP pour des cases `name=\"langages[]\"` dont deux sont cochées ?","o":["Une chaîne avec les deux valeurs séparées par une virgule","Un tableau contenant les valeurs cochées","Seulement la dernière valeur","Une erreur"],"a":1,"e":"Le suffixe [] fait recevoir un tableau : `$langages = $_POST['langages'] ?? [];`."},
  {"ch":5,"q":"Comment un même script distingue-t-il l'affichage du formulaire de son traitement ?","o":["`isset($_GET)`","`file_exists('form.php')`","`$_FILES`","`$_SERVER['REQUEST_METHOD'] === 'POST'`"],"a":3,"e":"Au premier affichage la requête est en GET : seul le formulaire apparaît. Après envoi en POST, on traite."},
  {"ch":5,"q":"Que fait `trim()` sur une saisie ?","o":["Elle convertit en minuscules","Elle protège contre XSS","Elle supprime les espaces au début et à la fin","Elle chiffre la chaîne"],"a":2,"e":"C'est de la normalisation (filtrage), pas de la sécurité d'affichage. On l'applique à la réception."},
  {"ch":5,"q":"`filter_var(\"0\", FILTER_VALIDATE_INT)` renvoie 0. Comment tester que la validation a échoué ?","o":["`if (!$r)`","`if ($r == null)`","`if (empty($r))`","`if ($r === false)`"],"a":3,"e":"0 est un entier valide mais « faux » : avec `!$r` on rejetterait à tort un 0 valide. filter_var renvoie false si la valeur est invalide."},
  {"ch":5,"q":"Pourquoi la validation côté client (required, type=\"email\") ne suffit-elle pas ?","o":["L'utilisateur peut la contourner : la validation côté serveur est la seule garantie","Elle est trop lente","PHP l'ignore toujours","Elle est interdite"],"a":0,"e":"Never trust user input : tout ce qui vient du navigateur peut être modifié (inspecteur, requêtes manuelles). Le HTML5 améliore seulement le confort."},
  {"ch":5,"q":"Quel principe résume le traitement des données saisies ?","o":["Filtrer en sortie, échapper en entrée","Filtrer en entrée, échapper en sortie","Échapper deux fois pour être sûr","Ne rien faire si le formulaire est en POST"],"a":1,"e":"On nettoie et on valide à la réception, puis on échappe à l'affichage selon la destination (HTML, SQL, URL)."},
  {"ch":5,"q":"Quelle fonction utiliser pour afficher une saisie dans du HTML sans risque d'injection XSS ?","o":["strip_tags seulement","htmlspecialchars()","trim()","addslashes()"],"a":1,"e":"htmlspecialchars transforme `<script>` en `&lt;script&gt;`, qui s'affiche comme du texte au lieu de s'exécuter."},
  {"ch":5,"q":"Qu'est-ce qu'un formulaire « collant » ?","o":["Un formulaire qui ne peut pas être envoyé deux fois","Un formulaire sans validation","Un formulaire qui réaffiche les valeurs saisies après une erreur, sans jamais réafficher le mot de passe","Un formulaire en GET"],"a":2,"e":"On met la valeur dans l'attribut value, échappée avec htmlspecialchars. Chaque erreur s'affiche à côté du champ concerné."},
  {"ch":5,"q":"À quoi sert le motif Post / Redirect / Get ?","o":["À chiffrer le formulaire","À transformer POST en GET dans l'URL","À valider les données","À éviter qu'un rechargement (F5) renvoie le formulaire et crée un doublon"],"a":3,"e":"Après un POST réussi, on redirige (302) vers une page demandée en GET. Recharger cette page ne refait qu'un GET."},
  {"ch":5,"q":"Que faut-il écrire juste après `header('Location: merci.php');` ?","o":["`session_start();`","`exit;`","`echo 'ok';`","`return;` n'importe où"],"a":1,"e":"Sans exit, le script continue de s'exécuter après l'envoi de la redirection. header() doit aussi être appelé avant tout affichage."},
  {"ch":5,"q":"Qu'est-ce qu'un message flash ?","o":["Un message affiché en JavaScript","Un message enregistré en session avant la redirection, affiché une seule fois puis supprimé","Un message stocké dans un cookie permanent","Un message d'erreur PHP"],"a":1,"e":"La page de destination est une nouvelle requête : les variables précédentes ont disparu, d'où le passage par la session."},
  {"ch":5,"q":"Que faut-il dans le HTML pour qu'un fichier soit réellement transmis ?","o":["`method=\"post\"` et `enctype=\"multipart/form-data\"`","`method=\"get\"` seulement","`type=\"text\"` sur l'input","Rien de spécial"],"a":0,"e":"Sans enctype multipart/form-data, le fichier n'est pas transmis. Côté serveur, PHP décrit le fichier dans `$_FILES`."},
  {"ch":5,"q":"Pourquoi ne faut-il pas se fier à `$_FILES['photo']['type']` pour valider un upload ?","o":["Il est toujours vide","Il est réservé aux PDF","Il change à chaque requête","Name et type viennent du navigateur et peuvent être falsifiés : on lit le type réel avec finfo"],"a":3,"e":"Un fichier shell.php renommé photo.jpg annoncerait peut-être image/jpeg. On vérifie le code d'erreur, la taille, et le type réel (finfo + liste blanche)."},
  {"ch":5,"q":"Pourquoi renommer un fichier envoyé avec un nom aléatoire (`bin2hex(random_bytes(16))` et l'extension déduite du type réel) ?","o":["Pour gagner de la place","Pour ne jamais garder le nom d'origine, falsifiable, et éviter l'écrasement ou l'exécution d'un script","Pour compresser l'image","Pour la rendre privée"],"a":1,"e":"Une extension imposée par la liste blanche et un nom imprévisible empêchent d'enregistrer shell.php dans un dossier accessible. 16 octets donnent 32 caractères hexadécimaux."},
  {"ch":5,"q":"Quelle fonction déplace un fichier téléversé de son dossier temporaire vers son dossier définitif ?","o":["move_uploaded_file()","rename()","copy()","file_put_contents()"],"a":0,"e":"Un fichier temporaire non déplacé est supprimé à la fin de la requête. move_uploaded_file vérifie aussi qu'il provient bien d'un upload HTTP."},
  // ---------- 6. Prédire la sortie ----------
  {"ch":6,"q":"Que s'affiche-t-il ? `$i = 5; echo $i++; echo $i;`","o":["55","66","65","56"],"a":3,"e":"Post-incrémentation : echo affiche d'abord 5, puis $i passe à 6. Le second echo affiche 6. Résultat : 56."},
  {"ch":6,"q":"Que s'affiche-t-il ? `$j = 5; echo ++$j; echo $j;`","o":["66","65","55","56"],"a":0,"e":"Pré-incrémentation : $j passe à 6 avant l'affichage. Les deux echo affichent 6 : 66."},
  {"ch":6,"q":"Que s'affiche-t-il ? `echo '5' + '5'; echo '5' . '5';`","o":["1010","55","10","1055"],"a":3,"e":"`+` additionne les chaînes numériques : 10. `.` concatène : \"55\". Les deux affichages collés donnent 1055."},
  {"ch":6,"q":"Que s'affiche-t-il ? `$a = 3; $b = $a++ + 2; echo $a, $b;`","o":["35","46","45","55"],"a":2,"e":"$a++ vaut 3 dans l'expression : $b = 3 + 2 = 5. Ensuite $a passe à 4. On affiche 4 puis 5 : 45."},
  {"ch":6,"q":"Que s'affiche-t-il en PHP 8 ? `echo 'Prix: ' . 10 + 5;`","o":["Prix: 105","15","Prix: 15","Une erreur"],"a":2,"e":"Depuis PHP 8, l'addition est prioritaire sur la concaténation : 10 + 5 = 15, puis 'Prix: ' . 15. C'est le piège de la fiche saboteuse du chapitre 1."},
  {"ch":6,"q":"Que s'affiche-t-il ? `$t = [5, 3]; $t = sort($t); var_dump($t);`","o":["array(2) { 3, 5 }","NULL","bool(true)","array(0) { }"],"a":2,"e":"sort() trie le tableau par référence et renvoie true. En affectant ce résultat, on perd le tableau : $t vaut true."},
  {"ch":6,"q":"Que s'affiche-t-il ? `echo implode(',', array_keys(array_filter([5, 12, 3, 20], fn($x) => $x > 4)));`","o":["0,1,3","5,12,20","0,1,2","1,2,4"],"a":0,"e":"array_filter conserve les clés : les valeurs 5, 12 et 20 ont les clés 0, 1 et 3. Le trou à l'indice 2 reste."},
  {"ch":6,"q":"Que s'affiche-t-il ? `echo array_reduce([1, 2, 3, 4], fn($acc, $x) => $acc * $x, 1);`","o":["24","10","0","1"],"a":0,"e":"Départ à 1 : 1x1 = 1, x2 = 2, x3 = 6, x4 = 24. Avec 0 comme valeur de départ, on obtiendrait 0."},
  {"ch":6,"q":"Que s'affiche-t-il ? `function f(int $n) { $n += 10; } $a = 5; f($a); echo $a;`","o":["5","15","10","Une erreur"],"a":0,"e":"Passage par valeur : la fonction modifie une copie. $a reste à 5."},
  {"ch":6,"q":"Que s'affiche-t-il ? `function f(int &$n) { $n += 10; } $a = 5; f($a); echo $a;`","o":["15","5","10","Une erreur"],"a":0,"e":"Avec `&`, la fonction reçoit la variable elle-même : $a devient 15."},
  {"ch":6,"q":"Que s'affiche-t-il ? `function c() { static $n = 0; $n++; return $n; } c(); c(); echo c();`","o":["3","1","0","2"],"a":0,"e":"La variable static conserve sa valeur d'un appel à l'autre : 1, 2, puis 3 au troisième appel."},
  {"ch":6,"q":"Que s'affiche-t-il ? `echo match('3') { 3 => 'int', default => 'autre' };`","o":["int","3","autre","UnhandledMatchError"],"a":2,"e":"match utilise la comparaison stricte : la chaîne '3' n'est pas identique à l'entier 3. C'est la branche default qui répond. Avec switch (comparaison souple), on aurait int."},
  {"ch":6,"q":"Que s'affiche-t-il ? `switch (1) { case 1: echo 'A'; case 2: echo 'B'; break; case 3: echo 'C'; }`","o":["A","AB","ABC","B"],"a":1,"e":"Pas de break après le case 1 : chute dans le case 2, qui affiche B puis break. Résultat : AB."},
  {"ch":6,"q":"Que s'affiche-t-il ? `echo (int) '12.7abc', (int) 9.99;`","o":["129","12.79.99","1310","139"],"a":0,"e":"Le cast d'une chaîne lit jusqu'au premier caractère non numérique et tronque : 12. Le cast d'un réel tronque aussi (pas d'arrondi) : 9. Résultat : 129."},
  {"ch":6,"q":"Que s'affiche-t-il ? `echo 7 <=> 3, 3 <=> 7, 5 <=> 5;`","o":["1 -1 0","0-11","1-10","-101"],"a":2,"e":"7 <=> 3 vaut 1, 3 <=> 7 vaut -1, 5 <=> 5 vaut 0. Collés : 1, -1, 0 donnent 1-10."},
  {"ch":6,"q":"Que s'affiche-t-il ? `for ($i = 1; $i <= 7; $i++) { if ($i % 3 === 0) { continue; } echo $i; }`","o":["1245","12457","1234567","12"],"a":1,"e":"continue ignore les multiples de 3 (3 et 6) mais la boucle continue jusqu'à 7. Résultat : 12457."},
  {"ch":6,"q":"Que s'affiche-t-il ? `foreach ([12, 15, 4, 18, 9] as $n) { if ($n < 5) { echo 'stop' . $n; break; } echo $n; }`","o":["12154189","1215stop4","stop4","1215stop418stop9"],"a":1,"e":"On affiche 12 et 15, puis 4 est inférieur à 5 : « stop4 » puis break. 18 et 9 ne sont jamais lus."},
  {"ch":6,"q":"Que s'affiche-t-il ? `$a = [1, 2, 3]; foreach ($a as $v) { $v *= 2; } echo implode(',', $a);`","o":["1,2,3","2,4,6","1,2,6","Une erreur"],"a":0,"e":"foreach travaille sur une copie de chaque valeur : $v est modifié mais le tableau reste intact. Il faut utiliser `$a[$k] = ...` avec la clé (TP 3, exercice 1)."},
  {"ch":6,"q":"Que s'affiche-t-il ? `$taux = 0.5; $f = function (float $h) use ($taux) { return $h * (1 + $taux); }; $taux = 0.9; echo $f(10);`","o":["19","10","15","Une erreur"],"a":2,"e":"use importe la valeur de $taux au moment de la définition de la closure (0.5). Modifier $taux ensuite ne change rien : 10 x 1.5 = 15."},
  {"ch":6,"q":"Que s'affiche-t-il ? `$tva = 0.2; function g() { return isset($tva) ? 'vu' : 'inconnu'; } echo g();`","o":["vu","0.2","Une erreur fatale","inconnu"],"a":3,"e":"$tva est globale : une fonction ne la voit pas. isset($tva) est false à l'intérieur (sans avertissement), d'où « inconnu »."},
  {"ch":6,"q":"Que s'affiche-t-il ? `function a() { echo 'A'; return false; } function b() { echo 'B'; return true; } if (a() && b()) {} echo '|'; if (b() || a()) {}`","o":["AB|BA","AB|B","A|B","A|BA"],"a":2,"e":"Court-circuit : a() est faux donc b() n'est pas appelé (A). Puis b() est vrai donc a() n'est pas appelé (B). Résultat : A|B."}
];

window.QA = [
  {"ch":1,"q":"Expliquez l'architecture client-serveur et le trajet d'une requête vers une page PHP.","a":"<p>Le client (navigateur) envoie une requête HTTP. Le serveur web (Apache) trouve le fichier .php, le confie à l'interpréteur PHP qui l'exécute (en interrogeant éventuellement MySQL), puis renvoie une réponse HTML au navigateur.</p><p>Le navigateur ne reçoit que du HTML : il ne voit jamais le code PHP.</p>","tip":"Cinq étapes : requête GET, Apache, interpréteur PHP, (SQL), réponse HTML."},
  {"ch":1,"q":"Qu'est-ce que HTTP ? Citez deux méthodes et trois codes de statut.","a":"<p>HTTP est le protocole de communication du Web : le client envoie une requête (méthode, URL, en-têtes), le serveur renvoie une réponse (code de statut, en-têtes, contenu). HTTPS est la version chiffrée.</p><ul><li>Méthodes : <code>GET</code> (lire), <code>POST</code> (envoyer des données).</li><li>Codes : <code>200</code> OK, <code>301/302</code> redirection, <code>403</code> accès refusé, <code>404</code> introuvable, <code>500</code> erreur du serveur.</li></ul>"},
  {"ch":1,"q":"Différence entre site statique et site dynamique, entre langage côté serveur et côté client ?","a":"<p>Un site statique envoie des fichiers HTML écrits à l'avance, identiques pour tous. Un site dynamique construit la page à la demande, selon le visiteur ou la base de données.</p><p>Un langage côté serveur (PHP, Java, Python, Node.js) s'exécute sur le serveur. Un langage côté client (JavaScript) s'exécute dans le navigateur après réception de la page.</p>"},
  {"ch":1,"q":"Quels composants faut-il pour développer en PHP en local, et que choisit-on dans le cours ?","a":"<p>Un serveur web (Apache ou Nginx), l'interpréteur PHP, un SGBD (MySQL ou MariaDB), un éditeur de code et un navigateur. Le cours utilise XAMPP, qui regroupe Apache, MariaDB, PHP et phpMyAdmin.</p><p>Les scripts se placent dans <code>htdocs</code> et s'ouvrent via <code>http://localhost/...</code>.</p>","tip":"Jamais de double-clic sur un fichier .php : adresse file:/// et code non exécuté."},
  {"ch":1,"q":"Expliquez le typage dynamique de PHP et les fonctions isset, empty, unset, is_null.","a":"<p>Le type d'une variable est déduit de sa valeur et peut changer en cours d'exécution. PHP convertit automatiquement (type juggling) : <code>\"10\" + 5</code> donne 15.</p><ul><li><code>isset($x)</code> : existe et n'est pas null.</li><li><code>empty($x)</code> : absente ou vide (\"\", \"0\", 0, 0.0, null, false, []).</li><li><code>unset($x)</code> : supprime la variable.</li><li><code>is_null($x)</code> : vaut null.</li></ul>","tip":"empty() juge 0 et \"0\" vides : piège pour une note de 0."},
  {"ch":1,"q":"Que se passe-t-il quand une chaîne est utilisée dans un calcul ? (règles PHP 8)","a":"<ul><li>Chaîne numérique (\"10\", \"3.5\") : conversion sans erreur.</li><li>Chaîne qui commence par un nombre (\"10 pommes\") : on utilise ce nombre, avec un Warning.</li><li>Chaîne non numérique (\"abc\", \"\") : TypeError, le script s'arrête.</li></ul><p>Ne pas confondre <code>+</code> (addition) et <code>.</code> (concaténation) : <code>\"5\" + 5</code> donne 10, <code>\"5\" . 5</code> donne \"55\".</p>","tip":"is_numeric() permet de vérifier une chaîne avant le calcul."},
  {"ch":1,"q":"Citez les trois types d'erreurs PHP vus en cours et leur effet.","a":"<ul><li>Parse error : erreur de syntaxe, aucune instruction n'est exécutée.</li><li>Fatal error : une instruction est impossible, le script s'arrête à cet endroit.</li><li>Warning : problème non bloquant (variable non définie), le script continue.</li></ul><p>En développement : <code>display_errors = On</code> et <code>error_reporting = E_ALL</code>. En production, on journalise au lieu d'afficher.</p>"},
  {"ch":2,"q":"Différence entre == et === ? Que recommande le cours ?","a":"<p><code>==</code> convertit les types avant de comparer (<code>1 == \"1\"</code> est vrai, <code>\"1e3\" == \"1000\"</code> aussi). <code>===</code> compare la valeur et le type, sans conversion.</p><p>Bonne pratique : utiliser <code>===</code> et <code>!==</code> par défaut.</p>"},
  {"ch":2,"q":"Quelles valeurs PHP considère-t-il comme fausses ?","a":"<p><code>false</code>, <code>0</code>, <code>0.0</code>, <code>\"\"</code>, <code>\"0\"</code>, le tableau vide <code>[]</code> et <code>null</code>. Tout le reste est vrai, y compris la chaîne \"false\".</p>","tip":"Même liste que pour empty() : c'est le même ensemble de valeurs vides."},
  {"ch":2,"q":"Comparez switch et match.","a":"<ul><li><code>switch</code> : instruction, comparaison souple, break nécessaire, plusieurs instructions par case, rien si aucun cas ne correspond.</li><li><code>match</code> (PHP 8) : expression qui renvoie une valeur, comparaison stricte, pas de chute, une seule expression par branche, erreur (UnhandledMatchError) sans correspondance.</li></ul><p>Pour associer un code à un libellé, on préfère match, avec <code>match (true)</code> pour les intervalles.</p>"},
  {"ch":2,"q":"Quand utiliser for, while, do ... while, foreach ?","a":"<ul><li><code>for</code> : nombre de tours connu.</li><li><code>while</code> : on répète tant qu'une condition est vraie, nombre de tours inconnu.</li><li><code>do ... while</code> : comme while, mais au moins un tour.</li><li><code>foreach</code> : parcourir un tableau.</li></ul>"},
  {"ch":2,"q":"Expliquez break et continue, et les causes d'une boucle infinie.","a":"<p><code>break</code> interrompt la boucle (<code>break 2;</code> sort de deux boucles imbriquées). <code>continue</code> saute à l'itération suivante.</p><p>Une boucle infinie vient d'une condition qui ne devient jamais fausse : oubli de l'incrémentation, ou variable qui évolue dans le mauvais sens. PHP coupe le script au bout de max_execution_time (30 s).</p>","tip":"Avant d'écrire une boucle : qu'est-ce qui la fait s'arrêter ?"},
  {"ch":2,"q":"À quoi servent l'opérateur ternaire, la coalescence nulle et la syntaxe alternative ?","a":"<ul><li>Ternaire : <code>cond ? a : b</code>, un if/else qui produit une valeur.</li><li>Coalescence nulle : <code>$x ?? défaut</code>, valeur par défaut sans avertissement (<code>??=</code> en forme courte).</li><li>Syntaxe alternative : <code>if (...): ... endif;</code>, plus lisible dans les vues HTML.</li></ul>"},
  {"ch":3,"q":"Quels sont les trois types de tableaux en PHP ?","a":"<ul><li>Indexé : clés entières à partir de 0.</li><li>Associatif : clés chaînes choisies par le programmeur.</li><li>Multidimensionnel : éléments eux-mêmes des tableaux, par exemple une liste d'étudiants décrits par des tableaux associatifs.</li></ul><p>C'est la forme des résultats d'une requête SQL.</p>"},
  {"ch":3,"q":"Comment trier un tableau ? Citez les fonctions et l'erreur fréquente.","a":"<ul><li><code>sort/rsort</code> : par valeur, renumérotent les clés (tableaux indexés).</li><li><code>asort/arsort</code> : par valeur, gardent les clés.</li><li><code>ksort/krsort</code> : par clé.</li><li><code>usort</code> : tri personnalisé avec une fonction qui renvoie un nombre (<code>&lt;=&gt;</code>).</li></ul><p>Erreur fréquente : <code>$t = sort($t);</code>, car sort renvoie true.</p>"},
  {"ch":3,"q":"Expliquez array_map, array_filter et array_reduce.","a":"<ul><li><code>array_map(fonction, tableau)</code> : transforme chaque élément, même nombre d'éléments, clés conservées.</li><li><code>array_filter(tableau, fonction)</code> : garde les éléments pour lesquels la callback renvoie true, clés conservées.</li><li><code>array_reduce(tableau, fonction, départ)</code> : combine tous les éléments en une seule valeur.</li></ul>","tip":"L'ordre des arguments diffère : map(fonction, tableau), filter(tableau, fonction)."},
  {"ch":3,"q":"Décrivez l'anatomie d'une fonction PHP typée.","a":"<p><code>function prixTTC(float $prixHT, float $tva = 0.20): float { return $prixHT * (1 + $tva); }</code></p><ul><li>Mot-clé <code>function</code>, nom en verbe et camelCase.</li><li>Paramètres typés, avec valeur par défaut placée après les autres.</li><li>Type de retour après les deux-points, <code>return</code> renvoie le résultat.</li><li>Appels : positionnels ou avec arguments nommés (PHP 8).</li></ul>"},
  {"ch":3,"q":"Passage par valeur ou par référence ? Que dit la portée des variables ?","a":"<p>Par défaut, la fonction reçoit une copie : modifier le paramètre ne change pas l'original. Avec <code>&amp;</code> (<code>int &amp;$n</code>), elle modifie la variable d'origine. Les fonctions de tri utilisent ce mécanisme.</p><p>Une variable créée dans une fonction est locale. Une variable globale n'est pas visible dans les fonctions : on la passe en paramètre. <code>static</code> garde une valeur d'un appel à l'autre.</p>"},
  {"ch":3,"q":"Fonction anonyme, closure, fonction fléchée : quelles différences et quel usage ?","a":"<p>Une fonction anonyme n'a pas de nom et se passe en argument (callback). Une closure importe des variables extérieures avec <code>use</code>. La fonction fléchée <code>fn($x) =&gt; expression</code> (PHP 7.4) capture automatiquement ces variables.</p><p>Usage principal : callbacks de <code>array_map</code>, <code>array_filter</code>, <code>usort</code>, et routes Laravel.</p>"},
  {"ch":3,"q":"Qu'est-ce que la récursivité ? Donnez un exemple et la règle à respecter.","a":"<p>Une fonction récursive s'appelle elle-même. Elle doit avoir un cas d'arrêt qui renvoie un résultat sans rappel.</p><p>Exemple : <code>factorielle($n)</code> renvoie 1 si <code>$n &lt;= 1</code>, sinon <code>$n * factorielle($n - 1)</code>. Adaptée aux arborescences (menu à plusieurs niveaux, dossiers).</p>","tip":"Sans cas d'arrêt : appels infinis jusqu'à épuisement de la mémoire."},
  {"ch":4,"q":"Différence entre include, require, include_once et require_once ?","a":"<ul><li><code>include</code> : fichier introuvable, avertissement, le script continue.</li><li><code>require</code> : fichier introuvable, erreur fatale.</li><li><code>_once</code> : inclus une seule fois (indispensable pour un fichier de fonctions).</li></ul><p>On construit les chemins avec <code>__DIR__ . '/inc/...'</code>.</p>"},
  {"ch":4,"q":"Citez les modes d'ouverture de fopen et leurs effets.","a":"<ul><li><code>r</code> : lecture, erreur si absent.</li><li><code>w</code> : écriture, contenu EFFACÉ, fichier créé si absent.</li><li><code>a</code> : ajout à la fin, créé si absent.</li><li><code>x</code> : création seulement, erreur si le fichier existe.</li><li>Variantes avec <code>+</code> : lecture et écriture.</li></ul>","tip":"Pour un journal : mode a. Piège classique : w efface tout."},
  {"ch":4,"q":"Comment lire et écrire des fichiers CSV et JSON ?","a":"<ul><li>CSV : <code>fputcsv()</code> écrit une ligne, <code>fgetcsv()</code> lit une ligne sous forme de tableau.</li><li>JSON : <code>json_encode()</code> (tableau vers texte, avec JSON_PRETTY_PRINT) et <code>json_decode($json, true)</code> (texte vers tableau associatif).</li><li>Écriture : <code>file_put_contents($f, $data, FILE_APPEND | LOCK_EX)</code>.</li></ul><p>Tester les erreurs avec <code>file_exists</code>, <code>is_readable</code> et <code>=== false</code>.</p>"},
  {"ch":4,"q":"Pourquoi HTTP est-il sans état, et comment les cookies et les sessions y remédient-ils ?","a":"<p>Chaque requête est traitée indépendamment : le serveur ne se souvient pas de la précédente. Le navigateur doit donc renvoyer un identifiant à chaque requête.</p><p>Un cookie est une petite donnée stockée chez le client. Une session conserve les données sur le serveur et n'envoie au navigateur que l'identifiant (cookie <code>PHPSESSID</code>).</p>"},
  {"ch":4,"q":"Cookie ou session : que stocke-t-on où ?","a":"<ul><li>Cookie : chez le client, lisible et modifiable, jusqu'à 4 Ko, peut survivre à la fermeture : préférences, langue, « se souvenir de moi ».</li><li>Session : sur le serveur, inaccessible à l'utilisateur, expire après inactivité ou déconnexion : authentification, panier, droits.</li></ul>","tip":"Tout ce qui touche à la sécurité va en session, jamais dans un cookie."},
  {"ch":4,"q":"Comment sécuriser les cookies et les sessions ?","a":"<ul><li>Cookie : options <code>httponly</code>, <code>secure</code>, <code>samesite</code> (Lax ou Strict).</li><li>Session : <code>session_regenerate_id(true)</code> après la connexion (fixation de session), limite d'inactivité, HTTPS en production.</li><li>Déconnexion complète : vider <code>$_SESSION</code>, <code>session_destroy()</code>, supprimer le cookie de session.</li></ul>"},
  {"ch":4,"q":"Comment stocker et vérifier un mot de passe ?","a":"<p>On ne stocke jamais le mot de passe en clair ni en MD5. On enregistre <code>password_hash($mdp, PASSWORD_DEFAULT)</code> (bcrypt, sel automatique, 60 caractères) et on vérifie avec <code>password_verify($saisi, $empreinte)</code>.</p><p>Le hachage est à sens unique : deux appels donnent deux empreintes différentes. En cas d'échec, on affiche un message vague (« Identifiants incorrects »).</p>"},
  {"ch":5,"q":"Comparez GET et POST.","a":"<ul><li>GET : données dans l'URL, visibles, taille limitée, favori et rechargement sans risque. Pour lire (recherche, tri, pagination). Ne modifie jamais de données.</li><li>POST : données dans le corps, absentes de l'URL, pas de limite pratique. Pour modifier (inscription, connexion) et pour mots de passe et fichiers.</li></ul><p>POST ne chiffre rien : sans HTTPS, tout circule en clair.</p>"},
  {"ch":5,"q":"Comment récupère-t-on les différents types de champs dans $_POST ?","a":"<ul><li>Texte, email, number : une chaîne (vide si rien saisi).</li><li>Radio : la value du bouton coché, ou rien.</li><li>Select : la value de l'option choisie.</li><li>Case à cocher : absente si non cochée, donc <code>isset()</code>.</li><li>Choix multiples : <code>name=\"langages[]\"</code> donne un tableau.</li></ul>","tip":"Toujours une valeur par défaut avec ?? pour éviter les avertissements."},
  {"ch":5,"q":"Pourquoi valider côté serveur ? Quelles fonctions utiliser ?","a":"<p>Tout ce qui vient du navigateur peut être modifié : la validation HTML5 (required, type=\"email\") améliore le confort mais se contourne. Seule la validation PHP est une garantie.</p><p>Outils : <code>trim()</code>, conversion de type, <code>filter_var()</code> (FILTER_VALIDATE_EMAIL, INT avec min_range et max_range), <code>in_array</code> sur une liste blanche. Tester avec <code>=== false</code>.</p>"},
  {"ch":5,"q":"Expliquez « filtrer en entrée, échapper en sortie » et le risque XSS.","a":"<p>À la réception on nettoie et on valide. À l'affichage on échappe selon la destination, en HTML avec <code>htmlspecialchars()</code>.</p><p>Sans échappement, une saisie comme un script serait exécutée dans le navigateur d'un autre utilisateur (faille XSS).</p>"},
  {"ch":5,"q":"Qu'est-ce que le motif PRG et un message flash ?","a":"<p>Post / Redirect / Get : après un POST réussi, on redirige (<code>header('Location: ...'); exit;</code>) vers une page en GET. Recharger la page ne renvoie plus le formulaire, donc pas de doublon.</p><p>Message flash : message mis en session avant la redirection, affiché une fois par la page suivante puis supprimé avec <code>unset</code>.</p>"},
  {"ch":5,"q":"Comment sécuriser l'upload d'un fichier ?","a":"<p>Formulaire en POST avec <code>enctype=\"multipart/form-data\"</code> et <code>$_FILES</code>. Vérifications dans l'ordre :</p><ul><li>code d'erreur égal à <code>UPLOAD_ERR_OK</code> ;</li><li>taille maximale ;</li><li>type réel lu avec <code>finfo</code>, liste blanche ;</li><li>nom aléatoire, extension déduite du type réel, jamais le nom d'origine ;</li><li><code>move_uploaded_file()</code> vers le dossier définitif.</li></ul>","tip":"name et type de $_FILES sont fournis par le navigateur : falsifiables."}
];

// ---------- 7. Test type fourni par l'étudiant (réponses vérifiées en exécutant le code)
window.SITE.chapters[7] = 'Test type';
Array.prototype.push.apply(window.QCM, [
 {
  "ch": 7,
  "q": "Test type, question 1 : Qu'affiche ce code ? `$v = filter_var(\"0\", FILTER_VALIDATE_INT); echo !$v ? \"A\" : \"B\"; echo $v === false ? \"C\" : \"D\";`",
  "o": [
   "AD",
   "BD",
   "BC",
   "AC"
  ],
  "a": 0,
  "e": "`filter_var(\"0\", FILTER_VALIDATE_INT)` renvoie l'entier `0` : la valeur est valide. Comme `0` est « falsy », `!$v` est vrai : on affiche A. Mais `0 === false` est faux (types différents) : on affiche D."
 },
 {
  "ch": 7,
  "q": "Test type, question 2 : Qu'affiche ce code ? `$s = \"PHP\"; echo $s[0] . strlen($s) . strtolower($s);`",
  "o": [
   "P3PHP",
   "p3php",
   "PHP3php",
   "P3php"
  ],
  "a": 3,
  "e": "`$s[0]` est le premier caractère (« P »), `strlen` donne 3, `strtolower` met en minuscules (« php »). On concatène : P3php."
 },
 {
  "ch": 7,
  "q": "Test type, question 3 : Qu'affiche ce code ? `$i = 5; while ($i > 0) { $i -= 2; } echo $i;`",
  "o": [
   "Une boucle infinie",
   "1",
   "-1",
   "0"
  ],
  "a": 2,
  "e": "`$i` vaut 5, puis 3, puis 1, puis -1. À -1 la condition `$i > 0` est fausse : la boucle s'arrête et on affiche -1. Faites une trace sur papier."
 },
 {
  "ch": 7,
  "q": "Test type, question 4 : Qu'affiche ce code ? `var_dump(is_numeric(\"12.5\"), is_int(\"12\"));`",
  "o": [
   "bool(true) bool(false)",
   "bool(false) bool(false)",
   "bool(true) bool(true)",
   "bool(false) bool(true)"
  ],
  "a": 0,
  "e": "`is_numeric` teste le contenu : « 12.5 » est un nombre, donc true. `is_int` teste le type : « 12 » est une chaîne, donc false."
 },
 {
  "ch": 7,
  "q": "Test type, question 5 : Qu'affiche ce code ? `$total = 10; function ajouter($n) { $total = $n + 1; return $total; } echo ajouter(5) + $total;`",
  "o": [
   "12",
   "16",
   "21",
   "6"
  ],
  "a": 1,
  "e": "Le `$total` de la fonction est une variable locale : `ajouter(5)` renvoie 6 et ne touche pas au `$total` global (10). Résultat : 6 + 10 = 16."
 },
 {
  "ch": 7,
  "q": "Test type, question 6 : Qu'affiche ce code ? `$x = \"10\"; $y = $x + \"5.5\"; var_dump($y);`",
  "o": [
   "int(15)",
   "string(6) \"105.5\"",
   "float(15.5)",
   "string(4) \"15.5\""
  ],
  "a": 2,
  "e": "`+` additionne : les deux chaînes numériques sont converties. « 5.5 » est décimal, le résultat est donc un `float` : 15.5."
 },
 {
  "ch": 7,
  "q": "Test type, question 7 : Qu'affiche ce code ? `$notes = [\"Ali\" => 8, \"Sara\" => 15, \"Omar\" => 12]; $ok = array_filter($notes, fn($n) => $n >= 10); echo implode(\", \", array_keys($ok));`",
  "o": [
   "Ali",
   "15, 12",
   "Sara",
   "Sara, Omar"
  ],
  "a": 3,
  "e": "`array_filter` garde les notes d'au moins 10 en conservant les clés : Sara et Omar. `array_keys` donne les noms, `implode` les relie par « , »."
 },
 {
  "ch": 7,
  "q": "Test type, question 8 : Qu'affiche ce code ? `$a = \"3\"; $b = \"4\"; echo $a . $b . ($a + $b);`",
  "o": [
   "77",
   "34",
   "347",
   "3 4 7"
  ],
  "a": 2,
  "e": "`$a . $b` donne « 34 » ; `($a + $b)`, entre parenthèses, vaut 7. On concatène : 347."
 },
 {
  "ch": 7,
  "q": "Test type, question 9 : Qu'affiche ce code ? `$h = password_hash(\"Sara2026\", PASSWORD_DEFAULT); var_dump(password_verify(\"sara2026\", $h), strlen($h));`",
  "o": [
   "bool(false) int(60)",
   "bool(true) int(32)",
   "bool(false) int(8)",
   "bool(true) int(60)"
  ],
  "a": 0,
  "e": "`password_verify` distingue les majuscules : « sara2026 » n'est pas « Sara2026 », donc false. Un hachage bcrypt fait toujours 60 caractères."
 },
 {
  "ch": 7,
  "q": "Test type, question 10 : Le fichier `inc/auth.php` contient `require __DIR__ . '/config.php';`. Ce fichier est inclus depuis `index.php`, situé à la racine du site. Quel fichier est chargé ? `require __DIR__ . '/config.php';`",
  "o": [
   "config.php à la racine du site",
   "inc/config.php",
   "Aucun : __DIR__ ne fonctionne pas dans un fichier inclus",
   "inc/inc/config.php"
  ],
  "a": 1,
  "e": "`__DIR__` est le dossier du fichier qui contient l'instruction, c'est-à-dire `inc`. Le fichier chargé est donc `inc/config.php`. Vérifié : avec `__DIR__` on charge `inc/config.php` ; avec un simple `require 'config.php'`, PHP trouve celui de la racine."
 },
 {
  "ch": 7,
  "q": "Test type, question 11 : Qu'affiche ce code ? `$u = json_decode('{\"nom\": \"Sara\", \"notes\": [12, 16]}', true); echo $u[\"nom\"] . \" \" . $u[\"notes\"][1];`",
  "o": [
   "Une erreur : $u est un objet",
   "Sara 16",
   "Sara 12",
   "nom 16"
  ],
  "a": 1,
  "e": "Avec `true` en second argument, `json_decode` renvoie un tableau associatif : `$u[\"nom\"]` vaut « Sara » et `$u[\"notes\"][1]` (indice 1, le deuxième) vaut 16."
 },
 {
  "ch": 7,
  "q": "Test type, question 12 : Qu'affiche ce code ? `var_dump(filter_var(\"17\", FILTER_VALIDATE_INT, [\"options\" => [\"min_range\" => 18]]));`",
  "o": [
   "int(18)",
   "int(17)",
   "bool(false)",
   "string(2) \"17\""
  ],
  "a": 2,
  "e": "17 est inférieur à `min_range` 18 : la valeur est refusée, `filter_var` renvoie `false`."
 },
 {
  "ch": 7,
  "q": "Test type, question 14 : Quelle affirmation décrit un site dynamique ?",
  "o": [
   "Il ne fonctionne qu'avec une connexion HTTPS",
   "Ses pages contiennent des animations CSS ou JavaScript",
   "Ses pages sont produites par le serveur à chaque requête, par exemple à partir d'une base de données",
   "Ses pages HTML sont écrites à l'avance et envoyées telles quelles"
  ],
  "a": 2,
  "e": "Un site dynamique construit ses pages sur le serveur au moment de la demande (programme PHP, base de données). La dernière réponse décrit un site statique."
 },
 {
  "ch": 7,
  "q": "Test type, question 15 : Le fichier `a.txt` contient `ABC`. Que contient-il après ce code ? `file_put_contents(\"a.txt\", \"ABC\"); $f = fopen(\"a.txt\", \"a\"); fwrite($f, \"Z\"); fclose($f); echo file_get_contents(\"a.txt\");`",
  "o": [
   "ZABC",
   "ZBC",
   "Z",
   "ABCZ"
  ],
  "a": 3,
  "e": "Le mode `a` (append) ajoute à la fin sans effacer : « ABC » devient « ABCZ ». Le mode `w` aurait effacé le contenu et laissé « Z »."
 },
 {
  "ch": 7,
  "q": "Test type, question 16 : Qu'affiche ce code ? `foreach ([1, 2, 3, 4, 5] as $v) { if ($v == 2) continue; if ($v == 4) break; echo $v; }`",
  "o": [
   "1345",
   "135",
   "1",
   "13"
  ],
  "a": 3,
  "e": "À 1 : affiché. À 2 : `continue` saute l'affichage. À 3 : affiché. À 4 : `break` quitte la boucle. Résultat : 13."
 },
 {
  "ch": 7,
  "q": "Test type, question 17 : Qu'affiche ce code ? `$t = [\"a\" => 1, \"b\" => 2]; foreach ($t as $k => $v) { echo $k . $v; }`",
  "o": [
   "a1b2",
   "1a2b",
   "ab12",
   "12"
  ],
  "a": 0,
  "e": "`foreach ($t as $k => $v)` donne d'abord la clé, puis la valeur : « a » puis 1, « b » puis 2. On affiche `$k . $v` : a1b2."
 },
 {
  "ch": 7,
  "q": "Test type, question 19 : Qu'affiche ce code ? `$note = 10; if ($note > 10) { echo \"A\"; } elseif ($note >= 10) { echo \"B\"; } else { echo \"C\"; }`",
  "o": [
   "AB",
   "C",
   "A",
   "B"
  ],
  "a": 3,
  "e": "`10 > 10` est faux (strict). Le `elseif` teste `10 >= 10`, vrai : on affiche B, et seul ce bloc s'exécute."
 },
 {
  "ch": 7,
  "q": "Test type, question 20 : Le formulaire a envoyé `$_POST = [\"options\" => [\"repas\", \"attestation\"]]`. Qu'affiche ce code ? `$_POST = [\"options\" => [\"repas\", \"attestation\"]]; $o = $_POST[\"options\"] ?? []; echo count($o) . (in_array(\"repas\", $o) ? \"oui\" : \"non\");`",
  "o": [
   "1oui",
   "2oui",
   "2non",
   "Une erreur : options est une chaîne"
  ],
  "a": 1,
  "e": "Les cases à cocher partageant un `name` terminé par `[]` arrivent sous forme de tableau : `count` vaut 2 et `in_array(\"repas\", ...)` est vrai : 2oui."
 },
 {
  "ch": 7,
  "q": "Test type, question 21 : Qu'affiche ce code ? `$e = [ [\"nom\" => \"Ali\", \"notes\" => [12, 15]], [\"nom\" => \"Sara\", \"notes\" => [18]], ]; echo $e[1][\"nom\"] . $e[0][\"notes\"][1];`",
  "o": [
   "Ali15",
   "Sara12",
   "Sara15",
   "Ali18"
  ],
  "a": 2,
  "e": "`$e[1][\"nom\"]` : deuxième étudiant (indice 1), « Sara ». `$e[0][\"notes\"][1]` : premier étudiant, deuxième note, 15. Résultat : Sara15."
 },
 {
  "ch": 7,
  "q": "Test type, question 22 : Lorsqu'un navigateur demande `http://localhost/tp1/index.php`, qui transmet le fichier `index.php` à l'interpréteur PHP ?",
  "o": [
   "Le serveur web Apache",
   "Le navigateur",
   "Le système d'exploitation du client",
   "Le serveur MySQL"
  ],
  "a": 0,
  "e": "Le navigateur envoie la requête ; Apache trouve le fichier dans `htdocs` et, voyant l'extension `.php`, le confie à l'interpréteur PHP. Le navigateur ne reçoit que le HTML produit."
 },
 {
  "ch": 7,
  "q": "Test type, question 23 : Le fichier inclus n'existe pas. Quelle est la différence entre `include` et `require` ?",
  "o": [
   "require provoque une erreur fatale et arrête le script ; include affiche un avertissement et continue",
   "Les deux arrêtent le script",
   "include provoque une erreur fatale ; require affiche un avertissement et continue",
   "Aucune : les deux ignorent le fichier manquant"
  ],
  "a": 0,
  "e": "`include` : avertissement (Warning), le script continue. `require` : erreur fatale, le script s'arrête. Vérifié : avec `include` la ligne suivante s'exécute, avec `require` elle n'est jamais atteinte."
 },
 {
  "ch": 7,
  "q": "Test type, question 24 : Qu'affiche ce code ? `file_put_contents(\"t.txt\", \"un\\ndeux\\ntrois\"); $f = fopen(\"t.txt\", \"r\"); fgets($f); echo fgets($f); fclose($f);`",
  "o": [
   "trois",
   "un",
   "deux",
   "undeux"
  ],
  "a": 2,
  "e": "Chaque `fgets` lit la ligne suivante. Le premier appel lit « un » (résultat ignoré), le second lit « deux » : c'est lui qu'on affiche."
 },
 {
  "ch": 7,
  "q": "Test type, question 27 : Qu'affiche ce code ? `$jour = \"sam\"; switch ($jour) { case \"sam\": case \"dim\": echo \"week-end\"; break; default: echo \"semaine\"; }`",
  "o": [
   "week-end",
   "week-endsemaine",
   "Rien",
   "semaine"
  ],
  "a": 0,
  "e": "« sam » correspond au premier `case`, qui est vide : l'exécution « tombe » dans le `case` suivant, jusqu'au `break`. On affiche week-end, sans passer par `default`."
 },
 {
  "ch": 7,
  "q": "Test type, question 30 : Qu'affiche ce code ? (le tableau est absent du texte reçu : `$t =;`) `$t = [3, 10, 7]; usort($t, fn($a, $b) => $b <=> $a); echo implode(\",\", $t);`",
  "o": [
   "3,10,7",
   "10,7,3",
   "7,10,3",
   "3,7,10"
  ],
  "a": 1,
  "e": "`fn($a, $b) => $b  $a` compare à l'envers : tri décroissant. Le tableau manque dans le texte, mais les quatre réponses ne contiennent que 3, 7 et 10 : testé avec les six ordres possibles, le résultat est toujours 10,7,3."
 }
]);

// ---------- 8. QCM complet (code exécuté sur PHP 8.0 et 8.5, cours)
window.SITE.chapters[8] = 'QCM complet';
Array.prototype.push.apply(window.QCM, [
 {
  "ch": 8,
  "q": "Qu'affiche ce code ? `echo strlen(\"Éa\");`",
  "o": [
   "1",
   "4",
   "2",
   "3"
  ],
  "a": 3,
  "e": "`strlen` compte les octets, pas les caractères. Dans un fichier en UTF-8, « É » occupe 2 octets et « a » 1 : on obtient 3. Pour compter les caractères, il faut `mb_strlen` (extension mbstring)."
 },
 {
  "ch": 8,
  "q": "Qu'affiche ce code ? `echo ucfirst(strtolower(\"SARA\")) . strrev(\"abc\");`",
  "o": [
   "Saracba",
   "Saraabc",
   "sARAcba",
   "SARAcba"
  ],
  "a": 0,
  "e": "`strtolower` donne « sara », `ucfirst` met la première lettre en majuscule (« Sara »), `strrev` inverse « abc » en « cba ». Concaténation : Saracba."
 },
 {
  "ch": 8,
  "q": "Qu'affiche ce code ? `echo str_replace(\"a\", \"o\", \"banane\");`",
  "o": [
   "bonone",
   "bonane",
   "banone",
   "bonona"
  ],
  "a": 0,
  "e": "`str_replace` remplace toutes les occurrences, pas seulement la première : « banane » devient « bonone »."
 },
 {
  "ch": 8,
  "q": "Qu'affiche ce code ? `echo substr(\"abcdef\", 2, 3) . substr(\"abcdef\", -2);`",
  "o": [
   "cdefe",
   "cdeab",
   "cdeef",
   "bcdef"
  ],
  "a": 2,
  "e": "`substr($s, 2, 3)` part à l'indice 2 et prend 3 caractères : « cde ». Un indice négatif compte depuis la fin : `substr($s, -2)` donne « ef »."
 },
 {
  "ch": 8,
  "q": "Qu'affiche ce code ? `echo json_encode(strpos(\"abc\", \"a\") == false);`",
  "o": [
   "0",
   "null",
   "false",
   "true"
  ],
  "a": 3,
  "e": "`strpos` renvoie la position 0, qui est égale à `false` avec `==`. Il faut comparer avec `strpos(...) === false` pour savoir si le texte est absent."
 },
 {
  "ch": 8,
  "q": "Qu'affiche ce code ? `echo count(explode(\",\", \"a,b,,c\"));`",
  "o": [
   "5",
   "3",
   "4",
   "2"
  ],
  "a": 2,
  "e": "`explode` garde les morceaux vides : « a », « b », « » (vide) et « c » donnent 4 éléments."
 },
 {
  "ch": 8,
  "q": "Qu'affiche ce code ? `printf(\"%05.1f|%s\", 3.14159, \"x\");`",
  "o": [
   "3.1|x",
   "3.14|x",
   "003.1|x",
   "00003.1|x"
  ],
  "a": 2,
  "e": "`%05.1f` demande un nombre à 1 décimale sur 5 caractères au total, complété par des zéros à gauche : 003.1."
 },
 {
  "ch": 8,
  "q": "Qu'affiche ce code ? `echo number_format(1234567.891, 2, \",\", \" \");`",
  "o": [
   "1 234 567,89",
   "1 234 568",
   "1,234,567.89",
   "1234567,89"
  ],
  "a": 0,
  "e": "Les arguments sont : nombre, décimales, séparateur décimal, séparateur des milliers. Ici « , » pour les décimales et « » (espace) pour les milliers."
 },
 {
  "ch": 8,
  "q": "Qu'affiche ce code ? `echo round(2.5) . round(-2.5) . round(3.14159, 2);`",
  "o": [
   "2-23.14",
   "3-33.14",
   "3-23.14",
   "33.14"
  ],
  "a": 1,
  "e": "`round` arrondit « au plus loin de zéro » quand on est pile au milieu : 2.5 donne 3 et -2.5 donne -3. Le second argument fixe le nombre de décimales : 3.14. Concaténé : 3, -3, 3.14."
 },
 {
  "ch": 8,
  "q": "Qu'affiche ce code ? `echo intdiv(17, 5) . 17 % 5 . 17 / 5;`",
  "o": [
   "3217",
   "3.423",
   "323.4",
   "3.42"
  ],
  "a": 2,
  "e": "`intdiv(17, 5)` vaut 3, `17 % 5` vaut 2, `17 / 5` vaut 3.4. Les opérateurs arithmétiques passent avant le point en PHP 8, donc on assemble 3, 2 et 3.4."
 },
 {
  "ch": 8,
  "q": "Qu'affiche ce code ? `echo max([3, 9, 2]) . min(4, 1, 8) . array_sum([1, 2, 3]);`",
  "o": [
   "926",
   "916",
   "9186",
   "316"
  ],
  "a": 1,
  "e": "`max` donne 9, `min` donne 1, `array_sum` donne 6 : 9 puis 1 puis 6."
 },
 {
  "ch": 8,
  "q": "Qu'affiche ce code ? `$t = [1, 2, 3]; $t[] = 4; array_pop($t); array_unshift($t, 0); echo implode(\",\", $t);`",
  "o": [
   "1,2,3",
   "1,2,3,4",
   "0,1,2,3",
   "0,1,2,3,4"
  ],
  "a": 2,
  "e": "On ajoute 4 à la fin, `array_pop` le retire, puis `array_unshift` insère 0 au début : 0,1,2,3."
 },
 {
  "ch": 8,
  "q": "Qu'affiche ce code ? `echo implode(\",\", array_slice([10, 20, 30, 40], 1, 2));`",
  "o": [
   "20,30",
   "20,30,40",
   "10,20",
   "10,20,30"
  ],
  "a": 0,
  "e": "`array_slice($t, 1, 2)` part de l'indice 1 et prend 2 éléments : 20 et 30."
 },
 {
  "ch": 8,
  "q": "Qu'affiche ce code ? `echo count([1, [2, 3]]) . count([1, [2, 3]], COUNT_RECURSIVE);`",
  "o": [
   "22",
   "44",
   "23",
   "24"
  ],
  "a": 3,
  "e": "Sans option, `count` compte les éléments du premier niveau : 2. Avec `COUNT_RECURSIVE`, il compte aussi le contenu du sous-tableau : 1, le sous-tableau et ses 2 éléments, soit 4."
 },
 {
  "ch": 8,
  "q": "Qu'affiche ce code ? `$a = [\"a\" => 1] + [\"a\" => 2, \"b\" => 3]; echo implode(\",\", $a);`",
  "o": [
   "3",
   "1,2,3",
   "2,3",
   "1,3"
  ],
  "a": 3,
  "e": "L'opérateur `+` entre deux tableaux garde la valeur du tableau de gauche quand la clé existe déjà : a vaut 1. Avec `array_merge`, la valeur de droite écraserait : 2,3."
 },
 {
  "ch": 8,
  "q": "Qu'affiche ce code ? `echo implode(\",\", array_unique([1, \"1\", 2, 2.0, \"a\", \"A\"]));`",
  "o": [
   "1,2,a,A",
   "1,1,2,2,a,A",
   "1,2,a",
   "1,2"
  ],
  "a": 0,
  "e": "`array_unique` compare comme des chaînes : 1 et « 1 » sont identiques, 2 et 2.0 aussi. Les lettres « a » et « A » restent différentes (casse)."
 },
 {
  "ch": 8,
  "q": "Qu'affiche ce code ? `echo json_encode(in_array(\"abc\", [0]));`",
  "o": [
   "false",
   "true",
   "0",
   "1"
  ],
  "a": 0,
  "e": "Depuis PHP 8, `\"abc\" == 0` est faux, donc `in_array` renvoie `false`. En PHP 7, le résultat était `true` : une différence de version à connaître."
 },
 {
  "ch": 8,
  "q": "Qu'affiche ce code ? `[$a, $b] = [1, 2]; [$a, $b] = [$b, $a]; echo $a . $b;`",
  "o": [
   "12",
   "22",
   "11",
   "21"
  ],
  "a": 3,
  "e": "La destructuration affecte plusieurs variables d'un coup. `[$a, $b] = [$b, $a]` échange les valeurs : `$a` vaut 2 et `$b` vaut 1."
 },
 {
  "ch": 8,
  "q": "Qu'affiche ce code ? `function f(...$n) { return array_sum($n); } echo f(1, 2, 3) . f(...[4, 5]);`",
  "o": [
   "96",
   "6",
   "69",
   "15"
  ],
  "a": 2,
  "e": "`...$n` regroupe les arguments en tableau. `f(1, 2, 3)` donne 6. Avec `f(...[4, 5])`, l'opérateur `...` éclate le tableau en arguments : 9."
 },
 {
  "ch": 8,
  "q": "Qu'affiche ce code ? `echo implode(\",\", array_column([[\"id\" => 1, \"n\" => \"A\"], [\"id\" => 2, \"n\" => \"B\"]], \"n\"));`",
  "o": [
   "A",
   "A,B",
   "1,2",
   "id,n"
  ],
  "a": 1,
  "e": "`array_column($lignes, 'n')` extrait la colonne « n » de chaque sous-tableau : A et B."
 },
 {
  "ch": 8,
  "q": "Qu'affiche ce code ? `$t = [\"b\" => 2, \"a\" => 3, \"c\" => 1]; asort($t); echo implode(\",\", array_keys($t));`",
  "o": [
   "a,b,c",
   "c,a,b",
   "c,b,a",
   "a,c,b"
  ],
  "a": 2,
  "e": "`asort` trie par valeur croissante en gardant les clés : 1 (c), 2 (b), 3 (a). Les clés dans cet ordre : c,b,a. `ksort` aurait trié par clé."
 },
 {
  "ch": 8,
  "q": "Qu'affiche ce code ? `$x = null; $x ??= \"def\"; echo $x . ($y ?? \"non\");`",
  "o": [
   "defnon",
   "defdef",
   "non",
   "nullnon"
  ],
  "a": 0,
  "e": "`??=` affecte seulement si la variable est `null` ou absente : `$x` devient « def ». `$y` n'existe pas, `??` donne « non » sans erreur."
 },
 {
  "ch": 8,
  "q": "Qu'affiche ce code ? `echo \"5\" + \"5\" . \"5\";`",
  "o": [
   "105",
   "555",
   "10",
   "15"
  ],
  "a": 0,
  "e": "Depuis PHP 8, l'addition passe avant la concaténation : `\"5\" + \"5\"` donne 10, puis `10 . \"5\"` donne « 105 ». Pour obtenir 555, il faut écrire `\"5\" . \"5\" . \"5\"`."
 },
 {
  "ch": 8,
  "q": "Qu'affiche ce code ? `echo json_encode([\"abc\" == 0, null == false, \"0\" == false]);`",
  "o": [
   "[false,true,true]",
   "[true,true,true]",
   "[false,true,false]",
   "[false,false,true]"
  ],
  "a": 0,
  "e": "En PHP 8, `\"abc\" == 0` est faux (le texte n'est plus converti en 0). `null == false` est vrai et `\"0\" == false` est vrai (la chaîne « 0 » est falsy). Utilisez `===` pour éviter ces surprises."
 },
 {
  "ch": 8,
  "q": "Qu'affiche ce code ? `$s = \"Sara\"; echo 'Bonjour $s ' . \"Bonjour $s\";`",
  "o": [
   "Bonjour $s Bonjour $s",
   "Bonjour $s Bonjour Sara",
   "Bonjour Sara Bonjour Sara",
   "Bonjour Sara Bonjour $s"
  ],
  "a": 1,
  "e": "Les guillemets simples n'interprètent pas les variables : `$s` reste écrit tel quel. Les guillemets doubles remplacent `$s` par sa valeur."
 },
 {
  "ch": 8,
  "q": "Qu'affiche ce code ? `const A = 2; echo A ** 3, defined(\"A\") ? \"d\" : \"n\";`",
  "o": [
   "9d",
   "8d",
   "6d",
   "8n"
  ],
  "a": 1,
  "e": "`const A = 2;` crée une constante, sans `$`. `2 ** 3` vaut 8 et `defined(\"A\")` renvoie `true`, donc « d »."
 },
 {
  "ch": 8,
  "q": "Qu'affiche ce code ? `$i = 0; do { echo $i; } while ($i++ < 2);`",
  "o": [
   "0123",
   "01",
   "12",
   "012"
  ],
  "a": 3,
  "e": "`do ... while` affiche d'abord, teste ensuite. Le test `$i++ < 2` compare puis incrémente : on affiche 0, 1, 2 et on s'arrête quand 2 < 2 est faux."
 },
 {
  "ch": 8,
  "q": "Qu'affiche ce code ? `for ($i = 0, $j = 10; $i < $j; $i += 3, $j -= 3) echo $i . $j . \" \";`",
  "o": [
   "010",
   "010 37",
   "010 37 64",
   "37 010"
  ],
  "a": 1,
  "e": "Tour 1 : i=0, j=10 affiche 010. Tour 2 : i=3, j=7 affiche 37. Tour 3 : i=6, j=4, la condition `6 < 4` est fausse : fin."
 },
 {
  "ch": 8,
  "q": "Qu'affiche ce code ? `echo match(true) { 15 >= 18 => \"majeur\", 15 >= 12 => \"ado\", default => \"enfant\" };`",
  "o": [
   "ado",
   "majeur",
   "ado enfant",
   "enfant"
  ],
  "a": 0,
  "e": "`match(true)` cherche la première condition vraie. `15 >= 18` est faux, `15 >= 12` est vrai : « ado »."
 },
 {
  "ch": 8,
  "q": "Qu'affiche ce code ? `function fib($n) { return $n < 2 ? $n : fib($n - 1) + fib($n - 2); } echo fib(7);`",
  "o": [
   "13",
   "21",
   "8",
   "7"
  ],
  "a": 0,
  "e": "Suite de Fibonacci : 0, 1, 1, 2, 3, 5, 8, 13. Avec `fib(0)=0` et `fib(1)=1`, `fib(7)` vaut 13."
 },
 {
  "ch": 8,
  "q": "Qu'affiche ce code ? `$c = function () { static $n = 0; return ++$n; }; $c(); echo $c();`",
  "o": [
   "1",
   "2",
   "0",
   "3"
  ],
  "a": 1,
  "e": "Une variable `static` garde sa valeur entre les appels de la même fonction. Premier appel : 1, second appel : 2."
 },
 {
  "ch": 8,
  "q": "Qu'affiche ce code ? `echo implode(\",\", array_map(fn($a, $b) => $a . $b, [\"a\", \"b\"], [1, 2]));`",
  "o": [
   "a1,b2",
   "a1b2",
   "ab,12",
   "a,b,1,2"
  ],
  "a": 0,
  "e": "`array_map` avec deux tableaux appelle la fonction avec les éléments de même rang : (a, 1) puis (b, 2)."
 },
 {
  "ch": 8,
  "q": "Qu'affiche ce code ? `echo json_encode(array_filter([1, 2, 3, 4], fn($x) => $x % 2 == 0));`",
  "o": [
   "[1,3]",
   "{\"0\":2,\"1\":4}",
   "[2,4]",
   "{\"1\":2,\"3\":4}"
  ],
  "a": 3,
  "e": "`array_filter` garde les clés d'origine (1 et 3). Un tableau dont les clés ne sont pas 0, 1, 2... devient un objet en JSON. Pour obtenir `[2,4]`, il faut `array_values(...)`."
 },
 {
  "ch": 8,
  "q": "Qu'affiche ce code ? `echo json_encode([\"a\" => 1, \"b\" => [1, 2]]) . json_encode([1, 2]);`",
  "o": [
   "{\"a\":1,\"b\":{\"0\":1,\"1\":2}}[1,2]",
   "[\"a\",1]",
   "{\"a\":1,\"b\":[1,2]}[1,2]",
   "{\"a\":1,\"b\":[1,2]}{\"0\":1,\"1\":2}"
  ],
  "a": 2,
  "e": "Un tableau associatif devient un objet JSON `{...}`, un tableau indexé devient une liste `[...]`."
 },
 {
  "ch": 8,
  "q": "Qu'affiche ce code ? `echo json_encode(\"é\");`",
  "o": [
   "é",
   "\"é\"",
   "\"\\u00e9\"",
   "\"e\""
  ],
  "a": 2,
  "e": "Par défaut, `json_encode` échappe les caractères non ASCII en `\\uXXXX`. L'option `JSON_UNESCAPED_UNICODE` garde « é »."
 },
 {
  "ch": 8,
  "q": "Qu'affiche ce code ? `echo htmlspecialchars('<a href=\"x\">T&C</a>');`",
  "o": [
   "&lt;a href=\"x\"&gt;T&C&lt;/a&gt;",
   "&lt;a href=&quot;x&quot;&gt;T&amp;C&lt;/a&gt;",
   "<a href=\"x\">T&amp;C</a>",
   "T&amp;C"
  ],
  "a": 1,
  "e": "`htmlspecialchars` transforme `<`, `>`, `&` et les guillemets doubles en entités HTML : le navigateur affiche le texte au lieu de l'interpréter. C'est la défense contre le XSS."
 },
 {
  "ch": 8,
  "q": "Qu'affiche ce code ? `echo json_encode([filter_var(\"a@b.ma\", FILTER_VALIDATE_EMAIL) !== false, filter_var(\"a@b\", FILTER_VALIDATE_EMAIL) !== false]);`",
  "o": [
   "[true,false]",
   "[false,true]",
   "[false,false]",
   "[true,true]"
  ],
  "a": 0,
  "e": "`FILTER_VALIDATE_EMAIL` accepte « a@b.ma » mais refuse « a@b » (pas de point dans le domaine). On compare avec `!== false` car la fonction renvoie `false` en cas d'échec."
 },
 {
  "ch": 8,
  "q": "Qu'affiche ce code ? `echo json_encode([(bool)\"0\", (bool)\"0.0\", (bool)[], (bool)[0]]);`",
  "o": [
   "[false,true,true,true]",
   "[false,true,false,true]",
   "[true,true,false,true]",
   "[false,false,false,true]"
  ],
  "a": 1,
  "e": "Sont `false` : `\"0\"`, `\"\"`, `0`, `0.0`, `[]`, `null`. La chaîne « 0.0 » est vraie (seule « 0 » est fausse), et un tableau non vide est vrai même s'il contient 0."
 },
 {
  "ch": 8,
  "q": "Qu'affiche ce code ? `echo date(\"Y-m-d\", mktime(0, 0, 0, 13, 1, 2025));`",
  "o": [
   "2025-12-01",
   "2025-13-01",
   "2026-13-01",
   "2026-01-01"
  ],
  "a": 3,
  "e": "`mktime` normalise les valeurs hors limites : le mois 13 de 2025 devient janvier 2026."
 },
 {
  "ch": 8,
  "q": "Qu'affiche ce code ? `file_put_contents(\"d.csv\", \"a;1\nb;2\n\"); $s = 0; foreach (file(\"d.csv\", FILE_IGNORE_NEW_LINES) as $l) { $s += explode(\";\", $l)[1]; } echo $s;`",
  "o": [
   "12",
   "2",
   "ab",
   "3"
  ],
  "a": 3,
  "e": "`file` avec `FILE_IGNORE_NEW_LINES` donne un tableau de lignes sans retour à la ligne. `explode(\";\", $l)` découpe chaque ligne selon le séparateur du CSV : on additionne les secondes colonnes, 1 + 2 = 3."
 },
 {
  "ch": 8,
  "q": "Qu'affiche ce code ? `file_put_contents(\"l.txt\", \"a\\nb\\nc\"); echo count(file(\"l.txt\")) . strlen(file(\"l.txt\")[0]);`",
  "o": [
   "12",
   "33",
   "32",
   "31"
  ],
  "a": 2,
  "e": "`file` renvoie un tableau de lignes, retours à la ligne compris : 3 lignes, et la première (« a\\n ») fait 2 caractères. Avec `FILE_IGNORE_NEW_LINES`, elle ferait 1."
 },
 {
  "ch": 8,
  "q": "Qu'affiche ce code ? `file_put_contents(\"c.txt\", \"1\"); file_put_contents(\"c.txt\", \"2\", FILE_APPEND); file_put_contents(\"c.txt\", \"3\"); echo file_get_contents(\"c.txt\");`",
  "o": [
   "3",
   "123",
   "13",
   "12"
  ],
  "a": 0,
  "e": "Sans `FILE_APPEND`, `file_put_contents` écrase le contenu. Le dernier appel remplace tout par « 3 »."
 },
 {
  "ch": 8,
  "q": "Qu'affiche ce code ? `echo str_pad(\"7\", 3, \"0\", STR_PAD_LEFT) . ucwords(\"ali ben omar\");`",
  "o": [
   "007Ali ben omar",
   "007ali ben omar",
   "007Ali Ben Omar",
   "700Ali ben omar"
  ],
  "a": 2,
  "e": "`str_pad` complète à gauche avec des 0 jusqu'à 3 caractères : 007. `ucwords` met la première lettre de chaque mot en majuscule."
 },
 {
  "ch": 8,
  "q": "Qu'affiche ce code ? `echo trim(\"  x  \") . \"|\" . rtrim(\"x\\n\") . \"|\" . ltrim(\"007\", \"0\");`",
  "o": [
   "  x  |x|7",
   "x|x|7",
   "x|x|007",
   "x|x\\n|7"
  ],
  "a": 1,
  "e": "`trim` enlève les espaces des deux côtés, `rtrim` ceux de droite (retour à la ligne compris), `ltrim` avec un second argument enlève ce caractère à gauche : 007 devient 7."
 },
 {
  "ch": 8,
  "q": "Qu'affiche ce code ? `echo strcmp(\"a\", \"b\") . (\"10\" <=> \"9\") . (\"10\" <=> \"9a\");`",
  "o": [
   "1-11",
   "-11-1",
   "111",
   "-111"
  ],
  "a": 1,
  "e": "`strcmp(\"a\", \"b\")` donne -1. `\"10\" <=> \"9\"` compare comme deux nombres : 1. `\"10\" <=> \"9a\"` : « 9a » n'est pas numérique, la comparaison se fait comme du texte et « 1 » vient avant « 9 » : -1."
 },
 {
  "ch": 8,
  "q": "Qu'affiche ce code ? `$a = [\"x\" => [\"y\" => 1]]; echo ($a[\"x\"][\"z\"] ?? \"absent\") . (isset($a[\"x\"][\"y\"]) ? \"ok\" : \"ko\");`",
  "o": [
   "Warning",
   "okko",
   "absentok",
   "absentko"
  ],
  "a": 2,
  "e": "`??` et `isset` ne génèrent pas d'avertissement quand une clé n'existe pas. `z` est absent donc « absent », `y` existe donc « ok »."
 },
 {
  "ch": 8,
  "q": "Qu'affiche ce code ? `$x = 10; function t() { global $x; $x++; } t(); t(); echo $x . $GLOBALS[\"x\"];`",
  "o": [
   "1111",
   "12",
   "1212",
   "1010"
  ],
  "a": 2,
  "e": "`global $x` lie la variable locale à la globale : chaque appel incrémente la vraie `$x`. Après 2 appels, elle vaut 12, et `$GLOBALS[\"x\"]` aussi."
 },
 {
  "ch": 8,
  "q": "Qu'affiche ce code ? `$a = 1; $b = &$a; $b++; unset($b); $b = 5; echo $a;`",
  "o": [
   "5",
   "2",
   "1",
   "6"
  ],
  "a": 1,
  "e": "`$b = &$a` crée une référence : `$b++` modifie `$a` (2). `unset($b)` supprime seulement le lien : la nouvelle `$b = 5` n'a plus aucun rapport avec `$a`, qui reste à 2."
 },
 {
  "ch": 8,
  "q": "Qu'affiche ce code ? `$t = [1, 2, 3]; foreach ($t as &$v) { $v *= 2; } unset($v); echo implode(\",\", $t);`",
  "o": [
   "2,4,3",
   "2,4,6",
   "2,4,4",
   "1,2,3"
  ],
  "a": 1,
  "e": "Avec `&$v`, la boucle travaille sur les éléments eux-mêmes : le tableau devient 2,4,6. Le `unset($v)` évite qu'une réutilisation ultérieure de `$v` modifie le dernier élément."
 },
 {
  "ch": 8,
  "q": "Quelle superglobale permet de savoir si la page a été demandée en GET ou en POST ?",
  "o": [
   "`$_REQUEST['type']`",
   "`$_ENV['METHOD']`",
   "`$_GET['method']`",
   "`$_SERVER['REQUEST_METHOD']`"
  ],
  "a": 3,
  "e": "`$_SERVER['REQUEST_METHOD']` contient « GET » ou « POST ». C'est la base du test `if ($_SERVER['REQUEST_METHOD'] === 'POST')` pour séparer affichage et traitement du formulaire."
 },
 {
  "ch": 8,
  "q": "Comment supprimer un cookie existant ?",
  "o": [
   "`session_destroy()`",
   "`delete_cookie('nom')`",
   "`unset($_COOKIE['nom'])` seul",
   "Appeler `setcookie()` avec le même nom et une date d'expiration dans le passé"
  ],
  "a": 3,
  "e": "Le cookie est stocké chez le client : seul le navigateur peut l'effacer. On lui envoie le même cookie avec une expiration passée (par exemple `time() - 3600`). `unset($_COOKIE[...])` ne supprime que la copie lue par le script en cours."
 },
 {
  "ch": 8,
  "q": "Quelle durée de vie a un cookie créé sans date d'expiration ?",
  "o": [
   "Trente jours",
   "Un jour",
   "Il ne disparaît jamais",
   "Il disparaît à la fermeture du navigateur"
  ],
  "a": 3,
  "e": "Sans `expires`, c'est un cookie de session (au sens du navigateur) : il est supprimé quand le navigateur se ferme."
 },
 {
  "ch": 8,
  "q": "Comment réaliser une déconnexion complète avec les sessions ?",
  "o": [
   "Vider `$_SESSION`, appeler `session_destroy()` et supprimer le cookie de session",
   "Appeler seulement `session_start()`",
   "Appeler `session_id(0)`",
   "Supprimer le fichier PHP de connexion"
  ],
  "a": 0,
  "e": "`session_destroy()` supprime les données côté serveur mais ne vide pas `$_SESSION` dans le script en cours ni le cookie du navigateur : on fait donc les trois étapes."
 },
 {
  "ch": 8,
  "q": "Quelle est la différence entre `unset($_SESSION['user'])` et `session_destroy()` ?",
  "o": [
   "`unset` détruit la session, `session_destroy()` retire une variable",
   "`unset` retire une seule variable de session, `session_destroy()` détruit toute la session côté serveur",
   "Aucune, c'est la même chose",
   "`unset` supprime le cookie du navigateur"
  ],
  "a": 1,
  "e": "`unset` ne touche qu'une clé. `session_destroy()` supprime les données de la session sur le serveur. Pour une déconnexion complète, on combine les deux approches."
 },
 {
  "ch": 8,
  "q": "Quelle condition vérifie qu'un fichier a bien été envoyé sans erreur ?",
  "o": [
   "`$_FILES['photo']['type'] === 'image/png'`",
   "`$_FILES['photo']['error'] === UPLOAD_ERR_OK`",
   "`isset($_FILES)` seul",
   "`file_exists($_FILES['photo']['name'])`"
  ],
  "a": 1,
  "e": "`UPLOAD_ERR_OK` vaut 0 : aucune erreur. Les autres valeurs indiquent un fichier trop gros, partiel ou absent. Le nom et le type envoyés par le client ne prouvent rien."
 },
 {
  "ch": 8,
  "q": "Où doit se trouver `declare(strict_types=1);` ?",
  "o": [
   "À la fin du fichier",
   "Tout en haut du fichier, avant toute autre instruction",
   "Dans le fichier `php.ini` uniquement",
   "N'importe où dans le fichier"
  ],
  "a": 1,
  "e": "Cette directive doit être la première instruction du fichier (juste après `<?php`). Elle active le typage strict pour les appels de fonctions faits depuis ce fichier."
 },
 {
  "ch": 8,
  "q": "Quelle est la différence entre `echo` et `print` ?",
  "o": [
   "`echo` accepte plusieurs arguments et ne renvoie rien, `print` renvoie 1",
   "`print` accepte plusieurs arguments, `echo` renvoie 1",
   "`echo` est réservé aux nombres",
   "Aucune, mais `print` est interdit en PHP 8"
  ],
  "a": 0,
  "e": "`echo` est une construction du langage sans valeur de retour. `print` renvoie toujours 1, donc on peut l'utiliser dans une expression. En pratique, on utilise `echo`."
 },
 {
  "ch": 8,
  "q": "Que fait la balise `<?= $x ?>` dans un fichier PHP mélangé à du HTML ?",
  "o": [
   "Elle déclare la variable `$x`",
   "Elle affiche la valeur de `$x`, comme `<?php echo $x; ?>`",
   "Elle importe un fichier",
   "Elle ouvre un commentaire"
  ],
  "a": 1,
  "e": "`<?=` est la forme courte de `<?php echo`. Elle est pratique dans les gabarits HTML, mais la valeur doit être protégée avec `htmlspecialchars` si elle vient de l'utilisateur."
 },
 {
  "ch": 8,
  "q": "Pourquoi un formulaire qui supprime ou modifie des données doit-il utiliser POST et non GET ?",
  "o": [
   "POST est toujours chiffré",
   "GET est plus lent que POST",
   "GET ne peut pas contenir de texte",
   "Une URL GET peut être rejouée, mise en favori ou préchargée sans que l'utilisateur le veuille"
  ],
  "a": 3,
  "e": "GET sert à lire. Une action qui change des données ne doit pas être déclenchée par une simple URL, car elle serait répétée à chaque rechargement, lien ou robot. POST n'est pas chiffré pour autant : HTTPS reste nécessaire."
 },
 {
  "ch": 8,
  "q": "Que renvoie `file_put_contents()` ?",
  "o": [
   "Toujours `true`",
   "Le contenu du fichier",
   "Rien (`void`)",
   "Le nombre d'octets écrits, ou `false` en cas d'échec"
  ],
  "a": 3,
  "e": "On peut donc tester `=== false` pour détecter un échec d'écriture (droits, dossier absent). Le nombre d'octets peut valoir 0 sans que ce soit une erreur."
 },
 {
  "ch": 8,
  "q": "Pourquoi dit-on que PHP est un langage à typage dynamique ?",
  "o": [
   "Il faut déclarer le type de chaque variable",
   "PHP refuse toute conversion de type",
   "Les variables ne peuvent pas changer de valeur",
   "Le type d'une variable est déterminé par la valeur qu'elle contient et peut changer en cours de script"
  ],
  "a": 3,
  "e": "On écrit `$x = 5;` puis `$x = \"cinq\";` sans erreur. Les déclarations de type sur les paramètres sont optionnelles et deviennent strictes seulement avec `strict_types`."
 }
]);
